package erp.common.service;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.main.data.CodeMapper;
import erp.common.main.service.BasicData;
import erp.common.model.Code;
import erp.common.model.CodeConfig;
import erp.common.model.CodeType;
import erp.common.model.Ddlstcol;
import erp.util.Const;

@Service("CodeService")
public class CodeService {
	@Autowired
	private CodeMapper codeMapper;
	protected static Logger logger = Logger.getLogger("service");
	static List<Code> codes;
	public String getDefaultStyleCSS(){
		String  styleCSS = "ext-all";
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		paramsMap.put("DB_TYPE","MYSQL");
		paramsMap.put("type_code", Const.SYS_PARAMETERS);
		paramsMap.put("code", "DEFAULT_THEME_CSS%");
		List<Code> codeLst = codeMapper.getCodeList(paramsMap);
		if(codeLst!=null&&codeLst.size()>0){
			styleCSS = codeLst.get(0).getValue().trim();
		}
		return styleCSS;
	}
	
	/**
	 * 基础数据新增配置
	 * @throws Exception 
	 * 
	 */
	public boolean checkCodeConfig(Map<String,Object> params) throws Exception{
		List<CodeConfig> codeconfig=codeMapper.getCodeConfigList(params);
		if(codeconfig.size()>0){
			return false;
		}
		return true;
	}
	/**
	 * 增加代码类型
	 * Request main/Codes.do?method=addCodeType <br/><br/>
	 * Response {data:[{@link CodeType}]} <br/><br/>
	 * @param codeTypes 增加代码类型 {@link CodeType}
	 */
	@Transactional
	public void addCodeType(CodeType[] codeTypes){
		for (CodeType codeType : codeTypes) {
			codeMapper.addCodeType(codeType);
		}
	}
	/**
	 * 更新代码种类
	 * Request main/Codes.do?method=updateCodeType <br/><br/>
	 * Response {data:[{@link CodeType}]} <br/><br/>
	 * @param codeTypes 更新代码种类 {@link CodeType}
	 * @throws Exception
	 */
	@Transactional
	public void updateCodeType(CodeType[] codeTypes)throws Exception{
		for (CodeType codeType : codeTypes) {
			codeMapper.updateCodeType(codeType);
		}
	}
	/**
	 * 删除代码种类
	 * Request main/Codes.do?method=deleteCodeType <br/><br/>
	 * Response {data:} <br/><br/>
	 * @param codeTypes 删除代码种类 {@link CodeType}
	 */
	@Transactional
	public void deleteCodeType(CodeType[] codeTypes){
		for (CodeType codeType : codeTypes) {
			codeMapper.deleteCodeType(codeType);
		}
	}
	/**
	 * 增加代码
	 * Request main/Codes.do?method=addCode <br/><br/>
	 * Response {data:[{@link Codes}]} <br/><br/>
	 * @param codes 增加的代码 {@link Code}
	 */
	@Transactional
	public void addCode(Code[] codes){
		for(Code code:codes){
			codeMapper.addCode(code);
		}
	}
	
	/**
	 * 更新代码
	 * Request main/Codes.do?method=updateCode <br/><br/>
	 * Response {data:[{@link Code}]} <br/><br/>
	 * @param codes 更新代码 {@link Code}
	 */
	@Transactional
	public void updateCode(Code[] codes){
		for(Code code:codes){
			int rowNum =codeMapper.updateCode(code);
		}
	}
	
	/**
	 * 删除代码
	 * Request main/Codes.do?method=deleteCode <br/><br/>
	 * Response {data:[{@link Code}]} <br/><br/>
	 * @param codes 删除代码 {@link Code}
	 */
	@Transactional
	public void deleteCode(Code[] codes){
		for(Code code:codes){
			codeMapper.deleteCode(code);
		}
	}
	/**
	 * 代码类型code 是否重复
	 * Request main/Codes.do?method=isExistsCodeType <br/><br/>
	 * @param params code <br/><br/>
	 * @return boolean
	 */
	public boolean isExistsCodeType(Map<String,Object> params){
		return codeMapper.getCodeTypeCount(params)>0;
	}
	
	/**
	 * code是否重复
	 * Request main/Codes.do?method=isExistsCode <br/><br/>
	 * Response {data:true||false} <br/><br/>
	 * @param params
	 * @return boolean
	 */
	public boolean isExistsCode(Map<String,Object> params){
		return codeMapper.getCodeCount(params)>0;
	}
	/**
	 * code或者name是否重复
	 * Request main/Codes.do?method=isExistsCodeOrName <br/><br/>
	 * Response {data:true||false} <br/><br/>
	 * @param params
	 * @return boolean
	 */
	public boolean isExistsCodeOrName(Map<String,Object> params){
		return codeMapper.getCodeCountByCodeOrName(params)>0;
	}
	/**
	 * 根据参数获取代码数量
	 * Request main/Codes.do?method=getCodeCount <br/><br/>
	 * Response {data:int} <br/><br/>
	 * @param params c_id,type_code
	 * @return int 
	 */
	public int getCodeCount(Map<String,Object> params){
		return codeMapper.getCodeCount(params);
	}
	/**
	 * 获取首页标题
	 * * Request main/Codes.do?method=getIndexTitle <br/><br/>
	 * Response {data:[{@link String}]}
	 * @return
	 */
	public String getIndexTitle(){
		String idxTitle ="TPS";
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		paramsMap.put("type_code", Const.SYS_PARAMETERS);
		paramsMap.put("code", "INDEX_TITLE%");
		List<Code> codeLst = codeMapper.getCodeList(paramsMap);
		if(codeLst!=null&&codeLst.size()>0){
			idxTitle = codeLst.get(0).getValue().trim();
		}
		return idxTitle;
	}
	
