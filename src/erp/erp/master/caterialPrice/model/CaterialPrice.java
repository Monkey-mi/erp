package erp.erp.master.caterialPrice.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class CaterialPrice extends Model implements Serializable{
	/*功能：材料价格公式表
	 *作者：伍恰
	 *时间：2016/01/13
	 *数据库名：cljggswhb
	 * */
	private static final long serialVersionUID = 1L;
	private int			gsbh;
	private String			gsmc;
	private String			jggs;
	private String			bzsm;
	private String			czym;
	private Date			czrq;
	private int			sdbj;
	private String			sdrm;
	private Date			sdrq;
	private String db_TYPE;
	
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getGsbh() {
		return gsbh;
	}
	public void setGsbh(int gsbh) {
		this.gsbh = gsbh;
	}
	public String getGsmc() {
		return gsmc;
	}
	public void setGsmc(String gsmc) {
		this.gsmc = gsmc;
	}
	public String getJggs() {
		return jggs;
	}
	public void setJggs(String jggs) {
		this.jggs = jggs;
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
	public String getCzym() {
		if(czym==null){
			return "";
		}
		return czym;
	}
	public void setCzym(String czym) {
		this.czym = czym;
	}
	public Date getCzrq() {
		return czrq;
	}
	public void setCzrq(Date czrq) {
		this.czrq = czrq;
	}
	public int getSdbj() {
		return sdbj;
	}
	public void setSdbj(int sdbj) {
		this.sdbj = sdbj;
	}
	public String getSdrm() {
		if(sdrm==null){
			return "";
		}
		return sdrm;
	}
	public void setSdrm(String sdrm) {
		this.sdrm = sdrm;
	}
	public Date getSdrq() {
		return sdrq;
	}
	public void setSdrq(Date sdrq) {
		this.sdrq = sdrq;
	}
}
