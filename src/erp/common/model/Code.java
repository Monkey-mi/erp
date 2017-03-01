package erp.common.model;


import java.io.Serializable;
import java.util.List;

import erp.common.Model;

public class Code extends Model implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int cid;
	private String type_code;
	
	private String code;
	private String name;
	private String value;
	private int order_seq;
	private String attrib;
	private String def_1;
	private String def_2;
	private String def_3;
	
	private List<Code> data; 
	public List<Code> getData() {
		return data;
	}
	public void setData(List<Code> data) {
		this.data = data;
	}
	public String getType_code() {
		return type_code;
	}
	public void setType_code(String type_code) {
		this.type_code = type_code;
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
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public String getAttrib() {
		return attrib;
	}
	public void setAttrib(String attrib) {
		this.attrib = attrib;
	}
	public String getDef_1() {
		return def_1;
	}
	public void setDef_1(String def_1) {
		this.def_1 = def_1;
	}
	public String getDef_2() {
		return def_2;
	}
	public void setDef_2(String def_2) {
		this.def_2 = def_2;
	}
	public String getDef_3() {
		return def_3;
	}
	public void setDef_3(String def_3) {
		this.def_3 = def_3;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public int getCid() {
		return cid;
	}
		
}