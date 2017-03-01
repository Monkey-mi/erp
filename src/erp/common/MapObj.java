package erp.common;

import java.io.Serializable;
import java.util.Map;

public class MapObj implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String,Object> params;

	public Map<String, Object> getParams() {
		return params;
	}

	public void setParams(Map<String, Object> params) {
		this.params = params;
	}

	public MapObj(Map<String, Object> params) {
		super();
		this.params = params;
	}

	public MapObj() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
