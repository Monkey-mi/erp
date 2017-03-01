package erp.erp.purchaseOrder.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.erp.contract.ContractSyncInter;

import erp.common.FilterModel;
import erp.erp.master.purchaseDetail.data.PurchaseDetailMapper;
import erp.erp.master.purchaseDetail.model.AogBps;
import erp.erp.master.purchaseDetail.model.BomChangeSearch;
import erp.erp.purchaseOrder.data.PurchaseOrderDetailMapper;
import erp.erp.purchaseOrder.data.PurchaseOrderMapper;
import erp.erp.purchaseOrder.model.IssueBack;
import erp.erp.purchaseOrder.model.ProcurementOrder;
import erp.erp.purchaseOrder.model.ProductDescImp;
import erp.erp.purchaseOrder.model.PurPanelImp;
import erp.erp.purchaseOrder.model.PurchaseOrderDetail;
import erp.util.DoubleCal;
import erp.util.MyJsonUtil;
import erp.util.WebUtil;
import erp.web.data.UsersMapper;
import erp.web.model.Exclusive;

@Lazy
@Service
public class PurchaseOrderService {
	@Autowired
	private PurchaseOrderMapper mapper;
	@Autowired
	private PurchaseOrderDetailMapper purchaseOrderDetailMapper;
	@Autowired 
	private ContractSyncInter contractSyncInter;
	private UsersMapper userMapper=WebUtil.getAppCtx("tps").getBean(UsersMapper.class);
	@Autowired
	private PurchaseDetailMapper purchaseDetailMapper;//采购
	/**
	* @Description: 采购订单总表汇总信息
	* Request purchaseorder/purchaseorder.act?method=getPurchaseOrderSum
	* Response {data:[{List<PurchaseOrder>}]} <br/><br/>
	*/
	public List<ProcurementOrder> getPurchaseOrderSum(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String lbqx="and (";
		List<String>  cglbList=mapper.getPurAuthorityList(pa);
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
		return mapper.getPurchaseOrderSum(params);
	}
	/**
	 * 删除
	 * Request purchaseorder/purchaseorder.act?method=getDelState <br/><br/>
	 * @author wq
	 * @date 2016-04-25
	 */
	@Transactional
	public String getDelState(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			int htbh=Integer.parseInt(params.get("htbh").toString());
			params.put("sql"," delete from htmx_ddbzcfxxb where htmx_ddbzcfxxb.htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
			
			params.put("sql"," delete from cghtfzb where cghtfzb.htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
			
			params.put("sql"," delete from htmxb where htmxb.htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
			
			params.put("sql"," delete from cghtb where cghtb.htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
			
			params.put("sql"," delete from gjjjbomb where gjjjbomb.htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
			//删除临时表
			params.put("sql"," delete from htmxb_tmp where htmxb_tmp.htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
			params.put("sql"," delete from cghtwxlltzdb_tmp where htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
			params.put("sql"," delete from cghtfzb_tmp where htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
			params.put("sql"," delete from gjjjbomb_tmp where htbh='"+htbh+"' ");
			purchaseDetailMapper.getStringFromSql(params);
		return json.toString();
	}
	/**
	 * 删除前验证
	 * Request purchaseorder/purchaseorder.act?method=getBeforDel <br/><br/>
	 * @author wq
	 * @date 2016-04-25
	 */
	@Transactional
	public String getBeforDel(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recstr=params.get("recstr").toString();
			ProcurementOrder po=MyJsonUtil.str2obj(recstr, ProcurementOrder.class);
			String search=" and cghtb.qfbj = '"+po.getQfbj()+"' and cghtb.sdbj='"+po.getSdbj()+"' and cghtb.htbh='"+po.getHtbh()+"'";
			params.put("search", search);
			List<ProcurementOrder> poList=mapper.getPurchaseOrderList(params);
			
			List<Exclusive> excList=userMapper.getExclusiveList(params);
			if(excList.size()>0){
				json.put("msg", "该笔单据【"+excList.get(0).getU_name()+"】正在编辑,请稍候重试！");
				json.put("bool", false);
				return json.toString();
			}
			if(poList.size()==0){
				json.put("msg", "数据验证不一致，请重试！");
				json.put("bool", false);
				json.put("sync", true);
				return json.toString();
			}
			int htbh=po.getHtbh();
			//检测合同锁定情况
			if(po.getSdbj()==1){
				json.put("msg", "【"+htbh+"】号合同已经锁定，不能删除!");
				json.put("bool", false);
				return json.toString();
			}
			//检测计划签发情况
			if(po.getQfbj()==1){
				json.put("msg", "【"+htbh+"】号合同已经签发，不能删除!");
				json.put("bool", false);
				return json.toString();
			}
			//材料入库检测
			int count=0;
			params.put("sql"," select count(*)  from rkdb_yl with (nolock)  where htbh='"+htbh+"' ");
			String  countStr=purchaseDetailMapper.getStringFromSql(params);
			if(countStr==null){
				count=0;
			}else{
				count=Integer.parseInt(countStr);
			}
			if(count>0){
				json.put("msg", "【"+htbh+"】号合同已经有材料入库，不能删除!");
				json.put("bool", false);
				return json.toString();
			}
			/* 去掉物控交期管控   伍恰 20161119
			params.put("sql"," select count(*)  from htmxb where htbh='"+htbh+"' and wkjq is not null ");
			countStr=purchaseDetailMapper.getStringFromSql(params);
			if(countStr==null){
				count=0;
			}else{
				count=Integer.parseInt(countStr);
			}
			if(count>0){
				json.put("msg", "【"+htbh+"】号合同已有明细已填写物控交期，不能删除!");
				json.put("bool", false);
				return json.toString();
			}*/
			
			params.put("sql"," select count(*)  from fksqyftzb where (mbhtbh='"+htbh+"') or (yfhtbh='"+htbh+"') ");
			countStr=purchaseDetailMapper.getStringFromSql(params);
			if(countStr==null){
				count=0;
			}else{
				count=Integer.parseInt(countStr);
			}
			if(count>0){
				json.put("msg", "【"+htbh+"】号合同已做预付调整单，不能删除!");
				json.put("bool", false);
				return json.toString();
			}
			
			String sql=" select count(*)  from cgjhmxb where zzbj=1 and zzyx like '%未转数小于5千克，系统自动中止%' ";
			sql+=" and exists (select cgbh,cgxh from htmxb where htbh='"+htbh+"' and htmxb.cgbh=cgjhmxb.cgbh and htmxb.cgxh=cgjhmxb.cgxh); ";
			params.put("sql", sql);
			countStr=purchaseDetailMapper.getStringFromSql(params);
			if(countStr==null){
				count=0;
			}else{
				count=Integer.parseInt(countStr);
			}
			if(count>0){
				json.put("show", "该采购合同对应的采计明细有自动中止数，合同删除后请手动恢复采计！");
				json.put("bool", false);
				return json.toString();
			}
			Map<String,Object> ddzt = new HashMap<String,Object>();
			ddzt.put("agreement_bh",params.get("bills_id"));
			String jsonmapd=MyJsonUtil.obj2string(ddzt);
			String order_status = contractSyncInter.getContractStatus(jsonmapd);
			if(order_status!=null&&!order_status.trim().equals("50")&&!order_status.trim().equals("60")){
				json.put("msg", "【"+htbh+"】号合同已生成平台订单，不能删除!");
				json.put("bool", false);
				return json.toString();
			}
		return json.toString();
	}
	
	/**
	* @Description: BOM更改查询 
	* Request purchaseorder/purchaseorder.act?method=getBomChangeSearchOneList
	* Response {data:[{List<BomChangeSearch>}]} <br/><br/>
	*/
	public List<BomChangeSearch> getBomChangeSearchOneList(Map<String,Object> params) {
		return mapper.getBomChangeSearchOneList(params);
	}
	/**
	* @Description: 合同到货/入库明细 
	* Request purchaseorder/purchaseorder.act?method=getArrivalOneList
	* Response {data:[{List<AogBps>}]} <br/><br/>
	*/
	public List<AogBps> getArrivalOneList(Map<String,Object> params) {
		return mapper.getArrivalOneList(params);
	}
	
	/**
	 * 合同中止
	 * Request purchaseorder/purchaseorder.act?method=getSuspend <br/><br/>
	 * @author wq
	 * @date 2016-04-22
	 */
	@Transactional
	public String getSuspend(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recstr=params.get("recstr").toString();
			String ifupdate = "0";
			List<PurchaseOrderDetail> podList=MyJsonUtil.str2list(recstr, PurchaseOrderDetail.class);
			int zzbj=podList.get(0).getZzbj();
			int htbh=podList.get(0).getHtbh();
			String zzlx=params.get("zzlx").toString();
			String zzyy=params.get("zzyy").toString();
			String u_name=params.get("u_name").toString();
			String sql="";
			for(PurchaseOrderDetail pod:podList){
				int s_htbh=pod.getHtbh();
				int s_htxh=pod.getHtxh();
				if(zzbj==0){
					params.put("sql"," update htmxb set zzbj=1,zzrm='"+u_name+"',zzsj=getdate(),zzlx='"+zzlx+"',zzyx='"+zzyy+"' where htbh='"+s_htbh+"' and htxh='"+s_htxh+"'; ");
					purchaseDetailMapper.getStringFromSql(params);
				}else{
					params.put("sql"," update htmxb set zzbj=0,zzrm='"+u_name+"',zzsj=getdate(),zzlx='',zzyx='' where htbh='"+s_htbh+"' and htxh='"+s_htxh+"'; ");
					purchaseDetailMapper.getStringFromSql(params);
					
					if(pod.getCgsl()>pod.getRksl()){
						params.put("sql"," update htmxb set wcbj=0 where htbh='"+s_htbh+"' and htxh='"+s_htxh+"' and cgsl>rksl; ");
						purchaseDetailMapper.getStringFromSql(params);
					}
				}
			}
			sql=" select count(*)  from htmxb with (nolock) where htbh='"+htbh+"' and not (zzbj=1 or wcbj=1); ";
			params.put("sql",sql);
			String countStr=purchaseDetailMapper.getStringFromSql(params);
			if(countStr==null){
				countStr="0";
			}
			int count=Integer.parseInt(countStr);
			int wcbj=0;
			if(count==0){
				//
				Map<String,Object> ddzt = new HashMap<String,Object>();
				ddzt.put("agreement_bh",params.get("htbh"));
				String jsonmapd=MyJsonUtil.obj2string(ddzt);
				String order_status = contractSyncInter.getContractStatus(jsonmapd);
	    		if(!order_status.trim().equals("50") && !order_status.trim().equals("70")){
	    			json.put("bool", false);
	    			json.put("msg", "平台合同未中止,请先中止平台合同！");
	    			ifupdate = "1";
	    			for(PurchaseOrderDetail pod:podList){	
	    				int s_htbh=pod.getHtbh();
	    				int s_htxh=pod.getHtxh();	
	    				params.put("sql"," update htmxb set zzbj=0,zzrm='"+u_name+"',zzsj=getdate(),zzlx='',zzyx='' where htbh='"+s_htbh+"' and htxh='"+s_htxh+"'; ");
						purchaseDetailMapper.getStringFromSql(params);
	    			}
	    		}else{
				params.put("sql"," update cghtb set wcbj=1,gdbj=1 where htbh='"+htbh+"'; ");
				wcbj=1;
				purchaseDetailMapper.getStringFromSql(params);
	    		}
	    	}else{
				params.put("sql"," update cghtb set wcbj=0,gdbj=0 where htbh='"+htbh+"'; ");
				purchaseDetailMapper.getStringFromSql(params);
			}
			json.put("wcbj", wcbj);
			json.put("ifupdate", ifupdate);
		return json.toString();
	}
	
	/**
	 * 中止前验证
	 * Request purchaseorder/purchaseorder.act?method=getBeforSuspend <br/><br/>
	 * @author wq
	 * @date 2016-04-21
	 */
	public String getBeforSuspend(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recstr=params.get("recstr").toString();
			List<PurchaseOrderDetail> podList=MyJsonUtil.str2list(recstr, PurchaseOrderDetail.class);
			int zzbj=podList.get(0).getZzbj();
			int htbh=podList.get(0).getHtbh();
			for(PurchaseOrderDetail pod:podList){
				if(zzbj!=pod.getZzbj()){
					json.put("msg", "请选择中止标记相同记录！");
					json.put("bool", false);
					return json.toString();
				}
			}
			if(zzbj==0){
				String sql=" select count(*)  from fksqsphtb left outer join fksqspb with (nolock) on fksqspb.sqbh=fksqsphtb.sqbh ";
				sql+=" where fksqspb.tjbj=1 and fksqsphtb.htbh='"+htbh+"' and not exists (select * from zjzffksqmxb where zjzffksqmxb.sqbh=fksqsphtb.sqbh); ";
				params.put("sql",sql);
				String countStr=purchaseDetailMapper.getStringFromSql(params);
				if(countStr==null){
					countStr="0";
				}
				int count=Integer.parseInt(countStr);
				if(count>0){
					json.put("msg", "该合同存在付款申请且已提交，不允许中止!");
					json.put("bool", false);
					return json.toString();
				}
				
				sql=" select count(*)  from fksqsphtb left outer join fksqspb with (nolock) on fksqspb.sqbh=fksqsphtb.sqbh ";
				sql+=" where fksqsphtb.htbh="+htbh+" and exists (select * from zjzffksqmxb where zjzffksqmxb.sqbh=fksqsphtb.sqbh); ";
				params.put("sql",sql);
				countStr=purchaseDetailMapper.getStringFromSql(params);
				if(countStr==null){
					countStr="0";
				}
				count=Integer.parseInt(countStr);
				double ll_sqje,ll_yfje;
				if(count>0){
					params.put("sql"," select isnull(sum(sqje),0)  from fksqsphtb where fksqsphtb.htbh='"+htbh+"'; ");
					String sqjeStr=purchaseDetailMapper.getStringFromSql(params);
					if(sqjeStr==null){
						sqjeStr="0";
					}
					ll_sqje=Double.parseDouble(sqjeStr);
					
					params.put("sql"," select isnull(sum(sqje),0)  from fksqsphtb where fksqsphtb.htbh='"+htbh+"'; ");
					String yfjeStr=purchaseDetailMapper.getStringFromSql(params);
					if(yfjeStr==null){
						yfjeStr="0";
					}
					ll_yfje=Double.parseDouble(yfjeStr);
					
					if (ll_sqje - ll_yfje > 5 ){
						json.put("msg", "该合同的预付款待分配金额大于5元，不允许中止!");
						json.put("bool", false);
						return json.toString();
					}
				}
			}
		return json.toString();
	}
	
	/**
	 * 取消回签
	 * Request purchaseorder/purchaseorder.act?method=getIssueBackCancel <br/><br/>
	 * @author wq
	 * @date 2016-04-21
	 */
	@Transactional
	public String getIssueBackCancel(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String mrec=params.get("mrec").toString();
			String recstr=params.get("recstr").toString();
			
			ProcurementOrder po=MyJsonUtil.str2obj(mrec, ProcurementOrder.class);
			List<IssueBack> ibList=MyJsonUtil.str2list(recstr, IssueBack.class);
			po.setHqbj(0);
			po.setHqsj(null);
			mapper.updatePurchaseOrderForHqsj(po);
			for(IssueBack ib:ibList){
				ib.setHqjq(po.getJhrq());
				purchaseOrderDetailMapper.updatePurchaseOrderDetailForHqjq(ib);
			}
		return json.toString();
	}
	/**
	 * 获取回签数据
	 * Request purchaseorder/purchaseorder.act?method=getIssueBackList <br/><br/>
	 * @author wq
	 * @date 2016-04-21
	 */
	public List<IssueBack> getIssueBackList(Map<String,Object> params) {
		return mapper.getIssueBackList(params);
	}
	/**
	 * 确认回签
	 * Request purchaseorder/purchaseorder.act?method=getIssueBack <br/><br/>
	 * @author wq
	 * @date 2016-04-21
	 */
	@Transactional
	public String getIssueBack(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String mrec=params.get("mrec").toString();
			String recstr=params.get("recstr").toString();
			ProcurementOrder po=MyJsonUtil.str2obj(mrec, ProcurementOrder.class);
			List<IssueBack> ibList=MyJsonUtil.str2list(recstr, IssueBack.class);
			po.setHqbj(1);
			mapper.updatePurchaseOrderForHqsj(po);
			for(IssueBack ib:ibList){
				purchaseOrderDetailMapper.updatePurchaseOrderDetailForHqjq(ib);
			}
		return json.toString();
	}
	/**
	 * 签发合同
	 * Request purchaseorder/purchaseorder.act?method=updateIssue <br/><br/>
	 * @author wq
	 * @date 2016-04-21
	 */
	@Transactional
	public String updateIssue(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recstr=params.get("recstr").toString();
			List<ProcurementOrder> poList1=MyJsonUtil.str2list(recstr, ProcurementOrder.class);
			String u_name=params.get("u_name").toString();
			for(ProcurementOrder po:poList1){
				int qfbj=po.getQfbj();
				Date s_cgrq = po.getCgrq_top();
				if(qfbj==0){
					String sql=" update cghtb set qfbj=1,qfrm='"+u_name+"',qfsj=getdate() where htbh='"+po.getHtbh()+"'; ";
					if(s_cgrq==null){
						sql =" update cghtb set qfbj=1,qfrm='"+u_name+"',qfsj=getdate(),cgrq_top=getdate() where htbh='"+po.getHtbh()+"'; ";
					}
					params.put("sql",sql);
					purchaseDetailMapper.getStringFromSql(params);
					
					//任务上线时间表
					sql= " insert into rwsxsjb(htbh,htxh,clhh,cltx1,cltx2,cltx3,jhbh,jhxh,jhsx,zysx,rwsx) ";
					sql+=" select htmxb.htbh,htmxb.htxh,htmxb.clhh,htmxb.cltx1,'','',htmxb.jhbh,htmxb.jhxh, ";
					sql+="	 (select jhmxb.sxrq from jhmxb where jhmxb.jhbh=htmxb.jhbh and jhmxb.jhxh=htmxb.jhxh) as jhsx,  ";
					sql+="	 (select min(qsrq) from gxzyjhb with (nolock) where gxzyjhb.jhbh=htmxb.jhbh and gxzyjhb.jhxh=htmxb.jhxh and gxzyjhb.gxbh=isnull((select top 1 gxbh from scbomb with (nolock) where scbomb.jhbh=htmxb.jhbh and scbomb.jhxh=htmxb.jhxh and scbomb.clhh=htmxb.clhh and scbomb.cltx1=htmxb.cltx1),'')) as zysx, ";
					sql+="	 (select min(kgrq) from lltzdb with (nolock) left outer join scrwdb  with (nolock) on scrwdb.rwdh=lltzdb.rwdh where lltzdb.jhbh=htmxb.jhbh and lltzdb.jhxh=htmxb.jhxh and lltzdb.clhh=htmxb.clhh and lltzdb.cltx1=htmxb.cltx1) as rwsx ";
					sql+=" from htmxb with (nolock) ";
					sql+=" left outer join scjhb with (nolock) on htmxb.jhbh=scjhb.jhbh ";
					sql+=" where htmxb.htbh='"+po.getHtbh()+"' and htmxb.jhbh<>0 and scjhb.flbj=0;" ;
					params.put("sql",sql);
					purchaseDetailMapper.getStringFromSql(params);
					params.put("htbh", po.getHtbh());
					mapper.LoadTaskTime(params);
				}else{
					String sql=" update cghtb set qfbj=0,qfrm='"+u_name+"',qfsj=getdate() where htbh='"+po.getHtbh()+"'; ";
					if(s_cgrq==null){
						sql =" update cghtb set qfbj=0,qfrm='"+u_name+"',qfsj=getdate(),cgrq_top=getdate() where htbh='"+po.getHtbh()+"'; ";
					}
					params.put("sql",sql);
					purchaseDetailMapper.getStringFromSql(params);
					//删除上线时间表
					params.put("sql"," delete from rwsxsjb where htbh='"+po.getHtbh()+"'; ");
					purchaseDetailMapper.getStringFromSql(params);
				}
			}
		return json.toString();
	}
	
	/**
	 * 签发合同前验证
	 * Request purchaseorder/purchaseorder.act?method=getBeforIssue <br/><br/>
	 * @author wq
	 * @date 2016-04-21
	 */
	public String getBeforIssue(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recstr=params.get("recstr").toString();
			List<ProcurementOrder> poList1=MyJsonUtil.str2list(recstr, ProcurementOrder.class);
			String u_id=params.get("u_id").toString();
			String u_name=params.get("u_name").toString();
			int qfbj=poList1.get(0).getQfbj();
			String show="";
			String ls_row_kj="";
			for(ProcurementOrder po:poList1){
				if(po.getQfbj()!=qfbj){
					json.put("msg", "请选择签发标记一致的记录！");
					json.put("bool", false);
					return json.toString();
				}
				params.put("bills_id",po.getHtbh());
				List<Exclusive> excList=userMapper.getExclusiveList(params);
				String search=" and cghtb.qfbj = '"+po.getQfbj()+"' and cghtb.sdbj='"+po.getSdbj()+"' and cghtb.htbh='"+po.getHtbh()+"'";
				params.put("search", search);
				List<ProcurementOrder> poList=mapper.getPurchaseOrderList(params);
				if(poList.size()==0){
					json.put("msg", "数据验证不一致，请重试！");
					json.put("bool", false);
					json.put("sync", true);
					return json.toString();
				}
				if(excList.size()>0){
					json.put("msg", "合同编号为【"+po.getHtbh()+"】的单据【"+excList.get(0).getU_name()+"】正在编辑,请稍候重试！");
					json.put("bool", false);
					return json.toString();
				}
				if(po.getSdbj()!=1){
					json.put("msg", "合同编号为【"+po.getHtbh()+"】的合同未锁定,不允许签发！");
					json.put("bool", false);
					return json.toString();
				}
				params.put("sql","  select wbbh from csxxb where csbh = '"+po.getCsbh()+"' ");
				String s_wbbh=purchaseDetailMapper.getStringFromSql(params);
				if(s_wbbh==null){
					s_wbbh="";
				}else{
					s_wbbh=s_wbbh.trim();
				}
				String sql="";
				if(po.getQfbj()==0){
					sql=" select tpbj  from cglb_qxb where lbbh=left('"+po.getCglb()+"',len(lbbh)) and czy_gh='"+u_id+"'; ";
					params.put("sql",sql);
					String s_tpbj=purchaseDetailMapper.getStringFromSql(params);
					if(s_tpbj==null){
						s_tpbj="0";
					}
					if(Integer.parseInt(s_tpbj)==0){
						String ls_str_xh="";
						params.clear();
						params.put("htbh",po.getHtbh());
						List<PurchaseOrderDetail> prdList=purchaseOrderDetailMapper.getPurchaseOrderDetailList(params);
						for(PurchaseOrderDetail pod:prdList){
							params.put("csbh", po.getCsbh());
							params.put("clhh", pod.getClhh());
							params.put("cgsl", 0);
							params.put("wbbh", 0);
							/*double kzdj=0,fzdj=0;
							List<FunctionPurchaseCtl> fpcList=purchaseDetailMapper.getFunctionPurchaseCtl(params);
							if(fpcList.size()>0){
								FunctionPurchaseCtl fpc=fpcList.get(0);
								kzdj=fpc.getKzdj();
								fzdj=fpc.getFzkj();
							}
							if(pod.getKjlx()!=1){
								if(pod.getKzdj()!=kzdj){
									ls_row_kj=ls_row_kj+','+pod.getHtxh();
								}
							}else{
								if(pod.getKzdj()!=fzdj){
									ls_row_kj=ls_row_kj+','+pod.getHtxh();
								}
							}*/
							if(pod.getCgdj()==0){
								if(pod.getKzdj()==0){
									if(ls_str_xh.equals("")){
										ls_str_xh+=pod.getHtxh();
									}else{
										ls_str_xh+=","+pod.getHtxh();
									}
								}
							}else{
								// 1.采购合同，当合同类型为外协，合同签发时不检测，控制单价为空或者小于采购单价！
								if(!"外协".equals(po.getCglx())){
									if(!s_wbbh.equals("")){
										if(pod.getKzdj()==0||pod.getKzdj()<pod.getWbdj()){
											json.put("msg", "序号为【"+pod.getHtxh()+"】的合同明细控制单价为空或小于采购单价,不能签发!");
											json.put("bool", false);
											return json.toString();
										}
									}else{
										if(pod.getKzdj()==0||pod.getKzdj()<pod.getCgdj()){
											json.put("msg", "序号为【"+pod.getHtxh()+"】的合同明细控制单价为空或小于采购单价,不能签发!");
											json.put("bool", false);
											return json.toString();
										}
									}
								}
							}
						}
						/*if(!ls_row_kj.equals("")){
							json.put("msg", "合同编号为【"+po.getHtbh()+"】,合同序号为【"+ls_row_kj+"】的记录的控制单价与材料采购价格维护中的控价不一致！");
							json.put("bool", false);
							return json.toString();
						}*/
						if(!ls_str_xh.equals("")){
							show+="合同编号为【"+po.getHtbh()+"】,序号为【"+ls_str_xh+"】的合同明细控制单价为空!\n";
						}
					}
				}else{
					if(!u_name.equals(po.getQfrm().trim())&&!u_name.equals("admin")){
						json.put("msg", "合同编号为【"+po.getHtbh()+"】的单据签发人不一致,不能取消签发!");
						json.put("bool", false);
						return json.toString();
	    			}
					if(po.getDhrk()>0){
						json.put("msg", "该合同已有到货/入库数,不允许解签发!");
						json.put("bool", false);
						return json.toString();
					}
					params.put("sql"," select count(*)  from fksqsphtb where htbh='"+po.getHtbh()+"'; ");
					String countStr=purchaseDetailMapper.getStringFromSql(params);
					if(countStr==null){
						countStr="0";
					}
					if(Integer.parseInt(countStr)>0){
						json.put("msg", "合同已转付款申请,不能取消签发!");
						json.put("bool", false);
						return json.toString();
					}
				}
			}
			json.put("show",show);
		return json.toString();
	}
	/**
	 * 锁定合同前验证
	 * Request purchaseorder/purchaseorder.act?method=getBeforLock <br/><br/>
	 * @author wq
	 * @date 2016-04-20
	 */
	public String getBeforLock(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
			String recstr=params.get("recstr").toString();
			List<ProcurementOrder> poList1=MyJsonUtil.str2list(recstr, ProcurementOrder.class);
			int sdbj=poList1.get(0).getSdbj();
			for(ProcurementOrder po:poList1){
				params.put("bills_id",po.getHtbh());
				if(po.getSdbj()!=sdbj){
					json.put("msg", "请选择锁定标记一致的记录！");
					json.put("bool", false);
					return json.toString();
				}
				List<Exclusive> excList=userMapper.getExclusiveList(params);
				String search=" and cghtb.qfbj = '"+po.getQfbj()+"' and cghtb.sdbj='"+po.getSdbj()+"' and cghtb.htbh='"+po.getHtbh()+"'";
				params.put("search", search);
				if(excList.size()>0){
					json.put("msg", "合同编号为【"+po.getHtbh()+"】的单据【"+excList.get(0).getU_name()+"】正在编辑,请稍候重试！");
					json.put("bool", false);
					return json.toString();
				}
				List<ProcurementOrder> poList=mapper.getPurchaseOrderList(params);
				if(poList.size()==0){
					json.put("msg", "数据验证不一致，请重试！");
					json.put("bool", false);
					json.put("sync", true);
					return json.toString();
				}
				if(po.getQfbj()==1&&po.getSdbj()==1){
					json.put("msg", "合同编号为【"+po.getHtbh()+"】的单据已经签发，不允许解锁！");
					json.put("bool", false);
					return json.toString();
				}
				if(po.getSdbj()==0){
					double s1_cgsl,s1_ht_cgsl;			
					//要求对采计编号为4601、4570、4602的单子在转采购合同时加以控制，
					//控制采购数量不要超过采计数量的3％，控制只针对这三个单子，其他不控制。
					params.clear();
					params.put("htbh", po.getHtbh());
					List<PurchaseOrderDetail> podList=purchaseOrderDetailMapper.getPurchaseOrderDetailList(params);
					for(PurchaseOrderDetail pod: podList){
						int ls_cgbh=pod.getCgbh();
						int ls_cgxh=pod.getCgxh();
						
						if(ls_cgbh!=0){
							if(ls_cgbh==4601||ls_cgbh==4570||ls_cgbh==4602){
								params.put("sql"," select  round(sum(htmxb.cgsl),2)  from htmxb with (nolock) where cgbh='"+ls_cgbh+"' and  cgxh='"+ls_cgxh+"' ");
								String s1_ht_cgslStr=purchaseDetailMapper.getStringFromSql(params);
								if(s1_ht_cgslStr==null){
									s1_ht_cgslStr="0";
								}
								s1_ht_cgsl=Double.parseDouble(s1_ht_cgslStr);
								
								params.put("sql"," select  round(sum(cgjhmxb.cgsl),2)  from cgjhmxb where cgbh='"+ls_cgbh+"' and  cgxh='"+ls_cgxh+"'  ");
								String s2_cgslStr=purchaseDetailMapper.getStringFromSql(params);
								if(s2_cgslStr==null){
									s2_cgslStr="0";
								}
								s1_cgsl=DoubleCal.round(Double.parseDouble(s2_cgslStr)*1.03, 2);
								if (s1_ht_cgsl>s1_cgsl){ 
									 json.put("msg", "采计号为"+ls_cgbh+"-"+ls_cgxh+"的单子在转采购合同时,总采购数量超过采计数量的3％");
									 json.put("bool", false);
									 return json.toString();
								}
							}
						}
					}
				}
			}
		return json.toString();
	}
	/**
	* @Description: 产品描述导入
	* Request purchaseorder/purchaseorder.act?method=getProductDescImpList
	* Response {data:[{List<ProductDescImp>}]} <br/><br/>
	*/
	public List<ProductDescImp> getProductDescImpList(Map<String,Object> params) {
		return mapper.getProductDescImpList(params);
	}
	/**
	 * 
	* @Title: getProductDescImp
	* @Description: 2231 1.采购合同进入的编辑，产品描述导入，原ERP有数据，现在没数据
	* @param params
	* @return
	* @returnType String    
	* @author 舒飞
	* @date 2017-2-14下午3:45:31
	 */
	public String getProductDescImp(Map<String,Object> params) {
		String ls_cpms = "";
		List<ProductDescImp> list = mapper.getProductDescImpMsxx(params);
		for(int i=0;i<list.size();i++){
			ls_cpms += list.get(i).getMsxh()+"、"+list.get(i).getCpms()+"\n";
		}
		System.out.println(ls_cpms);
		if("".equals(ls_cpms)){
			List<ProductDescImp> list2 = mapper.getProductDescImpMsxx2(params);		
			for(int i=0;i<list2.size();i++){
				ls_cpms += list2.get(i).getMsxh()+"、"+list2.get(i).getCpms()+"\n";
			}
		}
		return ls_cpms;
	}
	/**
	* @Description: 采计导入
	* Request purchaseorder/purchaseorder.act?method=getPurPanelImpList
	* Response {data:[{List<PurPanelImp>}]} <br/><br/>
	*/
	public List<PurPanelImp> getPurPanelImpList(Map<String,Object> params) {
		return mapper.getPurPanelImpList(params);
	}
	/**
	* @Description: 采购订单总表CURD
	* Request purchaseorder/purchaseorder.act?method=*****
	* Response {data:[{List<PurchaseOrder>}]} <br/><br/>
	*/
	public List<ProcurementOrder> getPurchaseOrderList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String lbqx="and (";
		List<String>  cglbList=mapper.getPurAuthorityList(pa);
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
		return mapper.getPurchaseOrderList(params);
	}
	@Transactional
	public void addPurchaseOrder(ProcurementOrder[] arr) {
		for(ProcurementOrder obj: arr) {
			mapper.addPurchaseOrder(obj);
		}
	}
	@Transactional
	public void updatePurchaseOrder(ProcurementOrder[] arr) {
		for(ProcurementOrder obj: arr) {
			mapper.updatePurchaseOrder(obj);
		}
	}
	@Transactional
	public void deletePurchaseOrder(ProcurementOrder[] arr) {
		for(ProcurementOrder obj: arr) {
			mapper.deletePurchaseOrder(obj);
		}
	}
	public String getRecordId(Map<String,Object> params){
		return mapper.getRecordId(params);
	}
	public int getPur_Order_id(Map<String,Object> params){
		return mapper.getPur_Order_id(params);
	}
}
