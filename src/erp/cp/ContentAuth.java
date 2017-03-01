package erp.cp;


import java.util.Map;

import erp.cp.AuthProxy.AuthSignature;

public interface ContentAuth {
   public void invoke(AuthSignature target,Map<String,Object> param);
}	
