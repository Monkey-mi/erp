package erp.erp.manufacturer.payAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.NoUpInStorageMapper;
import erp.erp.manufacturer.payAccount.data.NoUpPaymentMapper;
import erp.erp.manufacturer.payAccount.model.Ckmcb_yl;
import erp.erp.manufacturer.payAccount.model.NoUpInStorage;
import erp.erp.manufacturer.payAccount.model.NoUpPayment;
@Service
public class NoUpToService {
    @Autowired
	private NoUpInStorageMapper noUpInStorageMapper;
    @Autowired
	private NoUpPaymentMapper noUpPaymentMapper;
    
    public List<NoUpInStorage> getNoUpInStorage(Map<String,Object> params){
    	return noUpInStorageMapper.getNoUpInStorage(params);
    }
    public List<Ckmcb_yl> getCkmc(Map<String,Object> params){
    	return noUpInStorageMapper.getCkmc(params);
    }
    public List<NoUpPayment> getNoUpPayment(Map<String,Object> params){
    	return noUpPaymentMapper.getNoUpPayment(params);
    }
}
