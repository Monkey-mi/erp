package erp.web.model;


import java.io.Serializable;

import org.springframework.stereotype.Repository;

import erp.common.Model;

public class HttpService extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1380774342363783123L;
	
	private int s_id;
	private String s_name;
	private int mod_id;
	private String s_path;
	private String m_name;
	private String p_desc;
	private String type;
	private int order_seq;
	private String remark;
	public int getS_id() {
		return s_id;
	}
	public void setS_id(int s_id) {
		this.s_id = s_id;
	}
	public String getS_name() {
		return s_name;
	}
	public void setS_name(String s_name) {
		this.s_name = s_name;
	}
	public String getS_path() {
		return s_path;
	}
	public void setS_path(String s_path) {
		this.s_path = s_path;
	}
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	public String getP_desc() {
		return p_desc;
	}
	public void setP_desc(String p_desc) {
		this.p_desc = p_desc;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int mod_id) {
		this.mod_id = mod_id;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	
}