Ext.define('erp.master.caterialPricePurchase.view.EdtVendorPrice',{
       extend: 'erp.ux.Window',
	   alias: 'widget.edt_VendorPrice',
	   requires:['erp.ux.SelectField'],
	   title : '材料价格编辑',
	   modal: true,
	   width: 320,
	   height: 490,
	   initComponent: function(){
       var me = this;
       me.isInit = false;
	   Ext.apply(me,{
             layout:{
				type:'vbox',
				align:'stretch'
			},
	         defaults:{padding:5},
	         items : [{
	            itemId : 'EdtForm',
	            xtype: 'form',
	            store : me.store,
		        layout:{
				    type:'vbox',
				    align:'stretch'
			    },
			    defaults: {
				anchor: '95%',
				labelWidth: 80,
				xtype: 'textfield',
				margin:'5 5 5 5'
			    },
			    items : [{
			       fieldLabel : '材料编号',
			       itemId : 'clhh',
			       name : 'clhh',
			       readOnly : me.isCl
	            },{
			       fieldLabel : '材料名称',
			       itemId : 'clmc',
			       name : 'clmc',
			       xtype : 'commonTrigger',
			       selModel:'SINGLE',
			       cusConfig:{
			           field:'clmc',
					   indexNum:3,
					   callback : function(v,rec,recs){
										me.clmcCallback(v,rec,recs);
									}
			       },
			       readOnly : me.isCl,
			       win:'erp.view.master.purchaseDetail.window.MateCombo',
			       listeners:{
			           'selectchange' : function(){
			           	  var clmc = me.down('#clmc').getValue();
			              var clhh = me.getClhh(clmc);
			              me.down('#clhh').setValue(clhh);
			           }
			       },
			       	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
				     }
			    },{
			       fieldLabel: '厂商编号',
		           itemId: 'csbh',
		           name:'csbh',
		           readOnly:me.isVp
		         },{
		           fieldLabel: '厂商名称',
		           itemId: 'csmc',
		           name: 'csmc',
		           allowBlank:false,
				   blankText : '厂商名称不能为空',
				   emptyText:'(必填)',
		           xtype:'helpField',
		           readOnly:me.isVp,
		           displayField : 'csmc',
			       valueField: 'csbh',
		           /*readOnly:!me.isPlus,*/
				   code : erp.DataConst.FACTORYINFO,
					fieldConfig:{forceSelection:false},
					listeners:{
				          change :function(o,  newValue,  oldValue,  eOpts){
				          	  var csbh = me.down('#csmc').getValue();
				              if(me.isInit || (me.isAdd && !me.isVp)){
				          	  me.down('#csbh').setValue(csbh);
				          	  }
				          	  me.isInit = true;
				          }
				          }
		        },/*{
		        	fieldLabel : '币种',
		        	itemId : 'kzdj',
			        name : 'kzdj'
		        },*/
		        {
			       fieldLabel : '控制单价',
			       itemId : 'kzdj',
			       name : 'kzdj',
			       allowBlank : false,
			       blankText : '控制单价不能为空'
			    },{
			       fieldLabel : '辅助控价',
			       itemId : 'fzkj',
			       name : 'fzkj'
			    },{
			       fieldLabel : '供货周期(天)',
			       itemId : 'ghzq',
			       name : 'ghzq',
			       xtype : 'numberfield'
			    },{
			       fieldLabel : '最小包装量',
			       itemId : 'zxbzl',
			       name : 'zxbzl',
			       xtype : 'numberfield'
			    },{
			       fieldLabel : '最低采购量',
			       itemId : 'zdcgl',
			       name : 'zdcgl',
			       xtype : 'numberfield'
			    },{
			       fieldLabel : '厂商型号',
			       itemId : 'csxh',
			       name : 'csxh'
			    },{
			       fieldLabel : '备注说明',
			       itemId : 'bzsm',
			       name : 'bzsm',
			       maxLength:120
			    }],
			    buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'保存',iconCls:'page_save',itemId:'BTN_SAVE'},
			{text:'取消',iconCls:'page_error',handler:function(){
					me.close();
			}}]
	         }]
	   })
	   me.callParent(arguments);
	   },
	    getClhh : function(clmc){
	         var result =  erp.Const.callServiceMethodSync('caterialpricepurchase/caterialpricepurchase.act?method=getClhh',{
			                clmc : clmc});
			 return result;            
	    },
	    getData : function(){
           var me = this;
           var form = me.down('#EdtForm');
           return form.getValues();
        },
      clmcCallback : function(view,rec,recs){
        var me = this;
        var clhh = rec.get('clhh');
        var clmc = rec.get('clmc');
        me.down('#clhh').setValue(clhh);
        me.down('#clmc').setValue(clmc);
        },
	    loadData : function(rec,isAdd,isEdit){
		var me=this;
		var form=me.down('form');
		form.loadRecord(rec);
		if(isEdit){
		}
	}		
})