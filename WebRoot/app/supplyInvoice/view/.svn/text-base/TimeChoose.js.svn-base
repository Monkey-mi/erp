Ext.define('erp.supplyInvoice.view.TimeChoose',{
      extend: 'erp.ux.Window',
      alias: 'widget.win_Time',
      requires: ['erp.supplyInvoice.store.SupplyInvoice',
                 'erp.ux.FormKey',
                 'erp.supplyInvoice.model.TimeChooseParam'],
      title : '起止日期',
      width:  320,
      height: 160,
      iconCls:'page_go',
      modal:true,
       initComponent : function(){
       	  var me=this;
       	  var date=new Date();
		  date.setDate(01);
       	  me.rec=Ext.create('erp.supplyInvoice.model.TimeChooseParam');
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
			      	fieldLabel: '起始日期',
			      	xtype:'datefield',
			      	itemId: 'begin_date',
			      	name: 'begin_date',
			      	value: date,
			      	columnWidth: 1
			      },{
			        fieldLabel: '截止日期',
				    itemId:'end_date',
					name : 'end_date',
					value: new Date(),
				    columnWidth: 1,
				    xtype : 'datefield'
			      }],
			      buttons:[
			{text:'确认',glyph:0xf058,itemId:'btn_confirm',
			    handler:me.doSupplyInvoice
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
                }]
          });
          this.callParent(arguments);
		  me.down('form').loadRecord(me.rec);
       },
       doSupplyInvoice : function(){
		  
		   var form = me.down('form');
		   var rec=form.getRecord();
		   form.updateRecord(rec);
		   var begin_date = rec.get('begin_date');
		   var end_date = rec.get('end_date');
		   var gsbj = 1;
		   var czyh = erp.UInfo.currentUser.u_id;
           var store = Ext.create('erp.supplyInvoice.store.SupplyInvoice');
           var fpmxStore = Ext.create('erp.supplyInvoice.store.InvoiceDetail');
           var rkqdStore = Ext.create('erp.supplyInvoice.store.InventoryList');
           var fkmxStore = Ext.create('erp.supplyInvoice.store.PayDetail');
           var sqfpStore = Ext.create('erp.supplyInvoice.store.ApplyInvoice');
           var sqhtStore = Ext.create('erp.supplyInvoice.store.ApplyAgreement');
           var sqfyStore = Ext.create('erp.supplyInvoice.store.ApplyFee');
           var yftzStore = Ext.create('erp.supplyInvoice.store.PrepayAdjustment');
		   me.close();
		  
		  
           var panel = erp.Util.addContentTab({
                 xtype:'mng_SupplyInvoice',
                 itemId : 'SupplyInvoiceManger',
                 title: '供应发票管理',
                 store:store.load({
                    params :{
                    	begin_date : begin_date,
                    	end_date : end_date,
                    	/*gsbj : gsbj,*/
                    	czyh : czyh,
                    	usePaging:true
                    }
                 }),
                 begin_date:begin_date,
                 end_date:end_date,
                 /*gsbj : gsbj,*/
                 czyh : czyh,
                 fpmxStore:fpmxStore,
                 rkqdStore:rkqdStore,
                 fkmxStore:fkmxStore,
                 sqfpStore:sqfpStore,
                 sqhtStore:sqhtStore,
                 sqfyStore:sqfyStore,
                 yftzStore:yftzStore,
                 closable : true
         });
       /*  console.log(panel);
           Ext.apply(me.store.proxy.extraParams, 
			{
			    criteria:me.getQueryCriteria()
			 }
		);
		    panel.loadMain();*/
     
    }
    /**检查结账状态**/
/*    ifPay : function(year,month){
         var result = erp.Const.callServiceMethodSync('purchasecost/purchasecost.act?method=ifPay',
         {year :year,month : month });
         return result;
    }*/
    /*,
 getQueryCriteria: function(){
          var me = this;
          var criteria = null;
          var form = me.down('form');
             if (form.getForm().isDirty()){
				var rec=form.getRecord();
				form.updateRecord(rec);
				var obj=rec.getChanges();
				var arr=[];
				for(var x in obj){
						if(!Ext.isEmpty(obj[x]))
						{
						if(x=='year'){
						   arr.push("year(fyrq) = '"+obj[x]+"' ");
						}else if(x=='month'){
                           arr.push("month(fyrq) = '"+obj[x]+"' "); 						
						}
					 }
				}
			criteria=arr.join(' and ');			
      }
      return criteria;
     
      }*/
});