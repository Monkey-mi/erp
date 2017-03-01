package erp.erp.manufacturer.payAccount.model;

import java.io.Serializable;

public class Cslb implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5241856891533543053L;
    private String mjms;
    private String mjxl;
    private String cslb;
	public String getMjms() {
		return mjms;
	}
	public void setMjms(String mjms) {
		this.mjms = mjms;
	}
	public String getMjxl() {
		return mjxl;
	}
	public void setMjxl(String mjxl) {
		this.mjxl = mjxl;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getCslb() {
		return cslb;
	}
	public void setCslb(String cslb) {
		this.cslb = cslb;
	}
    
}
