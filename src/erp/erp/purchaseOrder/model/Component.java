package erp.erp.purchaseOrder.model;

import java.io.Serializable;

import erp.common.Model;

public class Component extends Model implements Serializable{
	/*功能：构件清单
	 *作者：伍恰
	 *时间：2016/03/16
	 *数据库名：gjqdb等
	 * */
	private static final long serialVersionUID = 1L;
	private String			cpbh;
	private String			cptx1;
	private String			cptx2;
	private String			cptx3;
	private String			bbbh;
	private String			jgbh;
	private int			gjxh;
	private String			gjmc;
	private String			ggzc;
	private String			gjth;
	private double			dgyl;
	private String			jldw;
	private double			gjyl;
	private double			gjsl;
	private String			fzdw;
	private String			bzsm;
	private double			yxgg;
	private double			clzc;
	private double			psmj;

	public String getCpbh() {
		return cpbh;
	}
	public void setCpbh(String cpbh) {
		this.cpbh = cpbh;
	}
	public String getCptx1() {
		return cptx1;
	}
	public void setCptx1(String cptx1) {
		this.cptx1 = cptx1;
	}
	public String getCptx2() {
		return cptx2;
	}
	public void setCptx2(String cptx2) {
		this.cptx2 = cptx2;
	}
	public String getCptx3() {
		return cptx3;
	}
	public void setCptx3(String cptx3) {
		this.cptx3 = cptx3;
	}
	public String getBbbh() {
		return bbbh;
	}
	public void setBbbh(String bbbh) {
		this.bbbh = bbbh;
	}
	public String getJgbh() {
		return jgbh;
	}
	public void setJgbh(String jgbh) {
		this.jgbh = jgbh;
	}
	public int getGjxh() {
		return gjxh;
	}
	public void setGjxh(int gjxh) {
		this.gjxh = gjxh;
	}
	public String getGjmc() {
		return gjmc;
	}
	public void setGjmc(String gjmc) {
		this.gjmc = gjmc;
	}
	public String getGgzc() {
		return ggzc;
	}
	public void setGgzc(String ggzc) {
		this.ggzc = ggzc;
	}
	public String getGjth() {
		return gjth;
	}
	public void setGjth(String gjth) {
		this.gjth = gjth;
	}
	public double getDgyl() {
		return dgyl;
	}
	public void setDgyl(double dgyl) {
		this.dgyl = dgyl;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public double getGjyl() {
		return gjyl;
	}
	public void setGjyl(double gjyl) {
		this.gjyl = gjyl;
	}
	public double getGjsl() {
		return gjsl;
	}
	public void setGjsl(double gjsl) {
		this.gjsl = gjsl;
	}
	public String getFzdw() {
		return fzdw;
	}
	public void setFzdw(String fzdw) {
		this.fzdw = fzdw;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public double getYxgg() {
		return yxgg;
	}
	public void setYxgg(double yxgg) {
		this.yxgg = yxgg;
	}
	public double getClzc() {
		return clzc;
	}
	public void setClzc(double clzc) {
		this.clzc = clzc;
	}
	public double getPsmj() {
		return psmj;
	}
	public void setPsmj(double psmj) {
		this.psmj = psmj;
	}
}
