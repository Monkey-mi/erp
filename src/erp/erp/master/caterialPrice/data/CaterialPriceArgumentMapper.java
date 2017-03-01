package erp.erp.master.caterialPrice.data;

import java.util.List;
import java.util.Map;

import erp.erp.master.caterialPrice.model.CaterialPriceArgument;


public interface CaterialPriceArgumentMapper {
	public List<CaterialPriceArgument> getCaterialPriceArgumentList(Map<String,Object> params);
	public void addCaterialPriceArgument(CaterialPriceArgument obj);
	public void updateCaterialPriceArgument(CaterialPriceArgument obj);
	public void deleteCaterialPriceArgument(CaterialPriceArgument obj);
	
	//判断参数名称是否存在
	int getArgumentIsExist (Map<String,Object> params);
}
