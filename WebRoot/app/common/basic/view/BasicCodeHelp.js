/**
 * 基础数据帮助
 */
Ext.define('erp.common.basic.view.BasicCodeHelp', {
	extend : 'erp.ux.Window',
	alias : 'widget.basic_codehelp',
	title : '信息帮助窗口',
	
	requires:['erp.setup.store.Ddlstcol'],
	width : 650,
	height: 0.6*window.screen.height,
	resizable : false,
	modal : true,
/*	buttons : [ {
		text : '确定',
		iconCls : 'page_saveIcon',
		action : 'ACT_SAVE'
	}, {
		text : '退出',
		iconCls : 'page_cancelIcon',
		action : 'ACT_CLOSE'
	} ],*/
/*	listeners : {
		show : function() {
			//为了兼容IE浏览器,此处只能延后10ms以后执行才有效
			Ext.create('Ext.util.DelayedTask', function() {
				Ext.getCmp('').focus(false);
			}).delay(20);
		}
	},*/
	doInit : function() { 
	},
	initComponent : function() {
		var me=this;
		me.store=Ext.create('erp.setup.store.Codes',{
			  proxy: {
			        type: 'ajax',
			        actionMethods : {  
                        create : 'POST',  
                        read : 'POST',  
                        update : 'POST',  
                        destroy : 'POST'  
                    }, 
			        extraParams:{
			        	usePaging:true
			        },
			        api: {
						create: 'main/Codes.do?method=addCode',
						update: 'main/Codes.do?method=updateCode',
						read:	'main/Codes.do?method=getCodeList',
						destroy:'main/Codes.do?method=deleteCode'
					},
			        reader: {
						type: 'json',
						rootProperty: 'data',
						totalProperty:'total',
						messageProperty: 'message'
					},
					writer: {
						type: 'json',
						rootProperty: 'data',    //提交数据可以用{data:[xxx]}的形式包装
						encode: true,    //数据经过encode后提交,形式为post_data=XXXXX
						                 //后台需要用post_data为参数名提取后再解释为JSON
						allowSingle:false  /*即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了*/
					}
			    }
		});
		me.store.proxy.extraParams['type_code']=me.type_code;
		me.selModel=null;
		if(me.multiSelect){
			me.selModel=Ext.create('Ext.selection.CheckboxModel');
		}
		me.store.load({
			params:{
				mode:'Screening',
				type_code:me.type_code
			}
		});
		Ext.apply(this, {
			items : [{
				xtype:'panel',
				layout:'fit',
				tbar:[
              '关键字', 
                {
	                xtype : 'textfield',
									itemId : 'searchfield',
									enableKeyEvents :true,
									hiddenLabel : true,
									listeners:{
								  keyup:me.onKeyup
								}
					}, {
						xtype : 'button',
						text : '搜索',
						listeners:{
							click:me.searchClick
						}
					}, {
						xtype : 'button',
						text : '刷新',
						listeners:{
							click:me.refreshClick
						}
					}, {
						xtype : 'checkbox',
						boxLabel : '结果中搜索',
						itemId:'resultsearch'
					}, {
						xtype : 'checkbox',
						boxLabel : '显示过滤行',
						itemId:'showFilter'
					}],
				items:[
				      {layout:'border',
				    	items:[
				    	         {
				    	    region:'north',
				    	    xtype:'radiogroup',
				    	    flex:2,
			                layout:'column',
			                itemId:'radio',
			                hidden:true,
				            vertical: true,
				    	    items:[
									{
										boxLabel:'不分类', columnWidth: 1/4,checked:true,code:"",
										name:'aa',inputValue:'0',
											 listeners:{
												 change:me.checkChange
											 }
									},
									{
										boxLabel:'代码类型', columnWidth: 1/4,code:"type_code",
										name:'aa',inputValue:'1',
											 listeners:{
												 change:me.checkChange
											 }
									},
									{
										boxLabel:'编码', columnWidth: 1/4,code:"code",
										name:'aa',inputValue:'2',
											 listeners:{
												 change:me.checkChange
											 }
									},
									{
										boxLabel:'代码名称', columnWidth: 1/4,code:"name",
										name:'aa',inputValue:'3',
											 listeners:{
												 change:me.checkChange
											 }
									},
									{
										boxLabel:'代码值', columnWidth: 1/4,code:"value",
										name:'aa',inputValue:'4',
											 listeners:{
												 change:me.checkChange
											 }
									},
									{
										boxLabel:'序列号', columnWidth: 1/4,code:"order_seq",
										name:'aa',inputValue:'5',
											 listeners:{
												 change:me.checkChange
											 }
									},
									{
										boxLabel:'属性', columnWidth: 1/4,code:"attrib",
										name:'aa',inputValue:'6',
											 listeners:{
												 change:me.checkChange
											 }
									},
									{
										boxLabel:'定义一', columnWidth: 1/4,code:"def_1",
										name:'aa',inputValue:'7',
											 listeners:{
												 change:me.checkChange
											 }
									},
									{
											boxLabel:'定义二', columnWidth: 1/4,code:"def_2",
											name:'aa',inputValue:'8',
												 listeners:{
													 change:me.checkChange
												 }
								    },
									{
								    	boxLabel:'定义三', columnWidth: 1/4,code:"def_3",
										name:'aa',inputValue:'9',
											 listeners:{
												 change:me.checkChange
											 }
									}
				    	          ]
				       },{
						xtype : 'tabpanel',
						activeTab: 0,
						region : 'center',
						flex : 9,
						items : [ {
							 title:'所有数据',
							xtype : "grid",
							layout : 'fit',
							 selModel:me.selModel,
							itemId:'Alldata',
							store : me.store,
							columns : [
							           {
							        	  dataIndex:'type_code',
							        	  text:'代码类型',
							        	  flex:4
							           },
							           {
								        	  dataIndex:'code',
								        	  text:'编码',
								        	  flex:3
								       },
								       {
								        	  dataIndex:'name',
								        	  text:'代码名称',
								        	  flex:6
								       },
								       {
								        	  dataIndex:'value',
								        	  text:'代码值',
								        	  flex:6
								       },
								       {
								        	  dataIndex:'order_seq',
								        	  text:'序列号',
								        	  flex:1
								       },
								       {
								        	  dataIndex:'attrib',
								        	  text:'属性',
								        	  flex:3
								       },
								       {
								        	  dataIndex:'def_1',
								        	  text:'定义一',
								        	  flex:2
								       },
								       {
								        	  dataIndex:'def_2',
								        	  text:'定义二',
								        	  flex:2
								       },
								       {
								        	  dataIndex:'def_3',
								        	  text:'定义三',
								        	  flex:2
								       }
							           ],
							dockedItems : [ {
								xtype : 'pagingtoolbar',
								store : me.store,
								dock : 'bottom',
								displayInfo : true
							} ]
						}]
					}
				    	       
				    	       ]}
            	          ],
            	 bbar:[
            	       {text:'新增',action:'ACT_ADD',xtype:'button',iconCls:'page_add',disabled:true,listeners:{
            	    	   click:me.BtnClick
            	       }},
            	       {text:"修改",action:'ACT_EDT',iconCls:'page_delete',disabled:true,listeners:{
            	    	   click:me.BtnClick
            	       }},
            	       {text:'添加常用',action:'',iconCls:'award_star_add',disabled:true,listeners:{
            	    	   click:me.BtnClick
            	       }},
            	       {text:'删除常用',action:'',iconCls:'award_star_del',disabled:true,listeners:{
            	    	   click:me.BtnClick
            	       }	},
            	       {text:'查看卡片',action:'',iconCls:'cards_stack',disabled:true,listeners:{
            	    	   click:me.BtnClick
            	       }},
            	       {text:'筛选',action:'',iconCls:'query',disabled:true,listeners:{
            	    	   click:me.BtnClick
            	       }},{text:'确定',action:'ACT_SAVE',iconCls:'accept',listeners:{
                	    	   click:me.BtnClick
                	       }
            	       },{
            	    	   text:'关闭',action:'ACT_CLOSE',iconCls:'cancel',listeners:{
            	    		   click:me.BtnClick
            	    	   }
            	       }
            	       ]         
			}
			]
		});
		me.callParent(arguments);
		if(me.type!="code"){
			me.down("#radio").setVisible(true);
		}
	},
	checkChange:function(field,ovalue,nvalue,o){
		if(ovalue){
			var grid=field.up('window').down('grid');
			var code=field.code;
			grid.getStore().sort(code,'DESC');
		}
	},
	searchClick:function(){
		var result=this.up('window').down('#resultsearch');
		var searchtext=this.up('window').down('#searchfield');
		var grid=this.up('window').down('grid');
		var selModel=grid.getSelectionModel();
		if(result.getValue()){
			Ext.each(res,function(rec){
				var idx=grid.getStore().find(rec.get('col_code'),searchtext.getValue(),0,true,false,false);
				if(idx>=0){
					selModel.select(idx);
					return;
				}
			});
		}else{
			grid.getStore().load({
				params:{
					type_code:me.type_code,
					mode:'allSearch',
					condition:searchtext.getValue()
				}
			});
			me.store.proxy.extraParams['mode']="allSearch";
			me.store.proxy.extraParams['condition']=searchtext;
			if(searchtext==""){
				delete grid.getStore().proxy.extraParams['mode'];
				delete grid.getStore().proxy.extraParams['condition'];
			}
		}
		
	},
	refreshClick:function(btn){
		var grid=btn.up('window').down('grid');
		delete grid.getStore().proxy.extraParams['mode'];
		delete grid.getStore().proxy.extraParams['condition'];
		me.store.load({
			params:{
				mode:'Screening',
				type_code:me.type_code
			}
		});
	},
	BtnClick:function(btn){
		var win=btn.up('window');
		switch(btn.action){
		case 'ACT_ADD':
			win.addCode(win);
			break;
		case 'ACT_SAVE':
			win.BtnSure();
			break;
		case 'ACT_CLOSE':
			win.close();
			break;
		}
	},
	//确认
	BtnSure:function(){
		var me=this;
		var grid=this.down('#Alldata');
		if(!me.multiSelect){
			var rec=grid.getSelectionModel().getSelection()[0];
			if(rec){
			this.callbackFn(rec.get("value"),this.trigger);
			this.close();
			}else{
				this.close();
			}
		}else{
			var recs=grid.getSelectionModel().getSelection();
			if(recs.length&&recs.length>0){
				this.callbackFn(rec.get('value'),this.trigger);
				this.close();
			}else{
				this.close();
			}
			
		}
		
	},
	//初始化窗口，参数:回调函数,数值域,所触发组件
	initWindow:function(callback,displayField,trigger){
		this.displayField=displayField;
		this.callbackFn=callback;
		this.trigger=trigger;
		this.show();
	},
	onKeyup:function(field,e,o){
		var selModel=field.up('window').down('grid').getSelectionModel();
		if(e.getKey()==e.ENTER){
			this.up('window').store.load({ 
				params:{
					mode:'allSearch',
					condition:field.getValue()
				},
				callback:function(recs){
					if(recs.length>0){
					selModel.select(0);
					}
				}
			});
		}
	}
});