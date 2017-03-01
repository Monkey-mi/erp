Ext.define('erp.master.purchaseCost.view.EdtPurchaseCost',{
        extend: 'erp.ux.Panel',
        alias: 'widget.edt_PurchaseCost',
        requires:['erp.ux.SelectField',
                  'erp.ux.CommonTrigger',
                  'erp.master.purchaseCost.view.CompanyCombo',
                  'erp.view.master.purchaseDetail.store.MainUnit',
                  'erp.master.purchaseCost.store.SaleType',
                  'erp.master.prematerial.store.Companyname'],
        title: '采购费用单编辑',
        closable : true,
        modal:true,
       listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		 },
		beforeclose:function(panel){
			//编辑界面如果有父级菜单则设置设为enable
			if(panel.mainPanel!=null){
					panel.mainPanel.enable();
			}
		}/*,
		afterrender : function(cmp) {
			//编辑界面如果有父级菜单则设置设为disable
				if(cmp.mainPanel!=null){
					cmp.mainPanel.disable();
			}
		}*/
	    },
        initComponent: function(){
        	var me = this;
        	me.isinit=true;
        	me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
        	me.argColumns=erp.Util.getColumns(me.argStore.getModel());
        	me.csStore = Ext.create('erp.master.prematerial.store.Companyname');
        	me.csStore.load();
        	me.toBeDeleteFileArray=[];
        	//主体单位
        	me.MianUnitStore = Ext.create('erp.view.master.purchaseDetail.store.MainUnit'),
            me.MianUnitStore.load();
            me.fkStore = Ext.create('erp.master.purchaseCost.store.Payfs');
        	me.cgStore = Ext.create('erp.master.purchaseCost.store.PurchaseCost');
        	me.fyStore = Ext.create('erp.master.purchaseCost.store.purchaseCostSum');
        	me.fjStore = Ext.create('erp.master.purchaseCost.store.purchaseCostDetial');
            me.PayCategoryStore = Ext.create('erp.master.purchaseCost.store.PayCategory');
            me.PayCategoryStore.load();
            me.BenefitDeptStore = Ext.create('erp.master.purchaseCost.store.BenefitDept');
            me.BenefitDeptStore.load();
            me.WarehouseCpStore = Ext.create('erp.master.purchaseCost.store.WarehouseCp');
            me.WarehouseCpStore.load();
            me.saletypeStore = Ext.create('erp.master.purchaseCost.store.SaleType');
            me.saletypeStore.load();
		    Ext.apply(me,{
		   	   layout:{
				 type:'vbox',
				 align:'stretch'
			 },
		    tbar:[{text: '导入',iconCls:'',itemId : 'btn_lead',disabled:!me.candr,
		    menu: new Ext.menu.Menu({
		       itemId:'menu_Btnlead',
		       items : [
		       	     {text: '损耗导入',itemId:'btmn_shlead'},
		       	     {text: '任务导入',itemId:'btmn_rwlead'},
		       	     {text: '递送导入',itemId:'btmn_dslead'},
		       	     {text: '异常导入',itemId:'btmn_yclead'},
		       	     {text: '调入导入',itemId:'btmn_drlead'},
		       	     {text: '发货导入',itemId:'btmn_fhlead'},
		       	     {text: '材料委托导入',itemId:'btmn_clwtlead'},
		       	     {text: '产品委托导入',itemId:'btmn_cpwtlead'},
		       	     {text: '运输费用导入',itemId:'btmn_ysfylead'},
		       	     {text: '装柜费用导入',itemId:'btmn_zgfylead'},
		       	     {text: '专利费导入',itemId : 'btmn_zlfylead'}
		       	     ]
		  })},
		  	    {text:'保存',glyph:0xf0c7,itemId:'BTN_SAVE',disabled:!me.cansave },
		  	    {text: '分摊计算',iconCls: '',itemId : 'btn_ftjs'},
	    			{
		           xtype : 'tbtext',
		           text : ' <p style="font-size:12px; color:blue">说明： 采购类型 1,零星采购: 所产生费用在事业部年预算内。 2,正常采购: 所产生费用不在事业部年预算内。' +
		           		'结算方式 1,现款现结: 采购费用单审批完成后，自动生成付款申请单。 2,正常结算: 按正常付款流程走付款申请。</p>'
		          }],
		      items: [{
		          xtype : 'form',
		          itemId : 'fkForm',
		          height : 45,
		          bodyPadding: 5,
		          store : me.mainstore,
		          layout: 'column',
		          defaults: {
		            labelWidth:80,padding:5,xtype:'textfield',labelStyle : 'font-weight:bold'
		          },
		          items : [{
		                fieldLabel : '付款方式',
		                itemId : 'fkfs',
		                name : 'fkfs',
		                xtype : 'combo',
		                store : [['调账','调账'],['汇款','汇款'],['汇票','汇票'],['现金','现金'],['支票','支票'],['转账','转账'],['电汇','电汇']],
		                columnWidth:.23,
		                readOnly:!me.canedit
		          },{
		                fieldLabel : '主体单位',
		                name : 'ztbh',
		                itemId : 'ztbh',
		                forceSelection:true,
		                xtype : 'combo',
		                store : me.MianUnitStore,		                   
		                displayField:'ztmc',
						valueField:'ztbh',
		                columnWidth : .4,
		                readOnly:!me.canedit
		          },{
		           xtype : 'tbtext',
		           text : ' <p style="font-size:12px; color:blue">注: 此窗口用于现款现结情况指定‘付款方式’、‘主体单位</p>',
		           columnWidth:.37
		          }]
		          },{
		          xtype:'form',
		          itemId : 'fyForm',
		          height: 110,
		          bodyPadding: 5,
		          trackResetOnLoad:true,
		          layout: 'column',
		          defaults: {
		            labelWidth:80,xtype:'textfield',padding:5,labelStyle : 'font-weight:bold'
		          },
		            items:[{
		                 fieldLabel: '费用单号',
		                 itemId: 'fydh',
		                 name: 'fydh',
		                 columnWidth:.23,
		                 readOnly : true,
		                 fieldStyle:'background:#E6E6E6'
		                },{
		                 xtype:'combo',	
		                 fieldLabel: '分摊模式',
		                 itemId: 'ftms',
		                 name: 'ftms',
		                 store: [['明细模式','明细模式'],['分摊模式','分摊模式']],
		                 columnWidth:.24,
		                 isEdit: true,
		                 readOnly:!me.canedit
		                 },{
		                 xtype: 'datefield',	
		                 fieldLabel: '费用日期',
		                 itemId: 'fyrq',
		                 name: 'fyrq',
		                 columnWidth:.30,
		                 readOnly:!me.canedit
		                 },{
		                 fieldLabel: '费用类型',
		                 itemId: 'fylx',
		                 name: 'fylx',
		                 columnWidth:.23,
		                 readOnly : true,
		                 value:'采购',
		                 fieldStyle:'background:#E6E6E6',
		                 readOnly:!me.canedit
		                 },{
		                 fieldLabel: '核算部门',
				    	 itemId:'hsbm',
						 name : 'hsbm',
				         columnWidth: 0.4,
				         xtype : 'comboxTree',
				         allowBlank:false,
						 store : Ext.create('erp.view.master.perchasepriceadjust.store.AccountDeptTree'),
						 displayField : 'text',
					     valueField: 'nodeId'
		                 },{
		                  fieldLabel : '结算方式',
		                  itemId :'xkxj',
		                  name :'xkxj',
		                  xtype : 'combo',
		                  columnWidth :.3,
		                  store : [[0,'正常结算'],[1,'现款现结']],
		                  readOnly : !me.canedit
		               },{
		                 fieldLabel : '采购类型',
		                 itemId : 'cglx',
		                 name :'cglx',
		                 xtype : 'combo',
		                 columnWidth : .3,
		                 store : [[0,'正常采购'],[1,'零星采购']],
		                 readOnly : !me.canedit
		               },
		               	{fieldLabel : '操作员名',itemId : 'czym',name: 'czym',hidden: true},
		               	{xtype: 'datefield',fieldLabel : '操作时间',itemId : 'czym',name: 'czym',hidden: true},
		               	{fieldLabel : '税率',itemId : 'zzsl',name: 'zzsl',hidden: true},
		               	{fieldLabel : '用户编号',itemId : 'yhbh',name: 'yhbh',hidden: true}
		               ]
		          },{
		             xtype:'tabpanel',
		             flex:1,
		             items:[
					{
						xtype:'grid',
						itemId: 'grdPurchasecost',
						title:'采购费用',
						selModel:Ext.create('Ext.selection.CheckboxModel'),
						tbar:[{text:'增加',glyph:0xf055,itemId:'btn_purchasecostdetail_add',disabled:!me.isPlus},
							{text:'删除',glyph:0xf014,itemId:'btn_purchasecostdetail_del',disabled:!me.isDelete}
						],
						features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
					    columns:[
					    {header: '序号',dataIndex: 'fyxh',width:45,
					           sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }  
					    },
		                    {header: '费用摘要', dataIndex:'fyzy',width:280, editor:{maxLength:50}},
		                    {header: '数量',dataIndex:'fysl',width:70,/*xtype:'numbercolumn',*/
		                          summaryType: 'sum',
		                          editor : {},
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return value ;
					            }
		                    },
		                    {header: '箱数',dataIndex:'fyxs',width:50,/*xtype:'numbercolumn',*/
				              renderer:function(v){if(v==0){return ' '}else{return v}},
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000') ;
					            } },
		                    {header: '含税单价',dataIndex:'fydj',width:80,editor : new Ext.form.TextField({id:'fydj'})
		                    ,renderer:function(v){
		                       return Ext.util.Format.number(v,'0,000.000000') ;
		                    }},
		                    {header: '含税金额',dataIndex:'fyje',width:90,/*xtype:'numbercolumn',*/
		                          editor : new Ext.form.TextField({id:'fyje'}),
		                          summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }
		                    },
		                    {header: '税率',dataIndex:'zzsl',width:100,field:new Ext.form.TextField({
			   	  	  			id : 'zzsl',
			   	  	  			xtype:'numberfield',
			   	  	  			maxValue:1,
			   	  	  			decimalPrecision:2}),
			   	  	  		 renderer : Ext.util.Format.percentRenderer
			   	  	  		},
		                    {header: '除税单价',dataIndex:'csdj',width:80, editor : new Ext.form.TextField({id:'csdj'})},
		                    {header: '除税金额',dataIndex:'csje',width:90,/*xtype:'numbercolumn', */
		                        editor : new Ext.form.TextField({id:'csje'}),
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }  
		                    },
		                    {header: '计费重量',dataIndex : 'jfzl',width :80},
		                    {header: '付费方式',dataIndex : 'fffs',width : 80,
		                    renderer : function(v){if(v==1){ return '预付'}
		                    else if(v==3){return '第三付款'}
		                    else if(v==4){return '垫付'}
		                    else if(v==5){return '客户到付'}
			                }},
		                    {header: '税额',dataIndex:'zzse',width:70,
		                    summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
		                    renderer:function(value, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }  },
		                    {header: '外币单价',dataIndex:'wbdj',width:80, editor : new Ext.form.TextField({id:'wbdj'
		                    }),
				              renderer:function(v){if(v==0){return ' '}else{return Ext.util.Format.number(v,'0,000.000000')}}},
		                    {header: '币种',dataIndex:'wbdh',width:50},
		                    {header: 'wbbh',dataIndex:'wbbh',width:50,hidden : true},
		                    {header: '汇率',dataIndex:'wbhl',width:80,
				              renderer:function(v){if(v==0){return ' '}else{return v}}},	
		                    {header: '外币金额',dataIndex:'wbje',width:80,/*xtype:'numbercolumn',*/
				              renderer:function(v){if(v==0){return ' '}else{return v}},
		                       editor : new Ext.form.TextField({id:'wbje'}),
		                        summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }  
					            },
		                    {header: '支付类别',dataIndex:'zflb',width:180, 
		                     editor :{
				                 xtype:'commonTrigger',
					             name:'zflb',
					             itemId: 'zflb',
					             selModel:'SINGLE',
					             cusConfig:{
					                type:'grdPurchasecost',
					                field:'zflb',
					                indexNum:3,
					                callback : function(v,rec,recs){
										me.zflbCallback(v,rec,recs);
									}
					             },
					             win:'erp.master.purchaseCost.view.PayCategoryCombo'
					             },
		                         renderer: function(value){
		                           var rec = me.PayCategoryStore.findRecord('lbbh',value);
		                           return Ext.isEmpty(rec)?value:rec.get('lbmc');
		                         }
		                     },
		                    {header: '受益部门',dataIndex:'fsbm',width:240, 
		                        editor :{
				                 xtype:'commonTrigger',
					             name:'fsbm',
					             itemId: 'fsbm',
					             selModel:'SINGLE',
					             cusConfig:{
					                type:'grdPurchasecost',
					                field:'fsbm',
					                indexNum:3,
					                callback : function(v,rec,recs){
										me.fsbmCallback(v,rec,recs);
									}
					             },
					             win:'erp.master.purchaseCost.view.BenefitDeptCombo'
					             },
		                        renderer: function(value){
		                          var rec = me.BenefitDeptStore.findRecord('bmbh',value);
		                          return Ext.isEmpty(rec)?value:rec.get('bmmc');
		                        }
		                    },
		                    {header: '分摊系数',dataIndex:'ftxs',width:80, editor:{},
				              renderer:function(v){if(v==0){return ' '}else{return v}}},
		                    {header: '销售类别',dataIndex:'xslb',width:80,
		                    renderer: function(value){
		                          var rec = me.saletypeStore.findRecord('lbbh',value);
		                          return Ext.isEmpty(rec)?value:rec.get('lbmc');
		                        }},
		                    {header: '生产工序',dataIndex:'scgxmc',width:80},
		                    {header: '生产单号',dataIndex:'jhbz',width:80},
		                    {header: '入库号',dataIndex : 'rkh',width:80},
		                    {header: '计划号',dataIndex:'jhh',width:70, editor:{}}, 
		                    {header: '合同号',dataIndex:'hth',width:70, editor:{}},
		                    {header: '任务号',dataIndex:'wxh',width:70},
		                    {header: '异常号',dataIndex:'ych',width:70},
		                    {header: '发货仓库',dataIndex:'fhck',width:80,
		                     renderer: function(value){
		                           var rec = me.WarehouseCpStore.findRecord('ckbh',value);
		                           return Ext.isEmpty(rec)?value:rec.get('ckmc');
		                         }},
				            {header: '发货号',width: 80,dataIndex: 'fhh'},
				            {header: '调出仓库',width: 80,dataIndex: 'ckbh',
				             renderer: function(value){
		                           var rec = me.WarehouseCpStore.findRecord('ckbh',value);
		                           return Ext.isEmpty(rec)?value:rec.get('ckmc');
		                         }},
				            {header: '调出号',width: 70,dataIndex: 'dbh'},
				            {header: '调出日期',width: 100,dataIndex: 'dcrq',xtype:'datecolumn',format:'Y-m-d'},
				            {header: '材料委托号',width: 80,dataIndex: 'clwth'},
				            {header: '产品委托号',width: 80,dataIndex: 'cpwth'},
				            {header: '手工通知号',width: 80,dataIndex: 'sgtzh'},
				            {header: '运输记录号',width: 80,dataIndex: 'ysjlh'},
				            {header: '转运人',width: 70,dataIndex: 'zyrm'},
				            {header: '出货编号',width:80,dataIndex: 'cybh'},
				            {header: '厂商编号',width:70,dataIndex:'csbh',hidden: true},
				            {header: '厂商名称',width:200 ,dataIndex : 'csmc',itemId : 'csmc',
				            	name : 'csmc',
				            editor :{
				            	xtype : 'helpField',
				            	code : erp.DataConst.FACTORYINFO,
				            	winOpen:true,
					            fieldConfig:{forceSelection:false},
					            listeners:{
					               change : function(o,  newValue,  oldValue,  eOpts){
					               	   if(o.displayTplData!=null){
					               	   var data = o.displayTplData;
				                       if(data.length>0){
				                       var rec=data[0];
				                       var grid = me.down('#grdPurchasecost');
                                       var srec = grid.getSelectionModel().getSelection()[0];
                                       var store = grid.getStore();
                                       var csbh;
                                       var sql = "select top 1 csbh from csxxb where csmc = '"+rec.csmc+"' and  gdbj = 0";
					        		   var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						                       {sql : sql});
		                               var data = Ext.decode(result);
		                                       if(data.val!=null){
			                                    csbh = data.val;
			                           }	 
                                       store.each(function(record){
                                       	    if(Ext.String.trim(rec.wbbh)!='' && Ext.String.trim(rec.wbbh)!='60'){
                                       	    record.set('zzsl',0);  
                                       	    }
			                                record.set('csbh',csbh);
        	                                record.set('csmc',rec.csmc);
        	                                record.set('wbdh',rec.wbdh);
        	                                record.set('wbbh',rec.wbbh);
        	                                record.set('wbhl',rec.wbhl);
        	                               })
				                       }
					              }
					            }}
				            }},
				            {header: '记录编号',width:100 ,dataIndex: 'jlbh',
				              renderer:function(v){if(v==0){return ' '}else{return v}}},
				            {header: '备注说明',width:280 ,dataIndex: 'bzsm', editor:{}}]
				            ,store: me.cgStore,
				            plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        editable : !me.canedit,
							        autoCancel: false,
							        ptype :'cellEditing',
							        listeners:{
							        	beforeedit:this.onBeforCellEdit,
							            'edit' :function(editor, e){
							                var field=e.field;
					        		        var rec=e.record;
					        		        var selrec = e.grid.getSelectionModel().getSelection();
					        		        /*var selrec = grid.getSelectionModel().getSelection();*/
					        		        var s_fysl,s_fydj,s_zzsl,s_csje,s_zzse,s_csdj,s_fyje,wbdj,wbje,s_wbhl;
					        		        if(e.originalValue==e.value){
					        			      return ;
					        		        }
					        		        switch(field){
					        		           case 'csmc' :
					        		             csmc = rec.get('csmc');
					        		             csbh = rec.get('csbh');
					        		             if(csmc==csbh && !Ext.isEmpty(csmc) && !Ext.isEmpty(csbh)){
					        		               var sql = "select csmc from csxxb where csbh = "+csbh+"";
					        		               var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
						                               {sql : sql});
		                                           var data = Ext.decode(result);
		                                           if(data.val!=null){
			                                        csmc = data.val;
			                                        rec.set('csmc',csmc)
			                                        }	 
					        		             }
					        		           break;
					        		           case 'fysl' :
					        		            if(e.value=='-'){
					        		             rec.set('fysl',-1)
					        		            }
					        		            s_fysl = rec.get('fysl');
					        		            s_fydj = rec.get('fydj');
					        		            s_zzsl = rec.get('zzsl');
					        		            s_wbdj = rec.get('wbdj');
					        		            s_fyje = Ext.util.Format.round(s_fysl*s_fydj,2);
					        		            s_csje = Ext.util.Format.round(s_fyje/(1+s_zzsl),2);
					        		            s_zzse = s_fyje-s_csje;
					        		            s_wbje = Ext.util.Format.round(s_wbdj*s_fysl,2);
					        		            rec.set('fyje',s_fyje);
					        		            rec.set('csje',s_csje);
					        		            rec.set('zzse',s_zzse);
					        		            rec.set('wbje',s_wbje);
 					        		            break;
					        		           case 'fydj' : 
					        		            s_fysl = rec.get('fysl');
					        		            s_fydj = rec.get('fydj');
					        		            s_zzsl = rec.get('zzsl');
					        		            s_fyje = Ext.util.Format.round(s_fysl*s_fydj,2);
					        		            s_csje = Ext.util.Format.round(s_fyje/(1+s_zzsl),2);
					        		            if(s_fysl!=0){
					        		            s_csdj = Ext.util.Format.round(s_csje/s_fysl,6);
					        		            }else{
					        		            s_csdj = 0
					        		            }
					        		            s_zzse = s_fyje-s_csje;
					        		            rec.set('fyje',s_fyje);
					        		            rec.set('csdj',s_csdj);
					        		            rec.set('csje',s_csje);
					        		            rec.set('zzse',s_zzse);
					        		            break;
					        		            case 'fyje' :
					        		            s_fyje = rec.get('fyje');
					        		            s_fysl = rec.get('fysl');
					        		            s_zzsl = rec.get('zzsl');
					        		            s_csje = Ext.util.Format.round(s_fyje/(1+s_zzsl),2);
					        		            if(s_fysl!=0){
					        		            s_fydj = Ext.util.Format.round(s_fyje/s_fysl,6);
					        		            s_csdj = Ext.util.Format.round(s_csje/s_fysl,6);
					        		            }else{
					        		            s_fydj = 0;
					        		            s_csdj = 0;
					        		            }
					        		            s_zzse = s_fyje-s_csje;
					        		            rec.set('fydj',s_fydj);
					        		            rec.set('csdj',s_csdj);
					        		            rec.set('csje',s_csje);
					        		            rec.set('zzse',s_zzse);
					        		            break;
					        		            case 'zzsl' : 
					        		            s_zzsl = rec.get('zzsl');
					        		            s_fysl = rec.get('fysl');
					        		            s_fydj = rec.get('fydj');
					        		            s_fyje = rec.get('fyje');
					        		            s_csje = Ext.util.Format.round(s_fyje/(1+s_zzsl),2);
					        		            if(s_fysl!=0){
					        		            s_csdj = Ext.util.Format.round(s_csje/s_fysl,6);
					        		            }else{
					        		            s_csdj = 0; 
					        		            }
					        		            s_zzse = s_fyje-s_csje;
					        		            rec.set('csje',s_csje);
					        		            rec.set('csdj',s_csdj);
					        		            rec.set('zzse',s_zzse);
					        		            break;
					        		            case 'csdj' : 
					        		            s_csdj = rec.get('csdj');
					        		            s_fysl = rec.get('fysl');
					        		            s_zzsl = rec.get('zzsl');
					        		            if(s_fysl!=0){
					        		            s_csje = Ext.util.Format.round(s_csdj*s_fysl,2);
					        		            s_fyje = Ext.util.Format.round(s_csje*(1+s_zzsl),2)
					        		            s_fydj=Ext.util.Format.round(s_fyje/s_fysl,6);
					        		            }else{	
					        		            s_fydj=Ext.util.Format.round(s_csdj*(1+s_zzsl),6);
					        		            s_csje = 0;
					        		            s_fyje = 0;
					        		               }
					        		            rec.set('fydj',s_fydj);
					        		            rec.set('fyje',s_fyje);
					        		            s_zzse = s_fyje-s_csje;
					        		            rec.set('csje',s_csje);
					        		            rec.set('zzse',s_zzse);
					        		            break;
					        		            case 'csje' :
					        		            s_csje = rec.get('csje');
					        		            s_fysl = rec.get('fysl');
					        		            s_zzsl = rec.get('zzsl');
					        		            if(s_fyje == 0){
					        		              s_fyje=Ext.util.Format.round(s_csje*(1+s_zzsl),2);
					        		              if(s_fysl!=0){
					        		                s_fydj = Ext.util.Format.round(s_fyje/s_fysl,6);
					        		              }else{
					        		                s_fydj = 0;
					        		              }
					        		              rec.set('fyje',s_fyje);
					        		              rec.set('fydj',s_fydj);
					        		            }
					        		            if(s_fysl!=0){
					        		               s_csdj = Ext.util.Format.round(s_csje/s_fysl,6);
					        		            }else{
					        		               s_csdj = 0;
					        		            }
					        		            s_zzse = s_fyje-s_csje;
					        		            rec.set('csdj',s_csdj);
					        		            rec.set('zzse',s_zzse);
					        		            break;
					        		            case 'wbdj' : 
					        		            s_wbdj = rec.get('wbdj');
					        		            s_fysl = rec.get('fysl');
					        		            s_wbhl =  rec.get('wbhl');
					        		            s_zzsl = rec.get('zzsl');
					        		            s_fysl = rec.get('fysl');
					        		            s_wbje = Ext.util.Format.round(s_wbdj*s_fysl,2);
					        		            s_fyje = Ext.util.Format.round(s_wbje*s_wbhl,2);
					        		            s_csje = Ext.util.Format.round(s_fyje/(1+s_zzsl),2);
					        		            if(s_fysl!=0){
					        		              s_fydj = Ext.util.Format.round(s_fyje/s_fysl,2);
					        		              s_csdj = Ext.util.Format.round(s_csje/s_fysl,6);
					        		            }else{
					        		              s_fydj = 0;
					        		              s_csdj = 0;
					        		            }
					        		            s_zzse = s_fyje-s_csje;
					        		            rec.set('wbje',s_wbje);
					        		            rec.set('fyje',s_fyje);
					        		            rec.set('fydj',s_fydj);
					        		            rec.set('csje',s_csje);
					        		            rec.set('csdj',s_csdj);
					        		            rec.set('zzse',s_zzse);
					        		            break;
					        		            case 'wbje' : 
					        		            s_wbje = rec.get('wbje');
					        		            s_wbhl =  rec.get('wbhl');
					        		            s_fysl = rec.get('fysl');
					        		            s_zzsl = rec.get('zzsl');
					        		            s_fyje = Ext.util.Format.round(s_wbje*s_wbhl,2);
					        		            s_csje = Ext.util.Format.round(s_fyje/(1+s_zzsl),2);
					        		            if(s_fysl!=0){
					        		              s_wbdj = Ext.util.Format.round(s_wbje/s_fysl,6);	
					        		              s_fydj = Ext.util.Format.round(s_fyje/s_fysl,2);
					        		              s_csdj = Ext.util.Format.round(s_csje/s_fysl,6);
					        		            }else{
					        		              s_wbdj = 0;	
					        		              s_fydj = 0;
					        		              s_csdj = 0;
					        		            }
					        		            s_zzse = s_fyje-s_csje;
					        		            rec.set('fyje',s_fyje);
					        		            rec.set('csje',s_csje);
					        		            rec.set('wbdj',s_wbdj);
					        		            rec.set('fydj',s_fydj);
					        		            rec.set('csdj',s_csdj);
					        		            rec.set('zzse',s_zzse);
					        		            break;
					        		            case 'wbhl':
					        		            s_wbhl =  rec.get('wbhl');
					        		            s_zzsl = rec.get('zzsl');
					        		            s_fysl = rec.get('fysl');
					        		            s_wbje = rec.get('wbje');
					        		            s_fyje = Ext.util.Format.round(s_wbje*s_wbhl,2);
					        		            s_csje = Ext.util.Format.round(s_fyje/(1+s_zzsl),2);
					        		            if(s_fysl!=0){
					        		              s_fydj = Ext.util.Format.round(s_fyje/s_fysl,2);
					        		              s_csdj = Ext.util.Format.round(s_csje/s_fysl,6);
					        		            }else{
					        		              s_fydj = 0;
					        		              s_csdj = 0;
					        		            }
					        		            s_zzse = s_fyje-s_csje;
					        		            rec.set('fyje',s_fyje);
					        		            rec.set('csje',s_csje);
					        		            rec.set('fydj',s_fydj);
					        		            rec.set('csdj',s_csdj);
					        		            rec.set('zzse',s_zzse);
					        		            break;
					        		            case 'bzsm':
					        		            Ext.each(selrec,function(srec){
					        		               srec.set('bzsm',rec.get('bzsm'))
					        		            });
					        		            break;
					        		        }
							            }
							        }
				        })
					},{
					    xtype:'grid',
						itemId:'grd_CostSum',
						title:'费用汇总',
						tbar:[{text:'增加',glyph:0xf055,itemId:'btn_CostSum_add',disabled:!me.isPlus},
							{text:'删除',glyph:0xf014,itemId:'btn_CostSum_del',disabled:!me.isDelete}
						],
							features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
						 columns: [
		                 {header:'序号',dataIndex:'xmxh',flex: 1,
		                       sumaryType: 'count',
					           summaryRenderer: function(value, summaryData, dataIndex) {
					                 return '合计';
					            }  },
		                 {header: '费用项目',dataIndex:'fyxm',flex:6,editor:{}},
		                 {header: '费用金额',dataIndex:'fyje',flex:3,editor:{},
		                          summaryType: 'sum',
		                          summaryRenderer: function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            },
					              renderer:function(value, summaryData, dataIndex) {
					              	 return Ext.util.Format.number(value,'0,000.00') ;
					            }  
		                 }
		                 ],
		            store: me.fyStore,
		            plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        autoCancel: false,
							        itemId:'cellEditing'
				        })/*,
					listeners: {
							selectionchange: function(grid, rec) {
								if (rec.length>0){
									me.down('#btn_CostSum_del').setDisabled(false);
								 }else{
								 	me.down('#btn_CostSum_del').setDisabled(true);
								 }
							}
						}*/
					},{
					 xtype:'grid',
					 itemId:'grd_AffixDetial',
					 title:'附件明细',
						tbar:[{iconCls:'add',tooltip:'上传',itemId:'btn_AffixDetial_upload',disabled:!me.isPlus}/*,
							{iconCls:'download',tooltip:'下载',itemId:'btn_AffixDetial_download',disabled:!me.isDelete},
							{iconCls:'delete',tooltip:'删除',itemId:'btn_AffixDetial_del',disabled:!me.isDelete}*/
						],
						 columns:[
		         	   {header: '文件编号',dataIndex:'wjbh',felx:2},
		         	   {header: '文件路径',dataIndex:'wjlj',felx:9},
		         	   {header: '文件名称',dataIndex:'wjmc',felx:4},
		         	   {header: '创建人名',dataIndex:'cjrm',felx:1},
		         	   {header: '创建日期',dataIndex:'wjrq',felx:1,xtype:'datecolumn',format:'Y-m-d'},
                        {header: '操作',xtype:'actioncolumn',flex:1,
		         	       items:[
		         	       {iconCls:'download',tooltip:'下载',itemId:'btn_QuotFile_download',disabled:!me.isDelete,
		         	       handler: function(grid,rowIndex,colIndex){
		         	       	var rec = grid.getStore().getAt(rowIndex);
		         	       	if(Ext.isEmpty(rec.get('wjlj')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');
								return;
							}
							file_path=rec.get('wjlj');
							window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
		         	       }
		         	       },
		         	       { iconCls:'delete',tooltip:'删除',itemId:'btn_QuotFilel_del',disabled:!me.isDelete,align:'right',
						 handler:function(grid,rowIndex,colIndex){
						 	 var rec = grid.getStore().getAt(rowIndex);
						 	 var fydh = rec.get('fydh');
						     if(Ext.isEmpty(rec.get('wjlj'))){
						         Ext.Msg.alert('提示','文件尚未上传，无法删除');
								 return;
						     }
						  Ext.Msg.confirm("提示","是否确认删除上传的附件?",function(btn){
							if(btn=="yes"){
							    me.toBeDeleteFileArray.push(rec.get('wjlj'));
							      Ext.Ajax.request({
					             //将生成的xml发送到服务器端,需特别注意这个页面的地址
					              url: 'common/deleteAttachement.action',
					              async:false,
					              timeout: 600000,
					              method: 'POST',
					              success: function(response, opts)  {
					                    	rec.set('dytp','');
					                    	Ext.Msg.alert('提示', '删除成功！');
					              },
					              disableCaching:true,
					              isUpload: true,
					              params: {urlId:rec.get('wjlj')}
					              });
					             me.fjStore.remove(rec);
		                         me.fjStore.sync({
		                         success : function(){
		                         me.fjStore.reload({
	  	                                        params : 
	  	                                       {
	  	                                      fydh : fydh
	  	                                    }
	  	                                 })
	  	                             }
		                         })       
							 }
						   }) 
						 }
						 }
					 ]}		         	   
	         	   ], 
		         	   store: me.fjStore,
		         	 
		         	   plugins:Ext.create('Ext.grid.plugin.CellEditing', {
							        clicksToEdit : 1,
							        autoCancel: false,
							        itemId:'cellEditing'
				        })/*,
				        listeners: {
							selectionchange: function(grid, rec) {
								if (rec.length>0){
									me.down('#btn_AffixDetial_del').setDisabled(false);
								 }else{
								 	me.down('#btn_AffixDetial_del').setDisabled(true);
								 }
							}
						}*/
					}]
		       }]
		   })
		   me.callParent(arguments); 
		},
     
     zflbCallback : function(view,rec,recs){
        var me = this;
        var grid = me.down('#grdPurchasecost');
        var srec = grid.getSelectionModel().getSelection();
        var store = grid.getStore();
        for(x in srec){
        srec[x].set('zflb',rec.get('nodeId'));
        }
     },		
     fsbmCallback : function(view,rec,recs){
        var me = this;
        var grid = me.down('#grdPurchasecost');
        var srec = grid.getSelectionModel().getSelection();
        var store = grid.getStore();
        for(x in srec){
        srec[x].set('fsbm',rec.get('nodeId'));
        }
     },	
     onBeforCellEdit:function(ed,e,eOpts){
         var ret=true;
		 var rec = e.record;
		 var zldh = e.record.get('zlrkdh');
		 var kjbj = e.record.get('kjbj');
		 var ycdh = e.record.get('ycdh');
		 switch(e.field){
		    case 'fysl' : 
		     if(zldh!=''||kjbj==1||ycdh!=''){
		     	ret =false;
		     }
		      break;
		     case 'fydj' : 
		     if(zldh!=''||kjbj==1||ycdh!=''){
		     	ret =false;
		     }
		      break;
		     case  'fyje' :
		      if(zldh!=''||kjbj==1||ycdh!=''){
		     	ret =false;
		     }
		      break;
		     case  'zzsl' :
		      if(kjbj==1||ycdh!=''){
		     	ret =false;
		     }
		      break;
		     case  'csdj' :
		      if(zldh!=''||kjbj==1||ycdh!=''){
		     	ret =false;
		     }
		      break;
		     case  'csje' :
		      if(zldh!=''||kjbj==1||ycdh!=''){
		     	ret =false;
		     }
		      break;
		     case  'wbdj' :
		      if(zldh!=''||ycdh!=''){
		     	ret =false;
		     }
		      break;
		     case  'wbje' :
		      if(zldh!=''||ycdh!=''){
		     	ret =false;
		     }
		      break;
		 }
		 return ret;
     },
     loadData : function(rec,isEdit){
		var me=this;
		var form=me.down('#fyForm');
		me.loadHsbmStore(rec.get('hsbm'));
		form.loadRecord(rec);
		var fkform=me.down('#fkForm');
		fkform.loadRecord(rec);
		if(isEdit){
		   me.cgStore.load({params:{
		       fydh: rec.get('fydh')
		}});
		   me.fyStore.load({params:{
		       fydh: rec.get('fydh')
		}});
		   me.fjStore.load({params:{
		       fydh: rec.get('fydh')
		}});
		}
	},	
	loadHsbmStore :function(node){
		var me=this;
		if(node!=null && node!="" && node!=0){//加载树
			var picker=me.down('#hsbm').getPicker();
//			var path="/0";
//			for(var i=0;i<node.length/2-1;i++){
//				path+="/"+node.substring(i*2,(i+1)*2);
//			}
//			picker.expandPath(path);
			picker.expandAll();//展开所有，加载所有
		}
	}
 })