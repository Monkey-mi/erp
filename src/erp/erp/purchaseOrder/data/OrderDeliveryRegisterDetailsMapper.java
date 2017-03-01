package erp.erp.purchaseOrder.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseOrder.model.OrderDeliveryRegisterDetails;


public interface OrderDeliveryRegisterDetailsMapper {
	public List<OrderDeliveryRegisterDetails> getOrderDeliveryRegisterDetailsList(Map<String,Object> params);
	public void addOrderDeliveryRegisterDetails(OrderDeliveryRegisterDetails obj);
	public void updateOrderDeliveryRegisterDetails(OrderDeliveryRegisterDetails obj);
	public void deleteOrderDeliveryRegisterDetails(OrderDeliveryRegisterDetails obj);
}
