package erp.erp.purchaseOrder.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class PurBom extends Model implements Serializable{
	/*功能：采购钢架计算Bom
	 *作者：伍恰
	 *时间：2016/03/16
	 *数据库名：gjjjbomb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
	private int			jlxh;
	private String			cpbh;
	private String			cptx1;
	private String			cptx2;
	private String			cptx3;
	private String			bbbh;
	private String			jgbh;
	private int			mjbz;
	private String			lbbh;
	private String			bjbb;
	private String			clhh;
	private String			clmc;
	private String			cltx1;
	private String			cltx2;
	private String			cltx3;
	private String			jldw;
	private int			cllx;
	private double			djyl;
	private double			gjdj;
	private double			wxsh;
	private double			clje;
	private String			bzsm;
	private String			czym;
	private Date			czsj;
	private double			zzhxs;
	private String			plmth;
	private String			plmtx;
	private String lbmc;
	private String login_id;
	private String ip;
	private String csbh;
	private Date xdrq;
	private String csmc;
	private double ewje;
	private double gjdj_old;
	private double gjdj_new;
	
	public double getEwje() {
		return ewje;
	}
	public void setEwje(double ewje) {
		this.ewje = ewje;
	}
	public double getGjdj_old() {
		return gjdj_old;
	}
	public void setGjdj_old(double gjdj_old) {
		this.gjdj_old = gjdj_old;
	}
	public double getGjdj_new() {
		return gjdj_new;
	}
	public void setGjdj_new(double gjdj_new) {
		this.gjdj_new = gjdj_new;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getCsbh() {
		if(csbh==null){
			return "";
		}
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public Date getXdrq() {
		return xdrq;
	}
	public void setXdrq(Date xdrq) {
		this.xdrq = xdrq;
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
		if(lbmc==null){
			return "";
		}
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
	public int getJlxh() {
		return jlxh;
	}
	public void setJlxh(int jlxh) {
		this.jlxh = jlxh;
	}
	public String getCpbh() {
		if(cpbh==null){
			return "";
		}
		return cpbh;
	}
	public void setCpbh(String cpbh) {
		this.cpbh = cpbh;
	}
	public String getCptx1() {
		if(cptx1==null){
			return "";
		}
		return cptx1;
	}
	public void setCptx1(String cptx1) {
		this.cptx1 = cptx1;
	}
	public String getCptx2() {
		if(cptx2==null){
			return "";
		}
		return cptx2;
	}
	public void setCptx2(String cptx2) {
		this.cptx2 = cptx2;
	}
	public String getCptx3() {
		if(cptx3==null){
			return "";
		}
		return cptx3;
	}
	public void setCptx3(String cptx3) {
		this.cptx3 = cptx3;
	}
	public String getBbbh() {
		if(bbbh==null){
			return "";
		}
		return bbbh;
	}
	public void setBbbh(String bbbh) {
		this.bbbh = bbbh;
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
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
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
	public String getBjbb() {
		if(bjbb==null){
			return "";
		}
		return bjbb;
	}
	public void setBjbb(String bjbb) {
		this.bjbb = bjbb;
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
	public String getClmc() {
		if(clmc==null){
			return "";
		}
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
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
	public int getCllx() {
		return cllx;
	}
	public void setCllx(int cllx) {
		this.cllx = cllx;
	}
	public double getDjyl() {
		return djyl;
	}
	public void setDjyl(double djyl) {
		this.djyl = djyl;
	}
	public double getGjdj() {
		return gjdj;
	}
	public void setGjdj(double gjdj) {
		this.gjdj = gjdj;
	}
	public double getWxsh() {
		return wxsh;
	}
	public void setWxsh(double wxsh) {
		this.wxsh = wxsh;
	}
	public double getClje() {
		return clje;
	}
	public void setClje(double clje) {
		this.clje = clje;
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
	public String getCzym() {
		if(czym==null){
			return "";
		}
		return czym;
	}
	public void setCzym(String czym) {
		this.czym = czym;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public double getZzhxs() {
		return zzhxs;
	}
	public void setZzhxs(double zzhxs) {
		this.zzhxs = zzhxs;
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
