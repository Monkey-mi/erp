package srm.supplier.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class FactoryInfo extends Model implements Serializable{
	/*功能：厂商信息
	 *作者：伍恰
	 *时间：2015/03/18
	 *数据库名：csxxb
	 * */
	private static final long serialVersionUID = 1L;
	private String			csbh;
	private String			csjc;
	private String			csmc;
	private String			yhbh;
	private String			cglb;
	private String			hzcs;
	private int			psbj;
	private Date			fzrq;
	private int			fkts;
	private String			khbh;
	private String			cslb;
	private String			wbbh;
	private double			xyed;
	private String			csdh;
	private String			cscz;
	private String			lxrm;
	private String			csdz;
	private String			csyb;
	private String			cssh;
	private String			cszh;
	private String			bzsm;
	private int			gdbj;
	private String			czrm;
	private Date			czsj;
	private int			spbj;
	private String			sprm;
	private Date			spsj;
	private String			cslx;
	private String			ywmc;
	private String			zgrd;
	private String			tdrd;
	private String			hdxz;
	private String			fktj;
	private int			scbj;
	private int			kpbj;
	private String			kpdj;
	private String			khyh;
	private double			xdbl;
	private int			jybj;
	private String			hddw;
	private String wbdh;
	private String ztdw;
	private String			hddw2;
	
	public String getHddw2() {
		if(hddw2==null){
			return "";
		}
		return hddw2;
	}
	public void setHddw2(String hddw2) {
		this.hddw2 = hddw2;
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
	public String getWbdh() {
		if(wbdh==null){
			return "";
		}
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
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
	public String getCsjc() {
		if(csjc==null){
			return "";
		}
		return csjc;
	}
	public void setCsjc(String csjc) {
		this.csjc = csjc;
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
	public String getHzcs() {
		if(hzcs==null){
			return "";
		}
		return hzcs;
	}
	public void setHzcs(String hzcs) {
		this.hzcs = hzcs;
	}
	public int getPsbj() {
		return psbj;
	}
	public void setPsbj(int psbj) {
		this.psbj = psbj;
	}
	public Date getFzrq() {
		return fzrq;
	}
	public void setFzrq(Date fzrq) {
		this.fzrq = fzrq;
	}
	public int getFkts() {
		return fkts;
	}
	public void setFkts(int fkts) {
		this.fkts = fkts;
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
	public String getCslb() {
		if(cslb==null){
			return "";
		}
		return cslb;
	}
	public void setCslb(String cslb) {
		this.cslb = cslb;
	}
	public String getWbbh() {
		if(wbbh==null){
			wbbh="";
		}
		return wbbh;
	}
	public void setWbbh(String wbbh) {
		if(wbbh==null){
			wbbh="";
		}
		this.wbbh = wbbh;
	}
	public double getXyed() {
		return xyed;
	}
	public void setXyed(double xyed) {
		this.xyed = xyed;
	}
	public String getCsdh() {
		if(csdh==null){
			return "";
		}
		return csdh;
	}
	public void setCsdh(String csdh) {
		this.csdh = csdh;
	}
	public String getCscz() {
		if(cscz==null){
			return "";
		}
		return cscz;
	}
	public void setCscz(String cscz) {
		this.cscz = cscz;
	}
	public String getLxrm() {
		if(lxrm==null){
			return "";
		}
		return lxrm;
	}
	public void setLxrm(String lxrm) {
		this.lxrm = lxrm;
	}
	public String getCsdz() {
		if(csdz==null){
			return "";
		}
		return csdz;
	}
	public void setCsdz(String csdz) {
		this.csdz = csdz;
	}
	public String getCsyb() {
		if(csyb==null){
			return "";
		}
		return csyb;
	}
	public void setCsyb(String csyb) {
		this.csyb = csyb;
	}
	public String getCssh() {
		if(cssh==null){
			return "";
		}
		return cssh;
	}
	public void setCssh(String cssh) {
		this.cssh = cssh;
	}
	public String getCszh() {
		if(cszh==null){
			return "";
		}
		return cszh;
	}
	public void setCszh(String cszh) {
		this.cszh = cszh;
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
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
	public String getCzrm() {
		if(czrm==null){
			return "";
		}
		return czrm;
	}
	public void setCzrm(String czrm) {
		this.czrm = czrm;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
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
	public Date getSpsj() {
		return spsj;
	}
	public void setSpsj(Date spsj) {
		this.spsj = spsj;
	}
	public String getCslx() {
		if(cslx==null){
			return "";
		}
		return cslx;
	}
	public void setCslx(String cslx) {
		this.cslx = cslx;
	}
	public String getYwmc() {
		if(ywmc==null){
			return "";
		}
		return ywmc;
	}
	public void setYwmc(String ywmc) {
		this.ywmc = ywmc;
	}
	public String getZgrd() {
		if(zgrd==null){
			return "";
		}
		return zgrd;
	}
	public void setZgrd(String zgrd) {
		this.zgrd = zgrd;
	}
	public String getTdrd() {
		if(tdrd==null){
			return "";
		}
		return tdrd;
	}
	public void setTdrd(String tdrd) {
		this.tdrd = tdrd;
	}
	public String getHdxz() {
		if(hdxz==null){
			return "";
		}
		return hdxz;
	}
	public void setHdxz(String hdxz) {
		this.hdxz = hdxz;
	}
	public String getFktj() {
		if(fktj==null){
			return "";
		}
		return fktj;
	}
	public void setFktj(String fktj) {
		this.fktj = fktj;
	}
	public int getScbj() {
		return scbj;
	}
	public void setScbj(int scbj) {
		this.scbj = scbj;
	}
	public int getKpbj() {
		return kpbj;
	}
	public void setKpbj(int kpbj) {
		this.kpbj = kpbj;
	}
	public String getKpdj() {
		if(kpdj==null){
			return "";
		}
		return kpdj;
	}
	public void setKpdj(String kpdj) {
		this.kpdj = kpdj;
	}
	public String getKhyh() {
		if(khyh==null){
			return "";
		}
		return khyh;
	}
	public void setKhyh(String khyh) {
		this.khyh = khyh;
	}
	public double getXdbl() {
		return xdbl;
	}
	public void setXdbl(double xdbl) {
		this.xdbl = xdbl;
	}
	public int getJybj() {
		return jybj;
	}
	public void setJybj(int jybj) {
		this.jybj = jybj;
	}
	public String getHddw() {
		if(hddw==null){
			return "";
		}
		return hddw;
	}
	public void setHddw(String hddw) {
		this.hddw = hddw;
	}
}
