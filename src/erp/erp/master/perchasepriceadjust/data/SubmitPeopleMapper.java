package erp.erp.master.perchasepriceadjust.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.perchasepriceadjust.model.Czybmlbb;
import erp.erp.master.perchasepriceadjust.model.SubmitPeople;


public interface SubmitPeopleMapper {
	public List<SubmitPeople> getSubmitPeopleList(Map<String,Object> params);
	public void addSubmitPeople(SubmitPeople obj);
	public void updateSubmitPeople(SubmitPeople obj);
	public void deleteSubmitPeople(SubmitPeople obj);
	public List<Czybmlbb> getAllCzybmList(Map<String,Object> params);
	int getLl_id(Map<String,Object> params);
	String getLs_gzgw_tj(Map<String,Object> params);
	String getLsGzgwTjdx(Map<String,Object> params);
	public void getIntFromSql(Map<String,Object> params);
}
