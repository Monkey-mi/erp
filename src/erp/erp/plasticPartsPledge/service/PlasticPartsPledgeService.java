package erp.erp.plasticPartsPledge.service;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.erp.plasticPartsPledge.data.PlasticPartsPledgeInvoiceMapper;
import erp.erp.plasticPartsPledge.data.PlasticPartsPledgeMapper;
import erp.erp.plasticPartsPledge.model.PlasticPartsPledge;
import erp.erp.plasticPartsPledge.model.PlasticPartsPledgeInvoice;
import erp.erp.plasticPartsPledge.model.PlasticPartsPledgeInvoiceImp;
import erp.util.MyJsonUtil;


@Service
public class PlasticPartsPledgeService {
	@Autowired
	private PlasticPartsPledgeMapper mapper;//塑料件质押主表
	@Autowired
	private PlasticPartsPledgeInvoiceMapper plasticPartsPledgeInvoiceMapper;//塑料件质押发票表
	/**
	* @Title: getPlasticPartsPledgeList 
	* @Description: 获取塑料件质押主表数据
	* @param @param params
	* @param @return    设定文件 
	* @return List<PlasticPartsPledge>    返回类型 
	* @throws 
	* @author wuqia
	 */
	public List<PlasticPartsPledge> getPlasticPartsPledgeList(Map<String,Object> params) {
		return mapper.getPlasticPartsPledgeList(params);
	}
	/**
	* @Title: addPlasticPartsPledge 
	* @Description: 新增塑料件质押主表数据
	* @param @param arr    设定文件 
	* @return void    返回类型 
	* @throws 
	* @author wuqia
	 */
	@Transactional
	public void addPlasticPartsPledge(PlasticPartsPledge[] arr) {
		for(PlasticPartsPledge obj: arr) {
			mapper.addPlasticPartsPledge(obj);
		}
	}
	@Transactional
	public void updatePlasticPartsPledge(PlasticPartsPledge[] arr) {
		for(PlasticPartsPledge obj: arr) {
			mapper.updatePlasticPartsPledge(obj);
		}
	}
	@Transactional
	public void deletePlasticPartsPledge(PlasticPartsPledge[] arr) {
		for(PlasticPartsPledge obj: arr) {
			mapper.deletePlasticPartsPledge(obj);
			//级联删除明细
			plasticPartsPledgeInvoiceMapper.deletePlasticPartsPledgeInvoiceByZydh(obj);
		}
	}
	public List<PlasticPartsPledgeInvoice> getPlasticPartsPledgeInvoiceList(Map<String,Object> params) {
		return plasticPartsPledgeInvoiceMapper.getPlasticPartsPledgeInvoiceList(params);
	}
	@Transactional
	public void addPlasticPartsPledgeInvoice(PlasticPartsPledgeInvoice[] arr) {
		for(PlasticPartsPledgeInvoice obj: arr) {
			plasticPartsPledgeInvoiceMapper.addPlasticPartsPledgeInvoice(obj);
		}
	}
	@Transactional
	public void updatePlasticPartsPledgeInvoice(PlasticPartsPledgeInvoice[] arr) {
		for(PlasticPartsPledgeInvoice obj: arr) {
			plasticPartsPledgeInvoiceMapper.updatePlasticPartsPledgeInvoice(obj);
		}
	}
	@Transactional
	public void deletePlasticPartsPledgeInvoice(PlasticPartsPledgeInvoice[] arr) {
		for(PlasticPartsPledgeInvoice obj: arr) {
			plasticPartsPledgeInvoiceMapper.deletePlasticPartsPledgeInvoice(obj);
		}
	}
	/**
	* @Title: getPlasticPartsPledgeInvoiceImpList 
	* @Description: 获取导入数据
	* @param @param params
	* @param @return    设定文件 
	* @return List<PlasticPartsPledgeInvoiceImp>    返回类型 
	* @throws 
	* @author wuqia
	 */
	public List<PlasticPartsPledgeInvoiceImp> getPlasticPartsPledgeInvoiceImpList(Map<String,Object> params) {
		return plasticPartsPledgeInvoiceMapper.getPlasticPartsPledgeInvoiceImpList(params);
	}
	
