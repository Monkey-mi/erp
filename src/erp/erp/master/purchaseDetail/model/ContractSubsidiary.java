package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;

public class ContractSubsidiary extends Model implements Serializable{
	/*功能：采购合同明细辅助表
	 *作者：伍恰
	 *时间：2016/02/16
	 *数据库名：cghtfzb
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
	private int			jlxh;
	private String			cggg;
	private double			zhgg;
	private double			zhsl;
	private String			zhjl;
	private double			fzsl;
	private String			fzdw;
	private double			cgsl;
	private String			jldw;
	private String			jgbh;
	private double			jhsl;
	private double			fdxs;
	private double			yxgg;
	private double			dgyl;
	private double			gjsl;
	private double			gjyl;
	private double			scxq;

	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public int getHtxh() {
		return htxh;
	}
	public void setHtxh(int htxh) {
		this.htxh = htxh;
	}
	public int getJlxh() {
		return jlxh;
	}
	public void setJlxh(int jlxh) {
		this.jlxh = jlxh;
	}
	public String getCggg() {
		return cggg;
	}
	public void setCggg(String cggg) {
		this.cggg = cggg;
	}
	public double getZhgg() {
		return zhgg;
	}
	public void setZhgg(double zhgg) {
		this.zhgg = zhgg;
	}
	public double getZhsl() {
		return zhsl;
	}
	public void setZhsl(double zhsl) {
		this.zhsl = zhsl;
	}
	public String getZhjl() {
		return zhjl;
	}
	public void setZhjl(String zhjl) {
		this.zhjl = zhjl;
	}
	public double getFzsl() {
		return fzsl;
	}
	public void setFzsl(double fzsl) {
		this.fzsl = fzsl;
	}
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public String getJgbh() {
		return jgbh;
	}
	public void setJgbh(String jgbh) {
		this.jgbh = jgbh;
	}
	public double getJhsl() {
		return jhsl;
	}
	public void setJhsl(double jhsl) {
		this.jhsl = jhsl;
	}
	public double getFdxs() {
		return fdxs;
	}
	public void setFdxs(double fdxs) {
		this.fdxs = fdxs;
	}
	public double getYxgg() {
		return yxgg;
	}
	public void setYxgg(double yxgg) {
		this.yxgg = yxgg;
	}
	public double getDgyl() {
		return dgyl;
	}
	public void setDgyl(double dgyl) {
		this.dgyl = dgyl;
	}
	public double getGjsl() {
		return gjsl;
	}
	public void setGjsl(double gjsl) {
		this.gjsl = gjsl;
	}
	public double getGjyl() {
		return gjyl;
	}
	public void setGjyl(double gjyl) {
		this.gjyl = gjyl;
	}
	public double getScxq() {
		return scxq;
	}
	public void setScxq(double scxq) {
		this.scxq = scxq;
	}
	public String getFzdw() {
		return fzdw;
	}
	public void setFzdw(String fzdw) {
		this.fzdw = fzdw;
	}
}
