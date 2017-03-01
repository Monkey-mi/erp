package erp.bi.report.model;

public class CustomQueryUse {

	private int use_id; //常用id
	private int l_id;//自定义查询操作id
	private String l_name;
	private Integer user_id;//用户id
	private String user_type;//用户类型
	private int sequence;//显示顺序
	private String l_desc; //显示报表描述
	
	public int getUse_id() {
		return use_id;
	}
	public void setUse_id(int use_id) {
		this.use_id = use_id;
	}
	public String getL_name() {
		return l_name;
	}
	public void setL_name(String l_name) {
		this.l_name = l_name;
	}
	public int getL_id() {
		return l_id;
	}
	public void setL_id(int l_id) {
		this.l_id = l_id;
	}
	public Integer getUser_id() {
		return user_id;
	}
	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}
	public String getUser_type() {
		return user_type;
	}
	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}
	public int getSequence() {
		return sequence;
	}
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}
	public String getL_desc() {
		return l_desc;
	}
	public void setL_desc(String lDesc) {
		l_desc = lDesc;
	}	
	
}
