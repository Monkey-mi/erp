Ext.define('erp.view.plasticPartsPledge.window.EdtPlasticPartsPledge',{
	extend:'erp.ux.Window',
	alias:'widget.EdtPlasticPartsPledge',
	width:800,
	title:'塑料粒子质押编辑',
	modal:true,
	height:500,
	requires: [
	],
	controller:'PlasticPartsPledgeCtl',
	initComponent:function(){
		var me=this;
		me.dStore=Ext.create('erp.view.plasticPartsPledge.store.PlasticPartsPledgeInvoice');
		me.southColumns=erp.Util.getColumns(me.dStore.getModel());
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'edtBar',
	    	hidden:!me.isEdit,
	    	items:[
	    		  {text: '导入',iconCls:'page_go',itemId:'Imp'},
	    		  {text: '删除',	iconCls:'page_delete',		itemId:'Del'},
	    		  {text: '保存',iconCls:'page_save',itemId:'BTN_SAVE'}
	   	  	]
	   	}]
		Ext.apply(me,{
			layout:{type:'border',align: 'stretch'},
			items:[{
				region: 'center',
				xtype:'form',
				itemId:'form',
				reference:'form',
				store:me.store,
				flex:1,
				layout:'fit',
				
				items:[{
					xtype:'fieldset',
					autoScroll:true,
					margin:'5 5 5 5',
					layout:'column',
			    	defaults: {
						xtype: 'textfield',
						readOnly:!me.isEdit,
						margin:'5 5 5 5',
						labelWidth:65,
						columnWidth: .25
					},
					items:[{
			  			fieldLabel:'质押单号',
			  			itemId:'zydh',
					   	name : 'zydh',
					   	readOnly:true,
					   	columnWidth: .25
			  		},{
			  			fieldLabel:'质押类型',
			  			itemId:'zylx',
					   	name : 'zylx',
					   	forceSelection:true,
					   	allowBlank:false,
					   	xtype:'combo',
					   	store:[[0,'现金'],[1,'发票']]
			  		},{
			  			fieldLabel:'供货厂商',
			  			itemId:'csbh',
			  			name:'csbh',
			  			xtype:'helpField',
			  			allowBlank:false,
						code : erp.DataConst.FACTORYINFO,
						fieldConfig:{forceSelection:true},
						columnWidth: .5,
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(o.displayTplData!=null){
									var data=o.displayTplData;
									if(data.length>0&&me.isinit){
										var rec=data[0];
									}
								}
		                    }
						}
			  		},{
			  			xtype:'numberfield',
			  			fieldLabel:'质押金额',
			  			itemId:'zyje',
					   	name : 'zyje'
			  		},{
			  			xtype:'datefield',
			   	  	  	format:'Y.m.d',
			  			fieldLabel:'到期日期',
			  			itemId:'dqrq',
					   	name : 'dqrq'
			  		},{
			  			fieldLabel:'备注',
			  			itemId:'bzsm',
					   	name : 'bzsm',
					   	columnWidth: .5
			  		}]
				}]
			},{
				region: 'south',
				split:true,
				xtype:'grid',
				itemId:'southGrid',
				flex:3,
				features: [{
				    ftype: 'summary',
			       	dock:'bottom'
				}],
				plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		switch(field){
					        		}
					        	}
					        },
					        clicksToEdit: 1
					    }),
				columns:me.southColumns,
				store:me.dStore
			}]
		});
		me.callParent(arguments);
		me.loadRecord();
	},round:function(v,l){
		return Ext.util.Format.round(v,l);
	},loadRecord:function(){
		var me=this;
		var rec=me.rec;
		var zyjeField=me.down('#zyje')
		if(rec.get('zylx')==1){
			zyjeField.setReadOnly(true);
			zyjeField.setFieldStyle('background:#E6E6E6');
		}else{
			zyjeField.setReadOnly(false);
			zyjeField.setFieldStyle('background:#ffffff');
		}
		me.down('#form').loadRecord(rec);
		me.dStore.load({params:{zydh:rec.get('zydh')}});
	}
})