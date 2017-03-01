package srm.basicdata.materialClass.model;

import java.io.Serializable;

import erp.common.Model;


public class MaterialClass extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 5755908633983384065L;
	private int			mc_id;
	private String			mc_name;
	private int			f_id;
	private int			level_id;
	private String leaf;
	private String erp_id;
	private String lbbh;
	
	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getErp_id() {
		return erp_id;
	}
	public void setErp_id(String erp_id) {
		this.erp_id = erp_id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public int getMc_id() {
		return mc_id;
	}
	public void setMc_id(int mc_id) {
		this.mc_id = mc_id;
	}
	public String getMc_name() {
		return mc_name;
	}
	public void setMc_name(String mc_name) {
		this.mc_name = mc_name;
	}
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public int getLevel_id() {
		return level_id;
	}
	public void setLevel_id(int level_id) {
		this.level_id = level_id;
	}
}
