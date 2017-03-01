package srm.supplier.model;

import java.io.Serializable;

import erp.common.Model;


public class BankAccount extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1519711794065929677L;
	private int			account_id;
	private String			account_name;
	private int			company_id;
	private boolean			default_id;
	private String account_code;
    private int         record_id;
    private int         account_out_id;
    
    
	public int getAccount_out_id() {
		return account_out_id;
	}
	public void setAccount_out_id(int account_out_id) {
		this.account_out_id = account_out_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getAccount_id() {
		return account_id;
	}
	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}
	public String getAccount_name() {
		return account_name;
	}
	public void setAccount_name(String account_name) {
		this.account_name = account_name;
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
	public String getAccount_code() {
		return account_code;
	}
	public void setAccount_code(String account_code) {
		this.account_code = account_code;
	}
	
}
