Ext.define('erp.user.view.MngRoleCon',{
	extend:'erp.ux.Panel',
	alias:"widget.mng_rolecon",
	layout:'fit',
	requires:['erp.user.store.RoleConfig'
	          ,'erp.user.store.Roles'
	          ],
	doInit:function(roleRec){
		var me=this;
		me.fromGrid=me.down('#from_grid');
		me.toGrid=me.down('#to_grid');
		me.fromStore = me.fromGrid.getStore();
		me.toStore = me.toGrid.getStore();
		
		me.fromStore.load({callback:function(){
			//1.从备选里面剔除被配置的角色本身
			me.toStore.load({
				params:{
					role_id:roleRec.get('role_id')
				},
				callback:function(recs){
					Ext.each(recs,function(rec){
						//2.从备选里面剔除已选的
						var role=me.fromStore.findRecord('role_id',rec.get('con_id'),0,false,false,true);
						if(role){
							me.fromStore.remove(role);
						}
					});
				}
			});
		}});
		},
		onSelBtnClick:function(btn){
			switch(btn.action){
				case 'act_left_all':
					this.delAllModel();
					break;
				case 'act_right_all':
					this.addAllModel();
					break;
				case 'act_left':
					this.delModel();
					break;
				case 'act_right':
					this.addModel();
					break;
				case 'act_up':
					break;
				case 'act_down':
					break;
			}
		},
		initComponent:function(){
			var me=this;
			//提取所有角色，用来显示名称
            me.allRoles = erp.DataUtil.getStoreByStoreManager(erp.DataConst.ROLE); 
            Ext.Ajax.request({
               url:'main/Users.do?method=getRoleList',
               async:false,
               method:'post',
               success:function(resp){
                 var textObj=Ext.decode(resp.responseText);
                 me.allRoles.loadData(textObj.data);
               }
            });
			Ext.apply(me,{
				items:[{layout:'hbox',
					items:[
				       {
				    	   xtype:'grid',
				    	   region:'west',
				    	   store:Ext.create('erp.user.store.Roles'),
				    	   itemId:'from_grid',
				    	   height:300,
				    	   flex:3,
				        	 multiSelect : true,//支持多选  
				        	 columnLines:true,
				    	   columns:[
				    	            {
				    	            	text:'待配置',dataIndex:'role_id',flex:1,
				    	            	renderer:function(v){
					    	            	var rec=me.allRoles.findRecord('role_id',v,0,false,false,true);
					    	            	return rec.get('role_name');
					    	            }
				    	            }
				    	            ]
				       },
				       {
				    	   width:30,
				    	   height:300,
				    	   layout:{
				    	           type:'vbox',
				    	           pack:'center',
				    	           align:'center'
				    	   },
				    	   itemId:'buttons',
				    	   defaults:{
				    		   width:25,
				    		   scope:this,
				    		   handler:this.onSelBtnClick
				    	   },
				    	   items:[
									{xtype:'button',text:'>',action:'act_right'},
									{xtype:'button',text:'<',action:'act_left'},
									{xtype:'button',text:'>>',action:'act_right_all'},
									{xtype:'button',text:'<<',action:'act_left_all'}
	
				    	          ]
				       },
				       {
				    	   xtype:'grid',
				    	   itemId:'to_grid',
				    	   flex:3,
				    	   height:300,
				           multiSelect : true,//支持多选  
				           columnLines:true,
				    	   store:Ext.create('erp.user.store.RoleConfig'),
				    	   columns:[
				    	            {text:'已配置',dataIndex:'con_id',flex:1,renderer:function(v){
				    	            		var rec=me.allRoles.findRecord('role_id',v,0,false,false,true);
					    	            	return rec.get('role_name');
				    	            }}
				    	   ]
				       }
				       ]
				}  ]
			});
			me.callParent(arguments);
		},
	addModel:function(){
		var me=this;
		var recs=me.fromGrid.getSelectionModel().getSelection();
		Ext.each(recs,function(rec){
			var config=Ext.create('erp.user.model.RoleConfig',{
				role_id:me.role.get('role_id'),
				con_id:rec.get('role_id')
			});
			me.toStore.add(config);
		});
		me.fromStore.remove(recs);
	},
	delModel:function(){
		var me=this;
		var recs=me.toGrid.getSelectionModel().getSelection();
		Ext.each(recs,function(rec){
			var role=Ext.create('erp.user.model.Role',{
				role_id:rec.get('con_id')
			});
			me.fromStore.add(role);
		});
		me.toStore.remove(recs);
	},
	addAllModel:function(){
		var me=this;
		var recs=me.fromStore.getRange();
		Ext.each(recs,function(rec){
			var config=Ext.create('erp.user.model.RoleConfig',{
				role_id:me.role.get('role_id'),
				con_id:rec.get('role_id')
			});
			me.toStore.add(config);
		});
		me.fromStore.remove(recs);
	},
	delAllModel:function(){
		var me=this;
		var recs=me.toStore.getRange();
		Ext.each(recs,function(rec){
			var role=Ext.create('erp.user.model.Role',{
				role_id:rec.get('con_id')
			});
			me.fromStore.add(role);
		});
		me.toStore.remove(recs);
	},
	save:function(){
		this.toStore.sync();
	}
});