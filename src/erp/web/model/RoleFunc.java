package erp.web.model;



import java.io.Serializable;
import java.util.List;

import erp.common.Model;


public class RoleFunc extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5048919528877918335L;
	
	private int id;
	private int role_id;
	private int f_id;
	private List<Role> Roles;
	private List<Function> Funcs;
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
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int fId) {
		f_id = fId;
	}
	public List<Role> getRoles() {
		return Roles;
	}
	public void setRoles(List<Role> roles) {
		Roles = roles;
	}
	public List<Function> getFuncs() {
		return Funcs;
	}
	public void setFuncs(List<Function> funcs) {
		Funcs = funcs;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}