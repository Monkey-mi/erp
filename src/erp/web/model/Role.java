package erp.web.model;


import java.io.Serializable;

import org.springframework.stereotype.Repository;

import erp.common.Model;

public class Role extends Model implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 957810537852494065L;
	private int role_id;
	private String role_name;
	private String role_desc;
	private int order_seq;
	private String creator;
	private String create_ou;
	private String has_prj;
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	public String getRole_desc() {
		return role_desc;
	}
	public void setRole_desc(String role_desc) {
		this.role_desc = role_desc;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreate_ou(String create_ou) {
		this.create_ou = create_ou;
	}
	public String getCreate_ou() {
		return create_ou;
	}
	public String getHas_prj() {
		return has_prj;
	}
	public void setHas_prj(String has_prj) {
		this.has_prj = has_prj;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}	