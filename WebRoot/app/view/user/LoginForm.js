function getNewVCode(){
	var vcode_img=document.getElementById('vCodeImg');
	if(vcode_img){
		vcode_img.src='common/getVerifyCode.action?_dc='+new Date().getTime();
	}
}
Ext.define('erp.view.user.LoginForm',{
	extend:'Ext.form.Panel',
	alias:'widget.frm_login',
	uses:['erp.def.ui.plugins.FormKeyMapper'],
	initComponent:function(){
		var me=this;
		var needVCode=false;
		Ext.Ajax.request(
		{
			url:'common/getNeedVCode.action',
			method:'GET',
			async:false,
			success:function(response){
				needVCode=response.responseText=='true';
			}
		})
		Ext.apply(me,{
		layout:'column',
		plugins:{
			          ptype: 'FormKeyMapper'
		},
//		padding:'80 20 0 260',
		border:false,
		defaults:{labelWidth:60,labelAlign:'right',columnWidth:1,padding:2,selectOnFocus:true},
		items:[
		{
			xtype:'textfield',
//			emptyText:'用户名',
			name:'login_id',
			itemId : 'firstFocusOn',
			fieldLabel:'用户名',
			allowBlank:false,
			blankText:'请输入用户名!'
		},
		{
			xtype:'textfield',
			name:'pwd',
			itemId:'pwd',
			inputType : 'password',
//			emptyText:'密码',
			fieldLabel:'密&nbsp;&nbsp;&nbsp;&nbsp;码',
			allowBlank:false,
			blankText:'请输入密码!',
			nextTargetId :!needVCode?'btn_login':''
		},
		{
			xtype:'textfield',
			name:'verify_code',
			labelWidth:60,
			labelAlign:'right',
			columnWidth:.5,
			fieldLabel:'验证码',
			hidden:!needVCode,
			nextTargetId :needVCode?'btn_login':''
//			,emptyText:'验证码'
		},{
        		        xtype: 'container',
        		        hidden:!needVCode,
				        baseCls:'x-plain',
				        columnWidth:.5,
				        name :'vCode',
				        itemId :'vCode',
				        html:!needVCode?'':'<div > '
				        	 +'   <a href="#" title="如看不清楚,请点击图片更换" onclick="getNewVCode();">'
				        	 +'     <img height="42px" width="97px" id="vCodeImg" src="main/getVerifyCode.do" onclick="getNewVCode();" '
				        	 +'        border="0" />换一张'
				        	 +'   </a>'
				        	 +'</div>',
				        border: false
	     },
		{
		xtype:'panel',
		border:false,
		padding:'10 0 0 0',
		layout:{type:'hbox',align:'stretch'},
//		defaults:{padding:'5'}
		items:[{
			xtype:'button',
			text:'登陆',
			itemId:'btn_login',
			cls:'loginbtn',
			width:100,
			handler:function(btn){
				var form=btn.up('form');
				var Values=form.getValues();
				erp.Const.doLogin(Values.login_id,Values.pwd,Values.verify_code);
				//保存用户名
				if(!Ext.isEmpty(Values.rememberme)){
					localStorage.setItem("loginId", Values.login_id);
					Ext.state.Manager.setProvider(cp);
				}
			}
		},
		{
			xtype:'checkbox',
			padding:'0 0 0 5',
			name:'rememberme',
			boxLabel:'记住用户名',
			width:120
		}]
		}]
		});
		me.callParent(this);
		
	},		
	listeners:{
		afterrender:function(cmp){
		//Start
			me= this;
			Ext.create('Ext.util.DelayedTask',function(){
				var cmp = me.down('#firstFocusOn');
					var cp=Ext.state.Manager.getProvider();
					var loginId=localStorage.getItem("loginId");
					if (!Ext.isEmpty(loginId))
					{
						if(cmp){
							cmp.setValue(loginId);	
							passwd=me.down('#pwd');
							passwd.focus(false);
						}
					}
					else
						cmp.focus(false);
				
			}).delay(30);

			//检查数据库连接参数
			/*erp.Const.callServiceMethodSync("common/testDbConn.action",null,function(result,errMsg){
				if(!Ext.isEmpty(result)){
					if(result!=true){
						Ext.Msg.alert("出错了",errMsg+"   请及时与系统管理员联系!");
						Ext.getCmp("btn_login").setDisabled(true);
					}
				}else
					Ext.Msg.alert("出错了",errMsg);
			},{method:"GET"});*/
			
			// End
			}
		},
	closeBrowser:function(){
		 window.opener = null;
    	 if(Ext.isIE||Ext.isChrome){
    		 window.open(' ', '_self', ' ');
    	 }
    	 window.close();
    	 window.location ='about:blank';
		}
})