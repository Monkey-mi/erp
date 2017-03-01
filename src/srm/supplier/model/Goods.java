package srm.supplier.model;

import java.io.Serializable;

import erp.common.Model;


public class Goods extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -5238493296686673425L;
	private int			goods_id;
	private String			goods_name;
	private String			goods_brand;
	private int			company_id;
	private int			mc_id;
    private int         record_id;
    private int         goods_out_id;
    
    
	public int getGoods_out_id() {
		return goods_out_id;
	}
	public void setGoods_out_id(int goods_out_id) {
		this.goods_out_id = goods_out_id;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}

	public int getGoods_id() {
		return goods_id;
	}
	public void setGoods_id(int goods_id) {
		this.goods_id = goods_id;
	}
	public String getGoods_name() {
		return goods_name;
	}
	public void setGoods_name(String goods_name) {
		this.goods_name = goods_name;
	}
	
	public String getGoods_brand() {
		return goods_brand;
	}
	public void setGoods_brand(String goods_brand) {
		this.goods_brand = goods_brand;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public int getMc_id() {
		return mc_id;
	}
	public void setMc_id(int mc_id) {
		this.mc_id = mc_id;
	}
}
