package erp.erp.materialQualityTesting.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.materialQualityTesting.data.CllbMapper;
import erp.erp.materialQualityTesting.model.Wtbm;
@Service
public class CllbService {
	@Autowired
	private CllbMapper cllbMapper;
	
	 public List<Wtbm> getCllbList(Map<String,Object> params){
	    	return cllbMapper.getCllbList(params);
	    }
		public String getCllbOne(Map<String,Object> params){
			return cllbMapper.getCllbOne(params);
		}
		public String getCllbTwo(Map<String,Object> params){
			return cllbMapper.getCllbTwo(params);
		}
		//材料类别名称
		public String getCllbName(Map<String,Object> params){
			return cllbMapper.getCllbName(params);
		}		
		public List<TreeModel> getCllbTreeList(Map<String,Object> params) {
				List<TreeModel> stlist=new ArrayList<TreeModel>();
				List<Wtbm> list=getCllbList(params);
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
