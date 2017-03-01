Ext.define('erp.view.master.caterialPrice.window.EdtArgument',{
	extend:'erp.ux.Window',
	width:320,
	height:200,
	modal:true,
	alias : 'widget.edt_Argument',
	isAdd:false,
	isEdit:false,
	initComponent : function(){
	  var me=this;
	  Ext.apply(me,{
    	layout:{
		     type: 'fit',
		     pack: 'start',
		     align: 'stretch'
    	},
    	defaults:{padding:5},
	  	items:[{
	  		itemId:'argumentForm',	
	  		xtype:'form',	  			  			  		  		
	  		isAdd:me.isAdd,
	  		isEdit:me.isEdit,
	  		flex:2,
	  		store:me.store,
	  		layout:{
			     type: 'column',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	defaults: {
				anchor: '95%',
				labelWidth: 60,
				xtype: 'textfield',
				readOnly:!me.isEdit,
				margin:'5 5 5 5',
				columnWidth: 1
			},
	  		items:[{
	  			fieldLabel:'参数编号',
	  			itemId:'csbh',
			   	name : 'csbh',
			   	readOnly:true
	  		},{
	  			fieldLabel:'参数名称',
	  			itemId:'csmc',
			   	name : 'csmc'
	  		},{
	  			fieldLabel:'审批标记',
	  			itemId:'spbj',
			   	name : 'spbj',
			   	xtype:'checkbox'
	  		}]
	  	}],
	  	buttons:[{text:'保存',iconCls:'page_save',itemId:'BTN_SAVE',hidden:!me.isEdit,handler:function(){
	  		var form=me.down('#argumentForm');
	  		var rec=form.getRecord();
	  		if (!form.isValid()){  
                 Ext.Msg.alert('提示','输入不正确');  
                 return;
            }  
	  		form.updateRecord(rec);
	  		if(form.down('#spbj').getValue()){
	  			rec.set('spbj',1);
	  		}else{
	  			rec.set('spbj',0);
	  		}
	  		if(Ext.isEmpty(rec.get('csmc'))){
	  			 Ext.Msg.alert('提示','参数名称内容为空!');  
                 return;
	  		}
	  		if(me.isAdd){
	  			//保存前验证
		  		var result = erp.Const.callServiceMethodSync(
							'caterialprice/caterialpriceargument.act?method=getBeforSave', {
								csmc : rec.get('csmc')
							});
				var data = Ext.decode(result);
				if (data.bool == false) {
					Ext.Msg.alert('提示', data.msg)
					return;
				}
	  			rec.phantom=true;
	  			me.store.add(rec);
	  			me.store.sync({callback:function(){
	  				me.store.load();
	  			}});
	  		}else{
	  			me.store.sync({callback:function(){
	  				me.store.load();
	  			}});
	  		}
	  		me.close();
	  	}},{text:'取消',iconCls:'page_error',handler:function(){
					me.close();
			}
	  	}]
	  });
	  this.callParent(arguments);
	   me.loadRecord(me.rec);
	},
	loadRecord:function(rec){
		var me=this;
		me.down('#argumentForm').loadRecord(rec);
	}
	
});