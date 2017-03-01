package erp.bi.form.model;

public class CustomReportResult {
	private int list_id;
	private String name;
	private String description;
	private int creater;
	private String userName;
	private String creatTime;
	private String orgunit;
	private String report_type;
	private String ope;
	private String default_style;
	private String present_style;
	private String level;
	private int freg_id;
	private int docId;
	private int dsId;
	private String tpl_type;
	private String tpl_xml;
	private String is_active;
	private String cycle;
	
	public int getDsId() {
		return dsId;
	}
	public void setDsId(int dsId) {
		this.dsId = dsId;
	}
	public int getList_id() {
		return list_id;
	}
	public void setList_id(int listId) {
		list_id = listId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCreater() {
		return creater;
	}
	public void setCreater(int creater) {
		this.creater = creater;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCreatTime() {
		return creatTime;
	}
	public void setCreatTime(String creatTime) {
		this.creatTime = creatTime;
	}
	public String getOrgunit() {
		return orgunit;
	}
	public void setOrgunit(String orgunit) {
		this.orgunit = orgunit;
	}
	public String getReport_type() {
		return report_type;
	}
	public void setReport_type(String reportType) {
		report_type = reportType;
	}
	public String getOpe() {
		if(ope==null){
			return "";
		}
		return ope;
	}
	public void setOpe(String ope) {
		this.ope = ope;
	}
	public String getDefault_style() {
		return default_style;
	}
	public void setDefault_style(String defaultStyle) {
		default_style = defaultStyle;
	}
	public String getPresent_style() {
		if(present_style==null){
			return "";
		}
		return present_style;
	}
	public void setPresent_style(String presentStyle) {
		present_style = presentStyle;
	}
	public String getLevel() {
		if(level==null){
			return "";
		}
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public int getFreg_id() {
		return freg_id;
	}
	public void setFreg_id(int fregId) {
		freg_id = fregId;
	}
	public int getDocId() {
		return docId;
	}
	public void setDocId(int docId) {
		this.docId = docId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTpl_type() {
		return tpl_type;
	}
	public void setTpl_type(String tplType) {
		tpl_type = tplType;
	}
	public String getTpl_xml() {
		if(tpl_xml==null){
			return "";
		}
		return tpl_xml;
	}
	public void setTpl_xml(String tplXml) {
		tpl_xml = tplXml;
	}
	public String getIs_active() {
		return is_active;
	}
	public void setIs_active(String isActive) {
		is_active = isActive;
	}
	public String getCycle() {
		return cycle;
	}
	public void setCycle(String cycle) {
		this.cycle = cycle;
	}
	
}
