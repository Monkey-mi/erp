package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class OutSourceDetail extends Model implements Serializable{
	/*功能：外协通知单明细
	 *作者：伍恰
	 *时间：2016/01/28
	 *数据库名：wxtzdmxb
	 * */
	private static final long serialVersionUID = 1L;
	private double			wxdh;
	private double			wxxh;
	private double			jhbh;
	private double			jhxh;
	private String			jhh;
	private double			cgbh;
	private double			cgxh;
	private String			cgh;
	private String			cpbh;
	private String			jldw;
	private double			tcsl;
	private double			jsbl;
	private double			jgsl;
	private double			jgdj;
	private double			jgje;
	private String			clhh;
	private String			cltx1;
	private String			cltx2;
	private String			cltx3;
	private String			clmc;
	private double			ytcs;
	private double			sqbh;
	private double			sqxh;
	private String			sqh;
	private double			kzdj;
	private int			kjlx;
	private String			fzdw;
	private double			fzsl;
	private int			hqbj;
	private String			hqrm;
	private Date			hqsj;
	private Date			wkjq;
	private Date			gxsj;
	private double			dhrk;
	private double			rksl;

	public double getWxdh() {
		return wxdh;
	}
	public void setWxdh(double wxdh) {
		this.wxdh = wxdh;
	}
	public double getWxxh() {
		return wxxh;
	}
	public void setWxxh(double wxxh) {
		this.wxxh = wxxh;
	}
	public double getJhbh() {
		return jhbh;
	}
	public void setJhbh(double jhbh) {
		this.jhbh = jhbh;
	}
	public double getJhxh() {
		return jhxh;
	}
	public void setJhxh(double jhxh) {
		this.jhxh = jhxh;
	}
	public String getJhh() {
		return jhh;
	}
	public void setJhh(String jhh) {
		this.jhh = jhh;
	}
	public double getCgbh() {
		return cgbh;
	}
	public void setCgbh(double cgbh) {
		this.cgbh = cgbh;
	}
	public double getCgxh() {
		return cgxh;
	}
	public void setCgxh(double cgxh) {
		this.cgxh = cgxh;
	}
	public String getCgh() {
		return cgh;
	}
	public void setCgh(String cgh) {
		this.cgh = cgh;
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
	public String getJldw() {
		if(jldw==null){
			return "";
		}
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public double getTcsl() {
		return tcsl;
	}
	public void setTcsl(double tcsl) {
		this.tcsl = tcsl;
	}
	public double getJsbl() {
		return jsbl;
	}
	public void setJsbl(double jsbl) {
		this.jsbl = jsbl;
	}
	public double getJgsl() {
		return jgsl;
	}
	public void setJgsl(double jgsl) {
		this.jgsl = jgsl;
	}
	public double getJgdj() {
		return jgdj;
	}
	public void setJgdj(double jgdj) {
		this.jgdj = jgdj;
	}
	public double getJgje() {
		return jgje;
	}
	public void setJgje(double jgje) {
		this.jgje = jgje;
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
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public double getYtcs() {
		return ytcs;
	}
	public void setYtcs(double ytcs) {
		this.ytcs = ytcs;
	}
	public double getSqbh() {
		return sqbh;
	}
	public void setSqbh(double sqbh) {
		this.sqbh = sqbh;
	}
	public double getSqxh() {
		return sqxh;
	}
	public void setSqxh(double sqxh) {
		this.sqxh = sqxh;
	}
	public String getSqh() {
		return sqh;
	}
	public void setSqh(String sqh) {
		this.sqh = sqh;
	}
	public double getKzdj() {
		return kzdj;
	}
	public void setKzdj(double kzdj) {
		this.kzdj = kzdj;
	}
	public int getKjlx() {
		return kjlx;
	}
	public void setKjlx(int kjlx) {
		this.kjlx = kjlx;
	}
	public String getFzdw() {
		if(fzdw==null){
			return "";
		}
		return fzdw;
	}
	public void setFzdw(String fzdw) {
		this.fzdw = fzdw;
	}
	public double getFzsl() {
		return fzsl;
	}
	public void setFzsl(double fzsl) {
		this.fzsl = fzsl;
	}
	public int getHqbj() {
		return hqbj;
	}
	public void setHqbj(int hqbj) {
		this.hqbj = hqbj;
	}
	public String getHqrm() {
		if(hqrm==null){
			return "";
		}
		return hqrm;
	}
	public void setHqrm(String hqrm) {
		this.hqrm = hqrm;
	}
	public Date getHqsj() {
		return hqsj;
	}
	public void setHqsj(Date hqsj) {
		this.hqsj = hqsj;
	}
	public Date getWkjq() {
		return wkjq;
	}
	public void setWkjq(Date wkjq) {
		this.wkjq = wkjq;
	}
	public Date getGxsj() {
		return gxsj;
	}
	public void setGxsj(Date gxsj) {
		this.gxsj = gxsj;
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
