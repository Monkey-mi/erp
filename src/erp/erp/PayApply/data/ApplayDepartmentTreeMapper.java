/**
 *  @date 2016-5-19下午3:56:40
 *  @file ApplayDepartmentTreeMapper.java
 *  @author:shufei
 *  
 */
package erp.erp.PayApply.data;

import java.util.List;
import java.util.Map;

import erp.erp.PayApply.model.ApplayDepartmentTree;

/**
 * <p>Title: ApplayDepartmentTreeMapper</p>
 * <p>Description: erp</p>
 * <p>Company: topsun</p> 
 * @author shufei
 * @date 2016-5-19下午3:56:40
 */
public interface ApplayDepartmentTreeMapper {
	public List<ApplayDepartmentTree> getDepartmentList(Map<String,Object> params);
	String getDepartmentOne(Map<String,Object> params);
	String getDepartmentTwo(Map<String,Object> params);
	//类别名称
	String getDepartmentName(Map<String,Object> params);
}
