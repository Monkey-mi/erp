package erp.erp.master.purchaseDetail.service;


import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.FilterModel;
import erp.common.TreeModel;
import erp.erp.master.materialArchive.data.MaterialMapper;
import erp.erp.master.materialArchive.model.UserMaterial;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.master.purchaseDetail.model.AogBps;
import erp.erp.master.purchaseDetail.model.BomChangeSearch;
import erp.erp.master.purchaseDetail.model.ContractDetail;
import erp.erp.master.purchaseDetail.model.FunctionPurchaseCtl;
import erp.erp.master.purchaseDetail.model.MaterialCate;
import erp.erp.master.purchaseDetail.model.MaterialDetail;
import erp.erp.master.purchaseDetail.model.PlanCategory;
import erp.erp.master.purchaseDetail.model.Production;
import erp.erp.master.purchaseDetail.model.ProductionType;
import erp.erp.master.purchaseDetail.model.PurGroupMan;
import erp.erp.master.purchaseDetail.model.PurSupplierSearch;
import erp.erp.master.purchaseDetail.model.PurchaseDetail;
import erp.util.DateJsonValueProcessor;
import erp.util.DoubleCal;
import erp.util.MyJsonUtil;


@Service
public class PurchaseDetailService {
	@Autowired
	private PurchaseDetailMapper mapper;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购
	/**
	 * 刷新供应商
	 * Request purchasedetail/purchasedetail.act?method=getRefreshProvider  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-07-01
	 */
	@Transactional
	public String getRefreshProvider(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recstr=params.get("recstr").toString();
			List<PurchaseDetail> cds=MyJsonUtil.str2list(recstr, PurchaseDetail.class);
			for(PurchaseDetail cd:cds){
				params.put("sql","  select top 1 htbh  from htmxb with (nolock) where clhh= '"+cd.getClhh()+"' and cltx1='"+cd.getCltx1()+"' and cltx2='"+cd.getCltx2()+"' and cltx3='"+cd.getCltx3()+"' order by cgrq DESC; ");
				String htbh=purchaseDetailMapper.getStringFromSql(params);
				if(htbh==null){
					htbh="";
				}
				if(!htbh.equals("")){
					params.put("sql","  select csbh  from cghtb with (nolock) where htbh='"+htbh+"' ");
					String csbh=purchaseDetailMapper.getStringFromSql(params);
					params.put("sql","  select csmc  from csxxb with (nolock) where csbh='"+csbh+"' ");
					String csmc=purchaseDetailMapper.getStringFromSql(params);
					if(csbh==null){
						csbh="";
					}
					cd.setCsbh(csbh);
					cd.setCsmc(csmc);
					if(!csbh.equals("")){
						params.put("sql","  update cgjhmxb set csbh='"+csbh+"' where cgbh='"+cd.getCgbh()+"' and cgxh='"+cd.getCgxh()+"' ");
						purchaseDetailMapper.getStringFromSql(params);
					}
				}
			}
			json.put("cd", MyJsonUtil.getJSONString(cds));
		return json.toString();
	}
	/**
	 * 供应厂商查询
	 * Request purchasedetail/purchasedetail.act?method=getPurSupplierSearchList <br/><br/>
	 * Response {data:[{PurSupplierSearch}]} <br/><br/>
	 * @param PurSupplierSearch {@link paramMap}
	 */
	public List<PurSupplierSearch> getPurSupplierSearchList(Map<String,Object> params) {
		return mapper.getPurSupplierSearchList(params);
	}
	/**
	 * BOM更改查询
	 * Request purchasedetail/purchasedetail.act?method=getBomChangeSearchList <br/><br/>
	 * Response {data:[{BomChangeSearch}]} <br/><br/>
	 * @param BomChangeSearch {@link paramMap}
	 */
	public List<BomChangeSearch> getBomChangeSearchList(Map<String,Object> params) {
		return mapper.getBomChangeSearchList(params);
	}
	public List<AogBps> getAogBpsList(Map<String,Object> params) {
		return mapper.getAogBpsList(params);
	}
	/**
	 * 引用产品类别信息
	 * Request purchasedetail/purchasedetail.act?method=getProductionTypeTreeList <br/><br/>
	 * Response {data:[{PurGroupMan}]} <br/><br/>
	 * @param PurGroupMan {@link paramMap}
	 */
	public List<TreeModel> getProductionTypeTreeList(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		List<ProductionType> list=mapper.getProductionTypeList(params);
		for(ProductionType pt:list) 
		{
			TreeModel st=new TreeModel();
			st.setNodeId(Integer.valueOf(pt.getLbbh()));
			st.setParentId(Integer.valueOf(String.valueOf(params.get("node"))));
			st.setText(pt.getLbmc());
			st.setExpanded("false");
			if (pt.getMjbz()==0)
				st.setLeaf("false");
			else
				st.setLeaf("true");
			st.setType("salesarea");
			stlist.add(st);
		}
		return stlist;
	}
	/**
	 * 引用产品信息
	 * Request purchasedetail/purchasedetail.act?method=getProductionList <br/><br/>
	 * Response {data:[{PurGroupMan}]} <br/><br/>
	 * @param PurGroupMan {@link paramMap}
	 */
	public List<Production> getProductionList(Map<String,Object> params) {
		return mapper.getProductionList(params);
	}
	/**
	 * 引用采购组员
	 * Request purchasedetail/purchasedetail.act?method=getPurGroupManList <br/><br/>
	 * Response {data:[{PurGroupMan}]} <br/><br/>
	 * @param PurGroupMan {@link paramMap}
	 */
	public List<PurGroupMan> getPurGroupManList(Map<String,Object> params) {
		if(params.get("czy_gh")!=null){
			Map<String,Object> pa=new HashMap<String, Object>();
			pa.put("czy_gh", params.get("czy_gh"));
			String cgyqx="and (";
			List<String>  cgybhList=mapper.getBuyerNumList(pa);
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
			List<String>  jhlbList=mapper.getPanelAuthorityList(pa);
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
			List<String>  cgzhList=mapper.getBuyerAuthorityList(pa);
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
		return mapper.getPurGroupManList(params);
	}
	/**
	 * 材料编码查询
	 * Request purchasedetail/purchasedetail.act?method=******** <br/><br/>
	 * Response {data:[{MaterialDetail}]} <br/><br/>
	 * @param MaterialDetail {@link paramMap}
	 */
	public List<MaterialDetail> getMaterialDetailList(Map<String,Object> params) {
		return mapper.getMaterialDetailList(params);
	}
	/**
	 * 查找材料类别树
	 * Request purchasedetail/purchasedetail.act?method=getMaterialCateTreeList <br/><br/>
	 * Response {data:[{TreeModel}]} <br/><br/>
	 * @param TreeModel {@link paramMap}
	 */
	public List<TreeModel> getMaterialCateTreeList(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		int lbjc=1;
		int parentId=0;
		if(params.get("czy_gh")!=null){
			Map<String,Object> pa=new HashMap<String, Object>();
			pa.put("czy_gh", params.get("czy_gh"));
			String cgyqx="and (";
			List<String>  cgybhList=mapper.getBuyerNumList(pa);
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
			List<String>  jhlbList=mapper.getPanelAuthorityList(pa);
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
			List<String>  cgzhList=mapper.getBuyerAuthorityList(pa);
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
		List<MaterialCate> list=mapper.getMaterialCateList(params);
		try {
			if(params.get("node")!=null){
			 lbjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
			}
		for(MaterialCate sa:list) 
		{
			if(sa.getLbjc()==lbjc){
			TreeModel st=new TreeModel();
			st.setNodeId(Integer.valueOf(sa.getLbbh()));
			st.setParentId(parentId);
			st.setText(sa.getLbmc());
			if (sa.getMjbz()==0){
				st.setLeaf("false");
				st.setExpanded("false");
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
			TreeModel st=new TreeModel();
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
	/**
	* @Description: 采购计划明细合计信息
	* Request purchasedetail/purchasedetail.act?method=getPurchaseDetailCount
	* Response {data:[{List<PurchaseDetail>}]} <br/><br/>
	*/
	public List<PurchaseDetail> getPurchaseDetailCount(Map<String,Object> params) {
		//操作权限条件增加
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		String cgyqx="and (";
		List<String>  cgybhList=mapper.getBuyerNumList(pa);
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
		List<String>  jhlbList=mapper.getPanelAuthorityList(pa);
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
		List<String>  cgzhList=mapper.getBuyerAuthorityList(pa);
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
		
		//System.out.println(cgzh);
		
		//params.put("cgyqx",cgyqx );
		params.put("lbqx", lbqx);
		params.put("cgzqx", cgzh);
		
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
		return mapper.getPurchaseDetailCount(params);
	}
	@Autowired
	private MaterialMapper materialMapper;
	/**
	* @Description: 采购计划明细总表
	* Request purchasedetail/purchasedetail.act?method=getPurchaseDetailList
	* Response {data:[{List<PurchaseDetail>}]} <br/><br/>
	*/
	public List<PurchaseDetail> getPurchaseDetailList(Map<String,Object> params) {
		//操作权限条件增加
		Map<String,Object> pa=new HashMap<String, Object>();
		//采计材料类别权限
		List<UserMaterial> umList=materialMapper.getUserMaterialList(pa);
		if(umList.size()>0){
			String cllbqx="  (";
			int i=0;
			for(UserMaterial um:umList){
				String lbbh=um.getLbbh().trim();
					if(i==0){
						cllbqx+="(clbmb.lbbh='') or (clbmb.lbbh='"+lbbh+"')";
					}else{
						cllbqx+=" or (clbmb.lbbh='"+lbbh+"')";
					}
					i++;
				}
				cllbqx+=" )";
				params.put("cllbqx", cllbqx);
		}
		pa.put("czy_gh", params.get("czy_gh"));
		String cgyqx="and (";
		List<String>  cgybhList=mapper.getBuyerNumList(pa);
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
		List<String>  jhlbList=mapper.getPanelAuthorityList(pa);
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
		List<String>  cgzhList=mapper.getBuyerAuthorityList(pa);
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
		
		//System.out.println(cgzh);
		
		//params.put("cgyqx",cgyqx );
		params.put("lbqx", lbqx);
		params.put("cgzqx", cgzh);
		
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
		return mapper.getPurchaseDetailList(params);
	}
	
	
	/**
	* @Description: 获取计划类别树
	* @param params node 即计划编号
	* Request purchasedetail/purchasedetail.act?method=getPlanGategoryTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author 伍恰
	* @date 2016-1-20 
	*/
	public List<TreeModel> getPlanGategoryTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		int lbjc=1;
		int parentId=0;
		List<PlanCategory> list=mapper.getPlanCategoryList(params);
		
		if(params.get("node")!=null){
			lbjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(PlanCategory sa:list) 
		{
			if(sa.getLbjc()==lbjc){
				TreeModel st=new TreeModel();
				st.setNodeId(Integer.valueOf(sa.getLbbh()));
				st.setParentId(parentId);
				st.setText(sa.getLbmc());
				if (sa.getMjbz()==0){
					st.setLeaf("false");
					st.setExpanded("false");
				}
				else{
					st.setLeaf("true");
					st.setExpanded("true");
				}
				st.setType("plangategory");
				stlist.add(st);
			}
		}
		return stlist;
	}
	/**
	 * 批量修改
	 * Request purchasedetail/purchasedetail.act?method=getBatchChange  <br/><br/>
	 * @author wq
	 * @date 2016-03-12
	 */
	public String getBatchChange(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		mapper.getBatchChange(params);
		return json.toString();
	}
	/**
	 * 批量修改厂商
	 * Request purchasedetail/purchasedetail.act?method=getCsbhBatchChange  <br/><br/>
	 * @author wq
	 * @date 2016-03-12
	 */
	public String getCsbhBatchChange(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));
		String s_wbbh=null;
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		String recstr=params.get("recstr").toString();
		String s_csbh=params.get("csbh").toString();
		JSONArray array = JSONArray.fromObject(recstr);
		List<PurchaseDetail> cds=MyJsonUtil.str2list(recstr, PurchaseDetail.class);
		//PurchaseDetail cds[]=(PurchaseDetail [])JSONArray.toArray(array,PurchaseDetail.class);
			for(PurchaseDetail cd:cds){
				int s_cgbh,s_cgxh;
				String s_clhh;
				Date s_jhrq,s_sxrq,s_cgrq;
				double s_cgsl,s_cgtqq;
				
				s_cgbh=cd.getCgbh();
				s_cgxh=cd.getCgxh();
				s_clhh=cd.getClhh();
				s_cgsl=cd.getCgsl();
				s_jhrq=cd.getJhrq();
				s_sxrq=cd.getSxrq();
				s_cgtqq=cd.getCgtqq();
				
				FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
				params.put("sql","  select wbbh from csxxb where csbh = '"+s_csbh+"' ");
				s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				params.put("csbh", s_cgbh);
				params.put("clhh", s_clhh);
				params.put("cgsl", 0);
				params.put("wbbh", s_wbbh);
				List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
				if(fpcList.size()>0){
					fpc=fpcList.get(0);
				}
				Calendar rightNow = Calendar.getInstance();
				if(s_sxrq!=null){
					rightNow.setTime(s_sxrq);
					rightNow.add(Calendar.DAY_OF_YEAR,-(int)s_cgtqq);
					s_jhrq=rightNow.getTime();
				}else{
					s_jhrq=null;
				}
				if(s_jhrq!=null){
					rightNow.setTime(s_jhrq);
					rightNow.add(Calendar.DAY_OF_YEAR,-(int)fpc.getGhzq());
					s_cgrq=rightNow.getTime();
				}else{
					s_cgrq=null;
				}
				
				cd.setCsbh(s_csbh);
				cd.setWbbh(s_wbbh);
				cd.setCgdj(fpc.getCgdj());
				cd.setCgje(DoubleCal.round(fpc.getCgdj()*s_cgsl, 2));
				cd.setKzdj(fpc.getKzdj());
				cd.setGhzq(fpc.getGhzq());
				/*cd.setJhrq(s_jhrq);
				cd.setCgrq(s_cgrq);*/
				mapper.getCsbhBatchChange(cd);
			}
		return json.toString();
	}
	
	/**
	 * 批量分配
	 * Request purchasedetail/purchasedetail.act?method=getBatchChangeSpbj  <br/><br/>
	 * @author wq
	 * @date 2016-03-14
	 */
	public String getBatchChangeSpbj(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		mapper.getBatchChangeSpbj(params);
		return json.toString();
	}
	
	/**
	 * 批量中止
	 * Request purchasedetail/purchasedetail.act?method=getBatchChangeZzbj  <br/><br/>
	 * @author wq
	 * @date 2016-03-14
	 */
	public String getBatchChangeZzbj(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		mapper.getBatchChangeZzbj(params);
		mapper.getChangeWcbj(params);
		return json.toString();
	}
	
	/**
	 * 批量有误
	 * Request purchasedetail/purchasedetail.act?method=getBatchChangeYwbj  <br/><br/>
	 * @author wq
	 * @date 2016-03-14
	 */
	public String getBatchChangeYwbj(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
				mapper.getBatchChangeYwbj(params);
				int state=Integer.parseInt(params.get("state").toString());
				if(state==0){
					mapper.getPurChangeQfbj(params);
				}
		return json.toString();
	}
}
