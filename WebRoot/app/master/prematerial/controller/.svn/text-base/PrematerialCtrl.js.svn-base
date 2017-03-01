Ext.define('erp.master.prematerial.controller.PrematerialCtrl',{
    extend : 'Ext.app.Controller',
	requires : ['erp.ux.PagingBar',
	            'erp.master.prematerial.store.Prematerial',
	            'erp.master.prematerial.model.QueryParam'
	           ],
	views:['erp.master.prematerial.view.Prematerial',
	       'erp.master.prematerial.view.PrematerialQuery'
	      ],
	refs:[ {ref:'prematerial',selector:'prematerial'},
	        {ref:'grdPrematerial',selector:'prematerial #grd_Prematerial'}/*,
	 	   {ref:'prematerialFit',selector:'Query_Prematerial'}*/],
	init : function() {
	     var me = this;
	     if (me.isInited)
			return;
			me.control({
			    'prematerial':{
			         afterrender:function(){
			         	var store = me.getGrdPrematerial().getStore();
			         	var grid = me.getGrdPrematerial();
			         	me.grdStore = grid.getStore();
						me.grdStore.load();
			         	me.panel = me.getPrematerial();
			         
			         	me.query_rec=Ext.create('erp.master.prematerial.model.QueryParam');
			       
			         },
			         beforedestroy:function(th){
					    delete me.grdStore.proxy.extraParams.condition;
				     }	
			    },
			    'prematerial  button':{
				click:me.doAction
			}
		/*	    'prematerial #grd_Prematerial' : {
			    	selectionchange:function(grid,recs){
					if(recs.length>0){
						
						me.setBtnStatus(false);
					}else{
						me.setBtnStatus(true);
					}
				}
			    
			    }*/
			    
			});
			me.isInited=true;
        },
        
/*        setBtnStatus:function(status){
		var me=this;
		me.panel.down('#').setDisabled(status);	
		
	   },*/
	   doAction:function(btn){
		var me=this;
		switch (btn.itemId){
		     case erp.Const.FUNC_ITEMID_BTN_REFRESH:
		     case 'btn_close' : 
		         me.panel.close();	
				 break;
		     case 'btn_query':
		         var win=Ext.widget('Query_Prematerial',{
					itemId:'Query_Prematerial',
					mainstore:me.grdStore,
					mainview:me.panel,
				   rec:me.query_rec
				});
				win.show();
				break;	
		}
	   }
	
	
});