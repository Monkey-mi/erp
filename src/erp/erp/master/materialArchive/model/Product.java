package erp.erp.master.materialArchive.model;

import java.io.Serializable;

import erp.common.Model;

public class Product extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
     private  String ggdh;
     private  String bbbh;
     private  String cpbh;
     private  String cpmc;
     private  int gdbj;
     private  String plmth;
     private  String plmtx;
	public String getGgdh() {
		return ggdh;
	}
	public void setGgdh(String ggdh) {
		this.ggdh = ggdh;
	}
	public String getBbbh() {
		return bbbh;
	}
	public void setBbbh(String bbbh) {
		this.bbbh = bbbh;
	}
	public String getCpbh() {
		return cpbh;
	}
	public void setCpbh(String cpbh) {
		this.cpbh = cpbh;
	}
	public String getCpmc() {
		return cpmc;
	}
	public void setCpmc(String cpmc) {
		this.cpmc = cpmc;
	}
	public int getGdbj() {
		return gdbj;
	}
	public void setGdbj(int gdbj) {
		this.gdbj = gdbj;
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
