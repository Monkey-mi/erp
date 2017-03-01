package erp.web.data;





import java.util.List;
import java.util.Map;

import erp.web.model.*;


public interface OrgMapper {
	//组织单元相关
	List<OrgUnit> getOrgUnitList(Map<String,Object> paramsMap);
	List<UnitTree> getOrgUnitListByOrgRelDetail(Map<String,Object> paramsMap);
	int addOrgUnit(OrgUnit orgUnit);
	int updateOrgUnit(OrgUnit orgUnit);
	int deleteOrgUnit(OrgUnit orgUnit);
	List<OrgrelDetail> getOrgrelDetailByUnit(String ou_code);

    //部门相关
	void addDept(Dept dept);
	void updateDept(Dept dept);
	void deleteDept(int mId);
	void deleteDeptByUnitId(int uId);
	int getCountOfDept(Map<String,Object> paramMap);
	int getCountByPId(Map<String,Object> paramMap);
	List<Dept> getDeptWithParent(Map<String,Object> paramMap);
	List<Dept> getDeptList(Map<String,Object> paramMap);
	List<Dept> getDeptChartList(Map<String,Object> paramsMap);
    //组织关系相关
	List<OrgRel> getOrgRelList(Map<String,Object> paramsMap);
	void addOrgRel(OrgRel orgRel);
	void updateOrgRel(OrgRel orgRel);
	void deleteOrgRel(OrgRel orgRel);
	List<OrgTreeNode> getOrgTreeNodeWithParent(Map<String,Object> paramsMap);
	List<OrgTreeNode> getOrgTreeNodeWithParentByUser(Map<String,Object> paramsMap);
	List<OrgTreeNode> getOrTypeTreeNodeByUser(Map<String,Object> paramsMap);	
	List<OrgTreeNode> getOrTypeTreeNode(Map<String,Object> paramsMap);	
	
	//组织关系详情相关
	List<OrgrelDetail> getOrgrelDetailList(Map<String,Object> paramMap);
	void deleteOrgrelDetailByOu(int ou_id);
	void addOrgrelDetail(OrgrelDetail orgrelDetail);
	void updateOrgrelDetail(OrgrelDetail orgrelDetail);
	void deleteOrgrelDetail(OrgrelDetail orgrelDetail);
	int getCountOfOrgRelDetail(Map<String,Object> paramMap);
	//组织关系版本相关
	List<OrgRelVer> getOrgRelVerList(Map<String,Object> paramMap);
	void addOrgRelVer(OrgRelVer orv);
	void updateOrgRelVer(OrgRelVer orv);
	void deleteOrgRelVer(OrgRelVer orv);
	void deleteOrgRelVerByOr(int or_id);
	void deleteOrgrelDetailByOrv(int orv_id);
	OrgRelVer getNewOrv_id(Map<String,Object> paramMap);
	int getOrvId(Map<String,Object> paramMap);
	List<OrgRelVerUpdated> getOrgRelVerUpdatedList(Map<String,Object> paramMap);
	List<DeptTreeNode> getDeptTreeNodeWithParentByUser(Map<String,Object> paramMap);
	List<DeptTreeNode> getAllDeptTreeNode(Map<String,Object> paramMap);
	List<DeptTreeNode> getAllDeptTreeNodeByUser(Map<String,Object> paramMap);
	//根据ou_code和or_type返回最新对应树的版本所在的od_id
	Map<String,Object> getOdIdByOrgTree(Map<String,Object> paramMap);
	List<OrgTreeNode> getOrgRelDetailinOrg(Map<String,Object> paramMap);
	
	//用户组织
	List<UserOrg> getUserOrgListByUid(int uid);
	List<UserOrg> getUserOrgList(Map<String,Object> param);
	int addUserOrg(UserOrg uo);
	int deleteUserOrg(UserOrg uo);
	int deleteUserOrgByUid(int uid);
	int deleteUserOrgByOUid(int ouid);
	//用户部门
	List<UserDept> getUserDeptListByUid(int uid);
	int addUserDept(UserDept ud);
	int deleteUserDept(UserDept ud);
	int deleteUserDeptByUid(int uid);
	int deleteUserDeptByDid(int did);
		
}
