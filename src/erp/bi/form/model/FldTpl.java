package erp.bi.form.model;

import java.io.Serializable;

import erp.common.Model;


public class FldTpl extends Model implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9097616609747828943L;
	private int id;
	private String fld_code;
	private String fld_alias;
	private String fld_name;
	private String datatype;
	private int len;
	private int prec;
	private String nullable;
	private String default_value;
	private String tpl_type;
	private String code_type;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFld_code() {
		return fld_code;
	}
	public void setFld_code(String fldCode) {
		fld_code = fldCode;
	}
	public String getFld_alias() {
		return fld_alias;
	}
	public void setFld_alias(String fldAlias) {
		fld_alias = fldAlias;
	}
	public String getFld_name() {
		return fld_name;
	}
	public void setFld_name(String fldName) {
		fld_name = fldName;
	}
	public String getDatatype() {
		return datatype;
	}
	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}
	public int getLen() {
		return len;
	}
	public void setLen(int len) {
		this.len = len;
	}
	public int getPrec() {
		return prec;
	}
	public void setPrec(int prec) {
		this.prec = prec;
	}
	public String getNullable() {
		return nullable;
	}
	public void setNullable(String nullable) {
		this.nullable = nullable;
	}
	public String getDefault_value() {
		return default_value;
	}
	public void setDefault_value(String defaultValue) {
		default_value = defaultValue;
	}
	public String getTpl_type() {
		return tpl_type;
	}
	public void setTpl_type(String tplType) {
		tpl_type = tplType;
	}
	public String getCode_type() {
		return code_type;
	}
	public void setCode_type(String codeType) {
		code_type = codeType;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
