Ext.define('erp.user.view.ChgUserPwd',{
	extend: 'erp.ux.Window',
	alias: 'widget.edt_ChgUserPwd',
	requires:['erp.util.Util',
	          'erp.ux.FormKey',
	          'erp.ux.RemoteValidator'],
	title: '修改密码',
	resizable : false,
	iconCls:'key',
	modal : true,
	closable:!Ext.isEmpty(erp.UInfo.currentUser.userInfo.last_login),
	initComponent:function(){
		var tips={xtype:'label',
				  html:'<div align="center" style="margin:0 0 5 5"><strong><font color="red">用户:'+erp.UInfo.currentUser.name+',您好!由于您是第一次使用本系统,请修改密码.</font></strong></div>',
				  hidden:false
		};
		if (!Ext.isEmpty(erp.UInfo.currentUser.userInfo.last_login)){
			Ext.apply(tips,{hidden:true});
		}
		Ext.apply(this,{
			items:[
			   {
				 xtype:'form',
				 frame:false,
				 plugins:{
			          ptype: 'FormKey'
				 },
				 bodyPadding: 10,
			 	 defaults: {
				    	xtype: 'textfield',
				    	labelAlign : 'right',
				    	anchor:'95%',
						labelWidth : 80,
						labelStyle : 'font-weight:bold',
						msgTarget: 'qtip',
			            autoFitErrors: true
			            
			 	 },
				 items:[tips,
						 {
				        	 name : 'login_id',
				        	 fieldLabel: '用户ID',
				        	 itemId:'login_id',
				        	 value:erp.Util.currentUser.loginId,
				        	 disabled:true
						 },
				         {
				        	 name : 'name',
				        	 itemId:'name',
				        	 value:erp.Util.currentUser.name,
				        	 fieldLabel: '姓名',
				        	 disabled:true
				         },
						 {
							 name : 'pwd',
				        	 fieldLabel: '原密码',
				        	 itemId:this.isResetPwd?'pwd':'firstFocusOn',
				        	 inputType:'password',
				        	 hidden:this.isResetPwd,
				        	 encodeFunc:erp.Const.MD5,
				        	 plugins:{
		        		          ptype: 'RemoteValidator',
		        		          rvOptions:{
		        		        	  url:'main/UserCheck.do?method=chkUserPwd',
		        		        	  vFields:['login_id'],
		        		        	  passIsValid:true,
		        		        	  vTexts:['密码正确!','原密码不正确!']
		        		          }
				        	 }
				         },
				         {	 
				        	 name : 'new_pwd1',
				        	 itemId:this.isResetPwd?'firstFocusOn':'new_pwd1',
				        	 inputType:'password',
				        	 fieldLabel: '密码',
				        	 allowBlank:false,
				        	 blankText:'密码不能为空',
//				        	 regex:/^\\d\\d*$/,
//				        	 regexText:'密码等级过低!',
				        	 minLength:6,
				        	 vtype:'samepassword',
				        	 oldPassField:this.isResetPwd?'pwd':'firstFocusOn'
				         },
				         {
				        	 name : 'new_pwd2',
				        	 itemId:'new_pwd2',
				        	 inputType : 'password',
				        	 fieldLabel: '确认密码',
				        	 allowBlank:false,
				        	 blankText:'密码不能为空',
				        	 minLength:6,
				        	 vtype: 'password',
				        	 initialPassField: this.isResetPwd?'firstFocusOn':'new_pwd1',
				        	 nextTargetId : 'btn_accept'
				         }
				   ]}
			],
			buttons:[
			  		{
			  		    text: '确定',
			  		    itemId:'btn_accept',
			  		    iconCls:'page_save',
			  		    action:'ACT_ACCEPT'
			  		},
			  		{
			  		    text: '退出',
			  		    iconCls: 'page_go',
			  		    action:'ACT_CANECL'
			  		}
			 	]
		});
		this.callParent(arguments); 
	}
});
