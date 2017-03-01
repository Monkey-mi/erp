package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.Cslb;

public interface CslbMapper {
  public List<Cslb> getCslb(Map<String,Object> params);
}
