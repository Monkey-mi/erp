Ext.define('erp.common.basic.view.helpwin.CodeConfigHelp',{
    extend:'erp.common.basic.view.helpwin.BaseHelpWin',
    alias:'widget.code_config_help',
    width : 500,
	height: 0.6*window.screen.height,
	resizable : false,
	iconCls:'box',
	title:'基础数据帮助',
	modal : true,
    initComponent:function(){
    	var me=this;
    	me.store=Ext.create('erp.common.basic.store.CodeConfigs');
    	me.store.load();
    	Ext.apply(me,{
    	    items:[
    	       {
    	        xtype:'panel',
				layout:'fit',
				tbar:[
				      '关键字', 
	                  {
				    	  xtype : 'textfield',
							itemId : 'searchfield',	
							hiddenLabel : true,
							 enableKeyEvents :true,
							listeners:{
								keyup:me.onKeyup
							}
						}, {
							xtype : 'button',
							text : '搜索',
							itemId:'search'
						}, {
							xtype : 'button',
							text : '刷新'
						}, {
							xtype : 'checkbox',
							boxLabel : '结果中搜索',
							itemId:'resultsearch'
						}, {
							xtype : 'checkbox',
							boxLabel : '显示过滤行',
							itemId:'showFilter'
						}
				      ],
				      items:[
				      {
				      	xtype:'grid',
				      	store:me.store,
				      	columns:[
				      	{
				      	text:'代码',
				      	dataIndex:'code',
				      	flex:1
				      	},
				      	{
				      	 text:'名称',
				      	 dataIndex:'name',
				      	 flex:1
				      	},
				      	{
				      	 text:'类型',
				      	 dataIndex:'type',
				      	 flex:1
				      	},
				      	{
				      	 text:'显示值',
				      	 dataIndex:'displayField',
				      	 flex:1
				      	},
				      	{
				      	 text:'回填值',
				      	 dataIndex:'valueField',
				      	 flex:1
				      	}
				      	],
				      	dockedItems:[{
			    		xtype:'pagingtoolbar',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    		
			    	}]
				      }
				      ]
    	       }
    	    ]
    	});
    	me.callParent(arguments);
    }
});