Ext.define('erp.common.basic.view.field.HelpField', {
	extend: 'Ext.container.Container',
	alias: 'widget.helpField',
	mixins: {
		field: 'Ext.form.field.Field'
	},
	requires: ['erp.common.basic.view.field.BasicField', 
	'erp.common.basic.view.field.CodeField'/*, 
	'erp.common.basic.view.field.FrmRegField', 
	'erp.common.basic.view.FregHelp',
	'erp.common.basic.view.BasicCodeHelp'*/
	],
	code: '',
	layout: {
        type: 'hbox',
        align: 'middle'
    },
	mode:"Button",
	config: {},
	fieldLabel: '',
	winOpen:false,
	xtypes: {},
	// 域组件参数
	fieldConfig: {},
	// 帮助窗口的配置参数
	winParam: null,
	//筛选参数
    filterParams:{},
	initComponent: function() {
		var me = this;
		var field;
		var items = [];
		var btn;
		var storeName=erp.DataConst.Config.findRecord('code',me.code,0,false,false,true).get('store');
		me.store=erp.DataUtil.createStoreFactory(storeName);
		// 字典的类型
		me.xtypes[erp.DataConst.DICTIONARY] = 'basicfield',
		// 普通基础数据
		me.xtypes[erp.DataConst.BASIC_CODE] = 'codefield',
		// 单据基础数据
		me.xtypes[erp.DataConst.FORM_CODE] = 'frmregfield';
		me.helprec =erp.DataUtil.findConfig(me.code);
		me.type = me.helprec ? me.helprec.get('type') : erp.DataConst.BASIC_CODE;
		items = me.createFields();
		Ext.apply(me, {
			items: items
		});
		me.callParent(arguments);
		
		if(!me.blindHidden){
		   var btn=me.createBlind();
		   me.getField().blind=btn;
		}
		/**
		 * 如果不把name置为null可能会出现，在form使用中，填两次值得情况
		 */
		if(me.name){
			me.name = null;
		}
		// 必须加入这行代码
		// getFocusEl方法的返回值作用于该变量，使焦点事件得到响应。
		//Ext.FocusManager.enable();
	},
	/**
	 * @override
	 */
	/*getFocusEl: function() {
		return this.el;
	},*/
	afterRender: function() {
		var me = this;
		me.callParent(arguments);
		// inputEl用于Ext.Editor的afterRender方法
		me.inputEl = me.getField().inputEl;
		Ext.create('Ext.util.DelayedTask',function(){
			me.inputEl.removeCls(me.getField().invalidCls + '-field');
		}).delay(200);
		
	},
	onRender: function() {
		var me = this;
		me.callParent(arguments);
		me.doc = Ext.getDoc();
	},
	/* ↓↓↓↓↓↓↓↓↓↓↓这里仿照Trigger的实现↓↓↓↓↓↓↓↓↓↓↓↓ */
	onFocus: function() {
		var me = this;
		me.callParent(arguments);
		if(!me.mimicing){
			me.mimicing = true;
			me.mon(me.doc, 'mousedown', me.mimicBlur, me, {
				delay: 10
			});
		}
	},	

	mimicBlur: function(e) {
		if(!this.isDestroyed && !this.el.contains(e.target)){
			this.triggerBlur(e);
		}
	},

	triggerBlur: function(e) {
		var me = this;
		me.mimicing = false;
		me.mun(me.doc, 'mousedown', me.mimicBlur, me);
		Ext.container.Container.superclass.onBlur.call(me, e);
	},
	// 禁用原始onBlur方法 这样可以保证焦点丢失的时候不自动产生blur事件
	// blur事件的触发由triggerBlur方法发起
	onBlur: Ext.emptyFn,
	/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑这里仿照Trigger的实现↑↑↑↑↑↑↑↑↑↑ */
	/**
	 * 构造field
	 */
	createFields: function() {
		var me = this, fields = [], field, button, xtype;
		xtype = me.xtypes[me.type];
		// field={};
		// /*field=me.initialConfig||{};*/
		// Ext.apply(field,me.initialConfig);
		field = me.initialConfig || {};
		Ext.apply(field, me.fieldConfig);
		delete field.margin; 
		delete field.padding;
		delete field.style;
		field.xtype = xtype;
		field.flex = 1;
		field.code = me.code;
		field.itemId = me.code;
		field.margin='0 0 0 0';
		field.queryDelay=1,
		field.store=me.store;
		//添加查找按钮
		field.triggers={
			bar: {
	            cls: 'x-form-search-trigger',
	            weight: 2,
	            handler: function() {
	                me.winOpen=true;
					me.onWindow();
	            }
	        }
		}
		fields.push(field);
		// 监听事件
		fields.listeners = {
			change: function(field, newValue, oldValue, eopts) {
				me.fireEvent('change', field, newValue, oldValue, eopts);
			}
		}
		return fields;
	},
	/**
	 * 构造按钮
	 */
	createButton: function() {
		var me = this;
		var button = Ext.widget('button', {
			iconCls: 'select_more',
			tooltip: '更多...',
			handler: function(btn) {
				/*me.getField().store.load();
				me.getField().expand();*/
				me.winOpen=true;
				me.onWindow();
			}
		});
		return button;
	},
	/**
	 * 帮助窗口初始化
	 */
	onWindow: function() {
		var me = this;
		var code = me.code;
		var window;
		var field = me.getField();
		var valueField = field.valueField;
		var callback = function(value, trigger) {
			if(me.column){
				var grid=me.column.up('grid');
				var rec=grid.getSelectionModel().getSelection()[0];
				rec.set(me.column.dataIndex,value);
			}
			if(me.callback){
				me.callback(value, trigger);
			}
			trigger.setValue(value);
			/*
			 * if(me.type==erp.DataConst.FORM_CODE){ trigger.store=this.store }
			 */
			record = trigger.findRecordByValue(value);
			me.isvalid = true;
			me.fireEvent('startWinSelect');
			trigger.collapse();
			if(me.editor){
				me.winOpen=false;
				me.editor.completeEdit();
			}
		};
		if(me.type == erp.DataConst.FORM_CODE){
			me.window = Ext.widget('freg_help', {
				code: me.code,
				winParam: me.winParam
			});
		}else if(me.type == erp.DataConst.BASIC_CODE){
			var windowType = erp.DataConst.Config.findRecord('code', me.code, 0, false, false, true).get('view');
			me.window = Ext.widget(windowType, {
				winParam: me.winParam,
				store:me.store,
//				title:"基础数据查询帮助",
				listeners:{
				  close:function(){
				      me.winOpen=false;
				  }
				}
			});
		}
		else if(me.type = erp.DataConst.DICTIONARY){
		me.window=Ext.widget('basic_codehelp',{
		   winParam: me.winParam,
		   type_code:me.code
		});
		}
		me.window.initWindow(callback, valueField, field, me.listConfig);
//	    me.window.setFilter(me.fieldConfig.filterParams);
		me.isvalid = false;
		me.fireEvent('startWinSelect');
	},
	getField: function() {
		var me = this;
		return me.down(me.xtypes[me.type]);
	},
	/**
	 * 设置只读方法
	 */
	setReadOnly: function(readOnly) {
		var me = this;
		me.btn.setVisible(!readOnly);
		me.getField().setReadOnly(readOnly);
	},
	/**
	 * 
	 */
	setValue: function(value) {
		var me = this;
		me.getField().setValue(value);
	},
	getValue: function() {
		var me = this;
		return me.getField().getValue();
	},
	isValid: function() {
		var me = this;
		me.getField().preventMark=me.preventMark;
		if(!me.isvalid){
			return me.getField().isValid();
		}
		return me.isvalid;
	},
	/**
	 * 
	 */
	createBlind:function(){
		var me=this;
		var btn=Ext.create('Ext.button.Button',{
            text:"更多...",
            flex:1,
            itemId:"blindBtn",
            listeners:{
              afterrender:function(){
                 btn.btnEl.dom.itemTagId="blindBtn";
              }
            },
			handler:function(){
				 me.winOpen=true;
				 me.onWindow();
				 me.getField().collapse();
			}
		});
		me.blind=btn;
		return btn;
	},
	collapse:function(){
	   var me=this;
	   var field=me.getField();
	   if(field.isExpanded){
	   field.collapse();
	   }
	},
	clearInvalid :function(){
	this.getField().clearInvalid();
	},
	renderActiveError:function(){
	this.getField().renderActiveError();
	},
	isDirty : function() {
        var me = this;
        return !me.disabled && !me.isEqual(me.getValue(), me.getField().originalValue);
    }
});