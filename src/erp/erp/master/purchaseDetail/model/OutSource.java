package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class OutSource extends Model implements Serializable{
	/*功能：外协通知单
	 *作者：伍恰
	 *时间：2016/01/28
	 *数据库名：wxtzdb
	 * */
	private static final long serialVersionUID = 1L;
	private double			wxdh;
	private Date			wxrq;
	private Date			wcrq;
	private String			csbh;
	private String			bzsm;
	private String			httk;
	private String			czym;
	private Date			czsj;
	private String			jhlb;
	private String			gxbh;
	private int			lllx;
	private String			ztdw;
	private double			dhrk;
	private double			rksl;

	public double getWxdh() {
		return wxdh;
	}
	public void setWxdh(double wxdh) {
		this.wxdh = wxdh;
	}
	public Date getWxrq() {
		return wxrq;
	}
	public void setWxrq(Date wxrq) {
		this.wxrq = wxrq;
	}
	public Date getWcrq() {
		return wcrq;
	}
	public void setWcrq(Date wcrq) {
		this.wcrq = wcrq;
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
	public String getBzsm() {
		if(bzsm==null){
			return "";
		}
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getHttk() {
		if(httk==null){
			return "";
		}
		return httk;
	}
	public void setHttk(String httk) {
		this.httk = httk;
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
	public String getJhlb() {
		if(jhlb==null){
			return "";
		}
		return jhlb;
	}
	public void setJhlb(String jhlb) {
		this.jhlb = jhlb;
	}
	public String getGxbh() {
		if(gxbh==null){
			return "";
		}
		return gxbh;
	}
	public void setGxbh(String gxbh) {
		this.gxbh = gxbh;
	}
	public int getLllx() {
		return lllx;
	}
	public void setLllx(int lllx) {
		this.lllx = lllx;
	}
	public String getZtdw() {
		if(ztdw==null){
			return "";
		}
		return ztdw;
	}
	public void setZtdw(String ztdw) {
		this.ztdw = ztdw;
	}
	public double getDhrk() {
		return dhrk;
	}
	public void setDhrk(double dhrk) {
		this.dhrk = dhrk;
	}
	public double getRksl() {
		return rksl;
	}
	public void setRksl(double rksl) {
		this.rksl = rksl;
	}
}
