package srm.basicdata.mianUnit.data;

import java.util.List;
import java.util.Map;

import srm.basicdata.mianUnit.model.MianUnit;

/**单位类别*/
public interface MianUnitMapper {
	public List<MianUnit> getMianUnitList(Map<String,Object> params);
	public void addMianUnit(MianUnit obj);
	public void updateMianUnit(MianUnit obj);
	public void deleteMianUnit(MianUnit obj);
}
