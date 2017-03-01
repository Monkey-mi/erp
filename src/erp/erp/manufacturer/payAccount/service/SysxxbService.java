package erp.erp.manufacturer.payAccount.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.SysxxbMapper;
import erp.erp.manufacturer.payAccount.model.Sysxxb;

@Service
public class SysxxbService {
	@Autowired
  private SysxxbMapper sysxxbMapper;
  public List<Sysxxb> getSysxxb(Map<String,Object> params){
	  return sysxxbMapper.getSysxxb(params);
  }
}
