package erp.bi.report.service;




import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.bi.report.data.ReportMapper;
import erp.bi.report.model.CurrentTreeRPT;
import erp.bi.report.model.ReportDocTree;
import erp.util.WebUtil;



@Service
public class ReportService {
	@Autowired
	private ReportMapper reportMapper;
	
	/**
	 * 获取我的函数目录下的子目录
	 */
	public List<CurrentTreeRPT> getCurrentTree(Map<String,Object> params){
		return reportMapper.getCurrentTree(params);
	}
	
	
	/**
	 * 添加我的函数目录
	 */
	@Transactional
	public void addCurrentTree(CurrentTreeRPT[]items){
		try{
            for(CurrentTreeRPT item : items){
            	reportMapper.addCurrentTree(item);
            	if (item.getParentId()!=0){
            		CurrentTreeRPT pitem=new CurrentTreeRPT();
            		pitem.setNodeId(item.getParentId());
            		pitem.setLeaf("false");
            		reportMapper.updateCurrentTreeStatus(pitem);
            		
            	}
            }		
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/**
	 * 删除我的报表目录
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public boolean deleteCurrentTree(Map<String,Object> params){
		try{
			String postData = (String)params.get("data");
			Map<String,Object> postMap = WebUtil.getObjectMapper().readValue(postData, Map.class);
			if(this.reportDocHasContent(postMap)){
				params.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,"目录中有报表，无法删除!");
				return false;
			}else{
				
				reportMapper.deleteCurrentTree(postMap);
				//判断删除的父节点中是否还存在其他子节点
				//不存在或非根节点的情况,更新父节点为叶子节点
				if((Integer)postMap.get("parentId")!=0&&!DocHasLeaf(postMap))
				{
					CurrentTreeRPT pitem=new CurrentTreeRPT();
            		pitem.setNodeId((Integer)postMap.get("parentId"));
            		pitem.setLeaf("true");
            		reportMapper.updateCurrentTreeStatus(pitem);
				}
				return true;
			}
		}catch(Exception e){
			params.put(erp.util.Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}
	}
	
	private boolean DocHasLeaf(Map<String,Object> postMap){
		boolean result = false;
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("pid", postMap.get("parentId"));
		
		if(reportMapper.getDocLeafCount(param)>0){
			result = true;
		}
		return result;
	}
	
	/**
	 * 报表目录中是否有报表
	 */
	private boolean reportDocHasContent(Map<String,Object> postMap){
		boolean result = false;
		Map<String,Object> param = new HashMap<String,Object>();
		
		param.put("id", postMap.get("nodeId"));
		if(reportMapper.getReportDocContent(param)>0){
			result = true;
		}
	    
		if(!result){
			List<ReportDocTree> docs = this.getReportDocTree(param);
			for(ReportDocTree doc : docs){
				param.put("id", doc.getDocId());
				if(reportMapper.getReportDocContent(param)>0){
					result = true;
					break;
				}
			}
		}
		return result;
	}
	/**
	 * 修改我的报表目录
	 */
	@Transactional
	public void updateCurrentTree(CurrentTreeRPT[]items){
		try{
            for(CurrentTreeRPT item : items){
            	reportMapper.updateCurrentTree(item);
            }		
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	
	/**
	 * 获取我的报表目录下的子目录
	 */
	public List<ReportDocTree> getReportDocTree(Map<String,Object> params){
		return reportMapper.getReportDocTree(params);
	}
	
	/**
	 * 获取报表末级目录
	 */
	public List<CurrentTreeRPT> getReportDocCombo(Map<String,Object> params){
		return reportMapper.getCurrentTreeCombo(params);
	}
	
	/**
	 * 获取包含报表的目录
	 */
	public List<CurrentTreeRPT> getReportTree(Map<String,Object> params){
		return reportMapper.getCurrentTreeIncludeReport(params);
	}
}
