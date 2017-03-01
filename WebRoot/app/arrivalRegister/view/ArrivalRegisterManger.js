Ext.define('erp.arrivalRegister.view.ArrivalRegisterManger',{
      extend  : 'erp.ux.Panel',
      alias: 'widget.mng_ArrivalRegisterManger',
      closable : true,
      requires:[
       'erp.arrivalRegister.store.ArrivalRegisterBufferrd'
      ],
	  listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	  },
      initComponent:function(){
          var me = this;
          me.store= Ext.create('erp.arrivalRegister.store.ArrivalRegisterBufferrd');
          me.Sum = Ext.create('erp.arrivalRegister.store.ArrivalRegister');
          me.store.on({
              'load':function(s,recs){
                  var grid = me.down('#grd_ArrivalRegister');
                  //刷新之后情况取消选中项
                  grid.getSelectionModel().deselectAll();
                  //grid初始化选中第一项
				  //erp.Util.gridSelect(grid,recs);
                  if(recs.length>0){
					grid.view.bufferedRenderer.scrollTo(-1, true);
				  }else{
					grid.getStore().removeAll();
				 }
              },
              beforeload : function(){
              	    var condition = ''
	    			if(!Ext.isEmpty(me.store.proxy.extraParams.condition)){
	    			    condition = me.store.proxy.extraParams.condition;
	    			}
                    var recs = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getSumArrivalRegister',{
	    			    ckbh : me.ckbh,condition : condition,
	    			    filter : me.store.proxy.encodeFilters(me.store.getFilters().items)
	    			});
	    			if(recs.length>0){
		          	Ext.apply(me.Sum.data,recs[0]);
	              }else{
	                me.Sum = Ext.create('erp.PurchaseClearing.store.JsRkdbImp');
	              }
              },
              totalcountchange:function onStoreSizeChange() {
				var grid=me.down('#grd_ArrivalRegister');
		        grid.down('#status').update({count: me.store.getTotalCount()});
		    }
          })
          /*me.store.load({params:{ckbh : me.ckbh,limit : 50}})*/
          Ext.apply(me.store.proxy.extraParams,{
          	ckbh : me.ckbh
          });
          Ext.apply(me,{
          	listeners:{
	    		afterrender:function(cmp){
	    			cmp.store.loadPage(1);
	    			
	    			
	    			var recs = erp.Const.callServiceMethodSync('arrivalregister/arrivalregister.act?method=getSumArrivalRegister',{
	    			    ckbh : me.ckbh
	    			});
	    			if(recs.length>0){
		          	Ext.apply(me.Sum.data,recs[0]);
	              }else{
	                me.Sum = Ext.create('erp.PurchaseClearing.store.JsRkdbImp');
	              }
	    		}
	    	},
             layout:{
		     type: 'border',
		     padding : 2
		     },
		     dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId: 'function_btn',
			    items: [
			       {text : '添加', iconCls:'page_add', itemId:'btn_add',disabled : false},
			       {text : '编辑', iconCls:'page_edit', itemId:'btn_edt'},
			       {text : '删除', iconCls:'page_delete', itemId:'btn_del',disabled : false},
			       {text : '退货处理',iconCls: '',itemId :'btn_Return' },
			       {text : '中止',iconCls:'stop',itemId : 'btn_Stop'},
			       {text : '历史到货',iconCls: '',itemId : 'btn_his'},
			       {text : '入库单查询',iconCls: '',itemId : 'btn_rkdquery'},
			       {text : '质检单查询',iconCls: '',itemId : 'btn_zjdqueryvqb'},
			       {text : '状态刷新',iconCls: '',itemId : 'btn_ztsx'},
			       {text : '时间刷新',iconCls: '',itemId : 'btn_sjsx'},
			       {text : '刷新',iconCls: '',itemId : 'btn_refresh',
			   	  				    handler:function(){
			   	  				    	me.store.loadPage(1);
			   	  				    }},
			       {text : '筛选',iconCls: 'page_find',itemId : 'btn_query'},
			       {text : '打印',iconCls: '',itemId : 'btn_print'}
			    ]
		     }],
		     items : [
		          {  
		          	 region: 'center',
		             xtype : 'grid',
		             itemId : 'grd_ArrivalRegister',
		             overflowY:'auto',
				     overflowX:'auto',
				     selModel:Ext.create('Ext.selection.CheckboxModel',{mode:'MULTI'}),
				     plugins: [{ptype: 'bufferedrenderer'}],
				     dockedItems:[{
			    		/*xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize :50,
			    		displayInfo:true*/
				     	xtype: 'component',
	                    itemId: 'status',
	                    tpl: '记录总数: {count}'
			    	  }],
			    	  features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }], 
					  columns:[
					  	{header : '打印',width:38,dataIndex: 'dybj' ,
				          renderer: erp.Util.Staterenderer,
				         summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }},
					  	{header : '中止',width:38,dataIndex: 'zzbj',renderer: erp.Util.Staterenderer},
					  	{header : '外协',width:38,dataIndex: 'wxbj',renderer: erp.Util.Staterenderer },
					  	{header : '加急',width:38,dataIndex: 'jjbj',renderer: erp.Util.Staterenderer },
					  	{header : '联退',width:38,dataIndex: 'gltk',renderer: erp.Util.Staterenderer },
					  	{header : '状态',width:60,dataIndex: 'ztbj',
					  	renderer : function(v){
					  	   if(v==1){return '到货'}
					  	   else if(v==2){return '已退'}
					  	   else if(v==3){return '已入'}
					  	   else if(v==4){return '<p style="font-size:12px;color:blue">待入</p>'}
					  	   else if(v==5){return '<p style="font-size:12px;color:red">待退</p>'}
					  	}},
					  	{header : '判定结论',width:65,dataIndex: 'jyjg',
					  	renderer : function(v){
					  	   if(v==1){return '待检'}
					  	   else if(v==2){return '<p style="font-size:12px;color:green">合格</p>'}
					  	   else if(v==3){return '<p style="font-size:12px;color:red">不合格</p>'}
					  	   else if(v==4){return '让步接收'}
					  	   else if(v==5){return '改为他用'}		
					  	}
					  	},
					  	{header : '到货单号',width:65,dataIndex: 'dhdh' },
					  	{header : '序号',width:50,dataIndex: 'dhxh' },
					  	{header : '委托单号',width:80,dataIndex: 'wtdh' },
					  	{header : '质检结论',width:65,dataIndex: 'zzjl' },
					  	{header : '质检单号',width:65,dataIndex: 'zjdh' },
					  	{header : '采计交期',width:80,dataIndex: 'wkjq',xtype:'datecolumn',format:'Y.m.d' },
					  	{header : '上线日期',width:80,dataIndex: 'sxrq',xtype:'datecolumn',format:'Y.m.d' },
					  	{header : '交货日期',width:80,dataIndex: 'jhrq',xtype:'datecolumn',format:'Y.m.d' },
					  	{header : '到货日期',width:120,dataIndex: 'dhrq',xtype:'datecolumn',format:'Y.m.d h:m' },
					  	{header : '入库日期',width:120,dataIndex: 'rksj',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '锁定时间',width:120,dataIndex: 'sdsj_rk',xtype:'datecolumn',format:'Y-m-d' },
					  	{header : '供应厂商',width:220,dataIndex: 'csmc' },
					  	{header : '材料货号',width:80,dataIndex: 'clhh' },
					  	/*{header : '事物特性',width:,dataIndex: 'plmtx' },*/
					  	{header : '材料名称',width:220,dataIndex: 'clmc' },
					  	{header : '规格尺寸',width:100,dataIndex: 'cltx1' },
					  	/*{header : '材料特性',width:,dataIndex: 'cltx1' },*/
					  	{header : '单位',width:45,dataIndex: 'jldw' },
					  	{header : '货位',width:80,dataIndex: 'hwbh' },
					  	{header : '生产批次',width:65,dataIndex: 'pcbh' },
					  	{header : '供货批次',width:65,dataIndex: 'ghpc' },
					  	{header : '到货数量',width:80,dataIndex: 'dhsl',
				      summaryRenderer: function(value, summaryData, dataIndex) {
				      	     var v = me.Sum.data.dhsl
					         return v!=0? Ext.util.Format.number(v,'0,000.00'):'';
					  }},
					  	{header : '辅助单位',width:70,dataIndex: 'fzdw' },
					  	{header : '辅助数量',width:80,dataIndex: 'fzsl' ,
				      renderer:function(v){if(v==0){return ' '}else{return v}},
				      summaryRenderer: function(value, summaryData, dataIndex) {
					         var v = me.Sum.data.fzsl    
					         /*console.log(value)
					         console.log(summaryData)
					         console.log(me.Sum)
					         console.log('1')*/
				      	     return v!=0? Ext.util.Format.number(v,'0,000.000'):'';
					  }},
					  	{header : '已入/已退',width:80,dataIndex: 'yrsl' ,
				      renderer:function(v){if(v==0){return ' '}else{return v}}},
					  	{header : '判断日期',width:80,dataIndex: 'zjrq',xtype:'datecolumn',format:'Y.m.d' },
					  	{header : '质检备注',width:180,dataIndex: 'zjbz' },
					  	{header : '待判原因',width:180,dataIndex: 'dpyy' },
					  	{header : '合同号',width:100,dataIndex: 'hth' },
					  	{header : '合同编号',width:100,dataIndex : 'htbh',hidden : true},
					  	{header : '合同序号',width:100,dataIndex : 'htxh',hidden : true},
					  	{header : '外协号',width:65,dataIndex: 'wxh' },
					  	{header : '外协单号',width:65,dataIndex: 'wxdh',hidden : true },
					  	{header : '外协序号',width:65,dataIndex: 'wxxh',hidden : true },
					  	{header : '计划号',width:100,dataIndex: 'jhh' },
					  	{header : '计划编号',width:100,dataIndex: 'jhbh',hidden : true},
					  	{header : '计划序号',width:100,dataIndex: 'jhxh',hidden : true},
					  	{header : '客户名称',width:160,dataIndex: 'khmc' },
					  	{header : '产品名称',width:160,dataIndex: 'cpmc' },
					  	{header : '产品编号',width:65,dataIndex: 'cpbh' },
					  	/*{header : '事物特性',width:,dataIndex: 'plmtx_cp' },*/
					  	{header : '主产品名称',width:160,dataIndex: 'zcpmc' },
					  	{header : '生产单号',width:100,dataIndex: 'jhbz' },
					  	{header : '送货单号',width:100,dataIndex: 'shdh' },
					  	{header : '制造日期',width:80,dataIndex: 'zzrq',xtype:'datecolumn',format:'Y.m.d' },
					  	{header : '备注说明',width:210,dataIndex: 'bzsm' },
					  	{header : '交库人名',width:70,dataIndex: 'jkrm' },
					  	{header : '票据日期',width:80,dataIndex: 'pjrq',xtype:'datecolumn',format:'Y.m.d' },
					  	{header : '中止人',width:70,dataIndex: 'zzrm' },
					  	{header : '中止时间',width:80,dataIndex: 'zzsj',xtype:'datecolumn',format:'Y.m.d' },
					  	{header : '操作员名',width:70,dataIndex: 'czym' },
					  	{header : '操作时间',width:80,dataIndex: 'czsj',xtype:'datecolumn',format:'Y.m.d' }
					  	],store : me.store
		          }
		     ]
          });
		me.callParent(arguments);
      }
})