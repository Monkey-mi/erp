Ext.define('erp.user.controller.User', {
	extend: 'Ext.app.Controller',
	requires:['erp.user.store.Roles'
	          ,'erp.user.store.UserRoles'
	          ,'erp.user.model.UserInfo'
	          ,'erp.user.store.UserMapping'
		      ,'erp.user.store.UserInfos'],
	views:  [
			   'erp.user.view.MngUserInfo'
	         ,'erp.user.view.ChgUserPwd'
	         ,'erp.user.view.UserInfoEditor'
	         ],
	refs:[
	      {ref:'usergrid',selector:'mng_UserInfo #userinfo_grid'},
	      {ref:'UserModule',selector:'userinfo_editor user_mofun'},
	      {ref:'BaseCtr',selector:'userinfo_editor user_ctr'},
	      {ref:'UserInfoForm',selector:'userinfo_editor userinfo_form'},
	      {ref:'defaultOrg',selector:'userinfo_editor userinfo_form #default_org'},
	      {ref:'defaultDept',selector:'userinfo_editor userinfo_form #default_dept'},
	      {ref:'OrgdeptAuth',selector:'userinfo_editor orgdeptauth'}
	],
	init: function() {
		//该函数将最先执行，甚至先于 appliction.launch
		if(this.isInited) return true;
		//处理所有view上面的交互
		this.control({
			//这里的ComponentQuery字符串中间千万不能有tab等不可见字符，
			//否则IE下会造成脚本运行缓慢,近似死机
			'mng_UserInfo':{
				afterrender: function(){
            		//响应数据提交的错误等
            		this.uStore = this.getUsergrid().getStore();
            		this.uStore.load();
            		this.ugrStore=Ext.create('erp.user.store.UserRoles');
            		this.ugrStore.load();
            		this.rStore=Ext.create('erp.user.store.Roles');
            		this.rStore.load();
            	}
			},
			'mng_UserInfo #userinfo_grid': {
				
                //响应用户清单表格上的鼠标双击事件
                itemdblclick: this.onItemdbclik
               
            },
            'mng_UserInfo button': {
            	//响应用户清单表界面上所有按钮点击事件
                click: this.onBtnClick
            },
            'user_mofun treepanel':{
            checkchange:this.UserModuleCheckChange
            },
            'userinfo_editor button':{
            	click:this.userEditorBtnClick
            },
            'userinfo_editor orgdeptauth':{
              orgSelected:this.orgDeptAuthChange,
              defaultOrgChecked:this.defaultOrgChecked,
              defaultDeptChecked:this.defaultDeptChecked
            },
            //'edt_ChgUserPwd button[action="ACT_ACCEPT"]':{
            'edt_ChgUserPwd button':{
            	click:this.onChgUserPwd
            }
        });
		
		this.isInited = true;
	},
	
	onLaunch: function(){
		//这个函数将在viewport被创建以后执行,准确时间是appliction.launch 执行以后
	},
	onChgUserPwd: function(btn,event){
		var win = btn.up('edt_ChgUserPwd');
		if(btn.action=='ACT_ACCEPT'){
		
		form = win.down('form');
	    if(form.getForm().isValid()){
	    	var userInfo = Ext.create('erp.user.model.UserInfo');
	    	var uStore = Ext.create('erp.user.store.UserInfos');
	    	
	    	uStore.proxy.api.update='main/Users.do?method=updateUserPwd';
	    	userInfo.set('login_id',form.getForm().findField('login_id').getValue());
	    	userInfo.set('pwd',form.getForm().findField('new_pwd1').getValue());
	    	//借用一下name字段来校验原密码
	    	if(win.isResetPwd)
	    		userInfo.set('name',null);
	    	else{
		    	userInfo.set('name',form.getForm().findField('pwd').getValue());
		    	userInfo.set('name',erp.Const.MD5(userInfo.get('name')));
	    	}
	    	//密码先做MD5处理
	    	userInfo.set('pwd',erp.Const.MD5(userInfo.get('pwd')));
	    	//修改密码后，如第一次登陆则添加登陆时间
	    	//表示密码已经修改过了。
	    	if (Ext.isEmpty(erp.UInfo.currentUser.userInfo.last_login)){
	    		userInfo.set('last_login',new Date());
	    	}
	    	//提交
	    	userInfo.phantom = false;
	    	//userInfo.setDirty();
	    	uStore.add(userInfo);
	    	uStore.sync();
	    	win.close();
		}
		}else{
			if (!Ext.isEmpty(erp.UInfo.currentUser.userInfo.last_login)){
				win.close();
			}else{
			  Ext.Msg.confirm("提示","你确定要退出系统吗?",function(btn){
			  	if (btn=="yes"){
			  		erp.Util.doLogout();
			  	}
			  });
			}
		}
		 
	},
	onItemdbclik: function(view, record) {
		//=============界面操作权限相关======================================
		//因为鼠标双击所在行代表修改操作，需要先检查操作权限
		if(!view.up('mng_UserInfo').modFuncsDisabled[erp.Const.FUNC_ITEMID_BTN_EDT])
			this.doEditUser(false);
    },
    onBtnClick: function(btn,event){
		//=============界面操作权限相关======================================
		//需要先检查操作权限
		var me = this;
		if(!btn.up('mng_UserInfo').modFuncsDisabled[btn.itemId])
			switch(btn.itemId){
				case erp.Const.FUNC_ITEMID_BTN_ADD:
	    			me.doAddUser();
	    			break;
				case erp.Const.FUNC_ITEMID_BTN_EDT:
					me.doEditUser(true);
					break;
				case erp.Const.FUNC_ITEMID_BTN_DEL:
					me.doDelUser();
					break;
	    		case erp.Const.FUNC_ITEMID_BTN_REFRESH:
		    		this.uStore.load();
		    		break;
	    		case erp.Const.FUNC_ITEMID_BTN_RESET:
	    			this.doResetPwd();
		    		break;
		    	case 'accountsMapping':
		    		
		    	break;
	    	}
	},
	doResetPwd:function(){
		//需要做一些逻辑检查
		var selModel = this.getUsergrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		var edtWin = Ext.widget('edt_ChgUserPwd',{isResetPwd:true});
		var form = edtWin.down('form');
		form.getForm().findField('login_id').setValue(rec.get('login_id'));
		form.getForm().findField('name').setValue(rec.get('name'));
		edtWin.show();
		
	},
	doAddUser:function(){
		var me=this;
		var	rec = Ext.create('erp.user.model.UserInfo');
		var edtWin = Ext.widget('userinfo_editor',{isAddNew:true,isEdit:true,currentUser:rec,store:me.uStore,itemId:'edt_User'});
		edtWin.show();
	},
	doEditUser:function(isEdit){
		//需要做一些逻辑检查
		var me=this;
		var selModel = this.getUsergrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec =selModel.getSelection()[0];
		var edtWin = Ext.widget('userinfo_editor',{isAddNew:false,isEdit:isEdit,currentUser:rec,store:me.uStore,itemId:'edt_User'});
		edtWin.show();
	}, 
	doDelUser:function(){
		//删除前需要做一些逻辑检查
		var me = this;
		var selModel = me.getUsergrid().getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var rec=selModel.getSelection()[0];
		Ext.Msg.confirm('提示','你确信要删除用户['+rec.get('name')+']吗?',
				function fn(id){
			      if(id==Ext.Msg.buttonIds[1]){
		    	      me.uStore.remove(rec);
			  		  me.uStore.sync();
			      }
		});
	},
	/**
	 *用户维护界面按钮点击响应 
	 */
	userEditorBtnClick:function(btn){
		var me=this;
		switch(btn.action){
			case 'ACT_SAVE':
			me.UserSave();
			break;
		}
	},
	/**
	 * 用户信息保存
	 */
	UserSave:function(){
		var me=this;
		var userctr=me.getBaseCtr();
		var form=this.getUserInfoForm();
		if(form.getForm().isValid()&&form.getForm().isDirty()){
			var rec=form.getRecord();
			form.updateRecord(rec);
			if(form.store.indexOf(rec)<0){
			    rec.set('pwd',erp.Const.MD5(rec.get('pwd')));
	    		form.store.add(rec);
		        form.store.sync({
					success:function(e,batch){
						var newUser=batch.operations.create[0];
						form.loadRecord(newUser);
						userctr.currentUser=newUser;
						//me.getOrgdeptAuth().SaveCtr(newUser.get('u_id'));
						userctr.SaveCtrs(newUser.get('u_id'));
						form.store.sort();
                        form.modeChange();
						Ext.Msg.alert('提示','保存成功!');
					},
					failure:function(batch,options){
                        Ext.Msg.alert('提示','保存失败!');
                    }
    			});
    		}else{
                    this.uStore.sync();
        			userctr.SaveCtrs();
        			this.uStore.sort();
        			Ext.Msg.alert('提示','保存成功!');
    		}
		}
		
	},
	/**
	 * 用户模块，选择变化方法
	 */
	UserModuleCheckChange:function(model,checked,eopt){
		var me=this;
		var panel=me.getUserModule();
		switch(checked){
			case true:
			panel.checked(model);
			break;
			case false:
			panel.unchecked(model);
			break;
		}
	},
	/**
	 * 
	 */
	orgDeptAuthChange:function(ou_id,rec){
	  var me=this;
	  me.getBaseCtr().setDisabled(false);
	  me.getBaseCtr().changeOrg(ou_id,rec);
	},
	/**
	 * 指定默认组织时
	 * @param {} ou_id
	 * @param {} rec
	 */
	defaultOrgChecked:function(ou_id,checked,rec){
		var ou_name = checked?rec.get('text'):'';
		this.getDefaultOrg().setValue(ou_name);
	},
	/**
	 * 指定默认部门时
	 * @param {} ou_id
	 * @param {} rec
	 */
	defaultDeptChecked:function(d_id,checked,rec){
	    var d_name = checked?rec.get('text'):'';
        this.getDefaultDept().setValue(d_name);
	}
});