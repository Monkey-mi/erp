package erp.common.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class DailyReport extends Model implements Serializable{
	private static final long serialVersionUID = 5407033224312005987L;
	/**
	 * 
	 */
	private int pk_id;
	private String line_code;
	private String line_name;
	private int plan_id;
	private int plan_no;
	private String dept_name;
	private String mission_no;
	private String mission_code;
	private Date production_dt;
	private int	 production_no;
	private String customer_no;
	private String customer_name;
	private String product_id;
	private String product_name;
	private String drawing_no;
	private double production_qty;
	private double price;
	private String process_no;
	private double process_time;
	private Date create_dt;
	private String creator;
	
	public int getPlan_id() {
		return plan_id;
	}
	public void setPlan_id(int planId) {
		plan_id = planId;
	}
	public int getPlan_no() {
		return plan_no;
	}
	public void setPlan_no(int planNo) {
		plan_no = planNo;
	}

	public String getDept_name() {
		return dept_name;
	}
	public void setDept_name(String deptName) {
		dept_name = deptName;
	}
	public String getLine_name() {
		return line_name;
	}
	public void setLine_name(String lineName) {
		line_name = lineName;
	}
	public String getMission_no() {
		return mission_no;
	}
	public void setMission_no(String missionNo) {
		mission_no = missionNo;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getMission_code() {
		return mission_code;
	}
	public void setMission_code(String missionCode) {
		mission_code = missionCode;
	}
	
	public int getPk_id() {
		return pk_id;
	}
	public void setPk_id(int pkId) {
		pk_id = pkId;
	}
	public String getLine_code() {
		return line_code;
	}
	public void setLine_code(String lineCode) {
		line_code = lineCode;
	}
	public Date getProduction_dt() {
		return production_dt;
	}
	public void setProduction_dt(Date productionDt) {
		production_dt = productionDt;
	}
	public int getProduction_no() {
		return production_no;
	}
	public void setProduction_no(int productionNo) {
		production_no = productionNo;
	}
	public String getCustomer_no() {
		return customer_no;
	}
	public void setCustomer_no(String customerNo) {
		customer_no = customerNo;
	}
	public String getCustomer_name() {
		return customer_name;
	}
	public void setCustomer_name(String customerName) {
		customer_name = customerName;
	}
	public String getProduct_id() {
		return product_id;
	}
	public void setProduct_id(String productId) {
		product_id = productId;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String productName) {
		product_name = productName;
	}
	public String getDrawing_no() {
		return drawing_no;
	}
	public void setDrawing_no(String drawingNo) {
		drawing_no = drawingNo;
	}
	public double getProduction_qty() {
		return production_qty;
	}
	public void setProduction_qty(double productionQty) {
		production_qty = productionQty;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getProcess_no() {
		return process_no;
	}
	public void setProcess_no(String processNo) {
		process_no = processNo;
	}
	public double getProcess_time() {
		return process_time;
	}
	public void setProcess_time(double processTime) {
		process_time = processTime;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date createDt) {
		create_dt = createDt;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	
}
