package erp.web.service;




import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import erp.common.model.ModuleTree;
import erp.util.Const;
import erp.util.SessionUtil;
import erp.web.data.ModuleMapper;
import erp.web.data.UsersMapper;
import erp.web.model.Function;
import erp.web.model.HttpService;
import erp.web.model.Module;
import erp.web.model.TpsLog;
@Service
public class ModuleService {
	
	@Autowired
	private ModuleMapper moduleMapper;
	
	@Autowired
	private UsersMapper usersMapper;
	
	protected static Logger logger = Logger.getLogger("service");
	/**
	 * 添加日志信息
	 * @param item
	 */
	public void addLog(TpsLog item){
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("s_path",item.getS_path());
		params.put("m_name", item.getS_method());
		List<HttpService> httpServices = moduleMapper.getHttpServiceByPathMethod(params);
		if(httpServices.size()>0){
			HttpService httpSrv = httpServices.get(0);
			item.setMod_id(httpSrv.getMod_id());
			item.setS_name(httpSrv.getS_name());
			params.clear();
			params.put("id", httpSrv.getMod_id());
			List<Module> modules = moduleMapper.getModuleList(params);
			if(modules.size()>0){
				item.setMod_name(modules.get(0).getText());
			}
		}else{
			item.setMod_id(-1);
		}
		moduleMapper.addLog(item);
	}
	//=============================模块相关===========================================
	/**
	 * 获取模块数量
	 * Request main/Modules.do?method=getCountByPId <br/><br/>
	 * Response {data:[{@link int}]} <br/><br/>
	 * @param params
	 * @return int
	 */
	public int getCountByPId(Map<String,Object> params){
		return moduleMapper.getCountByPId(params);
	}
	
    /**
     * 根据mod_id或mod_code获得module节点信息
     * Request main/Modules.do?method=getModuleList <br/><br/> 
     * @param httpReq 入参 mod_id --模块id,mod_code --模块代码
     * @return
     */
	public List<Module> getModuleByModIdCode(Map<String,Object> params){
		Map<String,Object> paramsMap = new HashMap<String,Object>();
		paramsMap.put("id",params.get("mod_id")!=null? params.get("mod_id"):-1);
		paramsMap.put("mod_code",params.get("mod_code"));
		paramsMap.put("leaf", "true");
		return this.getModuleList(paramsMap);
	}
	
	/**
	 * 根据父节点获取模块树
	 * Request main/Modules.do?method=getModuleWithParent <br/><br/>
	 * @param params node <br/><br/>
	 * @return Module
	 */
	public List<Module> getModuleWithParent(Map<String,Object> params){
		if(!SessionUtil.isAdmin()){
			params.put("u_id",SessionUtil.getCurrentUser().getU_id());
		}
		List<Module> modList = moduleMapper.getModuleWithParent(params);
		return modList;
	}
	/**
	 * @Description: 根据用户登录ID获取功能模块；
	 * @param @param params
	 * @param @return   
	 * @return List<ModuleTree>  
	 * @throws
	 * @author wuqia
	 * @date 2016-06-06
	 */
	public List<Module> getModuleListByLoginId(Map<String,Object> params){
		params.clear();
		params.put("u_id",SessionUtil.getCurrentUser().getU_id());
		List<Module> allModule=moduleMapper.getModuleList(params);
		return MakeModuleTree(0,allModule);
	}
	
	
	public List<Module> MakeModuleTree(int parentId,List<Module> allModule){
		//找出该节点id下属的所有子节点
		List<Module> mList = new ArrayList<Module>();
		for(Module module : allModule)	
		{
			if(module.getParentId()==parentId){
				mList.add(module);
			if( !module.getLeaf().equalsIgnoreCase(Const.YESNO_TYPE_YES))
				module.setSubItem(MakeModuleTree(module.getId(),allModule));
			}
		}
		return mList;
	}
	/**
	 * 获取模块列表
	 * Request main/Modules.do?method=getModuleList <br/><br/>
	 * Response {data:[{@link Module}]} <br/><br/>
	 * @param paramMap
	 * @return Module
	 */
	public List<Module> getModuleList(Map<String,Object> paramMap){
		if(!SessionUtil.isAdmin()){
			paramMap.put("u_id",SessionUtil.getCurrentUser().getU_id());
		}	
		List<Module> list=moduleMapper.getModuleList(paramMap);
		return list;
	}
	
	
	/**
	 * 根据controller和view获取模板
	 * Request main/ModuleService.do?method=getModuleWithCtrllerAndView <br/><br/>
	 * @return Module
	 */
	@SuppressWarnings("unchecked")
	public boolean getModuleWithCtrllerAndView(Map<String,Object> params){
		List<Module> result = new ArrayList<Module>();
		try{
			List<Map<String,Object>> cvs = erp.util.WebUtil.getObjectMapper().readValue(params.get("data").toString(), List.class);
			Map<Integer,Module> temp = new HashMap<Integer, Module>();
			for(Map<String,Object> v : cvs){
				result = moduleMapper.getModuleWithCtrllerAndView(v);
				for(Module m : result){
					temp.put(m.getId(),m);
				}
			}
			result.clear();
			
			for(Integer key : temp.keySet()){
				result.add(temp.get(key));
			}
			params.put(erp.util.Const.SERVICE_CALL_RESULT,result);
			return true;
		}catch(Exception e){
			params.put(erp.util.Const.SERVICE_CALL_ERROR_MSG,e.getMessage());
			return false;
		}
	}
	
