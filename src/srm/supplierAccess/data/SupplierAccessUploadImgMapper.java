package srm.supplierAccess.data;

import java.util.List;
import java.util.Map;

import srm.supplierAccess.model.SupplierAccessUploadImg;


public interface SupplierAccessUploadImgMapper {
	public List<SupplierAccessUploadImg> getSupplierAccessUploadImgList(Map<String,Object> params);
	public void addSupplierAccessUploadImg(SupplierAccessUploadImg obj);
	public void updateSupplierAccessUploadImg(SupplierAccessUploadImg obj);
	public void deleteSupplierAccessUploadImg(SupplierAccessUploadImg obj);
}
