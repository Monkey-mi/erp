package srm.supplier.data;

import java.util.List;
import java.util.Map;

import srm.supplier.model.Goods;

public interface GoodsMapper {
	public List<Goods> getGoodsList(Map<String,Object> params);
	public void addGoods(Goods obj);
	public void updateGoods(Goods obj);
	public void deleteGoods(Goods obj);
}
