Ext.define('erp.ux.SelectField', {
    extend: 'Ext.form.field.Text',
    alternateClassName:'ux.form.field.selectfield',
    xtype: 'selectfield',
	requires:['erp.ux.GridSearchPanel',
		'erp.ux.PagingBar',
		'erp.ux.GridSearchField'
	],
	hiddenField:null, //隐藏组件
    selWin:null,
    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            weight: 1,
            handler: 'onSelect'
        }
    },
    
    initComponent:function(){
    	var me = this;
	    var triggers = me.getTriggers();
    	triggers['search'].handler = Ext.isEmpty(me.openconfig)?null:me.onSelect;
		this.callParent();
		//me.selWin=me.createSelectWin();
		this.callParent(arguments);
    },
    
    onRender:function(ct, position){
		var me = this;
		me.hiddenField = new Ext.form.field.Hidden({name:me.hiddenName});
		me.up('panel').add(me.hiddenField);
		me.superclass.onRender.call(this, ct, position);
		this.setEditable(false);
    },
    
    onSelect:function(a,b,c){
    	var selWin = this.createSelectWin(a,b,c);
    	selWin.show();
    	this.selWin.show();
    },
    
    createSelectWin:function(){
    	var me = this;
    	if(me.selWin == null){
    		/*this.setEditable(me.openconfig.editable||false);
    		if(!me.openconfig.editable){
    			me.on({
    				focus:function(t,e){
    					me.onSelect();
    				}
    			})
    		}*/
    		var height = me.openconfig.height || 600;
    		var width = me.openconfig.width || 800;
    		var modal = me.openconfig.modal;
//    		var idKey = me.openconfig.codeid || me.hiddenName || 'id';
//    		var textKey = me.openconfig.codename || me.name ||'text';
    		var textKey=me.openconfig.diaplayField;
    		var idKey=me.openconfig.valueField;
    		var callback = me.openconfig.callback;
    		var singleSelect = Ext.isEmpty(me.openconfig.singleSelect)?true:me.openconfig.singleSelect;
    		var columns = me.openconfig.columns;
    		var selType = singleSelect?'rowmodel':'checkboxmodel';
    		var usePaging=me.openconfig.store.proxy.extraParams.usePaging||false;
    		if(me.openconfig.params!=null){
    			Ext.apply(me.openconfig.store.proxy.extraParams,me.openconfig.params);
    		}
    		var p_grid = Ext.create("Ext.grid.Panel",
    					{ selType:selType,
    					  border:true,
    					  store: me.openconfig.store,
    					  columns: columns,
    					  dockedItems:(usePaging?[
				    			{
						    		xtype : 'pagingbar',
						    		stateId : "pagingbar"+Ext.id(),
				                    stateId :Ext.id(),
						    		dock:'bottom',
						    		displayInfo:true,
						    		store: me.openconfig.store
						    	  }
				    		]:'')
    					  });
    		if(me.openconfig.autoLength){
	    		me.openconfig.store.on({
	    			'load':function(){
						erp.Util.gridAutoColumnsWidth(p_grid);
					}
	    		});
    		}
    		if(singleSelect){
    			p_grid.on("rowdblclick",function(gridpanel, record, tr, rowIndex, e, eOpts){
    				 if(record)me.selWin.onSubmit(idKey,textKey,callback);
    			});
    		}
    		me.selWin = Ext.create("Ext.window.Window",{
    			width:width,
    			height:height,
    			modal:modal,
    			maximizable:true,
    			closeAction:'hide',
    			glyph:0xf1b3,
    			title:me.openconfig.title||'基础数据帮助窗口',
				buttons : [
					{text : '确定',glyph:0xf058,handler: function(btn) {
						me.selWin.onSubmit(idKey,textKey,callback);
					}} ,
					{text:'退出',glyph:0xf057,handler: function(btn) {btn.up('window').hide();}}
				],
		    	layout:'fit',
		    	tbar:[{xtype : 'gridsearchfield',
							fieldLabel:'过滤条件',
							labelWidth:80,
							focusWidth:200,
							blurWidth:160,
							width:160,
							store:me.openconfig.store}],
		    	items:[p_grid],
		    	onSubmit : function(idKey,textKey,callback){
			    	var recs = p_grid.getSelectionModel().getSelection();
					if(Ext.isFunction(callback)){
						callback.cell(this,datas,a,b,c);
						this.hide();
					}else{
						var ids = [];
						var texts = [];
						Ext.each(recs,function(rec){
							ids.push(rec.get(idKey));
							texts.push(rec.get(textKey));
						});
						var oldValue=me.getValue();
						if(me.openconfig.insert){
							me.setValue(oldValue+texts.join(","));
						}else{
							me.setValue(texts.join(","));
						}
						if(me.openconfig.idKey){
							var form=me.up('form');
							if(form!=null){
								var field=form.down('#'+idKey);
								if(field!=null){
									field.setValue(ids.join(","));
								}
							}
						}
						//me.hiddenField.setValue(ids.join(","));
						this.hide();
					}
		    	}
		    });
    	}
    	me.openconfig.store.load();
    	return me.selWin;
    }
    
//    getHiddenValue:function(){
//    	if(this.hiddenField)
//       		return this.hiddenField.getValue();
//       	else
//       		return '';
//    },
//    
//    setValue:function(value){
//    	this.superclass.setValue.call(this,value);
//    	if(!Ext.isEmpty(value)){
//    		this.hiddenField.setValue("");
//    	}
//    }
});