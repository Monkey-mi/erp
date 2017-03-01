package erp.erp.purchaseUrge.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.java.dev.eval.Expression;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import erp.common.FilterModel;
import erp.common.model.WebReturnObject;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.purchaseOrder.data.PurchaseOrderMapper;
import erp.erp.purchaseUrge.data.PurchaseUrgeMapper;
import erp.erp.purchaseUrge.model.CalForNumber;
import erp.erp.purchaseUrge.model.ConfirmTime;
import erp.erp.purchaseUrge.model.ProcessCost;
import erp.erp.purchaseUrge.model.PurchaseUrge;
import erp.erp.purchaseUrge.model.PurchaseUrgeCollect;
import erp.erp.purchaseUrge.model.PurchaseUrgeDetail;
import erp.erp.purchaseUrge.model.PurchaseUrgeOth;
import erp.erp.purchaseUrge.model.RollOutput;
import erp.erp.purchaseUrge.model.SteelFrameDetail;
import erp.erp.purchaseUrge.model.SynergyUrge;
import erp.util.DoubleCal;
import erp.util.MyJsonUtil;


@Service
public class PurchaseUrgeService {
	@Autowired
	private PurchaseUrgeMapper mapper;
	@Autowired
	private PurchaseOrderMapper purchaseOrderMapper;
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购明细
	/**
	* @Description: 采购追催汇总合计信息
	* Request purchaseurge/purchaseurge.act?method=getPurchaseUrgeCollectCount
	* Response {data:[{List<PurchaseUrgeCollect>}]} <br/><br/>
	*/
	public List<PurchaseUrgeCollect> getPurchaseUrgeCollectCount(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String lbqx="and (";
		List<String>  cglbList=purchaseOrderMapper.getPurAuthorityList(pa);
		for(String str:cglbList){
			if(i==0){
				lbqx+="(cghtb.cglb='') or (left(cghtb.cglb,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				lbqx+=" or (left(cghtb.cglb,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		lbqx+=")";
		if(cglbList.size()>0){
			params.put("lbqx", lbqx);
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
		return mapper.getPurchaseUrgeCollectCount(params);
	}
	/**
	* @Description: 采购追催合计信息
	* Request purchaseurge/purchaseurge.act?method=getPurchaseUrgeCount
	* Response {data:[{List<PurchaseUrge>}]} <br/><br/>
	*/
	public List<PurchaseUrge> getPurchaseUrgeCount(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String lbqx="and (";
		List<String>  cglbList=purchaseOrderMapper.getPurAuthorityList(pa);
		for(String str:cglbList){
			if(i==0){
				lbqx+="(cghtb.cglb='') or (left(cghtb.cglb,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				lbqx+=" or (left(cghtb.cglb,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		lbqx+=")";
		if(cglbList.size()>0){
			params.put("lbqx", lbqx);
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
		return mapper.getPurchaseUrgeCount(params);
	}
	/**
	 * 协同追催
	 * Request purchaseurge/purchaseurge.act?method=getSynergyUrgeList <br/><br/>
	 * @author wq
	 * @date 2016-08-24
	 */
	public List<SynergyUrge> getSynergyUrgeList(Map<String,Object> params) {
		List<SynergyUrge> list =mapper.getSynergyUrgeList(params);
		//通过合并条件取出合同序号
		for(SynergyUrge su:list){
			params.put("htbh", su.getHtbh());
			params.put("clmc", su.getClmc());
			params.put("clhh", su.getClhh());
			params.put("jldw", su.getJldw());
			params.put("cltx1", su.getCltx1());
			List<String> htxhArr=mapper.getHtxhList(params);
			String htxhs="";
			for(String str:htxhArr){
				if(htxhs.equals("")){
					htxhs+=str;
				}else{
					htxhs+=","+str;
				}
			}
			su.setHtmx(htxhs);
		}
		
		return list;
	}
	/**
	 * 加工费用
	 * Request purchaseurge/purchaseurge.act?method=getProcessCostList <br/><br/>
	 * @author wq
	 * @date 2016-05-14
	 */
	public List<ProcessCost> getProcessCostList(Map<String,Object> params) {
		return mapper.getProcessCostList(params);
	}
	/**
	 * 钢架明细
	 * Request purchaseurge/purchaseurge.act?method=getSteelFrameDetailList <br/><br/>
	 * @author wq
	 * @date 2016-05-14
	 */
	public List<SteelFrameDetail> getSteelFrameDetailList(Map<String,Object> params) {
		return mapper.getSteelFrameDetailList(params);
	}
	/**
	 * 支数计算
	 * Request purchaseurge/purchaseurge.act?method=getNumberCal <br/><br/>
	 * @author wq
	 * @date 2016-05-13
	 */
	public String getNumberCal(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recStr=params.get("recs").toString();
			List<PurchaseUrge> recs = MyJsonUtil.str2list(recStr, PurchaseUrge.class);
			for(PurchaseUrge pu:recs){
				double s_dgyl=pu.getDgyl(),s_fzsl,s_rkzs,s_rkzs_sum,s_fzsl_sum,s_ggcc,s_rkgg=0,ls_fzsl;
				int htbh=pu.getHtbh();
				int htxh=pu.getHtxh();
				String s_cltx1=pu.getCltx1(),s_rktx;
				s_rkzs=0;
				s_rkzs_sum=0;
				s_fzsl=0;
				s_fzsl_sum=0;
				if(s_cltx1==null){
					s_cltx1="";
				}else{
					s_cltx1=s_cltx1.trim();
				}
				if(!s_cltx1.equals("")&&s_dgyl>0){
					Expression exp1 = new Expression(s_cltx1.replaceAll("[A-Za-z]",""));//替换所有字母之后计算
					s_ggcc =exp1.eval().doubleValue();
					s_rktx="";
					s_fzsl=0;
					Map<String,Object> par=new HashMap<String, Object>();
					par.put("htbh", pu.getHtbh());
					par.put("htxh",pu.getHtxh());
					List<CalForNumber> cfnList=mapper.getCalForNumberList(par);
					for(CalForNumber cfn:cfnList){
						s_rktx=cfn.getCltx1();
						s_fzsl=cfn.getFzsl();
						if(s_rktx==null){
							s_rktx="";
						}else{
							s_rktx=s_rktx.trim();
						}
						if(!s_rktx.equals("")){
							Expression exp2 = new Expression(s_rktx.substring(0, s_rktx.length()-1));
							s_rkgg=exp2.eval().doubleValue();
							if(s_rkgg!=0&&s_dgyl>0&&DoubleCal.round(s_rkgg/s_dgyl,0)>0&&DoubleCal.round(s_ggcc/s_dgyl,0)>0){
								s_rkzs=DoubleCal.round(s_fzsl/s_rkgg*(DoubleCal.round(s_rkgg/s_dgyl,0)/DoubleCal.round(s_ggcc/s_dgyl,0)),2);
							}
						}
						s_fzsl_sum=s_fzsl+s_fzsl_sum;
						s_rkzs_sum=s_rkzs+s_rkzs_sum;
					}
					ls_fzsl=pu.getFzsl();
					if(s_ggcc!=0){
						pu.setZhsl(DoubleCal.round(ls_fzsl/s_ggcc, 0));
					}else{
						pu.setZhsl(0);
					}
					pu.setRkzs(s_rkzs_sum);
					pu.setWdzs(pu.getZhsl()-s_rkzs_sum);
				}
			}
			json.put("recs", MyJsonUtil.obj2string(recs));
		return json.toString();
	}
	/**
	* @Description: 合并追催
	* Request purchaseurge/purchaseurge.act?method=getPurchaseUrgeCollectList
	* Response {data:[{List<PurchaseUrgeCollect>}]} <br/><br/>
	*/
	public List<PurchaseUrgeCollect> getPurchaseUrgeCollectList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String lbqx="and (";
		List<String>  cglbList=purchaseOrderMapper.getPurAuthorityList(pa);
		for(String str:cglbList){
			if(i==0){
				lbqx+="(cghtb.cglb='') or (left(cghtb.cglb,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				lbqx+=" or (left(cghtb.cglb,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		lbqx+=")";
		if(cglbList.size()>0){
			params.put("lbqx", lbqx);
		}else{
			params.put("lbqx"," and ( 1=0 )");
		}
		return mapper.getPurchaseUrgeCollectList(params);
	}
	/**
	 * 合同拆分
	 * Request purchaseurge/purchaseurge.act?method=getContractSplit <br/><br/>
	 * @author wq
	 * @date 2016-05-11
	 */
	public String getContractSplit(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recStr=params.get("rec").toString();
			PurchaseUrge rec = MyJsonUtil.str2obj(recStr, PurchaseUrge.class);
			
			double cfsl=Double.parseDouble(params.get("cfsl").toString());
			params.put("sql"," select case when isnull(htmxb.cgsl,0) - isnull(htmxb.dhrk,0)>0 then isnull(htmxb.cgsl,0) - isnull(htmxb.dhrk,0) else 0 end  from htmxb where htbh='"+rec.getHtbh()+"' and htxh ='"+rec.getHtxh()+"'; ");
			String cgslStr =purchaseDetailMapper.getStringFromSql(params);
			if(cgslStr==null){
				cgslStr="";
			}
			double cgsl=Double.parseDouble(cgslStr);
			if(cgsl<cfsl){
				json.put("bool", false);
				json.put("msg", "拆分数量大于采购未完数量,拆分失败！");
				return json.toString();
			}
			params.put("clhh", rec.getClhh());
			params.put("cltx1",rec.getCltx1());
			double ld_zhxs=purchaseDetailMapper.getConversion(params);
			double ld_fzsl=0;
			if(ld_zhxs>0){
				ld_fzsl=DoubleCal.round(cfsl*ld_zhxs,3);
			}
			int ls_htxh_max=0;
			
			params.put("sql"," select max(htxh)+1  from htmxb where htbh='"+rec.getHtbh()+"'; ");
			String htxh_max =purchaseDetailMapper.getStringFromSql(params);
			ls_htxh_max=Integer.parseInt(htxh_max);
			
			String sql="  insert into htmxb(htbh,htxh,clhh,cltx1,cltx2,cltx3,jldw,cgsl,ycgl,dhrk,kzdj,cgdj,wbbh,wbhl,wbdj,cgrq,ghzq,jhrq,qrjq,hqjq,cgbh,cgxh,jhbh,jhxh,ddbh,ddxh, ";
			sql+=" 			sdck,bzsm,wcbj,qdbj,qdsj,qdrm,zzbj,hsbm,fzdw,fzsl,sqbh,sqxh,csxs1,csxs2,csxs3,csxs4,csxs5,csxs6,csxs7,csxs8,csjg,fzkj,sgbh,sgxh,xzbj,kjlx,pxxh, ";
			sql+=" 			zczy,wxbj,ysgg,dlgs,zzrm,zzsj,sdbj,wkjq,zxhtbh,zxhtxh,rksl,ggcs,clbz,zzsl,zzyx,mxzs,cpxj,bzxx,cfbh,cfxh,jhlb,scbj,pzqrbj,pzqrrm,pzqrsj,mjh,htbz,cpbh, ";
			sql+=" 			khbh,khxh,fach,psjq,pono,ywms,xmsjbc,zzlx,hfyj,hfbj,hfrm,hfsj,dybj_zx,dyrm_zx,dysj_zx,gxsj,cfbj)  ";
			sql+="   select htbh,'"+ls_htxh_max+"',clhh,cltx1,cltx2,cltx3,jldw,'"+cfsl+"','"+cfsl+"',0,kzdj,cgdj,wbbh,wbhl,wbdj,cgrq,ghzq,jhrq,qrjq,hqjq,cgbh,cgxh,jhbh,jhxh,ddbh,ddxh,  ";
			sql+=" sdck,bzsm,wcbj,qdbj,qdsj,qdrm,zzbj,hsbm,fzdw,'"+ld_fzsl+"',sqbh,sqxh,csxs1,csxs2,csxs3,csxs4,csxs5,csxs6,csxs7,csxs8,csjg,fzkj,sgbh,sgxh,xzbj,kjlx,pxxh,  ";
			sql+=" zczy,wxbj,ysgg,dlgs,zzrm,zzsj,sdbj,wkjq,zxhtbh,zxhtxh,0,ggcs,clbz,zzsl,zzyx,mxzs,cpxj,bzxx,cfbh,cfxh,jhlb,scbj,pzqrbj,pzqrrm,pzqrsj,mjh,htbz,cpbh,  ";
			sql+=" 	khbh,khxh,fach,psjq,pono,ywms,xmsjbc,zzlx,hfyj,hfbj,hfrm,hfsj,dybj_zx,dyrm_zx,dysj_zx,gxsj,1  ";
			sql+="   from htmxb where htbh='"+rec.getHtbh()+"' and htxh='"+rec.getHtxh()+"';"  ;
			params.put("sql",sql);
			purchaseDetailMapper.getStringFromSql(params);
			
			sql=" update htmxb set cgsl = cgsl - "+cfsl+",ycgl = case when ycgl - "+cfsl+">0 then ycgl - "+cfsl+" else 0 end,fzsl = fzsl - "+ld_fzsl+" ";
			sql+=" ,wcbj= case when htmxb.dhrk = cgsl - "+cfsl+" then 1 else 0 end " ;
			sql+="	where htbh='"+rec.getHtbh()+"' and htxh='"+rec.getHtxh()+"'; "; 
			params.put("sql",sql);
			purchaseDetailMapper.getStringFromSql(params);
		return json.toString();
	}
	/**
	 * 滚动输出
	 * Request purchaseurge/purchaseurge.act?method=getRollOutputOneList <br/><br/>
	 * @author wq
	 * @date 2016-05-10
	 */
	public List<RollOutput> getRollOutputOneList(Map<String,Object> params) {
		return mapper.getRollOutputOneList(params);
	}
	/**
	 * 滚动输出
	 * Request purchaseurge/purchaseurge.act?method=getRollOutputList <br/><br/>
	 * @author wq
	 * @date 2016-05-10
	 */
	public List<RollOutput> getRollOutputList(Map<String,Object> params) {
		return mapper.getRollOutputList(params);
	}
	/**
	 * 修改确定时间
	 * Request purchaseurge/purchaseurge.act?method=updateConfirmTime <br/><br/>
	 * @author wq
	 * @date 2016-05-09
	 */
	public void updateConfirmTime(ConfirmTime[] arr) {
		for(ConfirmTime obj: arr) {
			mapper.updateConfirmTime(obj);
		}
	}
	/**
	 * 获取确定时间
	 * Request purchaseurge/purchaseurge.act?method=getConfirmTimeList <br/><br/>
	 * @author wq
	 * @date 2016-05-09
	 */
	public List<ConfirmTime> getConfirmTimeList(Map<String,Object> params) {
		return mapper.getConfirmTimeList(params);
	}
	
	/**
	 * 确定标记
	 * Request purchaseurge/purchaseurge.act?method=getAOGState <br/><br/>
	 * @author wq
	 * @date 2016-05-09
	 */
	public String getAOGState(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		mapper.updateAogState(params);
		mapper.updateAogSyncState(params);
		return json.toString();
	}
	/**
	* @Description: 采购追催主要信息
	* Request purchaseurge/purchaseurge.act?method=*****
	* Response {data:[{List<PurchaseUrge>}]} <br/><br/>
	*/
	public List<PurchaseUrge> getPurchaseUrgeList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String lbqx="and (";
		List<String>  cglbList=purchaseOrderMapper.getPurAuthorityList(pa);
		for(String str:cglbList){
			if(i==0){
				lbqx+="(cghtb.cglb='') or (left(cghtb.cglb,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				lbqx+=" or (left(cghtb.cglb,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		lbqx+=")";
		if(cglbList.size()>0){
			params.put("lbqx", lbqx);
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
		return mapper.getPurchaseUrgeList(params);
	}
	/**
	* @Description: 采购追催记录
	* Request purchaseurge/purchaseurge.act?method=getPurchaseUrgeDetailList
	* Response {data:[{List<PurchaseUrgeDetail>}]} <br/><br/>
	*/
	public List<PurchaseUrgeDetail> getPurchaseUrgeDetailList(Map<String,Object> params) {
		return mapper.getPurchaseUrgeDetailList(params);
	}

	/**
	* @Description: 回复物控
	* Request purchaseurge/purchaseurge.act?method=getPurchaseUrgeOthList
	* Response {data:[{List<PurchaseUrgeDetail>}]} <br/><br/>
	*/
	public List<PurchaseUrgeOth> getPurchaseUrgeOthList(Map<String,Object> params) {
		return mapper.getPurchaseUrgeOthList(params);
	}
	/**
	 * 
	* @Title: updatePoWithPlatform
	* @Description: TODO(返写po-平台中间表)
	* @param @param params    设定文件
	* @return void    返回类型
	* @throws
	 */
	public void updatePoWithPlatform(Map<String,Object> params){
		mapper.updatePoWithPlatform(params);
	}
	 
}
