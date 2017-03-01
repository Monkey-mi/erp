package erp.erp.manufacturer.payAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.CreatePayPlanFormMapper;
import erp.erp.manufacturer.payAccount.data.CreatePayPlanGridMapper;
import erp.erp.manufacturer.payAccount.model.CreatePayPlanForm;
import erp.erp.manufacturer.payAccount.model.CreatePayPlanGrid;

@Service
public class CreatePayPlanGridService {

@Autowired
private CreatePayPlanGridMapper createPayPlanGridMapper;
@Autowired
private CreatePayPlanFormMapper createPayPlanFormMapper;

public List<CreatePayPlanGrid> getCreatePayPlanGrid(Map<String,Object> params){
	return createPayPlanGridMapper.getCreatePayPlanGrid(params);
}
public void addCreatePayPlanGrid(CreatePayPlanGrid[] arr){
	for(CreatePayPlanGrid obj:arr){
		createPayPlanGridMapper.addCreatePayPlanGrid(obj);
	}
}
public void updateCreatePayPlanGrid(CreatePayPlanGrid[] arr){
	for(CreatePayPlanGrid obj:arr){
		createPayPlanGridMapper.updateCreatePayPlanGrid(obj);
	}
}
public void deleteCreatePayPlanGrid(CreatePayPlanGrid[] arr){
	for(CreatePayPlanGrid obj:arr){
		createPayPlanGridMapper.deleteCreatePayPlanGrid(obj);
	}
}

public List<CreatePayPlanForm> getCreatePayPlanForm(Map<String,Object> params){
	return createPayPlanFormMapper.getCreatePayPlanForm(params);
}
public int getMaxjhbh(Map<String,Object> params){
	return createPayPlanFormMapper.getMaxjhbh(params);
}
public List<CreatePayPlanForm> getldt(Map<String,Object> params){
	return createPayPlanFormMapper.getldt(params);
}

public void addCreatePayPlanForm(CreatePayPlanForm[] arr){
	for(CreatePayPlanForm obj:arr){
		createPayPlanFormMapper.addCreatePayPlanForm(obj);
	}
}
public void updateCreatePayPlanForm(CreatePayPlanForm[] arr){
	for(CreatePayPlanForm obj:arr){
		createPayPlanFormMapper.updateCreatePayPlanForm(obj);
	}
}
public void deleteCreatePayPlanForm(CreatePayPlanForm[] arr){
	for(CreatePayPlanForm obj:arr){
		createPayPlanFormMapper.deleteCreatePayPlanForm(obj);
	}
}

}
