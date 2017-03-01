package srm.supplierAccess.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import srm.supplier.data.AttchedMapper;
import srm.supplier.data.BankAccountMapper;
import srm.supplier.data.CompetitorMapper;
import srm.supplier.data.DevicelistMapper;
import srm.supplier.data.GoodsMapper;
import srm.supplier.data.InvoiceTitleMapper;
import srm.supplier.data.MainCustomerMapper;
import srm.supplier.data.MetarialMapper;
import srm.supplier.data.SupplierFileMapper;
import srm.supplier.model.Attched;
import srm.supplier.model.BankAccount;
import srm.supplier.model.Competitor;
import srm.supplier.model.Devicelist;
import srm.supplier.model.Goods;
import srm.supplier.model.InvoiceTitle;
import srm.supplier.model.MainCustomer;
import srm.supplier.model.Metarial;
import srm.supplier.model.SupplierCheckfactoryReport;
import srm.supplier.model.SupplierFile;
import srm.supplier.model.SupplierMaterialcheck;
import srm.supplierAccess.data.SupplierAccessScoreMapper;
import srm.supplierAccess.data.SupplierAccessScoreSummaryMapper;
import srm.supplierAccess.model.PfAuthcationInfo;
import srm.supplierAccess.model.PfAuthcationUpdate;
import srm.supplierAccess.model.SubAccount;
import srm.supplierAccess.model.SupplierAccessScore;
import srm.supplierAccess.model.SupplierAccessScoreSummary;
import srm.supplierAccess.model.SupplierFileOut;
import com.outsideasy.ws.common.vo.CXFRequestException;
import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.contract.SynergyUrgeSyncInter;
import com.outsideasy.ws.erp.supplier.SupplierAccessInter;
import com.outsideasy.ws.erp.supplier.SupplierInter;
import erp.common.TreeModel;
import erp.erp.purchaseOrder.model.ProcurementOrder;
import erp.erp.purchaseOrder.model.PurchaseOrderDetail;
import erp.util.Const;
import erp.util.FileUtil;
import erp.util.MyJsonUtil;
import erp.util.WebUtil;

