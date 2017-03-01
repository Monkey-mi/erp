package erp.bi.form.model;


import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import erp.common.Model;


public class FrmReg extends Model implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2803255030765051006L;
	private int 	freg_id    ;
	private String 	code       ;
	private String 	name       ;
	private String  fr_type   ;
	private String 	status     ;
	private String	freg_desc  ;
	private String	create_code;
	private String	create_name;
	private Date create_dtm ;
	private String modify_code;
	private String modify_name;
	private Date modify_dtm ;
	private String remark     ;
	private int bo_def_id;
	private String type;
	private String idx;
	private String is_prj;
	private String user_type;
	private String isprivate;
	/*private List<Map<String,Object>>  cid;*/
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getFreg_id() {
		return freg_id;
	}
	public void setFreg_id(int freg_id) {
		this.freg_id = freg_id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getFreg_desc() {
		return freg_desc;
	}
	public void setFreg_desc(String freg_desc) {
		this.freg_desc = freg_desc;
	}
	public String getCreate_code() {
		return create_code;
	}
	public void setCreate_code(String create_code) {
		this.create_code = create_code;
	}
	public String getCreate_name() {
		return create_name;
	}
	public void setCreate_name(String create_name) {
		this.create_name = create_name;
	}
	public Date getCreate_dtm() {
		return create_dtm;
	}
	public void setCreate_dtm(Date create_dtm) {
		this.create_dtm = create_dtm;
	}
	public String getModify_code() {
		return modify_code;
	}
	public void setModify_code(String modify_code) {
		this.modify_code = modify_code;
	}
	public String getModify_name() {
		return modify_name;
	}
	public void setModify_name(String modify_name) {
		this.modify_name = modify_name;
	}
	public Date getModify_dtm() {
		return modify_dtm;
	}
	public void setModify_dtm(Date modify_dtm) {
		this.modify_dtm = modify_dtm;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public void setFr_type(String fr_type) {
		this.fr_type = fr_type;
	}
	public String getFr_type() {
		return fr_type;
	}
	public void setBo_def_id(int bo_def_id) {
		this.bo_def_id = bo_def_id;
	}
	public int getBo_def_id() {
		return bo_def_id;
	}
/*	public void setCid(List<Map<String,Object>> cid) {
		this.cid = cid;
	}
	public List<Map<String,Object>> getCid() {
		return cid;
	}
	*/
	public void setType(String type) {
		this.type = type;
	}
	public String getType() {
		return type;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public String getIdx() {
		return idx;
	}
	public void setIs_prj(String is_prj) {
		this.is_prj = is_prj;
	}
	public String getIs_prj() {
		return is_prj;
	}
	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}
	public String getUser_type() {
		return user_type;
	}
	public void setIsprivate(String isprivate) {
		this.isprivate = isprivate;
	}
	public String getIsprivate() {
		return isprivate;
	}
	
	
}
