package erp.erp.master.purchaseCost.model;

import java.io.Serializable;

import erp.common.Model;

public class SumData extends Model implements Serializable{
	private static final long serialVersionUID = 1L; 
	private double fyslzh;
     private double fyjezh;
     private double csjezh;
     private double sezh;
     public double getFyslzh() {
		return fyslzh;
	}
	public void setFyslzh(double fyslzh) {
		this.fyslzh = fyslzh;
	}
	public double getFyjezh() {
		return fyjezh;
	}
	public void setFyjezh(double fyjezh) {
		this.fyjezh = fyjezh;
	}
	public double getCsjezh() {
		return csjezh;
	}
	public void setCsjezh(double csjezh) {
		this.csjezh = csjezh;
	}
	public double getSezh() {
		return sezh;
	}
	public void setSezh(double sezh) {
		this.sezh = sezh;
	}
	public double getWbzh() {
		return wbzh;
	}
	public void setWbzh(double wbzh) {
		this.wbzh = wbzh;
	}
	private double wbzh;
   
}
