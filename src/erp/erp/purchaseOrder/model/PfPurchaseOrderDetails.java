package erp.erp.purchaseOrder.model;

import java.io.Serializable;

public class PfPurchaseOrderDetails implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int			order_detail_id;
	private int			pur_order_id;
	private double 		delivery_num;
	private double 		Storage_num;
	private double 		no_delivery_num;
	private double 		stay_back_num;
	private double 		stay_storage_num;
	private double 		stay_check_num;
	private double      retired_back_num;
	private double      stay_detail_num;
	
	public double getRetired_back_num() {
		return retired_back_num;
	}

	public void setRetired_back_num(double retired_back_num) {
		this.retired_back_num = retired_back_num;
	}

	public double getStay_detail_num() {
		return stay_detail_num;
	}

	public void setStay_detail_num(double stay_detail_num) {
		this.stay_detail_num = stay_detail_num;
	}

	public int getOrder_detail_id() {
		return order_detail_id;
	}

	public void setOrder_detail_id(int order_detail_id) {
		this.order_detail_id = order_detail_id;
	}

	public int getPur_order_id() {
		return pur_order_id;
	}

	public void setPur_order_id(int pur_order_id) {
		this.pur_order_id = pur_order_id;
	}

	public double getDelivery_num() {
		return delivery_num;
	}

	public void setDelivery_num(double delivery_num) {
		this.delivery_num = delivery_num;
	}

	public double getStorage_num() {
		return Storage_num;
	}

	public void setStorage_num(double storage_num) {
		Storage_num = storage_num;
	}

	public double getNo_delivery_num() {
		return no_delivery_num;
	}

	public void setNo_delivery_num(double no_delivery_num) {
		this.no_delivery_num = no_delivery_num;
	}

	public double getStay_back_num() {
		return stay_back_num;
	}

	public void setStay_back_num(double stay_back_num) {
		this.stay_back_num = stay_back_num;
	}

	public double getStay_storage_num() {
		return stay_storage_num;
	}

	public void setStay_storage_num(double stay_storage_num) {
		this.stay_storage_num = stay_storage_num;
	}

	public double getStay_check_num() {
		return stay_check_num;
	}

	public void setStay_check_num(double stay_check_num) {
		this.stay_check_num = stay_check_num;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setNo_delivery_num(int no_delivery_num) {
		this.no_delivery_num = no_delivery_num;
	}
	
}
