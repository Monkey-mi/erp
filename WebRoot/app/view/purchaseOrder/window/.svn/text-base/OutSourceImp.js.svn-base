Ext.define('erp.view.purchaseOrder.window.OutSourceImp',{
	extend:'erp.ux.Window',
	alias:'widget.OutSourceImp',
	width:1200,
	title:'计划导入',
	iconCls:'page_go',
	modal:true,
	height:800,
	requires: [
		'erp.view.purchaseOrder.store.OutSourceImp',
		'erp.view.purchaseOrder.store.OutSourceDetailImp'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseOrder.store.OutSourceImp');
		Ext.apply(me.store.proxy.extraParams,{jhh:me.jhh})
		me.store.load();
		me.dStore=Ext.create('erp.view.purchaseOrder.store.OutSourceDetailImp');
		Ext.apply(me,{
			layout:{type:'border',align: 'stretch'},
			items:[{
				xtype:'grid',
				itemId:'OutSourceImpGrid',
				flex:1,
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
				columns:[
					{header:'计划类别',dataIndex:'jhlbmc',width:80,summaryRenderer: function(value, summaryData, dataIndex) {
						return '合计';
					}},
					{header:'计划号',dataIndex:'jhh',width:80},
					{header:'材料货号',dataIndex:'clhh',width:80,align:'center'},
					{header:'材料名称',dataIndex:'clmc',width:160},
					{header:'单位',dataIndex:'jldw',align:'center',width:60},
					{header:'计划数量',dataIndex:'jhsl',align:'right',width:80,align:'right',summaryType: 'sum',
					      summaryRenderer:me.summaryRenderer},
					{header:'已投数量',dataIndex:'tcsl',align:'right',width:80,align:'right',summaryType: 'sum',
					      summaryRenderer: me.summaryRenderer},
					{header:'未投数量',dataIndex:'wtsl',align:'right',width:80,align:'right',summaryType: 'sum',
					      summaryRenderer: me.summaryRenderer},
					{header:'本次投产',dataIndex:'bctc',align:'right',width:80,align:'right',summaryType: 'sum',
					      summaryRenderer: me.summaryRenderer},
					{header:'×(1+放大率)',dataIndex:'fdbl',align:'right',width:80},
					{header:'加工数量',dataIndex:'jgsl',align:'right',width:80,align:'right',summaryType: 'sum',
					      summaryRenderer: me.summaryRenderer},
					{header:'上线日期',dataIndex:'sxrq',align:'center',width:85,renderer:Ext.util.Format.dateRendererOne},
					{header:'完工日期',dataIndex:'wcrq',align:'center',width:85,renderer:Ext.util.Format.dateRendererOne},
					{header:'产品描述',dataIndex:'cpbz',width:160,align:'center'}
				],
				store:me.store,
				listeners : {
						selectionchange : me.selectionchange
				},
				region: 'center',
				dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.store
				}]
			},{
				xtype:'grid',
				itemId:'OutSourceImpDetailGrid',
				flex:1,
				selModel:Ext.create('Ext.selection.CheckboxModel',{
					mode:'MULTI'
				}),
				viewConfig:{
					enableTextSelection:true,
			     	getRowClass:function(rec,rowIndex,rowParams,store){
				     	if(rec.get('bj')==1){
						     return 'x-grid-record-red';
						}else{
							if(rec.get('bjbb')!=''){
							     return 'x-grid-record-800080';
							}else{
								if(rec.get('dybj')==1){
								     return 'x-grid-record-808000';
								}else{
									if(rec.get('xnbj')==0&&rec.get('mjbz')==1){
									    return '';
									}else{
										if(rec.get('xnbj')==1&&rec.get('mjbz')==1){
										    return 'x-grid-record-149B9B';
										}else{
											return 'x-grid-record-blue';
										}
									}
								}
							}
						}
			     	}
			    },
				columns:[
					{header:'材料类别',dataIndex:'cllbmc',width:80,align:'center',summaryRenderer: function(value, summaryData, dataIndex) {
						return '合计';
					}},
					{header:'材料货号',dataIndex:'clhh',width:80,align:'center'},
					{header:'部件或材料名称',dataIndex:'clmc',width:240,renderer:function(v,r){
		   	  	  				var rec=r.record;
		   	  	  				for(i=0;i<rec.get('jgbh').length;i++){
		   	  	  					v='&nbsp&nbsp'+v;
		   	  	  				}
		   	  	  				return v;
		   	  	  		}},
					{header:'规格尺寸',dataIndex:'cltx1',width:120,align:'center'},
					{header:'单位',dataIndex:'jldw',align:'center',width:60},
					{header:'计划用量',dataIndex:'jhyl',align:'right',width:80,renderer:function(v){return v!=0?Ext.util.Format.number(v,'0,000.######'):'';}},
					{header:'任务用量',dataIndex:'bcyl',width:80,align:'right',renderer:function(v){return v!=0?Ext.util.Format.number(v,'0,000.######'):'';}},
			   	  	{header:'工序名称',dataIndex:'gxmc',width:80}
				],
				store:me.dStore,
				region: 'south',
				split:true
			}],
			tbar:[{xtype:'textfield',fieldLabel:'计划号',enableKeyEvents :true,itemId:'jhh',value:me.jhh,listeners:{keypress:me.onKeyup}}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	},round:function(v,l){
		return Ext.util.Format.round(v,l);
	},summaryRenderer: function(v, summaryData, dataIndex) {
		return v!=0?Ext.util.Format.number(v,'0,000.##'):'';
	},onKeyup:function(field,e){
		if(e.getKey()==e.ENTER){
			var me=this.up('window');
			var jhh=me.down('#jhh').getValue();
			Ext.apply(me.store.proxy.extraParams,{jhh:jhh})
			me.store.loadPage(1);
		}
	},
	selectionchange : function(grid, recs) {
		var me=this.up('window');
		if (recs.length > 0) {
			var rec = recs[0];
			me.dStore.load({
				params : {
					jhbh : rec.get('jhbh'),
					jhxh : rec.get('jhxh'),
					jhsl : rec.get('jhsl')
				}
			});
		} else {
			me.dStore.load();
		}
	}
})