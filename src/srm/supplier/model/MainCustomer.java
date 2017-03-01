package srm.supplier.model;

import java.io.Serializable;

import erp.common.Model;


public class MainCustomer extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7120265836389756909L;
	private int			customer_id;
	private String			customer_name;
	private int			company_id;
    private int         record_id;
    private int         customer_out_id;
    
    
	public int getCustomer_out_id() {
		return customer_out_id;
	}
	public void setCustomer_out_id(int customer_out_id) {
		this.customer_out_id = customer_out_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}

	public int getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
}
