package erp.erp.materialQualityTesting.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.materialQualityTesting.data.CghtbMapper;
import erp.erp.materialQualityTesting.data.WtjycssqclmxbMapper;
import erp.erp.materialQualityTesting.model.Wtjycssqclmxb;


@Service
public class WtjycssqclmxbService {
	@Autowired
	private WtjycssqclmxbMapper wtjycssqclmxbMapper;
	
	@Autowired
	private CghtbMapper cghtbMapper;

	public String getCghtb(Map<String,Object> params){
		return cghtbMapper.getCghtb(params);
	}
	
	public List<Wtjycssqclmxb> getwtjycssqclmxbList(Map<String,Object> params) {
		return wtjycssqclmxbMapper.getwtjycssqclmxbList(params);
	}
	public void addwtjycssqclmxb(Wtjycssqclmxb[] arr) {
		for(Wtjycssqclmxb obj: arr) {
			wtjycssqclmxbMapper.addwtjycssqclmxb(obj);
		}
	}
	public void updatewtjycssqclmxb(Wtjycssqclmxb[] arr) {
		for(Wtjycssqclmxb obj: arr) {
			wtjycssqclmxbMapper.updatewtjycssqclmxb(obj);
		}
	}
	public void deletewtjycssqclmxb(Wtjycssqclmxb[] arr) {
		for(Wtjycssqclmxb obj: arr) {
			wtjycssqclmxbMapper.deletewtjycssqclmxb(obj);
		}
	}
	
	public void addCghtb(Wtjycssqclmxb[] arr){
		for(Wtjycssqclmxb obj: arr) {
			cghtbMapper.addCghtb(obj);
		}
	}
	public void updateCghtb(Wtjycssqclmxb[] arr){
		for(Wtjycssqclmxb obj: arr) {
			cghtbMapper.updateCghtb(obj);
		}
	}
	public void deleteCghtb(Wtjycssqclmxb[] arr){
		for(Wtjycssqclmxb obj: arr) {
			cghtbMapper.deleteCghtb(obj);
		}
	}
	
	
}
