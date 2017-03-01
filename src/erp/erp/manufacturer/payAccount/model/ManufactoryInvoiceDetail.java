/**
 *  @date 2016-5-30上午9:22:54
 *  @file InvoiceDetail.java
 *  @author:shufei
 *  
 */
package erp.erp.manufacturer.payAccount.model;

import java.io.Serializable;

/**
 * <p>Title: InvoiceDetail</p>
 * <p>Description: erp</p>
 * <p>Company: topsun</p> 
 * @author 舒飞
 * @date 2016-5-30上午9:22:54
 */
public class ManufactoryInvoiceDetail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3596108043146116831L;
	private String hsbm;
	private String nf;
	private String yf;
	private String rq;
	private String pzh;
	private String bzsm;
	private String jd;
	private String fplb;
	private double fpje;
	private double zfje;
	private double hldz;
	private double fpyf;
	private double zfhlhz;
	private int px;
	private int zdsx;
	private int wbbj;
	private int total;
	
	/**
	 * 
	 */
	public ManufactoryInvoiceDetail() {
		super();
		// TODO Auto-generated constructor stub
	}
	/**
	 * @param hsbm
	 * @param nf
	 * @param yf
	 * @param rq
	 * @param pzh
	 * @param bzsm
	 * @param jd
	 * @param fplb
	 * @param fpje
	 * @param zfje
	 * @param hldz
	 * @param fpyf
	 * @param zfhlhz
	 * @param px
	 * @param zdsx
	 */
	public ManufactoryInvoiceDetail(String hsbm, String nf, String yf, String rq,
			String pzh, String bzsm, String jd, String fplb, double fpje,
			double zfje, double hldz, double fpyf, double zfhlhz, int px,
			int zdsx) {
		this.hsbm = hsbm;
		this.nf = nf;
		this.yf = yf;
		this.rq = rq;
		this.pzh = pzh;
		this.bzsm = bzsm;
		this.jd = jd;
		this.fplb = fplb;
		this.fpje = fpje;
		this.zfje = zfje;
		this.hldz = hldz;
		this.fpyf = fpyf;
		this.zfhlhz = zfhlhz;
		this.px = px;
		this.zdsx = zdsx;
	}
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public String getNf() {
		return nf;
	}
	public void setNf(String nf) {
		this.nf = nf;
	}
	public String getYf() {
		return yf;
	}
	public void setYf(String yf) {
		this.yf = yf;
	}
	public String getRq() {
		return rq;
	}
	public void setRq(String rq) {
		this.rq = rq;
	}
	public String getPzh() {
		return pzh;
	}
	public void setPzh(String pzh) {
		this.pzh = pzh;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getJd() {
		return jd;
	}
	public void setJd(String jd) {
		this.jd = jd;
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
	public double getZfje() {
		return zfje;
	}
	public void setZfje(double zfje) {
		this.zfje = zfje;
	}
	public double getHldz() {
		return hldz;
	}
	public void setHldz(double hldz) {
		this.hldz = hldz;
	}
	public double getFpyf() {
		return fpyf;
	}
	public void setFpyf(double fpyf) {
		this.fpyf = fpyf;
	}
	public double getZfhlhz() {
		return zfhlhz;
	}
	public void setZfhlhz(double zfhlhz) {
		this.zfhlhz = zfhlhz;
	}
	public int getPx() {
		return px;
	}
	public void setPx(int px) {
		this.px = px;
	}
	public int getZdsx() {
		return zdsx;
	}
	public void setZdsx(int zdsx) {
		this.zdsx = zdsx;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Override
	public String toString() {
		return "InvoiceDetail [hsbm=" + hsbm + ", nf=" + nf + ", yf=" + yf
				+ ", rq=" + rq + ", pzh=" + pzh + ", bzsm=" + bzsm + ", jd="
				+ jd + ", fplb=" + fplb + ", fpje=" + fpje + ", zfje=" + zfje
				+ ", hldz=" + hldz + ", fpyf=" + fpyf + ", zfhlhz=" + zfhlhz
				+ ", px=" + px + ", zdsx=" + zdsx + "]";
	}
	public int getWbbj() {
		return wbbj;
	}
	public void setWbbj(int wbbj) {
		this.wbbj = wbbj;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	
    
}
