package erp.bi.dc.model;

import java.io.Serializable;

import erp.common.Model;


public class DataCenter extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7617530355494722649L;
    private int ds_id;
    private String b_code;
    private String code;
    private String name;
    private String tip;
    private String data_url;
    private String desc_url;
    private String mode;
    private int dsid;
    private String script_sql;
    private String text;
    private int list_id;
    private String data_type;
    private int ft_id;
    private String table_name;
    private String fd_code;
    
	public String getTable_name() {
		return table_name;
	}
	public void setTable_name(String tableName) {
		table_name = tableName;
	}
	public int getDs_id() {
		return ds_id;
	}
	public void setDs_id(int dsId) {
		ds_id = dsId;
	}
	public String getB_code() {
		return b_code;
	}
	public void setB_code(String bCode) {
		b_code = bCode;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
	public String getData_url() {
		return data_url;
	}
	public void setData_url(String dataUrl) {
		data_url = dataUrl;
	}
	public String getDesc_url() {
		return desc_url;
	}
	public void setDesc_url(String descUrl) {
		desc_url = descUrl;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getScript_sql() {
		if(script_sql==null){
			return "";
		}
		return script_sql;
	}
	public void setScript_sql(String scriptSql) {
		script_sql = scriptSql;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
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
	public int getDsid() {
		return dsid;
	}
	public void setDsid(int dsid) {
		this.dsid = dsid;
	}
	public String getData_type() {
		return data_type;
	}
	public void setData_type(String dataType) {
		data_type = dataType;
	}
	public int getFt_id() {
		return ft_id;
	}
	public void setFt_id(int ftId) {
		ft_id = ftId;
	}
	public String getFd_code() {
		return fd_code;
	}
	public void setFd_code(String fdCode) {
		fd_code = fdCode;
	}
	
}
