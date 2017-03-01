Ext.define('erp.materialDistributeAccount.view.MaterialAccountManager', {
	extend: 'erp.ux.Panel',
	alias: 'widget.mng_MaterialDisAccount',
	requires: ['erp.ux.SelectField'],
	layout: {
       type: 'border',padding : 2
    },
    modal : true,
    initComponent: function () {
    	var me = this;
        me.store = Ext.create('erp.materialDistributeAccount.store.MaterialAccountManager');
        me.treeStore = Ext.create('erp.view.master.purchaseDetail.store.MaterialCateTree');
        me.detailStore = Ext.create('erp.materialDistributeAccount.store.MaterialAccountDetail');
        Ext.apply(me,{
        	layout:'border',
        	items:[
        		{
        		width:200,
		  		region:'west',
				split:true,
				title: '类别',
				tools:[
			           {type:'refresh',tooltip:'刷新'}
			    ],
			    collapsible:true,
	  			xtype:'treepanel',
	   	  	  	itemId:'tree_materialClass',
	   	  	  	width:200,
		    	useArrows: true,
		    	store:me.treeStore,
		    	listeners:{
	    			 afteritemexpand:function(t){
	    			 	var tree=me.down('#tree_materialClass');
	    			 	if(!t.data.root){
	    			 		var root=t.parentNode;
	    			 		tree.collapseNode(root);
	    			 		tree.expandNode(root);
	    			 	}
	    			 }
	    		}
        		},{
        		xtype:'grid',
	   	  	  	itemId:'grid_materialAccount',
	   	  	  	region:'center',
	   	  	  	flex:2,
	   	  	  	split:true,
	   	  	  	store:me.store,
	   	  	  	dockedItems:[{xtype:'toolbar',dock:'top',itemId:'top_bar',
	   	  	  		items:[
	   	  	  		{
                        xtype: 'textfield',
                        itemId: 'search',
                        fieldLabel: '综合查询',
                        emptyText: '材料货号或材料名称搜索...',
                        allowBlank:false,
                        enableKeyEvents: true,
                        labelWidth: 80,
                        width: 300
                                },
                                {
                                    text: '查询',
                                    glyph: 0xf002,
                                    itemId: 'btn_search2'
                                },"-",
	   	  	  		/*{text:'定位',itemId:'btn_load',glyph : 0xf016,handler:function(){}
	   	  	  	    },*/{text: '刷新',iconCls: 'refresh_backwards',handler: function () {me.store.loadPage(1);}
	   	  	  	    },/*{text:'筛选',itemId:'btn_search',iconCls: 'page_find'},*/
	   	  	  	    {text: '退出',iconCls: '',itemId: 'btn_out',handler: function () {me.close();}}]
	   	  	  	},{
		    		xtype : 'pagingbar',
                    stateId : "pagingbar"+Ext.id(),
		    		store:me.store,
		    		dock:'bottom',
		    		displayInfo:true
			    	 }],
			    listeners : {
			    	selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.loadDetail(recs[0]);
							} 
						}
			    },
			    features : [{
								ftype : 'summary',
								summaryType : 'count',
								dock : 'bottom'
							}],
				selModel:Ext.create('Ext.selection.CheckboxModel',{
								mode:'SINGLE'//单选模式
				}),
	   	  	  	columns:[
	   	  	  	   {header: '材料货号',dataIndex: 'clhh',width:100,
	   	  	  	   sumaryType : 'count',
					summaryRenderer : function(value,summaryData, dataIndex) {
						return '合计';
					}},
	   	  	  	   {header: '材料货号',dataIndex: 'plmth',width:100,hidden:true},
	   	  	  	   {header: '事物特性',dataIndex: 'plmtx',width:100,hidden:true},
	   	  	  	   {header: '材料名称',dataIndex: 'clmc',width:200},
	   	  	  	   {header: '规格尺寸',dataIndex: 'cltx1',width:100},
	   	  	  	   {header: '材料特性2',dataIndex: 'cltx2',width:100,hidden:true},
	   	  	  	   {header: '材料特性3',dataIndex: 'cltx3',width:100,hidden:true},
	   	  	  	   {header: '单位',dataIndex: 'jldw',width:100},
	   	  	  	   {header: '库存数量',dataIndex: 'kcsl',width:100,
	   	  	  	   renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	    summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}},
	   	  	  	   {header: '其中废次品',dataIndex: 'kcsl_fcp',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}},
	   	  	  	   {header: '可用库存',dataIndex: 'kykc',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}},
	   	  	  	   {header: '待检数量',dataIndex: 'djsl',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}},
	   	  	  	   {header: '待入数量',dataIndex: 'drsl',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}},
	   	  	  	   {header: '待退数量',dataIndex: 'dtsl',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}}
	   	  	  	]
        		},{
        		xtype:'grid',
        		itemId:'grid_materialAccount_detail',
        		region:'south',
        		flex:1,
	   	  	  	split:true,
	   	  	  	store:me.detailStore,
	   	  	  	features : [{
								ftype : 'summary',
								summaryType : 'count',
								dock : 'bottom'
							}],
	   	  	  	columns:[
	   	  	  	{header: '仓库名称',dataIndex: 'ckbh',width:100,hidden:true},	
	   	  	  	{header: '仓库名称',dataIndex: 'ckmc',width:100,sumaryType : 'count',
					summaryRenderer : function(value,summaryData, dataIndex) {
						return '合计';
					}},
	   	  	  	{header: '库存数量',dataIndex: 'kcsl',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}
			    },
	   	  	  	{header: '其中废次品',dataIndex: 'kcsl_fcp',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}},
	   	  	  	{header: '可用库存',dataIndex: 'kykc',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}},
	   	  	  	{header: '待检数量',dataIndex: 'djsl',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}},
	   	  	  	{header: '待入数量',dataIndex: 'drsl',width:100,renderer: function(value){
		   	  	  	var newValue;
			        if (value == 0) {
			           newValue = '';
			        }else{
			        	newValue = value;
			        }
			        return newValue;
			       },
	   	  	  	   summaryType : 'sum',
					summaryRenderer : function(value,
							summaryData, dataIndex) {
						return Ext.util.Format.number(value,
								'0,000.00');
					}}
	   	  	  	]
        		}
        	]
        });
        me.callParent(arguments);
    },
    loadDetail:function(rec){
    	var me =this;
    	if(rec!=null){
    		Ext.apply(me.detailStore.proxy.extraParams, {'clhh':rec.get('clhh'),'cltx1':rec.get('cltx1'),'cltx2':rec.get('cltx2'),'cltx3':rec.get('cltx3')});
			me.detailStore.loadPage(1);
		}
    }
})