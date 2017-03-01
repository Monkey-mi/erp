package erp.erp.master.enumType.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.enumType.data.EnumTypeMapper;
import erp.erp.master.enumType.model.EnumType;
@Service
public class EnumTypeService {
	@Autowired
	private EnumTypeMapper mapper;
	/*@Autowired 
	private ExpressCountryMapper expressCountryMapper;*/
	/**
	 * 获取枚举信息
	 * Request crm/enumtype.act?method=getEnumTypeList <br/><br/>
	 * Response {data:[{EnumType}]} <br/><br/>
	 * @param EnumTypeCtl {@link paramMap}
	 */
	public List<EnumType> getEnumTypeList(Map<String,Object> params) {
		return mapper.getEnumTypeList(params);
	}
	/**
	 * 新增枚举信息
	 * Request crm/enumtype.act?method=addEnumType <br/><br/>
	 * Response {data:[{EnumType}]} <br/><br/>
	 * @param EnumTypeCtl {@link paramMap}
	 */
	public void addEnumType(EnumType[] arr) {
		for(EnumType obj: arr) {
			mapper.addEnumType(obj);
		}
	}
	/**
	 * 更新枚举信息
	 * Request crm/enumtype.act?method=updateEnumType <br/><br/>
	 * Response {data:[{EnumType}]} <br/><br/>
	 * @param EnumTypeCtl {@link paramMap}
	 */
	public void updateEnumType(EnumType[] arr) {
		for(EnumType obj: arr) {
			mapper.updateEnumType(obj);
		}
	}
	/**
	 * 删除枚举信息
	 * Request crm/enumtype.act?method=deleteEnumType <br/><br/>
	 * Response {data:[{EnumType}]} <br/><br/>
	 * @param EnumTypeCtl {@link paramMap}
	 */
	public void deleteEnumType(EnumType[] arr) {
		for(EnumType obj: arr) {
			mapper.deleteEnumType(obj);
			//20150610 xf 
			/*if(obj.getMjbh().endsWith("0807")){//国别地区
				Map<String,Object> params=new HashMap<String,Object>();
				params.put("country_id", obj.getZzid());
				expressCountryMapper.deleteByCountry(params);
			}*/
		}
	}
}
