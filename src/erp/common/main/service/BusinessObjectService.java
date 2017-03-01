package erp.common.main.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.common.main.data.BusinessObjectMapper;
import erp.common.model.BusinessObject;
import erp.common.model.BusinessRefTable;
import erp.common.model.BuzObjRule;
import erp.common.model.BuzObjectAttr;
import erp.common.model.BuzObjectPermit;
import erp.common.model.BuzObjectSvr;
import erp.common.model.RuleDetail;
import erp.common.service.DbUtilService;
import erp.web.model.UserInfo;



@Service
public class BusinessObjectService {
	@Autowired
	private BusinessObjectMapper mapper;
	@Autowired
	private DbUtilService dbService;
	
	public List<BusinessObject> getBusinessObjectList(Map<String,Object> params) {
		return mapper.getBusinessObjectList(params);
	}
	public void addBusinessObject(BusinessObject[] arr) {
		for(BusinessObject obj: arr) {
			mapper.addBusinessObject(obj);
		}
	}
	public void updateBusinessObject(BusinessObject[] arr) {
		for(BusinessObject obj: arr) {
			mapper.updateBusinessObject(obj);
		}
	}
	public void deleteBusinessObject(BusinessObject[] arr) {
		for(BusinessObject obj: arr) {
			mapper.deleteBusinessObject(obj);
		}
	}
	
	public List<BusinessRefTable> getBusinessRefTableList(Map<String,Object> params) {
		return mapper.getBusinessRefTableList(params);
	}
	public void addBusinessRefTable(BusinessRefTable[] arr) {
		for(BusinessRefTable obj: arr) {
			mapper.addBusinessRefTable(obj);
		}
	}
	public void updateBusinessRefTable(BusinessRefTable[] arr) {
		for(BusinessRefTable obj: arr) {
			mapper.updateBusinessRefTable(obj);
		}
	}
	public void deleteBusinessRefTable(BusinessRefTable[] arr) {
		for(BusinessRefTable obj: arr) {
			mapper.deleteBusinessRefTable(obj);
		}
	}
	
	public List<BuzObjectAttr> getBuzObjectAttrList(Map<String,Object> params) {
		return mapper.getBuzObjectAttrList(params);
	}
	public void addBuzObjectAttr(BuzObjectAttr[] arr) {
		for(BuzObjectAttr obj: arr) {
			mapper.addBuzObjectAttr(obj);
		}
	}
	public void updateBuzObjectAttr(BuzObjectAttr[] arr) {
		for(BuzObjectAttr obj: arr) {
			mapper.updateBuzObjectAttr(obj);
		}
	}
	public void deleteBuzObjectAttr(BuzObjectAttr[] arr) {
		for(BuzObjectAttr obj: arr) {
			mapper.deleteBuzObjectAttr(obj);
		}
	}
	
	public List<BuzObjectPermit> getBuzObjectPermitList(Map<String,Object> params) {
		return mapper.getBuzObjectPermitList(params);
	}
	public void addBuzObjectPermit(BuzObjectPermit[] arr) {
		for(BuzObjectPermit obj: arr) {
			mapper.addBuzObjectPermit(obj);
		}
	}
	public void updateBuzObjectPermit(BuzObjectPermit[] arr) {
		for(BuzObjectPermit obj: arr) {
			mapper.updateBuzObjectPermit(obj);
		}
	}
	public void deleteBuzObjectPermit(BuzObjectPermit[] arr) {
		for(BuzObjectPermit obj: arr) {
			mapper.deleteBuzObjectPermit(obj);
		}
	}
	
