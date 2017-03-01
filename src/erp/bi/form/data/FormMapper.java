package erp.bi.form.data;




import java.util.List;
import java.util.Map;

import erp.bi.form.model.BuzFrmField;
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
import erp.cp.ContentPermit;


public interface FormMapper {

	//单据登记表
	List<FrmReg> getFrmRegList(Map<String,Object> params);
	int getCountFrmReg(Map<String,Object> params);
	void addFrmReg(FrmReg frmReg);
	void updateFrmReg(FrmReg frmReg);
	void deleteFrmReg(FrmReg frmReg);
	List<FrmReg> getFrmRegListByRefDef(Map<String,Object> params);
	
	//单据呈现表
	List<FrmRender> getFrmRenderList(Map<String,Object> params);
	void addFrmRender(FrmRender frmRender);
	void updateFrmRender(FrmRender frmRender);
	void deleteFrmRender(FrmRender frmRender);
	int getFrmRenderCountByFregId(int fregId);
	//单据附件
	List<FrmAtt> getFrmAttList(Map<String,String> paramMap);
	void addFrmAtt(FrmAtt FrmAtt);
	void updateFrmAtt(FrmAtt FrmAtt);
	void deleteFrmAtt(FrmAtt FrmAtt);
	
	//单据数据表
	List<FrmTbl> getFrmTblList(Map<String,Object> params);
	int getFrmTblCountByFregId(int fRegId);
	String getFrmTblCodeByBoDefId(int boDefId);
	void addFrmTbl(FrmTbl frmTbl);
	void updateFrmTbl(FrmTbl frmTbl);
	void deleteFrmTbl(FrmTbl frmTbl);
	void deleteFrmTblByFregId(int fregId);
	
	//自定义查询操作结果集
	@ContentPermit(type="tps.cp.ContentPermitAuth",param="Keyfield='list_id',module='report'")
	List<CustomReportResult> getCusReportResult(Map<String,Object> params);
	void addCusReportResult(CustomReportResult result);
	void deleteCusReportResult(CustomReportResult result);
	void updateCusReportResult(CustomReportResult result);
	void updateCusReportByID(int list_id);
	int getListId(Map<String,Object> params);
	int getCustReportCount(Map<String,Object> params);
	public String getDatagridTplXml(Map<String,Object> params);
	void setDatagridTplXml(Map<String,Object> params);
	
	//自定义查询条件
    void addCustomQueryCdtion(CustomQueryCdtion cdtions);
	void deleteCustomQueryCdtion(CustomQueryCdtion result);
    void updateCustomQueryCdtion(CustomQueryCdtion result);
    
	List<CustomQueryCdtion> getCustomQueryCdtion(Map<String,Object> paramMap);
	
	//常用自定义查询
	List<CustomQueryUse> getCommonCustomQuery(Map<String,Object> paramMap);
	void addCommonCustomQuery(CustomQueryUse use);
	void updateCommonCustomQuery(CustomQueryUse use);
	void deleteCommonCustomQuery(CustomQueryUse use);
	void deleteCommonCustomQueryByLid(CustomQueryUse use);
	//自定义查询
	List<Map<String,Object>> cusFromQuery(Map<String,Object> paramsMap);
	
	//报表脚本
	List<ReportScript> getReportScript(Map<String,Object> paramMap);
	void addReportScript( ReportScript rs);
	void updateReportScript(ReportScript rs);
	void deleteReportScript(ReportScript rs);
	
	//字段模板
	List<FldTpl> getFldTplList(Map<String,Object> paramMap);
	void addFldTpl(FldTpl FldTpl);
	void updateFldTpl(FldTpl FldTpl);
	void deleteFldTpl(FldTpl FldTpl);
	
	//单据字段表
	List<FrmFld> getFrmFldList(Map<String,Object> params);
	List<FrmFld> getFrmFldLists(Map<String,Object> params);
	int getCountFrmFld(Map<String,Object> params);
	int getPKFrmFldCountByFtblId(int fTblId);
	int getFrmFldCountByFtblId(int fTblId);
	void addFrmFld(FrmFld frmFld);
	//void addFrmFld_Oracle(FrmFld frmFld);
	void updateFrmFld(FrmFld frmFld);
	void deleteFrmFld(FrmFld frmFld);
	void deleteFrmFldByFtId(int ftId);
	void updateFrmFldFK(int ffId);
	List<FrmFld> getFrmFldsByTblName(Map<String,Object> paramMap);
	//商业对象字段选择器
	List<BuzFrmField> getUnSelectionFieldList(Map<String,Object> paramMap);
	//表关联关系定义
	public List<FrmtblRelationship> getFrmtblRelationshipList(Map<String,Object> params);
	public void addFrmtblRelationship(FrmtblRelationship obj);
	public void updateFrmtblRelationship(FrmtblRelationship obj);
	public void deleteFrmtblRelationship(FrmtblRelationship obj);
	public void deleteFrmtblRelationByFtid(int ftId);
	public void deleteFrmtblRelationByFfid(int ffId);
}
