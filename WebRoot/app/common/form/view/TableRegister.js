Ext.define('erp.common.form.view.TableRegister',{
		extend:'erp.ux.Window',
		alias : 'widget.tableScript',
		requires:['erp.common.form.view.TableDefinition',
				  'erp.common.form.store.FrmTbls',
				  'erp.ux.MsgWin',
				  'erp.common.form.view.EditFrmTbl'],
		width:800,
		height:500,
		title:'数据字典定义',
		iconCls:"table",
		modal:true,
		frmtblstore:{},
		initComponent : function() {
			var me = this;
			me.frmtblstore=erp.DataUtil.createStoreFactory('erp.common.form.store.FrmTbls');
    		me.frmtblstore.getProxy().setExtraParam('freg_id',me.fregId);
			Ext.apply(me,{
				layout:'fit',
				items:[{
					xtype:'grid',
					tbar:[{text: '新增',	iconCls:'table_add',		itemId:'frmtbl_add',handler:function(){me.doTblReg();}},
							            {text: '删除',	iconCls:'table_delete',		itemId:'frmtbl_del',	disabled:true,handler:function(){me.doTblDelete()}},
							            {text: '刷新',	iconCls:'table_refresh',	itemId:'frmtbl_reflash',handler:function(){me.frmtblstore.load();}},
									    {text: '字段定义',	iconCls:'table_gear',	itemId:'frmtbl_def',	disabled:true,handler:function(){me.doDefineTable()}},
									  	'-',
							            {text: '重建表',	iconCls:'table_lightning',		itemId:'frmtbl_rebuild',	disabled:true,handler:function(){me.doRebiuldTable()}},
							            {text: '删除表',	iconCls:'table_go',		itemId:'frmtbl_drop',	disabled:true,handler:function(){ me.doDropFrmTbl();}}
								],
				   				columnLines:true,
				   				store:me.frmtblstore,
							    columns:[
										{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
										{text: '名称',dataIndex: 'name',flex:2},
										{text: '表名',dataIndex: 'code',flex:1},
										{text: '表来源',dataIndex:'from_attr',flex:1,renderer:function(v){
											return erp.Util.getFormatText(erp.Const.FRMTBL_FROM_TYPE,v);
										}},
										{text: '类别',dataIndex: 'type',flex:1,renderer:function(v){
											return erp.Util.getFormatText(erp.Const.FRMTBL_TYPE,v);
										}}
										
									],
//								dockedItems: [{
//									xtype: 'pagingtoolbar',
//									store: me.frmtblstore,
//									dock: 'bottom',
//									displayInfo: true
//									}],									
									listeners:{
									selectionchange:function(selModel,selections){
										var n = selections.length || 0;
										var btn = this.down('#frmtbl_del');
										var recs = selModel.getSelection();
										// 删除按钮必须是选中一些行时有效
										if (btn){
											btn.setDisabled(n == 0);
										}
										btn = this.down('#frmtbl_edt');
										// 编辑时只能是选中一行
										if (btn){
											btn.setDisabled(n != 1);
										}
										btn = this.down('#frmtbl_def');
										// 字段定义时只能是选中一行
										if (btn){
											btn.setDisabled(n != 1);
										}
										btn = this.down('#frmtbl_rebuild');
										// 字段定义时只能是选中一行
										if (btn&& recs && recs.length>0){
											btn.setDisabled(n != 1 || recs[0].get('from_attr')!=erp.Const.FRMTBL_FROM_TYPE_USERDEFINE);
										}
										btn = this.down('#frmtbl_drop');
										// 字段定义时只能是选中一行
										if (btn&& recs && recs.length>0){
											btn.setDisabled(n != 1 || recs[0].get('from_attr')!=erp.Const.FRMTBL_FROM_TYPE_USERDEFINE);
										}
									}
								}		
				}],
				buttons : [
					{
						text : '关闭',
						iconCls : 'cancel',
						handler:function(){
							me.close();
						}					
					}]
			})
			me.callParent(arguments);
			me.frmtblstore.load();
		},
		
	  doTblReg:function(){
		  	var me=this;
		  	var rec=Ext.create('erp.common.form.model.FrmTbl');
		  	rec.set('type',me.Type);
		  	rec.set('freg_id',me.fregId);
//		  	var masterRec=me.frmtblstore.findRecord('type',tp.Const.FRMTBL_TYPE_MASTER,0,false,true,true);
//			if(masterRec){
//				//一张单据只能有一张主表
//				rec.set('type',tp.Const.FRMTBL_TYPE_DETAIL);
//			}else
//				rec.set('type',tp.Const.FRMTBL_TYPE_MASTER);
			var edtWin = Ext.widget('edt_FrmTbl',{isAddNew:true,frmTblGridStore:me.frmtblstore});
			edtWin.doInit(rec);
			edtWin.show();
	  },
	  doTblModify:function(){
	  	var me=this;
	  	var grid=me.down('grid');
	  	var rec=grid.getSelectionModel().getSelection()[0];
	  	rec.set('type',me.Type);
	  	var edtWin = Ext.widget('edt_FrmTbl',{isAddNew:true,frmTblGridStore:me.frmtblstore});
	  	edtWin.doInit(rec);
	  	edtWin.show();
	  },
	  doTblDelete:function(){
	  	var me=this;
	  	var grid=me.down('grid');
	  	var rec=grid.getSelectionModel().getSelection()[0];
	  	Ext.Msg.confirm("提示","你确定要删除表【"+rec.get('name')+"】吗?",function(btn){
	  		if (btn=="yes"){
	  			me.frmtblstore.remove(rec);
	  			me.frmtblstore.sync({
	  				success:function(){
	  					Ext.Msg.alert("提示","删除成功!");	
	  				}
	  			})
	  		}
	  	});
	  },
	  doDefineTable:function(){
	  	var me=this;
	  	var grid=me.down('grid');
	  	var rec=grid.getSelectionModel().getSelection()[0];
	  	var win=Ext.widget('table_def');
	  	win.doInit(rec);
	  	win.show();
	  },
	  doRebiuldTable:function(){
		  var selModel = this.down('grid').getSelectionModel();
			if(!selModel.hasSelection()){
				Ext.Msg.alert('提示','请选择一条数据!');
				return;
			}
			var msgWin = Ext.create('erp.MsgWin',{title:'创建数据表'});
			msgWin.show();
			Ext.create('Ext.util.DelayedTask',function(){
				function createTable(tblRec){
					msgWin.addMsg('正在创建数据表['+tblRec.get('name')+'('+erp.Const.TABLE_PREFIX+tblRec.get('code')+')]...');
					erp.SupcanUtil.createFormTable(tblRec.data,function(success,errMsg){
						if(!Ext.isEmpty(success)){
							if(success===true){
								msgWin.addMsg('执行完成:'+errMsg);
							}else{
								msgWin.addMsg('执行失败,原因:'+errMsg);
							}
						}else{
							msgWin.addMsg('出错了：'+errMsg);
						}
					});
				}
				var frmTblRec =selModel.getSelection()[0];
				var tblName=erp.Const.TABLE_PREFIX+frmTblRec.get('code');
				erp.SupcanUtil.existsFormTable(frmTblRec.data,function(isExists,errMsg){
					if(!Ext.isEmpty(isExists))
						if(isExists===true){
							var msg = '数据表['+frmTblRec.get('name')+'('+gp.Const.TABLE_PREFIX+frmTblRec.get('code')+')]已经存在,重建表将导致原表数据丢失,你确定要重建吗?';
							Ext.Msg.confirm('提示',msg,function fn(btnId){
						      if(btnId==='yes')
						    	  createTable(frmTblRec.copy());
							});
						}else
							createTable(frmTblRec.copy());
					else{
						msgWin.addMsg('出错了：'+errMsg);
					}
				});
			}).delay(30);
	  },
	  doDropFrmTbl:function(){
		var selModel = this.down('grid').getSelectionModel();
		if(!selModel.hasSelection()){
			Ext.Msg.alert('提示','请选择一条数据!');
			return;
		}
		var msgWin = Ext.create('erp.MsgWin',{title:'删除数据表'});
		msgWin.show();
		
		Ext.create('Ext.util.DelayedTask',function(){
			var frmTblRec =selModel.getSelection()[0];
			Ext.Msg.confirm('提示','删除表将导致原表数据丢失,你确定要删除吗?',
				function fn(btnId){
			      if(btnId==='no'){
			    	 return;
			      }
			    msgWin.addMsg('正在删除数据表['+frmTblRec.get('name')+'('+erp.Const.TABLE_PREFIX+frmTblRec.get('code')+')]...');
			    //var tblName = gp.Const.TABLE_PREFIX+frmTblRec.get('code');
			    erp.SupcanUtil.dropFormTable(frmTblRec.data,function(success,errMsg){
			    	if(!Ext.isEmpty(success)){
			    		if(success===true){
							msgWin.addMsg('执行完成:'+errMsg);
						}else{
							msgWin.addMsg('执行失败,原因:'+errMsg);
						}
			    	}else{
			    		msgWin.addMsg('出错了：'+errMsg);
			    	}
			    });
			});
		}).delay(30);
		
	}
	});