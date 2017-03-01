package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.LinkedInvoiceMapper;
import erp.erp.PayApply.model.LinkedInvoice;


@Service
public class LinkedInvoiceService {
	@Autowired
	private LinkedInvoiceMapper mapper;


	public List<LinkedInvoice> getLinkedInvoiceList(Map<String,Object> params) {
		return mapper.getLinkedInvoiceList(params);
	}
	public void addLinkedInvoice(LinkedInvoice[] arr) {
		for(LinkedInvoice obj: arr) {
			mapper.addLinkedInvoice(obj);
		}
	}
	public void updateLinkedInvoice(LinkedInvoice[] arr) {
		for(LinkedInvoice obj: arr) {
			mapper.updateLinkedInvoice(obj);
		}
	}
	public void deleteLinkedInvoice(LinkedInvoice[] arr) {
		for(LinkedInvoice obj: arr) {
			mapper.deleteLinkedInvoice(obj);
		}
	}
}
