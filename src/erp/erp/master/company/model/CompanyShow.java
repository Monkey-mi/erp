package erp.erp.master.company.model;

import java.io.Serializable;

import erp.common.Model;

public class CompanyShow extends Model implements Serializable{
	/*功能：厂商信息调用
	 *作者：伍恰
	 *时间：2016/01/16
	 *数据库名：csxxb
	 * */
	private static final long serialVersionUID = 1L;
	private String			csbh;
	private String			csjc;
	private String			csmc;
	private String			wbbh;
	private String			cslb;
	private String			cglb;
	private String cglbmc;
	private String wbmc;
	private String ztdw;
	private String lxrm;
	//付款申请单管理》编辑界面新增以下字段
	private String yhbh;
	private double wbhl;
	private String wbdh;
	private String khyh;
	private String cszh;
	private String fktj;
	private double FKTS;
	private String ztmc;
	
	
	public String getYhbh() {
		return yhbh;
	}
	public void setYhbh(String yhbh) {
		this.yhbh = yhbh;
	}
	public double getWbhl() {
		return wbhl;
	}
	public void setWbhl(double wbhl) {
		this.wbhl = wbhl;
	}
	public String getWbdh() {
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
	public String getKhyh() {
		return khyh;
	}
	public void setKhyh(String khyh) {
		this.khyh = khyh;
	}
	public String getCszh() {
		return cszh;
	}
	public void setCszh(String cszh) {
		this.cszh = cszh;
	}
	public String getFktj() {
		return fktj;
	}
	public void setFktj(String fktj) {
		this.fktj = fktj;
	}
	public double getFKTS() {
		return FKTS;
	}
	public void setFKTS(double fKTS) {
		FKTS = fKTS;
	}
	public String getZtmc() {
		return ztmc;
	}
	public void setZtmc(String ztmc) {
		this.ztmc = ztmc;
	}
	public String getLxrm() {
		return lxrm;
	}
	public void setLxrm(String lxrm) {
		this.lxrm = lxrm;
	}
	public String getZtdw() {
		return ztdw;
	}
	public void setZtdw(String ztdw) {
		this.ztdw = ztdw;
	}
	public String getWbmc() {
		return wbmc;
	}
	public void setWbmc(String wbmc) {
		this.wbmc = wbmc;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public String getCsjc() {
		return csjc;
	}
	public void setCsjc(String csjc) {
		this.csjc = csjc;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getWbbh() {
		return wbbh;
	}
	public void setWbbh(String wbbh) {
		this.wbbh = wbbh;
	}
	public String getCslb() {
		return cslb;
	}
	public void setCslb(String cslb) {
		this.cslb = cslb;
	}
	public String getCglb() {
		return cglb;
	}
	public void setCglb(String cglb) {
		this.cglb = cglb;
	}
	public String getCglbmc() {
		return cglbmc;
	}
	public void setCglbmc(String cglbmc) {
		this.cglbmc = cglbmc;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
