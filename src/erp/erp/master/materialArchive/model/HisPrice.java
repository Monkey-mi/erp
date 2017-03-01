package erp.erp.master.materialArchive.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class HisPrice extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
	private String jlbh;
    private String clhh;
    private double kzdj;
    private Date jlrq;
    private double fzkj;
	public String getJlbh() {
		return jlbh;
	}
	public void setJlbh(String jlbh) {
		this.jlbh = jlbh;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public double getKzdj() {
		return kzdj;
	}
	public void setKzdj(double kzdj) {
		this.kzdj = kzdj;
	}
	public Date getJlrq() {
		return jlrq;
	}
	public void setJlrq(Date jlrq) {
		this.jlrq = jlrq;
	}
	public double getFzkj() {
		return fzkj;
	}
	public void setFzkj(double fzkj) {
		this.fzkj = fzkj;
	}
}
