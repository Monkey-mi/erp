Ext.define('erp.materialInventory.view.WarehouseDateChoose',{
	extend: 'erp.ux.Window',
	alias: 'widget.win_WarehouseDate',
	requires : ['erp.ux.FormKey',
	            'erp.materialInventory.model.TimeQueryParam',
	            'erp.materialInventory.store.Ckmc'],
	title : '仓库年月选择',
	width:  500,
    height: 240,
    iconCls:'page_go',
    modal:true,
    initComponent : function(){
    	var me = this;
    	me.rec = Ext.create('erp.materialInventory.model.TimeQueryParam');
    	var myDate = new Date();
    	myDate.setDate(01);
	   /* var year = myDate.getYear()+1900;
	    var month = myDate.getMonth()+1;
	    var myDate = year+'-'+month+'-01 00:00:00';*/
	    var czyh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;//工号
        var ckStore = Ext.create('erp.materialInventory.store.Ckmc').load({params:{czyh:czyh}});
	    Ext.apply(me,{
	    	layout : {type: 'fit',pack: 'start',align: 'stretch'},
	    	defaults:{padding:5},
	    	 items:[{
	    		 itemId: 'TimeChooseForm',
             	 xtype: 'form',
             	 plugins:{ptype: 'FormKey'},
				 store: me.store,
				 layout:{ type: 'column',pack: 'start',align: 'stretch'},
				 defaults: {anchor: '95%',labelWidth: 72,margin:'5 5 5 5',columnWidth: 1},
				 items: [
				         {
				        fieldLabel: '仓库名称',
					    itemId:'ckbh',
						name : 'ckbh',
					    columnWidth: 1,
					    displayField : 'ckmc',
					    valueField: 'ckbh',
					    xtype : 'combo',
					    multiSelect:true,
					    queryMode : 'local',
						allowBlank:false,
						selectOnFocus:true,
						fieldConfig:{forceSelection:true},
					    store : ckStore,
					    listConfig:{
					    	itemTpl : Ext.create('Ext.XTemplate','<input type=checkbox />{ckmc}'),
					    	listeners:{					    		
					    	select:function(combb,records,eopts){
					    		var checks = document.getElementsByTagName("input");
					    		if(records.get('ckbh')=="0"){
					    			combb.selectAll();
					    			for(var i=0;i<checks.length;i++){
  							 			checks[i].checked = true;
  							 		}
					    		}					    		
					    	},
					    	deselect:function(model,rec,index,ope){
					    		if(rec.get('ckbh')=="0"){
					    			model.deselectAll();
					    		}					    
					    	},
 							itemclick:function(view, record, item, index, e, eOpts ){   								
 							 	var isSelected = view.isSelected(item);
 								var checkboxs = item.getElementsByTagName("input"); 
 								var checks = document.getElementsByTagName("input");
 				 			 	if(checkboxs!=null)  
  							 	{  
      								var checkbox = checkboxs[0];  
      								if(!isSelected)  
     							 	{  
         							 checkbox.checked = true;  
      								}else{  
          							 checkbox.checked = false;  
      								}  
  							 	} 
  							 	if(record.get('ckbh')=='0'){
  							 		if(!isSelected){
  							 		for(var i=0;i<checks.length;i++){
  							 			checks[i].checked = true;
  							 		}
  							 		}else{
  							 			for(var i=0;i<checks.length;i++){
  							 			checks[i].checked = false;
  							 		}
  							 		}
  							 	}
 							}	  
 							}
					    }
				        },
				        {fieldLabel:'入库日期',
				         xtype:'datefield',
				         itemId:'rkqsrq',
				         name:'rkqsrq',
				         value: myDate,
                         format: 'Y-m-d H:i:s',
                         columnWidth: 0.5
				        },{
                            fieldLabel: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至',
                            libelWidth: 100,
                            itemId: 'rkjsrq',
                            name:'rkjsrq',
                            format: 'Y-m-d H:i:s',
                            value: new Date(),
                            xtype: 'datefield',
                            columnWidth: 0.5
                        },{
                            fieldLabel: '核销标记',
                            xtype: 'fieldcontainer',
                            columnWidth: 1,
                            defaultType: 'radiofield',                            
                            defaults: {
                                flex: 1
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{                               
                                columnWidth: 1/3,
                                name: 'hxbj',
                                boxLabel: '已核销',
                                inputValue: 1
                            }, {
                                columnWidth: 1/3,
                                name: 'hxbj',
                                boxLabel: '未核销',
                                inputValue: 2
                            }, {
                                columnWidth: 1/3,
                                name: 'hxbj',
                                inputValue: 3,
                                boxLabel: '全部'
                            }]
                        }, {
							name : 'cgym',
							labelWidth : 60,
							itemId:'cgym',
							fieldLabel:'采购员',
							width:300,
							xtype:'helpField',
							code : erp.DataConst.PurGroupMan,
							fieldConfig:{forceSelection:false},
							listeners:{
								'select':function(obj,recs){
						   	}
							}
						  }
				         ],
			          buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
							        handler:function(btn){	
									var form=me.down('form');
									form.form.reset();
									var rec=form.getRecord();
									form.updateRecord(rec);
			       	  			}
						},
						'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
						    handler:me.doMaterialInventory
						},
						{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
						]
	    	 }]
	    });
	    this.callParent(arguments);
	    me.down('form').loadRecord(me.rec);
    },
    doMaterialInventory : function(){
    	var me =this;
    	var win = me.up('window');
    	 var form = win.down('form');
	     var rec=form.getRecord();	
	     form.updateRecord(rec);
	     if(form.isValid()){
         var ks_rkrq =Ext.util.Format.date(rec.get('rkqsrq'),'Y-m-d H:i:s') ;
         var jz_rkrq =Ext.util.Format.date(rec.get('rkjsrq'),'Y-m-d H:i:s') ;
         var hxbj;
         if(!Ext.isEmpty(rec.get('hxbj')) && rec.get('hxbj')==2){
         	hxbj = 0;
         }else if(!Ext.isEmpty(rec.get('hxbj')) && rec.get('hxbj')==1){
            hxbj = 1;
         }else{
         	hxbj = 3;
         }
	     var arr_ckbh = rec.get('ckbh');
	     var s_ckbh = ""+arr_ckbh;
	     var czyh = erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id;//工号
	      //仓库名称
//	     var ckmc;
//	     if (ckbh != null && ckbh !=''){
//	         ckmc = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCkmc',{ckbh:ckbh});	         
//	     }else{
//	    	 Ext.Msg.alert('提示','请选择仓库名称');
//	    	 return;
//	     }
	     //仓库权限
     	 var result = erp.Const.callServiceMethodSync('materialInventory/materialInventory.act?method=getCkCount',{czyh:czyh,s_ckbh:s_ckbh});
	     var data = Ext.decode(result);
	     if(!data.bool){
	    	Ext.Msg.alert('提示',msg);
	    	return;
	     }	     
	     var arr_ckmc = data.arr_ckmc.toString();
	     if(arr_ckbh[0]=='0'){
	     	arr_ckmc='全部仓库';
	     }
	     var store = Ext.create('erp.materialInventory.store.MaterialInventoryManager');
	     win.close();
	     var panel = erp.Util.addContentTab({
	    	 xtype : 'mng_MaterialInventoryManager',
	    	 itemId : 'MaterialInventoryManager',
             title: '材料入库单管理',
             czyh : czyh,
             s_ckbh : s_ckbh,
             arr_ckmc : arr_ckmc,
             qsrq : ks_rkrq,
             jzrq : jz_rkrq,
             hxbj : hxbj,
             cgym : rec.get('cgym'),
             closable : true
	     });
	    } 
    }   
});