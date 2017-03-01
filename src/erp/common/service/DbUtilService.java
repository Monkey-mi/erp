package erp.common.service;

import java.sql.ResultSetMetaData;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.bi.form.model.FrmFld;
import erp.common.data.DBUtilMapper;
import erp.common.db.DBUtil;

@Service
public class DbUtilService {
	@Autowired
	private DBUtilMapper dbUtilMapper;
	
	protected static Logger logger = Logger.getLogger("service");
	

	public List<String> getTables(Map<String,Object> paramsMap) throws Exception{
		String dsCode =paramsMap.get(erp.bi.form.Const.DATASOURCE_CODE)!=null?paramsMap.get(erp.bi.form.Const.DATASOURCE_CODE).toString():"";
		StringBuilder errMsgSB = new StringBuilder();
		//先切换数据源
		DataSource curDataSource = DBUtil.setCurDataSource(dsCode,errMsgSB);
		if(curDataSource==null){
			throw new Exception(errMsgSB.toString());
	    }
		String tblNamePattern = paramsMap.get(erp.bi.form.Const.TABLE_NAME)==null?"":paramsMap.get(erp.bi.form.Const.TABLE_NAME).toString();
		return DBUtil.getTables(DBUtil.getCurConnection(), tblNamePattern);
	}
	
	public List<Map<String,Object>> execDsCenterSql(Map<String,Object> paramsMap) throws Exception{
		String dsCode =paramsMap.get(erp.bi.form.Const.DATASOURCE_CODE)!=null?paramsMap.get(erp.bi.form.Const.DATASOURCE_CODE).toString():"";
		StringBuilder errMsgSB = new StringBuilder();
		//先切换数据源
		DataSource curDataSource = DBUtil.setCurDataSource(dsCode,errMsgSB);
		if(curDataSource==null){
			throw new Exception(errMsgSB.toString());
	    }
		
		String querySQL = paramsMap.get(erp.bi.form.Const.QUERY_SQL).toString();
		
		//检查SQL语句
		checkQuerySQL(querySQL);
		//1.根据querySQL读取字段信息
		List<FrmFld> fldList = DBUtil.getFieldsBySQL(DBUtil.getCurConnection(),querySQL);
		//2.取得查询结果
		List<Map<String,Object>> resultMapList = null;
		try{
			resultMapList = dbUtilMapper.executeQuery(paramsMap);
		}catch(Exception exp){
				throw exp;
			}
		
		int i=1;
		for (Map<String, Object> resultMap : resultMapList) {
			//增加row_num字段
//			if(resultMap.get(tps.bi.form.Const.DATA_ROWNUM)==null)
//				resultMap.put(tps.bi.form.Const.DATA_ROWNUM,i++);
			//处理空字段问题
			if(resultMap.size()!=fldList.size())
				for (FrmFld fld : fldList) {
					if(!resultMap.containsKey(fld.getCode())){
						Object putObj = null; 
						if(fld.getDatatype().equals(erp.bi.form.Const.DATA_TYPE_INTEGER))
							putObj = 0;
						if(fld.getDatatype().equals(erp.bi.form.Const.DATA_TYPE_DEC))
							putObj = 0.00;
						
						//如果结果中没有，那么需要手工补充填入一个默认值，否则结果中可能没有这个字段
						resultMap.put(fld.getCode(), putObj);
					}
				}
			}
		return resultMapList;
	}
	
