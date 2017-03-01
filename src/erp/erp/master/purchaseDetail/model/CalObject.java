package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;

//用来计算的对象
public class CalObject extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String cgh;
	private double cgsl;
	public String getCgh() {
		return cgh;
	}
	public void setCgh(String cgh) {
		this.cgh = cgh;
	}
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	
}
