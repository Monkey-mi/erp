package erp.common.model;

public class BuzObjectSvr {
	private int			svr_id;
	private int			obj_id;
	private String			service_name;
	private String			ref_method_code;

	public int getSvr_id() {
		return svr_id;
	}
	public void setSvr_id(int svr_id) {
		this.svr_id = svr_id;
	}
	public int getObj_id() {
		return obj_id;
	}
	public void setObj_id(int obj_id) {
		this.obj_id = obj_id;
	}
	public String getService_name() {
		return service_name;
	}
	public void setService_name(String service_name) {
		this.service_name = service_name;
	}
	public String getRef_method_code() {
		return ref_method_code;
	}
	public void setRef_method_code(String ref_method_code) {
		this.ref_method_code = ref_method_code;
	}
}
