Ext.define('erp.user.view.MngUserMapping',{
	extend:'erp.ux.Panel',
	alias:'widget.usr_map',
	title:'账号映射',
	iconCls:'link',
	height: 300,
	isAdd:false,
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.user.store.UserMapping').load({params:{u_id:me.currentUser.get('u_id')}});
		Ext.apply(me,{
			layout:'fit',
			dockedItems:[{
				xtype:'toolbar',
				dock:'top',
				hidden:!me.isEdit,
				items:[{text:'新增',iconCls:'link_add',itemId:erp.Const.FUNC_ITEMID_BTN_ADD,handler:function(){me.doAdd()}},
				{text:'删除',itemId:erp.Const.FUNC_ITEMID_BTN_DEL,iconCls:'link_delete',
				handler:function(){me.doDelete();}
				}
//			'-', {text: '保存',	iconCls:'save',itemId:'btn_save',	action:'Save',   disabled : true
//			,handler:function(){
//			me.doSave();
//			}
//			},
//    		{text: '取消',	iconCls:'cancel',	itemId:'btn_cancel',action:'Cancel',   disabled : true,
//    		handler:function(){
//    			if (me.isAdd){
//    			 	me.store.remove(me.store.getNewRecords());
//    			}
//    			me.setBtnStatus(false);   			
//    		}
    		]
    		}],
			items:[{xtype:'grid',
			itemId:'grdUserMapping',
			listeners:{
				select:function(g,r){
					var grid=me.down('#grdUserMapping');
					if(r.get('sys_name')=='SRM'){
						grid.columns[1].setHidden(true);
						grid.columns[2].setHidden(false);
					}else{
						grid.columns[1].setHidden(false);
						grid.columns[2].setHidden(true);
					}
				}
			},
			columns:[
			{header:'系统名称',flex:1,dataIndex:'sys_name',editor:{
				xtype:'combo',
				store:erp.DataUtil.getComboStore(erp.Const.APP_SYS),
				displayField:'name',
				valueField:'value',
				editable:false,
				listeners:{
					'select':function(c,r){
						var grid=me.down('#grdUserMapping');
						if(r.get('name')=='SRM平台'){
							grid.columns[1].setHidden(true);
							grid.columns[2].setHidden(false);
						}else{
							grid.columns[1].setHidden(false);
							grid.columns[2].setHidden(true);
						}
					}
				}
			},renderer:function(v){
					return erp.Util.getFormatText(erp.Const.APP_SYS,v);
			}
			},
			{header:'对应用户名',flex:2,dataIndex:'ref_u_id',editor:{
				xtype:'helpField',
				code:erp.DataConst.OPERATOR,
				flex:1
			}
			},
			{header:'对应用户名',flex:2,hidden:true,dataIndex:'ref_u_id',editor:{
				xtype:'helpField',
				code:erp.DataConst.SubAccout,
				flex:1
			}
			}
			],
			 plugins: [
			        Ext.create('Ext.grid.plugin.CellEditing', {
			        	pluginId: 'celledit',
			            clicksToEdit: 1,
			            listeners:{
					        beforeedit:function(editor,con,e){
					        	
					        },
					        edit:function(editor,con,e){
					        	var field=con.field;
					        	var rec=con.record;
					        }
					    }
			        })
			  ],
			store:me.store
		}]
		});
		me.callParent(arguments);
	},
	doAdd:function(){
		var me=this;
		var grid=me.down('#grdUserMapping');
		var rowEditing=grid.getPlugin('celledit');
		var r=Ext.create('erp.user.model.UserMapping',{
					status:0
		});
		rowEditing.cancelEdit();
  		grid.getStore().insert(0,r);
  		rowEditing.startEdit(0,0); 
  		me.isAdd=true;
//  		me.setBtnStatus(true);
	},
	doDelete:function(){
		var me=this;
		var rec=me.down('#grdUserMapping').getSelectionModel().getSelection()[0];
		
		if (rec){
		if (rec.get('id')==0)
			me.store.remove(rec);
		else
		{
		Ext.Msg.confirm('提示','你确定要删除吗?',function(btn){
			if (btn=="yes"){
				me.store.remove(rec);
				me.store.sync({
					success:function(){
						Ext.Msg.alert('提示',"删除成功!");
					}
				});
			}
		});
		}
		}
		else
			Ext.Msg.alert('提示',"请选择一笔记录!");
	},
	setBtnStatus:function(sts){
		var me=this;
		me.down('#'+erp.Const.FUNC_ITEMID_BTN_ADD).setDisabled(sts);
		me.down('#'+erp.Const.FUNC_ITEMID_BTN_EDT).setDisabled(sts);
		me.down('#'+erp.Const.FUNC_ITEMID_BTN_DEL).setDisabled(sts);
		me.down('#btn_save').setDisabled(!sts);
		me.down('#btn_cancel').setDisabled(!sts);
	},
	doSave:function(){
		var me=this;
		me.store.each(function(rec){
			if(rec){
			if (Ext.isEmpty(rec.get('sys_name'))||Ext.isEmpty(rec.get('ref_u_id')))
					me.store.remove(rec);
			else
					rec.set('u_id',me.currentUser.get('u_id'))	;
			}		
		});
		 me.store.sync();
	},
	SaveCtr:function(user_id){
		var me=this;
		if(user_id)
    		me.currentUser.set('u_id',user_id);
   		me.doSave();
	},
	doInit:function(model){
		
	},
	changeOrg:function(ou_id,userOrg){}
});