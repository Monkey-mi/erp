package erp.bi.form.model;

public class CustomQueryCdtion {

	private Integer c_id;
	private Integer l_id;
	private String ope;//条件符
	private String opeVal;//条件值
	private String field_type;//条件类型，比较符，还是 in()
	private String ft_ff_id;//对应的表名字段名
	private String cd_type;//查询类型：过滤条件，查询条件
	
	public Integer getC_id() {
		return c_id;
	}
	public void setC_id(Integer c_id) {
		this.c_id = c_id;
	}
	public Integer getL_id() {
		return l_id;
	}
	public void setL_id(Integer l_id) {
		this.l_id = l_id;
	}
	public String getOpe() {
		return ope;
	}
	public void setOpe(String ope) {
		this.ope = ope;
	}
	public String getOpeVal() {
		return opeVal;
	}
	public void setOpeVal(String opeVal) {
		this.opeVal = opeVal;
	}
	public String getField_type() {
		return field_type;
	}
	public void setField_type(String field_type) {
		this.field_type = field_type;
	}
	public String getFt_ff_id() {
		return ft_ff_id;
	}
	public void setFt_ff_id(String ft_ff_id) {
		this.ft_ff_id = ft_ff_id;
	}
	public String getCd_type() {
		return cd_type;
	}
	public void setCd_type(String cd_type) {
		this.cd_type = cd_type;
	}
}
