package erp.common.model;

public class BuzObjectPermit {
	private int			p_id;
	private int			attr_id;
	private int			rule_id;
	private String			p_type;
	private int			p_obj;
	private String         obj_name;
	private String       permit;
	public int getP_id() {
		return p_id;
	}
	public void setP_id(int p_id) {
		this.p_id = p_id;
	}
	
	public int getAttr_id() {
		return attr_id;
	}
	public void setAttr_id(int attr_id) {
		this.attr_id = attr_id;
	}
	public int getRule_id() {
		return rule_id;
	}
	public void setRule_id(int rule_id) {
		this.rule_id = rule_id;
	}
	public String getP_type() {
		return p_type;
	}
	public void setP_type(String p_type) {
		this.p_type = p_type;
	}
	
    public int getP_obj() {
        return p_obj;
    }
    public void setP_obj(int p_obj) {
        this.p_obj = p_obj;
    }
    public String getObj_name() {
        return obj_name;
    }
    public void setObj_name(String obj_name) {
        this.obj_name = obj_name;
    }
    /**
     * Getter method for property <tt>permit</tt>.
     * 
     * @return property value of permit
     */
    public String getPermit() {
        return permit;
    }
    /**
     * Setter method for property <tt>permit</tt>.
     * 
     * @param permit value to be assigned to property permit
     */
    public void setPermit(String permit) {
        this.permit = permit;
    }
	
}
