/**
 * 用户功能权限主面板
 */
Ext.define('erp.common.userctr.MngUserModule',{
    extend:'erp.ux.Panel',
    alias:'widget.user_mofun',
    requires:['erp.setup.store.ModuleTreeAlls'
             ,'erp.user.store.UserModule'
             ,'erp.user.store.UserFunc'],
     layout:'fit',
     title: '模块授权',
     iconCls:'package',
     height: 300,
     isLoaded:false,
     disabled:false,
     ou_id:1,
    /**
     * 初始化
     */
    init:function(){
    	var me=this;
    	if(this.isInited) return true;
    	me.SelectedFuncStore.clearFilter();
    	me.SelectedFuncStore.filter({
    	  property:'ou_id',value:me.ou_id
    	});
    	me.SelectedStore.clearFilter();
    	me.SelectedStore.filter({
    	property:'ou_id',value:me.ou_id
    	});
    	var root=me.treeStore.getRoot();
    	root.cascadeBy(function(rec){
    	  rec.set('checked',false);
    	});
    	if(me.SelectedStore.getRange().length>0){
    		root.set('checked',true);
    	}
    	else{
    	    root.set('checked',false);
    	}
    	me.treeStore.getRoot().cascadeBy(function(rec){
    	   var model=me.SelectedStore.findRecord('mod_id',rec.get('id'),0,false,false,true);
    	   if(rec.get('id')>1000000){
    	   	model=me.SelectedFuncStore.findRecord('f_id',rec.get('id')%1000000,0,false,false,true);
    	   }else{
    	   	model=me.SelectedStore.findRecord('mod_id',rec.get('id'),0,false,false,true);
    	   } 
    	   if(model){
    	   	rec.set('checked',true);
    	   }else{
    	   	rec.set('checked',false);
    	   }
    	   rec.commit();
    	});
    },
    doInit:function(){
    	var me=this;
    	if(!me.disabled){
	    	if(!me.isLoaded){
	    	 	me.treeStore.reload({});
	    	}else{
	    		me.init();
	    	}
    	}
    },
    initComponent:function(){
    	var me=this;
    	me.treeStore=Ext.create('erp.setup.store.ModuleTreeAlls',{
    		autoLoad:false,
    		listeners:{
    			load:function(recs){
    				me.SelectedStore.load({
			    	   params:{
			    		 u_id:me.currentUser.get('u_id')
			    	   },
			    	   callback:function(){
				    	   	me.SelectedFuncStore.load({
					   		params:{
				    		 u_id:me.currentUser.get('u_id')
				    	    },
				    	   	callback:function(){
				    	   		me.init();
				    	   	}
				    	   	});
			    	   }
			    	});
    			}
    		}
    	}); 
    	/*if(!erp.UInfo.isAdmin){
    		me.treeStore.getProxy().setExtraParam('u_id',erp.UInfo.currentUser.u_id);
    	}*/
    	me.SelectedStore=erp.DataUtil.createStoreFactory('erp.user.store.UserModule');
    	me.saveModuleStore=new erp.DataUtil.autoStore({
    	    store:me.SelectedStore
    	});
    	me.SelectedFuncStore=erp.DataUtil.createStoreFactory('erp.user.store.UserFunc');
    	me.saveFuncStore= new erp.DataUtil.autoStore({
    	 store:me.SelectedFuncStore
    	});
		me.SelectedStore.getProxy().setExtraParam('u_id',me.currentUser.get('u_id'));
		me.SelectedFuncStore.getProxy().setExtraParam('u_id',me.currentUser.get('u_id'));
    	Ext.apply(this,{
    	     items:[
    	     {
		    	xtype:'treepanel',
		    	store :me.treeStore,
		    	itemId : 'module_tree',
		    	disabled: false,
		    	flex:1,
		    	border:true,
				useArrows:true,//是否显示小箭头  
			    lines:false,//节点之间虚线  
			    rootVisible : true
    	     }
    	     ]
    	});
    	me.callParent(arguments);
    },
    /**
     * 选中
     * @param {} model
     */
    checked:function(model){
    	var me=this;
    	//子节点赋权
    	model.cascadeBy(function(rec){
    		rec.set('checked',true);
    		if(!rec.isRoot()){
    		me.addSelectStore(rec);
    	}
    	});
    	var pNode=model.parentNode;
    	//父节点递归向上
    	while(pNode){
    		pNode.set('checked',true);
    		//根节点
    		if(pNode.isRoot()){
    		return;
    	    }
    	    me.addSelectStore(pNode);
    	    pNode=pNode.parentNode;
    	}
    },
    /**
     * 
     * @param {} model
     */
    addSelectStore:function(model){
    	var me=this;
    	var rec;
    	if(model.get('id')>1000000){
    		var m=Ext.create('erp.user.model.UserFunc',{
    			//id:0,//主键需要默认值
    			ou_id:me.ou_id,
	    	    f_id:model.get('id')%1000000,
	    	    u_id:me.currentUser.get('u_id')
    		});
    		me.SelectedFuncStore.add(m);
    	}else{
    		var m=Ext.create('erp.user.model.UserModule',{
	    		//id:0,//主键需要默认值
	    	    ou_id:me.ou_id,
	    	    mod_id:model.get('id'),
	    	    u_id:me.currentUser.get('u_id')
	    	})
	    	me.SelectedStore.add(m);
    	}
    },
    /**
     * 
     * @param {} rec
     */
    removeSelectStore:function(rec){
    	var me=this;
    	if(rec.get('id')>1000000){
    		  var idx=me.SelectedFuncStore.find('f_id',rec.get('id')%1000000,0,false,false,true);
    	     if(idx>=0){
    	     	me.SelectedFuncStore.removeAt(idx);
    	     }
    		 }else{
    		  var idx=me.SelectedStore.find('mod_id',rec.get('id'),0,false,false,true);
    	     if(idx>=0){
    	     	me.SelectedStore.removeAt(idx);
    	     }
    		 }
    },
    /**
     * 去除选择
     */
    unchecked:function(model){
    	var me=this;
    	if(!model.isRoot()){
    		 me.removeSelectStore(model);
    	}
    	model.cascadeBy(function(rec){
    		if(rec.get('checked')){
    		 rec.set('checked',false);
    		 me.removeSelectStore(rec);
    		}
    	});
    },
    /**
     * 
     */
    SaveCtr:function(user_id){
    	var me=this;
    	me.SelectedFuncStore.clearFilter();
    	me.SelectedStore.clearFilter();
    	if(user_id){
    		me.currentUser.set('u_id',user_id);
    	Ext.each(me.SelectedStore.getRange(),function(rec){
    		rec.set('u_id',me.currentUser.get('u_id'));
    	}
    	);
    	Ext.each(me.SelectedFuncStore.getRange(),function(rec){
    		rec.set('u_id',me.currentUser.get('u_id'));
    	});
    	}
    	me.SelectedFuncStore.sync();
    	me.SelectedStore.sync();
    },
    /**
     * 
     */
    changeOrg:function(ou_id,userOrg){
	    var me=this;
	    me.ou_id=ou_id;
	    me.userOrg=userOrg;
	    me.setDisabled(!userOrg.get('has_curd'));
	    me.doInit();
    }
    
}); 