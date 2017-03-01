package erp.web.model;

import java.io.Serializable;

import erp.common.Model;


public class Function extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2583590794087096844L;
	private int f_id;
	private int mod_id;
	private String code;
	private String name;
	private String type;
	private int order_seq;
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int fId) {
		f_id = fId;
	}
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int modId) {
		mod_id = modId;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int orderSeq) {
		order_seq = orderSeq;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}


