Ext.define('erp.master.prematerial.view.Prematerial',{
	extend:'erp.ux.Panel',
	alias:'widget.prematerial',
	 listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	 },
	
	initComponent:function(){
		var me=this;
		me.can_use_btn=true;
		me.store=Ext.create('erp.master.prematerial.store.Prematerial');
		Ext.apply(me.store.proxy.extraParams,{usePaging:true});
		Ext.apply(me,{
			layout:{
				type:'border',
				padding:2
			},
			dockedItems: [{
			    xtype: 'toolbar',
			    dock: 'top',
			    itemId:'function_btn',
			    items:[
					{text: '筛选', glyph:0xf002,itemId:'btn_query'}
				]
			}],
			items:[
			{   
			    itemId:'grd_Prematerial',
				flex:1,
				region:'center',
				xtype:'grid',
				overflowY:'auto',
				overflowX:'auto',
				selModel:Ext.create('Ext.selection.CheckboxModel'),	
				features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }],
				  columns: [
					   {header : '外协',width:38,dataIndex: 'wxbj',
							renderer:function(wxbj){
							if(wxbj=="true"||wxbj=="1"){
								return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
							}else {
								return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}'  />";
							}
						},sumaryType: 'count',
					      summaryRenderer: function(value, summaryData, dataIndex) {
					       return '合计';
					     }},
					     {header : '加急',width:38,dataIndex: 'jjbj',
							renderer:function(jjbj){
							if(jjbj=="true"||jjbj=="1"){
								return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' checked />";
							}else {
								return "<input type='checkbox' onchange='JavaScript:if(this.checked) {this.checked = false;} else{this.checked = true;}' />";
							}
						}},
					  {
						header:'状态',
						width: 45,
						dataIndex:'ztmc'
					},{
						header:'质检结论',
						width: 70,
						dataIndex:'jlmc'
					},{
						header:'仓库名称',
						width: 80,
						dataIndex:'ckmc'
					},{
						header:'到货单号',
						width: 70,
						dataIndex:'dhdh'
					},{
						header:'序号',
						width: 40,
						dataIndex:'dhxh'
					},{
						header:'到货日期',
						width: 80,
						xtype:'datecolumn',format:'Y-m-d',
						dataIndex:'dhrq'
					},{
						header:'供应厂商',
						width:240,
						dataIndex:'csmc'
					},{
						header:'材料货号',
						width:70,
						dataIndex:'clhh'
					},{
						header:'材料名称',
						width:300,
						dataIndex:'clmc'
					},{
						header:'规格尺寸',
						width: 120,
						dataIndex:'cltx1'
					},{
						header:'单位',
						width: 40,
						dataIndex:'jldw'
					},{
						header:'到货数量',
						width: 70,
						dataIndex:'dhsl',
						summaryType: 'sum',
					    summaryRenderer: Ext.util.Format.floatRenderer
					},{
						header:'已入/已退',
						width: 70,
						dataIndex:'yrsl',
						renderer:function(v){
				           if(v==0){
				           return ' '
				           }else{
				           return v
				           }},
				        summaryType: 'sum',
					    summaryRenderer: Ext.util.Format.floatRenderer   
					},{
						header:'质检单号',
						width: 70,
						dataIndex:'zjdh'
					},{
						header:'判定日期',
						width: 80,
						xtype:'datecolumn',format:'Y-m-d',
						dataIndex:'zjrq'
					},{
						header:'质检备注',
						width: 160,
						dataIndex:'zjbz'
					},{
					    header:'待判原因',
						width: 160,
						dataIndex:'dpyy'
					},{
						header:'合同号',
						width:100,
						dataIndex:'hth'
					},{
						header:'外协号',
						width:100,
						dataIndex:'wxh'
					},
					{
						header:'制造日期',
						width:100,
						xtype:'datecolumn',format:'Y-m-d',
						dataIndex:'zzrq'
					},{
						header:'备注说明',
						width:300,
						dataIndex:'bzsm'
					},{
						header:'交库人名',
						width:70,
						dataIndex:'jkrm'
					},{
						header:'票据日期',
						width:80,
						xtype:'datecolumn',format:'Y-m-d',
						dataIndex:'pjrq'
					},{
						header:'操作员名',
					    width:70,
						dataIndex:'czym'
					},{
						header:'操作时间',
						width:80,
						xtype:'datecolumn',format:'Y-m-d',
						dataIndex:'czsj'
					}],
					dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }],
					store:me.store
			}
			
			]
		});
		me.callParent(arguments);
	},
	loadMain:function(){
		var me=this;
		var store = me.store;
		me.store.loadPage(1,{
		    callback: function(records, operation, success) {
		        if(records.length>0){
		       /* 	
		        	me.down('#grd_Prematerial').getSelectionModel().select(records[0]);*/
		        }		        
		    }
		});
	}
});