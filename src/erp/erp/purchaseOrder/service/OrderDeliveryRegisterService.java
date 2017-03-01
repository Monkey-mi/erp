package erp.erp.purchaseOrder.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFRequestException;
import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.contract.SynergyUrgeSyncInter;
import com.outsideasy.ws.erp.supplier.SupplierAccessInter;

import erp.erp.purchaseOrder.data.OfpopinfoMapper;
import erp.erp.purchaseOrder.data.OrderDeliveryAttachedMapper;
import erp.erp.purchaseOrder.data.OrderDeliveryRegisterDetailsMapper;
import erp.erp.purchaseOrder.data.OrderDeliveryRegisterMapper;
import erp.erp.purchaseOrder.model.Ofpopinfo;
import erp.erp.purchaseOrder.model.OrderCheckDetails;
import erp.erp.purchaseOrder.model.OrderDeliveryAttached;
import erp.erp.purchaseOrder.model.OrderDeliveryRegister;
import erp.erp.purchaseOrder.model.OrderDeliveryRegisterDetails;
import erp.erp.purchaseOrder.model.OrderQualitycheck;
import erp.erp.purchaseUrge.model.OrderDeliveryNotice;
import erp.util.Const;
import erp.util.FileUtil;
import erp.util.MyDateUtils;
import erp.util.MyJsonUtil;
import erp.util.OtherParam;


@Service
public class OrderDeliveryRegisterService {
	@Autowired
	private OrderDeliveryRegisterMapper mapper;
	@Autowired
	private SynergyUrgeSyncInter synergyUrgeSyncInter;
	@Autowired
	private OrderDeliveryRegisterDetailsMapper orderDeliveryRegisterDetailsMapper;
	@Autowired
	private SupplierAccessInter supplierAccessInter;
	@Autowired
	private OrderDeliveryAttachedMapper orderDeliveryAttachedMapper;
	@Autowired
	private OfpopinfoMapper ofpopinfoMapper;
	protected static Logger logger = Logger.getLogger("service");
	/**
	 * 平台送货通知信息 获取至本地
	 * 
	 * @author wq
	 * @date 2016-08-27
	 */
	@Transactional
	public void SyncOrderDeliveryRegister(){
		logger.debug(new Date().toString()+"送货通知信息开始同步！！！");
		Map<String,Object> params=new HashMap<String, Object>();
		if(OtherParam.getCompanyId()==0){
			new OtherParam();
		}
		//获取送货登记信息
		params.put("receive_company_id", OtherParam.getCompanyId());//将接收公司入参
		String jsonmap=MyJsonUtil.obj2string(params);
		//获取送货通知登记表
		String result=synergyUrgeSyncInter.getPfOrderDeliveryRegisterList(jsonmap);
		CXFResponse<OrderDeliveryRegister> sf=MyJsonUtil.str2CXFResponse(result, OrderDeliveryRegister.class);
		if(Const.SOAP_TRUE.endsWith(sf.getSuccess())){
			List<OrderDeliveryRegister> oddrList=sf.getList();
			//将数据存入本地数据库
			for(OrderDeliveryRegister obj:oddrList){
				int register_id=obj.getRegister_id();
				mapper.addOrderDeliveryRegister(obj);
				//查询相关明细及附件信息
				params.clear();
				params.put("register_id", register_id);
				String jsonmap1=MyJsonUtil.obj2string(params);
				String result1=synergyUrgeSyncInter.getPfOrderDeliveryRegisterDetailsList(jsonmap1);
				CXFResponse<OrderDeliveryRegisterDetails> sf1=MyJsonUtil.str2CXFResponse(result1, OrderDeliveryRegisterDetails.class);
				if(Const.SOAP_TRUE.endsWith(sf1.getSuccess())){
					List<OrderDeliveryRegisterDetails> odrdList=sf1.getList();
					for(OrderDeliveryRegisterDetails odrd:odrdList){
						orderDeliveryRegisterDetailsMapper.addOrderDeliveryRegisterDetails(odrd);
					}
				}else {
					throw new CXFRequestException(sf.getErrorMessage());
				}
				String result2=synergyUrgeSyncInter.getPfOrderDeliveryAttachedList(jsonmap1);
				CXFResponse<OrderDeliveryAttached> sf2=MyJsonUtil.str2CXFResponse(result2, OrderDeliveryAttached.class);
				if(Const.SOAP_TRUE.endsWith(sf2.getSuccess())){
					List<OrderDeliveryAttached> odaList=sf2.getList();
					for(OrderDeliveryAttached oda:odaList){
						//首先将文件存入指定路径
						String url=OtherParam.getPurchaseOrderFileUrl();
						String mogodbId=oda.getMogodb_id();
						if(mogodbId!=null&&!mogodbId.equals("")){
							byte[] b=supplierAccessInter.retrieveFileOne(mogodbId);
							if(b.length>0){
								SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd_HHmmssSSS");
								String originalFilename = oda.getFile_name();
								String suffix_name=oda.getSuffix_name();
								if(suffix_name==null){
									suffix_name=originalFilename.substring(originalFilename.lastIndexOf("."));
								}
								String fileName = (df.format(new Date()))+ suffix_name;//文件名生成器
								String resultUrl=FileUtil.byteToFtp(url, b,fileName);
								oda.setFile_url(resultUrl);
								oda.setFile_name(oda.getFile_name()+suffix_name);
								orderDeliveryAttachedMapper.addOrderDeliveryAttached(oda);
							}
						}
					}
				}else {
					throw new CXFRequestException(sf.getErrorMessage());
				}
				//向OA消息库插入数据
				//首先获取需要发送消息的OA loginId
				List<String> opList=mapper.getOperatorList(params);
				for(String op:opList){
					Ofpopinfo ofp=new Ofpopinfo();
					ofp.setLoginid(op);
					ofp.setInfotitle("送货通知");
					ofp.setInfosubject("收到："+obj.getSend_cpyname_cn() +"的送货通知！  \n 送货时间："+MyDateUtils.getStringDateShort(obj.getCreate_dt()));
					ofp.setSendtime(new Date().getTime());
					ofp.setInfourl("/TPS/poinfo/OrderDeliveryRegisterView.jsp?register_id="+obj.getRegister_id());
					ofpopinfoMapper.addOfpopinfo(ofp);
				}
			}
			//将通知表数据get标记打上
			synergyUrgeSyncInter.getUpdatePfOrderDeliveryRegisterIsGet(jsonmap);
		}else {
			throw new CXFRequestException(sf.getErrorMessage());
		}
		logger.debug(new Date().toString()+"送货通知信息同步结束！！！");
	}
	
}
