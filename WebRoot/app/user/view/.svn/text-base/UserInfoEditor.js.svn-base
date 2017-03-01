/**
 * 用户综合维护
 */
Ext.define('erp.user.view.UserInfoEditor',{
	extend:'erp.ux.Window',
    alias:'widget.userinfo_editor',
    requires:['erp.user.view.UserInfoForm',
              'erp.user.view.BaseUserCtr'
              ],
    iconCls:'user_comment',
    title:'用户信息',
    width:800,
    layout:{
     type: 'hbox',
     pack: 'start',
     align: 'stretch'
    },
    initComponent:function(){
    	var me=this;
    	var tbar=[
    	{
    	 text:'保存',
    	 iconCls:"page_save",
    	 hidden:!me.isEdit,
    	 action:'ACT_SAVE'
    	},
    	/*{
        	text:'',
        	iconCls:"page_refreshIcon",
        	hidden:!me.isEdit,
        	handler:function(btn){
        	   var me=btn.up('userinfo_editor');
        	}
    	}*/
    	{
            text: '退出',
            iconCls: 'page_error',
            handler:function(btn){
                var me=btn.up('userinfo_editor');
                me.close();
            }
        }
    	];
    	Ext.apply(me,{
    	 tbar:tbar,
    	 items:[
    	 {
    	   layout:{
		     type: 'vbox',
		     pack: 'start',
		     align: 'stretch'
		    },
    	   flex:1,
    	   items:[
    	   {
        	 	xtype:'userinfo_form',
        	 	isEdit:me.isEdit,
        	 	isAddNew:me.isAddNew,
        	 	store:me.store,
        	 	flex:1
    	   }
    	   ]
    	 },
    	 {  
    	 	xtype:'user_ctr',
    	 	isEdit:me.isEdit,
    	 	disabled:!me.isEdit,
    	 	region:'east',
    	 	isAddNew:me.isAddNew,
    	 	currentUser:me.currentUser,
    	 	flex:1
    	 }
    	 ]
    	});
    	me.callParent(arguments);
    	me.loadRecord(me.currentUser);
    	me.down('userinfo_form').promise=me.down('user_ctr').createPromise(me.createSavePromise());
    },
    /**
     * 构建执行队列
     * @return {}
     */
    createSavePromise:function(){
    	var me=this;
    	var promise=me.promise=new erp.DataUtil.Promise();
    	var form=me.down('userinfo_form');
    	var ctr=me.down('user_ctr');	
    	return promise.then(function(){
    	    var returnPromise=new erp.DataUtil.Promise();
    	    if(form.getForm().isValid()&&form.getForm().isDirty()){
    	    	var rec=form.getRecord();
    	    	form.getForm().updateRecord(rec);
    	    	if(form.store.indexOf(rec)<0){
    	    		form.store.add(rec);
    	    	}
    	    	if(form.store.getUpdatedRecords()||form.store.getNewRecords()){
	    	    	form.store.sync({
	    	    	  success:function(a,b){
	    	    	  	/*	*/
	    	    	  	form.loadRecord(newuser);
	    	    	  	returnPromise.resolve(newuser.get('u_id'));
	    	    	  }
	    	    	});
    	    	}else{
    	    		returnPromise.resolve(newuser.get('u_id'));
    	    	}
    	    	form.store.sort();
    	    }
    	    return returnPromise;
    	});
    },
    /**
     * 载入数据
     * @param {} rec
     */
    loadRecord:function(rec){
    	var me=this;
    	me.down('userinfo_form').loadRecord(rec);
    }
});
