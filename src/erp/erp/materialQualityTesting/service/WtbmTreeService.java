package erp.erp.materialQualityTesting.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.materialQualityTesting.data.WtbmTreeMapper;
import erp.erp.materialQualityTesting.model.Wtbm;
@Service
public class WtbmTreeService {
    @Autowired
	private WtbmTreeMapper wtbmTreeMapper;
    public List<Wtbm> getWtbmList(Map<String,Object> params){
    	return wtbmTreeMapper.getWtbmList(params);
    }
	public String getWtbmOne(Map<String,Object> params){
		return wtbmTreeMapper.getWtbmOne(params);
	}
	public String getWtbmTwo(Map<String,Object> params){
		return wtbmTreeMapper.getWtbmTwo(params);
	}
	//部门名称
	public String getWtbmName(Map<String,Object> params){
		return wtbmTreeMapper.getWtbmName(params);
	}		
	public List<TreeModel> getWtbhTreeList(Map<String,Object> params) {
			List<TreeModel> stlist=new ArrayList<TreeModel>();
			List<Wtbm> list=getWtbmList(params);
			int lbjc=1;
			int parentId=0;
			if(params.get("node")!=null){
				 lbjc=(params.get("node").toString().length()/2)+1;
				 parentId=Integer.valueOf(String.valueOf(params.get("node")));
			}
			for(Wtbm sa:list) 
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
