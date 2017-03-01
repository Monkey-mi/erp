/**
 * @author Yan.Wang
 * @class tp.hr.model.Employee
 * @extend Ext.data.Model
 * @interface 
 * @brief 员工信息
 * @date 2012.06.09
 */
Ext.define('erp.hr.model.EmpPosition', {
	extend: 'Ext.data.Model',
	fields: [
	            {name: 'ep_id', type: 'int'},
	            {name: 'eid', type: 'int'},
	            {name: 'emp_code'},
	            {name: 'lastname'},
	            {name: 'firstname'},
	            {name: 'ou_code'},
	            {name: 'ou_name'},
	            {name: 'd_code'},
	            {name: 'd_name'},
	            {name: 'pst_code'},
	            {name: 'pst_name'},
	            {name: 'pj_code'},
	            {name: 'type'},
	            {name: 'on_date', type:'date'},
	            {name: 'off_date', type:'date'},
	            {name: 'onduty'},
	            {name: 'login_id'},
	            {name: 'u_id'}
	        ],

	equals: function(obj){
		return 	this.get('ou_code') == obj.ou_code &&
						this.get('d_code') == obj.d_code &&
						this.get('pst_code') == obj.pst_code &&
						this.get('pj_code') == obj.pj_code;
	}
});