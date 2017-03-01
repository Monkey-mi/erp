package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;

public class OutSourceSubsidiary extends Model implements Serializable{
	/*功能：计划类别表
	 *作者：伍恰
	 *时间：2016/03/10
	 *数据库名：wxlltzdb
	 * */
	private static final long serialVersionUID = 1L;
	private int			wxdh;
	private int			wxxh;
	private int			tzxh;
	private String			lbbh;
	private String			clhh;
	private String			cltx1;
	private String			cltx2;
	private String			cltx3;
	private String			jldw;
	private double			jgyl;
	private double			jsbl;
	private double			tzll;
	private double			ylsl;
	private String			bzsm;
	private String			jgbh;
	private double			csdj;
	private double			csje;
	private double			djyl;
	private String clmc;
	private String lbmc;
	
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getLbmc() {
		return lbmc;
	}
	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getWxdh() {
		return wxdh;
	}
	public void setWxdh(int wxdh) {
		this.wxdh = wxdh;
	}
	public int getWxxh() {
		return wxxh;
	}
	public void setWxxh(int wxxh) {
		this.wxxh = wxxh;
	}
	public int getTzxh() {
		return tzxh;
	}
	public void setTzxh(int tzxh) {
		this.tzxh = tzxh;
	}
	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getCltx1() {
		return cltx1;
	}
	public void setCltx1(String cltx1) {
		this.cltx1 = cltx1;
	}
	public String getCltx2() {
		return cltx2;
	}
	public void setCltx2(String cltx2) {
		this.cltx2 = cltx2;
	}
	public String getCltx3() {
		return cltx3;
	}
	public void setCltx3(String cltx3) {
		this.cltx3 = cltx3;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public double getJgyl() {
		return jgyl;
	}
	public void setJgyl(double jgyl) {
		this.jgyl = jgyl;
	}
	public double getJsbl() {
		return jsbl;
	}
	public void setJsbl(double jsbl) {
		this.jsbl = jsbl;
	}
	public double getTzll() {
		return tzll;
	}
	public void setTzll(double tzll) {
		this.tzll = tzll;
	}
	public double getYlsl() {
		return ylsl;
	}
	public void setYlsl(double ylsl) {
		this.ylsl = ylsl;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getJgbh() {
		return jgbh;
	}
	public void setJgbh(String jgbh) {
		this.jgbh = jgbh;
	}
	public double getCsdj() {
		return csdj;
	}
	public void setCsdj(double csdj) {
		this.csdj = csdj;
	}
	public double getCsje() {
		return csje;
	}
	public void setCsje(double csje) {
		this.csje = csje;
	}
	public double getDjyl() {
		return djyl;
	}
	public void setDjyl(double djyl) {
		this.djyl = djyl;
	}
}
