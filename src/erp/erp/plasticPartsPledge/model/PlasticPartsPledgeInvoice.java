package erp.erp.plasticPartsPledge.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;
/**
 * 
* @ClassName: PlasticPartsPledgeInvoice 
* @Description: 塑料件质押发票
* @author wuqia
* @date 2016-6-1 下午1:58:51 
*
 */
public class PlasticPartsPledgeInvoice extends Model implements Serializable{
	/** 
	* @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
	*/ 
	
	
	
	private static final long serialVersionUID = 1L;
	private int			zydh;
	private Date			kprq;
	private Date			shsj_fp;
	private String			fphm;
	private String			fplb;
	private double			fpje;
	private double			zyje;
	private Date	shsj;//附加字段
	private double  wqje;//附加字段
	
	public Date getShsj() {
		return shsj;
	}
	public void setShsj(Date shsj) {
		this.shsj = shsj;
	}
	public double getWqje() {
		return wqje;
	}
	public void setWqje(double wqje) {
		this.wqje = wqje;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getZydh() {
		return zydh;
	}
	public void setZydh(int zydh) {
		this.zydh = zydh;
	}
	public Date getKprq() {
		return kprq;
	}
	public void setKprq(Date kprq) {
		this.kprq = kprq;
	}
	public Date getShsj_fp() {
		return shsj_fp;
	}
	public void setShsj_fp(Date shsj_fp) {
		this.shsj_fp = shsj_fp;
	}
	public String getFphm() {
		return fphm;
	}
	public void setFphm(String fphm) {
		this.fphm = fphm;
	}
	public String getFplb() {
		return fplb;
	}
	public void setFplb(String fplb) {
		this.fplb = fplb;
	}
	public double getFpje() {
		return fpje;
	}
	public void setFpje(double fpje) {
		this.fpje = fpje;
	}
	public double getZyje() {
		return zyje;
	}
	public void setZyje(double zyje) {
		this.zyje = zyje;
	}
}
