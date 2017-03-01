package erp.erp.materialInspection.model;

import java.util.Date;

import erp.common.Model;


public class InspectionWareHouse extends Model {
	private String			ckbh;
	private String			ckmc;
	private int			tybj;
	private double 		qynf;
	private String 		yhbh;
	private String			hsbm;
	private int			scbj;
	private int			fscbj;
	private int			wmsqy;
	private String			wmsrm;
	private Date			wmssj;
	private int			fpcbj;
	private String		czy_gh;
	private String 		czy_xm;
	
	public String getCzy_gh() {
		return czy_gh;
	}
	public void setCzy_gh(String czy_gh) {
		this.czy_gh = czy_gh;
	}
	public String getCzy_xm() {
		return czy_xm;
	}
	public void setCzy_xm(String czy_xm) {
		this.czy_xm = czy_xm;
	}
	public String getCkbh() {
		return ckbh;
	}
	public void setCkbh(String ckbh) {
		this.ckbh = ckbh;
	}
	public String getCkmc() {
		return ckmc;
	}
	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
	}
	public int getTybj() {
		return tybj;
	}
	public void setTybj(int tybj) {
		this.tybj = tybj;
	}
	public double getQynf() {
		return qynf;
	}
	public void setQynf(double qynf) {
		this.qynf = qynf;
	}
	public String getYhbh() {
		return yhbh;
	}
	public void setYhbh(String yhbh) {
		this.yhbh = yhbh;
	}
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public int getScbj() {
		return scbj;
	}
	public void setScbj(int scbj) {
		this.scbj = scbj;
	}
	public int getFscbj() {
		return fscbj;
	}
	public void setFscbj(int fscbj) {
		this.fscbj = fscbj;
	}
	public int getWmsqy() {
		return wmsqy;
	}
	public void setWmsqy(int wmsqy) {
		this.wmsqy = wmsqy;
	}
	public String getWmsrm() {
		return wmsrm;
	}
	public void setWmsrm(String wmsrm) {
		this.wmsrm = wmsrm;
	}
	public Date getWmssj() {
		return wmssj;
	}
	public void setWmssj(Date wmssj) {
		this.wmssj = wmssj;
	}
	public int getFpcbj() {
		return fpcbj;
	}
	public void setFpcbj(int fpcbj) {
		this.fpcbj = fpcbj;
	}
	
}
