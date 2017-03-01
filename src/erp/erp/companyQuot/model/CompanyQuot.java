package erp.erp.companyQuot.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class CompanyQuot extends Model implements Serializable{
	/*功能：厂商报价
	 *时间：2016/03/21
	 *数据库名：csbjdb等
	 * */
	private static final long serialVersionUID = 1L;
	private double			bjdh;
	private Date			bjrq;
	private String			csbh;
	private String			csmc;
	private String			czym;
	private Date			czsj;
	private int			gdbj;
	private String			bzsm;
	private int			shbj;
	private int			sdbj;
	private int			spbj;
	private String			sprm;
	private Date			spsj;
	private String db_TYPE;

	public String getDb_TYPE() {
		if(db_TYPE==null){
			return "";
		}
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public double getBjdh() {
		return bjdh;
	}
	public void setBjdh(double bjdh) {
		this.bjdh = bjdh;
	}
	public Date getBjrq() {
		return bjrq;
	}
	public void setBjrq(Date bjrq) {
		this.bjrq = bjrq;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public String getCzym() {
		return czym;
	}
	public void setCzym(String czym) {
		this.czym = czym;
	}
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
	public String getBzsm() {
		if(bzsm==null){
			return "";
		}
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public int getShbj() {
		return shbj;
	}
	public void setShbj(int shbj) {
		this.shbj = shbj;
	}
	public int getSdbj() {
		return sdbj;
	}
	public void setSdbj(int sdbj) {
		this.sdbj = sdbj;
	}
	public int getSpbj() {
		return spbj;
	}
	public void setSpbj(int spbj) {
		this.spbj = spbj;
	}
	public String getSprm() {
		if(sprm==null){
			return "";
		}
		return sprm;
	}
	public void setSprm(String sprm) {
		this.sprm = sprm;
	}
	public Date getSpsj() {
		return spsj;
	}
	public void setSpsj(Date spsj) {
		this.spsj = spsj;
	}
}
