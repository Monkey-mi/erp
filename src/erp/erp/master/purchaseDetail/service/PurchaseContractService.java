package erp.erp.master.purchaseDetail.service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.master.company.data.CompanyMapper;
import erp.erp.master.company.model.Company;
import erp.erp.master.purchaseDetail.data.PurchaseContractMapper;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.master.purchaseDetail.model.AccountDeptOne;
import erp.erp.master.purchaseDetail.model.CalObject;
import erp.erp.master.purchaseDetail.model.ContractDetail;
import erp.erp.master.purchaseDetail.model.ContractSubsidiary;
import erp.erp.master.purchaseDetail.model.FunctionPurchaseCtl;
import erp.erp.master.purchaseDetail.model.MainUnit;
import erp.erp.master.purchaseDetail.model.MaterialCoding;
import erp.erp.master.purchaseDetail.model.MaterialDetail;
import erp.erp.master.purchaseDetail.model.PanelDetailAndOrder;
import erp.erp.master.purchaseDetail.model.PlanDetail;
import erp.erp.master.purchaseDetail.model.PurGroupMan;
import erp.erp.master.purchaseDetail.model.PurchaseContract;
import erp.erp.master.purchaseDetail.model.PurchaseDetail;
import erp.erp.master.purchaseDetail.model.StoreQuote;
import erp.erp.purchaseOrder.data.PurchaseOrderDetailMapper;
import erp.erp.purchaseOrder.model.OrderSubsidiary;
import erp.erp.purchaseOrder.model.ProcurementOrder;
import erp.erp.purchaseOrder.model.PurBom;
import erp.erp.purchaseOrder.model.PurchaseOrderDetail;
import erp.util.DateJsonValueProcessor;
import erp.util.DoubleCal;
import erp.util.MyDateUtils;
import erp.util.MyJsonUtil;
import erp.util.MyStringUtils;


@Service
public class PurchaseContractService {
	@Autowired
	private PurchaseContractMapper mapper;

	@Autowired
	private CompanyMapper companyMapper;//厂商
	
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购
	
	@Autowired
	private PurchaseOrderDetailMapper purchaseOrderDetailMapper;
	/**
	 * 采购合同表CURD
	 * Request purchasedetail/purchasecontract.act?method=getPurGroupManList <br/><br/>
	 * Response {data:[{PurGroupMan}]} <br/><br/>
	 * @param PurchaseContract {@link paramMap}
	 */
	public List<ProcurementOrder> getPurchaseContractList(Map<String,Object> params) {
		return mapper.getPurchaseContractList(params);
	}
	public void addPurchaseContract(ProcurementOrder[] arr) {
		for(ProcurementOrder obj: arr) {
			mapper.addPurchaseContract(obj);
		}
	}
	public void updatePurchaseContract(ProcurementOrder[] arr) {
		for(ProcurementOrder obj: arr) {
			mapper.updatePurchaseContract(obj);
		}
	}
	public void deletePurchaseContract(ProcurementOrder[] arr) {
		for(ProcurementOrder obj: arr) {
			mapper.deletePurchaseContract(obj);
		}
	}
	/**
	 * 主体单位
	 * Request purchasedetail/purchasecontract.act?method=getMainUnitList  <br/><br/>
	 * @author wq
	 * @date 2016-02-15
	 */
	public List<MainUnit> getMainUnitList(Map<String,Object> params) {
		return purchaseDetailMapper.getMainUnitList(params);
	}
	
