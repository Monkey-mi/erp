package erp.erp.master.prematerial.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.master.prematerial.data.PrematerialMapper;
import erp.erp.master.prematerial.model.Prematerial;


@Service
public class PrematerialService {
	@Autowired
	private PrematerialMapper mapper;


	public List<Prematerial> getPrematerialList(Map<String,Object> params) {
		Map<String,Object> pa=new HashMap<String, Object>();
		pa.put("czy_gh", params.get("czy_gh"));
		int i=0;
		String ckqx="and (";
		List<String> ckbhList = mapper.getCkqx(pa);
		if(ckbhList.isEmpty()){
			return null;
		}
		for(String str:ckbhList){
			if(i==0){
				ckqx+="(d.ckbh='') or (left(d.ckbh,len('"+str.trim()+"'))='"+str.trim()+"')";
			}else{
				ckqx+=" or (left(d.ckbh,len('"+str.trim()+"'))='"+str.trim()+"')";
			}
			i++;
		}
		ckqx+=")";
		if(ckbhList.size()>0){
			params.put("ckqx", ckqx);
		}
		return mapper.getPrematerialList(params);
	}
	public void addPrematerial(Prematerial[] arr) {
		for(Prematerial obj: arr) {
			mapper.addPrematerial(obj);
		}
	}
	public void updatePrematerial(Prematerial[] arr) {
		for(Prematerial obj: arr) {
			mapper.updatePrematerial(obj);
		}
	}
	public void deletePrematerial(Prematerial[] arr) {
		for(Prematerial obj: arr) {
			mapper.deletePrematerial(obj);
		}
	}
	public String getCsName(String params) {
		return mapper.getCsName(params);
	}
}
