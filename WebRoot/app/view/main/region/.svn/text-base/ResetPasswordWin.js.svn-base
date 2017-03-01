Ext.define('erp.view.main.region.ResetPasswordWin',{
	extend:'Ext.window.Window',
	alias:'widget.edt_Password',
	title:'密码重置',
	requires:['erp.def.ui.plugins.FormKeyMapper'],
	glyph:0xf09c,
	width:400,
	initComponent:function()
	{
		var me=this;
		Ext.apply(this,{
			items:[{
				xtype:'form',
				padding:5,
				plugins:{
					      ptype: 'FormKeyMapper'
					},
				layout:'form',
				defaults:{xtype:'textfield',labelWidth:80,inputType : 'password',padding:2,msgTarget:'side'},
				items:[
				{
					fieldLabel:'原始密码',
					itemId:'orgPasswrd',
					maxLength:20,
					minLength:6,
					itemId:'firstFocusOn'
				},
				{
					fieldLabel:'新 密 码',
					itemId:'newPasswrd',
					maxLength:20,
					minLength:6
				},
				{
					fieldLabel:'确认密码',
					itemId:'secPasswd',
					maxLength:20,
					minLength:6
				}
				]
			}],
			buttons:[{text:'保存',glyph:0xf0c7,handler:'onSavePasswrd'},{text:'关闭',glyph:0xf00d,handler:function(){me.close()}}]
		})
		this.callParent();
	}
	
})