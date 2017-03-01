package erp.web.model;


import java.io.Serializable;

import erp.common.Model;

public class ExtDataSource extends Model implements Serializable {


	
    /**
	 * 
	 */
	private static final long serialVersionUID = -5549126673395603365L;
	private int id      ;
    private String dstype  ;
    private String dscode  ;
    private String dsname  ;
    private String srvaddr ;
    private int srvport ;
    private String srvlogin;
    private String srvpwd  ;
    private String dbname  ;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDstype() {
		return dstype;
	}
	public void setDstype(String dstype) {
		this.dstype = dstype;
	}
	public String getDscode() {
		return dscode;
	}
	public void setDscode(String dscode) {
		this.dscode = dscode;
	}
	public String getDsname() {
		return dsname;
	}
	public void setDsname(String dsname) {
		this.dsname = dsname;
	}
	public String getSrvaddr() {
		return srvaddr;
	}
	public void setSrvaddr(String srvaddr) {
		this.srvaddr = srvaddr;
	}
	public int getSrvport() {
		return srvport;
	}
	public void setSrvport(int srvport) {
		this.srvport = srvport;
	}
	public String getSrvlogin() {
		return srvlogin;
	}
	public void setSrvlogin(String srvlogin) {
		this.srvlogin = srvlogin;
	}
	public String getSrvpwd() {
		return srvpwd;
	}
	public void setSrvpwd(String srvpwd) {
		this.srvpwd = srvpwd;
	}
	public String getDbname() {
		return dbname;
	}
	public void setDbname(String dbname) {
		this.dbname = dbname;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
    
		
}