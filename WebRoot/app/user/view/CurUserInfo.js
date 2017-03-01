/**
 * 当前用户信息
 */
Ext.define('erp.user.view.CurUserInfo',{
	extend:'erp.ux.Window',
    alias:'widget.edtCurUserInfo',
    iconCls:'user_comment',
    requires:['erp.user.view.CurUserForm'],
    title:'用户信息',
    modal : true,
    layout:{
     type: 'fit',
     pack: 'start',
     align: 'stretch'
    },
    initComponent:function(){
    	var me=this;
    	var tbar=[
    	{
    	 text:'保存',
    	 iconCls:"page_save",
    	 action:'ACT_SAVE',
    	 handler: function () {
    	 			var formCmp = me.down("curUser_form");
    	 			 formCmp.updateRecord();
                    Ext.Msg.confirm('提醒','确认修改用户信息？',function(btn){
						if(btn=='yes'){
			                     var rec=formCmp.getRecord();
			                     erp.Util.currentUser.userInfo.nickname=rec.get('nickname');
			                     erp.Util.currentUser.userInfo.name=rec.get('name');
			                     erp.Util.currentUser.userInfo.sex=rec.get('sex');
			                     erp.Util.currentUser.userInfo.birthdat=rec.get('birthday');
			                     erp.Util.currentUser.userInfo.email=rec.get('email');
								 formCmp.store.add(rec);
								 formCmp.store.sync({
								 success : function(e, batch) {
									Ext.Msg.alert('提醒', '保存成功！');
								},
								failure : function(batch, options) {
								Ext.Msg.alert('提醒', '保存失败！');
								}
						});
					}
					});
					me.close();
                }
    	},
    	{
            text: '退出',
            iconCls: 'page_error',
            handler:function(btn){
                me.close();
            }
        }
    	];
    	Ext.apply(me,{
    		buttons:tbar,
    		width:500,
    		items:[{
				xtype:'curUser_form',
				itemId:'UserInfoForm',
				store:Ext.create('erp.user.store.UserInfos')
    		}]
    	})
    	me.callParent(arguments);
    },
    loadRecord:function(rec){
    	var me=this;
    	me.down('curUser_form').loadRecord(rec);
    }
});
