/**
 * 基础数据下拉
 */
Ext.define('erp.common.basic.view.field.CodeField',{
	extend:'erp.common.basic.view.field.BasicField',
	alias:'widget.codefield',
	queryMode:'remote',
	hideHeaders:true,
	keypress:false,
	hideTrigger: false,
	load:false,
	initComponent:function(){
		var me=this;
		me.displayField=erp.DataConst.Config.findRecord('code',me.code,0,false,false,true)?erp.DataConst.Config.findRecord('code',me.code,0,false,false,true).get('displayField'):"name";
		me.valueField=erp.DataConst.Config.findRecord('code',me.code,0,false,false,true)?erp.DataConst.Config.findRecord('code',me.code,0,false,false,true).get('valueField'):"value";
		me.callParent(arguments);
		/*if(me.code=='employee'){
			me.nameValue="values['lastname']+values['firstname']";
			me.codeValue="values['emp_code']";
		}*/
		value=me.initRegExpDisplayValue();
		   //构造显示模板
			me.displayTpl = Ext.create('Ext.XTemplate',
		            '<tpl for=".">' +
		                '{[typeof values === "string" ? values : '+value+']}' +
		                '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' +
		            '</tpl>'
		        );
		me.setValue(me.value);
	},
	/**
	 * 重写寻找需要的rec的方法
	 */
	findRecord:function(field,value){
		var me=this;
		var rec;
		rec=erp.DataUtil.findRecByStore(me.code,field,value);
		if(!rec&&value!=null&&value!=""){
			var url=me.store.getProxy().api.read?me.store.getProxy().api.read:me.store.getProxy().url;
			var params={
			 mode:'RawValue'
			};
			params[me.valueField]=value;
		  Ext.Ajax.request({
		    url:url,
		    params:params,
		    async:false,
		    success:function(resp){
		    var text=Ext.decode(resp.responseText);
		    if(!Ext.isEmpty(text.data)){
		   	 erp.DataUtil.addRec(me.code,text.data);
		    }
		    }
		  });
		}
		return erp.DataUtil.findRecByStore(me.code,field,value);
	},
	createPicker:function(){
		var me=this;
		var columns=me.createColumns();
		var width=200;
		if(me.getWidth()){
		width=me.getWidth();
		}
		me.picker=Ext.create('Ext.grid.Panel',{
			ownerCt: me.ownerCt,
			store:me.store,
			columns:columns,
			width: width,
   			height: 280,
		    layout:'fit',
		    bbar: me.blind ? [me.blind] : null,
		    selModel:{
		    	mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
		     },
		    floating: true,
            focusOnShow: true,
            focusOnToFront: false,
   		    pickerField: me,
   		    hideHeaders:me.hideHeaders,
   		    columnLines:false
		});
		me.picker.getView().loadMask=false;
		me.PickEventListeners();
		return me.picker;
	},
	setValue:function(v){
	  var me=this;
	  if(typeof(v)=="undefined"||v==null){
	  		return;
	  }
	  if(v!=null&& typeof(v)!='object'&&typeof(v)!='undefined'&& Ext.String.trim(v)!=''&&!me.load){
		  if(me.store.getCount()==0){
		  	me.load=true;
		  	 me.store.load({params:{query:v},callback:function(recs){
		  	 	if(recs.length==0&&!me.load){
		  	 		me.store.load();
		  	 	}
		  	 }});
		  }
	  }
	  me.callParent(arguments);
	},
	/**
	 * 初始化store
	 */
	createStore:function(){
		var me=this;
		if(me.store==null){
			var storeName=erp.DataConst.Config.findRecord('code',me.code,0,false,false,true).get('store');
			me.store=erp.DataUtil.createStoreFactory(storeName);
		}
		//	添加员工过滤条件
		//if (!erp.Util.currentUser.isAdmin &&!Ext.isEmpty(erp.Util.currentUser.accountMap))
		me.store.getProxy().setExtraParam('usePaging',true);
		me.store.getProxy().setExtraParam('limit',20);
		Ext.apply(me.store.getProxy().extraParams,me.filterParam);
		if(!me.params){
		me.params={};
		}
		me.store.getProxy().setExtraParam('czy_gh',erp.Util.currentUser.isAdmin?'wj':erp.Util.currentUser.accountMap[0].ref_u_id);
		Ext.apply(me.params,me.filterParam);
	},
	initRegExpDisplayValue:function(){
		 var me=this;
		 var nameValue=me.nameValue || "values['"+me.displayField+"']";
		 var codeValue=me.codeValue || "values['"+me.valueField+"']";
		 var reg=me.displayMode || '{n}';
		 var value="";
	     value = reg.replace(/\{n\}/ig, nameValue).replace(/\{c\}/ig,codeValue);
	     return value;
	},
	/**
	 * 模糊搜索
	 */
	FuzzSearch:function(key,e){
		var me=this;
		if(!me.keypress){
			me.keypress=true;
				Ext.create('Ext.util.DelayedTask', function(){
					if(!me.isExpanded){
						me.expand();
					}
					if(!me.params){
						me.params={};
					}
					//添加附加参数
					//华慧 2015-03-14
					if (me.filterParams){
						me.params=me.filterParams;
					}
					me.params.mode="Screening";
					me.params.condition=me.getValue();
					me.params.type_code=me.code;
					me.params.start=0;
					me.params.limit=10;
					me.params.usePaging="true";
					me.params.mode="main";
					me.params.fld={fld:[me.displayField,me.valueField]};
					var url=me.store.getProxy().api.read?me.store.getProxy().api.read:me.store.getProxy().url;
					if(me.store.loading){
					return;
					}
					me.store.remove(me.store.getRange());
					Ext.Ajax.request({
					   url:url,
					   params:me.params,
					   success:function(resp){
					   var text=Ext.decode(resp.responseText);
					   me.store.loadData(text.data,true);
					   me.keypress=false;
					   }
					});
				}).delay(1500);
		}
	}
});