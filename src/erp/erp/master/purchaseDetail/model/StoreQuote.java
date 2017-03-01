package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;

public class StoreQuote extends Model implements Serializable{
	/*功能：仓库名称调用
	 *作者：伍恰
	 *时间：2016/02/18
	 *数据库名：ckmcb_yl
	 * */
	private static final long serialVersionUID = 1L;
	private String			ckbh;
	private String			ckmc;
	private int			tybj;
	private int			bpbj;
	private int			bcpbj;
	private int			qynf;
	private String			yhbh;
	private String			hsbm;
	private int			fscbj;
	private int			hsjc;

	public String getCkbh() {
		return ckbh;
	}
	public void setCkbh(String ckbh) {
		this.ckbh = ckbh;
	}
	public String getCkmc() {
		return ckmc;
	}
	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
	}
	public int getTybj() {
		return tybj;
	}
	public void setTybj(int tybj) {
		this.tybj = tybj;
	}
	public int getBpbj() {
		return bpbj;
	}
	public void setBpbj(int bpbj) {
		this.bpbj = bpbj;
	}
	public int getBcpbj() {
		return bcpbj;
	}
	public void setBcpbj(int bcpbj) {
		this.bcpbj = bcpbj;
	}
	public int getQynf() {
		return qynf;
	}
	public void setQynf(int qynf) {
		this.qynf = qynf;
	}
	public String getYhbh() {
		return yhbh;
	}
	public void setYhbh(String yhbh) {
		this.yhbh = yhbh;
	}
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public int getFscbj() {
		return fscbj;
	}
	public void setFscbj(int fscbj) {
		this.fscbj = fscbj;
	}
	public int getHsjc() {
		return hsjc;
	}
	public void setHsjc(int hsjc) {
		this.hsjc = hsjc;
	}
}
