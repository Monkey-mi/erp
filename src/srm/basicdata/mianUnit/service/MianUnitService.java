package srm.basicdata.mianUnit.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.basicdata.mianUnit.data.MianUnitMapper;
import srm.basicdata.mianUnit.model.MianUnit;

/**主体单位类目*/
@Service
public class MianUnitService {
	@Autowired
	private MianUnitMapper mapper;


	public List<MianUnit> getMianUnitList(Map<String,Object> params) {
		return mapper.getMianUnitList(params);
	}
	public void addMianUnit(MianUnit[] arr) {
		for(MianUnit obj: arr) {
			mapper.addMianUnit(obj);
		}
	}
	public void updateMianUnit(MianUnit[] arr) {
		for(MianUnit obj: arr) {
			mapper.updateMianUnit(obj);
		}
	}
	public void deleteMianUnit(MianUnit[] arr) {
		for(MianUnit obj: arr) {
			mapper.deleteMianUnit(obj);
		}
	}
}