	/**
	 * 获取服务列表
	 * Request main/Modules.do?method=getHttpServiceList <br/><br/>
	 * Response {data:[{@link HttpService}]} <br/><br/>
	 * @param params role_id
	 * @return HttpService
	 * 
	 */
	public List<HttpService> getHttpServiceList(Map<String,Object> params){
		return moduleMapper.getHttpServiceList(params);
	}
	
	
	/**
	 * 增加模块
	 * Request main/Modules.do?method=addModule <br/><br/>
	 * Response {data:[{@link Module}]} <br/><br/>
	 * @param modules 增加的模块 {@link Module}
	 */ 
	@Transactional
	public void addModule(Module[] modules){
		for (Module module : modules) {
			module.setCreate_date(new Date());
			moduleMapper.addModule(module);
		}
	}
	/**
	 * 更新模块
	 * Request main/Modules.do?method=updateModule <br/><br/>
	 * Response {data:[{@link Module}]} <br/><br/>
	 * @param modules 更新的模块 {@link Module}
	 */
	@Transactional
	public void updateModule(Module[] modules){
		for (Module module : modules) {
			module.setModify_date(new Date());
			moduleMapper.updateModule(module);
		}
	}
	/**
	 * 删除模块
	 * Request main/Modules.do?method=deleteModule <br/><br/>
	 * Response {} <br/><br/>
	 * @param modules 删除的模块 {@link Module}
	 */
	@Transactional
	public void deleteModule(Module[] modules){
		for (Module module : modules) {
			usersMapper.deleteRoleModuleByMId(module.getId());
			usersMapper.deleteUserMenuByMid(module.getId());

			moduleMapper.deleteFuncByMid(module.getId());
			moduleMapper.deleteHttpServiceByMid(module.getId());
			
			moduleMapper.deleteModule(module);
		}
	}
	
	/**
	 * 
	 * @param params
	 * @return
	 */
	public List<HttpService> getHttpServiceByPathMethod(Map<String,Object> params){
		return moduleMapper.getHttpServiceByPathMethod(params);
	}
	/**
	 * 增加服务
	 * Request main/Modules.do?method=addHttpService <br/><br/>
	 * Response {data:[{@link HttpService}]} <br/><br/>
	 * @param services 增加服务 {@link HttpService}
	 */
	@Transactional
	public void addHttpService(HttpService[] services){
		for (HttpService service : services) {
			moduleMapper.addHttpService(service);
		}
	}
	/**
	 * 更新服务
	 * Request main/Modules.do?method=updateHttpService <br/><br/>
	 * Response {data:[{@link HttpService}]} <br/><br/>
	 * @param services 更新服务 {@link HttpService}
	 */
	@Transactional
	public void updateHttpService(HttpService[] services){
		for (HttpService service : services) {
			moduleMapper.updateHttpService(service);
		}
	}
	/**
	 * Request main/Modules.do?method=deleteHttpService <br/><br/>
	 * Response {data:[{@link HttpService}]} <br/><br/>
	 * @param services 删除服务 {@link HttpService}
	 */
	@Transactional
	public void deleteHttpService(HttpService[] services){
		for (HttpService service : services) {
			usersMapper.deleteRoleServiceBySId(service.getS_id());
			moduleMapper.deleteHttpService(service);			
		}
	}
	
	/**
	 * 模块代码mod_code 是否重复
	 * Request main/ModuleCodeCheck.do?method=isExistsModuleCode <br/><br/>
	 * @param params mod_code <br/><br/>
	 * @return boolean
	 */
	public boolean isExistsModuleeCode(Map<String,Object> params){
		return moduleMapper.getCountByModCode(params)>0;
	}
	
