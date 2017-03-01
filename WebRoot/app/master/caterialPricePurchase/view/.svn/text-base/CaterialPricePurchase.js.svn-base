Ext.define('erp.master.caterialPricePurchase.view.CaterialPricePurchase',{
   extend:'erp.ux.Panel',
   title: '材料采购价格管理',
   closable : true,
   alias: 'widget.mng_CaterialPricePurchase',
	listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	},
   initComponent:function(){
		var me=this;
		me.can_use_btn=true;
		me.store = Ext.create('erp.master.caterialPricePurchase.store.CaterialPricePurchase');
		me.vpStore = Ext.create('erp.master.caterialPricePurchase.store.VendorPriceCtl');
		me.mpStore = Ext.create('erp.master.caterialPricePurchase.store.MaterialPriceBufferrd');
		me.mpStore.on({
              'load':function(s,recs){
                  var grid = me.down('#grd_VendorDescripeDetial');
                  //刷新之后情况取消选中项
                  grid.getSelectionModel().deselectAll();
                  //grid初始化选中第一项
				  //erp.Util.gridSelect(grid,recs);
                  if(recs.length>0){
					grid.view.bufferedRenderer.scrollTo(-1, true);
				  }else{
					grid.getStore().removeAll();
				 }
              }
          })
		me.vptStore = Ext.create('erp.master.prematerial.store.Companyname');
		me.bzStore = Ext.create('erp.master.caterialPricePurchase.store.CaterialPricePurchase');
		me.argStore=Ext.create('erp.view.master.purchaseDetail.store.MaterialDetail');
		me.argColumns=erp.Util.getColumns(me.argStore.getModel());
		var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',
		defaults:{
					listeners:{
                    	specialkey: function(field, e){
    	                        if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                      }
    	                    }
    	                }
					},
		items:[/*{
			 xtype :  'comboxTree',itemId : 'cglb',fieldLabel : '采购类别', queryMode : 'local',labelWidth:65,
			 width:210,store : Ext.create('erp.view.master.category.store.CategoryTree'),
				    editable:false,
				    displayField : 'text',
					valueField: 'nodeId'
		},{
			 xtype : 'combo',itemId : 'currency',fieldLabel : '币种',labelWidth:35,labelAlign:'left',width:100,
			     store : Ext.create('erp.master.foreigncurrency.store.foreignCurrency'),
				                   displayField:'wbdh',
				                   valueField:'wbbh'
		},{
		     xtype : 'combo',itemId : 'hggf',fieldLabel : '合格供方',labelWidth:65,labelAlign:'left',width:130,
		       editable:false,
		       store : [[0,'否'],[1,'是']]
		},*/
		      
		]});
		Ext.apply(me.store.proxy.extraParams,{lbbh:me.lbbh,usePaging:true});
		Ext.apply(me.vptStore.proxy.extraParams,{usePaging:true,gdbj : 0});
		Ext.apply(me,{
		      layout:{
		         padding: 2
		      },
		      dockedItems: [{
		         xtype : 'toolbar',
		         dock :'top',
		         itemId : 'top_bar',
		         items : [
		         /*	{text : '添加', iconCls:'page_add', itemId:'btn_add'},
		            {text : '编辑', iconCls:'page_edit', itemId:'btn_edt'},*/
		            {text : '删除', iconCls:'page_delete', itemId:'btn_del'},
		            {text : '审批', iconCls:'email_edit', itemId:'btn_appro'},
		          /*  {text : '档案',iconCls:'book_next', itemId : 'BTN_BACKUP',disabled:true},*/
		            {text : '历史档案',iconCls:'book_open', itemId : 'BTN_HISTORY'},
		            {text : '批量修改', iconCls:'page_edit', itemId:'btn_batch'},
		            {text : '询价比价', iconCls:'',itemId:'btn_enquiry'},
		            {text : '历史价格', iconCls:'',itemId:'btn_hisprice'},
		            {text : '单价刷新', iconCls:'',itemId: 'btn_pricerefresh'},
		            {text : 'Excel导入', iconCls:'menu_dropdown',itemId:'btn_op_menu', menu: new Ext.menu.Menu({
		   	  		    	itemId:'menu_op',
		   	  		    	items: [
		   	  		    	{text : '材料控价导入模板',iconCls:'page_excel',itemId : 'BTN_EXCEL_OUT-MK',handler:function(){
	   	  	  				window.open('ftp://'+tp_ftpUrl+'/temp/MaterialCtrlPriceImp.xlsx', 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
	   	  	  				}},
		   	  		    	{text : '材料厂商控价导入模板',iconCls:'page_excel',itemId : 'BTN_EXCEL_OUT-CK',handler:function(){
	   	  	  				window.open('ftp://'+tp_ftpUrl+'/temp/MateriaVendorlCtrlPriceImp.xlsx', 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
	   	  	  				}},
		   	  		    	{text : '材料控价导入',itemId : 'btn_Impkj'},
		   	  		    	{text : '材料厂商控价导入',itemId : 'btn_Impcs'}
		   	  		    	]})},
		            /*{text : '刷新', iconCls:'',itemId: 'refresh'},
		            {text: '退出',iconCls:'',itemId:'btn_out', handler:function(){me.close();}},*/
		            {
		              itemId:'search',fieldLabel:'材料名称',
		              emptyText:'输入材料名称或编号搜索..',
   	  	              xtype:'commonTrigger',
			          name:'clmc',
			          collapsible:true,
			          labelWidth : 60,
			          selModel:'SINGLE',
			          win:'erp.view.master.purchaseDetail.window.MateCombo',
					  listeners:{
                    	specialkey: function(field, e){
    	                       if (e.getKey() == e.ENTER) {
    	                        me.doQuery();
    	                      }
    	                    }
    	                }
					},{
		     itemId : 'Companyname',fieldLabel:'厂商名称',
		     emptyText:'输入厂商编号或名称名称搜索..',
		     labelWidth : 60,
		     xtype :'textfield'
		},{text:'查询',iconCls:'query',
		     handler:function(){
					me.doQuery();
				}
		      },
		      {
		       text:'重置',
   	  		   iconCls:'refresh_backwards',
   	  		   handler:function(){
   	  		   me.down('#search').setValue("");
   	  		   me.down('#Companyname').setValue("");
   	  		   delete me.store.proxy.extraParams.search;
   	  		   delete me.vptStore.proxy.extraParams.psbj;
   	  		   delete me.vptStore.proxy.extraParams.search;
   	  		   delete me.vptStore.proxy.extraParams.condition;
   	  		   delete me.mpStore.proxy.extraParams.condition;
		      }
		      }
		            ]
		      }/*,sec_bar*/],
		   items : [{   
		      xtype : 'tabpanel',
		      itemId: 'main_tab',
		      items : [{
		             title : '材料价格表',
		             itemId: 'panel_CaterialPrice',
		             overflowY:'auto',
				     overflowX:'auto',
				     selModel:Ext.create('Ext.selection.CheckboxModel'),
				     layout:{
			    	     type : 'border',
			    	     padding : 2
			    	  },
			       items :[{
			        xtype:'treepanel',
	    			region:'west',
	    			reference:'caterialclass',
	    			collapsible:true,//可伸缩
	    			width:200,
	    			split:true,
	    			store : Ext.create('erp.master.caterialPricePurchase.store.MaterialClass',{autoLoad:true}),
	    			listeners:{
	    			  'itemclick':function(t,rec){
	    			  		var lbbh = rec.get('nodeId');
	    			  		if(rec.get('nodeId')!=0){
	    			  			me.store.proxy.extraParams.lbbh=rec.get('nodeId');
	    			  			me.store.loadPage(1);
	    			  		}else{
	    			  			delete me.store.proxy.extraParams.lbbh;
	    			  			me.store.loadPage(1);
	    			  		}
	    			  }
	    			}
	    			},{
	    			flex : 5,
	    			xtype : 'grid',
	    		    region : 'center',
	    			itemId : 'grd_CaterialPrice',
	    			overflowY:'auto',
				    overflowX:'auto', 
				    selModel:Ext.create('Ext.selection.CheckboxModel'),
				    dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize : 200,
			    		displayInfo:true
			    	  }],
			    	  columns : [
			    	  {header : '审批',width :38,dataIndex:'spbj_kj',
			    	     renderer: erp.Util.Staterenderer    
			    	  },
			    	  {header : '材料货号',width :100,dataIndex:'clhh' },
			    	  {header : '材料名称',width :400,dataIndex:'clmc'},
			    	  {header : '单位',width :50,dataIndex:'jldw' },
			    	  {header : '最新单价',width :100,dataIndex: 'cbdj',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '计划单价',width :100,dataIndex: 'jhdj',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '控制单价',width :100,dataIndex: 'kzdj',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '起始生效',width :100,dataIndex: 'qssxsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
			    	  {header : '截至生效',width :100,dataIndex: 'jzsxsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
			    	  {header : '结算单价',width :100,dataIndex: 'jsdj',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '辅助单位',width :65,dataIndex: 'fzdw'},
			    	  {header : '辅助控价',width :80,dataIndex: 'fzkj',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '供货周期',width :80,dataIndex: 'ghzq',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '最低采购量',width :80,dataIndex: 'zdcgl',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '最小包装量',width :80,dataIndex: 'zxbzl',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '余量率',width :100,dataIndex: 'ylbl',
		              renderer : function(value, dataIndex){
		              if(value==0){
				      return ' '
				      }else{
		              return Ext.util.Format.number(value*100,'00.00%')}}},
			    	  {header : '应用公式',width :160,dataIndex: 'gsmc',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
			    	  {header : '操作员',width :65,dataIndex: 'jjczym'},
			    	  {header : '操作日期',width :100,dataIndex: 'jjczsj',
			    	  xtype:'datecolumn',format:'Y-m-d'},
			    	  {header : '审批人',width :65,dataIndex: 'sprm_kj'},
			    	  {header : '审批时间',width :100,dataIndex: 'spsj_kj',
			    	  xtype:'datecolumn',format:'Y-m-d'}
			    	  ],
			    	  store : me.store
	    			},{
	    			region : 'south', 	
	    		    xtype : 'tabpanel',
	    		    height : 300,
	    			split:true,
	    			flex :3,
	    			tbar:[
	    			{text : '添加',glyph:0xf055,itemId:'btn_cl_add',disabled:false},
	    			{text : '编辑',itemId:'btn_cl_edt',disabled:false},
	    			{text : '删除',glyph:0xf014,itemId:'btn_cl_del',disabled:true},
	    		    {text : '筛选',glyph:0xf002,itemId:'btn_query'},
	    		    {text : '审批',iconCls:'email_edit', itemId:'btn_cl_sp'}
	    			],
	    			layout : {
	    			   type : 'fit'
	    			},
	    			items:[{
	    			title : '厂商控价',
	    			/*xtype : 'form',*/
	    			itemId : 'mng_VendorPriceCtl',
	    			split : true,
	    			height : 300,
	    			overflowY:'auto',
				    overflowX:'auto',
	    			items : [{
	    			   xtype : 'grid',
	    			   itemId : 'grd_VendorPriceCtl',
				       selModel:Ext.create('Ext.selection.CheckboxModel'),
	    			   columns : [
	    			   	{header : '审批', width : 38,dataIndex : 'spbj_kj',
	    			   	 renderer: erp.Util.Staterenderer    },
	    			   /*	{header : '所属用户', width : '',dataIndex : 'yhbh'},*/
	    			   	{header : '采购类别', width : 70,dataIndex : 'cglbmc'},
	    			   	{header : '厂商编号', width : 80,dataIndex : 'csbh'},
	    			   	{header : '厂商名称', width : 300,dataIndex : 'csmc',
	    			   	editor:{},
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	    		  	   	{header : '单位', width : 50,dataIndex : 'jldw'},
	    			   	{header : '控制单价', width : 80,dataIndex : 'kzdj',editor:{}},
	    			   	{header : '起始生效', width : 80,dataIndex : 'qssxsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	    			   	{header : '截止生效', width : 80,dataIndex : 'jzsxsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	    			   	{header : '辅助单位', width : 80,dataIndex : 'fzdw'},
	    			   	{header : '辅助控价', width : 80,dataIndex : 'fzkj',editor:{},
	    			   	renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    			   	{header : '币种', width : 38,dataIndex : 'wbdh'
	    			   	},
	    			   	{header : '供货周期(天)', width : 80,dataIndex : 'ghzq',editor:{},
	    			   	renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    			   	{header : '最低采购量', width : 80,dataIndex : 'zdcgl',editor:{},
	    			   	renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    			   	{header : '最小包装量', width : 80,dataIndex : 'zxbzl',editor:{},
	    			   	renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    			   	{header : '厂商型号', width : 100,dataIndex : 'csxh',editor:{}},
	    			   	{header : '备注说明', width : 300,dataIndex : 'bzsm',editor:{},
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	    			   	{header : '操作人名', width : 70,dataIndex : 'czym'},
	    			   	{header : '操作时间', width : 80,dataIndex : 'czsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	    			   	{header : '审批人', width : 70,dataIndex : 'sprm_kj'},
	    			   	{header : '审批时间', width : 80,dataIndex : 'spsj_kj',
	    			   	xtype:'datecolumn',format:'Y-m-d'}
	    			   	],
	    			   	store : me.vpStore,
	    			  /* 	plugins:Ext.create('Ext.grid.plugin.CellEditing',{
	    			   	        clicksToEdit : 1,
							    autoCancel: false,
							    itemId:'cellEditing'
	    			   	}),*/
	    			   	listeners: {
							selectionchange: function(grid, rec) {
								if (rec.length>0){
									me.down('#btn_cl_del').setDisabled(false);
									me.down('#btn_cl_edt').setDisabled(false);
								 }else{
								 	me.down('#btn_cl_del').setDisabled(true);
								 	me.down('#btn_cl_edt').setDisabled(false);
								 }
							}
	    			   	}	
	    			}]
	    			
	    			}/*,{
	    			title : '材料描述',
	    			itemId : 'grd_VendorPriceCtl',
	    			split : true,
	    			height : 300,
	    			items : [{
	    			xtype : 'grid',
	    			columns : [
	    				{hearer : '',dataIndex : 'bzsm'}],
	    				store : me.bzStore
	    			}]
	    			}*/]
	    			}]		
		      },{
		      title : '厂商价格表',
		      itemId : 'mng_VendorPrice',
		      overflowY:'auto',
			  overflowX:'auto',
		      layout:{
			    	     type : 'border',
			    	     padding : 2
			    	  },
		      items : [{
		      	  flex : 5,
		          xtype : 'grid',
		          region : 'center',
		          itemId : 'grd_VendorDescripe',
				  selModel:Ext.create('Ext.selection.CheckboxModel'),
				  dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.vptStore,
			    		dock:'bottom',
			    		defaultPageSize : 200,
			    		displayInfo:true
			    	  }],
			   columns : [
			   	{header:'采购类别',flex:2,dataIndex:'cglbmc'},
			   	{header:'厂商编号',flex:2,dataIndex:'csbh'},
			   	{header:'厂商名称',flex:5,dataIndex:'csmc',
			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
			   	{header:'币种',flex:1,dataIndex:'wbdh'},
			   	{header:'合格供方',flex:1,dataIndex:'psbj',
			   	 renderer: erp.Util.Staterenderer    
			    	  },
			   	{header:'备注说明',flex:5,dataIndex:'bzsm',
			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }}
			   	],
			   	store : me.vptStore
			/*   store : ,*/
		      },{
		         xtype : 'grid',
		         itemId : 'grd_VendorDescripeDetial',
		         region : 'south', 
		         split:true,
		         flex : 3,
		         overflowY:'auto',
				 overflowX:'auto',
				 plugins: [{ptype: 'bufferedrenderer'}],
				 tbar:[
	    			{text: '添加',glyph:0xf055,itemId:'btn_vp_add',disabled:false},
	    			{text: '编辑',itemId:'btn_vp_edt',disabled:false},
	    			{text: '删除',glyph:0xf014,itemId:'btn_vp_del',disabled:true},
	    		    {text : '筛选',glyph:0xf002,itemId:'btn_vp_query'}
	    			],
				 selModel:Ext.create('Ext.selection.CheckboxModel'),
				    columns : [
	    			   	{header : '审批', width : 38,dataIndex : 'spbj_kj',
	    			   	 renderer: erp.Util.Staterenderer },
	    			   /*	{header : '所属用户', width : '',dataIndex : 'yhbh'},*/
	    			   	{header : '材料货号', width : 70,dataIndex : 'clhh'},
	    			   	{header : '材料名称', width : 300,dataIndex : 'clmc',
	    			   	editor:{},
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	    		  	   	{header : '单位', width : 50,dataIndex : 'jldw'},
	    			   	{header : '控制单价', width : 80,dataIndex : 'kzdj',editor:{}},
	    			   	{header : '辅助单位', width : 80,dataIndex : 'fzdw'},
	    			   	{header : '辅助控价', width : 80,dataIndex : 'fzkj',editor:{},
	    			   	renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    			   	{header : '供货周期(天)', width : 80,dataIndex : 'ghzq',editor:{},
	    			   	renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    			   	{header : '最低采购量', width : 80,dataIndex : 'zdcgl',editor:{},
	    			   	renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    			   	{header : '最小包装量', width : 80,dataIndex : 'zxbzl',editor:{},
	    			   	renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    			   	{header : '厂商型号', width : 100,dataIndex : 'csxh',editor:{}},
	    			   	{header : '备注说明', width : 300,dataIndex : 'bzsm',editor:{},
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
	    			   	{header : '操作人名', width : 70,dataIndex : 'czym'},
	    			   	{header : '操作时间', width : 80,dataIndex : 'czsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	    			   	{header : '审批人', width : 70,dataIndex : 'sprm_kj'},
	    			   	{header : '审批时间', width : 80,dataIndex : 'spsj_kj',
	    			   	xtype:'datecolumn',format:'Y-m-d'}
	    			   	],
	    			   	store : me.mpStore,
	    			   		listeners: {
							selectionchange: function(grid, rec) {
								if (rec.length>0){
									me.down('#btn_vp_del').setDisabled(false);
									me.down('#btn_vp_edt').setDisabled(false);
								 }else{
								 	me.down('#btn_vp_del').setDisabled(true);
								 	me.down('#btn_vp_edt').setDisabled(true);
								 }
							}
	    			   	}	
		      }] 
		     }]
		   }] 
		});me.callParent(arguments);
	},
	doQuery : function(btn){
		         var me = this;
		         var str = me.down('#search').getValue().replace(/\s+/g,'%');
		         var clArr = str.split('%');
		         var search = '';
		         Ext.each(clArr,function(cl){
		            search += " and (charindex('"+cl+"',clbmb.clmc)>0 or clbmb.clhh like '"+cl+"%')"
		         });
		         Ext.apply(me.store.proxy.extraParams,{
				 search:search
			        }
		         ); 
		         me.store.loadPage(1);
		         /*me.store.loadPage(1,{
		         params:{
		             search:me.down('#search').getValue()
		         }
		         });*/
		        //厂商搜索 
		         Ext.apply(me.vptStore.proxy.extraParams,{
		           	 search : me.down('#Companyname').getValue().replace(/\s+/g,'')
			        }
		         ); 
		         me.vptStore.loadPage(1);
		      },
/*	hasPermission : function(lbbh){
		 var result = erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=hasPermission',
         {lbbh :lbbh,czygh : erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id});
         return result;
	},*/
	loadMain:function(){
		var me=this;
		me.store.loadPage(1,{
		    callback: function(records, operation, success) {
		        if(records.length>0){
		        	me.down('#grd_CaterialPrice').getSelectionModel().select(records[0]);
		        }		        
		    }
		});
	}
})