package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;


public class MaterialCate extends Model implements Serializable{
	/*功能：材料类别表
	 *作者：伍恰
	 *时间：2016/01/22
	 *数据库名：cllbb
	 * */
	private static final long serialVersionUID = 1L;
	private String			lbbh;
	private String			lbmc;
	private int			lbjc;
	private int			mjbz;
	private int			kjbj;
	private int			pjbj;
	private double			clbl;
	private int			xqlx;
	private double			cgbl;
	private int			qjgd;
	private String			ylms;

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
	public int getKjbj() {
		return kjbj;
	}
	public void setKjbj(int kjbj) {
		this.kjbj = kjbj;
	}
	public int getPjbj() {
		return pjbj;
	}
	public void setPjbj(int pjbj) {
		this.pjbj = pjbj;
	}
	public double getClbl() {
		return clbl;
	}
	public void setClbl(double clbl) {
		this.clbl = clbl;
	}
	public int getXqlx() {
		return xqlx;
	}
	public void setXqlx(int xqlx) {
		this.xqlx = xqlx;
	}
	public double getCgbl() {
		return cgbl;
	}
	public void setCgbl(double cgbl) {
		this.cgbl = cgbl;
	}
	public int getQjgd() {
		return qjgd;
	}
	public void setQjgd(int qjgd) {
		this.qjgd = qjgd;
	}
	public String getYlms() {
		return ylms;
	}
	public void setYlms(String ylms) {
		this.ylms = ylms;
	}
}
