package erp.erp.purchaseOrder.model;

import java.io.Serializable;

import erp.common.Model;

public class SplitDetailForPur extends Model implements Serializable{
	private int			cfbh;
	private int			cfxh;
	private String			fach;
	private String			khxh;
	private String			ywms;
	private String			pono;
	private String			xmsjbc;
	private double			cfxs;

	public int getCfbh() {
		return cfbh;
	}
	public void setCfbh(int cfbh) {
		this.cfbh = cfbh;
	}
	public int getCfxh() {
		return cfxh;
	}
	public void setCfxh(int cfxh) {
		this.cfxh = cfxh;
	}
	public String getFach() {
		return fach;
	}
	public void setFach(String fach) {
		this.fach = fach;
	}
	public String getKhxh() {
		return khxh;
	}
	public void setKhxh(String khxh) {
		this.khxh = khxh;
	}
	public String getYwms() {
		return ywms;
	}
	public void setYwms(String ywms) {
		this.ywms = ywms;
	}
	public String getPono() {
		return pono;
	}
	public void setPono(String pono) {
		this.pono = pono;
	}
	public String getXmsjbc() {
		return xmsjbc;
	}
	public void setXmsjbc(String xmsjbc) {
		this.xmsjbc = xmsjbc;
	}
	public double getCfxs() {
		return cfxs;
	}
	public void setCfxs(double cfxs) {
		this.cfxs = cfxs;
	}
}
