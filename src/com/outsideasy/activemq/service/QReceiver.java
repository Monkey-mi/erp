package com.outsideasy.activemq.service;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;

import org.springframework.stereotype.Component;

import com.outsideasy.activemq.model.PurchaseOrderSender;

@Component
public class QReceiver implements MessageListener{

	@Override
	public void onMessage(Message message) {
		try {
			/*System.out.println("QueueReceiver2接收到消息:"+((TextMessage)message).getText());*/
			ObjectMessage objmsg=(ObjectMessage) message;
			PurchaseOrderSender purchaseOrderVo=(PurchaseOrderSender)objmsg.getObject();
			System.out.println("QueueReceiver1接收到消息:"+purchaseOrderVo.getPur_order_id());
			System.out.println("****:"+purchaseOrderVo.toString());
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}

}
