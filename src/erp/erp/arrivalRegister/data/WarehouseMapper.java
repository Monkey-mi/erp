package erp.erp.arrivalRegister.data;

import java.util.List;
import java.util.Map;

import erp.erp.arrivalRegister.model.Warehouse;

public interface WarehouseMapper {
    public List<Warehouse> getWarehouseList(Map<String,Object> params);
}