	/**
	* @Title: getBeforSave 
	* @Description: 保存前验证
	* @param @param params
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	public String getBeforSave(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String recstr=params.get("recstr").toString();
			List<PlasticPartsPledgeInvoice> ppiList=MyJsonUtil.str2list(recstr, PlasticPartsPledgeInvoice.class);
			int count=1;
			for(PlasticPartsPledgeInvoice ppi:ppiList){
				params.put("fplb", ppi.getFplb());
				params.put("fphm", ppi.getFphm());
				String s_wqjeStr=plasticPartsPledgeInvoiceMapper.getApplicationsAmount(params);
				double s_wqje=Double.parseDouble(s_wqjeStr);
				if(ppi.getZyje()>s_wqje){
					json.put("bool", false);
					json.put("msg", "第【"+count+"】行记录的质押金额超出未申请金额"+(ppi.getZyje() - s_wqje));
					return json.toString();
				}
				count++;
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "保存验证时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	* @Title: getBeforState 
	* @Description: 判断操作时数据是否最新
	* @param @param params
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	public String getBeforState(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String recstr=params.get("recstr").toString();
			List<PlasticPartsPledge> ppiList=MyJsonUtil.str2list(recstr, PlasticPartsPledge.class);
			for(PlasticPartsPledge ppp:ppiList){
				params.put("zydh", ppp.getZydh());
				List<PlasticPartsPledge> pppList1=getPlasticPartsPledgeList(params);
				for(PlasticPartsPledge ppp1:pppList1){
					if(ppp.getSdbj()!=ppp1.getSdbj()||ppp.getShbj()!=ppp1.getShbj()||ppp.getJybj()!=ppp1.getJybj()){
						json.put("sync", true);
						return json.toString();
					}
				}
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "数据验证出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	* @Title: getBeforDel 
	* @Description: 删除前验证
	* @param @param params
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	public String getBeforDel(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String recstr=params.get("recstr").toString();
			List<PlasticPartsPledge> ppiList=MyJsonUtil.str2list(recstr, PlasticPartsPledge.class);
			for(PlasticPartsPledge ppp:ppiList){
				params.put("zydh", ppp.getZydh());
				List<PlasticPartsPledge> pppList1=getPlasticPartsPledgeList(params);
				for(PlasticPartsPledge ppp1:pppList1){
					if(ppp.getSdbj()!=ppp1.getSdbj()||ppp.getShbj()!=ppp1.getShbj()||ppp.getJybj()!=ppp1.getJybj()){
						json.put("sync", true);
						return json.toString();
					}
				}
				if(ppp.getSdbj()==1){
					json.put("bool", false);
					json.put("msg", "质押单号为【"+ppp.getZydh()+"】的单据已锁定，不能删除！");
					return json.toString();
				}
				if(ppp.getShbj()==1){
					json.put("bool", false);
					json.put("msg", "质押单号为【"+ppp.getZydh()+"】的单据已审核，不能删除！");
					return json.toString();
				}
			}
			
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "删除前验证时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	* @Title: getDelState 
	* @Description: 删除
	* @param @param params
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	@Transactional
	public String getDelState(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			mapper.deletePlasticPartsPledgeByZydh(params);
			plasticPartsPledgeInvoiceMapper.deletePlasticPartsPledgeInvoiceByZydhOne(params);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "删除前验证时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	* @Title: getBeforLock 
	* @Description:	锁定前验证
	* @param @param params
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	public String getBeforLock(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String recstr=params.get("recstr").toString();
			List<PlasticPartsPledge> ppiList=MyJsonUtil.str2list(recstr, PlasticPartsPledge.class);
			for(PlasticPartsPledge ppp:ppiList){
				params.put("zydh", ppp.getZydh());
				List<PlasticPartsPledge> pppList1=getPlasticPartsPledgeList(params);
				for(PlasticPartsPledge ppp1:pppList1){
					if(ppp.getSdbj()!=ppp1.getSdbj()||ppp.getShbj()!=ppp1.getShbj()||ppp.getJybj()!=ppp1.getJybj()){
						json.put("sync", true);
						return json.toString();
					}
				}
				if(ppp.getJybj()==0){
					if(ppp.getSdbj()==1){
						if(ppp.getShbj()==1){
							json.put("bool", false);
							json.put("msg", "质押单号为【"+ppp.getZydh()+"】的单据已审核，请解审后解锁！");
							return json.toString();
						}
					}
				}else{
					json.put("bool", false);
					json.put("msg", "质押单号为【"+ppp.getZydh()+"】的单据已解押！");
					return json.toString();
				}
			}
			
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "审核前验证时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	* @Title: getBeforAudit 
	* @Description: 审核前验证 
	* @param @param params
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	public String getBeforAudit(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String recstr=params.get("recstr").toString();
			List<PlasticPartsPledge> ppiList=MyJsonUtil.str2list(recstr, PlasticPartsPledge.class);
			for(PlasticPartsPledge ppp:ppiList){
				params.put("zydh", ppp.getZydh());
				List<PlasticPartsPledge> pppList1=getPlasticPartsPledgeList(params);
				for(PlasticPartsPledge ppp1:pppList1){
					if(ppp.getSdbj()!=ppp1.getSdbj()||ppp.getShbj()!=ppp1.getShbj()||ppp.getJybj()!=ppp1.getJybj()){
						json.put("sync", true);
						return json.toString();
					}
				}
				if(ppp.getJybj()==0){
					if(ppp.getShbj()==0&&ppp.getSdbj()==0){
						json.put("bool", false);
						json.put("msg", "质押单号为【"+ppp.getZydh()+"】的单据未锁定，，请锁定后审核！");
						return json.toString();
					}
				}else{
					if(ppp.getShbj()==1){
						json.put("bool", false);
						json.put("msg", "质押单号为【"+ppp.getZydh()+"】的单据已解押,不能解审！");
						return json.toString();
					}
				}
			}
			
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "审核前验证时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	* @Title: getBeforUncoil 
	* @Description: 解押前验证
	* @param @param params
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	public String getBeforUncoil(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String recstr=params.get("recstr").toString();
			List<PlasticPartsPledge> ppiList=MyJsonUtil.str2list(recstr, PlasticPartsPledge.class);
			for(PlasticPartsPledge ppp:ppiList){
				params.put("zydh", ppp.getZydh());
				List<PlasticPartsPledge> pppList1=getPlasticPartsPledgeList(params);
				for(PlasticPartsPledge ppp1:pppList1){
					if(ppp.getSdbj()!=ppp1.getSdbj()||ppp.getShbj()!=ppp1.getShbj()||ppp.getJybj()!=ppp1.getJybj()){
						json.put("sync", true);
						return json.toString();
					}
				}
				if(ppp.getShbj()==0&&ppp.getJybj()==0){
					json.put("bool", false);
					json.put("msg", "质押单号为【"+ppp.getZydh()+"】的质押单未审核，请审核后解押！");
					return json.toString();
				}
				
			}
			
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "审核前验证时出现异常，请重试！");
		}
		return json.toString();
	}
	/**
	* @Title: getChangeState 
	* @Description: 修改标记
	* @param @param params
	* @param @return    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author wuqia
	 */
	@Transactional
	public String getChangeState(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			mapper.updatePlasticPartsPledgeState(params); 
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "修改标记时出现异常，请重试！");
		}
		return json.toString();
	}
}
