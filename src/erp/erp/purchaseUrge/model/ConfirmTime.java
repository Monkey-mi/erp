package erp.erp.purchaseUrge.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class ConfirmTime extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
	private String			hth;
	private String			clmc;
	private String			cltx1;
	private double			cgsl;
	private Date			wkjq;
	private String			csbh;
	private Date			sxrq;
	private Date			qrjq;
	private String			zczy;
	private String zxqrrm;
	private String csmc;
	
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getZxqrrm() {
		return zxqrrm;
	}
	public void setZxqrrm(String zxqrrm) {
		this.zxqrrm = zxqrrm;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
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
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	public Date getWkjq() {
		return wkjq;
	}
	public void setWkjq(Date wkjq) {
		this.wkjq = wkjq;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public Date getSxrq() {
		return sxrq;
	}
	public void setSxrq(Date sxrq) {
		this.sxrq = sxrq;
	}
	public Date getQrjq() {
		return qrjq;
	}
	public void setQrjq(Date qrjq) {
		this.qrjq = qrjq;
	}
	public String getZczy() {
		return zczy;
	}
	public void setZczy(String zczy) {
		this.zczy = zczy;
	}
}
