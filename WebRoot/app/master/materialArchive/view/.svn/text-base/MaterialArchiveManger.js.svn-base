Ext.define('erp.master.materialArchive.view.MaterialArchiveManger',{
     extend: 'erp.ux.Panel',
     alias: 'widget.mng_MaterialArchiveManger',
     requires:['erp.ux.SelectField','erp.ux.CommonTrigger',
     'erp.view.master.caterialPrice.store.CaterialPriceArgument',
     'erp.master.materialArchive.store.ProductBufferrd'
     ],
	 listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	 },
      initComponent:function(){
		var me=this;
		me.csStore=Ext.create('erp.view.master.caterialPrice.store.CaterialPriceArgument');
	    me.csColumns=erp.Util.getColumns(me.csStore.getModel());
		me.store = Ext.create('erp.master.materialArchive.store.Material');
		me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
        me.argColumns=erp.Util.getColumns(me.argStore.getModel());
		me.proStore = Ext.create('erp.master.materialArchive.store.ProductBufferrd');
		me.proStore.on({
		    'load':function(s,recs){
		      var grid = me.down('#grd_Product');
		      grid.getSelectionModel().deselectAll();
		      if(recs.length>0){
		         grid.view.bufferedRenderer.scrollTo(-1, true);
		      }else{
					grid.getStore().removeAll();
			  }
		    }
		})
		me.planStore = Ext.create('erp.master.materialArchive.store.Plan');
		me.cpStore  = Ext.create('erp.master.materialArchive.store.CtrlPrice');
		me.hisStore = Ext.create('erp.master.materialArchive.store.HisPrice');
		me.jgcsStore  = Ext.create('erp.master.materialArchive.store.PriceParameter');
		me.can_use_btn=true;
	    Ext.apply(me.store.proxy.extraParams,{usePaging:true});
	    Ext.apply(me,{
	       layout:{
	          type : 'border',
	          padding : 2
	       },
	       dockedItems: [{
	           xtype: 'toolbar',
			   dock: 'top',
			   itemId: 'function_btn',
			   items:[
			  /* {text : '添加', iconCls:'page_add', itemId:'btn_add',disabled : false},*/
			   {itemId: 'search',  emptyText:'输入材料名称或编号',xtype:'commonTrigger',
			   name: 'clmc', collapsible:true, selModel:'SINGLE', win:'erp.view.master.purchaseDetail.window.MateCombo'
			   },
			   {text : '定位',iconCls:'query',itemId:'btn_pos',disabled : false,
			       handler: function(btn){
			         me.store.loadPage(1,{
			             params : {
			                 search:me.down('#search').getValue()  
			             }
			         });
			       }
			   },
			   {text: '重置', iconCls:'refresh_backwards',  handler:function(){
   	  		   me.down('#search').setValue("");me.store.loadPage(1);}},
			   {text : '筛选',glyph:0xf002,itemId:'btn_query',disabled : false},
			   {text : '审批',iconCls:'email_edit',itemId:'btn_appro',disabled : true},
			   {text : '历史记录',iconCls:'',itemId:'btn_his',disabled : false},
			   {text : '批量修改',iconCls:'page_edit',itemId:'btn_batch',disabled : false},
			   {text : '价格参数',iconCls:'',itemId:'btn_price',disabled : false},
			   {text : '刷新',iconCls:'refresh_backwards',itemId:'btn_batch',
			     handler:function(){me.store.loadPage(1);}},
			   {text : '批量修改',iconCls:'page_edit',itemId:'btn_batch',disabled : false}
			   ]
	       }],
	       items: [
	        { xtype:'treepanel',
	    			region:'west',
	    			reference:'caterialclass',
	    			collapsible:true,//可伸缩
	    			width:200,
	    			split:true,
	    			store : Ext.create('erp.master.caterialPricePurchase.store.MaterialClass',{autoLoad:true})
	    	        ,listeners : {
	    	             'itemclick':function(t,rec){
	    	                var lbbh = rec.get('nodeId');
	    			  		/*var czygh = erp.UInfo.currentUser.u_id;*/
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
	    	  region: 'center',
	    	  xtype : 'grid',
	    	  itemId : 'grd_MaterialArchive',
	    	  overflowY:'auto',
			  overflowX:'auto',
			  selModel:Ext.create('Ext.selection.CheckboxModel'),
			dockedItems:[{
			   		xtype : 'pagingbar',
			   		stateId : "pagingbar"+Ext.id(),
			   		store:me.store,
			   		dock:'bottom',
			   		defaultPageSize : 50,
		    		displayInfo:true
	  	       	  }],
	  	     columns:[
	  	     	{header : '审批',width : 38 ,dataIndex:'spbj',
			    	     renderer: erp.Util.Staterenderer    },
	  	     	{header : '安全量',width : 50 ,dataIndex: 'aqlbj',
			    	     renderer: erp.Util.Staterenderer    },
	  	     	{header : '材料类别',width :80,dataIndex: 'lbmc'},
	  	     	{header : '材料货号',width :70,dataIndex: 'clhh'},
	  	     	{header : '材料名称',width :420 ,dataIndex: 'clmc',	
	  	     	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }
	  	     	},
	  	     	{header : '计量单位',width :70 ,dataIndex: 'jldw'},
	  	     	{header : '辅助转换系数',width :80,dataIndex: 'zhxs',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '辅助单位',width :80 ,dataIndex: 'fzdw'},
	  	     	{header : '主体转换系数',width :110 ,dataIndex: 'zzhxs',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '转换类型',width :70 ,dataIndex: 'fzzbj',
	  	     	renderer: function(v){
	  	     	   if(v==0){
	  	     	      return '';
	  	     	   }else if(v==1){
	  	     	      return '固定公式';
	  	     	   }else if(v==2){
	  	     	      return '浮动系数';
	  	     	   }else if(v==3){
	  	     	      return '固定系数';
	  	     	   }
	  	     	}},
	  	     	{header : '原始货号',width :90 ,dataIndex: 'yshh'},
	  	     	{header : '原始名称',width :420 ,dataIndex: 'ysmc'},
	  	     	{header : '质检',width : 50 ,dataIndex: 'zjbj',
			    	     renderer: erp.Util.Staterenderer    },
	  	     	{header : '合同',width : 50 ,dataIndex: 'cgbj',
			    	     renderer: erp.Util.Staterenderer    },
	  	     	{header : '半成品',width : 75 ,dataIndex: 'bcpbj',
			    	     renderer: erp.Util.Staterenderer    },
	  	     	{header : '零库存',width : 75 ,dataIndex: 'lkcbj',
			    	     renderer: erp.Util.Staterenderer  },
	  	     	{header : '异型',width : 50 ,dataIndex: 'yxbj',
			    	     renderer: erp.Util.Staterenderer  },
	  	     	{header : '最新单价',width :80,dataIndex: 'cbdj'},
	  	     	{header : '计划单价',width :80,dataIndex: 'jhdj'},
	  	     	{header : '控制单价',width :80,dataIndex: 'kzdj'},
	  	     	{header : '最低采购量',width :90 ,dataIndex: 'zdcgl',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '最小包装量',width : 90,dataIndex: 'zxbzl',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '超购率',width : 60,dataIndex: 'cgbl',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	        {header : '余量率',width : 60,dataIndex: 'ylbl',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '损耗率',width :60 ,dataIndex: 'shbl'},
	  	     	{header : '有效期',width :70 ,dataIndex: 'yxqx',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '打样周期',width :70 ,dataIndex: 'dyzq'},
	  	     	{header : '供货周期',width :70 ,dataIndex: 'ghzq'},
	  	     	{header : '采购提前期',width :90 ,dataIndex: 'cgtqq'},
	  	     	{header : '生产用时',width : 80,dataIndex: 'scys',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '月耗用量',width : 80,dataIndex: 'yhyl',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '标准系数上限',width : 100,dataIndex: 'bzxssx',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '标准系数下限',width : 100,dataIndex: 'bzxsxx',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '周长或面积',width : 80,dataIndex: 'clzc',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '采购组',width :80,dataIndex: 'cgzm'},
	  	     	{header : '采购员名',width :80,dataIndex: 'cgyxm'},
	  	     	{header : '申请人名',width :80,dataIndex: 'sqrm'},
	  	     	{header : '操作员名',width :65,dataIndex: 'czym'},
	  	     	{header : '操作日期',width :80,dataIndex: 'czsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	  	     	{header : '转换公式',width :100 ,dataIndex: 'zhgsmc'},
	  	     	{header : '特性规则',width : 100,dataIndex : 'txgzmc'},
	  	     	{header : '应用公式',width : 100,dataIndex : 'yygsmc'},
	  	     	{header : '圆整位数',width :80 ,dataIndex: 'yzws',
	  	     	renderer:function(v){if(v==0){return ' '}else{return v}}},
	  	     	{header : '单价圆整',width :70 ,dataIndex: 'djyz'},
	  	     	{header : '审批人',width :70,dataIndex: 'sprm'},
	  	     	{header : '审批时间',width :80 ,dataIndex: 'spsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	  	     	{header : '归档人',width :70 ,dataIndex: 'gdrm'},
	  	     	{header : '归档时间',width :80 ,dataIndex: 'gdsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'}
	  	     	],
	  	     store : me.store	
	    	},{
	    	region : 'south', 	
	    	xtype : 'tabpanel',
	       /* height : 300,*/
	        split:true,
	    	flex :3,
	    	items : [{
	    	   title: '引用产品',
	    	   split : true,
	    	   /*overflowY:'auto',
			   overflowX:'auto',*/
	    	   items : [{
	    	      xtype : 'grid',
	    	      itemId : 'grd_Product',
	    	      height : 280,
				  selModel:Ext.create('Ext.selection.CheckboxModel'),
				  plugins: [{ptype: 'bufferedrenderer'}],
				  columns : [
				  {header :'更改单号',width : 80,dataIndex : 'ggdh',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
				  {header :'版本编号',width : 80,dataIndex : 'bbbh'},
				  {header :'产品编号',width : 100,dataIndex : 'cpbh'},
				  {header :'产品名称',width : 300,dataIndex : 'cpmc'}
				  ],
				  store : me.proStore
	    	   }]
	    	 },{
	    	   title : '引用计划',
	    	   split : true,
	    	   height : 300,
	    	   overflowY:'auto',
			   overflowX:'auto',
	    	   items : [{
	    	     xtype : 'grid',
	    	     columns : [
	    	      {header : '完成',width : 38,dataIndex : 'wcbj' ,renderer: erp.Util.Staterenderer},
	    	      {header : '签发',width : 38,dataIndex : 'qfbj' ,renderer: erp.Util.Staterenderer},
	    	      {header : '锁定',width : 38,dataIndex : 'sdbj' ,renderer: erp.Util.Staterenderer},
	    	      {header : '计划类别',width :80,dataIndex : 'jhlbmc'},
	    	      {header : '计划号',width :80,dataIndex : 'jhh'},
	    	      {header : '上线日期',width :80,dataIndex : 'sxrq',xtype:'datecolumn',format:'Y-m-d'},
	    	      {header : '完成日期',width :80,dataIndex : 'wcrq',xtype:'datecolumn',format:'Y-m-d'},
	    	      {header : '生产单号',width :80,dataIndex : 'jhbz'},
	    	      {header : '产品编号',width :80,dataIndex : 'cpbh'},
	    	     /* {header : '事物特性',width : ,dataIndex : 'plmth'},*/
	    	      {header : '产品名称',width :220 ,dataIndex : 'cpmc'},
	    	      {header : '材料特性1',width :120 ,dataIndex : 'cltx1'},
	    	      {header : '客户名称',width : 160,dataIndex : 'khmc'},
	    	      {header : '单位',width : 50,dataIndex : 'jldw'},
	    	      {header : '计划数量',width :70 ,dataIndex : 'jhsl'},
	    	      {header : '计划用量',width :70 ,dataIndex : 'jhyl'},
	    	      {header : '主产品名称',width : 220,dataIndex : 'zcpmc'},
	    	      {header : '操作日期',width : 80,dataIndex : 'czsj',xtype:'datecolumn',format:'Y-m-d'}
	    	     ],
	    	     store : me.planStore
	    	   }]
	    	 },{
	    	 	title : '控制价格',
	    	 	split : true,
	    	    height : 300,
	    	    overflowY:'auto',
			    overflowX:'auto',
	    	    items : [{
	    	       xtype : 'grid',
	    	       columns : [
	    	       {header : '审批',width : 60 ,dataIndex : 'spbj',renderer: erp.Util.Staterenderer},
	    	      /* {header : '所属用户',width :80 ,dataIndex : 'yhbh'},*/
	    	       {header : '采购类别',width :80 ,dataIndex : 'cglbmc'},
	    	       {header : '厂商编号',width :80 ,dataIndex : 'csbh'},
	    	       {header : '厂商名称',width :300,dataIndex : 'csmc'},
	    	       {header : '单位',width :60 ,dataIndex : 'jldw'},
	    	       {header : '控制单价',width :80 ,dataIndex : 'kzdj',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    	       {header : '起始生效',width : 100,dataIndex : 'qssxsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	    	       {header : '截止生效',width : 100,dataIndex : 'jzsxsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	    	       {header : '辅助单位',width : 60,dataIndex : 'fzdw'},
	    	       {header : '辅助控价',width :80 ,dataIndex : 'fzkj',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    	       {header : '币种',width : 80,dataIndex : 'wbmc'},
	    	       {header : '供货周期',width : 80,dataIndex : 'ghzq',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    	       {header : '最低采购量',width : 80,dataIndex : 'zdcgl',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    	       {header : '最小包装量',width : 80,dataIndex : 'zxbzl',
				      renderer:function(v){
				      if(v==0){
				      return ' '
				      }else{
				      return v
				      }}},
	    	       {header : '厂商型号',width : 80,dataIndex : 'csxh'},
	    	       {header : '备注说明',width : 200,dataIndex : 'bzsm'},
	    	       {header : '操作人名',width :80 ,dataIndex : 'czym'},
	    	       {header : '操作时间',width :100 ,dataIndex : 'czsj',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	    	       {header : '审批人',width :80 ,dataIndex : 'sprm_kj'},
	    	       {header : '审批时间',width :100 ,dataIndex : 'spsj_kj',
	    			   	xtype:'datecolumn',format:'Y-m-d'}
	    	       ],
	    	       store : me.cpStore
	    	    }]
	    	 },{
	    	 	title : '历次单价',
	    	 	split : true,
	    	    height : 300,
	    	    overflowY:'auto',
			    overflowX:'auto',
	    	    items : [{
	    	       xtype : 'grid',
	    	       columns : [
	    	       {header : '启用日期',width:120,dataIndex: 'jlrq',
	    			   	xtype:'datecolumn',format:'Y-m-d'},
	    	       {header : '控制单价',width:120,dataIndex: 'kzdj'},
	    	       {header : '辅助单价',width:120,dataIndex: 'fzdj'}
	    	       ],
	    	       store : me.hisStore
	    	    }]
	    	 },{
	    	   title : '价格参数',
	    	   split : true,
	    	   height : 300,
	    	   overflowY:'auto',
			   overflowX:'auto',
			   tbar:[
			   {text: '添加',glyph:0xf055,itemId:'btn_jgcs_add',disabled:false},
			   {text: '编辑',itemId:'btn_jgcs_edt',disabled:false},
			   	{text: '删除',glyph:0xf014,itemId:'btn_jgcs_del',disabled:false},
			   {text: '保存',glyph:0xf0c7,itemId:'BTN_SAVE',disabled:false}
			   ],
	    	    items : [{
	    	       xtype : 'grid',
	    	       itemId : 'grd_Jgcs',
	    	       columns : [
	    	       {header: '序号',width:40,dataIndex : 'jlxh'},
	    	       {header : '参数名称',width:150 ,dataIndex: 'csmc'/*,editor:{
	    	       xtype:'selectfield',
				   openconfig:{
					modal:true,
					title:'参数选取',
					singleSelect:true,
					editable:true,
					diaplayField:'csbh',
					valueField:'csbh',
					insert:true,
					width:500,
					height:600,
					columns:me.csColumns,
					store:me.csStore
				}
	    	       }*/},
	    	       {header : '参数值',width:120 ,dataIndex: 'gscs',editor:{}},
	    	       {header : '厂商名称',width:400 ,itemId : 'csmc',dataIndex: 'gycsmc'/*,field:{
	    	          xtype : 'selectfield',  openconfig:{
					       modal:true,
					       title:'参数选取',
					       singleSelect:true,
					       editable:true,
					       diaplayField:'csmc',
					       valueField:'csmc',
					       idKey:true,
					       insert:true,
					       width:500,
					       height:600,
					       columns:me.argColumns,
					       store:me.argStore
				       }
	    	       }*/}
	    	       ],
	    	       store : me.jgcsStore,
	    	       plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        editable : !me.canedit,
							        autoCancel: false,
							        itemId:'cellEditing'
				        })
	    	    }]
	    	 }]
	    	}
	       ]
	    });
	       me.callParent(arguments); 
   }
})