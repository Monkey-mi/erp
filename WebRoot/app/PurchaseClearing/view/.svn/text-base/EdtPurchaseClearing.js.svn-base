Ext.define('erp.PurchaseClearing.view.EdtPurchaseClearing',{
     extend: 'erp.ux.Panel',
     alias: 'widget.edt_PurchaseClearing',
     requires : ['erp.ux.SelectField',
     'erp.PurchaseClearing.store.DeptTree'],
     title : '采购结算核对编辑',
     closable:true,
     listeners:{
		'close':function(cmp){
			cmp.destroy();
		},
		beforeclose:function(panel){
			//编辑界面如果有父级菜单则设置设为enable
			if(panel.mainPanel!=null){
					panel.mainPanel.enable();
			}
		},
		afterrender : function(cmp) {
			//编辑界面如果有父级菜单则设置设为disable
				if(cmp.mainPanel!=null){
					cmp.mainPanel.disable();
			}
		}
	},
     initComponent: function(){
        	var me = this;
            me.rkStore = Ext.create('erp.PurchaseClearing.store.Storage');
            me.fyStore = Ext.create('erp.PurchaseClearing.store.Cost')
        	Ext.apply(me,{
              layout:{
				type:'vbox',
				align:'stretch'
			},
			 tbar:[{text: '导入',iconCls:'page_go',itemId:'imp1',disabled:!me.canedit},
			       {text: '删除',iconCls:'page_delete',itemId:'btn_del',disabled:!me.canedit},
			 	   {text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE',disabled:!me.canedit},
			       {text: '钢价结算',itemId:'btn_gjjs',disabled:false}
			 ],
		 items : [{
		     xtype : 'form',
		     itemId : 'jsForm',
		     height : 150,
		     bodyPadding: 10,
		     store : me.mainstore,
		     layout : 'column',
		     defaults: {
		        labelWidth:80,padding:5,xtype:'textfield'
		     },
		     items : [{
		         fieldLabel : '核算部门',
		         itemId : 'hsbm',
		         name : 'hsbm',
		         columnWidth : .25,
		         xtype : 'comboxTree',
				 allowBlank:false,
		         blankText : '核算部门不能为空',
				 emptyText:'(必填)',
				 queryMode : 'local',
				 store : Ext.create('erp.PurchaseClearing.store.DeptTree'),
				 displayField : 'text',
			     valueField: 'nodeId',
			     listeners:{
			        'select':function(obj,value){
		               if(!Ext.isEmpty(value)){
    						var czy_gh;
    						if(erp.Util.currentUser.isAdmin){
    						    czy_gh = 'wj';
    						}else{
    						    czy_gh = erp.Util.currentUser.accountMap[0].ref_u_id;
    						}
    						var qxsql = "select count(*) from hsbm_qxb ";
    						qxsql+= "where (left(bmbh,len("+value.id+"))="+value.id+" or bmbh=left("+value.id+",len(bmbh))) and czy_gh = '"+czy_gh+"'";
    						var result = erp.Const.callServiceMethodSync(
    							'materialInventory/materialInventory.act?method=getStringFromSql', {
    							 sql:qxsql
    					    });
    					    var data = Ext.decode(result);
    					    if(data.val==0 && czy_gh!='wj'){
    					      Ext.Msg.alert('提示','你没有该部门的权限,请重新选择');
    					      return
    					    }
		                }
		              }
			     }
		     },{
		        fieldLabel : '通知单号',
		        itemId : 'tzdh',
		        name : 'tzdh',
		        columnWidth : .25,
		        readOnly : true
		     },{
		       fieldLabel : '通知日期',
		       itemId : 'tzrq',
		       name : 'tzrq',
		       xtype : 'datefield',
		       columnWidth : .25
		     },{
		       fieldLabel : '起始日期',
		       itemId : 'qsrq',
		       name : 'qsrq',
		       xtype : 'datefield',
		       columnWidth : .25
		     },{
		       fieldLabel : '截止日期',
		       itemId : 'jzrq',
		       name : 'jzrq',
		       xtype : 'datefield',
		       columnWidth : .25
		     },{
		     	name : 'csmc',
					columnWidth:.5,
					itemId:'csmc',
					fieldLabel:'厂商名称',
					width:445,
					xtype:'helpField',
					allowBlank:false,
			        blankText : '厂商名称不能为空',
			        emptyText:'(必填)',
					code : erp.DataConst.FACTORYINFO,
					fieldConfig:{forceSelection:false},
		         listeners:{
				          change :function(o,  newValue,  oldValue,  eOpts){
				          	   if(o.displayTplData!=null){
					        	   var data = o.displayTplData;
				                   if(data.length>0&&me.isinit){
				                   var rec=data[0];
				                   me.down('#csbh').setValue(rec.csbh);
				                   }
				                  }
				                  me.isinit=true;
				    }
				  }
		        },{
		        fieldLabel : 'csbh',
		        name : 'csbh',
		        itemId : 'csbh',
		        hidden : true
		        },{
		        fieldLabel : '收件人',
		        itemId : 'sjrm',
		        name : 'sjrm',
		        columnWidth : .25
		        },{
		        fieldLabel : '备注说明',
		        itemId : 'bzsm',
		        name : 'bzsm',
		        columnWidth : 1,
		        maxLength : 80
		        },
		        {
                fieldLabel : '操作人名',
                itemId : 'czym',
                name : 'czym',
                value : erp.UInfo.currentUser.name,
                hidden : true
                },{
                fieldLabel : '操作时间',
                name : 'czsj',
                itemId : 'czsj',
                hidden : true,
                value : new Date()
                }
		     ]
		 },{
		     xtype : 'tabpanel',
		     flex : 1,
		     items : [
		     {
		     	xtype : 'grid',
		     	itemId : 'grdRkd',
		     	title : '入库单',
		     	features: [{
					ftype: 'summary',
				    summaryType: 'count',
					dock: 'bottom'
				}],
				selModel:Ext.create('Ext.selection.CheckboxModel'),
		     	columns : [
		     	{header : '送货日期',width: 80,dataIndex: 'shsj',xtype:'datecolumn',format:'Y-m-d', 
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            } },
		     	{header : '送货单号',width: 80,dataIndex: 'shdh' },
		     	{header : '入库日期',width: 80,dataIndex: 'rkrq',xtype:'datecolumn',format:'Y-m-d' },
		     	{header : '入库单号',width: 70,dataIndex: 'rkdh' },
		     	{header : '入库序号',width: 70,dataIndex: 'rkxh' },
		     	{header : '合同号',width: 80,dataIndex: 'hth' },
		     	{header : '采计号',width: 70,dataIndex: 'cgh' },
		     	{header : '关联合同编号',width: 80,dataIndex: 'glht' },
		     	{header : '材料货号',width: 70,dataIndex: 'clhh' },
		     	{header : '材料名称',width: 250,dataIndex: 'clmc' },
		     	{header : '规格尺寸',width: 120,dataIndex: 'cltx1' },
		     	{header : '备注说明',width: 250,dataIndex: 'bzsm' },
		     	{header : '单位',width: 50,dataIndex: 'jldw' },
		     	{header : '采购数量',width: 70,dataIndex: 'cgsl',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:Ext.util.Format.floatRenderer},
		     	{header : '入库数量',width: 70,dataIndex: 'rksl',
		                        summaryType: 'sum',
		                          summaryRenderer: Ext.util.Format.floatRenderer,
					              renderer:Ext.util.Format.floatRenderer},
		     	{header : 'PONO',width: 80,dataIndex: 'sxdy09' },
		        {header : '含税单价',width : 80,dataIndex: 'rkdj'},
				{header : '含税金额',width : 80,dataIndex: 'rkje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
		     	{header : '仓库名称',width : 80,dataIndex: 'ckmc'},
		     	{header : '仓库编号',width : 80,dataIndex: 'ckbh',hidden : true},
		     	{header : '加工单价',width: 80,dataIndex: 'jgdj' },
		     	{header : '加工金额',width: 80,dataIndex: 'jgje' },
		     	{header : '操作员',width: 70,dataIndex: 'czym' },
		     	{header : '操作时间',width: 80,dataIndex: 'czsj' ,xtype:'datecolumn',format:'Y-m-d'},
		     	{header : '序号',width: 40,dataIndex: 'rkxh' },
		     	{header : '到货日期',width: 80,dataIndex: 'dhrq' ,xtype:'datecolumn',format:'Y-m-d'},
		     	{header : '到货数量',width: 80,dataIndex: 'dhsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            } },
		     	{header : '币种',width: 50,dataIndex: 'wbdh' },
		     	{header : '汇率',width: 50,dataIndex: 'wbhl' },
		     	{header : '外币单价',width: 70,dataIndex: 'wbdj' },
		     	{header : '外币金额',width: 70,dataIndex: 'wbje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            } },
		     	{header : '辅助单位',width: 70,dataIndex: 'fzdw' },
		     	{header : '辅助数量',width : 70,dataIndex: 'fzsl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
                {header : '入库类别',width : 70,dataIndex: 'rklbmc'}
		     	],store : me.rkStore,
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
						        	'edit':function(field,e){
						        	}
						}})
		     },{
		     xtype : 'grid',
		     itemId : 'grdFyd',
		     title : '费用单',
		     features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
		     selModel:Ext.create('Ext.selection.CheckboxModel'),
		     columns : [
		      {header: '费用单号',width:80,dataIndex:'fydh', 
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
		      {header: '序号',width: 50,dataIndex:'fyxh'},
		      {header: '费用日期',width: 80,dataIndex:'fyrq',xtype:'datecolumn',format:'Y-m-d'},
		      {header: '出运编号',width: 80,dataIndex:'cybh'},
		      {header: '费用摘要',width: 220,dataIndex:'fyzy'},
		      {header: '费用性质',width: 80,dataIndex:'fyxz'},
		      {header: '核算部门',width: 100,dataIndex: 'bmmc'},
		      {header: '数量',width: 70,dataIndex:'fysl',
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return value;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return value;
					            }},
		      {header: '单价',width: 70,dataIndex:'fydj'},
		      {header: '金额',width: 70,dataIndex:'fyje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
		      {header: '币种',width: 50,dataIndex:'wbdh'},
		      {header: '外币编号',width: 50,dataIndex:'wbbh',hidden:true},
		      {header: '汇率',width: 50,dataIndex:'wbhl'},
		      {header: '外币单价',width: 70,dataIndex:'wbdj'},
		      {header: '外币金额',width: 70,dataIndex:'wbje',
                                  summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }},
		      {header: '计划号',width: 70,dataIndex:'jhh'},
		      {header: '备注说明',width: 200,dataIndex:'bzsm'},
		      {header: '操作员',width: 70,dataIndex:'czym'},
		      {header: '操作时间',width: 80,dataIndex:'czsj',xtype:'datecolumn',format:'Y-m-d'},
		      {header: '锁定人',width: 70,dataIndex:'sdrm'},
		      {header: '锁定时间',width: 80,dataIndex:'sdsj',xtype:'datecolumn',format:'Y-m-d'}
		     ],store : me.fyStore,
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
						        	'edit':function(field,e){
						        	}
						}})
		     
		     }]
		 }]	 
        })
         me.callParent(arguments); 
     },
      loadData : function(rec,isAdd,isEdit){
         var me=this;
		var form=me.down('#jsForm');
		form.loadRecord(rec);
       if(isEdit){
           me.rkStore.load({params:{
              tzdh : rec.get('tzdh')
              }});
           me.fyStore.load({params:{
              tzdh : rec.get('tzdh')
           }})   
         }
	   }
})