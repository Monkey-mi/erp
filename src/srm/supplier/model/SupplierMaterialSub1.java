package srm.supplier.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class SupplierMaterialSub1 extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3264419011905718087L;
	private int			id;
	private int			mc_id;
	private Date			create_dt;
	private int			company_id;
    private String      lbbh;
    private int         record_id;
    
    
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMc_id() {
		return mc_id;
	}
	public void setMc_id(int mc_id) {
		this.mc_id = mc_id;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
}
