package erp.erp.manufacturer.payAccount.model;

import java.io.Serializable;
import java.util.Date;

public class CreatePayPlanForm implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1871073638689634051L;
	private int jhbh;
	private Date ldt_qsrq;
	private Date ldt_jzrq;
	private Date czsj;
	private String bzsm;
	private String czym;
	public int getJhbh() {
		return jhbh;
	}
	public void setJhbh(int jhbh) {
		this.jhbh = jhbh;
	}
	public Date getQsrq() {
		return ldt_jzrq;
	}
	public void setQsrq(Date qsrq) {
		this.ldt_jzrq = qsrq;
	}
	public Date getJzrq() {
		return ldt_qsrq;
	}
	public void setJzrq(Date jzrq) {
		this.ldt_qsrq = jzrq;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getCzym() {
		return czym;
	}
	public void setCzym(String czym) {
		this.czym = czym;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
