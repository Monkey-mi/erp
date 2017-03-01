package erp.erp.purchaseOrder.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class PurchaseOrderDetail extends Model implements Serializable{
	/*功能：采购订单明细
	 *作者：伍恰
	 *时间：2016/03/16
	 *数据库名：htmxb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
	private String			clhh;
	private String			cltx1;
	private String			cltx2;
	private String			cltx3;
	private String			jldw;
	private double			cgsl;
	private double			ycgl;
	private double			dhrk;
	private double			cgww;
	private double			cgwwje;
	private double			cgdj;
	private String			wbbh;
	private double			wbdj;
	private double			wbhl;
	private double			cgje;
	private double			wbje;
	private double			zzsl;
	private Date			cgrq;
	private double			ghzq;
	private Date			jhrq;
	private double			kzdj;
	private Date			qrjq;
	private Date			hqjq;
	private String			sdck;
	private String			bzsm;
	private int			wcbj;
	private int			zzbj;
	private String			hsbm;
	private double			fzsl;
	private String			fzdw;
	private String			ysgg;
	private Date			wkjq;
	private Date			gxsj;
	private String			clmc;
	private String			clth;
	private double			zzhxs;
	private Date			cjjhrq;
	private double			rksl;
	private double			rkww;
	private String			jhh;
	private String			ddh;
	private String			cgh;
	private double			djsl;
	private double			drsl;
	private double			dtsl;
	private String			sqh;
	private String			sgh;
	private String			zxhth;
	private int			zxhtbh;
	private int			zxhtxh;
	private int			sqbh;
	private int			sqxh;
	private int			jhbh;
	private int			jhxh;
	private String			htbz;
	private int			kjlx;
	private double			cjsl;
	private double			lgxs;
	private String			khbh;
	private String			cpbh;
	private int			pxxh;
	private int			wxbj;
	private int			gzbj;
	private double			dlgs;
	private String			zzrm;
	private Date			zzsj;
	private double			ggcs;
	private String			zzlx;
	private String			zzyx;
	private int			scbj;
	private String			mjh;
	private int			pzqrbj;
	private String			cfh;
	private String			plmth;
	private String			plmtx;
	private String			plmth_cp;
	private String			plmtx_cp;
	private String khjc;
	private String cpmc;
	private String hsbmmc;
	private String wbdh;
	private String zzlxmc;
	private String sdckmc;
	private int xjqrbj;
	private int ddbh;
	private int ddxh;
	private String clbz;
	private String bzxx;
	private String cpxj;
	
	private String jhlb;
	private int cgbh;
	private int cgxh;
	private String sgbh;
	private double			csxs1;
	private double			csxs2;
	private double			csxs3;
	private double			csxs4;
	private double			csxs5;
	private double			csxs6;
	private double			csxs7;
	private double			csxs8;
	private int			sgxh;
	private int			xzbj;
	private double			fzkj;
	private long			fzzbj;
	private String			txgz;
	private double			csjg;
	private String			dgyl;
	private double			mxzs;
	private String			pzqrrm;
	private Date			pzqrsj;
	private Date			psjq;
	private int			cfbj;
	private int			cfbh;
	private int			cfxh;
	private String			fach;
	private String			khxh;
	private String			ywms;
	private String			pono;
	private String			xmsjbc;
	private String login_id;
	private String ip;
	private String htzzlxmc;
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
	public String getHtzzlxmc() {
		return htzzlxmc;
	}
	public void setHtzzlxmc(String htzzlxmc) {
		this.htzzlxmc = htzzlxmc;
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
	public String getJhlb() {
		if(jhlb==null){
			return "";
		}
		return jhlb;
	}
	public void setJhlb(String jhlb) {
		this.jhlb = jhlb;
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
		if(sgbh==null){
			return "";
		}
		return sgbh;
	}
	public void setSgbh(String sgbh) {
		this.sgbh = sgbh;
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
	public int getSgxh() {
		return sgxh;
	}
	public void setSgxh(int sgxh) {
		this.sgxh = sgxh;
	}
	public int getXzbj() {
		return xzbj;
	}
	public void setXzbj(int xzbj) {
		this.xzbj = xzbj;
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
		if(txgz==null){
			return "";
		}
		return txgz;
	}
	public void setTxgz(String txgz) {
		this.txgz = txgz;
	}
	public double getCsjg() {
		return csjg;
	}
	public void setCsjg(double csjg) {
		this.csjg = csjg;
	}
	public String getDgyl() {
		if(dgyl==null){
			return "";
		}
		return dgyl;
	}
	public void setDgyl(String dgyl) {
		this.dgyl = dgyl;
	}
	public double getMxzs() {
		return mxzs;
	}
	public void setMxzs(double mxzs) {
		this.mxzs = mxzs;
	}
	public String getPzqrrm() {
		if(pzqrrm==null){
			return "";
		}
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
	public String getFach() {
		if(fach==null){
			return "";
		}
		return fach;
	}
	public void setFach(String fach) {
		this.fach = fach;
	}
	public String getKhxh() {
		if(khxh==null){
			return "";
		}
		return khxh;
	}
	public void setKhxh(String khxh) {
		this.khxh = khxh;
	}
	public String getYwms() {
		if(ywms==null){
			return "";
		}
		return ywms;
	}
	public void setYwms(String ywms) {
		this.ywms = ywms;
	}
	public String getPono() {
		if(pono==null){
			return "";
		}
		return pono;
	}
	public void setPono(String pono) {
		this.pono = pono;
	}
	public String getXmsjbc() {
		if(xmsjbc==null){
			return "";
		}
		return xmsjbc;
	}
	public void setXmsjbc(String xmsjbc) {
		this.xmsjbc = xmsjbc;
	}
	public String getClbz() {
		if(clbz==null){
			return "";
		}
		return clbz;
	}
	public void setClbz(String clbz) {
		this.clbz = clbz;
	}
	public String getBzxx() {
		if(bzxx==null){
			return "";
		}
		return bzxx;
	}
	public void setBzxx(String bzxx) {
		this.bzxx = bzxx;
	}
	public String getCpxj() {
		if(cpxj==null){
			return "";
		}
		return cpxj;
	}
	public void setCpxj(String cpxj) {
		this.cpxj = cpxj;
	}
	public int getXjqrbj() {
		return xjqrbj;
	}
	public void setXjqrbj(int xjqrbj) {
		this.xjqrbj = xjqrbj;
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
	public String getSdckmc() {
		if(sdckmc==null){
			return "";
		}
		return sdckmc;
	}
	public void setSdckmc(String sdckmc) {
		this.sdckmc = sdckmc;
	}
	public String getZzlxmc() {
		if(zzlxmc==null){
			return "";
		}
		return zzlxmc;
	}
	public void setZzlxmc(String zzlxmc) {
		this.zzlxmc = zzlxmc;
	}
	public String getWbdh() {
		if(wbdh==null){
			return "";
		}
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
	public String getHsbmmc() {
		if(hsbmmc==null){
			return "";
		}
		return hsbmmc;
	}
	public void setHsbmmc(String hsbmmc) {
		this.hsbmmc = hsbmmc;
	}
	public String getCpmc() {
		if(cpmc==null){
			return "";
		}
		return cpmc;
	}
	public void setCpmc(String cpmc) {
		this.cpmc = cpmc;
	}
	public String getKhjc() {
		if(khjc==null){
			return "";
		}
		return khjc;
	}
	public void setKhjc(String khjc) {
		this.khjc = khjc;
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
	public double getCgdj() {
		return cgdj;
	}
	public void setCgdj(double cgdj) {
		this.cgdj = cgdj;
	}
	public String getWbbh() {
		if(wbbh==null){
			return "";
		}
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
	public double getWbhl() {
		return wbhl;
	}
	public void setWbhl(double wbhl) {
		this.wbhl = wbhl;
	}
	public double getCgje() {
		return cgje;
	}
	public void setCgje(double cgje) {
		this.cgje = cgje;
	}
	public double getWbje() {
		return wbje;
	}
	public void setWbje(double wbje) {
		this.wbje = wbje;
	}
	public double getZzsl() {
		return zzsl;
	}
	public void setZzsl(double zzsl) {
		this.zzsl = zzsl;
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
	public double getKzdj() {
		return kzdj;
	}
	public void setKzdj(double kzdj) {
		this.kzdj = kzdj;
	}
	public Date getQrjq() {
		return qrjq;
	}
	public void setQrjq(Date qrjq) {
		this.qrjq = qrjq;
	}
	public Date getHqjq() {
		return hqjq;
	}
	public void setHqjq(Date hqjq) {
		this.hqjq = hqjq;
	}
	public String getSdck() {
		if(sdck==null){
			return "";
		}
		return sdck;
	}
	public void setSdck(String sdck) {
		this.sdck = sdck;
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
	public int getWcbj() {
		return wcbj;
	}
	public void setWcbj(int wcbj) {
		this.wcbj = wcbj;
	}
	public int getZzbj() {
		return zzbj;
	}
	public void setZzbj(int zzbj) {
		this.zzbj = zzbj;
	}
	public String getHsbm() {
		if(hsbm==null){
			return "";
		}
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public double getFzsl() {
		return fzsl;
	}
	public void setFzsl(double fzsl) {
		this.fzsl = fzsl;
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
	public String getYsgg() {
		if(ysgg==null){
			return "";
		}
		return ysgg;
	}
	public void setYsgg(String ysgg) {
		this.ysgg = ysgg;
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
	public String getClmc() {
		if(clmc==null){
			return "";
		}
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getClth() {
		if(clth==null){
			return "";
		}
		return clth;
	}
	public void setClth(String clth) {
		this.clth = clth;
	}
	public double getZzhxs() {
		return zzhxs;
	}
	public void setZzhxs(double zzhxs) {
		this.zzhxs = zzhxs;
	}
	public Date getCjjhrq() {
		return cjjhrq;
	}
	public void setCjjhrq(Date cjjhrq) {
		this.cjjhrq = cjjhrq;
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
	public String getJhh() {
		if(jhh==null){
			return "";
		}
		return jhh;
	}
	public void setJhh(String jhh) {
		this.jhh = jhh;
	}
	public String getDdh() {
		if(ddh==null){
			return "";
		}
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public String getCgh() {
		if(cgh==null){
			return "";
		}
		return cgh;
	}
	public void setCgh(String cgh) {
		this.cgh = cgh;
	}
	public double getDjsl() {
		return djsl;
	}
	public void setDjsl(double djsl) {
		this.djsl = djsl;
	}
	public double getDrsl() {
		return drsl;
	}
	public void setDrsl(double drsl) {
		this.drsl = drsl;
	}
	public double getDtsl() {
		return dtsl;
	}
	public void setDtsl(double dtsl) {
		this.dtsl = dtsl;
	}
	public String getSqh() {
		if(sqh==null){
			return "";
		}
		return sqh;
	}
	public void setSqh(String sqh) {
		this.sqh = sqh;
	}
	public String getSgh() {
		if(sgh==null){
			return "";
		}
		return sgh;
	}
	public void setSgh(String sgh) {
		this.sgh = sgh;
	}
	public String getZxhth() {
		if(zxhth==null){
			return "";
		}
		return zxhth;
	}
	public void setZxhth(String zxhth) {
		this.zxhth = zxhth;
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
	public String getHtbz() {
		if(htbz==null){
			return "";
		}
		return htbz;
	}
	public void setHtbz(String htbz) {
		this.htbz = htbz;
	}
	public int getKjlx() {
		return kjlx;
	}
	public void setKjlx(int kjlx) {
		this.kjlx = kjlx;
	}
	public double getCjsl() {
		return cjsl;
	}
	public void setCjsl(double cjsl) {
		this.cjsl = cjsl;
	}
	public double getLgxs() {
		return lgxs;
	}
	public void setLgxs(double lgxs) {
		this.lgxs = lgxs;
	}
	public String getKhbh() {
		if(khbh==null){
			return "";
		}
		return khbh;
	}
	public void setKhbh(String khbh) {
		this.khbh = khbh;
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
	public int getGzbj() {
		return gzbj;
	}
	public void setGzbj(int gzbj) {
		this.gzbj = gzbj;
	}
	public double getDlgs() {
		return dlgs;
	}
	public void setDlgs(double dlgs) {
		this.dlgs = dlgs;
	}
	public String getZzrm() {
		if(zzrm==null){
			return "";
		}
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
	public double getGgcs() {
		return ggcs;
	}
	public void setGgcs(double ggcs) {
		this.ggcs = ggcs;
	}
	public String getZzlx() {
		if(zzlx==null){
			return "";
		}
		return zzlx;
	}
	public void setZzlx(String zzlx) {
		this.zzlx = zzlx;
	}
	public String getZzyx() {
		if(zzyx==null){
			return "";
		}
		return zzyx;
	}
	public void setZzyx(String zzyx) {
		this.zzyx = zzyx;
	}
	public int getScbj() {
		return scbj;
	}
	public void setScbj(int scbj) {
		this.scbj = scbj;
	}
	public String getMjh() {
		if(mjh==null){
			return "";
		}
		return mjh;
	}
	public void setMjh(String mjh) {
		this.mjh = mjh;
	}
	public int getPzqrbj() {
		return pzqrbj;
	}
	public void setPzqrbj(int pzqrbj) {
		this.pzqrbj = pzqrbj;
	}
	public String getCfh() {
		if(cfh==null){
			return "";
		}
		return cfh;
	}
	public void setCfh(String cfh) {
		this.cfh = cfh;
	}
	public String getPlmth() {
		return plmth;
	}
	public void setPlmth(String plmth) {
		this.plmth = plmth;
	}
	public String getPlmtx() {
		return plmtx;
	}
	public void setPlmtx(String plmtx) {
		this.plmtx = plmtx;
	}
	public String getPlmth_cp() {
		return plmth_cp;
	}
	public void setPlmth_cp(String plmth_cp) {
		this.plmth_cp = plmth_cp;
	}
	public String getPlmtx_cp() {
		return plmtx_cp;
	}
	public void setPlmtx_cp(String plmtx_cp) {
		this.plmtx_cp = plmtx_cp;
	}
}
