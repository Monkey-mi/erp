package erp.web.model;



import java.io.Serializable;
import java.util.List;

import erp.common.Model;


public class RoleModule extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 908172828524074762L;

	private int id;
	private int role_id;
	private int mod_id;
	private List<Role> Roles;
	private List<Module> Modules;
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
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int modId) {
		mod_id = modId;
	}
	public List<Role> getRoles() {
		return Roles;
	}
	public void setRoles(List<Role> roles) {
		Roles = roles;
	}
	public List<Module> getModules() {
		return Modules;
	}
	public void setModules(List<Module> modules) {
		Modules = modules;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}
