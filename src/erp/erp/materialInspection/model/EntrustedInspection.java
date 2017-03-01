package erp.erp.materialInspection.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class EntrustedInspection extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private double			wtdh;
	private double			wtxh;
	private String			wtbm;
	private String			wtlbmc;
	private String			khbh;
	private String			wtlb;
	private String			wtrm;
	private Date			wtrq;
	private Date			llrq;
	private double			sjsl;
	private double			sjdh;
	private double			sjxh;
	private String			jldw;
	private String			cpbh;
	private String			ddh;
	private String			sjh;
	private int			sdbj;
	private String			sdrm;
	private Date			sdsj;
	private int			jybj;
	private int			gdbj;
	private int			gdbj_pd;
	private String			czym;
	private String			plmth;
	private String			plmtx;
	private Date			czsj;
	private int			shbj;
	private String			ckbh;
	private String			bzsm;
	private Date			jysj;
	private String			csmd;
	private String			csjg;
	private String			csjgmc;
	private String			cslx;
	private String			khmc;
	private int			qfbj;
	private String			qfrm;
	private String			checked;
	private String			wth;
	private String			cpmc;
	private Date			qfsj;
    
	public String getCsjgmc() {
		return csjgmc;
	}
	public void setCsjgmc(String csjgmc) {
		this.csjgmc = csjgmc;
	}
	public String getCpmc() {
		if(cpmc==null){
			return "";
		}
		return cpmc;
	}
	public void setCpmc(String cpmc) {
		this.cpmc = cpmc;
	}
	public String getWth() {
		if(wth==null){
			return "";
		}
		return wth;
	}
	public void setWth(String wth) {
		this.wth = wth;
	}
	public String getChecked() {
		return checked;
	}
	public void setChecked(String checked) {
		this.checked = checked;
	}
	public String getCpbh() {
		if(cpbh==null){
			return "";
		}
		return cpbh;
	}
	public void setCpbh(String cpbh) {
		this.cpbh = cpbh;
	}
	public String getWtlbmc() {
		return wtlbmc;
	}
	public void setWtlbmc(String wtlbmc) {
		this.wtlbmc = wtlbmc;
	}
	public double getWtxh() {
		return wtxh;
	}
	public void setWtxh(double wtxh) {
		this.wtxh = wtxh;
	}
	public String getKhbh() {
		if(khbh==null){
			return "";
		}
		return khbh;
	}
	public void setKhbh(String khbh) {
		this.khbh = khbh;
	}
	public double getSjdh() {
		return sjdh;
	}
	public void setSjdh(double sjdh) {
		this.sjdh = sjdh;
	}
	public double getSjxh() {
		return sjxh;
	}
	public void setSjxh(double sjxh) {
		this.sjxh = sjxh;
	}
	public String getDdh() {
		if(ddh==null){
			return "";
		}
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public String getSjh() {
		if(sjh==null){
			return "";
		}
		return sjh;
	}
	public void setSjh(String sjh) {
		this.sjh = sjh;
	}
	public String getPlmth() {
		if(plmth==null){
			return "";
		}
		return plmth;
	}
	public void setPlmth(String plmth) {
		this.plmth = plmth;
	}
	public String getPlmtx() {
		if(plmtx==null){
			return "";
		}
		return plmtx;
	}
	public void setPlmtx(String plmtx) {
		this.plmtx = plmtx;
	}
	public String getKhmc() {
		if(khmc==null){
			return "";
		}
		return khmc;
	}
	public void setKhmc(String khmc) {
		this.khmc = khmc;
	}
	public double getWtdh() {
		return wtdh;
	}
	public void setWtdh(double wtdh) {
		this.wtdh = wtdh;
	}
	public String getWtbm() {
		if(wtbm==null){
			return "";
		}
		return wtbm;
	}
	public void setWtbm(String wtbm) {
		this.wtbm = wtbm;
	}
	public String getWtlb() {
		if(wtlb==null){
			return "";
		}
		return wtlb;
	}
	public void setWtlb(String wtlb) {
		this.wtlb = wtlb;
	}
	public String getWtrm() {
		if(wtrm==null){
			return "";
		}
		return wtrm;
	}
	public void setWtrm(String wtrm) {
		this.wtrm = wtrm;
	}
	public Date getWtrq() {
		return wtrq;
	}
	public void setWtrq(Date wtrq) {
		this.wtrq = wtrq;
	}
	
	
	public Date getLlrq() {
		return llrq;
	}
	public void setLlrq(Date llrq) {
		this.llrq = llrq;
	}
	public double getSjsl() {
		return sjsl;
	}
	public void setSjsl(double sjsl) {
		this.sjsl = sjsl;
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
	public int getSdbj() {
		return sdbj;
	}
	public void setSdbj(int sdbj) {
		this.sdbj = sdbj;
	}
	public String getSdrm() {
		if(sdrm==null){
			return "";
		}else{
		return sdrm;
		}
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
	public int getJybj() {
		return jybj;
	}
	public void setJybj(int jybj) {
		this.jybj = jybj;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
	public int getGdbj_pd() {
		return gdbj_pd;
	}
	public void setGdbj_pd(int gdbj_pd) {
		this.gdbj_pd = gdbj_pd;
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
	public Date getCzsj() {
		return czsj;
	}
	public void setCzsj(Date czsj) {
		this.czsj = czsj;
	}
	public int getShbj() {
		return shbj;
	}
	public void setShbj(int shbj) {
		this.shbj = shbj;
	}
	public String getCkbh() {
		if(ckbh==null){
			return "";
		}
		return ckbh;
	}
	public void setCkbh(String ckbh) {
		this.ckbh = ckbh;
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
	public Date getJysj() {
		return jysj;
	}
	public void setJysj(Date jysj) {
		this.jysj = jysj;
	}
	public String getCsmd() {
		if(csmd==null){
			return "";
		}
		return csmd;
	}
	public void setCsmd(String csmd) {
		this.csmd = csmd;
	}
	public String getCsjg() {
		if(csjg==null){
			return "";
		}
		return csjg;
	}
	public void setCsjg(String csjg) {
		this.csjg = csjg;
	}
	public String getCslx() {
		return cslx;
	}
	public void setCslx(String cslx) {
		this.cslx = cslx;
	}
	public int getQfbj() {
		return qfbj;
	}
	public void setQfbj(int qfbj) {
		this.qfbj = qfbj;
	}
	public String getQfrm() {
		if(qfrm==null){
			return "";
		}else{
		return qfrm;
		}
		
	}
	public void setQfrm(String qfrm) {
		this.qfrm = qfrm;
	}
	public Date getQfsj() {
		return qfsj;
	}
	public void setQfsj(Date qfsj) {
		this.qfsj = qfsj;
	}
	
}
