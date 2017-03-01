package erp.erp.purchaseOrder.controller;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jcifs.smb.SmbFile;
import net.sf.json.JSONObject;

import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import srm.supplier.model.SupplierCheckfactoryReport;

import com.outsideasy.ws.common.vo.CXFRequestException;
import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.contract.ContractSyncInter;
import com.outsideasy.ws.erp.contract.SynergyUrgeSyncInter;

import erp.erp.purchaseOrder.model.ERPSRMPODetial;
import erp.erp.purchaseOrder.model.ERPSRMpurchaseOrder;
import erp.erp.purchaseOrder.model.POOUTcd;
import erp.erp.purchaseOrder.model.PurchaseFile;
import erp.erp.purchaseOrder.model.PurchaseOrderDetail;
import erp.erp.purchaseOrder.service.OrderToWsService;
import erp.erp.purchaseOrder.service.OutSourcePickingService;
import erp.erp.purchaseOrder.service.PurchaseFileService;
import erp.erp.purchaseOrder.service.PurchaseOrderDetailService;
import erp.erp.purchaseOrder.service.PurchaseOrderService;
import erp.erp.purchaseUrge.model.SynergyUrge;
import erp.erp.purchaseUrge.service.PurchaseUrgeService;
import erp.util.Const;
import erp.util.Contenttype;
import erp.util.FileUtil;
import erp.util.FtpParam;
import erp.util.MyJsonUtil;
import erp.util.OtherParam;
import erp.util.WebUtil;
@Lazy
@Controller
@RequestMapping("purchaseorder")
public class PurchaseOrderCtl {
	@Autowired 
	private ContractSyncInter contractSyncInter;
	@Autowired
	private OutSourcePickingService outSourcePickingService;
	@Autowired 
	private OrderToWsService orderToWsService;
	/*功能：采购领料
	 *作者：伍恰
	 *时间：2016/03/24
	 * */
	@RequestMapping(value="/outsourcepicking.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> outSourcePicking(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, outSourcePickingService);
	}
	
	@Autowired
	private PurchaseFileService purchaseFileService;
	/*功能：采购文件
	 *作者：伍恰
	 *时间：2016/03/16
	 * */
	@RequestMapping(value="/purchasefile.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchasefile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseFileService);
	}
	@Autowired
	private PurchaseOrderService purchaseOrderService;
	/*功能：采购合同总表
	 *作者：伍恰
	 *时间：2016/03/16
	 * */
	@RequestMapping(value="/purchaseorder.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchaseOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseOrderService);
	}
	
