Ext.define('erp.bi.view.DsSqlScript', {
	extend: 'erp.ux.Panel',
	layout: 'border',
	requires:['erp.bi.view.DatasourceDesc'],
	alias: "widget.ds_sqlscript",
	border: 10,
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			border: 5,
			tbar: [{text: '保存',	iconCls:'page_save',     itemId:'docu_save'},
				'|',
				{text: '执行',	iconCls:'sql_exec',     itemId:'docu_add'    },
				{text: '清空',	iconCls:'clear',		itemId:'docu_del'    },
				{
					xtype : 'combobox',
					fieldLabel: '数据源',
					id:'dataSourse',
					itemId:'dataSourse',
					store: Ext.create('erp.setup.store.ExtDataSource').load(),
					queryMode: 'local',
					displayField: 'dsname',
					valueField: 'id',
					labelWidth:60,
					margin: '0 10 0 20'
				},
				{xtype:'textfield',fieldLabel:'数据源名称',labelWidth:80,itemId:'ds_name',margin: '0 10 0 10'}
				],
			items: [{
				region: 'center',
				flex: 2,
				layout: 'fit',
				items: [{
					xtype: 'textarea',
					itemId:'sql_edit',
					title: 'sql脚本编辑',
					listeners: {
						boxready: function() {
							var panel = me.down('textarea');
							me.editor = CodeMirror.fromTextArea(this.inputEl.dom, {
								value: 'welcome to sql editor',
								lineNumbers: true,
								mode: 'mysql'
							});
							me.editor.setSize(panel.getWidth(), (panel.getHeight()-10));
							//me.editor.setValue(me.rec.get('script_sql'));
						}
					}
				}]
			}, {
				itemId:'select_result',
				title: '执行结果',
				flex:3,
				region: 'south',
				layout:'fit'
			}]
		});
		me.callParent(arguments);
	},
	DataChange: function(rec) {
		var me = this;
		me.down('#ds_name').setValue(rec.get('name'));
		me.editor.setValue(rec.get('script_sql'));
		if (rec.get('dsid')>0)
			me.down('#dataSourse').setValue(rec.get('dsid'));
		else
			me.down('#dataSourse').setValue('');
		var sqlResultform=me.down('#select_result');
		if(sqlResultform.down('#sel_result')){
			sqlResultform.remove(sqlResultform.down('#sel_result'));
		}
	},
	doAction:function(btn){
    				switch(btn.itemId){
    				case 'docu_add':
    					this.sqlStart();
    					break;
    				case 'docu_del':
    					this.deleteSql();
    					break;
//    				case 'docu_save':
//    					this.saveSql();
//    					break;
    				}
    	},
    	
    //sql语句执行
	sqlStart: function(){
		var me = this;
		var dscode = me.down('#dataSourse').getValue();
		var sql = me.editor.getValue();
		var sqlResultform=me.down('#select_result');
		var newRec;
		me.sqlResult = erp.AnalysisFun.exe_sql(sql,dscode);
		if(me.sqlResult!=null){
			var selectresult =erp.report.engine.util.AnalysisFun.createTable(me.sqlResult);
			if(!sqlResultform.down('#sel_result')){
				sqlResultform.add(selectresult);
			}else{
				sqlResultform.remove(sqlResultform.down('#sel_result'));
			    sqlResultform.add(selectresult);	
			}
		}
	},
	//sql语句清空
	deleteSql: function(){
		var me = this;
		var edit =  me.editor;
		edit.setValue('select');
	}
	
});