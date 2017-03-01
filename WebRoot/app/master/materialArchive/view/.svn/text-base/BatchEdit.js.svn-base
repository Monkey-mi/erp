Ext.define('erp.master.materialArchive.view.BatchEdit',{
    extend : 'erp.ux.Window',
    alias : 'widget.batchedt_Material',
    requires:['erp.ux.FormKey','erp.view.master.caterialPrice.store.CaterialPriceArgument',
    'erp.master.materialArchive.store.Rule'],
	title: '批量修改',
	modal: true,
	width: 300,
    height:530,
    initComponent: function(){
        var me = this;
        me.argStore=Ext.create('erp.view.master.caterialPrice.store.CaterialPriceArgument');
	    me.argColumns=erp.Util.getColumns(me.argStore.getModel());
	    me.ruleStore = Ext.create('erp.master.materialArchive.store.Rule');
	    me.ruleStore.load();
	    me.ruleColumns = erp.Util.getColumns(me.ruleStore.getModel());
	    me.groupStore = Ext.create('erp.master.group.store.Group');
	    me.groupStore.load();
	    me.groupColumns = erp.Util.getColumns(me.groupStore.getModel());
	    Ext.apply(me,{
           layout:{
               type : 'vbox',
               align : 'stretch'
           },
          defaults:{padding:5},	
          items : [{
             itemId : 'BthForm',
             xtype : 'form',
            /* store : me.mainstore,*/
		    plugins:{
				ptype: 'FormKey'
		    },
		   layout:'column',
			defaults: {
				anchor: '95%',
				labelWidth: 80,
				xtype: 'textfield',
				margin:'5 5 5 5',
				columnwidth : 1
			},
			items  : [
			{
			   fieldLabel : '转换公式',
			   itemId : 'zhgs',
			   name : 'zhgs',
			   xtype:'selectfield',
				openconfig:{
					modal:true,
					title:'参数选取',
					singleSelect:true,
					editable:true,
					diaplayField:'csbh',
					valueField:'csbh',
					insert:true,
					width:500,
					height:600,
					columns:me.argColumns,
					store:me.argStore
				}
			},
			{
			   fieldLabel : '特性规则',
			   itemId : 'txgz',
			   name : 'txgz',
			   xtype:'selectfield',
			   openconfig:{
					modal:true,
					title:'参数选取',
					singleSelect:true,
					editable:true,
					diaplayField:'gzbh',
					valueField:'gzbh',
					insert:true,
					width:500,
					height:600,
					columns:me.ruleColumns,
					store:me.ruleStore
				}
			},
			{
			   fieldLabel : '合同标记',
			   itemId : 'cgbj',
			   name : 'cgbj',
			   xtype : 'combo',
			   store : [[0,'否'],[1,'是']]
			},
			{
			   fieldLabel : '安全量',
			   itemId : 'aqlbj',
			   name : 'aqlbj',
			   xtype : 'combo',
			   store : [[1,'是'],[0,'否']]
			},
			{
			   fieldLabel : '最低采购量',
			   xtype : 'numberfield', 
			   itemId : 'zdcgl',
			   name : 'zdcgl'
			},
			{
			   fieldLabel : '最小包装量',
			   xtype : 'numberfield', 
			   itemId : 'zxbzl',
			   name : 'zxbzl'
			},
			{
			   fieldLabel : '供货周期',
			   xtype : 'numberfield', 
			   itemId : 'ghzq',
			   name : 'ghzq'
			},
			{
			   fieldLabel : '采购提前期',
			   xtype : 'numberfield', 
			   itemId : 'cgtqq',
			   name : 'cgtqq'
			},
			{
			   fieldLabel : '采购组',
			   itemId : 'cgzh',
			   name : 'cgzh',
			   xtype:'selectfield',
			   openconfig:{
					modal:true,
					title:'参数选取',
					singleSelect:true,
					editable:true,
					diaplayField:'cgzh',
					valueField:'cgzh',
					insert:true,
					width:500,
					height:600,
					columns:me.groupColumns,
					store:me.groupStore
				},
				renender : function(value){	
                   var rec =  me.groupStore.findRecord('cgzh',value,0,false,false,true);
				   return Ext.isEmpty(rec)?value:rec.get('cgzm');
			   	}
			},
			{
			   fieldLabel : '采购员',
			   itemId : 'cgym',
			   name : 'cgym',
			   xtype:'helpField',
			   code : erp.DataConst.PurGroupMan,
			   fieldConfig:{forceSelection:false},
						listeners:{
						   	'select':function(obj,recs){
						   	}
				}		   	
			},
			{
			   fieldLabel : '应用公式',
			   itemId : 'gsbh',
			   name : 'gsbh',
			   xtype:'selectfield',
			   openconfig:{
					modal:true,
					title:'参数选取',
					singleSelect:true,
					editable:true,
					diaplayField:'csbh',
					valueField:'csbh',
					insert:true,
					width:500,
					height:600,
					columns:me.argColumns,
					store:me.argStore
				}
			},
			{
			   fieldLabel : '圆整位数',
			   xtype : 'numberfield', 
			   itemId : 'yzws',
			   name : 'yzws'
			},
			{
			   fieldLabel : '单价圆整',
			   xtype : 'numberfield', 
			   itemId : 'djyz',
			   name : 'djyz'
			}],
			buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						/*form.updateRecord(rec);*/
       	  			}
			},
			'->',{text:'保存',iconCls:'page_save',action:'BTN_SAVE'},
			{text:'取消',iconCls:'page_error',handler:function(){
					me.close();
			}}]
          }]
       })
         me.callParent(arguments);
        /* 
         me.down('form').getForm().loadRecord(me.rec);*/
    },
        getData: function(){
           var me = this;
           var form = me.down('#BthForm');
           return form.getValues();
        }
})