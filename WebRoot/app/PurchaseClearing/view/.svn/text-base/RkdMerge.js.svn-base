Ext.define('erp.PurchaseClearing.view.RkdMerge',{
    extend : 'erp.ux.Window',
    alias : 'widget.win_RkdMerge',
    width : 1120,
    height : 280,
    modal:true,
    title : '入库单合并',
	initComponent:function(){
	    var me = this	
	    Ext.apply(me,{
	          layout:{
				type:'vbox',
				align:'stretch'
			 },
			 items : [
			 {
			    xtype : 'form',
			    itemId: 'hbForm',
			    bodyPadding: 10,
			    layout: 'column',
		          defaults: {
		            labelWidth:75,padding:5,xtype:'textfield'
		          },
		          items : [
		             {
		             fieldLabel : '仓库名称:',
		             itemId : 'ckmc',
		             name : 'ckmc',
		             columnWidth:.15,
		             readOnly:true,
		             value : me.rec.get('ckmc')
		             },
		             {
		             fieldLabel : '厂商名称:',
		             itemId : 'csmc',
		             name : 'csmc',
		             columnWidth:.35,
		             readOnly:true,
		             value : me.rec.get('csmc')
		             },
		             {
		             fieldLabel : '入库单号:',
		             itemId : 'rkdh',
		             name : 'rkdh',
		             columnWidth:.15,
		             readOnly:true,
		             value : me.rec.get('rkdh')
		             },
		             {
		             fieldLabel : '材料名称:',
		             itemId : 'clmc',
		             name : 'clmc',
		             columnWidth:.35,
		             readOnly:true,
		             value : me.rec.get('clmc')
		             },
		             {
		             fieldLabel : '并前记录1—序号:',
		             itemId : 'rkxh_sy',
		             name : 'rkxh_sy',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('rkxh')
		             },
		             {
		             fieldLabel : '入库数量:',
		             itemId : 'rksl_sy',
		             name : 'rksl_sy',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('rksl')
		             },
		             {
		             fieldLabel : '含税单价:',
		             itemId : 'rkdj_sy',
		             name : 'rkdj_sy',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkdj_yd
		             },
		             {
		             fieldLabel : '含税金额:',
		             itemId : 'rkje_sy',
		             name : 'rkje_sy',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('rkje')/*,
		             listeners :{
		             change : function(value){
		                return Ext.util.Format.round(value,2) ;
		              }
		             }*/
		             },
		             {
		             fieldLabel : '并前记录2—序号:',
		             itemId : 'rkxh_cf',
		             name : 'rkxh_cf',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.recs2.get('rkxh')
		             },
		             {
		             fieldLabel : '入库数量:',
		             itemId : 'rksl_cf',
		             name : 'rksl_cf',
		             columnWidth:.25,
		             readOnly:true,
		             value :me.recs2.get('rksl')
		             },
		             {
		             fieldLabel : '含税单价:',
		             itemId : 'rkdj_cf',
		             name : 'rkdj_cf',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkdj_yd
		             },
		             {
		             fieldLabel : '含税金额:',
		             itemId : 'rkje_cf',
		             name : 'rkje_cf',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.recs2.get('rkje')/*,
		             listeners :{
		             change : function(value){
		                return Ext.util.Format.round(value,2) ;
		              }
		             }*/
		             },{
		             fieldLabel : '合并记录—序号:',
		             itemId : 'rkxh_yd',
		             name : 'rkxh_yd',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkxh_yd
		             },
		             {
		             fieldLabel : '入库数量:',
		             itemId : 'rksl_yd',
		             name : 'rksl_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : parseFloat(me.rec.get('rksl'))+parseFloat(me.recs2.get('rksl'))
		             },
		             {
		             fieldLabel : '含税单价:',
		             itemId : 'rkdj_yd',
		             name : 'rkdj_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkdj_yd
		             },
		             {
		             fieldLabel : '含税金额:',
		             itemId : 'rkje_yd',
		             name : 'rkje_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : parseFloat(me.rec.get('rkje'))+parseFloat(me.recs2.get('rkje')),
		             renderer : function(value){
		             	return Ext.util.Format.round(value,2) ;
		             }
		             }
		          ],
			       buttons:[
			       {text:'保存',iconCls:'page_save',action:'BTN_SAVE'},'->',
			       {text:'取消',iconCls:'page_error',handler:function(){
					me.close();
			         }}]
			       }
			 ]
	    })
	    me.callParent(arguments);
	  },
	   getData: function(){
           var me = this;
           var form = me.down('#hbForm');
           return form.getValues();
        }
})