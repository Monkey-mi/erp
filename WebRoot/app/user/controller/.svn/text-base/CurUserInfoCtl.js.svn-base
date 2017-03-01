Ext.define('erp.user.controller.CurUserInfoCtl',{
	extend: 'Ext.app.Controller',
	/*requires: [
	           ],*/
	views: [
			'erp.user.view.CurUserInfo',
			'erp.ux.FormKey'
	        ],
    refs: [
    		{ref : 'userForm',selector : 'curUser_form'},//用户信息表单
    		{ref : 'edt_UserInfo',selector : 'edtCurUserInfo'}
	      ],
	//moduleId:0,
	init: function(){
		//controller只初始化一次
		if(this.isInited) return ;
		var me=this;
		this.control({
			//初始化信息
			'edtCurUserInfo':{
				afterrender:function(){
					var user=Ext.create('erp.user.model.UserInfo',{
						u_id:erp.Util.currentUser.userInfo.u_id,
						sex:erp.Util.currentUser.userInfo.sex,
						pwd:erp.Util.currentUser.userInfo.pwd,
						name:erp.Util.currentUser.userInfo.name,
						modify_dt:erp.Util.currentUser.userInfo.modify_dt,
						login_id:erp.Util.currentUser.userInfo.login_id,
						last_login:erp.Util.currentUser.userInfo.last_login,
						create_dt:erp.Util.currentUser.userInfo.create_dt,
						birthday:erp.Util.currentUser.userInfo.birthday,
						nickname:erp.Util.currentUser.userInfo.nickname,
						email:erp.Util.currentUser.userInfo.email,
						address:erp.Util.currentUser.userInfo.address,
						is_valid:erp.Util.currentUser.userInfo.is_valid,
						login_def:erp.Util.currentUser.userInfo.login_def,
						tel:erp.Util.currentUser.userInfo.tel,
						nick_portrait:erp.Util.currentUser.userInfo.nick_portrait,
						post:erp.Util.currentUser.userInfo.post,
						row_permit:erp.Util.currentUser.userInfo.row_permit
					});
					var form=me.getUserForm();
					form.loadRecord(user);
				}
			}
		});
		//controller初始化完成
		this.isInited = true;
	}
});