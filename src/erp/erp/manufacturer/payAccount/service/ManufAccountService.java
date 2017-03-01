package erp.erp.manufacturer.payAccount.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.ViewCsyfMapper;
import erp.erp.manufacturer.payAccount.model.Viewcsyf;
import erp.util.TransUtil;

@Service
public class ManufAccountService {
@Autowired	
private ViewCsyfMapper viewCsyfMapper;

//获取本月最大截止时间
public Date getMaxJzrq(Map<String,Object> params){
	String year1 = params.get("year").toString();
	String month1 = params.get("month").toString();
	String jzrq = TransUtil.getMaxJzrq(year1, month1);
	Date maxJzrq = TransUtil.StringTransDate(jzrq);
	System.out.println(jzrq);
	System.out.println(jzrq);
	return maxJzrq;
}

public List<Viewcsyf> getmanufAccountDetial(Map<String,Object> params){
	//如果有usePaging分页会报错
	if(params.containsKey("usePaging")){
	params.remove("usePaging");}	
	List<Viewcsyf> viewcsyf = viewCsyfMapper.getmanufAccountDetial(params);
//	System.out.println(params.get("count"));
//	for (String key : params.keySet()) {
//		   System.out.println("key= "+ key + " and value= " + params.get(key));
//		  }
	//获取总条数total
	params.put("total", params.get("count"));
	return viewcsyf;
}
public void addmanufAccountDetial(Viewcsyf[] arr){
	for(Viewcsyf obj:arr){
		viewCsyfMapper.addmanufAccountDetial(obj);
	}
}
public void updatemanufAccountDetial(Viewcsyf[] arr){
	for(Viewcsyf obj:arr){
		viewCsyfMapper.updatemanufAccountDetial(obj);
	}
}
public void deletemanufAccountDetial(Viewcsyf[] arr){
	for(Viewcsyf obj:arr){
		viewCsyfMapper.deletemanufAccountDetial(obj);
	}
}

}
