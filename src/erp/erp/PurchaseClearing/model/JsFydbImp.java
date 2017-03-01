package erp.erp.PurchaseClearing.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;
//费用单导入
public class JsFydbImp extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
	private double			fydh;
	private double			fyxh;
	private double			fysl;
	private double			fydj_hx;
	private double			fyje_hx;
	private double			csdj_hx;
	private double			csje_hx;
	private double			zzse_hx;
	private double			wbhl_hx;
	private double			wbdj_hx;
	private double			wbje_hx;
	private double			wxdh;
	private double			fydj;
	private double			fyje;
	private double			csdj;
	private double			csje;
	private double			htbh;
	private double			wbhl;
	private double			wbje;
	private double			wbdj;
	private double			tzdh;
	private double			ftxs;
	private int			jhbh;
	private int			jhxh;
	private int			htxh;
	private int			spbj;
	private int			jzzt;
	private int			xzbj;
	private int			scbj;
	private int			dybj;
	private int			    hxbj;
	private int			sdbj;
	private int			tjbj;
	private int			cfxh;
	private int			wxxh;
	private String			yhbh;
	private String			db_TYPE;
	private String			cglb;
	private String			csbh;
	private String			fyzy;
	private String			zzsl_hx;
	private String			zzsl;
	private String			jhh;
	private String			hth;
	private String			bzsm;
	private String			csmc;
	private String			fplb;
	private String			fphm;
	private String			hsbm;
	private String			sdrm;
	private String			tjrm;
	private String			fzhm;
	private String			czym;
	private String			cybh;
	private String			wbbh;
	private String			wbdh;
	private String			fyxz;
	private String			ftms;
	private String			cslb;
	private String			gxbh;
	private String			fsbm;
	private String			fylx;
	private String			bmmc;
	private Date			sdsj;
	private Date			tjsj;
	private Date			czsj;
	private Date			dysj;
	private Date			hxrq;
	private Date			fyrq;
	
	public String getWbdh() {
		if(wbdh==null){
			return "";
		}
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
	public String getBmmc() {
		return bmmc;
	}
	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
	}
	public String getFylx() {
		return fylx;
	}
	public void setFylx(String fylx) {
		this.fylx = fylx;
	}
	public double getFydh() {
		return fydh;
	}
	public void setFydh(double fydh) {
		this.fydh = fydh;
	}
	public double getFyxh() {
		return fyxh;
	}
	public void setFyxh(double fyxh) {
		this.fyxh = fyxh;
	}
	public Date getFyrq() {
		return fyrq;
	}
	public void setFyrq(Date fyrq) {
		this.fyrq = fyrq;
	}
	public String getYhbh() {
		return yhbh;
	}
	public void setYhbh(String yhbh) {
		this.yhbh = yhbh;
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
	public String getFyzy() {
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
	public double getFydj_hx() {
		return fydj_hx;
	}
	public void setFydj_hx(double fydj_hx) {
		this.fydj_hx = fydj_hx;
	}
	public double getFyje_hx() {
		return fyje_hx;
	}
	public void setFyje_hx(double fyje_hx) {
		this.fyje_hx = fyje_hx;
	}
	public String getZzsl_hx() {
		return zzsl_hx;
	}
	public void setZzsl_hx(String zzsl_hx) {
		this.zzsl_hx = zzsl_hx;
	}
	public double getCsdj_hx() {
		return csdj_hx;
	}
	public void setCsdj_hx(double csdj_hx) {
		this.csdj_hx = csdj_hx;
	}
	public double getCsje_hx() {
		return csje_hx;
	}
	public void setCsje_hx(double csje_hx) {
		this.csje_hx = csje_hx;
	}
	public double getZzse_hx() {
		return zzse_hx;
	}
	public void setZzse_hx(double zzse_hx) {
		this.zzse_hx = zzse_hx;
	}
	public double getWbhl_hx() {
		return wbhl_hx;
	}
	public void setWbhl_hx(double wbhl_hx) {
		this.wbhl_hx = wbhl_hx;
	}
	public double getWbdj_hx() {
		return wbdj_hx;
	}
	public void setWbdj_hx(double wbdj_hx) {
		this.wbdj_hx = wbdj_hx;
	}
	public double getWbje_hx() {
		return wbje_hx;
	}
	public void setWbje_hx(double wbje_hx) {
		this.wbje_hx = wbje_hx;
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
	public double getHtbh() {
		return htbh;
	}
	public void setHtbh(double htbh) {
		this.htbh = htbh;
	}
	public String getZzsl() {
		return zzsl;
	}
	public void setZzsl(String zzsl) {
		this.zzsl = zzsl;
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
	public int getHtxh() {
		return htxh;
	}
	public void setHtxh(int htxh) {
		this.htxh = htxh;
	}
	public int getSpbj() {
		return spbj;
	}
	public void setSpbj(int spbj) {
		this.spbj = spbj;
	}
	public int getJzzt() {
		return jzzt;
	}
	public void setJzzt(int jzzt) {
		this.jzzt = jzzt;
	}
	public int getXzbj() {
		return xzbj;
	}
	public void setXzbj(int xzbj) {
		this.xzbj = xzbj;
	}
	public int getScbj() {
		return scbj;
	}
	public void setScbj(int scbj) {
		this.scbj = scbj;
	}
	public int getDybj() {
		return dybj;
	}
	public void setDybj(int dybj) {
		this.dybj = dybj;
	}
	public String getJhh() {
		return jhh;
	}
	public void setJhh(String jhh) {
		this.jhh = jhh;
	}
	public String getHth() {
		return hth;
	}
	public void setHth(String hth) {
		this.hth = hth;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public int getHxbj() {
		return hxbj;
	}
	public void setHxbj(int hxbj) {
		this.hxbj = hxbj;
	}
	public String getFplb() {
		return fplb;
	}
	public void setFplb(String fplb) {
		this.fplb = fplb;
	}
	public String getFphm() {
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
	public int getTjbj() {
		return tjbj;
	}
	public void setTjbj(int tjbj) {
		this.tjbj = tjbj;
	}
	public int getCfxh() {
		return cfxh;
	}
	public void setCfxh(int cfxh) {
		this.cfxh = cfxh;
	}
	public double getWxdh() {
		return wxdh;
	}
	public void setWxdh(double wxdh) {
		this.wxdh = wxdh;
	}
	public int getWxxh() {
		return wxxh;
	}
	public void setWxxh(int wxxh) {
		this.wxxh = wxxh;
	}
	public String getSdrm() {
		return sdrm;
	}
	public void setSdrm(String sdrm) {
		this.sdrm = sdrm;
	}
	public String getTjrm() {
		return tjrm;
	}
	public void setTjrm(String tjrm) {
		this.tjrm = tjrm;
	}
	public String getFzhm() {
		return fzhm;
	}
	public void setFzhm(String fzhm) {
		this.fzhm = fzhm;
	}
	public Date getSdsj() {
		return sdsj;
	}
	public void setSdsj(Date sdsj) {
		this.sdsj = sdsj;
	}
	public Date getTjsj() {
		return tjsj;
	}
	public void setTjsj(Date tjsj) {
		this.tjsj = tjsj;
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
	public Date getDysj() {
		return dysj;
	}
	public void setDysj(Date dysj) {
		this.dysj = dysj;
	}
	public Date getHxrq() {
		return hxrq;
	}
	public void setHxrq(Date hxrq) {
		this.hxrq = hxrq;
	}
	public double getTzdh() {
		return tzdh;
	}
	public void setTzdh(double tzdh) {
		this.tzdh = tzdh;
	}
	public String getCybh() {
		return cybh;
	}
	public void setCybh(String cybh) {
		this.cybh = cybh;
	}
	public String getWbbh() {
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
	public double getWbdj() {
		return wbdj;
	}
	public void setWbdj(double wbdj) {
		this.wbdj = wbdj;
	}
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public String getFyxz() {
		return fyxz;
	}
	public void setFyxz(String fyxz) {
		this.fyxz = fyxz;
	}
	public String getFtms() {
		return ftms;
	}
	public void setFtms(String ftms) {
		this.ftms = ftms;
	}
	public String getCslb() {
		return cslb;
	}
	public void setCslb(String cslb) {
		this.cslb = cslb;
	}
	public String getGxbh() {
		return gxbh;
	}
	public void setGxbh(String gxbh) {
		this.gxbh = gxbh;
	}
	public String getFsbm() {
		return fsbm;
	}
	public void setFsbm(String fsbm) {
		this.fsbm = fsbm;
	}
	public double getFtxs() {
		return ftxs;
	}
	public void setFtxs(double ftxs) {
		this.ftxs = ftxs;
	}
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}

	
}
