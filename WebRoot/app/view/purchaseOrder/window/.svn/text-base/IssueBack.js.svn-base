Ext.define('erp.view.purchaseOrder.window.IssueBack',{
	extend:'erp.ux.Window',
	alias:'widget.IssueBack',
//	plugins : {
//		ptype : 'FormKey'
//	},
	width:900,
	title:'采购合同回签',
	iconCls:'page_go',
	modal:true,
	height:500,
	requires: [
		'erp.view.purchaseOrder.store.IssueBack'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseOrder.store.IssueBack');
		me.store.proxy.extraParams.htbh=me.rec.get('htbh');
		me.store.load();
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		Ext.apply(me,{
			layout:{type:'border',align: 'stretch'},
			items:[{
					region:'north',
					split:true,
					flex:1,
					itemId:'topright',
					xtype:'form',
					itemId:'mainForm',
					layout:'fit',
					items:[{
						xtype:'fieldset',
						autoScroll:true,
						margin:'5 5 5 5',
						layout:'column',
				    	defaults: {
							xtype: 'textfield',
							readOnly:true,
							margin:'5 5 5 5',
							labelWidth:65,
							columnWidth: .2
						},
						selModel:Ext.create('Ext.selection.CheckboxModel',{
							mode:'MULTI'
						}),
						items:[{
				  			fieldLabel:'合同编号',
				  			itemId:'htbh',
						   	name : 'htbh',
						   	readOnly:true,
						   	columnWidth: .2
				  		},{
				  			fieldLabel:'供货厂商',
				  			itemId:'csmc',
						   	name : 'csmc',
						   	columnWidth: .3
				  		},{
				  			fieldLabel:'回签日期',
				  			itemId:'hqsj',
						   	name : 'hqsj',
						   	xtype:'datefield',
			   	  	  		format:'Y.m.d',
			   	  	  		readOnly:false,
						   	columnWidth: .23
				  		},{
				  			fieldLabel:'回签交期',
				  			itemId:'hqjq',
						   	name : 'hqjq',
						   	xtype:'datefield',
			   	  	  		format:'Y.m.d',
			   	  	  		readOnly:false,
						   	columnWidth: .23,
						   	listeners:{
						   		change:function(t,n,o){
						   			var recs=me.down('#Detail').getSelectionModel().getSelection();
						   			if(recs.length==0){
						   				Ext.Msg.alert('提示','请至少选择一条记录！')
						   				return ;
						   			}else{
						   				Ext.each(recs,function(r){
						   					r.set('hqjq',n);
						   				})
						   			}
						   		}
						   	}
				  		}]
					}]
				},{
				xtype:'grid',
				itemId:'Detail',
				flex:5,
				columns:me.MainColumns,
				selModel:Ext.create('Ext.selection.CheckboxModel',{
					mode:'MULTI'
				}),
				store:me.store,
				region: 'center',
				plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        clicksToEdit: 1,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		var bool=false;
					        		switch(field){
					        			case 'clmc':
					        			case 'cltx1':
					        			case 'cgsl':
					        			case 'jldw':
					        			case 'cgdj':
					        			case 'jhrq':
					        			bool=true;
					        			break;
					        		}
					        		if(bool){
					        			return false
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		
					        	}
					        }
				}),
				dockedItems:[{
			    	xtype : 'pagingbar',
                    stateId : '8081d6f3-9ddaasb7-470d-b764-dbb70c5e81b1',
			    	store:me.store,
			    	dock:'bottom',
			    	displayInfo:true,
			    	defaultPageSize:200
			    }]
			}],
			tbar:[{text:'确认回签',itemId:'btn_confirm'},{text:'取消回签',itemId:'btn_cancel',disabled:!me.isEditOn},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
		me.down('#mainForm').loadRecord(me.rec);
	}
})