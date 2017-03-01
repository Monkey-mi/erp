package erp.erp.plasticPartsPledge.data;

import java.util.List;
import java.util.Map;

import erp.erp.plasticPartsPledge.model.PlasticPartsPledge;
import erp.erp.plasticPartsPledge.model.PlasticPartsPledgeInvoice;
import erp.erp.plasticPartsPledge.model.PlasticPartsPledgeInvoiceImp;


public interface PlasticPartsPledgeInvoiceMapper {
	public List<PlasticPartsPledgeInvoice> getPlasticPartsPledgeInvoiceList(Map<String,Object> params);
	public List<PlasticPartsPledgeInvoiceImp> getPlasticPartsPledgeInvoiceImpList(Map<String,Object> params);
	public void addPlasticPartsPledgeInvoice(PlasticPartsPledgeInvoice obj);
	public void updatePlasticPartsPledgeInvoice(PlasticPartsPledgeInvoice obj);
	public void deletePlasticPartsPledgeInvoice(PlasticPartsPledgeInvoice obj);
	public String getApplicationsAmount(Map<String,Object> params);
	//根据主表级联删除
	public void deletePlasticPartsPledgeInvoiceByZydh(PlasticPartsPledge obj);
	
	public void deletePlasticPartsPledgeInvoiceByZydhOne(Map<String,Object> params);
}
