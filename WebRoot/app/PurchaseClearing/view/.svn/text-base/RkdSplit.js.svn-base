Ext.define('erp.PurchaseClearing.view.RkdSplit',{
    extend : 'erp.ux.Window',
    alias : 'widget.win_RkdSplit',
    width : 1120,
    height : 280,
    modal:true,
    title : '入库单拆分',
	initComponent:function(){
	    var me = this;	
	    Ext.apply(me,{
	          layout:{
				type:'vbox',
				align:'stretch'
			 },
			 items : [
			 {
			    xtype : 'form',
			    itemId: 'cfForm',
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
		             fieldLabel : '原纪录—序号:',
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
		             value : me.rksl_yd
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
		             value : me.rkje_yd,
		             renderer : function(value){
		             	return Ext.util.Format.round(value,2) ;
		             }
		             },
		             {
		             fieldLabel : '原纪录剩余—序号:',
		             itemId : 'rkxh_sy',
		             name : 'rkxh_sy',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkxh_yd
		             },
		             {
		             fieldLabel : '入库数量:',
		             itemId : 'rksl_sy',
		             name : 'rksl_sy',
		             columnWidth:.25,
		             readOnly:true
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
		             value : me.rkje_yd/*,
		             listeners :{
		             change : function(value){
		                return Ext.util.Format.round(value,2) ;
		              }
		             }*/
		             },
		             {
		             fieldLabel : '拆分记录—序号:',
		             itemId : 'rkxh_cf',
		             name : 'rkxh_cf',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkxh_cf
		             },
		             {
		             fieldLabel : '入库数量:',
		             itemId : 'rksl_cf',
		             name : 'rksl_cf',
		             columnWidth:.25,
		             readOnly:false,
		             value : me.rksl_yd,
		             xtype : 'numberfield',
		             decimalPrecision: 3,
		             allowBlank:false, 
		             maxValue : me.rksl_yd,
		             minValue : - me.rksl_yd,
		             allowNegative : true,
		             maxText : '拆分记录入库数量不能大于原单入库数量!',
		             minText : '拆分记录入库数量不能大于原单入库数量!',
		             enableKeyEvents:true,
		             listeners :{
		             	keyup : function(){
		             	   var rksl_cf = me.down('#rksl_cf').getValue();
		             	   var rksl_yd = me.down('#rksl_yd').getValue();
		             	  /* if(rksl_cf>rksl_yd){
			                  Ext.toastErrorInfo('拆分记录入库数量不能大于原单入库数量!')
			                  return;		             	      
		             	   }*/
		             	   var rksl_sy = Ext.util.Format.round(rksl_yd - rksl_cf,3);
		             	   me.down('#rksl_sy').setValue(rksl_sy);
		             	   var rkdj_yd = me.down('#rkdj_yd').getValue();
		             	   var rkje_cf = Ext.util.Format.round(rksl_cf*rkdj_yd,2);
		             	   me.down('#rkje_cf').setValue(rkje_cf); 
		             	   var rkje_sy = Ext.util.Format.round(rksl_sy*rkdj_yd,2);
		             	   me.down('#rkje_sy').setValue(rkje_sy); 
		             	}
		             }
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
		             readOnly:false,
	                 allowNegative : true,
		             value : me.rkje_yd,
		             enableKeyEvents:true,
		             listeners :{
		             keyup : function(value){
		             	  if(me.rec.get('rksl')!=0){
		                  var rkje_cf = me.down('#rkje_cf').getValue();
		             	  var rkdj_yd = me.down('#rkdj_yd').getValue();
		             	  var rksl_yd = me.down('#rksl_yd').getValue();
		             	  var rksl_cf = Ext.util.Format.round(rkje_cf/rkdj_yd,3);
		             	  me.down('#rksl_cf').setValue(rksl_cf);
		             	  var rksl_sy = Ext.util.Format.round(rksl_yd - rksl_cf,3);
		             	  me.down('#rksl_sy').setValue(rksl_sy);
		             	  var rkje_sy = Ext.util.Format.round(rksl_sy*rkdj_yd,2);
		             	  me.down('#rkje_sy').setValue(rkje_sy); 
		                }else{
		                  
		                }
		              }
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
           var form = me.down('#cfForm');
           return form.getValues();
        }
})