Ext.define('erp.payApply.view.EmployeeSalaryChoose',{
      extend: 'erp.ux.Window',
      alias: 'widget.EmployeeSalaryChoose',
      requires: ['erp.payApply.store.EmployeeSalary',
                 'erp.payApply.view.EmployeeSalaryImp',
                 'erp.ux.FormKey',
                 'erp.payApply.model.EmployeeSalaryChoose'],
      title : '年月选择',
      width:  320,
      height: 200,
      iconCls:'page_go',
      modal:true,
       initComponent : function(){
       	  var me=this;
       	  me.rec=Ext.create('erp.payApply.model.EmployeeSalaryChoose');
          var myDate = new Date();
		  var year = myDate.getYear()+1900;
		  var month = myDate.getMonth()+1;
          Ext.apply(me,{
              layout: {
              	type: 'fit',
              	 pack: 'start',
		         align: 'stretch'
              },
              defaults:{padding:5},
              items:[
                {
                	itemId: 'EmployeeSalaryChoose',
                	xtype: 'form',
                	plugins:{
				      ptype: 'FormKey'
				    },
				    store: me.store,
			  layout:{
			     type: 'column',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	  defaults: {
				 anchor: '95%',
				 labelWidth: 72,
				 margin:'5 5 5 5',
				 columnWidth: 1
			},
			items: [
			      {
			      	fieldLabel: '操作年月',
			      	xtype:'numberfield',
			      	itemId: 'year',
			      	name: 'year',
			        year: year,
			      	value: year,
			      	columnWidth: .65
			      },
			      {
			      	fieldLabel:'—',
			      	xtype:'numberfield',
			      	labelSeparator: '',
			      	labelWidth:15,
			      	itemId: 'month',
			        name: 'month',
			      	month: month,
			      	value: month,
			      	minValue: '1',
			      	maxValue: '12',
			      	columnWidth: .35
			      },{
			        fieldLabel: '工资模式',
				    itemId:'msbh',
					name : 'msbh',
				    columnWidth: 1,
				    xtype : 'combo',
				    store : [['001', '管理模式'], ['002', '工人模式']]
			      },{
			        fieldLabel: '工资项目',
				    itemId:'gzxm',
					name : 'gzxm',
				    columnWidth: 1,
				    xtype : 'combo',
				    store : [['lm46', '实发工资']]
			      }],
			      buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'确认',glyph:0xf058,itemId:'btn_confirm',
			    handler:me.doEmployeeSalary
			},
			{text:'关闭',glyph:0xf057,handler:function(){me.close();}}
			]
                }]
          });
          this.callParent(arguments);
		  me.down('form').loadRecord(me.rec);
       },
       doEmployeeSalary : function(){
		  
		   var form = me.down('form');
		   var rec=form.getRecord();
		   form.updateRecord(rec);
		   var year = rec.get('year');
		   var month = rec.get('month');
		   var msbh = rec.get('msbh');
		   var gzxm = rec.get('gzxm');
		   var czyh = erp.UInfo.currentUser.u_id;
           var store = Ext.create('erp.payApply.store.EmployeeSalary');
		   me.close();
		  
           var panel = erp.Util.addContentTab({
                 xtype:'Imp_EmployeeSalary',
                 itemId : 'EmployeeSalaryImp',
                 title: '职工工资导入',
                 store:store.load({
                    params :{
                    	year : year,
                    	month : month,
                    	czyh : czyh,
                        msbh : msbh,
                        gzxm : gzxm,
                    	usePaging:true
                    }
                 }),
                 year:year,
                 month:month,
                 czyh : czyh,
                 msbh : msbh,
                 gzxm : gzxm,
                 closable : true
         });
     
    }
});