package erp.common.main.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.util.Const;
import erp.util.SessionUtil;
import erp.util.WebUtil;
import erp.web.data.OrgMapper;
import erp.web.data.UsersMapper;
import erp.web.model.DeptTreeNode;
import erp.web.model.OrgRelVerUpdated;
import erp.web.model.OrgTreeNode;
import erp.web.model.UserDept;
import erp.web.model.UserFunc;
import erp.web.model.UserModule;
import erp.web.model.UserOrg;
import erp.web.model.UserRole;



@Service
public class OrgsService {
	@Autowired
	private OrgMapper orgMapper;
	
	@Autowired
	private UsersMapper  usersMapper;
	/**
	 * 在指定组织树上查找指定父节点下的全部子节点
	 * @param or_type 组织类型  ou_code 组织编码
	 * @return 列表而不是树形结构的List<OrgTreeNode>
	 */
	public List<OrgTreeNode> getAllOrTypeTreeSubOuByParent(String or_type, String ou_code){
		if(or_type == null || or_type.trim().equals(""))
			or_type = Const.DEFAULT_ORTYPE;
		List<OrgTreeNode> ret = new ArrayList<OrgTreeNode>();
		List<OrgTreeNode> nodes = getDirectOrTypeTreeSubOuByParent(or_type, ou_code);
		ret.addAll(nodes);
		for(OrgTreeNode node : nodes){
			List<OrgTreeNode> subs = getAllOrTypeTreeSubOuByParent(or_type, node.getOu_code());
			ret.addAll(subs);
		}
		return ret;
	}
	
	/**
	 * 在指定组织树上查找指定父节点下的直接子节点
	 * @param or_type 组织类型  ou_code 组织编码
	 * @return 列表而不是树形结构的List<OrgTreeNode>
	 */
	public List<OrgTreeNode> getDirectOrTypeTreeSubOuByParent(String or_type, String ou_code){
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("or_type", or_type);
		params.put("ou_code", ou_code);
		return getDirectOrTypeTreeSubOuByParent(params);
	}
	
	/**
	 * 在指定组织树上查找指定父节点下的直接子节点
	 * @param or_type 组织类型 ou_id 或 ou_code
	 * @return
	 */
	public List<OrgTreeNode> getDirectOrTypeTreeSubOuByParent(Map<String,Object> params){

		List<OrgTreeNode> ret = new ArrayList<OrgTreeNode>();
		String or_type = (String)params.get("or_type");
		if(or_type == null){
			//默认取人力树
			or_type = Const.DEFAULT_ORTYPE;
		}
		
		List<OrgTreeNode> tree = this.getOrgTreeFromSession(or_type);
	
		OrgTreeNode p = getOrgTreeNodeByCache(params);
		if(p != null && tree != null){
			for(int i = 0; i < tree.size(); ++i){
				OrgTreeNode node = tree.get(i);
				if(node != null){
					if(node.getParentId() == p.getId()){
						ret.add(node);
					}
				}
			}
		}
		
		return ret;
	}
	
	/**
	 * 取有效的组织树版本
	 * Request main/Orgs.do?method=getOrgRelVerUpdatedList <br/><br/>
	 * Response {data:[{@link OrgRelVerUpdated}}]} <br/><br/>
	 * @param paramMap or_type,is_valid
	 * @return OrgRelVerUpdated
	 */
	public List<OrgRelVerUpdated> getOrgRelVerUpdatedList(Map<String,Object> paramMap){
		List<OrgRelVerUpdated> list=orgMapper.getOrgRelVerUpdatedList(paramMap);
		return list;
	}
	
