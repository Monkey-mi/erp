package erp.erp.manufacturer.payAccount.data;

import java.util.List;
import java.util.Map;

import erp.erp.manufacturer.payAccount.model.Viewcsyf;

public interface ViewCsyfMapper {
	public List<Viewcsyf> getmanufAccountDetial(Map<String,Object> params);
    public void addmanufAccountDetial(Viewcsyf obj);
    public void updatemanufAccountDetial(Viewcsyf obj);
    public void deletemanufAccountDetial(Viewcsyf obj);
}
