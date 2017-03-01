package erp.erp.arrivalRegister.model;

import java.io.Serializable;

import erp.common.Model;

public class Dhztb extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
	private String ckbh;
	private double dhdh;
	private double dhxh;
	public String getCkbh() {
		return ckbh;
	}
	public void setCkbh(String ckbh) {
		this.ckbh = ckbh;
	}
	public double getDhdh() {
		return dhdh;
	}
	public void setDhdh(double dhdh) {
		this.dhdh = dhdh;
	}
	public double getDhxh() {
		return dhxh;
	}
	public void setDhxh(double dhxh) {
		this.dhxh = dhxh;
	}
}
