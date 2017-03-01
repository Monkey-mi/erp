package erp.common.main.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.main.data.ContentMapper;
import erp.common.model.ContentPermit;



@Service
public class ContentService {
	@Autowired
	private ContentMapper contentMapper;
	
	public List<ContentPermit> getCPList(Map<String,Object> paramsMap){
		return contentMapper.getCPList(paramsMap);
	}
	@Transactional
	public void addCP(ContentPermit[] cps){
		for (ContentPermit cp : cps) {
			contentMapper.addCP(cp);
		}
	}
	@Transactional
	public void updateCP(ContentPermit[] cps){
		for (ContentPermit cp : cps) {
			contentMapper.updateCP(cp);
		}
	}
	
	
	
	@Transactional
	public void deleteCP(ContentPermit[] cps){
		for (ContentPermit cp : cps) {
			contentMapper.deleteCP(cp);
		}
	}
	
	@Transactional
	public void deleteCPById(ContentPermit[] cps){
		for(ContentPermit item:cps){
			contentMapper.deleteCPById(item);
		}
	}	
}
