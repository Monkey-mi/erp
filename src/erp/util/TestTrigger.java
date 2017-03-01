package erp.util;
import java.util.LinkedList;

import javax.servlet.http.HttpSession;

import erp.web.model.LoginUser;

public class TestTrigger {
	 public String getParam() {
	  return param;
	 }
	 public void setParam(String param) {
	  this.param = param;
	 }
	 private String param;
	 
	 public void run(){
	  if(Const.users==null){
			Const.users=new LinkedList<LoginUser>();
		}
		LinkedList<LoginUser> users=Const.users;
		MySessionContext myc= MySessionContext.getInstance();  
		if(users!=null){
			for(int i=0;i<users.size();i++){
				String session=new String(users.get(i).getSession_id());
				if(users.get(i).getState()>=1){
					users.get(i).setState(users.get(i).getState()-1);
				}else if(users.get(i).getState()==0){
					System.out.println("删除");
					HttpSession sess = myc.getSession(session);
					sess.invalidate();
					if(users.size()!=0){
						users.remove(i);
					}
				}
			}
		}
	 }
}
