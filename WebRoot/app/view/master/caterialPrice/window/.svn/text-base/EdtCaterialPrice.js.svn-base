Ext.define('erp.view.master.caterialPrice.window.EdtCaterialPrice',{
	extend:'erp.ux.Window',
	width:520,
	height:240,
	modal:true,
	alias : 'widget.edt_CaterialPrice',
	isAdd:false,
	isEdit:false,
	initComponent : function(){
	  var me=this;
	  me.argStore=Ext.create('erp.view.master.caterialPrice.store.CaterialPriceArgument');
	  me.argColumns=erp.Util.getColumns(me.argStore.getModel());
	  Ext.apply(me,{
    	layout:{
		     type: 'fit',
		     pack: 'start',
		     align: 'stretch'
    	},
    	defaults:{padding:5},
	  	items:[{
	  		itemId:'caterialPriceForm',	
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
	  			fieldLabel:'公式编号',
	  			itemId:'gsbh',
			   	name : 'gsbh',
			   	readOnly:true
	  		},{
	  			fieldLabel:'公式名称',
	  			itemId:'gsmc',
			   	name : 'gsmc'
	  		},{
	  			fieldLabel:'价格公式',
	  			itemId:'jggs',
			   	name : 'jggs',
			   	xtype:'selectfield',
				openconfig:{
					modal:true,
					title:'参数选取',
					singleSelect:true,
					editable:true,
					diaplayField:'csmc',
					valueField:'csmc',
					insert:true,
					width:500,
					height:600,
					columns:me.argColumns,
					store:me.argStore
				}
	  		},{
	  			fieldLabel:'备注说明',
	  			itemId:'bzsm',
			   	name : 'bzsm'
	  		}]
	  	}],
	  	buttons:[{text:'保存',iconCls:'page_save',itemId:'BTN_SAVE',hidden:!me.isEdit,handler:function(){
	  		var form=me.down('#caterialPriceForm');
	  		var rec=form.getRecord();
	  		if (!form.isValid()){  
                 Ext.Msg.alert('提示','输入不正确');  
                 return;
            }  
	  		form.updateRecord(rec);
	  		if(Ext.isEmpty(rec.get('gsmc'))){
	  			 Ext.Msg.alert('提示','公式名称不能为空');  
                 return;
	  		}
	  		var jggs=rec.get('jggs');
	  		if(Ext.isEmpty(jggs)){
	  			 Ext.Msg.alert('提示','价格公式不能为空');  
                 return;
	  		}
	  		//保存前验证
	  		var result = erp.Const.callServiceMethodSync(
						'caterialprice/caterialprice.act?method=getBeforSave', {
							jggs : jggs
						});
			var data = Ext.decode(result);
			if (data.bool == false) {
				Ext.Msg.alert('提示', data.msg)
				return;
			}
			try{
	  			var result=eval(data.jggs);
			}catch (e){
				bool=true;
				Ext.Msg.alert('提示','所编写的公式有语法错误，请检查更新！');
				return;
			}
	  		if(me.isAdd){
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
		me.down('#caterialPriceForm').loadRecord(rec);
	}
	
});