package erp.web.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class TpsLog extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7495445406369733627L;
	private int logid;
	private Date logdtm;
	private String clientip;
	private String login_id;
	private int   mod_id ;
	private String mod_name ;
	private String s_name ;
	private String s_path ;
	private String s_method ;
	private String s_data;
	public Date getLogdtm() {
		return logdtm;
	}
	public void setLogdtm(Date logdtm) {
		this.logdtm = logdtm;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int mod_id) {
		this.mod_id = mod_id;
	}
	public String getS_path() {
		if(s_path==null){
			return "";
		}
		return s_path;
	}
	public void setS_path(String s_path) {
		this.s_path = s_path;
	}
	public String getS_method() {
		if(s_method==null){
			return "";
		}
		return s_method;
	}
	public void setS_method(String s_method) {
		this.s_method = s_method;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public void setLogid(int logid) {
		this.logid = logid;
	}
	public int getLogid() {
		return logid;
	}
	public void setClientip(String clientip) {
		this.clientip = clientip;
	}
	public String getClientip() {
		if(clientip==null){
			return "";
		}
		return clientip;
	}
	public void setS_data(String s_data) {
		this.s_data = s_data;
	}
	public String getS_data() {
		if(s_data==null){
			return "";
		}
		return s_data;
	}
	public void setMod_name(String mod_name) {
		this.mod_name = mod_name;
	}
	public String getMod_name() {
		if(mod_name==null){
			return "";
		}
		return mod_name;
	}
	public void setS_name(String s_name) {
		this.s_name = s_name;
	}
	public String getS_name() {
		if(s_name==null){
			return "";
		}
		return s_name;
	}
}