package erp.erp.purchaseOrder.model;

import java.io.Serializable;

import erp.common.Model;

public class SalesOrder extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private double dhsl;
	private String jhlb;
	private double cpjz;
	private double zxjz;
	public double getDhsl() {
		return dhsl;
	}
	public void setDhsl(double dhsl) {
		this.dhsl = dhsl;
	}
	public String getJhlb() {
		return jhlb;
	}
	public void setJhlb(String jhlb) {
		this.jhlb = jhlb;
	}
	public double getCpjz() {
		return cpjz;
	}
	public void setCpjz(double cpjz) {
		this.cpjz = cpjz;
	}
	public double getZxjz() {
		return zxjz;
	}
	public void setZxjz(double zxjz) {
		this.zxjz = zxjz;
	}
	
}
