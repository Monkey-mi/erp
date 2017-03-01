Ext.define('erp.common.form.view.TblFldFrm',{
	  extend: 'Ext.form.Panel',
	  alias: 'widget.tblFldFrm',
	  /*requires: ['erp.bo.view.TestHelp'],*/
//	  freg_id: null,
	  ft_id: null,
	  frmFlds: null,
	  width: 500,
	  layout:'fit',
	  resizable : false,
	  modal : true,
	  autoScroll: true,
	  defaults: {
		  margin: '10 5 0 0',
		  cls: 'frm-field',
		  labelAlign: 'right'
	  },
	  initComponent: function() {
		  var me = this;
		  var items = [];
		  var num = 0;//真正显示出来的form
		  me.addEvents('loadFldsFinish');
		  if(me.frmFlds) { //如果给定字段，就不必到后台取
			  var fieldRecords = me.frmFlds;
			  me.fieldRecords = fieldRecords; //保存起来方便外面得到
			  me.createFields(fieldRecords);
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
						  items=me.createFields(fieldRecords);
						  num=me.numCreate(num, fieldRecords);
						  if(40*num > window.screen.height*0.4) {
							  me.height = window.screen.height*0.4;
						  } else {
							  me.height = 40 * num; //设置form的高度
						  }
					  }				 
				  }
			  });
		  } 
		  Ext.apply(me,{
			 items:[{
				 xtype : 'form',
					frame:false,
					bodyPadding : 5,
					title:'',
					plugins:{
				          ptype: 'FormKeyMapper'
				   },
					fieldDefaults : {
						labelAlign : 'right',
						labelWidth : 60,
						msgTarget : 'qtip'
					},
			    	 items:items
			  }]
		  });
		  me.fields=items;
		  me.callParent(arguments);
		  me.fireEvent('loadFldsFinish', me, me.fieldRecords, me.tableName); //扔出一个事件表示所有的域已经构造好
	  },
	  getWhereStr:function(){
		  var me=this;
		  var whereStr = '';
		  var items=me.down('form').items.items;
		  Ext.each(items,function(container){
			  var formField;
			  var toField;
			  var formValue;
			  var toValue;
			  var cots=container.items.items;
			  if(cots.length==3){
				  Ext.each(cots,function(item){
					  if(item.flag=="from"){
						  formField=item;
						  formValue=formField.getRawValue();
					  }else if(item.flag=='to'){
						  toField=item;
						  toValue=toField.getRawValue().trim();
					  }
				  });
				  if(formValue != '' && toValue != '') {
					  whereStr += ' and ' + formField.fldName + ' between \'' + formValue + '\' and \'' + toValue + '\'';
				  } else if(formValue != '' && toValue == '') {
					  whereStr += ' and ' + formField.fldName + ' > \'' + formValue + '\'';
				  } else if(formValue == '' && toValue != '') {
					  whereStr += ' and ' + formField.fldName + ' < \'' + toValue + '\'';
				  }
			  }else{
				  Ext.each(cots,function(item){
					  if(item.xtype!="label"&&item.getValue()){
						  if(item.fldName) { //没有字段名忽略
							  if(item.flag) { //如果是双field的字段 -数字、日期型
								  var fromField, toField;
								  var fromValue, toValue;
								  if(item.flag == 'from') {
									  fromField = item;
									  toField = me.down('');
									  fromValue = fromField.getRawValue().trim();
									  toValue = toField.getRawValue().trim();
									  i = i+2;
								  } else if(item.flag == 'to') {
									  toField = item;
									  fromField = me.items.items[0];
									  fromValue = fromField.getRawValue().trim();
									  toValue = toField.getRawValue().trim();
									  i = i+2;
								  }
								  if(!fromField.isValid || !toField.isValid) {
									  Ext.Msg.alert('提示', '输入不正确！');
									  return;
								  }
								  
							  } else if(item.xtype == 'testhelp') {
								  var value = item.getValue();
								  if(value && value != '') {
									  whereStr += ' and ' + item.fldName + ' = \'' + item.getValue() + '\'';
								  }	
							  }
							  else { //单field字段 -varchar型
								  var value = item.getValue().trim();
								  if(value != '') {
									  whereStr += ' and ' + item.fldName + ' = \'' + item.getValue() + '\'';
								  }							  
							  }
						  }
					  }
				  });
			  }
		  });
		  return whereStr;
	  },
	  getWhereStr1: function() {
		  var me = this;
		  var whereStr = '';
		  for(var i = 0; i < me.fields.length; i++) {
			  var item = me.fields[i].items[i];					 
			  var code = item.fldName;
			  if(item.xtype!="label"&&item.getValue()){
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
					  } else if(item.xtype == 'testhelp') {
						  var value = item.getValue();
						  if(value && value != '') {
							  whereStr += ' and ' + code + ' = \'' + item.getValue() + '\'';
						  }	
					  }
					  else { //单field字段 -varchar型
						  var value = item.getValue().trim();
						  if(value != '') {
							  whereStr += ' and ' + code + ' = \'' + item.getValue() + '\'';
						  }							  
					  }
				  }
			  }
		  }
		  return whereStr;
	  },
	  /**
	   * 获取原生的where语句
	   */
	  getWhereStrBase:function(){
		  var me = this;
		  var whereStr = '';
		  for(var i = 0; i < me.items.length; i++) {
			  var item = me.items.items[i];					 
			  var code = item.fldName;
			  //当前field值如果为空则略过不管
			  if(item.getValue()){
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
					  } else if(item.xtype == 'testhelp') {
						  var value = item.getValue();
						  if(value && value != '') {
							  whereStr += ' and ' + code + ' = \'' + item.getValue() + '\'';
						  }	
					  }else { //单field字段 -varchar型
						 
						  if(typeof(item.getValue())=="string"){
							  var value = item.getValue().trim();
						  }
						  if(value != '') {
							  whereStr += ' and ' + code + ' = \'' + item.getValue() + '\'';
						  }							  
					  }
				  }
			  }
		  }
		  return whereStr;
	  },
	  createFields:function(fieldRecords){
		  var me=this;
		  var flag=false;
		  var fldStore=Ext.create('erp.form.store.FrmFlds');
		  var fields=[];
		  var items=[];
		  var i=0;
		 Ext.each(fieldRecords,function(rec){
			 i=i+1;
			 if(rec.ispk!="true"&&rec.isidx == "true"){
					if(rec.datatype!="date"&&rec.datatype!="int"&&rec.datatype!="decimal"&&rec.datatype!="datetime"){
						fields.push(rec);
					}else{
						var container=me.createContainer(rec);
						items.push(container);
					}
				}
			if(fields.length==2){
				var container=me.createContainer(fields);
				items.push(container);
				fields.splice(0);
			}else if(i==fieldRecords.length){
				var container=me.createContainer(fields);
				items.push(container);
			}
		 });
		 return items;
	  },
	  createContainer:function(fields){
		  var me=this;
		  var items=me.createField(fields);
		  var container={
				  xtype:'container',
				  layout:{ type: 'hbox',
				        padding:'5',
				        align:'stretchmax',
				        pack:'center'},
				  items:items
		  };
		  return container;
	  },
	  createField:function(fields){
		  var item;
		  var items=[];
		  Ext.each(fields,function(field){
			  if(field.code_type) { //基础数据
				  item={
					  xtype: 'testhelp', 
					  itemId:field.code,
					  fldName: field.code,
					  code: field.code_type, //数据表中的字段名,恰巧帮助窗口也有这个属性
					  fieldLabel: field.name,//中文名称作为文字label
					  mode: "defaults",
					  flex:1
				  }; 
				  items.push(item);
			  }else if(field.datatype == 'varchar') {
				  var xtype = 'textfield';
				  var returnField = null; //帮助窗口getValue实际值
				  var code = field.code;
				  item={
					  xtype: xtype,
					  fldName: field.code,
					  cls: '', //不必float right
					  code: code, //数据表中的字段名,恰巧帮助窗口也有这个属性
					  fieldLabel: field.name,//中文名称作为文字label
					  returnField: returnField,
					  mode: "defaults",
					  flex:1
				  };
				  items.push(item);
			  }else if(field.datatype=="date"||field.datatype=="datetime"){
					var date=[];
					items.push({
						xtype: 'datefield',
						fldName: field.code, //数据表中的字段名
						fieldLabel: field.name, //中文名称作为文字label
						flag: 'from',//区分from/to
						flex:17,
						format:"Y-m-d"
				  });
					 items.push({ //两个field之间的label
						  xtype: 'label',
						  text: '到',
						  margin: '6 20 0 5',
						  flex:3
					    });
					 items.push({
						  xtype: 'datefield',
						  fieldLabel:"",
						  code: field.code, //数据表中的字段名
						  flag: 'to',//区分from/to	
						  flex:12,
						  format:"Y-m-d"
					  });	
				}else if(field.datatype == 'int' || field.datatype == 'decimal') { //数字字段	
					  items.push({
							xtype: 'numberfield',
							cls: '', //不必float right
							fldName: field.code, //数据表中的字段名
							fieldLabel: field.name, //中文名称作为文字label
							flag: 'from',//区分from/to
							flex:17
					  });
						  items.push({ //两个field之间的label
							  xtype: 'label',
							  text: '到',
							  margin: '6 20 0 5',
							  flex:3
						   });
						  items.push({
							  xtype: 'numberfield',
							  code: field.code, //数据表中的字段名
							  flag: 'to',//区分from/to  
							  flex:12
						  });	
					  }
		  });
		  return items;
	  },
	  numCreate:function(num,fields){
		  var num=num;
		  Ext.each(fields,function(field){
			  if(field.ispk!="true"&&field.isidx=="true"){
				  num++;
			  }
		  });
		  return num;
	  }
	  
});