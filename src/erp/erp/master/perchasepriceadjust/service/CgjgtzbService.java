package erp.erp.master.perchasepriceadjust.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.collections.map.LinkedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.TreeModel;
import erp.erp.master.perchasepriceadjust.data.CgjgtzbMapper;
import erp.erp.master.perchasepriceadjust.data.CgjgtzmxbMapper;
import erp.erp.master.perchasepriceadjust.data.SubmitPeopleMapper;
import erp.erp.master.perchasepriceadjust.model.Accountdept;
import erp.erp.master.perchasepriceadjust.model.Cgjgtzb;
import erp.erp.master.perchasepriceadjust.model.Cgjgtzmxb;
import erp.erp.master.perchasepriceadjust.model.Czybmlbb;
import erp.erp.master.perchasepriceadjust.model.RkdbImp;
import erp.erp.master.perchasepriceadjust.model.SubmitPeople;
import erp.util.TransUtil;


@Service
public class CgjgtzbService {
	@Autowired
	private CgjgtzbMapper mapper;
	@Autowired
	private CgjgtzmxbMapper mxmapper;
	@Autowired
	private SubmitPeopleMapper submitmapper;

	public List<Cgjgtzb> getCgjgtzbList(Map<String,Object> params) {
		//增加权限管控
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String lbqx="and (";
		List<String>  cglbList=mapper.getAccountAuthorityList(pa);
		for(String str:cglbList){
			if(i==0){
				lbqx+="(cgjgtzb.hsbm='') or (left(cgjgtzb.hsbm,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				lbqx+=" or (left(cgjgtzb.hsbm,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		lbqx+=")";
		if(cglbList.size()>0){
			params.put("lbqx", lbqx);
		}
		return mapper.getCgjgtzbList(params);
	}
	public void addCgjgtzb(Cgjgtzb[] arr) {
		for(Cgjgtzb obj: arr) {
			if(obj.getTjzt()==null){
				obj.setTjzt("");
			}
			if(obj.getTjrm()==null){
				obj.setTjrm("");
			}
			if(obj.getTjdx()==null){
				obj.setTjdx("");
			}
			if(obj.getQfrm()==null){
				obj.setQfrm("");
			}
			if(obj.getSdrm()==null){
				obj.setSdrm("");
			}
			mapper.addCgjgtzb(obj);
		}
	}
	public void updateCgjgtzb(Cgjgtzb[] arr) {
		for(Cgjgtzb obj: arr) {
			mapper.updateCgjgtzb(obj);
		}
	}
	public void deleteCgjgtzb(Cgjgtzb[] arr) {
		Map<String,Object> params = new HashMap<String, Object>();
		for(Cgjgtzb obj: arr) {
			params.put("tjdh", obj.getTjdh());
			mxmapper.deleteCgjgtzmxbBytjdh(params);
			mapper.deleteCgjgtzb(obj);
		}
	}

	public List<Cgjgtzmxb> getCgjgtzmxbList(Map<String,Object> params) {
		return mxmapper.getCgjgtzmxbList(params);
	}
	public void addCgjgtzmxb(Cgjgtzmxb[] arr) {
		for(Cgjgtzmxb obj: arr) {
		if(obj.getBzsm()==null){
			obj.setBzsm("");
		}
		if(obj.getTjrm()==null){
			obj.setTjrm("");
		}
		if(obj.getTjdx()==null){
			obj.setTjdx("");
		}
		if(obj.getQfrm()==null){
			obj.setQfrm("");
		}
		if(obj.getSdrm()==null){
			obj.setSdrm("");
		}
			mxmapper.addCgjgtzmxb(obj);
		}
	}
	public void updateCgjgtzmxb(Cgjgtzmxb[] arr) {
		for(Cgjgtzmxb obj: arr) {
			mxmapper.updateCgjgtzmxb(obj);
		}
	}
	public void deleteCgjgtzmxb(Cgjgtzmxb[] arr) {
		for(Cgjgtzmxb obj: arr) {
			mxmapper.deleteCgjgtzmxb(obj);
		}
	}
	/**
	* @Description: 获取全体核算部门树
	* @param params node 即部门编号
	* @date 2016-1-25 
	*/
	public List<TreeModel> getAllAccountdeptTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		int bmjc=1;
		int parentId=0;
		List<Accountdept> list=mapper.getAllAccountdeptList(params);
		if(params.get("node")!=null){
			bmjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(Accountdept sa:list) 
		{
			if(sa.getBmjc()==bmjc||bmjc==1){
				TreeModel st=new TreeModel();
				st.setNodeId(Integer.valueOf(sa.getBmbh()));
				st.setParentId(parentId);
				st.setText(sa.getBmmc());
				if (!sa.isMjbz()){
					if(sa.getBmbh().length()<=2){
						st.setExpanded("true");
					}else{
						st.setExpanded("false");
					}
					st.setLeaf("false");
				}
				else{
					st.setLeaf("true");
					st.setExpanded("true");
				}
				stlist.add(st);
				
			}
		}
		return stlist;
	}
	public List<TreeModel> getYsyfAccountdeptTree(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		int bmjc=1;
		int parentId=0;
		List<Accountdept> list=mapper.getAllAccountdeptList(params);
		if(params.get("node")!=null){
			bmjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(Accountdept sa:list) 
		{
			if(sa.getBmjc()==bmjc||bmjc==1){
				TreeModel st=new TreeModel();
				st.setNodeId(Integer.valueOf(sa.getBmbh()));
				st.setParentId(parentId);
				st.setText(sa.getBmmc());
				if (!sa.isMjbz()&&!sa.isYsyfbj()){
					if(sa.getBmbh().length()<=2){
						st.setExpanded("true");
					}else{
						st.setExpanded("false");
					}
					st.setLeaf("false");
				}
				else{
					st.setLeaf("true");
					st.setExpanded("true");
				}
				stlist.add(st);
				
			}
		}
		return stlist;
	}
	public List<RkdbImp> getRkdbImpList(Map<String,Object> params){
		return mxmapper.getRkdbImpList(params);
	}
	public String check_bj(Map<String,Object> params){
		JSONObject json = new JSONObject();
		json.put("suc", true);
		String recordData=null;
		Cgjgtzb arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(Cgjgtzb [])JSONArray.toArray(jsonArray,Cgjgtzb.class);
		try {
			for(Cgjgtzb ps:arr){
				if(mapper.check_bj(ps)<1){
					json.put("suc", false);
					json.put("tjdh", ps.getTjdh());
					json.put("msg", "数据校验不一致，请重试！");
					break;
				}else if(ps.getQfbj()==0&&ps.getTjbj()==1&&mapper.check_hdr_spbj(ps)==1){
					json.put("suc", false);
					json.put("tjdh", ps.getTjdh());
					json.put("msg", "单据已有领导审批，不能取消提交！");
					break;
				}
			}
		} catch (Exception e) {
			json.put("suc", false);
			e.printStackTrace();
			json.put("msg", "检验时出现异常，请重试！");
		}
		return json.toString();
	}
	public void update_bj(Map<String,Object> params){
		if(params.get("sdbj")!=null){
			mapper.update_sdbj(params);
		}
		if(params.get("tjbj")!=null){
			mapper.update_tjbj(params);
		}
		if(params.get("qfbj")!=null){
			mapper.update_qfbj(params);
		}
	}
	public void update_gdbj(Map<String,Object> params){
		String recordData=null;
		Cgjgtzb arr[]=null;
		if(params.get("recordData")!=null){
			recordData=params.get("recordData").toString();
		}
		JSONArray jsonArray=net.sf.json.JSONArray.fromObject(recordData);
		arr=(Cgjgtzb [])JSONArray.toArray(jsonArray,Cgjgtzb.class);
		try {
			int gdbj = arr[0].getGdbj();
			if(gdbj==1){
				params.put("gdbj", 0);
			}else{
				params.put("gdbj", 1);
			}
			for(Cgjgtzb ps:arr){
				params.put("tjdh", ps.getTjdh());
				mapper.update_gdbj(params);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public List<SubmitPeople> getSubmitPeopleList(Map<String,Object> params) {
		return submitmapper.getSubmitPeopleList(params);
	}
	public void addSubmitPeople(SubmitPeople[] arr) {
		for(SubmitPeople obj: arr) {
			submitmapper.addSubmitPeople(obj);
		}
	}
	public void updateSubmitPeople(SubmitPeople[] arr) {
		for(SubmitPeople obj: arr) {
			submitmapper.updateSubmitPeople(obj);
		}
	}
	public void deleteSubmitPeople(SubmitPeople[] arr) {
		for(SubmitPeople obj: arr) {
			submitmapper.deleteSubmitPeople(obj);
		}
	}
	/**
	* @Description: 获取全体操作员部门表
	* @param params node 即提交对象部门编号
	* @date 2016-2-2 
	*/
	public List<TreeModel> getAllCzybmList(Map<String,Object> params) {
		List<TreeModel> stlist=new ArrayList<TreeModel>();
		int bmjc=1;
		int parentId=0;
		List<Czybmlbb> list=submitmapper.getAllCzybmList(params);
		if(params.get("node")!=null){
			bmjc=(params.get("node").toString().length()/2)+1;
			 parentId=Integer.valueOf(String.valueOf(params.get("node")));
		}
		for(Czybmlbb sa:list) 
		{
			if(sa.getLbjc()==bmjc){
				TreeModel st=new TreeModel();
				st.setNodeId(Integer.valueOf(sa.getLbbh()));
				st.setParentId(parentId);
				st.setText(sa.getLbmc());
				if (sa.getMjbz()==0){
					if(sa.getLbbh().length()<2){
						st.setExpanded("true");
					}else{
						st.setExpanded("false");
					}
					st.setLeaf("false");
				}
				else{
					st.setLeaf("true");
					st.setExpanded("true");
				}
				stlist.add(st);
			}
		}
		return stlist;
	}
	/**
	 * 
	* @Title: getLl_id
	* @Description: CgjgtzbService
	* @returnType int    
	* @author 舒飞
	* @date 2016-6-22上午8:51:26
	 */
	public int getLl_id(Map<String,Object> params){
		return submitmapper.getLl_id(params);
	}
	/**
	 * 
	* @Title: getLs_gzgw_tj
	* @Description: CgjgtzbService
	* @param params
	* @returnType String    
	* @author 舒飞
	* @date 2016-6-22上午9:00:40
	 */
	public String getLs_gzgw_tj(Map<String,Object> params){
		return submitmapper.getLs_gzgw_tj(params);
	}
	/**
	 * 
	* @Title: getLsGzgwTjdx
	* @Description: CgjgtzbService
	* @param params
	* @returnType String    
	* @author 舒飞
	* @date 2016-6-22上午9:23:18
	 */
	public String getLsGzgwTjdx(Map<String,Object> params){
		return submitmapper.getLsGzgwTjdx(params);
	}
	
	/**
	 * 
	* @Title: getResult
	* @Description: CgjgtzbService
	* @param params
	* @returnType String    
	* @author 舒飞
	* @date 2016-6-22上午9:37:38
	 */
	public String getResult(Map<String,Object> params){
		JSONObject json = new JSONObject();
		String ls_gzgw_tj = params.get("ls_gzgw_tj").toString();
		String ls_gzgw_tjdx = params.get("ls_gzgw_tjdx").toString();
		String ll_id = params.get("ll_id").toString();
		String tjdh = params.get("tjdh").toString();
		ls_gzgw_tj = TransUtil.LeftOrRightFill(ls_gzgw_tj, "0", 5, 0);
		System.out.println(ls_gzgw_tj);
		ls_gzgw_tjdx = TransUtil.LeftOrRightFill(ls_gzgw_tjdx, "0", 5, 0);
		String sql = "insert into t_inf_cgjgtzd_hdr (id,requestid,ftriggerflag,stateflag,opt_id,opt_date,tjdh,tjzt,tjdx_id,hsbm) " +
				"  select "+ll_id+",0,0,-1,'"+ls_gzgw_tj+"',cgjgtzb.tjsj,cgjgtzb.tjdh,cgjgtzb.tjzt,'"+ls_gzgw_tjdx+"',h.bmmc FROM cgjgtzb " +
						"left outer join hsbmb h on h.bmbh=cgjgtzb.hsbm where tjdh = "+tjdh;
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("sql", sql);
		submitmapper.getIntFromSql(param);
		String sql2 = "insert into t_inf_cgjgtzd_mxb(mainid,tjxh,clmc,cltx1,jldw,csmc,rkrq,rksl,rkdj,rkje,wbdj,wbje,thdj,thje,wbmc,wbhl,thwbdj,thwbje,tjsm,ckmc ) " +
				" select "+ll_id+",tjxh,clbmb.clmc,rkdb_yl.cltx1,rkdb_yl.jldw,csxxb.csmc,rkdb_yl.rkrq,rkdb_yl.rksl,rkdb_yl.rkdj,rkdb_yl.rkje,rkdb_yl.wbdj,rkdb_yl.wbje,"+
				" cgjgtzmxb.thdj ,cgjgtzmxb.thje ,isnull(wbmcb.wbmc,''),rkdb_yl.wbhl,  cgjgtzmxb.wbdj , cgjgtzmxb.wbje , cgjgtzmxb.bzsm,ckmcb_yl.ckmc"+
				" from cgjgtzmxb"+
				" left outer join ckmcb_yl on ckmcb_yl.ckbh =cgjgtzmxb.ckbh"+
				" left outer join rkdb_yl with (nolock) on rkdb_yl.ckbh=cgjgtzmxb.ckbh and  rkdb_yl.rkdh=cgjgtzmxb.rkdh and rkdb_yl.rkxh=cgjgtzmxb.rkxh"+
				" left outer join csxxb on  csxxb.csbh =rkdb_yl.csbh"+
				" left outer join wbmcb on wbmcb.wbbh = rkdb_yl.wbbh"+
				" left outer join clbmb on clbmb.clhh = rkdb_yl.clhh"+
				" where tjdh="+tjdh;
		Map<String,Object> param2 = new HashMap<String,Object>();
		param2.put("sql", sql2);		
		submitmapper.getIntFromSql(param2);		
		return json.toString();
	}
}
