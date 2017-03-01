package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class PurchaseDetail extends Model implements Serializable{
	/*功能：采购计划明细总表
	 *作者：伍恰
	 *时间：2016/01/20
	 *数据库名：cgjhmxb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			cgbh;
	private int			cgxh;
	private String			cgh;
	private String			clhh;
	private String			cltx1;
	private String			cltx2;
	private String			cltx3;
	private String			jldw;
	private double			cgdj;
	private double			cgsl;
	private double			kzdj;
	private String			wbbh;
	private double			xgsl;
	private double			ylbl;
	private double			htsl1;
	private double			htsl;
	private double			dhrk;
	private double			cjww;
	private double			cgtqq;
	private double			ghzq;
	private String			cgym;
	private Date			cgrq;
	private int			yzbj;
	private int			wcbj;
	private int			qfbj;
	private String			qfrm;
	private Date			qfsj;
	private Date			sxrq;
	private Date			jhrq;
	private String			jhh;
	private double			cgje;
	private int			jhbh;
	private int			jhxh;
	private String			csbh;
	private String			sdck;
	private String			bzsm;
	private String			fzdw;
	private double			fzsl;
	private double			fzwz;
	private int			spbj;
	private String			sprm;
	private Date			spsj;
	private int			zzbj;
	private String			zzrm;
	private Date			zzsj;
	private int			ywbj;
	private String			cgzh;
	private String			zzyx;
	private double			wxsl;
	private String			ywzy;
	private int			wxdh;
	private int			wxxh;
	private int			tzxh;
	private String			ysgg;
	private double			wxwz;
	private double			cjwz;
	private double			rksl;
	private double			rkww;
	private String			jhlb;
	private String			jhbz;
	private String			czym;
	private Date			czsj;
	private String			csmc;
	private String			lbbh;
	private String			clth;
	private String			clmc;
	private int			xcrq;
	private String			hsbm;
	private String			hyhm;
	private String			cpbh;
	private int			ddbh;
	private int			ddxh;
	private String			ddh;
	private String			khbh;
	private String			khmc;
	private String			khjc;
	private int			wxbj;
	private int			gzbj;
	private int			xzbj;
	private String			zcpbh;
	private int			sqbh;
	private int			sqxh;
	private String			sqh;
	private int			dlgs;
	private int			yzdl;
	private String			cpmc;
	private int			wzdl;
	private int			htcg;
	private int			htqf;
	private int			scbj;
	private Date			wkjq;
	private String			jhlbmc;
	private String			cllbmc;
	private String			zcpmc;
	private String			wbdh;
	private String cgyxm;
	private String cgzm;
	private String ckmc;
	private String db_TYPE;
	private String clmjlb;
	private String clmjlbmc;
	
	public int getScbj() {
		return scbj;
	}
	public void setScbj(int scbj) {
		this.scbj = scbj;
	}
	public String getClmjlbmc() {
		return clmjlbmc;
	}
	public void setClmjlbmc(String clmjlbmc) {
		this.clmjlbmc = clmjlbmc;
	}
	public String getClmjlb() {
		return clmjlb;
	}
	public void setClmjlb(String clmjlb) {
		this.clmjlb = clmjlb;
	}
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public String getCkmc() {
		return ckmc;
	}
	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
	}
	public String getCgzm() {
		return cgzm;
	}
	public void setCgzm(String cgzm) {
		this.cgzm = cgzm;
	}
	public String getCgyxm() {
		return cgyxm;
	}
	public void setCgyxm(String cgyxm) {
		this.cgyxm = cgyxm;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getCgbh() {
		return cgbh;
	}
	public void setCgbh(int cgbh) {
		this.cgbh = cgbh;
	}
	public int getCgxh() {
		return cgxh;
	}
	public void setCgxh(int cgxh) {
		this.cgxh = cgxh;
	}
	public String getCgh() {
		return cgh;
	}
	public void setCgh(String cgh) {
		this.cgh = cgh;
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
	public double getCgdj() {
		return cgdj;
	}
	public void setCgdj(double cgdj) {
		this.cgdj = cgdj;
	}
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	public double getKzdj() {
		return kzdj;
	}
	public void setKzdj(double kzdj) {
		this.kzdj = kzdj;
	}
	public String getWbbh() {
		return wbbh;
	}
	public void setWbbh(String wbbh) {
		this.wbbh = wbbh;
	}
	public double getXgsl() {
		return xgsl;
	}
	public void setXgsl(double xgsl) {
		this.xgsl = xgsl;
	}
	public double getYlbl() {
		return ylbl;
	}
	public void setYlbl(double ylbl) {
		this.ylbl = ylbl;
	}
	public double getHtsl1() {
		return htsl1;
	}
	public void setHtsl1(double htsl1) {
		this.htsl1 = htsl1;
	}
	public double getHtsl() {
		return htsl;
	}
	public void setHtsl(double htsl) {
		this.htsl = htsl;
	}
	public double getDhrk() {
		return dhrk;
	}
	public void setDhrk(double dhrk) {
		this.dhrk = dhrk;
	}
	public double getCjww() {
		return cjww;
	}
	public void setCjww(double cjww) {
		this.cjww = cjww;
	}
	public double getCgtqq() {
		return cgtqq;
	}
	public void setCgtqq(double cgtqq) {
		this.cgtqq = cgtqq;
	}
	public double getGhzq() {
		return ghzq;
	}
	public void setGhzq(double ghzq) {
		this.ghzq = ghzq;
	}
	public String getCgym() {
		return cgym;
	}
	public void setCgym(String cgym) {
		this.cgym = cgym;
	}
	public Date getCgrq() {
		return cgrq;
	}
	public void setCgrq(Date cgrq) {
		this.cgrq = cgrq;
	}
	public int getYzbj() {
		return yzbj;
	}
	public void setYzbj(int yzbj) {
		this.yzbj = yzbj;
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
	public String getQfrm() {
		return qfrm;
	}
	public void setQfrm(String qfrm) {
		this.qfrm = qfrm;
	}
	public Date getQfsj() {
		return qfsj;
	}
	public void setQfsj(Date qfsj) {
		this.qfsj = qfsj;
	}
	public Date getSxrq() {
		return sxrq;
	}
	public void setSxrq(Date sxrq) {
		this.sxrq = sxrq;
	}
	public Date getJhrq() {
		return jhrq;
	}
	public void setJhrq(Date jhrq) {
		this.jhrq = jhrq;
	}
	public String getJhh() {
		return jhh;
	}
	public void setJhh(String jhh) {
		this.jhh = jhh;
	}
	public double getCgje() {
		return cgje;
	}
	public void setCgje(double cgje) {
		this.cgje = cgje;
	}
	public int getJhbh() {
		return jhbh;
	}
	public void setJhbh(int jhbh) {
		this.jhbh = jhbh;
	}
	public int getJhxh() {
		return jhxh;
	}
	public void setJhxh(int jhxh) {
		this.jhxh = jhxh;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public String getSdck() {
		return sdck;
	}
	public void setSdck(String sdck) {
		this.sdck = sdck;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getFzdw() {
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
	public double getFzwz() {
		return fzwz;
	}
	public void setFzwz(double fzwz) {
		this.fzwz = fzwz;
	}
	public int getSpbj() {
		return spbj;
	}
	public void setSpbj(int spbj) {
		this.spbj = spbj;
	}
	public String getSprm() {
		return sprm;
	}
	public void setSprm(String sprm) {
		this.sprm = sprm;
	}
	public Date getSpsj() {
		return spsj;
	}
	public void setSpsj(Date spsj) {
		this.spsj = spsj;
	}
	public int getZzbj() {
		return zzbj;
	}
	public void setZzbj(int zzbj) {
		this.zzbj = zzbj;
	}
	public String getZzrm() {
		return zzrm;
	}
	public void setZzrm(String zzrm) {
		this.zzrm = zzrm;
	}
	public Date getZzsj() {
		return zzsj;
	}
	public void setZzsj(Date zzsj) {
		this.zzsj = zzsj;
	}
	public int getYwbj() {
		return ywbj;
	}
	public void setYwbj(int ywbj) {
		this.ywbj = ywbj;
	}
	public String getCgzh() {
		return cgzh;
	}
	public void setCgzh(String cgzh) {
		this.cgzh = cgzh;
	}
	public String getZzyx() {
		return zzyx;
	}
	public void setZzyx(String zzyx) {
		this.zzyx = zzyx;
	}
	public double getWxsl() {
		return wxsl;
	}
	public void setWxsl(double wxsl) {
		this.wxsl = wxsl;
	}
	public String getYwzy() {
		return ywzy;
	}
	public void setYwzy(String ywzy) {
		this.ywzy = ywzy;
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
	public String getYsgg() {
		return ysgg;
	}
	public void setYsgg(String ysgg) {
		this.ysgg = ysgg;
	}
	public double getWxwz() {
		return wxwz;
	}
	public void setWxwz(double wxwz) {
		this.wxwz = wxwz;
	}
	public double getCjwz() {
		return cjwz;
	}
	public void setCjwz(double cjwz) {
		this.cjwz = cjwz;
	}
	public double getRksl() {
		return rksl;
	}
	public void setRksl(double rksl) {
		this.rksl = rksl;
	}
	public double getRkww() {
		return rkww;
	}
	public void setRkww(double rkww) {
		this.rkww = rkww;
	}
	public String getJhlb() {
		return jhlb;
	}
	public void setJhlb(String jhlb) {
		this.jhlb = jhlb;
	}
	public String getJhbz() {
		return jhbz;
	}
	public void setJhbz(String jhbz) {
		this.jhbz = jhbz;
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
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getClth() {
		return clth;
	}
	public void setClth(String clth) {
		this.clth = clth;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public int getXcrq() {
		return xcrq;
	}
	public void setXcrq(int xcrq) {
		this.xcrq = xcrq;
	}
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public String getHyhm() {
		return hyhm;
	}
	public void setHyhm(String hyhm) {
		this.hyhm = hyhm;
	}
	public String getCpbh() {
		return cpbh;
	}
	public void setCpbh(String cpbh) {
		this.cpbh = cpbh;
	}
	public int getDdbh() {
		return ddbh;
	}
	public void setDdbh(int ddbh) {
		this.ddbh = ddbh;
	}
	public int getDdxh() {
		return ddxh;
	}
	public void setDdxh(int ddxh) {
		this.ddxh = ddxh;
	}
	public String getDdh() {
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public String getKhbh() {
		return khbh;
	}
	public void setKhbh(String khbh) {
		this.khbh = khbh;
	}
	public String getKhmc() {
		return khmc;
	}
	public void setKhmc(String khmc) {
		this.khmc = khmc;
	}
	public String getKhjc() {
		return khjc;
	}
	public void setKhjc(String khjc) {
		this.khjc = khjc;
	}
	public int getWxbj() {
		return wxbj;
	}
	public void setWxbj(int wxbj) {
		this.wxbj = wxbj;
	}
	public int getGzbj() {
		return gzbj;
	}
	public void setGzbj(int gzbj) {
		this.gzbj = gzbj;
	}
	public int getXzbj() {
		return xzbj;
	}
	public void setXzbj(int xzbj) {
		this.xzbj = xzbj;
	}
	public String getZcpbh() {
		return zcpbh;
	}
	public void setZcpbh(String zcpbh) {
		this.zcpbh = zcpbh;
	}
	public int getSqbh() {
		return sqbh;
	}
	public void setSqbh(int sqbh) {
		this.sqbh = sqbh;
	}
	public int getSqxh() {
		return sqxh;
	}
	public void setSqxh(int sqxh) {
		this.sqxh = sqxh;
	}
	public String getSqh() {
		return sqh;
	}
	public void setSqh(String sqh) {
		this.sqh = sqh;
	}
	public int getDlgs() {
		return dlgs;
	}
	public void setDlgs(int dlgs) {
		this.dlgs = dlgs;
	}
	public int getYzdl() {
		return yzdl;
	}
	public void setYzdl(int yzdl) {
		this.yzdl = yzdl;
	}
	public String getCpmc() {
		return cpmc;
	}
	public void setCpmc(String cpmc) {
		this.cpmc = cpmc;
	}
	public int getWzdl() {
		return wzdl;
	}
	public void setWzdl(int wzdl) {
		this.wzdl = wzdl;
	}
	public int getHtcg() {
		return htcg;
	}
	public void setHtcg(int htcg) {
		this.htcg = htcg;
	}
	public int getHtqf() {
		return htqf;
	}
	public void setHtqf(int htqf) {
		this.htqf = htqf;
	}
	public Date getWkjq() {
		return wkjq;
	}
	public void setWkjq(Date wkjq) {
		this.wkjq = wkjq;
	}
	public String getJhlbmc() {
		return jhlbmc;
	}
	public void setJhlbmc(String jhlbmc) {
		this.jhlbmc = jhlbmc;
	}
	public String getCllbmc() {
		return cllbmc;
	}
	public void setCllbmc(String cllbmc) {
		this.cllbmc = cllbmc;
	}
	public String getZcpmc() {
		return zcpmc;
	}
	public void setZcpmc(String zcpmc) {
		this.zcpmc = zcpmc;
	}
	public String getWbdh() {
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
}