	/**
	 * 读取整个模块树及其下属功能点 
	 * Request main/Modules.do?method=getAllModuleFuncsTree <br/><br/>
	 * Response {data:[{ModuleTree}]} <br/><br/>
	 * @param paramsMap 支持参数为 node -- 指定的开始模块节点id,默认=0根节点
	 * @return 返回功能树列表
	 */
	public List<ModuleTree> getAllModuleFuncsTree(Map<String,Object> paramsMap){
		int parentId = paramsMap.get(Const.DEFAULT_TREENODE_PARAM)==null?0:Integer.parseInt(paramsMap.get(Const.DEFAULT_TREENODE_PARAM).toString());
		String u_id=(String) paramsMap.get("u_id");
		paramsMap.clear();
		paramsMap.put("u_id", u_id);

		List<Module> allMList = moduleMapper.getModuleListFilterRole(paramsMap);
		List<Function> allFList = moduleMapper.getFuncListFilterUid(paramsMap);
		return this.makeModuleFuncsTree(parentId,allMList,allFList);
	}
	
	private List<ModuleTree> makeModuleFuncsTree(int parentId,List<Module> allMList,List<Function> allFList){
		//找出该节点id下属的所有子节点
		List<ModuleTree> mTreeList = new ArrayList<ModuleTree>();
		for(Module module:allMList){
			if(parentId == module.getParentId()&&module.getIsvalid().equals(Const.YESNO_TYPE_YES)){
				ModuleTree mTree = new ModuleTree();
				BeanUtils.copyProperties(module,mTree);
				mTreeList.add(mTree);
			}
		}
		for(ModuleTree mTree:mTreeList){
		   if(mTree.getLeaf()==null ||mTree.getLeaf().equals(erp.util.Const.YESNO_TYPE_YES)){
				//添加功能节点
				List<ModuleTree> fTreeList = new ArrayList<ModuleTree>();
				for(Function func:allFList){
					if(mTree.getId()==func.getMod_id()){
						ModuleTree fTree = new ModuleTree();
						fTree.setId(func.getF_id()*1000000+func.getF_id()); //暂当mod_id用,
						fTree.setText(func.getName());
						fTree.setParentId(mTree.getId());
						fTree.setLeaf(Const.YESNO_TYPE_YES);
						fTree.setOrder_seq(func.getOrder_seq());
						fTreeList.add(fTree);
					}
				}
				mTree.setLeaf(Const.YESNO_TYPE_NO);
				mTree.setData(fTreeList);
			}else{
				//继续读取下级节点
				mTree.setData(this.makeModuleFuncsTree(mTree.getId(),allMList,allFList));
			}
		}
		return mTreeList;
	}
	
	//=============================功能相关==========================================
	/**
	 * 根据mod_id获取功能列表
	 * Request main/Modules.do?method=getFuncListByMId <br/><br/>
	 * Response {data:[{@link Function}]} <br/><br/>
	 * @param params mod_id
	 * @return Function
	 */
	public List<Function> getFuncListByMId(Map<String,Object> params){
		return moduleMapper.getFuncList(params);
	}
	/**
	 * 增加功能
	 * Request main/Modules.do?method=addFunction <br/><br/>
	 * Response {data:[{@link Function}]} <br/><br/>
	 * @param funcs 增加功能 {@link Function}
	 */
	@Transactional
	public void addFunction(Function[] funcs){
		for (Function func : funcs) {
			moduleMapper.addFunction(func);
		}
	}
	/**
	 * 更新功能
	 * Request main/Modules.do?method=updateFunction <br/><br/>
	 * Response {data:[{@link Function}]} <br/><br/>
	 * @param funcs 更新功能 {@link Function}}
	 */
	@Transactional
	public void updateFunction(Function[] funcs){
		for (Function func : funcs) {
			moduleMapper.updateFunction(func);
		}
	}
	/**
	 * 删除功能
	 * Request main/Modules.do?method=deleteFunction <br/><br/>
	 * Response {} <br/><br/>
	 * @param funcs 删除功能 {@link Function}
	 */
	@Transactional
	public void deleteFunction(Function[] funcs){
		for (Function func : funcs) {
			usersMapper.deleteRoleFuncByFId(func.getF_id());
			moduleMapper.deleteFunction(func);
		}
	}
	
	//=============================日志管理==========================================
	/**
	 * 
	* @Title: getLogList
	* @Description: ModuleService 获取后端日志记录
	* @returnType List<TpsLog>    
	* @author 舒飞
	* @date 2016-9-12上午10:29:25
	 */
	public List<TpsLog> getLogList(Map<String,Object> paramMap){
		return moduleMapper.getLogList(paramMap);
	}
	/**
	 * 
	* @Title: deleteLog
	* @Description: ModuleService 删除后端日志记录  
	* @author 舒飞
	* @date 2016-9-12上午10:30:01
	 */
	public void deleteLog(TpsLog[] log){
		for (TpsLog obj : log) {
			moduleMapper.deleteLog(obj);
		}
	}
	/**
	 * 
	* @Title: updateTSysLog
	* @Description: ModuleService 修改后端日志 
	* @author 舒飞
	* @date 2016-9-12上午10:30:41
	 */
    public void updateTSysLog(TpsLog[] log){
    	for (TpsLog obj : log) {
			moduleMapper.updateTSysLog(obj);
		}
    }
}
