Ext.define('erp.PurchaseCostDetial.controller.PurchaseCostDetialCtrl',{
    extend : 'Ext.app.Controller',
    requires : ['erp.PurchaseCostDetial.model.FilterParam',
                'erp.ux.PagingBar'],
    views : ['erp.PurchaseCostDetial.view.FilterWin',
             'erp.ux.ComboxTree',
             'erp.PurchaseCostDetial.view.PurchaseCostDetialManger',
             'erp.PurchaseCostDetial.view.CostQuery'
    ],
    refs : [{ref : 'FilterWin',selector : 'win_Filter'},
            {ref : 'mng_PurchaseCostDetial',selector : 'mng_PurchaseCostDetial'}],
    init : function(){
          var me = this;
          if (me.isInited)
			return;
		  me.control({
		      'mng_PurchaseCostDetial' :{
		            afterrender : function(){
		                me.panel = me.getMng_PurchaseCostDetial();
		                me.grdStore = me.panel.store;
		                var rec = me.panel.rec;
		                Ext.apply(me.grdStore.proxy.extraParams,{
		                   hsbm : rec.get('hsbm'),
		                   qsrq : rec.get('fyrq1'),
		                   jzrq : rec.get('fyrq2'),
		                   csbh : rec.get('csmc'),
		                   czym : rec.get('czym')
		                })
		                me.grdStore.load();
		                me.query_rec=Ext.create('erp.PurchaseCostDetial.model.QueryParam');
		            }
		      },
		      'mng_PurchaseCostDetial button' : {
		           click : me.doAction
		      } 
		  });
		  me.isInited=true;
    },
    doAction : function(btn){
	 	var me=this;
	 	me.query_rec.set('csmc',me.panel.rec.get('csmc'));
	 	me.query_rec.set('fyrq1',me.panel.rec.get('fyrq1'));
	 	me.query_rec.set('fyrq2',me.panel.rec.get('fyrq2'));
	 	me.query_rec.set('czym',me.panel.rec.get('czym'));
	    switch(btn.itemId){
	       case 'btn_query' : 
	       var win = Ext.widget('Query_Cost',{
	             mainstore:me.grdStore,
	             mainview:me.panel,
			     rec:me.query_rec
	       });
	       win.show();
		   break;
	    }
	}
})