Ext.define('erp.ux.Window',{
	extend: 'Ext.window.Window',
	alias: 'widget.commonWindow',
//	requires:['gp.basic.view.helpWin.ContentHelpWin'],
	alternateClassName: 'erp.Window',
	constrainHeader:true,
	layout: 'fit',
	width: 400,
	maximizable:true,
	closeToolText: '关闭',
	config:{
		isAddNew:false
	},
	constructor: function(cfg) {
		this.callParent(arguments);
        this.initConfig(cfg);
    },
	listeners:{
		beforeclose:function(panel){
			if(panel.isEdit){
				var mes=confirm('真的要关闭此页面吗?');
				return mes;
			}
		},
		'close':function(panel){
			//panel.destroy();
		},
		destroy:function(panel){
			//如果有定时器停止
			if(panel.task!=null){
				panel.task.destroy();
			}
			if(panel.bills_num!=null&&panel.bills_id!=null){
				erp.Util.deleteExclusive(panel.bills_num,panel.bills_id);
			}
		},
		show:function(){
			//为了兼容IE浏览器,此处只能延后30ms以后执行才有效
			me= this;
			Ext.create('Ext.util.DelayedTask',function(){
				var cmp = me.down('#firstFocusOn');
				if(cmp)
					cmp.focus(false);
			}).delay(30);
		},
		afterrender : function(cmp) {
			// 根据modFuncsDisabled设置按钮的disable/enable
			for (prop in cmp.modFuncsDisabled) {
				btn = cmp.down('#' + prop);
				if (btn) {
					// 设置按钮初始状态
					if (!btn.disabled)
						btn.setDisabled(cmp.modFuncsDisabled[prop]);
					// 在按钮状态enable发生时检查权限
					btn.on('enable',function(btnCmp){
						if (this.modFuncsDisabled[btnCmp.itemId])
							btnCmp.setDisabled(this.modFuncsDisabled[btnCmp.itemId]);
					}, cmp);
				}
			}
			// 自动设置grid控件中的行选择变化时的功能按钮变化
			// 因为按钮ID可以是自定义的，所以这里就只能管到预定义的几个
			// 其余的需要模块自行处理
			var gridpanels = cmp.query('gridpanel');
			Ext.each(gridpanels, function(grid) {
				grid.on ('cellclick',function(tab, td, cellIndex, record, tr, rowIndex, e, eOpts){
					erp.Util.SearchPanel.grid=tab.up('grid');
					erp.Util.SearchPanel.cellIndex=cellIndex;
					erp.Util.SearchPanel.record=record;
					var columns=tab.up('grid').columnManager.columns;
					var property=columns[cellIndex].dataIndex;
			    	erp.Util.SearchPanel.value=record.get(property);
				});
				grid.on ('itemcontextmenu',function(grd,rec,item,idx,e){
					 Ext.create('Ext.menu.Menu',{
					 	width: 150,
					    margin: '0 0 10 0',
//					    floating: false,  // 通常你想设置这个为真 (默认的)
					    items: [{
					        text: '复制单元格',
					        xtype:'',
					        iconCls:'page_copy',handler:function(){
					        	if(Ext.isEmpty(erp.Util.SearchPanel.value)){
					        		Ext.toastInfo('请选择需要复制的单元格！');
					        		return ;
					        	}
					        },
					    	listeners:{
					    		afterrender:function(c){
					    			clip = new ZeroClipboard.Client();
					    			ZeroClipboard.setMoviePath( "resources/js/zeroclipboard/ZeroClipboard.swf" ); 
									clip.setHandCursor( true );
									clip.addEventListener('load', function (client) {
									});
									clip.addEventListener('mouseOver', function (client) {
										// update the text on mouse over
										clip.setText(erp.Util.SearchPanel.value);
									});
									clip.addEventListener('complete', function (client, text) {
									});
									
									clip.glue(c.id+'-itemEl',c.id);
					    		}
					    	}
					    },
					    {text: '导出Excel',iconCls:'page_excel',
					    	menu:Ext.create('Ext.menu.Menu',{
					    		items:[{text: '全部',iconCls:'page_excel',
						    		handler:function(){
						      	  	 	erp.GridEvent.onExportClick(grid.getStore(),grid);
						      	  	}
						    	},{text: '全部(2007)',iconCls:'page_excel',
						    		handler:function(){
						      	  	 	erp.GridEvent.onExportClick(grid.getStore(),grid,'2007');
						      	  	}
						    	},{text: '预览',iconCls:'page_excel',
						    		handler:function(){
						      	  	 	erp.GridEvent.doExportToExcel(cmp,grid);
						      	  	}
						    	}]
					    	})
					      },
					      {text: '自定义显示字段',iconCls:'field',handler:function(){
					      		erp.GridEvent.doCustomFields(cmp,grid);				      	
					      }},
					      {text: '记录条数',iconCls:'',handler:function(){
					      		Ext.toastInfo("当前界面共有记录条数"+grid.getStore().getCount()+"条!");				      	
					      }},
					      '-',
//					      {text: '复制行记录',iconCls:'page_copy'},
					      {text:'全选',iconCls:'checkbox',handler:function(){
					      		var selModel=grid.getSelectionModel();
					      		if(selModel)
					      			selModel.selectAll();
					      }},
					      {text:'全清',iconCls:'un_checkbox',handler:function(){
					      	var selModel=grid.getSelectionModel();
					      	if(selModel)
					      			selModel.deselectAll();
					      	
					      }},
					      {text:'全清',iconCls:'un_checkbox',handler:function(){
					      	var selModel=grid.getSelectionModel();
					      	if(selModel)
					      			selModel.deselectAll();
					      	
					      }},
					      {
	   	  				    iconCls:'autosize',
	   	  				    text:'自动调整列宽',
	   	  				    handler:function(){
	   	  				    	Ext.suspendLayouts();
								Ext.Array.forEach(grid.getView().headerCt.items.items,
										function(group) {
											if (!group.resizeDisabled)
												group.autoSize();
										})
								Ext.resumeLayouts(true);
	   	  				    }}]
					 }).showAt(e.getPoint());				
				});
				//华慧 2015-5-29 end
				grid.on('selectionchange', function(selModel,
						selections) {
					var n = selections.length || 0;
					var btn = grid.down('#'+ erp.Const.FUNC_ITEMID_BTN_DEL);
					// 删除按钮必须是选中一些行时有效
					if (btn){
						btn.setDisabled(n == 0);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_EDT);
					// 编辑时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
					btn = grid.down('#'+erp.Const.FUNC_ITEMID_BTN_RESET);
					// 重置时只能是选中一行
					if (btn){
						btn.setDisabled(n != 1);
					}
				}, cmp);
			});
		}
	},
    initComponent:function(){
    	var me=this;
    	this.callParent(arguments);
//    	me.addHelp();
//    	me.on({
//    	  close:function(){
//    	  	if(me.HelpWin){
//    	  	me.HelpWin.close();
//    	  	}
//    	  },
//    	  scope:me
//    	});
    },
    addHelp:function(){
    	var me=this;
    	if(!Ext.isArray(this.tools)){
    	this.tools=[];
    	}
    	Ext.each(this.tools,function(btn){
    	  if(!me.isHelp&&btn.type=='help'){
    	     me.helpTool=btn;
    	     me.isHelp=true;
    	  }
    	});
    	//这里会有些问题，可能会出现多个帮助按钮
    	if(!me.isHelp){
    	  this.tools.push({
    	  type:'help',
		  tooltip:'帮助',
		  handler:function(){
		  me.doHelp();
		  }
    	});
    	me.isHelp=true;
    	}
    },
    doHelp:function(){
        var me=this;
        var win=me.HelpWin=Ext.widget('contenthelpWin',{
          help_id:me.xtype
        });
        win.show();
    }
});