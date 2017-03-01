/**
 * 用户基础信息
 */
Ext.define('erp.user.view.UserInfoForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.userinfo_form',
	frame : false,
	plugins : {
		ptype : 'FormKey'
	},
	bodyPadding : 10,
	//title:'用户信息维护',
	defaults : {
		xtype : 'textfield',
		labelAlign : 'right',
		anchor : '95%',
		labelWidth : 60,
		labelStyle : 'font-weight:bold',
		msgTarget : 'qtip',
		autoFitErrors : true
	},
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			items : [{
				xtype : 'container',
				width : 300,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				items : [{
					xtype : 'container',
					flex : 2,
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					defaults : {
						anchor : '95%',
						labelWidth : 60,
						padding:3,
						border : '5 5 5 0',
						xtype : 'textfield'
					},
					items : [{
						name : 'login_id',
						fieldLabel : '用户ID',
						itemId : 'login_id',
						allowBlank : false,
						flex : 1,
						blankText : '用户ID不能为空',
						vtype : 'UserName',
						vurl : 'main/UserCheck.do?method=isExistsUser',
						vtypeText : '用户已存在!',
						disabled : !this.isAddNew
					}, {
						name : 'nickname',
						fieldLabel : '昵称',
						flex : 1,
						itemId : 'nickname',
						blankText : '请输入昵称 '
					}]
				}]
			}, {
				xtype : 'container',
				flex : 2,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				defaults : {
					anchor : '95%',
					labelWidth : 60,
					padding:3,
					margins : '10 5 0 0',
					xtype : 'textfield'
				},
				items : [{
							name : 'pwd',
							itemId : 'pwd',
							inputType : 'password',
							fieldLabel : '密码',
							flex : 1,
							disabled : !this.isAddNew,
							hidden : !this.isAddNew
						}, {
							name : 'pwd2',
							itemId : 'pwd2',
							inputType : 'password',
							fieldLabel : '确认密码',
							flex : 1,
							vtype : 'password',
							initialPassField : 'pwd',
							disabled : !this.isAddNew,
							hidden : !this.isAddNew
						}]
			}, {
				name : 'nick_portrait',
				fieldLable : '头像号',
				itemId : 'nick_portrait',
				blankText : '头像',
				hidden : true
			}, {
				xtype : 'container',
				flex : 2,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				defaults : {
					anchor : '95',
					labelWidth : 60,
					margins : '10 5 0 0',
					padding:3,
					flex : 1,
					xtype : 'textfield'
				},
				items : [{
							name : 'name',
							itemId : 'name',
							fieldLabel : '姓名',
							allowBlank : false
						}, {
							name : 'sex',
							fieldLabel : '性别',
							itemId : 'sex',
							xtype : 'combobox',
							store : erp.Util.getCombxStore(erp.Const.SEX_TYPE),
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							forceSelection : true
						}]
			}, {
				xtype : 'container',
				layout : 'hbox',
				flex : 2,
				defaults : {
					anchor : '95%',
					labelWidth : 60,
					margins : '10 5 0 0',
					padding:3,
					flex : 1,
					xtype : 'textfield'
				},
				items : [{
							name : 'birthday',
							fieldLabel : '出生日期',
							itemId : 'birthday',
							xtype : 'datefield',
							format : 'Y-m-d H:i:s'
						}, {
							name : 'email',
							fieldLabel : '电子邮箱',
							itemId : 'email',
							vtype : 'email'
						}]
			}, {
				xtype : 'container',
				layout : 'hbox',
				flex : 2,
				defaults : {
					anchor : '95%',
					labelWidth : 60,
					padding:3,
					margins : '10 5 0 0',
					flex : 1,
					xtype : 'textfield'
				},
				items : [{
							xtype : 'checkbox',
							name : 'is_valid',
							fieldLabel : '有效状态'
						}

				]
			}, {
				xtype : 'container',
				layout : 'hbox',
				flex : 2,
				defaults : {
					anchor : '95%',
					labelWidth : 60,
					padding:3,
					margins : '10 5 0 0',
					flex : 1,
					xtype : 'textfield'
				},
				items : [{
							xtype : 'datefield',
							name : 'create_dt',
							disabled : true,
							fieldLabel : '创建日期',
							format : 'Y-m-d H:i:s'
						}, {
							xtype : 'datefield',
							name : 'last_login',
							disabled : true,
							fieldLabel : '最近登录',
							format : 'Y-m-d H:i:s'
						}]
			}, {
				xtype : 'container',
				layout : 'hbox',
				flex : 2,
				defaults : {
					anchor : '95%',
					padding:3,
					labelWidth : 60,
					margins : '10 5 0 0',
					flex : 1,
					xtype : 'textfield'
				},
				items : [{
							xtype : 'displayfield',
							itemId : 'default_org',
							fieldLabel : '所属组织',
							hidden : true
						}, {
							xtype : 'displayfield',
							itemId : 'default_dept',
							fieldLabel : '所属部门',
							hidden : true
						}]
			}]
		})
		me.callParent(arguments);
	},
	modeChange : function() {
		var me = this;
		var pwd = me.down('#pwd');
		var pwd2 = me.down('#pwd2');
		pwd.setDisabled(true);
		pwd.setVisible(false);
		pwd2.setDisabled(true);
		pwd2.setVisible(false);
	}
});