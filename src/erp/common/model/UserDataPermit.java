/**
 * ZheJiang Topsun Holding Group
 * Copyright (c) 2008-2014 All Rights Reserved.
 */
package erp.common.model;

import java.io.Serializable;

import erp.common.Model;


/**
 * <pre>
 *  用户信息域权限
 * </pre>
 *
 * @author 华慧
 * @version $Id: UserDataPermit.java, v 0.1 2014-12-25 下午4:55:12 华慧 Exp $
 */
public class UserDataPermit extends Model implements Serializable {
private int obj_id;        //商业对象ID
private String obj_name;    //对象名
private String status;          //状态
private int mod_id;            //模块ID
private String service_name;    //服务名
private String ref_method_code; //方法CODE
private String data_permit;         //数据授权类型           1.COL_PERMIT 列授权     2.ROW_PERMIT 行授权
private String tbl_name;             //表名
private String attr_name;           //属性名|字段名
private String fd_name;             //视图字段名
private String p_type;                //对象授权类型      1. U 按用户       2. R 按角色
private String fd_type;               // 视图字段类型     varchar、text等
private String permit;              // 权限       +R 可读  -R 不可见  +W 可写
private String condition;           // 行权限条件
private String log_flag;            // 行规则逻辑连接符     
/**
 * Getter method for property <tt>obj_id</tt>.
 * 
 * @return property value of obj_id
 */
public int getObj_id() {
    return obj_id;
}
/**
 * Setter method for property <tt>obj_id</tt>.
 * 
 * @param obj_id value to be assigned to property obj_id
 */
public void setObj_id(int obj_id) {
    this.obj_id = obj_id;
}
/**
 * Getter method for property <tt>obj_name</tt>.
 * 
 * @return property value of obj_name
 */
public String getObj_name() {
    return obj_name;
}
/**
 * Setter method for property <tt>obj_name</tt>.
 * 
 * @param obj_name value to be assigned to property obj_name
 */
public void setObj_name(String obj_name) {
    this.obj_name = obj_name;
}
/**
 * Getter method for property <tt>status</tt>.
 * 
 * @return property value of status
 */
public String getStatus() {
    return status;
}
/**
 * Setter method for property <tt>status</tt>.
 * 
 * @param status value to be assigned to property status
 */
public void setStatus(String status) {
    this.status = status;
}
/**
 * Getter method for property <tt>service_name</tt>.
 * 
 * @return property value of service_name
 */
public String getService_name() {
    return service_name;
}
/**
 * Setter method for property <tt>service_name</tt>.
 * 
 * @param service_name value to be assigned to property service_name
 */
public void setService_name(String service_name) {
    this.service_name = service_name;
}
/**
 * Getter method for property <tt>ref_method_code</tt>.
 * 
 * @return property value of ref_method_code
 */
public String getRef_method_code() {
    return ref_method_code;
}
/**
 * Setter method for property <tt>ref_method_code</tt>.
 * 
 * @param ref_method_code value to be assigned to property ref_method_code
 */
public void setRef_method_code(String ref_method_code) {
    this.ref_method_code = ref_method_code;
}
/**
 * Getter method for property <tt>attr_name</tt>.
 * 
 * @return property value of attr_name
 */
public String getAttr_name() {
    return attr_name;
}
/**
 * Setter method for property <tt>attr_name</tt>.
 * 
 * @param attr_name value to be assigned to property attr_name
 */
public void setAttr_name(String attr_name) {
    this.attr_name = attr_name;
}
/**
 * Getter method for property <tt>fd_name</tt>.
 * 
 * @return property value of fd_name
 */
public String getFd_name() {
    return fd_name;
}
/**
 * Setter method for property <tt>fd_name</tt>.
 * 
 * @param fd_name value to be assigned to property fd_name
 */
public void setFd_name(String fd_name) {
    this.fd_name = fd_name;
}
/**
 * Getter method for property <tt>p_type</tt>.
 * 
 * @return property value of p_type
 */
public String getP_type() {
    return p_type;
}
/**
 * Setter method for property <tt>p_type</tt>.
 * 
 * @param p_type value to be assigned to property p_type
 */
public void setP_type(String p_type) {
    this.p_type = p_type;
}
/**
 * Getter method for property <tt>fd_type</tt>.
 * 
 * @return property value of fd_type
 */
public String getFd_type() {
    return fd_type;
}
/**
 * Setter method for property <tt>fd_type</tt>.
 * 
 * @param fd_type value to be assigned to property fd_type
 */
public void setFd_type(String fd_type) {
    this.fd_type = fd_type;
}
/**
 * Getter method for property <tt>permit</tt>.
 * 
 * @return property value of permit
 */
public String getPermit() {
    return permit;
}
/**
 * Setter method for property <tt>permit</tt>.
 * 
 * @param permit value to be assigned to property permit
 */
public void setPermit(String permit) {
    this.permit = permit;
}
/**
 * Getter method for property <tt>condition</tt>.
 * 
 * @return property value of condition
 */
public String getCondition() {
    return condition;
}
/**
 * Setter method for property <tt>condition</tt>.
 * 
 * @param condition value to be assigned to property condition
 */
public void setCondition(String condition) {
    this.condition = condition;
}
/**
 * Getter method for property <tt>data_permit</tt>.
 * 
 * @return property value of data_permit
 */
public String getData_permit() {
    return data_permit;
}
/**
 * Setter method for property <tt>data_permit</tt>.
 * 
 * @param data_permit value to be assigned to property data_permit
 */
public void setData_permit(String data_permit) {
    this.data_permit = data_permit;
}
/**
 * Getter method for property <tt>log_flag</tt>.
 * 
 * @return property value of log_flag
 */
public String getLog_flag() {
    return log_flag;
}
/**
 * Setter method for property <tt>log_flag</tt>.
 * 
 * @param log_flag value to be assigned to property log_flag
 */
public void setLog_flag(String log_flag) {
    this.log_flag = log_flag;
}
/**
 * Getter method for property <tt>tbl_name</tt>.
 * 
 * @return property value of tbl_name
 */
public String getTbl_name() {
    return tbl_name;
}
/**
 * Setter method for property <tt>tbl_name</tt>.
 * 
 * @param tbl_name value to be assigned to property tbl_name
 */
public void setTbl_name(String tbl_name) {
    this.tbl_name = tbl_name;
}
/**
 * Getter method for property <tt>mod_id</tt>.
 * 
 * @return property value of mod_id
 */
public int getMod_id() {
    return mod_id;
}
/**
 * Setter method for property <tt>mod_id</tt>.
 * 
 * @param mod_id value to be assigned to property mod_id
 */
public void setMod_id(int mod_id) {
    this.mod_id = mod_id;
}


}
