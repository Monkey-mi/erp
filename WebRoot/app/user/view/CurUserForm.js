/**
 * 用户基础信息
 */
Ext.define('erp.user.view.CurUserForm',{
    extend:'Ext.form.Panel',
    alias:'widget.curUser_form',
    frame:false,
    plugins : {
		ptype : 'FormKey'
	},
	bodyPadding: 10,
    initComponent:function(){
    	var me=this;
    	Ext.apply(me,{
				  items:[
    	     	  {
							           xtype:'container',
							           layout: {
		             				    type: 'hbox',
		             				    align: 'stretch'
		             			   },
								   items:[ 
								   {
								    xtype:'container',
								   	flex: 2,
		             				layout: {
		                 				type: 'hbox',
		                 				align: 'stretch'
		                 			},
		             				defaults: {
		             		            anchor: '95%',
		             		            padding:3,
										margins : '10 5 0 0',
		             		            labelWidth : 70,
		             		            xtype: 'textfield'
		             		        },
								   	  items : [{
														name : 'login_id',
														fieldLabel : '用户ID',
														itemId : 'login_id',
														allowBlank : false,
														flex : 1
													}, {
														name : 'nickname',
														fieldLabel : '昵称',
														flex : 1,
														itemId : 'nickname'
													}]  
								   	    }
								   	    ]
							  			 },
								     {
									     xtype:'container',
									   	flex: 2,
			             				layout: {
			                 				type: 'hbox',
			                 				align: 'stretch'
			                 			},
			             				defaults: {
			             		            anchor: '95',
			             		            labelWidth : 70,
			             		            padding:3,
											margins : '10 5 0 0',
			             		            flex:1,
			             		            xtype: 'textfield'
			             		        },
			             		        items:[{
								        	 name : 'name',
								        	 itemId:'name',
								        	 fieldLabel: '姓名',
								        	 allowBlank:false
								         },
							         {
							        	 name : 'sex',
							        	 fieldLabel: '性别',
							        	 itemId: 'sex',
							        	 xtype:'combobox',
							        	 store:erp.Util.getCombxStore(erp.Const.SEX_TYPE),
							        	 queryMode: 'local',
							        	 displayField: 'name',
							        	 valueField: 'value',
							        	 forceSelection:true
							         }
							         ]},
								      {
							           xtype:'container',
							           layout:'hbox',
							           flex:2,
							           defaults: {
		             		            anchor: '95%',
		             		            labelWidth: 70,
		             		            padding:3,
										margins : '10 5 0 0',
		             		            flex:1,
		             		            xtype: 'textfield'
		             		           },
							           items:[
							           {
							        	 name : 'birthday',
							        	 fieldLabel: '出生日期',
							        	 itemId: 'birthday',
							        	 xtype:'datefield'
							         },
							         {
							        	 name : 'email',
							        	 fieldLabel: '电子邮箱',
							        	 itemId: 'email',
							        	 vtype:'email'
							         }
			             		        ]
								     },
							         {
							           xtype:'container',
							           layout:'hbox',
							           flex:2,
							           defaults: {
		             		            anchor: '95%',
		             		            labelWidth: 70,
		             		            padding:3,
										margins : '10 5 0 0',
		             		            flex:1,
		             		            xtype: 'textfield'
		             		           }
							         },
							          {
							           xtype:'container',
							           layout:'hbox',
							           flex:2,
							           defaults: {
		             		            anchor: '95%',
		             		            labelWidth: 70,
		             		            padding:3,
										margins : '10 5 0 0',
		             		            flex:1,
		             		            xtype: 'textfield'
		             		           },
							           items:[{
								        	 xtype:'datefield',
								        	 name : 'create_dt',
								        	 disabled:true,
								        	 fieldLabel: '创建日期',
								        	 format:'Y-m-d H:i:s'
								         },
								         {
								        	 xtype:'datefield', 
								        	 name : 'last_login',
								        	 disabled:true,
								        	 fieldLabel: '最近登录',
								        	 format:'Y-m-d H:i:s'
								         }]
								      }
    	      ]
    	})
    	me.callParent(arguments);
    }
});