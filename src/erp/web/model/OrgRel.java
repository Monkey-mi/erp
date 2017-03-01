package erp.web.model;


import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Repository;

import erp.common.Model;

public class OrgRel extends Model implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2181424740369712824L;
	
	private int or_id				;
	private String name			;
	private String or_desc			;
	private String or_type			;
	private String code		;
	private List<OrgrelDetail> orgRelDetail;
	
	public List<OrgrelDetail> getOrgRelDetail() {
		return orgRelDetail;
	}
	public void setOrgRelDetail(List<OrgrelDetail> orgRelDetail) {
		this.orgRelDetail = orgRelDetail;
	}
	public int getOr_id() {
		return or_id;
	}
	public void setOr_id(int or_id) {
		this.or_id = or_id;
	}
	public String getOr_desc() {
		return or_desc;
	}
	public void setOr_desc(String or_desc) {
		this.or_desc = or_desc;
	}
	public String getOr_type() {
		return or_type;
	}
	public void setOr_type(String or_type) {
		this.or_type = or_type;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCode() {
		return code;
	}
}
