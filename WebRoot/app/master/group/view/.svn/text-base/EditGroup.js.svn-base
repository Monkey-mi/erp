Ext.define('erp.master.group.view.EditGroup',{
      extend : 'erp.ux.Window',
      alias : 'widget.edt_group',
      requires:['erp.master.group.store.Group',
                'erp.ux.FormKey'],
      title : '采购组维护编辑',
      width: 350,
      height: 190,
      iconCls:'group_blue_edit',
      modal:true,
     /* isAdd:false,
	  isEdit:false,*/
      initComponent : function(){
          var me=this;
          
        /*  me.store=Ext.create('erp.master.group.store.Group');
          me.store.load();*/
    		Ext.apply(me,{
    	     layout:{
		     type: 'fit',
		     pack: 'start',
		     align: 'stretch'
    	},
    	    defaults:{padding:5},
    	     items:[
    	      {
    	      	itemId: 'GroupForm',
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
			     fieldLabel:'采购组号',
	  			 itemId:'cgzh',
			   	 name : 'cgzh',   	 
			   	 columnWidth: .5,
			   	 readOnly : true
			   },
			   {
	  			fieldLabel:'采购组名',
	  			itemId:'cgzm',
			   	name : 'cgzm',
			   	allowBlank : false,
				blankText : '采购组名不允许为空!'
	  		   },
	  		   {
	  			fieldLabel:'备注说明',
	  			itemId:'bzsm',
			   	name : 'bzsm'
	  		   }
	  		    ]
    	      }],
    	    buttons:[{text:'保存',iconCls:'page_save',itemId:'BTN_SAVE',hidden:!me.isEdit,handler:function(){
	  		var form=me.down('#GroupForm');
	  		var rec=form.getRecord();
	  		if (!form.isValid()){  
                 Ext.Msg.alert('提示','输入不正确');  
                 return;
            }  
	  		form.updateRecord(rec);
	  		if(Ext.isEmpty(rec.get('cgzm'))){
	  			 Ext.Msg.alert('提示','采购组名不能为空');  
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
	  		me.isEdit = false;
	  		me.close();}
	  	},{text:'取消',iconCls:'page_error',handler:function(){
					me.close();
			}
	  	}]
    		
    		})
    		  me.callParent(arguments);
    		  /*me.down('#GroupForm').loadRecord(GroupRec);*/
	         /*  me.loadRecord(me.rec);*/
     },
	loadRecord:function(rec){
		var me=this;
		me.down('#GroupForm').loadRecord(rec);
	}
});