package erp.common.model;

public class BusinessRefTable {
	private int			id;
	private int			obj_id;
	private String			tbl_name;
	private String			flag;
	private String sys_tbl_name;
	
	public String getSys_tbl_name() {
		return sys_tbl_name;
	}
	public void setSys_tbl_name(String sys_tbl_name) {
		this.sys_tbl_name = sys_tbl_name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getObj_id() {
		return obj_id;
	}
	public void setObj_id(int obj_id) {
		this.obj_id = obj_id;
	}
	public String getTbl_name() {
		return tbl_name;
	}
	public void setTbl_name(String tbl_name) {
		this.tbl_name = tbl_name;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
}
