package erp.erp.master.vendorfiles.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.vendorfiles.data.UseConsumerMapper;
import erp.erp.master.vendorfiles.data.VendorAttachmentMapper;
import erp.erp.master.vendorfiles.data.VendorFilesMapper;
import erp.erp.master.vendorfiles.data.historyVendorFilesMapper;
import erp.erp.master.vendorfiles.model.HistoryVendorFiles;
import erp.erp.master.vendorfiles.model.UseConsumer;
import erp.erp.master.vendorfiles.model.VendorAttachment;
import erp.erp.master.vendorfiles.model.VendorFiles;



@Service
public class VendorFilesService {
	@Autowired
	private VendorFilesMapper mapper;
	@Autowired
	private historyVendorFilesMapper historymapper;
	@Autowired
	private UseConsumerMapper useconsumermapper;
	@Autowired
	private VendorAttachmentMapper vamapper;

	public List<VendorFiles> getVendorFilesList(Map<String,Object> params) {
		return mapper.getVendorFilesList(params);
	}
	public void addVendorFiles(VendorFiles[] arr) {
		for(VendorFiles obj: arr) {
			mapper.addVendorFiles(obj);
		}
	}
	public void updateVendorFiles(VendorFiles[] arr) {
		for(VendorFiles obj: arr) {
			mapper.updateVendorFiles(obj);
		}
	}
	public void deleteVendorFiles(VendorFiles[] arr) {
		for(VendorFiles obj: arr) {
			mapper.deleteVendorFiles(obj);
		}
	}
	public String getVendorFilesOne(Map<String,Object> params){
		return mapper.getVendorFilesOne(params);
	}
	/*public List<UseVendorFiles> getUseConsumerList(Map<String,Object> params){
		return mapper.getUseConsumerList(params);
	}*/
	//审批
	public void updateApproStatus(Map<String,Object> params){
		String idarrayString=params.get("idarray").toString();
		String[] idarray= idarrayString.split(",");
		for(int i=0;i<idarray.length;i++){
			params.put("csbh", idarray[i]);
			mapper.updateApproStatus(params);
		}
	}
	//使用客户
	public List<UseConsumer> getUseConsumerList(Map<String,Object> params){
		return useconsumermapper.getUseConsumerList(params);
	}
	//历史
	public List<HistoryVendorFiles> gethistoryVendorFilesList(Map<String,Object> params) {
		return historymapper.gethistoryVendorFilesList(params);
	}
	//厂商文件
	public List<VendorAttachment> getVendorAttachmentList(Map<String,Object> params) {
		return vamapper.getVendorAttachmentList(params);
	}
}
