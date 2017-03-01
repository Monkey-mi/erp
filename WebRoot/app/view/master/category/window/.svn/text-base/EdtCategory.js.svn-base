Ext.define('erp.view.master.category.window.EdtCategory',{
	extend:'erp.ux.Window',
	width:320,
	height:380,
	modal:true,
	alias : 'widget.edt_Category',
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
	  		itemId:'categoryForm',	
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
				labelWidth: 80,
				xtype: 'textfield',
				readOnly:!me.isEdit,
				margin:'5 5 5 5',
				columnWidth: 1
			},
	  		items:[{
	  			fieldLabel:'类别编号',
	  			itemId:'lbbh',
			   	name : 'lbbh',
			   	readOnly:true
	  		},{
	  			fieldLabel:'所属用户',
	  			itemId:'yhbh',
	  			hidden:true,
			   	name : 'yhbh'
	  		},{
	  			fieldLabel:'类别名称',
	  			itemId:'lbmc',
			   	name : 'lbmc'
	  		},{
	  			xtype: 'numberfield',
	  			fieldLabel:'类别级次',
	  			itemId:'lbjc',
			   	name : 'lbjc',
			   	minValue: 1,
	    		decimalPrecision :0,
	    		columnWidth: .5,
	    		step:1,
	    		readOnly:true
	  		},{
	  			fieldLabel:'末级标志',
	  			columnWidth: .5,
	  			xtype:'checkbox',
	  			itemId:'mjbz',
			   	name : 'mjbz'
	  		},{
	  			fieldLabel:'成品标记',
	  			xtype:'checkbox',
	  			columnWidth: .5,
	  			itemId:'cpbj',
			   	name : 'cpbj'
	  		},{
	  			fieldLabel:'采计重复',
	  			xtype:'checkbox',
	  			columnWidth: .5,
	  			itemId:'cfbj',
			   	name : 'cfbj'
	  		},{
	  			fieldLabel:'备注说明',
	  			itemId:'bzsm',
			   	name : 'bzsm'
	  		},{
	  			fieldLabel:'电话号码',
	  			itemId:'dhhm',
			   	name : 'dhhm'
	  		},{
	  			fieldLabel:'传真号码',
	  			itemId:'czhm',
			   	name : 'czhm'
	  		},{
	  			fieldLabel:'电子邮箱',
	  			itemId:'dzyx',
			   	name : 'dzyx'
	  		},{
	  			fieldLabel:'包装材料标记',
	  			xtype:'checkbox',
	  			itemId:'bzclbj',
			   	name : 'bzclbj',
			   	labelWidth: 100
	  		}]
	  	}],
	  	buttons:[{text:'保存',iconCls:'page_save',itemId:'BTN_SAVE',hidden:!me.isEdit,handler:function(){
	  		var form=me.down('#categoryForm');
	  		var rec=form.getRecord();
	  		if (!form.isValid()){  
                 Ext.Msg.alert('提示','输入不正确');  
                 return;
            }  
	  		form.updateRecord(rec);
	  		//标记赋值
	  		if(form.down('#mjbz').getValue()){
	  			rec.set('mjbz',1);
	  		}else{
	  			rec.set('mjbz',0);
	  		}
	  		if(form.down('#cpbj').getValue()){
	  			rec.set('cpbj',1);
	  		}else{
	  			rec.set('cpbj',0);
	  		}
	  		if(form.down('#cfbj').getValue()){
	  			rec.set('cfbj',1);
	  		}else{
	  			rec.set('cfbj',0);
	  		}
	  		if(form.down('#bzclbj').getValue()){
	  			rec.set('bzclbj',1);
	  		}else{
	  			rec.set('bzclbj',0);
	  		}
	  		if(Ext.isEmpty(rec.get('lbmc'))){
	  			 Ext.Msg.alert('提示','类别名称不能为空');  
                 return;
	  		}
	  		if(me.isAdd){
	  			rec.phantom=true;
	  			me.store.add(rec);
	  			me.store.sync({callback:function(){
	  				me.store.load();
	  				me.treeStore.load();
	  			}});
	  		}else{
	  			me.store.sync({callback:function(){
	  				me.store.load();
	  				me.treeStore.load();
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
		me.down('#categoryForm').loadRecord(rec);
	}
	
});