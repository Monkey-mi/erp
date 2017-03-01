package erp.erp.arrivalRegister.data;

import java.util.List;
import java.util.Map;

import erp.erp.arrivalRegister.model.Dhztb;

public interface DhztbMapper {
	public List<Dhztb> getDhztbList(Map<String,Object> params);
    public void updateDhdh(Dhztb obj);
}
