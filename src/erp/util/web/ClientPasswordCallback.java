package erp.util.web;

import java.io.IOException;

import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;

import org.apache.ws.security.WSPasswordCallback;

public class ClientPasswordCallback implements CallbackHandler {

	@Override
	public void handle(Callback[] callbacks) throws IOException,
			UnsupportedCallbackException {
		// TODO Auto-generated method stub

		WSPasswordCallback pc = (WSPasswordCallback) callbacks[0];  
        pc.setPassword("topsun");  
        pc.setIdentifier("admin");
	}

}
