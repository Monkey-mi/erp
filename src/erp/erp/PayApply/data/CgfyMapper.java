package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.Cgfy;


public interface CgfyMapper {
	public List<Cgfy> getCgfyList(Map<String,Object> params);
	public void addCgfy(Cgfy obj);
	public void updateCgfy(Cgfy obj);
	public void deleteCgfy(Cgfy obj);
}
