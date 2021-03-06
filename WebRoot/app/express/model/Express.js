Ext.define('erp.express.model.Express', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'jlbh',
	fields: [
		{ name: 'jlbh' },
		{ name: 'xslb' },
		{ name: 'ywym' },
		{ name: 'dsdw' },
		{ name: 'dsfs' },
		{ name: 'dsyq' },
		{ name: 'ypzl', type: 'float' },
		{ name: 'dsfy', type: 'float' },
		{ name: 'fkfs'},
		{ name: 'jsbj', type: 'int' },
		{ name: 'jbrm' },
		{ name: 'wtrm' },
		{ name: 'sjdw' },
		{ name: 'sjrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'sjdh' },
		{ name: 'sjrm' },
		{ name: 'czym' },
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'gdbj', type: 'int' },
		{ name: 'hsbm' },
		{ name: 'sjdz' },
		{ name: 'jjrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'sqrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'qfbj', type: 'int' },
		{ name: 'cybh' },
		{ name: 'fffs'},
		{ name: 'sfbj', type: 'int' },
		{ name: 'sdrm' },
		{ name: 'sdsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'sdbj', type: 'int' },
		{ name: 'yjrm' },
		{ name: 'yjsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'yjbj', type: 'int' },
		{ name: 'tj', type: 'float' },
		{ name: 'jfzl', type: 'float' },
		{ name: 'khbh' },
		{ name: 'dfzh' },
		{ name: 'dsxs', type: 'float' },
		{ name: 'bzsm' },
		{ name: 'kdlx' },
		{ name: 'djlx' },
		{ name: 'fphm' },
		{ name: 'wbfy', type: 'float' },
		{ name: 'wbbh' },
		{ name: 'wbhl', type: 'float' },
		{ name: 'kdry' },
		{ name: 'csbh' },
		{ name: 'ssbm' },
		{ name: 'ydfy', type: 'float' },
		{ name: 'gbdq' },
		{ name: 'cybh_hz' },
		{ name: 'csmc' },
		{ name: 'khmc' },
		{ name: 'lbmc' },
		{ name: 'ywymc'},
		{ name: 'fffsmc'},
		{ name:'yjyf',type:'float'},
		//附表字段
		{ name: 'gjgn', type: 'int' },
		{ name: 'sjrdh' },
		{ name: 'wtrdh' },
		{ name: 'province', type: 'int' },
		{ name: 'city', type: 'int' },
		{ name: 'yjddsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'jldh',convert:function(v,record){return record.get('jlbh')}},
		{ name: 'sendloc'}
	]
});
