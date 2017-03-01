Ext.define('erp.supplyInvoice.controller.SupplyInvoiceCtrl',{
     extend : 'Ext.app.Controller',
      requires : [
      'erp.ux.PagingBar',
      'erp.supplyInvoice.store.SupplyInvoice',
      'erp.supplyInvoice.model.QueryParams'
      ],
      views : ['erp.supplyInvoice.view.TimeChoose',
               'erp.supplyInvoice.view.SupplyInvoiceQuery',
               'erp.supplyInvoice.view.SupplyInvoiceManger'],
      refs : [{ref : 'TimeChoose',selector : 'win_Time'},
              {ref : 'SupplyInvoice',selector : 'mng_SupplyInvoice'} ,
              {ref : 'GrdSupplyInvoice',selector : 'mng_SupplyInvoice #grd_SupplyInvoice'} 
      ],
      init : function(){
          var me = this;
          if (me.isInited)
			return;
			me.control({
			    'mng_SupplyInvoice' : {
			           afterrender : function(){
			               me.panel = me.getSupplyInvoice();
			               me.grdmain = me.getGrdSupplyInvoice();
			               me.grdStore = me.panel.store;
			               me.fpmxStore = me.panel.fpmxStore;
			               me.rkqdStore = me.panel.rkqdStore;
			               me.fkmxStore = me.panel.fkmxStore;
			               me.sqfpStore = me.panel.sqfpStore;
			               me.sqhtStore = me.panel.sqhtStore;
			               me.sqfyStore = me.panel.sqfyStore;
			               me.yftzStore = me.panel.yftzStore;
			               me.query_rec=Ext.create('erp.supplyInvoice.model.QueryParams');
			           }
			    },
			     'mng_SupplyInvoice button' : {
			         click : me.doAction
			     },
			     'mng_SupplyInvoice #grd_SupplyInvoice' : {
			      selectionchange : function(grid, rec) {
			           if (rec.length > 0) {
			              me.fpmxStore.load({params:{ fplb:rec[0].get('fplb'),fphm:rec[0].get('fphm')}});
			              me.rkqdStore.load({params:{ fplb:rec[0].get('fplb'),fphm:rec[0].get('fphm')}});
			              me.fkmxStore.load({params:{ fplb:rec[0].get('fplb'),fphm:rec[0].get('fphm')}});
			              me.sqfpStore.load({params:{ fplb:rec[0].get('fplb'),fphm:rec[0].get('fphm')}});
			              me.sqhtStore.load({params:{ fplb:rec[0].get('fplb'),fphm:rec[0].get('fphm')}});
			              me.sqfyStore.load({params:{ fplb:rec[0].get('fplb'),fphm:rec[0].get('fphm')}});
			              me.yftzStore.load({params:{ fplb:rec[0].get('fplb'),fphm:rec[0].get('fphm')}});
			           }
			       },
			       itemdblclick : function(grid, rec) {
			       }
			     }
			});
		me.isInited=true;
      },
      doAction : function(btn){
          var me = this;
          if(!me.panel.can_use_btn){
			Ext.Msg.alert('提示',"编辑状态不可操作");
			return;
		}
		switch(btn.itemId){
		case 'btn_query':
			var win=Ext.widget('supplyInvoiceQuery',{
				itemId:'supplyInvoiceQuery',
				mainstore:me.grdStore,
				mainview:me.panel,
				rec:me.query_rec
			});
			win.show();
			break;
		
		}
      }
})