	/**
	 * 保存组织部门授权信息
	 * @param paramsMap data -提交的数据，结构为:{u_id -目标用户id, orgauth -组织授权数组，deptauth -部门授权数组}
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean saveOrgDeptAuth(Map<String,Object> paramsMap){
		String callErrMsg = "";
		paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		paramsMap.put(Const.SERVICE_CALL_RESULT,"");
		Object dataObj = paramsMap.get(Const.AJAX_DATA_ROOT);
		if(WebUtil.isEmpty(dataObj)){
			paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,"未指定调用参数["+Const.AJAX_DATA_ROOT+"]");
			return false;
		}
		String submitData=dataObj.toString();
		try{
			Map<String,Object> dataMap = WebUtil.getObjectMapper().readValue(submitData, Map.class);
			//提取参数时注意空值，因为并非所有参数都是必须的
			int u_id = dataMap.get("u_id")==null?0:Integer.parseInt(dataMap.get("u_id").toString());
			String orgauth = dataMap.get("orgauth")==null?"[]":dataMap.get("orgauth").toString();
			String deptauth = dataMap.get("deptauth")==null?"[]":dataMap.get("deptauth").toString();
			OrgTreeNode[] otns = WebUtil.getObjectMapper().readValue(orgauth, OrgTreeNode[].class);
			DeptTreeNode[] dtns = WebUtil.getObjectMapper().readValue(deptauth, DeptTreeNode[].class);
			WebUtil.getAppCtx().getBean(this.getClass()).doSaveOrgDeptAuth(u_id,otns,dtns);
			callErrMsg="数据提交完成!";	
			paramsMap.put(Const.SERVICE_CALL_RESULT,null);
			paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,callErrMsg);
		}catch(Exception e){
			paramsMap.put(Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
		return true;
	}
	
	/**
	 * 从会话中取指定组织树(已包含权限信息)
	 * @param or_type 组织类型
	 * @return
	 */
	public List<OrgTreeNode> getOrgTreeFromSession(String or_type){
		Object orgtrees = SessionUtil.getAttribute(Const.SESSION_ORGTREES);
		if(orgtrees != null){
			return ((Map<String, List<OrgTreeNode>>)orgtrees).get(or_type);
		}
		return null;
	}
	
	
	/**
	 * 将用户的组织权限信息及默认组织放入会话
	 * @param nodes
	 */
	public void initUserOrgCache(){
		List<UserOrg> luo = orgMapper.getUserOrgListByUid(SessionUtil.getCurrentUser().getU_id());
		SessionUtil.setAttribute(Const.SESSION_USERORG, luo);
	}
	
	
	/**
	 * 将用户的部门权限信息及默认部门放入会话
	 * @param nodes
	 */
	public void initUserDeptCache(){
		List<UserDept> lud = orgMapper.getUserDeptListByUid(SessionUtil.getCurrentUser().getU_id());
		SessionUtil.setAttribute(Const.SESSION_USERDEPT, lud);
	}
	
	
	/**
	 * 初始化组织树节点权限集合的缓存
	 * @param or_type 组织类型
	 * @return
	 */
	public List<OrgTreeNode> initOrTypeTreeCache(String or_type){
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("or_type", or_type);
		//int orv_id = orgMapper.getOrvId(params);
		//params.put("orv_id", orv_id);
		List<OrgTreeNode> ret = orgMapper.getOrTypeTreeNode(params);
		//取用户组织权限
		List<UserOrg> luo = getUserOrgFromSession();
		for(int i = 0; i < luo.size(); ++i){
			UserOrg uo = luo.get(i);
			//描绘路径信息
			setVisibleOrgParentPathByOuId(ret, uo.getOu_id());
			//设置节点信息
			setVisibleOrgNode(ret, uo);
		}
		//保存当前组织树节点授权信息到缓存
		setOrgTreeToSession(or_type, ret);
		return ret;
	}
	
	
	/**
	 * 初始化默认组织节点 当前组织节点 可选组织节点信息缓存
	 * @return
	 */
	public void initOrgCache(){
		List<OrgTreeNode> orgs = getOrgTreeFromSession(Const.DEFAULT_ORTYPE);
		//设置默认组织及当前组织
		List<UserOrg> luo = getUserOrgFromSession();
		for(int i = 0; i < luo.size(); ++i){
			UserOrg uo = luo.get(i);
			if("true".equals(uo.getIs_default())){
				for(OrgTreeNode node : orgs){
					if(node != null && node.getOu_id() == uo.getOu_id()){
						SessionUtil.setAttribute(Const.SESSION_DEFAULT_ORG, node);	
						SessionUtil.setAttribute(Const.SESSION_CURRENT_ORG, node);	
						break;
					}
				}
				break;
			}
		}
		//设置可选组织
		List<Integer> ou_list = usersMapper.getChangableOuByUser(SessionUtil.getCurrentUser().getU_id());
		for(Integer ou_id : ou_list){
			if(ou_id != null){
				for(OrgTreeNode node : orgs){
					if(node != null && node.getOu_id() == ou_id){
						setChangableOuToSession(node);
						break;
					}
				}				
			}
		}
	}
	/**
	 * 将可选组织节点信息放入会话
	 * @param ou
	 */
	public void setChangableOuToSession(OrgTreeNode ou){
		if(ou == null){
			return;
		}
		Object	orglist = SessionUtil.getAttribute(Const.SESSION_CHANGABLE_ORG);
		if(orglist == null){
			orglist =  new HashMap<String, OrgTreeNode>();
			SessionUtil.setAttribute(Const.SESSION_CHANGABLE_ORG, orglist);
		}
		((Map<String, OrgTreeNode> )orglist).put(ou.getOu_code(), ou);
	}
	/**
	 * 设置指定组织树指定节点的权限信息
	 * @param list 指定组织树
	 * @param uo 指定节点
	 */
	private void setVisibleOrgNode(List<OrgTreeNode> list, UserOrg uo){
		for(int i = 0; i < list.size(); ++i){
			OrgTreeNode o = list.get(i);
			if(o.getOu_id() == uo.getOu_id()){
				o.setHas_curd(uo.getHas_curd());
				o.setIs_default(uo.getIs_default());
				o.setHas_qry(uo.getHas_qry());
				o.setHas_op1(uo.getHas_op1());
				o.setHas_op2(uo.getHas_op2());
				o.setHas_op3(uo.getHas_op3());
				o.setHas_op4(uo.getHas_op4());
				o.setPv("true");
				
				if(!o.ifPo()){
					o.setPo("false");
				}
				break;
			}
		}
	}
	/**
	 * 初始化部门树节点权限集合的缓存
	 * @return
	 */
	public List<DeptTreeNode> initDeptCache(){
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("login_id", SessionUtil.getCurrentUser().getLogin_id());
		//根据当前会话用户查找目标组织树节点信息集合
		List<DeptTreeNode> ret = orgMapper.getAllDeptTreeNode(params);
		//取用户部门权限
		List<UserDept> lud = getUserDeptFromSession();
		for(int i = 0; i < lud.size(); ++i){
			UserDept ud = lud.get(i);
			//描绘路径信息
			setVisibleDeptParentPath(ret, ud.getD_id());
			//设置节点信息
			setVisibleDeptNode(ret, ud);
		}
		SessionUtil.setAttribute(Const.SESSION_DEPTNODES, ret);
		return ret;
	}
	
