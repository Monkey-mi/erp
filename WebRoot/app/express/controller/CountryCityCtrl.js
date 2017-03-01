Ext.define('erp.express.controller.CountryCityCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar',
				'erp.ux.QueryPanel',
				'erp.ux.SearchComboboxOnlyName',
				'erp.express.store.ExpressCity',
				'erp.express.store.Countrycity'
				],
	views:[
			'erp.express.view.CountryCityManager',
			'erp.express.view.ExpressCityManager'
		],
	refs:[
			{ref:'countryCity',selector:'mng_CountryCity'}
			
			],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'mng_CountryCity button':{
				click:me.dolinkAction
			}
		});
		me.isInited=true;
	},
	//关联国别城市
	dolinkAction:function(btn){
		var me=this;		
		var win=me.getCountryCity();		
		switch(btn.itemId){				
				case 'btn_sel':
					 var country_recs=win.down('#grid_country').getSelectionModel().getSelection();		
					 if(country_recs.length==0){
						Ext.Msg.alert('提示','请先选中一条国家记录');
						return;
					 }					
					 var country_id=country_recs[0].get('zzid');
				  	 var recs=win.down('#grdUnSelData').getSelectionModel().getSelection();
				  	 var before_recs=win.linkstore.getRange();
				  	 for(var i=0;i<before_recs.length;i++){
				  	 	for(var j=0;j<recs.length;i++){
				  	 		if(before_recs[i].get('city_id')==recs[j].get('id')){
				  	 			Ext.Msg.alert('提示',recs[j].get('name')+'已添加');
								return;
				  	 		}
				  	 	}
				  	 }
				  	 
				  	 for(var i=0;i<recs.length;i++){
				  	 	var newrec=Ext.create('erp.express.model.Countrycity',{
				  	 		country_id:country_id,
				  	 		name:recs[i].get('name'),
				  	 		city_id:recs[i].get('id')
				  	 	});
				  	 	win.linkstore.add(newrec);			  	 	 
				  	 }					  	 				  	 
					 break;
				case 'btn_selAll':
					 var country_recs=win.down('#grid_country').getSelectionModel().getSelection();		
					 if(country_recs.length==0){
						Ext.Msg.alert('提示','请先选中一条国家记录');
						return;
					 }					
					 var country_id=country_recs[0].get('zzid');
					 var recs=win.citystore.getRange();
					 var before_recs=win.linkstore.getRange();
				  	 for(var i=0;i<before_recs.length;i++){
				  	 	for(var j=0;j<recs.length;i++){
				  	 		if(before_recs[i].get('city_id')==recs[j].get('id')){
				  	 			Ext.Msg.alert('提示',recs[j].get('name')+'已添加');
								return;
				  	 		}
				  	 	}
				  	 }
					 for(var i=0;i<recs.length;i++){
				  	 	var newrec=Ext.create('erp.express.model.Countrycity',{
				  	 		country_id:country_id,
				  	 		name:recs[i].get('name'),
				  	 		city_id:recs[i].get('id')
				  	 	});
				  	 	 win.linkstore.add(newrec);
				  	 }
				  	break;
				case 'btn_unSel':
					 var recs=win.down('#grdSelData').getSelectionModel().getSelection();
					 win.linkstore.remove(recs);
				  	break;
				case 'btn_unSelAll':
					var recs=win.linkstore.getRange();
					win.linkstore.removeAll();
					break;
				case 'BTN_SAVE':
					win.linkstore.sync({
						success: function(batch,options) {
							 Ext.Msg.alert('提示','保存成功');
						}
					});	
					
					break;
				}
	}
})