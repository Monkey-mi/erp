package erp.erp.master.category.model;

import java.io.Serializable;

import erp.common.Model;

public class Category extends Model implements Serializable{
	/*功能：采购类别表
	 *作者：伍恰
	 *时间：2016/01/11
	 *数据库名：cglbb
	 * */
	private static final long serialVersionUID = 1L;
	private String			lbbh;
	private String			lbmc;
	private int			lbjc;
	private int			mjbz;
	private String			bzsm;
	private String			dhhm;
	private String			czhm;
	private String			dzyx;
	private String			yhbh;
	private String			hsbm;
	private int			cpbj;
	private int			cfbj;
	private String			ghlbbh;
	private int			bzclbj;
	private String db_TYPE;
	private String ghlbmc;
	
	
	public String getGhlbmc() {
		return ghlbmc;
	}
	public void setGhlbmc(String ghlbmc) {
		this.ghlbmc = ghlbmc;
	}
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getLbmc() {
		return lbmc;
	}
	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}
	public int getLbjc() {
		return lbjc;
	}
	public void setLbjc(int lbjc) {
		this.lbjc = lbjc;
	}
	public int getMjbz() {
		return mjbz;
	}
	public void setMjbz(int mjbz) {
		this.mjbz = mjbz;
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
	public String getDhhm() {
		if(dhhm==null){
			return "";
		}
		return dhhm;
	}
	public void setDhhm(String dhhm) {
		this.dhhm = dhhm;
	}
	public String getCzhm() {
		if(czhm==null){
			return "";
		}
		return czhm;
	}
	public void setCzhm(String czhm) {
		this.czhm = czhm;
	}
	public String getDzyx() {
		if(dzyx==null){
			return "";
		}
		return dzyx;
	}
	public void setDzyx(String dzyx) {
		this.dzyx = dzyx;
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
	public String getHsbm() {
		if(hsbm==null){
			return "";
		}
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public int getCpbj() {
		return cpbj;
	}
	public void setCpbj(int cpbj) {
		this.cpbj = cpbj;
	}
	public int getCfbj() {
		return cfbj;
	}
	public void setCfbj(int cfbj) {
		this.cfbj = cfbj;
	}
	public String getGhlbbh() {
		if(ghlbbh==null){
			return "";
		}
		return ghlbbh;
	}
	public void setGhlbbh(String ghlbbh) {
		this.ghlbbh = ghlbbh;
	}
	public int getBzclbj() {
		return bzclbj;
	}
	public void setBzclbj(int bzclbj) {
		this.bzclbj = bzclbj;
	}
}
