package erp.erp.companyQuot.data;

import java.util.List;
import java.util.Map;

import erp.erp.companyQuot.model.CompanyQuot;
import erp.erp.companyQuot.model.CompanyQuotFile;


public interface CompanyQuotMapper {
	public List<CompanyQuot> getCompanyQuotList(Map<String,Object> params);
	public void addCompanyQuot(CompanyQuot obj);
	public void updateCompanyQuot(CompanyQuot obj);
	public void deleteCompanyQuot(CompanyQuot obj);
	public void deleteDetail(CompanyQuot obj);
	Integer getwbbjcp();
	Integer getSpbj(Map<String,Object> params);
	//明细是否全部锁定、审核
	Integer ifAllsd(Map<String,Object> params);
	Integer ifAllsh(Map<String,Object> params);
	Integer getllcount(Map<String,Object> params);
	String getWbbh(Map<String,Object> params);
	int getCompanyQuotOne();
	void updateGdbj(Map<String,Object> params);
 	void updateSdbj(Map<String,Object> params);
 	void updateShbj(Map<String,Object> params);
 	void updateCsjj(Map<String,Object> params);
 	void updateCsjjsp(Map<String,Object> params);
 	void updateMainSdbj(Map<String,Object> params);
 	void updateMainShbj(Map<String,Object> params);
 	//价格更新标记
 	void updateGxbj_jg(Map<String,Object> params);
 	void insertCsjjb(Map<String,Object> params);
 	void doAppro(Map<String,Object> params);
}
