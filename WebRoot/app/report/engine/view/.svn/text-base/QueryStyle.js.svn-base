Ext.define('erp.report.engine.view.QueryStyle', {
	alias : 'widget.queryStyle',
	extend : 'erp.ux.Panel',
	layout:'fit',
	requires: ['erp.report.engine.view.CustomUtil',
	           'erp.report.engine.util.AnalysisFun'
	           ],
    uses: ['erp.report.engine.view.GridQueryStyle',
           'erp.report.engine.view.SupacnReportStyle',
           'erp.report.engine.view.SupcanTreeListStyle',
           'erp.report.engine.view.TemplateDesigner'],

	scroll : true,
	statics: {
		defaultStyle : 'gridQueryStyle',
		/**
		 * 展示的种类，新增展示的类是在这里添加
		 * name 名称，value:widget
		 */
		styles : [
		    {name:'普通表格',value:'gridQueryStyle'},
		    {name:'电子表格',value:'supacnReportStyle'},
		    {name:'树列表',value:'supcanTreeListStyle'},
		    {name:'模板报表',value:'dc_tpldesigner'}
		],
		/**
		 * 给外部提供展示的种类
		 */
		getStyles : function(){
			 var me = this;
			  return Ext.create('Ext.data.Store',{
		    	      	fields: ['name', 'value'],
				    	data : me.styles
		             });
		},
		/**
		 * 判断是否有这种展示类型，没有使用默认展示类型
		 */
		getDisplayStyle : function(style){
			var me = this;
			var styles = me.styles;
			var result = 'widget.'+me.defaultStyle;
			for(var i=0;i<styles.length;i++){
				if(style == styles[i]['value']){
					result = 'widget.'+style;
					break;
				}
			}
			return result;
		},
		/**
		 * 从后台取数据，只适用于表单设置的报表查询
		 */
        createStyle : function(url,param,descs,style,customQueryId){
        	var me = this;
        	style = me.getDisplayStyle(style);
        	me.displayStyle(url,style,param,descs,customQueryId);
        },
        //打开一张查询报表
        openReport: function(rec){
			var me = this;
			if(rec){
				var tab = erp.Util.addContentTab({
					xtype: 'dc_tpldesigner',
					itemId: Ext.id(),
					title: rec.get('name')+' 报表',
					tplRec: rec,
					closable: true
				   });
				}
		},       
        
        /**
         * 将数据直接展示
         * data：展示的数据
         * descs：展示数据的字段（json节点）信息
         * 
         */
        createStyleByData : function(data,descs,style,customQueryId){
        	var me = this;
        	 var mypanel;
        	 style = me.getDisplayStyle(style);
        	 mypanel = me.makeStylePanelByData(style,data,descs,customQueryId);
        	 if(me.displayPanel) {
 				erp.Util.closeContentTab(me.displayPanel);
 			}
 		    me.displayPanel = erp.Util.addContentTab(mypanel);
        },
        displayStyle : function(myurl,style,param,descs,customQueryId){
    		var me = this;
    	    var myparams = {
    	        data: Ext.JSON.encode(param.data),
    	        tables: Ext.JSON.encode(param.tables),
    	        cdtions: Ext.JSON.encode(param.cdtions)
    	    };
    	    var mypanel;
    	    mypanel = me.makeStylePanel(style,myurl,descs,myparams,customQueryId);
		    if(me.displayPanel) {
				erp.Util.closeContentTab(me.displayPanel);
			}
    		 me.displayPanel = erp.Util.addContentTab(mypanel);
    	},
    	makeStylePanel : function(str,myurl,descs,myparams,customQueryId){
    		
    		return Ext.create(str,{
    			itemId: 'CustomReportResult',
    			url: myurl,
    			descs: descs,
    			param: myparams,
    			customQueryId: customQueryId
            });
    	},
    	makeStylePanelByData : function(str,data,descs,customQueryId){
    		return Ext.create(str,{
    			itemId: 'CustomReportResult',
    			data: data,
    			descs: descs,
    			customQueryId: customQueryId
            });
    	},
    	isBindFuc : {
    		report:false,
    		tree:false
    	}
    },
	initComponent : function() {
		 var me = this;
		 for(var i=0;i<me.descs.length;i++){
	    	 me.descs[i].ffName = me.descs[i].ftName+'_'+me.descs[i].ffName;
	    	}
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
		     title : '自定义查询结果',
		     closable : true,
		     layout: {
	    	        type: 'vbox',
	    	        align:'stretch'
	    	 },
		     items : [{
		    	 xtype : 'panel',
		    	 layout: {
		    	        type: 'hbox'
		    	 },
		    	 hidden : true,
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
    			      valueField: 'ffName',
    			      displayField: 'cusName',
    			      store: Ext.create('Ext.data.Store', {
    						fields : [
    	       			            'ffName',
    				     				'ftName',
    				     				'cusName',
    				     				'codeType',
    				     				'condition',
    				     				'datatype'
    	       			          ],
    						data : me.descs
    					})
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
					  handler:function(){
					    	var alytar =  me.down('#alytar').getValue();
					    	var alyfun =  me.down('#alyfun').getValue();
					    	var funstyle = me.down('#funstyle').getValue();
					    	
					    	var charPanel = erp.AnalysisFun.callAndDisplay(alyfun,funstyle,me.tarStore,alytar);
					    	
					    	var portlet_type = 'customQueryChartPortlet';
					    	var portlet_class = 'erp.oa.view.CustomQueryChartPortlet';
					    	var mybuttons = [];
					    	if(me.customQueryId){
					    		mybuttons.push(
			    				{text: '保存为桌面',
	    			             handler:function(){
	    			            	 Ext.Ajax.request({
	    									url: 'oa/OA.do?method=getPortalConfig',
	    									params: {
	    										user_code: erp.Util.currentUser.loginId
	    										//portlet_type : portlet_type
	    									},
	    									success: function(response) {
	    										var obj = Ext.JSON.decode(response.responseText);
	    										var portlets = obj.data;
	    										var col = 0;
	    										var row = 0;
	    										for(var i=0;i<portlets.length;i++){
	    											if(portlets[i].row > row){
	    												row = portlets[i].row;
	    												col = portlets[i].col;
	    											}else if(portlets[i].row == row){
	    												col = (portlets[i].col>col)?portlets[i].col:col;
	    											}
	    										}
	    										if(col==2){
	    											col = 0;
	    											row+=1;
	    										}else{
	    											col+=1;
	    										}
	    										 Ext.Ajax.request({
	    		    									url: 'oa/OA.do?method=addPortalConfig2',
	    		    									params: {
	    		    									   user_code : erp.Util.currentUser.loginId,
    		    										   portlet_type : portlet_type,
    		    										   portlet_class : portlet_class,
    		    										   row : row,
    		    										   col : col,
    		    										   params : Ext.JSON.encode({
    		    											   queryId:me.customQueryId,
    		    											   field:alytar,
    		    											   funType:alyfun,
    		    											   display:funstyle})
	    		    									},
	    		    									success: function(response) {
	    		    									    Ext.Msg.alert('提示','保存成功');
	    		    							    	}				
	    		    							    });		 
	    							    	}				
	    							    });		  
                                 }
                                });
					    	}
					    	
					        Ext.create('Ext.window.Window',{
			        			  height: 400,
			      			      width: 500,
			      			      border: false, 
			      			      layout: {
			      			        type: 'fit'
			      			      },
			        			  items: charPanel,
			        			  buttons: mybuttons
			      			}).show();
					     }
				  }
		    	 ]
		     }]
	     })
	    me.callParent(arguments);
		me.initTool();
		me.doResult();
    },
    //对工具栏进行处理
    initTool : function(){
    	var me = this;
    	var toolConfig = me.toolConfig;
    	if(toolConfig&&toolConfig.length>0){
    		for(var i=0;i<toolConfig.length;i++){
    			me.down("#"+toolConfig[i]).hide();
    		}
    	}
    },
    //进行后续处理
    doResult : function(){
    	var me = this;
    	if(me.url){
    	   erp.CustomUtil.customQuery(me.url,me.param,me.descs,me.myCallBack,me);
    	}else{
    		me.myCallBack(me.data,me.descs,me,true);
    	}
    },
    /**
     * 子类在这里添加对报表查询结果的处理
     * @param recs 报表查询结果
     * @param descs 查询的字段信息
     * @param 指当前类
     */
    myCallBack : function(recs,descs,me){
    	
    }
})