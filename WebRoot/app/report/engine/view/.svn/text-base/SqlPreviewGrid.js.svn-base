Ext.define('erp.report.engine.view.SqlPreviewGrid', {
	extend : 'erp.ux.Panel',
	alias : 'widget.SqlPreviewGrid',
	layout:'fit',
	itemId:'sqlV',
	requires: ['erp.report.engine.view.CustomUtil',
	           'erp.report.engine.util.AnalysisFun'
	           ],
    uses: ['erp.report.engine.view.GridQueryStyle',
           'erp.report.engine.view.SupacnReportStyle',
           'erp.report.engine.view.SupcanTreeListStyle'],
	scroll : true,
	descs  : null,
	initComponent : function() {
		 var me = this;
		 me.descs = null;
		 Ext.apply(me,{
			 tbar: [
		          Ext.create('Ext.Action',{
			          text: '统计函数',
			          itemId: 'funTool',
			          handler: function(){
			         	 var p =  me.down('#alyfunpanel');
			         	 if(p.isHidden()){
			         		
			         		p.show(); 
			         	 }else{
			         		
			         		p.hide();
			         	 }
			          },
			          iconCls: 'func'
		          })
		     ],
		     title : 'SQL结果普通表格预览',
		     closable : true,
		     layout: {
	    	        type: 'vbox',
	    	        align:'stretch'
	    	 },
		     items : [{
		    	 xtype : 'panel',
		    	 hidden : true,
		    	 layout: {
		    	        type: 'hbox'
		    	 },
		    	 itemId: 'alyfunpanel',
		    	 border:false,
		    	 bodyPadding:'2 0 2 40',
		    	 defaults : {
			       	 margin: '0 0 0 45'
			      },
			     bodyStyle: 'background:#EFEFEF;',
		    	 items :[
	    	         {
	    			      fieldLabel : '统计目标',
	    			      xtype: 'combobox',
	    			      itemId: 'alytar',
	    			      queryMode: 'local',
	    			      valueField: 'code',
	    			      displayField: 'name'
    			     },
    			     {
	    				  fieldLabel : '统计函数',
	    				  xtype: 'combobox',
	    				  itemId: 'alyfun',
	    				  queryMode: 'local',
	    			      valueField: 'value',
	    			      displayField: 'name',
	    			      store: erp.AnalysisFun.getFunStyles()
    			     },{
						  fieldLabel : '图形类型',
						  xtype: 'combobox',
						  itemId: 'funstyle',
						  queryMode: 'local',
					      valueField: 'chartCode',
					      displayField: 'chartName',
					      store: erp.AnalysisFun.getDisplayStyle()
					 },{
						  xtype: 'button',
						  text: '确定',
						  itemId:'do_sure'
							 
				     }
		    	 ]
		     },
		     {
		    	 xtype : 'panel',
		    	 flex: 1,
		    	 autoScroll:true,
		    	 layout: {
		    	        type: 'fit'
		    	 },
		    	 itemId: 'sql_preview'
		     }]
	     })
	    me.callParent(arguments);
    },
    setDescs: function(dec){
    	this.descs = dec;
    }
 
});