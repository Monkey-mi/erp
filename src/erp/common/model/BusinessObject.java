package erp.common.model;

import java.util.Date;

public class BusinessObject {
	private int			obj_id;
	private String			obj_name;
	private int			mod_id;
	private String			obj_desc;
	private String			status;
	private String			creator;
	private String 			owner_only;
	private String 			create_name;
	private Date			create_dt;
	private String			editor;
	private String 			editor_name;
	private Date			editor_dt;

	public int getObj_id() {
		return obj_id;
	}
	public void setObj_id(int obj_id) {
		this.obj_id = obj_id;
	}
	public String getObj_name() {
		return obj_name;
	}
	public void setObj_name(String obj_name) {
		this.obj_name = obj_name;
	}
	public int getMod_id() {
		return mod_id;
	}
	public void setMod_id(int mod_id) {
		this.mod_id = mod_id;
	}
	public String getObj_desc() {
		return obj_desc;
	}
	public void setObj_desc(String obj_desc) {
		this.obj_desc = obj_desc;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
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
	public Date getEditor_dt() {
		return editor_dt;
	}
	public void setEditor_dt(Date editor_dt) {
		this.editor_dt = editor_dt;
	}
	public String getCreate_name() {
		return create_name;
	}
	public void setCreate_name(String create_name) {
		this.create_name = create_name;
	}
	public String getEditor_name() {
		return editor_name;
	}
	public void setEditor_name(String editor_name) {
		this.editor_name = editor_name;
	}
	public String getOwner_only() {
		return owner_only;
	}
	public void setOwner_only(String owner_only) {
		this.owner_only = owner_only;
	}
	
	
}
