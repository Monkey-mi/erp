Ext.define('erp.setup.view.EditExtDataSource',{
		extend:'erp.ux.Window',
		alias:'widget.edit_ExtDataSource',
		requires:['erp.ux.FormKey'],
		title:'数据源信息',
		resizable : false,
		modal : true,
		width:500,
		height:350,
		buttons:[
		{
			text:'测试连接',
			iconCls:'database_connect',
			action:'ACT_TEST'
		},{
			text:'保存',
			itemId:'btnSave',
			disabled:true,
			iconCls: 'save',
 		    action: 'ACT_SAVE'
		},{
			text:'退出',
			iconCls: 'cancel',
		    action:'ACT_CLOSE'
		}],
		setFieldLabel: function(field,label){
	        label = label || '';
	        
	        var me = field,
	            ll = me.mixins.labelable;
	            separator = ll.labelSeparator,
	            labelEl = me.labelEl;
	        
	        me.fieldLabel = label;
	        if (me.rendered) {
	            if (Ext.isEmpty(label) && ll.hideEmptyLabel) {
	                labelEl.parent().setDisplayed('none');
	            } else {
	                if (separator) {
	                    label = label + separator;
	                }
	                labelEl.update(label);
	                labelEl.parent().setDisplayed('');
	            }
	        }
	    },
		initComponent:function(){
			Ext.apply(this,{
				items:[{
					xtype:'form',
					//itemid:'form',
					bodyPadding:10,
					frame:false,
					width:600,
					height:300,
					plugins:{
				          ptype: 'FormKey'
			    	 },
					defaults:{
						xtype:'textfield',
						labelAlign:'right',
						anchor:'100%',
						lableWidth:80,
						labelStyle : 'font-weight:bold',
						msgTarget: 'qtip',
			            autoFitErrors: true
					},
					items:[{
						fieldLabel : '数据源类型',
						name : 'dstype',
						hiddenName:"dstype",
						itemId:'firstFocusOn',
						xtype:'combobox',
						emptyText:'请选择数据源类型',
						store: Ext.create('Ext.data.Store',{
							fields:['value','name'],
							data:[
							      {value:erp.Const.DB_TYPE_MYSQL,      name:'MySQL -- 需要5.0 及以上版本'},
								  {value:erp.Const.DB_TYPE_MSSQLSERVER,name:'SQL Server -- 需要SQL Server 2005 及以上版本(包括SQLExpress)'},
								  {value:erp.Const.DB_TYPE_ORACLE,     name:'Oracle -- 需要Oracle9i 及以上版本(包括Oracle Database XE)'}
							]
						}),
						allowBlank:false,
						blankText:'请选择一种数据库类型',
					    queryMode: 'local',
					    displayField: 'name',//下拉框中显示的值
					    valueField: 'value',//下拉框中隐藏的值
					    forceSelection: true,//值为true时将限定选中的值为列表中的值，值为false则允许用户将任意文本设置到字段（默认为 false）
					    listeners:{
					    	change:function(field,nv,ov){
					    		var form = field.up('form');
					    		//down就是找form组件内部的name属性为srvport的组件
					    		var fsrvport = form.down('[name=srvport]');
					    		var fdbname = form.down('[name=dbname]');
					    		this.setFieldLabel(fdbname,'默认数据库名');
					    		//fdbname.setDisabled(true);
					    		switch(nv){
					    		case erp.Const.DB_TYPE_MYSQL:
					    			fsrvport.setValue(3306);
					    			fdbname.setValue('mysql');
					    			break;
					    		case erp.Const.DB_TYPE_MSSQLSERVER:
					    			fsrvport.setValue(1433);
					    			fdbname.setValue('master');
					    			break;
					    		case erp.Const.DB_TYPE_ORACLE:
					    			fsrvport.setValue(1521);
					    			this.setFieldLabel(fdbname,'数据库实例名');
					    			fdbname.setReadOnly(false);
					    			fdbname.setValue('');
					    			fdbname.setDisabled(false);
					    			break;
					    		}
					    	},
					    	scope:this
					    }
					},{
						fieldLabel:'数据源代码',
						name:'dscode',
						allowBlank : false,
						blankText : '数据源代码不允许为空!'
					},{
						fieldLabel:'数据源名称',
						name:'dsname',
						allowBlank:false,
						blankText : '数据源名称不允许为空!'
					},{
						fieldLabel:'服务器地址',
						name:'srvaddr',
						allowBlank:false,
						blankText : '服务器地址不允许为空!'
					},{
						fieldLabel:'服务器端口',
						name:'srvport',
						text:3306,
						allowBlank:false,
						blankText : '服务器端口不允许为空!'
					},{
						fieldLabel:'默认数据库名',
						name:'dbname'
					},{
						fieldLabel:'登录用户名',
						name:'srvlogin',
						allowBlank:false,
						blankText : '登录用户名不允许为空!'
					},{
						xtype:'button',
						text:'显示',
						anchor: '12%',
						cls: 'frm-field',
						listeners:{
							click:function(btn){
								var form=btn.up('form');
								var psdFld = form.down('[name=srvpwd]');
								if(btn.getText() == '显示') {
									psdFld.inputEl.set({type: 'text'});
									btn.setText('隐藏');
								} else if(btn.getText() == '隐藏') {
									psdFld.inputEl.set({type: 'password'});
									btn.setText('显示');
								}								
							}
						}
					},{
						xtype:'textfield',
						fieldLabel:'登录密码',
						anchor: '87%',
						inputType:'password',
						name:'srvpwd'					
					}/*,{
						fieldLabel:'连接校验',
						xtype:'textfield',
						name:'vquery'
					}*/]
				}]
			});
			this.callParent(arguments);
		}
});