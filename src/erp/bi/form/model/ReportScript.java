package erp.bi.form.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class ReportScript extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4978030706881994305L;
	
	private int sp_id;
	private int list_id;
	private String sp_name;
	private String remark;
	private String content;
	private Date create_date;
	private Date modify_date;
	public int getSp_id() {
		return sp_id;
	}
	public void setSp_id(int spId) {
		sp_id = spId;
	}
	public int getList_id() {
		return list_id;
	}
	public void setList_id(int listId) {
		list_id = listId;
	}
	public String getSp_name() {
		return sp_name;
	}
	public void setSp_name(String spName) {
		sp_name = spName;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date createDate) {
		create_date = createDate;
	}
	public Date getModify_date() {
		return modify_date;
	}
	public void setModify_date(Date modifyDate) {
		modify_date = modifyDate;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	
}
