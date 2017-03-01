package erp.common.model;

import java.io.Serializable;

import erp.common.Model;


public class Ddlstcol extends Model implements Serializable{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6838642921459863369L;
	private int id   ;
	private String ddl_code ;
	private String col_code ;
	private String col_name ;
	private int col_width;
	private String order_seq;
	private String isdatacol;
	private String isdispcol;
	private String issortcol;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDdl_code() {
		return ddl_code;
	}
	public void setDdl_code(String ddlCode) {
		ddl_code = ddlCode;
	}
	public String getCol_code() {
		return col_code;
	}
	public void setCol_code(String colCode) {
		col_code = colCode;
	}
	public String getCol_name() {
		return col_name;
	}
	public void setCol_name(String colName) {
		col_name = colName;
	}
	public int getCol_width() {
		return col_width;
	}
	public void setCol_width(int colWidth) {
		col_width = colWidth;
	}
	public String getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(String orderSeq) {
		order_seq = orderSeq;
	}
	public String getIsdatacol() {
		return isdatacol;
	}
	public void setIsdatacol(String isdatacol) {
		this.isdatacol = isdatacol;
	}
	public String getIsdispcol() {
		return isdispcol;
	}
	public void setIsdispcol(String isdispcol) {
		this.isdispcol = isdispcol;
	}
	public String getIssortcol() {
		return issortcol;
	}
	public void setIssortcol(String issortcol) {
		this.issortcol = issortcol;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
