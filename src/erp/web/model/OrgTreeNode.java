package erp.web.model;



import java.io.Serializable;
import java.util.List;

import erp.common.Model;


public class OrgTreeNode extends Model implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1262295939089254119L;
	private int id;
	private int parentId;
	private String text;
	private int orv_id;
	private int ou_id;
	private int od_id;
	private String ou_code;
	private String expanded;
	private String leaf;
	private int order_seq;
	//节点路径是否有效（可见）
	private String pv	      ;
	//节点是否仅仅是路径节点（7个勾都没打上）
	private String po	      ;
	private String has_qry   ;
	private String has_curd  ;
	private String is_default;
	private String has_op1   ;
	private String has_op2   ;
	private String has_op3   ;
	private String has_op4   ;
	
	private List<OrgTreeNode> data;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getOrv_id() {
		return orv_id;
	}

	public void setOrv_id(int orvId) {
		orv_id = orvId;
	}

	public int getOu_id() {
		return ou_id;
	}

	public void setOu_id(int ouId) {
		ou_id = ouId;
	}

	public int getOd_id() {
		return od_id;
	}

	public void setOd_id(int odId) {
		od_id = odId;
	}

	public String getOu_code() {
		return ou_code;
	}

	public void setOu_code(String ouCode) {
		ou_code = ouCode;
	}

	public String getExpanded() {
		return expanded;
	}

	public void setExpanded(String expanded) {
		this.expanded = expanded;
	}

	public String getLeaf() {
		return leaf;
	}

	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}

	public int getOrder_seq() {
		return order_seq;
	}

	public void setOrder_seq(int orderSeq) {
		order_seq = orderSeq;
	}

	public String getPv() {
		return pv;
	}

	public void setPv(String pv) {
		this.pv = pv;
	}

	public String getPo() {
		return po;
	}

	public void setPo(String po) {
		this.po = po;
	}

	public String getHas_qry() {
		return has_qry;
	}

	public void setHas_qry(String hasQry) {
		has_qry = hasQry;
	}

	public String getHas_curd() {
		return has_curd;
	}

	public void setHas_curd(String hasCurd) {
		has_curd = hasCurd;
	}

	public String getIs_default() {
		return is_default;
	}

	public void setIs_default(String isDefault) {
		is_default = isDefault;
	}

	public String getHas_op1() {
		return has_op1;
	}

	public void setHas_op1(String hasOp1) {
		has_op1 = hasOp1;
	}

	public String getHas_op2() {
		return has_op2;
	}

	public void setHas_op2(String hasOp2) {
		has_op2 = hasOp2;
	}

	public String getHas_op3() {
		return has_op3;
	}

	public void setHas_op3(String hasOp3) {
		has_op3 = hasOp3;
	}

	public String getHas_op4() {
		return has_op4;
	}

	public void setHas_op4(String hasOp4) {
		has_op4 = hasOp4;
	}

	public List<OrgTreeNode> getData() {
		return data;
	}

	public void setData(List<OrgTreeNode> data) {
		this.data = data;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public boolean ifPo(){
		return 
				!("true".equals(has_curd) ||
				"true".equals(has_qry) ||
				"true".equals(is_default) ||
				"true".equals(has_op1) ||
				"true".equals(has_op2) ||
				"true".equals(has_op3) ||
				"true".equals(has_op4)) ;
	}
}
