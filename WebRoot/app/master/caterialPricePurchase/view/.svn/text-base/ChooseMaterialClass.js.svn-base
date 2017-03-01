Ext.define('erp.master.caterialPricePurchase.view.ChooseMaterialClass',{
     extend: 'erp.ux.Window',
     alias: 'widget.win_ChooseMaterialClass',
    /* requires: [],*/
     title : '材料类别选择',
     width:  280,
     height: 630,
     iconCls:'page_go',
     views:['erp.master.caterialPricePurchase.view.ChooseMaterialClass'],
     refs:[{ref : 'treepanel',selector:'ChooseMaterialClass treepanel'}],
     modal:true,
      initComponent : function(){
       var me=this;
     /*  me.store=Ext.create('erp.master.caterialPricePurchase.store.MaterialClass');*/
       me.treeStore=Ext.create('erp.master.caterialPricePurchase.store.MaterialClass');
      /* me.rec=Ext.create();*/
       Ext.apply(me,{
       	      layout: {
              	type: 'fit',
              	 pack: 'start',
		         align: 'stretch'
              },
              defaults:{padding:5},
             items: [{
             /* 	xtype : 'conboxTree',
             	itemId : 'tree_materialClass',
             	fieldLabel : '采购类别',
             	queryMode : 'local',
             	store : me.treeStore,
             	displayField : 'text',
				valueField: 'nodeId'*/
                split : true,
                title : '类别',
                tools:[
			           {type:'refresh',tooltip:'刷新'}
			    ],
			   /* reference:'caterialclass',*/
			    collapsible:true,
	  			xtype:'treepanel',
	   	  	  	itemId:'tree_materialClass',
	   	  	  	name : 'tree_materialClass',
	   	  	  	width:200,
		    	useArrows: true,
		    	store:me.treeStore,
		    	listeners:{
	    			  'itemclick':function(t,rec){
	    			  		var lbbh = rec.get('nodeId');
	    			  		var hasPermission = me.hasPermission(lbbh);
	    			  		if(hasPermission!=0){
	    			  			me.down('#btn_confirm').setDisabled(false);
	    			  	    }else{
	    			  		     Ext.Msg.alert('提示',"你没有该材料类别操作权限");
			                     me.down('#btn_confirm').setDisabled(true);
			                     return;
	    			  		}
	    			  }
		    	}
		    	}
             ],
             buttons:[{text:'确认',glyph:0xf058,itemId:'btn_confirm',disabled:false
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
           
       });
       this.callParent(arguments);
		/*  me.down('form').loadRecord(me.rec);*/
      },
      hasPermission : function(lbbh){
		 var result = erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=hasPermission',
         {lbbh :lbbh,czygh : erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id });
         return result;
	 }
     })