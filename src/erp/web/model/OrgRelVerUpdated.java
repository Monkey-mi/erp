package erp.web.model;

import java.io.Serializable;

import erp.common.Model;


public class OrgRelVerUpdated extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -125348307684291726L;

	 private int orv_id;
	 private int or_id;
	 private String orv_name;
	 private String or_name;
	 private String or_type;
	public int getOrv_id() {
		return orv_id;
	}
	public void setOrv_id(int orvId) {
		orv_id = orvId;
	}
	public int getOr_id() {
		return or_id;
	}
	public void setOr_id(int orId) {
		or_id = orId;
	}
	public String getOrv_name() {
		return orv_name;
	}
	public void setOrv_name(String orvName) {
		orv_name = orvName;
	}
	public String getOr_name() {
		return or_name;
	}
	public void setOr_name(String orName) {
		or_name = orName;
	}
	public String getOr_type() {
		return or_type;
	}
	public void setOr_type(String orType) {
		or_type = orType;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	 
	 
	
}
