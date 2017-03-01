package erp.erp.master.caterialPrice.model;

import java.io.Serializable;

import erp.common.Model;

public class CaterialPriceArgument extends Model implements Serializable{
	/*功能：材料价格公式参数表
	 *作者：伍恰
	 *时间：2016/01/13
	 *数据库名：cljgcswhb
	 * */
	private static final long serialVersionUID = 1L;
	private int			csbh;
	private String			csmc;
	private int			spbj;

	public int getCsbh() {
		return csbh;
	}
	public void setCsbh(int csbh) {
		this.csbh = csbh;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public int getSpbj() {
		return spbj;
	}
	public void setSpbj(int spbj) {
		this.spbj = spbj;
	}
}
