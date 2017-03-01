package erp.erp.master.category.model;

import java.io.Serializable;

import erp.common.Model;

public class CategoryAuthority extends Model implements Serializable{
	/*功能：采购类别权限表
	 *作者：伍恰
	 *时间：2016/01/11
	 *数据库名：cglb_qxb
	 * */
	private static final long serialVersionUID = 1L;
	private String			lbbh;
	private String			czy_gh;
	private String			czy_xm;
	private int			tpbj;

	public String getLbbh() {
		return lbbh;
	}
	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}
	public String getCzy_gh() {
		return czy_gh;
	}
	public void setCzy_gh(String czy_gh) {
		this.czy_gh = czy_gh;
	}
	public String getCzy_xm() {
		return czy_xm;
	}
	public void setCzy_xm(String czy_xm) {
		this.czy_xm = czy_xm;
	}
	public int getTpbj() {
		return tpbj;
	}
	public void setTpbj(int tpbj) {
		this.tpbj = tpbj;
	}
}
