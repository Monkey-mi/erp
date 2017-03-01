Ext.define('erp.report.engine.view.CustomReportScript',
	{
		extend:'erp.ux.Window',
		alias : 'widget.reportScript',
		requires:['erp.report.engine.store.ReportScripts'],
		width:800,
		height:500,
		title:'编辑报表脚本',
		iconCls:"script",
		modal:true,
		buttons : [
					{
						text : '取消',
						action : 'ACT_CLOSE',
						iconCls : 'cancel'
					}],
	   
		initComponent : function() {
			var me = this;
			var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
				clicksToMoveEditor: 1,
				autoCancel: false,
				pluginId: 'rowedit',
				listeners: {
					edit: function(editor, obj, eopts) {
						me.fireEvent('rowedit', editor);
					}
				}
			});
			me.store=Ext.create('erp.report.engine.store.ReportScripts');
			Ext.apply(me,
			{xtype:'panel',
			defaults:{padding:5},
			layout:{
				type:'hbox',
				 pack:'start',
				 padding:5,
				 align: 'stretch'
			},
			items:[
			{
				xtype:'grid',
				itemId:'grd_script',
				flex:1,
				store:me.store,
				tbar:[{text: '新增',	iconCls:'script_add',action:erp.Const.FUNC_ITEMID_BTN_ADD},
	    		{text: '删除',	iconCls:'script_delete',action:erp.Const.FUNC_ITEMID_BTN_DELETE,itemId:'script_delete',disabled : true},
	    		{text:'刷新',   iconCls:'arrow_refresh',action:erp.Const.FUNC_ITEMID_BTN_REFRESH}],
				columns:[{
					xtype:'rownumberer'
				},
				
				{
					text:'脚本名称',
					flex: 1, 
					sortable: true, 
					dataIndex: 'sp_name',
					editor: {}
				},{
					text:'用途说明',
					flex: 1, 
					sortable: true, 
					dataIndex: 'remark',
					editor: {}
				}			
				],
				dockedItems: [{
					xtype: 'pagingtoolbar',
					store: me.store,
					dock: 'bottom',
					displayInfo: true
				}],
				plugins: [rowEditing]
			},
			{	
			xtype:'panel',
			disabled:true,
			itemId:'contentPanel',
			layout:'fit',
			flex:2,
			tbar:[{
				itemId:'Script_Save',
				iconCls:"save",
				action:'ACT_SAVE',
				text:'保存脚本'
			}],
			items:[{xtype:'textarea',
				itemId:'script_Conent',
	        	anchor    : '100%',
	        	listeners: {
						boxready: function() {
							var panel = me.down('textarea');
							me.editor = CodeMirror.fromTextArea(this.inputEl.dom, {
								value: 'welcome to sql editor',
								lineNumbers: true,
								mode: 'mysql'
							});
							me.editor.setSize(panel.getWidth(), panel.getHeight());
						}
					}
			}]	
			}]
		});	
			me.callParent(arguments);
		},
	   listeners:{
	   	afterrender:function(){
	   		var me=this;
	   		var grid=me.down('grid');
	   		var rowEdit=grid.getPlugin('rowedit');
	    	  rowEdit.on('canceledit',me.canceledit);
	    	  rowEdit.on('edit',function(editor, e) {
			    // commit the changes right after editing finished
	    	  	if (!Ext.isEmpty(me.editor.getValue()))
	    	  		e.record.set('content',me.editor.getValue());
	    	  	e.grid.getStore().sync();
	    	  	e.record.commit();
	    	  	e.grid.getStore().sort();
			  });
	   	}	
	   
	   },
	   canceledit:function(editor,e,obj){
	   	  if (e.record.get('sp_name')==''){
			e.store.remove(e.record);
			e.store.sort();
			}	
	   },
	   setValue : function(rec) {
	   		var me=this;
	   		me.rec=rec;
	   		me.store.getProxy().setExtraParam("list_id", rec.get('list_id'));
	   		me.store.load();
		},
	   addItem:function(grid){
	   		var me=this;
			var rowEditing = grid.getPlugin('rowedit');
			var r = Ext.create('erp.report.engine.store.ReportScripts', {
				  			   	sp_name: '',
				  			    remark:'',
				  			    content:'',
				  			    create_date: new Date(),
				  			    list_id:me.rec.get('list_id')
				              });
			rowEditing.cancelEdit();
			grid.getStore().insert(0,r);
			rowEditing.startEdit(0,0); 	   	
	   }	
	});