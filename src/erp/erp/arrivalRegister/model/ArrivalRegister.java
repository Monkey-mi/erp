package erp.erp.arrivalRegister.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class ArrivalRegister extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
	private String			ckbh;
	private double			dhdh;
	private double			dhxh;
	private Date			dhrq;
	private String			csbh;
	private String			clhh;
	private String			cltx1;
	private String			cltx2;
	private String			cltx3;
	private String			pcbh;
	private String			ghpc;
	private String			hth;
	private String			wxh;
	private String			jhh;
	private String			zzjl;
	private String			jlmc;
	private String			cpbh;
	private String			jhbz;
	private String			khbh;
	private String			khmc;
	private String			zcpbh;
	private String			zcpmc;
	private String			cpmc;
	private double			dhsl;
	private double			yrsl;
	private String			jldw;
	private double			htbh;
	private double			htxh;
	private double			jhbh;
	private double			jhxh;
	private String			wtdh;
	private Date			zzrq;
	private Date			jhrq;
	private Date			wkjq;
	private Date			sxrq;
	private String			jkrm;
	private String			bzsm;
	private String			czym;
	private String			clth;
	private String			clmc;
	private String			csmc;
	private String			plmth;
	private String			plmth_cp;
	private String			plmtx_cp;
	private String			plmtx;
	private Date			czsj;
	private Date			pjrq;
	private int			zjbj;
	private int			fzzbj;
	private int			jjbj;
	private int			ztbj;
	private int			jyjg;
	private int			gltk;
	private int			xzbj;
	private String			zjdh;
	private String			ddh;
	private Date			zjrq;
	private String			zjbz;
	private String			dpyy;
	private int			dybj;
	private String			zjrm;
	private Date			zjsj;
	private double			thdh;
	private Date			thrq;
	private int			thbj;
	private int			wxbj;
	private double			wxdh;
	private double			wxxh;
	private String			shdh;
	private double			fzsl;
	private String			fzdw;
	private String			hwbh;
	private String			shrm;
	private Date			shsj;
	private Date			wxrq;
	private Date			wcrq;
	private String			shjg;
	private String			shsm;
	private int			zzbj;
	private String			zzrm;
	private Date			zzsj;
	private int			shbj;
	private String db_TYPE;
    
	public String getDdh() {
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public Date getWcrq() {
		return wcrq;
	}
	public void setWcrq(Date wcrq) {
		this.wcrq = wcrq;
	}
	public Date getWxrq() {
		return wxrq;
	}
	public void setWxrq(Date wxrq) {
		this.wxrq = wxrq;
	}
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public Date getPjrq() {
		return pjrq;
	}
	public void setPjrq(Date pjrq) {
		this.pjrq = pjrq;
	}
	public String getCpmc() {
		return cpmc;
	}
	public void setCpmc(String cpmc) {
		this.cpmc = cpmc;
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
	public String getZcpmc() {
		if(zcpmc==null){
			return "";
		}
		return zcpmc;
	}
	public void setZcpmc(String zcpmc) {
		this.zcpmc = zcpmc;
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
	public String getHth() {
		if(hth==null){
			return "";
		}
		return hth;
	}
	public void setHth(String hth) {
		this.hth = hth;
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
	public String getJhh() {
		if(jhh==null){
			return "";
		}
		return jhh;
	}
	public void setJhh(String jhh) {
		this.jhh = jhh;
	}
	public String getZzjl() {
		if(zzjl==null){
			return "";
		}
		return zzjl;
	}
	public void setZzjl(String zzjl) {
		this.zzjl = zzjl;
	}
	public String getJlmc() {
		if(jlmc==null){
			return "";
		}
		return jlmc;
	}
	public void setJlmc(String jlmc) {
		this.jlmc = jlmc;
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
	public String getJhbz() {
		if(jhbz==null){
			return "";
		}
		return jhbz;
	}
	public void setJhbz(String jhbz) {
		this.jhbz = jhbz;
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
	public String getZcpbh() {
		if(zcpbh==null){
			return "";
		}
		return zcpbh;
	}
	public void setZcpbh(String zcpbh) {
		this.zcpbh = zcpbh;
	}
	public String getWtdh() {
		if(wtdh==null){
			return "";
		}
		return wtdh;
	}
	public void setWtdh(String wtdh) {
		this.wtdh = wtdh;
	}
	public Date getJhrq() {
		return jhrq;
	}
	public void setJhrq(Date jhrq) {
		this.jhrq = jhrq;
	}
	public Date getWkjq() {
		return wkjq;
	}
	public void setWkjq(Date wkjq) {
		this.wkjq = wkjq;
	}
	public Date getSxrq() {
		return sxrq;
	}
	public void setSxrq(Date sxrq) {
		this.sxrq = sxrq;
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
	public String getClmc() {
		if(clmc==null){
			return "";
		}
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
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
	public int getFzzbj() {
		return fzzbj;
	}
	public void setFzzbj(int fzzbj) {
		this.fzzbj = fzzbj;
	}
	public int getGltk() {
		return gltk;
	}
	public void setGltk(int gltk) {
		this.gltk = gltk;
	}
	public int getXzbj() {
		return xzbj;
	}
	public void setXzbj(int xzbj) {
		this.xzbj = xzbj;
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
	public double getDhdh() {
		return dhdh;
	}
	public void setDhdh(double dhdh) {
		this.dhdh = dhdh;
	}
	public double getDhxh() {
		return dhxh;
	}
	public void setDhxh(double dhxh) {
		this.dhxh = dhxh;
	}
	public Date getDhrq() {
		return dhrq;
	}
	public void setDhrq(Date dhrq) {
		this.dhrq = dhrq;
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
	public String getPcbh() {
		if(pcbh==null){
			return "";
		}
		return pcbh;
	}
	public void setPcbh(String pcbh) {
		this.pcbh = pcbh;
	}
	public String getGhpc() {
		if(ghpc==null){
			return "";
		}
		return ghpc;
	}
	public void setGhpc(String ghpc) {
		this.ghpc = ghpc;
	}
	public double getDhsl() {
		return dhsl;
	}
	public void setDhsl(double dhsl) {
		this.dhsl = dhsl;
	}
	public double getYrsl() {
		return yrsl;
	}
	public void setYrsl(double yrsl) {
		this.yrsl = yrsl;
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
	public Date getZzrq() {
		return zzrq;
	}
	public void setZzrq(Date zzrq) {
		this.zzrq = zzrq;
	}
	public String getJkrm() {
		if(jkrm==null){
			return "";
		}
		return jkrm;
	}
	public void setJkrm(String jkrm) {
		this.jkrm = jkrm;
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
	public int getZjbj() {
		return zjbj;
	}
	public void setZjbj(int zjbj) {
		this.zjbj = zjbj;
	}
	public int getJjbj() {
		return jjbj;
	}
	public void setJjbj(int jjbj) {
		this.jjbj = jjbj;
	}
	public int getZtbj() {
		return ztbj;
	}
	public void setZtbj(int ztbj) {
		this.ztbj = ztbj;
	}
	public int getJyjg() {
		return jyjg;
	}
	public void setJyjg(int jyjg) {
		this.jyjg = jyjg;
	}
	public String getZjdh() {
		if(zjdh==null){
			return "";
		}
		return zjdh;
	}
	public void setZjdh(String zjdh) {
		this.zjdh = zjdh;
	}
	public Date getZjrq() {
		return zjrq;
	}
	public void setZjrq(Date zjrq) {
		this.zjrq = zjrq;
	}
	public String getZjbz() {
		if(zjbz==null){
			return "";
		}
		return zjbz;
	}
	public void setZjbz(String zjbz) {
		this.zjbz = zjbz;
	}
	public String getDpyy() {
		if(dpyy==null){
			return "";
		}
		return dpyy;
	}
	public void setDpyy(String dpyy) {
		this.dpyy = dpyy;
	}
	public int getDybj() {
		return dybj;
	}
	public void setDybj(int dybj) {
		this.dybj = dybj;
	}
	public String getZjrm() {
		if(zjrm==null){
			return "";
		}
		return zjrm;
	}
	public void setZjrm(String zjrm) {
		this.zjrm = zjrm;
	}
	public Date getZjsj() {
		return zjsj;
	}
	public void setZjsj(Date zjsj) {
		this.zjsj = zjsj;
	}
	public double getThdh() {
		return thdh;
	}
	public void setThdh(double thdh) {
		this.thdh = thdh;
	}
	public Date getThrq() {
		return thrq;
	}
	public void setThrq(Date thrq) {
		this.thrq = thrq;
	}
	public int getThbj() {
		return thbj;
	}
	public void setThbj(int thbj) {
		this.thbj = thbj;
	}
	public int getWxbj() {
		return wxbj;
	}
	public void setWxbj(int wxbj) {
		this.wxbj = wxbj;
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
	public String getShdh() {
		if(shdh==null){
			return "";
		}
		return shdh;
	}
	public void setShdh(String shdh) {
		this.shdh = shdh;
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
	public String getHwbh() {
		if(hwbh==null){
			return "";
		}
		return hwbh;
	}
	public void setHwbh(String hwbh) {
		this.hwbh = hwbh;
	}
	public String getShrm() {
		if(shrm==null){
			return "";
		}
		return shrm;
	}
	public void setShrm(String shrm) {
		this.shrm = shrm;
	}
	public Date getShsj() {
		return shsj;
	}
	public void setShsj(Date shsj) {
		this.shsj = shsj;
	}
	public String getShjg() {
		if(shjg==null){
			return "";
		}
		return shjg;
	}
	public void setShjg(String shjg) {
		this.shjg = shjg;
	}
	public String getShsm() {
		if(shsm==null){
			return "";
		}
		return shsm;
	}
	public void setShsm(String shsm) {
		this.shsm = shsm;
	}
	public int getZzbj() {
		return zzbj;
	}
	public void setZzbj(int zzbj) {
		this.zzbj = zzbj;
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
	public int getShbj() {
		return shbj;
	}
	public void setShbj(int shbj) {
		this.shbj = shbj;
	}
}