	/**
	 * 执行查询语句(querySQL)
	 * @param paramsMap
	 * @return
	 * * 入参:<br/>
	 * {<br/>
	 *      QUERY_SQL:'select * from xxxx where ',<br/>
	 * 		[
	 *       DATASOURCE_CODE:'ds_code',
	 *       usePaging:true,<br/>
	 *       limit:20,<br/>
	 *       start:0<br/>
	 *      ]<br/>
	 * }<br/>
	 * 出参:<br/>
	 * {<br/>
	 * 		DATA_FIELDS:[{code:'col_name1',name:'col_name1',datatype:'string',len:10},{code:'col_name2',name:'col_name2',datatype:'string',len:10},{code:'col_name3',name:'col_name3',datatype:'string',len:10},]
	 *      DATA_ROWS:[{row_num:1,col_name1:cv1,col_name2:cv2,col_name3:cv3},{row_num:2,col_name1:cv1,col_name2:cv2,col_name3:cv3}]
	 * }<br/> 
	 * DATA_FIELDS里面放着FrmFld的数组
	 * @throws Exception
	 */
	public Map<String,Object> executeQuery(Map<String,Object> paramsMap) throws Exception{
		
		String dsCode =paramsMap.get(erp.bi.form.Const.DATASOURCE_CODE)!=null?paramsMap.get(erp.bi.form.Const.DATASOURCE_CODE).toString():"";
		StringBuilder errMsgSB = new StringBuilder();
		//先切换数据源
		DataSource curDataSource = DBUtil.setCurDataSource(dsCode,errMsgSB);
		if(curDataSource==null){
			throw new Exception(errMsgSB.toString());
	    }
		
		String querySQL = paramsMap.get(erp.bi.form.Const.QUERY_SQL).toString();
		
		//检查SQL语句
		checkQuerySQL(querySQL);
		
		Map<String,Object> retMap = new HashMap<String,Object>();
		//1.根据querySQL读取字段信息
		List<FrmFld> fldList = DBUtil.getFieldsBySQL(DBUtil.getCurConnection(),querySQL);
		retMap.put(erp.bi.form.Const.DATA_FIELDS, fldList);
		//2.取得查询结果
		List<Map<String,Object>> resultMapList = null;
		try{
		
		resultMapList = dbUtilMapper.executeQuery(paramsMap);
		retMap.put(erp.bi.form.Const.DATA_ROWS, resultMapList);
		}catch(Exception exp){
			throw exp;
		}
		//3.根据字段要求检查查询结果中是否存在该字段，
		int i=1;
		for (Map<String, Object> resultMap : resultMapList) {
			//增加row_num字段
//			if(resultMap.get(tps.bi.form.Const.DATA_ROWNUM)==null)
//				resultMap.put(tps.bi.form.Const.DATA_ROWNUM,i++);
			//处理空字段问题
			if(resultMap.size()!=fldList.size())
				for (FrmFld fld : fldList) {
					if(!resultMap.containsKey(fld.getCode())){
						Object putObj = null; 
						if(fld.getDatatype().equals(erp.bi.form.Const.DATA_TYPE_INTEGER))
							putObj = 0;
						if(fld.getDatatype().equals(erp.bi.form.Const.DATA_TYPE_DEC))
							putObj = 0.00;
						
						//如果结果中没有，那么需要手工补充填入一个默认值，否则结果中可能没有这个字段
						resultMap.put(fld.getCode(), putObj);
					}
				}
		}
		return retMap;
	}
	
	
	/**
	 * 执行查询语句(getTableFields)
	 * @param paramsMap
	 * @return
	 * * 入参:<br/>
	 * {<br/>
	 *      QUERY_SQL:'select * from xxxx where ',<br/>
	 * 		[
	 *       DATASOURCE_CODE:'ds_code',
	 *       usePaging:true,<br/>
	 *       limit:20,<br/>
	 *       start:0<br/>
	 *      ]<br/>
	 * }<br/>
	 * 出参:<br/>
	 * {<br/>
	 * 		DATA_FIELDS:[{code:'col_name1',name:'col_name1',datatype:'string',len:10},{code:'col_name2',name:'col_name2',datatype:'string',len:10},{code:'col_name3',name:'col_name3',datatype:'string',len:10},]
	 * }<br/> 
	 * DATA_FIELDS里面放着FrmFld的数组
	 * @throws Exception
	 */
	public Map<String,Object> getFieldsBySQL(Map<String,Object> paramsMap) throws Exception{
		
		String dsCode =paramsMap.get(erp.bi.form.Const.DATASOURCE_CODE)!=null?paramsMap.get(erp.bi.form.Const.DATASOURCE_CODE).toString():"";
		StringBuilder errMsgSB = new StringBuilder();
		//先切换数据源
		DataSource curDataSource = DBUtil.setCurDataSource(dsCode,errMsgSB);
		if(curDataSource==null){
			throw new Exception(errMsgSB.toString());
	    }
		
		String querySQL = paramsMap.get(erp.bi.form.Const.QUERY_SQL).toString();
		
		//检查SQL语句
		checkQuerySQL(querySQL);
		
		Map<String,Object> retMap = new HashMap<String,Object>();
		//根据querySQL读取字段信息
		List<FrmFld> fldList = DBUtil.getFieldsBySQL(DBUtil.getCurConnection(),querySQL);
		retMap.put(erp.bi.form.Const.DATA_FIELDS, fldList);
		return retMap;
	}
	
	
	private void checkQuerySQL(String sqlStr) throws Exception{
		//检查SQL语句
		//1.不允许 insert|update|delete|create|drop|alter 语句存在
		String sPt ="(^|[\\s\\S]*\\s+)(insert|update|delete|create|drop|alter)(\\s+[\\s\\S]*|$)";
		
		Pattern pattern = Pattern.compile(sPt,Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(sqlStr);
		if(matcher.matches())
			throw new Exception(String.format("查询语句[%s]中不应存在[insert|update|delete|create|drop|alter]关键词",sqlStr));
	}
	
	
	
	public List<Map<String,Object>> selectData(Map<String,Object> paramsMap) {

		List<Map<String,Object>> resultMapList = dbUtilMapper.selectData(paramsMap);
		Object obj =paramsMap.get("TABLE_FIELDS");
		if(obj!=null){
			@SuppressWarnings("unchecked")
			List<Map<String,Object>> table_fields = (List<Map<String,Object>>)obj;
			//根据字段要求检查查询结果中是否存在该字段，
			for (Map<String, Object> resultMap : resultMapList) {
				for (Map<String, Object> tbl_fld : table_fields) {
					if(!resultMap.containsKey(tbl_fld.get("FIELD_CODE"))){
						//如果结果中没有，那么需要手工填入一个默认值
						resultMap.put(tbl_fld.get("FIELD_CODE").toString(), null);
					}
				}
			}
		}
		return resultMapList;
	}
	public List<Map<String,Object>> selectChartData(Map<String,Object> paramsMap){
		return dbUtilMapper.selectChartData(paramsMap);
	}
	public List<Map<String,Object>> selectDateData(Map<String,Object> params){
		return dbUtilMapper.selectDateData(params);
	}
	public void insertData(Map<String,Object> paramsMap) {
		dbUtilMapper.insertData(paramsMap);
	}
	public void updateData(Map<String,Object> paramsMap) {
		dbUtilMapper.updateData(paramsMap);
	}
	public void deleteData(Map<String,Object> paramsMap) {
		dbUtilMapper.deleteData(paramsMap);
	}
	
	public String showTable(Map<String,Object> paramsMap) {
		String retStr = dbUtilMapper.showTable(paramsMap);
		return retStr==null?"":retStr; 
	}
	public void createTable(Map<String,Object> paramsMap) {
		dbUtilMapper.createTable(paramsMap);
	}
	public void dropTable(Map<String,Object> paramsMap) {
		dbUtilMapper.dropTable(paramsMap);
	}
	
	public void getTblFields(String tblName){
		ResultSetMetaData rsmd =null;
	}
    
	public List<Map<String,Object>> testSelect(Map<String,Object> params){
		return dbUtilMapper.testSelect(params);
	}
}