	/**
	 * 参数获取
	 * Request purchasedetail/purchasecontract.act?method=getBeforCreate  <br/><br/>
	 * @author wq
	 * @date 2016-02-01
	 */
	public String getBeforCreate(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));
		json.put("bool", true);
		String s_wbbh=null;
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
			String login_id=params.get("login_id").toString();
			String ip=params.get("ip").toString();
			List<Company> cpList=companyMapper.getCompanyList(params);
			if(cpList.size()>0){
				Company cp=cpList.get(0);
				json.put("lxrm", cp.getLxrm());
				json.put("wbbh", cp.getWbbh());
				s_wbbh=cp.getWbbh();
			}
			List<PurGroupMan> pgList = purchaseDetailMapper.getPurGroupManList(params);
			if(pgList.size()>0){
				PurGroupMan pd=pgList.get(0);
				json.put("cgybh", pd.getCgybh());
			}
			params.put("mrbj",1);
			List<MainUnit> muList=purchaseDetailMapper.getMainUnitList(params);
			if(muList.size()>0){
				MainUnit mu=muList.get(0);
				json.put("ztbh", mu.getZtbh());
			}
			//String recordData=params.get("recordData").toString();
			/**
			 * 为解决大数据问题此处改为从数据库拉取数据
			 */
			//将主键字符串组装成条件
			List<PurchaseDetail> arr=purchaseDetailMapper.getPurchaseDetailList(params);
			int  s_cgbh,s_cgxh,s_ddbh,s_ddxh;
			long  ll_count,ll_cgbh,s_jhbh,s_jhxh,s_wxbj,ls_count,ls_count_cur;
			String ls_csbh,ls_clhh,ls_clth,ls_clmc,ls_hyhm,ls_cltx1,ls_khxh,s_txgz,f_cfbh,f_cfxh;
			double ld_cgsl,ld_cgdj,ld_kzdj,s_cgdj = 0,s_cgje = 0,s_zhxs,ld_fzsl,ls_ycsl,ls_cjsl;
			String   f_fach,f_ywms,f_pono,f_xmsjbc,f_khxh;
			double	f_cfxs,f_cgsl;
			long 		s_fzzbj,ls_spbj_kj;
			double 	s_zzhxs;
			double 	s_cjsl;
			long 		ls_cgbh = 0,ls_cgxh=0;
			String 	ls_cpbh,ls_fach,ls_pono,ls_ywms;
			long 		s_zjbh,s_zjxh;
			Date ls_psjq = null;
			List <CalObject> cgjhmx=new ArrayList<CalObject>();
			List <ContractDetail> ConDetList=new ArrayList<ContractDetail>();
			int htxh=1;
			List<ContractSubsidiary> contractSubsidiaryList=new LinkedList<ContractSubsidiary>();
			for(PurchaseDetail obj:arr){
				ld_cgdj=0;
				ld_fzsl=0;
				ls_cltx1="";
				s_cgbh=obj.getCgbh();
				s_cgxh=obj.getCgxh();
				ls_csbh=obj.getCsbh();
				ls_clhh=obj.getClhh();
				ls_clth=obj.getClth();
				ls_clmc=obj.getClmc();
				ls_cltx1=obj.getCltx1();
				ld_fzsl=obj.getFzwz();
				s_jhbh = obj.getJhbh();
				s_jhxh = obj.getJhxh();
				s_ddbh=0;
				s_ddxh=0;
				params.put("jhbh", obj.getJhbh());
				params.put("jhxh", obj.getJhxh());
				List<PlanDetail> pdList=purchaseDetailMapper.getPlanDetailForDdhList(params);
				float zjbh=0;
				float zjxh=0;
				if(pdList.size()>0){
					PlanDetail pd=pdList.get(0);
					zjbh=pd.getZjbh();
					zjxh=pd.getZjxh();
					if(zjbh!=0&&zjxh!=0){
						params.put("jhbh", pd.getZjbh());
						params.put("jhxh", pd.getZjxh());
						List<PlanDetail> pdList1=purchaseDetailMapper.getPlanDetailForDdhList(params);
						if(pdList1.size()>0){
							PlanDetail pd1=pdList1.get(0);
							s_ddbh=pd1.getDdbh();
							s_ddxh=pd1.getDdxh();
						}
					}else{
						s_ddbh=pd.getDdbh();
						s_ddxh=pd.getDdxh();
					}
				}else{
					s_ddbh=obj.getDdbh();
					s_ddxh=obj.getDdxh();
				}
				ld_cgsl=0;
				ld_cgsl=obj.getCjwz();		//未转数量
				ld_cgdj=0;
				ld_kzdj=0;
				if(s_wbbh!=null&&!s_wbbh.equals("")){
					params.put("csbh", ls_csbh);
					params.put("clhh", obj.getClhh());
					params.put("cgsl", 0);
					params.put("wbbh", s_wbbh);
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						FunctionPurchaseCtl fpc=fpcList.get(0);
						ld_cgdj=fpc.getCgdj();
						ld_kzdj=fpc.getKzdj();
					}
				}else{
					params.put("csbh", ls_cgbh);
					params.put("clhh", obj.getClhh());
					params.put("cgsl", 0);
					params.put("wbbh", "");
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						FunctionPurchaseCtl fpc=fpcList.get(0);
						ld_cgdj=fpc.getCgdj();
						ld_kzdj=fpc.getKzdj();
					}
				}
				ld_kzdj=ld_cgdj;
				ls_hyhm=obj.getHyhm();
				ls_cjsl=0;
				//求和
				for(CalObject cobj:cgjhmx){
					if(cobj.equals(obj.getCgh())){
						ls_cjsl+=cobj.getCgsl();
					}
				}
				if(ld_cgsl-ls_cjsl>0){
					f_cgsl=ld_cgsl-ls_cjsl;
					//加入数组
					CalObject cobj1=new CalObject();
					cobj1.setCgh(obj.getCgh());
					cobj1.setCgsl(f_cgsl);
					cgjhmx.add(cobj1);
					params.put("clhh", obj.getClhh());
					params.put("cltx1",obj.getCltx1());
					s_zhxs=purchaseDetailMapper.getConversion(params);
					if(s_zhxs>0){
						ld_fzsl=DoubleCal.round(f_cgsl*s_zhxs, 3,BigDecimal.ROUND_HALF_UP);
					}else{
						ld_fzsl=0;
					}
					PurchaseOrderDetail conDet=new PurchaseOrderDetail();
					conDet.setLogin_id(login_id);
					conDet.setIp(ip);
					conDet.setKjlx(0);
					conDet.setHtbh(0);
					conDet.setHtxh(htxh);
					htxh++;
					conDet.setClhh(ls_clhh);
					s_fzzbj=0;
					s_zzhxs=0;
					s_txgz="";
					List<MaterialCoding> mcList=purchaseDetailMapper.getMaterialCodingList(params);
					if(mcList.size()>0){
						MaterialCoding mc=mcList.get(0);
						s_fzzbj=mc.getFzzbj();
						s_zzhxs=mc.getZzhxs();
						s_txgz=mc.getTxgz();
					}
					conDet.setFzzbj(s_fzzbj);
					conDet.setZzhxs(s_zzhxs);
					conDet.setTxgz(s_txgz);
					conDet.setClth(ls_clth);
					conDet.setClmc(ls_clmc);
					conDet.setHtbz(ls_hyhm);
					conDet.setJldw(obj.getJldw());
					conDet.setCltx1(obj.getCltx1());
					conDet.setYsgg(obj.getYsgg());
					conDet.setCltx2(obj.getCltx2());
					conDet.setCltx3(obj.getCltx3());
					conDet.setCjjhrq(obj.getJhrq());
					conDet.setCgbh(obj.getCgbh());
					conDet.setCgxh(obj.getCgxh());
					conDet.setCgh(obj.getCgh());
					conDet.setSqbh(obj.getSqbh());
					conDet.setSqxh(obj.getSqxh());
					conDet.setSqh(obj.getSqh());
					conDet.setWkjq(obj.getWkjq());
					ls_cgbh=0;
					ls_cgxh=0;
					s_cjsl=0;
					ls_cgbh=obj.getCgbh();
					ls_cgxh=obj.getCgxh();
					conDet.setCjsl(obj.getCgsl());
					conDet.setJhh(obj.getJhh());
					conDet.setJhbh(obj.getJhbh());
					conDet.setJhxh(obj.getJhxh());
					conDet.setDdh(obj.getDdh());
					conDet.setDdbh(s_ddbh);
					conDet.setDdxh(s_ddbh);
					conDet.setBzsm(obj.getBzsm());
					conDet.setCgrq(obj.getCgrq());
					conDet.setGhzq(obj.getGhzq());
					conDet.setJhrq(obj.getJhrq());
					conDet.setSdck(obj.getSdck());
					//conDet.setCkmc(obj.getCkmc());
					conDet.setFzdw(obj.getFzdw());
					conDet.setCpmc(obj.getCpmc());
					conDet.setFzsl(ld_fzsl);
					conDet.setDlgs(obj.getWzdl());
					conDet.setHsbm(obj.getHsbm());
					//获取核算部门名称
					params.put("sql","  select bmmc from hsbmb where bmbh = '"+obj.getHsbm()+"' ");
					String bmmc=purchaseDetailMapper.getStringFromSql(params);
					conDet.setHsbmmc(bmmc);
					conDet.setWxbj(obj.getWxbj());
					ls_khxh="";
					params.put("cgbh",obj.getCgbh());
					params.put("cgxh",obj.getCgxh());
					String khbh=purchaseDetailMapper.getPlanDetailForKhbh(params);
					if(khbh==null){
						khbh="";
					}
					conDet.setKhbh(khbh);
					params.put("sql","  select khjc from khxxb where khbh = '"+khbh+"' ");
					String khjc=purchaseDetailMapper.getStringFromSql(params);
					conDet.setKhjc(khjc);
					ls_cpbh="";
					ls_khxh="";
					ls_fach="";
					ls_pono="";
					ls_ywms="";
					params.put("jhbh", obj.getJhbh());
					params.put("jhxh", obj.getJhxh());
					List<PanelDetailAndOrder> pdaoList=purchaseDetailMapper.getPanelDetailAndOrderList(params);
					if(pdaoList.size()>0){
						PanelDetailAndOrder pdao=pdaoList.get(0);
						ls_cpbh=pdao.getCpbh();
						ls_khxh=pdao.getKhxh();
						ls_fach=pdao.getFach();
						ls_pono=pdao.getPono();
						ls_ywms=pdao.getYwms();
						ls_psjq=pdao.getPsjq();
					}
					//半成品计划
					if(zjbh!=0&&zjxh!=0){
						params.put("jhbh", zjbh);
						params.put("jhxh", zjxh);
						List<PanelDetailAndOrder> pdaoList1=purchaseDetailMapper.getPanelDetailAndOrderList(params);
						if(pdaoList1.size()>0){
							PanelDetailAndOrder pdao=pdaoList1.get(0);
							ls_cpbh=pdao.getCpbh();
							ls_khxh=pdao.getKhxh();
							ls_fach=pdao.getFach();
							ls_pono=pdao.getPono();
							ls_ywms=pdao.getYwms();
							ls_psjq=pdao.getPsjq();
						}
					}
					conDet.setCpbh(ls_cpbh);
					conDet.setKhxh(ls_khxh);
					conDet.setFach(ls_fach);
					conDet.setPono(ls_pono);
					conDet.setYwms(ls_ywms);
					conDet.setPsjq(ls_psjq);
					conDet.setCgsl(f_cgsl);
					conDet.setYcgl(f_cgsl);
					conDet.setKzdj(ld_kzdj);
					s_wbbh=obj.getWbbh().trim();
					if(s_wbbh!=null&&!s_wbbh.equals("")){
						params.put("wbbh", s_wbbh);
						Date cur=new Date(); 
						int f_nf=cur.getYear()+1900;
						int f_yf=cur.getMonth()+1;
						String sql="  select top 1 wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
						params.put("sql",sql);
						String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
						double s_wbhl=0;
						if(wbhlStr==null){
						}else{
							s_wbhl=Double.parseDouble(wbhlStr);
						}
						if(wbhlStr!=null){
							conDet.setWbdj(ld_cgdj);
							conDet.setWbje(DoubleCal.round(f_cgsl*ld_cgdj,2,BigDecimal.ROUND_HALF_UP));
							conDet.setWbbh(s_wbbh);
							conDet.setWbhl(s_wbhl);
							s_cgje=DoubleCal.round(DoubleCal.round(f_cgsl*ld_cgdj, 2,BigDecimal.ROUND_HALF_UP)/s_wbhl,2,BigDecimal.ROUND_HALF_UP);
							if(f_cgsl!=0){
								s_cgdj=DoubleCal.round(s_cgje/f_cgsl,6,BigDecimal.ROUND_HALF_UP);
							}else{
								s_cgdj=0;
							}
						}
						conDet.setCgdj(s_cgdj);
						conDet.setCgje(s_cgje);
						conDet.setZzsl(0);
					}else{
						conDet.setCgdj(ld_cgdj);
						conDet.setCgje(DoubleCal.round(f_cgsl*ld_cgdj,2,BigDecimal.ROUND_HALF_UP));
						conDet.setZzsl(0.17);
					}
					//ConDetList.add(conDet);
					purchaseOrderDetailMapper.addPurchaseOrderDetail(conDet);
					//导入辅助表
					params.put("cgbh", obj.getCgbh());
					params.put("cgxh", obj.getCgxh());
					List<ContractSubsidiary> csList=purchaseDetailMapper.getContractSubsidiaryForLoadList(params);
					for(ContractSubsidiary pps:csList){
						OrderSubsidiary os=new OrderSubsidiary();
						os.setLogin_id(login_id);
						os.setIp(ip);
						os.setJgbh(pps.getJgbh());
						os.setHtbh(conDet.getHtbh());
						os.setHtxh(conDet.getHtxh());
						os.setJlxh(pps.getJlxh());
						os.setZhgg(pps.getZhgg());
						os.setCggg(pps.getCggg());
						os.setZhsl(pps.getZhsl());
						os.setZhjl(pps.getZhjl());
						os.setFzsl(pps.getFzsl());
						os.setFzdw(pps.getFzdw());
						os.setCgsl(pps.getCgsl());
						os.setJldw(pps.getJldw());
						os.setScxq(pps.getScxq());
						os.setYxgg(pps.getYxgg());
						os.setDgyl(pps.getDgyl());
						os.setGjsl(pps.getGjsl());
						os.setGjyl(pps.getGjyl());
						os.setJhsl(pps.getJhsl());
						os.setFdxs(pps.getFdxs());
						os.setCzsj(new Date());
						purchaseOrderDetailMapper.addPurPanelSubsidiary(os);
					}
				}
			}
			//JSONArray jsonArray1=null;
			//jsonArray1 = JSONArray.fromObject( ConDetList , jsonConfig);
			//JSONArray jsonArray2 = JSONArray.fromObject( contractSubsidiaryList , jsonConfig);
			//json.put("ConDetList", jsonArray1);
			//json.put("ContractSubsidiaryList", jsonArray2);
		return json.toString();
	}
	
	/**
	 * 材料导入参数
	 * Request purchasedetail/purchasecontract.act?method=materialDetailLoad  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-01
	 */
	public String materialDetailLoad(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String s_csbh=params.get("csbh").toString();
		String materialDetail=params.get("materialDetail").toString();
		String contractDetail=params.get("contractDetail").toString();
		List<ContractDetail> cdList=new LinkedList<ContractDetail>();
		Date s_jhrq,ls_cgrq;
		int s_kjlx;
		double   s_cgsl,s_cgdj,s_cgje = 0,s_wbdj,s_wbje,s_fzsl,f_cgdj;
			List<MaterialDetail>  arr=MyJsonUtil.str2list(materialDetail, MaterialDetail.class);
			ContractDetail contractDetailObj=(ContractDetail)MyJsonUtil.str2obj(contractDetail, ContractDetail.class);
			params.put("sql","  select wbbh from csxxb where csbh = '"+s_csbh+"' ");
			String s_wbbh=purchaseDetailMapper.getStringFromSql(params);
			if(s_wbbh==null){
				s_wbbh="";
			}else{
				s_wbbh=s_wbbh.trim();
			}
			ContractDetail add=null;
			boolean isOne=true;
			for(MaterialDetail obj:arr){
				if(isOne){
					add=contractDetailObj;
				}else{
					add=new ContractDetail();
				}
				s_jhrq=add.getJhrq();
				s_kjlx=add.getKjlx();
				double cgdj=0;
				double fzkj=0;
				double kzdj=0;
				double ghzq=0;
				if(!s_wbbh.equals("")){
					s_wbdj=add.getWbdj();
					String sql="  select top 1 wbdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
					sql+="where cghtb.csbh='"+s_csbh+"' and htmxb.clhh= '"+obj.getClhh()+"'";
					sql+="and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>"+add.getHtbh()+" order by cghtb.czsj desc ";
					params.put("sql",sql);
					String f_cgdjStr=purchaseDetailMapper.getStringFromSql(params);
					if(f_cgdjStr==null){
						f_cgdjStr="0";
					}
					f_cgdj=Double.parseDouble(f_cgdjStr);
					
					params.put("csbh", s_csbh);
					params.put("clhh", obj.getClhh());
					params.put("cgsl", 0);
					params.put("wbbh", 0);
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						FunctionPurchaseCtl fpc=fpcList.get(0);
						cgdj=fpc.getCgdj();
						fzkj=fpc.getFzkj();
						kzdj=fpc.getKzdj();
						ghzq=fpc.getGhzq();
					}
					if(f_cgdj==0){
						if(s_kjlx!=1){
							add.setWbdj(cgdj);
						}else{
							add.setWbdj(fzkj);
						}
					}else{
						add.setWbdj(f_cgdj);
					}
				}else{
					s_cgdj=add.getCgdj();
					f_cgdj=0;
					String sql="  select top 1 cgdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
					sql+="where cghtb.csbh='"+s_csbh+"' and htmxb.clhh= '"+obj.getClhh()+"'";
					sql+="and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>"+add.getHtbh()+" order by cghtb.czsj desc ";
					params.put("sql",sql);
					String f_cgdjStr=purchaseDetailMapper.getStringFromSql(params);
					if(f_cgdjStr==null){
						f_cgdjStr="0";
					}
					f_cgdj=Double.parseDouble(f_cgdjStr);
					
					params.put("csbh", s_csbh);
					params.put("clhh", obj.getClhh());
					params.put("cgsl", 0);
					params.put("wbbh", 0);
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						FunctionPurchaseCtl fpc=fpcList.get(0);
						cgdj=fpc.getCgdj();
						fzkj=fpc.getFzkj();
						kzdj=fpc.getKzdj();
						ghzq=fpc.getGhzq();
					}
					if(f_cgdj==0){
						if(s_kjlx!=1){
							add.setWbdj(cgdj);
						}else{
							add.setWbdj(fzkj);
						}
					}else{
						add.setWbdj(f_cgdj);
					}
				}
				add.setClhh(obj.getClhh());
				add.setClth(obj.getClth());
				add.setClmc(obj.getClmc());
				add.setJldw(obj.getJldw());
				add.setFzdw(obj.getFzdw());
				add.setFzzbj(obj.getFzzbj());
				add.setZzhxs(obj.getZzhxs());
				add.setTxgz(obj.getTxgz());
				if(s_kjlx!=1){
					add.setKzdj(kzdj);
				}else{
					add.setKzdj(fzkj);
				}
				add.setGhzq(ghzq);
				double s_zhxs=purchaseDetailMapper.getConversion(params);
				if(s_zhxs>0){
					s_fzsl=DoubleCal.round(add.getCgsl()*s_zhxs, 3,BigDecimal.ROUND_HALF_UP);
				}else{
					s_fzsl=0;
				}
				add.setFzsl(s_fzsl);
				if(ghzq!=0){
					Calendar rightNow = Calendar.getInstance();
					if(s_jhrq!=null){
						rightNow.setTime(s_jhrq);
						rightNow.add(Calendar.DAY_OF_YEAR,-(int)ghzq);
						add.setCgrq(rightNow.getTime());
					}else{
						add.setCgrq(null);
					}
				}else{
					add.setCgrq(null);
				}
				String sql="  select mjh  from cgxxb where clhh='"+obj.getClhh()+"' and csbh='"+s_csbh+"' ";
				params.put("sql",sql);
				String mjh=purchaseDetailMapper.getStringFromSql(params);
				add.setMjh(mjh);
				
				s_cgsl=add.getCgsl();
				s_fzsl=add.getFzsl();
				s_cgdj=add.getCgdj();
				s_wbdj=add.getWbdj();
				Date s_cgrq=add.getCgrq();
				if(!s_wbbh.equals("")){
					if(s_cgrq==null){
						s_cgrq=new Date();
					}
					int f_nf=s_cgrq.getYear()+1900;
					int f_yf=s_cgrq.getMonth()+1;
					sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
					params.put("sql",sql);
					String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
					if(wbhlStr==null){
						wbhlStr="0";
					}
					double wbhl=Double.parseDouble(wbhlStr);
					if(s_kjlx!=1){
						s_wbje=DoubleCal.round(s_wbdj*s_cgsl, 2);
					}else{
						s_wbje=DoubleCal.round(s_wbdj*s_fzsl, 2);
					}
					s_cgje=DoubleCal.round(s_wbje*wbhl, 2);
					if(s_cgsl!=0){
						if(s_kjlx!=1){
							s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
						}else{
							if(s_fzsl==0){
								s_cgdj=0;
							}else{
								s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
							}
						}
					}else{
						s_cgdj=0;
					}
					add.setWbbh(s_wbbh);
					add.setWbhl(wbhl);
					add.setCgdj(s_cgdj);
					add.setWbdj(s_wbdj);
					add.setWbje(s_wbje);
				}else{
					if(s_kjlx!=1){
						s_cgje=DoubleCal.round(s_cgdj*s_cgsl, 2);
					}else{
						s_cgje=DoubleCal.round(s_cgdj*s_fzsl, 2);
					}
					add.setWbbh("");
					add.setWbhl(0);
					add.setCgdj(s_cgdj);
					add.setCgje(s_cgje);
					add.setWbdj(0);
					add.setWbje(0);
				}
				//System.out.println(obj.getCzsj());
				//System.out.println(obj.getClhh());
				if(isOne){
					json.put("contractDetail", MyJsonUtil.getJSONString(add));
				}else{
					cdList.add(add);
				}
				isOne=false;
			}
			json.put("cdList", MyJsonUtil.getJSONString(cdList));
		return json.toString();
	}
	/**
	* @Description: 获取全体核算部门树
	* @param params node 即部门编号
	* Request purchasedetail/purchasecontract.act?method=getAllAccountdeptTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author wuqia
	* @date 2016-02-18 
	*/
	public List<TreeModel> getAllAccountdeptTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		int bmjc=1;
		int parentId=0;
		List<AccountDeptOne> list=purchaseDetailMapper.getAllAccountdeptList(params);
		if(params.get("node")!=null){
			bmjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(AccountDeptOne sa:list) 
		{
			if(sa.getBmjc()==bmjc){
				TreeModel st=new TreeModel();
				st.setNodeId(Integer.valueOf(sa.getBmbh()));
				st.setParentId(parentId);
				st.setText(sa.getBmmc());
				if (!sa.getMjbz()){
					st.setLeaf("false");
					st.setExpanded("false");
				}else{
					st.setLeaf("true");
					st.setExpanded("true");
				}
				st.setType("Accountdept");
				stlist.add(st);
			}
		}
		return stlist;
	}
	/**
	 * 仓库引用
	 * Request purchasedetail/purchasecontract.act?method=getStoreQuoteList  <br/><br/>
	 * @author wq
	 * @date 2016-02-18
	 */
	public List<StoreQuote> getStoreQuoteList(Map<String,Object> params) {
		return purchaseDetailMapper.getStoreQuoteList(params);
	}
	/**
	 * 箱唛导入
	 * Request purchasedetail/purchasecontract.act?method=getShippingLoadList  <br/><br/>
	 * @author wq
	 * @date 2016-02-20
	 */
	public String getShippingLoadList(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String s_cgyq="";
		String sql=null;
		/*try {*/
			String jhhstr=params.get("jhhs").toString();
			JSONArray array = JSONArray.fromObject(jhhstr);
			String jhharr[]=(String [])JSONArray.toArray(array,String.class);
			for(String jhh:jhharr){
				if(!jhh.equals("")){
					String jhh1[]=jhh.split("-");
					String jhbh=jhh1[0];
					String jhxh=jhh1[1];
					sql="  select ddbh  from jhmxb where jhbh="+jhbh+" and jhxh="+jhxh+" ";
					params.put("sql",sql);
					String ddbh=purchaseDetailMapper.getStringFromSql(params);
					sql="  select ddxh from xsdd_cpmsb left outer join msxmwhb on msxmwhb.xmmc=xsdd_cpmsb.xmmc";
					sql+=" where ddbh="+ddbh+" and msxmwhb.xmbj=1;";
					params.put("sql",sql);
					List<String> ddxhArr=purchaseDetailMapper.getStringArrFromSql(params);
					for(String ddxh:ddxhArr){
						sql="  select xmms from xsdd_cpmsb left outer join msxmwhb on msxmwhb.xmmc=xsdd_cpmsb.xmmc";
						sql+=" where ddbh="+ddbh+" and ddxh="+ddxh+" and msxmwhb.xmbj=1 ";
						params.put("sql",sql);
						if(s_cgyq.equals("")){
							s_cgyq=ddbh+"-"+ddxh+":"+"~r~n";
						}else{
							s_cgyq+="~r~n"+ddbh+"-"+ddxh+":"+"~r~n";
						}
						List<String> xmmsArr=purchaseDetailMapper.getStringArrFromSql(params);
						for(String xmms:xmmsArr){
							s_cgyq+=xmms;
						}
					}
				}
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "箱唛导入时出现异常，请重试！");
		}*/
		json.put("cgyq", s_cgyq);
		return json.toString();
	}
	/**
	 * 钢架材料价格刷新
	 * Request purchasedetail/purchasecontract.act?method=getCljeAndWithOut  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-07-05
	 */
	public String getCljeAndWithOut(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString();
			PurBom cd=(PurBom)MyJsonUtil.str2obj(recstr, PurBom.class);
			String 	ls_clhh,ls_jgbh,ls_csbh;
			Date ldt_xdrq;
			double 	ld_spjg,ld_jgjg,ls_gjdj=0,ls_djyl,ls_wxsh,ls_clje,ls_kzdj;
			long p_count;
			ls_clhh=cd.getClhh();
			ldt_xdrq=cd.getXdrq();
			ls_csbh=cd.getCsbh();
			String str_xdrq="";
			if(ldt_xdrq!=null){
				str_xdrq=MyDateUtils.getStringDateShort(ldt_xdrq);
			}
			sql="  select  top 1 spjg1  from clspjg_jgb ";
			sql+="	left outer join clspjgb on clspjgb.jlbh = clspjg_jgb.jlbh ";
			sql+=" left outer join clbmb on clbmb.gsbh =clspjgb.gsbh " ;
			sql+=" where clbmb.clhh = '"+ls_clhh+"' and convert(date,jlrq,102) = '"+str_xdrq+"' and qybj=1 ";
			params.put("sql",sql);
			String strld_spjg=purchaseDetailMapper.getStringFromSql(params);
			if(strld_spjg==null){
				ld_spjg=0;
			}else{
				ld_spjg=Double.parseDouble(strld_spjg);
			}
			
			sql="  select  top 1 gscs from clbm_gscsb ";
			sql+=" left outer join clbmb on clbmb.clhh =clbm_gscsb.clhh ";
			sql+=" where clbmb.clhh = '"+ls_clhh+"' and clbm_gscsb.gycs='"+ls_csbh+ "'";
			sql+=" and( ( clbmb.gsbh=1005 and clbm_gscsb.csbh=11) or( clbmb.gsbh=1031 and clbm_gscsb.csbh=54)) ";
			params.put("sql",sql);
			String strld_jgjg=purchaseDetailMapper.getStringFromSql(params);
			if(strld_jgjg==null){
				ld_jgjg=0;
			}else{
				ld_jgjg=Double.parseDouble(strld_jgjg);
			}
			
			
			if(ld_jgjg!=0 && ld_spjg!=0){
				ls_gjdj=ld_jgjg+ld_spjg;
			}else{
				sql=" select kzdj from csjjb where clhh='"+cd.getClhh() + "'and csbh='"+cd.getCsbh() +"'";
				params.put("sql",sql);
				String sls_kzdj=purchaseDetailMapper.getStringFromSql(params);
				if(sls_kzdj==null){
					ls_kzdj = 0;
				}else{
					ls_kzdj=Double.parseDouble(sls_kzdj);
				}
				if(ls_kzdj!=0){
					ls_gjdj = ls_kzdj;
				}else{
					ls_gjdj=0;
				}
			}
			sql="select COUNT(*) from clbmb where LEFT(lbbh,2) =15 and clmc like 'A3%' and clhh='"+cd.getClhh()+"'";
			params.put("sql",sql);
			String sp_count=purchaseDetailMapper.getStringFromSql(params);
			p_count = Long.parseLong(sp_count);
			if(p_count>0){
				ls_gjdj=5;
			}
			
			cd.setGjdj(ls_gjdj);
			ls_wxsh=cd.getWxsh();
			ls_jgbh=cd.getJgbh();
			ls_djyl=cd.getDjyl();
			double ls_ewje=cd.getEwje();
			System.out.println("ls_wxsh:"+ls_wxsh);
			System.out.println("ls_jgbh:"+ls_wxsh);
			System.out.println("ls_djyl:"+ls_wxsh);
			System.out.println("ls_gjdj:"+ls_gjdj);
			System.out.println("ls_ewje:"+ls_ewje);
			if(!"".equals(ls_jgbh)){
				ls_clje=DoubleCal.round(ls_djyl*ls_gjdj*ls_wxsh, 4);
				cd.setClje(ls_clje);
//				cd.setGjdj_new(DoubleCal.round((ls_gjdj+ls_ewje/1000),4));
			}
			json.put("cd", MyJsonUtil.getJSONString(cd));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "控件类型关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 箱唛备注导入
	 * Request purchasedetail/purchasecontract.act?method=getShippingNotesLoadList  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-20
	 */
	public String getShippingNotesLoadList(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString();
			JSONArray array = JSONArray.fromObject(recstr);
			ContractDetail cds[]=(ContractDetail [])JSONArray.toArray(array,ContractDetail.class);
			for(ContractDetail cd:cds){
				if(cd.getJhbh()!=0){
					params.put("jhbh", cd.getJhbh());
					params.put("jhxh", cd.getJhxh());
					List<PlanDetail> pds=purchaseDetailMapper.getPlanDetailForDdhList(params);
					if(pds.size()>0){
						long ddbh=pds.get(0).getDdbh();
						long ddxh=pds.get(0).getDdxh();
					}
					sql="  select xmsjbc  from jhmx_ddxxb where jhmx_ddxxb.jhbh="+cd.getJhbh()+" and jhmx_ddxxb.jhxh="+cd.getJhxh()+" ";
					params.put("sql",sql);
					String bzsm=purchaseDetailMapper.getStringFromSql(params);
					cd.setBzsm(bzsm);
				}
			}
			json.put("cdList", MyJsonUtil.getJSONString(cds));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "箱唛备注导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 合同单价信息导入
	 * Request purchasedetail/purchasecontract.act?method=getPriceLoadList  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-20
	 */
	public String getPriceLoadList(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			//如果回传数组为空则作为全部数据变更处理
			List<PurchaseOrderDetail> cds=null;
			if(params.get("recstr")==null){
				//取当前编辑数据
				cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
				//return  json.toString();
			}else{
				String recstr=params.get("recstr").toString();
				cds=MyJsonUtil.str2list(recstr, PurchaseOrderDetail.class);
			}
			String csbh=params.get("csbh").toString();
			double s_cgsl,s_wbdj,s_wbje,s_cgje,s_cgdj;
			for(PurchaseOrderDetail cd:cds){
				String s_clhh=cd.getClhh();
				s_cgsl=cd.getCgsl();
				String s_wbbh=cd.getWbbh();
				double s_wbhl=cd.getWbhl();
				int s_kjlx=cd.getKjlx();
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				if(s_wbbh!=null&&!s_wbbh.equals("")){
					s_wbdj=cd.getWbdj();
					sql="  select top 1 wbdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh";
					sql+="	where csbh='"+csbh+"' and clhh='"+s_clhh+"'  and kjlx='"+s_kjlx+"' and wbdj>0  and htmxb.htbh<>'"+cd.getHtbh()+"'  order by czsj DESC";
					params.put("sql",sql);
					String wbdj=purchaseDetailMapper.getStringFromSql(params);
					if(wbdj==null){
						wbdj="0";
					}
					s_wbdj=Double.parseDouble(wbdj);
					s_wbje=DoubleCal.round(s_wbdj*s_cgsl, 2);
					s_cgje=DoubleCal.round(s_wbje*s_wbhl, 2);
					if(s_cgsl!=0){
						s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 6);
					}else{
						s_cgdj=0;
					}
					cd.setWbdj(s_wbdj);
					cd.setWbje(s_wbje);
					cd.setCgdj(s_cgdj);
					cd.setCgje(s_cgje);
				}else{
					s_cgdj=0;
					sql="  select top 1 cgdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh";
					sql+="	where csbh='"+csbh+"' and clhh='"+s_clhh+"'  and kjlx='"+s_kjlx+"' and cgdj>0  and htmxb.htbh<>'"+cd.getHtbh()+"' order by czsj DESC ";
					params.put("sql",sql);
					String cgdj=purchaseDetailMapper.getStringFromSql(params);
					if(cgdj==null){
						cgdj="0";
					}
					s_cgdj=Double.parseDouble(cgdj);
					s_cgje=DoubleCal.round(s_cgsl*s_cgdj, 2);
					cd.setCgdj(s_cgdj);
					cd.setCgje(s_cgje);
				}
				if(params.get("recstr")==null){
					purchaseOrderDetailMapper.updatePurchaseOrderDetail(cd);
				}
			}
			if(params.get("recstr")!=null){
				json.put("cdList", MyJsonUtil.getJSONString(cds));
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "单价信息导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 入库单价导入
	 * Request purchasedetail/purchasecontract.act?method=getSippingPriceLoadList  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-20
	 */
	public String getSippingPriceLoadList(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			//如果回传数组为空则作为全部数据变更处理
			List<PurchaseOrderDetail> cds=null;
			if(params.get("recstr")==null){
				//取当前编辑数据
				cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
				//return  json.toString();
			}else{
				String recstr=params.get("recstr").toString();
				cds=MyJsonUtil.str2list(recstr, PurchaseOrderDetail.class);
			}
			String csbh=params.get("csbh").toString();
			double s_cgsl,s_wbdj,s_wbje,s_cgje,s_cgdj;
			for(PurchaseOrderDetail cd:cds){
				String s_clhh=cd.getClhh();
				s_cgsl=cd.getCgsl();
				String s_wbbh=cd.getWbbh();
				double s_wbhl=cd.getWbhl();
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				if(s_wbbh!=null&&!s_wbbh.equals("")){
					s_wbdj=cd.getWbdj();
					sql="  select top 1 wbdj  from rkdb_yl  with (nolock) where csbh='"+csbh+"' and clhh='"+s_clhh+"'  and wbdj>0  order by rkrq DESC";
					params.put("sql",sql);
					String wbdj=purchaseDetailMapper.getStringFromSql(params);
					if(wbdj==null){
						wbdj="0";
					}
					s_wbdj=Double.parseDouble(wbdj);
					s_wbje=DoubleCal.round(s_wbdj*s_cgsl, 2);
					s_cgje=DoubleCal.round(s_wbje*s_wbhl, 2);
					if(s_cgsl!=0){
						s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 6);
					}else{
						s_cgdj=0;
					}
					cd.setWbdj(s_wbdj);
					cd.setWbje(s_wbje);
					cd.setCgdj(s_cgdj);
					cd.setCgje(s_cgje);
				}else{
					s_cgdj=0;
					sql="  select top 1 rkdj  from rkdb_yl  with (nolock) where csbh='"+csbh+"' and clhh='"+s_clhh+"'  and rkdj>0  order by rkrq DESC";
					params.put("sql",sql);
					String cgdj=purchaseDetailMapper.getStringFromSql(params);
					if(cgdj==null){
						cgdj="0";
					}
					s_cgdj=Double.parseDouble(cgdj);
					s_cgje=DoubleCal.round(s_cgsl*s_cgdj, 2);
					cd.setCgdj(s_cgdj);
					cd.setCgje(s_cgje);
				}
				if(params.get("recstr")==null){
					
				}
			}
			if(params.get("recstr")!=null){
				json.put("cdList", MyJsonUtil.getJSONString(cds));
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "入库单价导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 控制信息导入
	 * Request purchasedetail/purchasecontract.act?method=getCtlPriceLoadList  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-20
	 */
	public String getCtlPriceLoadList(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String csbh=params.get("csbh").toString();
			//如果回传数组为空则作为全部数据变更处理
			List<PurchaseOrderDetail> cds=null;
			if(params.get("recstr")==null){
				//取当前编辑数据
				cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
				//return  json.toString();
			}else{
				String recstr=params.get("recstr").toString();
				cds=MyJsonUtil.str2list(recstr, PurchaseOrderDetail.class);
			}
			double s_cgsl,s_wbdj,s_wbje,s_cgje,s_cgdj;
			for(PurchaseOrderDetail cd:cds){
				String s_clhh=cd.getClhh();
				s_cgsl=cd.getCgsl();
				String s_wbbh=cd.getWbbh();
				double s_wbhl=cd.getWbhl();
				int s_kjlx=cd.getKjlx();
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				if(s_wbbh!=null&&!s_wbbh.equals("")){
					params.put("csbh", csbh);
					params.put("clhh", s_clhh);
					params.put("cgsl", 0);
					params.put("wbbh", s_wbbh);
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						FunctionPurchaseCtl fpc=fpcList.get(0);
						if(s_kjlx==0){
							s_wbdj=fpc.getKzdj();
						}else{
							s_wbdj=fpc.getFzkj();
						}
						
						s_wbje=DoubleCal.round(s_wbdj*s_cgsl, 2);
						s_cgje=DoubleCal.round(s_wbje*s_wbhl, 2);
						if(s_cgsl!=0){
							s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 6);
						}else{
							s_cgdj=0;
						}
						cd.setKzdj(s_wbdj);
						cd.setWbdj(s_wbdj);
						cd.setWbje(s_wbje);
						cd.setCgdj(s_cgdj);
						cd.setCgje(s_cgje);
					}
				}else{
					params.put("csbh", csbh);
					params.put("clhh", s_clhh);
					params.put("cgsl", 0);
					params.put("wbbh", s_wbbh);
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						FunctionPurchaseCtl fpc=fpcList.get(0);
						if(s_kjlx==0){
							s_cgdj=fpc.getKzdj();
						}else{
							s_cgdj=fpc.getFzkj();
						}
						
						s_cgje=DoubleCal.round(s_cgdj*s_cgsl, 2);
						cd.setKzdj(s_cgdj);
						cd.setCgdj(s_cgdj);
						cd.setCgje(s_cgje);
					}
				}
				if(params.get("recstr")==null){
					purchaseOrderDetailMapper.updatePurchaseOrderDetail(cd);
				}
			}
			if(params.get("recstr")!=null){
				json.put("cdList", MyJsonUtil.getJSONString(cds));
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "控制信息导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 模具号导入
	 * Request purchasedetail/purchasecontract.act?method=getModelLoadList  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-20
	 */
	public String getModelLoadList(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			//如果回传数组为空则作为全部数据变更处理
			List<PurchaseOrderDetail> cds=null;
			if(params.get("recstr")==null){
				//取当前编辑数据
				cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
				//return  json.toString();
			}else{
				String recstr=params.get("recstr").toString();
				cds=MyJsonUtil.str2list(recstr, PurchaseOrderDetail.class);
			}
			String csbh=params.get("csbh").toString();
			for(PurchaseOrderDetail cd:cds){
				sql="  select mjh  from cgxxb where clhh='"+cd.getClhh()+"' and csbh='"+csbh+"'";
				params.put("sql",sql);
				String mjh=purchaseDetailMapper.getStringFromSql(params);
				cd.setMjh(mjh);
				if(params.get("recstr")==null){
					purchaseOrderDetailMapper.updatePurchaseOrderDetail(cd);
				}
			}
			if(params.get("recstr")!=null){
				json.put("cdList", MyJsonUtil.getJSONString(cds));
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "模具号导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 采计数量导入
	 * Request purchasedetail/purchasecontract.act?method=getNumberLoadList  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-29
	 */
	public String getNumberLoadList(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			//如果回传数组为空则作为全部数据变更处理
			List<PurchaseOrderDetail> cds=null;
			if(params.get("recstr")==null){
				//取当前编辑数据
				cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
				//return  json.toString();
			}else{
				String recstr=params.get("recstr").toString();
				cds=MyJsonUtil.str2list(recstr, PurchaseOrderDetail.class);
			}
			String csbh=params.get("csbh").toString();
			long s_kjlx,ls_fzzbj,ls_cgbh,ls_cgxh;
			double ls_cgsl,ls_cgdj,ls_wbdj,ls_cgje,ls_wbje,ls_fzsl;
			double ls_dlgs,ls_djyl,ls_clgg,ls_zhxs;
			String ls_clhh,ls_cltx1;
			for(PurchaseOrderDetail cd:cds){
				sql="  select cgsl  from cgjhmxb where cgbh='"+cd.getCgbh()+"' and cgxh='"+cd.getCgxh()+"' ";
				params.put("sql",sql);
				String cgsl=purchaseDetailMapper.getStringFromSql(params);
				if(cgsl==null){
					cgsl="0";
				}
				ls_cgsl=Double.parseDouble(cgsl);
				cd.setCgsl(ls_cgsl);
				s_kjlx=cd.getKjlx();
				ls_fzsl=cd.getFzsl();
				ls_cgdj=cd.getCgdj();
				ls_wbdj=cd.getWbdj();
				cd.setYcgl(ls_cgsl);
				ls_clhh=cd.getClhh();
				ls_cltx1=cd.getCltx1();
				params.put("clhh", ls_clhh);
				params.put("cltx1", ls_cltx1);
				ls_zhxs=purchaseDetailMapper.getConversion(params);
				//System.out.println(ls_zhxs);
				if(ls_zhxs>0){
					cd.setFzsl(DoubleCal.round(ls_cgsl*ls_zhxs,3));
				}else{
					cd.setFzsl(0);
				}
				ls_fzsl=cd.getFzsl();
				if(s_kjlx!=1){
					ls_cgje=DoubleCal.round(ls_cgsl*ls_cgdj, 2);
					ls_wbje=DoubleCal.round(ls_cgsl*ls_wbdj, 2);
				}else{
					ls_cgje=DoubleCal.round(ls_fzsl*ls_cgdj, 2);
					ls_wbje=DoubleCal.round(ls_fzsl*ls_wbdj, 2);
				}
				if(ls_cgje==0){
					ls_cgje=DoubleCal.round(ls_wbje*cd.getWbhl(), 2);
					if(s_kjlx!=1){
						if(ls_cgsl!=0){
							ls_cgdj=DoubleCal.round(ls_cgje/ls_cgsl, 4);
						}
					}else{
						if(ls_fzsl!=0){
							ls_cgdj=DoubleCal.round(ls_cgje/ls_fzsl, 4);
						}
					}
				}
				cd.setCgdj(ls_cgdj);
				cd.setCgje(ls_cgje);
				cd.setWbje(ls_wbje);
				sql="  select fzzbj  from clbmb where clhh='"+ls_clhh+"'";
				params.put("sql",sql);
				String fzzbj=purchaseDetailMapper.getStringFromSql(params);
				if(fzzbj==null){
					fzzbj="0";
				}
				ls_fzzbj=Integer.parseInt(fzzbj);
				if(ls_fzzbj==5 ||ls_fzzbj==6){
					ls_cgbh=cd.getCgbh();
					ls_cgxh=cd.getCgxh();
					sql="  select dlgs  from cgjhmxb where cgbh='"+ls_cgbh+"' and cgxh='"+ls_cgxh+"'";
					params.put("sql",sql);
					String dlgs=purchaseDetailMapper.getStringFromSql(params);
					if(dlgs==null){
						dlgs="0";
					}
					ls_dlgs=Double.parseDouble(dlgs);
					int rowCount=0;
					sql="  select top 1 dgyl  from cghtfzb_tmp cghtfzb where cghtfzb.htbh='"+cd.getHtbh()+"' and cghtfzb.htxh='"+cd.getHtxh()+"' and login_id='"+cd.getLogin_id()+"' and ip='"+cd.getIp()+"' ";
					params.put("sql",sql);
					String dgylStr=purchaseDetailMapper.getStringFromSql(params);
					if(dgylStr==null){
						dgylStr="0";
					}else{
						rowCount=1;
					}
					double dgyl=Double.parseDouble(dgylStr);
					if(rowCount>0){
						ls_djyl=dgyl;
					}else{
						ls_djyl=0;
					}
					if(cd.getCltx1()!=null&&!"".equals(cd.getCltx1().trim())){
						ls_clgg=MyStringUtils.getStrToNum(cd.getCltx1());
					}else{
						ls_clgg=0;
					}
					if(ls_clgg!=0&&ls_djyl!=0&&ls_dlgs!=0){
						cd.setDlgs((int)(ls_clgg/ls_djyl)*DoubleCal.round(ls_fzsl*ls_clgg, 0));
					}
				}
				if(params.get("recstr")==null){
					purchaseOrderDetailMapper.updatePurchaseOrderDetail(cd);
				}
			}
			if(params.get("recstr")!=null){
				json.put("cdList", MyJsonUtil.getJSONString(cds));
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "采计数量导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 材料名称 关联更改
	 * Request purchasedetail/purchasecontract.act?method=getClmcWithOut  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-23
	 */
	public String getClmcWithOut(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString();
			String csbh=params.get("csbh").toString();
			ContractDetail cd=MyJsonUtil.str2obj(recstr, ContractDetail.class);
			double   s_cgsl,s_cgdj,s_kzdj,s_wbdj,s_cgje,s_wbje,s_fzsl,f_cgdj,s_zzhxs;
			String   s_jldw,s_clmc,s_clth,s_fzdw,s_txgz,s_wbbh;
			long     s_ghzq,s_cgtqq,s_count,s_fzzbj,s_cgbh,s_cgxh,ls_yzws;
			Date s_cgrq;
			int f_nf = 0,f_yf = 0;
			String s_clhh=cd.getClmc();
			FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
			s_clmc=cd.getClmc();
			Date s_jhrq=cd.getJhrq();
			int s_htbh=cd.getHtbh();
			int s_kjlx=cd.getKjlx();
			//System.out.println(s_jhrq);
			//当clhh为空时不处理
			if(s_clhh!=null&&!s_clhh.equals("")){
				String search = "( clhh='"+s_clhh+"' or clth='"+s_clhh+"' or clmc='"+s_clhh+"' )";
				params.put("search", search);
				List<MaterialCoding>  mcs=purchaseDetailMapper.getMaterialCodingList(params);
				MaterialCoding mcd=new MaterialCoding();
				if(mcs.size()>0){
					mcd=mcs.get(0);
				}else{
				}
					s_clhh=mcd.getClhh();
					s_clth=mcd.getClth();
					s_clmc=mcd.getClmc();
					s_jldw=mcd.getJldw();
					s_fzdw=mcd.getFzdw();
					s_fzzbj=mcd.getFzzbj();
					s_txgz=mcd.getTxgz();
					s_zzhxs=mcd.getZzhxs();
					sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
					params.put("sql",sql);
					s_wbbh=purchaseDetailMapper.getStringFromSql(params);
					if(s_wbbh==null){
						s_wbbh="";
					}else{
						s_wbbh=s_wbbh.trim();
					}
					if(!s_wbbh.equals("")){
						s_wbdj=cd.getWbdj();
						sql= "  select top 1 wbdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
						sql+="  where cghtb.csbh='"+csbh+"' and htmxb.clhh='"+s_clhh+"' " ;
						sql+=" and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>'"+s_htbh+"' order by cghtb.czsj desc";
						params.put("sql",sql);
						String wbdjStr=purchaseDetailMapper.getStringFromSql(params);
						if(wbdjStr==null){
							wbdjStr="0";
						}
						f_cgdj=Double.parseDouble(wbdjStr);
						params.put("csbh", csbh);
						params.put("clhh", cd.getClhh());
						params.put("cgsl", 0);
						params.put("wbbh", "");
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
						}
						if(f_cgdj==0){
							if(s_kjlx!=1){
								cd.setCgdj(fpc.getCgdj());
							}else{
								cd.setCgdj(fpc.getFzkj());
							}
						}else{
							cd.setCgdj(f_cgdj);
						}
					}else{
						s_cgdj=cd.getCgdj();
						sql= "  select top 1 cgdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
						sql+="  where cghtb.csbh='"+csbh+"' and htmxb.clhh='"+s_clhh+"' " ;
						sql+=" and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>'"+s_htbh+"' order by cghtb.czsj desc";
						params.put("sql",sql);
						String wbdjStr=purchaseDetailMapper.getStringFromSql(params);
						if(wbdjStr==null){
							wbdjStr="0";
						}
						f_cgdj=Double.parseDouble(wbdjStr);
						params.put("csbh", csbh);
						params.put("clhh", cd.getClhh());
						params.put("cgsl", 0);
						params.put("wbbh", "");
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
						}
						if(f_cgdj==0){
							if(s_kjlx!=1){
								cd.setCgdj(fpc.getCgdj());
							}else{
								cd.setCgdj(fpc.getFzkj());
							}
						}else{
							cd.setCgdj(f_cgdj);
						}
					}
					cd.setClhh(s_clhh);
					cd.setClmc(s_clmc);
					cd.setClth(s_clth);
					cd.setJldw(s_jldw);
					cd.setFzdw(s_fzdw);
					cd.setFzzbj(s_fzzbj);
					cd.setZzhxs(s_zzhxs);
					cd.setTxgz(s_txgz);
					cd.setGhzq(fpc.getGhzq());
					double s_zhxs=purchaseDetailMapper.getConversion(params);
					if(s_zhxs>0){
						s_fzsl=DoubleCal.round(cd.getCgsl()*s_zhxs, 3,BigDecimal.ROUND_HALF_UP);
					}else{
						s_fzsl=0;
					}
					cd.setFzsl(s_fzsl);
					if(s_kjlx!=1){
						cd.setKzdj(fpc.getKzdj());
					}else{
						cd.setKzdj(fpc.getFzkj());
					}
					if(fpc.getGhzq()!=0){
						Calendar rightNow = Calendar.getInstance();
						if(s_jhrq!=null){
							rightNow.setTime(s_jhrq);
							rightNow.add(Calendar.DAY_OF_YEAR,-(int)fpc.getGhzq());
							cd.setCgrq(rightNow.getTime());
						}
					}
					sql="  select mjh  from cgxxb where clhh='"+s_clhh+"' and csbh='"+csbh+"' ";
					params.put("sql",sql);
					String mjh=purchaseDetailMapper.getStringFromSql(params);
					cd.setMjh(mjh);
					s_cgsl=cd.getCgdj();
					s_fzsl=cd.getFzsl();
					s_cgdj=cd.getCgdj();
					s_wbdj=cd.getWbdj();
					s_cgrq=cd.getCgrq();
					if(!s_wbbh.equals("")){
						f_nf=s_cgrq.getYear()+1900;
						f_yf=s_cgrq.getMonth()+1;
						sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
						params.put("sql",sql);
						String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
						if(wbhlStr==null){
							wbhlStr="0";
						}
						//获取外币单号
						sql="  select wbdh  from wbmcb where wbbh='"+s_wbbh+"'";
						params.put("sql",sql);
						double wbhl=Double.parseDouble(wbhlStr);
						if(s_kjlx!=1){
							s_wbje=DoubleCal.round(s_wbdj*s_cgsl, 2);
						}else{
							s_wbje=DoubleCal.round(s_wbdj*s_fzsl, 2);
						}
						s_cgje=DoubleCal.round(s_wbje*wbhl, 2);
						if(s_cgsl!=0){
							if(s_kjlx!=1){
								s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
							}else{
								if(s_fzsl==0){
									s_cgdj=0;
								}else{
									s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
								}
							}
						}else{
							s_cgdj=0;
						}
						cd.setWbbh(s_wbbh);
						cd.setWbhl(wbhl);
						cd.setCgdj(s_cgdj);
						cd.setCgje(s_cgje);
						cd.setWbdj(s_wbdj);
						cd.setWbje(s_wbje);
					}else{
						if(s_kjlx!=1){
							s_cgje=DoubleCal.round(s_cgdj*s_cgsl, 2);
						}else{
							s_cgje=DoubleCal.round(s_cgdj*s_fzsl, 2);
						}
						cd.setWbbh("");
						cd.setWbhl(0);
						cd.setCgdj(s_cgdj);
						cd.setCgje(s_cgje);
						cd.setWbdj(0);
						cd.setWbje(0);
					}
					cd.setClth(s_clth);
					cd.setClmc(s_clmc);
			}
			json.put("cd", MyJsonUtil.getJSONString(cd));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "材料名称关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 控价类型关联更改
	 * Request purchasedetail/purchasecontract.act?method=getKjlxWithOutAll  <br/><br/>
	 * @author wq
	 * @date 2016-10-25
	 */
	public String getKjlxWithOutAll(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String csbh=params.get("csbh").toString();
			//如果回传数组为空则作为全部数据变更处理
			List<PurchaseOrderDetail> cds=null;
			cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
			int s_kjlx=Integer.parseInt(params.get("kjlx").toString());
			for(PurchaseOrderDetail cd:cds){
				cd.setKjlx(s_kjlx);
				String s_clhh=cd.getClhh();
				sql="  select count(*)  from clbmb where clhh='"+s_clhh+"' or clth='"+s_clhh+"' or clmc='"+s_clhh+"' ";
				params.put("sql",sql);
				String s_wbbh;
				Date s_cgrq;
				double   s_cgsl,s_cgdj,s_wbdj,s_cgje,s_wbje,s_fzsl,f_cgdj;
				int f_nf,f_yf;
				String countstr=purchaseDetailMapper.getStringFromSql(params);
				int count=Integer.parseInt(countstr);
				FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
				if(count>0){
					sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
					params.put("sql",sql);
					s_wbbh=purchaseDetailMapper.getStringFromSql(params);
					if(s_wbbh==null){
						s_wbbh="";
					}else{
						s_wbbh=s_wbbh.trim();
					}
					if(!s_wbbh.equals("")){
						s_cgdj=cd.getCgdj();
						sql= "  select top 1 wbdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
						sql+="  where cghtb.csbh='"+csbh+"' and htmxb.clhh='"+s_clhh+"' " ;
						sql+=" and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>'"+cd.getHtbh()+"' order by cghtb.czsj desc";
						params.put("sql",sql);
						String wbdjStr=purchaseDetailMapper.getStringFromSql(params);
						if(wbdjStr==null){
							wbdjStr="0";
						}
						f_cgdj=Double.parseDouble(wbdjStr);
						params.put("csbh", csbh);
						params.put("clhh", cd.getClhh());
						params.put("cgsl", 0);
						params.put("wbbh", "");
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
						}
						if(f_cgdj==0){
							if(s_kjlx!=1){
								cd.setCgdj(fpc.getCgdj());
							}else{
								cd.setCgdj(fpc.getFzkj());
							}
						}else{
							cd.setCgdj(f_cgdj);
						}
					}else{
						s_cgdj=cd.getCgdj();
						sql= "  select top 1 cgdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
						sql+="  where cghtb.csbh='"+csbh+"' and htmxb.clhh='"+s_clhh+"' " ;
						sql+=" and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>'"+cd.getHtbh()+"' order by cghtb.czsj desc";
						params.put("sql",sql);
						String wbdjStr=purchaseDetailMapper.getStringFromSql(params);
						if(wbdjStr==null){
							wbdjStr="0";
						}
						f_cgdj=Double.parseDouble(wbdjStr);
						params.put("csbh", csbh);
						params.put("clhh", cd.getClhh());
						params.put("cgsl", 0);
						params.put("wbbh", "");
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
						}
						if(f_cgdj==0){
							if(s_kjlx!=1){
								cd.setCgdj(fpc.getCgdj());
							}else{
								cd.setCgdj(fpc.getFzkj());
							}
						}else{
							cd.setCgdj(f_cgdj);
						}
					}
					if(s_kjlx!=1){
						cd.setKzdj(fpc.getKzdj());
					}else{
						cd.setKzdj(fpc.getFzkj());
					}
					s_cgsl=cd.getCgdj();
					s_fzsl=cd.getFzsl();
					s_cgdj=cd.getCgdj();
					s_wbdj=cd.getWbdj();
					s_cgrq=cd.getCgrq();
					if(!s_wbbh.equals("")){
						f_nf=s_cgrq.getYear()+1900;
						f_yf=s_cgrq.getMonth()+1;
						sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
						params.put("sql",sql);
						String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
						if(wbhlStr==null){
							wbhlStr="0";
						}
						//获取外币单号
						sql="  select wbdh  from wbmcb where wbbh='"+s_wbbh+"'";
						params.put("sql",sql);
						double wbhl=Double.parseDouble(wbhlStr);
						if(s_kjlx!=1){
							s_wbje=DoubleCal.round(s_wbdj*s_cgsl, 2);
						}else{
							s_wbje=DoubleCal.round(s_wbdj*s_fzsl, 2);
						}
						s_cgje=DoubleCal.round(s_wbje*wbhl, 2);
						if(s_cgsl!=0){
							if(s_kjlx!=1){
								s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
							}else{
								if(s_fzsl==0){
									s_cgdj=0;
								}else{
									s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
								}
							}
						}else{
							s_cgdj=0;
						}
						cd.setWbbh(s_wbbh);
						cd.setWbhl(wbhl);
						cd.setCgdj(s_cgdj);
						cd.setCgje(s_cgje);
						cd.setWbdj(s_wbdj);
						cd.setWbje(s_wbje);
					}else{
						if(s_kjlx!=1){
							s_cgje=DoubleCal.round(s_cgdj*s_cgsl, 2);
						}else{
							s_cgje=DoubleCal.round(s_cgdj*s_fzsl, 2);
						}
						cd.setWbbh("");
						cd.setWbhl(0);
						cd.setCgdj(s_cgdj);
						cd.setCgje(s_cgje);
						cd.setWbdj(0);
						cd.setWbje(0);
					}
				}
				purchaseOrderDetailMapper.updatePurchaseOrderDetail(cd);
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "控件类型关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 控价类型关联更改
	 * Request purchasedetail/purchasecontract.act?method=getKjlxWithOut  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-29
	 */
	public String getKjlxWithOut(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString();
			String csbh=params.get("csbh").toString();
			ContractDetail cd=(ContractDetail)MyJsonUtil.str2obj(recstr, ContractDetail.class);
			int s_kjlx=cd.getKjlx();
			String s_clhh=cd.getClhh();
			sql="  select count(*)  from clbmb where clhh='"+s_clhh+"' or clth='"+s_clhh+"' or clmc='"+s_clhh+"' ";
			params.put("sql",sql);
			String s_wbbh;
			Date s_cgrq;
			double   s_cgsl,s_cgdj,s_wbdj,s_cgje,s_wbje,s_fzsl,f_cgdj;
			int f_nf,f_yf;
			String countstr=purchaseDetailMapper.getStringFromSql(params);
			int count=Integer.parseInt(countstr);
			FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
			if(count>0){
				sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
				params.put("sql",sql);
				s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				if(!s_wbbh.equals("")){
					s_cgdj=cd.getCgdj();
					sql= "  select top 1 wbdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
					sql+="  where cghtb.csbh='"+csbh+"' and htmxb.clhh='"+s_clhh+"' " ;
					sql+=" and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>'"+cd.getHtbh()+"' order by cghtb.czsj desc";
					params.put("sql",sql);
					String wbdjStr=purchaseDetailMapper.getStringFromSql(params);
					if(wbdjStr==null){
						wbdjStr="0";
					}
					f_cgdj=Double.parseDouble(wbdjStr);
					params.put("csbh", csbh);
					params.put("clhh", cd.getClhh());
					params.put("cgsl", 0);
					params.put("wbbh", "");
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						fpc=fpcList.get(0);
					}
					if(f_cgdj==0){
						if(s_kjlx!=1){
							cd.setCgdj(fpc.getCgdj());
						}else{
							cd.setCgdj(fpc.getFzkj());
						}
					}else{
						cd.setCgdj(f_cgdj);
					}
				}else{
					s_cgdj=cd.getCgdj();
					sql= "  select top 1 cgdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
					sql+="  where cghtb.csbh='"+csbh+"' and htmxb.clhh='"+s_clhh+"' " ;
					sql+=" and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>'"+cd.getHtbh()+"' order by cghtb.czsj desc";
					params.put("sql",sql);
					String wbdjStr=purchaseDetailMapper.getStringFromSql(params);
					if(wbdjStr==null){
						wbdjStr="0";
					}
					f_cgdj=Double.parseDouble(wbdjStr);
					params.put("csbh", csbh);
					params.put("clhh", cd.getClhh());
					params.put("cgsl", 0);
					params.put("wbbh", "");
					List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
					if(fpcList.size()>0){
						fpc=fpcList.get(0);
					}
					if(f_cgdj==0){
						if(s_kjlx!=1){
							cd.setCgdj(fpc.getCgdj());
						}else{
							cd.setCgdj(fpc.getFzkj());
						}
					}else{
						cd.setCgdj(f_cgdj);
					}
				}
				if(s_kjlx!=1){
					cd.setKzdj(fpc.getKzdj());
				}else{
					cd.setKzdj(fpc.getFzkj());
				}
				s_cgsl=cd.getCgdj();
				s_fzsl=cd.getFzsl();
				s_cgdj=cd.getCgdj();
				s_wbdj=cd.getWbdj();
				s_cgrq=cd.getCgrq();
				if(!s_wbbh.equals("")){
					f_nf=s_cgrq.getYear()+1900;
					f_yf=s_cgrq.getMonth()+1;
					sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
					params.put("sql",sql);
					String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
					if(wbhlStr==null){
						wbhlStr="0";
					}
					//获取外币单号
					sql="  select wbdh  from wbmcb where wbbh='"+s_wbbh+"'";
					params.put("sql",sql);
					double wbhl=Double.parseDouble(wbhlStr);
					if(s_kjlx!=1){
						s_wbje=DoubleCal.round(s_wbdj*s_cgsl, 2);
					}else{
						s_wbje=DoubleCal.round(s_wbdj*s_fzsl, 2);
					}
					s_cgje=DoubleCal.round(s_wbje*wbhl, 2);
					if(s_cgsl!=0){
						if(s_kjlx!=1){
							s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
						}else{
							if(s_fzsl==0){
								s_cgdj=0;
							}else{
								s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
							}
						}
					}else{
						s_cgdj=0;
					}
					cd.setWbbh(s_wbbh);
					cd.setWbhl(wbhl);
					cd.setCgdj(s_cgdj);
					cd.setCgje(s_cgje);
					cd.setWbdj(s_wbdj);
					cd.setWbje(s_wbje);
				}else{
					if(s_kjlx!=1){
						s_cgje=DoubleCal.round(s_cgdj*s_cgsl, 2);
					}else{
						s_cgje=DoubleCal.round(s_cgdj*s_fzsl, 2);
					}
					cd.setWbbh("");
					cd.setWbhl(0);
					cd.setCgdj(s_cgdj);
					cd.setCgje(s_cgje);
					cd.setWbdj(0);
					cd.setWbje(0);
				}
				json.put("cd", MyJsonUtil.getJSONString(cd));
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "控件类型关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 采购日期关联更改所有明细
	 * Request purchasedetail/purchasecontract.act?method=getCgrqWithOutAll  <br/><br/>
	 * @author wq
	 * @throws ParseException 
	 * @date 2016-10-25
	 */
	public String getCgrqWithOutAll(Map<String,Object> params) throws ParseException {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			List<PurchaseOrderDetail> cds=null;
			cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
			String csbh=params.get("csbh").toString();
			SimpleDateFormat df= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for(PurchaseOrderDetail cd :cds){
				cd.setCgrq(df.parse(params.get("cgrq").toString()));
				int s_kjlx=cd.getKjlx();
				String s_wbbh;
				Date s_cgrq;
				s_kjlx=cd.getKjlx();
				s_cgrq=cd.getCgrq();
				double   s_cgsl,s_cgdj = 0,s_cgje,s_wbje,s_fzsl;
				int f_nf,f_yf;
				sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
				params.put("sql",sql);
				s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				if (!s_wbbh.equals("")) {
					f_nf=s_cgrq.getYear()+1900;
					f_yf=s_cgrq.getMonth()+1;
					s_cgsl=cd.getCgsl();
					s_fzsl=cd.getFzsl();
					s_wbje=cd.getWbje();
					sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
					params.put("sql",sql);
					String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
					if(wbhlStr==null){
						wbhlStr="0";
					}
					double wbhl=Double.parseDouble(wbhlStr);
					s_cgje=DoubleCal.round(s_wbje*wbhl, 2);
					if(s_cgsl!=0){
						if(s_kjlx!=1){
							s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
						}else{
							if(s_fzsl==0){
								s_cgdj=0;
							}else{
								s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
							}
						}
					}
					cd.setCgdj(s_cgdj);
					cd.setCgje(s_cgje);
				}
				purchaseOrderDetailMapper.updatePurchaseOrderDetail(cd);
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "采购日期关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 采购日期关联更改
	 * Request purchasedetail/purchasecontract.act?method=getCgrqWithOut  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-29
	 */
	public String getCgrqWithOut(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString();
			String csbh=params.get("csbh").toString();
			ContractDetail cd=(ContractDetail)MyJsonUtil.str2obj(recstr, ContractDetail.class);
			int s_kjlx=cd.getKjlx();
			String s_wbbh;
			Date s_cgrq;
			s_kjlx=cd.getKjlx();
			s_cgrq=cd.getCgrq();
			double   s_cgsl,s_cgdj = 0,s_cgje,s_wbje,s_fzsl;
			int f_nf,f_yf;
			sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
			params.put("sql",sql);
			s_wbbh=purchaseDetailMapper.getStringFromSql(params);
			if(s_wbbh==null){
				s_wbbh="";
			}else{
				s_wbbh=s_wbbh.trim();
			}
			if (!s_wbbh.equals("")) {
				f_nf=s_cgrq.getYear()+1900;
				f_yf=s_cgrq.getMonth()+1;
				s_cgsl=cd.getCgsl();
				s_fzsl=cd.getFzsl();
				s_wbje=cd.getWbje();
				sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
				params.put("sql",sql);
				String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
				if(wbhlStr==null){
					wbhlStr="0";
				}
				double wbhl=Double.parseDouble(wbhlStr);
				cd.setWbhl(wbhl);
				s_cgje=DoubleCal.round(s_wbje*wbhl, 2);
				if(s_cgsl!=0){
					if(s_kjlx!=1){
						s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
					}else{
						if(s_fzsl==0){
							s_cgdj=0;
						}else{
							s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
						}
					}
				}
				cd.setCgdj(s_cgdj);
				cd.setCgje(s_cgje);
			}
			json.put("cd", MyJsonUtil.getJSONString(cd));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "采购日期关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	
	/**
	 * 供货周期关联更改 全部
	 * Request purchasedetail/purchasecontract.act?method=getGhzqWithOutAll  <br/><br/>
	 * @author wq
	 * @throws ParseException 
	 * @date 2016-02-29
	 */
	public String getGhzqWithOutAll(Map<String,Object> params) throws ParseException {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			//如果回传数组为空则作为全部数据变更处理
			List<PurchaseOrderDetail> cds=null;
			//取当前编辑数据
			cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
			String csbh=params.get("csbh").toString();
			SimpleDateFormat df= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for(PurchaseOrderDetail cd : cds){
				cd.setJhrq(df.parse(params.get("jhrq").toString()));
				String s_wbbh;
				Date s_cgrq,s_jhrq;
				double   s_cgsl,s_cgdj = 0,s_wbdj,s_cgje,s_wbje,s_fzsl,f_cgdj,s_zzhxs,s_ghzq;
				int f_nf,f_yf,s_kjlx;
				FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
				sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
				params.put("sql",sql);
				s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				s_kjlx=cd.getKjlx();
				s_jhrq=cd.getJhrq();
				s_ghzq=cd.getGhzq();
				s_cgrq=cd.getCgrq();
				if(s_ghzq!=0){
					Calendar rightNow = Calendar.getInstance();
					if(s_jhrq==null){
						json.put("bool", false);
						json.put("msg", "交货日期为空，请调整！");
						return json.toString();
					}
					rightNow.setTime(s_jhrq);
					rightNow.add(Calendar.DAY_OF_YEAR,-(int)s_ghzq);
					cd.setCgrq(rightNow.getTime());
				}
				if (!s_wbbh.equals("")) {
					if(s_cgrq==null){
						json.put("bool", false);
						json.put("msg", "采购日期为空，请调整！");
						return json.toString();
					}
					f_nf=s_cgrq.getYear()+1900;
					f_yf=s_cgrq.getMonth()+1;
					s_cgsl=cd.getCgsl();
					s_fzsl=cd.getFzsl();
					s_wbje=cd.getWbje();
					sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
					params.put("sql",sql);
					String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
					if(wbhlStr==null){
						wbhlStr="0";
					}
					double wbhl=Double.parseDouble(wbhlStr);
					cd.setWbhl(wbhl);
					s_cgje=DoubleCal.round(s_wbje*wbhl, 2);
					if(s_cgsl!=0){
						if(s_kjlx!=1){
							s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
						}else{
							if(s_fzsl==0){
								s_cgdj=0;
							}else{
								s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
							}
						}
					}
					cd.setCgdj(s_cgdj);
					cd.setCgje(s_cgje);
				}
				purchaseOrderDetailMapper.updatePurchaseOrderDetail(cd);
			}
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "供货周期关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 供货周期关联更改
	 * Request purchasedetail/purchasecontract.act?method=getGhzqWithOut  <br/><br/>
	 * @author wq
	 * @date 2016-02-29
	 */
	public String getGhzqWithOut(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
			String recstr=params.get("recstr").toString();
			String csbh=params.get("csbh").toString();
			ContractDetail cd=(ContractDetail)MyJsonUtil.str2obj(recstr, ContractDetail.class);
			String s_wbbh;
			Date s_cgrq,s_jhrq;
			double   s_cgsl,s_cgdj = 0,s_wbdj,s_cgje,s_wbje,s_fzsl,f_cgdj,s_zzhxs,s_ghzq;
			int f_nf,f_yf,s_kjlx;
			FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
			sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
			params.put("sql",sql);
			s_wbbh=purchaseDetailMapper.getStringFromSql(params);
			if(s_wbbh==null){
				s_wbbh="";
			}else{
				s_wbbh=s_wbbh.trim();
			}
			s_kjlx=cd.getKjlx();
			s_jhrq=cd.getJhrq();
			s_ghzq=cd.getGhzq();
			s_cgrq=cd.getCgrq();
			if(s_ghzq!=0){
				Calendar rightNow = Calendar.getInstance();
				if(s_jhrq==null){
					json.put("bool", false);
					json.put("msg", "交货日期为空，请调整！");
					return json.toString();
				}
				rightNow.setTime(s_jhrq);
				rightNow.add(Calendar.DAY_OF_YEAR,-(int)s_ghzq);
				cd.setCgrq(rightNow.getTime());
			}
			if (!s_wbbh.equals("")) {
				if(s_cgrq==null){
					json.put("bool", false);
					json.put("msg", "采购日期为空，请调整！");
					return json.toString();
				}
				f_nf=s_cgrq.getYear()+1900;
				f_yf=s_cgrq.getMonth()+1;
				s_cgsl=cd.getCgsl();
				s_fzsl=cd.getFzsl();
				s_wbje=cd.getWbje();
				sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
				params.put("sql",sql);
				String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
				if(wbhlStr==null){
					wbhlStr="0";
				}
				double wbhl=Double.parseDouble(wbhlStr);
				cd.setWbhl(wbhl);
				s_cgje=DoubleCal.round(s_wbje*wbhl, 2);
				if(s_cgsl!=0){
					if(s_kjlx!=1){
						s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
					}else{
						if(s_fzsl==0){
							s_cgdj=0;
						}else{
							s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
						}
					}
				}
				cd.setCgdj(s_cgdj);
				cd.setCgje(s_cgje);
			}
		json.put("cd", MyJsonUtil.obj2string(cd));
		return json.toString();
	}
	
	/**
	 * 采购数量关联更改
	 * Request purchasedetail/purchasecontract.act?method=getCgslWithOut  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-29
	 */
	public String getCgslWithOut(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString();
			String csbh=params.get("csbh").toString();
			ContractDetail cd=MyJsonUtil.str2obj(recstr, ContractDetail.class);
			int s_kjlx=cd.getKjlx();
			String s_clhh=cd.getClhh();
			String s_wbbh,ls_cltx1;
			double   ls_clgg,s_cgsl,s_cgdj = 0,s_wbdj,s_cgje = 0,s_wbje = 0,s_fzsl,ls_cgsl,s_zhxs,ld_fzsl,s_wbhl;
			String ls_clhh;
			int fzzbj,s_cgbh,s_cgxh;
			FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
			sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
			params.put("sql",sql);
			s_wbbh=purchaseDetailMapper.getStringFromSql(params);
			if(s_wbbh==null){
				s_wbbh="";
			}else{
				s_wbbh=s_wbbh.trim();
			}
			s_kjlx=cd.getKjlx();
			s_cgsl=cd.getCgsl();
			s_fzsl=cd.getFzsl();
			s_cgdj=cd.getCgdj();
			s_wbdj=cd.getWbdj();
			cd.setYcgl(s_cgsl);
			ls_clhh=cd.getClhh();
			ls_cltx1=cd.getCltx1();
			ls_cgsl=cd.getCgsl();
			params.put("clhh", ls_clhh);
			params.put("cltx1",ls_cltx1);
			s_zhxs=purchaseDetailMapper.getConversion(params);
			if(s_zhxs>0){
				ld_fzsl=DoubleCal.round(s_cgsl*s_zhxs, 3,BigDecimal.ROUND_HALF_UP);
			}else{
				ld_fzsl=0;
			}
			cd.setFzsl(ld_fzsl);
			s_fzsl=cd.getFzsl();
			s_wbhl=cd.getWbhl();
			if(s_kjlx!=1){
				s_cgje=DoubleCal.round(s_cgsl*s_cgdj, 2);
				s_wbje=DoubleCal.round(s_cgsl*s_wbdj, 2);
			}else{
				s_cgje=DoubleCal.round(s_fzsl*s_cgdj, 2);
				s_wbje=DoubleCal.round(s_fzsl*s_wbdj, 2);
			}
			if(s_cgje==0){
				s_cgje=DoubleCal.round(s_wbje*s_wbhl, 2);
				if(s_kjlx!=1){
					if(s_cgsl!=0){
						s_cgdj=DoubleCal.round(s_cgje/s_cgsl,4);
					}else{
						if(s_fzsl!=0){
							s_cgdj=DoubleCal.round(s_cgje/s_fzsl,4);
						}
					}
				}
			}
			cd.setCgdj(s_cgdj);
			cd.setCgje(s_cgje);
			cd.setWbje(s_wbje);
			//辅助数量变则短料变
			sql="  select fzzbj  from clbmb where clhh='"+s_clhh+"' ";
			params.put("sql",sql);
			String fzzbjstr=purchaseDetailMapper.getStringFromSql(params);
			if(fzzbjstr==null){
				fzzbjstr="0";
			}
			fzzbj=Integer.parseInt(fzzbjstr);
			if(fzzbj==5 || fzzbj==6){
				s_cgbh=cd.getCgbh();
				s_cgxh=cd.getCgxh();
				String djylstr=params.get("dgyl").toString();
				if(djylstr==null){
					djylstr="0";
				}
				double djyl=Double.parseDouble(djylstr);
				sql="  select dlgs  from cgjhmxb where cgbh='"+s_cgbh+"' and cgxh='"+s_cgxh+"' ";
				params.put("sql",sql);
				String dlgsstr=purchaseDetailMapper.getStringFromSql(params);
				if(dlgsstr==null){
					dlgsstr="0";
				}
				double dlgs=Double.parseDouble(dlgsstr);
				if(cd.getCltx1()!=null&&!"".equals(cd.getCltx1().trim())){
					ls_clgg=MyStringUtils.getStrToNum(cd.getCltx1());
				}else{
					ls_clgg=0;
				}
				if(ls_clgg!=0&&djyl!=0&&dlgs!=0){//排除未算出短料的采计部分
					cd.setDlgs((int)(ls_clgg/djyl)*DoubleCal.round(s_fzsl*ls_clgg, 0));
				}
			}
			json.put("cd", MyJsonUtil.getJSONString(cd));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "采购数量关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	
	/**
	 * 辅助数量关联更改
	 * Request purchasedetail/purchasecontract.act?method=getFzslWithOut  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-29
	 */
	public String getFzslWithOut(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString();
			ContractDetail cd=(ContractDetail)MyJsonUtil.str2obj(recstr, ContractDetail.class);
			String ls_clhh=cd.getClhh();
			String ls_cltx1=cd.getCltx1();
			double ls_fzsl=cd.getFzsl();
			params.put("clhh", ls_clhh);
			params.put("cltx1",ls_cltx1);
			double s_zhxs=purchaseDetailMapper.getConversion(params);
			int ls_yzws=0,fzzbj,s_cgbh,s_cgxh;
			sql="  select yzws  from clbmb where clhh='"+ls_clhh+"' ";
			params.put("sql",sql);
			String yzwsstr=purchaseDetailMapper.getStringFromSql(params);
			if(yzwsstr==null){
				yzwsstr="0";
			}
			int yzws=Integer.parseInt(yzwsstr);
			if(s_zhxs>0){
				cd.setCgsl(DoubleCal.round(ls_fzsl/s_zhxs, ls_yzws));
			}else{
				cd.setCgsl(0);
			}
			double s_cgsl,s_cgdj,s_wbdj,s_fzsl,s_kjlx,s_cgje,s_wbje,ls_clgg;
			s_cgsl=cd.getCgsl();
			s_cgdj=cd.getCgdj();
			s_wbdj=cd.getWbdj();
			s_fzsl=cd.getFzsl();
			s_kjlx=cd.getKjlx();
			cd.setYcgl(s_cgsl);
			if(s_kjlx!=1){
				s_cgje=DoubleCal.round(s_cgsl*s_cgdj, 2);
				s_wbje=DoubleCal.round(s_cgsl*s_wbdj, 2);
			}else{
				s_cgje=DoubleCal.round(s_fzsl*s_cgdj, 2);
				s_wbje=DoubleCal.round(s_fzsl*s_wbdj, 2);
			}
			cd.setCgje(s_cgje);
			cd.setWbje(s_wbje);
			//辅助数量变则短料变
			sql="  select fzzbj  from clbmb where clhh='"+ls_clhh+"' ";
			params.put("sql",sql);
			String fzzbjstr=purchaseDetailMapper.getStringFromSql(params);
			if(fzzbjstr==null){
				fzzbjstr="0";
			}
			fzzbj=Integer.parseInt(fzzbjstr);
			if(fzzbj==5 || fzzbj==6){
				s_cgbh=cd.getCgbh();
				s_cgxh=cd.getCgxh();
				String djylstr=params.get("djyl").toString();
				if(djylstr==null){
					djylstr="0";
				}
				int djyl=Integer.parseInt(djylstr);
				sql="  select dlgs  from cgjhmxb where cgbh='"+s_cgbh+"' and cgxh='"+s_cgxh+"' ";
				params.put("sql",sql);
				String dlgsstr=purchaseDetailMapper.getStringFromSql(params);
				if(dlgsstr==null){
					dlgsstr="0";
				}
				double dlgs=Double.parseDouble(dlgsstr);
				if(cd.getCltx1()!=null&&!"".equals(cd.getCltx1().trim())){
					ls_clgg=MyStringUtils.getStrToNum(cd.getCltx1());
				}else{
					ls_clgg=0;
				}
				if(ls_clgg!=0&&djyl!=0&&dlgs!=0){
					cd.setDlgs((int)(ls_clgg/djyl)*DoubleCal.round(s_fzsl*ls_clgg, 0));
				}
			}
			json.put("cd", MyJsonUtil.getJSONString(cd));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "辅助数量关联导入时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 材料特性关联更改
	 * Request purchasedetail/purchasecontract.act?method=getCltxWithOut  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-29
	 */
	public String getCltxWithOut(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString(),ls_cltx1;
			ContractDetail cd=(ContractDetail)MyJsonUtil.str2obj(recstr, ContractDetail.class);
			String ls_clhh,s_cltx1;
			int s_cgbh,s_cgxh,s_htxh,ls_fzzbj,rowCount,ls_yzws=0,s_kjlx;
			double s_clgg=0,s_dlgs=0,s_yzdl=0,s_bcdl=0,gjsl,jhsl,dgyl,s_clgs=0,ls_fzsl=0,s_zhxs=0,ls_cgsl=0;
			jhsl=Double.parseDouble(params.get("jhsl").toString());
			dgyl=Double.parseDouble(params.get("dgyl").toString());
			gjsl=Double.parseDouble(params.get("gjsl").toString());
			rowCount=Integer.parseInt(params.get("rowCount").toString());
			ls_clhh=cd.getClhh();
			s_cgbh=cd.getCgbh();
			s_cgxh=cd.getCgxh();
			s_htxh=cd.getHtxh();
			sql="  select fzzbj  from clbmb where clhh='"+ls_clhh+"'";
			params.put("sql",sql);
			String fzzbj=purchaseDetailMapper.getStringFromSql(params);
			if(fzzbj==null){
				fzzbj="0";
			}
			ls_fzzbj=Integer.parseInt(fzzbj);
			if(ls_fzzbj==2||ls_fzzbj==5||ls_fzzbj==6){
				s_cltx1=cd.getCltx1().trim();
				if("".equals(s_cltx1)){
					s_clgg=MyStringUtils.getStrToNum(s_cltx1);
					if(rowCount>0){
						sql="select dlgs from cgjhmxb with (nolock) where cgbh='"+cd.getCgbh()+"' and cgxh='"+cd.getCgxh()+"'";
						params.put("sql", sql);
						String str_Dlgs =purchaseDetailMapper.getStringFromSql(params);
						
						if(str_Dlgs!=null){
							s_dlgs=Double.parseDouble(str_Dlgs);
						}
						sql="select yzdl from cgjhmxb with (nolock) where cgbh='"+cd.getCgbh()+"' and cgxh='"+cd.getCgxh()+"'";
						params.put("sql", sql);
						String str_Yzdl =purchaseDetailMapper.getStringFromSql(params);
						if(str_Yzdl!=null){
							s_yzdl=Double.parseDouble(str_Yzdl);
						}
						sql="select dlgs from cgjhmxb with (nolock) where cgbh='"+cd.getCgbh()+"' and cgxh='"+cd.getCgxh()+"'";
						params.put("sql", sql);
						String str_Bcdl =purchaseDetailMapper.getStringFromSql(params);
						if(str_Bcdl!=null){
							s_bcdl=Double.parseDouble(str_Bcdl);
						}
						if((int)s_clgg/(dgyl+0.05)!=0){
							//如果采计中短料未算出，则	长料=向上取整(1.05*计划数量*构件数量/向下取整(规格尺寸/(单件用量+0.005)))
							//否则 长料=向上取整(未转短料/向下取整(规格尺寸/(单件用量+0.005)))
							//其中 未转短料=采计中的短料-已转短料-本合同短料
							if(s_dlgs==0){
								s_clgs=Math.ceil(1.05*jhsl*gjsl/(int)(s_clgg/(dgyl+0.005)));
							}else{
								s_clgs=Math.ceil((s_dlgs-s_yzdl+s_bcdl)/(int)(s_clgg/(dgyl+0.005)));
							}
						}else if(s_clgg==dgyl){//规格尺寸等于单件用量时
							//如果采计中短料未算出，则	长料=向上取整(1.05*计划数量*构件数量/向下取整(规格尺寸/(单件用量)))
							//否则 长料=向上取整(未转短料/向下取整(规格尺寸/(单件用量)))
							//其中 未转短料=采计中的短料-已转短料-本合同短料
							if(s_dlgs==0){
								s_clgs=Math.ceil(1.05*jhsl*gjsl/(int)(s_clgg/(dgyl)));
							}else{
								s_clgs=Math.ceil((s_dlgs-s_yzdl+s_bcdl)/(int)(s_clgg/(dgyl)));
							}
						}else{
							s_clgs=0;
						}
						//减去已导入的公斤数
						sql=" select isnull(sum(fzsl),0)  from htmxb with (nolock) where cgbh='"+cd.getCgbh()+"' and cgxh='"+cd.getCgxh()+"' and htbh<>'"+cd.getHtbh()+"' ";
						params.put("sql", sql);
						String str_Fzsl =purchaseDetailMapper.getStringFromSql(params);
						if(str_Fzsl==null){
							ls_fzsl=Double.parseDouble(str_Fzsl);
						}
						cd.setFzsl(s_clgs*s_clgg -ls_fzsl);
						params.put("clhh", cd.getClhh());
						params.put("cltx1",cd.getCltx1());
						s_zhxs=purchaseDetailMapper.getConversion(params);
						
						params.put("sql", sql);
						String str_Yzws =purchaseDetailMapper.getStringFromSql(params);
						if(str_Yzws==null){
							ls_yzws=Integer.parseInt(str_Yzws);
						}
						if(s_zhxs>0){
							cd.setCgsl(DoubleCal.round((s_clgs*s_clgg - ls_fzsl)/s_zhxs,ls_yzws));
						}
						double s_cgsl=0,s_cgdj=0,s_wbdj=0,s_fzsl,s_cgje,s_wbje;
						s_kjlx=0;
						s_cgsl=cd.getCgsl();
						s_cgdj=cd.getCgdj();
						s_wbdj=cd.getWbdj();
						s_fzsl=cd.getFzsl();
						s_kjlx=cd.getKjlx();
						cd.setYcgl(s_cgsl);
						if(s_fzsl!=0){
							s_cgje=DoubleCal.round(s_cgsl*s_cgdj, 2);
							s_wbje=DoubleCal.round(s_cgsl*s_wbdj, 2);
						}else{
							s_cgje=DoubleCal.round(s_fzsl*s_cgdj,2);
							s_wbje=DoubleCal.round(s_fzsl*s_wbdj,2);
						}
						cd.setCgje(s_cgje);
						cd.setWbje(s_wbje);
						//辅助数量变则短料变
						if (s_clgg!=0 && dgyl!=0 && s_dlgs!=0){	//排除未算出短料的采计部分
							cd.setDlgs((int)(s_clgg/dgyl)*DoubleCal.round((s_fzsl/s_clgg),0));
						}
					}
				}
			}
			if(ls_fzzbj==1){
				ls_clhh=cd.getClhh();
				ls_cltx1=cd.getCltx1();
				ls_cgsl=cd.getCgsl();
				s_kjlx=cd.getKjlx();
				params.put("clhh", cd.getClhh());
				params.put("cltx1",cd.getCltx1());
				s_zhxs=purchaseDetailMapper.getConversion(params);
				if(s_zhxs>0){
					cd.setFzsl(DoubleCal.round(ls_cgsl*s_zhxs,3));
					double s_cgdj = cd.getCgdj();
					double s_wbdj = cd.getWbdj();
					if( s_kjlx==1 ){
						cd.setCgje(DoubleCal.round(cd.getFzsl()*s_cgdj, 2));
						cd.setWbje(DoubleCal.round(cd.getFzsl()*s_wbdj, 2));
					}
				}else{
					cd.setFzsl(0);
					if( s_kjlx==1 ){
						cd.setCgje(0);
						cd.setWbje(0);
					}
				}
			}
			json.put("cd", MyJsonUtil.getJSONString(cd));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "材料特性关联更改时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 短料公式关联更改
	 * Request purchasedetail/purchasecontract.act?method=getDlgsWithOut  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-02-29
	 */
	public String getDlgsWithOut(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("recstr").toString();
			PurchaseOrderDetail cd=MyJsonUtil.str2obj(recstr, PurchaseOrderDetail.class);
			String ls_clhh,ls_cltx1;
			int s_cgbh,s_cgxh,s_htxh,ls_fzzbj,jhsl,dgyl,rowCount,ls_djyl,s_kjlx;
			double ls_dlgs,ls_ggcc,s_zhxs,ls_fzsl,ls_cgsl,s_cgdj,s_wbdj,s_cgje,s_wbje;
			jhsl=Integer.parseInt(params.get("jhsl").toString());
			rowCount=Integer.parseInt(params.get("rowCount").toString());
			ls_clhh=cd.getClhh();
			s_cgbh=cd.getCgbh();
			s_cgxh=cd.getCgxh();
			s_htxh=cd.getHtxh();
			sql="  select fzzbj  from clbmb where clhh='"+ls_clhh+"'";
			params.put("sql",sql);
			String fzzbj=purchaseDetailMapper.getStringFromSql(params);
			if(fzzbj==null){
				fzzbj="0";
			}
			ls_fzzbj=Integer.parseInt(fzzbj);
			if(ls_fzzbj==5||ls_fzzbj==6){
				ls_dlgs=cd.getDlgs();
				if(rowCount>0){
					ls_djyl=Integer.parseInt(params.get("dgyl").toString());
				}else{
					ls_djyl=0;
				}
				ls_cltx1=cd.getCltx1();
				if(ls_cltx1!=null&&!"".equals(ls_cltx1)){
					sql="  select convert(numeric(6,3),left('"+ls_cltx1+"',len('"+ls_cltx1+"')-1))  from sysxxb; ";
					params.put("sql",sql);
					String ggcc=purchaseDetailMapper.getStringFromSql(params);
					if(ggcc==null){
						ggcc="0";
					}
					ls_ggcc=Double.parseDouble(ggcc);
					params.put("clhh", cd.getClhh());
					params.put("cltx1",cd.getCltx1());
					s_zhxs=purchaseDetailMapper.getConversion(params);
					if(ls_ggcc!=0){
						ls_fzsl=Math.ceil(ls_dlgs*ls_djyl/ls_ggcc)*ls_ggcc;
						if(s_zhxs!=0){
							ls_cgsl=ls_fzsl/s_zhxs;
						}else{
							ls_cgsl=0;
						}
					}else{
						ls_fzsl=0;
						ls_cgsl=0;
					}
					
					s_cgdj=cd.getCgdj();
					s_wbdj=cd.getWbdj();
					s_kjlx=cd.getKjlx();
					
					if(s_kjlx==0){
						s_cgje=DoubleCal.round(ls_cgsl*s_cgdj, 2);
						s_wbje=DoubleCal.round(ls_cgsl*s_wbdj, 2);
					}else{
						s_cgje=DoubleCal.round(ls_fzsl*s_cgdj, 2);
						s_wbje=DoubleCal.round(ls_fzsl*s_wbdj, 2);
					}
					
					cd.setFzsl(ls_fzsl);
					cd.setCgsl(ls_cgsl);
					cd.setYcgl(ls_cgsl);
					cd.setCgje(s_cgje);
					cd.setWbje(s_wbje);
				}
			}
			json.put("cd", MyJsonUtil.getJSONString(cd));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "短料公式关联更改时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 保存前验证
	 * Request purchasedetail/purchasecontract.act?method=getBeforSave  <br/><br/>
	 * @author wq
	 * @date 2016-02-29
	 */
	public String getBeforSave(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql=null;
		/*try {*/
			String recstr=params.get("rec").toString();
			PurchaseContract pc=MyJsonUtil.str2obj(recstr, PurchaseContract.class);
			//List<ContractDetail> update=new ArrayList<ContractDetail>();
			params.put("htbh", pc.getHtbh());
			//增加判断有领用材料数据，合同类型必须是外协！
			sql="select count(1) from cghtwxlltzdb_tmp  ";
			sql+="	where htbh='"+pc.getHtbh()+"' and ";
			sql+="	login_id='"+params.get("login_id").toString()+"' and ip='"+params.get("ip").toString()+"' ";
			params.put("sql", sql);
			String countStr=purchaseDetailMapper.getStringFromSql(params);
			int countOn=0;
			if(countStr!=null){
				countOn=Integer.parseInt(countStr);
			}
			if(countOn>0){
				if(!"外协".equals(pc.getCglx())){
					json.put("msg", "有领用材料数据，合同类型必须是外协！");
					json.put("bool", false);
					return json.toString();
				}
			}
			//增加判断合同类型为非特殊时cgjhmxb。jhrq与 htmxb。jhrq 一致不一致，不一致保存不成功
			//1959 1.采购合同保存时，检测修改，采购计划与采购合同交货日期 应一致，时间取到年月日进行对比(select CONVERT(varchar(12) , getdate(), 102 ))
			if(pc.getCglx()!=null&&pc.getCglx().trim().equals("常规")){
				String sql1=" select COUNT(1) from htmxb_tmp ";
				sql1+="	where htbh='"+pc.getHtbh()+"' and ";
				sql1+="	login_id='"+params.get("login_id").toString()+"' and ip='"+params.get("ip").toString()+"' ";
				sql1+="	and exists ( ";
				sql1+="		select 1 from cgjhmxb where cgjhmxb.cgbh=htmxb_tmp.cgbh and cgjhmxb.cgxh=htmxb_tmp.cgxh ";
				sql1+=" and CONVERT(varchar(12) , htmxb_tmp.jhrq, 102 )<>CONVERT(varchar(12) , cgjhmxb.jhrq, 102 )   ";
				sql1+=" )";
				params.put("sql",sql1);
				String coutStr=purchaseDetailMapper.getStringFromSql(params);
				int count=0;
				if(coutStr!=null){
					count=Integer.parseInt(coutStr);
				}
				if(count>0){
					json.put("msg", "合同类型为常规时,采购计划与采购合同交货日期应一致!");
					json.put("bool", false);
					return json.toString();
				}
			}
			//增加判断 如果合同明细中有对应的采计号，如果采计号+采计序号没有签发，合同不允许保存！
			List<PurchaseOrderDetail> prdCheckList=purchaseOrderDetailMapper.getPurchaseOrderDetailListForCheck(params);
			if(prdCheckList.size()>0){
				String cgh="";
				for(PurchaseOrderDetail podc:prdCheckList){
					if(cgh.equals("")){
						cgh+=podc.getCgbh()+"-"+podc.getCgxh();
					}else{
						cgh+=","+podc.getCgbh()+"-"+podc.getCgxh();
					}
				}
				json.put("msg", "采计号为【" + cgh+ "】的记录未签发，不允许保存！");
				json.put("bool", false);
				return json.toString();
			}
			List<PurchaseOrderDetail> cds=purchaseOrderDetailMapper.getPurchaseOrderDetailListForEdt(params);
			String cglb =pc.getCglb();
			String cgybh =pc.getCgym();
			String czym =pc.getCzym();
			String s_csbh=pc.getCsbh();
			Map<String,List<PurchaseOrderDetail>> groupByClhhCltx1=new HashMap<String, List<PurchaseOrderDetail>>();
			
			String ls_row_kj="";
			String show ="";
			String s_htgz=pc.getHtgz();
			String s_qzgz=pc.getQzgz();
			int ls_cpbj;
			String csbh = pc.getCsbh();
			sql = "  select count(*)  from csxxb with (nolock) where csbh='"+ csbh + "' ";
			params.put("sql", sql);
			String  count1 = purchaseDetailMapper.getStringFromSql(params);
			if (Integer.parseInt(count1) == 0) {
				json.put("msg", "当前没有可选厂商，请先到厂商档案中维护！");
				json.put("bool", false);
				return json.toString();
			}
			/*if(!cgybh.equals("")){
				sql="  select cgyxm  from cgyb with (nolock) where cgyb.cgybh='"+cgybh+"' ";
				params.put("sql",sql);
				String cgyxm=purchaseDetailMapper.getStringFromSql(params);
				if(!cgyxm.trim().equals(czym.trim())){
					json.put("show","采购员与操作员不一致！");
				}
			}else{
				json.put("msg","采购员不能为空！");
				json.put("bool", false);
				return json.toString();
			}*/
			sql = "  select cpbj  from cglbb where lbbh='" + cglb + "' ";
			params.put("sql", sql);
			String cpbj = purchaseDetailMapper.getStringFromSql(params);
			if (cpbj == null) {
				cpbj = "0";
			}
			ls_cpbj = Integer.parseInt(cpbj);	
			long ls_row_jc, ll_zfwz, ll_zdcd, ll_xsws, ll_yzws;
			double ldb_cgsl_jc;
			String ls_cgsl_jc, ls_clhh_jc,s_clhh,m_wbbh;
			params.put("sql","  select wbbh from csxxb where csbh = '"+pc.getCsbh()+"' ");
			m_wbbh=purchaseDetailMapper.getStringFromSql(params);
			if(m_wbbh==null){
				m_wbbh="";
			}else{
				m_wbbh=m_wbbh.trim();
			}
			for (int i = 0; i < cds.size(); i++) {
				PurchaseOrderDetail cd = cds.get(i);
				//增加管控如果没有交货日期 ，直接提示，哪条记录没有交期
				if(cd.getJhrq()==null){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细交货日期为空，不允许保存！");
					json.put("bool", false);
					return json.toString();
				}
				//如果专利标记 打上专利单价不能为空
				if(pc.getZlbj()==1){
					if(cd.getZldj()==0){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细专利单价为0，不允许保存！");
						json.put("bool", false);
						return json.toString();
					}
				}
				// 检测材料对应元整位数，小数位数大于元整位数的，不允许保存
				// 取采购数量中“.”字符位置
				ls_clhh_jc = cd.getClhh();
				s_clhh=cd.getClhh();
				ldb_cgsl_jc = cd.getCgsl();
				ls_cgsl_jc = ldb_cgsl_jc + "";
				ll_zdcd = ls_cgsl_jc.length();
				ll_zfwz = ls_cgsl_jc.indexOf(".");
				//首先判断是不是整数
				if(DoubleCal.round(ldb_cgsl_jc, 0)==ldb_cgsl_jc){
					ll_zfwz=0;
					ll_zdcd-=2;
				}
				if (ll_zfwz > 0) {
					ll_xsws = ll_zdcd - ll_zfwz-1;//需要去除本身位置，所以需要减一
					if (ll_xsws > 0) {
						sql = "  select yzws  from clbmb where clhh='"+ ls_clhh_jc + "' ";
						params.put("sql", sql);
						String yzws = purchaseDetailMapper.getStringFromSql(params);
						if (yzws == null) {
							yzws = "0";
						}
						if (ll_xsws > Integer.parseInt(yzws)) {
							json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细小数位数超过对应材料的圆整位数，不允许保存！");
							json.put("bool", false);
							return json.toString();
						}
					}
				}
				
				//核算部门检测
				String ls_jhlb,ls_hsbm,s_cltx1,ls_clhh,ls_cltx1;
				long ll_cgbh,ll_jhbh,ls_htxh,ls_ddbh,ls_ddxh;
				double ls_cgdj,ls_wbdj,ls_mxzs,s_cgdj,s_fzsl_sj,s_zhxs,ls_cjsl_kz;
				int ls_cfbj;
				s_cgdj=cd.getCgdj();
				ll_cgbh=cd.getCgbh();
				ll_jhbh=cd.getJhbh();
				ls_hsbm=cd.getHsbm();
				ls_mxzs=cd.getMxzs();
				ls_ddbh=cd.getDdbh();
				ls_ddxh=cd.getDdxh();
				ls_cltx1=cd.getCltx1();
				ls_cfbj=cd.getCfbj();
				if(ls_cpbj==1){
					if(ls_mxzs==0){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细对应包装信息界面的箱只数为0!");
						json.put("bool", false);
						return json.toString();
					}
					if(ls_mxzs!=0&&ls_cltx1.trim().equals("")){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细对应包装信息界面有箱只数，规格尺寸不能为空!");
						json.put("bool", false);
						return json.toString();
					}
				}
				if(ls_hsbm==null||ls_hsbm.equals("")){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细核算部门不允许为空!");
					json.put("bool", false);
					return json.toString();
				}
				if(ll_cgbh!=0&&!ls_hsbm.equals("")){
					sql = "  select hsbm  from jhlbb with (nolock) where lbbh = (select jhlb from cgjhb with (nolock) where cgbh = '"+ll_cgbh+"') ";
					params.put("sql", sql);
					String hsbm = purchaseDetailMapper.getStringFromSql(params);
					if(!ls_hsbm.equals(hsbm)){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细采计编号的计划类别核算部门与核算部门不一致!");
						json.put("bool", false);
						return json.toString();
					}
				}
				if(!m_wbbh.equals("")&&cd.getWbbh().trim().equals("")){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的外币编号为空，请重新选择供应商!");
					json.put("bool", false);
					return json.toString();
				}
				if(cd.getClhh()==null||cd.getClhh().equals("")){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细材料名称不能为空!");
					json.put("bool", false);
					return json.toString();
				}
				
				sql = "  select count(*)  from clbmb with (nolock) where clhh="+s_clhh.trim()+" ";
				params.put("sql", sql);
				countStr = purchaseDetailMapper.getStringFromSql(params);
				int count =Integer.parseInt(countStr);
				if(count==0){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细材料名称不存在!");
					json.put("bool", false);
					return json.toString();
				}
				if(s_cgdj<0){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细材料采购单价不能小于0!");
					json.put("bool", false);
					return json.toString();
				}
				if(s_cgdj>9999999){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细材料采购单价不能大于7位数!");
					json.put("bool", false);
					return json.toString();
				}
				if(cd.getWbdj()<0){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细外币单价不能小于0!");
					json.put("bool", false);
					return json.toString();
				}
				String s_wbbh=cd.getWbbh();
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				if(!s_wbbh.equals("")&&cd.getWbhl()<=0){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细外币汇率不能小于等于0!");
					json.put("bool", false);
					return json.toString();
				}
				if(!(s_wbbh.trim().equals("")) && ((cd.getWbdj()!=0&&cd.getCgdj()==0)||(cd.getWbdj()==0&&cd.getCgdj()!=0))){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细外币单价和本币单价计算关系有异常，不允许保存!");
					json.put("bool", false);
					return json.toString();
				}
				
				if((!s_wbbh.trim().equals("")) && Math.abs(DoubleCal.round(cd.getCgdj(),4) - DoubleCal.round(cd.getWbdj()*cd.getWbhl(),4))>0.01){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细外币单价和本币单价计算关系有异常，不允许保存!");
					json.put("bool", false);
					return json.toString();
				}
				params.put("clhh", cd.getClhh());
				params.put("cltx1",ls_cltx1);
				s_zhxs=purchaseDetailMapper.getConversion(params);
				if(s_zhxs>0){
					s_fzsl_sj=DoubleCal.round(cd.getCgsl()*s_zhxs,3);
				}else{
					s_fzsl_sj=0;
				}
				sql = "  select fzzbj  from clbmb where clhh='"+cd.getClhh()+"' ";
				params.put("sql", sql);
				String fzzbj = purchaseDetailMapper.getStringFromSql(params);
				if(fzzbj==null){
					fzzbj="";
				}
				if(Integer.parseInt(fzzbj)==1){
					if(DoubleCal.round(DoubleCal.round(s_fzsl_sj, 6),3)!=DoubleCal.round(DoubleCal.round(cd.getFzsl(), 6), 3)){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细采购数量*转换系数不等于辅助数量!");
						json.put("bool", false);
						return json.toString();
					}
				}
				if(Integer.parseInt(fzzbj)==0 && cd.getFzsl()!=0){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细采购计划的辅助数量应为0!");
					json.put("bool", false);
					return json.toString();
				}
				if(Integer.parseInt(fzzbj)!=0 && cd.getCgsl()>0 && cd.getFzsl()==0){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细采购计划的辅助数量与主计量不匹配，请调整!");
					json.put("bool", false);
					return json.toString();
				}
				
				if(cd.getCgbh()!=0&&cd.getCgbh()!=0){
					sql = "  select clhh  from cgjhmxb with (nolock) where cgbh='"+cd.getCgbh()+"' and cgxh='"+cd.getCgxh()+"' ";
					params.put("sql", sql);
					String clhh = purchaseDetailMapper.getStringFromSql(params);
					if(clhh==null){
						clhh="";
					}
					if(!clhh.equals(cd.getClhh())){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细采购计划与材料名称不符合，请重新选择!");
						json.put("bool", false);
						return json.toString();
					}
				}
				
				if(cd.getCgsl()==0){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细采购数量不能为0!");
					json.put("bool", false);
					return json.toString();
				}
				
				params.put("csbh", s_csbh);
				params.put("clhh", cd.getClhh());
				params.put("cgsl", 0);
				params.put("wbbh", 0);
				double kzdj=0,fzdj=0;
				List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
				if(fpcList.size()>0){
					FunctionPurchaseCtl fpc=fpcList.get(0);
					kzdj=fpc.getKzdj();
					fzdj=fpc.getFzkj();
				}
				if(cd.getKjlx()!=1){
					if(cd.getKzdj()!=kzdj){
						if(ls_row_kj.equals("")){
							ls_row_kj+=cd.getHtxh();
						}else{
							ls_row_kj=ls_row_kj+','+cd.getHtxh();
						}
					}
				}else{
					if(cd.getKzdj()!=fzdj){
						if(ls_row_kj.equals("")){
							ls_row_kj+=cd.getHtxh();
						}else{
							ls_row_kj=ls_row_kj+','+cd.getHtxh();
						}
					}
				}
				//判断采计号在该合同中的采购数量总数 是否大于采计号的采计数量
				sql = "  select lbbh  from clbmb where clhh='"+cd.getClhh()+"' ";
				params.put("sql", sql);
				String ls_cllb = purchaseDetailMapper.getStringFromSql(params);
				if(ls_cllb==null){
					ls_cllb="";
				}
				
				sql = "  select cgbl  from cllbb where lbbh='"+ls_cllb+"' ";
				params.put("sql", sql);
				String ls_cgblStr = purchaseDetailMapper.getStringFromSql(params);
				if(ls_cgblStr==null){
					ls_cgblStr="0";
				}
				double ls_cgbl=Double.parseDouble(ls_cgblStr);
				//该采计号下已存在合同中的采购数量总数
				sql = "  select SUM(ycgl)  from htmxb where cgbh="+cd.getCgbh()+" and cgxh="+cd.getCgxh()+" and htbh<>"+cd.getHtbh()+" group by cgbh,cgxh order by cgbh,cgxh ";
				params.put("sql", sql);
				String ycgl = purchaseDetailMapper.getStringFromSql(params);
				if(ycgl==null){
					ycgl="0";
				}
				double ls_cgsl2=Double.parseDouble(ycgl);
				double ls_cgsl1=0;
				//计算本合同中该采购号采购数量
				for(PurchaseOrderDetail cd2:cds){
					if(cd.getCgbh()==cd2.getCgbh()&&cd.getCgxh()==cd2.getCgxh()){
						ls_cgsl1+=cd2.getCgsl();
					}
				}
				//采计号下采计数量
				sql = "  select cgsl  from cgjhmxb where cgbh='"+cd.getCgbh()+"' and cgxh='"+cd.getCgxh()+"' ";
				params.put("sql", sql);
				String cgsl = purchaseDetailMapper.getStringFromSql(params);
				if(cgsl==null){
					cgsl="0";
				}
				double ls_cgsl3=Double.parseDouble(cgsl);
				params.put("csbh", s_csbh);
				params.put("clhh", cd.getClhh());
				params.put("cgsl", ls_cgsl3);
				params.put("wbbh", 0);
				ls_cjsl_kz=0;
				List<FunctionPurchaseCtl> fpcList1=purchaseDetailMapper.getFunctionPurchaseCtl(params);
				if(fpcList1.size()>0){
					FunctionPurchaseCtl fpc=fpcList1.get(0);
					ls_cjsl_kz=fpc.getCgsl();
				}
				if(s_htgz.equals("最低采购量")&&s_qzgz.equals("十位取整")){
					//如果最小包装量或者最小采购量小于原来的采计数量*(1+超购比率)，那么仍旧取采计数量*(1+超购比率)，否则取最小包装量或者最小采购量来跟合同数量比较
					if(ls_cjsl_kz<DoubleCal.round(DoubleCal.round(ls_cgsl3*(1+ls_cgbl), 6), 3)){
						ls_cjsl_kz=DoubleCal.round(DoubleCal.round(ls_cgsl3*(1+ls_cgbl), 6), 3);
					}
					//十位向上取整
					ls_cjsl_kz = Math.ceil(ls_cjsl_kz / 10.0) * 10;
					
				}else if (s_htgz.equals("最低采购量")&&(s_qzgz.equals("")||s_qzgz.equals("常规"))){
					//如果最小包装量或者最小采购量小于原来的采计数量*(1+超购比率)，那么仍旧取采计数量*(1+超购比率)，否则取最小包装量或者最小采购量来跟合同数量比较
					if(ls_cjsl_kz<DoubleCal.round(DoubleCal.round(ls_cgsl3*(1+ls_cgbl), 6), 3)){
						ls_cjsl_kz=DoubleCal.round(DoubleCal.round(ls_cgsl3*(1+ls_cgbl), 6), 3);
					}
				}else if ((s_htgz.equals("")||s_htgz.equals("常规")) && s_qzgz.equals("十位取整")){
					//以最小包装量作为最低采购量时更改超购比率基数
					params.put("sql","select top 1 zxbzl from clbmb where clhh = '"+cd.getClhh()+"'");
					String zxbzl =purchaseDetailMapper.getStringFromSql(params);
					if(zxbzl==null){
						zxbzl="0";
					}
					double s_zxbzl=Double.parseDouble(zxbzl);
					//如果因采购数量因最小包装量而引起采购数量大于采计数量*（1+超购比例）时，能够保存。
					if(s_zxbzl>ls_cgsl3&&s_zxbzl>0){
						ls_cgsl3=s_zxbzl;
					}
					ls_cjsl_kz = Math.ceil((DoubleCal.round(DoubleCal.round(ls_cgsl3*(1+ls_cgbl),6),3)) / 10.0) * 10;
				}else if ((s_htgz.equals("") || s_htgz.equals("常规")) && (s_qzgz.equals("")||s_qzgz.equals("常规"))){
					//以最小包装量作为最低采购量时更改超购比率基数
					params.put("sql","select top 1 zxbzl from clbmb where clhh = '"+cd.getClhh()+"'");
					String zxbzl =purchaseDetailMapper.getStringFromSql(params);
					if(zxbzl==null){
						zxbzl="0";
					}
					double s_zxbzl=Double.parseDouble(zxbzl);
					//如果因采购数量因最小包装量而引起采购数量大于采计数量*（1+超购比例）时，能够保存。
					if(s_zxbzl>ls_cgsl3&&s_zxbzl>0){
						ls_cgsl3=s_zxbzl;
					}
					ls_cjsl_kz = DoubleCal.round(DoubleCal.round(ls_cgsl3*(1+ls_cgbl),6),3);
				}
				Double ls_cgsl_count=DoubleCal.round(DoubleCal.round(ls_cgsl1,6)+DoubleCal.round(ls_cgsl2, 6),3);
				if (ls_cgsl_count>DoubleCal.round(ls_cjsl_kz, 3)&&(cd.getCgbh()!=0&&cd.getCgxh()!=0)){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细采计号【"+cd.getCgbh()+"-"+cd.getCgxh()+"】的采购数量大于采计数量*(1+超购比率："+ls_cgbl*100+"%)!");
					json.put("bool", false);
					return json.toString();
				}
				//按照clhh、材料货号对产品进行分组
				String clhh_cltx1=cd.getClhh()+cd.getCltx1();
				if(groupByClhhCltx1.get(clhh_cltx1)!=null){
					groupByClhhCltx1.get(clhh_cltx1).add(cd);
				}else{
					List<PurchaseOrderDetail> addCd=new ArrayList<PurchaseOrderDetail>();
					addCd.add(cd);
					groupByClhhCltx1.put(clhh_cltx1, addCd);
				}
			}
			//采购合同制定时，最低采购量、最小包装量的管控：在同一个采购合同中，
			//如有同一个物料，则应使用同一物料的合并的采购数量，先与最低采购量比对，
			//如不够，则将不足数补足到该材料的交货日期最早的第一个采购记录中，再与最小包装量比对，
			//如不为倍数，则将不足数补足到该材料的交货日期最早的第一个采购记录中。而不应为现在情况下的每行记录逐行比对。
			Date f_jhrq=null;
			long     f_htxh,ll_end,ll_find;
			String   f_clhh,f_cltx1;
			double   f_xcgl,f_ycgl,f_ycgl_sum,f_cgdj,f_wbdj,f_cgsl_old;
			int 	 ls_kjlx;
			if(s_htgz.equals("最低采购量")&&s_qzgz.equals("十位取整")){
				Iterator<String> iter = groupByClhhCltx1.keySet().iterator();
				while (iter.hasNext()) {
				    String key = iter.next();
				    List<PurchaseOrderDetail> onCd=groupByClhhCltx1.get(key);
				    PurchaseOrderDetail cdd=null;
				    f_ycgl_sum=0;
				    if(onCd.size()>0){
				    	cdd=onCd.get(0);
				    	for(PurchaseOrderDetail cdd2:onCd){
				    		f_ycgl_sum+=cdd2.getYcgl();
				    	}
				    }
				    f_clhh=cdd.getClhh();
				    f_cltx1=cdd.getCltx1();
				    f_jhrq=cdd.getJhrq();
				    f_htxh=0;
				    f_ycgl=0;
				    f_cgdj=0;
				    f_wbdj=0;
				    
				    //有多个同一材料的，，调整到之前已经调整过的合同上，如果是第一次导入，那么调整到最小交货日期上
				    for(PurchaseOrderDetail cdd1:onCd){
				    	if(cdd1.getCgsl()!=cdd1.getYcgl()){
				    		f_htxh=cdd1.getHtxh();
				    		break;
				    	}
				    }
				    
				    if(f_htxh==0){
				    	for(PurchaseOrderDetail cdd4:onCd){
				    		Date nDate=cdd4.getJhrq();
				    		if(nDate!=null){
				    			if(f_jhrq.after(nDate)){
					    			f_jhrq=nDate;
					    		}
				    		}
				    	}
				    	f_htxh=onCd.get(0).getHtxh();
				    	if(f_jhrq==null){
				    		for(PurchaseOrderDetail cdd5:onCd){
					    		if(cdd5.getHtxh()<f_htxh){
					    			f_htxh=cdd5.getHtxh();
					    		}
					    	}
				    	}else{
				    		for(PurchaseOrderDetail cdd5:onCd){
				    			if(f_jhrq.equals(cdd5.getJhrq())){
					    			if(cdd5.getHtxh()<f_htxh){
					    				f_htxh=cdd5.getHtxh();
					    			}
					    		}
					    	}
				    	}
				    }
				    
				    for(PurchaseOrderDetail cdd6:onCd){
				    	if(cdd6.getHtxh()==f_htxh){
				    		f_ycgl=cdd6.getYcgl();
				    		f_cgdj=cdd6.getCgdj();
				    		f_wbdj=cdd6.getWbdj();
				    		params.put("csbh", s_csbh);
							params.put("clhh", cdd6.getClhh());
							params.put("cgsl", f_ycgl_sum);
							params.put("wbbh", 0);
							double cgsl=0;
							List<FunctionPurchaseCtl> fpcList1=purchaseDetailMapper.getFunctionPurchaseCtl(params);
							if(fpcList1.size()>0){
								FunctionPurchaseCtl fpc=fpcList1.get(0);
								cgsl=fpc.getCgsl();
							}
							f_xcgl=Math.ceil(cgsl/10.0)*10 - f_ycgl_sum +f_ycgl;//新采购量
							f_cgsl_old=cdd6.getCgsl();
							if(DoubleCal.round(f_cgsl_old, 6)!=DoubleCal.round(f_xcgl, 6)){
								cdd6.setCgsl(f_xcgl);
								params.put("clhh", cdd6.getClhh());
								params.put("cltx1",cdd6.getCltx1());
								double s_zhxs=purchaseDetailMapper.getConversion(params);
								ls_kjlx=cdd6.getKjlx();
								if(s_zhxs>0){
									cdd6.setFzsl(DoubleCal.round(f_xcgl*s_zhxs, 3));
								}else{
									cdd6.setFzsl(0);
								}
								if(ls_kjlx==1){
									cdd6.setCgje(DoubleCal.round(cdd6.getFzsl()*f_cgdj, 2));
									cdd6.setWbje(DoubleCal.round(cdd6.getFzsl()*f_wbdj, 2));
								}else{
									cdd6.setCgje(DoubleCal.round(f_xcgl*f_cgdj, 2));
									cdd6.setWbje(DoubleCal.round(f_xcgl*f_wbdj, 2));
								}
								purchaseOrderDetailMapper.updatePurchaseOrderDetail(cdd6);
							}
				    	}
				    }
				}
			}else if (s_htgz.equals("最低采购量") && (s_qzgz.equals("")||s_qzgz.equals("常规"))){
				Iterator<String> iter = groupByClhhCltx1.keySet().iterator();
				while (iter.hasNext()) {
				    String key = iter.next();
				    List<PurchaseOrderDetail> onCd=groupByClhhCltx1.get(key);
				    PurchaseOrderDetail cdd=null;
				    f_ycgl_sum=0;
				    if(onCd.size()>0){
				    	cdd=onCd.get(0);
				    	for(PurchaseOrderDetail cdd2:onCd){
				    		f_ycgl_sum+=cdd2.getYcgl();
				    	}
				    }
				    f_clhh=cdd.getClhh();
				    f_cltx1=cdd.getCltx1();
				    f_jhrq=cdd.getJhrq();
				    f_htxh=0;
				    f_ycgl=0;
				    f_cgdj=0;
				    f_wbdj=0;
				    
				    //有多个同一材料的，，调整到之前已经调整过的合同上，如果是第一次导入，那么调整到最小交货日期上
				    for(PurchaseOrderDetail cdd1:onCd){
				    	if(cdd1.getCgsl()!=cdd1.getYcgl()){
				    		f_htxh=cdd1.getHtxh();
				    		break;
				    	}
				    }
				    
				    if(f_htxh==0){
				    	for(PurchaseOrderDetail cdd4:onCd){
				    		Date nDate=cdd4.getJhrq();
				    		if(nDate!=null){
				    			if(f_jhrq.after(nDate)){
					    			f_jhrq=nDate;
					    		}
				    		}
				    	}
				    	f_htxh=onCd.get(0).getHtxh();
				    	if(f_jhrq==null){
				    		for(PurchaseOrderDetail cdd5:onCd){
					    		if(cdd5.getHtxh()<f_htxh){
					    			f_htxh=cdd5.getHtxh();
					    		}
					    	}
				    	}else{
				    		for(PurchaseOrderDetail cdd5:onCd){
					    		if(f_jhrq.equals(cdd5.getJhrq())){
					    			if(cdd5.getHtxh()<f_htxh){
					    				f_htxh=cdd5.getHtxh();
					    			}
					    		}
					    	}
				    	}
				    }
				    
				    for(PurchaseOrderDetail cdd6:onCd){
				    	if(cdd6.getHtxh()==f_htxh){
				    		f_ycgl=cdd6.getYcgl();
				    		f_cgdj=cdd6.getCgdj();
				    		f_wbdj=cdd6.getWbdj();
				    		params.put("csbh", s_csbh);
							params.put("clhh", cdd6.getClhh());
							params.put("cgsl", f_ycgl_sum);
							params.put("wbbh", 0);
							double cgsl=0;
							List<FunctionPurchaseCtl> fpcList1=purchaseDetailMapper.getFunctionPurchaseCtl(params);
							if(fpcList1.size()>0){
								FunctionPurchaseCtl fpc=fpcList1.get(0);
								cgsl=fpc.getCgsl();
							}
							f_xcgl=cgsl - f_ycgl_sum +f_ycgl;//新采购量
							
							f_cgsl_old=cdd6.getCgsl();
							if(DoubleCal.round(f_cgsl_old, 6)!=DoubleCal.round(f_xcgl, 6)){
								cdd6.setCgsl(f_xcgl);
								params.put("clhh", cdd6.getClhh());
								params.put("cltx1",cdd6.getCltx1());
								double s_zhxs=purchaseDetailMapper.getConversion(params);
								ls_kjlx=cdd6.getKjlx();
								if(s_zhxs>0){
									cdd6.setFzsl(DoubleCal.round(f_xcgl*s_zhxs, 3));
								}else{
									cdd6.setFzsl(0);
								}
								if(ls_kjlx==1){
									cdd6.setCgje(DoubleCal.round(cdd6.getFzsl()*f_cgdj, 2));
									cdd6.setWbje(DoubleCal.round(cdd6.getFzsl()*f_wbdj, 2));
								}else{
									cdd6.setCgje(DoubleCal.round(f_xcgl*f_cgdj, 2));
									cdd6.setWbje(DoubleCal.round(f_xcgl*f_wbdj, 2));
								}
								purchaseOrderDetailMapper.updatePurchaseOrderDetail(cdd6);
							}
				    	}
				    }
				}
			}else if ((s_htgz.equals("")||s_htgz.equals("常规"))&&s_qzgz.equals("十位取整")){
				Iterator<String> iter = groupByClhhCltx1.keySet().iterator();
				while (iter.hasNext()) {
				    String key = iter.next();
				    List<PurchaseOrderDetail> onCd=groupByClhhCltx1.get(key);
				    PurchaseOrderDetail cdd=null;
				    f_ycgl_sum=0;
				    if(onCd.size()>0){
				    	cdd=onCd.get(0);
				    	//分组合计数量
				    	for(PurchaseOrderDetail cdd2:onCd){
				    		f_ycgl_sum+=cdd2.getYcgl();
				    	}
				    }
				    if(f_ycgl_sum>0){
					    f_clhh=cdd.getClhh();
					    f_cltx1=cdd.getCltx1();
					    f_jhrq=cdd.getJhrq();
					    f_htxh=0;
					    f_ycgl=0;
					    f_cgdj=0;
					    f_wbdj=0;
					    
					    //有多个同一材料的，，调整到之前已经调整过的合同上，如果是第一次导入，那么调整到最小交货日期上
					    for(PurchaseOrderDetail cdd1:onCd){
					    	if(cdd1.getCgsl()!=cdd1.getYcgl()){
					    		f_htxh=cdd1.getHtxh();
					    		break;
					    	}
					    }
					    
					    if(f_htxh==0){
					    	for(PurchaseOrderDetail cdd4:onCd){
					    		Date nDate=cdd4.getJhrq();
					    		if(nDate!=null){
					    			if(f_jhrq.after(nDate)){
						    			f_jhrq=nDate;
						    		}
					    		}
					    	}
					    	f_htxh=onCd.get(0).getHtxh();
					    	if(f_jhrq==null){
					    		for(PurchaseOrderDetail cdd5:onCd){
						    		if(cdd5.getHtxh()<f_htxh){
						    			f_htxh=cdd5.getHtxh();
						    		}
						    	}
					    	}else{
					    		for(PurchaseOrderDetail cdd5:onCd){
						    		if(f_jhrq.equals(cdd5.getJhrq())){
						    			if(cdd5.getHtxh()<f_htxh){
						    				f_htxh=cdd5.getHtxh();
						    			}
						    		}
						    	}
					    	}
					    }
					    
					    for(PurchaseOrderDetail cdd6:onCd){
					    	if(cdd6.getHtxh()==f_htxh){
					    		f_ycgl=cdd6.getYcgl();
					    		f_cgdj=cdd6.getCgdj();
					    		f_wbdj=cdd6.getWbdj();
					    		double cgsl=0;
					    		/*
					    		params.put("csbh", po.getCsbh());
								params.put("clhh", cdd6.getClhh());
								params.put("cgsl", f_ycgl_sum);
								params.put("wbbh", 0);
								List<FunctionPurchaseCtl> fpcList1=purchaseDetailMapper.getFunctionPurchaseCtl(params);
								if(fpcList1.size()>0){
									FunctionPurchaseCtl fpc=fpcList1.get(0);
									cgsl=fpc.getCgsl();
								}
								*/
								//以最小包装量作为最低采购量
								params.put("sql","select top 1 zxbzl from clbmb where clhh = '"+cdd6.getClhh()+"'");
								String zxbzl =purchaseDetailMapper.getStringFromSql(params);
								if(zxbzl==null){
									zxbzl="0";
								}
								double s_zxbzl=Double.parseDouble(zxbzl);
								double f_ycgl_sum_new=0;
								if(s_zxbzl>f_ycgl_sum&&s_zxbzl>0){
									f_ycgl_sum_new=s_zxbzl;
								}else{
									f_ycgl_sum_new=f_ycgl_sum;
								}
								f_xcgl=Math.ceil(f_ycgl_sum_new/10.0)*10 - f_ycgl_sum +f_ycgl;//新采购量(以最小包装量作为最低采购量)
								f_cgsl_old=cdd6.getCgsl();
								if(DoubleCal.round(f_cgsl_old, 6)!=DoubleCal.round(f_xcgl, 6)){
									cdd6.setCgsl(f_xcgl);
									params.put("clhh", cdd6.getClhh());
									params.put("cltx1",cdd6.getCltx1());
									double s_zhxs=purchaseDetailMapper.getConversion(params);
									ls_kjlx=cdd6.getKjlx();
									if(s_zhxs>0){
										cdd6.setFzsl(DoubleCal.round(f_xcgl*s_zhxs, 3));
									}else{
										cdd6.setFzsl(0);
									}
									if(ls_kjlx==1){
										cdd6.setCgje(DoubleCal.round(cdd6.getFzsl()*f_cgdj, 2));
										cdd6.setWbje(DoubleCal.round(cdd6.getFzsl()*f_wbdj, 2));
									}else{
										cdd6.setCgje(DoubleCal.round(f_xcgl*f_cgdj, 2));
										cdd6.setWbje(DoubleCal.round(f_xcgl*f_wbdj, 2));
									}
									purchaseOrderDetailMapper.updatePurchaseOrderDetail(cdd6);
								}
					    	}
					    }
				    }
				}
			}else if((s_htgz.equals("")||s_htgz.equals("常规"))&&(s_qzgz.equals("")||s_qzgz.equals("常规"))){
				Iterator<String> iter = groupByClhhCltx1.keySet().iterator();
				while (iter.hasNext()) {
				    String key = iter.next();
				    List<PurchaseOrderDetail> onCd=groupByClhhCltx1.get(key);
				    PurchaseOrderDetail cdd=null;
				    f_ycgl_sum=0;
				    if(onCd.size()>0){
				    	cdd=onCd.get(0);
				    	//分组合计数量
				    	for(PurchaseOrderDetail cdd2:onCd){
				    		f_ycgl_sum+=cdd2.getYcgl();
				    	}
				    }
				    if(f_ycgl_sum>0){
					    f_clhh=cdd.getClhh();
					    f_cltx1=cdd.getCltx1();
					    f_jhrq=cdd.getJhrq();
					    f_htxh=0;
					    f_ycgl=0;
					    f_cgdj=0;
					    f_wbdj=0;
					    
					    //有多个同一材料的，，调整到之前已经调整过的合同上，如果是第一次导入，那么调整到最小交货日期上
					    for(PurchaseOrderDetail cdd1:onCd){
					    	if(cdd1.getCgsl()!=cdd1.getYcgl()){
					    		f_htxh=cdd1.getHtxh();
					    		break;
					    	}
					    }
					    if(f_htxh==0){
					    	for(PurchaseOrderDetail cdd4:onCd){
					    		Date nDate=cdd4.getJhrq();
					    		if(nDate!=null){
					    			if(f_jhrq.after(nDate)){
						    			f_jhrq=nDate;
						    		}
					    		}
					    	}
					    	f_htxh=onCd.get(0).getHtxh();
					    	if(f_jhrq==null){
					    		for(PurchaseOrderDetail cdd5:onCd){
						    		if(cdd5.getHtxh()<f_htxh){
						    			f_htxh=cdd5.getHtxh();
						    		}
						    	}
					    	}else{
					    		for(PurchaseOrderDetail cdd5:onCd){
						    		if(f_jhrq.equals(cdd5.getJhrq())){
						    			if(cdd5.getHtxh()<f_htxh){
						    				f_htxh=cdd5.getHtxh();
						    			}
						    		}
						    	}
					    	}
					    }
					    
					    for(PurchaseOrderDetail cdd6:onCd){
					    	if(cdd6.getHtxh()==f_htxh){
					    		f_ycgl=cdd6.getYcgl();
					    		f_cgdj=cdd6.getCgdj();
					    		f_wbdj=cdd6.getWbdj();
					    		double cgsl=0;
					    		/*
					    		params.put("csbh", po.getCsbh());
								params.put("clhh", cdd6.getClhh());
								params.put("cgsl", f_ycgl_sum);
								params.put("wbbh", 0);
								List<FunctionPurchaseCtl> fpcList1=purchaseDetailMapper.getFunctionPurchaseCtl(params);
								if(fpcList1.size()>0){
									FunctionPurchaseCtl fpc=fpcList1.get(0);
									cgsl=fpc.getCgsl();
								}
								*/
								//以最小包装量作为最低采购量
								params.put("sql","select top 1 zxbzl from clbmb where clhh = '"+cdd6.getClhh()+"'");
								String zxbzl =purchaseDetailMapper.getStringFromSql(params);
								if(zxbzl==null){
									zxbzl="0";
								}
								double s_zxbzl=Double.parseDouble(zxbzl);
								double f_ycgl_sum_new=0;
								if(s_zxbzl>f_ycgl_sum&&s_zxbzl>0){
									f_ycgl_sum_new=s_zxbzl;
								}else{
									f_ycgl_sum_new=f_ycgl_sum;
								}
								f_xcgl=f_ycgl_sum_new - f_ycgl_sum +f_ycgl;//新采购量(以最小包装量作为最低采购量)
								f_cgsl_old=cdd6.getCgsl();
								if(DoubleCal.round(f_cgsl_old, 6)!=DoubleCal.round(f_xcgl, 6)){
									cdd6.setCgsl(f_xcgl);
									params.put("clhh", cdd6.getClhh());
									params.put("cltx1",cdd6.getCltx1());
									double s_zhxs=purchaseDetailMapper.getConversion(params);
									ls_kjlx=cdd6.getKjlx();
									if(s_zhxs>0){
										cdd6.setFzsl(DoubleCal.round(f_xcgl*s_zhxs, 3));
									}else{
										cdd6.setFzsl(0);
									}
									if(ls_kjlx==1){
										cdd6.setCgje(DoubleCal.round(cdd6.getFzsl()*f_cgdj, 2));
										cdd6.setWbje(DoubleCal.round(cdd6.getFzsl()*f_wbdj, 2));
									}else{
										cdd6.setCgje(DoubleCal.round(f_xcgl*f_cgdj, 2));
										cdd6.setWbje(DoubleCal.round(f_xcgl*f_wbdj, 2));
									}
									purchaseOrderDetailMapper.updatePurchaseOrderDetail(cdd6);
								}
					    	}
					    }
				    }
				}
			}
			/*if(!ls_row_kj.equals("")){
				show+="\n合同序号为【"+ls_row_kj+"】的记录的控制单价与材料采购价格维护中的控价不一致！";
			}
			json.put("show", show);*/
			sql = "  select cfbj  from cglbb where lbbh='" + cglb + "' ";
			params.put("sql", sql);
			String cfbj = purchaseDetailMapper.getStringFromSql(params);
			if (cfbj == null) {
				cfbj = "0";
			}
			int s_cfbj = Integer.parseInt(cfbj);
			if (s_cfbj > 0) {
				long ls_cgbh, ls_cgxh, ls_cgbh1, ls_cgxh1, ls_bzclbj;
				sql = "  select bzclbj  from cglbb where lbbh='" + cglb + "' ";
				params.put("sql", sql);
				String bzclbj = purchaseDetailMapper.getStringFromSql(params);
				if (bzclbj == null) {
					bzclbj = "0";
				}
				ls_bzclbj = Integer.parseInt(bzclbj);
				// if(ls_bzclbj>0){
				for (int i = 0; i < cds.size() - 1; i++) {
					ls_cgbh = cds.get(i).getCgbh();
					ls_cgxh = cds.get(i).getCgxh();
					if (ls_cgbh != 0 && ls_cgxh != 0) {
						for (int j = i + 1; j < cds.size(); j++) {
							ls_cgbh1 = cds.get(j).getCgbh();
							ls_cgxh1 = cds.get(j).getCgxh();
							if (ls_cgbh == ls_cgbh1 && ls_cgxh == ls_cgxh1) {
								json.put("msg", "采计号【" + ls_cgbh1 + "-"+ ls_cgxh1 + "【在该合同中已经存在,请检查是否重复采购!");
								json.put("bool", false);
								return json.toString();
							}
						}
					}
				}
				// }
			}
			//json.put("update", MyJsonUtil.getJSONString(update));
		/*} catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "保存验证时出现异常，请重试！");
		}*/
		return json.toString();
	}
	/**
	 * 标记更新
	 * Request purchasedetail/purchasecontract.act?method=getSyncState  <br/><br/>
	 * @author wq
	 * @date 2016-03-08
	 */
	public String getSyncState(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		mapper.updateContractDetailScbj(params);
		mapper.updateContractDetailXzbj(params);
		return json.toString();
	}
	/**
	 * 厂商同步更新
	 * Request purchasedetail/purchasecontract.act?method=getSyncWithOutCsbh  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-03-09
	 */
	public String getSyncWithOutCsbh(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String sql;
			    JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
				String recstr=params.get("recstr").toString();
				JSONArray array = JSONArray.fromObject(recstr);
				ContractDetail cds[]=(ContractDetail [])JSONArray.toArray(array,ContractDetail.class);
				String s_wbbh,csbh;
				csbh=params.get("csbh").toString();				
				sql="  select wbbh  from csxxb where csbh='"+csbh+"' ";
				params.put("sql",sql);
				s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				for(ContractDetail cd :cds){
					String s_clhh=cd.getClhh();
					Date s_jhrq=cd.getJhrq();
					int s_kjlx=cd.getKjlx();
					FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
					double f_cgdj=0,s_wbdj=0,s_cgdj=0,s_cgsl,s_wbje = 0,cgje,s_cgje = 0,s_fzsl,wbhl = 0;
					Date s_cgrq;
					if(!s_wbbh.equals("")){
						s_wbdj=cd.getWbdj();
						sql="  select top 1 wbdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
						sql+="where cghtb.csbh='"+csbh+"' and htmxb.clhh= '"+cd.getClhh()+"'";
						sql+="and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>"+cd.getHtbh()+" order by cghtb.czsj desc ";
						params.put("sql",sql);
						String f_cgdjStr=purchaseDetailMapper.getStringFromSql(params);
						if(f_cgdjStr==null){
							f_cgdjStr="0";
						}
						f_cgdj=Double.parseDouble(f_cgdjStr);
						params.put("csbh", csbh);
						params.put("clhh", s_clhh);
						params.put("cgsl", 0);
						params.put("wbbh", s_wbbh);
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
						}
						if(f_cgdj==0){
							if(s_kjlx==1){
								cd.setCgdj(fpc.getCgdj());
							}else{
								cd.setCgdj(fpc.getFzkj());
							}
						}else{
							cd.setCgdj(f_cgdj);
						}
					}else{
						s_cgdj=cd.getCgdj();
						f_cgdj=0;
						sql="  select top 1 cgdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
						sql+="where cghtb.csbh='"+csbh+"' and htmxb.clhh= '"+cd.getClhh()+"'";
						sql+="and htmxb.cgdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>"+cd.getHtbh()+" order by cghtb.czsj desc ";
						params.put("sql",sql);
						String f_cgdjStr=purchaseDetailMapper.getStringFromSql(params);
						if(f_cgdjStr==null){
							f_cgdjStr="0";
						}
						f_cgdj=Double.parseDouble(f_cgdjStr);
						params.put("csbh", csbh);
						params.put("clhh", s_clhh);
						params.put("cgsl", 0);
						params.put("wbbh", s_wbbh);
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
						}
						if(f_cgdj==0){
							if(s_kjlx==1){
								cd.setCgdj(fpc.getCgdj());
							}else{
								cd.setCgdj(fpc.getFzkj());
							}
						}else{
							cd.setCgdj(f_cgdj);
						}
					}
					if(s_kjlx!=1){
						cd.setKzdj(fpc.getKzdj());
					}else{
						cd.setKzdj(fpc.getFzkj());
					}
					Calendar rightNow = Calendar.getInstance();
					if(s_jhrq!=null){
						rightNow.setTime(s_jhrq);
						rightNow.add(Calendar.DAY_OF_YEAR,-(int)fpc.getGhzq());
						cd.setCgrq(rightNow.getTime());
					}
					s_cgsl=cd.getCgsl();
					s_fzsl=cd.getFzsl();
					s_cgdj=cd.getCgdj();
					s_wbdj=cd.getWbdj();
					s_cgrq=cd.getCgrq();
					if(!s_wbbh.equals("")){
						if(s_cgrq==null){
							s_cgrq=new Date();
						}
						int f_nf=s_cgrq.getYear()+1900;
						int f_yf=s_cgrq.getMonth()+1;
						sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
						params.put("sql",sql);
						String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
						if(wbhlStr==null){
							wbhlStr="0";
						}
						wbhl=Double.parseDouble(wbhlStr);
						if(s_kjlx!=1){
							s_wbje=DoubleCal.round(s_wbdj*s_cgsl, 2);
						}else{
							s_wbje=DoubleCal.round(s_wbdj*s_fzsl, 2);
						}
						s_cgje=DoubleCal.round(s_wbje*wbhl,2);
						if(s_cgsl!=0){
							if(s_kjlx!=1){
								s_cgdj=DoubleCal.round(s_cgje/s_cgsl, 4);
							}else{
								if(s_fzsl!=0){
									if(s_cgje!=0){
										s_cgdj=DoubleCal.round(s_cgje/s_fzsl, 4);
									}else{
										s_cgdj=0;
									}
								}
							}
						}
						cd.setWbbh(s_wbbh);
						cd.setWbhl(wbhl);
						cd.setCgdj(s_cgdj);
						cd.setCgje(s_cgje);
						cd.setWbdj(s_wbdj);
						cd.setWbje(s_wbje);
					}else{
						if(s_kjlx!=1){
							s_cgje=DoubleCal.round(s_cgsl*s_cgdj, 2);
						}else{
							s_cgje=DoubleCal.round(s_fzsl*s_cgdj, 2);
						}
						cd.setWbbh("");
						cd.setWbhl(0);
						cd.setCgdj(s_cgdj);
						cd.setCgje(s_cgje);
						cd.setWbdj(0);
						cd.setWbje(0);
					}
					sql="  select mjh  from cgxxb where clhh='"+s_clhh+"' and csbh='"+csbh+"' ";
					params.put("sql",sql);
					String mjh=purchaseDetailMapper.getStringFromSql(params);
					cd.setMjh(mjh);
				}
				json.put("update", MyJsonUtil.getJSONString(cds));
		return json.toString();
	}
}