	@SuppressWarnings("unchecked")
	public List<UserDept> getUserDeptFromSession(){
		return (List<UserDept>)SessionUtil.getAttribute(Const.SESSION_USERDEPT);
	}
	
	private void setVisibleDeptParentPath(List<DeptTreeNode> list, int d_id){
		//若递归到根节点则结束
		if(d_id <= 0){
			return;
		}
		for(int i = 0; i < list.size(); ++i){
			DeptTreeNode path = list.get(i);			
			if(d_id == path.getId()){
				if("true".equals(path.getPv())){
					//若path已经设置 则其父节点必然也已设置
				}else{
					path.setPo("true");
					path.setPv("true");
					setVisibleDeptParentPath(list, path.getParentId());
				}
				break;
			}
		}
	}
	
	/**
	 * 设置指定部门树指定节点的权限信息
	 * @param list 指定组织树
	 * @param uo 指定节点
	 */
	private void setVisibleDeptNode(List<DeptTreeNode> list, UserDept ud){
		for(int i = 0; i < list.size(); ++i){
			DeptTreeNode o = list.get(i);
			if(o.getId() == ud.getD_id()){
				o.setHas_curd(ud.getHas_curd());
				o.setIs_default(ud.getIs_default());
				o.setHas_qry(ud.getHas_qry());
				o.setHas_op1(ud.getHas_op1());
				o.setHas_op2(ud.getHas_op2());
				o.setHas_op3(ud.getHas_op3());
				o.setHas_op4(ud.getHas_op4());
				o.setPv("true");
				//设置默认部门
				if("true".equals(ud.getIs_default())){
					setDefaultDeptToSession(o.getOu_code(), o);
				}
				
				if(!o.ifPo()){
					o.setPo("false");
				}
				break;
			}
		}
	}
	
