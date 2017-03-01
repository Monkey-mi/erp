package erp.erp.manufacturer.payAccount.data;

import java.util.Map;

/**
 * <p>Title: QynfMapper</p>
 * <p>Description: erp</p>
 * <p>Company: topsun</p> 
 * @author shufei
 * @date 2016-5-20上午9:07:19
 */
public interface QynfMapper {
 int getQynf(Map<String,Object> params);
 Integer getJzzt(Map<String,Object> params);
 String getYhmc(Map<String,Object> params);
 String getBmmc(Map<String,Object> params);
 String getWbdh(Map<String,Object> params);
}
