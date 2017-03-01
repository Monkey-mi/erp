Ext.define('erp.setup.view.OrgDeptAuth',{
	extend:'erp.ux.Panel',
	alias : 'widget.orgdeptauth',
	requires:['erp.setup.store.OrgTreeNodes',
	          'erp.setup.store.DeptTreeNodes',
	          'Ext.ux.CheckColumn'
	          ],
	defaults: {
			split: true,
	        autoScroll:true,
	        useSplitTips: true,
	        containerScroll:true,
	        layout: 'fit'
	    },
	title:'组织授权',    
	//内部变量
	deptAuthCache: Ext.create('Ext.util.HashMap'),
	saveFlag : false,
	//对外接口部分--开始    
	isEdit:false,
	isAddNew:false,
	currentOuId:0,
	currentDeptId:0,
	currentUser:null,
	showDeptTree:true,
	//对外接口部分--结束
	
	tarLoginId:'ccccc',
	getLoginId:function(){
	   var me=this;
	   if(Ext.isEmpty(me.currentUser))
	       return me.tarLoginId;
	   else
	       return me.currentUser.get('login_id');
	},
	doCheckValid:function(){
		var me = this;
	    if(!erp.UInfo.isAdmin){
	    	//1.在非超级用户模式下,所操作的用户必须指定一个默认组织
    		var bFind = false;
    		var rootNode = me.orgTreeStore.getRootNode();
    		rootNode.cascadeBy(function(node){
               if(node.get('is_default')){
                    bFind = true;
                    return false;
               }
            });
            if(!bFind){
            	Ext.Msg.alert('提示','必须给用户指定一个默认组织!');
                return false;
            }
		}
        return true;
	},
	SaveCtr:function(u_id){
		var me = this;
		//保存前做一些检查,如果不能通过则不予保存
		if(!me.doCheckValid())
		    return false;
		
		//保存组织授权
		var orgRecs = me.getModifiedRecs(me.orgTreeStore);
		var orgauth=[];
        Ext.each(orgRecs,function(rec){
        	orgauth.push(rec.data);
		});
		
		//保存部门授权
		//1.取出缓存的部门授权
		var deptRecsArray = me.deptAuthCache.getValues();
		//2.取出当前的部门授权
		var curDeptRecs = me.getModifiedRecs(me.deptTreeStore);
		deptRecsArray.push(curDeptRecs);
		var deptauth=[];
        Ext.each(deptRecsArray,function(deptRecs){
			Ext.each(deptRecs,function(rec){
                deptauth.push(rec.data);
            });
		});
		//一次性提交授权信息
        if(orgauth.length>0||deptauth.length>0){
        	//只有修改过后才需要保存
            var postData ={
              u_id :u_id||me.currentUser.get('u_id'),
              orgauth : Ext.encode(orgauth),
              deptauth : Ext.encode(deptauth)
            };
        	erp.Const.callServiceMethod('main/OrgService.do?method=saveOrgDeptAuth',
        		{data:Ext.encode(postData)},
        		function(result,errMsg,total,ajaxCode){
        			if(ajaxCode!=200){
        			     alert('保存出错:'+errMsg);
        			}else{
        				 me.saveFlag = true;
        				 //清除部门授权缓存
        				 me.deptAuthCache.clear();
        				 //重置组织树节点状态
        			     Ext.each(orgRecs,function(rec){
        			         rec.commit();
        			     });
        			     //重置部门树节点状态
        			     Ext.each(curDeptRecs,function(rec){
        			     	 rec.commit();
        			     });
        			}
    		    }
    		);
        }
        return true;
	},    
	initComponent:function(){
    	var me=this;
    	/*me.addEvents(
    	   *//**
    	    * 组织选择发生变化
    	    * @param ou_id
    	    * @param nodeRecord
    	    *//*
    	   'orgSelected',
    	   *//**
    	    * 默认组织被设定时
    	    * @param ou_id
    	    * @param nodeRecord
    	    *//*
    	   'defaultOrgChecked',
    	   *//**
    	    * 默认部门被设定时
    	    * @param d_id
            * @param nodeRecord
    	    *//*
    	   'defaultDeptChecked');*/
    	me.orgTreeStore = Ext.create('erp.setup.store.OrgTreeNodes',{
    	  proxy : {
                type : 'ajax',
                actionMethods:{'read':'post'},
                extraParams:{login_id:me.getLoginId()},
                url:'main/Orgs.do?method=getAuthOrgTreeByUser',
                reader : {
                    type : 'json',
                    rootProperty : 'data',
                    messageProperty : 'message'
                }
                
          }
    	});
    	me.deptTreeStore = Ext.create('erp.setup.store.DeptTreeNodes',{
    	  proxy : {
                type : 'ajax',
                actionMethods:{'read':'post'},
                url:'main/Orgs.do?method=getAuthDeptTreeByOrgUser',
                reader : {
                    type : 'json',
                    rootProperty : 'data',
                    messageProperty : 'message'
                }
          }
    	});
    	Ext.apply(this,{
    		 layout: 'border',
	    	 items:[
	    	      {
	    	      /*tbar : [{
                        text : '保存',
                        iconCls : 'page_saveIcon',
                        handler: function(){
                            me.SaveCtr();
                        }},
                        {
                        text : '刷新',
                        iconCls : 'page_refreshIcon',
                        handler: function(){
                        	me.orgTreeStore.getRootNode().collapse();
                            me.reloadDeptAuthTree('','');
                            me.deptAuthCache.clear();
                            me.deptAuthTree.setVisible(false);
                            me.orgTreeStore.load();
                        }
                  }],*/	
            	  xtype:'treepanel',
            	  itemId:'orgAuthTree',
            	  //title:'组织',
            	  region:'center',
            	  flex:2,
                  rootVisible: true,
                  border:true,
				  useArrows:false,//是否显示小箭头  
			      lines:true, //节点之间虚线  
			      store:me.orgTreeStore,
    			  root:{
                        id: 0,
                        text: '组织机构',
                        leaf: false,
                        expanded: false,
                        iconCls: 'org-tree-node-root'
                  },
                  //allowDeselect: true,
				  columnsLine:true,
                  columns:[
                    	         {
                    	        	xtype:'treecolumn', 
                    	            text:'组织名称',
                    	            flex:2,
                    	            sortable:true,
                    	            dataIndex:'text'
                    	         },
                    	         {
                    	        	 xtype: 'checkcolumn',
     								 header:'默认',
                    	        	 dataIndex:'is_default',
                    	        	 width:60,
                    	        	 stopSelection: false,
                                     listeners:{
                                        checkchange:me.orgAuthTreeCheckChg,
                                        scope:me
                                     }
                    	         },
                    	         {
                                     xtype: 'checkcolumn',
                                     header:'可操作',
                                     dataIndex:'has_curd',
                                     width:60,
                                     stopSelection: true,
                                     listeners:{
                                        checkchange:me.orgAuthTreeCheckChg,
                                        scope:me
                                     }
                                 },
                                 {
                                     xtype: 'checkcolumn',
                                     header:'可查询',
                                     dataIndex:'has_qry',
                                     width:60,
                                     stopSelection: true,
                                     listeners:{
                                        checkchange:me.orgAuthTreeCheckChg,
                                        scope:me
                                     }
                                 },
                    	         {
                    	        	 xtype:'checkcolumn',
                    	        	 text:'权限1',
                    	        	 dataIndex:'has_op1',
                    	        	 hidden:true,
                    	        	 stopSelection: true,
                    	        	 width:60
                    	         },
                    	         {
                    	        	 xtype:'checkcolumn',
                    	        	 text:'权限2',
                    	        	 dataIndex:'has_op2',
                    	        	 hidden:true,
                    	        	 stopSelection: true,
                    	        	 width:60
                    	         },
                    	         {
                    	        	 xtype:'checkcolumn',
                    	        	 text:'权限3',
                    	        	 dataIndex:'has_op3',
                    	        	 hidden:true,
                    	        	 stopSelection: true,
                    	        	 width:60
                    	         },
                                 {
                                     xtype:'checkcolumn',
                                     text:'权限4',
                                     dataIndex:'has_op4',
                                     hidden:true,
                                     stopSelection: true,
                                     width:60
                                 }
                    	 ],
                    listeners:{
                    	selectionchange:function(sm,selRecs,eOpts){
                    	   
                    	   //如果当前部门授权有变动,先存入缓存
                    	   var modifiedDeptAuth = me.getModifiedRecs(me.deptTreeStore);
                    	                       	   
                    	   if(me.currentOrg&&modifiedDeptAuth.length>0)
                    	       me.deptAuthCache.add(me.currentOrg.get('ou_id'),modifiedDeptAuth);
                    	   
                    	   var rec = selRecs[0];
                           var ou_code = rec.get('ou_code');
                           var ou_name = rec.get('text');
                           me.currentOrg = rec;
                           me.reloadDeptAuthTree(ou_code,ou_name);
                           me.fireEvent('orgSelected',rec.get('ou_id'),rec);
                          
                        },
                        scope:me
                    }
               },
               {    
                  xtype:'treepanel',
                  itemId:'deptAuthTree',
                  //title:'部门',
                  region:'south',
                  flex:1,
                  rootVisible: true,
                  border:true,
                  useArrows:false,//是否显示小箭头  
                  lines:true, //节点之间虚线 
                  store:me.deptTreeStore,
                  root: {
                    id:0,
                    text:'根部门',
                    leaf:false,
                    expand:true
                  },
                  hidden:true,
                  //allowDeselect: true,
                  columnsLine:true,
                  columns:[
                                 {
                                    xtype:'treecolumn', 
                                    header:'部门名称',
                                    flex:2,
                                    sortable:true,
                                    dataIndex:'text'
                                 },
                                 {
                                     xtype: 'checkcolumn',
                                     text:'默认',
                                     dataIndex:'is_default',
                                     width:60,
                                     stopSelection: false,
                                     listeners:{
                                        checkchange:me.deptAuthTreeCheckChg,
                                        scope:me
                                     }
                                 },
                                 {
                                     xtype: 'checkcolumn',
                                     text:'可操作',
                                     dataIndex:'has_curd',
                                     width:60,
                                     stopSelection: true,
                                     listeners:{
                                        checkchange:me.deptAuthTreeCheckChg,
                                        scope:me                                     
                                     }
                                 },
                                 {
                                     xtype: 'checkcolumn',
                                     text:'可查询',
                                     dataIndex:'has_qry',
                                     width:60,
                                     stopSelection: true,
                                     listeners:{
                                        checkchange:me.deptAuthTreeCheckChg,
                                        scope:me                                     
                                     }
                                 },
                                 {
                                     xtype:'checkcolumn',
                                     text:'权限1',
                                     dataIndex:'has_op1',
                                     hidden:true,
                                     stopSelection: true,
                                     width:60
                                 },
                                 {
                                     xtype:'checkcolumn',
                                     text:'权限2',
                                     dataIndex:'has_op2',
                                     hidden:true,
                                     stopSelection: true,
                                     width:60
                                 },
                                 {
                                     xtype:'checkcolumn',
                                     text:'权限3',
                                     dataIndex:'has_op3',
                                     hidden:true,
                                     stopSelection: true,
                                     width:60
                                 },
                                 {
                                     xtype:'checkcolumn',
                                     text:'权限4',
                                     dataIndex:'has_op4',
                                     hidden:true,
                                     stopSelection: true,
                                     width:60
                                 }
                         ],
                    listeners:{
                        load:function(store,node,deptRecs,success){
                        	if(success){
                               me.deptAuthTree.setVisible(me.showDeptTree&&!Ext.isEmpty(deptRecs));
                               //如果目标组织存在部门授权缓存，那么需要把部门授权缓存设置到对应的部门上
                               var ou_id = me.currentOrg.get('ou_id');
                               if(me.deptAuthCache.containsKey(ou_id)){
                                  var oldRecs = me.deptAuthCache.get(ou_id);
                                  me.deptAuthTree.getRootNode().cascadeBy(function(node){
                                      if(!node.isRoot()){
                                          Ext.each(oldRecs,function(oldRec){
                                            if(node.get('id')==oldRec.get('id')){
                                                node.set('is_default',oldRec.get('is_default'));
                                                node.set('has_qry',oldRec.get('has_qry'));
                                                node.set('has_curd',oldRec.get('has_curd'));
                                                node.set('has_op1',oldRec.get('has_op1'));
                                                node.set('has_op2',oldRec.get('has_op2'));
                                                node.set('has_op3',oldRec.get('has_op3'));
                                                node.set('has_op4',oldRec.get('has_op4'));
                                            }
                                       });
                                      }
                                  });
                                  //3.最后只要设置过了(有可能加载上来的有变化了),就从cache里面清除该组织
                                  me.deptAuthCache.removeAtKey(ou_id);
                               }
                             }
                        }
                    }
               }
               ]
    	});
    	this.callParent(arguments);
    },
    listeners:{
        afterrender:function(cmp){
        	var me = cmp;
        	me.orgAuthTree = me.down('#orgAuthTree');
        	me.deptAuthTree = me.down('#deptAuthTree');
        	me.orgTreeStore.getRootNode().expand(false,function(){
        	   var rootNode = me.orgTreeStore.getRootNode();
                   rootNode.cascadeBy(function(node){
                   	   if(me.isAddNew){
                   	   	   //新增用户时默认组织就是当前指定的组织
                           if(me.currentOuId==node.get('ou_id')){
                   	   	   	    node.set('is_default',true);
                   	   	   	    me.setDefaultNode(me.orgTreeStore,true,node);
                   	   	   	    me.orgAuthTree.selectPath(node.getPath());
                                me.fireEvent('defaultOrgChecked',node.get('ou_id'),true,node);
                   	   	   }
                   	   }else{
                   	   	   //查看和修改时根据实际授权来
                   	   	   if(node.get('is_default')){
                                me.orgAuthTree.selectPath(node.getPath());
                                me.fireEvent('defaultOrgChecked',node.get('ou_id'),true,node);
                           }
                   	   }
                   });
        	});
         },
        scope:this
    },
    orgAuthTreeCheckChg:function(chkColumn, recordIndex, checked, record){
    	var me  = this;
    	//处理check动作
    	var ret = this.onTreeCheckChg(chkColumn, recordIndex, checked, record,this.orgTreeStore);
    	me.deptAuthTree.selectPath(record.getPath());
    	if(ret == true){
    		//只有Check动作完成，且是当前所选中的组织节点时才能触发事件
        	var sm = this.orgAuthTree.getSelectionModel();
        	var selRecs = sm.getSelection();
        	if(selRecs.length>0){
    	       if(selRecs[0].get('id')==record.get('id'))
    	           me.fireEvent('orgSelected',record.get('ou_id'),record);
    	    }
    	}
    	if(chkColumn.dataIndex=='is_default')
    	   me.fireEvent('defaultOrgChecked',record.get('ou_id'),checked,record);
    },
    deptAuthTreeCheckChg:function(chkColumn, recordIndex, checked, record){
    	var me = this;
    	var ret = me.onTreeCheckChg(chkColumn, recordIndex, checked, record,this.deptTreeStore);
    	if(chkColumn.dataIndex=='is_default')
           me.fireEvent('defaultDeptChecked',record.get('ou_id'),checked,record);
    },
    onTreeCheckChg:function(chkColumn, recordIndex, checked, record,store){
        var me = this;
        var ret = true;
        if(checked&&record.isRoot()){
           //不允许操作根节点
           record.set(chkColumn.dataIndex,false);
           return false;
        }
        
        switch(chkColumn.dataIndex){
           case 'is_default':
               ret = me.setDefaultNode(store,checked,record);
               break;
           case 'has_curd':
               ret = me.setCurdNode(checked,record);
           case 'has_qry':
               ret = me.setQryNode(checked,record);
               break;
           default:
               break;
        }
        return ret;
    },
    /*设置默认节点*/
    setDefaultNode:function(treeStore,checked,record){
    	var me = this;
    	var ret = true;
    	if(checked){
    	   //1.只能有一个默认节点,那么需要把其他默认清除掉
    	   var rootNode = treeStore.getRootNode();
    	   rootNode.cascadeBy(function(node){
    	       if(node.get('id')!=record.get('id')){
    	           if(node.get('is_default'))
    	               node.set('is_default',false);
    	       }
    	   });
    	   //2.某节点如果设为default,那么该节点默认应该具有curd和qry
    	   ret = me.setCurdNode(checked, record);
    	}
    	return ret;
    },
    //设置curd节点
    setCurdNode:function(checked,record){
    	var me = this;
    	var ret = true;
    	if(checked){
    		record.set('has_curd',true);
    	    ret = me.setQryNode(checked,record);
        }else if(!checked&&record.get('is_default')){
        	//拥有default时必然拥有curd
            record.set('has_curd',true);
        }
        return ret;
    },
    //设置qry节点
    setQryNode:function(checked,record){
    	var me = this;
    	var ret = true;
        if(checked){
        	record.set('has_qry',true);
            //默认是将所有下级节点都勾选
        	record.cascadeBy(function(node){
        	   if(node!=record){
        	     node.set('has_qry',true);          	   
        	   }
        	});
        }else if(!checked&&record.get('has_curd')){
        	//拥有curd时必然拥有qry
            record.set('has_qry',true);
        }
        return ret;
    },
    reloadDeptAuthTree:function(ou_code,ou_name){
    	var me = this;
        Ext.apply(me.deptTreeStore.getProxy().extraParams, {
                                ou_code: ou_code,
                                login_id: me.getLoginId()
        });
        me.deptTreeStore.setRootNode({
            id: 0,
            text: ou_name + '的下属部门',
            leaf: false,
            expanded: false,
            iconCls: 'dept-tree-node-root'
        });
        me.deptTreeStore.getRootNode().expand(false,function(){
           var rootNode = me.deptTreeStore.getRootNode();
               rootNode.cascadeBy(function(node){
               	   if(me.isAddNew){
                       //新增用户时默认组织就是当前指定的组织
                       if(me.currentDeptId==node.get('id')){
                            node.set('is_default',true);
                            me.setDefaultNode(me.deptTreeStore,true,node);
                            me.deptAuthTree.selectPath(node.getPath());
                            me.fireEvent('defaultDeptChecked',node.get('id'),true,node);
                       }
                   }else{
                       //查看和修改时根据实际授权来
                       if(node.get('is_default')){
                            me.deptAuthTree.selectPath(node.getPath());
                            me.fireEvent('defaultDeptChecked',node.get('id'),true,node);
                       }
                   }
               });
        });
    },
    /*取得真正被修改过的树节点*/
    getModifiedRecs:function(store){
    	var recs = store.getModifiedRecords();
    	Ext.each(recs,function(rec){
    	   //1.剔除根节点的变化
           if(rec.isRoot()){
               rec.commit();
               return true;
           }
    	   //2.剔除仅仅是树节点展开而带来expanded属性变化的节点,
           var n = 0;
    	   var has_expanded = false;
    	   for(var p in rec.modified){
    	       n++;
    	       has_expanded=p==='expanded';
    	   }
    	   if(n==1&&has_expanded)
    	       rec.commit();
    	});
    	//重新提取一遍
    	return store.getModifiedRecords();
    }
});