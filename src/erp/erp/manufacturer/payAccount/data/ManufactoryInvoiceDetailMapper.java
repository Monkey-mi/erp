/**
 *  @date 2016-5-30上午9:29:17
 *  @file InvoiceDetailMapper.java
 *  @author:shufei
 *  
 */
package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.ManufactoryInvoiceDetail;

/**
 * <p>Title: InvoiceDetailMapper</p>
 * <p>Description: erp</p>
 * <p>Company: topsun</p> 
 * @author 舒飞
 * @date 2016-5-30上午9:29:17
 */
public interface ManufactoryInvoiceDetailMapper {
	public List<ManufactoryInvoiceDetail> getInvoiceDetailList(Map<String,Object> params);
	public List<ManufactoryInvoiceDetail> getInvoiceDetailList2(Map<String,Object> params);
}
