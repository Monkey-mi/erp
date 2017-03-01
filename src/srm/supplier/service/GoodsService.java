package srm.supplier.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.outsideasy.ws.common.vo.CXFResponse;
import com.outsideasy.ws.erp.supplier.SupplierInter;

import erp.util.MyJsonUtil;

import srm.supplier.data.GoodsMapper;
import srm.supplier.model.Goods;


@Service
public class GoodsService {
	@Autowired
	private GoodsMapper mapper;
	@Autowired
	private SupplierInter supplierInter;

	public List<Goods> getGoodsList(Map<String,Object> params) {
		return mapper.getGoodsList(params);
	}
	@Transactional
	public void addGoods(Goods[] arr) {
		for(Goods obj: arr) {			
			String jsonmap = MyJsonUtil.obj2string(obj);
			String result = supplierInter.addAppGoodsByWS(jsonmap);
			CXFResponse<Goods> sf=MyJsonUtil.str2CXFResponse(result, Goods.class);
		    String goods_out_id = sf.getParams().get("goods_out_id").toString();
		    obj.setGoods_out_id(Integer.valueOf(goods_out_id));
		    mapper.addGoods(obj);
		}
	}
	@Transactional
	public void updateGoods(Goods[] arr) {
		for(Goods obj: arr) {
			mapper.updateGoods(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.updateAppGoodsByWS(jsonmap);
		}
	}
	@Transactional
	public void deleteGoods(Goods[] arr) {
		for(Goods obj: arr) {
			mapper.deleteGoods(obj);
			String jsonmap = MyJsonUtil.obj2string(obj);
			supplierInter.deleteAppGoodsByWS(jsonmap);
		}
	}
}
