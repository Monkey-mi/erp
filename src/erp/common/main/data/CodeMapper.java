package erp.common.main.data;



import java.util.List;
import java.util.Map;

import erp.common.model.Code;
import erp.common.model.CodeConfig;
import erp.common.model.CodeType;
import erp.common.model.Ddlstcol;

public interface CodeMapper {
	
	int getCodeCount(Map<String,Object> params);
	int getCodeCountByCodeOrName(Map<String,Object> params);
	void addCode(Code code);
	int updateCode(Code code);
	void deleteCode(Code code);
	
	List<Code> getCodeList(Map<String,Object> params);
	List<Code> getCodeListBySearch(Map<String,Object> params);
	
	List<Ddlstcol> getDdlstcolList(Map<String,Object> params);
	//简单代码类别
	List<CodeType> getCodeTypeList(Map<String,Object> params);
	List<CodeType> getCodeTypeAttribList(Map<String,Object> params);
	List<CodeType> getCodeTypeAsCodeType(Map<String,Object> params);
	List<CodeType> getCodeTypeSuitList(Map<String,Object> params);
	int getCodeTypeCount(Map<String,Object> params);
	void addCodeType(CodeType codeType);
	//void addCodeType_Oracle(CodeType codeType);
	void updateCodeType(CodeType codeType);
	void deleteCodeType(CodeType codeType);
	void deleteCodeTypeByType(CodeType codeType);
	
	
	 /*基础数据配置*/
    List<CodeConfig> getCodeConfigList(Map<String,Object> params);
    void addCodeConfig(CodeConfig codeConfig);
    void updateCodeConfig(CodeConfig codeConfig);
    void deleteCodeConfig(CodeConfig codeConfig);
    void deleteCodeConfigByCode(Map<String,Object> params);
	
}
