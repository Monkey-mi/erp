/*准入评估表的表头基本信息页面（共有信息）*/
Ext.define('erp.supplierManager.view.accessToEvaluate.EvaluateBaseInfo',{
	extend:'erp.ux.Panel',
	alias:'widget.access_EvaluateBaseInfo',
	initComponent:function(){
		var me=this;
		me.SupLoopStore=Ext.create('erp.supplierManager.store.AppSupplierAccessLoop');
		me.SupLoopStore.proxy.extraParams.company_id=me.supplierRec.get('company_id');
		me.SupLoopStore.proxy.extraParams.assess_sts=1;
		Ext.apply(me,{
			listeners:{
				afterrender:function(p){
						me.SupLoopStore.load({
							scope: me,
							callback:function(recs){
								if(recs.length>0){
									p.SupLoopStore.sort('assess_dt','DESC');
									var r=p.SupLoopStore.getAt(0)
									p.down('#assess_dt').setValue(r.get('displayField'));
									me.refreshInfo(r.get('loop_id'));
								}
							}
						});
				}
			},
			defaults:{padding:'4 4 0 4'},
			items:[{
				xtype:'form',
				layout:{type:'hbox',align:'stretch'},
				defaults:{xtype:'container',padding:'0 0 0 0'},
				items:[{
				//供应商信息
					flex:3,
					xtype:'fieldset',
					title:'<span style="color:#008cd6">供应商信息</span>',
					collapsible: true,
					padding:4,
					items:[{
						defaults:{xtype:'textfield',
							readOnly:!me.isEdit,
				 			labelWidth : 100,
							labelStyle : 'font-weight:nomal;text-align:left;color:#000',
							padding:'1 0 1 8',
							msgTarget : 'side',
							autoFitErrors : true},
						layout:'column',
						itemId:'panelSupplierInfo',
						xtype:'form',
						items:[{
    						fieldLabel:'供应商',
    						name:'cpyname_cn',
							itemId:'cpyname_cn',
							readOnly:true,
    						columnWidth:1/3
    						}
    						,{
    						fieldLabel:'产品',
    						columnWidth:1/3
    						},{
    						fieldLabel:'经营许可有效期',
    						columnWidth:1/3
    						},{
    						fieldLabel:'联系人',
    						itemId:'contacts',
							name:'contacts',
							readOnly:true,
    						columnWidth:1/3
    						},{
    						fieldLabel:'电话',
    						itemId:'m_phone',
							name:'m_phone',
							readOnly:true,
    						columnWidth:1/3
    						},{
    						fieldLabel:'电子邮件',
    						itemId:'email',
							name:'email',
							readOnly:true,
    						columnWidth:1/3
    						},{
    						fieldLabel:'工厂所有者',
    						columnWidth:1/3
    						},
    						{
    						fieldLabel:'工厂人数',
    						columnWidth:1/3
    						},{
    						fieldLabel:'总销售额',
    						columnWidth:1/3
    						},{
    						fieldLabel:'地址',
    						itemId:'contact_addr',
							name:'contact_addr',
							readOnly:true,
    						columnWidth:2/3
    						}]
					}]
				},{
				//审核信息
					flex:2,
					xtype:'fieldset',
					//padding:4,
					title:'<span style="color:#008cd6">审核信息</span>',
					collapsible: true,
					items:[{
						defaults:{xtype:'textfield',
				 			labelWidth : 100,
							labelStyle : 'font-weight:nomal;text-align:left;color:#000',
							padding:'4 0 4 8',
							msgTarget : 'side',
							readOnly:true,
							autoFitErrors : true},
					layout:'column',
					itemId:'plEvaluateExamineInfo',
					xtype:'form',
					items:[{
    				fieldLabel:'供评估日期',
    				readOnly:false,
    				columnWidth:0.5,
    				itemId:'assess_dt',
    				name:'assess_dt',
    				xtype:'combo',
    				store:me.SupLoopStore,
					queryMode : 'local',
					displayField:'displayField',
					valueField:'displayField',
					forceSelection:false,
					editable:false,
					listeners:{
						select:function(c,r){
							me.refreshInfo(r.get('loop_id'));
						}
					}
    			},{
    				fieldLabel:'总分',
    				columnWidth:0.5,
    				readOnly:true,
    				itemId:'max'
    			},{
    				fieldLabel:'主任审核员',
    				columnWidth:0.5,
    				itemId:'head_audit',
    				name:'head_audit'
    			},{
    				fieldLabel:'关键区域分数',
    				columnWidth:0.5,
    				readOnly:true,
    				itemId:'keyReal'
    			},{
    				fieldLabel:'评估总得分',
    				readOnly:true,
    				columnWidth:0.5,
    				itemId:'real'
    			},{
    				fieldLabel:'评估等级',
    				columnWidth:0.5,
    				readOnly:true,
    				itemId:'rank'
    			}]
				}]
				}]}]
				
			
		});
	me.callParent(arguments);
	},
	refreshInfo : function(loop_id) {
		var me=this;
		var mainPanel = me.up('panel');
		var detail = mainPanel.down('#access_EvaluateDetails');
		detail.loadDetail(loop_id);
		detail.down('#access_ScoreCollectInfo').loadScoreSummaryData(loop_id);
		me.getNewNum(loop_id, me.down('#plEvaluateExamineInfo'));
	},
	getNewNum : function(loop_id,form) {
		//审核信息
		var me=this;
		jForm=form;
		//获取最新计算结果
		var result = erp.Const.callServiceMethodSync(
						'supplierAccess/SupplierAccessScoreSummary.srm?method=getSupplierScoreCorrelation',
						{
							loop_id : loop_id
						});
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
		var rec=Ext.create('erp.supplierManager.model.AppSupplierAccessLoop',data.rec);
		jForm.down('#real').setValue(data.real);
		jForm.down('#max').setValue(data.max);
		jForm.down('#keyReal').setValue(data.keyreal);
		//jForm.down('#maxReal').setValue(data.keyMax);
		jForm.down('#rank').setValue(data.rank);
	}
});