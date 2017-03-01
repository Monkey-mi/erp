package erp.web.model;


import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Repository;

import erp.common.Model;
//组织部门类
public class Dept extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4060681463578570420L;
	private int d_id;
	private int pd_id;
	private int ou_id;
	private String ou_code;
	private String d_code;
	private String d_name;
	private String d_manager;
	private String leaf;
	private String order_seq;
	private String func_code;
	private String del_flag;
	private List<Dept> data;
	public int getD_id() {
		return d_id;
	}
	public void setD_id(int d_id) {
		this.d_id = d_id;
	}
	public int getPd_id() {
		return pd_id;
	}
	public void setPd_id(int pd_id) {
		this.pd_id = pd_id;
	}
	public int getOu_id() {
		return ou_id;
	}
	public void setOu_id(int ou_id) {
		this.ou_id = ou_id;
	}
	
	public String getD_code() {
		return d_code;
	}
	public void setD_code(String d_code) {
		this.d_code = d_code;
	}
	public String getD_name() {
		return d_name;
	}
	public void setD_name(String d_name) {
		this.d_name = d_name;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(String order_seq) {
		this.order_seq = order_seq;
	}
	public void setData(List<Dept> dept) {
		this.data = dept;
	}
	public List<Dept> getData() {
		return data;
	}
	public void setFunc_code(String func_code) {
		this.func_code = func_code;
	}
	public String getFunc_code() {
		return func_code;
	}
	public String getOu_code() {
		return ou_code;
	}
	public void setOu_code(String ou_code) {
		this.ou_code = ou_code;
	}
	public String getD_manager() {
		return d_manager;
	}
	public void setD_manager(String d_manager) {
		this.d_manager = d_manager;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public void setDel_flag(String del_flag) {
		this.del_flag = del_flag;
	}
	public String getDel_flag() {
		return del_flag;
	}
	
}
