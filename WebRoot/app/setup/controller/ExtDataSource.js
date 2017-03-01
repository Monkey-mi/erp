Ext.define('erp.setup.controller.ExtDataSource',{
		extend:'Ext.app.Controller',
		uses:['erp.setup.model.ExtDataSource'],
		views:['erp.setup.view.MngExtDataSource',
		       'erp.setup.view.EditExtDataSource'],
		refs:[
		      //创建序列发生器信息列表的一个引用，根据规则调用函数为this.getJYDriverGrid()
		      {ref:'ExtDataSourceGrid',selector:'mng_ExtDataSource gridpanel'}
		      ],	
		init:function(){
			//controller只初始化一次
			if(this.isInited)return ;
			this.control({
				'mng_ExtDataSource':{
					afterrender:function(){
						this.gridStore=this.getExtDataSourceGrid().getStore();
						this.gridStore.load();
					}
				},
				'mng_ExtDataSource gridpanel':{
					//双击序列发生器信息列表时，打开序列发生器信息维护窗口
					itemdblclick: this.onGridItemdbclik,
					select:this.onSelectUnit
				},
				'mng_ExtDataSource gridpanel button':{
					//响应序列发生器信息窗口增、删、改按钮事件
					click: this.onMngExtDataSourceGridBtnClick
				},
				'edit_ExtDataSource button':{
					//响应序列发生器信息维护窗口按钮事件
					click: this.onEditExtDataSourceBtnClick
				}
			});
			//controller初始化完成
			this.isInited=true;
		},
		onSelectUnit:function(rModel,rec,idx,eOpts){
			var org=this.getExtDataSourceGrid().getSelectionModel().getSelection()[0];
			var me=this;
		},
		onGridItemdbclik:function(view,rec){
			//=============界面操作权限相关======================================
			//因为鼠标双击所在行代表修改操作，需要先检查操作权限
//			if(!view.up('mng_ExtDataSource').modFuncsDisabled[erp.Const.FUNC_ITEMID_BTN_EDT])
			this.doEditExtDataSource(rec);
		},
		onMngExtDataSourceGridBtnClick:function(btn){
			//响应组织单元的增、删、改按钮事件
			//=============界面操作权限相关======================================
			//需要先检查操作权限
//		if(!btn.up('mng_ExtDataSource').modFuncsDisabled[btn.itemId])
			switch(btn.itemId){
			case 'FUNC_ITEMID_BTN_ADD':
				this.doAddExtDataSource();
				break;
			case 'FUNC_ITEMID_BTN_EDT':
				this.doEditExtDataSource();
				break;
			case 'FUNC_ITEMID_BTN_DEL':
				this.doDelExtDataSource();
				break;
			case 'FUNC_ITEMID_BTN_REFRESH':
				this.gridStore.load();
				break;
			}
		},
		onEditExtDataSourceBtnClick:function(btn){
			var editWin=btn.up('edit_ExtDataSource');
			var edtForm=editWin.down('form');
			switch(btn.action){
			case 'show':
				break;
			case 'ACT_SAVE':
				if(edtForm.getForm().isValid() && edtForm.getForm().isDirty()){
					var rec = edtForm.getRecord();
					edtForm.updateRecord(rec);
					this.doSaveExtDataSource(rec);
					editWin.close();
				}
				break;
			case 'ACT_CLOSE':
				editWin.close();
				break;
			case 'ACT_TEST':
				var edtForm=editWin.down('form');
				var win=edtForm.up('window');
				if(edtForm.getForm().isValid() && edtForm.getForm().isDirty()){
					var rec = edtForm.getRecord();
					edtForm.updateRecord(rec);
					var postData={data:Ext.encode(rec.data)};
					erp.Const.callServiceMethod(
							'main/DSUtilService.do?method=testExtDataSource',
							postData,
							function(testResult,errMsg){
								if(testResult){
									//测试成功
									Ext.Msg.alert('提示','连接测试成功!');
									win.down('#btnSave').setDisabled(false);
									//...
								}else{
									//不成功
									Ext.Msg.alert('提示','连接失败!错误信息:\r\n'+errMsg);
									win.down('#btnSave').setDisabled(true);
									//...
								}
							}
					);
				}
				
				break;
			}
		},
		doTestExtDataSource:function(edsRec){
			var postData={data:Ext.encode(edsRec.data)};
			erp.Const.callServiceMethod(
					'main/DSUtilService.do?method=testExtDataSource',
					postData,
					function(testResult,errMsg){
						if(testResult){
							//测试成功
							Ext.Msg.alert('提示','连接测试成功!');
							Ext.getCmp('btnSave').setDisabled(false);
							//...
						}else{
							//不成功
							Ext.Msg.alert('提示','连接失败!错误信息:\r\n'+errMsg);
							Ext.getCmp('btnSave').setDisabled(true);
							//...
						}
					},
					{
						timeout:3*60*1000  //默认是30秒超时,初始化耗时较多增加为180秒
					}
			);
		},
		doAddExtDataSource:function(){
			var rec=Ext.create('erp.setup.model.ExtDataSource');
			var edtWin=Ext.widget('edit_ExtDataSource',{isAddNew:true});
			rec.set('dstype','MYSQL');
			rec.set('srvaddr','localhost');
			rec.set('srvport',3306);
			rec.set('dbname','mysql');
			rec.set('srvlogin','root');
			edtWin.down('form').loadRecord(rec);
			edtWin.show();
		},
		doEditExtDataSource:function(){
			//需要做一些逻辑检查
			var selModel = this.getExtDataSourceGrid().getSelectionModel();
			if(!selModel.hasSelection()){
				Ext.Msg.alert('提示','请选择一条外部数据源!');
				return;
			}
			var rec =selModel.getSelection()[0];
			var edtWin = Ext.widget('edit_ExtDataSource',{isAddNew:false});
			edtWin.down('form').loadRecord(rec);
			edtWin.show();
		},
		doDelExtDataSource:function(){
			//删除前需要做一些逻辑检查
			var me = this;
			var selModel = me.getExtDataSourceGrid().getSelectionModel();
			if(!selModel.hasSelection()){
				Ext.Msg.alert('提示','请选择一条外部数据源!');
				return;
			}
			var rec =selModel.getSelection()[0];
			Ext.Msg.confirm('提示','你确信要删除该条外部数据源吗?',
					function fn(id){
						if(id==Ext.Msg.buttonIds[1]){
							me.gridStore.remove(rec);
							me.gridStore.sync();
						}
			});
		},
		doSaveExtDataSource:function(rec){
			if(this.gridStore.indexOf(rec) < 0){
				this.gridStore.add(rec);
			}
			this.gridStore.sync({
				success:function(batch,options){
					this.gridStore.sort();
					/*
					Ext.Msg.alert('保存成功!');*/
				},
				failure:function(batch,options){
					Ext.Msg.alert('保存失败!');
				},
				scope:this
			});
		}
		
});