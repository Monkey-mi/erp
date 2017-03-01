package erp.web.model;


import java.io.Serializable;
import java.util.Date;

public class DBVerList implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4201277488644261047L;
	
	private int id;
	private String dbver;
	private String isactive;
	private String remark;
	private Date createdtm;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDbver() {
		return dbver;
	}
	public void setDbver(String dbver) {
		this.dbver = dbver;
	}
	public String getIsactive() {
		return isactive;
	}
	public void setIsactive(String isactive) {
		this.isactive = isactive;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Date getCreatedtm() {
		return createdtm;
	}
	public void setCreatedtm(Date createdtm) {
		this.createdtm = createdtm;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

}
