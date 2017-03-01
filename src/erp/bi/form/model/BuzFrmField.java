/**
 * ZheJiang Topsun Holding Group
 * Copyright (c) 2015 All Rights Reserved.
 */
package erp.bi.form.model;

import java.io.Serializable;

import erp.common.Model;


/**
 * <pre>
 * 商业对象未选字段抽取
 * </pre>
 *
 * @author 华慧
 * @version $Id: BuzFrmField.java, v 0.1 2015-1-12 下午2:13:49 Administrator Exp $
 */
public class BuzFrmField extends Model implements Serializable {
        private int attr_id;           //行序号；
        private int org_ff_id;      //原始字段ID
        private int ft_id;             //表ID
        private int obj_id;         // 商业对象ID
        private String attr_name;   //字段名
        private String fd_name;         //字段Code
        private String ispk;                //是否主键
        private String allow_blank;     //可空
        private String fd_type;        //字段类型
        private String default_value;   //默认值
        private String order_type;      //排序方式
        private String tbl_name;        //表名
        private int len;                    //长度
        private int prec;                  //精度
        
        
        /**
         * Getter method for property <tt>attr_id</tt>.
         * 
         * @return property value of attr_id
         */
        public int getAttr_id() {
            return attr_id;
        }
        /**
         * Setter method for property <tt>attr_id</tt>.
         * 
         * @param attr_id value to be assigned to property attr_id
         */
        public void setAttr_id(int attr_id) {
            this.attr_id = attr_id;
        }
        /**
         * Getter method for property <tt>org_ff_id</tt>.
         * 
         * @return property value of org_ff_id
         */
        public int getOrg_ff_id() {
            return org_ff_id;
        }
        /**
         * Setter method for property <tt>org_ff_id</tt>.
         * 
         * @param org_ff_id value to be assigned to property org_ff_id
         */
        public void setOrg_ff_id(int org_ff_id) {
            this.org_ff_id = org_ff_id;
        }
        /**
         * Getter method for property <tt>ft_id</tt>.
         * 
         * @return property value of ft_id
         */
        public int getFt_id() {
            return ft_id;
        }
        /**
         * Setter method for property <tt>ft_id</tt>.
         * 
         * @param ft_id value to be assigned to property ft_id
         */
        public void setFt_id(int ft_id) {
            this.ft_id = ft_id;
        }
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
         * Getter method for property <tt>ispk</tt>.
         * 
         * @return property value of ispk
         */
        public String getIspk() {
            return ispk;
        }
        /**
         * Setter method for property <tt>ispk</tt>.
         * 
         * @param ispk value to be assigned to property ispk
         */
        public void setIspk(String ispk) {
            this.ispk = ispk;
        }
        /**
         * Getter method for property <tt>allow_blank</tt>.
         * 
         * @return property value of allow_blank
         */
        public String getAllow_blank() {
            return allow_blank;
        }
        /**
         * Setter method for property <tt>allow_blank</tt>.
         * 
         * @param allow_blank value to be assigned to property allow_blank
         */
        public void setAllow_blank(String allow_blank) {
            this.allow_blank = allow_blank;
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
         * Getter method for property <tt>default_value</tt>.
         * 
         * @return property value of default_value
         */
        public String getDefault_value() {
            return default_value;
        }
        /**
         * Setter method for property <tt>default_value</tt>.
         * 
         * @param default_value value to be assigned to property default_value
         */
        public void setDefault_value(String default_value) {
            this.default_value = default_value;
        }
        /**
         * Getter method for property <tt>order_type</tt>.
         * 
         * @return property value of order_type
         */
        public String getOrder_type() {
            return order_type;
        }
        /**
         * Setter method for property <tt>order_type</tt>.
         * 
         * @param order_type value to be assigned to property order_type
         */
        public void setOrder_type(String order_type) {
            this.order_type = order_type;
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
         * Getter method for property <tt>len</tt>.
         * 
         * @return property value of len
         */
        public int getLen() {
            return len;
        }
        /**
         * Setter method for property <tt>len</tt>.
         * 
         * @param len value to be assigned to property len
         */
        public void setLen(int len) {
            this.len = len;
        }
        /**
         * Getter method for property <tt>prec</tt>.
         * 
         * @return property value of prec
         */
        public int getPrec() {
            return prec;
        }
        /**
         * Setter method for property <tt>prec</tt>.
         * 
         * @param prec value to be assigned to property prec
         */
        public void setPrec(int prec) {
            this.prec = prec;
        }
        
        
        
    
}
