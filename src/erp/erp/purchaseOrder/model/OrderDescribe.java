package erp.erp.purchaseOrder.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class OrderDescribe extends Model implements Serializable{
	/*功能：产品描述
	 *作者：伍恰
	 *时间：2016/03/16
	 *数据库名：xsdd_cpmsb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			ddbh;
	private int			ddxh;
	private int			mbbh;
	private int			msxh;
	private String			xmmc;
	private String			xmms;
	private int			bj;
	private int			pxxh;
	private int			zycd;
	private String			xmms_yf;
	private int			qrbj;
	private int			wcbj;
	private String			wcrm;
	private Date			wcsj;

	public int getDdbh() {
		return ddbh;
	}
	public void setDdbh(int ddbh) {
		this.ddbh = ddbh;
	}
	public int getDdxh() {
		return ddxh;
	}
	public void setDdxh(int ddxh) {
		this.ddxh = ddxh;
	}
	public int getMbbh() {
		return mbbh;
	}
	public void setMbbh(int mbbh) {
		this.mbbh = mbbh;
	}
	public int getMsxh() {
		return msxh;
	}
	public void setMsxh(int msxh) {
		this.msxh = msxh;
	}
	public String getXmmc() {
		return xmmc;
	}
	public void setXmmc(String xmmc) {
		this.xmmc = xmmc;
	}
	public String getXmms() {
		return xmms;
	}
	public void setXmms(String xmms) {
		this.xmms = xmms;
	}
	public int getBj() {
		return bj;
	}
	public void setBj(int bj) {
		this.bj = bj;
	}
	public int getPxxh() {
		return pxxh;
	}
	public void setPxxh(int pxxh) {
		this.pxxh = pxxh;
	}
	public int getZycd() {
		return zycd;
	}
	public void setZycd(int zycd) {
		this.zycd = zycd;
	}
	public String getXmms_yf() {
		return xmms_yf;
	}
	public void setXmms_yf(String xmms_yf) {
		this.xmms_yf = xmms_yf;
	}
	public int getQrbj() {
		return qrbj;
	}
	public void setQrbj(int qrbj) {
		this.qrbj = qrbj;
	}
	public int getWcbj() {
		return wcbj;
	}
	public void setWcbj(int wcbj) {
		this.wcbj = wcbj;
	}
	public String getWcrm() {
		return wcrm;
	}
	public void setWcrm(String wcrm) {
		this.wcrm = wcrm;
	}
	public Date getWcsj() {
		return wcsj;
	}
	public void setWcsj(Date wcsj) {
		this.wcsj = wcsj;
	}
}
