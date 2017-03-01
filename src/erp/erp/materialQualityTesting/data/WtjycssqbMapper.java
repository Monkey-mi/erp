package erp.erp.materialQualityTesting.data;

import java.util.List;
import java.util.Map;

import erp.erp.materialQualityTesting.model.Wtjycssqb;


public interface WtjycssqbMapper {
	public List<Wtjycssqb> getwtjycssqbList(Map<String,Object> params);
	public void addwtjycssqb(Wtjycssqb obj);
	public void updatewtjycssqb(Wtjycssqb obj);
	public void deletewtjycssqb(Wtjycssqb obj);
	public int getMaxwtdh(Map<String,Object> params);
}
