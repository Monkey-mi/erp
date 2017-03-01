package erp.erp.purchaseOrder.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;

public class ProductDescImp extends Model implements Serializable{
	/*功能：产品描述导入
	 *作者：伍恰
	 *时间：2016/04/15
	 *数据库名：ddmxb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			ddbh;
	private int			ddxh;
	private String			cpbh;
	private String			cptx1;
	private String			cptx2;
	private String			cptx3;
	private String			jldw;
	private double			dhsl;
	private double			bssl;
	private double			bzdj;
	private double			xszk;
	private double			xsdj;
	private double			xsje;
	private double			zzsl;
	private double			csdj;
	private double			csje;
	private double			zzse;
	private String			wbbh;
	private double			wbhl;
	private double			wbdj;
	private double			wbje;
	private double			dhxs;
	private double			mxzs;
	private String			cpbz;
	private Date			chrq;
	private String			cpmc;
	private String			cpth;
	private String			ddh;
	private String			khxh;
	private String			plmth;
	private String			plmtx;
	private int msxh;
	private String cpms;
	
	
	public int getMsxh() {
		return msxh;
	}
	public void setMsxh(int msxh) {
		this.msxh = msxh;
	}
	public String getCpms() {
		return cpms;
	}
	public void setCpms(String cpms) {
		this.cpms = cpms;
	}
	public int getDdbh() {
		return ddbh;
	}
	public void setDdbh(int ddbh) {
		this.ddbh = ddbh;
	}
	public int getDdxh() {
		return ddxh;
	}
	public void setDdxh(int ddxh) {
		this.ddxh = ddxh;
	}
	public String getCpbh() {
		return cpbh;
	}
	public void setCpbh(String cpbh) {
		this.cpbh = cpbh;
	}
	public String getCptx1() {
		return cptx1;
	}
	public void setCptx1(String cptx1) {
		this.cptx1 = cptx1;
	}
	public String getCptx2() {
		return cptx2;
	}
	public void setCptx2(String cptx2) {
		this.cptx2 = cptx2;
	}
	public String getCptx3() {
		return cptx3;
	}
	public void setCptx3(String cptx3) {
		this.cptx3 = cptx3;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public double getDhsl() {
		return dhsl;
	}
	public void setDhsl(double dhsl) {
		this.dhsl = dhsl;
	}
	public double getBssl() {
		return bssl;
	}
	public void setBssl(double bssl) {
		this.bssl = bssl;
	}
	public double getBzdj() {
		return bzdj;
	}
	public void setBzdj(double bzdj) {
		this.bzdj = bzdj;
	}
	public double getXszk() {
		return xszk;
	}
	public void setXszk(double xszk) {
		this.xszk = xszk;
	}
	public double getXsdj() {
		return xsdj;
	}
	public void setXsdj(double xsdj) {
		this.xsdj = xsdj;
	}
	public double getXsje() {
		return xsje;
	}
	public void setXsje(double xsje) {
		this.xsje = xsje;
	}
	public double getZzsl() {
		return zzsl;
	}
	public void setZzsl(double zzsl) {
		this.zzsl = zzsl;
	}
	public double getCsdj() {
		return csdj;
	}
	public void setCsdj(double csdj) {
		this.csdj = csdj;
	}
	public double getCsje() {
		return csje;
	}
	public void setCsje(double csje) {
		this.csje = csje;
	}
	public double getZzse() {
		return zzse;
	}
	public void setZzse(double zzse) {
		this.zzse = zzse;
	}
	public String getWbbh() {
		return wbbh;
	}
	public void setWbbh(String wbbh) {
		this.wbbh = wbbh;
	}
	public double getWbhl() {
		return wbhl;
	}
	public void setWbhl(double wbhl) {
		this.wbhl = wbhl;
	}
	public double getWbdj() {
		return wbdj;
	}
	public void setWbdj(double wbdj) {
		this.wbdj = wbdj;
	}
	public double getWbje() {
		return wbje;
	}
	public void setWbje(double wbje) {
		this.wbje = wbje;
	}
	public double getDhxs() {
		return dhxs;
	}
	public void setDhxs(double dhxs) {
		this.dhxs = dhxs;
	}
	public double getMxzs() {
		return mxzs;
	}
	public void setMxzs(double mxzs) {
		this.mxzs = mxzs;
	}
	public String getCpbz() {
		return cpbz;
	}
	public void setCpbz(String cpbz) {
		this.cpbz = cpbz;
	}
	public Date getChrq() {
		return chrq;
	}
	public void setChrq(Date chrq) {
		this.chrq = chrq;
	}
	public String getCpmc() {
		return cpmc;
	}
	public void setCpmc(String cpmc) {
		this.cpmc = cpmc;
	}
	public String getCpth() {
		return cpth;
	}
	public void setCpth(String cpth) {
		this.cpth = cpth;
	}
	public String getDdh() {
		return ddh;
	}
	public void setDdh(String ddh) {
		this.ddh = ddh;
	}
	public String getKhxh() {
		return khxh;
	}
	public void setKhxh(String khxh) {
		this.khxh = khxh;
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
}
