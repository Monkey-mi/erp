package erp.bi.form.model;


import java.io.Serializable;

import erp.common.Model;


public class FrmAtt extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4209967397196621808L;
	private int frm_att_id;
	private int freg_id;
	private int inst_id;
	private String att_name;
	private String description;
	private String att_type;
	private String url;
	private int pg_id;
	public int getFrm_att_id() {
		return frm_att_id;
	}
	public void setFrm_att_id(int frm_att_id) {
		this.frm_att_id = frm_att_id;
	}
	public int getFreg_id() {
		return freg_id;
	}
	public void setFreg_id(int freg_id) {
		this.freg_id = freg_id;
	}
	public int getInst_id() {
		return inst_id;
	}
	public void setInst_id(int inst_id) {
		this.inst_id = inst_id;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAtt_type() {
		return att_type;
	}
	public void setAtt_type(String att_type) {
		this.att_type = att_type;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getPg_id() {
		return pg_id;
	}
	public void setPg_id(int pg_id) {
		this.pg_id = pg_id;
	}
	public void setAtt_name(String att_name) {
		this.att_name = att_name;
	}
	public String getAtt_name() {
		return att_name;
	}
}
