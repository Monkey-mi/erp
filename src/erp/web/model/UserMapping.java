package erp.web.model;

public class UserMapping {
	private int			id;
	private String			sys_name;
	private int			u_id;
	private String			ref_u_id;
	private String			status;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSys_name() {
		return sys_name;
	}
	public void setSys_name(String sys_name) {
		this.sys_name = sys_name;
	}
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int u_id) {
		this.u_id = u_id;
	}
	public String getRef_u_id() {
		return ref_u_id;
	}
	public void setRef_u_id(String ref_u_id) {
		this.ref_u_id = ref_u_id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
