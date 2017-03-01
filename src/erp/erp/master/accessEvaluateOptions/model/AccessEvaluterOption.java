/**  
* @Title: AccessEvaluterOption.java
* @Package erp.erp.master.accessEvaluateOptions.model
* @Description: TODO
* @author 舒飞
* @date 2017-2-8 下午2:28:08 
*/ 
package erp.erp.master.accessEvaluateOptions.model;

public class AccessEvaluterOption {
	
	private int item_id;
	private String item_name;
	private int f_id;
	private int activity_status;
	private double weightValue;
	
	
	public double getWeightValue() {
		return weightValue;
	}
	public void setWeightValue(double weightValue) {
		this.weightValue = weightValue;
	}
	public int getItem_id() {
		return item_id;
	}
	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public int getF_id() {
		return f_id;
	}
	public void setF_id(int f_id) {
		this.f_id = f_id;
	}
	public int getActivity_status() {
		return activity_status;
	}
	public void setActivity_status(int activity_status) {
		this.activity_status = activity_status;
	}
	
	
}