@Service
public class WsCommonService {
	@Autowired
	private AttchedMapper attchedMapper;
	@Autowired
	private BankAccountMapper bankAccountMapper;
	@Autowired
	private InvoiceTitleMapper invoiceTitleMapper;
	@Autowired
	private CompetitorMapper competitorMapper;
	@Autowired
	private MainCustomerMapper mainCustomerMapper;
	@Autowired
	private GoodsMapper goodsMapper;
	@Autowired
	private MetarialMapper metarialMapper;
	@Autowired
	private DevicelistMapper devicelistMapper;
	@Autowired
	private SupplierInter supplierInter;
	@Autowired 
	private SupplierAccessInter supplierAccessInter;
	@Autowired
	private SupplierFileMapper supplierFileMapper;
	@Autowired
	private SupplierAccessScoreSummaryMapper supplierAccessScoreSummaryMapper;
	@Autowired
	private SupplierAccessScoreMapper supplierAccessScoreMapper;
	/**
	* @Description: 获取 验厂报告 附件表
	* @param  
	* Request supplierAccess/common.srm?method=getPfSupplierCheckfactoryReportList
	* Response {data:[{List<SupplierCheckfactoryReport>}]} <br/><br/>
	* @author wq 
	* @date 2016-08-20
	*/
	public List<SupplierCheckfactoryReport> getPfSupplierCheckfactoryReportList(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getPfSupplierCheckfactoryReportList(jsonmap);
		CXFResponse<SupplierCheckfactoryReport> sf=MyJsonUtil.str2CXFResponse(result, SupplierCheckfactoryReport.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	
	public String getDeletePfSupplierCheck(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String jsonmap=MyJsonUtil.obj2string(params);
			supplierInter.deletePfSupplierCheckfactoryReportByWs(jsonmap);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace(); 
			json.put("msg", "验厂报告删除失败！");
		}
		return json.toString();
	}
	/**
	* @Description: 获取 物料确认附件表
	* @param  
	* Request supplierAccess/common.srm?method=getPfSupplierMaterialcheckList
	* Response {data:[{List<SupplierMaterialcheck>}]} <br/><br/>
	* @author wq 
	* @date 2016-08-20
	*/
	public List<SupplierMaterialcheck> getPfSupplierMaterialcheckList(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getPfSupplierMaterialcheckList(jsonmap);
		CXFResponse<SupplierMaterialcheck> sf=MyJsonUtil.str2CXFResponse(result, SupplierMaterialcheck.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**
	 * 
	* @Title: 厂商档案 物料确认删除
	* @Description: supplierAccess/common.srm?method=getDeletePfSupplierMaterialcheck
	* @param params
	* @returnType void    
	* @author 舒飞
	* @date 2017-2-22下午1:53:15
	 */
	public String getDeletePfSupplierMaterialcheck(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String jsonmap=MyJsonUtil.obj2string(params);
			supplierInter.deletePfSupplierMaterialcheckByWS(jsonmap);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace(); 
			json.put("msg", "物料确认删除失败！");
		}
		return json.toString();
	}
	/**@Description: 准入受理
	 * @param 流水id record_id
	 * 	        准入状态 access_status
	 * 	         审核意见 audit_opinion
	 * 	         公司id company_id
	 *     	管理账户id login_id
	 * Request supplierAccess/common.srm?method=getSupplierAccessChange
	 * Response {data:[{List<SubAccount>}]} <br/><br/>
	 * @author 伍恰
	 * @throws IOException 
	 * @date 2016-08-19
	 * */
	@Transactional
	public String getSupplierAccessChange(Map<String,Object> params) throws IOException{
		String recstr=params.get("records").toString();
		List<SupplierFile> spList=MyJsonUtil.str2list(recstr, SupplierFile.class);
		String access_status=params.get("access_status").toString();
		String record_ids="";
		for(int i=0;i<spList.size();i++){
			record_ids+="'"+spList.get(i).getCompany_id()+"'";
			//判断是否重复导入
			String sql=" select count (1) from t_supplier_file where record_id = '"+spList.get(i).getCompany_id()+"' and is_delete = 0 " ;
			params.put("sql", sql);
			String countStr=supplierFileMapper.getStringFromSql(params);
			if(countStr==null){
				countStr="0";
			}
			if(Integer.parseInt(countStr)>0){
				params.put("bool", false);
				params.put("msg", spList.get(i).getCpyname_cn()+"已经是供应商不能重复导入！");
				return MyJsonUtil.obj2string(params);
			}
		}
		params.remove("records");
		params.put("record_id", record_ids);
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getPfSupplierAccessChange(jsonmap);
		CXFResponse<SubAccount> sf=MyJsonUtil.str2CXFResponse(result, SubAccount.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			//如果接口调用正常将准入及相关信息插入
			Map<String,Object> accept=sf.getParams();
			String accmessage=accept.get("message")==null?"":accept.get("message").toString();
			if(!accmessage.equals("")){
				params.put("bool", false);
				params.put("msg", accmessage);
				return MyJsonUtil.obj2string(params);
			}
			if(accept.get("bool")!=null&&accept.get("bool").toString().equals("true")){
				if(access_status.equals("3")){
					//将各个准入信息 插入厂商信息档案
					for(SupplierFile sp:spList){
						//企业类型转换
						String sql=" select nature_id from t_company_class where nature_name like '%"+sp.getNature_name() +"%'" ;
						params.put("sql", sql);
						String nature_id=supplierFileMapper.getStringFromSql(params);
						if(nature_id!=null){
							sp.setNature_id(nature_id);
						}
						sp.setRecord_id(sp.getCompany_id());
						sp.setApply_sts("10");
						supplierFileMapper.addSupplierFile(sp);
						Map<String,Object> para=new HashMap<String, Object>();
						para.put("record_id", sp.getRecord_id());
						//导入主要设备信息
						List<Devicelist> devList=getAccDeviceOutList(para);
						for(Devicelist dev :devList){
							dev.setDevice_out_id(dev.getDevice_id());
							dev.setCompany_id(sp.getCompany_id());
							devicelistMapper.addDevicelist(dev);
						}
						//导入原材料及品牌
						List<Metarial> metList=getAccMetarialOutList(para);
						for(Metarial met :metList){
							met.setMetarial_out_id(met.getMaterial_id());
							met.setCompany_id(sp.getCompany_id());
							metarialMapper.addMetarial(met);
						}
						//导入公司主要产品
						List<Goods> godList=getAccGoodsOutList(para);
						for(Goods obj :godList){
							obj.setGoods_out_id(obj.getGoods_id());
							obj.setCompany_id(sp.getCompany_id());
							goodsMapper.addGoods(obj);
						}
						//公司主要客户
						List<MainCustomer> mainCuSList= getAccMainCustomerOutList(para);
						for(MainCustomer obj :mainCuSList){
							obj.setCustomer_out_id(obj.getCustomer_id());
							obj.setCompany_id(sp.getCompany_id());
							mainCustomerMapper.addMainCustomer(obj);
						}
						//公司主要竞争对手
						List<Competitor> comList =getAccCompetitorOutList(para);
						for(Competitor obj :comList){
							obj.setCompetitor_out_id(obj.getCompetitor_id());
							obj.setCompany_id(sp.getCompany_id());
							competitorMapper.addCompetitor(obj);
						}
						//银行帐号
						List<BankAccount> baList=getAccBankAccountOutList(para);
						for(BankAccount obj :baList){
							obj.setAccount_out_id(obj.getAccount_id());
							obj.setCompany_id(sp.getCompany_id());
							bankAccountMapper.addBankAccount(obj);
						}
						//发票抬头
						List<InvoiceTitle> iTList=getAccInvoiceTitleOutList(para);
						for(InvoiceTitle obj :iTList){
							obj.setInvoice_out_id(obj.getInvoice_title_id());
							obj.setCompany_id(sp.getCompany_id());
							invoiceTitleMapper.addInvoiceTitle(obj);
						}
						/** 上传路径*/
						String uploadFolderPath = WebUtil.getUpLoadFileRoot();
						//认证文件导入
						List<Attched> attList=getAccAttchedOutList(para);
						for(Attched obj :attList){
							obj.setCompany_id(sp.getCompany_id());
							String file_name=obj.getFile_name();
							String originalName=obj.getFile_name();
							String newName="";
							SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmss");
							if(originalName.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
			                	newName=file_name+df.format(new Date())+originalName.substring(originalName.lastIndexOf("."));
			                }else{
			                	newName=file_name+df.format(new Date())+obj.getFile_format();
			                }
							String partPath=WebUtil.getPartPath();
							//中间部分自定义文件路径
				            String partfolder=partPath+"/"+sp.getCompany_id()+"/";//getpartPathfolder(company_id);
				           //文件存放路径
				            String folder=uploadFolderPath+partfolder;
				            File newFile = new File(folder);
				            /*if(!newFile.exists()){
				              newFile.mkdirs();
				            }*/
							String file_path=folder+newName;
							//
							byte[] b=supplierAccessInter.retrieveFileOne(obj.getMogodb_id());
							//将文件存入
							FileUtil.byteToFile(b, file_path);
				            obj.setFile_path(partfolder+newName);
							attchedMapper.addAttched(obj);
						}
					}
				}
			}
			params.putAll(sf.getParams());
			return MyJsonUtil.obj2string(params);
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取子账户列表
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getPfSubAccout
	 * Response {data:[{List<SubAccount>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<SubAccount> getPfSubAccout(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getPfSubAccout(jsonmap);
		CXFResponse<SubAccount> sf=MyJsonUtil.str2CXFResponse(result, SubAccount.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description:准入邀请
	 * @param 参数:供应商名称 companyStr 字符串 以;为分隔符
	 * 		    提交邀请的供应商id companyId
	 * Request supplierAccess/common.srm?method=getAccessInvite
	 * Response {data:[{String}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-05-19
	 * */
	public String getAccessInvite(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccessInvite(jsonmap);
		CXFResponse<String> sf=MyJsonUtil.str2CXFResponse(result, String.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return MyJsonUtil.obj2string(params);
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description:审批历史信息
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getPfAuthcationInfoList
	 * Response {data:[{List<PfAuthcationInfo>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-05-19
	 * */
	public List<PfAuthcationInfo> getPfAuthcationInfoList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierAccessInter.getPfAuthcationInfoList(jsonmap);
		CXFResponse<PfAuthcationInfo> sf=MyJsonUtil.str2CXFResponse(result, PfAuthcationInfo.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 供应商变更状态
	 * @param company_ids
	 * Request supplierAccess/common.srm?method=updateSupplierChangeStateByWS
	 * Response {data:[{String}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-05-17
	 * */
	public String updateSupplierChangeStateByWS(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String jsonmap=MyJsonUtil.obj2string(params);
			supplierAccessInter.updateSupplierChangeStateByWS(jsonmap);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace(); 
			json.put("msg", "供应商变更状态时出现异常，请重试！");
		}
		return json.toString();
	}
	/**@Description: 获取变更信息
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getPfAuthcationUpdateList
	 * Response {data:[{List<PfAuthcationUpdate>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-05-16
	 * */
	public List<PfAuthcationUpdate> getPfAuthcationUpdateList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierAccessInter.getPfAuthcationUpdateList(jsonmap);
		CXFResponse<PfAuthcationUpdate> sf=MyJsonUtil.str2CXFResponse(result, PfAuthcationUpdate.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 修改供应商状态
	 * @param company_ids
	 * Request supplierAccess/common.srm?method=updateSupplierFileStateByWS
	 * Response {data:[{String}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-05-12
	 * */
	public String updateSupplierFileStateByWS(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String jsonmap=MyJsonUtil.obj2string(params);
			supplierInter.updateSupplierFileStateByWS(jsonmap);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace(); 
			json.put("msg", "修改供应商状态时出现异常，请重试！");
		}
		return json.toString();
	}
	
	
	/**@Description: 提交相关信息至云平台
	 * 
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getSubmitWs
	 * Response {data:[{String}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-06
	 * */
	public String getSubmitWs(Map<String,Object> params){
		
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String ids=params.get("ids").toString();
			String []id=ids.split(",");
			List<SupplierFile> updateList=new ArrayList<SupplierFile>();
			List<SupplierAccessScore> addList=new ArrayList<SupplierAccessScore>();
			for(String c_id:id){
				params.put("company_id", c_id);
				List<SupplierFile> sfList=supplierFileMapper.getSupplierFileByID(params);
				SupplierFile sf=sfList.get(0);
				List<SupplierAccessScoreSummary> sassList=supplierAccessScoreSummaryMapper.getSupplierAccessScoreSummaryList(params);
				for(SupplierAccessScoreSummary sass:sassList){
					if(sass.getFitem_id()==1){
						sf.setManage_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==2){
						sf.setImprove_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==3){
						sf.setArea_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==4){
						sf.setExploit_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==5){
						sf.setStorage_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==6){
						sf.setEqu_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==7){
						sf.setTec_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==8){
						sf.setPro_file_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==9){
						sf.setResearch_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==10){
						sf.setReject_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==11){
						sf.setQuality_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==12){
						sf.setQc_score(sass.getRealmum());
					}
					if(sass.getFitem_id()==13){
						sf.setFilesave_score(sass.getRealmum());
					}
				}
				updateList.add(sf);
				//清空对应厂商打分表
				String jsonlist=MyJsonUtil.obj2string(params);
				supplierAccessInter.deletePfSupplierAccessScoreForCompanyId(jsonlist);
				//获取已打分情况
				List<SupplierAccessScore> sasList=supplierAccessScoreMapper.getSupplierAccessScoreList(params);
				addList.addAll(sasList);
			}
			//修改供应商相关信息
			String update=MyJsonUtil.obj2string(updateList);
			String add=MyJsonUtil.obj2string(addList);
			supplierInter.updateSupplierFileIn(update);
			supplierAccessInter.addPfSupplierAccessScore(add);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace(); 
			json.put("msg", "提交时出现异常，请重试！");
		}
		return json.toString();
	}
	/**@Description: 获取  准入申请附件
	 * @param record_id
	 * Request supplierAccess/common.srm?method=getAccAttchedOutList
	 * Response {data:[{List<Attched>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-08-19
	 * */
	public List<Attched> getAccAttchedOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccAttchedOutList(jsonmap);
		CXFResponse<Attched> sf=MyJsonUtil.str2CXFResponse(result, Attched.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取附件
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getAttchedOutList
	 * Response {data:[{List<Attched>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-05
	 * */
	public List<Attched> getAttchedOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAttchedOutList(jsonmap);
		CXFResponse<Attched> sf=MyJsonUtil.str2CXFResponse(result, Attched.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 准入邀请获取设备明细
	 * @param record_id
	 * Request supplierAccess/common.srm?method=getAccDeviceOutList
	 * Response {data:[{List<Devicelist>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<Devicelist> getAccDeviceOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccDeviceOutList(jsonmap);
		CXFResponse<Devicelist> sf=MyJsonUtil.str2CXFResponse(result, Devicelist.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取设备明细
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getDeviceOutList
	 * Response {data:[{List<Devicelist>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<Devicelist> getDeviceOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getDeviceOutList(jsonmap);
		CXFResponse<Devicelist> sf=MyJsonUtil.str2CXFResponse(result, Devicelist.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取 准入申请 原材料
	 * @param record_id
	 * Request supplierAccess/common.srm?method=getAccMetarialOutList
	 * Response {data:[{List<Metarial>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-08-19
	 * */
	public List<Metarial> getAccMetarialOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccMetarialOutList(jsonmap);
		CXFResponse<Metarial> sf=MyJsonUtil.str2CXFResponse(result, Metarial.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取原材料
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getMetarialOutList
	 * Response {data:[{List<Metarial>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<Metarial> getMetarialOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getMetarialOutList(jsonmap);
		CXFResponse<Metarial> sf=MyJsonUtil.str2CXFResponse(result, Metarial.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取准入申请 公司主要产品
	 * @param record_id
	 * Request supplierAccess/common.srm?method=getAccGoodsOutList
	 * Response {data:[{List<Goods>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-08-19
	 * */
	public List<Goods> getAccGoodsOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccGoodsOutList(jsonmap);
		CXFResponse<Goods> sf=MyJsonUtil.str2CXFResponse(result, Goods.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取公司主要产品
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getGoodsOutList
	 * Response {data:[{List<Goods>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<Goods> getGoodsOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getGoodsOutList(jsonmap);
		CXFResponse<Goods> sf=MyJsonUtil.str2CXFResponse(result, Goods.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取准入申请公司主要客户
	 * @param record_id
	 * Request supplierAccess/common.srm?method=getAccMainCustomerOutList
	 * Response {data:[{List<MainCustomer>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-08-19
	 * */
	public List<MainCustomer> getAccMainCustomerOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccMainCustomerOutList(jsonmap);
		CXFResponse<MainCustomer> sf=MyJsonUtil.str2CXFResponse(result, MainCustomer.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取公司主要客户
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getMainCustomerOutList
	 * Response {data:[{List<MainCustomer>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<MainCustomer> getMainCustomerOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getMainCustomerOutList(jsonmap);
		CXFResponse<MainCustomer> sf=MyJsonUtil.str2CXFResponse(result, MainCustomer.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取准入申请公司主要竞争对手
	 * @param record_id
	 * Request supplierAccess/common.srm?method=getCompetitorOutList
	 * Response {data:[{List<Competitor>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-08-19
	 * */
	public List<Competitor> getAccCompetitorOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccCompetitorOutList(jsonmap);
		CXFResponse<Competitor> sf=MyJsonUtil.str2CXFResponse(result, Competitor.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 获取公司主要竞争对手
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getCompetitorOutList
	 * Response {data:[{List<Competitor>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<Competitor> getCompetitorOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getCompetitorOutList(jsonmap);
		CXFResponse<Competitor> sf=MyJsonUtil.str2CXFResponse(result, Competitor.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 准入申请银行帐号
	 * @param record_id
	 * Request supplierAccess/common.srm?method=getAccBankAccountOutList
	 * Response {data:[{List<BankAccount>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-08-19
	 * */
	public List<BankAccount> getAccBankAccountOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccBankAccountOutList(jsonmap);
		CXFResponse<BankAccount> sf=MyJsonUtil.str2CXFResponse(result, BankAccount.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 银行帐号
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getBankAccountOutList
	 * Response {data:[{List<BankAccount>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<BankAccount> getBankAccountOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getBankAccountOutList(jsonmap);
		CXFResponse<BankAccount> sf=MyJsonUtil.str2CXFResponse(result, BankAccount.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	
	/**@Description: 发票抬头
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getInvoiceTitleOutList
	 * Response {data:[{List<BankAccount>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-04-01
	 * */
	public List<InvoiceTitle> getInvoiceTitleOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getInvoiceTitleOutList(jsonmap);
		CXFResponse<InvoiceTitle> sf=MyJsonUtil.str2CXFResponse(result, InvoiceTitle.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**@Description: 准入邀请发票抬头
	 * @param company_id
	 * Request supplierAccess/common.srm?method=getAccInvoiceTitleOutList
	 * Response {data:[{List<BankAccount>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-08-19
	 * */
	public List<InvoiceTitle> getAccInvoiceTitleOutList(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccInvoiceTitleOutList(jsonmap);
		CXFResponse<InvoiceTitle> sf=MyJsonUtil.str2CXFResponse(result, InvoiceTitle.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**	@Description: 获取准入评估项树结构,只取第一层
	 * @param  node 主键(也是指定节点)
	 * Request supplierAccess/common.srm?method=getEvaluateItemTree
	 * Response {data:[{List<TreeModel>}]} <br/><br/>
	 * @author 伍恰
	 * @date 2016-03-31
	 * */
	public List<TreeModel> getEvaluateItemTree(Map<String,Object> params){
		String jsonmap=MyJsonUtil.obj2string(params);
		List<TreeModel> stlist=MyJsonUtil.str2list(supplierAccessInter.getEvaluateItemTree(jsonmap), TreeModel.class);
		return stlist;
	}
	/**
	* @Description: 获取分数
	* @param  node 主键(也是指定节点)
	* Request supplierAccess/common.srm?method=getSupplierAccessScoreList
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author 伍恰
	* @date 2016-03-31
	* */
	public List<SupplierAccessScore> getSupplierAccessScoreList(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		List<SupplierAccessScore> stlist=MyJsonUtil.str2list(supplierInter.getMaterialLevelTree(jsonmap), SupplierAccessScore.class);
		return stlist;
	}
	/**
	* @Description: 获取等级树
	* @param  node 主键(也是指定节点)
	* Request supplierAccess/common.srm?method=getMaterialLevelTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author 伍恰
	* @date 2016-03-25
	*/
	public List<TreeModel> getMaterialLevelTree(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		List<TreeModel> stlist=MyJsonUtil.str2list(supplierInter.getMaterialLevelTree(jsonmap), TreeModel.class);
		return stlist;
	}
	/**
	* @Description: 获取  树
	* @param  node 主键(也是指定节点)
	* Request supplierAccess/common.srm?method=getMaterialClassTree
	* Response {data:[{List<TreeModel>}]} <br/><br/>
	* @author wq 
	* @date 2016-03-25
	*/
	public List<TreeModel> getMaterialClassTree(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		List<TreeModel> stlist=MyJsonUtil.str2list(supplierInter.getMaterialClassTree(jsonmap), TreeModel.class);
		return stlist;
	}
	/**
	* @Description: 获取厂商信息
	* @param  
	* Request supplierAccess/common.srm?method=getSupplierFileList
	* Response {data:[{List<SupplierFile>}]} <br/><br/>
	* @author wq 
	* @date 2016-03-25
	*/
	public List<SupplierFileOut> getSupplierFileList(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getSupplierFileOutList(jsonmap);
		CXFResponse<SupplierFileOut> sf=MyJsonUtil.str2CXFResponse(result, SupplierFileOut.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
	/**
	* @Description: 获取准入申请信息
	* @param  
	* Request supplierAccess/common.srm?method=getAccessApplicationRecord
	* Response {data:[{List<SupplierFile>}]} <br/><br/>
	* @author wq 
	* @date 2016-08-04
	*/
	public List<SupplierFileOut> getAccessApplicationRecord(Map<String,Object> params) {
		String jsonmap=MyJsonUtil.obj2string(params);
		String result=supplierInter.getAccessApplicationRecord(jsonmap);
		CXFResponse<SupplierFileOut> sf=MyJsonUtil.str2CXFResponse(result, SupplierFileOut.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
	}
}
