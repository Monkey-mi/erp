package erp.erp.manufacturer.payAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.CslbMapper;
import erp.erp.manufacturer.payAccount.model.Cslb;

@Service
public class CslbService {
 @Autowired	
 private CslbMapper cslbMapper;
 public List<Cslb> getCslb(Map<String,Object> params){
	 return cslbMapper.getCslb(params);
 }
}
