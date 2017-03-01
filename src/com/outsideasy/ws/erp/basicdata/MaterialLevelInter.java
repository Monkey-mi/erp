package com.outsideasy.ws.erp.basicdata;

import javax.jws.WebService;

@WebService
public interface MaterialLevelInter {
	/**获取材料级别，只有一层
	 * 参数:无
	 * 返回值：json 格式list<Treemodel>
	 * 2016-3-24*/
	public String getMaterialLevelTree();
	/**获取材料类别书
	 * 参数：json格式的map 
	 * 包含 上级节点 node
	 * 返回值：json 格式list<Treemodel>
	 * 2016-3-24*/
	public String getMaterialClassTree(String jsonmap);
	/**获取供应商列表
	 * 参数：json格式的map
	 * 有 level_id 分层编号
	 * mc_id 材料编号
	 * condition 查询条件
	 * 返回值：json 格式list<SupplierFile>
	 * 2016-3-24*/
	public String getSupplierFileList(String jsonmap);
	/**获取供应商列表
	 * 参数：json格式的map
	 * company_id 公司编号
	 * 返回值：json 格式list<SupplierFile>
	 * 2016-3-24*/
	String getSupplierFileByID(String jsonmap);
	/**新增供应商
	 * 参数：json格式的SupplierFile[]
	 * 返回值：json 格式list<SupplierFile>
	 * 2016-3-24*/
	String addSupplierFile(String jsonlist);
	/**修改供应商
	 * 参数：json格式的SupplierFile[]
	 * 返回值：json 格式list<SupplierFile>
	 * 2016-3-24*/
	String updateSupplierFile(String jsonlist);
	/**删除供应商
	 * 参数：json格式的SupplierFile[]
	 * 返回值：无
	 * 2016-3-24*/
	void deleteSupplierFile(String jsonlist);
}

