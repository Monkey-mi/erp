Ext.define('erp.common.basic.view.BaseCtrForm',{
    extend:'Ext.tab.Panel',
	alias:'widget.base_ctrf',
	initComponent:function(){
	   var me=this;
	   Ext.apply(me,{
	      items:[
	      /*{
	        xtype:'tabpanel',
	        items:[*/
	        me.rolePanel=Ext.create('erp.setup.view.SelectRolePanel', {
        	   title: '按角色',
        	   iconCls:'role',
        	   actiontype: 'R'
           }),
//           me.positionPanel=Ext.create('tp.common.basic.view.SelectPositionPanel', {
//        	   title: '按职位',
//        	   actiontype: 'P'
//           }),
           me.searchPanel=Ext.create('erp.setup.view.SelectUserPanel', {
        	   title: '按用户',
			   iconCls:'user',        	   
        	   actiontype: 'U'
           })
//           me.orgDeptPanel=Ext.create('tp.common.basic.view.MngOrgDept', {
//	        	region: 'west',
//	        	disabled: true,  
//	        	title: '按组织',
//	        	actiontype: 'O',
//	    		or_type: tp.Const.ORG_TYPE_HUMAN_RESOURCES
//	        })
	        /*]
	      }*/
	      ]
	   });
	   me.callParent(arguments);
	},
	getRoleList:function(){
	    return this.rolePanel.getSelectedRecords();
	},
	getPstList:function(){
	    return this.positionPanel=getSelectedRecords();
	},
	getOrgList:function(){
	    return this.orgDeptPanel.getOuCode();
	},
	getDeptList:function(){
		return this.orgDeptPanel.getDeptCode();
	},
//	getUserList:function(){
//	    return this.searchPanel.positionGrid.getSelectedRecords()
//	},
	getUserList:function(){
	    return this.searchPanel.getSelectedRecords()
	},
	getActiveP:function(rec){
	   var me=this;
	   var tab=me.getActiveTab();
	   rec.set('type',tab.actiontype);
	   tab.setRecId(rec);
	},
	getActiveType:function(){
		var me=this;
		 var tab=me.getActiveTab();
	    return tab.actiontype;
	},
	setActiveType:function(recs,typename){
	    var me=this;
	    var tab=me.getActiveTab();
	    Ext.each(recs,function(rec){
	    	rec.set(typename,tab.actiontype);
	    });
	},
	//设置记录行信息
	setActiveRecs:function(rec,recs){
		var me=this;
		var selRecs=me.getActiveRecs();
		var tab=me.getActiveTab();
	    var value={};
	   Ext.each(selRecs,function(data){ 
	   			var recClone=rec.copy();
			    switch(tab.actiontype){
			      case 'R':
			      	value.name=data.get('role_name');
			      	value.id=data.get('role_id');
			      break;
			      case 'P':
			      	value.name=data.get('pst_name');
			      	value.id=data.get('pst_code');
			      break;
			      case 'U':
			      	value.name=data.get('name');
			      	value.id=data.get('login_id');
			    }
			    value.type=tab.actiontype
			    recClone.set('tar_id',value.id);
			    recClone.set('tar_name',value.name);
			    recClone.set('tar_type',value.type);
			    recClone.phantom=true;
			    recs.push(recClone);
	   	});
	},
	getActiveRecs:function(){
		 var me=this;
		var recs;
		 var tab=me.getActiveTab();
		  switch(tab.actiontype){
		      case 'R':
		      recs=me.getRoleList();
		      break;
		      case 'P':
		      recs=me.getPstList();
		      break;
		      case 'U':
		      recs=me.getUserList();
		    }
		return recs;
	},
	//设置多行的参数信息
	setActiveName:function(rec,name,recs){
	   var me=this;
	   var selRecs=me.getActiveRecs();
	   var tab=me.getActiveTab();
	    var value;
	   Ext.each(selRecs,function(data){ 
			    switch(tab.actiontype){
			      case 'R':
			      value=data.get('role_name');
			      break;
			      case 'P':
			      value=data.get('pst_name');
			      break;
			      case 'U':
			      value=data.get('name');
			    }
			    rec.set(name,value);
			    recs.push(rec);
	   	}); 
	},
	setActiveParams:function(rec,name,recs){
       var me=this;
       var selRecs=me.getActiveRecs();
	   var tab=me.getActiveTab();
	   var value;
	   Ext.each(selRecs,function(data){ 
			    switch(tab.actiontype){
			      case 'R':
			      value=data.get('role_id');
			      break;
			      case 'P':
			      value=data.get('pst_code');
			      break;
			      case 'U':
			      value=data.get('login_id');
			    }
			    rec.set(name,value);
			    recs.push(rec);
	   	}); 
	}
});