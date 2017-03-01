package erp.web.model;


import java.io.Serializable;
import java.util.Date;

import org.springframework.stereotype.Repository;

import erp.common.Model;


public class OrgRelVer extends Model implements Serializable{

	/**
	 * 
	 */
	 private static final long serialVersionUID = -6989554525184517805L;
	 private int orv_id;
	 private int or_id;
	 private String orv_name;
	 private String orv_desc;
	 private String is_valid;
	 private String attr_code;
	 private Date start_date;
	 private Date end_date;
	public int getOrv_id() {
		return orv_id;
	}
	public void setOrv_id(int orv_id) {
		this.orv_id = orv_id;
	}

	public String getOrv_name() {
		return orv_name;
	}
	public void setOrv_name(String orv_name) {
		this.orv_name = orv_name;
	}
	public String getOrv_desc() {
		return orv_desc;
	}
	public void setOrv_desc(String orv_desc) {
		this.orv_desc = orv_desc;
	}

	public String getIs_valid() {
		return is_valid;
	}
	public void setIs_valid(String is_valid) {
		this.is_valid = is_valid;
	}
	public String getAttr_code() {
		return attr_code;
	}
	public void setAttr_code(String attr_code) {
		this.attr_code = attr_code;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public Date getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}
	public void setOr_id(int or_id) {
		this.or_id = or_id;
	}
	public int getOr_id() {
		return or_id;
	}


}
