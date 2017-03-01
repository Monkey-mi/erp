package erp.web.model;

import java.io.Serializable;

import erp.common.Model;


public class UserModule extends Model implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 421069612295003630L;
	private int id;
    private int u_id;
    private int mod_id;
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
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int modId) {
		mod_id = modId;
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
