package erp.common.model;

public class RuleDetail {
	private int			id;
	private int			rule_id;
	private int			attr_id;
	private String			value;
	private String			op_flag;
	private String			log_flag;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRule_id() {
		return rule_id;
	}
	public void setRule_id(int rule_id) {
		this.rule_id = rule_id;
	}
	public int getAttr_id() {
		return attr_id;
	}
	public void setAttr_id(int attr_id) {
		this.attr_id = attr_id;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getOp_flag() {
		return op_flag;
	}
	public void setOp_flag(String op_flag) {
		this.op_flag = op_flag;
	}
	public String getLog_flag() {
		return log_flag;
	}
	public void setLog_flag(String log_flag) {
		this.log_flag = log_flag;
	}
}
