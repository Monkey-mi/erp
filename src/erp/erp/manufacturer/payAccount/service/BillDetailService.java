package erp.erp.manufacturer.payAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.BillDetailMapper;
import erp.erp.manufacturer.payAccount.model.BillDetail;

@Service
public class BillDetailService {
	
@Autowired	
private BillDetailMapper billDetailMapper;

public List<BillDetail> getBillDetailList(Map<String,Object> params){
	//检查
	List<BillDetail> list = billDetailMapper.getBillDetailList(params);
//	for(int i =0;i<list.size();i++ ){
//		list.get(i).getKcpj();
//		System.out.println("日期："+list.get(i).getRq()+"Kcpj:"+list.get(i).getKcpj()+"Pjyf:"+list.get(i).getPjyf()+"Yfpj:"+list.get(i).getYfpj());
//	}
	return billDetailMapper.getBillDetailList(params);
}


}
