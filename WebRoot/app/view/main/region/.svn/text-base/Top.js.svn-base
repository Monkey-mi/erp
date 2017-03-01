Ext.define('erp.view.main.region.Top',{
	extend:'Ext.container.Container',
	alias:'widget.MainTop',
	requires:[
	'erp.ux.ButtonTransparent',
	'erp.view.main.menu.SettingMenu',
	'erp.view.main.menu.AccountMenu'
	
	],
	//style:'background:#008cd6;',
	initComponent : function() {
		Ext.apply(this,{
			layout: {
			    type: 'hbox',
			    align: 'left'
			},
			items:[{
				xtype:'image',
				hidden:true,
				width:252,
				height:25,
				src:'resources/images/logo1.jpg'
			},{
				xtype:'container',
				padding:'5 0 0 10',
				cls:'s_head s_s',
				style:'background:#e8e8e8;',
				bind:{
					html:'{system_info.name}'			
				}
			},{
				xtype:'toolbar',
				flex:1,
				height:25,
				style:'background:#e8e8e8;',
				padding:'0 0 0 0',
				defaults:{border:false},
				items:['->',{
					xtype:'buttontransparent',
					bind:{
						text:'{sayHello}'
					}
				},'-',{
				xtype: 'settingmenu'
			},'-',
					{xtype:'accountmenu'},'-',
					{xtype:'buttontransparent',itemId:'btn_help',glyph : 0xf059,
					bind:{text:'{system_info.btn_help.title}',
					  	tooltip:'{system_info.btn_help.tooltip}'
					  }
					},'-',
					{xtype:'buttontransparent',itemId:'btn_logout',glyph : 0xf011,handler:'onTopbarClicked',
						bind:{
								text:'{system_info.btn_logout.title}',
					  			tooltip:'{system_info.btn_logout.tooltip}'
					  		}
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : 'like',
						tooltip : '类似',
						disableMouseOver : true
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : '=',
						tooltip : '等于',
						disableMouseOver : true
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : '＞',
						tooltip : '大于',
						disableMouseOver : true
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : '≥',
						tooltip : '大于或等于',
						disableMouseOver : true
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : '＜',
						tooltip : '小于',
						disableMouseOver : true
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : '≤',
						tooltip : '小于或等于',
						disableMouseOver : true
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : '≠',
						tooltip : '不等于',
						disableMouseOver : true
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : '',
						glyph:0xf112,
						tooltip : '回退一步',
						disableMouseOver : true
					},
					{
						xtype:'buttontransparent',
						handler : 'doSearch',
						text : '',
						glyph:0xf122,
						tooltip : '全部回退',
						disableMouseOver : true
					},
					{
						glyph : 0xf102,
						xtype:'buttontransparent',
						handler : 'hiddenTopBottom',
						tooltip : '隐藏顶部和底部区域',
						disableMouseOver : true
					}]
			}]
		});
	    this.callParent();  
	}
})