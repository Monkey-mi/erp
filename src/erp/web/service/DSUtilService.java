package erp.web.service;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.db.DBUtil;
import erp.util.Const;
import erp.util.WebUtil;
import erp.web.data.DSUtilMapper;
import erp.web.model.DBVerList;
import erp.web.model.ExtDataSource;


@Service
public class DSUtilService {
	@Autowired
	private DSUtilMapper dsUtilMapper;
	protected static Logger logger = Logger.getLogger("service");
	public boolean getBuildNo(Map<String,Object> paramsMap){
		String callErrMsg = "";
		String Buildno = "{BuildNo:'"+WebUtil.getBuildno()+"'";
		
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("isactive", Const.YESNO_TYPE_YES);
		List<DBVerList> dbverlst = dsUtilMapper.getDBVerList(params);
		if(dbverlst.size()>0){
			Buildno += ",DBVer:'"+dbverlst.get(0).getDbver()+"'";
		}
		Buildno +="}";
		paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(Const.SERVICE_CALL_RESULT,Buildno);
		
		return true;
	}
	
	
	public ExtDataSource getExtDataSourceByCode(String dsCode){
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		paramsMap.put("dscode", dsCode);
		List<ExtDataSource> edsList = getExtDataSourceList(paramsMap);
		ExtDataSource extDs = null;
		if(edsList.size()>0)
			extDs = edsList.get(0);
		return extDs;
	}
	
	public ExtDataSource getExtDataSourceByCode(int dsId){
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		paramsMap.put("id", dsId);
		List<ExtDataSource> edsList = getExtDataSourceList(paramsMap);
		ExtDataSource extDs = null;
		if(edsList.size()>0)
			extDs = edsList.get(0);
		return extDs;
	}
	
	public List<ExtDataSource> getExtDataSourceList(Map<String,Object> paramsMap){
		return dsUtilMapper.getExtDataSourceList(paramsMap);
	}
	
	/**
	 * 测试外部数据源的连接
	 * @param paramsMap
	 * @return
	 */
	public boolean testExtDataSource(Map<String,Object> paramsMap){
		
		StringBuilder sbErrMsg = new StringBuilder();
		
		String callErrMsg = "";
		paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,"");
		Object dataObj = paramsMap.get(erp.util.Const.AJAX_DATA_ROOT);
		if(WebUtil.isEmpty(dataObj)){
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数["+erp.util.Const.AJAX_DATA_ROOT+"]");
			return false;
		}
		ExtDataSource extDs;
		try {
			extDs = WebUtil.getObjectMapper().readValue(dataObj.toString(),ExtDataSource.class);
			if(DBUtil.testDbConn(extDs.getDstype(), extDs.getSrvaddr(), extDs.getSrvport(),
					   extDs.getDbname(), extDs.getSrvlogin(), extDs.getSrvpwd(), sbErrMsg)){
				paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,true);
				callErrMsg ="测试连接成功!";
			}else{
				paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,false);
				callErrMsg = sbErrMsg.toString();
			}
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		} catch (Exception e) {
			e.printStackTrace();
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
	}

	
	@Transactional
	public void addExtDataSource(ExtDataSource[] extDataSources){
		for (ExtDataSource extDataSource : extDataSources) {
			dsUtilMapper.addExtDataSource(extDataSource);
		}
	}
	@Transactional
	public void updateExtDataSource(ExtDataSource[] extDataSources){
		for (ExtDataSource extDataSource : extDataSources) {
			dsUtilMapper.updateExtDataSource(extDataSource);
		}
	}
	@Transactional
	public void deleteExtDataSource(ExtDataSource[] extDataSources){
		for (ExtDataSource extDataSource : extDataSources) {
			dsUtilMapper.deleteExtDataSource(extDataSource);
		}
	}
	
}	