package erp.common.model;

import java.io.Serializable;

import erp.common.Model;



public class SerialRuleDetail extends Model implements Serializable {
	private int			sd_id;
	private int			sr_id;
	private String			code;
	private String			field_code;
	private String			fixed_text;
	private String			data_format;
	private String			uparam_type;
	private int			len;
	private int			sub_start;
	private int			sub_end;
	private String			fill_char;
	private String			is_fillafter;
	private int			seed;
	private int			step;
	private int			step_jump;
	private int			min_value;
	private int			max_value;
	private String			reset_mode;
	private int			order_seq;

	public int getSd_id() {
		return sd_id;
	}
	public void setSd_id(int sd_id) {
		this.sd_id = sd_id;
	}
	public int getSr_id() {
		return sr_id;
	}
	public void setSr_id(int sr_id) {
		this.sr_id = sr_id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getField_code() {
		return field_code;
	}
	public void setField_code(String field_code) {
		this.field_code = field_code;
	}
	public String getFixed_text() {
		return fixed_text;
	}
	public void setFixed_text(String fixed_text) {
		this.fixed_text = fixed_text;
	}
	public String getData_format() {
		return data_format;
	}
	public void setData_format(String data_format) {
		this.data_format = data_format;
	}
	public String getUparam_type() {
		return uparam_type;
	}
	public void setUparam_type(String uparam_type) {
		this.uparam_type = uparam_type;
	}
	public int getLen() {
		return len;
	}
	public void setLen(int len) {
		this.len = len;
	}
	public int getSub_start() {
		return sub_start;
	}
	public void setSub_start(int sub_start) {
		this.sub_start = sub_start;
	}
	public int getSub_end() {
		return sub_end;
	}
	public void setSub_end(int sub_end) {
		this.sub_end = sub_end;
	}
	public String getFill_char() {
		return fill_char;
	}
	public void setFill_char(String fill_char) {
		this.fill_char = fill_char;
	}
	public String getIs_fillafter() {
		return is_fillafter;
	}
	public void setIs_fillafter(String is_fillafter) {
		this.is_fillafter = is_fillafter;
	}
	public int getSeed() {
		return seed;
	}
	public void setSeed(int seed) {
		this.seed = seed;
	}
	public int getStep() {
		return step;
	}
	public void setStep(int step) {
		this.step = step;
	}
	public int getStep_jump() {
		return step_jump;
	}
	public void setStep_jump(int step_jump) {
		this.step_jump = step_jump;
	}
	public int getMin_value() {
		return min_value;
	}
	public void setMin_value(int min_value) {
		this.min_value = min_value;
	}
	public int getMax_value() {
		return max_value;
	}
	public void setMax_value(int max_value) {
		this.max_value = max_value;
	}
	public String getReset_mode() {
		return reset_mode;
	}
	public void setReset_mode(String reset_mode) {
		this.reset_mode = reset_mode;
	}
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
}
