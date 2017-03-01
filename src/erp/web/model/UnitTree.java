package erp.web.model;


import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Repository;

import erp.common.Model;

public class UnitTree extends Model implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8468422862551534485L;
    private int id;
    private int parentId;
    private String name;
    private String code;
    private String leaf;
    private int orv_id;
    private int ou_id;
    private int d_id;
    private int od_id;
    private boolean checked;
    private String has_op;
    private String has_op1;
    private String has_op2;
    private String has_op3;
    private List<UnitTree> data;
    
	public String getHas_op() {
		return has_op;
	}
	public void setHas_op(String has_op) {
		this.has_op = has_op;
	}
	public String getHas_op1() {
		return has_op1;
	}
	public void setHas_op1(String has_op1) {
		this.has_op1 = has_op1;
	}
	public String getHas_op2() {
		return has_op2;
	}
	public void setHas_op2(String has_op2) {
		this.has_op2 = has_op2;
	}
	public String getHas_op3() {
		return has_op3;
	}
	public void setHas_op3(String has_op3) {
		this.has_op3 = has_op3;
	}
	public List<UnitTree> getData() {
		return data;
	}
	public void setData(List<UnitTree> data) {
		this.data = data;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public int getOrv_id() {
		return orv_id;
	}
	public void setOrv_id(int orv_id) {
		this.orv_id = orv_id;
	}
	public void setOu_id(int ou_id) {
		this.ou_id = ou_id;
	}
	public int getOu_id() {
		return ou_id;
	}
	public void setD_id(int d_id) {
		this.d_id = d_id;
	}
	public int getD_id() {
		return d_id;
	}
	public void setOd_id(int od_id) {
		this.od_id = od_id;
	}
	public int getOd_id() {
		return od_id;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	public boolean isChecked() {
		return checked;
	}
    
   
}
