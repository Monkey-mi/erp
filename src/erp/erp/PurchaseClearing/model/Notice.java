package erp.erp.PurchaseClearing.model;

import java.util.Date;

public class Notice {
	private double			tzdh;
	private Date			tzrq;
	private String			csbh;
	private String			bzsm;
	private int			hxbj;
	private int			ysbj;
	private int			yfbj;
	private Date			sprq;
	private Date			fcrq;
	private String			czym;
	private Date			czsj;
	private int			gdbj;
	private Date			qsrq;
	private Date			jzrq;
	private String			sjrm;
	private String			hsbm;
	private String			fcrm;
	private String			hsbmmc;
	private int			dsbj;
	private String      csmc;
 	
	public int getHxbj() {
		return hxbj;
	}
	public void setHxbj(int hxbj) {
		this.hxbj = hxbj;
	}
	public String getCsmc() {
 		if(csmc==null){
			return "";
		}
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getHsbmmc() {
		if(hsbmmc==null){
			return "";
		}
		return hsbmmc;
	}
	public void setHsbmmc(String hsbmmc) {
		this.hsbmmc = hsbmmc;
	}
	public double getTzdh() {
		return tzdh;
	}
	public void setTzdh(double tzdh) {
		this.tzdh = tzdh;
	}
	public Date getTzrq() {
		return tzrq;
	}
	public void setTzrq(Date tzrq) {
		this.tzrq = tzrq;
	}
	public String getCsbh() {
		if(csbh==null){
			return "";
		}
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public String getBzsm() {
		if(bzsm==null){
			return "";
		}
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public int getYsbj() {
		return ysbj;
	}
	public void setYsbj(int ysbj) {
		this.ysbj = ysbj;
	}
	public int getYfbj() {
		return yfbj;
	}
	public void setYfbj(int yfbj) {
		this.yfbj = yfbj;
	}
	public Date getSprq() {
		return sprq;
	}
	public void setSprq(Date sprq) {
		this.sprq = sprq;
	}
	public Date getFcrq() {
		return fcrq;
	}
	public void setFcrq(Date fcrq) {
		this.fcrq = fcrq;
	}
	public String getCzym() {
		if(czym==null){
			return "";
		}
		return czym;
	}
	public void setCzym(String czym) {
		this.czym = czym;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
	public Date getQsrq() {
		return qsrq;
	}
	public void setQsrq(Date qsrq) {
		this.qsrq = qsrq;
	}
	public Date getJzrq() {
		return jzrq;
	}
	public void setJzrq(Date jzrq) {
		this.jzrq = jzrq;
	}
	public String getSjrm() {
		if(sjrm==null){
			return "";
		}
		return sjrm;
	}
	public void setSjrm(String sjrm) {
		this.sjrm = sjrm;
	}
	public String getHsbm() {
		if(hsbm==null){
			return "";
		}
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public String getFcrm() {
		if(fcrm==null){
			return "";
		}
		return fcrm;
	}
	public void setFcrm(String fcrm) {
		this.fcrm = fcrm;
	}
	public int getDsbj() {
		return dsbj;
	}
	public void setDsbj(int dsbj) {
		this.dsbj = dsbj;
	}
}
