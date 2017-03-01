/**
 * 显示在顶部的按钮菜单，可以切换至标准菜单，菜单树
 */
Ext.define('erp.view.main.menu.SettingMenu', {
			extend : 'erp.ux.ButtonTransparent',
			alias : 'widget.settingmenu',
			text : '设置',
			glyph : 0xf013,
			tooltip : '偏好设置',
			initComponent : function() {
				this.menu = [];
				/*this.menu.push({
							text : '菜单样式',
							menu : [{
										xtype : 'segmentedbutton',
										reference : 'menuType',
										value : 'toolbar',
										items : [{
													text : '标准菜单',
													value : 'toolbar'
												}, {
													text : '树型菜单',
													value : 'tree'
												}]
									}]
						})*/

				this.listeners = {
					menushow : function(button, menu) {
						// 设置当前的菜单类型为已选中的类型，本来应该是自动setValue的，不知道为什么没有自动赋值。
						button.down('segmentedbutton').setValue(this.up('app-main')
								.getViewModel().get('menuType.value'))
					}
				}, this.callParent();
			}
		})