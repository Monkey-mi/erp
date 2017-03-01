package erp.bi.form.model;


import java.io.Serializable;
import java.util.Date;

import erp.common.Model;
import erp.util.AppUtils;


public class FrmRender extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7563096364524487708L;
	private int fr_id       ;
	private int freg_id     ;
	private String code        ;
	private String name        ;
	private String fr_desc     ;
	private String render_type ;
	private String master_xml  ;
	private String detail_xml  ;
	private String print_xml  ;
	private String use_type	   ;
	private int master_ftid	   ;
	
	/*
	 * java以及js端需要一个整数数组，而后台数据库只能以字符串的形式来存储
	 * 因为数据存储与展示模式存在差异，目前只能用双属性来解决这个问题 
	 * 比如下面两个属性，然后在setPropxxxx时 分别解释成两种模式
	 */
	private int[] detail_ftids	   ;
	private String detail_ftidsStr;
	
	private String create_code ;
	private String create_name ;
	private Date create_dtm  ;
	private String modify_code ;
	private String modify_name ;
	private Date modify_dtm  ;
	private String remark      ;
	private int proc_id;
	public int getFr_id() {
		return fr_id;
	}
	public void setFr_id(int fr_id) {
		this.fr_id = fr_id;
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
	public String getFr_desc() {
		return fr_desc;
	}
	public void setFr_desc(String fr_desc) {
		this.fr_desc = fr_desc;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public void setRender_type(String render_type) {
		this.render_type = render_type;
	}
	public String getRender_type() {
		return render_type;
	}
	public void setUse_type(String use_type) {
		this.use_type = use_type;
	}
	public String getUse_type() {
		return use_type;
	}
	public void setMaster_ftid(int master_ftid) {
		this.master_ftid = master_ftid;
	}
	public int getMaster_ftid() {
		return master_ftid;
	}
	public void setDetail_ftids(int[] detail_ftids) {
		this.detail_ftids = detail_ftids;
		this.detail_ftidsStr=AppUtils.IntArray2Str(detail_ftids);
	}
	public int[] getDetail_ftids() { 
		return detail_ftids;
	}
	public void setDetail_ftidsStr(String detail_ftidsStr) {
		this.detail_ftidsStr = detail_ftidsStr;
		this.detail_ftids = AppUtils.Str2IntArray(detail_ftidsStr);
	}
	public String getDetail_ftidsStr() {
		return detail_ftidsStr;
	}
	public void setMaster_xml(String master_xml) {
		this.master_xml = master_xml;
	}
	public String getMaster_xml() {
		return master_xml;
	}
	public void setPrint_xml(String print_xml) {
		this.print_xml = print_xml;
	}
	public String getPrint_xml() {
		return print_xml;
	}
	public void setDetail_xml(String detail_xml) {
		this.detail_xml = detail_xml;
	}
	public String getDetail_xml() {
		return detail_xml;
	}
	public void setProc_id(int proc_id) {
		this.proc_id = proc_id;
	}
	public int getProc_id() {
		return proc_id;
	}
	
	
	
}
