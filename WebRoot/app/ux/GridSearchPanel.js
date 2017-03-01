Ext.define('erp.ux.GridSearchPanel',{
	extend:'Ext.grid.Panel',
	alias:'widget.searchGrid',
	layout:'fit',
	title:'自定义查询',
	glyph:0xf002,
	defautlNameWidth:80,
	defautlConditionWidth:60,
	defautlValueWidth:100,
	defautlConnectorWidth:50,
	buttons:[{text:'确认',glyph:0xf058},{text:'清空',glyph:0xf014,handler:function(btn){
		var grid=btn.up('grid');
		grid.getStore().removeAll();
	}}],
	plugins:{
			ptype: 'cellediting',
        	clicksToEdit: 1,
        	listeners:{
        		'beforeedit':function(editor,e){
        		   switch(e.field){
	        		   case 'fd_name':
		        			var edit=e.column.getEditor();
		        			edit.on('select',function(cbo,rec){
		        				e.record.set('type',rec.get('type'));
		        				e.record.set('render',rec.get('render'));
		        				e.record.set('fd_value','');
		        			});
		        			break;
		        		case 'fd_value':
		        			e.grid.onSetEditorStyle(e,e.record);
		        			break;
        		   } 
        		},
        		'edit':function(editor,e){
        			var valEditor=e.grid.columns[2].getEditor();
        			if(valEditor.getXType()=='datafield'){
	        			var val=Ext.Date.format(new Date(e.record.get('fd_value')),'Y-m-d');
	        			e.record.set('fd_value',val);
        			}
        			e.record.commit();
        		}
        	}
		},
	initComponent:function(){
		Ext.define('queryField', {
		     extend: 'Ext.data.Model',
		     fields: [
		         {name: 'fd_name', type: 'string'},
		         {name: 'fd_condition',  type: 'string'},
		         {name: 'fd_value',       type: 'string'},
		         {name: 'fd_connector',  type: 'string'},
		         {name: 'type',  type: 'string'},
		         {name: 'render',  type: 'string'}
		     ]
		 });
		 
		this.store=Ext.create('Ext.data.Store',{
			 model:'queryField'
			});
		this.tbar=[{text: '增加',itemId:ehr.Const.FUNC_ITEMID_BTN_ADD,handler:this.onConditionAdd,	
		glyph : 0xf055},
		{text: '删除',itemId:ehr.Const.FUNC_ITEMID_BTN_DEL,	glyph : 0xf056,disabled:true}
		];
		var tempFields=this.filterStore.getModel().getFields();
		var fields=[];
		for(var key in tempFields){
			if(key!='items'&&!tempFields[key].hidden){
				var rec={'name':tempFields[key].name,
					'header':tempFields[key].header,
					'type':tempFields[key].type,
					'render':tempFields[key].render
					};
				fields.push(rec);
			}
		}
//		console.log(fields);
		var fieldStore=Ext.create(
			'Ext.data.Store',
			{
				fields:[{name:'name',type:'string'},
			 			{name:'header'},
			 			{name:'type'},
			 			{name:'render'}
			 	],
				data:fields		
			});	
//		console.log(fieldStore.getRange());
		this.columns=[{
				  		header:'查询条件',
				  		dataIndex:'fd_name',
						minWidth :80,
						width:this.defautlNameWidth,
						editor:{
							xtype:'combo',
							displayField:'header',
							valueField:'name',
							store:fieldStore
						},
						renderer:function(v){
							var rec=fieldStore.findRecord('name',v,0,false,false,true);
							return rec?rec.get('header'):v;
						}
				  	},{
				  		header:'条件',
				  		dataIndex:'fd_condition',
				  		minWidth:60,
				  		width:this.defautlConditionWidth,
				  		editor:{
				  			xtype:'combo',
				  			store:[
				  				['=','等于'],
				  				['!=','不等于'],
				  				['>','大于'],
				  				['>=','大于等于'],
				  				['<','小于'],
				  				['<=','小于等于'],
				  				['like','包含']
				  			]
				  		}
				  	},{
				  		header:'值',
				  		dataIndex:'fd_value',
				  		minWidth:100,
				  		flex:1,
				  		editor:{}
				  	},{
				  		header:'连接符',
				  		dataIndex:'fd_connector',
				  		minWidth:50,
				  		width:this.defautlConnectorWidth,
				  		editor:{
				  			xtype:'combo',
				  			store:[
				  				['and','并且'],
				  				['or','或者']
				  			]
				  		}
				  	}];
		this.callParent();
		
		
		
	},
	onSetEditorStyle:function(e,rec){
		var column=e.column;
			if(Ext.isEmpty(rec.get('type')))
				return;
        	switch (rec.get('type')){
        		case 'auto':
        		case 'string':
				if(rec.get('render')){
					var configRec=ehr.DataConst.Config.findRecord('code',rec.get('render'),0,false,false,true);
					// 若在基本资料表中找到Store
					if(!configRec){	
						column.setEditor({xtype:'combo',
							store:ehr.DataUtil.getComboStore(rec.get('render')),
							queryMode: 'local',
							displayField:'name',
							valueField:'value',
							width:column.getWidth()});
					}else
						column.setEditor({
								xtype:configRec.get('xtype')?configRec.get('xtype'):'combo',
								store:Ext.create(configRec.get('store')).load(),
								queryMode: 'local',
								displayField:configRec.get('displayField'),
								valueField:configRec.get('valueField'),
								width:column.getWidth()});
						
					}else
						column.setEditor({
								xtype:'textfield',
								width:column.getWidth()});
						
					break;
				case 'int':
					column.setEditor({xtype:'numberfield',width:column.getWidth()});
					break;
				case 'date':
					column.setEditor({xtype:'datefield',width:column.getWidth(),format:'Y-m-d'});
		}
	},
	onConditionAdd:function(btn){
		var grid=btn.up('gridpanel');
		var rec=Ext.create('queryField');
		grid.getStore().add(rec);
	}
})