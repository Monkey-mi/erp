package erp.erp.manufacturer.payAccount.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import erp.erp.manufacturer.payAccount.data.QynfMapper;

/**
 * <p>Title: UtilService</p>
 * <p>Description: erp</p>
 * <p>Company: topsun</p> 
 * @author shufei
 * @date 2016-5-20上午9:12:06
 */

@Service
public class UtilService {
    @Autowired
	private QynfMapper qynfMapper;
	
    public int getQynf(Map<String,Object> params){
    	return qynfMapper.getQynf(params);
    }
    public Integer getJzzt(Map<String,Object> params){
        return qynfMapper.getJzzt(params);	
    }
    public String getYhmc(Map<String,Object> params){
    	String yhbh1 = params.get("yhbh").toString();
    	int yhbh;
    	String yhmc = "全部";
    	if(yhbh1 != null && yhbh1 != ""){
    		yhbh = Integer.parseInt(yhbh1);
    		System.out.println(yhbh);
        	params.put("yhbh", yhbh);
        	yhmc = qynfMapper.getYhmc(params);
        	System.out.println(yhmc);
    	}else{
    		yhmc = "全部";
    	}
    	return yhmc;
    }
    public String getBmmc(Map<String,Object> params){
    	String hsbm = params.get("hsbm").toString();
    	String bmmc = "全部";
    	if(hsbm != null && hsbm != ""){
    	bmmc = qynfMapper.getBmmc(params);
    	}else{
    	bmmc = "全部";
    	}   	
    	System.out.println(bmmc);
    	return bmmc;
    }
    public String getWbdh(Map<String,Object> params){
    	if(params.get("wbbh")==null){
    		params.put("wbbh", "");
    	}
    	String wbdh = qynfMapper.getWbdh(params);
    	return wbdh;
    }
}
