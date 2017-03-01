package erp.erp.master.group.model;

import java.io.Serializable;

import erp.common.Model;

public class GroupOperator extends Model implements Serializable {
	private static final long serialVersionUID = 1L;
	private String cgzh;
	private String czy_gh;
	private String czy_xm;
	public String getCgzh() {
		return cgzh;
	}
	public void setCgzh(String cgzh) {
		this.cgzh = cgzh;
	}
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


}
