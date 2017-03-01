package erp.erp.purchaseOrder.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseOrder.model.OrderDeliveryAttached;


public interface OrderDeliveryAttachedMapper {
	public List<OrderDeliveryAttached> getOrderDeliveryAttachedList(Map<String,Object> params);
	public void addOrderDeliveryAttached(OrderDeliveryAttached obj);
	public void updateOrderDeliveryAttached(OrderDeliveryAttached obj);
	public void deleteOrderDeliveryAttached(OrderDeliveryAttached obj);
}
