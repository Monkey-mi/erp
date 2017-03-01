package erp.erp.plasticPartsPledge.data;

import java.util.List;
import java.util.Map;

import erp.erp.plasticPartsPledge.model.PlasticPartsPledge;


public interface PlasticPartsPledgeMapper {
	public List<PlasticPartsPledge> getPlasticPartsPledgeList(Map<String,Object> params);
	public void addPlasticPartsPledge(PlasticPartsPledge obj);
	public void updatePlasticPartsPledge(PlasticPartsPledge obj);
	public void deletePlasticPartsPledge(PlasticPartsPledge obj);
	public void deletePlasticPartsPledgeByZydh(Map<String,Object> params);
	public String getStringFromSql(Map<String,Object> params);
	public void updatePlasticPartsPledgeState(Map<String,Object> params);
}
