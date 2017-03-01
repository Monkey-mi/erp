package erp.erp.purchaseOrder.service;

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

import javax.persistence.criteria.CriteriaBuilder.In;

import net.java.dev.eval.Expression;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sybase.jdbc3.a.b.p;

import erp.common.FilterModel;
import erp.erp.master.company.model.CompanyShow;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.master.purchaseDetail.model.ContractDetail;
import erp.erp.master.purchaseDetail.model.FunctionPurchaseCtl;
import erp.erp.master.purchaseDetail.model.MaterialDetail;
import erp.erp.master.purchaseDetail.model.PanelDetailAndOrder;
import erp.erp.master.purchaseDetail.model.PlanDetail;
import erp.erp.purchaseOrder.data.PurchaseOrderDetailMapper;
import erp.erp.purchaseOrder.model.BomSearch;
import erp.erp.purchaseOrder.model.CollectAdjust;
import erp.erp.purchaseOrder.model.Component;
import erp.erp.purchaseOrder.model.DetailSummarize;
import erp.erp.purchaseOrder.model.OrderDescribe;
import erp.erp.purchaseOrder.model.OrderSubsidiary;
import erp.erp.purchaseOrder.model.PriceSearch;
import erp.erp.purchaseOrder.model.ProPlanImp;
import erp.erp.purchaseOrder.model.ProcurementOrder;
import erp.erp.purchaseOrder.model.PurBom;
import erp.erp.purchaseOrder.model.PurPanelImp;
import erp.erp.purchaseOrder.model.PurPanelSubsidiary;
import erp.erp.purchaseOrder.model.PurchaseChange;
import erp.erp.purchaseOrder.model.PurchaseOrderDetail;
import erp.erp.purchaseOrder.model.SalesOrder;
import erp.erp.purchaseOrder.model.SalesOrderImp;
import erp.erp.purchaseOrder.model.SplitDetailForPur;
import erp.util.DoubleCal;
import erp.util.MyJsonUtil;
import erp.util.SessionUtil;
import erp.util.TransUtil;
import erp.web.model.UserInfo;


