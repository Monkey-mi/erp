package erp.bi.dc.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.bi.dc.data.DataCenterMapper;
import erp.bi.dc.model.DataCenter;
import erp.bi.dc.model.DataCenterDesc;
import erp.bi.dc.model.DataCenterParam;
import erp.bi.form.Const;
import erp.bi.form.data.FormMapper;
import erp.bi.form.service.FormService;
import erp.common.service.DbUtilService;
import erp.util.AppUtils;
import erp.util.WebUtil;



@Service
public class DataCenterService {
	@Autowired
	private DataCenterMapper dsMapper;
	
	@Autowired
	private FormMapper formMapper;
	
	@Autowired
	private FormService formService;
	
	private DbUtilService map = WebUtil.getAppCtxCommon().getBean(
			DbUtilService.class);
	
	protected static Logger logger = Logger.getLogger("service");
	
	
	/**
	 * Request dc/dsCenterService.do?method=getDsCenterList
	 * 
	 * @param params
	 * @return
	 */
	public List<DataCenter> getDsCenterList(Map<String, Object> params) {
		return dsMapper.getDsCenterList(params);
	}
	
	/**
	 * Request dc/dsCenterService.do?method=getDsCenterListAll
	 * 
	 * @param params
	 * @return
	 */
	public List<DataCenter> getDsCenterListAll(Map<String, Object> params) {
		return dsMapper.getDsCenterListForSpe(params);
	}
	/**
	 * Request dc/dsCenterService.do?method=isExistDc
	 * 
	 * @param params
	 * @return
	 */
	public boolean isExistDc(Map<String, Object> params) {
		
		List<DataCenter> dc = dsMapper.getDsCenterList(params);
		if (dc.size() > 0) {
			return true;
		}
		return false;
	}
	
	/**
	 * Request dc/dsCenterService.do?method=addDsCenter
	 * 
	 * @param ds
	 */
	@Transactional
	public void addDsCenter(DataCenter[] ds) {
		for (DataCenter item : ds) {
			if (item.getList_id()==0){
				Map<String,Object> p = new HashMap<String, Object>();
				p.put("report_type", "多数据源报表");
				item.setList_id(formMapper.getListId(p));				
			}
			dsMapper.addDataCenter(item);
		}
	}
	
	/**
	 * Request dc/dsCenterService.do?method=updateGpDsCenter
	 * 
	 * @param ds
	 */
	@Transactional
	public void updateDsCenter(DataCenter[] ds) {
		for (DataCenter items : ds) {
			dsMapper.updateDataCenter(items);
		}
	}
	
	/**
	 * Request dc/dsCenterService.do?method=deleteDsCenter
	 * 
	 * @param ds
	 */
	@Transactional
	public void deleteDsCenter(DataCenter[] ds) {
		for (DataCenter items : ds) {
			int ds_id = items.getDs_id();
			logger.debug("+++++++++++++++++++++++++++");
			dsMapper.deleteDataCenterDescByDs(ds_id);
			dsMapper.deleteDataCenterParamByDs(ds_id);
			logger.debug("+++++++++++++++++++++++++++");
			dsMapper.deleteDsCenter(items);
		}
	}
	
	/**
	 * Request gp/dc/dsCenterService.do?method=getGpDsParamList
	 * 
	 * @param params
	 * @return
	 */
	public List<DataCenterParam> getDsParamList(Map<String, Object> params) {
		return dsMapper.getDsParamList(params);
	}
	/**
	 * Request dc/dsCenterService.do?method=addDsParam
	 * 
	 * @param ds
	 */
	@Transactional
	public void addDsParam(DataCenterParam[] ds) {
		for (DataCenterParam item : ds) {
			dsMapper.addDataCenterParam(item);
		}
	}

	/**
	 * Request gp/dc/dsCenterService.do?method=updateDsParam
	 * 
	 * @param gpds
	 */
	@Transactional
	public void updateDsParam(DataCenterParam[] ds) {
		for (DataCenterParam item : ds) {
			dsMapper.updateDataCenterParam(item);
		}
	}

	/**
	 * Request gp/dc/dsCenterService.do?method=deleteDsParam
	 * 
	 * @param ds
	 */
	@Transactional
	public void deleteDsParam(DataCenterParam[] ds) {
		for (DataCenterParam item : ds) {
			dsMapper.deleteDataCenterParam(item);
		}
	}

	
	/**
	 * Request dc/dsCenterService.do?method=getDsDescList
	 * 
	 * @param params
	 * @return
	 */
	public List<DataCenterDesc> getDsDescList(Map<String, Object> params) {
		return dsMapper.getDsDescList(params);
	}

	/**
	 * Request dc/dsCenterService.do?method=addDsDesc
	 * 
	 * @param ds
	 */
	@Transactional
	public void addDsDesc(DataCenterDesc[] ds) {
		for (DataCenterDesc item : ds) {
			dsMapper.addDataCenterDesc(item);
		}
	}

	/**
	 * Request dc/dsCenterService.do?method=updateDsDesc
	 * 
	 * @param ds
	 */
	@Transactional
	public void updateDsDesc(DataCenterDesc[] ds) {
		for (DataCenterDesc item : ds) {
			dsMapper.updateDataCenterDesc(item);
		}
	}

