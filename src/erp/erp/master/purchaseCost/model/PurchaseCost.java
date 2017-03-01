package erp.erp.master.purchaseCost.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class PurchaseCost extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
	private static final String Db_TYPE = null;
	private int			fydh;
	private int			fyxh;
	private Date			fyrq;
	private String			yhbh;
	private String			cglb;
	private String			csbh;
	private String			fyzy;
	private String			rkh;
	private String			fhckmc;
	private double			fysl;
	private double			fydj;
	private double			fyje;
	private String			fylb;
	private double			jhbh;
	private double			jhxh;
	private String			bzsm;
	private int			hxbj;
	private Date			hxrq;
	private String			fplb;
	private String			fphm;
	private int			sdbj;
	private String			sdrm;
	private Date			sdsj;
	private String			czym;
	private Date			czsj;
	private double			tzdh;
	private double			cfxh;
	private String			fzhm;
	private double			htbh;
	private double			htxh;
	private String			fybz;
	private double			zzsl;
	private double			csdj;
	private double			csje;
	private double			hsdh;
	private double			hsxh;
	private String			hsbm;
	private int			spbj;
	private int			fffs;
	private String			sprm;
	private String			spyj;
	private Date			spsj;
	private int			tjbj;
	private String			tjrm;
	private Date			tjsj;
	private String			tjdx;
	private String			cybh;
	private String			fylx;
	private String			fpdx;
	private String			fyxz;
	private String			wbbh;
	private double			wbhl;
	private double			wbje;
	private double			wxdh;
	private double			wxxh;
	private double			shdh;
	private double			shxh;
	private int			dybj;
	private int			kjbj;
	private Date			dysj;
	private String			gxbh;
	private double			jlbh;
	private double			ycdh;
	private double			jlxh;
	private String			ckbh;
	private String			dcckmc;
	private double			dbdh;
	private double			dbxh;
	private String			fypc;
	private String			ftms;
	private double			ftxs;
	private String			fsbm;
	private String			xslb;
	private double			fhdh;
	private double			fhxh;
	private String			fhh;
	private String			fhck;
	private String			gzdh;
	private double			gzxh;
	private double			mxzs;
	private double			fyxs;
	private String			zflb;
	private Date			dcrq;
	private double			dbxs;
	private double			ystj;
	private String			zyrm;
	private String			sgtzh;
	private double			zgbh;
	private double			zgxh;
	private double			zgfyxh;
	private String			xkxj;
	private String			cglx;
	private double        zzse;
	private String      sjfylb;
	private String        jhh;
	private String        hth;
	private String        phh;
	private String        hsh;
	private double          wbdj;
	private String         wxh;
	private String        ych;
	private String        dbh;
	private String        khbh;
	private String        khmc;
	private String        clwth;
	private String        cpwth;
	private String        csmc;
	private String        jhbz;
	private int           yfbj;
	private String          jhlb;
	private String        bmmc;
	private String        sybm;
	private String        xslbmc;
	private String        zflbmc;
	private String        jhlbmc;
	private String        sjzflbmc;
	private String         scgxmc;
	private double fyslzh;
    private double fyjezh;
    private double csjezh;
    private double sezh;
    private double clwtdh;
    private double clwtxh;
    private double cpwtdh;
    private double cpwtxh;
    private double ysjldh_wms;
    private double ysjlxh_wms;
    private double zlrkdh;
    private double zlrkxh;
    private double jfzl;
    private String zlckbh;
    private String fkfs;
    private String zrbm;
    private String ztbh;
    private String wbdh;
    
    public String getDcckmc() {
    	if(dcckmc==null){
			return "";
		}
		return dcckmc;
	}
	public void setDcckmc(String dcckmc) {
		this.dcckmc = dcckmc;
	}
	public String getFhckmc() {
		if(fhckmc==null){
			return "";
		}
		return fhckmc;
	}
	public void setFhckmc(String fhckmc) {
		this.fhckmc = fhckmc;
	}
	public double getJfzl() {
		return jfzl;
	}
	public void setJfzl(double jfzl) {
		this.jfzl = jfzl;
	}
	public String getFhh() {
		return fhh;
	}
	public void setFhh(String fhh) {
		this.fhh = fhh;
	}
	public int getFffs() {
		return fffs;
	}
	public void setFffs(int fffs) {
		this.fffs = fffs;
	}
	public String getRkh() {
		return rkh;
	}
	public void setRkh(String rkh) {
		this.rkh = rkh;
	}
	public String getWbdh() {
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
	public int getKjbj() {
		return kjbj;
	}
	public void setKjbj(int kjbj) {
		this.kjbj = kjbj;
	}
	public double getZgfyxh() {
		return zgfyxh;
	}
	public void setZgfyxh(double zgfyxh) {
		this.zgfyxh = zgfyxh;
	}
	public double getClwtdh() {
		return clwtdh;
	}
	public void setClwtdh(double clwtdh) {
		this.clwtdh = clwtdh;
	}
	public double getClwtxh() {
		return clwtxh;
	}
	public void setClwtxh(double clwtxh) {
		this.clwtxh = clwtxh;
	}
	public double getCpwtdh() {
		return cpwtdh;
	}
	public void setCpwtdh(double cpwtdh) {
		this.cpwtdh = cpwtdh;
	}
	public double getCpwtxh() {
		return cpwtxh;
	}
	public void setCpwtxh(double cpwtxh) {
		this.cpwtxh = cpwtxh;
	}
	public double getYsjldh_wms() {
		return ysjldh_wms;
	}
	public void setYsjldh_wms(double ysjldh_wms) {
		this.ysjldh_wms = ysjldh_wms;
	}
	public double getYsjlxh_wms() {
		return ysjlxh_wms;
	}
	public void setYsjlxh_wms(double ysjlxh_wms) {
		this.ysjlxh_wms = ysjlxh_wms;
	}
	public double getZlrkdh() {
		return zlrkdh;
	}
	public void setZlrkdh(double zlrkdh) {
		this.zlrkdh = zlrkdh;
	}
	public double getZlrkxh() {
		return zlrkxh;
	}
	public void setZlrkxh(double zlrkxh) {
		this.zlrkxh = zlrkxh;
	}
	public String getZlckbh() {
		return zlckbh;
	}
	public void setZlckbh(String zlckbh) {
		this.zlckbh = zlckbh;
	}
	public String getZrbm() {
		if(zrbm==null){
			return "";
		}
		return zrbm;
	}
	public void setZrbm(String zrbm) {
		this.zrbm = zrbm;
	}
	public int getFydh() {
		return fydh;
	}
	public void setFydh(int fydh) {
		this.fydh = fydh;
	}
	public int getFyxh() {
		return fyxh;
	}
	public void setFyxh(int fyxh) {
		this.fyxh = fyxh;
	}
	public String getFkfs() {
    	if(fkfs==null){
			return "";
		}
		return fkfs;
	}
	public void setFkfs(String fkfs) {
		this.fkfs = fkfs;
	}
	
	public String getZtbh() {
		return ztbh;
	}
	public void setZtbh(String ztbh) {
		this.ztbh = ztbh;
	}

	private String db_TYPE;
	
	public double getFyslzh() {
		return fyslzh;
	}
	public String getDb_TYPE() {
		if(Db_TYPE==null){
			return "";
		}
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public void setFyslzh(double fyslzh) {
		this.fyslzh = fyslzh;
	}
	public double getFyjezh() {
		return fyjezh;
	}
	public void setFyjezh(double fyjezh) {
		this.fyjezh = fyjezh;
	}
	public double getCsjezh() {
		return csjezh;
	}
	public void setCsjezh(double csjezh) {
		this.csjezh = csjezh;
	}
	public double getSezh() {
		return sezh;
	}
	public void setSezh(double sezh) {
		this.sezh = sezh;
	}
	public String getScgxmc() {
		if(scgxmc==null){
			return "";
		}
		return scgxmc;
	}
	public void setScgxmc(String scgxmc) {
		this.scgxmc = scgxmc;
	}
	public String getSjzflbmc() {
		if(sjzflbmc==null){
			return "";
		}
		return sjzflbmc;
	}
	public void setSjzflbmc(String sjzflbmc) {
		this.sjzflbmc = sjzflbmc;
	}
	public String getJhlbmc() {
		if(jhlbmc==null){
			return "";
		}
		return jhlbmc;
	}
	public void setJhlbmc(String jhlbmc) {
		this.jhlbmc = jhlbmc;
	}
	public String getZflbmc() {
		if(zflbmc==null){
			return "";
		}
		return zflbmc;
	}
	public void setZflbmc(String zflbmc) {
		this.zflbmc = zflbmc;
	}
	public String getXslbmc() {
		if(xslbmc==null){
			return "";
		}
		return xslbmc;
	}
	public void setXslbmc(String xslbmc) {
		this.xslbmc = xslbmc;
	}
	public void setLbmc(String xslbmc) {
		this.xslbmc = xslbmc;
	}
	public String getSybm() {
		if(sybm==null){
			return "";
		}
		return sybm;
	}
	public void setSybm(String sybm) {
		this.sybm = sybm;
	}
	public String getBmmc() {
		if(bmmc==null){
			return "";
		}
		return bmmc;
	}
	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
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
	public String getHth() {
		if(hth==null){
			return "";
		}
		return hth;
	}
	public void setHth(String hth) {
		this.hth = hth;
	}
	public String getPhh() {
		if(phh==null){
			return "";
		}
		return phh;
	}
	public void setPhh(String phh) {
		this.phh = phh;
	}
	public String getHsh() {
		if(hsh==null){
			return "";
		}
		return hsh;
	}
	public void setHsh(String hsh) {
		this.hsh = hsh;
	}
    
	public double getWbdj() {
		return wbdj;
	}
	public void setWbdj(double wbdj) {
		this.wbdj = wbdj;
	}
	public String getWxh() {
		if(wxh==null){
			return "";
		}
		return wxh;
	}
	public void setWxh(String wxh) {
		this.wxh = wxh;
	}
	public String getYch() {
		if(ych==null){
			return "";
		}
		return ych;
	}
	public void setYch(String ych) {
		this.ych = ych;
	}
	public String getDbh() {
		if(dbh==null){
			return "";
		}
		return dbh;
	}
	public void setDbh(String dbh) {
		this.dbh = dbh;
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
	public String getKhmc() {
		if(khmc==null){
			return "";
		}
		return khmc;
	}
	public void setKhmc(String khmc) {
		this.khmc = khmc;
	}
	public String getClwth() {
		if(clwth==null){
			return "";
		}
		return clwth;
	}
	public void setClwth(String clwth) {
		this.clwth = clwth;
	}
	public String getCpwth() {
		if(cpwth==null){
			return "";
		}
		return cpwth;
	}
	public void setCpwth(String cpwth) {
		this.cpwth = cpwth;
	}
	public String getCsmc() {
		if(csmc==null){
			return "";
		}
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getJhbz() {
		if(jhbz==null){
			return "";
		}
		return jhbz;
	}
	public void setJhbz(String jhbz) {
		this.jhbz = jhbz;
	}
	public int getYfbj() {
		return yfbj;
	}
	public void setYfbj(int yfbj) {
		this.yfbj = yfbj;
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
	

    
	public String getSjfylb() {
		if(sjfylb==null){
			return "";
		}
		return sjfylb;
	}
	public void setSjfylb(String sjfylb) {
		this.sjfylb = sjfylb;
	}
    
    
	public double getZzse() {
		return zzse;
	}
	public void setZzse(double zzse) {
		this.zzse = zzse;
	}
	public Date getFyrq() {
		return fyrq;
	}
	public void setFyrq(Date fyrq) {
		this.fyrq = fyrq;
	}
	public String getYhbh() {
		if(yhbh==null){
			return "";
		}
		return yhbh;
	}
	public void setYhbh(String yhbh) {
		this.yhbh = yhbh;
	}
	public String getCglb() {
		if(cglb==null){
			return "";
		}
		return cglb;
	}
	public void setCglb(String cglb) {
		this.cglb = cglb;
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
	public String getFyzy() {
		if(fyzy==null){
			return "";
		}
		return fyzy;
	}
	public void setFyzy(String fyzy) {
		this.fyzy = fyzy;
	}
	public double getFysl() {
		return fysl;
	}
	public void setFysl(double fysl) {
		this.fysl = fysl;
	}
	public double getFydj() {
		return fydj;
	}
	public void setFydj(double fydj) {
		this.fydj = fydj;
	}
	public double getFyje() {
		return fyje;
	}
	public void setFyje(double fyje) {
		this.fyje = fyje;
	}
	public String getFylb() {
		if(fylb==null){
			return "";
		}
		return fylb;
	}
	public void setFylb(String fylb) {
		this.fylb = fylb;
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
	public String getBzsm() {
		if(bzsm==null){
			return "";
		}
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public int getHxbj() {
		return hxbj;
	}
	public void setHxbj(int hxbj) {
		this.hxbj = hxbj;
	}
	public Date getHxrq() {
		return hxrq;
	}
	public void setHxrq(Date hxrq) {
		this.hxrq = hxrq;
	}
	public String getFplb() {
		if(fplb==null){
			return "";
		}
		return fplb;
	}
	public void setFplb(String fplb) {
		this.fplb = fplb;
	}
	public String getFphm() {
		if(fphm==null){
			return "";
		}
		return fphm;
	}
	public void setFphm(String fphm) {
		this.fphm = fphm;
	}
	public int getSdbj() {
		return sdbj;
	}
	public void setSdbj(int sdbj) {
		this.sdbj = sdbj;
	}
	public String getSdrm() {
		if(sdrm==null){
			return "";
		}
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
	public double getTzdh() {
		return tzdh;
	}
	public void setTzdh(double tzdh) {
		this.tzdh = tzdh;
	}
	public double getCfxh() {
		return cfxh;
	}
	public void setCfxh(double cfxh) {
		this.cfxh = cfxh;
	}
	public String getFzhm() {
		if(fzhm==null){
			return "";
		}
		return fzhm;
	}
	public void setFzhm(String fzhm) {
		this.fzhm = fzhm;
	}
	public double getHtbh() {
		return htbh;
	}
	public void setHtbh(double htbh) {
		this.htbh = htbh;
	}
	public double getHtxh() {
		return htxh;
	}
	public void setHtxh(double htxh) {
		this.htxh = htxh;
	}
	public String getFybz() {
		if(fybz==null){
			return "";
		}
		return fybz;
	}
	public void setFybz(String fybz) {
		this.fybz = fybz;
	}
	public double getZzsl() {
		return zzsl;
	}
	public void setZzsl(double zzsl) {
		this.zzsl = zzsl;
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
	public double getHsdh() {
		return hsdh;
	}
	public void setHsdh(double hsdh) {
		this.hsdh = hsdh;
	}
	public double getHsxh() {
		return hsxh;
	}
	public void setHsxh(double hsxh) {
		this.hsxh = hsxh;
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
	public int getSpbj() {
		return spbj;
	}
	public void setSpbj(int spbj) {
		this.spbj = spbj;
	}
	public String getSprm() {
		if(sprm==null){
			return "";
		}
		return sprm;
	}
	public void setSprm(String sprm) {
		this.sprm = sprm;
	}
	public String getSpyj() {
		if(spyj==null){
			return "";
		}
		return spyj;
	}
	public void setSpyj(String spyj) {
		this.spyj = spyj;
	}
	public Date getSpsj() {
		return spsj;
	}
	public void setSpsj(Date spsj) {
		this.spsj = spsj;
	}
	public int getTjbj() {
		return tjbj;
	}
	public void setTjbj(int tjbj) {
		this.tjbj = tjbj;
	}
	public String getTjrm() {
		if(tjrm==null){
			return "";
		}
		return tjrm;
	}
	public void setTjrm(String tjrm) {
		this.tjrm = tjrm;
	}
	public Date getTjsj() {
		return tjsj;
	}
	public void setTjsj(Date tjsj) {
		this.tjsj = tjsj;
	}
	public String getTjdx() {
		if(tjdx==null){
			return "";
		}
		return tjdx;
	}
	public void setTjdx(String tjdx) {
		this.tjdx = tjdx;
	}
	public String getCybh() {
		if(cybh==null){
			return "";
		}
		return cybh;
	}
	public void setCybh(String cybh) {
		this.cybh = cybh;
	}
	public String getFylx() {
		if(fylx==null){
			return "";
		}
		return fylx;
	}
	public void setFylx(String fylx) {
		this.fylx = fylx;
	}
	public String getFpdx() {
		if(fpdx==null){
			return "";
		}
		return fpdx;
	}
	public void setFpdx(String fpdx) {
		this.fpdx = fpdx;
	}
	public String getFyxz() {
		if(fyxz==null){
			return "";
		}
		return fyxz;
	}
	public void setFyxz(String fyxz) {
		this.fyxz = fyxz;
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
	public double getWbhl() {
		return wbhl;
	}
	public void setWbhl(double wbhl) {
		this.wbhl = wbhl;
	}
	public double getWbje() {
		return wbje;
	}
	public void setWbje(double wbje) {
		this.wbje = wbje;
	}
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
	public double getShdh() {
		return shdh;
	}
	public void setShdh(double shdh) {
		this.shdh = shdh;
	}
	public double getShxh() {
		return shxh;
	}
	public void setShxh(double shxh) {
		this.shxh = shxh;
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
	public String getGxbh() {
		if(gxbh==null){
			return "";
		}
		return gxbh;
	}
	public void setGxbh(String gxbh) {
		this.gxbh = gxbh;
	}
	public double getJlbh() {
		return jlbh;
	}
	public void setJlbh(double jlbh) {
		this.jlbh = jlbh;
	}
	public double getYcdh() {
		return ycdh;
	}
	public void setYcdh(double ycdh) {
		this.ycdh = ycdh;
	}
	public double getJlxh() {
		return jlxh;
	}
	public void setJlxh(double jlxh) {
		this.jlxh = jlxh;
	}
	public String getCkbh() {
		if(ckbh==null){
			return "";
		}
		return ckbh;
	}
	public void setCkbh(String ckbh) {
		this.ckbh = ckbh;
	}
	public double getDbdh() {
		return dbdh;
	}
	public void setDbdh(double dbdh) {
		this.dbdh = dbdh;
	}
	public double getDbxh() {
		return dbxh;
	}
	public void setDbxh(double dbxh) {
		this.dbxh = dbxh;
	}
	public String getFypc() {
		if(fypc==null){
			return "";
		}
		return fypc;
	}
	public void setFypc(String fypc) {
		this.fypc = fypc;
	}
	public String getFtms() {
		if(ftms==null){
			return "";
		}
		return ftms;
	}
	public void setFtms(String ftms) {
		this.ftms = ftms;
	}
	public double getFtxs() {
		return ftxs;
	}
	public void setFtxs(double ftxs) {
		this.ftxs = ftxs;
	}
	public String getFsbm() {
		if(fsbm==null){
			return "";
		}
		return fsbm;
	}
	public void setFsbm(String fsbm) {
		this.fsbm = fsbm;
	}
	public String getXslb() {
		if(xslb==null){
			return "";
		}
		return xslb;
	}
	public void setXslb(String xslb) {
		this.xslb = xslb;
	}
	public double getFhdh() {
		return fhdh;
	}
	public void setFhdh(double fhdh) {
		this.fhdh = fhdh;
	}
	public double getFhxh() {
		return fhxh;
	}
	public void setFhxh(double fhxh) {
		this.fhxh = fhxh;
	}
	public String getFhck() {
		if(fhck==null){
			return "";
		}
		return fhck;
	}
	public void setFhck(String fhck) {
		this.fhck = fhck;
	}
	public String getGzdh() {
		if(gzdh==null){
			return "";
		}
		return gzdh;
	}
	public void setGzdh(String gzdh) {
		this.gzdh = gzdh;
	}
	public double getGzxh() {
		return gzxh;
	}
	public void setGzxh(double gzxh) {
		this.gzxh = gzxh;
	}
	public double getMxzs() {
		return mxzs;
	}
	public void setMxzs(double mxzs) {
		this.mxzs = mxzs;
	}
	public double getFyxs() {
		return fyxs;
	}
	public void setFyxs(double fyxs) {
		this.fyxs = fyxs;
	}
	public String getZflb() {
		if(zflb==null){
			return "";
		}
		return zflb;
	}
	public void setZflb(String zflb) {
		this.zflb = zflb;
	}
	public Date getDcrq() {
		return dcrq;
	}
	public void setDcrq(Date dcrq) {
		this.dcrq = dcrq;
	}
	public double getDbxs() {
		return dbxs;
	}
	public void setDbxs(double dbxs) {
		this.dbxs = dbxs;
	}
	public double getYstj() {
		return ystj;
	}
	public void setYstj(double ystj) {
		this.ystj = ystj;
	}
	public String getZyrm() {
		if(zyrm==null){
			return "";
		}
		return zyrm;
	}
	public void setZyrm(String zyrm) {
		this.zyrm = zyrm;
	}
	public String getSgtzh() {
		if(sgtzh==null){
			return "";
		}
		return sgtzh;
	}
	public void setSgtzh(String sgtzh) {
		this.sgtzh = sgtzh;
	}
	public double getZgbh() {
		return zgbh;
	}
	public void setZgbh(double zgbh) {
		this.zgbh = zgbh;
	}
	public double getZgxh() {
		return zgxh;
	}
	public void setZgxh(double zgxh) {
		this.zgxh = zgxh;
	}
	public String getXkxj() {
		if(xkxj==null){
			return "";
		}
		return xkxj;
	}
	public void setXkxj(String xkxj) {
		this.xkxj = xkxj;
	}
	public String getCglx() {
		if(cglx==null){
			return "";
		}
		return cglx;
	}
	public void setCglx(String cglx) {
		this.cglx = cglx;
	}
}
