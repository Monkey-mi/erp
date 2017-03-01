package erp.common;

public class FilterModel {
	/** 
	 * @ClassName: FilterModel 
	 * @Description: 用于Ext筛选项解析
	 * @author wuqia
	 * @date 2016-6-13 下午4:56:02 
	 * 
	 *  
	 */
	private String operator;
	private String value;
	private String property;
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public String getValue() {
		if(value==null||value.equals("null")){
			return "";
		}
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getProperty() {
		return property;
	}
	public void setProperty(String property) {
		this.property = property;
	}
	
}



