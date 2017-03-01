package erp.bi.dc.model;

import java.io.Serializable;

import erp.common.Model;


public class DataCenterParam extends Model implements Serializable{
	
    /**
	 * 
	 */
	private static final long serialVersionUID = -7199120385420337655L;
	private int ds_param_id;
    private int ds_id;
    private String name;
    private String code;
    private String datatype;
    private int seq;
    private int list_id;
    private String basic_code;
    private String default_value;
	public int getDs_param_id() {
		return ds_param_id;
	}
	public void setDs_param_id(int dsParamId) {
		ds_param_id = dsParamId;
	}
	public int getDs_id() {
		return ds_id;
	}
	public void setDs_id(int dsId) {
		ds_id = dsId;
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
	public String getDatatype() {
		return datatype;
	}
	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getBasic_code() {
		return basic_code;
	}
	public void setBasic_code(String basicCode) {
		basic_code = basicCode;
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
	public String getDefault_value() {
		return default_value;
	}
	public void setDefault_value(String default_value) {
		this.default_value = default_value;
	}
    
    
}
