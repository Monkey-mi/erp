package erp.erp.master.operator.model;

import java.io.Serializable;

import erp.common.Model;


public class OperatorDept extends Model implements Serializable{

	private static final long serialVersionUID = 1L;
	private String			lbbh;
	private String			lbmc;
	private int			lbjc;
	private boolean			mjbz;

	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getLbmc() {
		return lbmc;
	}
	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}
	public int getLbjc() {
		return lbjc;
	}
	public void setLbjc(int lbjc) {
		this.lbjc = lbjc;
	}
	public boolean getMjbz() {
		return mjbz;
	}
	public void setMjbz(boolean mjbz) {
		this.mjbz = mjbz;
	}
}
