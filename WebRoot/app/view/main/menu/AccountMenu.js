/**
 * 显示在顶部的按钮菜单，可以切换至标准菜单，菜单树
 */
Ext.define('erp.view.main.menu.AccountMenu', {
			extend : 'erp.ux.ButtonTransparent',
			alias : 'widget.accountmenu',
			glyph:0xf007,
			bind:{text:'{system_info.btn_account.title}',
					  	tooltip:'{system_info.btn_account.tooltip}'
					  },
			tooltip : '账号服务',
			initComponent : function() {
				this.menu = [];
				this.menu.push({
								text : '账号信息',
								itemId:'btn_accountInfo',
								glyph:0xf05a,
								handler:'onTopbarClicked'
							},'-',{
								text:'密码重置',
								itemId:'btn_pwdReset',
								glyph:0xf09c,
								handler:'onTopbarClicked'
							})

			 this.callParent();
			}
		})