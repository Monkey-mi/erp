Ext.define('erp.purchaseInspectionManage.view.EditPurchaseInspection',{
    extend:'erp.ux.Panel',
    requires:[
     'erp.ux.PagingBar',
	 'erp.ux.QueryPanel',
	 'erp.ux.SupcanGrid'
    ],
    title:'成品采购验货编辑',
	alias:'widget.mng_EditPurchaseInspection',
	hideMode: 'offsets',
	layout:{
		type:'border',
		padding:2
	},
	listeners:{
	close:function(panel){
		//为避免界面关闭时 close 时 不触发销毁方法在关闭时主动销毁界面
		if(panel){
			panel.destroy();
		}
	 }
	},
	initComponent:function(){
		var me=this;
		me.store = Ext.create('erp.purchaseInspectionManage.store.EditPurchaseInspection');	
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		if(me.isEdit){
			me.store.proxy.extraParams.yhno=me.rec.get('yhno');
			me.store.proxy.extraParams.yhxh=me.rec.get('yhxh');
		}
		me.store.load();
	    Ext.apply(me,{
	       items : [{
	       	region:'center',
  	  		flex:2,
  	  		split:true,
  	  		xtype: 'grid',
  	  		itemId : 'inspectionEditGrid',
  	  		store:me.store,
  	  		selModel:Ext.create('Ext.selection.CheckboxModel'),
//  	  	mainModel:Ext.create('erp.purchaseInspectionManage.model.EditPurchaseInspection'),
	    columns:[
   		{header:'验货号',dataIndex: 'yhh' ,width:80},	
		{header:'验货次数',dataIndex: 'yhcs', width:80},
		{header:'验货结论',dataIndex: 'yhjl' ,width:80},
		{header:'合同号',dataIndex: 'hth' ,width:80},
		{header:'订单号',dataIndex: 'ddh' ,width:80},
		{header:'PO.NO',dataIndex: 'pono' ,width:80,field:{}},
		{header:'客户型号',dataIndex: 'khxh' ,width:100},
		{header:'客户名称',dataIndex: 'khmc' ,width:160},
		{header:'产品编号',dataIndex: 'cpbh' ,width:80},
		{header:'产品名称',dataIndex: 'cpmc' ,width:160},
		{header:'单位',dataIndex: 'jldw' ,width:80},
		{header:'通知数量',dataIndex: 'tzsl' ,width:80},
		{header:'采购数量',dataIndex: 'cgsl' ,width:100},
		{header:'生产单号',dataIndex: 'scdh' ,width:80},
		{header:'外协号',dataIndex: 'wxh' ,width:80},
		{header:'拆分号',dataIndex: 'cfh' ,width:80},
		{header:'箱规',dataIndex: 'xgg' ,width:80},
		{header:'箱长',dataIndex: 'xc' ,width:80},
		{header:'箱宽',dataIndex: 'xk' ,width:80},
		{header:'箱高',dataIndex: 'xg' ,width:80},
		{header:'箱体积',dataIndex: 'xtj' ,width:80},
		{header:'箱只数',dataIndex: 'xzs' ,width:80},
		{header:'箱毛重',dataIndex: 'xmz' ,width:80},
		{header:'箱净重',dataIndex: 'xjz' ,width:80},
		{header:'供应商名称',dataIndex: 'gysmc' ,width:160},
		{header:'业务员',dataIndex: 'ywy' ,width:80},
		{header:'包装资料路径',dataIndex: 'bzzl' ,width:160},
		{header:'验货日期',dataIndex: 'yhrq',xtype:'datecolumn',format:'Y-m-d',width:90},
		{header:'验货地点',dataIndex: 'yhdd' ,width:80},
		{header:'出货地点',dataIndex: 'chdd' ,width:80},		
		{header:'备注说明',dataIndex: 'bzsm' ,width:160},
		{header:'提交人',dataIndex: 'tjrm' , width:80},
		{header:'提交时间',dataIndex: 'tjsj', xtype:'datecolumn',format:'Y-m-d' ,width:90},
		{header:'分配对象',dataIndex: 'fpdx' , width:80},
		{header:'分配时间',dataIndex: 'fpsj', xtype:'datecolumn',format:'Y-m-d' ,width:90},
		{header:'合同序号',dataIndex: 'htxh' ,width:80 },
		{header:'合同编号',dataIndex: 'htbh' ,width:80 },
		{header:'订单序号',dataIndex: 'ddxh' ,width:80 },
		{header:'订单编号',dataIndex: 'ddbh' ,width:80 },
		{header:'英文描述',dataIndex: 'ywms' ,width:80}],
			dockedItems:[{
			    		xtype : 'pagingbar',
	                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		dock:'bottom',
			    		displayInfo:true,
			    		defaultPageSize : 50,
			    		store:me.store
		    	}],
		     plugins: Ext.create('Ext.grid.plugin.CellEditing', {
			   		ptype: 'cellediting',
			        destroyed:true,
			        clicksToEdit : 1,
			        autoCancel: false,
			        listeners:{
			        	edit:function(editor,con,e){
			        		var field=con.field;
			        		var rec=con.record;
			        		if(con.originalValue==con.value){
			        			return ;
			        		}
			        	},
			        	'beforeedit':function(editor, e, obj){
			        		var rec=e.record;
			        		var ddbh = rec.get('ddbh');
			        		var ddxh = rec.get('ddxh');
			        		if(Ext.isEmpty(ddbh)){
			        			ddbh = 0;
			        		}
			        		if(Ext.isEmpty(ddxh)){
			        			ddxh = 0;
			        		}
			        		switch(e.field){
			        			case 'pono':
			        			 var win  = Ext.widget('win_purchaseInspectionPono',{
		        		    	     ddbh : ddbh,
		        		    	     ddxh : ddxh
		        		    	 });
		        		    	 win.down('#btn_confirm').on({
                                     click : function(btn){
                                       var win =  btn.up('window');
                                       var bool = false;
                                       var trec = win.down('#grd_InspectionPono').getSelectionModel().getSelection()[0];
                                       rec.set('pono',trec.get('pono'));
                                       rec.set('khxh',trec.get('khxh'));
                                       rec.set('ywms',trec.get('ywms'));
                                       win.close();
                                      }
		        		    	 })
		        		    	 win.show();
			        			break;
			        		}
			        	}
			        }
			   }),
		    tbar:[
   	  	  		  {text: '导入',iconCls:'page_go',itemId:'btn_lead',disabled:me.isEdit},
   	  	  		  {text:'保存',iconCls:'save',itemId:'BTN_SAVE'},
   	  	  		  {text: '删除',iconCls:'page_delete',itemId:'BTN_DEL',disabled:true}
   	  	  		  ]
	       }]
	    });
	    me.callParent(arguments);
	},
	loadData:function(isEdit,rec){
		var me=this;
		/*if(isEdit){
			me.store.proxy.extraParams.yhno=rec.get('yhno');
			me.store.proxy.extraParams.yhxh=rec.get('yhxh');
			me.store.load();
		}*/
	}
})