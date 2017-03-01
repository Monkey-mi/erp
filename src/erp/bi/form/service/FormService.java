package erp.bi.form.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.h2.engine.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.bi.form.Const;
import erp.bi.form.data.FormMapper;
import erp.bi.form.model.BuzFrmField;
import erp.bi.form.model.CusFilterFrmFld;
import erp.bi.form.model.CusTable;
import erp.bi.form.model.CustomQueryCdtion;
import erp.bi.form.model.CustomReportResult;
import erp.bi.form.model.FldTpl;
import erp.bi.form.model.FrmAtt;
import erp.bi.form.model.FrmFld;
import erp.bi.form.model.FrmReg;
import erp.bi.form.model.FrmRender;
import erp.bi.form.model.FrmTbl;
import erp.bi.form.model.FrmtblRelationship;
import erp.bi.form.model.ReportScript;
import erp.bi.report.model.CustomQueryUse;
import erp.common.db.DBUtil;
import erp.common.main.service.BasicData;
import erp.common.model.CodeType;
import erp.common.service.CodeService;
import erp.common.service.DbUtilService;
import erp.util.WebUtil;


@Service
public class FormService {
	@Autowired
	private FormMapper formsMapper;
	
	@Autowired
	private CodeService codeService;
	
	private DbUtilService dbUtilService = WebUtil.getAppCtxCommon().getBean(DbUtilService.class);
	
