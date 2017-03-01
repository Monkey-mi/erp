/**  
* @Title: OutsideInformationService.java
* @Package srm.supplierAccess.service
* @Description: TODO
* @author 舒飞
* @date 2016-10-12 下午6:56:37 
*/ 
package srm.supplierAccess.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import srm.supplierAccess.data.OutsideInformationMapper;
@Service
public class OutsideInformationService {
	@Autowired
	private OutsideInformationMapper outsideInformationMapper;
	
	public String getWbbh(Map<String,Object> params){
		return outsideInformationMapper.getWbbh(params);
	}
	public String getWbdh(Map<String,Object> params){
		return outsideInformationMapper.getWbdh(params);
	}

}
