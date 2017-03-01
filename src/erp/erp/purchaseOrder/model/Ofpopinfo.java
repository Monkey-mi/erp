package erp.erp.purchaseOrder.model;

import java.io.Serializable;

public class Ofpopinfo implements Serializable{
	private String			loginid;
	private String			infotitle;
	private String			infosubject;
	private String			infourl;
	private long			sendtime;

	public String getLoginid() {
		return loginid;
	}
	public void setLoginid(String loginid) {
		this.loginid = loginid;
	}
	public String getInfotitle() {
		return infotitle;
	}
	public void setInfotitle(String infotitle) {
		this.infotitle = infotitle;
	}
	public String getInfosubject() {
		return infosubject;
	}
	public void setInfosubject(String infosubject) {
		this.infosubject = infosubject;
	}
	public String getInfourl() {
		return infourl;
	}
	public void setInfourl(String infourl) {
		this.infourl = infourl;
	}
	public long getSendtime() {
		return sendtime;
	}
	public void setSendtime(long l) {
		this.sendtime = l;
	}
}
