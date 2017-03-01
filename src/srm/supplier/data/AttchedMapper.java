package srm.supplier.data;

import java.util.List;
import java.util.Map;

import srm.supplier.model.Attched;

public interface AttchedMapper {
	public List<Attched> getAttchedList(Map<String,Object> params);
	public void addAttched(Attched obj);
	public void updateAttched(Attched obj);
	public void deleteAttched(Attched obj);
}
