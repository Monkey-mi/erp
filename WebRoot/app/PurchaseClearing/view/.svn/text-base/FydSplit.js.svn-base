Ext.define('erp.PurchaseClearing.view.FydSplit',{
    extend : 'erp.ux.Window',
    alias : 'widget.win_FydSplit',
    width : 1120,
    height : 280,
    modal:true,
    title : '费用单拆分',
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
			    itemId: 'cfForm',
			    bodyPadding: 10,
			    store : me.store,
			    layout: 'column',
		          defaults: {
		            labelWidth:75,padding:5,xtype:'textfield'
		          },
		          items : [
		             {
		             fieldLabel : '费用单号:',
		             itemId : 'fydh',
		             name : 'fydh',
		             columnWidth:.2,
		             readOnly:true,
		             value : me.rec.get('fydh')
		             },
		             {
		             fieldLabel : '厂商名称:',
		             itemId : 'csmc',
		             name : 'csmc',
		             columnWidth:.4,
		             readOnly:true,
		             value : me.rec.get('csmc')
		             },
		             {
		             fieldLabel : '费用摘要:',
		             itemId : 'fyzy',
		             name : 'fyzy',
		             columnWidth:.4,
		             readOnly:true,
		             value : me.rec.get('fyzy')
		             },
		             {
		             fieldLabel : '原纪录—序号:',
		             itemId : 'fyxh_yd',
		             name : 'fyxh_yd',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fyxh')
		             },
		             {
		             fieldLabel : '数量:',
		             itemId : 'fysl_yd',
		             name : 'fysl_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fysl')
		             },
		             {
		             fieldLabel : '单价:',
		             itemId : 'fydj_yd',
		             name : 'fydj_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fydj')
		             },
		             {
		             fieldLabel : '金额:',
		             itemId : 'fyje_yd',
		             name : 'fyje_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fyje'),
		             renderer : function(value){
		             	return Ext.util.Format.round(value,2) ;
		             }
		             },
		             {
		             fieldLabel : '原纪录剩余—序号:',
		             itemId : 'fyxh_sy',
		             name : 'fyxh_sy',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fyxh')
		             },
		             {
		             fieldLabel : '数量:',
		             itemId : 'fysl_sy',
		             name : 'fysl_sy',
		             columnWidth:.25,
		             readOnly:true
		             },
		             {
		             fieldLabel : '单价:',
		             itemId : 'fydj_sy',
		             name : 'fydj_sy',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fydj')
		             },
		             {
		             fieldLabel : '金额:',
		             itemId : 'fyje_sy',
		             name : 'fyje_sy',
		             columnWidth:.25,
		             readOnly:true/*,
		             listeners :{
		             change : function(value){
		                return Ext.util.Format.round(value,2) ;
		              }
		             }*/
		             },
		             {
		             fieldLabel : '拆分记录—序号:',
		             itemId : 'fyxh_cf',
		             name : 'fyxh_cf',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.fyxh_cf
		             },
		             {
		             fieldLabel : '数量:',
		             itemId : 'fysl_cf',
		             name : 'fysl_cf',
		             columnWidth:.25,
		             readOnly:false,
		             value : me.rec.get('fysl'),
		             xtype : 'numberfield',
		             allowBlank:false, 
		             maxValue : me.rec.get('fysl')<0?0:me.rec.get('fysl'),
		             minValue : me.rec.get('fysl')>0?0:me.rec.get('fysl'),
		             allowNegative : true,
		             maxText : '拆分记录费用数量不能大于原单费用数量!',
		             minText : '拆分记录费用数量不能大于原单费用数量!',
		             enableKeyEvents:true,
		             listeners :{
		             	keyup : function(){
		             	   var fysl_cf = me.down('#fysl_cf').getValue();
		             	   var fysl_yd = me.down('#fysl_yd').getValue();
		             	  /* if(fysl_cf>fysl_yd){
			                  Ext.toastErrorInfo('拆分记录费用数量不能大于原单费用数量!')
			                  return;		             	      
		             	   }*/
		             	   var fysl_sy = Ext.util.Format.round(fysl_yd - fysl_cf,3);
		             	   me.down('#fysl_sy').setValue(fysl_sy);
		             	   var fydj_yd = me.down('#fydj_yd').getValue();
		             	   var fyje_cf = Ext.util.Format.round(fysl_cf*fydj_yd,2);
		             	   me.down('#fyje_cf').setValue(fyje_cf); 
		             	   var fyje_sy = Ext.util.Format.round(fysl_sy*fydj_yd,2);
		             	   me.down('#fyje_sy').setValue(fyje_sy); 
		             	}
		             }
		             },
		             {
		             fieldLabel : '单价:',
		             itemId : 'fydj_cf',
		             name : 'fydj_cf',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fydj')
		             },
		             {
		             fieldLabel : '金额:',
		             itemId : 'fyje_cf',
		             name : 'fyje_cf',
		             columnWidth:.25,
		             readOnly:false,
		             allowNegative : true,
		             maxValue : me.rec.get('fyje')<0?0:me.rec.get('fyje'),
		             minValue : me.rec.get('fyje')>0?0:me.rec.get('fyje'),
		             maxText : '拆分记录含税金额量不能等于大于原单金额!',
		             minText : '拆分记录含税金额量不能等于大于原单金额!',
		             value : me.rec.get('fyje'),
		             enableKeyEvents:true,
		             listeners :{
		             keyup : function(value){
		                if(me.rec.get('fysl')!=0){
		                  var fyje_cf = me.down('#fyje_cf').getValue();
		             	  var fydj_yd = me.down('#fydj_yd').getValue();
		             	  var fysl_yd = me.down('#fysl_yd').getValue();
		             	  var fysl_cf = Ext.util.Format.round(fyje_cf/fydj_yd,3);
		             	  me.down('#fysl_cf').setValue(fysl_cf);
		             	  var fysl_sy = Ext.util.Format.round(fysl_yd - fysl_cf,3);
		             	  me.down('#fysl_sy').setValue(fysl_sy);
		             	  var fyje_sy = Ext.util.Format.round(fysl_sy*fydj_yd,2);
		             	  me.down('#fyje_sy').setValue(fyje_sy); 
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