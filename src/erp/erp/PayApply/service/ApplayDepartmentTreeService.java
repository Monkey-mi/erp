package erp.erp.PayApply.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.PayApply.data.ApplayDepartmentTreeMapper;
import erp.erp.PayApply.model.ApplayDepartmentTree;

/**
 * <p>Title: ApplayDepartmentTreeService</p>
 * <p>Description: erp</p>
 * <p>Company: topsun</p> 
 * @author shufei
 * @date 2016-5-19下午4:02:39
 */

@Service
public class ApplayDepartmentTreeService {
    @Autowired
	private ApplayDepartmentTreeMapper applayDepartmentTreeMapper;
	
    public List<ApplayDepartmentTree> getDepartmentList(Map<String,Object> params){
    	return applayDepartmentTreeMapper.getDepartmentList(params);
    }
	public String getDepartmentOne(Map<String,Object> params){
		return applayDepartmentTreeMapper.getDepartmentOne(params);
	}
	public String getDepartmentTwo(Map<String,Object> params){
		return applayDepartmentTreeMapper.getDepartmentTwo(params);
	}
	//类别名称
	public String getDepartmentName(Map<String,Object> params){
		return applayDepartmentTreeMapper.getDepartmentName(params);
	}
	
	public List<TreeModel> getApplayDepartmentTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<ApplayDepartmentTree> list=getDepartmentList(params);
		int lbjc=1;
		int parentId=0;
		if(params.get("node")!=null){
			 lbjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(ApplayDepartmentTree sa:list) 
		{
			if(sa.getLbjc()==lbjc){
				TreeModel st=new TreeModel();										
				st.setNodeId(Integer.valueOf(sa.getLbbh().trim()));
				st.setParentId(parentId);
				st.setText(sa.getLbmc());
				st.setExpanded("false");
				if (sa.getMjbz()==0){
					st.setLeaf("false");
				}else{
					st.setLeaf("true");
				}						
				st.setType("category");
				stlist.add(st);
			}
		}
		return stlist;
	}
	
}
