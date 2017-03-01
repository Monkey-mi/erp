package srm.supplier.model;

import java.io.Serializable;

import erp.common.Model;


public class InvoiceTitle extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -9197838901385876273L;
	private int			invoice_title_id;
	private String			invoice_title_name;
	private int			company_id;
	private boolean			default_id;
    private int         record_id;
    private int         invoice_out_id;
    
    
	public int getInvoice_out_id() {
		return invoice_out_id;
	}
	public void setInvoice_out_id(int invoice_out_id) {
		this.invoice_out_id = invoice_out_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}

	public int getInvoice_title_id() {
		return invoice_title_id;
	}
	public void setInvoice_title_id(int invoice_title_id) {
		this.invoice_title_id = invoice_title_id;
	}
	public String getInvoice_title_name() {
		return invoice_title_name;
	}
	public void setInvoice_title_name(String invoice_title_name) {
		this.invoice_title_name = invoice_title_name;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public boolean isDefault_id() {
		return default_id;
	}
	public void setDefault_id(boolean default_id) {
		this.default_id = default_id;
	}
	
}
