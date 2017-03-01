/**  
* @Title: OutsideInformationMapper.java
* @Package srm.supplierAccess.data
* @Description: TODO
* @author 舒飞
* @date 2016-10-13 上午8:34:55 
*/ 
package srm.supplierAccess.data;

import java.util.Map;

public interface OutsideInformationMapper {
	public String getWbbh(Map<String,Object> params);
	public String getWbdh(Map<String,Object> params);
}