@Service
public class PurchaseOrderDetailService {
	@Autowired
	private PurchaseOrderDetailMapper mapper;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购
	
	
	/**
	 * 钢架Bom导入
	 * Request purchaseorder/purchaseorderdetail.act?method=getBomImp  <br/><br/>
	 * @author wq
	 * @throws ParseException 
	 * @date 2016-07-05
	 */
	@Transactional
	public String getBomImp(Map<String,Object> params) throws ParseException {
		JSONObject json=new JSONObject();
		json.put("bool", true);
				String recstr=params.get("recstr").toString();
				String login_id=params.get("login_id").toString();
				String ip=params.get("ip").toString();
				String czym=params.get("czym").toString();
				List<PurchaseOrderDetail> podList=MyJsonUtil.str2list(recstr, PurchaseOrderDetail.class);
				int ls_row,ls_ddbh,ls_ddxh,ls_htbh,ls_htxh;
				int ll_jhbh,ll_jhxh;
				String ls_clhh,ls_cpbh,ls_bbbh;
				int   s_count;
				String f_lbbh;
				double ls_zzhxs,ls_gxgs,ls_gjyl;

				Date s_czrq=new Date();
				
				for(PurchaseOrderDetail pod:podList){
					ls_ddbh=pod.getDdbh();
					ls_ddxh=pod.getDdxh();
					ls_htbh=pod.getHtbh();
					ls_htxh=pod.getHtxh();
					ls_clhh=pod.getClhh();
					ll_jhbh=pod.getJhbh();
					ll_jhxh=pod.getJhxh();
					params.put("sql", " select cpbh  from cpbmb where bcpbh='"+ls_clhh+"' ");
					String strCpbh=purchaseDetailMapper.getStringFromSql(params);
					if(strCpbh==null){
						ls_cpbh="";
					}else{
						ls_cpbh=strCpbh;
					}
					
					params.put("sql", " select sum(gxgs)  from scbomgxdeb where jhbh='"+ll_jhbh+"' and jhxh='"+ll_jhxh+"' ");
					String strGxgs=purchaseDetailMapper.getStringFromSql(params);
					if(strGxgs==null){
						ls_gxgs=0;
					}else{
						ls_gxgs=Double.parseDouble(strGxgs);
					}
					
					if(ls_ddbh>0 && ls_ddxh>0 && !"".equals(ls_cpbh)){
						ls_bbbh=ls_ddbh+"-"+ls_ddxh;
						params.put("cpbh", ls_cpbh);
						params.put("cptx1", "");
						params.put("cptx2", "");
						params.put("cptx3", "");
						params.put("bbbh", ls_bbbh);
						List<BomSearch> bsList=mapper.getBomExpand(params);
						//首先删除
						params.put("sql", " delete from dbo.gjjjbomb_tmp  where   htbh ='"+ls_htbh+"' and htxh='"+ls_htxh+"' and login_id='"+login_id+"' and ip='"+ip+"' ");
						purchaseDetailMapper.getStringFromSql(params);
						ls_row=1;
						for(BomSearch bs:bsList){
							PurBom pb=new PurBom();
							pb.setHtbh(ls_htbh);
							pb.setHtxh(ls_htxh);
							pb.setJlxh(ls_row);
							pb.setCpbh(ls_cpbh);
							pb.setBbbh(bs.getBbbh());
							pb.setJgbh(bs.getJgbh());
							pb.setLbbh(bs.getLbbh());
							f_lbbh=bs.getLbbh();
							String tt="";
							if(!"".equals(bs.getLbbh().trim())){
								tt=f_lbbh.trim().substring(0, 2);
								if(tt.equals("15") || tt.equals("16") ){
									pb.setCllx(2);
								}else{
									pb.setCllx(1);
								}
								pb.setXdrq(s_czrq);
							}
							pb.setBjbb(bs.getBjbb());
							pb.setMjbz(bs.getMjbz());
							pb.setClhh(bs.getClhh());
							pb.setCltx1(bs.getCltx1());
							pb.setCltx2(bs.getCltx2());
							pb.setCltx3(bs.getCltx3());
							pb.setClmc(bs.getClmc());
							pb.setJldw(bs.getJldw());
							pb.setDjyl(bs.getDjyl());
							pb.setBzsm(bs.getBzsm());
							pb.setCsbh(bs.getCsbh());
							//如果该铁管和五金件对应的价格厂商只有一个，则给csbh赋值
							if(tt.equals("15")){
								String sql=" SELECT csxxb.csbh ";
								sql+="	 FROM   clbm_gscsb ";
								sql+=" left outer join csxxb on csxxb.csbh=clbm_gscsb.gycs ";
								sql+=" where  CSXXB.CSBH is not null and  clbm_gscsb.clhh='"+bs.getClhh()+"' ";
								params.put("sql",sql);
								List<String> csbhArr= purchaseDetailMapper.getStringArrFromSql(params);
								if(csbhArr.size()==1){
									pb.setCsbh(csbhArr.get(0));
								}
							}
							if(tt.equals("14")){
								String sql=" SELECT csxxb.csbh  ";
								sql+="	 FROM csjjb ";
								sql+=" left outer join csxxb on csxxb.csbh=csjjb.csbh ";
								sql+=" left outer join (select min(kzdj) as kzdj,clhh from csjjb where csjjb.clhh='"+bs.getClhh()+"' group by clhh) a on a.clhh=csjjb.clhh ";
								sql+=" where csjjb.clhh= a.clhh and csjjb.kzdj=a.kzdj ";
								params.put("sql",sql);
								List<String> csbhArr= purchaseDetailMapper.getStringArrFromSql(params);
								if(csbhArr.size()==1){
									pb.setCsbh(csbhArr.get(0));
								}
							}
							pb.setCzsj(s_czrq);
							pb.setCzym(czym);
							ls_zzhxs=0;
							params.put("sql", " select zzhxs  from clbmb where clhh='"+bs.getClhh()+"' ");
							String strZhxs =purchaseDetailMapper.getStringFromSql(params);
							if(strZhxs!=null){
								ls_zzhxs=Double.parseDouble(strZhxs);
							}
							pb.setZzhxs(ls_zzhxs);
							
							s_count=0;
							params.put("sql", " select count(*)  from gjqdb where cpbh='"+ls_cpbh+"' and bbbh='"+bs.getBbbh()+"' and jgbh='"+bs.getJgbh()+"' ");
							String strCount =purchaseDetailMapper.getStringFromSql(params);
							if(strCount!=null){
								s_count=Integer.parseInt(strCount);
							}
							if(s_count>0){
								ls_gjyl=0;
								params.put("sql", " select top 1 isnull(gjyl,0)  from gjqdb where cpbh='"+ls_cpbh+"' and bbbh='"+ls_bbbh+"' and jgbh='"+bs.getJgbh()+"' ");
								String strGjyl =purchaseDetailMapper.getStringFromSql(params);
								if(strGjyl!=null){
									ls_gjyl=Double.parseDouble(strGjyl);
								}
								pb.setDjyl(DoubleCal.round(ls_gjyl*ls_zzhxs, 6));
							}
							pb.setLogin_id(login_id);
							pb.setIp(ip);
							//f_cgjg_js
							ls_clhh=pb.getClhh();
							Date ldt_xdrq=pb.getXdrq();
							String ls_csbh = pb.getCsbh();
							double ld_spjg=0;
							if(ldt_xdrq!=null){
								String sql = "select  top 1 spjg1  ";
								sql+="	from clspjg_jgb ";
								sql+="	left outer join clspjgb on clspjgb.jlbh = clspjg_jgb.jlbh ";
								sql+="	left outer join clbmb on clbmb.gsbh =clspjgb.gsbh ";
								sql+="	where clbmb.clhh = '"+ls_clhh+"' and convert(date,jlrq,102) = '"+TransUtil.DateTransString(ldt_xdrq,"yyyy-MM-dd")+"' ";
								sql+="	and qybj=1; ";
								params.put("sql",sql);
								String strSpjg =purchaseDetailMapper.getStringFromSql(params);
								if(strSpjg!=null){
									ld_spjg=Double.parseDouble(strSpjg);
								}
							}
							double ld_jgjg=0,ls_gjdj=0,ls_kzdj=0;
							String sql = " select  top 1 gscs  ";
							sql+="	from clbm_gscsb ";
							sql+="	left outer join clbmb on clbmb.clhh =clbm_gscsb.clhh ";
							sql+="	where clbmb.clhh = '"+ls_clhh+"' and clbm_gscsb.gycs='"+ls_csbh+"' ";
							sql+="	and( ( clbmb.gsbh=1005 and clbm_gscsb.csbh=11) or( clbmb.gsbh=1031 and clbm_gscsb.csbh=54)) ";
							params.put("sql",sql);
							String strJgjg =purchaseDetailMapper.getStringFromSql(params);
							if(strJgjg!=null){
								ld_jgjg=Double.parseDouble(strJgjg);
							}
							if(ld_jgjg!=0&&ld_spjg!=0){
								ls_gjdj=ld_jgjg+ld_spjg;
							}else{
								//五金件及其他材料按材料采购价格管理中厂商对应的控制单价取值
								sql =" select kzdj  from csjjb where clhh='"+ls_clhh+"' and csbh='"+ls_csbh+"'";
								params.put("sql",sql);
								String strKzdj =purchaseDetailMapper.getStringFromSql(params);
								if(strKzdj!=null){
									ls_kzdj=Double.parseDouble(strKzdj);
								}
								if(ls_kzdj!=0){
									ls_gjdj=ls_kzdj;
								}else{
									ls_gjdj=0;
								}
							}
							//铁管类且材料名称为'A3......'除外，单价为5元
							sql =" select COUNT(*)  from clbmb where LEFT(lbbh,2) =15 and clmc like 'A3%' and clhh='"+ls_clhh+"' ";
							params.put("sql",sql);
							strCount =purchaseDetailMapper.getStringFromSql(params);
							s_count=0;
							if(strCount!=null){
								s_count=Integer.parseInt(strCount);
								if(s_count>0){
									ls_gjdj=5;
								}
							}
							pb.setGjdj(ls_gjdj);
							pb.setGjdj_new(ls_gjdj);
							double ls_wxsh=pb.getWxsh();
							String ls_jgbh=pb.getJgbh();
							double ls_djyl=pb.getDjyl();
							double ls_ewje=pb.getEwje();
							if(!"".equals(ls_jgbh)){
								ls_gjdj=pb.getGjdj();
								if(ls_wxsh==0){
									ls_wxsh = 1;
								}
								double ls_clje=DoubleCal.round(ls_djyl*DoubleCal.round((ls_gjdj+ls_ewje/1000),4)*ls_wxsh,4);
								pb.setClje(ls_clje);
								pb.setGjdj_new(DoubleCal.round((ls_gjdj+ls_ewje/1000),4));
							}
							ls_row++;
							mapper.addPurBom(pb);
							
						}
						if(bsList.size()>0){
							PurBom pb=new PurBom();
							pb.setHtbh(ls_htbh);
							pb.setHtxh(ls_htxh);
							pb.setCpbh(ls_cpbh);
							pb.setBbbh(ls_bbbh);
							pb.setJgbh("");
							pb.setJlxh(ls_row);
							pb.setClmc("外协加工费");
							pb.setClje(ls_gxgs);
							pb.setLogin_id(login_id);
							pb.setIp(ip);
							mapper.addPurBom(pb);
						}
					}
				}
		return json.toString();
	}
	/**
	 * 生产计划导入转换
	 * Request purchaseorder/purchaseorderdetail.act?method=getProPlanTransform  <br/><br/>
	 * @author wq
	 * @date 2016-04-20
	 */
	@Transactional
	public String getProPlanTransform(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
				String recstr=params.get("recstr").toString();
				String login_id=params.get("login_id").toString();
				String ip=params.get("ip").toString();
				int s_num=0;
				String s_na,ls_cpbh,ls_clmc,ls_clhh,ls_cltx1,ls_jldw,ls_ywms,s_csbh;
				double ls_cgsl,ls_jhsl,ls_cgdj = 0,ls_wbhl;
				String ls_zcpbh,ls_wbbh,ls_jhbz,ls_khbh,ls_sqh,ls_pono,ls_khxh,ls_lbbh,ls_bmbh,sql;
				int ll_row,ll_row1,ls_jhbh,ls_jhxh,ls_ddbh,ls_ddxh,ls_sqbh,ls_sqxh,s_htbh;
				double ll_cgsl = 0,kzdj=0,fzdj=0;
				s_htbh=Integer.parseInt(params.get("htbh").toString());
				s_csbh=params.get("csbh").toString();
				if(s_csbh==null){
					s_csbh="";
				}else{
					s_csbh=s_csbh.trim();
				}
				List<ProPlanImp> ppiList=MyJsonUtil.str2list(recstr, ProPlanImp.class);
				FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
				params.put("sql","  select wbbh from csxxb where csbh = '"+s_csbh+"' ");
				String s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				Date ls_psjq,ls_jhrq;
				for(ProPlanImp ppi :ppiList){
					PurchaseOrderDetail newpod=new PurchaseOrderDetail();
					ls_jhbh=ppi.getJhbh();
					ls_jhxh=ppi.getJhxh();
					ls_cpbh=ppi.getCpbh();
					ls_lbbh=ppi.getJhlb();
					List<PurchaseOrderDetail> lastList =mapper.getPurchaseOrderDetailLast(params);
					if(lastList.size()>0){
						PurchaseOrderDetail last=lastList.get(0);
						newpod.setHtbh(s_htbh);
						newpod.setHtxh(last.getHtxh()+1);
						newpod.setCgrq(last.getCgrq());
						newpod.setWbbh(last.getWbbh());
						newpod.setWbhl(last.getWbhl());
						//加入外币判断
						if(!s_wbbh.equals("")){
							newpod.setZzsl(0);
						}else{
							newpod.setZzsl(last.getZzsl());
						}
						newpod.setPxxh(last.getPxxh()+5);
					}else{
						Date s_cgrq=new Date();
						newpod.setHtxh(1);
						newpod.setPxxh(5);
						newpod.setCgrq(s_cgrq);
						newpod.setWbbh(s_wbbh);
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
							newpod.setWbhl(wbhl);
						}else{
							newpod.setWbhl(0);
						}
						//加入外币判断
						if(!s_wbbh.equals("")){
							newpod.setZzsl(0);
						}else{
							newpod.setZzsl(0.17);
						}
					}
					//根据计划类别查对应核算部门，并插入采购明细
					params.put("sql","  select top 1 bmbh  from hsbmb where bmbh=(select hsbm from jhlbb where lbbh='"+ls_lbbh+"'); ");
					ls_bmbh=purchaseDetailMapper.getStringFromSql(params);
					if(ls_bmbh==null){
						ls_bmbh="";
					}else{
						ls_bmbh=ls_bmbh.trim();
					}
					ls_clmc=ppi.getClmc();
					ls_clhh=ppi.getClhh();
					ls_cltx1=ppi.getCptx1();
					ls_jldw=ppi.getJldw();
					ls_psjq=ppi.getPsjq();
					ls_zcpbh=ppi.getZcpbh();
					ls_jhsl=ppi.getJhsl();
					ls_cgsl=ppi.getWzsl();
					//交货日期取生产计划中的完工日期
					ls_jhrq=ppi.getWcrq();
					ls_jhbz=ppi.getJhbz();
					ls_sqbh=ppi.getSqbh();
					ls_sqxh=ppi.getSqxh();
					ls_sqh=ppi.getSqh();
					ls_pono=ppi.getPono();
					ls_khbh=ppi.getKhbh();
					ls_khxh=ppi.getKhxh();
					ls_ywms=ppi.getYwms();
					ls_ddbh=0;
					ls_ddxh=0;
					params.put("jhbh",ppi.getJhbh());
					params.put("jhxh", ppi.getJhxh());
					List<PlanDetail> pdList =purchaseDetailMapper.getPlanDetailForDdhList(params);
					if(pdList.size()>0){
						PlanDetail pd=pdList.get(0);
						int zjbh=pd.getZjbh();
						if(zjbh!=0){
							params.put("jhbh",zjbh);
							params.put("jhxh",pd.getZjxh());
							List<PlanDetail> pdList1 =purchaseDetailMapper.getPlanDetailForDdhList(params);
							if(pdList1.size()>0){
								PlanDetail pd1=pdList1.get(0);
								ls_ddbh=pd1.getDdbh();
								ls_ddxh=pd1.getDdxh();
							}
						}else{
							ls_ddbh=pd.getDdbh();
							ls_ddxh=pd.getDdxh();
						}
					}else{
						ls_ddbh=ppi.getDdbh();
						ls_ddxh=ppi.getDdxh();
					}
					if(!s_wbbh.equals("")){
						params.put("csbh", s_csbh);
						params.put("clhh", ls_clhh);
						params.put("cgsl", 0);
						params.put("wbbh",s_wbbh);
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
							kzdj=fpc.getKzdj();
							fzdj=fpc.getFzkj();
						}
					}else{
						params.put("csbh", s_csbh);
						params.put("clhh", ls_clhh);
						params.put("cgsl", 0);
						params.put("wbbh","");
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
							kzdj=fpc.getKzdj();
							fzdj=fpc.getFzkj();
							ls_cgdj=kzdj;
						}
					}
					newpod.setJhbh(ls_jhbh);
					newpod.setJhxh(ls_jhxh);
					newpod.setHsbm(ls_bmbh);
					newpod.setJhh(ppi.getJhh());
					newpod.setDdh(ls_ddbh+"-"+ls_ddxh);
					newpod.setDdxh(ls_ddxh);
					newpod.setDdbh(ls_ddbh);
					newpod.setKhxh(ppi.getKhxh());
					newpod.setYwms(ppi.getYwms());
					newpod.setPono(ppi.getPono());
					newpod.setPsjq(ls_psjq);
					newpod.setClhh(ls_clhh);
					newpod.setClmc(ls_clmc);
					newpod.setJldw(ls_jldw);
					newpod.setHtbz(ls_jhbz);
					//采购数量取生产计划中未转数量
					newpod.setCgsl(ls_cgsl);
					newpod.setYcgl(ls_cgsl);
					newpod.setCltx1(ls_cltx1);
					newpod.setKhbh(ls_khbh);
					//产品编号取生产计划中主产品编号
					newpod.setCpbh(ls_zcpbh);
					newpod.setSqbh(ls_sqbh);
					newpod.setSqxh(ls_sqxh);
					newpod.setSqh(ls_sqh);
					newpod.setJhrq(ls_jhrq);
					Date s_cgrq=new Date();
					newpod.setCgrq(s_cgrq);
					double ls_wbje,ls_cgje,ls_bbdj;
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
						ls_wbhl=Double.parseDouble(wbhlStr);
						ls_wbje=DoubleCal.round(ls_cgsl*ls_cgdj,2);
						if(ls_wbhl!=0){
							ls_cgje=DoubleCal.round(ls_wbje/ls_wbhl,2);
						}else{
							ls_cgje=0;
						}
						if(ls_cgsl!=0){
							ls_bbdj=DoubleCal.round(ls_cgje/ls_cgsl,6);
						}else{
							ls_bbdj=0;
						}
						newpod.setKzdj(kzdj);
						newpod.setWbbh(s_wbbh);
						newpod.setWbhl(ls_wbhl);
						newpod.setWbdj(ls_cgdj);
						newpod.setWbje(ls_wbje);
						newpod.setCgdj(ls_bbdj);
						newpod.setCgje(ls_cgje);
					}else{
						newpod.setKzdj(kzdj);
						newpod.setCgdj(ls_cgdj);
						newpod.setCgje(DoubleCal.round(ls_cgsl*ls_cgdj,2));
					}
					newpod.setLogin_id(login_id);
					newpod.setIp(ip);
					newpod.setHtbh(s_htbh);
					mapper.addPurchaseOrderDetail(newpod);
				}
		return json.toString();
	}
	/**
	 * 销售订单导入转换
	 * Request purchaseorder/purchaseorderdetail.act?method=getSalesOrderTransform  <br/><br/>
	 * @author wq
	 * @date 2016-04-20
	 */
	@Transactional
	public String getSalesOrderTransform(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
				String recstr=params.get("recstr").toString();
				String login_id=params.get("login_id").toString();
				String ip=params.get("ip").toString();
				int s_num=0;
				String   s_na,ls_clhh,s_htbz,s_htbz_sum = "",ls_clth,ls_clmc,ls_jldw,s_csbh,sql;
				int ll_ddbh,ll_ddxh,ll_row1,s_rec=0,s_ddbh_old = 0,s_ddbh = 0,s_htbh;
				double ll_cgsl;
				s_htbh=Integer.parseInt(params.get("htbh").toString());
				s_csbh=params.get("csbh").toString();
				if(s_csbh==null){
					s_csbh="";
				}else{
					s_csbh=s_csbh.trim();
				}
				List<SalesOrderImp> ppiList=MyJsonUtil.str2list(recstr, SalesOrderImp.class);
				FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
				params.put("sql","  select wbbh from csxxb where csbh = '"+s_csbh+"' ");
				String s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				for(SalesOrderImp ppi :ppiList){
					PurchaseOrderDetail newpod=new PurchaseOrderDetail();
					ll_ddbh=ppi.getDdbh();
					ll_ddxh=ppi.getDdxh();
					ls_clhh=ppi.getBcpbh();
					ls_clth=ppi.getClth();
					ls_clmc=ppi.getClmc();
					ls_jldw=ppi.getJldw();
					ll_cgsl=DoubleCal.round(ppi.getWzsl(),2);
					s_rec+=1;
					sql = "  select isnull(htbz,'')  from xsddb where ddbh="+ll_ddbh+";";
					params.put("sql", sql);
					s_htbz = purchaseDetailMapper.getStringFromSql(params);
					if(s_htbz==null){
						s_htbz="";
					}
					if(s_rec==1){
						s_ddbh_old=ll_ddbh;
						s_htbz_sum=s_htbz;
					}else{
						if(s_ddbh_old!=ll_ddbh){
							s_htbz_sum=s_htbz_sum+"-"+s_htbz;
						}
					}
					sql = "  select zzhxs  from clbmb where clhh='"+ls_clhh+"';";
					params.put("sql", sql);
					String zzhxsStr = purchaseDetailMapper.getStringFromSql(params);
					if(zzhxsStr==null){
						zzhxsStr="0";
					}
					double zzhxs=Double.parseDouble(zzhxsStr);
					
					sql = "  select mjh  from cgxxb where csbh='"+s_csbh+"' and clhh='"+ls_clhh+"';";
					params.put("sql", sql);
					String mjh = purchaseDetailMapper.getStringFromSql(params);
					if(mjh==null){
						mjh="";
					}
					List<PurchaseOrderDetail> lastList =mapper.getPurchaseOrderDetailLast(params);
					if(lastList.size()>0){
						PurchaseOrderDetail last=lastList.get(0);
						newpod.setHtbh(s_htbh);
						newpod.setHtxh(last.getHtxh()+1);
						newpod.setCgrq(last.getCgrq());
						newpod.setWbbh(last.getWbbh());
						newpod.setWbhl(last.getWbhl());
						//加入外币判断
						if(!s_wbbh.equals("")){
							newpod.setZzsl(0);
						}else{
							newpod.setZzsl(last.getZzsl());
						}
						newpod.setPxxh(last.getPxxh()+5);
					}else{
						Date s_cgrq=new Date();
						newpod.setHtxh(1);
						newpod.setPxxh(5);
						newpod.setCgrq(s_cgrq);
						newpod.setWbbh(s_wbbh);
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
							newpod.setWbhl(wbhl);
						}else{
							newpod.setWbhl(0);
						}
						//加入外币判断
						if(!s_wbbh.equals("")){
							newpod.setZzsl(0);
						}else{
							newpod.setZzsl(0.17);
						}
					}
					newpod.setDdbh(ll_ddbh);
					newpod.setDdxh(ll_ddxh);
					newpod.setDdh(ppi.getDdh());
					newpod.setClhh(ls_clhh);
					newpod.setFzzbj(ppi.getFzzbj());
					newpod.setTxgz(ppi.getTxgz());
					newpod.setHtbz(ppi.getHtbz());
					newpod.setKhbh(ppi.getKhbh());
					newpod.setCpbh(ppi.getCpbh());
					newpod.setKhxh(ppi.getKhxh());
					newpod.setFach(ppi.getFach());
					newpod.setPono(ppi.getPono());
					newpod.setYwms(ppi.getYwms());
					newpod.setPsjq(ppi.getPsjq());
					newpod.setClth(ls_clth);
					newpod.setClmc(ls_clmc);
					newpod.setJldw(ls_jldw);
					newpod.setCgsl(ll_cgsl);
					newpod.setYcgl(ll_cgsl);
					newpod.setZzhxs(zzhxs);
					newpod.setKjlx(0);
					newpod.setCltx1(ppi.getGgzc());
					newpod.setLogin_id(login_id);
					newpod.setIp(ip);
					newpod.setHtbh(s_htbh);
					mapper.addPurchaseOrderDetail(newpod);
				}
				json.put("cgbz", s_htbz_sum);
		return json.toString();
	}
	/**
	 * 生产计划导入
	 * Request purchaseorder/purchaseorderdetail.act?method=getProPlanImpList <br/><br/>
	 * @author wq
	 * @date 2016-04-19
	 */
	public List<ProPlanImp> getProPlanImpList(Map<String,Object> params) {
		return mapper.getProPlanImpList(params);
	}
	/**
	 * 订单导入
	 * Request purchaseorder/purchaseorderdetail.act?method=getSalesOrderImpList <br/><br/>
	 * @author wq
	 * @date 2016-04-19
	 */
	public List<SalesOrderImp> getSalesOrderImpList(Map<String,Object> params) {
		return mapper.getSalesOrderImpList(params);
	}
	/**
	 * 单价查询
	 * Request purchaseorder/purchaseorderdetail.act?method=getPriceSearchList <br/><br/>
	 * @author wq
	 * @date 2016-04-16
	 */
	public List<PriceSearch> getPriceSearchList(Map<String,Object> params) {
		return mapper.getPriceSearchList(params);
	}
	/**
	 * 获取转换系数
	 * Request purchaseorder/purchaseorderdetail.act?method=getZhxsWithOut <br/><br/>
	 * @author wq
	 * @date 2016-04-16
	 */
	public String getZhxsWithOut(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		double s_zhxs=purchaseDetailMapper.getConversion(params);
		json.put("zhxs", s_zhxs);
		return json.toString();
	}
	/**
	 * 刷汇总调整数据
	 * Request purchaseorder/purchaseorderdetail.act?method=getCollectAdjustState <br/><br/>
	 * @author wq
	 * @date 2016-04-16
	 */
	public String getCollectAdjustState(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			List<CollectAdjust> caList=mapper.getCollectAdjustList(params);
			String sql="";
			for(CollectAdjust ca:caList){
				String clhh=ca.getClhh(),cltx1=ca.getCltx1();
				double cgdj=ca.getCgdj(),wbdj=ca.getWbdj(),s_cgsl=0,s_cgdj=0,s_wbdj=0,s_zhxs=0
				,s_cgje=0,s_wbje=0,s_dlgs=0,s_fzsl=0,ls_djyl=0;
				int s_cgbh,s_cgxh;
				params.put("clhh", clhh);
				params.put("cltx1", cltx1);
				params.put("cgdj", cgdj);
				params.put("wbdj", wbdj);
				List<PurchaseOrderDetail> podList=mapper.getPurchaseOrderDetailListForEdt(params);
				//编辑界面上对应材料货号只有一条
				if(podList.size()==1){
					PurchaseOrderDetail pod=podList.get(0);
					s_cgsl=ca.getCgsl();
					s_cgdj=ca.getCgdj();
					s_wbdj=ca.getWbdj();
					pod.setCgsl(s_cgsl);
					pod.setYcgl(s_cgsl);
					sql = "  select fzzbj  from clbmb where clhh='"+clhh+"' ";
					params.put("sql", sql);
					String fzzbjStr = purchaseDetailMapper.getStringFromSql(params);
					if(fzzbjStr==null){
						fzzbjStr="";
					}
					params.put("clhh", clhh);
					params.put("cltx1",cltx1);
					s_zhxs=purchaseDetailMapper.getConversion(params);
					int fzzbj=Integer.parseInt(fzzbjStr);
					if(fzzbj==2||fzzbj==5||fzzbj==6){
						pod.setFzsl(DoubleCal.round(pod.getCgsl()*s_zhxs,3));
						double s_clgg,s_clgs;
						if(cltx1!=null&&!cltx1.equals("")){
							Expression exp1 = new Expression(cltx1.substring(0, cltx1.length()-1));
							s_clgg =exp1.eval().doubleValue();
						}else{
							s_clgg=0;
						}
						if(s_clgg>0){
							s_clgs=Math.ceil(pod.getFzsl()/s_clgg);
							pod.setFzsl(s_clgs*s_clgg);
							if(s_zhxs>0){
								pod.setCgsl(DoubleCal.round(pod.getFzsl()/s_zhxs, 3));
								s_cgsl=pod.getCgsl();
							}
						}
					}
					s_cgje=DoubleCal.round(s_cgsl*s_cgdj,2);
					s_wbje=DoubleCal.round(s_cgsl*s_wbdj,2);
					pod.setCgje(s_cgje);
					pod.setWbje(s_wbje);
					if(s_zhxs>0){
						pod.setFzsl(DoubleCal.round(s_cgsl*s_zhxs, 3));
					}else{
						pod.setFzsl(0);
					}
					//辅助数量变则短料变
					if(fzzbj==5||fzzbj==6){
						s_cgbh=pod.getCgbh();
						s_cgxh=pod.getCgxh();
						sql = "  select dlgs  from cgjhmxb where cgbh='"+s_cgbh+"' and cgxh='"+s_cgxh+"' ";
						params.put("sql", sql);
						String dlgsStr = purchaseDetailMapper.getStringFromSql(params);
						if(dlgsStr==null){
							dlgsStr="";
						}
						s_dlgs=Double.parseDouble(dlgsStr);
						params.put("htbh",pod.getHtbh());
						params.put("htxh",pod.getHtxh());
						List<OrderSubsidiary> osList=mapper.getOrderSubsidiaryForEdtList(params);
						if(osList.size()>0){
							OrderSubsidiary os=osList.get(0);
							ls_djyl=os.getDgyl();
						}else{
							ls_djyl=0;
						}
						double s_clgg;
						if(cltx1!=null&&!cltx1.equals("")){
							Expression exp1 = new Expression(cltx1.substring(0, cltx1.length()-1));
							s_clgg =exp1.eval().doubleValue();
						}else{
							s_clgg=0;
						}
						if(s_clgg!=0 && ls_djyl!=0 && s_dlgs !=0){ //排除未算出短料的采计部分
							pod.setDlgs(DoubleCal.round(s_clgg*ls_djyl, 0)*DoubleCal.round(s_fzsl/s_clgg, 0));
						}
					}
					mapper.updatePurchaseOrderDetail(pod);
				}else{//编辑界面上对应材料货号有多条
					s_cgdj=ca.getCgdj();
					s_wbdj=ca.getWbdj();
					long ll_row=0;
					double ys_cgsl=ca.getYs_cgsl(),s_cgsl_sum=0;
					double xg_cgsl=ca.getCgsl();
					for(int s_row1=0;s_row1<podList.size();s_row1++){
						PurchaseOrderDetail pod=podList.get(s_row1);
						double ll_cgsl=pod.getCgsl();
						if(s_row1<podList.size()-1){
							if(ca.getYs_cgsl()>0){
								s_cgsl=DoubleCal.round(ll_cgsl/ys_cgsl*xg_cgsl, 0);
							}else {
								s_cgsl=0;
							}
							s_cgsl_sum+=s_cgsl;
						}else{
							s_cgsl = xg_cgsl-s_cgsl_sum;
						}
						pod.setCgsl(s_cgsl);
						s_cgdj=pod.getCgdj();
						s_wbdj=pod.getWbdj();
						pod.setYcgl(s_cgsl);
						String ls_clhh=pod.getClhh();
						cltx1=pod.getCltx1();
						
						sql = "  select fzzbj  from clbmb where clhh='"+clhh+"' ";
						params.put("sql", sql);
						String fzzbjStr = purchaseDetailMapper.getStringFromSql(params);
						if(fzzbjStr==null){
							fzzbjStr="";
						}
						params.put("clhh", clhh);
						params.put("cltx1",cltx1);
						s_zhxs=purchaseDetailMapper.getConversion(params);
						int fzzbj=Integer.parseInt(fzzbjStr);
						if(fzzbj==2||fzzbj==5||fzzbj==6){
							pod.setFzsl(DoubleCal.round(pod.getCgsl()*s_zhxs,3));
							double s_clgg,s_clgs;
							if(cltx1!=null&&!cltx1.equals("")){
								Expression exp1 = new Expression(cltx1.substring(0, cltx1.length()-1));
								s_clgg =exp1.eval().doubleValue();
							}else{
								s_clgg=0;
							}
							if(s_clgg>0){
								s_clgs=Math.ceil(pod.getFzsl()/s_clgg);
								pod.setFzsl(s_clgs*s_clgg);
								if(s_zhxs>0){
									pod.setCgsl(DoubleCal.round(pod.getFzsl()/s_zhxs, 3));
									s_cgsl=pod.getCgsl();
								}
							}
						}
						s_cgje=DoubleCal.round(s_cgsl*s_cgdj,2);
						s_wbje=DoubleCal.round(s_cgsl*s_wbdj,2);
						pod.setCgje(s_cgje);
						pod.setWbje(s_wbje);
						if(s_zhxs>0){
							pod.setFzsl(DoubleCal.round(s_cgsl*s_zhxs, 3));
						}else{
							pod.setFzsl(0);
						}
						//辅助数量变则短料变
						if(fzzbj==5||fzzbj==6){
							s_cgbh=pod.getCgbh();
							s_cgxh=pod.getCgxh();
							sql = "  select dlgs  from cgjhmxb where cgbh='"+s_cgbh+"' and cgxh='"+s_cgxh+"' ";
							params.put("sql", sql);
							String dlgsStr = purchaseDetailMapper.getStringFromSql(params);
							if(dlgsStr==null){
								dlgsStr="";
							}
							s_dlgs=Double.parseDouble(dlgsStr);
							params.put("htbh",pod.getHtbh());
							params.put("htxh",pod.getHtxh());
							List<OrderSubsidiary> osList=mapper.getOrderSubsidiaryForEdtList(params);
							if(osList.size()>0){
								OrderSubsidiary os=osList.get(0);
								ls_djyl=os.getDgyl();
							}else{
								ls_djyl=0;
							}
							double s_clgg;
							if(cltx1!=null&&!cltx1.equals("")){
								Expression exp1 = new Expression(cltx1.substring(0, cltx1.length()-1));
								s_clgg =exp1.eval().doubleValue();
							}else{
								s_clgg=0;
							}
							if(s_clgg!=0 && ls_djyl!=0 && s_dlgs !=0){
								pod.setDlgs(DoubleCal.round(s_clgg*ls_djyl, 0)*DoubleCal.round(s_fzsl/s_clgg, 0));
							}
						}
						mapper.updatePurchaseOrderDetail(pod);
					}
				}
			}
		return json.toString();
	}
	/**
	 * 获取汇总调整数据
	 * Request purchaseorder/purchaseorderdetail.act?method=getCollectAdjustList <br/><br/>
	 * @author wq
	 * @date 2016-04-16
	 */
	public List<CollectAdjust> getCollectAdjustList(Map<String,Object> params) {
		return mapper.getCollectAdjustList(params);
	}
	/**
	 * 执行sql获取返回字符串
	 * Request purchaseorder/purchaseorderdetail.act?method=getStringFromSql <br/><br/>
	 * @author wq
	 * @date 2016-04-16
	 */
	public String getStringFromSql(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String a=purchaseDetailMapper.getStringFromSql(params);
		json.put("val", a);
		return json.toString();
	}
	
	/**
	 * 导入箱唛
	 * Request purchaseorder/purchaseorderdetail.act?method=getMarkImp <br/><br/>
	 * @author wq
	 * @date 2016-04-14
	 */
	public String getMarkImp(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String htbh=params.get("htbh").toString();
		String login_id=params.get("login_id").toString();
		String ip=params.get("ip").toString();
		String sql=" update htmxb_tmp set bzsm=(select top 1 xmsjbc  from jhmx_ddxxb where jhmx_ddxxb.ddbh=htmxb_tmp.ddbh and jhmx_ddxxb.ddxh=htmxb_tmp.ddxh) ";
		sql+="		where htbh='"+htbh+"' and login_id='"+login_id+"' and  ip='"+ip+"'"	;
		params.put("sql",sql);
		purchaseDetailMapper.getStringFromSql(params);
		return json.toString();
	}
	
	/**
	 * 删除合同明细
	 * Request purchaseorder/purchaseorderdetail.act?method=getDelPurchaseorderDetail <br/><br/>
	 * @author wq
	 * @date 2016-04-13
	 */
	public String getDelPurchaseorderDetail(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String htbh=params.get("htbh").toString();
		String htxh=params.get("htxh").toString();
		String login_id=params.get("login_id").toString();
		String ip=params.get("ip").toString();
		String htxtArr[]=htxh.split(",");
		for(String xh:htxtArr){
				params.put("sql","  delete from htmxb_tmp where htbh='"+htbh+"' and htxh in ("+htxh+") and login_id='"+login_id+"' and ip='"+ip+"' ");
				purchaseDetailMapper.getStringFromSql(params);
				params.put("sql","  delete from cghtfzb_tmp where htbh='"+htbh+"' and htxh in ("+htxh+") and login_id='"+login_id+"' and ip='"+ip+"' ");
				purchaseDetailMapper.getStringFromSql(params);
				params.put("sql","  delete from cghtwxlltzdb_tmp where htbh='"+htbh+"' and htxh in ("+htxh+") and login_id='"+login_id+"' and ip='"+ip+"' ");
				purchaseDetailMapper.getStringFromSql(params);
		}
		return json.toString();
	}
	/**
	 * 删除合同明细前验证
	 * Request purchaseorder/purchaseorderdetail.act?method=getBeforDelPurchaseorderDetail <br/><br/>
	 * @author wq
	 * @date 2016-04-13
	 */
	@Transactional
	public String getBeforDelPurchaseorderDetail(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String htbh=params.get("htbh").toString();
		String htxh=params.get("htxh").toString();
		String htxtArr[]=htxh.split(",");
		for(String xh:htxtArr){
			params.put("sql","  select isnull(sum(rksl),0)  from rkdb_yl  with (nolock) where htbh='"+htbh+"' and htxh="+xh+" ");
			String countStr=purchaseDetailMapper.getStringFromSql(params);
			double count=Double.parseDouble(countStr);
			if(count>0){
				json.put("bool", false);
				json.put("msg", "序号为'"+xh+"'的明细已有材料入库，不能删除！");
				return json.toString();
			}
		}
		return json.toString();
	}
	/**
	 * 材料导入参数
	 * Request purchaseorder/purchaseorderdetail.act?method=getMaterialDetailLoad  <br/><br/>
	 * @author wq
	 * @throws Exception 
	 * @date 2016-04-13
	 */
	public String getMaterialDetailLoad(Map<String,Object> params) throws Exception {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String s_csbh=params.get("csbh").toString();
		String materialDetail=params.get("materialDetail").toString();
		String contractDetail=params.get("contractDetail").toString();
		List<ContractDetail> cdList=new LinkedList<ContractDetail>();
		Date s_jhrq,ls_cgrq;
		int s_kjlx;
		double   s_cgsl,s_cgdj,s_cgje = 0,s_wbdj,s_wbje,s_fzsl,f_cgdj;
			UserInfo user=(UserInfo)SessionUtil.getCurrentUser();
			String clogin_id=user.getLogin_id();
			String login_id=params.get("login_id").toString();
			String ip=params.get("ip").toString();
			if(!clogin_id.equals(login_id)){
				json.put("bool", false);
				json.put("msg", "当前用户验证失效，请刷新页面！");
				return json.toString();
			}
			List<MaterialDetail>  arr=MyJsonUtil.getDTOList(materialDetail, MaterialDetail.class);
			PurchaseOrderDetail contractDetailObj=MyJsonUtil.str2obj(contractDetail, PurchaseOrderDetail.class);
			params.put("sql","  select wbbh from csxxb where csbh = '"+s_csbh+"' ");
			String s_wbbh=purchaseDetailMapper.getStringFromSql(params);
			if(s_wbbh==null){
				s_wbbh="";
			}else{
				s_wbbh=s_wbbh.trim();
			}
			PurchaseOrderDetail add=null;
			boolean isOne=true;
			int s_htbh=contractDetailObj.getHtbh();
			for(MaterialDetail obj:arr){
				if(isOne){
					add=contractDetailObj;
				}else{
					add=new PurchaseOrderDetail();
					add.setHtbh(s_htbh);
					params.put("htbh",s_htbh);
					List<PurchaseOrderDetail> lastList =mapper.getPurchaseOrderDetailLast(params);
					Date s_cgrq =contractDetailObj.getCgrq();
					if(lastList.size()>0){
						PurchaseOrderDetail last=lastList.get(0);
						add.setHtxh(last.getHtxh()+1);
						add.setCgrq(last.getCgrq());
						add.setWbbh(last.getWbbh());
						add.setWbhl(last.getWbhl());
						//加入外币判断
						if(!s_wbbh.equals("")){
							add.setZzsl(0);
						}else{
							add.setZzsl(last.getZzsl());
						}
						add.setPxxh(last.getPxxh()+5);
					}else{
						add.setHtxh(1);
						add.setPxxh(5);
						add.setCgrq(new Date());
						add.setWbbh(s_wbbh);
						if(!s_wbbh.equals("")){
							if(s_cgrq==null){
								s_cgrq=new Date();
							}
							int f_nf=s_cgrq.getYear()+1900;
							int f_yf=s_cgrq.getMonth()+1;
							String sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
							params.put("sql",sql);
							String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
							if(wbhlStr==null){
								wbhlStr="0";
							}
							double wbhl=Double.parseDouble(wbhlStr);
							add.setWbhl(wbhl);
						}else{
							add.setWbhl(0);
						}
						//加入外币判断
						if(!s_wbbh.equals("")){
							add.setZzsl(0);
						}else{
							add.setZzsl(0.17);
						}
					}
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
				add.setLogin_id(login_id);
				add.setIp(ip);
				if(isOne){
					mapper.updatePurchaseOrderDetail(add);
				}else{
					mapper.addPurchaseOrderDetail(add);
				}
				isOne=false;
			}
		json.put("cdList", MyJsonUtil.getJSONString(cdList));
		return json.toString();
	}
	/**
	 * 编辑前验证
	 * Request purchaseorder/purchaseorderdetail.act?method=getBeforEdt <br/><br/>
	 * @author wq
	 * @date 2016-01-12
	 */
	public String getBeforEdt(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String htbh=params.get("htbh").toString();
		params.put("sql","  select isnull(count(*),0)  from fksqyftzb where (mbhtbh='"+htbh+"') or (yfhtbh='"+htbh+"') ");
		String countStr=purchaseDetailMapper.getStringFromSql(params);
		int count=Integer.parseInt(countStr);
		if(count>0){
			json.put("bool", false);
			json.put("msg", "该合同已做预付调整单，不允许再编辑！");
			return json.toString();
		}
		return json.toString();
	}
	
	/**
	 * 新增明细
	 * Request purchaseorder/purchaseorderdetail.act?method=getAddPurchaseorderDetail <br/><br/>
	 * @author wq
	 * @throws ParseException 
	 * @date 2016-04-12
	 */
	public String getAddPurchaseorderDetail(Map<String,Object> params) throws ParseException {
		JSONObject json=new JSONObject();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		json.put("bool", true);
			UserInfo user=(UserInfo)SessionUtil.getCurrentUser();
			String clogin_id=user.getLogin_id();
			String login_id=params.get("login_id").toString();
			String ip=params.get("ip").toString();
			if(!clogin_id.equals(login_id)){
				json.put("bool", false);
				json.put("msg", "当前用户验证失效，请刷新页面！");
				return json.toString();
			}
			String rec=params.get("rec").toString();
			ProcurementOrder po=MyJsonUtil.str2obj(rec, ProcurementOrder.class);
			PurchaseOrderDetail newpod=new PurchaseOrderDetail();
			params.put("sql","  select wbbh from csxxb where csbh = '"+po.getCsbh()+"' ");
			String s_wbbh=purchaseDetailMapper.getStringFromSql(params);
			if(s_wbbh==null){
				s_wbbh="";
			}else{
				s_wbbh=s_wbbh.trim();
			}
			params.put("htbh",po.getHtbh());
			List<PurchaseOrderDetail> lastList =mapper.getPurchaseOrderDetailLast(params);
			Date s_cgrq =po.getCgrq();
			if(lastList.size()>0){
				PurchaseOrderDetail last=lastList.get(0);
				newpod.setHtxh(last.getHtxh()+1);
				//取最大采购日期和交货日期
				params.put("sql","  select max(cgrq) as cgrq,max(jhrq) as jhrq from htmxb_tmp where htbh = '"+po.getHtbh()+"'  and login_id ='"+login_id+"' and ip = '"+ip+"'");
				Map<String, Object> resultMap=purchaseDetailMapper.getMapFromSql(params);
				Date n_cgrq=new Date();
				Date n_jhrq=new Date();
				if(resultMap!=null){
					if(resultMap.get("cgrq")!=null){
						n_cgrq=df.parse(resultMap.get("cgrq").toString());
					}
					if(resultMap.get("jhrq")!=null){
						n_jhrq=df.parse(resultMap.get("jhrq").toString());
					}
				}
				newpod.setCgrq(n_cgrq);
				newpod.setJhrq(n_jhrq);
				newpod.setWbbh(last.getWbbh());
				newpod.setWbhl(last.getWbhl());
				//加入外币判断
				if(!s_wbbh.equals("")){
					//根据采购日期获取wbhl
					int f_nf=n_cgrq.getYear()+1900;
					int f_yf=n_cgrq.getMonth()+1;
					String sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
					params.put("sql",sql);
					String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
					if(wbhlStr==null){
						wbhlStr="0";
					}
					double wbhl=Double.parseDouble(wbhlStr);
					newpod.setWbhl(wbhl);
					newpod.setZzsl(0);
				}else{
					newpod.setZzsl(last.getZzsl());
				}
				newpod.setPxxh(last.getPxxh()+5);
			}else{
				newpod.setHtxh(1);
				newpod.setPxxh(5);
				newpod.setCgrq(new Date());
				newpod.setJhrq(new Date());
				newpod.setWbbh(s_wbbh);
				if(!s_wbbh.equals("")){
					if(s_cgrq==null){
						s_cgrq=new Date();
					}
					int f_nf=s_cgrq.getYear()+1900;
					int f_yf=s_cgrq.getMonth()+1;
					String sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
					params.put("sql",sql);
					String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
					if(wbhlStr==null){
						wbhlStr="0";
					}
					double wbhl=Double.parseDouble(wbhlStr);
					newpod.setWbhl(wbhl);
				}else{
					newpod.setWbhl(0);
				}
				//加入外币判断
				if(!s_wbbh.equals("")){
					newpod.setZzsl(0);
				}else{
					newpod.setZzsl(0.17);
				}
			}
			newpod.setHtbh(po.getHtbh());
			newpod.setLogin_id(login_id);
			newpod.setIp(ip);
			mapper.addPurchaseOrderDetail(newpod);
		return json.toString();
	}
	/**
	 * 临时表导入正式表
	 * Request purchaseorder/purchaseorderdetail.act?method=cacheTableToPurchaseOrderDetailFormal <br/><br/>
	 * @author wq
	 * @date 2016-04-11
	 */
	public String cacheTableToPurchaseOrderDetailFormal(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			UserInfo user=(UserInfo)SessionUtil.getCurrentUser();
			String clogin_id=user.getLogin_id();
			String login_id=params.get("login_id").toString();
			if(!clogin_id.equals(login_id)){
				json.put("bool", false);
				json.put("msg", "当前用户验证失效，请刷新页面！");
				return json.toString();
			}
			mapper.cacheTableToPurchaseOrderDetailFormal(params);
			int err=(Integer) params.get("statement");
			if(err==1){
				json.put("bool", false);
				json.put("msg", "合同明细导入正式表时失败，请重试！");
				return json.toString();
			}
			String rec=params.get("rec").toString();
			ProcurementOrder po=MyJsonUtil.str2obj(rec, ProcurementOrder.class);
			//成品类采购合同，订单导入编辑后，保存合同，
			//将包装描述明细中的箱只数信息同步更新订单号对应的订单明细（计划类别为成品外购）中的箱只数。
			String s_cglb=po.getCglb();
			if(s_cglb==null){
				s_cglb="";
			}else{
				s_cglb=s_cglb.trim();
			}
			List<PurchaseOrderDetail> prdList=mapper.getPurchaseOrderDetailListForEdt(params);
			for(PurchaseOrderDetail pod:prdList){
				int ll_ddbh=pod.getDdbh();
				int ll_ddxh=pod.getDdxh();
				double ll_dhxs=0,ldb_mxjz=0,ldb_mxmz=0;
				double ll_mxzs=pod.getMxzs();
				if(ll_ddbh!=0&&ll_ddxh!=0){
					params.put("ddbh", ll_ddbh);
					params.put("ddxh", ll_ddxh);
					List<SalesOrder> so=mapper.getSalesOrderList(params);
					double ldb_dhsl=0,ldb_cpjz=0,ldb_zxjz=0;
					String ls_jhlb="";
					if(so.size()>0){
						ldb_dhsl=so.get(0).getDhsl();
						ldb_cpjz=so.get(0).getCpjz();
						ldb_zxjz=so.get(0).getZxjz();
						ls_jhlb=so.get(0).getJhlb();
					}
					//计划类别为成品外购的订单明细
					if(ls_jhlb==null){
						ls_jhlb="";
					}
					if(!ls_jhlb.equals("")&&ls_jhlb.equals("55")){
						if(ll_mxzs!=0){
							ll_dhxs=Math.ceil(ldb_dhsl/ll_mxzs);
						}else{
							ll_dhxs=0;
						}
						ldb_mxjz = ldb_cpjz * ll_mxzs;
						ldb_mxmz = ldb_cpjz * ll_mxzs + ldb_zxjz;
						String sql = "  update ddmxb set mxzs='"+ll_mxzs+"',dhxs='"+ll_dhxs+"',mxjz='"+ldb_mxjz+"',mxmz='"+ldb_mxmz+"'  "; 
						sql+="  where ddbh='"+ll_ddbh+"' and ddxh='"+ll_ddxh+"' ";
						params.put("sql", sql);
						String s_cfbjstr = purchaseDetailMapper.getStringFromSql(params);
					}
				}
			}
		return json.toString();
	}
	/**
	 * 保存前验证
	 * Request purchaseorder/purchaseorderdetail.act?method=getBeforSave <br/><br/>
	 * @author wq
	 * @date 2016-04-09
	 */
	public String getBeforSave(Map<String,Object> params) throws Exception{
		JSONObject json=new JSONObject();
		json.put("bool", true);
		String prompt= ""; 
			String rec=params.get("rec").toString();
			ProcurementOrder po=MyJsonUtil.str2obj(rec, ProcurementOrder.class);
			params.put("htbh",po.getHtbh());
			//增加判断有领用材料数据，合同类型必须是外协！
			String sql = "select count(1) from cghtwxlltzdb_tmp  ";
			sql+="	where htbh='"+po.getHtbh()+"' and ";
			sql+="	login_id='"+params.get("login_id").toString()+"' and ip='"+params.get("ip").toString()+"' ";
			params.put("sql", sql);
			String countStr=purchaseDetailMapper.getStringFromSql(params);
			int countOn=0;
			if(countStr!=null){
				countOn=Integer.parseInt(countStr);
			}
			if(countOn>0){
				if(!"外协".equals(po.getCglx())){
					json.put("msg", "有领用材料数据，合同类型必须是外协！");
					json.put("bool", false);
					return json.toString();
				}
			}
			//增加判断合同类型为非特殊时cgjhmxb。jhrq与 htmxb。jhrq 一致不一致，不一致保存不成功
			//1959 1.采购合同保存时，检测修改，采购计划与采购合同交货日期 应一致，时间取到年月日进行对比(select CONVERT(varchar(12) , getdate(), 102 ))
			if(po.getCglx()!=null&&po.getCglx().trim().equals("常规")){
				String sql1=" select COUNT(1) from htmxb_tmp ";
				sql1+="	where htbh='"+po.getHtbh()+"' and ";
				sql1+="	login_id='"+params.get("login_id").toString()+"' and ip='"+params.get("ip").toString()+"' ";
				sql1+="	and exists ( ";
				sql1+="		select 1 from cgjhmxb where cgjhmxb.cgbh=htmxb_tmp.cgbh and cgjhmxb.cgxh=htmxb_tmp.cgxh ";
				sql1+=" and CONVERT(varchar(12) , htmxb_tmp.jhrq, 102 )<>CONVERT(varchar(12) , cgjhmxb.jhrq, 102 )  ";
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
			List<PurchaseOrderDetail> prdCheckList=mapper.getPurchaseOrderDetailListForCheck(params);
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
			List<PurchaseOrderDetail> prdList=mapper.getPurchaseOrderDetailListForEdt(params);
			sql="";
			String s_htgz=po.getHtgz()==null?"":po.getHtgz().trim();
			String s_qzgz=po.getQzgz()==null?"":po.getQzgz().trim();
			String ls_row_kj="",m_wbbh;
			Map<String,List<PurchaseOrderDetail>> groupByClhhCltx1=new HashMap<String, List<PurchaseOrderDetail>>();
			params.put("sql","  select wbbh from csxxb where csbh = '"+po.getCsbh()+"' ");
			m_wbbh=purchaseDetailMapper.getStringFromSql(params);
			if(m_wbbh==null){
				m_wbbh="";
			}else{
				m_wbbh=m_wbbh.trim();
			}
			for (PurchaseOrderDetail cd:prdList) {
				//增加管控如果没有交货日期 ，直接提示，哪条记录没有交期
				if(cd.getJhrq()==null){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细交货日期为空，不允许保存！");
					json.put("bool", false);
					return json.toString();
				}
				//如果专利标记 打上专利单价不能为空
				if(po.getZlbj()==1){
					if(cd.getZldj()==0){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细专利单价为0，不允许保存！");
						json.put("bool", false);
						return json.toString();
					}
				}
				// 检测材料对应元整位数，小数位数大于元整位数的，不允许保存
				// 取采购数量中“.”字符位置
				String ls_cgsl_jc="";
				String ls_clhh_jc="";
				String s_clhh="";
				int ll_zdcd=0,ll_zfwz=0,ll_xsws=0,ls_cpbj=0,ls_cfbj=0;
				double ldb_cgsl_jc=0;
				ls_clhh_jc = cd.getClhh();
				s_clhh=cd.getClhh();
				ldb_cgsl_jc = cd.getCgsl();
				ls_cgsl_jc = ldb_cgsl_jc + "";
				ll_zdcd = ls_cgsl_jc.length();//长度
				ll_zfwz = ls_cgsl_jc.indexOf(".");//字符位置
				String s_cglb=po.getCglb();
				sql = "  select cfbj  from cglbb where lbbh='"+ s_cglb + "' ";
				params.put("sql", sql);
				String s_cfbjstr = purchaseDetailMapper.getStringFromSql(params);
				ls_cfbj=Integer.parseInt(s_cfbjstr);
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
				
				//判断是够重复
				if(ls_cfbj>0){
					int ls_bzclbj=0;
					sql = "  select bzclbj  from cglbb where lbbh='"+ s_cglb + "' ";
					params.put("sql", sql);
					String bzclbjStr = purchaseDetailMapper.getStringFromSql(params);
					ls_bzclbj=Integer.parseInt(bzclbjStr);
					sql = "  select COUNT(1) from htmxb_tmp where htbh ='"+cd.getHtbh()+"' and htxh ='"+cd.getHtxh()+"' and login_id='"+cd.getLogin_id()+"' and ip='"+cd.getIp()+"' ";
					params.put("sql", sql);
					countStr = purchaseDetailMapper.getStringFromSql(params);
					int count=Integer.parseInt(countStr);
					if(ls_bzclbj>0){
						if(count>1){
							prompt+=" 采计号 "+cd.getCgh()+" 在该合同中已经存在,请检查是否重复采购! <br/>";
						}
					}else{
						if(count>1){
							json.put("msg", " 采计号 "+cd.getCgh()+" 在该合同中已经存在,请检查是否重复采购! <br/>");
							json.put("bool", false);
							return json.toString();
						}
					}
				}
				
				
				//核算部门检测
				String ls_jhlb,ls_hsbm,s_cltx1,ls_clhh,ls_cltx1;
				long ll_cgbh,ll_jhbh,ls_htxh,ls_ddbh,ls_ddxh;
				double ls_cgdj,ls_wbdj,ls_mxzs,s_cgdj,s_fzsl_sj,s_zhxs,ls_cjsl_kz;
				s_cgdj=cd.getCgdj();
				ll_cgbh=cd.getCgbh();
				ll_jhbh=cd.getJhbh();
				ls_hsbm=cd.getHsbm();
				ls_mxzs=cd.getMxzs();
				ls_ddbh=cd.getDdbh();
				ls_ddxh=cd.getDdxh();
				ls_cltx1=cd.getCltx1();
				ls_cfbj=cd.getCfbj();
				sql = "select cpbj from cglbb where lbbh='"+s_cglb+"'";
				params.put("sql", sql);
				String s_cpbj = purchaseDetailMapper.getStringFromSql(params);
				if(s_cpbj==null){
					s_cpbj="0";
				}
				ls_cpbj = Integer.parseInt(s_cpbj);
				if(ls_cpbj==1){
					if(ls_mxzs==0){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细对应包装信息界面的箱只数为0!");
						json.put("bool", false);
						return json.toString();
					}
					/*if(ls_mxzs!=0&&ls_cltx1.trim().equals("")){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细对应包装信息界面有箱只数，规格尺寸不能为空!");
						json.put("bool", false);
						return json.toString();
					}*/
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
				
				if(cd.getClhh()==null||cd.getClhh().equals("")){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细材料名称不能为空!");
					json.put("bool", false);
					return json.toString();
				}
				if(!m_wbbh.equals("")&&cd.getWbbh().trim().equals("")){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的外币编号为空，请重新选择供应商!");
					json.put("bool", false);
					return json.toString();
				}
				if("".equals(s_clhh.trim())){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细材料名称不存在!");
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
				if((!cd.getWbbh().trim().equals(""))&&cd.getWbhl()<=0){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细外币汇率不能小于等于0!");
					json.put("bool", false);
					return json.toString();
				}
				if((!cd.getWbbh().trim().equals("")) && ((cd.getWbdj()!=0&&cd.getCgdj()==0)||(cd.getWbdj()==0&&cd.getCgdj()!=0))){
					json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细外币单价和本币单价计算关系有异常，不允许保存!");
					json.put("bool", false);
					return json.toString();
				}
				
				if((!cd.getWbbh().trim().equals("")) && Math.abs(DoubleCal.round(cd.getCgdj(),4) - DoubleCal.round(cd.getWbdj()*cd.getWbhl(),4))>0.01){
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
				
				params.put("csbh", po.getCsbh());
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
						ls_row_kj=ls_row_kj+','+cd.getHtxh();
					}
				}else{
					if(cd.getKzdj()!=fzdj){
						ls_row_kj=ls_row_kj+','+cd.getHtxh();
					}
				}
				//判断采计号在该合同中的采购数量总数 是否大于采计号的采计数量
				sql = "  select lbbh  from clbmb where clhh='"+cd.getClhh()+"' ";
				params.put("sql", sql);
				String ls_cllb = purchaseDetailMapper.getStringFromSql(params);
				if(ls_cllb==null){
					ls_cllb="";
				}
				int ll_jhxh=cd.getJhxh();
				int s_cgbh=cd.getCgbh();
				int s_cgxh=cd.getCgxh();
				if(s_cgxh!=0&&s_cgbh!=0){
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
					for(PurchaseOrderDetail cd2:prdList){
						if(cd.getCgbh()==cd2.getCgbh()&&cd.getCgxh()==cd2.getCgxh()){
							ls_cgsl1+=cd2.getYcgl();
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
					params.put("csbh", po.getCsbh());
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
					//判断采计号的采购数量是否大于采计数量
					Double ls_cgsl_count=DoubleCal.round(DoubleCal.round(ls_cgsl1,6)+DoubleCal.round(ls_cgsl2, 6),3);
					if ((ls_cgsl_count>DoubleCal.round(ls_cjsl_kz, 3))){
						json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细采计号【"+cd.getCgbh()+"-"+cd.getCgxh()+"】的采购数量大于采计数量*(1+超购比率："+ls_cgbl*100+"%)!");
						json.put("bool", false);
						return json.toString();
					}
				}
				String ls_sgbh=cd.getSgbh();
				if(ll_jhbh!=0 && ll_jhxh!=0 && s_cgbh==0 && ls_sgbh.equals("")){
					sql = "  select cpbh  from cpbmb where bcpbh='"+s_clhh+"';";
					params.put("sql", sql);
					String ls_cpbh = purchaseDetailMapper.getStringFromSql(params);
					sql = "  select count(*)  from jhmxb with (nolock) where jhbh='"+ll_jhbh+"' and jhxh='"+ll_jhxh+"' and cpbh='"+ls_cpbh+"';";
					params.put("sql", sql);
					String countStr1 = purchaseDetailMapper.getStringFromSql(params);
					if(countStr1==null){
						countStr1="0";
					}
					int count1=Integer.parseInt(countStr1);
					if(count1>0){
						sql = "  select cgbl  from cllbb where lbbh='"+ls_cllb+"' ";
						params.put("sql", sql);
						String ls_cgblStr = purchaseDetailMapper.getStringFromSql(params);
						if(ls_cgblStr==null){
							ls_cgblStr="0";
						}
						double ls_cgbl=Double.parseDouble(ls_cgblStr);
						//该采计号下已存在合同中的采购数量总数
						sql = "  select SUM(ycgl)  from htmxb where jhbh="+cd.getJhbh()+" and jhxh="+cd.getJhxh()+" and htbh<>"+cd.getHtbh()+" group by jhbh,jhxh order by jhbh,jhxh ";
						params.put("sql", sql);
						String ycgl = purchaseDetailMapper.getStringFromSql(params);
						if(ycgl==null){
							ycgl="0";
						}
						double ls_cgsl2=Double.parseDouble(ycgl);
						double ls_cgsl1=0;
						//计算本合同中该采购号计划数量
						for(PurchaseOrderDetail cd2:prdList){
							if(cd.getJhbh()==cd2.getJhbh()&&cd.getJhxh()==cd2.getJhxh()){
								ls_cgsl1+=cd2.getYcgl();
							}
						}
						//采计号下采计数量
						sql = "  select jhsl  from jhmxb where jhbh='"+cd.getJhbh()+"' and jhxh= '"+cd.getJhxh()+"' and cpbh='"+ls_cpbh+"' ";
						params.put("sql", sql);
						String cgsl = purchaseDetailMapper.getStringFromSql(params);
						if(cgsl==null){
							cgsl="0";
						}
						double ls_cgsl3=Double.parseDouble(cgsl);
						params.put("csbh", po.getCsbh());
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
						//判断采计号的采购数量是否大于采计数量
						Double ls_cgsl_count=DoubleCal.round(DoubleCal.round(ls_cgsl1,6)+DoubleCal.round(ls_cgsl2, 6),3);
						if (ls_cgsl_count>DoubleCal.round(ls_cjsl_kz, 3)){
							json.put("msg", "合同序号为【" + cd.getHtxh()+ "】的明细计划号【"+cd.getJhbh()+"-"+cd.getJhxh()+"】的采购数量大于计划数量*(1+超购比率："+ls_cgbl*100+"%)!");
							json.put("bool", false);
							return json.toString();
						}
					}
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
				//赋值计划类别
				int s_jhbh=cd.getJhbh();
				String s_jhlb="";
				if(s_cgbh!=0&&s_cgxh!=0){
					sql = "  select jhlb  from cgjhb where cgbh='"+s_cgbh+"'";
					params.put("sql", sql);
					s_jhlb = purchaseDetailMapper.getStringFromSql(params);
					if(s_jhlb==null){
						s_jhlb="";
					}
				}
				if(s_jhlb.equals("")){
					sql = "  select jhlb  from scjhb where jhbh='"+s_jhbh+"'";
					params.put("sql", sql);
					s_jhlb = purchaseDetailMapper.getStringFromSql(params);
					if(s_jhlb==null){
						s_jhlb="";
					}
				}
				if(s_jhlb.equals("")){
					sql = "  select top 1 jhlb  from jhmx_ddxxb where ddbh='"+cd.getDdbh()+"' and ddxh='"+cd.getDdxh()+"'	";
					params.put("sql", sql);
					s_jhlb = purchaseDetailMapper.getStringFromSql(params);
					if(s_jhlb==null){
						s_jhlb="";
					}
				}
				cd.setJhlb(s_jhlb);
				mapper.updatePurchaseOrderDetail(cd);
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
				    		params.put("csbh", po.getCsbh());
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
								if(s_zhxs!=0){
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
								mapper.updatePurchaseOrderDetail(cdd6);
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
				    		params.put("csbh", po.getCsbh());
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
								if(s_zhxs!=0){
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
								mapper.updatePurchaseOrderDetail(cdd6);
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
									mapper.updatePurchaseOrderDetail(cdd6);
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
									mapper.updatePurchaseOrderDetail(cdd6);
								}
					    	}
					    }
				    }
				}
			}
			
			
			/*if(!ls_row_kj.equals("")){
				prompt+="/n合同序号为"+ls_row_kj+"的记录的控制单价与材料采购价格维护中的控价不一致！";
			}
			json.put("show", prompt);*/
		return json.toString();
	}
	/**
	 * 合同明细导入临时表
	 * Request purchaseorder/purchaseorderdetail.act?method=addPurchaseOrderDetailToCacheTable <br/><br/>
	 * @author wq
	 * @date 2016-04-08
	 */
	public String addPurchaseOrderDetailToCacheTable(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			UserInfo user=(UserInfo)SessionUtil.getCurrentUser();
			String clogin_id=user.getLogin_id();
			String login_id=params.get("login_id").toString();
			if(!clogin_id.equals(login_id)){
				json.put("bool", false);
				json.put("msg", "当前用户验证失效，请刷新页面！");
				return json.toString();
			}
			mapper.addPurchaseOrderDetailToCacheTable(params);
			int err=(Integer) params.get("statement");
			if(err==1){
				json.put("bool", false);
				json.put("msg", "合同明细导入临时表时失败，请重试！");
			}
		return json.toString();
	}
	/**
	* @Description: 构件清单
	* Request purchaseorder/purchaseorderdetail.act?method=getComponentList
	* Response {data:[{List<Component>}]} <br/><br/>
	*/
	public List<Component> getComponentList(Map<String,Object> params) {
		return mapper.getComponentList(params);
	}
	/**
	* @Description: 钢架计价编辑界面
	* 
	* Request purchaseorder/purchaseorderdetail.act?method=getPurBomForEdtList
	* Response {data:[{List<PurBom>}]} <br/><br/>
	*/
	public List<PurBom> getPurBomForEdtList(Map<String,Object> params) {
		return mapper.getPurBomForEdtList(params);
	}
	/**
	* @Description: 钢架计价CURD
	* 
	* Request purchaseorder/purchaseorderdetail.act?method=getPurBomList
	* Response {data:[{List<PurBom>}]} <br/><br/>
	*/
	public List<PurBom> getPurBomList(Map<String,Object> params) {
		return mapper.getPurBomList(params);
	}
	public void addPurBom(PurBom[] arr) {
		for(PurBom obj: arr) {
			mapper.addPurBom(obj);
		}
	}
	public void updatePurBom(PurBom[] arr) {
		for(PurBom obj: arr) {
			mapper.updatePurBom(obj);
		}
	}
	public void deletePurBom(PurBom[] arr) {
		for(PurBom obj: arr) {
			mapper.deletePurBom(obj);
		}
	}
	/**
	* @Description: 采购更改明细
	* Request purchaseorder/purchaseorderdetail.act?method=getPurchaseChangeList
	* Response {data:[{List<PurchaseChange>}]} <br/><br/>
	*/
	public List<PurchaseChange> getPurchaseChangeList(Map<String,Object> params) {
		return mapper.getPurchaseChangeList(params);
	}
	/**
	* @Description: 采购辅助
	* Request purchaseorder/purchaseorderdetail.act?method=getOrderSubsidiaryList
	* Response {data:[{List<OrderSubsidiary>}]} <br/><br/>
	*/
	public List<OrderSubsidiary> getOrderSubsidiaryList(Map<String,Object> params) {
		return mapper.getOrderSubsidiaryList(params);
	}
	/**
	* @Description: 采购辅助编辑界面
	* Request purchaseorder/purchaseorderdetail.act?method=getOrderSubsidiaryForEdtList
	* Response {data:[{List<OrderSubsidiary>}]} <br/><br/>
	*/
	public List<OrderSubsidiary> getOrderSubsidiaryForEdtList(Map<String,Object> params) {
		return mapper.getOrderSubsidiaryForEdtList(params);
	}
	public void addOrderSubsidiary(OrderSubsidiary[] arr) {
		for(OrderSubsidiary obj: arr) {
			mapper.addPurPanelSubsidiary(obj);
		}
	}
	public void updateOrderSubsidiary(OrderSubsidiary[] arr) {
		for(OrderSubsidiary obj: arr) {
			mapper.updateOrderSubsidiary(obj);
		}
	}
	public void deleteOrderSubsidiary(OrderSubsidiary[] arr) {
		for(OrderSubsidiary obj: arr) {
			mapper.deleteOrderSubsidiary(obj);
		}
	}
	/**
	* @Description: 产品描述
	* Request purchaseorder/purchaseorderdetail.act?method=getOrderDescribeList
	* Response {data:[{List<OrderDescribe>}]} <br/><br/>
	*/
	public List<OrderDescribe> getOrderDescribeList(Map<String,Object> params) {
		return mapper.getOrderDescribeList(params);
	}
	/**
	* @Description: 采购订单明细汇总信息
	* Request purchaseorder/purchaseorderdetail.act?method=getDetailSummarizeList
	* Response {data:[{List<DetailSummarize>}]} <br/><br/>
	*/
	public List<DetailSummarize> getDetailSummarizeList(Map<String,Object> params) {
		return mapper.getDetailSummarizeList(params);
	}
	
	/**
	* @Description: 采购订单明细编辑时获取字段和显示不同
	* Request purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailListForEdt
	* Response {data:[{List<PurchaseOrderDetail>}]} <br/><br/>
	*/
	public List<PurchaseOrderDetail> getPurchaseOrderDetailListForEdt(Map<String,Object> params) {
		List<PurchaseOrderDetail> prd = mapper.getPurchaseOrderDetailListForEdt(params);
		return prd;
	}
	/**
	* @Description: 采购订单明细CURD
	* Request purchaseorder/purchaseorderdetail.act?method=*****
	* Response {data:[{List<PurchaseOrderDetail>}]} <br/><br/>
	*/
	public List<PurchaseOrderDetail> getPurchaseOrderDetailList(Map<String,Object> params) {
		List<PurchaseOrderDetail> prd = mapper.getPurchaseOrderDetailList(params);
		return prd;
	}
	public void addPurchaseOrderDetail(PurchaseOrderDetail[] arr) {
		for(PurchaseOrderDetail obj: arr) {
			mapper.addPurchaseOrderDetail(obj);
		}
	}
	public void updatePurchaseOrderDetail(PurchaseOrderDetail[] arr) {
		for(PurchaseOrderDetail obj: arr) {
			mapper.updatePurchaseOrderDetail(obj);
		}
	}
	public void deletePurchaseOrderDetail(PurchaseOrderDetail[] arr) {
		for(PurchaseOrderDetail obj: arr) {
			mapper.deletePurchaseOrderDetail(obj);
		}
	}
	/**
	 * 获取明细合计信息
	 * Request purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailSum  <br/><br/>
	 * @author wq
	 * @date 2016-03-28
	 */
	public List<PurchaseOrderDetail> getPurchaseOrderDetailSum(Map<String,Object> params) {
		List<PurchaseOrderDetail> pod=mapper.getPurchaseOrderDetailSum(params);
		if(pod.size()>0&&pod.get(0)!=null){
			return pod;
		}else{
			pod=new ArrayList<PurchaseOrderDetail>();
			return pod;
		}
	}
	/**
	 * 根据csbh刷新同一个合同的所有明细数据
	 * Request purchaseorder/purchaseorderdetail.act?method=getUpdatePurchaseOrderDetailFromCsbh  <br/><br/>
	 * @author wq
	 * @date 2016-03-29
	 */
	public String getUpdatePurchaseOrderDetailFromCsbh(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
				String htbh=params.get("htbh").toString();
				String csbh=params.get("csbh").toString();
				List<PurchaseOrderDetail> prdList=mapper.getPurchaseOrderDetailListForEdt(params);
				params.put("sql","  select wbbh from csxxb where csbh = '"+csbh+"' ");
				String s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				double cgdj=0,fzkj=0,kzdj=0,ghzq=0;
				FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
				int count=0;
				for(PurchaseOrderDetail p:prdList){
					int s_kjlx=p.getKjlx();
					if(!s_wbbh.equals("")){
						p.setWbbh(s_wbbh);
						p.setZzsl(0);
						double s_wbdj=p.getWbdj();
						String sql="  select top 1 wbdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
						sql+="where cghtb.csbh='"+csbh+"' and htmxb.clhh= '"+p.getClhh()+"'";
						sql+="and htmxb.wbdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>"+htbh+" order by cghtb.czsj desc ";
						params.put("sql",sql);
						String f_cgdjStr=purchaseDetailMapper.getStringFromSql(params);
						if(f_cgdjStr==null){
							f_cgdjStr="0";
						}
						double f_cgdj=Double.parseDouble(f_cgdjStr);
						
						params.put("csbh", csbh);
						params.put("clhh", p.getClhh());
						params.put("cgsl", 0);
						params.put("wbbh", "");
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
							cgdj=fpc.getCgdj();
							fzkj=fpc.getFzkj();
							kzdj=fpc.getKzdj();
							ghzq=fpc.getGhzq();
						}
						if(f_cgdj==0){
							if(s_kjlx!=1){
								p.setCgdj(cgdj);
							}else{
								p.setCgdj(fzkj);
							}
						}else{
							p.setCgdj(f_cgdj);
						}
					}else{
						double s_wbdj=p.getWbdj();
						double f_cgdj=0;
						String sql="  select top 1 cgdj  from htmxb with (nolock) left outer join cghtb with (nolock) on cghtb.htbh=htmxb.htbh ";
						sql+="where cghtb.csbh='"+csbh+"' and htmxb.clhh= '"+p.getClhh()+"'";
						sql+="and htmxb.cgdj>0 and kjlx="+s_kjlx+" and htmxb.htbh<>"+p.getHtbh()+" order by cghtb.czsj desc ";
						params.put("sql",sql);
						String f_cgdjStr=purchaseDetailMapper.getStringFromSql(params);
						if(f_cgdjStr==null){
							f_cgdjStr="0";
						}
						f_cgdj=Double.parseDouble(f_cgdjStr);
						
						params.put("csbh", csbh);
						params.put("clhh", p.getClhh());
						params.put("cgsl", 0);
						params.put("wbbh", "");
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
							cgdj=fpc.getCgdj();
							fzkj=fpc.getFzkj();
							kzdj=fpc.getKzdj();
							ghzq=fpc.getGhzq();
						}
						if(f_cgdj==0){
							if(s_kjlx!=1){
								p.setCgdj(cgdj);
							}else{
								p.setCgdj(fzkj);
							}
						}else{
							p.setCgdj(f_cgdj);
						}
					}
					
					if(s_kjlx!=1){
						p.setKzdj(kzdj);
					}else{
						p.setKzdj(fzkj);
					}
					Date s_jhrq=p.getJhrq();
					if(ghzq!=0){
						Calendar rightNow = Calendar.getInstance();
						if(s_jhrq!=null){
							rightNow.setTime(s_jhrq);
							rightNow.add(Calendar.DAY_OF_YEAR,-(int)ghzq);
							p.setCgrq(rightNow.getTime());
						}
					}
					double s_cgsl=0,s_fzsl=0,s_cgdj=0,s_wbdj=0,s_wbje=0,s_cgje=0;
					s_cgsl=p.getCgsl();
					s_fzsl=p.getFzsl();
					s_cgdj=p.getCgdj();
					s_wbdj=p.getWbdj();
					Date s_cgrq=p.getCgrq();
					if(!s_wbbh.equals("")){
						int f_nf=0;
						int f_yf=0;
						if(s_cgrq==null){
							s_cgrq=new Date();
						}
						if(s_cgrq!=null){
							f_nf=s_cgrq.getYear()+1900;
							f_yf=s_cgrq.getMonth()+1;
						}
						String sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
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
						p.setWbbh(s_wbbh);
						p.setWbhl(wbhl);
						p.setCgdj(s_cgdj);
						p.setWbdj(s_wbdj);
						p.setWbje(s_wbje);
					}else{
						if(s_kjlx!=1){
							s_cgje=DoubleCal.round(s_cgdj*s_cgsl, 2);
						}else{
							s_cgje=DoubleCal.round(s_cgdj*s_fzsl, 2);
						}
						p.setWbbh("");
						p.setWbhl(0);
						p.setCgdj(s_cgdj);
						p.setCgje(s_cgje);
						p.setWbdj(0);
						p.setWbje(0);
					}
					mapper.updatePurchaseOrderDetail(p);
				}
		return json.toString();
	}
	/**
	 * 采计导入转换
	 * Request purchaseorder/purchaseorderdetail.act?method=getPurPanelTransform  <br/><br/>
	 * @author wq
	 * @date 2016-03-29
	 */
	public String getPurPanelTransform(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
				String recstr=params.get("recstr").toString();
				String login_id=params.get("login_id").toString();
				String ip=params.get("ip").toString();
				int s_num=0;
				String s_ysgg="",s_cltx1="",s_cgbz = "",s_jhbz,ls_cgym,s_csbh,s_sdck,s_fzdw,s_htbz,s_bzsm,s_khbh,s_cpbh,s_sqh,s_csbh_xz = "",s_jhbz_xz = "";
				int s_cgbh=0,s_cgxh,s_sqbh,s_sqxh,s_rec=1,s_wxbj=0,s_htbh=0,s_htxh=0;
				int s_ddbh=0;
				int s_ddxh=0;
				double s_cgsl=0,s_cgdj=0,s_kzdj=0,s_ghzq=0;
				Date s_jhrq,s_cgrq,ls_psjq = null;
				s_htbh=Integer.parseInt(params.get("htbh").toString());
				s_csbh=params.get("csbh").toString();
				if(s_csbh==null){
					s_csbh="";
				}else{
					s_csbh=s_csbh.trim();
				}
				s_csbh_xz=s_csbh;
				List<PurPanelImp> ppiList=MyJsonUtil.str2list(recstr, PurPanelImp.class);
				FunctionPurchaseCtl fpc=new FunctionPurchaseCtl();
				List<PurPanelImp> cgjhxmb=new ArrayList<PurPanelImp>();
				for(PurPanelImp ppi :ppiList){
					PurchaseOrderDetail pod=new PurchaseOrderDetail();
					String csbh=ppi.getCsbh();
					s_cgbh=ppi.getCgbh();
					s_cgxh=ppi.getCgxh();
					s_cgsl=ppi.getWzsl();
					s_jhbz=ppi.getJhbz();
					s_wxbj=ppi.getWxbj();
					s_ysgg=ppi.getYsgg();
					s_num+=1;
					if(csbh==null){
						csbh="";
					}else{
						csbh=csbh.trim();
					}
					if(s_csbh==null){
						s_csbh="";
					}
					if(!csbh.equals("")){
						if(s_rec==1){
							s_csbh_xz=csbh;
						}else{
							if(!s_csbh_xz.equals(csbh)){
								json.put("bool", false);
								json.put("msg", "所选记录的厂商名称不一致，不能生成采购合同!");
								return json.toString();
							}
						}
						s_rec+=1;
					}
					if(s_num==1){
						s_jhbz_xz=s_jhbz;
						s_cgbz=s_jhbz;
					}else{
						if(!s_jhbz_xz.equals(s_jhbz)){
							s_jhbz_xz=s_jhbz;
							s_cgbz+="  "+s_jhbz;
						}
					}
					params.put("sql","  select wbbh from csxxb where csbh = '"+s_csbh_xz+"' ");
					String s_wbbh=purchaseDetailMapper.getStringFromSql(params);
					if(s_wbbh==null){
						s_wbbh="";
					}else{
						s_wbbh=s_wbbh.trim();
					}
					if(!s_wbbh.equals("")){
						params.put("csbh", s_csbh);
						params.put("clhh", ppi.getClhh());
						params.put("cgsl", 0);
						params.put("wbbh", s_wbbh);
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
							s_cgdj=fpc.getKzdj();
							s_kzdj=fpc.getCgdj();
						}
					}else{
						params.put("csbh", s_csbh);
						params.put("clhh", ppi.getClhh());
						params.put("cgsl", 0);
						params.put("wbbh", "");
						List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
						if(fpcList.size()>0){
							fpc=fpcList.get(0);
							s_cgdj=fpc.getKzdj();
							s_kzdj=fpc.getCgdj();
						}
					}
					s_ghzq=ppi.getGhzq();
					s_jhrq = ppi.getJhrq();
					s_cgrq= ppi.getCgrq();
					s_sdck=ppi.getSdck();
					s_fzdw=ppi.getFzdw();
					s_htbz=ppi.getHyhm();
					s_bzsm=ppi.getBzsm();
					s_khbh=ppi.getKhbh();
					s_cpbh=ppi.getCpbh();
					s_sqbh=ppi.getSqbh();
					s_sqxh=ppi.getSqxh();
					s_sqh=ppi.getSqh();
					s_cltx1=ppi.getCltx1();
					params.put("jhbh",ppi.getJhbh());
					params.put("jhxh", ppi.getJhxh());
					List<PlanDetail> pdList= purchaseDetailMapper.getPlanDetailForDdhList(params);
					PlanDetail pd=new PlanDetail();
					float zjbh=0;
					float zjxh=0;
					if(pdList.size()>0){
						pd=pdList.get(0);
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
						s_ddbh=ppi.getDdbh();
						s_ddxh=ppi.getDdxh();
					}
					long	ls_count,ls_count_cur = 0;
					long	f_cfbh,f_cfxh;
					String  f_fach,f_ywms,f_pono,f_xmsjbc,f_khxh,ls_khxh,ls_fach,ls_pono="",ls_ywms="";
					double	f_cfxs=0,f_cgsl,s_bbdj=0;
					double	ls_ycsl=0,ls_cjsl=0,s_zhxs=0,s_fzsl=0;
					//写入合同明细
					if(s_wxbj==1){
						params.put("ddbh", s_ddbh);
						params.put("ddxh", s_ddxh);
						List<SplitDetailForPur> sdfpList=mapper.getSplitDetailForPurList(params);
						for(SplitDetailForPur sdfp:sdfpList){
							ls_count_cur++;
							ls_ycsl=0;
							params.put("sql","  select sum(cgsl)  from htmxb where cfbh="+sdfp.getCfbh()+" and cfxh="+sdfp.getCfxh()+" ");
							String ls_ycslStr=purchaseDetailMapper.getStringFromSql(params);
							ls_ycsl =Double.parseDouble(ls_ycslStr);
							ls_cjsl=0;
							for(PurPanelImp cgjh:cgjhxmb){
								if(cgjh.getCgbh()==s_cgbh&&cgjh.getCgxh()==s_cgxh){
									ls_cjsl+=cgjh.getCgsl();
								}
							}
							if(f_cfxs-ls_ycsl>0){
								if(ls_count_cur!=sdfpList.size()){
									f_cgsl=f_cfxs - ls_ycsl;
								}else{
									f_cgsl=s_cgsl - ls_cjsl;
								}
								PurPanelImp lppi=new PurPanelImp();
								lppi.setCgbh(s_cgbh);
								lppi.setCgxh(s_cgxh);
								lppi.setCgsl(f_cgsl);
								cgjhxmb.add(lppi);
								params.put("clhh", ppi.getClhh());
								params.put("cltx1",ppi.getCltx1());
								s_zhxs=purchaseDetailMapper.getConversion(params);
								if(s_zhxs>0){
									s_fzsl=DoubleCal.round(f_cgsl*s_zhxs, 3,BigDecimal.ROUND_HALF_UP);
								}else{
									s_fzsl=0;
								}
								PurchaseOrderDetail newpod =new PurchaseOrderDetail();
								newpod.setHtbh(s_htbh);
								params.put("login_id", login_id);
								params.put("ip", ip);
								params.put("htbh",s_htbh);
								List<PurchaseOrderDetail> lastList =mapper.getPurchaseOrderDetailLast(params);
								if(lastList.size()>0){
									PurchaseOrderDetail last=lastList.get(0);
									newpod.setHtxh(last.getHtxh()+1);
									s_htxh=last.getHtxh()+1;
									newpod.setCgrq(last.getCgrq());
									newpod.setWbbh(last.getWbbh());
									newpod.setWbhl(last.getWbhl());
									//加入外币判断
									if(!s_wbbh.equals("")){
										newpod.setZzsl(0);
									}else{
										newpod.setZzsl(last.getZzsl());
									}
									newpod.setPxxh(last.getPxxh()+5);
								}else{
									newpod.setHtxh(1);
									s_htxh=1;
									newpod.setPxxh(5);
									newpod.setCgrq(new Date());
									newpod.setWbbh(s_wbbh);
									if(!s_wbbh.equals("")){
										if(s_cgrq==null){
											s_cgrq=new Date();
										}
										int f_nf=s_cgrq.getYear()+1900;
										int f_yf=s_cgrq.getMonth()+1;
										String sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
										params.put("sql",sql);
										String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
										if(wbhlStr==null){
											wbhlStr="0";
										}
										double wbhl=Double.parseDouble(wbhlStr);
										newpod.setWbhl(wbhl);
									}else{
										newpod.setWbhl(0);
									}
									//加入外币判断
									if(!s_wbbh.equals("")){
										newpod.setZzsl(0);
									}else{
										newpod.setZzsl(0.17);
									}
								}
								newpod.setCgbh(s_cgbh);
								newpod.setCgxh(s_cgxh);
								newpod.setCgh(ppi.getCgh());
								newpod.setCjsl(ppi.getCgsl());
								newpod.setJhbh(ppi.getJhbh());
								newpod.setJhxh(ppi.getJhxh());
								newpod.setJhh(ppi.getJhbh()+"-"+ppi.getJhxh());
								newpod.setDdh(ppi.getDdh());
								newpod.setDdbh(s_ddbh);
								newpod.setDdxh(s_ddbh);
								newpod.setWkjq(ppi.getWkjq());
								ls_khxh="";
								ls_fach="";
								params.clear();
								params.put("ddbh",ppi.getDdbh());
								params.put("ddxh", ppi.getDdxh());
								List<PanelDetailAndOrder> pdadList=purchaseDetailMapper.getPanelDetailAndOrderList(params);
								if(pdadList.size()>0){
									ls_khxh=pdadList.get(0).getKhxh();
									ls_fach=pdadList.get(0).getFach();
									ls_psjq=pdadList.get(0).getPsjq();
								}
								newpod.setCfbh(sdfp.getCfbh());
								newpod.setCgxh(sdfp.getCfxh());
								newpod.setFach(sdfp.getFach());
								newpod.setKhxh(sdfp.getKhxh());
								newpod.setYwms(sdfp.getYwms());
								newpod.setPono(sdfp.getPono());
								newpod.setXmsjbc(sdfp.getXmsjbc());
								newpod.setCjjhrq(ppi.getJhrq());
								//半成品计划
								if(pd.getZjbh()!=0&&pd.getZjxh()!=0){
									params.clear();
									params.put("jhbh",pd.getZjbh());
									params.put("jhxh",pd.getZjxh());
									List<PanelDetailAndOrder> pdadList1=purchaseDetailMapper.getPanelDetailAndOrderFromZjbhList(params);
									if(pdadList1.size()>0){
										s_cpbh=pdadList1.get(0).getCpbh();
										ls_khxh=pdadList1.get(0).getKhxh();
										ls_fach=pdadList1.get(0).getFach();
										ls_psjq=pdadList1.get(0).getPsjq();
										s_khbh=pdadList1.get(0).getKhbh();
										ls_psjq=pdadList1.get(0).getPsjq();
									}else{
										s_cpbh="";
										ls_khxh="";
										ls_fach="";
										s_khbh="";
									}
								}
								String sql="  select zzhxs  from clbmb where clhh="+ppi.getClhh()+" ";
								params.put("sql",sql);
								String zzhxsStr=purchaseDetailMapper.getStringFromSql(params);
								if(zzhxsStr==null){
									zzhxsStr="0";
								}
								double ls_zzhxs=Double.parseDouble(zzhxsStr);
								sql="  select mjh  from cgxxb where clhh='"+ppi.getClhh()+"' and csbh='"+s_csbh+"' ";
								params.put("sql",sql);
								String mjh=purchaseDetailMapper.getStringFromSql(params);
								newpod.setPsjq(ls_psjq);
								newpod.setMjh(mjh);
								newpod.setClhh(ppi.getClhh());
								newpod.setFzzbj(ppi.getFzzbj());
								newpod.setTxgz(ppi.getTxgz());
								newpod.setClmc(ppi.getClmc());
								newpod.setJldw(ppi.getJldw());
								newpod.setCgsl(f_cgsl);
								newpod.setFzdw(s_fzdw);
								newpod.setZzhxs(ls_zzhxs);
								newpod.setCltx1(s_cltx1);
								newpod.setYsgg(s_ysgg);
								newpod.setCltx2(ppi.getCltx2());
								newpod.setCltx3(ppi.getCltx3());
								newpod.setHtbz(s_htbz);
								newpod.setBzsm(s_bzsm);
								newpod.setKjlx(0);
								newpod.setKhbh(s_khbh);
								newpod.setCpbh(s_cpbh);
								newpod.setFzsl(s_fzsl);
								newpod.setDlgs(ppi.getWzdl());
								newpod.setYcgl(f_cgsl);
								newpod.setHsbm(ppi.getHsbm());
								newpod.setWxbj(s_wxbj);
								newpod.setSqbh(s_sqbh);
								newpod.setSqxh(s_sqxh);
								newpod.setSqh(s_sqh);
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
									double s_wbje=DoubleCal.round(f_cgsl*s_cgdj, 2);
									double s_cgje=DoubleCal.round(s_wbje/wbhl, 2);
									if(f_cgsl!=0){
										s_bbdj=DoubleCal.round(s_cgje/f_cgsl, 6);
									}else{
										s_bbdj=0;
									}
									newpod.setKzdj(s_kzdj);
									newpod.setWbbh(s_wbbh);
									newpod.setWbhl(wbhl);
									newpod.setWbdj(s_cgdj);
									newpod.setWbje(s_wbje);
									newpod.setCgdj(s_bbdj);
									newpod.setCgje(s_cgje);
								}else{
									newpod.setKzdj(s_kzdj);
									newpod.setCgdj(s_cgdj);
									newpod.setCgje(DoubleCal.round(f_cgsl*s_cgdj, 2));
								}
								/*if(fpc.getGhzq()!=0){
									Calendar rightNow = Calendar.getInstance();
									if(s_jhrq!=null){
										rightNow.setTime(new Date());
										rightNow.add(Calendar.DAY_OF_YEAR,-(int)fpc.getGhzq());
										s_jhrq=rightNow.getTime();
									}
								}*/
								newpod.setGhzq(s_ghzq);
								newpod.setJhrq(s_jhrq);
								newpod.setHqjq(s_jhrq);
								newpod.setCgrq(s_cgrq);
								newpod.setSdck(s_sdck);
								newpod.setLogin_id(login_id);
								newpod.setIp(ip);
								newpod.setHtbh(s_htbh);
								mapper.addPurchaseOrderDetail(newpod);
								s_htbh=newpod.getHtbh();
							}
						}
					}
					
					
					ls_cjsl=0;
					for(PurPanelImp cgjh:cgjhxmb){
						if(cgjh.getCgbh()==s_cgbh&&cgjh.getCgxh()==s_cgxh){
							ls_cjsl+=cgjh.getCgsl();
						}
					}
					if(s_cgsl-ls_cjsl>0){
						f_cgsl=s_cgsl-ls_cjsl;
						PurPanelImp lppi=new PurPanelImp();
						lppi.setCgbh(s_cgbh);
						lppi.setCgxh(s_cgxh);
						lppi.setCgsl(f_cgsl);
						cgjhxmb.add(lppi);
						params.put("clhh", ppi.getClhh());
						params.put("cltx1",ppi.getCltx1());
						s_zhxs=purchaseDetailMapper.getConversion(params);
						if(s_zhxs>0){
							s_fzsl=DoubleCal.round(f_cgsl*s_zhxs, 3,BigDecimal.ROUND_HALF_UP);
						}else{
							s_fzsl=0;
						}
						PurchaseOrderDetail newpod =new PurchaseOrderDetail();
						params.put("login_id", login_id);
						params.put("ip", ip);
						params.put("htbh",s_htbh);
						List<PurchaseOrderDetail> lastList =mapper.getPurchaseOrderDetailLast(params);
						if(lastList.size()>0){
							PurchaseOrderDetail last=lastList.get(0);
							newpod.setHtbh(s_htbh);
							newpod.setHtxh(last.getHtxh()+1);
							s_htxh=last.getHtxh()+1;
							newpod.setCgrq(last.getCgrq());
							newpod.setWbbh(last.getWbbh());
							newpod.setWbhl(last.getWbhl());
							//加入外币判断
							if(!s_wbbh.equals("")){
								newpod.setZzsl(0);
							}else{
								newpod.setZzsl(last.getZzsl());
							}
							newpod.setPxxh(last.getPxxh()+5);
						}else{
							newpod.setHtxh(1);
							s_htxh=1;
							newpod.setPxxh(5);
							newpod.setCgrq(new Date());
							newpod.setWbbh(s_wbbh);
							if(!s_wbbh.equals("")){
								if(s_cgrq==null){
									s_cgrq=new Date();
								}
								int f_nf=s_cgrq.getYear()+1900;
								int f_yf=s_cgrq.getMonth()+1;
								String sql="  select wbhl  from wbhlb where wbbh='"+s_wbbh+"' and nf='"+f_nf+"' and yf='"+f_yf+"'";
								params.put("sql",sql);
								String wbhlStr=purchaseDetailMapper.getStringFromSql(params);
								if(wbhlStr==null){
									wbhlStr="0";
								}
								double wbhl=Double.parseDouble(wbhlStr);
								newpod.setWbhl(wbhl);
							}else{
								newpod.setWbhl(0);
							}
							//加入外币判断
							if(!s_wbbh.equals("")){
								newpod.setZzsl(0);
							}else{
								newpod.setZzsl(0.17);
							}
						}
						newpod.setCgbh(s_cgbh);
						newpod.setCgxh(s_cgxh);
						newpod.setCgh(ppi.getCgh());
						newpod.setCjsl(ppi.getCgsl());
						newpod.setJhbh(ppi.getJhbh());
						newpod.setJhxh(ppi.getJhxh());
						newpod.setJhh(ppi.getJhbh()+"-"+ppi.getJhxh());
						newpod.setDdh(ppi.getDdh());
						newpod.setDdbh(s_ddbh);
						newpod.setDdxh(s_ddxh);
						newpod.setWkjq(ppi.getWkjq());
						ls_khxh="";
						ls_fach="";
						params.clear();
						params.put("ddbh",ppi.getDdbh());
						params.put("ddxh", ppi.getDdxh());
						List<PanelDetailAndOrder> pdadList=purchaseDetailMapper.getPanelDetailAndOrderList(params);
						if(pdadList.size()>0){
							ls_khxh=pdadList.get(0).getKhxh();
							ls_fach=pdadList.get(0).getFach();
							ls_psjq=pdadList.get(0).getPsjq();
							ls_pono=pdadList.get(0).getPono();
							ls_ywms=pdadList.get(0).getYwms();
						}
						newpod.setCjjhrq(ppi.getJhrq());
						//半成品计划
						if(pd.getZjbh()!=0&&pd.getZjxh()!=0){
							params.clear();
							params.put("jhbh",pd.getZjbh());
							params.put("jhxh",pd.getZjxh());
							List<PanelDetailAndOrder> pdadList1=purchaseDetailMapper.getPanelDetailAndOrderFromZjbhList(params);
							if(pdadList1.size()>0){
								s_cpbh=pdadList1.get(0).getCpbh();
								ls_khxh=pdadList1.get(0).getKhxh();
								ls_fach=pdadList1.get(0).getFach();
								ls_psjq=pdadList1.get(0).getPsjq();
								s_khbh=pdadList1.get(0).getKhbh();
								ls_pono=pdadList1.get(0).getPono();
								ls_ywms=pdadList1.get(0).getYwms();
							}else{
								s_cpbh="";
								ls_khxh="";
								ls_fach="";
								s_khbh="";
							}
						}
						String sql="  select zzhxs  from clbmb where clhh="+ppi.getClhh()+" ";
						params.put("sql",sql);
						String zzhxsStr=purchaseDetailMapper.getStringFromSql(params);
						if(zzhxsStr==null){
							zzhxsStr="0";
						}
						double ls_zzhxs=Double.parseDouble(zzhxsStr);
						newpod.setKhxh(ls_khxh);
						newpod.setFach(ls_fach);
						newpod.setPono(ls_pono);
						newpod.setYwms(ls_ywms);
						newpod.setPsjq(ls_psjq);
						newpod.setFzzbj(ppi.getFzzbj());
						newpod.setTxgz(ppi.getTxgz());
						newpod.setClth(ppi.getClth());
						newpod.setClhh(ppi.getClhh());
						newpod.setClmc(ppi.getClmc());
						newpod.setJldw(ppi.getJldw());
						newpod.setCgsl(f_cgsl);
						newpod.setFzdw(s_fzdw);
						newpod.setZzhxs(ls_zzhxs);
						newpod.setCltx1(s_cltx1);
						newpod.setYsgg(s_ysgg);
						newpod.setCltx2(ppi.getCltx2());
						newpod.setCltx3(ppi.getCltx3());
						newpod.setHtbz(s_htbz);
						newpod.setBzsm(s_bzsm);
						newpod.setKjlx(0);
						newpod.setKhbh(s_khbh);
						newpod.setCpbh(s_cpbh);
						newpod.setFzsl(s_fzsl);
						newpod.setDlgs(ppi.getWzdl());
						newpod.setYcgl(f_cgsl);
						newpod.setHsbm(ppi.getHsbm());
						newpod.setWxbj(s_wxbj);
						newpod.setSqbh(s_sqbh);
						newpod.setSqxh(s_sqxh);
						newpod.setSqh(s_sqh);
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
							double s_wbje=DoubleCal.round(f_cgsl*s_cgdj, 2);
							double s_cgje=DoubleCal.round(s_wbje/wbhl, 2);
							if(f_cgsl!=0){
								s_bbdj=DoubleCal.round(s_cgje/f_cgsl, 6);
							}else{
								s_bbdj=0;
							}
							newpod.setKzdj(s_kzdj);
							newpod.setWbbh(s_wbbh);
							newpod.setWbhl(wbhl);
							newpod.setWbdj(s_cgdj);
							newpod.setWbje(s_wbje);
							newpod.setCgdj(s_bbdj);
							newpod.setCgje(s_cgje);
						}else{
							newpod.setKzdj(s_kzdj);
							newpod.setCgdj(s_cgdj);
							newpod.setCgje(DoubleCal.round(f_cgsl*s_cgdj, 2));
						}
						/*if(fpc.getGhzq()!=0){
							Calendar rightNow = Calendar.getInstance();
							if(s_jhrq!=null){
								rightNow.setTime(new Date());
								rightNow.add(Calendar.DAY_OF_YEAR,-(int)fpc.getGhzq());
								s_jhrq=rightNow.getTime();
							}
						}*/
						newpod.setGhzq(s_ghzq);
						newpod.setJhrq(s_jhrq);
						newpod.setHqjq(s_jhrq);
						newpod.setCgrq(s_cgrq);
						newpod.setSdck(s_sdck);
						newpod.setLogin_id(login_id);
						newpod.setIp(ip);
						newpod.setHtbh(s_htbh);
						mapper.addPurchaseOrderDetail(newpod);
						s_htbh=newpod.getHtbh();
					}
					//导入辅助表
					params.put("cgbh", s_cgbh);
					params.put("cgxh", s_cgxh);
					List<PurPanelSubsidiary> ppsList= mapper.getPurPanelSubsidiaryList(params);
					for(PurPanelSubsidiary pps:ppsList){
						OrderSubsidiary os=new OrderSubsidiary();
						os.setJgbh(pps.getJgbh());
						os.setHtbh(s_htbh);
						os.setHtxh(s_htxh);
						os.setLogin_id(login_id);
						os.setIp(ip);
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
						mapper.addPurPanelSubsidiary(os);
					}
				}
		return json.toString();
	}
	public String getMaterialGridLbbh(Map<String,Object> params){
		JSONObject json = new JSONObject();
		String lbbh = mapper.getMaterialGridLbbh(params)==null?"":mapper.getMaterialGridLbbh(params);
		//铁管15 铝管16
		if("15".equals(lbbh)||"16".equals(lbbh)){			
			int count = mapper.getMaterialGridCount(params);
			if(count==1){
				List<CompanyShow> s_csmc = mapper.getMaterialGridCsbh(params);
				String csbh = s_csmc.get(0).getCsbh();
				String csmc = s_csmc.get(0).getCsmc();
				json.put("csbh", csbh);
				json.put("csmc", csmc);
				json.put("storeType", "clbm_gscsb");
			}else{
				json.put("csbh", "");
				json.put("storeType", "clbm_gscsb");
			}
		}else if("14".equals(lbbh)){//五金件 14
			int count = mapper.getMaterialGridCountb(params);
			if(count==1){
				String csbh = mapper.getMaterialGridCsbhb(params);
				json.put("csbh", csbh);
				json.put("storeType", "csjjb");
			}else{
				json.put("csbh", "");
				json.put("storeType", "csjjb");
			}
		}else{
			json.put("csbh", "其他");
			json.put("storeType", "csxxb");
		}				
		return json.toString();
	}
}
