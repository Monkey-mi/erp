package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;

public class FunctionPurchaseCtl extends Model implements Serializable{
	
	/*功能：采购控制对象
	 *作者：伍恰
	 *时间：2016/02/01
	 * */
	private static final long serialVersionUID = 1L;
	private double cgsl;
	private double kzdj;
	private double cgdj;
	private double ghzq;
	private double fzkj;
	private double zkbl;
	private double zkdj;
	
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	public double getKzdj() {
		return kzdj;
	}
	public void setKzdj(double kzdj) {
		this.kzdj = kzdj;
	}
	public double getCgdj() {
		return cgdj;
	}
	public void setCgdj(double cgdj) {
		this.cgdj = cgdj;
	}
	public double getGhzq() {
		return ghzq;
	}
	public void setGhzq(double ghzq) {
		this.ghzq = ghzq;
	}
	public double getFzkj() {
		return fzkj;
	}
	public void setFzkj(double fzkj) {
		this.fzkj = fzkj;
	}
	public double getZkbl() {
		return zkbl;
	}
	public void setZkbl(double zkbl) {
		this.zkbl = zkbl;
	}
	public double getZkdj() {
		return zkdj;
	}
	public void setZkdj(double zkdj) {
		this.zkdj = zkdj;
	}
	
}
