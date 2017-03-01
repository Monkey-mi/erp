Ext.define('erp.view.master.caterialPrice.CaterialPriceCtl', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'erp.ux.ComboxTree'
    ],
	control:{
		'caterialPrice #caterialPriceBar button':{
			click:'onClickButton'			
		}
	},
    alias: 'controller.caterialPrice',

    onClickButton: function (btn) {
    	var panel=btn.up('panel');
    	var mainGrid=this.lookupReference('caterialPriceGrid');
    	switch(btn.itemId){
			case 'BTN_ADD':
				var r = Ext.create('erp.view.master.caterialPrice.model.CaterialPrice', {
					csbh:0,
					czym:erp.Util.currentUser.userInfo.name,
					czrq:new Date()
				});
				this.edtShow(r,true,true);
			break;
			case 'BTN_EDT':
				var rec=mainGrid.getSelectionModel().getSelection()[0];
				if(rec==null){
					Ext.Msg.alert('提示','请选择需要修改的明细!');
					break;
				}
				this.edtShow(rec,false,true);
			break;
			case 'BTN_DEL':
				var store=mainGrid.getStore();
				var recs=mainGrid.getSelectionModel().getSelection();
				if(recs.length==0){
					Ext.Msg.alert('提示','请选择需要删除的明细!');
					break;
				}
				//删除前判断数据
				var recordData = "["; //参数
				var a=false;
				Ext.each(recs, function(rec) {
						if (a) {
							recordData += ",";
						}
						recordData += Ext.encode(rec.data);
						a = true;
					})
				recordData += "]";
				var result = erp.Const.callServiceMethodSync(
						'caterialprice/caterialprice.act?method=getBeforDelete', {
							recordData : recordData
						});
				var data = Ext.decode(result);
				if (data.bool == false) {
					Ext.Msg.alert('提示', data.msg)
					break;
				}
				Ext.Msg.confirm('提示','是否确认删除所选记录?',function(btn){
					if (btn=='yes'){
						store.remove(recs);
						store.sync({
							callback:function(){
								store.loadPage(1);
							}
						});
					}			
				});
			break;
			case 'lock':
				var store=mainGrid.getStore();
				var recs=mainGrid.getSelectionModel().getSelection();
				if(recs==0){
					Ext.Msg.alert('提示','请至少选择一条记录!');
					break;
				}
				var rec=recs[0];
				var sdbj=1;
				var bb='确认';
				var czym=erp.Util.currentUser.userInfo.name;
				
				if(rec.get('sdbj')==1){
					sdbj=0;
					bb='取消';
					if(Ext.String.trim(czym)!=Ext.String.trim(rec.get('sdrm'))){
						Ext.Msg.alert('提示','解锁人名不一致，不能取消锁定!');
						return;
					}
				}
				Ext.Msg.confirm('提示','是否'+bb+'锁定公式【'+rec.get('gsmc')+'】?',function(btn){
					if (btn=='yes'){
						rec.set('sdbj',sdbj);
						rec.set('sdrm',czym);
						rec.set('sdrq',new Date());
						store.sync({
							callback:function(){
								store.load();
							}
						});
					}			
				});
				break;
				case 'argument':
					var win =Ext.create('erp.view.master.caterialPrice.window.ArgumentSet',{
						title:'参数维护'
					});
					win.show();
				break;
    	}
    },
	edtShow:function(rec,isAdd,isEdit){
		var mainGrid=this.lookupReference('caterialPriceGrid');
		if(rec.get('sdbj')==1){
			isEdit=false;
		}
		var win = Ext.create('erp.view.master.caterialPrice.window.EdtCaterialPrice', {
					itemId : 'EdtCaterialPrice',
					title : '材料价格公式维护',
					rec : rec,
					isAdd : isAdd,
					isEdit : isEdit,
					store : mainGrid.getStore(),
					closable : true
				});
		win.show();
	},
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});