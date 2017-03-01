package erp.erp.master.caterialPriceApproval.model;

import java.io.Serializable;

import erp.common.Model;

public class CaterialPriceDetail extends Model implements Serializable{
	/*功能：材料审批价格明细表
	 *作者：伍恰
	 *时间：2016/01/14
	 *数据库名：clspjg_jgb
	 * */
	private static final long serialVersionUID = 1L;
	private int			jlbh;
	private int			jlxh;
	private double			spjg1;
	private double			spjg2;
	private double			spjg3;
	private double			spjg4;
	private double			spjg5;

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
	public double getSpjg1() {
		return spjg1;
	}
	public void setSpjg1(double spjg1) {
		this.spjg1 = spjg1;
	}
	public double getSpjg2() {
		return spjg2;
	}
	public void setSpjg2(double spjg2) {
		this.spjg2 = spjg2;
	}
	public double getSpjg3() {
		return spjg3;
	}
	public void setSpjg3(double spjg3) {
		this.spjg3 = spjg3;
	}
	public double getSpjg4() {
		return spjg4;
	}
	public void setSpjg4(double spjg4) {
		this.spjg4 = spjg4;
	}
	public double getSpjg5() {
		return spjg5;
	}
	public void setSpjg5(double spjg5) {
		this.spjg5 = spjg5;
	}
}
