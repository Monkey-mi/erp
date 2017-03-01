Ext.define('erp.common.form.view.TblFrmFld',{
	  extend: 'Ext.form.Panel',
	  alias: 'widget.tblFrmFld',/*
	  requires: ['erp.bo.view.TestHelp'],*/
//	  freg_id: null,
	  ft_id: null,
	  frmFlds: null,
	  width: 500,
	  autoScroll: true,
	  defaults: {
		  margin: '10 5 0 0',
		  cls: 'frm-field',
		  labelAlign: 'right'
	  },
	  initComponent: function() {
		  var me = this;
		  var items = [];
		  me.addEvents('loadFldsFinish');
		  if(me.frmFlds) { //如果给定字段，就不必到后台取
			  var fieldRecords = me.frmFlds;
			  me.fieldRecords = fieldRecords; //保存起来方便外面得到
			  var num = 0;//真正显示出来的form
			  for(var i = 0; i < fieldRecords.length; i++) {
				  var rec = fieldRecords[i];
//				  if(rec.ispk != 'true') {}

				  var datatype = rec.datatype;//字段类型
				  if(rec.code_type) { //基础数据
					  items.push({
						  xtype: 'helpField',
						  cls: '', //不必float right
						  fldName: rec.code,
						  code: rec.code_type, //数据表中的字段名,恰巧帮助窗口也有这个属性
						  fieldLabel: rec.name,//中文名称作为文字label
//						  returnField: returnField,
        				  mode: "defaults"
					  });
				  }
				  else if(datatype == 'int' || datatype == 'decimal') { //数字字段							  
					  items.push({
						  xtype: 'numberfield',
						  code: rec.code, //数据表中的字段名
						  flag: 'to'//区分from/to  
					  });			
					  items.push({ //两个field之间的label
						  xtype: 'label',
						  text: '到',
						  margin: '12 30 0 0'
					   });
					  items.push({
							xtype: 'numberfield',
							cls: '', //不必float right
							code: rec.code, //数据表中的字段名
							fieldLabel: rec.name, //中文名称作为文字label
							flag: 'from'//区分from/to
					  });
				  } else if(datatype == 'date') {
					  items.push({
						  xtype: 'datefield',
						  code: rec.code, //数据表中的字段名
						  flag: 'to'//区分from/to								 
					  });			
					  items.push({ //两个field之间的label
						  xtype: 'label',
						  text: '到',
						  margin: '12 30 0 0'
					    });
					  items.push({
							xtype: 'datefield',
							cls: '', //不必float right
							code: rec.code, //数据表中的字段名
							fieldLabel: rec.name, //中文名称作为文字label
							flag: 'from'//区分from/to
					  });
				  } else if(datatype == 'varchar') {
					  var xtype = 'textfield';
					  var returnField = null; //帮助窗口getValue实际值
//					  if(rec.code == 'ou_code' || rec.code == 'd_code') {
//						  xtype = 'helpField';
//						  returnField = rec.code;
//					  }
					  items.push({
						  xtype: xtype,
						  cls: '', //不必float right
						  code: rec.code, //数据表中的字段名,恰巧帮助窗口也有这个属性
						  fieldLabel: rec.name,//中文名称作为文字label
						  returnField: returnField,
        				  mode: "defaults"
					  });
				  }
				  num++;			  
			  }
			  if(35*num > window.screen.height*0.4) {
				  me.height = window.screen.height*0.4;
			  } else {
				  me.height = 35 * num; //设置form的高度
			  }
		  } else  { //如果没有直接给定frmFlds那么就要去后台取了
			  var params = {};
			  if(me.freg_id) { //取freg_id对应的主表
				  Ext.apply(params, {
					  freg_id: me.freg_id,
					  type: 'MASTER'
				  });	  
			  }
			  else if(me.ft_id) { //ft_id直接找到表
				  Ext.apply(params, {ft_id: me.ft_id});
			  }
			  //如果给定的是注册表单的freg_id，就取这个freg_id对应的主表的字段
			  Ext.Ajax.request({
				  url: 'form/Forms.do?method=getFrmTblList',
				  params: params,
				  async: false,
				  success: function(response) {
					  var obj = Ext.decode(response.responseText);
					  if(obj.data[0]) {
						  me.tableName = 'frmt_' + obj.data[0].code;
						  var fieldRecords = obj.data[0].frmFlds;
						  me.fieldRecords = fieldRecords; //保存起来方便外面得到
						  var num = 0;//真正显示出来的form
						  for(var i = 0; i < fieldRecords.length; i++) {
							  var rec = fieldRecords[i];
							  if(rec.ispk != 'true'&&rec.isidx == 'true') {
								  var datatype = rec.datatype;//字段类型
								  if(rec.code_type) { //基础数据
									  items.push({
										  xtype: 'helpField',
										  cls: '', //不必float right
										  fldName: rec.code,
										  code: rec.code_type, //数据表中的字段名,恰巧帮助窗口也有这个属性
										  fieldLabel: rec.name,//中文名称作为文字label
//										  returnField: returnField,
				        				  mode: "defaults"
									  });
								  }
								  else if(datatype == 'int' || datatype == 'decimal') { //数字字段							  
									  items.push({
										  xtype: 'numberfield',
										  code: rec.code, //数据表中的字段名
										  flag: 'to'//区分from/to  
									  });			
									  items.push({ //两个field之间的label
										  xtype: 'label',
										  text: '到',
										  margin: '12 30 0 0'
									   });
									  items.push({
											xtype: 'numberfield',
											cls: '', //不必float right
											code: rec.code, //数据表中的字段名
											fieldLabel: rec.name, //中文名称作为文字label
											flag: 'from'//区分from/to
									  });
								  } else if(datatype == 'date') {
									  items.push({
										  xtype: 'datefield',
										  code: rec.code, //数据表中的字段名
										  flag: 'to'//区分from/to								 
									  });			
									  items.push({ //两个field之间的label
										  xtype: 'label',
										  text: '到',
										  margin: '12 30 0 0'
									    });
									  items.push({
											xtype: 'datefield',
											cls: '', //不必float right
											code: rec.code, //数据表中的字段名
											fieldLabel: rec.name, //中文名称作为文字label
											flag: 'from'//区分from/to
									  });
								  } else if(datatype == 'varchar') {
									  var xtype = 'textfield';
									  var returnField = null; //帮助窗口getValue实际值
									  var code = rec.code;
//									  if(rec.code == 'ou_code' || rec.code == 'd_code') {
//										  xtype = 'helpField';
//										  returnField = rec.code;
//									  }
//									  if(rec.code_type) { //如果字段中有code_tye
//										  xtype = 'helpField';
//										  code = rec.code_type;
//									  }
									  items.push({
										  xtype: xtype,
										  cls: '', //不必float right
										  code: code, //数据表中的字段名,恰巧帮助窗口也有这个属性
										  fieldLabel: rec.name,//中文名称作为文字label
										  returnField: returnField,
				        				  mode: "defaults"
									  });
								  }
								  num++;
							  }
						  }
						  if(35*num > window.screen.height*0.4) {
							  me.height = window.screen.height*0.4;
						  } else {
							  me.height = 35 * num; //设置form的高度
						  }
						   
					  }				 
				  }
			  });
		  } 
		  me.items = items;
		  me.callParent(arguments);
		  me.fireEvent('loadFldsFinish', me, me.fieldRecords, me.tableName); //扔出一个事件表示所有的域已经构造好
	  },
	  getWhereStr: function() {
		  var me = this;
		  var whereStr = '';
		  for(var i = 0; i < me.items.length; i++) {
			  var item = me.items.items[i];					 
			  var code = item.fldName;
			  
			  if(code) { //没有字段名忽略
				  if(item.flag) { //如果是双field的字段 -数字、日期型
					  var fromField, toField;
					  var fromValue, toValue;
					  if(item.flag == 'from') {
						  fromField = item;
						  toField = me.items.items[i+2];
						  fromValue = fromField.getRawValue().trim();
						  toValue = toField.getRawValue().trim();
						  i = i+2;
					  } else if(item.flag == 'to') {
						  toField = item;
						  fromField = me.items.items[i+2];
						  fromValue = fromField.getRawValue().trim();
						  toValue = toField.getRawValue().trim();
						  i = i+2;
					  }
					  if(!fromField.isValid || !toField.isValid) {
						  Ext.Msg.alert('提示', '输入不正确！');
						  return;
					  }
					  if(fromValue != '' && toValue != '') {
						  whereStr += ' and ' + code + ' between \'' + fromValue + '\' and \'' + toValue + '\'';
					  } else if(fromValue != '' && toValue == '') {
						  whereStr += ' and ' + code + ' > \'' + fromValue + '\'';
					  } else if(fromValue == '' && toValue != '') {
						  whereStr += ' and ' + code + ' < \'' + toValue + '\'';
					  }
				  } else { //单field字段 -varchar型
					  if(item.xtype == 'helpField') {
						  var value = item.getValue();
						  if(value && value != '') {
							  whereStr += ' and ' + code + ' = \'' + item.getValue() + '\'';
						  }	
					  }
					  var value = item.getValue();
					  if(value != '') {
						  whereStr += ' and ' + code + ' = \'' + item.getValue() + '\'';
					  }							  
				  }
			  }
		  }
		  whereStr = whereStr.replace(/年/g, '-');
		  whereStr = whereStr.replace(/月/g, '-');
		  whereStr = whereStr.replace(/日/g, '');
		  return whereStr;
	  }
});