package erp.bi.form.model;

public class FrmtblRelationship {
	private int			id;
	private int			pk_tbl;
	private int			pk_fld;
	private int			fk_tbl;
	private int			fk_fld;
	private String 		ispk;
	private String 		pk_tblname;
	private String 		fk_tblname;
	private String 		fk_fldName;
	private String 		pk_fldName;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPk_tbl() {
		return pk_tbl;
	}
	public void setPk_tbl(int pk_tbl) {
		this.pk_tbl = pk_tbl;
	}
	public int getPk_fld() {
		return pk_fld;
	}
	public void setPk_fld(int pk_fld) {
		this.pk_fld = pk_fld;
	}
	public int getFk_tbl() {
		return fk_tbl;
	}
	public void setFk_tbl(int fk_tbl) {
		this.fk_tbl = fk_tbl;
	}
	public int getFk_fld() {
		return fk_fld;
	}
	public void setFk_fld(int fk_fld) {
		this.fk_fld = fk_fld;
	}
	public String getFk_fldName() {
		return fk_fldName;
	}
	public void setFk_fldName(String fkFldName) {
		fk_fldName = fkFldName;
	}
	public String getPk_fldName() {
		return pk_fldName;
	}
	public void setPk_fldName(String pkFldName) {
		pk_fldName = pkFldName;
	}
	public String getPk_tblname() {
		return pk_tblname;
	}
	public void setPk_tblname(String pkTblname) {
		pk_tblname = pkTblname;
	}
	public String getFk_tblname() {
		return fk_tblname;
	}
	public void setFk_tblname(String fkTblname) {
		fk_tblname = fkTblname;
	}
	public String getIspk() {
		return ispk;
	}
	public void setIspk(String ispk) {
		this.ispk = ispk;
	}
	
}
