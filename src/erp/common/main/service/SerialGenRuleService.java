package erp.common.main.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.main.data.SerialGenRuleMapper;
import erp.common.model.SerialGenRule;
import erp.common.model.SerialRuleDetail;
import erp.util.WebUtil;



@Service
public class SerialGenRuleService {
	@Autowired
	private SerialGenRuleMapper mapper;
    private Map<String,Object> SrMap = new HashMap<String,Object>();
	protected static Logger logger = Logger.getLogger("service");
	
    /**
     * 清理编码规则缓存
     * @param sr ,SRCode
     * @throws Exception
     */
    public void clearsrCache(String SRCode)throws Exception{
        Map<String,Object> paramsMap = new HashMap<String,Object>();
        paramsMap.put("code", SRCode);
        List<SerialGenRule> cgrList = this.getSerialRuleList(paramsMap);
        if(cgrList.size()<=0){
            throw new Exception(String.format("不存在代码=[%s]的规则!", SRCode));
        }
        int srId = cgrList.get(0).getSr_id();
        Set<String> key = this.SrMap.keySet();
        String[] keys = key.toArray(new String[]{});
        for (String keyStr : keys) {
            logger.debug(String.format("keyStr=[%s]",keyStr));
            if(keyStr.startsWith("sr_id_"+String.valueOf(srId)+"_cgr_id")
                ||keyStr.startsWith("sr_instcode_"+String.valueOf(srId))
                    ||keyStr.startsWith("sr_code_"+SRCode+"_sr_code")){
                this.SrMap.remove(keyStr);
                logger.debug(String.format("keyStr=[%s] is removed!",keyStr));
            }
        }
    }
    /**
     * 清理编码规则缓存
     * @param paramsMap 接受参数 cgrId,cgrCode
     * @return true--执行完成   false--有错
     * @throws Exception
     */
    public boolean clearCgrCacheSrv(Map<String,Object> paramsMap) throws Exception{
        String callErrMsg = "";
        paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
        paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,"");
        try{
            Object srCodeObj = paramsMap.get("code");
            if(WebUtil.isEmpty(srCodeObj)){
                paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数[code]");
                return false;
            }
            String cgrCode = srCodeObj.toString();
            this.clearsrCache(cgrCode);
            callErrMsg="清理完成!";
            paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,true);
            paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
        }catch(Exception e){
            paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
            return false;
        }
        return true;
    }
    public List<SerialGenRule> getSerialRuleList(Map<String,Object> params) {
        return mapper.getSerialRuleList(params);
    }
    public void addSerialRule(SerialGenRule[] arr) {
        for(SerialGenRule obj: arr) {
            mapper.addSerialRule(obj);
        }
    }
    public void updateSerialRule(SerialGenRule[] arr) {
        for(SerialGenRule obj: arr) {
            mapper.updateSerialRule(obj);
        }
    }
    @Transactional
    public void deleteSerialRule(SerialGenRule[] arr) {
        for(SerialGenRule obj: arr) {
            int srId=obj.getSr_id();
            System.out.println(srId);
            mapper.deleteSerialRuleDetailByRuleId(srId);
            mapper.deleteSerialRule(obj);
        }
    }
    
    public List<SerialRuleDetail> getSerialRuleDetailList(Map<String,Object> params) {
        return mapper.getSerialRuleDetailList(params);
    }
    public void addSerialRuleDetail(SerialRuleDetail[] arr) {
        for(SerialRuleDetail obj: arr) {
            mapper.addSerialRuleDetail(obj);
        }
    }
    public void updateSerialRuleDetail(SerialRuleDetail[] arr) {
        for(SerialRuleDetail obj: arr) {
            mapper.updateSerialRuleDetail(obj);
        }
    }
    public void deleteSerialRuleDetail(SerialRuleDetail[] arr) {
        for(SerialRuleDetail obj: arr) {
            mapper.deleteSerialRuleDetail(obj);
        }
    }
    public boolean getSerialRuleExists(Map<String,Object> params){
        return mapper.getSerialRuleList(params).size()>0;
    }
}