	/**
	 * 将指定部门作为指定组织的默认部门放入会话
	 * @param ou_id 组织id
	 * @param dept 部门信息
	 */
	public void setDefaultDeptToSession(String ou_code, DeptTreeNode dept){
		Object	deptlist = SessionUtil.getAttribute(Const.SESSION_DEFAULT_DEPT);
		if(deptlist == null){
			deptlist =  new HashMap<String, DeptTreeNode>();
			SessionUtil.setAttribute(Const.SESSION_DEFAULT_DEPT, deptlist);
		}
		((Map<String, DeptTreeNode> )deptlist).put(ou_code, dept);
	}
	
	/**
	 * 将指定组织树节点信息放入会话
	 * @param or_type
	 * @param nodes
	 */
	public void setOrgTreeToSession(String or_type, List<OrgTreeNode> nodes){
		Object orgtrees = SessionUtil.getAttribute(Const.SESSION_ORGTREES);
		if(orgtrees == null){
			orgtrees =  new HashMap<String, List<OrgTreeNode>>();
			SessionUtil.setAttribute(Const.SESSION_ORGTREES, orgtrees);
		}
		((Map<String, List<OrgTreeNode>>)orgtrees).put(or_type, nodes);
	}
	
	/**
	 * 从会话中取当前用户组织权限信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<UserOrg> getUserOrgFromSession(){
		return (List<UserOrg>)SessionUtil.getAttribute(Const.SESSION_USERORG);
	}
	
	/**
	 * 在指定组织树路径中根据组织单元节点设置父路径可见性
	 * @param list 组织树
	 * @param ou_id 组织单元id
	 */
	private void setVisibleOrgParentPathByOuId(List<OrgTreeNode> list, int ou_id){
		for(int i = 0; i < list.size(); ++i){
			OrgTreeNode path = list.get(i);			
			if(ou_id == path.getOu_id()){
				setVisibleOrgParentPath(list, path.getId());
				break;
			}
		}
	}
	
	/**
	 * 在指定组织树路径中根据节点设置父路径可见性
	 * @param list 组织树
	 * @param nodeId 节点id
	 */
	private void setVisibleOrgParentPath(List<OrgTreeNode> list, int nodeId){
		//若递归到根节点则结束
		if(list == null||nodeId <= 0){
			return;
		}
		for(int i = 0; i < list.size(); ++i){
			OrgTreeNode path = list.get(i);			
			if(nodeId == path.getId()){
				if("true".equals(path.getPv())){
					//若path已经设置 则其父节点必然也已设置
				}else{
					path.setPo("true");
					path.setPv("true");
					setVisibleOrgParentPath(list, path.getParentId());
				}
				break;
			}
		}
	}
	
	/**
	 * 在指定组织树上查找指定节点
	 * @param or_type 组织类型 ou_id 或 ou_code
	 * @return
	 */
	public OrgTreeNode getOrgTreeNodeByCache(Map<String,Object> params){
		String or_type = (String)params.get("or_type");
		if(or_type == null){
			//默认取人力树
			or_type = Const.DEFAULT_ORTYPE;
		}
		int ou_id = -1;
		try{
			ou_id = Integer.parseInt(params.get("ou_id").toString());
		}catch(Exception e){			
		}
		String ou_code = (String)params.get("ou_code");
		
		List<OrgTreeNode> tree = this.getOrgTreeFromSession(or_type);
		if(tree!=null)
			for(int i = 0; i < tree.size(); ++i){
				OrgTreeNode node = tree.get(i);
				if(node != null){
					if(node.getOu_id() == ou_id || node.getOu_code().equals(ou_code)){					
						return node;
					}
				}
			}
		return null;
	}
	
