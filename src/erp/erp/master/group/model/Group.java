package erp.erp.master.group.model;
import java.io.Serializable;

import erp.common.Model;
public class Group extends Model implements Serializable{
	private static final long serialVersionUID = 1L;
      private String  cgzh;
      private String  cgzm;
      private String  bzsm;
      private String  db_TYPE;
	 public String getDb_TYPE() {
		return db_TYPE;
	}
	public void setDb_TYPE(String db_TYPE) {
		this.db_TYPE = db_TYPE;
	}
	public String getCgzh() {
		return cgzh;
	}
	 public void setCgzh(String cgzh) {
		this.cgzh = cgzh;
	}
	 public String getCgzm() {
		return cgzm;
	}
	 public void setCgzm(String cgzm) {
		this.cgzm = cgzm;
	}
	public String getBzsm() {
		if(bzsm==null){
			return "";
		}
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}

	
      
      
}
