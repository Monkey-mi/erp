package erp.erp.plasticPartsPledge.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;
/**
 * 
* @ClassName: PlasticPartsPledge 
* @Description: 塑料件质押主表 
* @author wuqia
* @date 2016-6-1 上午10:54:47 
*
 */
public class PlasticPartsPledge extends Model implements Serializable{
	/** 
	* @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
	*/ 
	
	
	
	private static final long serialVersionUID = 1L;
	private int			zydh;
	private int			zylx;
	private String			czrm;
	private Date			czrq;
	private String			csbh;
	private double			zyje;
	private Date			dqrq;
	private String			bzsm;
	private String			sdrm;
	private Date			sdsj;
	private String			shrm;
	private Date			shsj;
	private String			jyrm;
	private Date			jysj;
	private int			sdbj;
	private int			shbj;
	private int			jybj;
	private String csmc;//附加厂商名称字段
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
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
	public int getZylx() {
		return zylx;
	}
	public void setZylx(int zylx) {
		this.zylx = zylx;
	}
	public String getCzrm() {
		return czrm;
	}
	public void setCzrm(String czrm) {
		this.czrm = czrm;
	}
	public Date getCzrq() {
		return czrq;
	}
	public void setCzrq(Date czrq) {
		this.czrq = czrq;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public double getZyje() {
		return zyje;
	}
	public void setZyje(double zyje) {
		this.zyje = zyje;
	}
	public Date getDqrq() {
		return dqrq;
	}
	public void setDqrq(Date dqrq) {
		this.dqrq = dqrq;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getSdrm() {
		return sdrm;
	}
	public void setSdrm(String sdrm) {
		this.sdrm = sdrm;
	}
	public Date getSdsj() {
		return sdsj;
	}
	public void setSdsj(Date sdsj) {
		this.sdsj = sdsj;
	}
	public String getShrm() {
		return shrm;
	}
	public void setShrm(String shrm) {
		this.shrm = shrm;
	}
	public Date getShsj() {
		return shsj;
	}
	public void setShsj(Date shsj) {
		this.shsj = shsj;
	}
	public String getJyrm() {
		return jyrm;
	}
	public void setJyrm(String jyrm) {
		this.jyrm = jyrm;
	}
	public Date getJysj() {
		return jysj;
	}
	public void setJysj(Date jysj) {
		this.jysj = jysj;
	}
	public int getSdbj() {
		return sdbj;
	}
	public void setSdbj(int sdbj) {
		this.sdbj = sdbj;
	}
	public int getShbj() {
		return shbj;
	}
	public void setShbj(int shbj) {
		this.shbj = shbj;
	}
	public int getJybj() {
		return jybj;
	}
	public void setJybj(int jybj) {
		this.jybj = jybj;
	}
}
