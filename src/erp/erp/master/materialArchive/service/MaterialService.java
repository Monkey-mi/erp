package erp.erp.master.materialArchive.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.FilterModel;
import erp.erp.master.materialArchive.data.MaterialMapper;
import erp.erp.master.materialArchive.model.CtrlPrice;
import erp.erp.master.materialArchive.model.HisPrice;
import erp.erp.master.materialArchive.model.Jldw;
import erp.erp.master.materialArchive.model.Material;
import erp.erp.master.materialArchive.model.MaterialTree;
import erp.erp.master.materialArchive.model.Plan;
import erp.erp.master.materialArchive.model.PriceParameter;
import erp.erp.master.materialArchive.model.Product;
import erp.erp.master.materialArchive.model.Rule;
import erp.erp.master.materialArchive.model.UserMaterial;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.master.purchaseDetail.model.MaterialCate;
import erp.util.MyJsonUtil;


@Service
public class MaterialService {
	@Autowired
	private MaterialMapper mapper;


	public List<Material> getMaterialList(Map<String,Object> params) {
		String filterStr=params.get("filter")==null?"":params.get("filter").toString();
		String filterSearch="";
		List<FilterModel> filterList=new ArrayList<FilterModel>();
		if(!filterStr.equals("")){
			filterList=MyJsonUtil.str2list(filterStr, FilterModel.class);
		}
		if(filterList!=null){
			filterSearch=MyJsonUtil.FilterListToString(filterList);
		}
		if(!filterSearch.equals("")){
			params.put("filterSearch", filterSearch);
		}
		return mapper.getMaterialList(params);
	}
	public List<Product> getProductList(Map<String,Object> params) {
		return mapper.getProductList(params);
	}
	public List<Jldw>getJldwList(Map<String,Object> params){
		return mapper.getJldwList(params);
	}
	public List<Rule>getRuleList(Map<String,Object> params){
		return mapper.getRuleList(params);
	}
	public List<Plan> getPlanList(Map<String,Object> params) {
		return mapper.getPlanList(params);
	}
	public List<CtrlPrice> getCtrlPriceList(Map<String,Object> params) {
		return mapper.getCtrlPriceList(params);
	}
	public List<HisPrice> getHisPriceList(Map<String,Object> params) {
		return mapper.getHisPriceList(params);
	}
	public List<PriceParameter> getJgcsList(Map<String,Object> params) {
		return mapper.getJgcsList(params);
	}
	public void addMaterial(Material[] arr) {
		for(Material obj: arr) {
			mapper.addMaterial(obj);
		}
	}
	public void addJgcs(PriceParameter[] arr) {
		for(PriceParameter obj: arr) {
			mapper.addJgcs(obj);
		}
	}
	public int getMaxjlxh(Map<String,Object> params){
		return mapper.getMaxjlxh(params);
	}
	public void updateMaterial(Material[] arr) {
		for(Material obj: arr) {
			mapper.updateMaterial(obj);
		}
	}
	public void updateJgcs(PriceParameter[] arr) {
		for(PriceParameter obj: arr) {
			mapper.updateJgcs(obj);
		}
	}
	public void deleteMaterial(Material[] arr) {
		for(Material obj: arr) {
			mapper.deleteMaterial(obj);
		}
	}
	public void deleteJgcs(PriceParameter[] arr) {
		for(PriceParameter obj: arr) {
			mapper.deleteJgcs(obj);
		}
	}
	//同一厂商不能有多个价格参数
    public int getCount(Map<String,Object> params){
    	return mapper.getCount(params);
    }
	//审批
	public void doAppro(Map<String,Object> params){
		String recordData=null;
		Material arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(Material [])JSONArray.toArray(jsonArray,Material.class);
			int spbj  = arr[0].getSpbj();
			if(spbj==1){
				params.put("spbj", 0);
			}else{
				params.put("spbj", 1);
			}
			for(Material ps:arr){
				params.put("clhh", ps.getClhh());
				mapper.doAppro(params);
			}
		
	}
	public List<UserMaterial> getUserMaterialList(Map<String,Object> params){
	    	return mapper.getUserMaterialList(params);
	    }
	public void addUserMaterial(UserMaterial[] arr){
		for(UserMaterial obj : arr){
			mapper.addUserMaterial(obj);
		}
	}
	public void deleteUserMaterial(UserMaterial[] arr){
		for(UserMaterial obj : arr){
			mapper.deleteUserMaterial(obj);
		}
	}
	/**
	 * 查找材料类别树
	 * Request purchasedetail/purchasedetail.act?method=getMaterialCateTreeList <br/><br/>
	 * Response {data:[{MaterialTree}]} <br/><br/>
	 * @param MaterialTree {@link paramMap}
	 */
	@Autowired
	private PurchaseDetailMapper pdmapper;
	public List<MaterialTree> getMaterialCateTreeList(Map<String,Object> params) {
		List<MaterialTree> stlist=new ArrayList<MaterialTree>();
		int lbjc=1;
		int parentId=0;
		if(params.get("czy_gh")!=null){
			Map<String,Object> pa=new HashMap<String, Object>();
			pa.put("czy_gh", params.get("czy_gh"));
			String cgyqx="and (";
			List<String>  cgybhList=pdmapper.getBuyerNumList(pa);
				int i=0;
				if(cgybhList.size()>0){
					for(String str:cgybhList){
						if(i==0){
							cgyqx+=" (cgjhmxb.cgym='') or (cgjhmxb.cgym='"+str.trim()+"')";
						}else{
							cgyqx+=" or (cgjhmxb.cgym='"+str.trim()+"')";
						}
						i++;
					}
				}else{
					cgyqx+="cgjhmxb.cgym='' ";
				}
				//System.out.println(cgyqx);
			cgyqx+=")";
			
			i=0;
			String lbqx="and (";
			List<String>  jhlbList=pdmapper.getPanelAuthorityList(pa);
			if(jhlbList.size()>0){
				for(String str:jhlbList){
					if(i==0){
						lbqx+="(cgjhb.jhlb='') or (left(cgjhb.jhlb,len('"+str.trim()+"'))='"+str.trim()+"')";
					}else{
						lbqx+=" or (left(cgjhb.jhlb,len('"+str.trim()+"'))='"+str.trim()+"')";
					}
					i++;
				}
			}else{
				lbqx+="(1=0)";
			}
			lbqx+=")";
			//System.out.println(lbqx);
			
			i=0;
			String cgzh="and (";
			List<String>  cgzhList=pdmapper.getBuyerAuthorityList(pa);
			if(cgzhList.size()>0){
				for(String str:cgzhList){
					if(i==0){
						cgzh+="(cgjhmxb.cgzh='') or (cgjhmxb.cgzh='"+str.trim()+"')";
					}else{
						cgzh+=" or (cgjhmxb.cgzh='"+str.trim()+"')";
					}
					i++;
				}
			}else{
				cgzh+="(1=0)";
			}
			cgzh+=")";
			params.put("lbqx", lbqx);
			params.put("cgzqx", cgzh);
		}
		List<MaterialCate> list=pdmapper.getMaterialCateList(params);
		try {
			if(params.get("node")!=null){
			 lbjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
			}
		for(MaterialCate sa:list) 
		{
			if(sa.getLbjc()==lbjc){
			MaterialTree st=new MaterialTree();
			st.setNodeId(Integer.valueOf(sa.getLbbh()));
			st.setParentId(parentId);
			st.setText(sa.getLbmc());
			if (sa.getMjbz()==0){
				st.setLeaf("false");
				st.setExpanded("true");
			}
			else{
				st.setLeaf("true");
				st.setExpanded("true");
			}
			st.setType("MaterialCate");
			stlist.add(st);
		}
		}
		if(lbjc==1){
			MaterialTree st=new MaterialTree();
			st.setNodeId(-1);
			st.setParentId(0);
			st.setText("无类别");
			st.setLeaf("true");
			st.setExpanded("false");
			stlist.add(st);
		}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return stlist;
	}
}
