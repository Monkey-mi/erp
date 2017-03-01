package erp.erp.purchaseUrge.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class SynergyUrge extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String			csmc;
	private int			htbh;
	private String			clmc;
	private String			clhh;
	private String			jldw;
	private String			cltx1;
	private String			ckmc;
	private int		      cgsl;
	private Date			jhrq;
	private int order_detail_id;
	private int pur_order_id;
	private String htmx;
	private String csbh;
	private int htxh;
	private int is_edit;
	private int tzbj;
	
	public String getCkmc() {
		return ckmc;
	}
	public void setCkmc(String ckmc) {
		this.ckmc = ckmc;
	}
	public int getTzbj() {
		return tzbj;
	}
	public void setTzbj(int tzbj) {
		this.tzbj = tzbj;
	}
	public int getHtxh() {
		return htxh;
	}
	public void setHtxh(int htxh) {
		this.htxh = htxh;
	}
	public int getIs_edit() {
		return is_edit;
	}
	public void setIs_edit(int is_edit) {
		this.is_edit = is_edit;
	}
	public String getCsbh() {
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public String getHtmx() {
		return htmx;
	}
	public void setHtmx(String htmx) {
		this.htmx = htmx;
	}
	public int getOrder_detail_id() {
		return order_detail_id;
	}
	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}
	public int getPur_order_id() {
		return pur_order_id;
	}
	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public String getCltx1() {
		return cltx1;
	}
	public void setCltx1(String cltx1) {
		this.cltx1 = cltx1;
	}
	public int getCgsl() {
		return cgsl;
	}
	public void setCgsl(int cgsl) {
		this.cgsl = cgsl;
	}
	public Date getJhrq() {
		return jhrq;
	}
	public void setJhrq(Date jhrq) {
		this.jhrq = jhrq;
	}
	
}
