package erp.bi.form.model;


import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Repository;

import erp.common.Model;


public class FrmTbl extends Model implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 6855241381417242235L;
	private int ft_id    ; 
    private int freg_id  ;
    private String from_attr;
    private String dscode;
    private String type     ; 
    private String name     ; 
    private String code     ;
    private int bo_def_id;
    private List<FrmFld> FrmFlds;
    
    
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getFt_id() {
		return ft_id;
	}
	public void setFt_id(int ft_id) {
		this.ft_id = ft_id;
	}
	public int getFreg_id() {
		return freg_id;
	}
	public void setFreg_id(int freg_id) {
		this.freg_id = freg_id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public void setFrom_attr(String from_attr) {
		this.from_attr = from_attr;
	}
	public String getFrom_attr() {
		return from_attr;
	}
	public void setFrmFlds(List<FrmFld> frmFlds) {
		FrmFlds = frmFlds;
	}
	public List<FrmFld> getFrmFlds() {
		return FrmFlds;
	}
	public void setBo_def_id(int bo_def_id) {
		this.bo_def_id = bo_def_id;
	}
	public int getBo_def_id() {
		return bo_def_id;
	}
	public void setDscode(String dscode) {
		this.dscode = dscode;
	}
	public String getDscode() {
		return dscode;
	} 
}
