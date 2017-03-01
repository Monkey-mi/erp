package erp.bi.report.model;

import java.io.Serializable;

import erp.common.Model;


public class SysPrintModel extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2976580547706673634L;
	private int			mod_id;
	private int			menu_id;
	private String			name;
	private String			mod_description;
	private String			creater;
	private String			mod_tpl;
	private String			sql_text;
	private String 		userName;
	private String default_style;
	private int ds_id;
	private String is_active;
	private String report_type;
	private int order_seq;
	private String is_out;
	
	public String getIs_out() {
		return is_out;
	}
	public void setIs_out(String is_out) {
		this.is_out = is_out;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public String getReport_type() {
		return report_type;
	}
	public void setReport_type(String reportType) {
		report_type = reportType;
	}
	public String getIs_active() {
		return is_active;
	}
	public void setIs_active(String isActive) {
		is_active = isActive;
	}
	public String getDefault_style() {
		return default_style;
	}
	public void setDefault_style(String defaultStyle) {
		default_style = defaultStyle;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int mod_id) {
		this.mod_id = mod_id;
	}
	public int getMenu_id() {
		return menu_id;
	}
	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMod_description() {
		return mod_description;
	}
	public void setMod_description(String mod_description) {
		this.mod_description = mod_description;
	}
	public String getCreater() {
		return creater;
	}
	public void setCreater(String creater) {
		this.creater = creater;
	}
	public String getMod_tpl() {
		if(mod_tpl==null){
			return "";
		}
		return mod_tpl;
	}
	public void setMod_tpl(String mod_tpl) {
		this.mod_tpl = mod_tpl;
	}
	public String getSql_text() {
		return sql_text;
	}
	public void setSql_text(String sql_text) {
		this.sql_text = sql_text;
	}
	public int getDs_id() {
		return ds_id;
	}
	public void setDs_id(int dsId) {
		ds_id = dsId;
	}
	
	
}
