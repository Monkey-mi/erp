package srm.supplier.model;

import java.util.Date;

public class AppSupplierAccessLoop {
	private int			loop_id;
	private int			company_id;
	private Date			assess_dt;
	private String			head_audit;
	private String			operator;
	private Date			operator_dt;
	private int			assess_sts;
	private Date assess_sts_dt;
	private String assess_sts_op;
	
	public Date getAssess_sts_dt() {
		return assess_sts_dt;
	}
	public void setAssess_sts_dt(Date assess_sts_dt) {
		this.assess_sts_dt = assess_sts_dt;
	}
	public String getAssess_sts_op() {
		return assess_sts_op;
	}
	public void setAssess_sts_op(String assess_sts_op) {
		this.assess_sts_op = assess_sts_op;
	}
	public int getLoop_id() {
		return loop_id;
	}
	public void setLoop_id(int loop_id) {
		this.loop_id = loop_id;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public Date getAssess_dt() {
		return assess_dt;
	}
	public void setAssess_dt(Date assess_dt) {
		this.assess_dt = assess_dt;
	}
	public String getHead_audit() {
		return head_audit;
	}
	public void setHead_audit(String head_audit) {
		this.head_audit = head_audit;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public Date getOperator_dt() {
		return operator_dt;
	}
	public void setOperator_dt(Date operator_dt) {
		this.operator_dt = operator_dt;
	}
	public int getAssess_sts() {
		return assess_sts;
	}
	public void setAssess_sts(int assess_sts) {
		this.assess_sts = assess_sts;
	}
}
