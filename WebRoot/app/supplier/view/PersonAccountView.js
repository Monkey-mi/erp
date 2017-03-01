Ext.define('erp.supplier.view.PersonAccountView', {
	extend : 'erp.ux.Panel',
	alias : 'widget.personAccountView',
	height:700,
	width:1200,
	
	initComponent : function() {
		var me=this;
		me.moduleArray=[];
		this.on('afterrender',function(cmp){
			me.loadsub_menu(cmp.mod_code,cmp.extraCfg.second_mod_code,cmp.modName,cmp.glyph,cmp.modId);//一级模块代码和二级模块代码
		}),
		Ext.apply(me,{
				bodyStyle:{background:'white'},
				layout: {
        		type: 'hbox',
        		align: 'stretch'
    			},
				items:[
				{
		   		 	itemId:'personAccountLeftMenu',
		   		 	//title:me.title,
		   		 	//glyph:me.glyph,
		   		 	width:160,
		   		 	layout:{
					     type: 'vbox',
					     pack: 'start',
					     align: 'stretch'
					},
					border:true,
					style:'border:1px solid #bec5c9;margin:2px 0px 0px 0px;',
					items:[
					{
						xtype:'panel',
						border:false,
						padding:0,
						heigth:33,
						html:'<div style="border:0px,margin:0px;padding:9px 0px 0px 20px;background:url(resources/images/firstview/dd_01.png) no-repeat;width:auto;height:33px; font-size:14px;color:#ffffff;font-weight:bold;">账户登录</div>'
					},
					{
						xtype : 'panel',
						itemId:'sub_menu_panel',
						bodyStyle : {
							padding : '10px'
						},
						height:110,
						layout : 'fit',
						dockedItems : [{
							dock : 'left',
							itemId:'sub_menu_toolbar',
							xtype : 'toolbar',
							items : [
							{
								itemId:'mdl_100011',
								xtype : 'buttontransparent',
								height:40,
								text : '<span style="font-size:14px;">'+this.addSpace("个人信息", 12)+'</span>'
							},
							{
								itemId:'mdl_100010',
								xtype : 'buttontransparent',
								height:40,
								text : '<span style="font-size:14px;">'+this.addSpace("修改密码", 12)+'</span>'
							}
							]
						}]
						
						
					},
					{
						xtype:'panel',
						border:false,
						padding:0,
						heigth:33,
						html:'<div style="border:0px,margin:0px;padding:9px 0px 0px 20px;background:url(resources/images/firstview/dd_01.png) no-repeat;width:auto;height:33px; font-size:14px;color:#ffffff;font-weight:bold;">公司信息</div>'
					},
					{
						xtype : 'panel',
						itemId:'sub_menu_panel_2',
						
						height:420,
						layout : 'fit',
						dockedItems : [{
							dock : 'left',
							itemId:'sub_menu_toolbar',
							xtype : 'toolbar',
							defaults:{xtype : 'buttontransparent',height:40},
							items : [
							{
								itemId:'menu_basicinfo',//指向 基本信息 panel
								text : '<span style="font-size:14px;">'+this.addSpace("基本信息", 10)+'</span>'
							},
							{
								itemId:'menu_plEquipmentDetails',//指向 设备panel
								text : '<span style="font-size:14px;">'+this.addSpace("主要设备", 10)+'</span>'
							},
							{
								itemId:'menu_plmaterialsDetails',//指向 原材料及品牌panel
								text : '<span style="font-size:14px;">'+this.addSpace("原材料及品牌", 10)+'</span>'
							},
							{
								itemId:'menu_plproductDetails',//指向 公司主要产品及品牌 panel
								text : '<span style="font-size:14px;">'+this.addSpace("公司主要产品及品牌", 10)+'</span>'
							},
							{
								itemId:'menu_customerDetails',//指向 公司主要客户 panel
								text : '<span style="font-size:14px;">'+this.addSpace("公司主要客户", 10)+'</span>'
							},
							{
								itemId:'menu_plbankDetails',//指向 银行账号 panel
								text : '<span style="font-size:14px;">'+this.addSpace("银行账号", 10)+'</span>'
							},
							{
								itemId:'menu_plinvoiceDetails',//指向 发票抬头 panel
								text : '<span style="font-size:14px;">'+this.addSpace("发票抬头", 10)+'</span>'
							},
							{
								itemId:'menu_plcompetitorDetails',//指向 竞争对手 panel
								text : '<span style="font-size:14px;">'+this.addSpace("竞争对手", 10)+'</span>'
							},
							{
								itemId:'menu_fileGridPanel',//指向 竞争对手 panel
								text : '<span style="font-size:14px;">'+this.addSpace("认证文件", 10)+'</span>'
							}
							]
						}]
					}
					]
			   	},
			   	{
			   		flex:1,
			   		border:true,
					style:'border:1px solid #bec5c9; margin:0px 10px 0px 10px;',
			        //region: 'center',
			        layout:'fit',//必须的
			        itemId:'middleView',
			        xtype:'panel'
//			        html:'loading......'
			    }
				]
		});
		
		this.callParent();
		
	},
	loadsub_menu:function(mod_code,second_mod_code,modName,glyph,modId){
		var me = this;
		me.moduleArray=erp.Const.callServiceMethodSync('common/Modules.do?method=getSysMenuByLoginIdAndNode',{
				node:modId
		});
	
		var middleView=me.down('#middleView');
		
		if(me.moduleArray.length>0){
			var modRec; 
			//如果默认加载个人信息
			for (var i=0;i<me.moduleArray.length;i++) {
				if(me.moduleArray[i].mod_code=='100012'){
					modRec = Ext.create('erp.module.model.Module',me.moduleArray[i]);
					break;
				}
			}
			//如果二级模块代码存在，则显示该模块
			for (var i=0;i<me.moduleArray.length;i++) {
				if(second_mod_code!=null && second_mod_code!="" && me.moduleArray[i].mod_code==second_mod_code){
					modRec = Ext.create('erp.module.model.Module',me.moduleArray[i]);
					break;
				}
			}
			erp.Util.loadModuleMC(modRec,middleView);
		}
		
	},
	addSpace : function(text, len) {
		var result = text;
		
		for (var i = text.length; i < len; i++) {
			result += '　';
		}
		return result;
	},
	getLeftMenu:function(){
		var me=this;
		return me.down('#personAccountLeftMenu');
	}
});