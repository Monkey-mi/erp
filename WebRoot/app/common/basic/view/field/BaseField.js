/**
 * 基础数据基础field
 */
Ext.define('erp.common.basic.view.field.BaseField',{
	extend:'Ext.form.field.ComboBox',
	alias:'widget.baseField',
	store:null,
	code:null,
	forceSelection:true,
	valueVisible:false,
	nameVisible:true,
	hideHeaders:true,
	focused:true,
	minChars:1,
	typeAhead:true,
	hasSearch:false,
	autoComplete:true,
	tempData:{},
	cleartriggerEnable:false,
	hide1Trigger:true,
	initComponent:function(){
		var me=this;
		me.on('beforequery',function(queryEvent){
			regExp=new RegExp("'", 'g');
			queryEvent.query=queryEvent.query.replace(regExp,'');
		})
		if(me.cleartriggerEnable){
		me.trigger1Cls=Ext.baseCSSPrefix+'form-clear-trigger',
	    me.trigger2Cls=Ext.baseCSSPrefix + 'form-trigger';
		}else{
		me.onTrigger1Click=null;
		}
		me.createField();
		me.createStore();
		me.callParent(arguments);
		me.store.getProxy().setExtraParam('usePaging',true);
		Ext.apply(me.store.getProxy().extraParams,me.filterParams);
	},
	afterRender:function(){
		var me=this;
		me.callParent(arguments);
		if(me.hide1Trigger&&me.cleartriggerEnable){
		  me.triggerCell.item(0).setDisplayed(false);
		  me.setWidth(me.getWidth());
		}
	},
	//覆盖原有方法
    onTypeAhead: function() {
        var me = this,
            displayField = me.displayField,
            record = me.store.findRecord(displayField, me.getRawValue()),
            boundList = me.getPicker(),
            newValue, len, selStart;
        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = me.getRawValue().length;
            //boundList.highlightItem(boundList.getNode(record));
            if (selStart !== 0 && selStart !== len) {
                //me.setRawValue(newValue);
                //me.selectText(selStart, newValue.length);
            }
        }
    },
	/**
	 * 创造下拉store
	 */
	createStore:Ext.emptyFn,
	/**
	 * 创造下拉field
	 */
	createField:Ext.emptyFn,
	/**
	 * 初始化键盘事件
	 */
	initEvents:function(){
		var me=this;
		this.callParent(arguments);
		this.on('keydown',me.onKeyDown);
		this.on('blur',me.inblur);
		this.on('focus',me.infocus);
		//this.on('keyup',me.onKeyUp);
		/*this.on('change',me.onChange);*/
	},
	inblur:function(){
	var me=this;
	me.focused=false;
	},
	infocus:function(){
	 var me=this;
	 me.focused=true;
	},
	/**
	 * 按钮放开事件
	 */
	onKeyUp:function(e,t){
		var me=this; 
		var key=e.getKey();
		if(me.readOnly){
		  return;
		}
		if(key==9){
		me.callParent(arguments);
		return;
		} 
		me.tempData["preparData"]=me.getRawValue();
		if(me.autoComplete){
		me.FuzzSearch(key,e);
		}
		me.KeyChangeSelect(key,e);
		if(!me.hasSearch){
		  this.triggerCell.item(0).setDisplayed(true);
		  me.hasSearch=true;
		}
	},
	KeyChangeSelect:function(key,e){
		var me=this; 
		var value=me.getValue();
		if(!me.picker){
			me.picker=me.createPicker();
		}
		var store=me.picker.getStore();
		var idx=store.indexOf(me.select);
		if(!me.isExpanded){
			me.expand();
		}
		if(key==e.ENTER){
			if(me.picker.getSelectionModel().getSelection().length==1){
				me.setValue(me.picker.getSelectionModel().getSelection()[0].get(me.valueField));
				me.collapse();
				return;
			}else if(me.picker.getSelectionModel().getSelection().length>1){
					me.setValue(me.picker.getSelectionModel().getSelection()[0].get(me.listConfig.returnField));
					me.collapse();
					return;
			}
		}
		//按向下则选择框向下位移一行
		else if(key==e.UP){
			if(idx==0){
				me.picker.getSelectionModel().select(store.getRange().length-1);
				me.select=me.picker.getSelectionModel().getSelection()[0];
			}else if(idx==-1){
				me.picker.getSelectionModel().select(store.getRange().length-1);
				me.select=me.picker.getSelectionModel().getSelection()[0];
			}else{	
				me.picker.getSelectionModel().select(idx-1);
				me.select=me.picker.getSelectionModel().getSelection()[0];
			}
		}
		//按向上则选择框向上位移一行
		else if(key==e.DOWN){
			if(idx==this.store.getRange().length-1){
				me.picker.getSelectionModel().select(0);
				me.select=me.picker.getSelectionModel().getSelection()[0];
			}else if(idx==-1){
				var a=me.picker.getSelectionModel();
				me.picker.getSelectionModel().select(0);
				me.picker.getSelectionModel().selected.add(me.picker.getStore().getRange()[0]);
				me.select=me.picker.getSelectionModel().getSelection()[0];
			}else{
				me.picker.getSelectionModel().select(idx+1);
				me.select=me.picker.getSelectionModel().getSelection()[0];
			}
		}
	},
	/**
	 * 
	 */
	createColumns:Ext.emptyFn,
	FuzzSearch:Ext.emptyFn,
	onKeyDown:function(e,o){
		this.oldValue=this.getValue();
	},
	createPicker:function(){
		var me=this;
		me.PickEventListeners();
	},
	PickEventListeners:function(){
		var me=this;
		me.mon(me.picker, {
            itemclick: me.onItemClick,
            scope: me
        });
		me.mon(me.picker.getSelectionModel(), {
            'beforeselect': me.onBeforeSelect,
            'beforedeselect': me.onBeforeDeselect,
            'selectionchange': me.onListSelectionChange,
            scope: me
        });
		if(!me.matchFieldWidth){
			me.picker.setWidth(me.pickerWidth);
	 }
	},
	onListSelectionChange:function(list, selectedRecords){
		  var me = this,
	        isMulti = me.multiSelect,
	        hasRecords = selectedRecords.length > 0;
	    if (!me.ignoreSelection && me.isExpanded) {
	        if (hasRecords) {
	            me.fireEvent('select', me, selectedRecords);
	        }
	       if (isMulti || hasRecords) {
	            me.setValue(selectedRecords, false);
	            me.triggerCell.item(0).setDisplayed(true);
	        }
	        me.inputEl.focus();
	}
	    },
	onItemClick:function(view,record){
		var me = this,
        lastSelection = me.lastSelection,
        valueField = me.valueField,
        selected;
    if (!me.multiSelect) {
            me.displayTplData = [record.data];
            me.setValue(record.get(me.valueField));
            me.triggerCell.item(0).setDisplayed(true)
            me.collapse();
    }
	},
	/**
	 * 下拉收回
	 */
	onCollapse: function() {
		   var me = this,
	       keyNav = me.listKeyNav;
	   if (keyNav) {
	       keyNav.disable();
	       me.ignoreMonitorTab = false;
	   }
	},
	doAutoSelect:Ext.emptyFn,
	/**
	 * 展开事件
	 */
	onExpand: function() {
	     var me = this,
	     keyNav = me.listKeyNav,
	     selectOnTab = me.selectOnTab,
	     picker = me.getPicker();
	     if (selectOnTab) {
	         me.ignoreMonitorTab = true;
	     }
	     me.inputEl.focus();
	},
	onRender:function(){
    	this.callParent(arguments);
    	 var menuCls = Ext.baseCSSPrefix + 'menu';
    	if(this.picker){
    	this.picker.cls=this.el.up('.' + menuCls) ? menuCls : '';
    	}
    },
	getSelModel:function(){
	      var me=this;
		  var selModel= this.picker.getSelectionModel();
		  selModel.views=[];
		  selModel.views.push(selModel.view);
		  selModel.store=me.store;
		  return selModel;
	},
	assertValue: function() {
        var me = this,
            value = me.getRawValue(),
            rec;
        if (me.forceSelection) {
            if (me.multiSelect) {
                // For multiselect, check that the current displayed value matches the current
                // selection, if it does not then revert to the most recent selection.
                if (value !== me.getDisplayValue()) {
                    me.setValue(me.lastSelection);
                }
            } else {
                // For single-select, match the displayed value to a record and select it,
                // if it does not match a record then revert to the most recent selection.
                rec = me.findRecordByDisplay(value);
                if (rec) {
                    me.select(rec);
                } else {
                    me.setValue(me.lastSelection);
                }
            }
        }
        me.collapse();
    },
    //重写基类方法
    collapse: function() {
        var me = this;
        if (me.isExpanded && !me.isDestroyed && !me.destroying) {
            var openCls = me.openCls,
                picker = me.picker,
                aboveSfx = '-above';
            
            picker.hide();
            me.isExpanded = false;
            
            me.bodyEl.removeCls([
                openCls,
                openCls + aboveSfx
            ]);
            picker.el.removeCls(picker.baseCls + aboveSfx);
            if(me.hideListeners!=null){
            	me.hideListeners.destroy();
            }
            Ext.un('resize', me.alignPicker, me);
            me.fireEvent('collapse', me);
            me.onCollapse();
        }
    },
	expand: function() {
	    var me = this,
	        bodyEl, picker, collapseIf;
	    if (me.rendered && !me.isExpanded && !me.isDestroyed) {
	        bodyEl = me.bodyEl;
	        picker = me.getPicker();
	        collapseIf = me.collapseIf;
	        picker.show();
	        me.isExpanded = true;
	        me.alignPicker();
	        bodyEl.addCls(me.openCls);
	        me.mon(Ext.getDoc(), {
	            mousewheel: collapseIf,
	            mousedown: collapseIf,
	            scope: me
	        });
	        //Ext.EventManager.onWindowResize(me.alignPicker, me);
	        me.fireEvent('expand', me);
	        me.onExpand();
	    }
	},
	//生成显示值方法
	initDisplayValue:function(name,code,displayMode){
		var me,
		    value;
		    me=this;
		    switch(displayMode){
		    case 1:
		    	value="values['"+name+"']";
		    	break;
		    case 2:
		    	value="values['"+code+"']";
		    	break;
		    case 3:
		    	value="values['"+name+"']+' '+values['"+code+"']";
		    	break;
		    case 4:
		    	break;
		    }
		    return  value;
	},
	//生成显示值方法（员工）
	initDisplayEmpValue:function(name,code,displayMode){
		var me,
		    value;
		    me=this;
		    switch(displayMode){
		    case 1:
		    	value=name;
		    	break;
		    case 2:
		    	value=code;
		    	break;
		    case 3:
		    	value=name+" +"+code;
		    	break;
		    case 4:
		    	break;
		    }
		    return  value;
	},
	//表达式解析
	initRegExpDisplayValue:function(){
		 var me=this;
		 var nameValue=me.nameValue || "values['"+me.displayField+"']";
		 var codeValue=me.codeValue || "values['"+me.valueField+"']";
		 var reg=me.displayMode || '{n}';
		 var value="";
	     value = reg.replace(/\{n\}/ig, nameValue).replace(/\{c\}/ig,codeValue);
	     return value;
	},
	doQuery:function(queryString, forceAll, rawQuery){
		 queryString = queryString || '';

        // store in object and pass by reference in 'beforequery'
        // so that client code can modify values.
        var me = this,
            qe = {
                query: queryString,
                forceAll: forceAll,
                combo: me,
                cancel: false
            },
            store = me.store,
            isLocalMode = me.queryMode === 'local',
            needsRefresh;

        if (me.fireEvent('beforequery', qe) === false || qe.cancel) {
            return false;
        }

        // get back out possibly modified values
        queryString = qe.query;
        forceAll = qe.forceAll;

        // query permitted to run
        if (forceAll || (queryString.length >= me.minChars)) {
            // expand before starting query so LoadMask can position itself correctly
            me.expand();

            // make sure they aren't querying the same thing
            if (!me.queryCaching || me.lastQuery !== queryString) {
                me.lastQuery = queryString;

                if (isLocalMode) {
                    // forceAll means no filtering - show whole dataset.
                    store.suspendEvents();
                    needsRefresh = me.clearFilter();
                    if (queryString || !forceAll) {
                        me.activeFilter = new Ext.util.Filter({
                            root: 'data',
                            property: me.displayField,
                            value: queryString
                        });
                        store.filter(me.activeFilter);
                        needsRefresh = true;
                    } else {
                        delete me.activeFilter;
                    }
                    store.resumeEvents();
                    if (me.rendered && needsRefresh) {
                        me.getPicker().getView().refresh();
                    }
                } else {
                    // Set flag for onLoad handling to know how the Store was loaded
                    me.rawQuery = rawQuery;

                    // In queryMode: 'remote', we assume Store filters are added by the developer as remote filters,
                    // and these are automatically passed as params with every load call, so we do *not* call clearFilter.
                    if (me.pageSize) {
                        // if we're  paging, we've changed the query so start at page 1.
                        me.loadPage(1);
                    } else {
                        store.load({
                            params: me.getParams(queryString)
                        });
                    }
                }
            }

            // Clear current selection if it does not match the current value in the field
            if (me.getRawValue() !== me.getDisplayValue()) {
                me.ignoreSelection++;
                me.picker.getSelectionModel().deselectAll();
                me.ignoreSelection--;
            }
            if (isLocalMode) {
                me.doAutoSelect();
            }
            if (me.typeAhead) {
                me.doTypeAhead();
            }
        }
        return true;
	},
	onBlur :function(){
	 var me=this;
	 me.preventMark=false;
	 me.callParent(arguments);
	},
	initTrigger:function(){
	 this.callParent(arguments);
	},
    //清除按钮点击事件
    onTrigger1Click:function(){
      var me=this;
      me.setValue('');
      me.hasSearch=false;
      this.triggerCell.item(0).setDisplayed(false);
    },
     select: function(r) {
        this.setValue(r, true);
    },
     getTriggerMarkup: function() {
        var me = this,
            i = 0,
            hideTrigger = (me.readOnly || me.hideTrigger),
            triggerCls,
            triggerBaseCls = me.triggerBaseCls,
            triggerConfigs = [];

        // TODO this trigger<n>Cls API design doesn't feel clean, especially where it butts up against the
        // single triggerCls config. Should rethink this, perhaps something more structured like a list of
        // trigger config objects that hold cls, handler, etc.
        // triggerCls is a synonym for trigger1Cls, so copy it.
        if (!me.trigger1Cls) {
            me.trigger1Cls = me.triggerCls;
        }

        // Create as many trigger elements as we have trigger<n>Cls configs, but always at least one
        for (i = 0; (triggerCls = me['trigger' + (i + 1) + 'Cls']) || i < 1; i++) {
            triggerConfigs.push({
                tag: 'td',
                valign: 'top',
                cls: Ext.baseCSSPrefix + 'trigger-cell',
                style: 'width:' + me.triggerWidth + (hideTrigger ? 'px;display:none' : 'px'),
                cn: {
                    cls: [Ext.baseCSSPrefix + 'trigger-index-' + i, triggerBaseCls, triggerCls].join(' '),
                    role: 'button'
                }
            });
        }
        triggerConfigs[i - 1].cn.cls += ' ' + triggerBaseCls + '-last';

        return Ext.DomHelper.markup(triggerConfigs);
    }
});