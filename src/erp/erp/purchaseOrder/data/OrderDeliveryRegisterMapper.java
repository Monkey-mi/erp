package erp.erp.purchaseOrder.data;

import java.util.List;
import java.util.Map;

import erp.erp.purchaseOrder.model.OrderDeliveryRegister;


public interface OrderDeliveryRegisterMapper {
	public List<OrderDeliveryRegister> getOrderDeliveryRegisterList(Map<String,Object> params);
	public void addOrderDeliveryRegister(OrderDeliveryRegister obj);
	public void updateOrderDeliveryRegister(OrderDeliveryRegister obj);
	public void deleteOrderDeliveryRegister(OrderDeliveryRegister obj);
	//获取需要通知的操作员工号
	public List<String> getOperatorList(Map<String,Object> params);
}
