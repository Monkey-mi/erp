package erp.erp.master.enumType.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.enumType.model.EnumType;

public interface EnumTypeMapper {
	public List<EnumType> getEnumTypeList(Map<String,Object> params);
	public void addEnumType(EnumType obj);
	public void updateEnumType(EnumType obj);
	public void deleteEnumType(EnumType obj);
}
