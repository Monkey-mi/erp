package erp.erp.arrivalRegister.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import erp.common.FilterModel;
import erp.erp.arrivalRegister.data.ArrivalRegisterMapper;
import erp.erp.arrivalRegister.data.ContractImpMapper;
import erp.erp.arrivalRegister.data.DhztbMapper;
import erp.erp.arrivalRegister.data.GoodsAllocationMapper;
import erp.erp.arrivalRegister.data.OutSideImpMapper;
import erp.erp.arrivalRegister.data.PlanImpMapper;
import erp.erp.arrivalRegister.data.WarehouseMapper;
import erp.erp.arrivalRegister.model.ArrivalRegister;
import erp.erp.arrivalRegister.model.Bzxssx;
import erp.erp.arrivalRegister.model.ContractImp;
import erp.erp.arrivalRegister.model.Dhztb;
import erp.erp.arrivalRegister.model.GoodsAllocation;
import erp.erp.arrivalRegister.model.OutSideImp;
import erp.erp.arrivalRegister.model.PlanImp;
import erp.erp.arrivalRegister.model.RkdList;
import erp.erp.arrivalRegister.model.Warehouse;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.util.MyJsonUtil;

@Lazy
@Service
public class ArrivalRegisterService {
	@Autowired
	private ArrivalRegisterMapper mapper;
	@Autowired
	private WarehouseMapper wmapper;
	@Autowired
	private DhztbMapper dmapper;
	@Autowired
	private GoodsAllocationMapper gmapper;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;
	@Autowired
	private ContractImpMapper contractimpmapper;
	@Autowired
	private PlanImpMapper  planimpmapper;
	@Autowired
	private OutSideImpMapper outsideimpmapper;
	public List<OutSideImp> getOutSideImpList(Map<String,Object> params){
		if(params.containsKey("jhh")){
			String jhh = params.get("jhh").toString();
	      	if(!jhh.trim().equals("")){
			if(jhh.contains("-")){
				String jhbh = jhh.substring(0,jhh.indexOf("-"));
				String jhxh = jhh.substring(jhh.indexOf("-")+1,jhh.length());
				String s1 = "wxtzdmxb.jhbh = " + jhbh + " and wxtzdmxb.jhxh = " + jhxh;
			    params.put("s1", s1);
			}else{
	      	    String s1 = "left(wxtzdmxb.jhbh,"+jhh.length()+") = " + jhh;
	      	    params.put("s1", s1);
			}
		   }
	      }	
		if(params.containsKey("wxh")){
			String wxh = params.get("wxh").toString();
	      	if(!wxh.trim().equals("")){
			if(wxh.contains("-")){
				String wxdh = wxh.substring(0,wxh.indexOf("-"));
				String wxxh = wxh.substring(wxh.indexOf("-")+1,wxh.length());
				String s2 = "wxtzdmxb.wxdh = " + wxdh + " and wxtzdmxb.wxxh = " + wxxh;
			    params.put("s2", s2);
			}else{
	      	    String s2 = "left(wxtzdmxb.wxdh,"+wxh.length()+") = " + wxh;
	      	    params.put("s2", s2);
			}
		   }
	      }	
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
		return  outsideimpmapper.getOutSideImpList(params);
	}
	public List<PlanImp> getPlanImpList(Map<String,Object> params){
		if(params.containsKey("jhh")){
		String jhh = params.get("jhh").toString();
      	if(!jhh.trim().equals("")){
		if(jhh.contains("-")){
			String jhbh = jhh.substring(0,jhh.indexOf("-"));
			String jhxh = jhh.substring(jhh.indexOf("-")+1,jhh.length());
			String s1 = "jhmxb.jhbh = " + jhbh + " and jhmxb.jhxh = " + jhxh;
		    params.put("s1", s1);
		}else{
      	    String s1 = "left(jhmxb.jhbh,"+jhh.length()+") = " + jhh;
      	    params.put("s1", s1);
		}
	   }
      }	
		return planimpmapper.getPlanImpList(params);
	}
	public List<ContractImp> getContractImpList(Map<String,Object> params){
		if(params.containsKey("jhh")){
			String jhh = params.get("jhh").toString();
	      	if(!jhh.trim().equals("")){
			if(jhh.contains("-")){
				String jhbh = jhh.substring(0,jhh.indexOf("-"));
				String jhxh = jhh.substring(jhh.indexOf("-")+1,jhh.length());
				String s1 = "jhmxb.jhbh = " + jhbh + " and jhmxb.jhxh = " + jhxh;
			    params.put("s1", s1);
			}else{
	      	    String s1 = "left(jhmxb.jhbh,"+jhh.length()+") = " + jhh;
	      	    params.put("s1", s1);
			}
		   }
	      }	
		if(params.containsKey("hth")){
			String hth = params.get("hth").toString();
			if(!hth.trim().equals("")){
				if(hth.contains("-")){
					String htbh = hth.substring(0,hth.indexOf("-"));
					String htxh = hth.substring(hth.indexOf("-")+1,hth.length());
					String s2 = "htmxb.htbh = "+ htbh + " and htmxb.htxh = "+ htxh;
					params.put("s2", s2);
				}else{
					String s2 = "left(htmxb.htbh,"+hth.length()+") = " + hth;
					params.put("s2", s2);
				}
			}
		}
		return contractimpmapper.getContractImpList(params);
	}
	public String getHsbm(Map<String,Object> params){
		return contractimpmapper.getHsbm(params);
	}
	public List<ArrivalRegister> getArrivalRegisterList(Map<String,Object> params) {
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
		return mapper.getArrivalRegisterList(params);
	}
	public List<ArrivalRegister> getSumArrivalRegister(Map<String,Object> params) {
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
		return mapper.getSumArrivalRegister(params);
	}
	public List<RkdList> getRkdList(Map<String,Object> params) {
		return mapper.getRkdList(params);
	}
	public List<ArrivalRegister> getDhdjb(Map<String,Object> params) {
		return mapper.getDhdjb(params);
	}
	public void addArrivalRegister(ArrivalRegister[] arr) {
		int maxdhdh = mapper.getMaxdhdh();
		for(ArrivalRegister obj: arr) {
			obj.setDhdh(maxdhdh);
			mapper.addArrivalRegister(obj);
		}
	}
	public void updateArrivalRegister(ArrivalRegister[] arr) {
		for(ArrivalRegister obj: arr) {
			mapper.updateArrivalRegister(obj);
		}
	}
	public void deleteArrivalRegister(ArrivalRegister[] arr) {
		for(ArrivalRegister obj: arr) {
			mapper.deleteArrivalRegister(obj);
		}
	}
	public List<Warehouse> getWarehouseList(Map<String,Object> params){
		return wmapper.getWarehouseList(params);
	}
	/*//取到货单号
	public double getMaxdhdh(Map<String,Object> params){
		return mapper.getMaxdhdh(params);
	}*/
	public int getHxbj(Map<String,Object> params){
		return mapper.getHxbj(params);
	}
	public int getGltk(Map<String,Object> params){
		return mapper.getGltk(params);
	}
	//判断是否有对应ICQ
	public int getICQ(Map<String,Object> params){
		return mapper.getICQ(params);
	}
	public double getThdh(Map<String,Object> params){
		params.put("sql","select isnull(max(thdh),0)+1  from dhdjb_yl" );
		return mapper.getdoubleFromSql(params);
	}
	//退货
	public String doReturnGoods(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		ArrivalRegister[] arr=null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (ArrivalRegister[])JSONArray.toArray(jsonArray,ArrivalRegister.class);
		        for(ArrivalRegister obj:arr){
		    	params.put("dhdh", obj.getDhdh());
		    	params.put("dhxh", obj.getDhxh());
		        int ztbj = mapper.getZtbj(params);
		        if(ztbj == 5){
		        	mapper.updateZtbj(params);
		        }
		    }
		}
		  return json.toString();
	}
	
	//中止货单
	public String StopList(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		ArrivalRegister[] arr=null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (ArrivalRegister[])JSONArray.toArray(jsonArray,ArrivalRegister.class);
		       for(ArrivalRegister obj:arr){
		    		params.put("ckbh",obj.getCkbh());  
		    		params.put("dhdh",obj.getDhdh());  
		    		params.put("dhxh",obj.getDhxh());  
		    		mapper.StopList(params);
		    	  }
		}
		 return json.toString();
	}
	
	//到货状态刷新
	public String RefStatus(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		ArrivalRegister[] arr=null;
		Dhztb a = new Dhztb();
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (ArrivalRegister[])JSONArray.toArray(jsonArray,ArrivalRegister.class);
			for(ArrivalRegister obj:arr){
				 a.setCkbh(obj.getCkbh());
				 a.setDhdh(obj.getDhdh());
				 a.setDhxh(obj.getDhxh());
				 dmapper.updateDhdh(a);
			 }
		}
		 return json.toString();
	}
	//更新入库时间
	public String TimeRefresh(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		ArrivalRegister[] arr=null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (ArrivalRegister[])JSONArray.toArray(jsonArray,ArrivalRegister.class);
				for(ArrivalRegister obj:arr){
					params.put("dhdh", obj.getDhdh());
					params.put("dhxh", obj.getDhxh());
					Date rksj = mapper.getRksj(params);
					Date sdsj = mapper.getSdsj(params);
					params.put("rksj", rksj);
					params.put("sdsj", sdsj);
					mapper.updateRkTime(params);
				}
		}
		return json.toString();
		
	}
	//检测
	public String CheckBeforeSave(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		ArrivalRegister[] arr=null;
		/*ArCsbh arcsbh = new ArCsbh();*/
		/*ArDhsl ardhsl = new ArDhsl();*/
	    /*ArJhbh arjhbh =  new ArJhbh();*/
		Map<String,Double> ajhbh = new HashMap<String, Double>();
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (ArrivalRegister[])JSONArray.toArray(jsonArray,ArrivalRegister.class);
		    double wxdh; String jhlb;int scount;String scsbh;
		    double htbhold=arr[0].getHtbh();double lljhsl,lldhslqt,lldhslbc;
			double htbh; double htxh; double dhsl;
			int count=0;int cgbj; double jhbh,jhxh,dhxh,dhdh; String clhh,ckbh;int cscount;
			//判断表##csbh是否存在,存在则删除	
			/*params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##csbh' and type='U';");
			String  cStr= purchaseDetailMapper.getStringFromSql(params);
    		if(cStr==null){
				count=0;
			}else{
				count=Integer.parseInt(cStr);
			}
    		if(count>0){
			params.put("createsql", "drop table ##csbh");
			mapper.createTableSql(params);}*/
			UUID uuid = UUID.randomUUID(); 
     		String uuid1=uuid.toString().replace("-","");
     		String csbhb = "csbhb"+uuid1;
     		String jhbhb = "jhbhb"+uuid1;
     		String dhslb = "dhslb"+uuid1;
			params.put("createsql", "select htbh,csbh into "+csbhb+" from cghtb where 0=1");
			mapper.createTableSql(params);
			String  cStr="";
			/*params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##jhbh' and type='U';");
			cStr= purchaseDetailMapper.getStringFromSql(params);
    		if(cStr==null){
				count=0;
			}else{
				count=Integer.parseInt(cStr);
			}
    		if(count>0){
			params.put("createsql", "drop table ##jhbh");
			mapper.createTableSql(params);}*/
			params.put("createsql", " select jhbh,jhxh,dhsl into "+jhbhb+" from dhdjb_yl where 0=1 ");
			mapper.createTableSql(params);
			
			/*params.put("sql", "select COUNT(*) from   tempdb..sysobjects where name='##dhsl' and type='U';");
			cStr= purchaseDetailMapper.getStringFromSql(params);
    		if(cStr==null){
				count=0;
			}else{
				count=Integer.parseInt(cStr);
			}
    		if(count>0){
			params.put("createsql", "drop table ##dhsl");
			mapper.createTableSql(params);}*/
			params.put("createsql", "select htbh,htxh,clhh,dhsl into "+dhslb+" from dhdjb_yl where 0=1");
			mapper.createTableSql(params);
		    	for(ArrivalRegister obj:arr){
		    		wxdh = obj.getWxdh();
		    		htbh = obj.getHtbh();
		    		htxh = obj.getHtxh();
		    		dhsl = obj.getDhsl();
		    		jhbh = obj.getJhbh();
		    		jhxh = obj.getJhxh();
		    		dhxh = obj.getDhxh();
		    		clhh = obj.getClhh();
		    		dhdh = obj.getDhdh();
		    		ckbh = obj.getCkbh();
		    		if(wxdh!=0 && wxdh!=0){
		    		params.put("wxdh", wxdh);
		    		params.put("ckbh", ckbh);
		    		jhlb = mapper.getJhlb(params);
		    		params.put("jhlb", jhlb);
		    		scount = mapper.getCkmcb(params);
		    		if(scount<=0){
		    			json.put("bool", false);
					    json.put("msg", (int)dhxh+"号外协单号的核算部门与该仓库核算部门不一致!");
					    return json.toString();
		    		  }
		    		}
		    		//检测材料编号
		    		params.put("htbh",htbh );
		    		params.put("jhxh",jhxh );
		    		params.put("jhbh",jhbh );
		    		params.put("clhh",clhh );
		    		params.put("dhdh",obj.getDhdh() );
		    		if(htbh!=0){	
		    		 scsbh = mapper.getsCsbh(params);
		    		 if(!obj.getCsbh().equals(scsbh)){
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号对应的合同的厂商跟到货单的厂商不同!");
						return json.toString();
		    		 } 
		    		 params.put("insertsql","insert into "+csbhb+"(htbh,csbh) values ("+htbh+",'"+scsbh+"');");
		    		 mapper.insertSql(params);
		    		}
		    		params.put("insertsql","insert into "+dhslb+"(htbh,htxh,clhh,dhsl) values("+htbh+","+htxh+",'"+clhh+"',"+dhsl+");");
		    		 mapper.insertSql(params);
		    		if(htbhold==0){
		    			if(htbh!=0 && htbh!=0){
		    				json.put("bool", false);
							json.put("msg", (int)dhxh+"号与第一行的来源性质不一致（合同号）");
							return json.toString();
		    			}
		    	    }else if(htbh==0||htbh==0){
	    				    json.put("bool", false);
						    json.put("msg", (int)dhxh+"号与第一行的来源性质不一致（合同号）");		    			
						    return json.toString();
		    	    }
		    		
		    		if(htbh==0&&obj.getWxdh()==0&&jhbh!=0){
		    			params.put("insertsql","insert into "+jhbhb+"(jhbh,jhxh,dhsl) values("+jhbh+","+jhxh+","+dhsl+");");//只判断只有计划号的记录
			    		mapper.insertSql(params);
                        ajhbh.put("jhbh", jhbh);
                        ajhbh.put("jhxh", jhxh);
                        ajhbh.put("dhsl", dhsl);
		    			lljhsl = mapper.getllJhsl(params);
		    			lldhslqt = mapper.getllDhslqt(params);
		    			/*lldhslbc = mapper.getllDhslbc(params);*/
		    			params.put("sql","select isnull(sum(dhsl),0)  from "+jhbhb+" where jhbh="+jhbh+" and jhxh="+jhxh+";");
		    			cStr= purchaseDetailMapper.getStringFromSql(params);
		    			if(cStr==null){
		    				lldhslbc=0;
		    			}else{
		    				lldhslbc=Double.parseDouble(cStr);
		    			}
		    			String ll_lbbh;
		    			double ll_clbl;
		    			params.put("sql","select lbbh from clbmb where clhh='"+clhh+"';");
		    			ll_lbbh = purchaseDetailMapper.getStringFromSql(params);
		    			params.put("sql","select clbl  from cllbb where lbbh="+ll_lbbh+";");
		    			cStr= purchaseDetailMapper.getStringFromSql(params);
		    	    	if(cStr==null){
		    	    		ll_clbl=0;
		    			}else{
		    				ll_clbl=Double.parseDouble(cStr);
		    			}
		    			
/*		    			params.put("sql", "select isnull(sum(dhsl),0) from #jhbh where jhbh='"+jhbh+"' and jhxh='"+jhxh+"'");
		    			String  jhbhStr= purchaseDetailMapper.getStringFromSql(params);
		    			if(jhbhStr==null){
		    				lldhslbc=0;
						}else{
							lldhslbc=Double.parseDouble(jhbhStr);
						}*/
		    			if((Math.round(lldhslqt*10)/10.000000+Math.round(lldhslbc*10)/10.000000) > Math.round(lljhsl*(1+ll_clbl)*10)/10.000000){
		    				json.put("bool", false);
							json.put("msg", (int)dhxh+"号单据形成，到货数量将大于计划数量*(1+材料超入比例:'"+ll_clbl+"'!");
							return json.toString();
		    			}
		    		}
		    		if(obj.getZjbj()==0){
		    			json.put("bool", false);
						json.put("msg", "免检的材料不能输入到到货登记表中，请直接输入入库单！");
						return json.toString();
		    		}
		    		if(clhh.trim().equals("")){
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号单据的材料名称为空!");
						return json.toString();
		    		}
		    		params.put("sql","select count(*) from clbmb where clhh='"+clhh+"'");
		    		String  countStr= purchaseDetailMapper.getStringFromSql(params);
		    		if(countStr==null){
						count=0;
					}else{
						count=Integer.parseInt(countStr);
					}
		    		if(count<=0){
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号单据的材料不存在!");
						return json.toString();
		    		}
		    		if(dhsl==0){
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号单据到货数量不能为0!");
						return json.toString();
		    		}
		    		if(obj.getFzsl()<0){
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号单据辅助数量小于0!");
						return json.toString();
		    		}
		    		params.put("sql","select cgbj  from clbmb where clhh='"+clhh+"'");
		    		String  countStra= purchaseDetailMapper.getStringFromSql(params);
		    		if(countStra==null){
						cgbj=0;
					}else{
						cgbj=Integer.parseInt(countStra);
					}
		    		if(obj.getWxbj()==0){
		    			if(cgbj==1&&htbh==0){
		    				json.put("bool", false);
							json.put("msg", (int)dhxh+"号单据材料有合同标记，必须输入合同号!");
							return json.toString();
		    			}
		    		}else if(obj.getWxdh()!=0&&obj.getWxxh()!=0){
		    			params.put("sql","select wxtzdmxb.clhh  from wxtzdmxb where wxtzdmxb.wxdh='"+wxdh+"' and wxtzdmxb.wxxh='"+obj.getWxxh()+"'");
		    			String s_clhh1 = purchaseDetailMapper.getStringFromSql(params);
		    			if(!clhh.equals(s_clhh1)){
		    				json.put("bool", false);
							json.put("msg", (int)dhxh+"号单据的材料与外协通知单中材料不一致!");
							return json.toString();
		    			}
		    		}else {
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号单据的材料有外协标记，必须输入外协号!");
						return json.toString();
		    		}
		    		if(htbh!=0&&htxh!=0){
		    			params.put("sql","select clhh from htmxb with (nolock) where htbh='"+htbh+"' and htxh='"+htxh+"';");
		    		    String clhh1 = purchaseDetailMapper.getStringFromSql(params);
		    		   
		    		    if(!clhh.equals(clhh1)){
		    		    	json.put("bool", false);
							json.put("msg", (int)dhxh+"号单据的材料与合同中材料不一致!");
							return json.toString();
		    		    }
		    		    //检测合同是否已签发，未签发不可输到到货单
		    		    int qfbj;
		    		    params.put("sql", "select qfbj from cghtb with (nolock) where cghtb.htbh='"+htbh+"'");
		    		    String restr = purchaseDetailMapper.getStringFromSql(params);
		    		    if(restr==null){
							qfbj=0;
						}else{
							qfbj=Integer.parseInt(restr);
						}
		    		    if(qfbj==0){
		    		    	json.put("bool", false);
							json.put("msg", (int)dhxh+"号单据的材料的合同未签发，不可输入到货单!");
							return json.toString();
		    		    }
		    		}
		    		double fzsl = obj.getFzsl();
		    		int fzzbj;
		    		params.put("sql","select fzzbj  from clbmb where clhh='"+clhh+"'");
		    		String fstr = purchaseDetailMapper.getStringFromSql(params);
		    		if(fstr==null){
						fzzbj=0;
					}else{
						fzzbj=Integer.parseInt(fstr);
					}
		    		if(fzzbj==0&&fzsl!=0){
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号到货单的辅助数量应为0!");
						return json.toString();
		    		}
		    		if(fzsl!=0 && dhsl==0){
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号单据存在辅助数量，到货数量不应为0!");
						return json.toString();
		    		}
		    		if(fzzbj!=0 && dhsl>0 && fzsl==0){
		    			json.put("bool", false);
						json.put("msg", (int)dhxh+"号到货单的辅助数量与主计量不匹配，请调整!");
						return json.toString();
		    		}
		    		Bzxssx ap=  mapper.getBzxssx(params);
		    		fzzbj = ap.getFzzbj();
		    		int bzxssx = (int)ap.getBzxssx();
		    		int bzxsxx = (int)ap.getBzxsxx();
		    		if(fzzbj==5 || fzzbj==6){
		    		   if(bzxssx>0&&bzxsxx>0){
		    			   if(!((Math.round(Math.abs(fzsl)*10)/10.0000)<(Math.round(Math.abs(dhsl/bzxsxx)*10)/10.0000)&&(Math.round(Math.abs(fzsl)*10)/10.0000)>(Math.round(Math.abs(dhsl/bzxssx)*10)/10.0000))){
		    				    json.put("bool", false);
								json.put("msg", (int)dhxh+"号到货单的主辅计量单位数量换算超出标准系数范围！");
								return json.toString();
		    			   }
		    		   }
		    		   if(bzxssx>0 && bzxsxx==0){
		    			   if(!((Math.round(Math.abs(fzsl)*10)/10.0000)>=(Math.round(Math.abs(dhsl/bzxssx))*10)/10.0000)){
		    				   json.put("bool", false);
							   json.put("msg", (int)dhxh+"号到货单的主辅计量单位数量换算超出标准系数上限范围！");
							   return json.toString();
		    			   }
		    		   }
		    		   if(bzxssx==0 && bzxsxx>0){
		    			   if(!(Math.round(Math.abs(fzsl)*10)/10.0000<=Math.round(Math.abs(dhsl/bzxssx)*10)/10.0000)){
		    				   json.put("bool", false);
							   json.put("msg", "主辅计量单位数量换算超出标准系数下限范围！");
							   return json.toString();
		    			   }
		    		   }
		    	    }
		    		params.put("sql","select count(*) from (select distinct csbh from "+csbhb+" where isnull(htbh,0)!=0 and isnull(csbh,'')!='') a;");
		    		String csfstr = purchaseDetailMapper.getStringFromSql(params);
		    		if(csfstr==null){
		    			cscount=0;
					}else{
						cscount=Integer.parseInt(csfstr);
					}
		    		if(cscount>1){
		    			   json.put("bool", false);
						   json.put("msg", "同一到货单合同对应的厂商必须相同!");
						   return json.toString();
		    		}
		    		double ll_clbl=0;
		    		String ll_lbbh = "";
		    		double ll_zxbzl=0;
		    		double f_ydsl=0;
		    		double f_ytsl=0;
		    		double f_cgsl=0;
		    		if(htbh!=0 && htxh!=0){
		    		params.put("sql","select lbbh  from clbmb where clhh='"+clhh+"';");
		    		String str = purchaseDetailMapper.getStringFromSql(params);
		    		if(str!=null){
		    			ll_lbbh = str;
		    		}
		    		params.put("sql","select clbl  from cllbb where lbbh='"+ll_lbbh+"';");
		    		str = purchaseDetailMapper.getStringFromSql(params);
		    		if(str!=null){
		    			ll_clbl = Double.parseDouble(str);
		    		}
		    		params.put("sql","select zxbzl  from clbmb where clhh='"+clhh+"';");
		    		str = purchaseDetailMapper.getStringFromSql(params);
		    		if(str!=null){
		    			ll_zxbzl = Double.parseDouble(str);
		    		}
		    		params.put("sql","select sum(dhsl)  from dhdjb_yl where htbh="+htbh+" and htxh="+htxh+" and ztbj!=2;");
		    		str = purchaseDetailMapper.getStringFromSql(params);
		    		if(str!=null){
		    			f_ydsl = Double.parseDouble(str);
		    		}
		    		//入库单的退货数量
		    		params.put("sql","select sum(rksl)  from rkdb_yl where htbh="+htbh+" and htxh="+htxh+" and (rklb=2 or rklb=3);");
		    		str = purchaseDetailMapper.getStringFromSql(params);
		    		if(str!=null){
		    			f_ytsl = Double.parseDouble(str);
		    		}
		    		f_ydsl+=f_ytsl;
		    		params.put("sql","select cgsl  from htmxb where htbh="+htbh+" and htxh="+htxh+";");
		    		str = purchaseDetailMapper.getStringFromSql(params);
		    		if(str!=null){
		    			f_cgsl = Double.parseDouble(str);
		    		}
		    		String s_add = (String) params.get("s_add");
		    		if(s_add=="true"){
		    			if(Math.round((f_ydsl+dhsl)*10)/10.000>Math.round((f_cgsl*(1+ll_clbl)+ll_zxbzl)*10)/10.000){
		    				json.put("bool", false);
							json.put("msg", "材料货号"+clhh+"有合同标记，到货数量不能大与合同数量*(1+材料超入比例:'"+ll_clbl+"')+材料最小包装量!");
							return json.toString();
		    			}
		    		}else{
		    			double f_bcdh=0;
		    			params.put("sql","select sum(dhsl)  from dhdjb_yl where ckbh="+ckbh+" and dhdh="+dhdh+" and htbh="+htbh+" and htxh="+htxh+" and clhh='"+clhh+"';");
		    			str = purchaseDetailMapper.getStringFromSql(params);
			    		if(str!=null){
			    			f_bcdh = Double.parseDouble(str);
			    		}
			    		if(Math.round((f_ydsl - f_bcdh + dhsl)*10)/10.000>Math.round((f_cgsl*(1+ll_clbl)+ll_zxbzl)*10)/10.000){
			    			json.put("bool", false);
							json.put("msg", ""+(int)htbh+"-"+(int)htxh+"合同明细的材料货号'"+clhh+"'有合同标记，到货数量不能大于合同数量*(1+材料超入比例:'"+ll_clbl+"')+材料最小包装量!");
							return json.toString();
			    		}
		    		}
		    	 }
		    	}
		    	params.put("sql","drop table "+csbhb);
		    	purchaseDetailMapper.getStringFromSql(params);
		    	params.put("sql","drop table "+jhbhb);
		    	purchaseDetailMapper.getStringFromSql(params);
		    	params.put("sql","drop table "+dhslb);
		    	purchaseDetailMapper.getStringFromSql(params);
		    	
		}
		return json.toString();
	}
	//是否判定过
	public int IfAward(Map<String,Object> params){
		return mapper.IfAward(params);
	}
	
	public List<GoodsAllocation> getGoodsAllocationList(Map<String,Object> params){
		return gmapper.getGoodsAllocationList(params);
	}
	
	public double getFzsl(Map<String,Object> params){
		double sfzsl; double fzsl_yr;double fzsl_yt;
		double fzsl = Double.parseDouble( (String) params.get("fzsl"));
		double htbh = Double.parseDouble((String) params.get("htbh"));
		double htxh = Double.parseDouble((String) params.get("htxh"));
		params.put("sql","select sum(fzsl) from dhdjb_yl where htbh='"+htbh+"' and htxh='"+htxh+"' and ztbj!=2;");
		String str = purchaseDetailMapper.getStringFromSql(params);
		if(str==null){
			fzsl_yr=0;
		}else{
			fzsl_yr=Double.parseDouble(str);
		}
		params.put("sql","select abs(sum(fzsl))  from rkdb_yl where htbh='"+htbh+"' and htxh='"+htxh+"' and (rklb=2 or rklb=3);");
		String fstr =purchaseDetailMapper.getStringFromSql(params);
		if(fstr==null){
			fzsl_yt=0;
		}else{
			fzsl_yt=Double.parseDouble(fstr);
		}
		sfzsl = fzsl - fzsl_yr + fzsl_yt;
	    return sfzsl;			
	}
	public List<ArrivalRegister> getHistoryArrivalList(Map<String,Object> params){
		int count;
	    String usePaging = params.get("usePaging").toString();
	    if(usePaging.trim().equals("true") ){
		params.put("usePaging", false);
	    }
		params.put("sql", "select COUNT(*) from sysobjects where name='view_dhdj_ls_khbh' and type='V';");
		String  cStr= purchaseDetailMapper.getStringFromSql(params);
		if(cStr==null){
			count=0;
		}else{
			count=Integer.parseInt(cStr);
		}
		if(count>0){
		params.put("createsql", "drop view view_dhdj_ls_khbh");
		mapper.createTableSql(params);}
		mapper.createView(params);
		if(usePaging.trim().equals("true")){
		params.put("usePaging", true);
		}
		return mapper.getHisArrivalRegister(params);
	}
	public void cancelReturn(Map<String,Object> params){
		mapper.cancelReturn(params);
	}
}
