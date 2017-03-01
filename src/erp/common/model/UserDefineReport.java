package erp.common.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class UserDefineReport extends Model implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5353040442532256659L;
	private int rpt_id;
	private String report_name;
	private int report_year;
	private int month;
	private String report_content;
	private String remark;
	private int list_id;
	private Date create_dt;
	private String cycle_data;
	
	public String getCycle_data() {
		return cycle_data;
	}
	public void setCycle_data(String cycleData) {
		cycle_data = cycleData;
	}
	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public int getRpt_id() {
		return rpt_id;
	}
	public void setRpt_id(int rptId) {
		rpt_id = rptId;
	}
	public String getReport_name() {
		return report_name;
	}
	public void setReport_name(String reportName) {
		report_name = reportName;
	}
	public int getReport_year() {
		return report_year;
	}
	public void setReport_year(int reportYear) {
		report_year = reportYear;
	}
	public String getReport_content() {
		return report_content;
	}
	public void setReport_content(String reportContent) {
		report_content = reportContent;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getList_id() {
		return list_id;
	}
	public void setList_id(int listId) {
		list_id = listId;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date createDt) {
		create_dt = createDt;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
