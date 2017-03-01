Ext.define('erp.common.form.view.TableDefinition',{
	extend:'erp.ux.Window',
	alias:'widget.table_def',
	width:1000,
	height:500,
	title:'表结构定义',
	iconCls:"product",
	modal:true,
	initComponent : function() {
		var me = this;
		me.store = erp.DataUtil.createStoreFactory('erp.common.form.store.FrmFlds');
		Ext.apply(me,{
			items:[
			    {
				   tbar: [     
				   		{text:"新增字段",iconCls:'table_row_insert',itemId:'frmfld_add',handler:function(){me.doAddField();}},
				   		{text:"删除字段",iconCls:'table_row_delete',itemId:'frmfld_del',disabled:true,handler:function(){me.doDeleteField()}}
				        ],
					itemId:'ffld_grid',
					xtype:'gridpanel',
					plugins: [
				        Ext.create('Ext.grid.plugin.CellEditing', {
				        	pluginId:'cellEditing',
				            clicksToEdit: 1,
				            listeners:{
				            	beforeedit:this.onBeforCellEdit,
				            	//validateedit:this.onValidateedit,
				            	scope:this
				            }
				        })
				    ],
					columnLines:true,
					store:me.store,
				    columns:[
							{text:'',xtype:'rownumberer',width:40,sortable:false,align:'center'},
							{text: '序号',dataIndex: 'order_seq',width:40,align:'center', 
								align: 'right',
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                minValue: 0
					            }
							},
							{text:'指标属性',dataIndex:'code_type',flex:2,itemId:'',editor:{
								xtype:'combo',displayField:"name",valueField:'code',store:erp.DataUtil.getStoreByStoreManager(erp.DataConst.CODECONFIG_STOREID),queryMode:'remote',
								adapt:false
								},renderer:function(v){
									var r=erp.DataUtil.findConfig(v);
									var name;
									if(r){
										name=r.get('name')
									}
									return name;
							}},
							{text: '名称',		dataIndex: 'name',		flex:2,editor:{
								xtype:'textfield',
								allowBlank:false,
								selectOnFocus: true
							}},
							{text: '字段名',		dataIndex: 'code'	,	flex:1,
								editor:{
									xtype:'textfield',
									allowBlank:false,
									regex:/^[a-zA-Z0-9_]{3,20}$/,
									regexText:'只能包含字母数字和下划线且长度大于3小于16',
									validator:function(value){
										var selModel = this.up('#ffld_grid').getSelectionModel();
										var rec =selModel.getSelection()[0];
										var m = this.up('#ffld_grid').getStore().findRecord('code',value,0,false,false,true);
										if(m==null||rec==m){
											return true;
										}
										else return '字段名已存在';
									},
									selectOnFocus: true
								}
							},
							{text: '字段别名',		dataIndex: 'alias'	,	flex:1,editor:{
								xtype:'textfield',
								allowBlank:false,
								selectOnFocus: true
							}},
							{text: '数据类型',	dataIndex: 'datatype',	flex:1,
								editor: {
					                selectOnTab: true,
					                allowBlank : false,
									xtype:'combobox',
									store:erp.Util.getCombxStore(erp.Const.FIELD_DATATYPE),
							    	queryMode: 'local',
								    displayField: 'name',
								    valueField: 'value',
								    forceSelection:true,
								    listeners:{
									    change:function(fld,nv,ov){
									    	Ext.log('nv='+nv+',ov='+ov);
									    	var selModel = this.up('#ffld_grid').getSelectionModel();
									    	var rec =selModel.getSelection()[0];
									    	
									    	if(nv == erp.Const.DATA_TYPE_DEC){
									    		rec.set('len',18);
									    		rec.set('prec',2);
									    		this.up('#ffld_grid').down('#len').setDisabled(false);
									    		this.up('#ffld_grid').down('#prec').setDisabled(false);
									    	}else if(nv == erp.Const.DATA_TYPE_BOOL){//此处存在bug，选择布尔值时长度可用但不能编辑
									    		rec.set('len',6);
									    		rec.set('prec',0);
									    		this.up('#ffld_grid').down('#len').setDisabled(false);
									    		this.up('#ffld_grid').down('#prec').setDisabled(true);
									    	}else if(nv == erp.Const.DATA_TYPE_STRING){
									    		rec.set('len',30);
									    		rec.set('prec',0);
									    		this.up('#ffld_grid').down('#len').setDisabled(false);
									    		this.up('#ffld_grid').down('#prec').setDisabled(true);
									    	}else{
									    		rec.set('len',0);
									    		rec.set('prec',0);
									    		this.up('#ffld_grid').down('#len').setDisabled(true);
									    		this.up('#ffld_grid').down('#prec').setDisabled(true);
									    	}
									    	
									    }
								    }
					            },
					            renderer:function(v){
					            	return erp.Util.getFormatText(erp.Const.FIELD_DATATYPE,v);
					            }
							},
							{text: '长度',		dataIndex: 'len',	flex:1,		itemId: 'len',
								align: 'right',
					            editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                minValue: 1
					            }
							},
							{text: '精度',		dataIndex: 'prec',		flex:1,		itemId: 'prec',
								align: 'right',
					            editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                minValue: 0
					            }
							},
							{text: '可为空',	dataIndex: 'nullable',	flex:1, 
								menuDisabled:true,sortable:false,
								disabled:true,
								xtype: 'checkcolumn',
								editor:{
									xtype: 'checkbox'
								}
							},
							{text: '默认值',		dataIndex: 'default_value',flex:1},
							{text: '索引(选后可查询)',	    dataIndex: 'isidx',	    flex:1,
								menuDisabled:true,sortable:false,
								disabled:true,
								xtype: 'checkcolumn',
								editor:{
									xtype: 'checkbox'
								}	
							},
							{text: '隐藏',		dataIndex: 'ishide',	flex:1,
								menuDisabled:true,sortable:false,
								disabled:true,
								xtype: 'checkcolumn',
								editor:{
									xtype: 'checkbox'
								}	
							},
							{text: '可编辑',		dataIndex: 'editable',	flex:1,
								menuDisabled:true,sortable:false,
								disabled:true,
								xtype: 'checkcolumn',
								editor:{
									xtype: 'checkbox'
								}
							},
							/*{text: '值生成方法',	dataIndex: 'value_gen',flex:2},*/
							{text: '内置字段',	dataIndex: 'isbuildin',	flex:1,
								menuDisabled:true,sortable:false,
								disabled:true,
								xtype: 'checkcolumn'								
							}
					],
					listeners:{
						selectionchange:function(selModel,selections){
							var n = selections.length || 0;
							var btn = this.down('#frmfld_del');
							// 删除按钮必须是选中一些行时有效
							if (btn){
								var rec =selModel.getSelection()[0];
								btn.setDisabled(n == 0||rec.get('isbuildin'));
							}
						}
					}
				}
			],
			buttons:[
			 		{
			 		    text: '保存',
			 		    iconCls: 'page_save',
			 		    action: 'ACT_SAVE',
			 		    handler:function(){
			 		    	me.doSaveTableDefine()
			 		    }
			 		},
			 		{
			 		    text: '退出',
			 		    iconCls: 'page_error',
					    action:'ACT_CLOSE',
					    handler:function(){
					    	me.close()
					    }
			 		}
				]
		});
		me.callParent(arguments);
	},
	doInit:function(frmTbl){
		this.frmTbl =frmTbl;
		this.getStore().load({params:{ft_id:frmTbl.get('ft_id')}});
		this.ft_id = this.frmTbl.get('ft_id');
	},
	getGrid:function(){
		return this.down('#ffld_grid');
	},
	getStore:function(){
		return this.getGrid().getStore();
	},
	doDeleteField:function(){
		var fldGrid=me.getGrid()
		var rec=fldGrid.getSelectionModel().getSelection()[0];
		Ext.Msg.confirm("提示","你确定要删除字段【"+rec.get('name')+"】吗?",function(btn){
			if(btn=="yes"){
				me.store.remove(rec);
			}
		});
	},
	doAddField:function(){
		var me=this;
		var fldGrid=me.getGrid();
		var seq = me.store.getCount()+1;
		var frmFld = Ext.create('erp.common.form.model.FrmFld',{
						ft_id:me.frmTbl.get('ft_id'),
						name:'字段_'+seq,
						code:'field_'+seq,
						alias:'field_'+seq,
						datatype:erp.Const.DATA_TYPE_STRING,
						len:30,
						prec:0,
						iskey:false,
						nullable:true,
						order_seq:seq
				});
		me.store.add(frmFld);
		fldGrid.getPlugin('cellEditing').startEditByPosition({row: seq<=0?0:seq,column: 3});
	},
	doSaveTableDefine:function(){
		var me=this;
		if(me.store.getNewRecords().length>0
				    		||me.store.getUpdatedRecords().length>0
				    		||me.store.getRemovedRecords().length>0){
						me.store.sync({
							callback:function(){
								Ext.Msg.alert("提示","保存成功!")
							}
						});
					} 
	
	},
	onBeforCellEdit:function(ed,e,eOpts){
		var ret=true;
		var rec = e.record;
		//内置字段不允许编辑
		if(rec.get('isbuildin')&&!(e.field=='order_seq'||e.field=='isidx'))
			return false;
		var dataType = e.record.get('datatype');
    	switch(e.field){
    		case 'len':
				if((dataType===erp.Const.DATA_TYPE_STRING||dataType===erp.Const.DATA_TYPE_DEC)){
					if(Ext.isEmpty(e.value)){
						var v = dataType===erp.Const.DATA_TYPE_STRING ? 30:18;
						e.record.set(e.field,v);
						e.value =v;
					}
				}else 
					ret =false;
				break;
			case'prec':
				ret = dataType===erp.Const.DATA_TYPE_DEC
				break;
			default:
				break;
		}
    	return ret;
	}
});