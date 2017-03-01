package erp.erp.master.contractStop.model;

import java.io.Serializable;

import erp.common.Model;

public class ContractType extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
	private String			lxbh;
	private String			lxmc;
	private String			bzsm;

	public String getLxbh() {
		return lxbh;
	}
	public void setLxbh(String lxbh) {
		this.lxbh = lxbh;
	}
	public String getLxmc() {
		return lxmc;
	}
	public void setLxmc(String lxmc) {
		this.lxmc = lxmc;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
}
