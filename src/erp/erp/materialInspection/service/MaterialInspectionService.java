package erp.erp.materialInspection.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import erp.common.TreeModel;
import erp.erp.materialInspection.data.MaterialInspectionMapper;
import erp.erp.materialInspection.model.ArriveList;
import erp.erp.materialInspection.model.Csjgxsj;
import erp.erp.materialInspection.model.HouseTreeModel;
import erp.erp.materialInspection.model.InspectionWareHouse;
import erp.erp.materialInspection.model.MaterialApply;
import erp.erp.materialInspection.model.MaterialInspection;
import erp.erp.materialInspection.model.MaterialTestPro;
import erp.erp.materialInspection.model.TestMethod;
import erp.erp.materialInspection.model.TestProject;
import erp.erp.materialInspection.model.InspectionWtbm;


@Service
public class MaterialInspectionService {
	@Autowired
	private MaterialInspectionMapper mapper;

	public List<TestProject> getTestProject(Map<String,Object> params){
		return mapper.getTestProject(params);
	}
	public List<MaterialInspection> getMaterialInspectionList(Map<String,Object> params) {
		return mapper.getMaterialInspectionList(params);
	}
	public List<MaterialTestPro> getMaterialTestProList(Map<String,Object> params) {
		return mapper.getMaterialTestProList(params);
	}
	public double addMaterialInspection(MaterialInspection[] arr) {
		for(MaterialInspection obj: arr) {
			mapper.addMaterialInspection(obj);
		}
		double ll_count=1;
		String sql1 = "select max(wtdh) from wtjycssqb;";
		Map<String,Object> params=new HashMap<String, Object>();
		params.put("sql", sql1);
		String str = mapper.getStringFromSql(params);
		if(str!=null){
			ll_count=Double.parseDouble(str);
		}
		return ll_count;
	}
	public void updateMaterialInspection(MaterialInspection[] arr) {
		for(MaterialInspection obj: arr) {
			mapper.updateMaterialInspection(obj);
		}
	}
	public void deleteMaterialInspection(Map<String,Object> params) {
		mapper.deleteMaterialInspection(params);
		mapper.deleteMaterialInspectionDetele(params);
		mapper.deleteMaterialDetail(params);
	}
	public void updateLoadingPlanBj(Map<String,Object> params){
		try {
			MaterialInspection arr[] = null;
			String dd=null;
			if(params.get("dd")!=null){
				dd=params.get("dd").toString();
			}
			if(dd!=null){
				JSONArray jsonArray=net.sf.json.JSONArray.fromObject(dd);
				arr=(MaterialInspection [])JSONArray.toArray(jsonArray,MaterialInspection.class);
				for(MaterialInspection sd:arr){
					mapper.updateLoadingPlanBj(sd);
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	public List<ArriveList> getArriveList(Map<String,Object> params){
		return mapper.getArriveList(params);
	}
	public int getXmbh(Map<String,Object> params){
		return mapper.getXmbh(params);
	}
	public List<TestMethod> getTestMethod(Map<String,Object> params){
		return mapper.getTestMethod(params);
	}
	public String BeforeSave(Map<String,Object> params){
		String ls_csbh = params.get("csbh").toString();
		String s_add = params.get("s_add").toString();
		JSONObject json=new JSONObject();
		json.put("bool", true);
		MaterialApply[] arr = null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
		    arr = (MaterialApply[])JSONArray.toArray(jsonArray,MaterialApply.class);
		}
		double s_wtdh,s_wtxh,s_sjsl,s_htbh,s_htxh,s_dhdh,s_dhxh;
		String s_ckbh,s_ckmc,s_csbh_mx,s_clmc;
		UUID uuid = UUID.randomUUID(); 
		String uuid1=uuid.toString().replace("-","");
		String wtdb = "wtdb"+uuid1;
		String sql1 = " select wtdh,wtxh,sjsl,htbh,htxh,dhdh,dhxh,ckbh into "+wtdb+" from wtjycssqclmxb where 0=1";
		params.put("sql", sql1);
		mapper.getStringFromSql(params);
		for(MaterialApply obj:arr){
			s_dhdh = obj.getDhdh();
			s_dhxh = obj.getDhxh();
			s_ckbh = obj.getCkbh();
			s_sjsl = obj.getSjsl();
			s_htbh = obj.getHtbh();
			s_htxh = obj.getHtxh();
			s_wtdh = obj.getWtdh();
			s_wtxh = obj.getWtxh();
			System.out.println(s_ckbh);
			if(s_ckbh==null||s_ckbh.equals("")){
				s_ckbh = " ";
			}
			sql1 = "insert "+wtdb+" (wtdh,wtxh,sjsl,htbh,htxh,dhdh,dhxh,ckbh) values ("+s_wtdh+","+s_wtxh+","+s_sjsl+","+s_htbh+","+s_htxh+","+s_dhdh+","+s_dhxh+",'"+s_ckbh+"')";
			params.put("sql", sql1);
			mapper.getStringFromSql(params);
		}
		for(MaterialApply obj:arr){
			s_dhdh = obj.getDhdh();
			s_dhxh = obj.getDhxh();
			s_ckbh = obj.getCkbh();
			if(s_ckbh==null||s_ckbh.equals("")){
				s_ckbh = " ";
			}
			s_ckmc = obj.getCkmc();
			s_wtdh = obj.getWtdh();
			s_wtxh = obj.getWtxh();
			sql1 = "select isnull(sum(sjsl),0) from "+wtdb+" where dhdh="+s_dhdh+" and dhxh="+s_dhxh+" and ckbh='"+s_ckbh+"';";
			params.put("sql", sql1);
			String sjsl = mapper.getStringFromSql(params);
			if(sjsl==null){
				s_sjsl = 0;
			}else{
				s_sjsl = Double.parseDouble(sjsl);
			}
			sql1 = "select top 1 csbh from dhdjb_yl where dhdh="+s_dhdh+" and dhxh="+s_dhxh+" and ckbh='"+s_ckbh+"';";
			params.put("sql", sql1);
			s_csbh_mx = mapper.getStringFromSql(params);
			if(!ls_csbh.equals(s_csbh_mx) && s_dhdh!=0 && !s_ckbh.equals("")){
				json.put("bool", false);
				json.put("msg",(int)s_wtxh+"送检号的厂商与上界面不一致!");
				params.put("sql","drop table "+wtdb);//删除临时表
				mapper.getStringFromSql(params);
				return json.toString();
			}
			if(s_add.equals("0")&&s_dhdh!=0){
				double s_sumsjsl=0;//已送检数量
				double s_alldhsl=0;//总共数量
				sql1 = "select isnull(sum(sjsl),0) from wtjycssqclmxb where dhdh="+s_dhdh+" and dhxh="+s_dhxh+" and ckbh='"+s_ckbh+"' and wtdh!="+s_wtdh+";";
				params.put("sql", sql1);
				String sum = mapper.getStringFromSql(params);
				if(sum!=null){
					s_sumsjsl=Double.parseDouble(sum);
				}
				sql1 = "select dhsl from dhdjb_yl where dhdh="+s_dhdh+" and dhxh="+s_dhxh+" and ckbh='"+s_ckbh+"';";
				params.put("sql", sql1);
				sum = mapper.getStringFromSql(params);
				if(sum!=null){
					s_alldhsl=Double.parseDouble(sum);
				}
				System.out.println(s_sumsjsl);
				System.out.println(s_sjsl);
				System.out.println(s_alldhsl);
				if(s_sumsjsl+s_sjsl>s_alldhsl){
					json.put("bool", false);
					json.put("msg","在"+s_ckmc+"中到货号为"+(int)s_dhdh+"-"+(int)s_dhxh+"的送检数量超过到货数量!");
					params.put("sql","drop table "+wtdb);//删除临时表
					mapper.getStringFromSql(params);
					return json.toString();
				}
			}
			if((s_add.equals("1") || s_add.equals("2"))&&s_dhdh!=0){
				double s_sumsjsl=0;//已送检数量
				double s_alldhsl=0;//总共数量
				sql1 = "select isnull(sum(sjsl),0) from wtjycssqclmxb where dhdh="+s_dhdh+" and dhxh="+s_dhxh+" and ckbh='"+s_ckbh+"';";
				params.put("sql", sql1);
				String sum = mapper.getStringFromSql(params);
				if(sum!=null){
					s_sumsjsl=Double.parseDouble(sum);
				}
				sql1 = "select dhsl from dhdjb_yl where dhdh="+s_dhdh+" and dhxh="+s_dhxh+" and ckbh='"+s_ckbh+"';";
				params.put("sql", sql1);
				sum = mapper.getStringFromSql(params);
				if(sum!=null){
					s_alldhsl=Double.parseDouble(sum);
				}
				System.out.println(s_sumsjsl);
				System.out.println(s_sjsl);
				System.out.println(s_alldhsl);
				if(s_sumsjsl+s_sjsl>s_alldhsl){
					json.put("bool", false);
					json.put("msg","在"+s_ckmc+"中到货号为"+(int)s_dhdh+"-"+(int)s_dhxh+"的送检数量超过到货数量!");
					params.put("sql","drop table "+wtdb);//删除临时表
					mapper.getStringFromSql(params);
					return json.toString();
				}
			}
			s_clmc = obj.getClmc();
			double ll_count=0;
			sql1 = "select count(*) from clbmb where clmc='"+s_clmc+"';";
			params.put("sql", sql1);
			String str = mapper.getStringFromSql(params);
			if(str!=null){
				ll_count=Double.parseDouble(str);
			}
			if(ll_count==0){
				json.put("bool", false);
				json.put("msg","该材料在材料档案中不存在,请重新选择!");
				params.put("sql","drop table "+wtdb);//删除临时表
				mapper.getStringFromSql(params);
				return json.toString();
			}
		}
		params.put("sql","drop table "+wtdb);//删除临时表
		mapper.getStringFromSql(params);
		return json.toString();
	}
	/**
	 * 
	* @Title: getTgb
	* @Description: TODO(测试标准函数获取返回参数)
	* @param @param params
	* @param @return    设定文件
	* @return Csjgxsj    返回类型
	* @throws
	 */
	public Csjgxsj getTgb(Map<String,Object> params){
		
		Csjgxsj a = new Csjgxsj();
			a = mapper.getTgb(params);
		System.out.println(a);	
		System.out.println(a==null);	
		if(a==null){
			a = mapper.getZeroTgb(params);
		}
		return a;
	}
	public int getCostCount(Map<String,Object> params){
		return mapper.getCostCount(params);
	}
	public List<InspectionWtbm> getWtbmList(Map<String,Object> params){
    	return mapper.getWtbmList(params);
	}
	public List<TreeModel> getWtbhTreeList(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<InspectionWtbm> list=getWtbmList(params);
		int lbjc=1;
		int parentId=0;
		if(params.get("node")!=null){
			 lbjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(InspectionWtbm sa:list) 
		{
			if(sa.getLbjc()==lbjc){
				TreeModel st=new TreeModel();										
				st.setNodeId(Integer.valueOf(sa.getLbbh().trim()));															
				st.setParentId(parentId);
				st.setText(sa.getLbmc());
				st.setLbbh(sa.getLbbh().trim());
				st.setLbmc(sa.getLbmc().trim());
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
		/*if(lbjc==1){
			TreeModel st=new TreeModel();
			st.setNodeId(-1);
			st.setParentId(0);
			st.setText("无类别");
			st.setLeaf("true");
			st.setExpanded("false");
			stlist.add(st);
		}*/
		return stlist;
	}
	
	public List<InspectionWareHouse> getWareHouseList(Map<String,Object> params) {
		return mapper.getWareHouseTrList(params);
	}
	public List<HouseTreeModel> getWareHouseTreeList(Map<String,Object> params) {
		List<HouseTreeModel> stlist=new ArrayList<HouseTreeModel>();
		List<InspectionWareHouse> list=getWareHouseList(params);
		int parentId=0;
		if(params.get("node")!=null){
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(InspectionWareHouse sa:list) 
		{
				HouseTreeModel st=new HouseTreeModel();
				st.setNodeId(sa.getCkbh());
				st.setParentId(parentId);
				st.setText(sa.getCkmc());
				st.setExpanded("false");
				st.setLeaf("true");
				st.setType("warehouse");
				stlist.add(st);
		}
		return stlist;
	}
	
	public double getJjdxs(Map<String,Object> params){
		return mapper.getJjdxs(params);
	}
}
