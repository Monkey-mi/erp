package erp.erp.companyQuot.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class QuotDetail extends Model implements Serializable{
	/**表csbjmxb
	 * */
	private static final long serialVersionUID = 1L;
	private int			bjdh;
	private double			bjxh;
	private int			shbj;
	private String			clhh;
	private String			csbh;
	private String			csmc;
	private String			clmc;
	private String			jldw;
	private double			csbj;
	private String			wbbh;
	private double			wbbj;
	private String			mxbz;
	private String			shrm;
	private Date			shsj;
	private double			fzkj;
	private double			jzj;
	private String			jzj_str;
	private int			    sdbj;
	private int			    spbj;
	private String			sdrm;
	private Date			sdsj;
	private Date			bjrq;
	private double          gxbj_jg;
	private String         plmth;
	private String         plmtx;
	private String         fzdw;
	private String         wbdh;
	private String db_TYPE;
    
	public int getSpbj() {
		return spbj;
	}
	public void setSpbj(int spbj) {
		this.spbj = spbj;
	}
	public Date getBjrq() {
		return bjrq;
	}
	public void setBjrq(Date bjrq) {
		this.bjrq = bjrq;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getWbdh() {
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
	public String getJzj_str() {
		if(jzj_str==null){
			return "";
		}
		return jzj_str;
	}
	public void setJzj_str(String jzj_str) {
		this.jzj_str = jzj_str;
	}
	public double getGxbj_jg() {
		return gxbj_jg;
	}
	public void setGxbj_jg(double gxbj_jg) {
		this.gxbj_jg = gxbj_jg;
	}
	public String getPlmth() {
		if(plmth==null){
			return "";
		}
		return plmth;
	}
	public void setPlmth(String plmth) {
		this.plmth = plmth;
	}
	public String getPlmtx() {
		if(plmtx==null){
			return "";
		}
		return plmtx;
	}
	public void setPlmtx(String plmtx) {
		this.plmtx = plmtx;
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
	public String getDb_TYPE() {
		if(db_TYPE==null){
			return "";
		}
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public int getBjdh() {
		return bjdh;
	}
	public void setBjdh(int bjdh) {
		this.bjdh = bjdh;
	}
	public double getBjxh() {
		return bjxh;
	}
	public void setBjxh(double bjxh) {
		this.bjxh = bjxh;
	}
	public int getShbj() {
		return shbj;
	}
	public void setShbj(int shbj) {
		this.shbj = shbj;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
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
	public double getCsbj() {
		return csbj;
	}
	public void setCsbj(double csbj) {
		this.csbj = csbj;
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
	public double getWbbj() {
		return wbbj;
	}
	public void setWbbj(double wbbj) {
		this.wbbj = wbbj;
	}
	public String getMxbz() {
		if(mxbz==null){
			return "";
		}
		return mxbz;
	}
	public void setMxbz(String mxbz) {
		this.mxbz = mxbz;
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
	public double getFzkj() {
		return fzkj;
	}
	public void setFzkj(double fzkj) {
		this.fzkj = fzkj;
	}
	public double getJzj() {
		return jzj;
	}
	public void setJzj(double jzj) {
		this.jzj = jzj;
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
}
