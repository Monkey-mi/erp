package erp.erp.PayApply.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.PayApply.data.SubmitObjectMapper;
import erp.erp.PayApply.model.SubmitObject;


@Service
public class SubmitObjectService {
	@Autowired
	private SubmitObjectMapper mapper;


	public List<SubmitObject> getSubmitObjectList(Map<String,Object> params) {
		return mapper.getSubmitObjectList(params);
	}
	public List<SubmitObject> getOperatorList(Map<String,Object> params) {
		return mapper.getOperatorList(params);
	}
	public void addSubmitObject(SubmitObject[] arr) {
		for(SubmitObject obj: arr) {
			mapper.addSubmitObject(obj);
		}
	}
	public void updateSubmitObject(SubmitObject[] arr) {
		for(SubmitObject obj: arr) {
			mapper.updateSubmitObject(obj);
		}
	}
	public void deleteSubmitObject(SubmitObject[] arr) {
		for(SubmitObject obj: arr) {
			mapper.deleteSubmitObject(obj);
		}
	}
}
