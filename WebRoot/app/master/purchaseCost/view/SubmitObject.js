Ext.define('erp.master.purchaseCost.view.SubmitObject',{
	extend:'erp.ux.Window',
	alias:'widget.POSubmitMen',
	width:650,
	title:'提交对象',
	iconCls:'page_go',
	height:600,
	modal:true,
	requires : ['erp.view.master.perchasepriceadjust.store.SubmitPeople',
	'erp.view.master.perchasepriceadjust.store.CzybmListTree'],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.perchasepriceadjust.store.SubmitPeople');
		me.store.load();
		me.on('beforeclose',function(){
			delete me.store.proxy.extraParams.tjdx;
		});
		Ext.apply(me,{
			layout:'border',
			dockedItems:[
				{
				xtype:'toolbar',
				dock:'top',
				defaults:{padding:'0 5 0 0',labelWidth:60,width:180},
				items:[
					{xtype:'textfield',fieldLabel:'提交对象',enableKeyEvents :true,itemId:'tjdx',
						listeners:{keyup:me.onKeyup}},
					{xtype:'button',iconCls:'query',text:'查询',width:80,itemId:'btn_query'
					,handler:function(){
						me.doSearch();
					}
				}]
			}],
			items:[{
    			xtype:'treepanel',
    			region:'west',
    			reference:'perchasetree',
    			collapsible:true,
    			width:200,
    			split:true,
    			store : Ext.create('erp.view.master.perchasepriceadjust.store.CzybmListTree',{autoLoad:true}),
    			listeners:{
    			  'itemclick':function(t,rec){
    			  		if(rec.get('nodeId')!=0){
    			  			me.store.proxy.extraParams.ssbm=rec.get('nodeId');
    			  			me.store.loadPage(1);
    			  		}else{
    			  			delete me.store.proxy.extraParams.ssbm;
    			  			me.store.loadPage(1);
    			  		}
    			  }
    			}
			},{
				region:'center',
				xtype:'grid',
				itemId:'SubmitMenData',
				columns:[
							{ dataIndex: 'czy_gh' ,header:'工号',width:90},
							{ dataIndex: 'czy_xm', header:'姓名',width:90},
							{ dataIndex: 'ssbm', header:'所属部门',width:90,hidden:true},
							{ dataIndex: 'lbmc', header:'所属部门',width:90},
							{ dataIndex: 'gzgw' ,header:'工作岗位',width:90}
							],
				store:me.store,
				dockedItems:[
					{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }]
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	},
	doSearch:function(){
		var me=this;
		var tjdx=me.down('#tjdx').getValue();
		if (tjdx){
			me.store.proxy.extraParams.tjdx=tjdx;
		}else{
			delete me.store.proxy.extraParams.tjdx;
		}
		me.store.loadPage(1);
	},
	onKeyup:function(field,e){
			if(e.getKey()==e.ENTER){
				var me=this.up('window');
				me.doSearch();
			}
	}
});