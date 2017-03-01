/**
 * 厂商选择窗口
 */
 Ext.define('erp.master.purchaseCost.view.CompanyCombo',{
     extend : 'erp.ux.Window',
     alias : 'widget.CompCombo_Help',
     title : '厂商选择帮助窗口',
     requires : ['erp.master.prematerial.store.Companyname'],
     width : 700,
     height : 0.6 * window.screen.height,
     initComponent : function() {
		var me = this;
	    me.store = Ext.create('erp.master.prematerial.store.Companyname');
	    me.field=me.field||{};
	    var val=me.field.getValue();
		/*if(val!=null){
			me.store.proxy.extraParams.xsbjsearch=val.replace(/\s+/g,"");
		}*/
		me.store.load();
		var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items:[{xtype : 'textfield',
					  fieldLabel:'厂商名称或厂商编号',
					  labelWidth:140,
					  itemId : 'xsbjsearch',
					  width:200,
					  listeners: { 
					      specialkey: function(field, e){
	    	                    if (e.getKey() == e.ENTER) {
	    	                        me.store.loadPage(1,{
					                params:{ xsbjsearch : me.down('#xsbjsearch').getValue()}
					                })
	    	                    }
	    	                }
					  }
					  },{
					   text:'查询',iconCls:'query',
					    handler: function(btn){
					       me.store.loadPage(1,{
					          params:{ xsbjsearch : me.down('#xsbjsearch').getValue()}
					       })
					    }
		},{
           text:'重置',
   	  	   iconCls:'refresh_backwards',
   	  	   handler:function(){
   	  	      me.down('#xsbjsearch').setValue("");
   	  	   }
         }
		]});
		Ext.apply(this, {
		    tbar:[sec_bar],
			items : [{
		         buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES',handler:function(){
		             var cusConfig=me.field.cusConfig;
		             var tgrid=me.down('#Company');
		             var recs=tgrid.getSelectionModel().getSelection();
					 var rec=recs[0];
					 if(cusConfig!=null){
					   var editor=me.field.editor;
					   var grid = editor.grid;
					   var srec = grid.getSelectionModel().getSelection()[0];}
					 if(recs.length==0){
						Ext.Msg.alert('提示','请至少选择一条记录');
							return ;}
					 me.onSubmit(rec,recs);
		         }},
		         { text:'关闭',iconCls:'cancel',handler:function(){	me.close();}}]
		     }],
		     xtype : 'panel',
			 layout : 'border',
			 items : [
			  {
			    xtype : 'grid',
				region:'center',
				itemId:'Company',
                store : me.store,
				listeners:{
					itemdblclick:function(th,rec,item){
						me.onSubmit(rec);
					}
				},
				selModel:Ext.create('Ext.selection.CheckboxModel',{
						mode:me.field.selModel
				}),			
				columns : [{
				      text: '厂商编号',
				      dataIndex : 'csbh',
				      width:100
				},{
				      text: '厂商类别',
				      dataIndex : 'cslb',
				      width : 100
				},{
				      text : '厂商简称',
				      dataIndex : 'csjc',
				      width : 100
				},{
				      text : '厂商名称',
				      dataIndex : 'csmc',
				      width : 250
				},{
				      text : '外币名称',
				      dataIndex : 'wbdh',
				      width : 80
				},{
				      text : '采购类别',
				      dataIndex : 'cglb',
				      width : 80
				}],
				dockedItems:[{
						xtype : 'pagingbar',
						stateId : '8081d6f3-9db7-470d-b764-dasddbb70c5e81b1',
						dock:'bottom',
						displayInfo:true,
						defaultPageSize : 50,
						store:me.store
					}]
			  }
			 ]
		});
		this.callParent(arguments);
	},
	onSubmit : function(rec,recs) {
		var me = this;
		var cusConfig=me.field.cusConfig;
		if(cusConfig!=null){
		    var field=cusConfig.field;
			var callback = cusConfig.callback;
			if (Ext.isFunction(callback)) {
				callback(this, rec,recs);
			}
			me.field.setValue(rec.field);
		}
		me.field.setValue(rec.get('csmc'));
		me.close();
	}
 })