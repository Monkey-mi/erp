package erp.erp.master.enumType.model;

import java.io.Serializable;

import erp.common.Model;

public class EnumType extends Model implements Serializable{
	/*功能：系统枚举类型模型
	 *作者：伍恰
	 *时间：2016/03/02
	 *数据库名：sysmjb
	 * */
	private static final long serialVersionUID = 1L;
	private String			mjbh;
	private String			mjms;
	private String			mjxl;
	private String			mjbz;
	private String			ckbt;
	private int			zzid;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getMjbh() {
		return mjbh;
	}
	public void setMjbh(String mjbh) {
		this.mjbh = mjbh;
	}
	public String getMjms() {
		return mjms;
	}
	public void setMjms(String mjms) {
		this.mjms = mjms;
	}
	public int getMjxl() {
		return Integer.parseInt(mjxl);
	}
	public void setMjxl(String mjxl) {
		this.mjxl = mjxl;
	}
	public String getMjbz() {
		return mjbz;
	}
	public void setMjbz(String mjbz) {
		this.mjbz = mjbz;
	}
	public String getCkbt() {
		return ckbt;
	}
	public void setCkbt(String ckbt) {
		this.ckbt = ckbt;
	}
	public int getZzid() {
		return zzid;
	}
	public void setZzid(int zzid) {
		this.zzid = zzid;
	}
}
