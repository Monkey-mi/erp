/*
 * 序列发生器维护view
 * 作者：毛必炬
 * 创建日期: 2012.03.08
 */
Ext.define('erp.common.form.view.EditFrmTbl',{
	extend: 'erp.ux.Window',
	alias: 'widget.edt_FrmTbl',
	requires:['erp.util.Util',
	          'erp.ux.FormKey',
	          'erp.ux.RemoteValidator'],
	title: '新增数据表',
	resizable : false,
	modal : true,
	frmTblGridStore:{},
	doInit:function(rec){
		this.down('form').loadRecord(rec);
	},
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			items:[
			  {  
		    	 xtype:'form',
		    	 bodyPadding: 10,
		    	 frame:false,
		    	 plugins:{
			          ptype: 'FormKey'
		    	 },
		    	 defaults: {
	    	    	xtype: 'textfield',
			    	labelAlign : 'right',
			    	anchor:'95%',
	    			labelWidth : 80,
	    			labelStyle : 'font-weight:bold',
	    			msgTarget: 'qtip',
		            autoFitErrors: true
		    	 },
		    	 items:[
					/*{
						fieldLabel : '数据表来源',
						name : 'from_attr',
						allowBlank : false,
						maxLength: 20,
						xtype:'combobox',
						store:gp.Util.getCombxStore(gp.Const.FRMTBL_FROM_TYPE),
						queryMode: 'local',
					    displayField: 'name',
					    valueField: 'value',
					    forceSelection:true
					},*/
					{
						fieldLabel : '表名(英文)',
						name : 'code',
						itemId : 'firstFocusOn',
                        allowBlank : false,
						blankText : '数据表名不允许为空!',
						plugins:{
	        		          ptype: 'RemoteValidator',
	        		          rvOptions:{
	        		        	  url:'form/FormCheck.do?method=isExistsFrmTbl',
	        		        	  passIsValid:false, //已存在反而是校验不通过
	        		        	  vTexts:["该数据表已存在!","该数据表不存在!"]
	        		          }
			        	 },
						maxLength: 20,
						disabled:!this.isAddNew
					},
					{
						fieldLabel : '名称(中文)',
						name : 'name',
						maxLength: 60
					},
					{
						fieldLabel : '表类别',
						name : 'type',
						itemId: 'type',
						allowBlank : false,
						maxLength: 20,
						xtype:'combobox',
						store:erp.Util.getCombxStore(erp.Const.FRMTBL_TYPE),
				    	queryMode: 'local',
					    displayField: 'name',
					    valueField: 'value',
					    forceSelection:true,
					    hidden:true,
					    disabled:true
					},
					{
						fieldLabel : '数据来源',
						name : 'from_attr',
						itemId: 'attr',
						allowBlank : false,
						maxLength: 20,
						xtype:'combobox',
						store:erp.Util.getCombxStore(erp.Const.FRMTBL_FROM_TYPE),
				    	queryMode: 'local',
					    displayField: 'name',
					    valueField: 'value',
					    forceSelection:true,
					   	listeners:{
					   		select:function(combo,rec){
					   			if(rec[0].get('value')==erp.Const.FRMTBL_FROM_TYPE_EXTDATASOURCE){
					   					me.down('#dscode').show();			   				
					   			}else{
					   					me.down('#dscode').hide();	
					   			}
					   		}
					   	}
					},
					{
						fieldLabel : '数据源类别',
						name : 'dscode',
						itemId: 'dscode',
						maxLength: 20,
						xtype:'combobox',
						store: Ext.create('erp.setup.store.ExtDataSource').load(),
						queryMode: 'local',
						fieldWidth:70,
						displayField: 'dsname',
						valueField: 'id',
						hidden:true
					}
			  ],
			  buttons:[
		 		{
		 		    text: '保存',
		 		    iconCls: 'page_save',
		 		    action: 'ACT_SAVE',
		 		    handler:function(){
		 		    	var edtForm = me.down('form');
						if(edtForm.getForm().isValid() && edtForm.getForm().isDirty()){
							var rec = edtForm.getRecord();
							edtForm.updateRecord(rec);
							me.doSaveFrmTbl(rec);
							me.close();
						}
		 		    }
		 		},
		 		{
		 		    text: '退出',
		 		    iconCls: 'page_error',
				    action:'ACT_CLOSE',
				    handler:function(){
				    	me.close();
				    }
		 		}
				]
		     }
		    ]
		});
		this.callParent(arguments); 
	},
	doSaveFrmTbl: function(rec){
		var me = this;
		if(me.frmTblGridStore.indexOf(rec) < 0){
			me.frmTblGridStore.add(rec);
		}
		me.frmTblGridStore.sync({success:function(){
			var fregId=rec.get('freg_id');
			me.frmTblGridStore.load({params:{freg_id:fregId}});
		}});
		this.frmTblGridStore.sort();
	}
	
});