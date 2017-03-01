package erp.util;

import java.io.Serializable;

public class ValidField implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1911777484082662412L;
	private String field;
	private Object value;
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}
}