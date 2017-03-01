package erp.erp.master.caterialPriceApproval.model;

import java.io.Serializable;

import erp.common.Model;

public class CaterialPriceCompany extends Model implements Serializable{
	/*功能：材料审批价格厂商表
	 *作者：伍恰
	 *时间：2016/01/14
	 *数据库名：clspjg_csb
	 * */
	private static final long serialVersionUID = 1L;
	private int			jlbh;
	private int			jlxh;
	private String			csbh;
	private String csmc;
	
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getJlbh() {
		return jlbh;
	}
	public void setJlbh(int jlbh) {
		this.jlbh = jlbh;
	}
	public int getJlxh() {
		return jlxh;
	}
	public void setJlxh(int jlxh) {
		this.jlxh = jlxh;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
}
