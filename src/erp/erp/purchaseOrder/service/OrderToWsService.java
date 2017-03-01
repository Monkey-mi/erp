 package erp.erp.purchaseOrder.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import srm.supplier.model.SupplierCheckfactoryReport;

import com.outsideasy.ws.common.vo.CXFRequestException;
import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.contract.ContractSyncInter;
import com.outsideasy.ws.erp.contract.SynergyUrgeSyncInter;
import com.outsideasy.ws.erp.supplier.SupplierAccessInter;

import erp.erp.purchaseOrder.data.PurchaseFileMapper;
import erp.erp.purchaseOrder.data.PurchaseOrderMapper;
import erp.erp.purchaseOrder.model.ERPSRMPODetial;
import erp.erp.purchaseOrder.model.ERPSRMpurchaseOrder;
import erp.erp.purchaseOrder.model.POOUTcd;
import erp.erp.purchaseOrder.model.PfContractAttachment;
import erp.erp.purchaseOrder.model.PurchaseFile;
import erp.erp.purchaseOrder.model.PurchaseOrderDetail;
import erp.erp.purchaseUrge.data.PurchaseUrgeMapper;
import erp.erp.purchaseUrge.model.OrderDeliveryNoticedetails;
import erp.util.Const;
import erp.util.FileUtil;
import erp.util.FtpParam;
import erp.util.MyJsonUtil;

@Lazy
@Service
public class OrderToWsService {
	@Autowired
	private PurchaseOrderMapper mapper;
	@Autowired 
	private ContractSyncInter contractSyncInter;
	@Autowired
	private PurchaseFileMapper pfmapper;
	@Transactional
	public String UpOrderAttachment(Map<String,Object> params) throws Exception{
		JSONObject json=new JSONObject();
		json.put("bool", true);
		PurchaseFile[] arr = null;
		
		try{
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (PurchaseFile[])JSONArray.toArray(jsonArray,PurchaseFile.class);
			String file_path = "";
			for(PurchaseFile obj : arr){
				boolean flag=false;
				boolean isvd=false;
				file_path = obj.getWjlj();
				if(file_path.indexOf(".")>0){//有后缀  XX.jpg  XX.RAR
                	String this_suffix=file_path.substring(file_path.lastIndexOf("."));
                	for(String suffix:Const.imgArray){
                		if(suffix.equalsIgnoreCase(this_suffix)){
                			flag=true;
                			break;
                        }
                	}
                	for(String suffix:Const.videoArray){
                		if(suffix.equalsIgnoreCase(this_suffix)){
                			isvd=true;
                			break;
                        }
                	}
                }
				int isimg=36;
				if(flag){
                	isimg = 35;
                }
				if(isvd){
					isimg = 37;
				}
                /*file_path = java.net.URLDecoder.decode(file_path,"UTF-8");*/
				String ftpurl=FtpParam.getFtpUrl();
				URL url = new URL("ftp://"+ftpurl+file_path);
				System.out.println(url);
                URLConnection urlconn = url.openConnection();
                InputStream inStream = urlconn.getInputStream();
                ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
                byte[] buff = new byte[100]; //buff用于存放循环读取的临时数据
                int rc = 0;
                while ((rc = inStream.read(buff, 0, 100)) > 0) {
                swapStream.write(buff, 0, rc);
                }
                byte[] buffer = swapStream.toByteArray(); //in_b为转换之后的结果 
                /*BufferedReader br = new BufferedReader(new InputStreamReader(
                urlconn.getInputStream()));
                String bu = br.readLine();
                byte [] buffer = bu.getBytes();*/
                /*byte [] buffer = FileUtil.getBytes(file_path);*/
                Map<String,Object> jsmap = new HashMap<String,Object>();
                String filename = obj.getWjmc();
                String originalFilename = filename.substring(0, filename.lastIndexOf("."));
                String contentType = filename.substring(filename.lastIndexOf(".")+1);
                
                int pur_order_id = mapper.getPur_Order_id(params);
                
                jsmap.put("isimg", isimg);//是否是图片,视频
                jsmap.put("file_name",filename);
                jsmap.put("contentType",contentType);
                jsmap.put("originalFilename",originalFilename);
                jsmap.put("ptid",params.get("ptid"));
                jsmap.put("cjrq",obj.getScrq());
                jsmap.put("pur_order_id",pur_order_id);
                jsmap.put("order_bh", obj.getHtbh());
                
                String jsonmap=MyJsonUtil.obj2string(jsmap);
                System.out.println(buffer);
                String result =contractSyncInter.addPfOrderAttched(buffer, jsonmap);
                CXFResponse<SupplierCheckfactoryReport> sf=MyJsonUtil.str2CXFResponse(result, SupplierCheckfactoryReport.class);
	    		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
	    			params.putAll(sf.getParams());
	    			params.put("htbh",obj.getHtbh());
	    			params.put("wjbh",obj.getWjbh());
	    			params.put("fjzt",1);
	    			pfmapper.updateFjzt(params);
	    			//附件状态更新
	    		}else {
	    			throw new CXFRequestException(sf.getErrorMessage());
	    		}
			}
		}}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace(); 
			json.put("msg", "协同时出现异常，请重试或与管理员联系！");
		}
		
		return json.toString();
	}
	@Transactional
	public String updateFileStatus(Map<String,Object> params){
		JSONObject json=new JSONObject();
		json.put("bool", true);
		PurchaseFile[] arr = null;
		if(params.get("recordData")!=null ){
			JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
			arr = (PurchaseFile[])JSONArray.toArray(jsonArray,PurchaseFile.class);
			for(PurchaseFile obj : arr){
				 params.put("htbh",obj.getHtbh());
				 int pur_order_id = mapper.getPur_Order_id(params);
				 Map<String,Object> jsmap = new HashMap<String,Object>();
				 jsmap.put("order_bh", obj.getHtbh());
				 jsmap.put("pur_order_id",pur_order_id);
				 /*System.out.println(obj.getScrq());
				 jsmap.put("create_dt",obj.getScrq());*/
				 jsmap.put("order_attched_name",obj.getWjmc());
				 jsmap.put("status",params.get("status"));
				 String jsonmap=MyJsonUtil.obj2string(jsmap);
	             String result = contractSyncInter.updateFileStatus(jsonmap);
	             params.put("wjbh",obj.getWjbh());
	             mapper.updateQxbj(params);
			}
		}
		return json.toString();
	}
	public List<ERPSRMpurchaseOrder> getERPSRMpurchaseOrderList(Map<String,Object> params){
		return mapper.getERPSRMpurchaseOrderList(params);
	}
	//ERP_SRM_htmxb明细数据
	public List<ERPSRMPODetial> getERPSRMPODetialList(Map<String,Object> params){
		return mapper.getERPSRMPODetialList(params);
	}
    //订单总金额
	public double getSumDetrialcost(Map<String,Object> params){
		return mapper.getSumDetrialcost(params);
	}
	public String getCampany_id(Map<String,Object> params){
		return mapper.getCampany_id(params);
	}
	public int getRecord_id(Map<String,Object> params){
		return mapper.getRecord_id(params);
	}
	public String getPurchaseName(Map<String,Object> params){
		return mapper.getPurchaseName(params);
	}
	public List<PurchaseOrderDetail> getContractDetial(Map<String,Object> params){
		return mapper.getContractDetial(params);
	}
	public void addPO_OUT_cd(POOUTcd obj){
		if(mapper.getPooutcount(obj)==0){
		mapper.addPO_OUT_cd(obj);
		}
	}
