package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;


public class ProductionType extends Model implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1731153380399355553L;
	
	private String lbbh;
	private String lbmc;
	private int lbjc;
	private int mjbz;
	private int scbj;
	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getLbmc() {
		return lbmc;
	}
	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}
	public int getLbjc() {
		return lbjc;
	}
	public void setLbjc(int lbjc) {
		this.lbjc = lbjc;
	}
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
	}
	public int getScbj() {
		return scbj;
	}
	public void setScbj(int scbj) {
		this.scbj = scbj;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
