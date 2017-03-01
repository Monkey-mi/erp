package erp.web.model;


import java.io.Serializable;

import erp.common.Model;


public class RoleConfig  extends Model implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = -5935601034012589275L;
	private int id;
    private int role_id;
    private int con_id;
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
	public int getCon_id() {
		return con_id;
	}
	public void setCon_id(int conId) {
		con_id = conId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
    
}
