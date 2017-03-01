package erp.web.model;

import java.util.Date;

public class Exclusive {
	private String			u_id;
	private String			bills_num;
	private String			ip_add;
	private String			u_mac;
	private String			u_name;
	private Date			lock_time;
	private String			bills_id;

	public String getU_id() {
		return u_id;
	}
	public void setU_id(String u_id) {
		this.u_id = u_id;
	}
	public String getBills_num() {
		return bills_num;
	}
	public void setBills_num(String bills_num) {
		this.bills_num = bills_num;
	}
	public String getIp_add() {
		return ip_add;
	}
	public void setIp_add(String ip_add) {
		this.ip_add = ip_add;
	}
	public String getU_mac() {
		return u_mac;
	}
	public void setU_mac(String u_mac) {
		this.u_mac = u_mac;
	}
	public String getU_name() {
		return u_name;
	}
	public void setU_name(String u_name) {
		this.u_name = u_name;
	}
	public Date getLock_time() {
		return lock_time;
	}
	public void setLock_time(Date lock_time) {
		this.lock_time = lock_time;
	}
	public String getBills_id() {
		return bills_id;
	}
	public void setBills_id(String bills_id) {
		this.bills_id = bills_id;
	}
}
