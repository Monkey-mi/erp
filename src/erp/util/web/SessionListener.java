package erp.util.web;

import java.util.LinkedList;


import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;

import erp.util.Const;
import erp.util.FtpParam;
import erp.util.MySessionContext;
import erp.web.model.LoginUser;
import erp.web.model.UserInfo;

public class SessionListener implements HttpSessionListener,HttpSessionAttributeListener {
	/* 功能：设置当前用户数量
	 * author：伍恰
	 * 时间：2015/1/15
	 * */
	private static int sessionCount=0;
	private   MySessionContext myc=MySessionContext.getInstance();
	public static Integer getSessionCount() {
		return Integer.valueOf(sessionCount) ;
	}
	public static void increaseSessionCount(){
		sessionCount++;
	}
	protected static Logger logger = Logger.getLogger("service");

	@Override
	public void sessionCreated(HttpSessionEvent hse) {
		// TODO Auto-generated method stub
		logger.debug("one session created...");
		myc.AddSession(hse.getSession());
		sessionCount++;
	}
	
	@Override
	public void sessionDestroyed(HttpSessionEvent hse) {
		// TODO Auto-generated method stub
		try{
			if(Const.users==null){
				Const.users=new LinkedList<LoginUser>();
			}
			HttpSession httpSession = hse.getSession();
			LinkedList<LoginUser> users=Const.users;
			myc.DelSession(httpSession);
			if(users!=null){
				for(LoginUser user:users){
					if(user.getSession_id().equals(httpSession.getId())){
						users.remove(user);
						logger.debug(user.getName()+"one session destroyed...");
						break;
					}
				}
			}
			if(sessionCount>0)
			sessionCount--;
		}catch(Exception e){
			logger.debug(e.getMessage());
		}
	}

	@Override
	public void attributeAdded(HttpSessionBindingEvent hsbe) {
		// TODO Auto-generated method stub
		logger.debug(String.format("attribute[%s]added...",hsbe.getName()));
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent hsbe) {
		// TODO Auto-generated method stub
		logger.debug(String.format("attribute[%s]removed...",hsbe.getName()));
		if(hsbe.getName().equalsIgnoreCase("user")){
			logger.debug(String.format("user [%s-%s] logout...",((UserInfo)(hsbe.getValue())).getLogin_id(),((UserInfo)(hsbe.getValue())).getName()));
			if(sessionCount>1){
				sessionCount--;
			}
		}
	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent hsbe) {
		// TODO Auto-generated method stub
		logger.debug(String.format("attribute[%s]replaced...",hsbe.getName()));
	}

}
