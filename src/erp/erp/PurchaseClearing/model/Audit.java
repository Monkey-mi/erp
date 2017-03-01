package erp.erp.PurchaseClearing.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class Audit extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
    private String ckmc;
    private String csmc;
    private String clmc;
    private String jldw;
    private String hth;
    private int clhh;
    private double rkdh;
    private double rkxh;
    private double kzdj;
    private double cgkj;
    private double cgdj;
    private double rkdj;
    private Date rkrq;
    private Date pjrq;
	public String getCkmc() {
		if(ckmc==null){
			return "";
		}
		return ckmc;
	}
	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
	}
	public String getCsmc() {
		if(csmc==null){
			return "";
		}
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getClmc() {
		if(clmc==null){
			return "";
		}
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getJldw() {
		if(jldw==null){
			return "";
		}
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public String getHth() {
		if(hth==null){
			return "";
		}
		return hth;
	}
	public void setHth(String hth) {
		this.hth = hth;
	}
	public int getClhh() {
		return clhh;
	}
	public void setClhh(int clhh) {
		this.clhh = clhh;
	}
	public double getRkdh() {
		return rkdh;
	}
	public void setRkdh(double rkdh) {
		this.rkdh = rkdh;
	}
	public double getRkxh() {
		return rkxh;
	}
	public void setRkxh(double rkxh) {
		this.rkxh = rkxh;
	}
	public double getKzdj() {
		return kzdj;
	}
	public void setKzdj(double kzdj) {
		this.kzdj = kzdj;
	}
	public double getCgkj() {
		return cgkj;
	}
	public void setCgkj(double cgkj) {
		this.cgkj = cgkj;
	}
	public double getCgdj() {
		return cgdj;
	}
	public void setCgdj(double cgdj) {
		this.cgdj = cgdj;
	}
	public double getRkdj() {
		return rkdj;
	}
	public void setRkdj(double rkdj) {
		this.rkdj = rkdj;
	}
	public Date getRkrq() {
		return rkrq;
	}
	public void setRkrq(Date rkrq) {
		this.rkrq = rkrq;
	}
	public Date getPjrq() {
		return pjrq;
	}
	public void setPjrq(Date pjrq) {
		this.pjrq = pjrq;
	}
}
