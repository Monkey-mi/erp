Ext.define('erp.report.engine.controller.CustomDefineReport',{
	extend:'Ext.app.Controller',
	requires:['erp.report.engine.store.UserDefineReports'],
	views:['erp.report.engine.view.WriteableTemplateDesigner'],
	refs:[{ref:'pnlContent',selector:'dc_userdesigner'},
		  {ref:'grdReport',selector:'dc_userdesigner #grdReportList'},
		  {ref:'pnlTitle',selector:'dc_userdesigner #cntrContent #cntrTitle'}
	],
	init:function(app){
    	var me = this;
		//controller只初始化一次
		if(me.isInited) {
			return;
		}
    	me.control({
    		'dc_userdesigner':{
    			 afterrender: function(cmp){
    			 	me.srcRec=cmp.extraCfg.srcRec;
    			    grid=me.getGrdReport();
	    		   	store=grid.getStore();
	    		   	store.getProxy().setExtraParam('list_id',me.srcRec.list_id);
	    		   	store.load();
    			 }
    		},
    		'dc_userdesigner #grdReportList button':{
    			click:me.doGridAction
    		},
    		'dc_userdesigner #grdReportList':{
    			
    			selectionchange:function(grid,recs){
    				if (recs[0]){
    					var titleSet=me.getPnlTitle();
    					titleSet.setDisabled(true);
    					titleSet.down('#txtReportName').setValue(recs[0].get('report_name'));
						titleSet.down('#txtYear').setValue(recs[0].get('report_year'));
						titleSet.down('#txtMonth').setValue(recs[0].get('month'));
						titleSet.down('#txtRemark').setValue(recs[0].get('remark'));
						var result=me.doSetupCondition(recs[0])
						me.getPnlContent().setAddflag(false);
    					me.getPnlContent().loadReport(me.srcRec,{condition:result.condition});
    				}
    			}
    			
    		},
    		'dc_userdesigner #cntrContent #cntrTitle button':{
    			click:me.doSaveAction
    		}
    	});
    	me.isInited=true;
	},
	doLoadGrid:function(tree,rec){
		var me=this;
		if(rec.get('leaf')){
			me.getGrdReport().getStore().load({
				params:{list_id:rec.get('nodeId')}
			});
			me.getPnlContent().initSupCan(rec);
		}
	},
	doGridAction:function(btn){
		var me=this;
		switch(btn.itemId){
			case'BTN_ADD':
			  	me.doAddRec();
			 	break;
			 case'BTN_EDT':
			  	me.getPnlTitle().setDisabled(false);
			 	break;
			case 'BTN_DEL':
				var rec=me.getGrdReport().getSelectionModel().getSelection()[0];
			 	Ext.Msg.confirm('提示',"你确定要删除报表:【"+rec.get('report_name')+"】吗?",function(btn){
			 		if (btn=="yes"){
			 			var store=me.getGrdReport().getStore();
			 			store.remove(rec);
			 			store.sync({success:function(){
							erp.Util.showMsg('删除成功!');
						}});
			 		}
			 		
			 	});
			 break;
		}
	
	},
	doSaveAction:function(btn){
		var me=this;
	 switch(btn.itemId){
	 	case 'BTN_SAVE':
	 		var form=me.getPnlTitle();
	 		if (form.getForm().isValid()){
	 			var sts=me.getPnlContent().getAddflag();
	 			var r;
	 			if (!sts){
	 				r=me.getGrdReport().getSelectionModel().getSelection()[0];
	 				r.set('report_name',form.down('#txtReportName').getValue());
	 				r.set('report_year',form.down('#txtYear').getValue());
	 				r.set('month',form.down('#txtMonth').getValue());
	 				r.set('remark',form.down('#txtRemark').getValue());
	 			}
	 			else{
	 				r=Ext.create('erp.report.engine.model.UserDefineReport',{
		 				report_name:form.down('#txtReportName').getValue(),
		 				report_year:form.down('#txtYear').getValue(),
		 				month:form.down('#txtMonth').getValue(),
		 				remark:form.down('#txtRemark').getValue(),
		 				cycle_data:form.down('#txtCycle').getValue(),
		 				list_id:me.srcRec.list_id,
		 				create_dt:new Date()
	 			});
	 			}
	 			me.getPnlContent().saveReport(r);
	 			me.getPnlTitle().setDisabled(true);
	 		}
	 		break;
	 }
		
	},
	doAddRec:function(){
		var me=this;
		var result=me.doSetupCondition();
		var today=new Date()
		Ext.Ajax.request({
			url:'main/dailyreport.do?method=isExistsReport',
			params:{
				report_year:today.getFullYear(),
				month:(today.getMonth()+1),
				cycle_data:result.value,
				list_id:me.srcRec.list_id
			},
			success:function(response){
				var resp=Ext.decode(response.responseText);
				if (!resp.data){
					me.configPanel(result);
				}else{
					erp.Util.showMsg('报表已存在,请确认!')
				}
			}
		});		
		
	},
	configPanel:function(result){
		var me =this;
		var titleSet=me.getPnlTitle();
		titleSet.setDisabled(false);
		var today=new Date()
		var reportName=me.srcRec.name+"-"+Ext.Date.format(today,"Ymd")
		var year=today.getFullYear();
		var name=erp.Util.getFormatText(erp.Const.STATS_CYCLE,me.srcRec.cycle)+"数据";
		var month=today.getMonth()+1;
		titleSet.down('#txtReportName').setValue(reportName);
		titleSet.down('#txtYear').setValue(year);
		titleSet.down('#txtMonth').setValue(month);
		if (result.name!=''){
			titleSet.down('#txtRemark').setValue(result.name);
			titleSet.down('#txtCycle').setValue(result.value);
			}
		me.getPnlContent().setAddflag(true);	
		me.getPnlContent().loadReport(me.srcRec,{condition:result.condition});
	},
	doSetupCondition:function(rec){
		var me=this;
		var result={};
		var value,year,month;
		if (rec){
			value=rec.get('cycle_data');
			month=rec.get('month');
			year=rec.get('report_year');
		}else{
			var today=new Date();
			value=Ext.Date.format(new Date(),'Y-m-d');
			month=today.getMonth()+1;
			month=month<10?'0'+month:month;
			year=today.getFullYear();
		}
		switch(me.srcRec.cycle){
				case erp.Const.STATS_CYCLE_DAY:
					result['condition']="{0}="+value+"";
					result['name']=value+erp.Util.getFormatText(erp.Const.STATS_CYCLE,me.srcRec.cycle)+"数据";
					result['value']=value;
					break;
				case erp.Const.STATS_CYCLE_WEEK:
					result['condition']="{0}="+(rec?value:Ext.Date.getWeekOfYear(today))+'&{1}='+year;
					result['name']=year+"年第"+(rec?value:Ext.Date.getWeekOfYear(today))+erp.Util.getFormatText(erp.Const.STATS_CYCLE,me.srcRec.cycle)+"数据";
					result['value']=rec?value:Ext.Date.getWeekOfYear(today);
					break;
				case erp.Const.STATS_CYCLE_MONTH:
					result['condition']="{0}="+month+"&{1}="+year;
					result['name']=year+"年第"+month+erp.Util.getFormatText(erp.Const.STATS_CYCLE,me.srcRec.cycle)+"数据";
					result['value']=month;
					break;
				case erp.Const.STATS_CYCLE_SEASON:
					break;
				case erp.Const.STATS_CYCLE_YEAR:
					result['condition']="{0}="+year;
					result['name']=year+erp.Util.getFormatText(erp.Const.STATS_CYCLE,me.srcRec.cycle)+"数据";
					result['value']=year;
					break;
				default:
					result['condition']="";
					result['name']="";
					result['value']="";
				
			}
		return 	result;
	}
});