	/**
	 * 根据login_id, ou_id, d_id取当前下属的部门
	 * Request main/Orgs.do?method=getSubDept <br/><br/>
	 * Response {data:[{@link DeptTreeNode}}]} <br/><br/>
	 * @param paramMap login_id, ou_id, d_id
	 * @return DeptTreeNode
	 */
	public List<DeptTreeNode> getSubDept(Map<String,Object> paramMap){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("login_id", paramMap.get("login_id"));
		map.put("ou_id", paramMap.get("ou_id"));
		List<DeptTreeNode> list=orgMapper.getDeptTreeNodeWithParentByUser(paramMap);
		for(int i = 0; i < list.size(); ++i){
			map.put("node", list.get(i).getId());
			List<DeptTreeNode> sublist = getSubDept(map);
			list.addAll(sublist);
		}
		return list;
	}
	
	/**
	 * 获得指定组织和用户的授权用部门树
	 * @param params ou_code - 组织代码 login_id -用户login_id
	 * @return
	 */
	public List<DeptTreeNode> getAuthDeptTreeByOrgUser(Map<String,Object> params){
		class DeptTreeAuthUtil{
			/**
			 * 递归构造部门树
			 * @param allDeptList
			 * @param parentId
			 * @return
			 */
			 public List<DeptTreeNode> makeDeptTreeByAuth(List<DeptTreeNode> allDeptList,List<DeptTreeNode> authDeptList,int parentId){
				boolean isAdmin = SessionUtil.isAdmin();	
				List<DeptTreeNode> deptTree = new ArrayList<DeptTreeNode>();
				
				for (DeptTreeNode deptNode : allDeptList) {
					//作为超级用户，需要得到整个组织树
					//而普通用户，则只能得到经过授权的组织树
					if(deptNode.getParentId()==parentId){
						if(isAdmin||deptNode.getPv().equals(Const.YESNO_TYPE_YES)){
							DeptTreeNode otn = new DeptTreeNode();
							BeanUtils.copyProperties(deptNode,otn);
							setOrgTreeNodeByAuth(authDeptList,otn);
							deptTree.add(otn); 
						}
					}
				}
				//逐个向下构造组织树
				for (DeptTreeNode deptNode : deptTree) {
					if(deptNode.getLeaf()!=null&& !deptNode.equals(Const.YESNO_TYPE_YES)){
						deptNode.setData(this.makeDeptTreeByAuth(allDeptList,authDeptList,deptNode.getId()));
					}
				}
				return deptTree;
			}
		   /**
			 * 根据授权列表对目标节点进行设置
			 * @param authOrgList
			 * @param otn
			 */
			private void setOrgTreeNodeByAuth(List<DeptTreeNode> authDeptList,DeptTreeNode otn){
				otn.setPo("false");
				otn.setHas_qry("false");
				otn.setHas_curd("false");
				otn.setIs_default("false");
				otn.setHas_op1("false");
				otn.setHas_op2("false");
				otn.setHas_op3("false");
				otn.setHas_op4("false");
				for (DeptTreeNode deptNode : authDeptList) {
					if(deptNode.getId() == otn.getId()){
						otn.setPo(deptNode.getPo());
						otn.setHas_qry(deptNode.getHas_qry());
						otn.setHas_curd(deptNode.getHas_curd());
						otn.setIs_default(deptNode.getIs_default());
						otn.setHas_op1(deptNode.getHas_op1());
						otn.setHas_op2(deptNode.getHas_op2());
						otn.setHas_op3(deptNode.getHas_op3());
						otn.setHas_op4(deptNode.getHas_op4());
					}
				}
			} 
		}
		String ou_code = params.get("ou_code")==null? "": params.get("ou_code").toString();
		String login_id = params.get("login_id")==null? "":params.get("login_id").toString();
		params.put("ou_code", ou_code);
		params.put("login_id",login_id);
		
		//获得整棵组织树列表
		List<DeptTreeNode> allDeptList = this.getDeptTreeFromSession(ou_code);
		//获得授权组织列表
		//只定义接口后续需要再实现它的具体SQL 华慧 2014-09-25
		List<DeptTreeNode> authDeptList = orgMapper.getAllDeptTreeNodeByUser(params);
		return  new DeptTreeAuthUtil().makeDeptTreeByAuth(allDeptList, authDeptList, 0);
	}
	
