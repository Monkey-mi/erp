package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class ContractDetail extends Model implements Serializable{
	/*功能：采购合同明细表
	 *作者：伍恰
	 *时间：2016/01/28
	 *数据库名：htmxb
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
	private String			clhh;
	private String			cltx1;
	private String			cltx2;
	private String			cltx3;
	private String			jhlb;
	private String			jldw;
	private double			cgsl;
	private double			ycgl;
	private double			cgdj;
	private double			zzsl;
	private double			kzdj;
	private double			cgje;
	private double			wbhl;
	private String			wbbh;
	private double			wbdj;
	private double			wbje;
	private Date			cgrq;
	private double			ghzq;
	private Date			jhrq;
	private Date			hqjq;
	private int			ddbh;
	private int			ddxh;
	private int			jhbh;
	private int			jhxh;
	private int			zxhtbh;
	private int			zxhtxh;
	private int			cgbh;
	private int			cgxh;
	private String			sgbh;
	private int			sgxh;
	private String			sdck;
	private String			bzsm;
	private String			hsbm;
	private int			xzbj;
	private Date			wkjq;
	private Date			gxsj;
	private String			jhh;
	private String			ddh;
	private String			cgh;
	private String			sgh;
	private String			zxhth;
	private String			clth;
	private String			clmc;
	private double			zzhxs;
	private String			fzdw;
	private double			fzsl;
	private double			fzkj;
	private long			fzzbj;
	private String			txgz;
	private int			sqbh;
	private int			sqxh;
	private String			sqh;
	private double			csxs1;
	private double			csxs2;
	private double			csxs3;
	private double			csxs4;
	private double			csxs5;
	private double			csxs6;
	private double			csxs7;
	private double			csxs8;
	private double			csjg;
	private int			kjlx;
	private String			htbz;
	private double			cjsl;
	private String			khbh;
	private String			cpbh;
	private int			pxxh;
	private int			wxbj;
	private String			ysgg;
	private String			dgyl;
	private double			dlgs;
	private double			rksl;
	private double			ggcs;
	private String			clbz;
	private String			zzlx;
	private String			zzyx;
	private int			zzbj;
	private String			zzrm;
	private Date			zzsj;
	private double			mxzs;
	private String			cpxj;
	private String			bzxx;
	private double			scbj;
	private Date			cjjhrq;
	private int			pzqrbj;
	private String			pzqrrm;
	private Date			pzqrsj;
	private Date			psjq;
	private int			cfbj;
	private String			mjh;
	private int			cfbh;
	private int			cfxh;
	private String			cfh;
	private String			fach;
	private String			khxh;
	private String			ywms;
	private String			pono;
	private String			xmsjbc;
	private int			xjqrbj;
	private String			bmmc;
	private String			khjc;
	private String			ckmc;
	private String cpmc;
	private String hsbmmc;
	private double zldj;
	private String requestid;
	
	public String getRequestid() {
		return requestid;
	}
	public void setRequestid(String requestid) {
		this.requestid = requestid;
	}
	public double getZldj() {
		return zldj;
	}
	public void setZldj(double zldj) {
		this.zldj = zldj;
	}
	public int getKjlx() {
		return kjlx;
	}
	public String getHsbmmc() {
		return hsbmmc;
	}
	public void setHsbmmc(String hsbmmc) {
		this.hsbmmc = hsbmmc;
	}
	public String getCpmc() {
		return cpmc;
	}
	public void setCpmc(String cpmc) {
		this.cpmc = cpmc;
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
	public String getJhlb() {
		return jhlb;
	}
	public void setJhlb(String jhlb) {
		this.jhlb = jhlb;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	public double getYcgl() {
		return ycgl;
	}
	public void setYcgl(double ycgl) {
		this.ycgl = ycgl;
	}
	public double getCgdj() {
		return cgdj;
	}
	public void setCgdj(double cgdj) {
		this.cgdj = cgdj;
	}
	public double getZzsl() {
		return zzsl;
	}
	public void setZzsl(double zzsl) {
		this.zzsl = zzsl;
	}
	public double getKzdj() {
		return kzdj;
	}
	public void setKzdj(double kzdj) {
		this.kzdj = kzdj;
	}
	public double getCgje() {
		return cgje;
	}
	public void setCgje(double cgje) {
		this.cgje = cgje;
	}
	public double getWbhl() {
		return wbhl;
	}
	public void setWbhl(double wbhl) {
		this.wbhl = wbhl;
	}
	public String getWbbh() {
		return wbbh;
	}
	public void setWbbh(String wbbh) {
		this.wbbh = wbbh;
	}
	public double getWbdj() {
		return wbdj;
	}
	public void setWbdj(double wbdj) {
		this.wbdj = wbdj;
	}
	public double getWbje() {
		return wbje;
	}
	public void setWbje(double wbje) {
		this.wbje = wbje;
	}
	public Date getCgrq() {
		return cgrq;
	}
	public void setCgrq(Date cgrq) {
		this.cgrq = cgrq;
	}
	public double getGhzq() {
		return ghzq;
	}
	public void setGhzq(double ghzq) {
		this.ghzq = ghzq;
	}
	public Date getJhrq() {
		return jhrq;
	}
	public void setJhrq(Date jhrq) {
		this.jhrq = jhrq;
	}
	public Date getHqjq() {
		return hqjq;
	}
	public void setHqjq(Date hqjq) {
		this.hqjq = hqjq;
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
	public int getZxhtbh() {
		return zxhtbh;
	}
	public void setZxhtbh(int zxhtbh) {
		this.zxhtbh = zxhtbh;
	}
	public int getZxhtxh() {
		return zxhtxh;
	}
	public void setZxhtxh(int zxhtxh) {
		this.zxhtxh = zxhtxh;
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
	public String getSgbh() {
		return sgbh;
	}
	public void setSgbh(String sgbh) {
		this.sgbh = sgbh;
	}
	public int getSgxh() {
		return sgxh;
	}
	public void setSgxh(int sgxh) {
		this.sgxh = sgxh;
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
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public int getXzbj() {
		return xzbj;
	}
	public void setXzbj(int xzbj) {
		this.xzbj = xzbj;
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
	public String getJhh() {
		return jhh;
	}
	public void setJhh(String jhh) {
		this.jhh = jhh;
	}
	public String getDdh() {
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public String getCgh() {
		return cgh;
	}
	public void setCgh(String cgh) {
		this.cgh = cgh;
	}
	public String getSgh() {
		return sgh;
	}
	public void setSgh(String sgh) {
		this.sgh = sgh;
	}
	public String getZxhth() {
		return zxhth;
	}
	public void setZxhth(String zxhth) {
		this.zxhth = zxhth;
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
	public double getZzhxs() {
		return zzhxs;
	}
	public void setZzhxs(double zzhxs) {
		this.zzhxs = zzhxs;
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
	public double getFzkj() {
		return fzkj;
	}
	public void setFzkj(double fzkj) {
		this.fzkj = fzkj;
	}
	public long getFzzbj() {
		return fzzbj;
	}
	public void setFzzbj(long fzzbj) {
		this.fzzbj = fzzbj;
	}
	public String getTxgz() {
		return txgz;
	}
	public void setTxgz(String txgz) {
		this.txgz = txgz;
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
	public double getCsxs1() {
		return csxs1;
	}
	public void setCsxs1(double csxs1) {
		this.csxs1 = csxs1;
	}
	public double getCsxs2() {
		return csxs2;
	}
	public void setCsxs2(double csxs2) {
		this.csxs2 = csxs2;
	}
	public double getCsxs3() {
		return csxs3;
	}
	public void setCsxs3(double csxs3) {
		this.csxs3 = csxs3;
	}
	public double getCsxs4() {
		return csxs4;
	}
	public void setCsxs4(double csxs4) {
		this.csxs4 = csxs4;
	}
	public double getCsxs5() {
		return csxs5;
	}
	public void setCsxs5(double csxs5) {
		this.csxs5 = csxs5;
	}
	public double getCsxs6() {
		return csxs6;
	}
	public void setCsxs6(double csxs6) {
		this.csxs6 = csxs6;
	}
	public double getCsxs7() {
		return csxs7;
	}
	public void setCsxs7(double csxs7) {
		this.csxs7 = csxs7;
	}
	public double getCsxs8() {
		return csxs8;
	}
	public void setCsxs8(double csxs8) {
		this.csxs8 = csxs8;
	}
	public double getCsjg() {
		return csjg;
	}
	public void setCsjg(double csjg) {
		this.csjg = csjg;
	}
	
	public void setKjlx(int kjlx) {
		this.kjlx = kjlx;
	}
	public String getHtbz() {
		return htbz;
	}
	public void setHtbz(String htbz) {
		this.htbz = htbz;
	}
	public double getCjsl() {
		return cjsl;
	}
	public void setCjsl(double cjsl) {
		this.cjsl = cjsl;
	}
	public String getKhbh() {
		return khbh;
	}
	public void setKhbh(String khbh) {
		this.khbh = khbh;
	}
	public String getCpbh() {
		return cpbh;
	}
	public void setCpbh(String cpbh) {
		this.cpbh = cpbh;
	}
	public int getPxxh() {
		return pxxh;
	}
	public void setPxxh(int pxxh) {
		this.pxxh = pxxh;
	}
	public int getWxbj() {
		return wxbj;
	}
	public void setWxbj(int wxbj) {
		this.wxbj = wxbj;
	}
	public String getYsgg() {
		return ysgg;
	}
	public void setYsgg(String ysgg) {
		this.ysgg = ysgg;
	}
	public String getDgyl() {
		return dgyl;
	}
	public void setDgyl(String dgyl) {
		this.dgyl = dgyl;
	}
	public double getDlgs() {
		return dlgs;
	}
	public void setDlgs(double dlgs) {
		this.dlgs = dlgs;
	}
	public double getRksl() {
		return rksl;
	}
	public void setRksl(double rksl) {
		this.rksl = rksl;
	}
	public double getGgcs() {
		return ggcs;
	}
	public void setGgcs(double ggcs) {
		this.ggcs = ggcs;
	}
	public String getClbz() {
		return clbz;
	}
	public void setClbz(String clbz) {
		this.clbz = clbz;
	}
	public String getZzlx() {
		return zzlx;
	}
	public void setZzlx(String zzlx) {
		this.zzlx = zzlx;
	}
	public String getZzyx() {
		return zzyx;
	}
	public void setZzyx(String zzyx) {
		this.zzyx = zzyx;
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
	public double getMxzs() {
		return mxzs;
	}
	public void setMxzs(double mxzs) {
		this.mxzs = mxzs;
	}
	public String getCpxj() {
		return cpxj;
	}
	public void setCpxj(String cpxj) {
		this.cpxj = cpxj;
	}
	public String getBzxx() {
		return bzxx;
	}
	public void setBzxx(String bzxx) {
		this.bzxx = bzxx;
	}
	public double getScbj() {
		return scbj;
	}
	public void setScbj(double scbj) {
		this.scbj = scbj;
	}
	public Date getCjjhrq() {
		return cjjhrq;
	}
	public void setCjjhrq(Date cjjhrq) {
		this.cjjhrq = cjjhrq;
	}
	public int getPzqrbj() {
		return pzqrbj;
	}
	public void setPzqrbj(int pzqrbj) {
		this.pzqrbj = pzqrbj;
	}
	public String getPzqrrm() {
		return pzqrrm;
	}
	public void setPzqrrm(String pzqrrm) {
		this.pzqrrm = pzqrrm;
	}
	public Date getPzqrsj() {
		return pzqrsj;
	}
	public void setPzqrsj(Date pzqrsj) {
		this.pzqrsj = pzqrsj;
	}
	public Date getPsjq() {
		return psjq;
	}
	public void setPsjq(Date psjq) {
		this.psjq = psjq;
	}
	public int getCfbj() {
		return cfbj;
	}
	public void setCfbj(int cfbj) {
		this.cfbj = cfbj;
	}
	public String getMjh() {
		return mjh;
	}
	public void setMjh(String mjh) {
		this.mjh = mjh;
	}
	public int getCfbh() {
		return cfbh;
	}
	public void setCfbh(int cfbh) {
		this.cfbh = cfbh;
	}
	public int getCfxh() {
		return cfxh;
	}
	public void setCfxh(int cfxh) {
		this.cfxh = cfxh;
	}
	public String getCfh() {
		return cfh;
	}
	public void setCfh(String cfh) {
		this.cfh = cfh;
	}
	public String getFach() {
		return fach;
	}
	public void setFach(String fach) {
		this.fach = fach;
	}
	public String getKhxh() {
		return khxh;
	}
	public void setKhxh(String khxh) {
		this.khxh = khxh;
	}
	public String getYwms() {
		return ywms;
	}
	public void setYwms(String ywms) {
		this.ywms = ywms;
	}
	public String getPono() {
		return pono;
	}
	public void setPono(String pono) {
		this.pono = pono;
	}
	public String getXmsjbc() {
		return xmsjbc;
	}
	public void setXmsjbc(String xmsjbc) {
		this.xmsjbc = xmsjbc;
	}
	public int getXjqrbj() {
		return xjqrbj;
	}
	public void setXjqrbj(int xjqrbj) {
		this.xjqrbj = xjqrbj;
	}
	public String getBmmc() {
		return bmmc;
	}
	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
	}
	public String getKhjc() {
		return khjc;
	}
	public void setKhjc(String khjc) {
		this.khjc = khjc;
	}
	public String getCkmc() {
		return ckmc;
	}
	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
}