	/**
	 * Request dc/dsCenterService.do?method=deleteDsDesc
	 * 
	 * @param ds
	 */
	@Transactional
	public void deleteDsDesc(DataCenterDesc[] ds) {
		for (DataCenterDesc item : ds) {
			dsMapper.deleteDataCenterDesc(item);
		}
	}
	/**
	 * 执行数据源sql查询
	 * 
	 * @param paramsMap
	 * @return
	 * @throws Exception
	 */
	public Object execDsSqlQuery(Map<String, Object> paramsMap)
			throws Exception {
		List<DataCenter> list = dsMapper.getDsCenterListForSpe(paramsMap);
		DataCenter ds = list.get(0);
		if (ds != null) {
			paramsMap.put("list_id", ds.getList_id());
			String sql="";
			Map<String, Object> sqlquery = new HashMap<String, Object>();
			if(!ds.getData_type().equals("SYS")){
			sql="select * from ( " +(paramsMap.get("list_id")!=null&&
								!(ds.getData_type().equals("DS_CENTER")||ds.getData_type().equals("DS_PARAM"))
								? AppUtils.ConvertStringToJson(ds.getScript_sql()).getString("editSql")
								:ds.getScript_sql())+" ) as a";
			sql+=getSqlCdt(sql,paramsMap);
			sqlquery.put("QUERY_SQL", sql);
			}else
			{
				paramsMap.put("QUERY_SQL", ds.getScript_sql());
				paramsMap.put("QUERY_SQL", getSqlWithDefine(paramsMap));
			}
			sqlquery.put(erp.bi.form.Const.DATASOURCE_CODE,(ds.getDsid()==0?null:ds.getDsid()));
			sqlquery.putAll(paramsMap);
			return map.execDsCenterSql(sqlquery);
		} else {
			return null;
		}
	}	
	
	/**
	 * 执行数据源sql查询
	 * 
	 * @param paramsMap
	 * @return
	 * @throws Exception
	 */
	public boolean execSqlQuery(Map<String, Object> paramsMap)
			throws Exception {
		List<DataCenter> list = dsMapper.getDsCenterListForSpe(paramsMap);
		
		if (list.size()>0) {
			paramsMap.put(Const.QUERY_SQL, getSqlWithDefine(paramsMap));
			return formService.executeQuery(paramsMap);
		} else 
			return false;
		
	}	
	private String getSqlWithDefine(Map<String, Object> paramsMap){
				String sql="";
				String valDefine="";
				//系统打印模板打印前获取list_id对应的参数列表
				List<DataCenterParam> paramList=dsMapper.getDsParamList(paramsMap);
				sql="EXECUTE sp_executesql @sql ";
				if(paramList.size()>0){
					 String paramValue="";
					for(DataCenterParam param: paramList)
					{
						paramValue=(String)paramsMap.get(param.getCode());
							if (paramValue==null)
								paramValue=param.getDefault_value();
						  	if(param.getDatatype().equals("varchar")||param.getDatatype().equals("text")){
						  		String[] values=paramValue.split(",");
						  		//长度超过1的数组
						  		if(values.length>1){
						  			//重新初始化参数值	
						  			paramValue="";
							  		for(int i=0;i<values.length;i++)
							  		{
							  			paramValue+="''"+values[i]+"'',";
							  		}
						  			paramValue=paramValue.substring(0, paramValue.length()-1);
						  		}else{
						  			
						  			paramValue="''"+(paramValue.equals("*")?"":paramValue)+"''";
						  		}
						  		valDefine+=" declare @"+param.getCode()+"  nvarchar(max); set @"+param.getCode()+"='"+paramValue+"'; ";
						  	}else if (param.getDatatype().equals("date")||param.getDatatype().equals("timestamp")||param.getDatatype().equals("datetime")){
						  		valDefine+=" declare @"+param.getCode()+"  "+param.getDatatype()+"; set @"+param.getCode()+"='"+paramValue+"'; ";
						  	}else{
						  		valDefine+=" declare @"+param.getCode()+"  "+param.getDatatype()+"; set @"+param.getCode()+"="+paramValue+"; ";
						  	}
					}
				}
				valDefine+=" declare @sql nvarchar(max); set @sql= '"+paramsMap.get(Const.QUERY_SQL).toString()+"' ";
				sql=valDefine+sql;
			return sql;
	}
	private String getSqlCdt(String sql,Map<String, Object> paramsMap){
		String cdt=" where 1=1";
		String key,tempValue;
		String[] value;
		Iterator<String> iter = paramsMap.keySet().iterator();
		
		while (iter.hasNext()) {
		    key = iter.next();
		    tempValue=paramsMap.get(key).toString();
		    //多选参数按逗号分隔
		    //华慧 2014-12-16
		    value=tempValue.split(",");
//		    value = (String)paramsMap.get(key);
		    
		    if (!key.equalsIgnoreCase("ds_id")&&!key.equalsIgnoreCase("db_type")&&!key.equalsIgnoreCase("total")&&!key.equalsIgnoreCase("list_id")&&!key.equalsIgnoreCase("data_type")&&value!=null){
				if (value.length==1){   
					    cdt+=" and "+key+" = '"+value[0]+"' ";
				}else{
					cdt+=" and (";
					for (int i=0;i<value.length;i++)
					{
					    	cdt+=" "+key+" = '"+value[i]+"' or";
					}
					cdt=cdt.substring(0, cdt.length()-2)+")";
				}
		    	
		    }
		}
		return cdt;
	}
}
