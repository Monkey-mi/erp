package erp.erp.manufacturer.payAccount.model;

import java.io.Serializable;

public class BillDetail implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -658142833249518843L;
	private String hsbm;
	private String nf;
	private String yf;
	private String rq;
	private String pzh;
	private double kcpj;
	private double yfpj;
	private double pjyf;
	private String bzsm;
	private int px;
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public String getNf() {
		return nf;
	}
	public void setNf(String nf) {
		this.nf = nf;
	}
	public String getYf() {
		return yf;
	}
	public void setYf(String yf) {
		this.yf = yf;
	}
	public String getRq() {
		return rq;
	}
	public void setRq(String rq) {
		this.rq = rq;
	}
	public String getPzh() {
		return pzh;
	}
	public void setPzh(String pzh) {
		this.pzh = pzh;
	}
	
	public double getKcpj() {
		return kcpj;
	}
	public void setKcpj(double kcpj) {
		this.kcpj = kcpj;
	}
	public double getYfpj() {
		return yfpj;
	}
	public void setYfpj(double yfpj) {
		this.yfpj = yfpj;
	}
	public double getPjyf() {
		return pjyf;
	}
	public void setPjyf(double pjyf) {
		this.pjyf = pjyf;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public int getPx() {
		return px;
	}
	public void setPx(int px) {
		this.px = px;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

}
