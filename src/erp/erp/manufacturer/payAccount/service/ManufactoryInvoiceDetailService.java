/**
 *  @date 2016-5-30上午9:41:58
 *  @file InvoiceDetailService.java
 *  @author:shufei
 *  
 */
package erp.erp.manufacturer.payAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.ManufactoryInvoiceDetailMapper;
import erp.erp.manufacturer.payAccount.model.ManufactoryInvoiceDetail;

/**
 * <p>Title: InvoiceDetailService</p>
 * <p>Description: erp</p>
 * <p>Company: topsun</p> 
 * @author 舒飞
 * @date 2016-5-30上午9:41:58
 */
@Service
public class ManufactoryInvoiceDetailService {
	@Autowired
    private ManufactoryInvoiceDetailMapper invoiceDetailMapper;

	public List<ManufactoryInvoiceDetail> getInvoiceDetailList(Map<String,Object> params){
		List<ManufactoryInvoiceDetail> manufactoryInvoiceDetail = null;
		if(params.get("hsbm").toString()==null){
			params.put("hsbm","''");
		}
		if(params.get("tjlb").toString().equals("1")){
			manufactoryInvoiceDetail = invoiceDetailMapper.getInvoiceDetailList2(params);
		}else{
			manufactoryInvoiceDetail = invoiceDetailMapper.getInvoiceDetailList(params);
		}
		return manufactoryInvoiceDetail;
	}
}
