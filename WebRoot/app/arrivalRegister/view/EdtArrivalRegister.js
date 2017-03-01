Ext.define('erp.arrivalRegister.view.EdtArrivalRegister',{
         extend : 'erp.ux.Panel',
         alias: 'widget.edt_ArrivalRegister',
         requires:['erp.ux.SearchCombobox','erp.ux.CommonTrigger','erp.ux.SelectField',
         'erp.view.master.purchaseDetail.window.MateCombo',
         'erp.arrivalRegister.store.GoodsAllocation'],
         closable : true,
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
         /*modal:true,*/
         initComponent : function(){
             var me = this; 
             me.arStore = Ext.create('erp.arrivalRegister.store.EdtAr');
             me.hwStore.load();
             Ext.apply(me.hwStore.proxy.extraParams,{
                  hwlb : me.ckbh});
             Ext.apply(me,{
                  layout:{
				    type:'vbox',
				    align:'stretch'
			        },
                  tbar:[
                  {text:'合同导入',iconCls:'page_go',itemId:'btn_htdr',disabled:!me.canedit},
                  {text:'外协导入',iconCls:'page_go',itemId:'btn_wxdr',disabled:!me.diswxdr},
                  {text:'计划导入',iconCls:'page_go',itemId:'btn_jhdr',disabled:!me.canedit},
                  {text:'增加',itemId:'btn_add',disabled:!me.canedit},
                  {text:'删除',itemId:'btn_del',disabled:!me.canedit},
                  {text:'保存',glyph:0xf0c7,itemId:'btn_save',disabled:!me.canedit},
                  {text:'刷新',itemId:'btn_refresh',disabled:!me.canedit}
                  ],
                  items : [
                     {
                     xtype: 'form',
                     itemId: 'fkForm',
                     height : 100,
                     bodyPadding: 10,
                     store : me.mainstore,
                     layout: 'column',
		             defaults: {
		               labelWidth:65,padding:5,xtype:'textfield'
		             },
		             items : [{
		                    fieldLabel : '到货单号',
		                    itemId : 'dhdh',
		                    name : 'dhdh',
		                    readOnly : true,
		                    columnWidth : .2
		                    },{
		                    fieldLabel : '到货日期',
		                    itemId : 'dhrq',
		                    name : 'dhrq',
		                    xtype : 'datefield',
		                    format:'Y.m.d H.m ',
		                    columnWidth : .3
		                    },{
		                    fieldLabel : '票据日期',
		                    itemId : 'pjrq',
		                    name : 'pjrq',
		                    xtype : 'datefield',
		                    columnWidth : .3
		                    },{
		                    fieldLabel : '送货单号',
		                    itemId : 'shdh',
		                    name : 'shdh',
		                    columnWidth : .2
		                    },{
		                    fieldLabel : '供应厂商',
		                    itemId : 'csbh',
		                    name : 'csbh',
		                    columnWidth : .5,
		                    allowBlank:false,
						    blankText : '厂商名称不能为空',
						    displayField : 'csmc',
			                valueField: 'csbh',
						    emptyText:'(必填)',
		                    xtype:'helpField',
		                    readOnly:!me.canedit,
		                    code : erp.DataConst.FACTORYINFO,
					        fieldConfig:{forceSelection:false},
					        listeners: {
					        	change :function(o,  newValue,  oldValue,  eOpts){
					        	   if(o.displayTplData!=null){
					        	   var data = o.displayTplData;
				                   if(data.length>0&&me.isinit){
				                   var rec=data[0];
				                   me.down('#csmc').setValue(rec.csmc);
				                   }
				                  }
				                  me.isinit=true;
					        	}
					        }
		                    },{
		                    	itemId : 'csmc',
		                    	name : 'csmc',
		                    	hidden : true,
		                    	fieldLabel : 'csbh'
		                    },{
		                       itemId : 'ckbh',
		                       name : 'ckbh',
		                       hidden : true
		                    },{
		                      itemId : 'czym',
		                      name : 'czym',
		                      hidden : true
		                    },{
		                      itemId : 'czsj',
		                      name : 'czsj',
		                      hidden : true
		                    },
		                    	{
		                    fieldLabel : '交库人名',
		                    itemId : 'jkrm',
		                    name : 'jkrm',
		                    columnWidth : .25
		                    },{
		                    boxLabel : '外协标记',
		                    itemId : 'wxbj',
		                    name : 'wxbj',
		                    xtype 	  :'checkbox',
		                    columnWidth :.25,
		                    listeners: {
		                       change :function(o,  newValue,  oldValue,  eOpts){
		                          if(newValue){
		                            me.down('#btn_wxdr').setDisabled(false);
		                          }else if(!newValue){
		                            me.down('#btn_wxdr').setDisabled(true);
		                          }
		                       }
		                    }
		                    },
		                    {fieldLabel : '操作员名',name: 'czym',itemId:'czym',hidden : true,columnWidth:1},
                            {fieldLabel : '操作时间',name: 'czsj',itemId:'czsj',xtype : 'datefield',hidden : true,columnWidth:1},
                            {fieldLabel : '仓库编号',name: 'ckbh',itemId:'ckbh',hidden : true,columnWidth:1}]
                     },{
                          xtype : 'grid',
                          itemId : 'grd_edtArrivalRegister',
                          flex : 1,
                          overflowY:'auto',
			              overflowX:'auto',
                          selModel:Ext.create('Ext.selection.CheckboxModel'),
                          features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					      }],
					      columns:[
					      {header : '加急',dataIndex : 'jjbj',width :38,renderer: erp.Util.Staterenderer,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }  },
					      {header : '序号',dataIndex : 'dhxh',width : 45},
					      {header : '材料货号',dataIndex : 'clhh',width : 70},
					      {header : '材料图号',dataIndex : 'clth',width : 70,hidden : true},
					      {header : '材料名称',dataIndex : 'clmc',width : 210,
					        editor:{
					            xtype:'commonTrigger',
					            name:'clmc',
					            itemId:'clmc',
					            selModel:'SINGLE',
				                cusConfig:{
					             type:'QuotDetail',
					             field:'clmc',
					             indexNum:3,
					            callback : function(v,rec,recs){
										me.clmcCallback(v,rec,recs);
									}
					              },
					           win:'erp.view.master.purchaseDetail.window.MateCombo'
				                 },	
				               renderer:function(v,metaData){
					             metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				                 return v;
					           }
					      },
					      {header : '规格尺寸',dataIndex : 'cltx1',width : 80,editor:{}},
					      {header : '货位',dataIndex : 'hwbh',width : 70,
					      editor:{
					          xtype : 'combo',
					          store : me.hwStore,
					          displayField:'hwmc',
					          valueField: 'hwbh'
					        },
					          renderer:function(value){
				                var rec = me.hwStore.findRecord('hwbh',value,0,false,false,true);
				                return Ext.isEmpty(rec)?value:rec.get('hwmc');
				             }
					      },
					      {header : '生产批次',dataIndex : 'pcbh',width : 70},
					      {header : '供货批次',dataIndex : 'ghpc',width : 70},
					      {header : '单位',dataIndex : 'jldw',width : 50},
					      {header : '到货数量',dataIndex : 'dhsl',width : 70,
					      editor:{},
					      summaryType: 'sum',
					      summaryRenderer: Ext.util.Format.floatRenderer,
					      renderer:Ext.util.Format.floatRenderer},
					      {header : '辅助单位',dataIndex : 'fzdw',width : 80},
					      {header : '辅助数量',dataIndex : 'fzsl',width : 80,
					      editor:{},
					      summaryType: 'sum',
					      summaryRenderer: Ext.util.Format.floatRenderer,
					      renderer:Ext.util.Format.floatRenderer},
					      {header : '合同号',dataIndex : 'hth',width : 80,editor:{}},
					      {header : '外协号',dataIndex : 'wxh',width : 80,editor:{}},
					      {header : '计划号',dataIndex : 'jhh',width : 80,renderer: function(v){
					         if(v=='0-0'){
					         return('')
					         }else{
					         return v}
					      }},
					      {header : '制造日期',dataIndex : 'zzrq',width : 80,xtype:'datecolumn',format:'Y-m-d '
					      ,editor:{}},
					      {header : '备注说明',dataIndex : 'bzsm',width : 170,editor:{}}
					      ],store : me.arStore,
					      plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        editable : !me.canedit,
							        autoCancel: false,
							        itemId:'cellEditing'
				        })
                     }
                  ]
                 
             })
              me.callParent(arguments); 
         },
         clmcCallback : function(view,rec,recs){
            var me = this;
            var grid = me.down('#grd_edtArrivalRegister');
            var srec = grid.getSelectionModel().getSelection()[0];
            var store = grid.getStore();
            if(rec.get('zjbj')!=1){
               Ext.Msg.alert('提示','无质检标记的材料不能输入到到货登记表中，应直接输入估价入库单！');
               return
            }
            srec.set('clhh',rec.get('clhh'));
            srec.set('clth',rec.get('clth'));
            srec.set('clmc',rec.get('clmc'));
            srec.set('jldw',rec.get('jldw'));
            srec.set('fzdw',rec.get(('fzdw')));
            srec.set('fzzbj',rec.get('fzzbj'));
            srec.set('zjbj',rec.get('zjbj'));
            
            
         },
         loadData : function(rec,isEdit){
             var me = this;
             var form = me.down('#fkForm');
             form.loadRecord(rec);
             if(isEdit){
                me.arStore.load({params:{
                	 ckbh : rec.get('ckbh'),  
                     dhdh : rec.get('dhdh')
                }});
             }
         }
})