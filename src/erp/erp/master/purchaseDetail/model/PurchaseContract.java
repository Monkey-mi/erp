package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class PurchaseContract extends Model implements Serializable{
	/*功能：采购合同表
	 *作者：伍恰
	 *时间：2016/01/27
	 *数据库名：cghtb
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private String			cglb;
	private String			csbh;
	private Date			cgrq;
	private String			cgbz;
	private String			httk;
	private String			cgyq;
	private String			cgym;
	private String			czym;
	private Date			czsj;
	private int			qfbj;
	private String			cslxr;
	private String			ztdw;
	private String			http;
	private int			rksl;
	private String			cglx;
	private String			htgz;
	private String			qzgz;
	private Date			jhrq;
	private int			ggzs;
	private int zlbj;
	private String zlcsbh;
	private String zlwbmc;
	private String zlwbbh;
	
	public int getZlbj() {
		return zlbj;
	}
	public void setZlbj(int zlbj) {
		this.zlbj = zlbj;
	}
	public String getZlcsbh() {
		return zlcsbh;
	}
	public void setZlcsbh(String zlcsbh) {
		this.zlcsbh = zlcsbh;
	}
	public String getZlwbmc() {
		return zlwbmc;
	}
	public void setZlwbmc(String zlwbmc) {
		this.zlwbmc = zlwbmc;
	}
	public String getZlwbbh() {
		return zlwbbh;
	}
	public void setZlwbbh(String zlwbbh) {
		this.zlwbbh = zlwbbh;
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
	public String getCglb() {
		return cglb;
	}
	public void setCglb(String cglb) {
		this.cglb = cglb;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public Date getCgrq() {
		return cgrq;
	}
	public void setCgrq(Date cgrq) {
		this.cgrq = cgrq;
	}
	public String getCgbz() {
		return cgbz;
	}
	public void setCgbz(String cgbz) {
		this.cgbz = cgbz;
	}
	public String getHttk() {
		return httk;
	}
	public void setHttk(String httk) {
		this.httk = httk;
	}
	public String getCgyq() {
		return cgyq;
	}
	public void setCgyq(String cgyq) {
		this.cgyq = cgyq;
	}
	public String getCgym() {
		return cgym;
	}
	public void setCgym(String cgym) {
		this.cgym = cgym;
	}
	public String getCzym() {
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
	public int getQfbj() {
		return qfbj;
	}
	public void setQfbj(int qfbj) {
		this.qfbj = qfbj;
	}
	public String getCslxr() {
		return cslxr;
	}
	public void setCslxr(String cslxr) {
		this.cslxr = cslxr;
	}
	public String getZtdw() {
		return ztdw;
	}
	public void setZtdw(String ztdw) {
		this.ztdw = ztdw;
	}
	public String getHttp() {
		return http;
	}
	public void setHttp(String http) {
		this.http = http;
	}
	public int getRksl() {
		return rksl;
	}
	public void setRksl(int rksl) {
		this.rksl = rksl;
	}
	public String getCglx() {
		return cglx;
	}
	public void setCglx(String cglx) {
		this.cglx = cglx;
	}
	public String getHtgz() {
		return htgz;
	}
	public void setHtgz(String htgz) {
		this.htgz = htgz;
	}
	public String getQzgz() {
		return qzgz;
	}
	public void setQzgz(String qzgz) {
		this.qzgz = qzgz;
	}
	public Date getJhrq() {
		return jhrq;
	}
	public void setJhrq(Date jhrq) {
		this.jhrq = jhrq;
	}
	public int getGgzs() {
		return ggzs;
	}
	public void setGgzs(int ggzs) {
		this.ggzs = ggzs;
	}
}
