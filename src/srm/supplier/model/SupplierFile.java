//供应商档案信息表数据模型
package srm.supplier.model;

import java.util.Date;
import java.io.Serializable;

import erp.common.Model;
public class SupplierFile extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 7521635333367004858L;
	private int			company_id;
	private String			class_id;
	private String			nature_id;
	private int             industry_id;
	private int             taxman_id;
	private String			inner_level;
	private String			apply_sts;
	private String			cpyname_en;
	private String			cpyname_cn;
	private int			reg_addr_code;
	private String			reg_addr;
	private int			contact_addr_code;
	private String			contact_addr;
	private String			f_phone;
	private String			corporation;
	private String			contacts;
	private String			m_phone;
	private String			fax;
	private String			email;
	private String			bus_license;
	private String			tax_no;
	private double			reg_fund;
	private int currency_id;
	private Date			establish_dt;
	private int			emplyees;
	private int			college_num;
	private int			op_num;
	private int			tech_num;
	private int			qc_num;
	private int			staff_num;
	private int			qe_num;
	private double			company_area;
	private double			factory_area;
	private String			factory_owner;
	private Date			use_begintime;
	private Date			use_endtime;
	private double			turnover;
	private int turnover_currency_id;
	private String			certification_system;
	private Date			create_dt;
	private String			ip_addr;
	private Date			checked_date;
	private int			version;
	private double			manage_score;
	private double			improve_score;
	private double			area_score;
	private double			exploit_score;
	private double			storage_score;
	private double			equ_score;
	private double			tec_score;
	private double			pro_file_score;
	private double			research_score;
	private double			reject_score;
	private double			quality_score;
	private double			qc_score;
	private double			filesave_score;
	private boolean is_archive;
	private boolean is_delete;
	private String operator;
	private Date operater_dt;
	private String auditor;
	private Date audit_dt;
	private int is_chinese;
	private int mc_id_1;
	private String mc_name_1;
	private String mc_id_2;
	private String mc_name_2;
	private String mc_id_3;
	private String mc_name_3;
	private int fkts;
	private double xyed;
	private String ztdw;
	private String wbbh;
	private double xdbl;
	private String fwlx;
	private String csbh;
	private String fktj;
	private String head_audit;
	private Date assess_dt;
	private String khbh;
	private String hzcs;
	private String hddw;
	private String hddw2;
	private int record_id;
	private String nature_name;
	private String realtedAddress;
	private int company_out_id; 
	private String currency_en;
	private String turnover_currency_en;
	
	private String bzsm;
	
	public String getBzsm() {
		return bzsm;
	}
	public void setBzsm(String bzsm) {
		this.bzsm = bzsm;
	}
	public String getTurnover_currency_en() {
		return turnover_currency_en;
	}
	public void setTurnover_currency_en(String turnover_currency_en) {
		this.turnover_currency_en = turnover_currency_en;
	}
	public String getCurrency_en() {
		return currency_en;
	}
	public void setCurrency_en(String currency_en) {
		this.currency_en = currency_en;
	}
	
	public int getCompany_out_id() {
		return company_out_id;
	}
	public void setCompany_out_id(int company_out_id) {
		this.company_out_id = company_out_id;
	}
	public String getRealtedAddress() {
		return realtedAddress;
	}
	public void setRealtedAddress(String realtedAddress) {
		this.realtedAddress = realtedAddress;
	}
	public String getNature_name() {
		return nature_name;
	}
	public void setNature_name(String nature_name) {
		this.nature_name = nature_name;
	}
	public int getRecord_id() {
		return record_id;
	}
	public void setRecord_id(int record_id) {
		this.record_id = record_id;
	}
	public String getHddw2() {
		if(hddw2==null){
			return "";
		}
		return hddw2;
	}
	public void setHddw2(String hddw2) {
		this.hddw2 = hddw2;
	}
	public String getHzcs() {
		if(hzcs==null){
			return "";
		}
		return hzcs;
	}
	public void setHzcs(String hzcs) {
		this.hzcs = hzcs;
	}
	public String getHddw() {
		if(hddw==null){
			return "";
		}
		return hddw;
	}
	public void setHddw(String hddw) {
		this.hddw = hddw;
	}
	public String getKhbh() {
		return khbh;
	}
	public void setKhbh(String khbh) {
		this.khbh = khbh;
	}
	public String getHead_audit() {
		return head_audit;
	}
	public void setHead_audit(String head_audit) {
		this.head_audit = head_audit;
	}
	public Date getAssess_dt() {
		return assess_dt;
	}
	public void setAssess_dt(Date assess_dt) {
		this.assess_dt = assess_dt;
	}
	public String getFktj() {
		return fktj;
	}
	public void setFktj(String fktj) {
		this.fktj = fktj;
	}
	public int getFkts() {
		return fkts;
	}
	public void setFkts(int fkts) {
		this.fkts = fkts;
	}
	public double getXyed() {
		return xyed;
	}
	public void setXyed(double xyed) {
		this.xyed = xyed;
	}
	public String getZtdw() {
		return ztdw;
	}
	public void setZtdw(String ztdw) {
		this.ztdw = ztdw;
	}
	public String getWbbh() {
		return wbbh;
	}
	public void setWbbh(String wbbh) {
		this.wbbh = wbbh;
	}
	public double getXdbl() {
		return xdbl;
	}
	public void setXdbl(double xdbl) {
		this.xdbl = xdbl;
	}
	public String getFwlx() {
		return fwlx;
	}
	public void setFwlx(String fwlx) {
		this.fwlx = fwlx;
	}
	public String getCsbh() {
		if(csbh==null){
			return "";
		}
		return csbh;
	}
	public void setCsbh(String csbh) {
		this.csbh = csbh;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getCompany_id() {
		return company_id;
	}
	public void setCompany_id(int company_id) {
		this.company_id = company_id;
	}
	public String getClass_id() {
		return class_id;
	}
	public void setClass_id(String class_id) {
		this.class_id = class_id;
	}
	public String getNature_id() {
		return nature_id;
	}
	public void setNature_id(String nature_id) {
		this.nature_id = nature_id;
	}
	public int getIndustry_id()
	{
		return this.industry_id;
	}
	public void setIndustry_id(int industry_id)
	{
		this.industry_id=industry_id;
	}
	public int getTaxman_id()
	{
		return this.taxman_id;
	}
	public void setTaxman_id(int taxman_id)
	{
		this.taxman_id=taxman_id;
	}
	public String getInner_level() {
		return inner_level;
	}
	public void setInner_level(String inner_level) {
		this.inner_level = inner_level;
	}
	public String getApply_sts() {
		return apply_sts;
	}
	public void setApply_sts(String apply_sts) {
		this.apply_sts = apply_sts;
	}
	public String getCpyname_en() {
		return cpyname_en;
	}
	public void setCpyname_en(String cpyname_en) {
		this.cpyname_en = cpyname_en;
	}
	public String getCpyname_cn() {
		return cpyname_cn;
	}
	public void setCpyname_cn(String cpyname_cn) {
		this.cpyname_cn = cpyname_cn;
	}
	public int getReg_addr_code() {
		return reg_addr_code;
	}
	public void setReg_addr_code(int reg_addr_code) {
		this.reg_addr_code = reg_addr_code;
	}
	public String getReg_addr() {
		return reg_addr;
	}
	public void setReg_addr(String reg_addr) {
		this.reg_addr = reg_addr;
	}
	public int getContact_addr_code() {
		return contact_addr_code;
	}
	public void setContact_addr_code(int contact_addr_code) {
		this.contact_addr_code = contact_addr_code;
	}
	public String getContact_addr() {
		return contact_addr;
	}
	public void setContact_addr(String contact_addr) {
		this.contact_addr = contact_addr;
	}
	public String getF_phone() {
		return f_phone;
	}
	public void setF_phone(String f_phone) {
		this.f_phone = f_phone;
	}
	public String getCorporation() {
		return corporation;
	}
	public void setCorporation(String corporation) {
		this.corporation = corporation;
	}
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	public String getM_phone() {
		return m_phone;
	}
	public void setM_phone(String m_phone) {
		this.m_phone = m_phone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBus_license() {
		return bus_license;
	}
	public void setBus_license(String bus_license) {
		this.bus_license = bus_license;
	}
	public String getTax_no() {
		return tax_no;
	}
	public void setTax_no(String tax_no) {
		this.tax_no = tax_no;
	}
	public double getReg_fund() {
		return reg_fund;
	}
	public void setReg_fund(double reg_fund) {
		this.reg_fund = reg_fund;
	}
	public int getCurrency_id(){
		return currency_id;
	}
	public void setCurrency_id(int currency_id){
		this.currency_id=currency_id;
	}
	public Date getEstablish_dt() {
		return establish_dt;
	}
	public void setEstablish_dt(Date establish_dt) {
		this.establish_dt = establish_dt;
	}
	public int getEmplyees() {
		return emplyees;
	}
	public void setEmplyees(int emplyees) {
		this.emplyees = emplyees;
	}
	public int getCollege_num() {
		return college_num;
	}
	public void setCollege_num(int college_num) {
		this.college_num = college_num;
	}
	public int getOp_num() {
		return op_num;
	}
	public void setOp_num(int op_num) {
		this.op_num = op_num;
	}
	public int getTech_num() {
		return tech_num;
	}
	public void setTech_num(int tech_num) {
		this.tech_num = tech_num;
	}
	public int getQc_num() {
		return qc_num;
	}
	public void setQc_num(int qc_num) {
		this.qc_num = qc_num;
	}
	public int getStaff_num() {
		return staff_num;
	}
	public void setStaff_num(int staff_num) {
		this.staff_num = staff_num;
	}
	public int getQe_num() {
		return qe_num;
	}
	public void setQe_num(int qe_num) {
		this.qe_num = qe_num;
	}
	public double getCompany_area() {
		return company_area;
	}
	public void setCompany_area(double company_area) {
		this.company_area = company_area;
	}
	public double getFactory_area() {
		return factory_area;
	}
	public void setFactory_area(double factory_area) {
		this.factory_area = factory_area;
	}
	public String getFactory_owner() {
		return factory_owner;
	}
	public void setFactory_owner(String factory_owner) {
		this.factory_owner = factory_owner;
	}
	public Date getUse_begintime() {
		return use_begintime;
	}
	public void setUse_begintime(Date use_begintime) {
		this.use_begintime = use_begintime;
	}
	public Date getUse_endtime() {
		return use_endtime;
	}
	public void setUse_endtime(Date use_endtime) {
		this.use_endtime = use_endtime;
	}
	public double getTurnover() {
		return turnover;
	}
	public void setTurnover(double turnover) {
		this.turnover = turnover;
	}
	public int getTurnover_currency_id(){
		return turnover_currency_id;
	}
	public void setTurnover_currency_id(int turnover_currency_id){
		this.turnover_currency_id=turnover_currency_id;
	}
	public String getCertification_system() {
		return certification_system;
	}
	public void setCertification_system(String certification_system) {
		this.certification_system = certification_system;
	}
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public String getIp_addr() {
		return ip_addr;
	}
	public void setIp_addr(String ip_addr) {
		this.ip_addr = ip_addr;
	}
	public Date getChecked_date() {
		return checked_date;
	}
	public void setChecked_date(Date checked_date) {
		this.checked_date = checked_date;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public double getManage_score() {
		return manage_score;
	}
	public void setManage_score(double manage_score) {
		this.manage_score = manage_score;
	}
	public double getImprove_score() {
		return improve_score;
	}
	public void setImprove_score(double improve_score) {
		this.improve_score = improve_score;
	}
	public double getArea_score() {
		return area_score;
	}
	public void setArea_score(double area_score) {
		this.area_score = area_score;
	}
	public double getExploit_score() {
		return exploit_score;
	}
	public void setExploit_score(double exploit_score) {
		this.exploit_score = exploit_score;
	}
	public double getStorage_score() {
		return storage_score;
	}
	public void setStorage_score(double storage_score) {
		this.storage_score = storage_score;
	}
	public double getEqu_score() {
		return equ_score;
	}
	public void setEqu_score(double equ_score) {
		this.equ_score = equ_score;
	}
	public double getTec_score() {
		return tec_score;
	}
	public void setTec_score(double tec_score) {
		this.tec_score = tec_score;
	}
	public double getPro_file_score() {
		return pro_file_score;
	}
	public void setPro_file_score(double pro_file_score) {
		this.pro_file_score = pro_file_score;
	}
	public double getResearch_score() {
		return research_score;
	}
	public void setResearch_score(double research_score) {
		this.research_score = research_score;
	}
	public double getReject_score() {
		return reject_score;
	}
	public void setReject_score(double reject_score) {
		this.reject_score = reject_score;
	}
	public double getQuality_score() {
		return quality_score;
	}
	public void setQuality_score(double quality_score) {
		this.quality_score = quality_score;
	}
	public double getQc_score() {
		return qc_score;
	}
	public void setQc_score(double qc_score) {
		this.qc_score = qc_score;
	}
	public double getFilesave_score() {
		return filesave_score;
	}
	public void setFilesave_score(double filesave_score) {
		this.filesave_score = filesave_score;
	}
	public boolean getIs_archive()
	{
		if(is_archive){
			return false;
		}
		return is_archive;
	}
	public void setIs_archive(boolean is_archive)
	{
		this.is_archive=is_archive;
	}
	public boolean getIs_delete()
	{
		return is_delete;
	}
	public void setIs_delete(boolean is_delete)
	{
		this.is_delete=is_delete;
	}
	public String getOperator()
	{
		return operator;
	}
	public void setOperator(String operator)
	{
		this.operator=operator;
	}
	public Date getOperater_dt()
	{
		return operater_dt;
	}
	public void setOperater_dt(Date operater_dt)
	{
		this.operater_dt=operater_dt;
	}
	public String getAuditor()
	{
		return auditor;
	}
	public void setAuditor(String auditor)
	{
		this.auditor=auditor;
	}
	public Date getAudit_dt()
	{
		return audit_dt;
	}
	public void setAudit_dt(Date audit_dt)
	{
		this.audit_dt=audit_dt;
	}
	public int getIs_chinese()
	{
		return is_chinese;
	}
	public void setIs_chinese(int is_chinese)
	{
		this.is_chinese=is_chinese;
	}
	public int getMc_id_1()
	{
		return mc_id_1;
	}
	public void setMc_id_1(int mc_id_1)
	{
		this.mc_id_1=mc_id_1;
	}
	public String getMc_name_1()
	{
		return mc_name_1;
	}
	public void setMc_name_1(String mc_name_1)
	{
		this.mc_name_1=mc_name_1;
	}
	public String getMc_id_2()
	{
		return mc_id_2;
	}
	public void setMc_id_2(String mc_id_2)
	{
		this.mc_id_2=mc_id_2;
	}
	public String getMc_name_2()
	{
		return mc_name_2;
	}
	public void setMc_name_2(String mc_name_2)
	{
		this.mc_name_2=mc_name_2;
	}
	public String getMc_id_3()
	{
		return mc_id_3;
	}
	public void setMc_id_3(String mc_id_3)
	{
		this.mc_id_3=mc_id_3;
	}
	public String getMc_name_3()
	{
		return mc_name_3;
	}
	public void setMc_name_3(String mc_name_3)
	{
		this.mc_name_3=mc_name_3;
	}
}
