package erp.common.model;

import java.io.Serializable;

import erp.common.Model;


public class WebReturnObject extends Model implements Serializable {
	/**一般情况下
	 * flag=1;成功  
	 * flag=0;失败
	 * flag=其他
	 */
	private static final long serialVersionUID = 1L;
	private int flag;
	private String msg;
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public WebReturnObject(int flag, String msg) {
		super();
		this.flag = flag;
		this.msg = msg;
	}
	public WebReturnObject(int flag) {
		super();
		this.flag = flag;
	}
	public WebReturnObject() {
		super();
	}
	public static WebReturnObject getWebReturnObject(int flag){
		return new WebReturnObject(flag);
	}
}
