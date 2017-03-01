package erp.common.main.data;

import java.util.List;
import java.util.Map;

import erp.common.model.SerialGenRule;
import erp.common.model.SerialRuleDetail;



public interface SerialGenRuleMapper {
    public List<SerialGenRule> getSerialRuleList(Map<String,Object> params);
    public void addSerialRule(SerialGenRule obj);
    public void updateSerialRule(SerialGenRule obj);
    public void deleteSerialRule(SerialGenRule obj);
    
    public List<SerialRuleDetail> getSerialRuleDetailList(Map<String,Object> params);
    public void addSerialRuleDetail(SerialRuleDetail obj);
    public void updateSerialRuleDetail(SerialRuleDetail obj);
    public void deleteSerialRuleDetail(SerialRuleDetail obj);
    void deleteSerialRuleDetailByRuleId(int srId);
}
