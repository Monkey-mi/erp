package srm.supplier.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class CustomerInfo extends Model implements Serializable{
	/*功能：客户信息模型
	 *作者：伍恰
	 *时间：2015/01/07
	 *数据库名：khxxb
	 * */
	private static final long serialVersionUID = -5481308364949674321L;
	private String khbh;
	private String khjc;
	private String khmc;
	private String ywmc;
	private String yhbh;
	private String xslb;
	private String ztdw;
	private Date fzrq;
	private int khzt;
	private String khlb;
	private String qyxz;
	private String ywym;
	private String qybh;
	private String wbbh;
	private double zczb;
	private double xyed;
	private double hkzq;
	private double kpqx;
	private String khly;
	private String khdz;
	private String lxrm;
	private String khdh;
	private String khcz;
	private String khsh;
	private String khzh;
	private String khyb;
	private String http;
	private String khyx;
	private String bzsm;
	private int gdbj;
	private String czrm;
	private Date czsj;
	private int spbj;
	private String sprm;
	private Date spsj;
	private String khxh;
	private String lbbh;
	private String hzkh;
	private String dfzh;
	private String zhbh;
	private int scbj;
	private String mfdm;
	private double khqx;
	private String zffs;
	private String glkh;
	private String khdm;
	private double xbxyed;
	private String zydj;
	private String zldj;
	private String xydj;
	private String fktj;
	private String hdxx;
	private String fkbz;
	private int zkmybj;
	private String ckxb;
	private String khztmc;
	private String lbmc;
	private String qymc;
	private String ztmc;
	private String khgslbmc;//客户归属类别名称
	private String zhmc;
	private String xslbmc;//客户销售类别名称
	private String zdkh;//终端客户编号
	
	public String getZdkh() {
		return zdkh;
	}
	public void setZdkh(String zdkh) {
		this.zdkh = zdkh;
	}
	public String getXslbmc() {
		return xslbmc;
	}
	public void setXslbmc(String xslbmc) {
		this.xslbmc = xslbmc;
	}
	public String getZhmc() {
		return zhmc;
	}
	public void setZhmc(String zhmc) {
		this.zhmc = zhmc;
	}
	public String getKhgslbmc() {
		return khgslbmc;
	}
	public void setKhgslbmc(String khgslbmc) {
		this.khgslbmc = khgslbmc;
	}
	public String getZtmc() {
		return ztmc;
	}
	public void setZtmc(String ztmc) {
		this.ztmc = ztmc;
	}
	public CustomerInfo() {
		super();
		this.khbh = "";
		this.khjc = "";
		this.khmc = "";
		this.ywmc = "";
		this.yhbh = "";
		this.xslb = "";
		this.ztdw = "";
		this.khlb = "";
		this.qyxz = "";
		this.ywym = "";
		this.qybh = "";
		this.wbbh = "";
		this.khly = "";
		this.khdz = "";
		this.lxrm = "";
		this.khdh = "";
		this.khcz = "";
		this.khsh = "";
		this.khzh = "";
		this.khyb = "";
		this.http = "";
		this.khyx = "";
		this.bzsm = "";
		this.czrm = "";
		this.sprm = "";
		this.khxh = "";
		this.lbbh = "";
		this.hzkh = "";
		this.dfzh = "";
		this.zhbh = "";
		this.mfdm = "";
		this.zffs = "";
		this.glkh = "";
		this.khdm = "";
		this.zydj = "";
		this.zldj = "";
		this.xydj = "";
		this.fktj = "";
		this.hdxx = "";
		this.fkbz = "";
		this.ckxb = "";
		this.khztmc = "";
		this.lbmc = "";
		this.qymc = "";
		this.ztmc="";
	}
	public String getKhbh() {
		return khbh;
	}
	public void setKhbh(String khbh) {
		this.khbh = khbh;
	}
	public String getKhjc() {
		return khjc;
	}
	public void setKhjc(String khjc) {
		this.khjc = khjc;
	}
	public String getKhmc() {
		return khmc;
	}
	public void setKhmc(String khmc) {
		this.khmc = khmc;
	}
	public String getYwmc() {
		return ywmc;
	}
	public void setYwmc(String ywmc) {
		this.ywmc = ywmc;
	}
	public String getYhbh() {
		return yhbh;
	}
	public void setYhbh(String yhbh) {
		this.yhbh = yhbh;
	}
	public String getXslb() {
		return xslb;
	}
	public void setXslb(String xslb) {
		this.xslb = xslb;
	}
	public String getZtdw() {
		return this.ztdw;
	}
	public void setZtdw(String ztdw) {
		this.ztdw = ztdw;
	}
	public Date getFzrq() {
		return fzrq;
	}
	public void setFzrq(Date fzrq) {
		this.fzrq = fzrq;
	}
	public int getKhzt() {
		return khzt;
	}
	public void setKhzt(int khzt) {
		this.khzt = khzt;
	}
	public String getKhlb() {
		return khlb;
	}
	public void setKhlb(String khlb) {
		this.khlb = khlb;
	}
	public String getQyxz() {
		return qyxz;
	}
	public void setQyxz(String qyxz) {
		this.qyxz = qyxz;
	}
	public String getYwym() {
		return ywym;
	}
	public void setYwym(String ywym) {
		this.ywym = ywym;
	}
	public String getQybh() {
		return qybh;
	}
	public void setQybh(String qybh) {
		this.qybh = qybh;
	}
	public String getWbbh() {
		return wbbh;
	}
	public void setWbbh(String wbbh) {
		this.wbbh = wbbh;
	}
	public double getZczb() {
		return zczb;
	}
	public void setZczb(double zczb) {
		this.zczb = zczb;
	}
	public double getXyed() {
		return xyed;
	}
	public void setXyed(double xyed) {
		this.xyed = xyed;
	}
	public double getHkzq() {
		return hkzq;
	}
	public void setHkzq(double hkzq) {
		this.hkzq = hkzq;
	}
	public double getKpqx() {
		return kpqx;
	}
	public void setKpqx(double kpqx) {
		this.kpqx = kpqx;
	}
	public String getKhly() {
		return khly;
	}
	public void setKhly(String khly) {
		this.khly = khly;
	}
	public String getKhdz() {
		return khdz;
	}
	public void setKhdz(String khdz) {
		this.khdz = khdz;
	}
	public String getLxrm() {
		return lxrm;
	}
	public void setLxrm(String lxrm) {
		this.lxrm = lxrm;
	}
	public String getKhdh() {
		return khdh;
	}
	public void setKhdh(String khdh) {
		this.khdh = khdh;
	}
	public String getKhcz() {
		return khcz;
	}
	public void setKhcz(String khcz) {
		this.khcz = khcz;
	}
	public String getKhsh() {
		return khsh;
	}
	public void setKhsh(String khsh) {
		this.khsh = khsh;
	}
	public String getKhzh() {
		return khzh;
	}
	public void setKhzh(String khzh) {
		this.khzh = khzh;
	}
	public String getKhyb() {
		return khyb;
	}
	public void setKhyb(String khyb) {
		this.khyb = khyb;
	}
	public String getHttp() {
		return http;
	}
	public void setHttp(String http) {
		this.http = http;
	}
	public String getKhyx() {
		return khyx;
	}
	public void setKhyx(String khyx) {
		this.khyx = khyx;
	}
	public String getBzsm() {
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
	public String getKhxh() {
		return khxh;
	}
	public void setKhxh(String khxh) {
		this.khxh = khxh;
	}
	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getHzkh() {
		return hzkh;
	}
	public void setHzkh(String hzkh) {
		this.hzkh = hzkh;
	}
	public String getDfzh() {
		return dfzh;
	}
	public void setDfzh(String dfzh) {
		this.dfzh = dfzh;
	}
	public String getZhbh() {
		return zhbh;
	}
	public void setZhbh(String zhbh) {
		this.zhbh = zhbh;
	}
	public int getScbj() {
		return scbj;
	}
	public void setScbj(int scbj) {
		this.scbj = scbj;
	}
	public String getMfdm() {
		return mfdm;
	}
	public void setMfdm(String mfdm) {
		this.mfdm = mfdm;
	}
	public double getKhqx() {
		return khqx;
	}
	public void setKhqx(double khqx) {
		this.khqx = khqx;
	}
	public String getZffs() {
		return zffs;
	}
	public void setZffs(String zffs) {
		this.zffs = zffs;
	}
	public String getGlkh() {
		return glkh;
	}
	public void setGlkh(String glkh) {
		this.glkh = glkh;
	}
	public String getKhdm() {
		return khdm;
	}
	public void setKhdm(String khdm) {
		this.khdm = khdm;
	}
	public double getXbxyed() {
		return xbxyed;
	}
	public void setXbxyed(double xbxyed) {
		this.xbxyed = xbxyed;
	}
	public String getZydj() {
		return zydj;
	}
	public void setZydj(String zydj) {
		this.zydj = zydj;
	}
	public String getZldj() {
		return zldj;
	}
	public void setZldj(String zldj) {
		this.zldj = zldj;
	}
	public String getXydj() {
		return xydj;
	}
	public void setXydj(String xydj) {
		this.xydj = xydj;
	}
	public String getFktj() {
		return fktj;
	}
	public void setFktj(String fktj) {
		this.fktj = fktj;
	}
	public String getHdxx() {
		return hdxx;
	}
	public void setHdxx(String hdxx) {
		this.hdxx = hdxx;
	}
	public String getFkbz() {
		return fkbz;
	}
	public void setFkbz(String fkbz) {
		this.fkbz = fkbz;
	}
	public int getZkmybj() {
		return zkmybj;
	}
	public void setZkmybj(int zkmybj) {
		this.zkmybj = zkmybj;
	}
	public String getCkxb() {
		return ckxb;
	}
	public void setCkxb(String ckxb) {
		this.ckxb = ckxb;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getLbmc() {
		return lbmc;
	}
	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}
	public String getQymc() {
		return qymc;
	}
	public void setQymc(String qymc) {
		this.qymc = qymc;
	}
	public String getKhztmc() {
		return khztmc;
	}
	public void setKhztmc(String khztmc) {
		this.khztmc = khztmc;
	}
	
	
	
}
