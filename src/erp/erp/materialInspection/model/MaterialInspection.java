package erp.erp.materialInspection.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class MaterialInspection extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private float			wtdh;
	private float			wtxh;
	private String			wtbm;
	private String			clhh;
	private String			wtlb;
	private String			wtrm;
	private String			hth;
	private String			ddh;
	private Date			wtrq;
	private float			htbh;
	private float			htxh;
	private String			csbh;
	private Date			llrq;
	private float			sjsl;
	private String			jldw;
	private int			sdbj;
	private String			sdrm;
	private Date			sdsj;
	private int			jybj;
	private int			gdbj;
	private int			gdbj_pd;
	private String			czym;
	private Date			czsj;
	private int			shbj;
	private String			ckbh;
	private float			dhdh;
	private float			dhxh;
	private String			bzsm;
	private String			wth;
	private Date			jysj;
	private Date			shsj;
	private String			csmd;
	private String			csjg;
	private String			cslx;
	private String			clmc;
	private String			csmc;
	private String			wtlbmc;
	private String			csjgmc;
	private String			plmth;
	private String			plmtx;
	private String			checked;
	private String			cghtyq;
	private int			qfbj;
	private String			qfrm;
	private Date			qfsj;
	private String			jjcd;
    private Integer          id;

    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCghtyq() {
		if(cghtyq==null){
			return "";
		}
		return cghtyq;
	}
	public void setCghtyq(String cghtyq) {
		this.cghtyq = cghtyq;
	}
	public String getWth() {
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
	public String getCsjgmc() {
		return csjgmc;
	}
	public void setCsjgmc(String csjgmc) {
		this.csjgmc = csjgmc;
	}
	public String getWtlbmc() {
		return wtlbmc;
	}
	public void setWtlbmc(String wtlbmc) {
		this.wtlbmc = wtlbmc;
	}
	public String getCsmc() {
		return csmc;
	}
	public void setCsmc(String csmc) {
		this.csmc = csmc;
	}
	public float getWtxh() {
		return wtxh;
	}
	public void setWtxh(float wtxh) {
		this.wtxh = wtxh;
	}
	public String getHth() {
		return hth;
	}
	public void setHth(String hth) {
		this.hth = hth;
	}
	public String getDdh() {
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
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
	public float getWtdh() {
		return wtdh;
	}
	public void setWtdh(float wtdh) {
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
	public String getClhh() {
		if(clhh==null){
			return "";
		}
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public float getHtbh() {
		return htbh;
	}
	public void setHtbh(float htbh) {
		this.htbh = htbh;
	}
	public float getHtxh() {
		return htxh;
	}
	public void setHtxh(float htxh) {
		this.htxh = htxh;
	}
	public String getCsbh() {
		if(csbh==null){
			return "";
		}
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public Date getLlrq() {
		return llrq;
	}
	public void setLlrq(Date llrq) {
		this.llrq = llrq;
	}
	public float getSjsl() {
		return sjsl;
	}
	public void setSjsl(float sjsl) {
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
		}
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
	public float getDhdh() {
		return dhdh;
	}
	public void setDhdh(float dhdh) {
		this.dhdh = dhdh;
	}
	public float getDhxh() {
		return dhxh;
	}
	public void setDhxh(float dhxh) {
		this.dhxh = dhxh;
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
	public Date getShsj() {
		return shsj;
	}
	public void setShsj(Date shsj) {
		this.shsj = shsj;
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
		if(cslx==null){
			return "";
		}
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
		}
		return qfrm;
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
	public String getJjcd() {
		if(jjcd==null){
			return "";
		}
		return jjcd;
	}
	public void setJjcd(String jjcd) {
		this.jjcd = jjcd;
	}
}