/*	*//**
	* @Title: upAttchedFile 
	* @Description: 上传合同文件
	* @param @param request
	* @param @param response
	* @param @return
	* @param @throws Exception    设定文件 
	* @return String    返回类型 
	* @throws 
	* @author duchao
	 *//*
	@RequestMapping(value="/upContractFileForWs.srm",method = RequestMethod.POST)
    @ResponseBody
    public String upContractFileForWs(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	json.put("bool", true);
    	try{MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("file");   //对应前台文件对象       
    	String order_bh = request.getParameter("order_bh");
    	String file_name=request.getParameter("file_name");
    	String login_id=request.getParameter("login_id");
    	String originalName=file.getOriginalFilename();
    	String contentType= file.getContentType();
        Map<String,Object> params=new HashMap<String, Object>();
        params.put("originalFilename", originalName);
        params.put("file_name", file_name);
        params.put("login_id", login_id);
        String jsonmap=MyJsonUtil.obj2string(params);
        InputStream inputStream = null;
        if(file!=null && file.getSize()>0){
        	if (file.getSize() >10*1024*1024) {
				json.put("msg", "文件太大，超过10M");
				return json.toString() ;	
			} 
        	inputStream = file.getInputStream();
	        //获取文件字节
        	byte[] buffer =  IOUtils.toByteArray(inputStream);
        	inputStream.close();    
        	String result=contractSyncInter.
        	
        }}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace(); 
			json.put("msg", "协同时出现异常，请重试！");
		}
        return json.toString();
	}*/
	/**
	* @Title: upAttchedFile 
	* @Description: 获得回签合同文件
	* @param @return
	* @param @throws Exception    设定文件 
	* @return     返回类型 
	* @throws 
	* @author duchao
	 */
	public List<PfContractAttachment> getOrderAttachmentBack(Map<String,Object> params){
		//参数设置
		//订单状态为20才显示
		Map<String,Object> ddzt = new HashMap<String,Object>();
		ddzt.put("agreement_bh",params.get("htbh"));
		String jsonmapd=MyJsonUtil.obj2string(ddzt);
		String order_status = contractSyncInter.getContractStatus(jsonmapd);
		if(order_status != null && !order_status.trim().equals("50") && !order_status.trim().equals("30")){
		int pur_order_id = mapper.getPur_Order_id(params);
		Map<String,Object> jsmap = new HashMap<String,Object>();
		jsmap.put("pur_order_id",pur_order_id);
		String jsonmap=MyJsonUtil.obj2string(jsmap);
		String result =contractSyncInter.getPfPurchaseOrderFile(jsonmap);
		CXFResponse<PfContractAttachment> sf=MyJsonUtil.str2CXFResponse(result, PfContractAttachment.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
			return sf.getList();
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}}else{
			return null;
		}
	}
	/**
	* @Title: SyneBack 
	* @Description: 获得回签file,上传到FTP，保存到cghtfjb
	* @param @return
	* @param @throws Exception    设定文件 
	* @return  返回类型 String 
	* @throws 
	* @author duchao
	 */
	@Autowired
	private SupplierAccessInter supplierAccessInter;
	
	@Autowired
	private SynergyUrgeSyncInter synergyUrgeSyncInter;
	@Autowired
	private PurchaseUrgeMapper pumapper;
	@Transactional
	public String SyneBack(Map<String,Object> params) {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	json.put("bool", true);
    	JSONObject jsonObject=JSONObject.fromObject(params.get("recordData").toString());
    	PfContractAttachment pca = (PfContractAttachment)JSONObject.toBean(jsonObject, PfContractAttachment.class);
    	try{
    	String filename = pca.getAgreement_name();
    	long pur_order_id = pca.getPur_order_id();
    	String urlId = (String)params.get("urlId");
    	String objID = pca.getMogodb_id();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmssSSS");
    	String originalFilename = filename;
    	String fileName = "";
    	if(originalFilename.contains(".")){
    	fileName = (df.format(new Date()))+ originalFilename.substring(originalFilename.lastIndexOf("."));//文件名生成器
    	}else{
    	fileName = (df.format(new Date()))+ originalFilename;
    	}
    	byte [] buff = supplierAccessInter.retrieveFileOne(objID);//根据mogoDbId 获取字节流
    	//上传到FTP
    	//将文件存入
    	FileUtil.byteToFtp(urlId, buff, fileName);
    	PurchaseFile pf = new PurchaseFile();
    	
    	int wjbh = pfmapper.getMaxWjbh(params);
    	String htbh = (String)params.get("htbh");
    	pf.setHtbh(Integer.valueOf(htbh));//htbh
    	pf.setWjmc(filename);
    	pf.setWjlj(urlId+fileName);
    	pf.setCjrm(pca.getCreator_name());
    	pf.setFjlx(1);//附件类型，供方回签 附件类型为回签合同!
    	pf.setPtsc(pca.getSource_type());//数据来源
    	pf.setScrq(pca.getCreate_dt());
    	pf.setWjbh(wjbh);
    	pf.setFjzt(2);//附件已接受
    	pfmapper.addPurchaseFile(pf);//插入到cghtfjb
    	params.put("hqsj",new Date());
    	mapper.updateHqbj(params);//回签标记，回签时间
    	Map<String,Object> ddzt = new HashMap<String,Object>();
    	ddzt.put("pur_order_id",pur_order_id);
    	String jsonmap=MyJsonUtil.obj2string(ddzt);
    	contractSyncInter.updateOrderLock(jsonmap);//更新订单锁定标记
    	//刷qrjq
    	//1.
    	Map<String,Object> para=new HashMap<String, Object>();
    	para.put("pur_order_id", pur_order_id);
    	jsonmap=MyJsonUtil.obj2string(para);
    	String result=synergyUrgeSyncInter.getPfOrderDeliveryNoticedetailsList(jsonmap);
    	CXFResponse<OrderDeliveryNoticedetails> sf=MyJsonUtil.str2CXFResponse(result, OrderDeliveryNoticedetails.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			params.putAll(sf.getParams());
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
		List<OrderDeliveryNoticedetails> odndList=sf.getList();
		//反刷平台确认标记
		para.put("notice_status", 2);
		jsonmap=MyJsonUtil.obj2string(para);
		result =synergyUrgeSyncInter.updatePfOrderDeliveryNotice(jsonmap);
		Map<String,Object> resultMap=MyJsonUtil.str2map(result);
		if(resultMap.get("bool")!=null&&resultMap.get("bool").toString().equals("false")){
			json.put("bool", false);
			json.put("msg", "平台 数据修改异常！！！");
			return json.toString();
		}
		//刷新本地和合同明细表
		for(OrderDeliveryNoticedetails odnd:odndList){
			para.clear();
			para.put("htbh", odnd.getHtbh());
			para.put("pur_order_id", odnd.getPur_order_id());
			para.put("order_detail_id", odnd.getOrder_detail_id());
			String htmx = odnd.getHtmx();
			String htxh[] = htmx.split(",");
			for(int i=0;i<htxh.length;i++){
				para.put("htxh",htxh[i]);
				para.put("hqjq", odnd.getConfirm_delivery_time());
				pumapper.updatePurchaseOrderTime(para);
				para.put("tzbj", 2);
				pumapper.updatePoWithPlatform(para);
			}/*
			params.put("htxh",mapper.getTzHtxh(para));
			
			//返写po-平台中间表
			para.put("tzbj", 2);
			pumapper.updatePoWithPlatform(para);*/
		}
    	
	}catch (Exception e) {
		json.put("bool", false);
		e.printStackTrace(); 
		json.put("msg", "协同时出现异常，请重试！");
	}
    	return json.toString(); 
	}
	/**
	 * 
	* @Title: IfHaveOrder
	* @Description: TODO(合同协同前判断是否已有有效合同订单)
	* @param @param params
	* @param @return    设定文件
	* @return String    返回类型
	* @throws
	 */
	public String IfHaveOrder(Map<String,Object> params) {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	json.put("bool", true);
     try{	
    	Map<String,Object> ddzt = new HashMap<String,Object>();
		ddzt.put("agreement_bh",params.get("htbh"));
		String jsonmapd=MyJsonUtil.obj2string(ddzt);
		String order_status = contractSyncInter.getContractStatus(jsonmapd);
		if(order_status.trim().equals("10")){
			json.put("bool", false);
			json.put("msg", "对应订单已提交，无法继续生成");
			return json.toString();
		}else if(order_status.trim().equals("20")){
			json.put("bool", false);
			json.put("msg", "对应订单已接单，无法继续生成");
			return json.toString();
		}else if(order_status.trim().equals("30")){
			json.put("bool", false);
			json.put("msg", "对应订单已交货完成，无法继续生成");
			return json.toString();
		}else if(order_status.trim().equals("40")){
			json.put("bool", false);
			json.put("msg", "对应订单状态为中止未确认，无法继续生成");
			return json.toString();
		}else if(order_status.trim().equals("10000")){
			json.put("bool", false);
			json.put("msg", "合同编号参数为空");
			return json.toString();
		}else{
			int rksl = mapper.getDhrkCount(params);
			if(rksl>0){
				json.put("bool", false);
				json.put("msg", "合同明细中已存在到货入库数量,无法外抛!");
				return json.toString();
			}
		}
	}catch (Exception e) {
		json.put("bool", false);
		e.printStackTrace(); 
		json.put("msg", "状态校验时出现异常，请重试！");
	}
    	return json.toString();
	} 
	/**
	 * 
	* @Title: IfOutward
	* @Description: TODO(该合同有没有有效的对应订单)
	* @param @param params
	* @param @return    设定文件
	* @return String    返回类型
	* @throws
	 */
	/*public String If*/
	/**
	 * 
	* @Title: IfOutward
	* @Description: TODO(该合同有没有有效的对应订单)
	* @param @param params
	* @param @return    设定文件
	* @return String    返回类型
	* @throws
	 */
	public String IfOutward(Map<String,Object> params) {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	json.put("bool", true);
    	try{	
        	Map<String,Object> ddzt = new HashMap<String,Object>();
    		ddzt.put("agreement_bh",params.get("htbh"));
    		String jsonmapd=MyJsonUtil.obj2string(ddzt);
    		String order_status = contractSyncInter.getContractStatus(jsonmapd);
    		if(Integer.parseInt(order_status.trim()) == 60 || Integer.parseInt(order_status.trim()) == 50){
    			json.put("bool", false);
    			json.put("msg", "该合同没有有效的对应订单，无法附件协同！");
    			return json.toString();
    		}
        }catch (Exception e) {
    		json.put("bool", false);
    		e.printStackTrace(); 
    		json.put("msg", "状态校验时出现异常，请重试！");
    	}
    	return json.toString();
	}
	public int getMaxWjbh(Map<String,Object> params) {
		return pfmapper.getMaxWjbh(params);
	}
	public void addPurchaseFile(PurchaseFile obj){
		pfmapper.addPurchaseFile(obj);
	}
	/**
	 * 
	* @Title: getDhrkCount
	* @Description: TODO(对应PO_OUT_HTMXB是否有数据)
	* @param @param params
	* @param @return    设定文件
	* @return int    返回类型
	* @throws
	 */
	public int getOrderDyCount(Map<String,Object> params){
		return mapper.getOrderDyCount(params);
	}
}
