Ext.define('erp.view.master.purchaseDetail.window.BomChangeSearch',{
	extend:'erp.ux.Window',
	alias:'widget.bomChangeSearch',
	requires:[
		'erp.view.master.purchaseDetail.store.BomChangeSearch'
	],
	overflowY: 'auto',
	listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.purchaseDetail.store.BomChangeSearch');
		me.store.load({params:{cgbh:me.cgbh,cgxh:me.cgxh}});
		Ext.apply(me,{
			height:document.body.clientHeight<800?document.body.clientHeight:800,
			width:document.body.clientWidth<1200?document.body.clientWidth:1200,
			title:'BOM更改查询【采计号'+me.cgbh+'-'+me.cgxh+'】',
			layout:{
		     type: 'fit',
		     align: 'stretch'
    		},
			items:[{
				xtype:'grid',
				store:me.store,
				 columns:[
							{header:'需求',dataIndex:'xqbj',width:50,renderer:erp.Util.Staterenderer},
				   	  	  	{header:'虚拟',dataIndex:'xnbj',width:50,renderer:erp.Util.Staterenderer},
			   	  	  		{header:'末级',dataIndex:'mjbz',width:50,renderer:erp.Util.Staterenderer},
			   	  	  		{header:'计划号',dataIndex:'jhh',width:80},
			   	  	  		{header:'顺序',dataIndex:'jgsx',width:50,align:'center'},
			   	  	  		{header:'状态',dataIndex:'gzzt',width:50,align:'center',renderer:function(v){
			   	  	  			if(v==0){
			   	  	  				return '改前';
			   	  	  			}else if(v==1){
			   	  	  				return '改后';
			   	  	  			}else if(v==2){
			   	  	  				return '新增';
			   	  	  			}
			   	  	  		}},
			   	  	  		{header:'材料类别',dataIndex:'cllbmc',align:'center',width:100},
			   	  	  		{header:'材料货号',dataIndex:'clhh',width:90},
			   	  	  		{header:'部件或材料名称',dataIndex:'clmc',width:180,renderer:function(v,r){
			   	  	  				var rec=r.record;
			   	  	  				for(i=0;i<rec.get('jgbh').length;i++){
			   	  	  					v='&nbsp&nbsp'+v;
			   	  	  				}
			   	  	  				return v;
			   	  	  		}},
			   	  	  		{header:'规格尺寸',dataIndex:'cltx1',width:90},
			   	  	  		{header:'版本',dataIndex:'bjbb',width:90},
			   	  	  		{header:'单位',dataIndex:'jldw',width:80,align:'center'},
			   	  	  		{header:'单件用量',dataIndex:'djyl',width:80,align:'right'},
			   	  	  		{header:'×转换系数',dataIndex:'zhxs',width:80,align:'center'},
			   	  	  		{header:'=辅助用量',dataIndex:'fzyl',width:80,align:'center'},
			   	  	  		{header:'辅助单位',dataIndex:'fzdw',width:80,align:'center'},
			   	  	  		{header:'供应厂商',dataIndex:'csmc',width:160},
			   	  	  		{header:'领用工序',dataIndex:'gxmc',width:160},
			   	  	  		{header:'虚拟件',dataIndex:'xnmc',width:100},
			   	  	  		{header:'备注说明',dataIndex:'bzsm',width:160},
			   	  	  		{header:'操作员名',dataIndex:'czym',width:80},
			   	  	  		{header:'操作时间',dataIndex:'czsj',width:90,renderer : Ext.util.Format.dateRendererOne}
			   	  	 ]
			}]
		});
	me.callParent(arguments);
	}
});