	public List<Code> getCodeList(Map<String,Object> params){
		int total=0;
		if(params.get("mode")!=null&&params.get("mode").equals("allSearch")){
			String condition=(String) params.get("condition");
			params.put("name",'%'+condition+'%');
			List<Code> name=codeMapper.getCodeListBySearch(params);
			if(name.size()>0){
				return name;
			}
			params.remove("name");
			params.put("value",'%'+condition+'%');
			List<Code> value=codeMapper.getCodeListBySearch(params);
			if(value.size()>0){
				return value;
			}
			params.remove("value");
			params.put("code",'%'+condition+'%');
			List<Code> code=codeMapper.getCodeListBySearch(params);
			if(code.size()>0){
				return code;
			}
			params.remove("code");
		}
		else if(params.get("mode")!=null&&params.get("mode").equals("Screening")){
			String condition=(String) params.get("condition");
			if(condition!=null){
			params.put("name", '%'+condition+'%');
			List<Code> name=codeMapper.getCodeList(params);
			if(name.size()>0){
				return name;
			}else{
				params.remove("name");
				params.put("value",'%'+condition+'%');
				List<Code> value=codeMapper.getCodeList(params);
				if(value.size()>0){
					return value;
				}
				params.remove("value");
			}
			return codeMapper.getCodeList(params);
		}else{
			return codeMapper.getCodeList(params);
		}
			}
		return codeMapper.getCodeList(params);
	}
	
	/**
	 * 取得下拉帮助列表明细
	 * @param params
	 * @return
	 */
	public List<Ddlstcol> getDdlstcolList(Map<String,Object> params){
		return codeMapper.getDdlstcolList(params);
	}
	
	/**
	 * 通过Freg删除代码种类
	 * Request main/Codes.do?method=deleteCodeTypeByType <br/><br/>
	 * Response {data:[{@link codeTypes}]} <br/><br/>
	 * @param codeTypes
	 */
	@Transactional
	public void deleteCodeTypeByFreg(CodeType[] codeTypes){
		for(CodeType item:codeTypes){
			codeMapper.deleteCodeTypeByType(item);
		}
	}
	
	/**
	 * 获取代码类型
	 * Request main/Codes.do?method=getCodeTypeList <br/><br/>
	 * Response {data:[{@link CodeType}]} <br/><br/>
	 * @param params
	 * @return CodeType
	 */
	public List<CodeType> getCodeTypeList(Map<String,Object> params){
		//由于考虑到这个方法用到的地方很多，大致有三种，后台取数，前台不带参数，前台带参数
		List<CodeType> codeType=null;
		if(params.get("basic")==null){
			return codeMapper.getCodeTypeList(params);
		}
		String flag=(String) params.get("basic");
		if(flag!="true"){
			codeType=(List<CodeType>)BasicData.getMap().get("codeType");
		}
		if(codeType==null){
			codeType=codeMapper.getCodeTypeList(params);
			BasicData.SetCode("codeType",codeType);
		}
		return codeType;
	}
	
	/**
	    * 基础数据帮助配置
	    */
		/**
		 * 获取基础数据帮助配置表
		 * Request main/Codes.do?method=getCodeConfigList <br/><br/>
		 * Response {data:[{@link CodeConfig}]} <br/><br/>
		 * @param id,name,code,type
		 * 
		 */
		public List<CodeConfig> getCodeConfigList(Map<String,Object> params){
			return codeMapper.getCodeConfigList(params);
		}
		
		/**
		 * 新增基础数据帮助配置
		 * Request main/Codes.do?method=addCodeConfig <br/><br/>
		 * Response {data:[{@link CodeConfig}]} <br/><br/>
		 * @param codeConfigs
		 */
		@Transactional
		public void addCodeConfig(CodeConfig[] codeConfigs){
			for(CodeConfig item:codeConfigs){
				codeMapper.addCodeConfig(item);
			}
		}
		/**
		 * 更新基础数据帮助配置
		 * Request main/Codes.do?method=updateCodeConfig <br/><br/>
		 * Reponse {data:[{@link CodeConfig}]}
		 * @param
		 */
		@Transactional
		public void updateCodeConfig(CodeConfig[] codeConfigs){
			for(CodeConfig item:codeConfigs){
				codeMapper.updateCodeConfig(item);
			}
		}
		/**
		 * 删除基础数据帮助配置
		 * Request main/Codes.do?method=deleteCodeConfig <br/><br/>
		 * @param codeConfigs
		 */
		@Transactional
		public void deleteCodeConfig(CodeConfig[] codeConfigs){
			for(CodeConfig item:codeConfigs){
				codeMapper.deleteCodeConfig(item);
			}
		}
		public boolean deleteCodeConfigByCode(Map<String,Object> params) {
			try{
				codeMapper.deleteCodeConfigByCode(params);
				params.put(Const.SERVICE_CALL_RESULT, params.get("typecode"));
				return true;
			}catch(Exception e){
				params.put(Const.SERVICE_CALL_ERROR_MSG, e.getMessage());
				return false;
			}
		}
		public List<CodeType> getCodeTypeSuitList(Map<String,Object> params){
			return codeMapper.getCodeTypeSuitList(params);
		}
}
