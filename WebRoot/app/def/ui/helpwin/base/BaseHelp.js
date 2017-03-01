Ext.define('erp.def.ui.helpwin.base.BaseHelp',{
	extend:'erp.ux.Window',
	alias:'widget.win_basehelp',
	glyph:0xf059,
	buttons:[
	  		{
	  		    text: '确定',
	  		    glyph:0xf058,
	  		    action: 'ACT_SAVE',
	  		    handler:'onDoSave'
	  		},
	  		{
	  		    text: '退出',
	  		    glyph:0xf057,
	 		    action:'ACT_CLOSE',
	 		    handler:function(){this.up('window').close();}
	  		}],
	initComponent:function(){
		this.callParent();
	}
})