	/**
	 * 从会话中取指定部门树(已包含权限信息)
	 * @param ou_code 组织ou_code
	 * @return
	 */
	public List<DeptTreeNode> getDeptTreeFromSession(String ou_code){
		List<DeptTreeNode> ret = new ArrayList<DeptTreeNode>();
		@SuppressWarnings("unchecked")
		List<DeptTreeNode> nodes = (List<DeptTreeNode>)SessionUtil.getAttribute(Const.SESSION_DEPTNODES);
		for(DeptTreeNode node: nodes){
			String ouCode = node.getOu_code()!=null?node.getOu_code():"";
			if(ouCode.equals(ou_code)){
				ret.add(node);
			}
		}
		return ret;
	}

	/**
	 * 获得指定用户和类型的授权用组织树
	 * @param params or_type -组织类型 login_id -用户login_id 
	 * @return
	 */
	public List<OrgTreeNode> getAuthOrgTreeByUser(Map<String,Object> params){
		
		class OrgTreeAuthUtil {
			/**
			 * 递归构造组织树
			 * @param allOrgList
			 * @param parentId
			 * @return
			 */
			 public List<OrgTreeNode> makeOrgTreeByAuth(List<OrgTreeNode> allOrgList,List<OrgTreeNode> authOrgList,int parentId){
				boolean isAdmin = SessionUtil.isAdmin();	
				List<OrgTreeNode> orgTree = new ArrayList<OrgTreeNode>();
				for (OrgTreeNode orgTreeNode : allOrgList) {
					//作为超级用户，需要得到整个组织树
					//而普通用户，则只能得到经过授权的组织树
					if(orgTreeNode.getParentId()==parentId){
						if(isAdmin||orgTreeNode.getPv().equals(Const.YESNO_TYPE_YES)){
							OrgTreeNode otn = new OrgTreeNode();
							BeanUtils.copyProperties(orgTreeNode,otn);
							setOrgTreeNodeByAuth(authOrgList,otn);
							orgTree.add(otn); 
						}
					}
				}
				//逐个向下构造组织树
				for (OrgTreeNode orgTreeNode : orgTree) {
					if(orgTreeNode.getLeaf()!=null&& !orgTreeNode.equals(Const.YESNO_TYPE_YES)){
						orgTreeNode.setData(this.makeOrgTreeByAuth(allOrgList,authOrgList,orgTreeNode.getId()));
					}
				}
				return orgTree;
			}
		   /**
			 * 根据授权列表对目标节点进行设置
			 * @param authOrgList
			 * @param otn
			 */
			private void setOrgTreeNodeByAuth(List<OrgTreeNode> authOrgList,OrgTreeNode otn){
				otn.setPo("false");
				otn.setHas_qry("false");
				otn.setHas_curd("false");
				otn.setIs_default("false");
				otn.setHas_op1("false");
				otn.setHas_op2("false");
				otn.setHas_op3("false");
				otn.setHas_op4("false");
				for (OrgTreeNode orgTreeNode : authOrgList) {
					if(orgTreeNode.getOu_id() == otn.getOu_id()){
						otn.setPo(orgTreeNode.getPo());
						otn.setHas_qry(orgTreeNode.getHas_qry());
						otn.setHas_curd(orgTreeNode.getHas_curd());
						otn.setIs_default(orgTreeNode.getIs_default());
						otn.setHas_op1(orgTreeNode.getHas_op1());
						otn.setHas_op2(orgTreeNode.getHas_op2());
						otn.setHas_op3(orgTreeNode.getHas_op3());
						otn.setHas_op4(orgTreeNode.getHas_op4());
					}
				}
			} 
		}
		
		String or_type = params.get("or_type")==null? Const.DEFAULT_ORTYPE: params.get("or_type").toString();
		String login_id = params.get("login_id")==null? "":params.get("login_id").toString();
		params.put("or_type", or_type);
		params.put("login_id",login_id);
		//获得整棵组织树列表
		List<OrgTreeNode> allOrgList = getOrgTreeFromSession(or_type);
		//获得授权组织列表
		List<OrgTreeNode> authOrgList = orgMapper.getOrTypeTreeNodeByUser(params);
				
		return new OrgTreeAuthUtil().makeOrgTreeByAuth(allOrgList,authOrgList,0);
	}
	
