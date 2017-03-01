package erp.erp.master.operator.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.operator.data.OperatorMapper;
import erp.erp.master.operator.model.Operator;
import erp.erp.master.operator.model.OperatorDept;



@Service
public class OperatorService {
	@Autowired
	private OperatorMapper mapper;
	/**
	 * 获取操作员信息
	 * Request operator/operator.act?method=getOperatorList <br/><br/>
	 * Response {data:[{Operator}]} <br/><br/>
	 * @param Operator {@link paramMap}
	 */
	public List<Operator> getOperatorList(Map<String,Object> params) {
		return mapper.getOperatorList(params);
	}
	/**
	 * 新增操作员信息
	 * Request operator/operator.act?method=addOperator <br/><br/>
	 * Response {data:[{Operator}]} <br/><br/>
	 * @param Operator {@link paramMap}
	 */
	public void addOperator(Operator[] arr) {
		for(Operator obj: arr) {
			mapper.addOperator(obj);
		}
	}
	/**
	 * 修改操作员信息
	 * Request operator/operator.act?method=updateOperator <br/><br/>
	 * Response {data:[{Operator}]} <br/><br/>
	 * @param Operator {@link paramMap}
	 */
	public void updateOperator(Operator[] arr) {
		for(Operator obj: arr) {
			mapper.updateOperator(obj);
		}
	}
	/**
	 * 删除操作员信息
	 * Request operator/operator.act?method=deleteOperator <br/><br/>
	 * Response {data:[{Operator}]} <br/><br/>
	 * @param Operator {@link paramMap}
	 */
	public void deleteOperator(Operator[] arr) {
		for(Operator obj: arr) {
			mapper.deleteOperator(obj);
		}
	}
	/**获取操作员信息
	 * Request operator/operator.act?method=getByczy_gh <br/><br/>
	 * Response {data:[{Operator}]} <br/><br/>
	 * @param czy_gh
	 * */
	public Operator getByczy_gh(Map<String,Object> params){
		return mapper.getByczy_gh(params);
	}
	public List<OperatorDept> getOperatorDeptList(Map<String,Object> params) {
		return mapper.getOperatorDeptList(params);
	}
	public void addOperatorDept(OperatorDept[] arr) {
		for(OperatorDept obj: arr) {
			mapper.addOperatorDept(obj);
		}
	}
	public void updateOperatorDept(OperatorDept[] arr) {
		for(OperatorDept obj: arr) {
			mapper.updateOperatorDept(obj);
		}
	}
	public void deleteOperatorDept(OperatorDept[] arr) {
		for(OperatorDept obj: arr) {
			mapper.deleteOperatorDept(obj);
		}
	}
}
