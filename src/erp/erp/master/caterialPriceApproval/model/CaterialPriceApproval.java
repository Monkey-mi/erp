package erp.erp.master.caterialPriceApproval.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class CaterialPriceApproval extends Model implements Serializable{
	/*功能：材料审批价格表
	 *作者：伍恰
	 *时间：2016/01/14
	 *数据库名：clspjgb
	 * */
	private static final long serialVersionUID = 1L;
	private int			jlbh;
	private Date			jlrq;
	private int			gsbh;
	private String			qfrm;
	private int			qfbj;
	private Date			qfrq;
	private String			czrm;
	private Date			czrq;
	private String			sdrm;
	private int			sdbj;
	private Date			sdrq;
	private String			qyrm;
	private int			qybj;
	private Date			qyrq;
	private String			bzsm;
	private int			gdbj;
	private Date			gdrq;
	private String			gdrm;
	private String gsmc;
	private String db_TYPE;
	
	
	public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public String getGsmc() {
		return gsmc;
	}
	public void setGsmc(String gsmc) {
		this.gsmc = gsmc;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getJlbh() {
		return jlbh;
	}
	public void setJlbh(int jlbh) {
		this.jlbh = jlbh;
	}
	public Date getJlrq() {
		return jlrq;
	}
	public void setJlrq(Date jlrq) {
		this.jlrq = jlrq;
	}
	public int getGsbh() {
		return gsbh;
	}
	public void setGsbh(int gsbh) {
		this.gsbh = gsbh;
	}
	public String getQfrm() {
		if(qfrm==null){
			return "";
		}
		return qfrm;
	}
	public void setQfrm(String qfrm) {
		this.qfrm = qfrm;
	}
	public int getQfbj() {
		return qfbj;
	}
	public void setQfbj(int qfbj) {
		this.qfbj = qfbj;
	}
	public Date getQfrq() {
		return qfrq;
	}
	public void setQfrq(Date qfrq) {
		this.qfrq = qfrq;
	}
	public String getCzrm() {
		if(czrm==null){
			return "";
		}
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
	public String getSdrm() {
		if(sdrm==null){
			return "";
		}
		return sdrm;
	}
	public void setSdrm(String sdrm) {
		this.sdrm = sdrm;
	}
	public int getSdbj() {
		return sdbj;
	}
	public void setSdbj(int sdbj) {
		this.sdbj = sdbj;
	}
	public Date getSdrq() {
		return sdrq;
	}
	public void setSdrq(Date sdrq) {
		this.sdrq = sdrq;
	}
	public String getQyrm() {
		if(qyrm==null){
			return "";
		}
		return qyrm;
	}
	public void setQyrm(String qyrm) {
		this.qyrm = qyrm;
	}
	public int getQybj() {
		return qybj;
	}
	public void setQybj(int qybj) {
		this.qybj = qybj;
	}
	public Date getQyrq() {
		return qyrq;
	}
	public void setQyrq(Date qyrq) {
		this.qyrq = qyrq;
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
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
	public Date getGdrq() {
		return gdrq;
	}
	public void setGdrq(Date gdrq) {
		this.gdrq = gdrq;
	}
	public String getGdrm() {
		if(gdrm==null){
			return "";
		}
		return gdrm;
	}
	public void setGdrm(String gdrm) {
		this.gdrm = gdrm;
	}
}
