Ext.define('erp.view.master.perchasepriceadjust.view.PerchasePriceMaintain',{
	extend:'erp.ux.Panel',
	alias:'widget.PerchasePriceMaintain',
	controller:'PerchasePriceCtl',
	layout: {
        type: 'border'
    },
    viewModel: {
        type: 'perchaseViewModel'
    },
	initComponent:function(){
		var me=this;
		me.dStore=Ext.create('erp.view.master.perchasepriceadjust.store.Cgjgtzmxb');
		Ext.apply(me,{
			dockedItems:[{
		    	xtype: 'toolbar',
		    	dock: 'top',
		    	itemId:'EdtPerchasepriceBar',
		    	items:[{text: '导入',	iconCls:'page_go',		itemId:'imp1',disabled:!me.isEdit},
				   	  {text: '采购结算导入',	iconCls:'page_go',	itemId:'imp2',disabled:!me.isEdit},
				   	  {text: '批量修改',	iconCls:'page_edit',	itemId:'imp_edit',disabled:!me.isEdit},
				   	  {text: '删除',	iconCls:'page_delete',		itemId:'imp_delete',disabled:!me.isEdit},
		   	  		  {text: '保存',	iconCls:'save',xtype:'button',	itemId:'imp_BTN',disabled:!me.isEdit},
					  {text: '退出',iconCls:'page_error',itemId:'btn_out', handler:function(){me.close();}}
		   	  		  ]
		    			}],
			items:[{
				region: 'center',
				flex:1,
				xtype:'form',
				reference:'EdtPerchasePriceForm',
			    itemId:'EdtPerchasePriceForm',
			    minHeight:80,
				items:[{
					 xtype:'fieldset',
					 height:70,
					 width:700,
				     layout: 'column',
				     collapsible: false,
				     defaults: {anchor: '90%',padding:'2,0,2,0',labelWidth:60,readOnly:!me.isEdit},
				     margin:10,
				     padding:5,
				     store:me.store,
				     defaultType: 'textfield',
				     items:[{
				    	 fieldLabel: '调价单号',
				    	 itemId:'tjdh',
						 name : 'tjdh',
				         columnWidth: 0.5,
				         editable:false
				     },{
				    	 fieldLabel: '核算部门',
				    	 itemId:'hsbm',
						 name : 'hsbm',
						 labelWidth:70,
				         columnWidth: 0.5,
				         xtype : 'comboxTree',
				         allowBlank:false,
						 blankText : '核算部门不能为空',
						 emptyText:'(必填)',
				         queryMode : 'local',
						 store : Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree',{autoLoad:true}),
						 displayField : 'text',
					     valueField: 'nodeId'
				     },{
				    	 fieldLabel: '调价主题',
				    	 itemId:'tjzt',
						 name : 'tjzt',
				         columnWidth: 0.5
				     },{
			  			 fieldLabel:'供货厂商',
			  			 itemId:'csbh',
			  			 name:'csbh',
			  			 xtype:'helpField',
			  			 labelWidth:70,
//			  			 allowBlank:false,
						 code : erp.DataConst.FACTORYINFO,
						 fieldConfig:{forceSelection:true},
						 columnWidth: 0.5/*,
		                 listeners:{
				          change :function(o,  newValue,  oldValue,  eOpts){
				              if(Ext.String.trim(newValue)!='' && newValue!=null && me.isEdit){
				                  me.down('#imp1').setDisabled(false);
				                  me.down('#imp2').setDisabled(false);
				              }else{
				                  me.down('#imp1').setDisabled(true);
				                  me.down('#imp2').setDisabled(true);
				              }
				          }
		                 }*/
						 }]
				}]
			},{
				xtype:'grid',
				region: 'south',
				reference:'EdtPerchasepriceSouthDetail',
				itemId:'EdtPerchasepriceSouthDetail',
				split:true,
				flex:7,
				store:me.dStore,
				features: [{
			        	ftype: 'summary',
			        	dock : 'bottom'
			    	}],
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				columns:[
							{ dataIndex: 'tjxh', header:'序号',width:45,
							sumaryType : 'count',
							summaryRenderer : function(value,summaryData, dataIndex) {
							return '合计';
							}},
							{ dataIndex: 'csmc' ,header:'供应厂商',width:200},
							{ dataIndex: 'rkrq', xtype:'datecolumn',format:'Y-m-d' ,header:'入库日期',width:90},
							{ dataIndex: 'clhh' ,header:'材料货号',width:80},
							{ dataIndex: 'clmc' ,header:'材料名称',width:310},
							{ dataIndex: 'cltx1' ,header:'规格尺寸',width:80},
							{ dataIndex: 'jldw' ,header:'单位',width:45},
							{ dataIndex: 'rksl', header:'入库数量',width:80,summaryType: 'sum',
								summaryRenderer: function(value, summaryData, dataIndex) {
								return Ext.util.Format.number(value,'0,000.000');
					    	} },
							{ dataIndex: 'rkdj', header:'入库单价',width:80 },
							{ dataIndex: 'rkje', header:'入库金额',width:80,renderer:function(v){ return Ext.util.Format.number(v,'0,000.00');},summaryType: 'sum',
								summaryRenderer: function(value, summaryData, dataIndex) {
								return Ext.util.Format.number(value,'0,000.00');
    						}},
							{ dataIndex: 'rkdb_yl_wbdj',header:'外币单价',width:80 },
							{ dataIndex: 'rkdb_yl_wbje',header:'外币金额',width:80 },
							{ dataIndex: 'thdj', header:'调后单价',width:80,
							    field:{
							    	xtype:'numberfield',
							    	allowNegative: false,
							    	minValue : '0',
							    	decimalPrecision:6
							    }},
							{ dataIndex: 'thje', header:'调后金额',width:80,renderer:function(v){ return Ext.util.Format.number(v,'0,000.00');},summaryType: 'sum',
								summaryRenderer: function(value, summaryData, dataIndex) {
								return Ext.util.Format.number(value,'0,000.00');
    						}},
							{ dataIndex: 'wbmc' ,header:'币种',width:45},							
//							{ dataIndex: 'wbdh' ,header:'币种',width:45},
							{ dataIndex: 'wbhl', header:'汇率',width:50},
							{ dataIndex: 'wbdj', header:'调后外币单价',width:100},
							{ dataIndex: 'wbje', header:'调后外币金额',width:100},
							{ dataIndex: 'bzsm' ,header:'调价说明',width:290,
							    field:{
							    	xtype:'textfield'
							    }},
							{ dataIndex: 'ckmc' ,header:'仓库',width:90},
							{ dataIndex: 'rkdh', header:'入库单号',width:80},
							{ dataIndex: 'rkxh', header:'入库序号',width:80},
							{ dataIndex: 'cpmc' ,header:'产品名称',width:120},
							{ dataIndex: 'zcpmc' ,header:'主产品名称',width:260}
							],
							plugins:Ext.create('Ext.grid.plugin.CellEditing', {
						        clicksToEdit : 1,
						        autoCancel: false,
						        itemId:'cellEditing',
						        listeners:{
						        	'beforeedit':function(field,e){
						        			if (!(me.isAdd||me.isEdit)){
						        				e.cancel=true;
						        			}
						        	},
						        	edit : function(editor,con,e){
						        		var field=con.field;
						        		var rec=con.record;
						        		var s_thdj,s_thje,s_rksl;
						        		if(con.originalValue==con.value){
						        			return ;
						        		}
						        		switch(field){
						        		case 'thdj' : 
						        			if(con.originalValue==con.value){
					        					break;
					        				}
						        			s_rksl = rec.get('rksl');
						        			s_thdj = rec.get('thdj');
						        			s_thje = Ext.util.Format.round(s_thdj*s_rksl,2);
						        			rec.set('thje',s_thje);
						        		}
						        		
						        	}
						}})
			}]
		});
		this.callParent();
		me.LoadData(me.rec);
	},
	LoadData:function(rec){
		var me=this;
		me.loadHsbmStore(rec.get('hsbm'));
		me.down('#EdtPerchasePriceForm').loadRecord(rec);
		me.down('#EdtPerchasepriceSouthDetail').getStore().load({params:{tjdh:rec.get('tjdh')}});
	},
	//编辑前，加载区域树，不然不显示文本内容，虽然value存在
	loadHsbmStore:function(node){
		var me=this;
		if(node!=null && node!="" && node!=0){//加载树
			var picker=me.down('#hsbm').getPicker();
//			var path="/0";
//			for(var i=0;i<node.length/2-1;i++){
//				path+="/"+node.substring(i*2,(i+1)*2);
//			}
//			picker.expandPath(path);
			picker.expandAll();//展开所有，加载所有
		}
	}	
});