	public List<BuzObjRule> getBuzObjRuleList(Map<String,Object> params) {
		return mapper.getBuzObjRuleList(params);
	}
	public void addBuzObjRule(BuzObjRule[] arr) {
		for(BuzObjRule obj: arr) {
			mapper.addBuzObjRule(obj);
		}
	}
	public void updateBuzObjRule(BuzObjRule[] arr) {
		for(BuzObjRule obj: arr) {
			mapper.updateBuzObjRule(obj);
		}
	}
	public void deleteBuzObjRule(BuzObjRule[] arr) {
		for(BuzObjRule obj: arr) {
			mapper.deleteBuzObjRule(obj);
		}
	}

	public List<RuleDetail> getRuleDetailList(Map<String,Object> params) {
		return mapper.getRuleDetailList(params);
	}
	public void addRuleDetail(RuleDetail[] arr) {
		for(RuleDetail obj: arr) {
			mapper.addRuleDetail(obj);
		}
	}
	public void updateRuleDetail(RuleDetail[] arr) {
		for(RuleDetail obj: arr) {
			mapper.updateRuleDetail(obj);
		}
	}
	public void deleteRuleDetail(RuleDetail[] arr) {
		for(RuleDetail obj: arr) {
			mapper.deleteRuleDetail(obj);
		}
	}
	public List<BuzObjectPermit> getUnPermitRoleList(Map<String,Object> params){
	    return mapper.getUnPermitRoleList(params);
	}
	public List<BuzObjectPermit> getUnPermitUserList(Map<String,Object> params){
        return mapper.getUnPermitUserList(params);
    }
	
	//商业对象服务方法CRUD
	/**
     * 获取商业对象方法列表
     * Request main/Buzobj.do?method=getBuzObjectSvrList <br/><br/>
     * Response {data:[{@link params}}]} <br/><br/>
     * @param paramsMap
     *            支持如下参数： obj_id
     * @return BuzObjectSvr 列表
     */
	   public List<BuzObjectSvr> getBuzObjectSvrList(Map<String,Object> params) {
	        return mapper.getBuzObjectSvrList(params);
	    }
	   
	    /**
	     * 新增服务方法
	     * Request main/Buzobj.do?method=addBuzObjectSvr <br/><br/>
	     * Response {data:[{@link BuzObjectSvr}}]} <br/><br/>
	     * @param paramsMap
	     *            支持如下参数： BuzObjectSvr
	     * @return void
	     */
	    public void addBuzObjectSvr(BuzObjectSvr[] arr) {
	        for(BuzObjectSvr obj: arr) {
	            mapper.addBuzObjectSvr(obj);
	        }
	    }
	    /**
         * 修改服务方法
         * Request main/Buzobj.do?method=updateBuzObjectSvr <br/><br/>
         * Response {data:[{@link BuzObjectSvr}}]} <br/><br/>
         * @param paramsMap
         *            支持如下参数： BuzObjectSvr
         * @return void
         */
	    public void updateBuzObjectSvr(BuzObjectSvr[] arr) {
	        for(BuzObjectSvr obj: arr) {
	            mapper.updateBuzObjectSvr(obj);
	        }
	    }
	    /**
         * 删除服务方法
         * Request main/Buzobj.do?method=deleteBuzObjectSvr <br/><br/>
         * Response {data:[{@link BuzObjectSvr}}]} <br/><br/>
         * @param paramsMap
         *            支持如下参数： BuzObjectSvr
         * @return void
         */
	    public void deleteBuzObjectSvr(BuzObjectSvr[] arr) {
	        for(BuzObjectSvr obj: arr) {
	            mapper.deleteBuzObjectSvr(obj);
	        }
	    }
	/**
	 *  获取已授权的字段清单
     * Request main/Buzobj.do?method=getBuzFieldsListByModId <br/><br/>
     * Response {data:[{@link BuzObjectAttr}}]} <br/><br/>
     * @param paramsMap
     *            支持如下参数： BuzObjectAttr
      * @return List<BuzObjectAttr>
	 */
	  public List<BuzObjectAttr> getBuzFieldsListByModId(Map<String,Object> params){
		  return mapper.getBuzFieldsListByModId(params);
	  }
	    
}
