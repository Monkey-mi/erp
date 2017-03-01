package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.MyJsonUtil;

import srm.supplier.data.InvoiceTitleMapper;
import srm.supplier.model.InvoiceTitle;


@Service
public class InvoiceTitleService {
	@Autowired
	private InvoiceTitleMapper mapper;
	@Autowired
	private SupplierInter supplierInter;

	public List<InvoiceTitle> getInvoiceTitleList(Map<String,Object> params) {
		return mapper.getInvoiceTitleList(params);
	}
	@Transactional
	public void addInvoiceTitle(InvoiceTitle[] arr) {
		for(InvoiceTitle obj: arr) {		
			String jsonmap = MyJsonUtil.obj2string(obj);
			String result = supplierInter.addAppInvoiceTitleByWS(jsonmap);
			CXFResponse<InvoiceTitle> sf=MyJsonUtil.str2CXFResponse(result, InvoiceTitle.class);
		    String invoice_out_id = sf.getParams().get("invoice_out_id").toString();
		    obj.setInvoice_out_id(Integer.valueOf(invoice_out_id));
			mapper.addInvoiceTitle(obj);
		}
	}
	@Transactional
	public void updateInvoiceTitle(InvoiceTitle[] arr) {
		for(InvoiceTitle obj: arr) {
			mapper.updateInvoiceTitle(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updateAppInvoiceTitleByWS(jsonmap);
		}
	}
	@Transactional
	public void deleteInvoiceTitle(InvoiceTitle[] arr) {
		for(InvoiceTitle obj: arr) {
			mapper.deleteInvoiceTitle(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.deleteAppInvoiceTitleByWS(jsonmap);
		}
	}
}
