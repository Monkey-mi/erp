package erp.erp.purchaseOrder.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class ProcurementOrder extends Model implements Serializable{
	/*功能：采购订单
	 *作者：伍恰
	 *时间：2016/03/16
	 *数据库名：cghtb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private Date			cgrq;
	private String			csbh;
	private String			cgbz;
	private Date			jhrq;
	private double			htzs;
	private double			htze;
	private double			wbze;
	private double			dhrk;
	private double			cgww;
	private double			cgwwje;
	private int			wcbj;
	private int			qfbj;
	private Date			qfsj;
	private String			qfrm;
	private int			gdbj;
	private int			dybj;
	private Date			dysj;
	private String			cglb;
	private int			hqbj;
	private String			cgym;
	private String			czym;
	private Date			czsj;
	private Date			hqsj;
	private String			cslxr;
	private String			ztdw;
	private int			sdbj;
	private String			sdrm;
	private Date			sdsj;
	private String			csmc;
	private String			wbbh;
	private String			hsbm;
	private int			kzbj;
	private String			kzrm;
	private Date			kzsj;
	private double			rksl;
	private double			ggzs;
	private String			cglx;
	private String			htgz;
	private String			ssbm;
	private String			scdh;
	private int			yfbj;
	private int			xkxj;
	private int			cglx_fk;
	private String			cglbmc;
	private String			hsbmmc;
	private String			wbdh;
	private String			ztmc;
	private String			cgyxm;
	private String			ssbmmc;
	private String httk;
	private String cgyq;
	private String http;
	private String qzgz;
	private int zlbj;
	private String zlcsbh;
	private String zlwbmc;
	private String zlwbbh;
	private String zlcsmc;
	private Date cgrq_top;
	
	
	
	public Date getCgrq_top() {
		return cgrq_top;
	}
	public void setCgrq_top(Date cgrq_top) {
		this.cgrq_top = cgrq_top;
	}
	public String getZlcsmc() {
		return zlcsmc;
	}
	public void setZlcsmc(String zlcsmc) {
		this.zlcsmc = zlcsmc;
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
	public String getQzgz() {
		return qzgz;
	}
	public void setQzgz(String qzgz) {
		this.qzgz = qzgz;
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
	public String getHttp() {
		return http;
	}
	public void setHttp(String http) {
		this.http = http;
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
	public Date getCgrq() {
		return cgrq;
	}
	public void setCgrq(Date cgrq) {
		this.cgrq = cgrq;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public String getCgbz() {
		return cgbz;
	}
	public void setCgbz(String cgbz) {
		this.cgbz = cgbz;
	}
	public Date getJhrq() {
		return jhrq;
	}
	public void setJhrq(Date jhrq) {
		this.jhrq = jhrq;
	}
	public double getHtzs() {
		return htzs;
	}
	public void setHtzs(double htzs) {
		this.htzs = htzs;
	}
	public double getHtze() {
		return htze;
	}
	public void setHtze(double htze) {
		this.htze = htze;
	}
	public double getWbze() {
		return wbze;
	}
	public void setWbze(double wbze) {
		this.wbze = wbze;
	}
	public double getDhrk() {
		return dhrk;
	}
	public void setDhrk(double dhrk) {
		this.dhrk = dhrk;
	}
	public double getCgww() {
		return cgww;
	}
	public void setCgww(double cgww) {
		this.cgww = cgww;
	}
	public double getCgwwje() {
		return cgwwje;
	}
	public void setCgwwje(double cgwwje) {
		this.cgwwje = cgwwje;
	}
	public int getWcbj() {
		return wcbj;
	}
	public void setWcbj(int wcbj) {
		this.wcbj = wcbj;
	}
	public int getQfbj() {
		return qfbj;
	}
	public void setQfbj(int qfbj) {
		this.qfbj = qfbj;
	}
	public Date getQfsj() {
		return qfsj;
	}
	public void setQfsj(Date qfsj) {
		this.qfsj = qfsj;
	}
	public String getQfrm() {
		return qfrm;
	}
	public void setQfrm(String qfrm) {
		this.qfrm = qfrm;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
	public int getDybj() {
		return dybj;
	}
	public void setDybj(int dybj) {
		this.dybj = dybj;
	}
	public Date getDysj() {
		return dysj;
	}
	public void setDysj(Date dysj) {
		this.dysj = dysj;
	}
	public String getCglb() {
		if(cglb==null){
			return "";
		}
		return cglb.trim();
	}
	public void setCglb(String cglb) {
		this.cglb = cglb;
	}
	public int getHqbj() {
		return hqbj;
	}
	public void setHqbj(int hqbj) {
		this.hqbj = hqbj;
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
	public Date getHqsj() {
		return hqsj;
	}
	public void setHqsj(Date hqsj) {
		this.hqsj = hqsj;
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
	public int getSdbj() {
		return sdbj;
	}
	public void setSdbj(int sdbj) {
		this.sdbj = sdbj;
	}
	public String getSdrm() {
		return sdrm;
	}
	public void setSdrm(String sdrm) {
		this.sdrm = sdrm;
	}
	public Date getSdsj() {
		return sdsj;
	}
	public void setSdsj(Date sdsj) {
		this.sdsj = sdsj;
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
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public int getKzbj() {
		return kzbj;
	}
	public void setKzbj(int kzbj) {
		this.kzbj = kzbj;
	}
	public String getKzrm() {
		return kzrm;
	}
	public void setKzrm(String kzrm) {
		this.kzrm = kzrm;
	}
	public Date getKzsj() {
		return kzsj;
	}
	public void setKzsj(Date kzsj) {
		this.kzsj = kzsj;
	}
	public double getRksl() {
		return rksl;
	}
	public void setRksl(double rksl) {
		this.rksl = rksl;
	}
	public double getGgzs() {
		return ggzs;
	}
	public void setGgzs(double ggzs) {
		this.ggzs = ggzs;
	}
	public String getCglx() {
		if(cglx==null){
			return "";
		}
		return cglx.trim();
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
	public String getSsbm() {
		return ssbm;
	}
	public void setSsbm(String ssbm) {
		this.ssbm = ssbm;
	}
	public String getScdh() {
		return scdh;
	}
	public void setScdh(String scdh) {
		this.scdh = scdh;
	}
	public int getYfbj() {
		return yfbj;
	}
	public void setYfbj(int yfbj) {
		this.yfbj = yfbj;
	}
	public int getXkxj() {
		return xkxj;
	}
	public void setXkxj(int xkxj) {
		this.xkxj = xkxj;
	}
	public int getCglx_fk() {
		return cglx_fk;
	}
	public void setCglx_fk(int cglx_fk) {
		this.cglx_fk = cglx_fk;
	}
	public String getCglbmc() {
		return cglbmc;
	}
	public void setCglbmc(String cglbmc) {
		this.cglbmc = cglbmc;
	}
	public String getHsbmmc() {
		return hsbmmc;
	}
	public void setHsbmmc(String hsbmmc) {
		this.hsbmmc = hsbmmc;
	}
	public String getWbdh() {
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
	public String getZtmc() {
		return ztmc;
	}
	public void setZtmc(String ztmc) {
		this.ztmc = ztmc;
	}
	public String getCgyxm() {
		return cgyxm;
	}
	public void setCgyxm(String cgyxm) {
		this.cgyxm = cgyxm;
	}
	public String getSsbmmc() {
		return ssbmmc;
	}
	public void setSsbmmc(String ssbmmc) {
		this.ssbmmc = ssbmmc;
	}
}