	private static Logger logger = Logger.getLogger("service");
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	/**
	 * 获取自定义报表查询操作集合
	 */
	@SuppressWarnings("unchecked")
	public boolean getCusReportResult(Map<String,Object> paramMap){
		try{
			
			if(paramMap.get("docId")==null&&paramMap.get("creater")==null&&paramMap.get("list_id")==null&&paramMap.get("freg_id")==null){
				paramMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG, "参数不能为空!");
				return false;
			}else{
				Map<Integer,Object> tempMap = new HashMap<Integer, Object>();
				List<CustomReportResult> result = new ArrayList<CustomReportResult>();
				
				Map<String,Object> p = new HashMap<String, Object>();
				logger.debug("+++++++++++++++++++"+paramMap.get("docId"));
					p.put("docId", paramMap.get("docId"));	
					p.put("creater", paramMap.get("creater"));
					p.put("list_id", paramMap.get("list_id"));
					p.put("freg_id", paramMap.get("freg_id"));
					result = formsMapper.getCusReportResult(p);
					for(CustomReportResult r : result)
						tempMap.put(r.getList_id(), r); 
				paramMap.put(erp.util.Const.SERVICE_CALL_RESULT, result);
				return true;
			}
		}catch(Exception e){
			paramMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}
	}
	
	
	/**
	 * 获取常用自定义查询
	 */
	public boolean getCommonCustomQuery(Map<String,Object> paramMap){
		try{
			paramMap.put(erp.util.Const.SERVICE_CALL_RESULT, formsMapper.getCommonCustomQuery(paramMap));
			return true;
		}catch(Exception e){
			paramMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}
	}
	/**
	 * 自定义报表查询
	 */
	public boolean cusFromQuery(Map<String,Object> paramMap){
		String PRE = "frmt_";
		try{
			String postData = (String) paramMap.get(erp.util.Const.AJAX_DATA_ROOT);
			String tableStr = (String)paramMap.get("tables");
			String cdtionsStr = (String)paramMap.get("cdtions");
			
			CusFilterFrmFld[]paramflds = objectMapper.readValue(postData,CusFilterFrmFld[].class);
			CusTable[]tables = objectMapper.readValue(tableStr,CusTable[].class);
			CustomQueryCdtion[]pcdtions = objectMapper.readValue(cdtionsStr,CustomQueryCdtion[].class);
			logger.debug("param tables----->"+tableStr+"table size---->"+tables.length);
			logger.debug("param cdtions----->"+cdtionsStr+"pcdtions size---->"+pcdtions.length);
			
    		Map<String,Object> pMap = new HashMap<String,Object>();
			List<String> fields = new ArrayList<String>();//查询的字段
			List<String> cdtions = new  ArrayList<String>();//查询的条件
			StringBuffer ftName=new StringBuffer("");//查询的表及表相互连接
			
			//查询字段
			for(CusFilterFrmFld pfild:paramflds){
				fields.add(PRE+pfild.getFtName()+"."+pfild.getFfName()+" as '"+pfild.getFtName()+"_"+pfild.getFfName()+"'");
			}
			
			//添加查询条件
			for(CustomQueryCdtion cdtion:pcdtions){
				cdtions.add(PRE+cdtion.getFt_ff_id()+cdtion.getOpe()+cdtion.getOpeVal());
			}
			
			//拼接查询的表及表相互连接
			if(tables.length>1){
				int master = 0;
				StringBuffer tbCdtion = new StringBuffer(" on ");
				ftName.append(" ");
				//找到主表
				for(int i=0;i<tables.length;i++){
					if(tables[i].getType().equals(erp.util.Const.FRMTBL_TYPE_MASTER)){
						master = i;	
						break;
					}
				}
				
				ftName.append("frmt_"+tables[master].getCode());
				ftName.append(" INNER JOIN ");
				
				for(int i=0;i<tables.length;i++){
					if(i!=master){
						ftName.append("frmt_"+tables[i].getCode()+",");
						tbCdtion.append("frmt_"+tables[i].getCode()+"."+tables[i].getKey()+"="+"frmt_"+tables[master].getCode()+"."+tables[master].getKey());
					}
				}
				ftName.deleteCharAt(ftName.lastIndexOf(","));
				ftName.append(tbCdtion);
			}else if(tables.length==1){
				ftName.append("frmt_"+tables[0].getCode());
			}else{
				ftName.append("frmt_"+paramflds[0].getFtName());
			}
			
			pMap.put("fields", fields);
			if(cdtions.size()>0)
			   pMap.put("cdtions", cdtions);
			pMap.put("ftName",ftName.toString());
			
			paramMap.put(erp.util.Const.SERVICE_CALL_RESULT, formsMapper.cusFromQuery(pMap));
			return true;
		}catch(Exception e){
			paramMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}
		
	}
	//单据字段表
	/**
	 * 获得单据字段清单
	 * Request form/Forms.do?method=getFrmFldList <br/><br/>
	 * Response {data:[{@link FrmFld}]} <br/><br/>
	 * @param 支持参数:ft_id --单据数据表id,ff_id 单据字段定义id
	 * @return FrmFld清单
	 */
	public List<FrmFld> getFrmFldList(Map<String,Object> params){
		int total=formsMapper.getCountFrmFld(params);
		params.put("total", total);
		return formsMapper.getFrmFldList(params);
	}

		
	/**
	 * 字段code是否已存在
	 * Request form/Forms.do?method=isExistsFrmFld <br/><br/>
	 * Response {data:boolean} <br/><br/>
	 * @param params
	 * @return boolean
	 */

	public boolean isExistsFrmFld(Map<String,Object> params){
		return formsMapper.getFrmFldList(params).size()>0;
	}
	
	/**
	 * 获取自定义查询条件
	 */
	public boolean getCustomQueryCdtion(Map<String,Object> paramMap){
		try{
			paramMap.put(erp.util.Const.SERVICE_CALL_RESULT, formsMapper.getCustomQueryCdtion(paramMap));
			return true;
		}catch(Exception e){
			paramMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}
	}

	/**
	 * 执行查询语句(querySQL)
	 * Request form/Forms.do?method=executeQuery <br/>
	 * @param paramsMap 提交的数据paramsMap[tps.util.Const.AJAX_DATA_ROOT]<br/>
	 * 入参:<br/>
	 * {<br/>
	 *      QUERY_SQL:'select * from xxxx where ',<br/>
	 *      [
	 *       DATASOURCE_CODE:'ds_code',
	 *       usePaging:true,<br/>
	 *       limit:20,<br/>
	 *       start:0
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
	public boolean executeQuery(Map<String,Object> paramsMap){
		String callErrMsg="查询完成!";;
		paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,"");
		try{
			//检查必要参数
			Object qryObj = paramsMap.get(Const.QUERY_SQL);
			
			if(qryObj==null){
				paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,"未指定查询参数["+Const.QUERY_SQL+"]");
				return false;
			}
			//调用执行服务
			String ExecType=paramsMap.get("EXEC_TYPE").toString();
			if(ExecType.equals("F")){
				paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,dbUtilService.getFieldsBySQL(paramsMap));
			}else{
				paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,dbUtilService.executeQuery(paramsMap));
			}
		}catch(Exception e){
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
	}
	
	@Transactional
	/**
	 * 获取模板文件
	 * @param params
	 * @return
	 */
	public boolean getDatagridTplXml(Map<String,Object> params){
		try{			
			params.put(erp.util.Const.SERVICE_CALL_RESULT, formsMapper.getDatagridTplXml(params));			
			return true;
		}catch(Exception e){
			params.put(erp.util.Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}		
	}
	
	
	/**
	 * 获取模板文件
	 * @param params
	 * @return
	 */
	public boolean setDatagridTplXml(Map<String,Object> params){
		try{			
			formsMapper.setDatagridTplXml(params);
			params.put(erp.util.Const.SERVICE_CALL_RESULT, "success");			
			return true;
		}catch(Exception e){
			params.put(erp.util.Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
			return false;
		}		
	}
	
	/**
	 * 填加自定义报表查询操作
	 */
	@Transactional
	public void addCusReportResult(CustomReportResult[]results){
		try{
            for(CustomReportResult result : results){
            	formsMapper.addCusReportResult(result);
            }		
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 修改自定义报表查询操作
	 */
	@Transactional
	public void updateCusReportResult(CustomReportResult[]results){
		 for(CustomReportResult result : results){
         	formsMapper.updateCusReportResult(result);
         }	
	}
	
	/**
	 * 删除自定义报表查询操作
	 */
	@Transactional
	public void deleteCusReportResult(CustomReportResult[]results){
		 for(CustomReportResult result : results){
         	formsMapper.deleteCusReportResult(result);
         	CustomQueryUse use=new CustomQueryUse();
         	use.setL_id(result.getList_id());
         	use.setUser_id(result.getCreater());
         	use.setUser_type("people");
         	formsMapper.deleteCommonCustomQueryByLid(use);
         }	
	}
	
	/**
	 * 增加常用自定义查询
	 */
	@Transactional
	public void addCommonCustomQuery(CustomQueryUse[]uses){
		try{
            for(CustomQueryUse use : uses){
            	formsMapper.addCommonCustomQuery(use);
            }		
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 修改常用自定义查询
	 */
	@Transactional
	public void updateCommonCustomQuery(CustomQueryUse[]uses){
		try{
            for(CustomQueryUse use : uses){
            	formsMapper.updateCommonCustomQuery(use);
            }		
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除常用自定查询
	 */
	@Transactional
	public void deleteCommonCustomQuery(CustomQueryUse[]uses){
		try{
            for(CustomQueryUse use : uses){
            	formsMapper.deleteCommonCustomQuery(use);
            }		
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * @return
	 */
	public Map<String,Object> getCodeFrmList(Map<String,Object> param){
		Map<String,Object> resp=new HashMap<String, Object>();
		Map<String,Object> params=new HashMap<String, Object>();
		List<FrmReg> regs=null;
		List<FrmTbl> tbls=null;
		List<FrmRender> renders=null;
		if(BasicData.getMap().get("reg")==null){
			params.put("user_type","FORM_BASE");
			regs=formsMapper.getFrmRegList(params);
			renders=new ArrayList<FrmRender>();
			tbls=new ArrayList<FrmTbl>();
			resp.put("reg", regs);
			for(FrmReg item:regs){
				params.clear();
				params.put("freg_id",item.getFreg_id());
				renders.addAll(formsMapper.getFrmRenderList(params));
				params.put("type", "Master");
				tbls.addAll(formsMapper.getFrmTblList(params));
			}
			BasicData.SetCode("reg",regs);
			BasicData.SetCode("tbl", tbls);
			BasicData.SetCode("renders",renders);
		}
		regs=(List<FrmReg>) BasicData.getMap().get("reg");
		tbls=(List<FrmTbl>) BasicData.getMap().get("tbl");
		renders=(List<FrmRender>) BasicData.getMap().get("renders");
		resp.put("reg",regs);
		resp.put("tbl",tbls);
		resp.put("renders",renders);
		return resp;
	}
	
	//单据数据表
	/**
	 * 获取单据数据表描述清单
	 * Request form/Forms.do?method=getFrmTblList <br/><br/>
	 * Response {data:[{@link FrmTbl}]} <br/><br/>
	 * @param 支持参数：freg_id --单据登记表id,ft_id --单据数据表id,code --单据数据表表名
	 * @return FrmTbl 清单
	 */
	public List<FrmTbl> getFrmTblList(Map<String,Object> params)throws Exception{
		return formsMapper.getFrmTblList(params);
	}
	
	//单据登记表
	/**
	 * 获得单据登记清单
	 * Request form/Forms.do?method=getFrmRegList <br/><br/>
	 * Response {data:[{@link FrmReg}]} <br/><br/>
	 * @param 支持参数:
	 * @return FrmReg 清单
	 */
	public List<FrmReg> getFrmRegList(Map<String,Object> params){
		List<FrmReg> list=formsMapper.getFrmRegList(params);
		return list;
	}
	public List<FrmReg> getFrmRegListByRefDef(Map<String,Object> params){
		return formsMapper.getFrmRegListByRefDef(params);
	}
	
	/**
	 * 新增单据注册
	 * Request form/Forms.do?method=addFrmReg <br/><br/>
	 * Response {data:[{@link FrmReg}]} <br/><br/>
	 * @param frmRegArray
	 */
	@Transactional
	public void addFrmReg(FrmReg[] frmRegArray){
		for(FrmReg frmReg:frmRegArray){
			frmReg.setCreate_dtm(new Date());
			formsMapper.addFrmReg(frmReg);
		}
	}
	/**
	 * 修改单据注册
	 * Request form/Forms.do?method=updateFrmReg <br/><br/>
	 * Response {data:[{@link FrmReg}]} <br/><br/>
	 * @param frmRegArray
	 */
	@Transactional
	public void updateFrmReg(FrmReg[] frmRegArray){
		Map<String,Object> paramMap=new HashMap<String, Object>();
		for(FrmReg frmReg:frmRegArray){
			frmReg.setModify_dtm(new Date());
			formsMapper.updateFrmReg(frmReg);
		}
	}
	/**
	 * 删除单据注册
	 * Request form/Forms.do?method=deleteFrmReg <br/><br/>
	 * Response {data:[{@link FrmReg}]} <br/><br/>
	 * @param frmRegArray
	 */
	@Transactional
	public void deleteFrmReg(FrmReg[] frmRegArray){
		for(FrmReg frmReg:frmRegArray){
			CodeType[] codeTypes=new CodeType[1];
			codeTypes[0]=new CodeType();
			codeService.deleteCodeTypeByFreg(codeTypes);
			/*formsMapper.deleteFrmSubjectByFreg_id(frmReg.getFreg_id());*/
			formsMapper.deleteFrmReg(frmReg);
			
		}
	}
	
	
	/**
	 * 获取脚本数据
	 * Request form/Forms.do?method=getReportScript <br/><br/>
	 * Response {data:[{@link params}]} <br/><br/>
	 * @param params
	 */
	@Transactional
	public List<ReportScript> getReportScript(Map<String,Object> params){
		return formsMapper.getReportScript(params);
	}
	
	
	/**
	 * 写入脚本数据
	 * Request form/Forms.do?method=addReportScript <br/><br/>
	 * Response {data:[{@link ReportScript}]} <br/><br/>
	 * @param reportScriptArray
	 */
	@Transactional
	public void addReportScript(ReportScript[] reportScriptArray){
		for(ReportScript rs: reportScriptArray)
		formsMapper.addReportScript(rs);
	}
	
	
	/**
	 * 修改脚本数据
	 * Request form/Forms.do?method=updateReportScript <br/><br/>
	 * Response {data:[{@link ReportScript}]} <br/><br/>
	 * @param reportScriptArray
	 */
	@Transactional
	public void updateReportScript(ReportScript[] reportScriptArray){
		for(ReportScript rs: reportScriptArray)
		formsMapper.updateReportScript(rs);
	}
	
	/**
	 * 修改脚本数据
	 * Request form/Forms.do?method=updateReportScript <br/><br/>
	 * Response {data:[{@link ReportScript}]} <br/><br/>
	 * @param ReportScript
	 */
	@Transactional
	public void deleteReportScript(ReportScript[] reportScriptArray){
		for(ReportScript rs: reportScriptArray)
		formsMapper.deleteReportScript(rs);
	}
	
	@Transactional
	public boolean checkReportStatus(Map<String,Object> paramsMap){
		return formsMapper.getCustReportCount(paramsMap)>0;
	}
	
	@Transactional
	public void  cancelIssueAndFeed(Map<String,Object>paramMap){
		CustomQueryUse cu=new CustomQueryUse();
		int listId=Integer.valueOf(String.valueOf(paramMap.get("list_id")));
		cu.setL_id(listId);
		formsMapper.deleteCommonCustomQueryByLid(cu);
		formsMapper.updateCusReportByID(listId);
	}
	
	
	/**
	 * 添加单据表，根据需要添加一些内置字段
	 * Request form/Forms.do?method=addFrmTbl <br/><br/>
	 * Response {data:[{@link FrmTbl}]} <br/><br/>
	 * @param frmTblArray
	 * @throws Exception
	 */
	@Transactional
	public void addFrmTbl(FrmTbl[] frmTblArray)throws Exception{
		//提前获取固定字段清单
		Map<String,Object> paramMap=new HashMap<String, Object>();
		paramMap.put("tpl_type",Const.FLDTPL_TYPE_FIXED);
		List<FldTpl> fldtplLst=formsMapper.getFldTplList(paramMap);
		
		for (FrmTbl frmTbl : frmTblArray) {
			List<FrmFld> fldlst = new ArrayList<FrmFld>();
			//根据数据表及单据的类别,增加一些内置字段
			if(frmTbl.getFrom_attr().equals(Const.FRMTBL_FROM_TYPE_USERDEFINE)){
				//只有用户自定义表才需要增加内置字段
				//处理主键
				FrmFld fld = new FrmFld();
				fld.setFt_id(frmTbl.getFt_id());
				fld.setCode(Const.KEY_FIELDCODE);
				fld.setName(Const.KEY_FIELDNAME);
				fld.setDatatype(Const.KEY_FIELDTYPE);
				fld.setNullable(erp.util.Const.YESNO_TYPE_NO);
				fld.setIspk(erp.util.Const.YESNO_TYPE_YES);
				fld.setIsbuildin(erp.util.Const.YESNO_TYPE_YES);
				fldlst.add(fld);
				if(frmTbl.getType().equals(Const.FRMTBL_TYPE_DETAIL)){
					//处理外键
					fld = new FrmFld();
					fld.setFt_id(frmTbl.getFt_id());
					fld.setCode(Const.FKEY_FIELDCODE);
					fld.setName(Const.FKEY_FIELDNAME);
					fld.setDatatype(Const.FKEY_FIELDTYPE);
					fld.setNullable(erp.util.Const.YESNO_TYPE_NO);
					fld.setIsfk(erp.util.Const.YESNO_TYPE_YES);
					fld.setIsbuildin(erp.util.Const.YESNO_TYPE_YES);
					fldlst.add(fld);
				}
				
				//如果是主表那么需要填入固定字段
				if(frmTbl.getType().equals(Const.FRMTBL_TYPE_MASTER))
					for (FldTpl fldTpl : fldtplLst) {
						fld = new FrmFld();
						fld.setFt_id(frmTbl.getFt_id());
						fld.setCode(fldTpl.getFld_code());
						fld.setAlias(fldTpl.getFld_alias());
						fld.setName(fldTpl.getFld_name());
						fld.setDatatype(fldTpl.getDatatype());
						fld.setLen(fldTpl.getLen());
						fld.setPrec(fldTpl.getPrec());
						fld.setNullable(fldTpl.getNullable());
						fld.setCode_type(fldTpl.getCode_type());
						fld.setIsbuildin(erp.util.Const.YESNO_TYPE_YES);
						fldlst.add(fld);
					}
			}else if(frmTbl.getFrom_attr().equals(Const.FRMTBL_FROM_TYPE_EXISTS)){
				//对于已存在表，则需要自动根据表结构提取
				//暂时不处理
			}
			formsMapper.addFrmTbl(frmTbl);
			for(int i=0;i<fldlst.size();i++){	
				FrmFld item = fldlst.get(i);
				item.setFt_id(frmTbl.getFt_id());
				item.setOrder_seq(i+1);
				formsMapper.addFrmFld(item);
			}
		}
	}
	
	
	
	/**
	 * 更新单据数据表
	 * Request form/Forms.do?method=updateFrmTbl <br/><br/>
	 * Response {data:[{@link FrmTbl}]} <br/><br/>
	 * @param frmTblArray
	 * @throws Exception
	 */
	@Transactional
	public void updateFrmTbl(FrmTbl[] frmTblArray)throws Exception{
		for (FrmTbl frmTbl : frmTblArray) {
			formsMapper.updateFrmTbl(frmTbl);
		}
	}
	/**
	 * 删除单据数据表
	 * Request form/Forms.do?method=deleteFrmTbl <br/><br/>
	 * Response {data:[{@link FrmTbl}]} <br/><br/>
	 * @param frmTblArray
	 * @throws Exception
	 */
	@Transactional
	public void deleteFrmTbl(FrmTbl[] frmTblArray)throws Exception{
		for (FrmTbl frmTbl : frmTblArray) {
		Map<String,Object> paramMap=new HashMap<String, Object>();
		paramMap.put("ft_id",frmTbl.getFt_id());
		List<FrmFld> list=formsMapper.getFrmFldList(paramMap);
		for(FrmFld fld:list){
				formsMapper.deleteFrmFld(fld);
		}
			formsMapper.deleteFrmTbl(frmTbl);
		}
	}
	/**
	 * 单据数据表是否已存在
	 * Request form/Forms.do?method=isExistsFrmTbl <br/><br/>
	 * Response {data:boolean} <br/><br/>
	 * @param 支持参数：freg_id --单据登记表id,ft_id --单据数据表id,code --单据数据表表名
	 * @return boolean
	 */
	public boolean isExistsFrmTbl(Map<String,Object> paramsMap){
		return formsMapper.getFrmTblList(paramsMap).size()>0;
	}
	
	/**
	 * 增加字段
	 * Request form/Forms.do?method=addFrmFld <br/><br/>
	 * Response {data:[{@link FrmFld}]} <br/><br/>
	 * @param frmFldArray
	 */
	@Transactional
	public void addFrmFld(FrmFld[] frmFldArray){
		for (FrmFld frmFld : frmFldArray) {
			formsMapper.addFrmFld(frmFld);
		}
	}
	/**
	 * 字段代码是否存在
	 * Request form/Forms.do?method=ExisFldCode <br/><br/>
	 * Response {data:boolean} <br/><br/>
	 * @param paramMap
	 * @return boolean
	 */
	public boolean ExisFldCode(Map<String,Object> paramMap){
		List<FrmFld> list=formsMapper.getFrmFldList(paramMap);
		if(list.size()>0){
			return false;
		}
		return true;
	}
	/**
	 * 更新单据字段
	 * Request form/Forms.do?method=updateFrmFld <br/><br/>
	 * Response {data:[{@link FrmFld}]} <br/><br/>
	 * @param frmFldArray
	 */
	@Transactional
	public void updateFrmFld(FrmFld[] frmFldArray){
		for (FrmFld frmFld : frmFldArray) {
			formsMapper.updateFrmFld(frmFld);
		}
	}
	/**
	 * 删除单据字段
	 * Request form/Forms.do?method=deleteFrmFld <br/><br/>
	 * Response {data:} <br/><br/>
	 * @param frmFldArray
	 */
	@Transactional
	public void deleteFrmFld(FrmFld[] frmFldArray){
		for (FrmFld frmFld : frmFldArray) {
			formsMapper.deleteFrmFld(frmFld);
		}
	}
	
	/**
	 * 提交数据
	 * Request form/Forms.do?method=submitFormData <br/><br/>
	 * @param paramsMap 提交的数据paramsMap[tps.util.Const.AJAX_DATA_ROOT]
	 * 数据格式如下所示：
	 * data:{
				 INSERT_DATA:[{
	    		 		TABLE_NAME:'test',
	    		 		TABLE_FIELDS:[{FIELD_CODE:'id',FIELD_VALUE:'2'},
	    		 		             {FIELD_CODE:'s1',FIELD_VALUE:'动态插入4'}]
	    		 }],
	    		 UPDATE_DATA:[{
	    		 		TABLE_NAME:'test',
	    		 		TABLE_FIELDS:[{FIELD_CODE:'s2',FIELD_VALUE:'s2'},
		    		 		             {FIELD_CODE:'s1',FIELD_VALUE:'s1'}],
	    		 		WHERE_STR:'id=4'
	    		 }],
	    		 DELETE_DATA:[{
	    		 	  TABLE_NAME:'test',
	    		 	  WHERE_STR:'id=2'
	    		 }],
	    		 DATASOURCE_CODE:''<br/>
	    		 		
			}
	 * @return 返回值   true - 执行成功 ,返回结果置于paramsMap[tps.util.Const.SERVICE_CALL_RESULT]
	 *                false - 执行失败,错误信息置于paramsMap[tps.util.Const.SERVICE_CALL_ERROR_MSG];
	 *  返回数据格式如下所示(仅当有新增时才需要返回数据，更新与删除动作无需返回任何数据，除非出错):
	 *  data:{
	 *        tblName1:[{pk_id:1,f1:v1,f2:v2},{pk_id:2,f1:v11,f2:v21}],
	 *        tblName2:[{pk_id:1,f1:v1,f2:v2}]
	 *  }              
	 */
	@SuppressWarnings("unchecked")
	public boolean submitFormData(Map<String,Object> paramsMap){
		String callErrMsg = "";
		paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,"");
		Object dataObj = paramsMap.get(erp.util.Const.AJAX_DATA_ROOT);
		if(WebUtil.isEmpty(dataObj)){
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数["+erp.util.Const.AJAX_DATA_ROOT+"]");
			return false;
		}
		String submitData=dataObj.toString();
		try{
			Map<String,Object> dataMap = WebUtil.getObjectMapper().readValue(submitData, Map.class);
			Map<String,List<Object>> retMap = WebUtil.getAppCtx().getBean(this.getClass()).submitData(dataMap);
			if(retMap==null){
				callErrMsg=dataMap.get(erp.util.Const.SERVICE_CALL_ERROR_MSG).toString();
				return false;
			}
			callErrMsg="数据提交完成!";	
			paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,retMap);
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		}catch(Exception e){
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
	}
    /**
     * 获取附件列表
     * Request form/Forms.do?method=getFrmAttList <br/><br/>
     * Response {data:[{@link FrmAtt}]} <br/><br/>
     * @param params
     * @return
     */
	//表单附件CURD操作
	public List<FrmAtt> getFrmAttList(Map<String,String> params){
		return formsMapper.getFrmAttList(params);
	}
	
	/**
	 * 单据提交的过程（submitFormData）会通过此方法（submitData）来提交单据的数据
	 * @param dataMapList
	 * @return 
	 * @throws Exception
	 */
	@Transactional
	@SuppressWarnings("unchecked")
	public Map<String,List<Object>> submitData(Map<String,Object> dataMap)throws Exception{
		Map<String,List<Object>> retMap = new HashMap<String,List<Object>>();
		//先切换数据源
	    StringBuilder errMsgSB = new StringBuilder();
	    String dsCode = dataMap.get(Const.DATASOURCE_CODE)==null?"":dataMap.get(Const.DATASOURCE_CODE).toString();
		DataSource curDataSource = DBUtil.setCurDataSource(dsCode,errMsgSB);
		if(curDataSource==null){
			dataMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,errMsgSB.toString());
	    	return null;
	    }
	    
		List<Map<String,Object>> deleteDataList = (List<Map<String,Object>>)dataMap.get(Const.DELETE_DATA);
		List<Map<String,Object>> insertDataList = (List<Map<String,Object>>)dataMap.get(Const.INSERT_DATA);
		List<Map<String,Object>> updateDataList = (List<Map<String,Object>>)dataMap.get(Const.UPDATE_DATA);
	
		//执行D.C.U.D
		//先删除
		if(!erp.util.WebUtil.isEmpty(deleteDataList)){
			for(Map<String,Object> deleteData:deleteDataList){
				//如果是主表，还要考虑删除主表的附件
				Map<String,String> frmAttrData = (Map<String,String>)deleteData.get(Const.FRMATTR_DATA);
				if(!WebUtil.isEmpty(frmAttrData)){
					List<FrmAtt> frmAttLst = this.getFrmAttList(frmAttrData);
//					this.deleteFrmAtt((FrmAtt[])frmAttLst.toArray(new FrmAtt[0]));
				}
				dbUtilService.deleteData(deleteData);
			}
		}
		//再新增
		if(!erp.util.WebUtil.isEmpty(insertDataList)){
			int masterPKID = 0;
			Map<String,Object> fkMap = null;
			
			for(Map<String,Object> insertData:insertDataList){
				
				//通过FKEY_FIELDCODE来检测是否主表
				boolean isMasterTbl = true;
				
				Map<String,Object> recMap = new HashMap<String,Object>();
				List<Map<String,Object>> fldMapList = (List<Map<String,Object>>)insertData.get(Const.TABLE_FIELDS);
				int rowNumFldIdx =-1;
				for (Map<String,Object> fldMap : fldMapList) {
					Object obj = fldMap.get(Const.FIELD_CODE);
					if(obj!=null){
						String sFldCode = obj.toString();
						if(sFldCode.equals(Const.ROW_NUMBER)){
							//去掉rowNumber，这个是supcan特有的
							rowNumFldIdx =fldMapList.indexOf(fldMap);
						}
						if(sFldCode.equals(Const.FKEY_FIELDCODE)){
							//找到外键所在
							isMasterTbl = false;
							fkMap = fldMap;
						}
						recMap.put(fldMap.get(Const.FIELD_CODE).toString(),fldMap.get(Const.FIELD_VALUE));
					}
				}
				if(rowNumFldIdx>=0)
					fldMapList.remove(rowNumFldIdx);
				
				//重置一遍dbtype,防止遗漏
				
				
				if(!isMasterTbl&&masterPKID!=0&&fkMap!=null){
					//是从表，且需要借用主表的pk时
					fkMap.put(Const.FIELD_VALUE, masterPKID);
					recMap.put(Const.FKEY_FIELDCODE, masterPKID);
				}
				
				dbUtilService.insertData(insertData);
				
				//如果是主表那么需要在插入后找到pk以供从表新增时作为外键使用
				logger.debug("----------------isMaster="+isMasterTbl);
				if(isMasterTbl){
					masterPKID = insertData.get(Const.KEY_FIELDCODE)==null?0:Integer.parseInt(insertData.get(Const.KEY_FIELDCODE).toString());
					logger.debug("----------------masterPKID="+masterPKID);
				}
				
				//回填主键
				recMap.put(Const.KEY_FIELDCODE, insertData.get(Const.KEY_FIELDCODE));
				//返回结果
				String tblName = insertData.get(Const.TABLE_NAME).toString().replaceAll(Const.TABLE_PREFIX, "");
				if(retMap.containsKey(tblName)){
					retMap.get(tblName).add(recMap);
				}else{
					List<Object> tblData = new ArrayList<Object>();
					tblData.add(recMap);
					retMap.put(tblName, tblData);
				}
			}
		}
		//最后做更新
		if(!erp.util.WebUtil.isEmpty(updateDataList)){
			for(Map<String,Object> updateData:updateDataList){
				dbUtilService.updateData(updateData);
			}
				
		}
		return retMap;
	}
	
	/**
	 * 单据表的创建
	 * Request form/Forms.do?method=createFormTable <br/><br/>
	 * Response {data:boolean} <br/><br/>
	 * @param paramsMap
	 * * 参数:  data:{ft_id=1,code=test_tbl,dscode='',code:'',name:''}
	 * @return boolean
	 * @throws Exception
	 */
	public boolean createFormTable(Map<String,Object> paramsMap)throws Exception{
		String callErrMsg = "";
		boolean callResult = false;
		paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,callResult);
		try{
			Object dataObj = paramsMap.get(erp.util.Const.AJAX_DATA_ROOT);
			if(WebUtil.isEmpty(dataObj)){
				paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数["+erp.util.Const.AJAX_DATA_ROOT+"]");
				return false;
			}
			
			FrmTbl frmTbl = WebUtil.getObjectMapper().readValue(dataObj.toString(), FrmTbl.class);
			String tblName = Const.TABLE_PREFIX+frmTbl.getCode();
			StringBuilder errMsgSB = new StringBuilder();
			if(!this.createTable(frmTbl, errMsgSB)){
				callErrMsg = String.format("创建数据表[%1s(%2s)]出错,错误原因:%3s",
						frmTbl.getName(),
						tblName,
						errMsgSB.toString());
				paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
				return false;
			}
			String tblMsg =frmTbl.getName()+"("+Const.TABLE_PREFIX+frmTbl.getCode()+");";
			callResult=true;
			callErrMsg=String.format("数据表[%s(%s)]创建成功!",frmTbl.getName(),tblName);
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
			paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,callResult);
		}catch(Exception e){
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
	}
	
	/**
	 * 单据表的创建过程（createFormTable）将调用此方法来创建单据表
	 * @param frmTbl
	 * @param errMsgSB
	 * @return boolean
	 * @throws Exception
	 */
	protected boolean createTable(FrmTbl frmTbl,StringBuilder errMsgSB)throws Exception{
		
		//先切换数据源
		DataSource curDataSource = DBUtil.setCurDataSource(frmTbl.getDscode(),errMsgSB);
		if(curDataSource==null){
	    	return false;
	    }
		String sDbType = DBUtil.getDbType(curDataSource);    
		
		
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		String tblName = Const.TABLE_PREFIX+frmTbl.getCode();
		paramsMap.put("tbl_name", tblName);
		//先删除表
		if(dbUtilService.showTable(paramsMap).equalsIgnoreCase(tblName))
			dbUtilService.dropTable(paramsMap);
		
		//再作建表
		//取得定义的字段列表
		paramsMap.clear();
		paramsMap.put("ft_id", frmTbl.getFt_id());
		List<FrmFld> frmFldList =formsMapper.getFrmFldList(paramsMap);
		if(frmFldList.size()==0){
			errMsgSB.append("建表所需的字段未定义!");
			return false;
		}
		paramsMap.clear();
		//表名
		List<Map<String,Object>> fldList = new ArrayList<Map<String,Object>>();
		//构造数据表的字段列表
		paramsMap.put(Const.TABLE_NAME, tblName);
		paramsMap.put(Const.TABLE_FIELDS, fldList);
		
		Map<String,Object> fldMap = new HashMap<String,Object>();
		for (FrmFld frmFld : frmFldList) {
			fldMap = new HashMap<String,Object>();
			//字段名
			fldMap.put(Const.FIELD_CODE, frmFld.getCode());
			//数据类型等
			fldMap.put(Const.FIELD_DATATYPE, DBUtil.makeDataTypeStr(sDbType,frmFld));
			//字段属性
			fldMap.put(Const.FIELD_ATTR, DBUtil.makeFieldAttrStr(sDbType,frmFld));
			fldList.add(fldMap);
		}
		fldMap = new HashMap<String,Object>();
		fldMap.put(Const.FIELD_CODE, "primary key("+Const.KEY_FIELDCODE+")");
		fldMap.put(Const.FIELD_DATATYPE, "");
		fldMap.put(Const.FIELD_ATTR,"");
		fldList.add(fldMap);
		//执行建表
		dbUtilService.createTable(paramsMap);
		return true;
	}
	
	/**
	 * 判断查询的单据表是否存在
	 * Request form/Forms.do?method=existsFormTable <br/><br/>
	 * Response {data:boolean} <br/><br/>
	 * @param paramsMap<br/>
	 * 参数:  data:{ft_id=1,code=test_tbl,dscode='',code:'',name:''}
	 * @return
	 * @throws Exception
	 */	
	@SuppressWarnings("unchecked")
	public boolean existsFormTable(Map<String,Object> paramsMap)throws Exception{
		String callErrMsg = "";
		boolean callResult = false;
		paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,callResult);
		try{
			Object dataObj = paramsMap.get(erp.util.Const.AJAX_DATA_ROOT);
			if(WebUtil.isEmpty(dataObj)){
				paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数["+erp.util.Const.AJAX_DATA_ROOT+"]");
				return false;
			}
			StringBuilder errMsgSB = new StringBuilder();
			FrmTbl frmTbl = WebUtil.getObjectMapper().readValue(dataObj.toString(), FrmTbl.class);
			
			//先切换数据源
			DataSource curDataSource = DBUtil.setCurDataSource(frmTbl.getDscode(),errMsgSB);
			if(curDataSource==null){
				paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,errMsgSB.toString());
		    	return false;
		    }
			
			String tblName = Const.TABLE_PREFIX+frmTbl.getCode();
			paramsMap.put("tbl_name", tblName);
			if( dbUtilService.showTable(paramsMap).equalsIgnoreCase(tblName)){
				callErrMsg="数据表["+tblName+"]存在!";
				callResult=true;
			}else
				callErrMsg="数据表["+tblName+"]不存在!";
			
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
			paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,callResult);
		}catch(Exception e){
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
		
		
	}
	
	/**
	 * 单据表的删除
	 * Request form/Forms.do?method=dropFormTable <br/><br/>
	 * Response {data:boolean} <br/><br/>
	 * @param paramsMap
	 * * 参数:  data:{ft_id=1,code=test_tbl,dscode='',code:'',name:''}
	 * @return boolean
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public boolean dropFormTable(Map<String,Object> paramsMap)throws Exception{
		String callErrMsg = "";
		boolean callResult = false;
		paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,callResult);
		try{
			Object dataObj = paramsMap.get(erp.util.Const.AJAX_DATA_ROOT);
			if(WebUtil.isEmpty(dataObj)){
				paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数["+erp.util.Const.AJAX_DATA_ROOT+"]");
				return false;
			}
			StringBuilder errMsgSB = new StringBuilder();
			FrmTbl frmTbl = WebUtil.getObjectMapper().readValue(dataObj.toString(), FrmTbl.class);
			
			//先切换数据源
			DataSource curDataSource = DBUtil.setCurDataSource(frmTbl.getDscode(),errMsgSB);
			if(curDataSource==null){
				paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,errMsgSB.toString());
		    	return false;
		    }
			String tblName = Const.TABLE_PREFIX+frmTbl.getCode();
			
			paramsMap.put("tbl_name", tblName);
			dbUtilService.dropTable(paramsMap);
			callErrMsg="数据表["+tblName+"]删除成功!";
			callResult=true;
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
			paramsMap.put(erp.util.Const.SERVICE_CALL_RESULT,callResult);
		}catch(Exception e){
			paramsMap.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
	}
	/**
     * 商业对象未选择字段清单
     * Request form/Forms.do?method=getUnSelectionFieldList <br/><br/>
     * Response {data: List<BuzFrmField>} <br/><br/>
     * @param paramsMap
     * * 参数:  data:{ft_id=1,code=test_tbl,dscode='',code:'',name:''}
     * @return  List<BuzFrmField>
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<BuzFrmField> getUnSelectionFieldList(Map<String,Object> paramsMap)throws Exception{
        return formsMapper.getUnSelectionFieldList(paramsMap);
    }
    
    public List<FrmtblRelationship> getFrmtblRelationshipList(Map<String,Object> params) {
		return formsMapper.getFrmtblRelationshipList(params);
	}
	public void addFrmtblRelationship(FrmtblRelationship[] arr) {
		for(FrmtblRelationship obj: arr) {
			//更新表定义中的对应字段，修改成外键
			formsMapper.updateFrmFldFK(obj.getFk_fld());
			//新增关联关系记录
			formsMapper.addFrmtblRelationship(obj);
		}
	}
	public void updateFrmtblRelationship(FrmtblRelationship[] arr) {
		for(FrmtblRelationship obj: arr) {
			formsMapper.updateFrmtblRelationship(obj);
		}
	}
	public void deleteFrmtblRelationship(FrmtblRelationship[] arr) {
		for(FrmtblRelationship obj: arr) {
			formsMapper.deleteFrmtblRelationship(obj);
		}
	}
	
}
