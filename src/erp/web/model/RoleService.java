package erp.web.model;



import java.io.Serializable;
import java.util.List;

import erp.common.Model;


public class RoleService extends Model implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5534275313719000417L;
	private int id;
	private int role_id;
	private int s_id;
	private List<Role> Roles;
	private List<HttpService> Services;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int roleId) {
		role_id = roleId;
	}
	public int getS_id() {
		return s_id;
	}
	public void setS_id(int sId) {
		s_id = sId;
	}
	public List<Role> getRoles() {
		return Roles;
	}
	public void setRoles(List<Role> roles) {
		Roles = roles;
	}
	public List<HttpService> getServices() {
		return Services;
	}
	public void setServices(List<HttpService> services) {
		Services = services;
	}
	
	
	
}
