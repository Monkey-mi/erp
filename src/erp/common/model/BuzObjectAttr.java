package erp.common.model;

import java.util.Date;

public class BuzObjectAttr {
	private int			attr_id;
	private int			obj_id;
	private String			attr_name;
	private String           tbl_name;
	private String			fd_name;
	private String			ispk;
	private String 			fd_type;
	private String			allow_blank;
	private String			default_value;
	private String			order_type;
	private String			creator;
	private Date			create_dt;
	private String			editor;
	private Date			edit_dt;
	private int    org_ff_id;

	public int getAttr_id() {
		return attr_id;
	}
	public void setAttr_id(int attr_id) {
		this.attr_id = attr_id;
	}
	public int getObj_id() {
		return obj_id;
	}
	public void setObj_id(int obj_id) {
		this.obj_id = obj_id;
	}
	public String getAttr_name() {
		return attr_name;
	}

	public void setAttr_name(String attr_name) {
		this.attr_name = attr_name;
	}
	
	
	/**
     * Getter method for property <tt>tbl_name</tt>.
     * 
     * @return property value of tbl_name
     */
    public String getTbl_name() {
        return tbl_name;
    }
    /**
     * Setter method for property <tt>tbl_name</tt>.
     * 
     * @param tbl_name value to be assigned to property tbl_name
     */
    public void setTbl_name(String tbl_name) {
        this.tbl_name = tbl_name;
    }
    public String getFd_name() {
		return fd_name;
	}
	public void setFd_name(String fd_name) {
		this.fd_name = fd_name;
	}
	public String getIspk() {
		return ispk;
	}
	public void setIspk(String ispk) {
		this.ispk = ispk;
	}
	public String getAllow_blank() {
		return allow_blank;
	}
	public void setAllow_blank(String allow_blank) {
		this.allow_blank = allow_blank;
	}
	public String getDefault_value() {
		return default_value;
	}
	public void setDefault_value(String default_value) {
		this.default_value = default_value;
	}
	public String getOrder_type() {
		return order_type;
	}
	public void setOrder_type(String order_type) {
		this.order_type = order_type;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public Date getEdit_dt() {
		return edit_dt;
	}
	public void setEdit_dt(Date edit_dt) {
		this.edit_dt = edit_dt;
	}
	public String getFd_type() {
		return fd_type;
	}
	public void setFd_type(String fd_type) {
		this.fd_type = fd_type;
	}
    /**
     * Getter method for property <tt>org_ff_id</tt>.
     * 
     * @return property value of org_ff_id
     */
    public int getOrg_ff_id() {
        return org_ff_id;
    }
    /**
     * Setter method for property <tt>org_ff_id</tt>.
     * 
     * @param org_ff_id value to be assigned to property org_ff_id
     */
    public void setOrg_ff_id(int org_ff_id) {
        this.org_ff_id = org_ff_id;
    }
	
}
