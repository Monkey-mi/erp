package erp.bi.dc.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class DateReportTemplate extends Model implements Serializable{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1385880176027951996L;
	private int			tpl_id;
	private String			name;
	private String			code;
	private String			b_code;
	private String			description;
	private String			ou_code;
	private String			d_code;
	private String			type;
	private String			tpl_xml;
	private String			creator;
	private Date			create_date;
	private String			valid;
	private int 			list_id;
	public int getTpl_id() {
		return tpl_id;
	}
	public void setTpl_id(int tplId) {
		tpl_id = tplId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getB_code() {
		return b_code;
	}
	public void setB_code(String bCode) {
		b_code = bCode;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getOu_code() {
		return ou_code;
	}
	public void setOu_code(String ouCode) {
		ou_code = ouCode;
	}
	public String getD_code() {
		return d_code;
	}
	public void setD_code(String dCode) {
		d_code = dCode;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTpl_xml() {
		return tpl_xml;
	}
	public void setTpl_xml(String tplXml) {
		tpl_xml = tplXml;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date createDate) {
		create_date = createDate;
	}
	public String getValid() {
		return valid;
	}
	public void setValid(String valid) {
		this.valid = valid;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getList_id() {
		return list_id;
	}
	public void setList_id(int listId) {
		list_id = listId;
	}
	
	
	
}
