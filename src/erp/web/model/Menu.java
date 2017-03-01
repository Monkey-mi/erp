package erp.web.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class Menu extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String menuid;
	private String menuname;
	private String permission;
	private String path;
	private String isleaf;
	private String icon_class;
	private int parent_id;
	private int status_flg;
	private int order_flg;
	private String create_by;
	private Date create_date;
	private String update_by;
	private Date update_date;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMenuid() {
		return menuid;
	}
	public void setMenuid(String menuid) {
		this.menuid = menuid;
	}
	public String getMenuname() {
		return menuname;
	}
	public void setMenuname(String menuname) {
		this.menuname = menuname;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getIsleaf() {
		return isleaf;
	}
	public void setIsleaf(String isleaf) {
		this.isleaf = isleaf;
	}
	public String getIcon_class() {
		return icon_class;
	}
	public void setIcon_class(String iconClass) {
		icon_class = iconClass;
	}
	public int getParent_id() {
		return parent_id;
	}
	public void setParent_id(int parentId) {
		parent_id = parentId;
	}
	public int getStatus_flg() {
		return status_flg;
	}
	public void setStatus_flg(int statusFlg) {
		status_flg = statusFlg;
	}
	public int getOrder_flg() {
		return order_flg;
	}
	public void setOrder_flg(int orderFlg) {
		order_flg = orderFlg;
	}
	public String getCreate_by() {
		return create_by;
	}
	public void setCreate_by(String createBy) {
		create_by = createBy;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date createDate) {
		create_date = createDate;
	}
	public String getUpdate_by() {
		return update_by;
	}
	public void setUpdate_by(String updateBy) {
		update_by = updateBy;
	}
	public Date getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(Date updateDate) {
		update_date = updateDate;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	
}
