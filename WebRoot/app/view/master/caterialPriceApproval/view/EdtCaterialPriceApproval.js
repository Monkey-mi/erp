Ext.define('erp.view.master.caterialPriceApproval.view.EdtCaterialPriceApproval',{
	extend:'erp.ux.Panel',
	alias:'widget.EdtCaterialPriceApproval',
	requires:[
		'erp.view.master.caterialPrice.store.CaterialPrice'
	],
	controller:'CaterialPriceApprovalCtl',
	xtype: 'EdtCaterialPriceApproval',
	layout: {
        type: 'border'
    },
    viewModel: {
        type: 'caterialPriceApproval'
    },
    maxHeight:document.body.clientHeight*0.4,
	initComponent:function(){
		var me=this;
		me.dStore=Ext.create('erp.view.master.caterialPriceApproval.store.CaterialPriceDetail');
		me.cStore=Ext.create('erp.view.master.caterialPriceApproval.store.CaterialPriceCompany');
		me.vm=me.getViewModel(); 
		me.vm.setData(me.vmData);
		me.ct=me.getController();
		me.cpFormulaStore=Ext.create('erp.view.master.caterialPrice.store.CaterialPrice');
		me.cpFormulaColmn=erp.Util.getColumns(me.cpFormulaStore.getModel());
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'EdtCaterialPriceApprovalBar',
	    	hidden:!me.isEdit,
	    	items:[
	    		  {text: '增加审批价格',	iconCls:'page_add',		itemId:'priceAdd'},
	    		  {text: '增加厂商',	iconCls:'page_add',		itemId:'companyAdd'},
			   	  {text: '删除审批价格',	iconCls:'page_delete',		itemId:'priceDel', disabled:true},
			   	  {text: '删除厂商',	iconCls:'page_delete',		itemId:'companyDel', disabled:true},
				  {text: '保存',iconCls:'page_save',itemId:'BTN_SAVE',disabled:!me.isEdit}
			]
	    			}],
		this.items= [{
		        region: 'center',
		        xtype:'form',
		        reference:'CaterialPriceApprovalForm',
		        itemId:'CaterialPriceApprovalForm',
				store:me.store,
				flex:80,
				minHeight:80,
				layout:'fit',
				items:[{
					xtype:'fieldset',
					autoScroll:true,
					margin:'5 5 5 5',
					layout:'column',
					maxWidth:600,
			    	defaults: {
						xtype: 'textfield',
						readOnly:!me.isEdit,
						margin:'5 5 5 5',
						labelWidth:70,
						columnWidth: .3
					},
					items:[{
			  			fieldLabel:'记录编号',
			  			itemId:'jlbh',
					   	name : 'jlbh',
					   	readOnly:true
			  		},{
			  			fieldLabel:'审批摘要',
			  			itemId:'bzsm',
					   	name : 'bzsm',
					   	columnWidth: .7
			  		},{
			  			fieldLabel:'公式编号',
			  			itemId:'gsbh',
					   	name : 'gsbh',
					   	readOnly:true,
					   	listeners:{
					   		change:function(f,nv,ov){
					   			var column=me.ct.getColumnState(nv);
								if(column!=true){
									me.vm.setData(column);
									//先删除对应厂商
									//me.cStore.removeAll();
								}
					   		}
					   	}
			  		},{
			  			fieldLabel:'应用公式',
			  			itemId:'gsmc',
					   	name : 'gsmc',
					   	columnWidth: .7,
					   	xtype:'selectfield',
						openconfig:{
							modal:true,
							title:'材料价格公式维护',
							singleSelect:true,
							editable:false,
							diaplayField:'gsmc',
							valueField:'gsbh',
							idKey:true,
							width:500,
							height:600,
							params:{sdbj:1},
							columns:me.cpFormulaColmn,
							store:me.cpFormulaStore
						}
			  		}]
				}]
			},{
				xtype:'panel',
				region: 'south',
				split:true,
				flex:document.body.clientHeight*0.4-80,
				layout: {
			        type: 'border'
			    },
			    items:[{
			    	xtype:'grid',
			    	region: 'center',
			    	reference:'CaterialPriceDetailGrid',
		        	itemId:'CaterialPriceDetailGrid',
			    	flex:1,
			    	selModel:Ext.create('Ext.selection.CheckboxModel'),
			    	plugins: {
				        ptype: 'cellediting',
				        listeners:{
				        	beforeedit:function(editor,con,e){
				        		if(!me.isEdit){
				        			return false;
				        		}
				        	}
				        },
				        clicksToEdit: 1
				    },
			    	columns:[
						{header:'序号',dataIndex:'jlxh',width:45},
			   	  	  	{header:'',dataIndex:'spjg1',width:120,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg1.text}',
						    	 hidden:'{spjg1.hidden}'
						    },
						    field:{
						    	xtype:'numberfield'
						    }
		   	  	  		},
		   	  	  		{header:'',dataIndex:'spjg2',width:120,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg2.text}',
						    	 hidden:'{spjg2.hidden}'
						    },
						    field:{
						    	xtype:'numberfield'
						    }
		   	  	  		},
		   	  	  		{header:'',dataIndex:'spjg3',width:120,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg3.text}',
						    	 hidden:'{spjg3.hidden}'
						    },
						    field:{
						    	xtype:'numberfield'
						    }
		   	  	  		},
		   	  	  		{header:'',dataIndex:'spjg4',width:120,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg4.text}',
						    	 hidden:'{spjg4.hidden}'
						    },
						    field:{
						    	xtype:'numberfield'
						    }
		   	  	  		},
		   	  	  		{header:'',dataIndex:'spjg5',width:120,
		   	  	  			renderer:function(v,metaData){
				    			return v;
					        },
							bind:{
						    	 text:'{spjg5.text}',
						    	 hidden:'{spjg5.hidden}'
						    },
						    field:{
						    	xtype:'numberfield'
						    }
		   	  	  		}
		   	  	  	],
			    	listeners : {
							selectionchange : function(grid, recs) {
								var rec=recs[0];
								me.cStore.clearFilter(true);
								if (recs.length > 0) {
									me.down('#priceDel').setDisabled(false);
									me.cStore.filterBy(function(r){
										return r.get('jlxh')==rec.get('jlxh');
									});
								} else {
									me.cStore.filterBy(function(r){
										return r.get('jlxh')==-1;
									});
									me.down('#priceDel').setDisabled(true);
								}
							}
					},
		   	  	  	store:me.dStore
			    },{
			    	xtype:'grid',
			    	split:true,
			    	region: 'east',
			    	reference:'CaterialPriceCompanyGrid',
		        	itemId:'CaterialPriceCompanyGrid',
			    	flex:1,
			    	selModel:Ext.create('Ext.selection.CheckboxModel'),
			    	columns:[
						{header:'厂商编号',dataIndex:'csbh',width:90},
			   	  	  	{header:'厂商名称',dataIndex:'csmc',flex:1}
		   	  	  	],
		   	  	  	store:me.cStore,
		   	  	  	listeners : {
							selectionchange : function(grid, recs) {
								if (recs.length > 0) {
									me.down('#companyDel').setDisabled(false);
								} else {
									me.down('#companyDel').setDisabled(true);
								}
							}
		   	  	  	}
			    }]
			}]
		this.callParent();
		me.loadRecord(me.rec);
	},
	loadRecord:function(rec){
		var me=this;
		me.dStore.on({
			'load':function(s,recs){
				var grid=me.down('#CaterialPriceDetailGrid');
				//grid初始化选中第一项
				erp.Util.gridSelect(grid,recs);
			}
		});
		me.dStore.load({params:{jlbh:me.rec.get('jlbh')}});
		me.cStore.load({params:{jlbh:me.rec.get('jlbh')}});
		me.down('#CaterialPriceApprovalForm').loadRecord(rec);
	}
})