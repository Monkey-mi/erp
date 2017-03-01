Ext.define('erp.main.view.PublicRestrictWin', {
			extend : 'erp.ux.Window',
			alias : 'widget.publicRestrict',
			requires : ['erp.common.basic.view.BaseCtrForm'],
			height:400,
			width:400,
			title:'报表订阅权限设置',
			modal:true,
	   	    iconCls:'eye',
			buttons : [{
						text : '确认',
						action : 'ACT_SAVE',
						iconCls : 'select_rec'
					}, {
						text : '关闭',
						action : 'ACT_CLOSE',
						iconCls : 'cancel',
						handler:function(btn){
						 var me=btn.up('publicRestrict');
						 me.close();
						}
					}],
			initComponent : function() {
				var me = this;
				Ext.apply(me, {
							items : [{
										xtype : 'base_ctrf',
										dockedItems : [{
												   xtype: 'toolbar',
    											   dock: 'bottom',
												   defaults:{style:{margin:5}},
												   items:[{
													xtype : 'checkboxgroup',
													items : [{
																boxLabel : '新增',
																name : 'cp_add',
																inputValue : '1'
															}, {
																boxLabel : '修改',
																name : 'cp_modify',
																inputValue : '2'
															}, {
																boxLabel : '删除',
																name : 'cp_delete',
																inputValue : '3'
															}, {
																boxLabel : '订阅',
																name : 'cp_view',
																inputValue : '4'
															},{
															    boxLabel : '授权',
																name : 'cp_grant',
																inputValue : '5'
															}]
													 }]		
												}]
									}]
						});
				me.callParent(arguments);
			},
			setValue : function() {

			},
			getValue : function() {

			},
			saveallCp:function(){
			var me=this;
			var recs=[];
			var panel=me.down('base_ctrf');
			var activetype=panel.getActiveType();
			 var checkfields=me.down('checkboxgroup').items.items;
			 Ext.each(checkfields,function(checkfield){
			    me.rec.set(checkfield.name,checkfield.getValue());
			 });
			 panel.setActiveRecs(me.rec,recs);
			 return	recs;
			},
			loadRecord:function(rec){
			  var me=this;
			  me.rec=rec;
			  var checkfields=me.down('checkboxgroup').items.items;
			  Ext.each(checkfields,function(checkfield){
			  checkfield.setValue(rec.get(checkfield.name));
			  });
			} 
		});