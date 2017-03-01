/**
 * 材料选择帮助窗口
 */
Ext.define('erp.common.basic.view.MateComboHelp', {
	extend : 'erp.common.basic.view.helpwin.BaseHelpWin',
	alias : 'widget.mateCombo_help',
	title : '材料选择帮助窗口',
	alwaysOnTop : true,
	//iconCls:'box',
	//modal : true
	requires : [
	'erp.view.master.purchaseDetail.store.MaterialCateTree',
	'erp.view.master.purchaseDetail.store.MaterialDetail'
	],
	width : 840,
	height : 0.6 * window.screen.height,
	initComponent : function() {
		var me = this;
		me.Treestore = Ext.create('erp.view.master.purchaseDetail.store.MaterialCateTree');
		if(me.store==null){
		me.store = Ext.create('erp.view.master.purchaseDetail.store.MaterialDetail');
		}
		Ext.apply(me.store.getProxy().extraParams,me.winParam);
		me.store.load();
		/*me.field=me.field||{};
		var val=me.field.getValue();
		if(val!=null){
			me.store.proxy.extraParams.xsbjsearch=val.replace(/\s+/g,"");
		}
		me.store.load();*/
		Ext.apply(this, {
					items : [{
								/*buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES',handler:function(){
									var cusConfig=me.field.cusConfig;
									var tgrid=me.down('#Material');
									var recs=tgrid.getSelectionModel().getSelection();
									var rec=recs[0];
									if(cusConfig!=null){
										var editor=me.field.editor;
										console.log()
										var grid = editor.grid;
										var srec = grid.getSelectionModel().getSelection()[0];
									}
									if(recs.length==0){
										Ext.Msg.alert('提示','请至少选择一条记录');
										return ;
									}
									me.onSubmit(rec,recs);
								}},{
										text:'关闭',
										iconCls:'cancel',
										handler:function(){
											me.close();
										}
								}],*/
								xtype : 'panel',
								layout : 'border',
								items : [{
											itemId:'kind',
											region:'west',
											split:true,
											width:200,
											xtype:'treepanel',
											store:me.Treestore,
											listeners:{
												select:function(row,rec){
													var lbbh=rec.get('nodeId');
													me.store.proxy.extraParams.lbbh=lbbh;
													me.store.loadPage(1);
												},
								    			 afteritemexpand:function(t){
								    			 	var tree=me.down('#kind');
								    			 	if(!t.data.root){
								    			 		var root=t.parentNode;
								    			 		tree.collapseNode(root);
								    			 		tree.expandNode(root);
								    			 	}
								    			 }
											}
											},{
											tbar:[{xtype : 'gridsearchfield',
												fieldLabel:'材料名称或材料货号',
												labelWidth:140,
												focusWidth:280,
												blurWidth:160,
												width:200,
												store:me.store}],
											xtype : 'grid',
											region:'center',
											itemId:'Material',
											store : me.store,
											listeners:{
												itemdblclick : function(grid, rec) {
												    me.BtnSure();
											 	}
											},/*,
											listeners:{
												itemdblclick:function(th,rec,item){
													me.onSubmit(rec);
												}
											},*/
											selModel:Ext.create('Ext.selection.CheckboxModel'/*,{
												mode:me.field.selModel
											}*/),
											columns : [{
														text : '质检',
														dataIndex : 'zjbj',
														width:40,
														renderer:erp.Util.Staterenderer
													}, {
														text : '半成品',
														dataIndex : 'bcpbj',
														width:60,
														renderer:erp.Util.Staterenderer
													}, {
													    text:'材料货号',
													    dataIndex:'clhh',
													    width:80
													}, {
													    text:'材料图号',
													    dataIndex:'clth',
													    width:80
													},
													{
													    text:'材料名称',
													    dataIndex:'clmc',
													    width:180
													},
													{
													    text:'单位',
													    dataIndex:'jldw',
													    width:80
													},
													{
													    text:'原始货号',
													    dataIndex:'yshh',
													    width:100
													},
													{
													    text:'原始名称',
													    dataIndex:'ysmc',
													    flex:1
													}
													],
											dockedItems:[{
									    		xtype : 'pagingbar',
							                    stateId : '8081d6f3-9db7-470d-b764-dasddbb70c5e81b1',
									    		dock:'bottom',
									    		displayInfo:true,
									    		defaultPageSize : 50,
									    		store:me.store
									    	}]
										}]
							}]/*,
			buttons:[ {text:'确认',action:'ACT_SAVE',iconCls:"page_save",listeners:{
           	 click:me.BtnClick
            }},
            {text:'关闭',action:'ACT_CLOSE',iconCls:"page_error",listeners:{
           	 click:me.BtnClick
            }}]*/
				});
		this.callParent(arguments);
	},
	initWindow:function(callback,displayField,trigger){
			this.displayField=displayField;
			this.callbackFn=callback;
			this.trigger=trigger;
			this.show();
		},
	BtnClick:function(btn){
	    var win=btn.up('window');
	    switch(btn.action){
	    	case 'ACT_SAVE':
				win.BtnSure();
		      break;
	   }
	},
	getGrid:function(){
		     var me=this;
		     return me.down('#Material');
		},
	BtnSure : function(){
	    var me=this;
		var rec=me.getGrid().getSelectionModel().getSelection();
	    if(!rec){
				me.close();
				return;
			}	
		me.callbackFn(rec,me.trigger);
		me.close();	
	}
	/*,
	onSubmit : function(rec,recs) {
		var me = this;
		var cusConfig=me.field.cusConfig;
		if(cusConfig!=null){
			var field=cusConfig.field;
			var callback = cusConfig.callback;
			if (Ext.isFunction(callback)) {
				callback(this, rec,recs);
			} else if (cusConfig.type == 'ContractDetail') {
				me.forSetGrid(rec, recs);
			}
			me.field.setValue(rec.get(field));
		}else{
			me.field.setValue(rec.get('clmc'));
		}
		me.close();
	}*/
/*	forSetGrid : function(rec,recs) {
		var me=this;
		var editor=me.field.editor;
		var cusConfig=me.field.cusConfig;
		var grid = editor.grid;
		var srec = grid.getSelectionModel().getSelection()[0];
		var store =grid.getStore();
		var panel = grid.up('panel').up('panel').up('panel');
		var form=panel.down('#PurchaseContractForm');
		var csbh=form.down('#csbh').getValue();
		var materialDetail='[';
		if(recs!=null&&recs.length!=0){
			var a=false;
			Ext.each(recs,function(r){
				if(a){
					materialDetail+=',';
				}
				materialDetail+=Ext.encode(r.data);
				a=true;
			})
		}else{
			materialDetail+=Ext.encode(rec.data);
		}
		materialDetail +=']';
		var result=erp.Const.callServiceMethodSync('purchasedetail/purchasecontract.act?method=materialDetailLoad',
		{csbh:csbh,materialDetail:materialDetail,contractDetail:Ext.encode(srec.data)});
		var data = Ext.decode(result);
		//console.log(data);
		var contractDetail=data.contractDetail;
		if (data.bool == false) {
			Ext.Msg.alert('提示', data.msg)
			return;
		}
		srec.set('clhh', contractDetail.clhh);
		srec.set('clth', contractDetail.clth);
		srec.set('clmc', contractDetail.clmc);
		srec.set('jldw', contractDetail.jldw);
		srec.set('fzdw', contractDetail.fzdw);
		srec.set('fzzbj', contractDetail.fzzbj);
		srec.set('zzhxs', contractDetail.zzhxs);
		srec.set('txgz', contractDetail.txgz);
		srec.set('kzdj', contractDetail.kzdj);
		srec.set('ghzq', contractDetail.ghzq);
		srec.set('cgrq', contractDetail.cgrq);
		srec.set('wbbh', contractDetail.wbbh);
		srec.set('wbhl', contractDetail.wbhl);
		srec.set('cgdj', contractDetail.cgdj);
		srec.set('cgje', contractDetail.cgje);
		srec.set('wbdj', contractDetail.wbdj);
		srec.set('wbje', contractDetail.wbje);
		var addArr=data.cdList;
		//console.log(addArr);
		if(addArr.length>0){
			Ext.each(addArr,function(add){
				var htxh=store.max('htxh');
				if(htxh==null){
					htxh=1;
				}else{
					htxh++;
				}
				var model=Ext.create('erp.view.master.purchaseDetail.model.ContractDetail',{
					htbh:0,
					htxh:htxh,
					clhh:add.clhh,
					clth:add.clth,
					clmc:add.clmc,
					jldw:add.jldw,
					fzdw:add.fzdw,
					fzzbj:add.fzzbj,
					zzhxs:add.zzhxs,
					txgz:add.txgz,
					kzdj:add.kzdj,
					ghzq:add.ghzq,
					cgrq:add.cgrq,
					wbbh:add.wbbh,
					zzsl:0.17,
					wbhl:add.wbhl,
					cgdj:add.cgdj,
					cgje:add.cgje,
					wbdj:add.wbdj,
					wbje:add.wbje
				});
				store.add(model);
			})
		}
	}*/
});