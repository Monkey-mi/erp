package erp.bi.dc.model;

import java.io.Serializable;

import erp.common.Model;


public class DataCenterDesc extends Model implements Serializable  {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = -6666813029720524281L;
	private int ds_desc_id;
    private int ds_id;
    private String col_name;
    private String col_code;
    private String data_type;
	public int getDs_desc_id() {
		return ds_desc_id;
	}
	public void setDs_desc_id(int dsDescId) {
		ds_desc_id = dsDescId;
	}
	public int getDs_id() {
		return ds_id;
	}
	public void setDs_id(int dsId) {
		ds_id = dsId;
	}
	public String getCol_name() {
		return col_name;
	}
	public void setCol_name(String colName) {
		col_name = colName;
	}
	public String getCol_code() {
		return col_code;
	}
	public void setCol_code(String colCode) {
		col_code = colCode;
	}
	public String getData_type() {
		return data_type;
	}
	public void setData_type(String dataType) {
		data_type = dataType;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
}
