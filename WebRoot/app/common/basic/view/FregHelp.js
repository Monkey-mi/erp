/**
 * 单据数据帮助
 */
Ext.define('erp.common.basic.view.FregHelp',{
	extend:"erp.common.basic.view.helpwin.BaseHelpWin",
	requires:['erp.util.form.FormUtil',
	          'erp.common.form.view.TblFldFrm',
	          'erp.common.form.view.TblFrmFld'],
	alias:"widget.freg_help",
	title:"单据帮助",
	width : 1000,
	height:0.6*window.screen.height,
	layout:'fit',
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;
		var columns = [];
		var reg=erp.DataUtil.findRecByStore(erp.DataConst.FRMREG_STOREID,'code',me.code);
        me.tbl=erp.DataUtil.findRecByStore(erp.DataConst.FRMTBL_STOREID,'freg_id',reg.get('freg_id'));
        var renderStore=erp.DataUtil.getStoreByStoreManager(tp.DataConst.FRMRENDER_STOREID);
        me.fields=me.tbl.frmFldsStore;
        renderStore.filter({
        	property:'freg_id',value:reg.get('freg_id')
        });
        renderStore.findRecord('render_type','FS_LIST',0,false,false,true);
        var i=0;
        Ext.Ajax.request({
        	url:'form/Forms.do?method=getFrmRenderByCode',
        	method:'post',
        	params:{
        		code:me.tbl.get('code')
        	},
        	async:false,
        	success:function(resp){
        		var text=Ext.decode(resp.responseText);
        		Ext.each(text.data,function(render){
        			var rec=Ext.create("erp.common.form.model.FrmRender",render);
        			if(render.render_type=="FS_LIST"){
        				me.Listform=Ext.widget('gpFE_Form',{
        					itemId:'Master_List',
        					mode: 'runtime',
        					renderRec:rec,
        					renderType: render.render_type,
        					xml: render.master_xml,
        					listeners:{
        						afterrender:function(){
        							me.store=this.getListGrid().getStore();
        							me.store.getProxy().tbl=me.tbl.get('code');
        							me.store.getProxy().fld=me.fields;
        							var json=erp.FormUtil.initLoadParams(me.tbl.get("code"),me.fields.getRange());
        							me.store.load({
        								params:{data:Ext.encode(json)}
        							});
        						}
        					}
        				   });
        			 me.freg_id=render.freg_id;
        			}
        		});
        		
        	}
        });
       Ext.apply(me,{
    	   items:[
					{
						xtype:'grid',
						store:Ext.create('tp.setup.store.OrgUnits'),
						columns:[
						         {text:'ou_code',dataIndex:'ou_code',flex:1}
						         ]
					}
    	          ]
       });
		Ext.apply(me, {
			items : [ {
				layout:'border',
				items:[{
					layout:"border",
					flex:2,
					region:'center',
					items:[{
						xtype:'panel',
						region:"center",
						itemId:'MasterPanel',
						flex:2,
						layout:'fit',
						tbar:[
						      {xtype:'textfield',itemId:'searchtext'},
						      {text:'搜索',handler:function(){
						    	  var win=this.up('gpWindow');
						    	  win.search();
						      }},
						      {text:'高级搜索',handler:function(){
						    	  var win=this.up('gpWindow');
						    	  win.allSearch();
						      }}
						      ],
						items:[/*{
							xtype:'grid',
							store:Ext.create('tp.setup.store.OrgUnits'),
							columns:[
							         {text:'ou_code',dataIndex:'ou_code',flex:1}
							         ]
						}*/me.Listform]
					}
					]
				}, {
					region : 'east',
					xtype : 'tblFldFrm',
					flex : 1,
					ft_id : me.tbl.get("ft_id"),
					freg_id:reg.get("freg_id"),
					itemId : 'fldfrm',
					hidden : true,
					bbar : [ {
						text : "搜索",
						action : "ACT_SAVE",
						iconCls : "page_saveIcon",
						handler : function(btn) {
							me.highSearch();
						}
					}, {
						text : "关闭",
						action : "ACT_CLOSE",
						iconCls : "page_cancelIcon",
						handler : function(btn) {
							me.down('#fldfrm').getForm().reset();
							me.down('#fldfrm').setVisible(false);
						}
					} ]
				}]
			}],
			buttons:[ {text:'确认',action:'ACT_SAVE',iconCls:"page_save",listeners:{
           	 click:me.BtnClick
            }},
            {text:'关闭',action:'ACT_CLOSE',iconCls:"page_error",listeners:{
           	 click:me.BtnClick
            }}]
		});
		me.callParent(arguments);
	},
	afterRender:function(){
		var me=this;
		me.callParent(arguments);
	},
		initWindow:function(callback,displayField,trigger){
			this.displayField=displayField;
			this.callbackFn=callback;
			this.trigger=trigger;
			this.show();
		},
		BtnClick:function(btn){
			var win=btn.up('window');
			switch(btn.action){
			case 'ACT_SAVE':
				win.BtnSure();
		      break;
			case 'ACT_CLOSE':
				win.close();
				break;
			case 'ACT_FILTER':
				me.filter();
				break;
			}
		},
		getGrid:function(){
		     var me=this;
		     return me.down('#Master_List').getListGrid().fieldCmp;
		},
		BtnSure:function(){
			var me=this;
			var rec=me.getGrid().getSelectionModel().getSelection()[0];
			if(!rec){
				me.close();
				return;
			}
			me.callbackFn(rec,me.trigger);
			me.close();
		},
		search:function(){
		var me=this;
		me.store.proxy.url="form/FormService.do?method=selectFormDataByHelp";
		var json=tp.FormUtil.initLoadParams(me.tbl.get("code"),me.fields.getRange());
		delete me.store.proxy.extraParams.data;
		me.down('#searchtext').getValue();
		var params={};
		params.mode="screen";
	    params.condition=me.down('#searchtext').getValue();
		var fld=[];
		var fields=me.down('#Master_List').getListGrid().fieldCmp.columns;
		Ext.each(fields,function(field){
            if(field.dataIndex != ""&&field.dataIndex != null){
            	fld.push(field.dataIndex);
            }
		});
		params.fld={fld:fld};
		params.data=Ext.encode(json);
		me.store.load({
			params:params
		});
		},
		filter:function(){
			var me=this;
			var fld=[];
			var where_str="";
			me.store.proxy.url="form/FormService.do?method=selectFormDataByHelp";
			var rec=me.inputform.getRecord(me.tbl.code,true);
			var fields=rec.fields.items;
			//通过筛选界面中的rec的值来构建where语句，有值的字段加入where语句中
			for(var i=0; i<fields.length; i++){
				if(rec.get(fields[i].name)!=null&&rec.get(fields[i].name)!=""&&rec.get(fields[i].name)!=0){
					if(i==0){
						where_str=fields[i].name+"="+rec.get(fields[i].name);
					}else{
						where_str=where_str+" and "+fields[i].name+"="+rec.get(fields[i].name);
					}
				}
			}
			var json=tp.FormUtil.initLoadParams(me.tbl.code,me.fld.getRange(),where_str);
			me.store.load({
				params:{
					mode:"main",
					data:Ext.encode(json)
				}
			});
			Ext.log("'"+where_str+"'");
		},
		allSearch:function(){
			var me=this;
			me.store.proxy.url="form/FormService.do?method=selectFormDataByHelp";
			me.down('#fldfrm').setVisible(true);
			/*var editwin=Ext.widget('edit_searchform',{
				ft_id:me.tbl.ft_id,
				tbl:me.tbl,
				fld:me.fld,
				store:me.store
			});*/
			/*editwin.show();*/
		},
		highSearch:function(){
			var	me=this;
			me.store.proxy.url="form/FormService.do?method=selectFormDataByHelp";
			var fldform=me.down('#fldfrm');
			var where_str=fldform.getWhereStr();
			var json=tp.FormUtil.initLoadParams(me.tbl.get("code"),me.fields.getRange(),where_str);
			me.store.proxy.extraParams.data=Ext.encode(json);
			me.store.load({
				params:{
					mode:'main'
				}
				/*params:{
					data:Ext.encode(json)
				}*/
			});
		}
});