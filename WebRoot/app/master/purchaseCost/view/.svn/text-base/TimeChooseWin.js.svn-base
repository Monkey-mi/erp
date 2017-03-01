Ext.define('erp.master.purchaseCost.view.TimeChooseWin',{
      extend: 'erp.ux.Window',
      alias: 'widget.win_TimeChoose',
      requires: ['erp.master.purchaseCost.store.MainCost',
                 'erp.master.purchaseCost.view.PurchaseCostManger',
                 'erp.ux.FormKey',
                 'erp.master.purchaseCost.model.TimeQueryParam'],
      title : '年月选择',
      width:  320,
      height: 120,
      iconCls:'page_go',
      modal:true,
       initComponent : function(){
       	  var me=this;
       	  me.rec=Ext.create('erp.master.purchaseCost.model.TimeQueryParam');
          var myDate = new Date();
		  var year = myDate.getYear()+1900;
		  var month = myDate.getMonth()+1;
          Ext.apply(me,{
              layout: {
              	 type: 'fit',
              	 pack: 'start',
		         align: 'stretch'
              },
              defaults:{padding:5},
              items:[
                {
                	itemId: 'TimeChooseForm',
                	xtype: 'form',
                	plugins:{
				      ptype: 'FormKey'
				    },
				    store: me.store,
			  layout:{
			     type: 'column',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	  defaults: {
				 anchor: '95%',
				 labelWidth: 72,
				 margin:'5 5 5 5',
				 columnWidth: 1
			},
			items: [
			      {
			      	fieldLabel: '操作年月',
			      	xtype:'numberfield',
			      	itemId: 'year',
			      	name: 'year',
			        year: year,
			      	value: year,
			      	columnWidth: .65
			      },
			      {
			      	fieldLabel:'—',
			      	xtype:'numberfield',
			      	labelSeparator: '',
			      	labelWidth:15,
			      	itemId: 'month',
			        name: 'month',
			      	month: month,
			      	value: month,
			      	minValue: '1',
			      	maxValue: '12',
			      	columnWidth: .35
			      }/*,{
			        fieldLabel: '核算部门',
				    itemId:'hsbm',
					name : 'hsbm',
				    columnWidth: 1,
				    displayField : 'bmmc',
				    valueField: 'hsbm',
				    xtype : 'comboxTree',
				    queryMode : 'local',
					store : Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree'),
					displayField : 'text',
				    valueField: 'nodeId'
			      }*/],
			      buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
			    handler:me.doPurchaseCost
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
                }]
          });
          this.callParent(arguments);
		  me.down('form').loadRecord(me.rec);
       },
       doPurchaseCost : function(){
		   var form = me.down('form');
		   var rec=form.getRecord();
		   form.updateRecord(rec);
		   var year = rec.get('year');
		   var month = rec.get('month');
		   /*var hsbm = rec.get('hsbm');*/
           var store = Ext.create('erp.master.purchaseCost.store.MainCost');
		   var bzStore = Ext.create('erp.master.purchaseCost.store.PurchaseCost');
		   var fyStore = Ext.create('erp.master.purchaseCost.store.purchaseCostSum');
		   var ftStore = Ext.create('erp.master.purchaseCost.store.purchaseCostShare');
		   var fjStore = Ext.create('erp.master.purchaseCost.store.purchaseCostDetial');
		   me.close();
		   var hasPay = me.ifPay(year,month);
		   var jzzt;
		   var ispay;
		   if(Ext.isEmpty(hasPay)){
		      hasPay = 0;
		   }
		   if(hasPay == 0){
		      jzzt = "未结账";
		      ispay = false}
		   else if(hasPay>0){
		      jzzt = "已结账";
		      ispay = true}
		  //判断审批是走COA审批还是走单据签发
//如果走COA审批，则单据中
//签发按钮为灰
//提交标记、提交人、提交时间显示
//如果走单据审批，则单据中
//签发按钮显示
//提交标记、提交人、提交时间不显示

		  erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=beforeLoadMain');			    
         /* var bmmc;
          if(Ext.isEmpty(hsbm)||hsbm==''){
              bmmc = '全部';
          }else{
               sql = "select bmmc  from hsbmb where bmbh="+hsbm+";"
               var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						    {sql : sql});
			   var data = Ext.decode(result);
		       if(data.val!=null){
			     bmmc = data.val;}				    
          }*/
		  var panel = erp.Util.addContentTab({
                 xtype:'mng_PurchaseCost',
                 itemId : 'PurchaseCostManger',
                 title: '采购费用单管理 【日期:'+year+'年'+month+'月 】【'+jzzt+'】',
                 /*store:store.load({
                    params :{
                    	year : year,
                    	month : month,
                        hsbm : hsbm,
                    	usePaging:true
                    }
                 }),*/
                 year:year,
                 month:month,
                 /*hsbm : hsbm,*/
                 hasPay : hasPay,
                 ispay : ispay,
                 bzStore:bzStore,
                 fyStore:fyStore,
                 ftStore:ftStore,
                 fjStore:fjStore,
                 closable : true
         });
    },
    /**检查结账状态**/
    ifPay : function(year,month){
         var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=ifPay',
         {year :year,month : month });
         return result;
    }
});