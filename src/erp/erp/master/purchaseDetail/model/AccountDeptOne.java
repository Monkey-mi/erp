package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class AccountDeptOne extends Model implements Serializable{
	/*功能：核算部门表
	 *作者：伍恰
	 *时间：2016/02/18
	 *数据库名：hsbmb
	 * */
	private static final long serialVersionUID = 1L;
	private String			bmbh;
	private String			bmmc;
	private String			bzsm;
	private String			czym;
	private Date			czsj;
	private int			scbj;
	private boolean			qybj;
	private boolean			hsbj;
	private int			bmjc;
	private boolean			mjbz;
	private String			ghbmbh;
	private boolean			ysyfbj;
	private String ghbmmc;//改后部门名称
	
	public String getGhbmmc() {
		return ghbmmc;
	}
	public void setGhbmmc(String ghbmmc) {
		this.ghbmmc = ghbmmc;
	}
	public String getBmbh() {
		return bmbh;
	}
	public void setBmbh(String bmbh) {
		this.bmbh = bmbh;
	}
	public String getBmmc() {
		return bmmc;
	}
	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getCzym() {
		return czym;
	}
	public void setCzym(String czym) {
		this.czym = czym;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public int getScbj() {
		return scbj;
	}
	public void setScbj(int scbj) {
		this.scbj = scbj;
	}
	public boolean getQybj() {
		return qybj;
	}
	public void setQybj(boolean qybj) {
		this.qybj = qybj;
	}
	public boolean getHsbj() {
		return hsbj;
	}
	public void setHsbj(boolean hsbj) {
		this.hsbj = hsbj;
	}
	public int getBmjc() {
		return bmjc;
	}
	public void setBmjc(int bmjc) {
		this.bmjc = bmjc;
	}
	public boolean getMjbz() {
		return mjbz;
	}
	public void setMjbz(boolean mjbz) {
		this.mjbz = mjbz;
	}
	public String getGhbmbh() {
		return ghbmbh;
	}
	public void setGhbmbh(String ghbmbh) {
		this.ghbmbh = ghbmbh;
	}
	public boolean getYsyfbj() {
		return ysyfbj;
	}
	public void setYsyfbj(boolean ysyfbj) {
		this.ysyfbj = ysyfbj;
	}
}
