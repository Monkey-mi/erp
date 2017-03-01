package erp.web.model;

import java.io.Serializable;

import erp.common.Model;


public class UserFunc extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4800380984600893037L;
    private int id;
    private int u_id;
    private int f_id;
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
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int fId) {
		f_id = fId;
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
