Ext.define('erp.express.controller.ExpressMoneyCtrl', {
	extend : 'Ext.app.Controller',
	requires : [
				'erp.ux.PagingBar',
				'erp.ux.QueryPanel',
				'erp.ux.FormKey',
				'erp.ux.SearchComboboxOnlyName',
				'erp.express.store.ExpressCity',
				'erp.express.store.Countrycity',
				'erp.express.store.ExpressMoney'
				,'erp.express.model.QueryExpressMoney'
				,'erp.express.store.ExpressRyf'
				,'erp.express.model.QueryExpressRyf'
				],
	views:[
			'erp.express.view.ExpressMoneyManager',
			'erp.express.view.AddExpressMoney',
			'erp.express.view.ExpressMoneyQueryWin',
			
			'erp.express.view.ExpressRyfManager',
			'erp.express.view.AddExpressRyf',
			'erp.express.view.ExpressRyfQueryWin',
			'erp.express.view.UpFile'
		],
	refs:[
			{ref:'addExpressMoney',selector:'addExpressMoney'},
			{ref:'mng_ExpressMoney',selector:'mng_ExpressMoney'},
			
			{ref:'mng_ExpressRyf',selector:'mng_ExpressRyf'},
			{ref:'addExpressRyf',selector:'addExpressRyf'},
			
			{ref:'upExcel_ExpressMoney',selector:'upExcel_ExpressMoney'}
			],
	init : function() {
		// controller只初始化一次
		var me = this;
		if (me.isInited)
			return;
		me.control({
			'mng_ExpressMoney':{
				afterrender:function(cmp){
					me.panel=me.getMng_ExpressMoney();
					me.dsfsStore=me.panel.dsfsStore;
					me.panel.setTitle(cmp.modName);					
					me.panel.moneystore.load();
				}
			},
			'addExpressMoney button':{
				click:me.doAddAction
			},
			'addExpressRyf button':{
				click:me.doAddAction2
			},
			'upExcel_ExpressMoney button':{
				click:me.upExcelAction
			}
		});
		me.isInited=true;
	},
	
	doAddAction:function(btn){
		var me=this;
		if(btn.action=='ACT_SAVE'){
			var win=me.getAddExpressMoney();
			var addForm = win.down('form');
			if (addForm.getForm().isValid() && addForm.getForm().isDirty()) {
				var values = addForm.getValues();
				var country_id=values.country;
				var city_id=values.city;
				var csbh=values.csbh;
				var csmc=values.csmc;
				var special=values.special;
				var start_zl=values.start_zl?parseFloat(values.start_zl):0;
				var end_zl=values.end_zl?parseFloat(values.end_zl):0;
				var first_fy=values.first_fy?parseFloat(values.first_fy):0;
				var xu_fy=values.xu_fy?parseFloat(values.xu_fy):0;
				var round_start_zl=Ext.util.Format.round(start_zl,0);//四舍五入到各个位
				if(round_start_zl<start_zl){//四舍
					round_start_zl=round_start_zl+0.5;//+0.5
				}else if(round_start_zl==start_zl+0.5){//0.5被五入
					round_start_zl=start_zl;
				}else{//其他五入和原数
					//不变
				}
				var round_end_zl=Ext.util.Format.round(end_zl,0);//四舍五入到各个位
				if(round_end_zl<end_zl){//四舍
					round_end_zl=round_end_zl+0.5;//+0.5
				}else if(round_end_zl-end_zl==0.5){//0.5被五入
					round_end_zl=end_zl;
				}else{//其他五入和原数
					//不变
				}
				
				if(round_start_zl>round_end_zl){
					Ext.Msg.alert('提示','起始重量不可大于结束重量');
					return;
				}
				if(Ext.isEmpty(country_id)){
					Ext.Msg.alert('提示','国别不可为空');
					return;
				}
				if(Ext.isEmpty(city_id)){
					Ext.Msg.alert('提示','城市不可为空');
					return;
				}
				if(Ext.isEmpty(csbh)){
					Ext.Msg.alert('提示','快递公司不可为空');
					return;
				}
				var zlarray=[];
				var newrecs=[];
				for(var i=round_start_zl;i<=round_end_zl;i=i+0.5){
					var newrec=Ext.create('erp.express.model.ExpressMoney',{
						country_id:country_id,
						city_id:city_id,
						csbh:csbh,
						csmc:csmc,
						special:special,
						zl:i,
						fy:first_fy+parseFloat(i-0.5)*2*xu_fy
					});
					newrec.phantom =true;//表示新增
					newrecs.push(newrec);
					zlarray.push(i);
				}
				var wro=erp.Const.callServiceMethodSync('es/expressCountry.crm?method=checkForAddExpressMoney',{
			    	country_id:country_id,
			    	city_id:city_id,
					csbh:csbh,
					special:special,
			    	zlarray:zlarray.join(',')
			 	}).data;
			 	if(wro.flag==0){
			 		var rec=me.dsfsStore.findRecord('cid',v,0,false,false,true);
					Ext.Msg.alert('提示',csmc+'在该城市已有重量'+wro.msg+"的"+(rec? rec.get('display'):""));
					return false;
			 	}else{
			 		var moneystore=me.getMng_ExpressMoney().moneystore;
			 		moneystore.add(newrecs);
			 		moneystore.sync({
        					success : function(e, batch) {
        						moneystore.reload();//必须的，避免记录没有主键的情况
								Ext.Msg.alert('提示', '保存成功！');
							},
							failure : function(batch, options) {
								Ext.Msg.alert('提示', '保存失败！');
							}
        			});
			 		win.close();
			 	}					
			}else{
				Ext.Msg.alert('提示','请检查数据');
				return;
			}
		}
	},
	
	doAddAction2:function(btn){
		var me=this;
		if(btn.action=='ACT_SAVE'){
			var win=me.getAddExpressRyf();
			var addForm = win.down('form');
			if (addForm.getForm().isValid() && addForm.getForm().isDirty()) {
				var values = addForm.getValues();
				var nf=values.nf;
				var yf=values.yf;
				var csbh=values.csbh;
				var csmc=values.csmc;
				var ryf=values.ryf;
				var wro=erp.Const.callServiceMethodSync('es/expressCountry.crm?method=checkForAddExpressRyf',{
			    	nf:nf,
			    	yf:yf,
					csbh:csbh
			 	}).data;
			 	if(wro.flag==1){
			 		var date=new Date();
			 		var newrec = Ext.create('erp.express.model.ExpressRyf', {
			 						csbh:csbh,
			 						csmc:csmc,
									nf:nf,
									yf:yf,
									ryf:ryf,
									oo:'000'//标记是否是增加
								});
			 		var ryfstore=me.getMng_ExpressRyf().store;
			 		ryfstore.add(newrec);
			 		ryfstore.sync({
        					success : function(e, batch) {
        						ryfstore.reload();//必须的，避免记录没有主键的情况
								Ext.Msg.alert('提示', '保存成功！');
							},
							failure : function(batch, options) {
								Ext.Msg.alert('提示', '保存失败！');
							}
        			});
			 		win.close();			 		
			 	}else{
			 		Ext.Msg.alert('提示',wro.msg);
					return false;
			 	}					
			}else{
				Ext.Msg.alert('提示','请检查数据');
				return;
			}
		}
	},
	upExcelAction:function(btn){
		var me=this;
		var upFileWin=me.getUpExcel_ExpressMoney();
		var form=upFileWin.down('form');
		
		if(btn.itemId=='btn_save' && form.getForm().isValid()){						
			 form.submit({
                    url : 'es/upExcel_ExpressMoney.crm',
                    method:'POST',
                    timeout : 10,
                    params: {},
                    waitMsg : '正在上传解析文件...',
                    success : function(form, action) {
                    	Ext.Msg.alert('提示', action.result.msg);
                    	var moneystore=me.getMng_ExpressMoney().moneystore;
			 			moneystore.reload();
                    	upFileWin.close();                   	
                    },
                    failure : function() {
                        Ext.Msg.alert("提示", "上传解析失败");
                    }
             });
		}
	}
	
})