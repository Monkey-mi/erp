package erp.erp.purchaseUrge.model;

import java.io.Serializable;

import erp.common.Model;

public class ProcessCost extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
	private String			hth;
	private double			clje;
	private double			cgsl;
	private double			jgje;
	private String			clhh;
	private String			jldw;
	private String			clmc;
	private String			cltx1;
	private String			plmth;
	private String			plmtx;

	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public int getHtxh() {
		return htxh;
	}
	public void setHtxh(int htxh) {
		this.htxh = htxh;
	}
	public String getHth() {
		return hth;
	}
	public void setHth(String hth) {
		this.hth = hth;
	}
	public double getClje() {
		return clje;
	}
	public void setClje(double clje) {
		this.clje = clje;
	}
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	public double getJgje() {
		return jgje;
	}
	public void setJgje(double jgje) {
		this.jgje = jgje;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getCltx1() {
		return cltx1;
	}
	public void setCltx1(String cltx1) {
		this.cltx1 = cltx1;
	}
	public String getPlmth() {
		return plmth;
	}
	public void setPlmth(String plmth) {
		this.plmth = plmth;
	}
	public String getPlmtx() {
		return plmtx;
	}
	public void setPlmtx(String plmtx) {
		this.plmtx = plmtx;
	}
}
