package erp.erp.companyQuot.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class CompanyQuotFile extends Model implements Serializable{
	 private static final long serialVersionUID = 1L; 
	  private double bjdh;
      private double wjbh;
      private String wjmc;
      private String wjlj;
      private Date cjrq;
      private String cjrm;
	public double getBjdh() {
		return bjdh;
	}
	public void setBjdh(double bjdh) {
		this.bjdh = bjdh;
	}
	public double getWjbh() {
		return wjbh;
	}
	public void setWjbh(double wjbh) {
		this.wjbh = wjbh;
	}
	public String getWjmc() {
		return wjmc;
	}
	public void setWjmc(String wjmc) {
		this.wjmc = wjmc;
	}
	public String getWjlj() {
		return wjlj;
	}
	public void setWjlj(String wjlj) {
		this.wjlj = wjlj;
	}
	public Date getCjrq() {
		return cjrq;
	}
	public void setCjrq(Date cjrq) {
		this.cjrq = cjrq;
	}
	public String getCjrm() {
		return cjrm;
	}
	public void setCjrm(String cjrm) {
		this.cjrm = cjrm;
	}
      
}
