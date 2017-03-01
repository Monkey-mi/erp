package srm.supplier.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import srm.supplier.data.AttchedMapper;
import srm.supplier.model.Attched;


@Service
public class AttchedService {
	@Autowired
	private AttchedMapper mapper;


	public List<Attched> getAttchedList(Map<String,Object> params) {
		return mapper.getAttchedList(params);
	}
	@Transactional
	public void addAttched(Attched[] arr) {
		for(Attched obj: arr) {
			mapper.addAttched(obj);
		}
	}
	@Transactional
	public void updateAttched(Attched[] arr) {
		for(Attched obj: arr) {
			mapper.updateAttched(obj);
		}
	}
	@Transactional
	public void deleteAttched(Attched[] arr) {
		for(Attched obj: arr) {
			mapper.deleteAttched(obj);
		}
	}
	public Attched getFilePathByPathAndId(Integer id){
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("id", id);
		List<Attched> list=getAttchedList(params);
		return list.get(0);
	}
}
