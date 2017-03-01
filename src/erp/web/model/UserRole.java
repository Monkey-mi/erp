package erp.web.model;


import java.io.Serializable;

import erp.common.Model;


public class UserRole extends Model implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -9185027699710367475L;
	private int id;
    private int u_id;
    private int role_id;
    private int ou_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int uId) {
		u_id = uId;
	}
	public int getRole_id() {
		return role_id;
	}
	public void setRole_id(int roleId) {
		role_id = roleId;
	}
	public int getOu_id() {
		return ou_id;
	}
	public void setOu_id(int ouId) {
		ou_id = ouId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}