package erp.web.model;


import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class OrgUnit extends Model  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7679691995614221588L;
	
	private int ou_id;
	private String ou_code;
	private String ou_name;
	private String ou_alias;
	private String ou_addr;
	private String ou_leader;
	private String ou_treasurer;
	private String ou_type;
	private String is_corp;
	private int d_id;
	private String create_ou_code;
	private String creator;
	private Date create_dtm;
	private String del_flag ;
	private String ou_attr1;
	public int getOu_id() {
		return ou_id;
	}
	public void setOu_id(int ou_id) {
		this.ou_id = ou_id;
	}
	public String getOu_code() {
		return ou_code;
	}
	public void setOu_code(String ou_code) {
		this.ou_code = ou_code;
	}
	public String getOu_name() {
		return ou_name;
	}
	public void setOu_name(String ou_name) {
		this.ou_name = ou_name;
	}
	public String getOu_type() {
		return ou_type;
	}
	public void setOu_type(String ou_type) {
		this.ou_type = ou_type;
	}
	public String getIs_corp() {
		return is_corp;
	}
	public void setIs_corp(String is_corp) {
		this.is_corp = is_corp;
	}
	public void setD_id(int d_id) {
		this.d_id = d_id;
	}
	public int getD_id() {
		return d_id;
	}
	public void setCreate_ou_code(String create_ou_code) {
		this.create_ou_code = create_ou_code;
	}
	public String getCreate_ou_code() {
		return create_ou_code;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getCreator() {
		return creator;
	}
	public String getOu_alias() {
		return ou_alias;
	}
	public void setOu_alias(String ou_alias) {
		this.ou_alias = ou_alias;
	}
	public String getOu_addr() {
		return ou_addr;
	}
	public void setOu_addr(String ou_addr) {
		this.ou_addr = ou_addr;
	}
	public String getOu_leader() {
		return ou_leader;
	}
	public void setOu_leader(String ou_leader) {
		this.ou_leader = ou_leader;
	}
	public String getOu_treasurer() {
		return ou_treasurer;
	}
	public void setOu_treasurer(String ou_treasurer) {
		this.ou_treasurer = ou_treasurer;
	}
	public Date getCreate_dtm() {
		return create_dtm;
	}
	public void setCreate_dtm(Date create_dtm) {
		this.create_dtm = create_dtm;
	}
	public String getDel_flag() {
		return del_flag;
	}
	public void setDel_flag(String del_flag) {
		this.del_flag = del_flag;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public void setOu_attr1(String ou_attr1) {
		this.ou_attr1 = ou_attr1;
	}
	public String getOu_attr1() {
		return ou_attr1;
	}
	
	
}
