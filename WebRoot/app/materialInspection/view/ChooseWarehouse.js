Ext.define('erp.materialInspection.view.ChooseWarehouse',{
    extend : 'erp.ux.Window',
    alias: 'widget.Choose_Warehouse',
    requires: [],
    title : '仓库选择',
    width : 320,
    height : 120,
    iconCls:'page_go',
    modal : true,
    initComponent : function(){
       	  var me=this;
       	  me.store = Ext.create('erp.materialInspection.store.WareHouse'); 
       	  me.rec = Ext.create('erp.materialInspection.model.WareHouse')
       	  Ext.apply(me,{
              layout: {
                 type: 'fit',
              	 pack: 'start',
		         align: 'stretch'
              },
              defaults:{padding:5},
              items : [
               {
                 itemId : 'choose_Warehouse',
                 xtype: 'form',
                 defaults : {
				  anchor: '95%',
				  labelWidth: 72,
				  margin:'5 5 5 5',
				  columnWidth: 1
			   },
			   items : [
			     {
			     	fieldLabel : '仓库名称',
			     	xtype : 'combo',
			     	itemId : 'ckmc',
			     	name : 'ckmc',
			     	store : me.store,
			     	displayField : 'ckmc',
			     	valueField : 'ckbh'
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
			    handler:function(){me.openPanel();}
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
			   }]
          });
          this.callParent(arguments);
		  me.down('form').loadRecord(me.rec);         	  
    },
    openPanel : function(){
    	var me = this;
        var form = me.down('form');
        var rec = form.getRecord();
        form.updateRecord(rec);
        var ckmc = me.down('#ckmc').getRawValue();
        var ckbh = rec.get('ckmc');
        var panel  = erp.Util.addContentTab({
             xtype : 'mng_ArrivalRegisterManger',
             itemId : 'ArrivalRegisterManger',
             title : '到货登记管理【仓库名称:'+ckmc+'】',
             ckbh : ckbh,
             ckmc : ckmc
        })
        me.close();
      }
})