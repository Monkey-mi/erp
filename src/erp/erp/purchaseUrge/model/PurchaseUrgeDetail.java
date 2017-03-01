package erp.erp.purchaseUrge.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class PurchaseUrgeDetail extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
	private int			jlxh;
	private double			ztsl;
	private Date			yjdh;
	private Date			qrjq;
	private String			lxbh;
	private String			ycyy;
	private String			czrm;
	private Date			czsj;

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
	public int getJlxh() {
		return jlxh;
	}
	public void setJlxh(int jlxh) {
		this.jlxh = jlxh;
	}
	public double getZtsl() {
		return ztsl;
	}
	public void setZtsl(double ztsl) {
		this.ztsl = ztsl;
	}
	public Date getYjdh() {
		return yjdh;
	}
	public void setYjdh(Date yjdh) {
		this.yjdh = yjdh;
	}
	public Date getQrjq() {
		return qrjq;
	}
	public void setQrjq(Date qrjq) {
		this.qrjq = qrjq;
	}
	public String getLxbh() {
		return lxbh;
	}
	public void setLxbh(String lxbh) {
		this.lxbh = lxbh;
	}
	public String getYcyy() {
		return ycyy;
	}
	public void setYcyy(String ycyy) {
		this.ycyy = ycyy;
	}
	public String getCzrm() {
		return czrm;
	}
	public void setCzrm(String czrm) {
		this.czrm = czrm;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
}
