package erp.erp.purchaseOrder.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class OrderSubsidiary extends Model implements Serializable{
	/*功能：采购辅助
	 *作者：伍恰
	 *时间：2016/03/16
	 *数据库名：cghtfzb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			htbh;
	private int			htxh;
	private int			jlxh;
	private String			cggg;
	private double			zhgg;
	private double			zhsl;
	private String			zhjl;
	private double			fzsl;
	private String			fzdw;
	private double			cgsl;
	private String			jldw;
	private String jgbh;
	private double scxq;
	private String fzdw_sc;
	private double yxgg;
	private double dgyl;
	private double gjsl;
	private double gjyl;
	private double jhsl;
	private double fdxs;
	private String login_id;
	private String ip;
	private Date czsj;
	
	
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getJgbh() {
		return jgbh;
	}
	public void setJgbh(String jgbh) {
		this.jgbh = jgbh;
	}
	public double getScxq() {
		return scxq;
	}
	public void setScxq(double scxq) {
		this.scxq = scxq;
	}
	public String getFzdw_sc() {
		return fzdw_sc;
	}
	public void setFzdw_sc(String fzdw_sc) {
		this.fzdw_sc = fzdw_sc;
	}
	public double getYxgg() {
		return yxgg;
	}
	public void setYxgg(double yxgg) {
		this.yxgg = yxgg;
	}
	public double getDgyl() {
		return dgyl;
	}
	public void setDgyl(double dgyl) {
		this.dgyl = dgyl;
	}
	public double getGjsl() {
		return gjsl;
	}
	public void setGjsl(double gjsl) {
		this.gjsl = gjsl;
	}
	public double getGjyl() {
		return gjyl;
	}
	public void setGjyl(double gjyl) {
		this.gjyl = gjyl;
	}
	public double getJhsl() {
		return jhsl;
	}
	public void setJhsl(double jhsl) {
		this.jhsl = jhsl;
	}
	public double getFdxs() {
		return fdxs;
	}
	public void setFdxs(double fdxs) {
		this.fdxs = fdxs;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public int getHtxh() {
		return htxh;
	}
	public void setHtxh(int htxh) {
		this.htxh = htxh;
	}
	public int getJlxh() {
		return jlxh;
	}
	public void setJlxh(int jlxh) {
		this.jlxh = jlxh;
	}
	public String getCggg() {
		return cggg;
	}
	public void setCggg(String cggg) {
		this.cggg = cggg;
	}
	public double getZhgg() {
		return zhgg;
	}
	public void setZhgg(double zhgg) {
		this.zhgg = zhgg;
	}
	public double getZhsl() {
		return zhsl;
	}
	public void setZhsl(double zhsl) {
		this.zhsl = zhsl;
	}
	public String getZhjl() {
		return zhjl;
	}
	public void setZhjl(String zhjl) {
		this.zhjl = zhjl;
	}
	public double getFzsl() {
		return fzsl;
	}
	public void setFzsl(double fzsl) {
		this.fzsl = fzsl;
	}
	public String getFzdw() {
		return fzdw;
	}
	public void setFzdw(String fzdw) {
		this.fzdw = fzdw;
	}
	public double getCgsl() {
		return cgsl;
	}
	public void setCgsl(double cgsl) {
		this.cgsl = cgsl;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
}
