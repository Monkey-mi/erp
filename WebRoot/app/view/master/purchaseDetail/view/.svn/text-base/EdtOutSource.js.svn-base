Ext.define('erp.view.master.purchaseDetail.view.EdtOutSource',{
	extend:'erp.ux.Panel',
	alias:'widget.EdtOutSource',
	requires:[
		'erp.view.master.purchaseDetail.store.OutSource',
		'erp.view.master.purchaseDetail.store.OutSourceDetail',
		'erp.view.master.purchaseDetail.store.OutSourceSubsidiary',
		'erp.view.master.category.store.CategoryTree',
		'erp.view.master.purchaseDetail.store.ProcessNameTree',
		'erp.view.master.purchaseDetail.window.OutSourceMaterialImp',
		'erp.view.master.purchaseDetail.window.MateCombo'
	],
	controller:'PurchaseDetailCtl',
	xtype: 'EdtOutSource',
	layout: {
        type: 'border'
    },
	initComponent:function(){
		var me=this;
		me.mStore=Ext.create('erp.view.master.purchaseDetail.store.OutSource');
		me.dStore=Ext.create('erp.view.master.purchaseDetail.store.OutSourceDetail');
		me.subStore=Ext.create('erp.view.master.purchaseDetail.store.OutSourceSubsidiary');
		me.cateTreeStore=Ext.create('erp.view.master.purchaseDetail.store.PlanCategoryTree');
		me.MainUnitStore=Ext.create('erp.view.master.purchaseDetail.store.MainUnit');
		me.MainUnitStore.load();
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'EdtOutSourceBar',
	    	hidden:!me.isEdit,
	    	items:[
	    		  {text: '增加',	iconCls:'page_add',		itemId:'SourceAdd'},
			   	  {text: '删除',	iconCls:'page_delete',		itemId:'SourceDel', disabled:true},
			   	  {text: '材料增加',	iconCls:'page_add',		itemId:'MaterialAdd'},
			   	  {text: '材料删除',	iconCls:'page_delete',		itemId:'MaterialDel', disabled:true},
			   	  {text: '模版维护',	iconCls:'template',		itemId:'template'},
				  {text: '保存',iconCls:'page_save',itemId:'BTN_SAVE',disabled:!me.isEdit}
			]
	    }],
	    Ext.apply(me,{
	    	items:[{
		        region: 'center',
		        xtype:'form',
		        reference:'OutSourceForm',
		        itemId:'OutSourceForm',
				store:me.store,
				flex:150,
				layout:'fit',
				items:[{
					xtype:'fieldset',
					autoScroll:true,
					margin:'5 5 5 5',
					layout:'column',
					//maxWidth:600,
			    	defaults: {
						xtype: 'textfield',
						readOnly:!me.isEdit,
						margin:'5 5 5 5',
						labelWidth:70,
						columnWidth: .3,
	   	  	  			selectOnFocus:true
					},
					items:[{
			  			fieldLabel:'外协单号',
			  			itemId:'wxdh',
					   	name : 'wxdh',
					   	readOnly:true
			  		},{
			  			fieldLabel:'外协日期',
			  			itemId:'wxrq',
					   	name : 'wxrq',
					   	xtype:'datefield',
			   	  	  	format:'Y.m.d'
			  		},{
			  			fieldLabel:'外协厂商',
			  			itemId:'csbh',
			  			name:'csbh',
			  			xtype:'helpField',
						code : erp.DataConst.FACTORYINFO,
						fieldConfig:{forceSelection:true},
						columnWidth: .4,
						listeners:{
							change :function(o,  newValue,  oldValue,  eOpts){
								if(o.displayTplData!=null){
									var data=o.displayTplData;
									if(data.length>0){
										var rec=data[0];
										//me.down('#cglb').setValue(rec.cglb);
										//me.down('#cslxr').setValue(rec.lxrm);
									}
								}
								if(newValue!=null&&newValue!=''){
									//me.csbhChange(newValue);
								}
		                    }
						}
			  		},{
			  			fieldLabel:'计划类别',
			  			itemId:'jhlb',
					   	name : 'jhlb',
					   	columnWidth: .3,
					   	xtype:'comboxTree',
			  			allowBlank:false,
						fieldConfig:{forceSelection:true},
						store : me.cateTreeStore,
						displayField : 'text',
						valueField: 'nodeId',
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
					},{
			  			fieldLabel:'工序名称',
			  			itemId:'gxbh',
					   	name : 'gxbh',
					   	columnWidth: .28,
					   	xtype:'comboxTree',
			  			allowBlank:false,
						fieldConfig:{forceSelection:true},
						store : Ext.create('erp.view.master.purchaseDetail.store.ProcessNameTree'),
						displayField : 'text',
						valueField: 'nodeId',
						listeners:{
						   	'select':function(obj,recs){
						   		
						   	}
						}
					},{
						fieldLabel:'完成日期',
						xtype:'datefield',
						itemId:'wcrq',
					   	name : 'wcrq',
			   	  	  	format:'Y.m.d',
			   	  	  	columnWidth: .22
					},{
						fieldLabel:'领料类型',
						xtype:'combo',
						itemId:'lllx',
					   	name : 'lllx',
						store:[[0,'领用材料'],[1,'出售材料']],
						columnWidth: .2
					},{
						name : 'ztdw',
						itemId:'ztdw',
						fieldLabel:'主体单位',
						columnWidth: .4,
						typeAhead:true,
						xtype:'combo',
						queryMode : 'local',
						allowBlank:false,
						displayField:'ztmc',
						valueField:'ztbh',
						selectOnFocus:true,
						store:me.MainUnitStore,
						fieldConfig:{forceSelection:true},
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
			  		},{
						name : 'bzsm',
						itemId:'bzsm',
						fieldLabel:'备注说明',
						columnWidth: .6,
						xtype:'textfield'
			  		}]
				}]
			},{
				xtype:'tabpanel',
				region: 'south',
				split:true,
				flex:680,
			    items:[{
			    	title:'外协明细',
			    	xtype:'panel',
			    	layout: {
				        type: 'vbox',
				        align: 'stretch'
				    },
			    	items:[{
						xtype:'grid',
				    	reference:'OutSourceDetailGrid',
			        	itemId:'OutSourceDetailGrid',
				    	flex:1,
				    	selModel:Ext.create('Ext.selection.CheckboxModel'),
				    	plugins: {
					        ptype: 'cellediting',
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		var field=con.field;
					        		var rec=con.record;
					        		var s_kjlx,s_clhh,s_cgsl,s_fzsl,s_cgdj,s_cgje,s_wbhl,s_wbje;
					        		switch(field){
					        			case 'cpbh':
					        				
					        			break;
					        			case 'clhh':
					        			break;
					        		}
					        		me.dStore.sort('asd');
					        	}
					        },
					        clicksToEdit: 1
					    },
					    features: [{
					       ftype: 'summary',
			       			dock:'bottom'
					    }],
				    	columns:[
							{header:'序号',dataIndex:'wxxh',width:50,align:'center',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
				   	  	  	{header:'材料货号',dataIndex:'clhh',width:80,align:'center'},
			   	  	  		{header:'外协产品',dataIndex:'clmc',width:160,field:{
			   	  	  			xtype:'textfield'
			   	  	  		}},
			   	  	  		{header:'规格尺寸',dataIndex:'cltx1',width:80,align:'center'},
			   	  	  		{header:'单位',dataIndex:'jldw',width:80,align:'right'},
			   	  	  		{header:'投产数量',dataIndex:'tcsl',width:80,align:'right',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:3,
	   	  	  					selectOnFocus:true
			   	  	  		},summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					        }},
			   	  	  		{header:'×(1+放大率)',dataIndex:'jsbl',align:'right',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:4,
	   	  	  					selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'=预计加工数量',dataIndex:'jgsl',align:'right',width:120,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					        }},
			   	  	  		{header:'加工单价',dataIndex:'jgdj',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:6,
	   	  	  					selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'控制单价',dataIndex:'kzdj',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:3,
	   	  	  					selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'预计加工金额',dataIndex:'tcsl',width:120,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');
					        }},
			   	  	  		{header:'辅助单位',dataIndex:'fzdw',width:80},
			   	  	  		{header:'辅助数量',dataIndex:'fzsl',width:80,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					        }},
			   	  	  		{header:'控价类型',dataIndex:'kjlx',width:80},
			   	  	  		{header:'计划号',dataIndex:'jhh',width:80},
			   	  	  		{header:'采计号',dataIndex:'cgh',width:80},
			   	  	  		{header:'申请号',dataIndex:'sqh',width:80}
			   	  	  	],
				    	listeners : {
								selectionchange : function(grid, recs) {
									var rec=recs[0];
									me.subStore.clearFilter(true);
									if (recs.length > 0) {
										me.down('#SourceDel').setDisabled(false);
										me.subStore.filterBy(function(r){
											return r.get('wxxh')==rec.get('wxxh');
										});
									} else {
										me.subStore.filterBy(function(r){
											return r.get('wxxh')==-1;
										});
										me.down('#SourceDel').setDisabled(true);
									}
								}
						},
			   	  	  	store:me.dStore			    		
			    	},{
			    		xtype:'splitter'
			    	},{
			    		xtype:'grid',
				    	reference:'MaterialGrid',
			        	itemId:'MaterialGrid',
				    	flex:1,
				    	selModel:Ext.create('Ext.selection.CheckboxModel'),
				    	plugins: {
					        ptype: 'cellediting',
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		if(!me.isEdit){
					        			return false;
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		//console.log(editor);
					        		//console.log(con);
					        		var field=con.field;
					        		var rec=con.record;
					        		var s_jgyl,s_jsbl,s_csdj,s_djyl,s_jgsl,s_tzll;
					        		var drec=me.down('#OutSourceDetailGrid').getSelectionModel().getSelection()[0];
					        		s_jgsl=drec.get('jgsl');
					        		switch(field){
					        			case 'jgyl':
					        			case 'jsbl':
					        			s_jgyl=rec.get('jgyl');
					        			s_jsbl=rec.get('jsbl');
					        			s_csdj=rec.get('csdj');
					        			rec.set('tzll',me.round(s_jgyl*s_jsbl,3));
					        			rec.set('csje',me.round(s_csdj*s_jgyl,2));
					        			if(s_jgsl!=0&&s_jgyl!=0){
					        				rec.set('djyl',me.round(s_jgyl/s_jgsl,3));
					        			}else{
					        				rec.set('djyl',0);
					        			}
					        			break;
					        			case 'tzll':
					        				s_tzll=rec.get('tzll');
					        				s_jgyl=rec.get('jgyl');
					        				s_csdj=rec.get('csdj');
					        				if(s_jgyl!=0&&s_tzll!=0){
					        					s_jsbl=me.round(s_tzll/s_jgyl,4);
					        					rec.set('jsbl',s_jsbl);
					        				}
					        				rec.set('csje',me.round(s_csdj*s_tzll,2));
					        			break;
					        			case 'csdj':
					        				rec.set('csje',me.round(rec.get('csdj')*rec.get('tzll'),2));
					        			break;
					        			case 'djyl':
					        				s_djyl=rec.get('djyl');
					        				s_jsbl=rec.get('jsbl');
					        				s_csdj=rec.get('csdj');
					        				rec.set('jgyl',me.round(s_djyl*s_jgsl,3));
					        				rec.set('tzll',me.round(s_djyl*s_jgsl*s_jsbl,3));
					        				rec.set('csje',me.round(s_csdj*s_djyl*s_jsbl,2));
					        			break;
					        		}
					        		me.subStore.sort('asd');
					        	}
					        },
					        clicksToEdit: 1
					    },
					    features: [{
					       ftype: 'summary',
					       dock:'bottom'
					    }],
				    	columns:[
							{header:'序号',dataIndex:'tzxh',width:50,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
				   	  	  	{header:'材料类别',dataIndex:'lbbh',width:80,align:'center',renderer:function(v,r){
				   	  	  		var lbmc=r.record.get('lbmc');
				   	  	  		return lbmc==null?v:lbmc;
				   	  	  	}},
			   	  	  		{header:'材料名称',dataIndex:'clmc',width:160},
			   	  	  		{header:'规格尺寸',dataIndex:'cltx1',width:80,align:'center',field:{
			   	  	  			xtype:'textfield',
	   	  	  					selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'单位',dataIndex:'jldw',width:80,align:'right'},
			   	  	  		{header:'单件用量',dataIndex:'djyl',width:80,align:'right',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:6,
	   	  	  					selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'加工用量',dataIndex:'jgyl',width:80,align:'right',field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:3,
	   	  	  					selectOnFocus:true
			   	  	  		},summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					        }},
			   	  	  		{header:'×(1+损耗率)',dataIndex:'jsbl',align:'right',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:4,
	   	  	  					selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'=通知领料',dataIndex:'tzll',align:'right',width:80,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					        },field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:3,
	   	  	  					selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'出售单价',dataIndex:'csdj',width:80,field:{
			   	  	  			xtype:'numberfield',
			   	  	  			decimalPrecision:6,
	   	  	  					selectOnFocus:true
			   	  	  		}},
			   	  	  		{header:'出售金额',dataIndex:'csje',width:80,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');;
					        }},
			   	  	  		{header:'备注说明',dataIndex:'tcsl',width:120}
			   	  	  	],
				    	listeners : {
								selectionchange : function(grid, recs) {
									var rec=recs[0];
									if (recs.length > 0) {
										me.down('#MaterialDel').setDisabled(false);
									} else {
										me.down('#MaterialDel').setDisabled(true);
									}
								}
						},
			   	  	  	store:me.subStore
			    	}]
			    		},{
				    		xtype:'textarea',
				    		itemId:'OutSourceBzsm',
				    		name:'bzsm',
				    		title:'备注说明'
				    	}]
				}]
	    })
		this.callParent();
		me.loadRecord(me.mrec);
	},
	loadRecord:function(rec){
		var me=this;
		me.down('#OutSourceForm').loadRecord(rec);
		me.loadJhlbStore(rec.get('jhlb'));
		me.dStore.add(me.drecs);
	},
	// 编辑前，加载类别树，不然不显示文本内容，虽然value存在
	loadJhlbStore:function(node){
		var me=this;
		if(node!=null && node!="" && node!=0){//加载树
			var picker=me.down('#jhlb').getPicker();
			var path="/0";
			for(var i=0;i<node.length/2-1;i++){
				path+="/"+node.substring(i*2,(i+1)*2);
			}
			picker.expandAll();//展开所有，加载所有
		}
	},
	round:function(v,l){
		return Ext.util.Format.round(v,l);
	}
})