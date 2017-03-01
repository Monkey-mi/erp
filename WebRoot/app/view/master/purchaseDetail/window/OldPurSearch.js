Ext.define('erp.view.master.purchaseDetail.window.OldPurSearch',{
	extend:'erp.ux.Window',
	alias:'widget.OldPurSearch',
	iconCls:'page_find',
	title:'历史采计筛选条件',
	modal:true,
	width:300,
	requires:[
		'erp.view.master.purchaseDetail.window.MateCombo',
		'erp.common.basic.view.field.HelpField',
		'erp.ux.CommonTrigger'
	],
	height:400,
	frame:true,
	resizable:false,
	initComponent : function() {
		var me=this;
		var curDate=new Date();
		curDate.setDate(1);
		var form=Ext.create('Ext.form.Panel',{
			xtype : 'fieldset',
			frame:true,
			layout:'column',
			defaults : {
				xtype : 'textfield',
				anchor:'95%',
				padding:5,
				columnWidth: 1,
				labelWidth:60
			},
			items:[{
				xtype:'combo',
				itemId:'rqlx',
				fieldLabel:'日期类型',
				store:[['签发日期','签发日期'],['采购日期','采购日期']],
				forceSelection:true,
				value:'签发日期',
        		columnWidth: 1
			},{
				xtype:'datefield',
			   	format:'Y.m.d',
			   	fieldLabel:'起始日期',
			   	itemId:'qsrq',
			   	value:curDate
			},{
				xtype:'datefield',
			   	format:'Y.m.d',
			   	fieldLabel:'截至日期',
			   	itemId:'jzrq',
			   	value:new Date()
			},{
			   	fieldLabel:'采计号',
			   	itemId:'cgh'
			},{
				fieldLabel:'生产单号',
			   	itemId:'hyhm'
			},{
				xtype:'helpField',
				code : erp.DataConst.PRODUCTION,
				fieldConfig:{forceSelection:true},
			   	fieldLabel:'产品名称',
			   	itemId:'cpbh'
			},{
				xtype:'commonTrigger',
				name:'clmc',
				itemId:'clmc',
				labelWidth : 60,
				selModel:'SINGLE',
				win:'erp.view.master.purchaseDetail.window.MateCombo',
				fieldLabel:'材料名称'
			},{
				name : 'cgym',
				itemId:'cgym',
				fieldLabel:'采购员名',
				labelWidth:60,
				columnWidth: 1,
				xtype:'helpField',
				code : erp.DataConst.PurGroupMan,
				fieldConfig:{forceSelection:false}
			}]
		});
		Ext.apply(me,{
			layout:'fit',
			items:[form],
			buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES',handler:function(){me.getCondition()}},{
				text:'关闭',
				iconCls:'cancel',
				handler:function(){
					me.close();
				}
			}]
		});
		this.callParent(arguments);
	},
	/*筛选按钮响应*/
	getCondition : function(btn) {
		var me = this;
		var rqlx=me.down('#rqlx').getValue();
		var qsrq=me.down('#qsrq').getValue();
		qsrq=Ext.Date.format(qsrq,'Y.m.d');
		var jzrq=me.down('#jzrq').getValue();
		jzrq=Ext.Date.format(jzrq,'Y.m.d');
		var cgh=me.down('#cgh').getValue();
		var hyhm=me.down('#hyhm').getValue();
		var cpmc=me.down('#cpbh').getValue();
		var clmc=me.down('#clmc').getValue();
		var cgy=me.down('#cgym').getValue();
		var strWhere =''
		me.mainPanel.params.gdbj=1;
		if(rqlx=='签发日期'){
			strWhere+=" and (isnull(cgjhmxb.qfsj,'')='' or (cgjhmxb.qfsj>='"+qsrq+"' and cgjhmxb.qfsj<='"+jzrq+"'))";
		}else{
			strWhere+=" and (isnull(cgjhmxb.cgrq,'')='' or (cgjhmxb.cgrq>='"+qsrq+"' and cgjhmxb.cgrq<='"+jzrq+"'))";
		}
		if(cgh!=null&&cgh!=''){
			strWhere+=" and ( upper(ltrim(rtrim(cgjhmxb.cgbh))+'-'+ltrim(rtrim(cgjhmxb.cgxh))) like '%"+cgh+"%' ) "
		}
		if(hyhm!=null&&hyhm!=''){
			strWhere+=" and ( upper(jhmxb.jhbz) like '%"+hyhm+"%' ) ";
		}
		if(clmc!=null&&clmc!=''){
			strWhere+=" and (cgjhmxb.clhh='"+clmc+"' or clbmb.clmc like '%"+clmc+"%' ) "
		}
		if(cpmc!=null&&cpmc!=''){
			strWhere+=" and (jhmxb.cpbh='"+cpmc+"' or cpbmb.cpmc like '%"+cpmc+"%' ) "
		}
		if(cgy!=null&&cgy!=''){
			strWhere+=" and (cgjhmxb.cgym='"+cgy+"' or cgyb.cgyxm  like '%"+cgy+"%' ) "
		}
		
		if(strWhere==''){
			delete 	me.mainPanel.params.oldsearch;
		}else{
			me.mainPanel.params.oldsearch=strWhere;
		}
		me.close();
		me.btn.setText('当前采计');
		me.mainPanel.setHistoreBtnStatus(true);
		me.mainPanel.down('#PurchaseDetailGrid').load(me.mainPanel.params);
	}
})