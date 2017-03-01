/**
 * 最新版本的组织关系
 */
Ext.define('erp.setup.model.OrgRelVersUpdated', {
	extend: 'Ext.data.Model',
	idProperty: 'orv_id',
	fields: [{
		name: 'orv_id',
		type: 'int'
	}, {
		name: 'or_id',
		type: 'int'
	}, {
		name: 'orv_name'
	}, {
		name: 'or_name'
	}, {
		name: 'or_desc'
	}, {
		name: 'is_vaild'
	}, {
		name: 'attr_code'
	}, {
		name: 'start_date'
	}, {
		name: 'end_date'
	}, {
		name: 'or_type'
	}]
});