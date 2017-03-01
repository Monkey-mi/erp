package erp.web.model;


import java.io.Serializable;

import erp.common.Model;

public class UserDept extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8917379489754073946L;
	private int id        ;
	private int u_id      ;
	private int d_id     ;
	private String pv	      ;
	private String has_qry   ;
	private String has_curd  ;
	private String is_default;
	private String has_op1   ;
	private String has_op2   ;
	private String has_op3   ;
	private String has_op4   ;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int u_id) {
		this.u_id = u_id;
	}
	public int getD_id() {
		return d_id;
	}
	public void setD_id(int d_id) {
		this.d_id = d_id;
	}
	public String getHas_qry() {
		return has_qry;
	}
	public void setHas_qry(String has_qry) {
		this.has_qry = has_qry;
	}
	public String getHas_curd() {
		return has_curd;
	}
	public void setHas_curd(String has_curd) {
		this.has_curd = has_curd;
	}
	public String getIs_default() {
		return is_default;
	}
	public void setIs_default(String is_default) {
		this.is_default = is_default;
	}
	public String getHas_op1() {
		return has_op1;
	}
	public void setHas_op1(String has_op1) {
		this.has_op1 = has_op1;
	}
	public String getHas_op2() {
		return has_op2;
	}
	public void setHas_op2(String has_op2) {
		this.has_op2 = has_op2;
	}
	public String getHas_op3() {
		return has_op3;
	}
	public void setHas_op3(String has_op3) {
		this.has_op3 = has_op3;
	}
	public String getHas_op4() {
		return has_op4;
	}
	public void setHas_op4(String has_op4) {
		this.has_op4 = has_op4;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public void setPv(String pv) {
		this.pv = pv;
	}
	public String getPv() {
		return pv;
	}
	
}
