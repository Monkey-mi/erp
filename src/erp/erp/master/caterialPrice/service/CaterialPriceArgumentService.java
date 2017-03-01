package erp.erp.master.caterialPrice.service;

import java.util.List;
import java.util.Map;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.caterialPrice.data.CaterialPriceArgumentMapper;
import erp.erp.master.caterialPrice.model.CaterialPrice;
import erp.erp.master.caterialPrice.model.CaterialPriceArgument;


@Service
public class CaterialPriceArgumentService {
	@Autowired
	private CaterialPriceArgumentMapper mapper;

	/**
	* @Description: 材料价格公式参数CURD
	* Request caterialprice/caterialpriceargument.act?method=******
	* Response {data:[{List<CaterialPrice>}]} <br/><br/>
	*/
	public List<CaterialPriceArgument> getCaterialPriceArgumentList(Map<String,Object> params) {
		return mapper.getCaterialPriceArgumentList(params);
	}
	public void addCaterialPriceArgument(CaterialPriceArgument[] arr) {
		for(CaterialPriceArgument obj: arr) {
			mapper.addCaterialPriceArgument(obj);
		}
	}
	public void updateCaterialPriceArgument(CaterialPriceArgument[] arr) {
		for(CaterialPriceArgument obj: arr) {
			mapper.updateCaterialPriceArgument(obj);
		}
	}
	public void deleteCaterialPriceArgument(CaterialPriceArgument[] arr) {
		for(CaterialPriceArgument obj: arr) {
			mapper.deleteCaterialPriceArgument(obj);
		}
	}
	
	/**
	 * 删除前验证
	 * Request caterialprice/caterialpriceargument.act?method=getBeforSave  <br/><br/>
	 * @author wq
	 * @date 2016-01-14
	 */
	public String getBeforSave(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		try {
			if(params.get("csmc")!=null){
				if(mapper.getArgumentIsExist(params)>0){
					json.put("bool", false);
					json.put("msg", "参数名称不能相同!");
					return json.toString();
				}
			}
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "删除验证时出现异常，请重试！");
		}
		return json.toString();
	}
}
