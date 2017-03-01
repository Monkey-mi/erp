package erp.erp.plasticPartsPledge.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;
/** 
 * @ClassName: PlasticPartsPledgeInvoiceImp 
 * @Description: TODO(这里用一句话描述这个类的作用) 
 * @author wuqia
 * @date 2016-6-1 下午6:33:22 
 * 
 *  
 */
public class PlasticPartsPledgeInvoiceImp extends Model implements Serializable{
	/** 
	* @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
	*/ 
	
	
	
	private static final long serialVersionUID = 1L;
	private String			fphm;
	private String			fplb;
	private Date	kprq;
	private Date	shsj;
	private Date	hkzq;
	private double			fpje;
	private double			zyje;
	private double  wqje;
	private String fplbhm;//附加字段
	
	public String getFplbhm() {
		return fplbhm;
	}
	public void setFplbhm(String fplbhm) {
		this.fplbhm = fplbhm;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
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
	public Date getKprq() {
		return kprq;
	}
	public void setKprq(Date kprq) {
		this.kprq = kprq;
	}
	public Date getShsj() {
		return shsj;
	}
	public void setShsj(Date shsj) {
		this.shsj = shsj;
	}
	public Date getHkzq() {
		return hkzq;
	}
	public void setHkzq(Date hkzq) {
		this.hkzq = hkzq;
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
	public double getWqje() {
		return wqje;
	}
	public void setWqje(double wqje) {
		this.wqje = wqje;
	}
	
}
