package erp.erp.master.perchasepriceadjust.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.perchasepriceadjust.model.Cgjgtzmxb;
import erp.erp.master.perchasepriceadjust.model.RkdbImp;


public interface CgjgtzmxbMapper {
	public List<Cgjgtzmxb> getCgjgtzmxbList(Map<String,Object> params);
	public void addCgjgtzmxb(Cgjgtzmxb obj);
	public void updateCgjgtzmxb(Cgjgtzmxb obj);
	public void deleteCgjgtzmxb(Cgjgtzmxb obj);
	public void deleteCgjgtzmxbBytjdh(Map<String,Object> params);
	public List<RkdbImp> getRkdbImpList(Map<String,Object> params);
}
