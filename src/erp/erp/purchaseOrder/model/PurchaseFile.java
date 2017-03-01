package erp.erp.purchaseOrder.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class PurchaseFile extends Model implements Serializable{
	/*功能：采购文件
	 *作者：伍恰
	 *时间：2016/03/16
	 *数据库名：cghtfb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			qxbj;
	private int			wjbh;
	private String			wjmc;
	private String			wjlj;
	private String			cjrm;
	private String			db_TYPE;
	private int             fjlx;
	private int             ptsc;
	private int             fjzt;
	private Date			scrq;
	
	public int getQxbj() {
		return qxbj;
	}
	public void setQxbj(int qxbj) {
		this.qxbj = qxbj;
	}
	public int getFjzt() {
		return fjzt;
	}
	public void setFjzt(int fjzt) {
		this.fjzt = fjzt;
	}
	public int getPtsc() {
		return ptsc;
	}
	public void setPtsc(int ptsc) {
		this.ptsc = ptsc;
	}
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public int getFjlx() {
		return fjlx;
	}
	public void setFjlx(int fjlx) {
		this.fjlx = fjlx;
	}
	public Date getScrq() {
		return scrq;
	}
	public void setScrq(Date scrq) {
		this.scrq = scrq;
	}
	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public int getWjbh() {
		return wjbh;
	}
	public void setWjbh(int wjbh) {
		this.wjbh = wjbh;
	}
	public String getWjmc() {
		return wjmc;
	}
	public void setWjmc(String wjmc) {
		this.wjmc = wjmc;
	}
	public String getWjlj() {
		return wjlj;
	}
	public void setWjlj(String wjlj) {
		this.wjlj = wjlj;
	}
	public String getCjrm() {
		return cjrm;
	}
	public void setCjrm(String cjrm) {
		this.cjrm = cjrm;
	}
}
