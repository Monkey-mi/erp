package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;

public class ProcessName extends Model implements Serializable{
	
	private String gxbh;
	private String gxmc;
	private int gxjc;
	private int mjbz;
	private String bzsm;
	public String getGxbh() {
		return gxbh;
	}
	public void setGxbh(String gxbh) {
		this.gxbh = gxbh;
	}
	public String getGxmc() {
		return gxmc;
	}
	public void setGxmc(String gxmc) {
		this.gxmc = gxmc;
	}
	public int getGxjc() {
		return gxjc;
	}
	public void setGxjc(int gxjc) {
		this.gxjc = gxjc;
	}
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	
}
