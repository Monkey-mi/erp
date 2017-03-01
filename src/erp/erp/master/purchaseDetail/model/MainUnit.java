package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;

public class MainUnit extends Model implements Serializable{
	/*功能：主体单位模型
	 *作者：伍恰
	 *时间：2016/02/01
	 *数据库名：ztdwb
	 * */
	private static final long serialVersionUID = 1L;
	private String			ztbh;
	private String			ztjc;
	private String			ztmc;
	private String			ztmc_eng;
	private String			lxdz;
	private String			lxdz_eng;
	private String			lxrm;
	private String			dhhm;
	private String			czhm;
	private String			hgdm;
	private String			jnhyd;
	private String			wtlx;
	private String			ofad;
	private boolean			mrbj;
	private int			gdbj;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getZtbh() {
		return ztbh.trim();//去掉编号中的空格
	}
	public void setZtbh(String ztbh) {
		this.ztbh = ztbh;
	}
	public String getZtjc() {
		return ztjc;
	}
	public void setZtjc(String ztjc) {
		this.ztjc = ztjc;
	}
	public String getZtmc() {
		return ztmc;
	}
	public void setZtmc(String ztmc) {
		this.ztmc = ztmc;
	}
	public String getZtmc_eng() {
		return ztmc_eng;
	}
	public void setZtmc_eng(String ztmc_eng) {
		this.ztmc_eng = ztmc_eng;
	}
	public String getLxdz() {
		return lxdz;
	}
	public void setLxdz(String lxdz) {
		this.lxdz = lxdz;
	}
	public String getLxdz_eng() {
		return lxdz_eng;
	}
	public void setLxdz_eng(String lxdz_eng) {
		this.lxdz_eng = lxdz_eng;
	}
	public String getLxrm() {
		return lxrm;
	}
	public void setLxrm(String lxrm) {
		this.lxrm = lxrm;
	}
	public String getDhhm() {
		return dhhm;
	}
	public void setDhhm(String dhhm) {
		this.dhhm = dhhm;
	}
	public String getCzhm() {
		return czhm;
	}
	public void setCzhm(String czhm) {
		this.czhm = czhm;
	}
	public String getHgdm() {
		return hgdm;
	}
	public void setHgdm(String hgdm) {
		this.hgdm = hgdm;
	}
	public String getJnhyd() {
		return jnhyd;
	}
	public void setJnhyd(String jnhyd) {
		this.jnhyd = jnhyd;
	}
	public String getWtlx() {
		return wtlx;
	}
	public void setWtlx(String wtlx) {
		this.wtlx = wtlx;
	}
	public String getOfad() {
		return ofad;
	}
	public void setOfad(String ofad) {
		this.ofad = ofad;
	}
	public boolean getMrbj() {
		return mrbj;
	}
	public void setMrbj(boolean mrbj) {
		this.mrbj = mrbj;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
}
