package erp.erp.master.operator.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class Operator extends Model implements Serializable{
	/*功能：操作员模型
	 *作者：伍恰
	 *时间：2016/01/12
	 *数据库名：czyb
	 * */
	private static final long serialVersionUID = 1L;
	private String			czy_gh;
	private String			czy_xm;
	private String			czy_kl;
	private int			czy_gly;
	private int			admi;
	private String         bmmc;
	private String			gzgw;
	private String			gzms;
	private String			ssbm;
	private Date			xgrq;
	private int			yxsc;
	private String			sxbh;
	private int			gdbj;
	private int			tybj;
	private String			setuppath;
	private String db_TYPE;
	
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getCzy_gh() {
		return czy_gh;
	}
	public void setCzy_gh(String czy_gh) {
		this.czy_gh = czy_gh;
	}
	public String getCzy_xm() {
		return czy_xm;
	}
	public void setCzy_xm(String czy_xm) {
		this.czy_xm = czy_xm;
	}
	public String getCzy_kl() {
		return czy_kl;
	}
	public void setCzy_kl(String czy_kl) {
		this.czy_kl = czy_kl;
	}
	public int getCzy_gly() {
		return czy_gly;
	}
	public void setCzy_gly(int czy_gly) {
		this.czy_gly = czy_gly;
	}
	public int getAdmi() {
		return admi;
	}
	public void setAdmi(int admi) {
		this.admi = admi;
	}
	public String getGzgw() {
		return gzgw;
	}
	public void setGzgw(String gzgw) {
		this.gzgw = gzgw;
	}
	public String getGzms() {
		return gzms;
	}
	public void setGzms(String gzms) {
		this.gzms = gzms;
	}
	public String getSsbm() {
		return ssbm;
	}
	public void setSsbm(String ssbm) {
		this.ssbm = ssbm;
	}
	public Date getXgrq() {
		return xgrq;
	}
	public void setXgrq(Date xgrq) {
		this.xgrq = xgrq;
	}
	public int getYxsc() {
		return yxsc;
	}
	public void setYxsc(int yxsc) {
		this.yxsc = yxsc;
	}
	public String getSxbh() {
		return sxbh;
	}
	public void setSxbh(String sxbh) {
		this.sxbh = sxbh;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
	public int getTybj() {
		return tybj;
	}
	public void setTybj(int tybj) {
		this.tybj = tybj;
	}
	public String getSetuppath() {
		return setuppath;
	}
	public void setSetuppath(String setuppath) {
		this.setuppath = setuppath;
	}
    /**
     * Getter method for property <tt>bmmc</tt>.
     * 
     * @return property value of bmmc
     */
    public String getBmmc() {
        return bmmc;
    }
    /**
     * Setter method for property <tt>bmmc</tt>.
     * 
     * @param bmmc value to be assigned to property bmmc
     */
    public void setBmmc(String bmmc) {
        this.bmmc = bmmc;
    }
	
	
}
