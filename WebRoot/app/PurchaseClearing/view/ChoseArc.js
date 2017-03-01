Ext.define('erp.PurchaseClearing.view.ChoseArc',{
   extend : 'erp.ux.Window',
   alias : 'widget.chose_arc',
   title : '选择归档方式',
   iconCls:'page_chose',
   modal:true,
   frame:true,
   width: 320,
   height:120,
    initComponent : function() {
         var me = this;
           Ext.apply(me,{
              layout: 'fit',
              items : [{
                 xtype : 'form',
                 itemId : 'cform',
                 layout:'column',
                 defaults:{padding:10},
                 frame:true,
                 items : [
                   {xtype : 'radiogroup',
                   itemId : 'choose',
                   name : 'choose',
                   fieldLabel : '请选择归档方式',
                   labelWidth:110,
                   items : [
                   {name: 'gd',inputValue : '0',boxLabel: '单一归档',checked : true,width:90},
                   {name: 'gd',inputValue : '1',boxLabel: '统一归档',width:90}
                   ]
                   }
                  /* fieldLabel : '单一归档',
                   labelWidth:60,
                   itemId : 'dygd',
                   name : 'dygd',
                   columnWidth : 1,
                   },{
                   xtype : 'checkbox',
                   fieldLabel : '统一归档',
                   labelWidth : 60,
                   itemId : 'tyda',
                   name : 'tyda',
                   columnWidth : 1
                   }*/
                 ]
              }],
              buttons:[{text: '确认',glyph:0xf058,itemId: 'btn_confirm',handler:
               function(){
                  var form = me.down('form');
                  var values = form.getValues();
                  var gd = values.gd;
                  if(gd=='0'){
                       Ext.Msg.confirm('提示','是否确认归档【 '+me.tzdh+' 】号通知单(Y/N)?',function(btn){
                           if(btn == 'yes'){
                               erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=doArc',{
                                  tzdh : me.tzdh,
                                  hsbm : me.hsbm
                               })
                               me.store.reload();
                               me.close();
                           }
                       })
                  }else if(gd == '1'){
                    Ext.Msg.confirm('提示','是否归档所有已核销通知单？',function(btn){
                         if(btn == 'yes'){
                             erp.Const.callServiceMethodSync('purchaseclearing/purchaseclearing.act?method=doAllArc',{
                                 hsbm : me.hsbm
                             })
                              me.store.reload();
                              me.close();
                         }
                    })
                  }
               }
              },
              '->',{text: '关闭',glyph:0xf057,handler:function(){me.close();}}
              ]
           });
             this.callParent(arguments);
       }
    /*   doArc : function(){
          var me = this;
          var form = me.down('#cform');
          var values = form.getValues();
       }*/
})