	@Autowired
	private PurchaseOrderDetailService purchaseOrderDetailService;
	/*功能：采购合同明细表
	 *作者：伍恰
	 *时间：2016/03/16
	 * */
	@RequestMapping(value="/purchaseorderdetail.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> purchaseOrderDetail(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, purchaseOrderDetailService);
	}
	/*功能：订单协同
	 *作者：杜超
	 *@param  平台映射帐号 login_id,
	 *通知明细信息 suList List<SynergyUrge>
	 *时间：2016/08/25
	 * */
	@RequestMapping(value="/ordertowsservice.act",method=RequestMethod.POST)
	@ResponseBody 
	public Map<String,Object> orderTows(HttpServletRequest request,HttpServletResponse response) throws Exception{
		return WebUtil.DynamicCallCURD(request, response, orderToWsService);
	}
	@Autowired
	private PurchaseUrgeService purchaseUrgeService; 
	@Autowired
	private SynergyUrgeSyncInter synergyUrgeSyncInter;
	@Autowired 
	private PurchaseFileService purchasefileService;
	@RequestMapping(value="upOrderFileForWs.act",method = RequestMethod.POST)
    @ResponseBody
    @Transactional
	public String upOrderFileForWs(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject json = new JSONObject();
    	json.put("success", true);
    	json.put("bool", true);
	        //获取远程文件路径
	        String url=request.getParameter("url");
			SmbFile file =new SmbFile("smb:"+url);
			//1.ERP_SRM_CGHTB
			Map<String,Object> params=new HashMap<String, Object>();
			params.put("htbh", request.getParameter("htbh"));
			params.put("ptid", request.getParameter("ptid"));
			params.put("csbh", request.getParameter("csbh"));
			params.put("login_id", request.getParameter("login_id"));
			params.put("czym", request.getParameter("czym"));
			if(params.get("csbh")==null){
				json.put("msg", "与平台供应商匹配失败");
				return json.toString();
			}
			params.put("cgyq", request.getParameter("cgyq"));
			String file_name=url.substring(url.lastIndexOf("/")+1);
			String originalName=file_name;
	    	String contentType= file.getContentType();
	    	System.out.println();
	    	String suff="";
	    	suff=file_name.substring(file_name.lastIndexOf("."));
	    	//如果为空则根据后缀名进行系统匹配
	    	if(contentType==null){
	    		contentType=Contenttype.getContent(suff);
	    	}
	    	params.put("originalFilename", originalName);
	        params.put("file_name", file_name);
	        params.put("contentType", contentType);
			List<ERPSRMpurchaseOrder> addlist = new ArrayList<ERPSRMpurchaseOrder>();
			List<ERPSRMpurchaseOrder> esplist = orderToWsService.getERPSRMpurchaseOrderList(params);
			ERPSRMpurchaseOrder esp  = esplist.get(0);
			esp.setPtid((String) request.getParameter("ptid"));//对应平台账号ID
			
			esp.setCompany_id(orderToWsService.getCampany_id(params));
			String record_id=purchaseOrderService.getRecordId(params);
			if(record_id==null){
				json.put("msg","与平台供应商匹配失败");
				return json.toString();
			}
			params.put("record_id",record_id);
			esp.setRecord_id(Integer.parseInt(record_id));
			params.put("lbbh", esp.getCglb());
			String cglbmc = orderToWsService.getPurchaseName(params);
			esp.setCglb(esp.getCglb().trim());
			esp.setLbmc(cglbmc);
			List<ERPSRMPODetial> pdlist = orderToWsService.getERPSRMPODetialList(params);//ERP_SRM_htmxb
			//订单表相关信息
			addlist.add(esp);
			String add = MyJsonUtil.obj2string(addlist);
			
			String ddbh = contractSyncInter.addPfPurchaseOrder(add);//返回主表ddbh
			if(ddbh!=null && ddbh!=""){
			String htmx = "";
			POOUTcd poc = new POOUTcd();
			//采购要求
			String cgyq = request.getParameter("cgyq").toString();
			String httk = request.getParameter("httk").toString();
			Map<String,Object> cgyqpa = new HashMap<String,Object>();
			cgyqpa.put("cgyq", cgyq);
			cgyqpa.put("htbh", params.get("htbh"));
			cgyqpa.put("ddbh", ddbh);
			cgyqpa.put("httk", httk);
			cgyqpa.put("pid", params.get("ptid"));
			String jsonmapt=MyJsonUtil.obj2string(cgyqpa);
			contractSyncInter.addPfPurchaseAsk(jsonmapt);
			params.put("ddbh",ddbh);
			params.put("company_id", esp.getCompany_id());
			//合同文件
			String jsonmap=MyJsonUtil.obj2string(params);
	        InputStream inputStream = null;
	        if(file!=null && file.exists()){
	        	/*if (file.getSize() >10*1024*1024) {
					json.put("msg", "文件太大，超过10M");
					return json.toString() ;	
				} */
	        	inputStream = file.getInputStream();
		        //获取文件字节
	        	byte[] buffer =  IOUtils.toByteArray(inputStream);
	        	inputStream.close();    
	        	String result =contractSyncInter.addPfPurchaseOrderFile(buffer, jsonmap);
	        	CXFResponse<SupplierCheckfactoryReport> sf=MyJsonUtil.str2CXFResponse(result, SupplierCheckfactoryReport.class);
	    		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
	    			params.putAll(sf.getParams());
	    			//另保存一份到ftp
			            //保存到cghtfjb]
	    			    String urlId = "/rzerp_hfpg/po_cght/";
	    			    String filename = file_name;
	    			    SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmssSSS");
	    		    	String originalFilename = filename;
	    		    	String fileName = "";
	    			    if(originalFilename.contains(".")){
	    		    	fileName = (df.format(new Date()))+ originalFilename.substring(originalFilename.lastIndexOf("."));//文件名生成器
	    		    	}else{
	    		    	fileName = (df.format(new Date()))+ originalFilename;
	    		    	}
	    			    FileUtil.byteToFtp(urlId, buffer, fileName);
			            PurchaseFile pf = new PurchaseFile();
			            pf.setCjrm(params.get("czym").toString());
			            pf.setHtbh(Integer.parseInt(params.get("htbh").toString()));
			            pf.setPtsc(0);
			            pf.setScrq(new Date());
			            pf.setWjmc(file_name);
			            pf.setWjlj(urlId+fileName);
			            pf.setWjbh(orderToWsService.getMaxWjbh(params));
			            pf.setFjzt(1);
			            pf.setFjlx(0);
			            orderToWsService.addPurchaseFile(pf);
			       
	    		}else {
	    			json.put("msg", sf.getErrorMessage());
		        	return json.toString();
	    		}
	        }else{
	        	json.put("msg", "文件不存在");
	        	return json.toString();
	        }
	        if(OtherParam.getCompanyId()==0){
				new OtherParam();
			}
	        for(ERPSRMPODetial obj : pdlist){
	        	obj.setDdbh(ddbh);
				params.put("clhh", obj.getClhh());
				params.put("cltx1", obj.getCltx1());
				params.put("cgdj", obj.getCgdj());
				params.put("jh", obj.getJh());
				params.put("jldw", obj.getJldw());
				params.put("ckmc", obj.getClmc());
				params.put("bzsm", obj.getBzsm());
				List<PurchaseOrderDetail> cd = orderToWsService.getContractDetial(params);
				boolean a = false;
				for(PurchaseOrderDetail cds : cd){
					if(cds.getZzbj()==0){
					if(a){
					htmx+=","+String.valueOf(cds.getHtxh());
					}else{
					htmx+=String.valueOf(cds.getHtxh());	
					a = true;
					}
					}
				}
				obj.setHtmx(htmx);
				htmx = "";//重置
				//插入数据到po_out_htmxb
				String addde =  MyJsonUtil.obj2string(obj);
				String order_detial_id = contractSyncInter.addPfPurchaseOrderDetial( "["+addde+"]");
				System.out.println(addde);
				System.out.println(order_detial_id);
				for(PurchaseOrderDetail cds : cd){
					if(cds.getZzbj()==0){
					poc.setHtbh(esp.getHtbh());
					poc.setHtxh(cds.getHtxh());
					poc.setPur_order_id(Integer.parseInt(ddbh));
					poc.setOrder_detail_id(Integer.parseInt(order_detial_id));
					orderToWsService.addPO_OUT_cd(poc);
					}
				}
			}
	        //追催发送
	        List<SynergyUrge> list =purchaseUrgeService.getSynergyUrgeList(params);
			params.put("pur_company_id",OtherParam.getCompanyId());
	        params.put("recs", MyJsonUtil.obj2string(list));
			String jsonmape=MyJsonUtil.obj2string(params);
			String result=synergyUrgeSyncInter.getAddPfSynergyUrge(jsonmape);
			params.put("tzbj", 1);
			purchaseUrgeService.updatePoWithPlatform(params);
			String file_path = "";
			List<PurchaseFile> pf = purchaseFileService.getPurchaseFileList(params);
			for(PurchaseFile obj : pf){
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
				URL urlf = new URL("ftp://"+ftpurl+file_path);
				System.out.println(urlf);
                URLConnection urlconn = urlf.openConnection();
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
                String contentTypef = filename.substring(filename.lastIndexOf(".")+1);
                
                int pur_order_id = purchaseOrderService.getPur_Order_id(params);
                
                jsmap.put("isimg", isimg);//是否是图片,视频
                jsmap.put("file_name",filename);
                jsmap.put("contentType",contentTypef);
                jsmap.put("originalFilename",originalFilename);
                jsmap.put("ptid",params.get("ptid"));
                jsmap.put("cjrq",obj.getScrq());
                jsmap.put("pur_order_id",pur_order_id);
                jsmap.put("order_bh", obj.getHtbh());
                String jsonmapf=MyJsonUtil.obj2string(jsmap);
                System.out.println(buffer);
                String resultf =contractSyncInter.addPfOrderAttched(buffer, jsonmapf);
                CXFResponse<SupplierCheckfactoryReport> sf=MyJsonUtil.str2CXFResponse(resultf, SupplierCheckfactoryReport.class);
	    		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
	    			params.putAll(sf.getParams());
	    			params.put("htbh",obj.getHtbh());
	    			params.put("wjbh",obj.getWjbh());
	    			params.put("fjzt",1);
	    			purchaseFileService.updateFjzt(params);
	    			//附件状态更新
	    		}else {
	    			throw new CXFRequestException(sf.getErrorMessage());
	    		}
			}
			}else{
				json.put("msg", "生成订单失败!");
				return json.toString();
			}
		json.put("msg", "协同操作成功！");
		return json.toString();
	}
	 
}
