package erp.erp.materialInspection.model;

import java.util.Date;

public class MaterialApply {
	private double			wtdh;
	private double			wtxh;
	private String			clhh;
	private double			htbh;
	private double			htxh;
	private double			dhdh;
	private double			dhxh;
	private double			sjsl;
	private String			ckbh;
	private String			hth;
	private String			dhh;
	private String			clmc;
	private String			ckmc;
	private String			plmth;
	private String			plmtx;
	private String			cghtyq;
	private Date			llrq;
	private String			jldw;
	public double getWtdh() {
		return wtdh;
	}
	public void setWtdh(double wtdh) {
		this.wtdh = wtdh;
	}
	public double getWtxh() {
		return wtxh;
	}
	public void setWtxh(double wtxh) {
		this.wtxh = wtxh;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public double getHtbh() {
		return htbh;
	}
	public void setHtbh(double htbh) {
		this.htbh = htbh;
	}
	public double getHtxh() {
		return htxh;
	}
	public void setHtxh(double htxh) {
		this.htxh = htxh;
	}
	public double getDhdh() {
		return dhdh;
	}
	public void setDhdh(double dhdh) {
		this.dhdh = dhdh;
	}
	public double getDhxh() {
		return dhxh;
	}
	public void setDhxh(double dhxh) {
		this.dhxh = dhxh;
	}
	public double getSjsl() {
		return sjsl;
	}
	public void setSjsl(double sjsl) {
		this.sjsl = sjsl;
	}
	public String getCkbh() {
		if(ckbh==null){
			return " ";
		}
		return ckbh;
	}
	public void setCkbh(String ckbh) {
		this.ckbh = ckbh;
	}
	public String getHth() {
		return hth;
	}
	public void setHth(String hth) {
		this.hth = hth;
	}
	public String getDhh() {
		return dhh;
	}
	public void setDhh(String dhh) {
		this.dhh = dhh;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getCkmc() {
		return ckmc;
	}
	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
	}
	public String getPlmth() {
		return plmth;
	}
	public void setPlmth(String plmth) {
		this.plmth = plmth;
	}
	public String getPlmtx() {
		return plmtx;
	}
	public void setPlmtx(String plmtx) {
		this.plmtx = plmtx;
	}
	public String getCghtyq() {
		return cghtyq;
	}
	public void setCghtyq(String cghtyq) {
		this.cghtyq = cghtyq;
	}
	public Date getLlrq() {
		return llrq;
	}
	public void setLlrq(Date llrq) {
		this.llrq = llrq;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	
}
