Ext.define('erp.materialDistributeAccount.controller.MaterialAccountCtrl',{
	extend : 'Ext.app.Controller',
	requires:['erp.ux.PagingBar',
	'erp.materialDistributeAccount.store.MaterialAccountManager',
	'erp.materialDistributeAccount.store.MaterialAccountDetail',
	'erp.master.caterialPricePurchase.store.MaterialClass'],
	views:[
			'erp.materialDistributeAccount.view.MaterialAccountManager',
			'erp.materialDistributeAccount.view.MaterialAccoutSearch',
			'erp.materialDistributeAccount.view.MaterialAccountManagerDetail'
		],
	refs:[
		{ref:'materialDisAccount',selector:'mng_MaterialDisAccount'},
		{ref:'grid_materialAccount',selector:'mng_MaterialDisAccount #grid_materialAccount'},
		{ref:'treepanel',selector:'mng_MaterialDisAccount treepanel'}],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'mng_MaterialDisAccount':{
				afterrender:function(cmp){
					me.panel = me.getMaterialDisAccount();
					me.store=cmp.store;
					me.treeStore=cmp.treeStore;
//					me.store.load();
					me.treeStore.load();
					me.query_rec = Ext.create('erp.materialDistributeAccount.model.QueryParams');
				}
			},
			'mng_MaterialDisAccount button':{
				click : me.doAction
			},
			'tree_materialClass' : {
				click : function(tool, e, eOpts) {
					if (tool.type == 'refresh') {
						me.treeStore.load();
					}
				}
			},
			'mng_MaterialDisAccount treepanel':{
				select :me.onSelectModule
			},
			'mng_MaterialDisAccount #grid_materialAccount_detail':{				
				'itemdblclick' : function(view,record,item,index){
					var grid = me.getGrid_materialAccount();
					var rec = grid.getSelectionModel().getSelection()[0];
					var date = new Date();
					var nf = date.getYear()+1900;
					var ckbh = record.get('ckbh');
					var clhh = rec.get('clhh');
					var cltx1 = rec.get('cltx1');
					var cltx2 = rec.get('cltx2');
					var cltx3 = rec.get('cltx3');
					console.log(nf);
					console.log(rec);
					console.log(record);
					erp.Util.addContentTab({
						xtype:'mng_MaterialAccDetial',
						ckbh : ckbh,
						nf : nf,
						clhh : clhh,
						cltx1 : cltx1,
						cltx2 : cltx2,
						cltx3 : cltx3,
						closable : true
					});
				}
			}
		});
		me.isInited=true;
		},
		doAction:function(btn){
			var me = this;
			switch(btn.itemId){
				case 'btn_search' :
				var win=Ext.widget('MaterialDisAccout_Search',{
				itemId:'win_MIQuery',
				store:me.store,
				mainview:me.panel,
				rec:me.query_rec
		        });
		        win.show();	
				case 'btn_search2':
                this.doQuery();
                break;
			}
		},
		onSelectModule:function(){
		var me=this;
		var treepanel=me.getTreepanel();
		var rec=treepanel.getSelectionModel().getSelection()[0];
		var nodeIdForGrid=rec.get('id');
		if(nodeIdForGrid==0){
			Ext.Msg.alert('提示','请不要选择全部！');
			return;
		}
//		var clhh = erp.Const.callServiceMethodSync('materialAccount/materialAccountManager.act?method=getClhh',{lbbh:nodeIdForGrid});
		delete me.store.proxy.extraParams.condition;
		Ext.apply(me.store.proxy.extraParams, {'lbbh':nodeIdForGrid});//----关闭时，要删除
		me.store.loadPage(1);
	},
	doQuery:function(){
		var me = this;
		var clhh_mc = me.panel.down('#search').getValue();
		if(clhh_mc==null || Ext.String.trim(clhh_mc)==''){
			Ext.Msg.alert('提示','数据量过大，请填写查询条件！')
			return;
		}
		delete me.store.proxy.extraParams.lbbh;
		var condition = "";
		if (!Ext.isEmpty(clhh_mc)) {
                condition += " and ( view_kchz.clhh like '" + clhh_mc +"%' or clbmb.clmc like '%"+clhh_mc+"%' )";
            }
        me.store.proxy.extraParams.condition = condition;
        me.store.loadPage(1);
	}

})