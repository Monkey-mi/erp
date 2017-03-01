Ext.define('erp.master.contractStop.controller.ContractStopCtrl',{
     extend: 'Ext.app.Controller',
     requires: ['erp.master.contractStop.store.ContractType',
                'erp.ux.FormKey'
                ],
     alias: 'wdiget.mng_Contract', 
     views: ['erp.master.contractStop.view.ContractWin',
             'erp.master.contractStop.view.EdtContractWin'],
     refs:[
     	  {ref: 'ContractWin',selector:'win_Contract'}, 
     	  {ref: 'GrdContractType',selector: 'win_Contract #grd_Contract'},
     	  {ref: 'EditContractWin',selector: 'edt_ContractType #ContractTypeForm'} 
     	],
       init : function(){
           var me = this;
        	if(me.isInited) return true;
        	me.control({
        	    'win_Contract' : {
        	    afterrender: function(){
        	        var store = me.getGrdContractType().getStore();
        	        var grid =me.getGrdContractType();
        	        me.grdStore = grid.getStore();
        	        me.grdStore.load();  
        	    }
        	    },
        	    'win_Contract button' : {
        	       click : me.doAction	
        	     },
                'win_Contract #grd_Contract' : {
				   selectionchange : function(grid, rec){
					if (rec.length > 0) {	
					    me.setBtnStatus(false);
					   }else {
						me.setBtnStatus(true);
					   }
					  },
				   itemdblclick : function(grid, rec){
					    me.EditContractType(true);
					     }
					}
        	    }
        	);
        	this.isInited = true;
        	},
        doAction : function(btn){
        	 switch(btn.itemId){
              case erp.Const.FUNC_ITEMID_BTN_ADD : 
                 this.doAddContractType();
                 break;
              case erp.Const.FUNC_ITEMID_BTN_EDT :
                 this.EditContractType(true);
                 break;
              case erp.Const.FUNC_ITEMID_BTN_DEL :
                 this.doDeleteContractType();
                 break;
        	 }
          },
       setBtnStatus : function(sts) {
		      var me = this;
		      var window = me.getContractWin();
		      window.down('#BTN_EDT').setDisabled(sts);
		      window.down('#BTN_DEL').setDisabled(sts);
	    },  
        doAddContractType : function(){
        	  var me = this;
        	  var newlxbh = null;
        	     Ext.Ajax.request({
						url: 'contracttype/contracttype.act?method=getContractTypeOne',
						async:false,//设置ajax同步
					    success: function(response, opts) {
					        var obj = Ext.decode(response.responseText);
					        newlxbh=obj.data;
					    },
					    method:"POST",
					    scope:this
					});
			  var isAdd, isEdit;
              var rec = Ext.create('erp.master.contractStop.model.ContractType',{
                           lxbh : parseInt(newlxbh)+1 
                    });
              var edtWin = Ext.widget('edt_ContractType',{isAdd:true,isEdit:true,store:me.grdStore,
	    	  itemId:'edt_ContractType'});
              edtWin.down('#ContractTypeForm').loadRecord(rec);
              edtWin.show();	
        },
        EditContractType : function(isEdit){
       	   var me=this;
       	   var isAdd, isEdit;
       	   //验证
		   var selModel = this.getGrdContractType().getSelectionModel();
		   if(!selModel.hasSelection()){
		 	Ext.Msg.alert('提示','请选择一个合同终止类型!');
			return;
		}
		   var rec =selModel.getSelection()[0];
		   var edtWin = Ext.widget('edt_ContractType',{isAdd:false,isEdit:isEdit,store:me.grdStore,itemId:'edt_ContractType'});
		   edtWin.down('#ContractTypeForm').loadRecord(rec);
		   edtWin.show();
		},
	  
	   doDeleteContractType : function() {
		   var me = this;
		   //Ext.Msg.alert('删除');
		   var grid = me.getGrdContractType();
		   var rec = grid.getSelectionModel().getSelection();
		   Ext.Msg.confirm("提醒", "真的要删除合同终止类型?", function(btn) {
					 if (btn == "yes") {
						 me.grdStore.remove(rec);
						 me.grdStore.sync();
					 }
			}) 
	   }
});