Ext.define('erp.view.master.category.CategoryController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'erp.view.master.category.window.EdtCategory',
        'erp.ux.ComboxTree'
    ],
	control:{
		'category #categoryBar button':{
			click:'onClickButton'			
		}
	},
    alias: 'controller.category',

    onClickButton: function (btn) {
    	var panel=btn.up('panel');
    	var tree=this.lookupReference('categorytree');
    	var mainGrid=this.lookupReference('categoryGrid');
    	var eastGrid=this.lookupReference('CategoryAuthority');
    	var cooperateGrid = this.lookupReference('cooperateGrid');
    	switch(btn.itemId){
			case 'BTN_ADD':
				var treeSelected=tree.getSelectionModel().getSelection()[0];
				var nodeId="0";
				var jc=1;
				var newlbbh=null;
				if(treeSelected!=null){
					var nodeId=treeSelected.get('nodeId');
				}
				if (treeSelected!=null&&(treeSelected.get('leaf') == 1 || treeSelected.get('leaf') == "1")) {
					Ext.Msg.alert("提示", treeSelected.get('text')+"是末级不能添加下级!");
					break;
				}
				//获取最新区域编号
				if(nodeId=="0"){
					Ext.Ajax.request({
						url: 'category/category.act?method=getCategoryOne',
						async:false,//设置ajax同步
					    success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newlbbh=obj.data;
					    },
					    method:"POST",
					    scope:this
					});
				}else{
					nodeId=nodeId.toString();
					jc=nodeId.length/2+1;
					if(jc>=5){
						Ext.Msg.alert('提示','最多只能设置五级类别!');
						break;
					}
					Ext.Ajax.request({
						async:false,//设置ajax同步
						url: 'category/category.act?method=getCategoryTwo',
					    success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newlbbh=nodeId+obj.data;
					    },
					    method:"POST",
					    params:{lbbh:nodeId,lbjc:jc},
					     scope:this
					});
				}
				var r = Ext.create('erp.view.master.category.model.Category', {
							lbbh : parseInt(newlbbh)+1,
							lbjc : jc 
				});
				this.edtShow(r,true,true);
			break;
			case 'BTN_EDT':
				var rec=mainGrid.getSelectionModel().getSelection()[0];
				if(rec==null){
					Ext.Msg.alert('提示','请选择需要修改的明细!');
					break;
				}
				this.edtShow(rec,false,true);
			break;
			case 'BTN_DEL':
				var store=mainGrid.getStore();
				var recs=mainGrid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请选择需要删除的明细!');
					break;
				}
				//删除前判断数据
				var recordData = "["; //参数
				var a=false;
				Ext.each(recs, function(rec) {
						if (a) {
							recordData += ",";
						}
						recordData += Ext.encode(rec.data);
						a = true;
					})
				recordData += "]";
				var result = erp.Const.callServiceMethodSync(
						'category/category.act?method=getBeforDelete', {
							recordData : recordData
						});
				var data = Ext.decode(result);
				if (data.bool == false) {
					Ext.Msg.alert('提示', data.msg)
					break;
				}
				Ext.Msg.confirm('提示','是否确认删除所选记录?',function(btn){
					if (btn=='yes'){
						store.remove(recs);
						store.sync({
							callback:function(){
								store.loadPage(1);
							}
						});
					}			
				});
			break;
			case 'addCooperate_btn':
			    var win = Ext.create('erp.master.operator.view.CooperatorImp');
			    var rec=mainGrid.getSelectionModel().getSelection()[0];
			    if(rec==null){
					Ext.Msg.alert('提示','请选择需要修改的明细!');
					break;
				}
				var lbbh=rec.get('lbbh');
				var lbjc=rec.get('lbjc');
				var lbmc=rec.get('lbmc');
				win.down('#btn_confirm').on({
					click:function(btn){
						var win=btn.up('window');
						recs=win.selStore.getRange();
						var recordData = "["; //参数
						var a=false;
						Ext.each(recs, function(rec) {
								if (a) {
									recordData += ",";
								}
								recordData += Ext.encode(rec.data);
								a = true;
							})
						recordData += "]";
						var result = erp.Const.callServiceMethodSync(
								'category/category.act?method=getLoadCooperate', {
									recordData : recordData,lbbh:lbbh,lbjc:lbjc,lbmc:lbmc
								});
						var data = Ext.decode(result);
						cooperateGrid.getStore().load({params:{lbbh:lbbh}});
						win.close();
						if(!Ext.isEmpty(data.msg)){
							Ext.Msg.alert('提示', data.msg);
							return ;
						}
					}
				})
				win.show();
			break;	
			case 'addOperator_btn':
				var win =Ext.create('erp.master.operator.view.OperatorImp');
				var rec=mainGrid.getSelectionModel().getSelection()[0];
				if(rec==null){
					Ext.Msg.alert('提示','请选择需要修改的明细!');
					break;
				}
				var lbbh=rec.get('lbbh');
				var lbjc=rec.get('lbjc');
				var lbmc=rec.get('lbmc');
				win.down('#btn_confirm').on({
					click:function(btn){
						var win=btn.up('window');
						recs=win.selStore.getRange();
						var recordData = "["; //参数
						var a=false;
						Ext.each(recs, function(rec) {
								if (a) {
									recordData += ",";
								}
								recordData += Ext.encode(rec.data);
								a = true;
							})
						recordData += "]";
						var result = erp.Const.callServiceMethodSync(
								'category/category.act?method=getLoadOperator', {
									recordData : recordData,lbbh:lbbh,lbjc:lbjc,lbmc:lbmc
								});
						var data = Ext.decode(result);
						eastGrid.getStore().load({params:{lbbh:lbbh}});
						win.close();
						if(!Ext.isEmpty(data.msg)){
							Ext.Msg.alert('提示', data.msg);
							return ;
						}
					}
				})
				win.show();
			break;
			case 'deleteCooperate_btn':
				var store=cooperateGrid.getStore();
				var recs=cooperateGrid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示', '请至少选择一条记录！');
					break ;
				}
				Ext.Msg.confirm('提示','是否确认删除所选协同人员?',function(btn){
					if (btn=='yes'){
						store.remove(recs);
						store.sync({
							callback:function(){
								store.loadPage(1,{params:{lbbh:recs[0].get('lbbh')}});
							}
						});
					}			
				});
			break;
			case 'deleteOperator_btn':
				var store=eastGrid.getStore();
				var recs=eastGrid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示', '请至少选择一条记录！');
					break ;
				}
				Ext.Msg.confirm('提示','是否确认删除所选操作员?',function(btn){
					if (btn=='yes'){
						store.remove(recs);
						store.sync({
							callback:function(){
								store.loadPage(1,{params:{lbbh:recs[0].get('lbbh')}});
							}
						});
					}			
				});
			break;
			case 'approval_btn':
				var store=eastGrid.getStore();
				var recs=eastGrid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示', '请至少选择一条记录！');
					break ;
				}
				var rec=recs[0];
				var tpbj=1;
				var bb='确认';
				if(rec.get('tpbj')==1){
					tpbj=0;
					bb='取消';
				}
				Ext.Msg.confirm('提示','是否'+bb+'该操作员为此类别控价特批人员?',function(btn){
					if (btn=='yes'){
						rec.set('tpbj',tpbj);
						store.sync({
							callback:function(){
								store.loadPage(1,{params:{lbbh:rec.get('lbbh')}});
							}
						});
					}			
				});
				break;
				case 'kind_btn':
					var recs=mainGrid.getSelectionModel().getSelection();
					if(recs.length==0){
						Ext.Msg.alert('提示', '请至少选择一条记录！');
						break ;
					}
					var store=mainGrid.getStore();
					var win =Ext.create('erp.view.master.category.window.EdtBatch',{
							field:{
								itemId : 'lbbh',
								name : 'lbbh',
								fieldLabel : '改后类别',
								labelWidth : 60,
								width:260,
								xtype : 'comboxTree',
								queryMode : 'local',
								store : Ext.create('erp.view.master.category.store.CategoryTree'),
								forceSelection:true,
								margin:'10 5 5 5',
								displayField : 'text',
								valueField: 'nodeId'
							},
							title:'批量修改'
						});
						win.down('#BTN_YES').on({
							click:function(btn){
								var win=btn.up('window');
								v=win.down('#lbbh').getValue();
								Ext.each(recs,function(rec){
									rec.set('ghlbbh',v);
								})
								store.sync({
									callback:function(){
										store.loadPage(1);
									}
								});
								win.close();
							}
						})
						win.show();
				break;
				case 'batch_btn':
					var recs=mainGrid.getSelectionModel().getSelection();
					if(recs.length==0){
						Ext.Msg.alert('提示', '请至少选择一条记录！');
						break ;
					}
					var store=mainGrid.getStore();
					var win =Ext.create('erp.view.master.category.window.EdtBatch',{
							field:{
								xtype : 'checkbox',	
								itemId:'bzclbj',
								name:'bzclbj',
								labelWidth : 100,
								width:215,
								margin:'10 5 5 5',
								fieldLabel:'包装材料标记'
							},
							title:'批量修改'
						});
						win.down('#BTN_YES').on({
							click:function(btn){
								var win=btn.up('window');
								v=win.down('#bzclbj').getValue();
								var bzclbj=0;
								if(v){
									bzclbj=1;
								}
								Ext.each(recs,function(rec){
									rec.set('bzclbj',bzclbj);
								})
								store.sync({
									callback:function(){
										store.loadPage(1);
									}
								});
								win.close();
							}
						})
						win.show();
				break;
    	}
    },
	edtShow:function(rec,isAdd,isEdit){
		var mainGrid=this.lookupReference('categoryGrid');
		var tree=this.lookupReference('categorytree');
		var win = Ext.create('erp.view.master.category.window.EdtCategory', {
					itemId : 'EdtCategory',
					title : '采购基础类别维护',
					rec : rec,
					isAdd : isAdd,
					isEdit : isEdit,
					store : mainGrid.getStore(),
					treeStore:tree.getStore(),
					closable : true
				});
		win.show();
	},
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});