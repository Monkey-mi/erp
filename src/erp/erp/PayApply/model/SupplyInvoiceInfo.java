package erp.erp.PayApply.model;

import java.sql.Timestamp;

public class SupplyInvoiceInfo {
	private double sqbh;
	private double sqxh;
	private String fplb;
	private String fphm;
	private String hsbm;
	private String bmmc;
	private Timestamp jzrq;
	private double fpje;
	private double sqje;
	private String wbbh;
	private String wbdh;
	private double wbhl;
	private double wbje;
	private double wbsq;
	private Timestamp kprq;
	private int ycbj;
	public double getSqbh() {
		return sqbh;
	}
	public void setSqbh(double sqbh) {
		this.sqbh = sqbh;
	}
	public double getSqxh() {
		return sqxh;
	}
	public void setSqxh(double sqxh) {
		this.sqxh = sqxh;
	}
	public String getFplb() {
		return fplb;
	}
	public void setFplb(String fplb) {
		this.fplb = fplb;
	}
	public String getFphm() {
		return fphm;
	}
	public void setFphm(String fphm) {
		this.fphm = fphm;
	}
	public String getHsbm() {
		return hsbm;
	}
	public void setHsbm(String hsbm) {
		this.hsbm = hsbm;
	}
	public Timestamp getJzrq() {
		return jzrq;
	}
	public void setJzrq(Timestamp jzrq) {
		this.jzrq = jzrq;
	}
	public double getFpje() {
		return fpje;
	}
	public void setFpje(double fpje) {
		this.fpje = fpje;
	}
	public double getSqje() {
		return sqje;
	}
	public void setSqje(double sqje) {
		this.sqje = sqje;
	}
	public String getWbbh() {
		if (wbbh == null) {
			return "";
		}
		return wbbh;
	}
	public void setWbbh(String wbbh) {
		this.wbbh = wbbh;
	}
	public double getWbhl() {
		return wbhl;
	}
	public void setWbhl(double wbhl) {
		this.wbhl = wbhl;
	}
	public double getWbje() {
		return wbje;
	}
	public void setWbje(double wbje) {
		this.wbje = wbje;
	}
	public Timestamp getKprq() {
		return kprq;
	}
	public void setKprq(Timestamp kprq) {
		this.kprq = kprq;
	}
	public int getYcbj() {
		return ycbj;
	}
	public void setYcbj(int ycbj) {
		this.ycbj = ycbj;
	}
	public String getBmmc() {
		return bmmc;
	}
	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
	}
	public String getWbdh() {
		return wbdh;
	}
	public void setWbdh(String wbdh) {
		this.wbdh = wbdh;
	}
	public double getWbsq() {
		return wbsq;
	}
	public void setWbsq(double wbsq) {
		this.wbsq = wbsq;
	}
	
}
