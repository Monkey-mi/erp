package erp.erp.manufacturer.payAccount.model;

import java.io.Serializable;

public class Sysxxb implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4056013101373247656L;
	
	private int yhbh;
	private String yhjc;
	public int getYhbh() {
		return yhbh;
	}
	public void setYhbh(int yhbh) {
		this.yhbh = yhbh;
	}
	public String getYhjc() {
		return yhjc;
	}
	public void setYhjc(String yhjc) {
		this.yhjc = yhjc;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

}
