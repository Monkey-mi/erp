package erp.erp.master.perchasepriceadjust.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.perchasepriceadjust.model.Accountdept;
import erp.erp.master.perchasepriceadjust.model.Cgjgtzb;


public interface CgjgtzbMapper {
	public List<Cgjgtzb> getCgjgtzbList(Map<String,Object> params);
	public void addCgjgtzb(Cgjgtzb obj);
	public void updateCgjgtzb(Cgjgtzb obj);
	public void deleteCgjgtzb(Cgjgtzb obj);
	//核算部门树
	public List<Accountdept> getAllAccountdeptList(Map<String,Object> params);
	
	public int check_hdr_spbj(Cgjgtzb obj);
	public int check_bj(Cgjgtzb obj);
	public void update_qfbj(Map<String,Object> params);
	public void update_sdbj(Map<String,Object> params);
	public void update_tjbj(Map<String,Object> params);
	public void update_gdbj(Map<String,Object> params);
	
	//核算类别权限
	List<String> getAccountAuthorityList(Map<String,Object> params);
}
