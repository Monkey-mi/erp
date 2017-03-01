package erp.erp.purchaseOrder.model;

import java.io.Serializable;

import erp.common.Model;

public class OutSourcePicking extends Model implements Serializable{
	/*功能：采购领料单
	 *作者：伍恰
	 *时间：2016/03/24
	 *数据库名：cghtwxlltzdb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
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
	private String			plmth;
	private String			plmtx;
	private String lbmc;
	private String login_id;
	private String ip;
	private String clmc;
	
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
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
	public int getTzxh() {
		return tzxh;
	}
	public void setTzxh(int tzxh) {
		this.tzxh = tzxh;
	}
	public String getLbbh() {
		if(lbbh==null){
			return "";
		}
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getClhh() {
		if(clhh==null){
			return "";
		}
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getCltx1() {
		if(cltx1==null){
			return "";
		}
		return cltx1;
	}
	public void setCltx1(String cltx1) {
		this.cltx1 = cltx1;
	}
	public String getCltx2() {
		if(cltx2==null){
			return "";
		}
		return cltx2;
	}
	public void setCltx2(String cltx2) {
		this.cltx2 = cltx2;
	}
	public String getCltx3() {
		if(cltx3==null){
			return "";
		}
		return cltx3;
	}
	public void setCltx3(String cltx3) {
		this.cltx3 = cltx3;
	}
	public String getJldw() {
		if(jldw==null){
			return "";
		}
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
		if(bzsm==null){
			return "";
		}
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getJgbh() {
		if(jgbh==null){
			return "";
		}
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
	public String getPlmth() {
		if(plmth==null){
			return "";
		}
		return plmth;
	}
	public void setPlmth(String plmth) {
		this.plmth = plmth;
	}
	public String getPlmtx() {
		if(plmtx==null){
			return "";
		}
		return plmtx;
	}
	public void setPlmtx(String plmtx) {
		this.plmtx = plmtx;
	}
}
