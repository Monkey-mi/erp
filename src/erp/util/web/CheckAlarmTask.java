package erp.util.web;
import java.util.HashMap;
import java.util.Map;
import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;

import erp.web.data.UsersMapper;

public class CheckAlarmTask extends TimerTask {
	@Autowired
	private UsersMapper usersMapper;
    public void run() {
        //System.out.println("定时器");
    	Map<String, Object> paramMap=new HashMap<String, Object>();
    	usersMapper.deleteExclusive(paramMap);
    }
}