	/**
	 * 实际执行保存组织部门授权信息
	 * @param u_id  用户id
	 * @param otns  组织授权数组
	 * @param dtns  部门授权数组
	 * @throws Exception
	 */
	@Transactional
	public void doSaveOrgDeptAuth(int u_id,OrgTreeNode[] otns,DeptTreeNode[] dtns)throws Exception{
		//对于组织部门授权来说，改动过的应该先根据u_id,ou_id删除，然后重新插入数据
		//组织授权
		for (OrgTreeNode orgTreeNode : otns) {
			    //当po(pathonly)=true时，说明该节点原本就仅仅是路径，无需授权处理
			    if(orgTreeNode.getPo().equals(Const.YESNO_TYPE_YES))
			    	continue;
				UserOrg uo = new UserOrg();
				BeanUtils.copyProperties(orgTreeNode,uo);
				uo.setId(0);
				uo.setU_id(u_id);
				int ou_id = orgTreeNode.getOu_id();
				orgMapper.deleteUserOrg(uo);
				if(!orgTreeNode.getPo().equals(Const.YESNO_TYPE_YES)&&!orgTreeNode.getHas_curd().equals(Const.YESNO_TYPE_YES)){
					//非po节点，且当该组织没有被授予curd权限时，同时需删除该用户该组织下的用户-角色 用户-模块 用户-功能 授权
					//1.删除用户-角色授权
					UserRole ur = new UserRole();
					ur.setU_id(u_id);
					ur.setOu_id(ou_id);
					usersMapper.deleteUserRole(ur);
					//2.删除用户-模块授权
					UserModule um = new UserModule();
					um.setU_id(ou_id);
					um.setOu_id(ou_id);
					usersMapper.deleteUserModule(um);
					//3.删除用户-功能授权
					UserFunc uf = new UserFunc();
					uf.setU_id(ou_id);
					uf.setOu_id(ou_id);
					usersMapper.deleteUserFunc(uf);
					
				}
				if(!orgTreeNode.ifPo()){
					//这说明现在节点已经没有任何授权内容，变成一个po(pathonly)了,也无需授权了
					orgMapper.addUserOrg(uo);
				}
		}
		//部门授权
		for (DeptTreeNode deptTreeNode : dtns) {
			//当po(pathonly)=true时，说明该节点原本就仅仅是路径，无需授权处理
		    if(deptTreeNode.getPo().equals(Const.YESNO_TYPE_YES))
		    	continue;
			UserDept ud = new UserDept();
			BeanUtils.copyProperties(deptTreeNode,ud);
			ud.setId(0);
			ud.setD_id(deptTreeNode.getId());
			ud.setU_id(u_id);
			orgMapper.deleteUserDept(ud);
			if(!deptTreeNode.ifPo()){
				//这说明现在节点已经没有任何授权内容，变成一个po(pathonly)了,也无需授权了
				orgMapper.addUserDept(ud);
			}
			
		}
	}
}
