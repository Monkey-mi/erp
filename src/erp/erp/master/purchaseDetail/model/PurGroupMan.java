package erp.erp.master.purchaseDetail.model;

import java.io.Serializable;

import erp.common.Model;


public class PurGroupMan extends Model implements Serializable{
	/*功能：采购员名
	 *作者：伍恰
	 *时间：2016/01/26
	 *数据库名：cgyb
	 * */
	private static final long serialVersionUID = 1L;
	private String			cgybh;
	private String			cgyxm;
	private String			bzsm;
	private String			czy_gh;
	private int			gdbj;
	private String ssbm;
	
	public String getSsbm() {
		return ssbm;
	}
	public void setSsbm(String ssbm) {
		this.ssbm = ssbm;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getCgybh() {
		return cgybh;
	}
	public void setCgybh(String cgybh) {
		this.cgybh = cgybh;
	}
	public String getCgyxm() {
		return cgyxm;
	}
	public void setCgyxm(String cgyxm) {
		this.cgyxm = cgyxm;
	}
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getCzy_gh() {
		return czy_gh;
	}
	public void setCzy_gh(String czy_gh) {
		this.czy_gh = czy_gh;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
	}
}
