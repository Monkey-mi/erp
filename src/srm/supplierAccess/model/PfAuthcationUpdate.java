package srm.supplierAccess.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class PfAuthcationUpdate extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			auth_update_id;
	private int			company_id;
	private String			class_id;
	private String			nature_id;
	private String			cpyname_cn;
	private int			contact_addr_code;
	private String			contact_addr;
	private int			industry_id;
	private String			f_phone;
	private String			corporation;
	private double			reg_fund;
	private int			currency_id;
	private Date			establish_dt;
	private Date			created_dt;
	private int			state;
	private String  nature_name;
	private String  industry_name;
	private String  class_name;
	private String  currency_name;
	private String  bus_license;
	private String  tax_certificate;
	private String  org_code;
	private String  rat_certificate;
	
	public String getBus_license() {
		return bus_license;
	}
	public void setBus_license(String bus_license) {
		this.bus_license = bus_license;
	}
	public String getTax_certificate() {
		return tax_certificate;
	}
	public void setTax_certificate(String tax_certificate) {
		this.tax_certificate = tax_certificate;
	}
	public String getOrg_code() {
		return org_code;
	}
	public void setOrg_code(String org_code) {
		this.org_code = org_code;
	}
	public String getRat_certificate() {
		return rat_certificate;
	}
	public void setRat_certificate(String rat_certificate) {
		this.rat_certificate = rat_certificate;
	}
	public String getNature_name() {
		return nature_name;
	}
	public void setNature_name(String nature_name) {
		this.nature_name = nature_name;
	}
	public String getIndustry_name() {
		return industry_name;
	}
	public void setIndustry_name(String industry_name) {
		this.industry_name = industry_name;
	}
	public String getClass_name() {
		return class_name;
	}
	public void setClass_name(String class_name) {
		this.class_name = class_name;
	}
	public String getCurrency_name() {
		return currency_name;
	}
	public void setCurrency_name(String currency_name) {
		this.currency_name = currency_name;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getAuth_update_id() {
		return auth_update_id;
	}
	public void setAuth_update_id(int auth_update_id) {
		this.auth_update_id = auth_update_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getClass_id() {
		return class_id;
	}
	public void setClass_id(String class_id) {
		this.class_id = class_id;
	}
	public String getNature_id() {
		return nature_id;
	}
	public void setNature_id(String nature_id) {
		this.nature_id = nature_id;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getContact_addr_code() {
		return contact_addr_code;
	}
	public void setContact_addr_code(int contact_addr_code) {
		this.contact_addr_code = contact_addr_code;
	}
	public String getContact_addr() {
		return contact_addr;
	}
	public void setContact_addr(String contact_addr) {
		this.contact_addr = contact_addr;
	}
	public int getIndustry_id() {
		return industry_id;
	}
	public void setIndustry_id(int industry_id) {
		this.industry_id = industry_id;
	}
	public String getF_phone() {
		return f_phone;
	}
	public void setF_phone(String f_phone) {
		this.f_phone = f_phone;
	}
	public String getCorporation() {
		return corporation;
	}
	public void setCorporation(String corporation) {
		this.corporation = corporation;
	}
	public double getReg_fund() {
		return reg_fund;
	}
	public void setReg_fund(double reg_fund) {
		this.reg_fund = reg_fund;
	}
	public int getCurrency_id() {
		return currency_id;
	}
	public void setCurrency_id(int currency_id) {
		this.currency_id = currency_id;
	}
	public Date getEstablish_dt() {
		return establish_dt;
	}
	public void setEstablish_dt(Date establish_dt) {
		this.establish_dt = establish_dt;
	}
	public Date getCreated_dt() {
		return created_dt;
	}
	public void setCreated_dt(Date created_dt) {
		this.created_dt = created_dt;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
}
