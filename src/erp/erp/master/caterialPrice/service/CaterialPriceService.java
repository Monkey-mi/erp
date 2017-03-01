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
import erp.erp.master.caterialPrice.data.CaterialPriceMapper;
import erp.erp.master.caterialPrice.model.CaterialPrice;
import erp.erp.master.caterialPrice.model.CaterialPriceArgument;
import erp.util.MyStringUtils;


@Service
public class CaterialPriceService {
	@Autowired
	private CaterialPriceMapper mapper;
	@Autowired
	private CaterialPriceArgumentMapper caterialPriceArgumentMapper;
	/**
	* @Description: 材料价格公式CURD
	* Request caterialprice/caterialprice.act?method=******
	* Response {data:[{List<CaterialPrice>}]} <br/><br/>
	*/
	public List<CaterialPrice> getCaterialPriceList(Map<String,Object> params) {
		return mapper.getCaterialPriceList(params);
	}
	public void addCaterialPrice(CaterialPrice[] arr) {
		for(CaterialPrice obj: arr) {
			mapper.addCaterialPrice(obj);
		}
	}
	public void updateCaterialPrice(CaterialPrice[] arr) {
		for(CaterialPrice obj: arr) {
			mapper.updateCaterialPrice(obj);
		}
	}
	public void deleteCaterialPrice(CaterialPrice[] arr) {
		for(CaterialPrice obj: arr) {
			mapper.deleteCaterialPrice(obj);
		}
	}
	/**
	 * 保存前验证
	 * Request caterialprice/caterialprice.act?method=getBeforSave  <br/><br/>
	 * @author wq
	 * @date 2016-01-13
	 */
	public String getBeforSave(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		try {
			String jggs=params.get("jggs").toString();
			String ls_jggs=new String(jggs);
			//将"(){}[]"符号全部剔除，将"+-*/"全转换为"*"
			ls_jggs=ls_jggs.replace("(","");
			ls_jggs=ls_jggs.replace(")","");
			ls_jggs=ls_jggs.replace("{","");
			ls_jggs=ls_jggs.replace("}","");
			ls_jggs=ls_jggs.replace("[","");
			ls_jggs=ls_jggs.replace("]","");
			ls_jggs=ls_jggs.replace("+","*");
			ls_jggs=ls_jggs.replace("-","*");
			ls_jggs=ls_jggs.replace("/","*");
			//System.out.println(ls_jggs);
			String jggsArr[]=ls_jggs.split("\\*");
			for(String gs:jggsArr){
				if(MyStringUtils.isNumber(gs)){
					//System.out.println(true);
					//System.out.println(gs);
				}else{
					params.put("csmc", gs.trim());
					List<CaterialPriceArgument> cpaList= caterialPriceArgumentMapper.getCaterialPriceArgumentList(params);
					if(cpaList.size()>0){
						CaterialPriceArgument cpa=cpaList.get(0);
						jggs=jggs.replace(gs,String.valueOf(cpa.getCsbh()));
					}else{
						json.put("bool", false);
						json.put("msg", "参数表中不存在【"+gs+"】，请检查更新！");
						return json.toString();
					}
				}
			}
			json.put("jggs", jggs);
		}catch (Exception e) {
			json.put("bool", false);
			e.printStackTrace();
			json.put("msg", "保存验证时出现异常，请重试！");
		}
		return json.toString();
	}
	
	/**
	 * 删除前验证
	 * Request caterialprice/caterialprice.act?method=getBeforDelete  <br/><br/>
	 * @author wq
	 * @date 2016-01-12
	 */
	public String getBeforDelete(Map<String,Object> params) {
		JSONObject json=new JSONObject();
		json.put("bool", true);
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] {"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss"}));
		try {
			CaterialPrice [] arr=null;
			if(params.get("recordData")!=null){
				JSONArray jsonArray=JSONArray.fromObject(params.get("recordData").toString());
				arr=(CaterialPrice [])JSONArray.toArray(jsonArray,CaterialPrice.class);
				for(CaterialPrice obj:arr){
					if(mapper.getCaterialPriceIsQuote(obj)>1){
						json.put("bool", false);
						json.put("msg", "【"+obj.getGsmc()+"】已有材料调用,不能删除!");
						return json.toString();
					}
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
