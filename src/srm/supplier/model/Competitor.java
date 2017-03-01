package srm.supplier.model;

import java.io.Serializable;

import erp.common.Model;


public class Competitor extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4464623962629713970L;
	private int			competitor_id;
	private String			competitor_name;
	private int			company_id;
    private int         record_id;
    private int         competitor_out_id;

    
	public int getCompetitor_out_id() {
		return competitor_out_id;
	}
	public void setCompetitor_out_id(int competitor_out_id) {
		this.competitor_out_id = competitor_out_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public int getCompetitor_id() {
		return competitor_id;
	}
	public void setCompetitor_id(int competitor_id) {
		this.competitor_id = competitor_id;
	}
	public String getCompetitor_name() {
		return competitor_name;
	}
	public void setCompetitor_name(String competitor_name) {
		this.competitor_name = competitor_name;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
}
