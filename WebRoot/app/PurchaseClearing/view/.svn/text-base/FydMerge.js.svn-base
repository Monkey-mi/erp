Ext.define('erp.PurchaseClearing.view.FydMerge',{
    extend : 'erp.ux.Window',
    alias : 'widget.win_FydMerge',
    width : 1120,
    height : 280,
    modal:true,
    title : '费用单合并',
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
		             fieldLabel : '并前记录1—序号:',
		             itemId : 'fyxh_sy',
		             name : 'fyxh_sy',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fyxh')
		             },
		             {
		             fieldLabel : '入库数量:',
		             itemId : 'fysl_sy',
		             name : 'fysl_sy',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fysl')
		             },
		             {
		             fieldLabel : '含税单价:',
		             itemId : 'fydj_sy',
		             name : 'fydj_sy',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkdj_yd
		             },
		             {
		             fieldLabel : '含税金额:',
		             itemId : 'fyje_sy',
		             name : 'fyje_sy',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fyje')/*,
		             listeners :{
		             change : function(value){
		                return Ext.util.Format.round(value,2) ;
		              }
		             }*/
		             },
		             {
		             fieldLabel : '并前记录2—序号:',
		             itemId : 'fyxh_cf',
		             name : 'fyxh_cf',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.recs2.get('fyxh')
		             },
		             {
		             fieldLabel : '入库数量:',
		             itemId : 'fysl_cf',
		             name : 'fysl_cf',
		             columnWidth:.25,
		             readOnly:true,
		             value :me.recs2.get('fysl')
		             },
		             {
		             fieldLabel : '含税单价:',
		             itemId : 'fydj_cf',
		             name : 'fydj_cf',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkdj_yd
		             },
		             {
		             fieldLabel : '含税金额:',
		             itemId : 'fyje_cf',
		             name : 'fyje_cf',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.recs2.get('fyje')/*,
		             listeners :{
		             change : function(value){
		                return Ext.util.Format.round(value,2) ;
		              }
		             }*/
		             },{
		             fieldLabel : '合并记录—序号:',
		             itemId : 'fyxh_yd',
		             name : 'fyxh_yd',
		             labelWidth : 150,
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkxh_yd
		             },
		             {
		             fieldLabel : '费用数量:',
		             itemId : 'fysl_yd',
		             name : 'fysl_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fysl')+me.recs2.get('fysl')
		             },
		             {
		             fieldLabel : '含税单价:',
		             itemId : 'fydj_yd',
		             name : 'fydj_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rkdj_yd
		             },
		             {
		             fieldLabel : '含税金额:',
		             itemId : 'fyje_yd',
		             name : 'fyje_yd',
		             columnWidth:.25,
		             readOnly:true,
		             value : me.rec.get('fyje')+me.recs2.get('fyje'),
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