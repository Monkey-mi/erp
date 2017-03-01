Ext.define('erp.master.contractStop.view.EdtContractWin',{
      extend : 'erp.ux.Window',
      alias : 'widget.edt_ContractType',
      requires:['erp.master.contractStop.store.ContractType',
                'erp.ux.FormKey'],
      title : '合同终止类型编辑',
      width: 350,
      height: 190,
      iconCls:'group_blue_edit',
      modal:true,
      closable : true,
      initComponent : function(){
          var me=this;
         /* me.store = Ext.create('erp.master.contractStop.store.ContractType');*/
    		Ext.apply(me,{
    	     layout:{
		     type: 'fit',
		     pack: 'start',
		     align: 'stretch'
    	},
    	    defaults:{padding:5},
    	     items:[
    	      {
    	      	itemId: 'ContractTypeForm',
    	      	xtype:'form',
    	      	plugins:{
				ptype: 'FormKey'
				},
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
			items: [
			   {   
			     fieldLabel:'类型编号',
	  			 itemId:'lxbh',
			   	 name : 'lxbh',   	 
			   	 columnWidth: .5,
			   	 readOnly : true
			   },
			   {
	  			fieldLabel:'类型名称',
	  			itemId:'lxmc',
			   	name : 'lxmc',
			   	allowBlank : false,
				blankText : '类型名称不允许为空!'
	  		   },
	  		   {
	  			fieldLabel:'备注说明',
	  			itemId:'bzsm',
			   	name : 'bzsm'
	  		   }
	  		    ]
    	      }],
    	    buttons:[{text:'保存',iconCls:'page_save',itemId:'BTN_SAVE',hidden:!me.isEdit,handler:function(){
    	    me.doSave()
    	    }
	  		
	  		},{text:'取消',iconCls:'page_error',handler:function(){
					me.close();
			}
	  	}]
    		
    		})
    		  me.callParent(arguments);
     },
	loadRecord:function(rec){
		var me=this;
		me.down('#ContractTypeForm').loadRecord(rec);
	},
	doSave :function(){
	   me.isEdit = false;
	   Ext.Msg.confirm('提示','是否确认保存？',function(btn){
	      if(btn=='yes'){
	         	  		var form=me.down('#ContractTypeForm');
	  		var rec=form.getRecord();
	  		if (!form.isValid()){  
                 Ext.Msg.alert('提示','输入不正确');  
                 return;
            }  
	  		form.updateRecord(rec);
	  		if(Ext.isEmpty(rec.get('lxmc'))){
	  			 Ext.Msg.alert('提示','类型名称不能为空');  
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
	  		Ext.Msg.alert('提示','保存成功！')
	  		me.close();
	      }
	   })
	}
});