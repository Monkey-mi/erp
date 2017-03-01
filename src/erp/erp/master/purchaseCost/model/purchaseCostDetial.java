package erp.erp.master.purchaseCost.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class purchaseCostDetial extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
	private double			fydh;
	private double			wjbh;
	private String			wjmc;
	private String			wjlj;
	private Date			wjrq;
	private String			cjrm;

	public double getFydh() {
		return fydh;
	}
	public void setFydh(double fydh) {
		this.fydh = fydh;
	}
	public double getWjbh() {
		return wjbh;
	}
	public void setWjbh(double wjbh) {
		this.wjbh = wjbh;
	}
	public String getWjmc() {
		return wjmc;
	}
	public void setWjmc(String wjmc) {
		this.wjmc = wjmc;
	}
	public String getWjlj() {
		return wjlj;
	}
	public void setWjlj(String wjlj) {
		this.wjlj = wjlj;
	}
	public Date getWjrq() {
		return wjrq;
	}
	public void setWjrq(Date wjrq) {
		this.wjrq = wjrq;
	}
	public String getCjrm() {
		return cjrm;
	}
	public void setCjrm(String cjrm) {
		this.cjrm = cjrm;
	}
}
