Ext.define('erp.ux.QueryPanel',{
	extend:'Ext.panel.Panel',
	requires:['erp.common.basic.model.Condition'],
	alias : 'widget.queryPanel',
	layout : 'fit',
	rootStore:null,
	cboStore:null,
	initComponent : function() {
		var me=this;
		var data=[];
		var fs=Ext.create(me.rootStore.model).fields.items;
		Ext.each(fs,function(f){
		  if (f.alias!='data.field')
		 	 data.push({name:f.alias,value:f.name});
		});
		me.cboStore=Ext.create("Ext.data.Store",{
   	  	  				fields : [{name:'value'}, {name:'name'}],
   	  	  				data:data
   	  	  				});
		var store=Ext.create('Ext.data.Store',{
			model:'erp.common.basic.model.Condition'
		});
		Ext.apply(me,{
			items:[{
				xtype:'grid',
				itemId:'grdCondtion',
   	  	  		tbar:
   	  	  		[{text:"添加条件",iconCls:"add",handler:function(){
   	  	  		   var rec=Ext.create('erp.common.basic.model.Condition');
   	  	  		   store.add(rec);
   	  	  		}},{text:'删除条件',iconCls:'delete',handler:function(){
				 	var rec=me.getGrid().getSelectionModel().getSelection()[0];
				 	if (rec){
				 		store.remove(rec);
				 	}
   	  	  		}
   	  	  		}],
   	  	  		columns:[{header:"",xtype:'rownumberer',width:35},
   	  	  			{header:"条件名",dataIndex:'name',flex:2,editor:{
   	  	  				xtype:'combo',
   	  	  				typeAhead: true,
    		 	        triggerAction: 'all',
    		 	        selectOnTab: true,
   	  	  				displayField: 'name',
						valueField: 'value',
						store:me.cboStore
   	  	  			}
   	  	  			},
   	  	  			{header:"运算符",dataIndex:'compare',flex:1,editor:{
   	  	  				xtype:'combo',
   	  	  				typeAhead: true,
    		 	        triggerAction: 'all',
    		 	        selectOnTab: true,
   	  	  				store:Ext.create("Ext.data.Store",{
   	  	  				fields : ['value', 'name','type'],
   	  	  				data : [
								{'value':'>', 'name':'>','type':'num'},
								{'value':'<', 'name':'<','type':'num'},
								{'value':'=', 'name':'=','type':'normal'},
								{'value':'!=', 'name':'!=','type':'normal'},
								{'value':'like', 'name':'like','type':'char'}//,
								]}),
						displayField: 'name',
						valueField: 'value'		
   	  	  			}},
   	  	  			{header:"值",dataIndex:'value',flex:2,editor:{}},
   	  	  			{header:"连接符",dataIndex:'join',flex:1,editor:{
   	  	  				xtype:'combo',
   	  	  				store : [
								['and','and'],
								['or', 'or']
								]
   	  	  			}}
   	  	  		],
   	  	  		plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
						    	        clicksToEdit: 1
				})],
   	  	  		store:store,
   	  	  		buttons:[{text:"确认",iconCls:'zoom',itemId:'BTN_YES'},{text:"清空",iconCls:'zoom_out',handler:function(){
						var recs=store.getRange();	 
   	  	  				Ext.each(recs,function(rec){
   	  	  					store.remove(rec);
   	  	  				})
   	  	  			}
   	  	  		},{text:"关闭",iconCls:'cancel',handler:function(){
   	  	  			me.hide();		
   	  	  		}
   	  	  		}]
			}]
		});
		this.callParent(arguments);
	},
	getGrid:function(){
		var me =this;
		return me.down('#grdCondtion');
	},
	getConditions:function(){
		var me=this;
			var grid=me.getGrid();
			var recs=grid.getStore().getRange();
			var strWhere=""
			for(var i=0;i<recs.length;i++){
				var rec=recs[i];
			 if (rec.get('name')&&rec.get('compare')&&rec.get('value'))	
				{
				  strWhere+="("+rec.get('name')+(rec.get("compare")=="like"?" "+rec.get("compare")+" '%"+rec.get('value')+"%'":rec.get("compare")+"'"+rec.get("value")+"'")+")";
				}
				if(rec.get('join')!=null&&recs.length>i+1){
					strWhere+=rec.get('join');
				}
			 if (strWhere!=""&&Ext.isEmpty(rec.get('value'))){
				break;
			 }				
			}
			me.hide();
		return strWhere;
  }	
});