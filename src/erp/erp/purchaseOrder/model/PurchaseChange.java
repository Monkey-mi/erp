package erp.erp.purchaseOrder.model;

import java.io.Serializable;

import erp.common.Model;

public class PurchaseChange extends Model implements Serializable{
	/*功能：采购更改明细
	 *作者：伍恰
	 *时间：2016/03/16
	 *数据库名：htgg_mxb等
	 * */
	private static final long serialVersionUID = 1L;
	private int			ggdh;
	private int			ggxh;
	private int			htbh;
	private int			htxh;
	private String			clhh;
	private String			cltx1;
	private String			cltx2;
	private String			cltx3;
	private String			jldw;
	private double			gqsl;
	private double			ggsl;
	private double			ghsl;
	private String			djxz;
	private double			gqdj;
	private double			ggdj;
	private double			ghdj;
	private double			gqje;
	private double			ggje;
	private double			ghje;
	private String			ggyy;
	private String			clmc;
	private String			hth;
	private String			plmth;
	private String			plmtx;

	public int getGgdh() {
		return ggdh;
	}
	public void setGgdh(int ggdh) {
		this.ggdh = ggdh;
	}
	public int getGgxh() {
		return ggxh;
	}
	public void setGgxh(int ggxh) {
		this.ggxh = ggxh;
	}
	public int getHtbh() {
		return htbh;
	}
	public void setHtbh(int htbh) {
		this.htbh = htbh;
	}
	public int getHtxh() {
		return htxh;
	}
	public void setHtxh(int htxh) {
		this.htxh = htxh;
	}
	public String getClhh() {
		return clhh;
	}
	public void setClhh(String clhh) {
		this.clhh = clhh;
	}
	public String getCltx1() {
		return cltx1;
	}
	public void setCltx1(String cltx1) {
		this.cltx1 = cltx1;
	}
	public String getCltx2() {
		return cltx2;
	}
	public void setCltx2(String cltx2) {
		this.cltx2 = cltx2;
	}
	public String getCltx3() {
		return cltx3;
	}
	public void setCltx3(String cltx3) {
		this.cltx3 = cltx3;
	}
	public String getJldw() {
		return jldw;
	}
	public void setJldw(String jldw) {
		this.jldw = jldw;
	}
	public double getGqsl() {
		return gqsl;
	}
	public void setGqsl(double gqsl) {
		this.gqsl = gqsl;
	}
	public double getGgsl() {
		return ggsl;
	}
	public void setGgsl(double ggsl) {
		this.ggsl = ggsl;
	}
	public double getGhsl() {
		return ghsl;
	}
	public void setGhsl(double ghsl) {
		this.ghsl = ghsl;
	}
	public String getDjxz() {
		return djxz;
	}
	public void setDjxz(String djxz) {
		this.djxz = djxz;
	}
	public double getGqdj() {
		return gqdj;
	}
	public void setGqdj(double gqdj) {
		this.gqdj = gqdj;
	}
	public double getGgdj() {
		return ggdj;
	}
	public void setGgdj(double ggdj) {
		this.ggdj = ggdj;
	}
	public double getGhdj() {
		return ghdj;
	}
	public void setGhdj(double ghdj) {
		this.ghdj = ghdj;
	}
	public double getGqje() {
		return gqje;
	}
	public void setGqje(double gqje) {
		this.gqje = gqje;
	}
	public double getGgje() {
		return ggje;
	}
	public void setGgje(double ggje) {
		this.ggje = ggje;
	}
	public double getGhje() {
		return ghje;
	}
	public void setGhje(double ghje) {
		this.ghje = ghje;
	}
	public String getGgyy() {
		return ggyy;
	}
	public void setGgyy(String ggyy) {
		this.ggyy = ggyy;
	}
	public String getClmc() {
		return clmc;
	}
	public void setClmc(String clmc) {
		this.clmc = clmc;
	}
	public String getHth() {
		return hth;
	}
	public void setHth(String hth) {
		this.hth = hth;
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
