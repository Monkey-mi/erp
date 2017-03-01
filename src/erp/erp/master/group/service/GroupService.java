package erp.erp.master.group.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.group.data.GroupMapper;
import erp.erp.master.group.data.GroupOperatorMapper;
import erp.erp.master.group.model.Group;
import erp.erp.master.group.model.GroupOperator;
import erp.erp.master.operator.model.Operator;

@Service
public class GroupService {
    @Autowired
    private GroupMapper mapper;
    
    @Autowired
    private GroupOperatorMapper GroupOperatormapper;
    /**
	* @Description: 采购组CURD
	* Request group/group.act?method=******
	* Response {data:[{List<Group>}]} <br/><br/>
	*/
	public List<Group> getGroupList(Map<String,Object> params) {
		return mapper.getGroupList(params);
	}
	public void addGroup(Group[] arr) {
		for(Group obj: arr) {
			mapper.addGroup(obj);
		}
	}
	public void updateGroup(Group[] arr) {
		for(Group obj: arr) {
			mapper.updateGroup(obj);
		}
	}
	
	public String deleteGroup(Map<String,Object> params) {
		String recordData=null;
		Group  arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(Group [])JSONArray.toArray(jsonArray,Group.class);
		JSONObject json=new JSONObject();
		json.put("bool", true);
		for(Group obj: arr) {
			if(mapper.beforeDel(obj)>0){
				json.put("bool", false);
				json.put("msg", "【"+obj.getCgzh()+"】号采购组已经在材料档案中调用，不能删除!");
			}else{
			mapper.deleteGroup(obj);
            mapper.deleteCzy(obj);
            }
		  }
		return json.toString();
	}
	public String getGroupOne(Map<String,Object> params){
		return mapper.getGroupOne(params);
	}
	 public String getLoadOperator(Map<String,Object> params) {
			JSONObject json=new JSONObject();
			json.put("bool", true);
			String msg="";
			JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
			
				Operator [] arr=null;
				if(params.get("recordData")!=null){
					JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
					arr=(Operator [])JSONArray.toArray(jsonArray,Operator.class);
					String cgzh=params.get("cgzh").toString();
					
					for(Operator obj:arr){
						
							Map<String,Object> pa=new HashMap<String, Object>();
							pa.put("czy_gh", obj.getCzy_gh());
							pa.put("cgzh", cgzh);
							/*pa.put("len", i);*/
							if(mapper.getOperatorIsExist(pa)>0){
								msg+="操作员【"+obj.getCzy_xm()+"】已存在请重新选择!<br/>";
							}else{
								GroupOperator ca=new GroupOperator();
								ca.setCzy_gh(obj.getCzy_gh());
								ca.setCzy_xm(obj.getCzy_xm());
								ca.setCgzh(cgzh);
								GroupOperatormapper.addGroupOperator(ca);	
							
						}
					}
				}
			
			json.put("msg", msg);
			return json.toString();
		}
    
    
    
}
