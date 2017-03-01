package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class MaterialDetail extends Model implements Serializable{
	/*功能：材料编码表
	 *作者：伍恰
	 *时间：2016/01/22
	 *数据库名：clbmb
	 * */
	private static final long serialVersionUID = 1L;
	private String			clhh;
	private String			lbbh;
	private String			clmc;
	private String			jldw;
	private double			zhxs;
	private double			zzhxs;
	private double			bzxssx;
	private double			bzxsxx;
	private String			fzdw;
	private String			yshh;
	private String			ysmc;
	private double			cbdj;
	private double			jhdj;
	private double			kzdj;
	private double			fzkj;
	private double			zdcgl;
	private double			zxbzl;
	private double			cgbl;
	private double			ylbl;
	private double			shbl;
	private int			yxqx;
	private int			ghzq;
	private int			cgtqq;
	private int			zjbj;
	private int			cgbj;
	private int			aqlbj;
	private double			yhyl;
	private String			clth;
	private String			cgym;
	private String			bzsm;
	private int			bcpbj;
	private String			bcpbh;
	private String			bcplb;
	private String			cltp;
	private int			gdbj;
	private String			sqrm;
	private String			czym;
	private Date			czsj;
	private int			lkcbj;
	private String			bmgz;
	private int			fzzbj;
	private int			zhbj;
	private double			zhgs;
	private String			txgz;
	private int			gsbh;
	private int			spbj;
	private String			sprm;
	private Date			spsj;
	private int			yzws;
	private int			djyz;
	private String			cgzh;
	private int			free;
	private int			yxbj;
	private String			gdrm;
	private Date			gdsj;
	private String			jjczym;
	private Date			jjczsj;
	private Date			qssxsj;
	private Date			jzsxsj;
	private String			gxbh;
	private int			hbdj;
	private double			scys;
	private double			clzc;
	private int			spbj_kj;
	private String			sprm_kj;
	private Date			spsj_kj;
	private double			gjfdxs;
	private double           rkdj;
	private double 			htdj;
	private Integer	 pjbj;
	private double djyl;
	private double fzyl;
	private String wzdh;
    private String lbmc;
    private String db_TYPE;
    private double jgyl;
    private double jsbl;
    private double tzll;
    
    
	public double getJgyl() {
		return jgyl;
	}
	public void setJgyl(double jgyl) {
		this.jgyl = jgyl;
	}
	public double getJsbl() {
		return jsbl;
	}
	public void setJsbl(double jsbl) {
		this.jsbl = jsbl;
	}
	public double getTzll() {
		return tzll;
	}
	public void setTzll(double tzll) {
		this.tzll = tzll;
	}
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public String getLbmc() {
		return lbmc;
	}
	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}
	public String getWzdh() {
		return wzdh;
	}
	public void setWzdh(String wzdh) {
		this.wzdh = wzdh;
	}
	public double getDjyl() {
		return djyl;
	}
	public void setDjyl(double djyl) {
		this.djyl = djyl;
	}
	public double getFzyl() {
		return fzyl;
	}
	public void setFzyl(double fzyl) {
		this.fzyl = fzyl;
	}
	public Integer getPjbj() {
		return pjbj;
	}
	public void setPjbj(Integer pjbj) {
		this.pjbj = pjbj;
	}
	public double getRkdj() {
		return rkdj;
	}
	public void setRkdj(double rkdj) {
		this.rkdj = rkdj;
	}
	public double getHtdj() {
		return htdj;
	}
	public void setHtdj(double htdj) {
		this.htdj = htdj;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public double getZhxs() {
		return zhxs;
	}
	public void setZhxs(double zhxs) {
		this.zhxs = zhxs;
	}
	public double getZzhxs() {
		return zzhxs;
	}
	public void setZzhxs(double zzhxs) {
		this.zzhxs = zzhxs;
	}
	public double getBzxssx() {
		return bzxssx;
	}
	public void setBzxssx(double bzxssx) {
		this.bzxssx = bzxssx;
	}
	public double getBzxsxx() {
		return bzxsxx;
	}
	public void setBzxsxx(double bzxsxx) {
		this.bzxsxx = bzxsxx;
	}
	public String getFzdw() {
		return fzdw;
	}
	public void setFzdw(String fzdw) {
		this.fzdw = fzdw;
	}
	public String getYshh() {
		return yshh;
	}
	public void setYshh(String yshh) {
		this.yshh = yshh;
	}
	public String getYsmc() {
		return ysmc;
	}
	public void setYsmc(String ysmc) {
		this.ysmc = ysmc;
	}
	public double getCbdj() {
		return cbdj;
	}
	public void setCbdj(double cbdj) {
		this.cbdj = cbdj;
	}
	public double getJhdj() {
		return jhdj;
	}
	public void setJhdj(double jhdj) {
		this.jhdj = jhdj;
	}
	public double getKzdj() {
		return kzdj;
	}
	public void setKzdj(double kzdj) {
		this.kzdj = kzdj;
	}
	public double getFzkj() {
		return fzkj;
	}
	public void setFzkj(double fzkj) {
		this.fzkj = fzkj;
	}
	public double getZdcgl() {
		return zdcgl;
	}
	public void setZdcgl(double zdcgl) {
		this.zdcgl = zdcgl;
	}
	public double getZxbzl() {
		return zxbzl;
	}
	public void setZxbzl(double zxbzl) {
		this.zxbzl = zxbzl;
	}
	public double getCgbl() {
		return cgbl;
	}
	public void setCgbl(double cgbl) {
		this.cgbl = cgbl;
	}
	public double getYlbl() {
		return ylbl;
	}
	public void setYlbl(double ylbl) {
		this.ylbl = ylbl;
	}
	public double getShbl() {
		return shbl;
	}
	public void setShbl(double shbl) {
		this.shbl = shbl;
	}
	public int getYxqx() {
		return yxqx;
	}
	public void setYxqx(int yxqx) {
		this.yxqx = yxqx;
	}
	public int getGhzq() {
		return ghzq;
	}
	public void setGhzq(int ghzq) {
		this.ghzq = ghzq;
	}
	public int getCgtqq() {
		return cgtqq;
	}
	public void setCgtqq(int cgtqq) {
		this.cgtqq = cgtqq;
	}
	public int getZjbj() {
		return zjbj;
	}
	public void setZjbj(int zjbj) {
		this.zjbj = zjbj;
	}
	public int getCgbj() {
		return cgbj;
	}
	public void setCgbj(int cgbj) {
		this.cgbj = cgbj;
	}
	public int getAqlbj() {
		return aqlbj;
	}
	public void setAqlbj(int aqlbj) {
		this.aqlbj = aqlbj;
	}
	public double getYhyl() {
		return yhyl;
	}
	public void setYhyl(double yhyl) {
		this.yhyl = yhyl;
	}
	public String getClth() {
		return clth;
	}
	public void setClth(String clth) {
		this.clth = clth;
	}
	public String getCgym() {
		return cgym;
	}
	public void setCgym(String cgym) {
		this.cgym = cgym;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public int getBcpbj() {
		return bcpbj;
	}
	public void setBcpbj(int bcpbj) {
		this.bcpbj = bcpbj;
	}
	public String getBcpbh() {
		return bcpbh;
	}
	public void setBcpbh(String bcpbh) {
		this.bcpbh = bcpbh;
	}
	public String getBcplb() {
		return bcplb;
	}
	public void setBcplb(String bcplb) {
		this.bcplb = bcplb;
	}
	public String getCltp() {
		return cltp;
	}
	public void setCltp(String cltp) {
		this.cltp = cltp;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
	public String getSqrm() {
		return sqrm;
	}
	public void setSqrm(String sqrm) {
		this.sqrm = sqrm;
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
	public int getLkcbj() {
		return lkcbj;
	}
	public void setLkcbj(int lkcbj) {
		this.lkcbj = lkcbj;
	}
	public String getBmgz() {
		return bmgz;
	}
	public void setBmgz(String bmgz) {
		this.bmgz = bmgz;
	}
	public int getFzzbj() {
		return fzzbj;
	}
	public void setFzzbj(int fzzbj) {
		this.fzzbj = fzzbj;
	}
	public int getZhbj() {
		return zhbj;
	}
	public void setZhbj(int zhbj) {
		this.zhbj = zhbj;
	}
	public double getZhgs() {
		return zhgs;
	}
	public void setZhgs(double zhgs) {
		this.zhgs = zhgs;
	}
	public String getTxgz() {
		return txgz;
	}
	public void setTxgz(String txgz) {
		this.txgz = txgz;
	}
	public int getGsbh() {
		return gsbh;
	}
	public void setGsbh(int gsbh) {
		this.gsbh = gsbh;
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
	public int getYzws() {
		return yzws;
	}
	public void setYzws(int yzws) {
		this.yzws = yzws;
	}
	public int getDjyz() {
		return djyz;
	}
	public void setDjyz(int djyz) {
		this.djyz = djyz;
	}
	public String getCgzh() {
		return cgzh;
	}
	public void setCgzh(String cgzh) {
		this.cgzh = cgzh;
	}
	public int getFree() {
		return free;
	}
	public void setFree(int free) {
		this.free = free;
	}
	public int getYxbj() {
		return yxbj;
	}
	public void setYxbj(int yxbj) {
		this.yxbj = yxbj;
	}
	public String getGdrm() {
		return gdrm;
	}
	public void setGdrm(String gdrm) {
		this.gdrm = gdrm;
	}
	public Date getGdsj() {
		return gdsj;
	}
	public void setGdsj(Date gdsj) {
		this.gdsj = gdsj;
	}
	public String getJjczym() {
		return jjczym;
	}
	public void setJjczym(String jjczym) {
		this.jjczym = jjczym;
	}
	public Date getJjczsj() {
		return jjczsj;
	}
	public void setJjczsj(Date jjczsj) {
		this.jjczsj = jjczsj;
	}
	public Date getQssxsj() {
		return qssxsj;
	}
	public void setQssxsj(Date qssxsj) {
		this.qssxsj = qssxsj;
	}
	public Date getJzsxsj() {
		return jzsxsj;
	}
	public void setJzsxsj(Date jzsxsj) {
		this.jzsxsj = jzsxsj;
	}
	public String getGxbh() {
		return gxbh;
	}
	public void setGxbh(String gxbh) {
		this.gxbh = gxbh;
	}
	public int getHbdj() {
		return hbdj;
	}
	public void setHbdj(int hbdj) {
		this.hbdj = hbdj;
	}
	public double getScys() {
		return scys;
	}
	public void setScys(double scys) {
		this.scys = scys;
	}
	public double getClzc() {
		return clzc;
	}
	public void setClzc(double clzc) {
		this.clzc = clzc;
	}
	public int getSpbj_kj() {
		return spbj_kj;
	}
	public void setSpbj_kj(int spbj_kj) {
		this.spbj_kj = spbj_kj;
	}
	public String getSprm_kj() {
		return sprm_kj;
	}
	public void setSprm_kj(String sprm_kj) {
		this.sprm_kj = sprm_kj;
	}
	public Date getSpsj_kj() {
		return spsj_kj;
	}
	public void setSpsj_kj(Date spsj_kj) {
		this.spsj_kj = spsj_kj;
	}
	public double getGjfdxs() {
		return gjfdxs;
	}
	public void setGjfdxs(double gjfdxs) {
		this.gjfdxs = gjfdxs;
	}
}
