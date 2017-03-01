package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Fpwd;


public interface FpwdMapper {
	public List<Fpwd> getFpwdList(Map<String,Object> params);
	public void addFpwd(Fpwd obj);
	public void updateFpwd(Fpwd obj);
	public void deleteFpwd(Fpwd obj);
}
