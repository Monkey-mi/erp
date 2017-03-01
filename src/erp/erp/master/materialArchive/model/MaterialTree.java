package erp.erp.master.materialArchive.model;

import java.io.Serializable;
import erp.common.Model;

public class MaterialTree extends Model implements Serializable{
	/*功能：页面公共树用到模型
	 *作者：伍恰
	 *时间：2014/12/24
	 * */
	private static final long serialVersionUID = 1L;
	private int id;
	private int parentId;
	private String text;
	private String expanded;
	private String leaf;
	private int order_seq;
	private int nodeId;
	private String type;
	private String lbbh;
	private String lbmc;
	private boolean checked;
	
	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public int getNodeId() {
		return nodeId;
	}

	public void setNodeId(int nodeId) {
		this.nodeId = nodeId;
	}

	public String getLbbh() {
		return lbbh;
	}

	public void setLbbh(String lbbh) {
		this.lbbh = lbbh;
	}

	public String getLbmc() {
		return lbmc;
	}

	public void setLbmc(String lbmc) {
		this.lbmc = lbmc;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

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
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}