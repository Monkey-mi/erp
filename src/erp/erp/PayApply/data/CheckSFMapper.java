/**  
* @Title: CheckSFMapper.java
* @Package erp.erp.PayApply.data
* @Description: TODO
* @author 舒飞
* @date 2016-6-17 下午5:15:25 
*/ 
package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.ContractDetail2;
import erp.erp.PayApply.model.Hddw;
import erp.erp.PayApply.model.ZtdwPayApply;

public interface CheckSFMapper {
	public Double getZyze(Map<String,Object> params);
	public Double getJznf(Map<String,Object> params);
	public Double getCsyfze(Map<String,Object> params);
	public Double getYsqje(Map<String,Object> params);
	public List<Hddw> getHddw(Map<String,Object> params);
	public String getHddw2(Map<String,Object> params);
	public String getCsmc(Map<String,Object> params);
	int getLLcount(Map<String,Object> params); 
	Integer getLsSpbj(Map<String,Object> params);
	public String getStringFromSql(Map<String,Object> params);
	public int getSyyfbj(Map<String,Object> params);
	public int getLSyyfbj(Map<String,Object> params);	
	public List<ZtdwPayApply> getZtdwList(Map<String,Object> params);
	public List<Hddw> getSkdwLists(Map<String,Object> params);
	public List<ContractDetail2> getContractDetailList(Map<String,Object> params);
	public int getDeletePayApply(Map<String,Object> params);
	void update_oainfo(Integer ll_requestid);
}
