package erp.common.main.data;

import java.util.List;
import java.util.Map;

import erp.common.model.BusinessObject;
import erp.common.model.BusinessRefTable;
import erp.common.model.BuzObjRule;
import erp.common.model.BuzObjectAttr;
import erp.common.model.BuzObjectPermit;
import erp.common.model.BuzObjectSvr;
import erp.common.model.RuleDetail;




public interface BusinessObjectMapper {
	//商业对象
	public List<BusinessObject> getBusinessObjectList(Map<String,Object> params);
	public void addBusinessObject(BusinessObject obj);
	public void updateBusinessObject(BusinessObject obj);
	public void deleteBusinessObject(BusinessObject obj);
	//商业对象映射
	public List<BusinessRefTable> getBusinessRefTableList(Map<String,Object> params);
	public void addBusinessRefTable(BusinessRefTable obj);
	public void updateBusinessRefTable(BusinessRefTable obj);
	public void deleteBusinessRefTable(BusinessRefTable obj);
	//商业对象属性
	public List<BuzObjectAttr> getBuzObjectAttrList(Map<String,Object> params);
	public void addBuzObjectAttr(BuzObjectAttr obj);
	public void updateBuzObjectAttr(BuzObjectAttr obj);
	public void deleteBuzObjectAttr(BuzObjectAttr obj);
	//获取授权商业对象元数据清单
    public List<BuzObjectAttr> getBuzFieldsListByModId(Map<String,Object> params);
    
	//权限规则表
	public List<BuzObjRule> getBuzObjRuleList(Map<String,Object> params);
	public void addBuzObjRule(BuzObjRule obj);
	public void updateBuzObjRule(BuzObjRule obj);
	public void deleteBuzObjRule(BuzObjRule obj);
	
	//商业对象权限
	public List<BuzObjectPermit> getBuzObjectPermitList(Map<String,Object> params);
	public void addBuzObjectPermit(BuzObjectPermit obj);
	public void updateBuzObjectPermit(BuzObjectPermit obj);
	public void deleteBuzObjectPermit(BuzObjectPermit obj);
	//获取可授权的角色列表
	public List<BuzObjectPermit> getUnPermitRoleList(Map<String,Object> params);
	//获取可授权的用户列表
	public List<BuzObjectPermit> getUnPermitUserList(Map<String,Object> params);
	//规则明细表
	public List<RuleDetail> getRuleDetailList(Map<String,Object> params);
	public void addRuleDetail(RuleDetail obj);
	public void updateRuleDetail(RuleDetail obj);
	public void deleteRuleDetail(RuleDetail obj);
	
	//商业对象服务方法
	public List<BuzObjectSvr> getBuzObjectSvrList(Map<String,Object> params);
    public void addBuzObjectSvr(BuzObjectSvr obj);
    public void updateBuzObjectSvr(BuzObjectSvr obj);
    public void deleteBuzObjectSvr(BuzObjectSvr obj);
}
