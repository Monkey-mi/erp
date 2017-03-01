package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.SubmitObject;


public interface SubmitObjectMapper {
	public List<SubmitObject> getSubmitObjectList(Map<String,Object> params);
	public void addSubmitObject(SubmitObject obj);
	public void updateSubmitObject(SubmitObject obj);
	public void deleteSubmitObject(SubmitObject obj);
	public List<SubmitObject> getOperatorList(Map<String, Object> params);
}
