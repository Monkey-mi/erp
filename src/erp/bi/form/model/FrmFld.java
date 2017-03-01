package erp.bi.form.model;

import java.io.Serializable;

import erp.common.Model;


public class FrmFld extends Model implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 86868604547726556L;
	private int ff_id         ;
	private int ft_id         ;
	private String name          ;
	private String code          ;
	private String alias		  ;
	private String datatype      ;
	private int len        ;
	private int prec          ;
	private String ispk         ;
	private String isfk         ;
	private String isidx		;
	private String nullable      ;
	private String default_value ;
	private String ishide ;
	private String editable ;
	private String value_gen ;
	private String isbuildin ;
	private int order_seq     ;
    private String code_type;
	public int getFf_id() {
		return ff_id;
	}
	public void setFf_id(int ffId) {
		ff_id = ffId;
	}
	public int getFt_id() {
		return ft_id;
	}
	public void setFt_id(int ftId) {
		ft_id = ftId;
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
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
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
	public String getIspk() {
		return ispk;
	}
	public void setIspk(String ispk) {
		this.ispk = ispk;
	}
	public String getIsfk() {
		return isfk;
	}
	public void setIsfk(String isfk) {
		this.isfk = isfk;
	}
	public String getIsidx() {
		return isidx;
	}
	public void setIsidx(String isidx) {
		this.isidx = isidx;
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
	public String getIshide() {
		return ishide;
	}
	public void setIshide(String ishide) {
		this.ishide = ishide;
	}
	public String getEditable() {
		return editable;
	}
	public void setEditable(String editable) {
		this.editable = editable;
	}
	public String getValue_gen() {
		return value_gen;
	}
	public void setValue_gen(String valueGen) {
		value_gen = valueGen;
	}
	public String getIsbuildin() {
		return isbuildin;
	}
	public void setIsbuildin(String isbuildin) {
		this.isbuildin = isbuildin;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int orderSeq) {
		order_seq = orderSeq;
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
