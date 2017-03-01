package erp.common;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class ListTAndMap <T> implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private Map<String,Object> params;
	private List<T> list;
	public ListTAndMap() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Map<String, Object> getParams() {
		return params;
	}
	public void setParams(Map<String, Object> params) {
		this.params = params;
	}
	public List<T> getList() {
		return list;
	}
	public void setList(List<T> list) {
		this.list = list;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
