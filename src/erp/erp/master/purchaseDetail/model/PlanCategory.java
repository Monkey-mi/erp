package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;

public class PlanCategory extends Model implements Serializable{
	/*功能：计划类别表
	 *作者：伍恰
	 *时间：2016/01/20
	 *数据库名：jhlbb
	 * */
	private static final long serialVersionUID = 1L;
	private String			lbbh;
	private String			lbmc;
	private int			lbjc;
	private int			mjbz;
	private String			bzsm;

	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getLbmc() {
		return lbmc;
	}
	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}
	public int getLbjc() {
		return lbjc;
	}
	public void setLbjc(int lbjc) {
		this.lbjc = lbjc;
	}
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
}
