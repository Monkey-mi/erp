package erp.erp.master.bakTable.model;

import java.util.Date;

public class BakTable {
	private int			log_id;
	private String			table_name;
	private String			bak_table_name;
	private Date			bak_begin_dt;
	private Date			begin_time;
	private Date			end_time;
	private int			row_nums;
	private String			run_sts;

	public int getLog_id() {
		return log_id;
	}
	public void setLog_id(int log_id) {
		this.log_id = log_id;
	}
	public String getTable_name() {
		return table_name;
	}
	public void setTable_name(String table_name) {
		this.table_name = table_name;
	}
	public String getBak_table_name() {
		return bak_table_name;
	}
	public void setBak_table_name(String bak_table_name) {
		this.bak_table_name = bak_table_name;
	}
	public Date getBak_begin_dt() {
		return bak_begin_dt;
	}
	public void setBak_begin_dt(Date bak_begin_dt) {
		this.bak_begin_dt = bak_begin_dt;
	}
	public Date getBegin_time() {
		return begin_time;
	}
	public void setBegin_time(Date begin_time) {
		this.begin_time = begin_time;
	}
	public Date getEnd_time() {
		return end_time;
	}
	public void setEnd_time(Date end_time) {
		this.end_time = end_time;
	}
	public int getRow_nums() {
		return row_nums;
	}
	public void setRow_nums(int row_nums) {
		this.row_nums = row_nums;
	}
	public String getRun_sts() {
		return run_sts;
	}
	public void setRun_sts(String run_sts) {
		this.run_sts = run_sts;
	}
}
