package erp.web.model;


import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Repository;

import erp.common.Model;



public class OrgrelDetail extends Model implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7108244294289250142L;
	
	private int od_id;
	private int pod_id;
	private int orv_id;
	private int ou_id;
	private String leaf ;
	private int order_seq;
	private List<OrgRelVer> orgRelVer; 
	private List<OrgUnit>   orgUnit;
	public int getOrder_seq() {
		return order_seq;
	}
	public void setOrder_seq(int order_seq) {
		this.order_seq = order_seq;
	}
	public int getOd_id() {
		return od_id;
	}
	public void setOd_id(int od_id) {
		this.od_id = od_id;
	}
	public int getOu_id() {
		return ou_id;
	}
	public void setOu_id(int ou_id) {
		this.ou_id = ou_id;
	}
	public int getPod_id() {
		return pod_id;
	}
	public void setPod_id(int pod_id) {
		this.pod_id = pod_id;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public int getOrv_id() {
		return orv_id;
	}
	public void setOrv_id(int orv_id) {
		this.orv_id = orv_id;
	}
	public List<OrgRelVer> getOrgRelVer() {
		return orgRelVer;
	}
	public void setOrgRelVer(List<OrgRelVer> orgRelVer) {
		this.orgRelVer = orgRelVer;
	}
	public List<OrgUnit> getOrgUnit() {
		return orgUnit;
	}
	public void setOrgUnit(List<OrgUnit> orgUnit) {
		this.orgUnit = orgUnit;
	}
    
	
}
