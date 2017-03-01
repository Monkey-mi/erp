package erp.erp.master.purchaseCost.model;

import java.io.Serializable;

import erp.common.Model;

public class purchaseCostSum  extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
	private double			fydh;
	private double			xmxh;
	private String			fyxm;
	private double			fyje;

	public double getFydh() {
		return fydh;
	}
	public void setFydh(double fydh) {
		this.fydh = fydh;
	}
	public double getXmxh() {
		return xmxh;
	}
	public void setXmxh(double xmxh) {
		this.xmxh = xmxh;
	}
	public String getFyxm() {
		return fyxm;
	}
	public void setFyxm(String fyxm) {
		this.fyxm = fyxm;
	}
	public double getFyje() {
		return fyje;
	}
	public void setFyje(double fyje) {
		this.fyje = fyje;
	}
}
