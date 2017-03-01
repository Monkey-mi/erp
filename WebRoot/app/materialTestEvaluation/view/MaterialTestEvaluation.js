Ext.define('erp.materialTestEvaluation.view.MaterialTestEvaluation',{
    extend:'erp.ux.Panel',
    requires:[
     'erp.ux.PagingBar',
	 'erp.ux.QueryPanel',
	 'erp.ux.SupcanGrid',
	 'erp.materialInspection.store.WtbhTree'
    ],
	alias:'widget.mng_MaterialTestEvaluation',
	hideMode: 'offsets',
	layout:{
		type:'border',
		padding:2
	},
	listeners:{
	close:function(panel){
		//为避免界面关闭时 close 时 不触发销毁方法在关闭时主动销毁界面
		if(panel){
			panel.destroy();
		}
	 }
	},
	initComponent:function(){
		var me=this;
		me.params = {
		gdbj:0,
		czy_gh:erp.Util.currentUser.isAdmin?'000':erp.Util.currentUser.accountMap[0].ref_u_id,
		wtsjlb:me.wtsjlb,
		qsrq:me.qsrq,
		jzrq:me.jzrq
		};
	    me.detailStore = Ext.create('erp.materialTestEvaluation.store.MaterialTestEvaluation');
	    
	    Ext.apply(me,{
	       items : [{
	            region:'center',
   	  	  		flex:2,
   	  	  		xtype:'panel',
   	  	  		itemId : 'main_EI',
   	  	  		layout:{type:'border',padding:2},
   	  	  		items:[{
   	  	  		  itemId:'MaterialTestEvaluation',	
   	  	  		  region:'center',
   	  	  		  flex:2,
   	  	  		  split:true,
   	  	  		  xtype : 'SupcanGrid',
   	  	  		  tbar:[
   	  	  		 /* {fieldLabel:'起始日期',labelWidth:65,xtype: 'datefield',itemId:'qsrq',value:Ext.Date.add(new Date(), Ext.Date.MONTH,-2),enableKeyEvents :true,listeners:{
		                    keypress: function(field, e){
			                    if (e.getKey() == e.ENTER) {
			                    	me.quertyTime(me);
				                }
			                }
		            }},
				 {fieldLabel:'截至日期',labelWidth:65,xtype:'datefield',itemId:'jzrq',value:new Date(),enableKeyEvents :true,listeners:{
		                    keypress: function(field, e){
			                    if (e.getKey() == e.ENTER) {
			                    	me.quertyTime(me);
				                }
			                }
		            }},
   	  	  		  {text: '查询',iconCls:'query',itemId:'query',handler:function(){
   	  	  		  me.quertyTime(me);
   	  	  		  }},*/
   	  	  		  /*{text: '增加',iconCls:'page_add',itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
   	  	  		  {text: '复制',iconCls:'page_copy',itemId:'BTN_COPY',disabled:true},
   	  	  		  {text: '删除',iconCls:'page_delete',itemId:'BTN_DEL',disabled:true},
   	  	  		  {text: '锁定',iconCls:'permssion',itemId:'BTN_LOCK',disabled:true},
   	  	  		  {text: '签发',iconCls:'email_edit',itemId:'Issue',disabled:true},*/
   	  	  		  {text: '筛选',iconCls:'page_find',itemId:'btn_query'},
   	  	  		  /*{text: '归档',	iconCls:'book_next',xtype:'button',	itemId:'BTN_BACKUP',disabled:true},*/
	   	  		  {text: '历史',	iconCls:'book_open',xtype:'button',	itemId:'BTN_MHISTORY'},
   	  	  		  {text: '刷新',	iconCls:'arrow_refresh',	itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH },
   	  	  		  {
					text : '退出',
					iconCls : 'page_error',
					itemId : 'btn_out',
					handler : function() {
						me.close();
					}
				  }, {
			        xtype: 'displayfield',
			        itemId: 'tips',
			        value: '<font color="red">'+me.titles+'</font>' 
			    }
   	  	  		  ],
   	  	  		  mainModel:Ext.create('erp.materialTestEvaluation.model.MaterialTestEvaluation'),
   	  	  		  MainColumns:me.MainColumns,
   	  	  		  Properties:{curSelMode:'rows'},
   	  	  		  url:'materialTestEvaluation/MaterialTestEvaluation.act?method=getMaterialTestEvaluationList',
   	  	  		  params:me.params,
   	  	  		  onSupcanReady: function(id) {
   	  	  		    var me = this;
				    switch(id){
				    // 根据id判断，只处理与自己相关的报表控件
				    	case me.supcanId:
							var af=me.getSupcan();
							if(af==null){
								//延迟1秒执行，初次加载界面还没有渲染好，会报错！！
							 	var task = new Ext.util.DelayedTask(function(){
									af.func("Build",me.xml);
								    //插入一列表示是否选择
								    if(me.Properties.curSelMode){
								    	af.func("InsertCol", "0 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
								    }
								    url=me.url;
								});
							 	task.delay(500);
							}else{
						    	af.func("Build",me.xml);
						    	//插入一列表示是否选择
						    	if(me.Properties.curSelMode){
						    		af.func("InsertCol", "0 \r\n name=checked;width='35';editType='Check';editAble=false;datatype='bool';title='选择'");
						    	}
						    	url=me.url;
							}
				    	//params=me.params||{czy_gh:'wj',gdbj:0};
				    	//me.load(params);
				    	me.load(me.params);
						break;
				    }
   	  	  		  },
   	  	  		  onSupcanEvent: function(id, event, p1, p2, p3, p4) {
					var SupcanGrid = this;
				    var af=SupcanGrid.getSupcan();
				    if(id==SupcanGrid.supcanId){
					    switch(event){
					        case 'MenuClicked':
								if(p1==4001){
									Ext.Msg.alert("提示","当前界面共有记录条数"+af.func("getRows", "")+"条!");
								}
							break;
							case 'MenuBeforePopup':
							    var enable="true";
							    if(p1 != "-1") { //鼠标点在某行
							    }
							    else { //鼠标点在标题区或空白区
							      enable="false";
							    }
							    //拼装成菜单串
							    var menu = "id=4001; text='记录条数'; icon=''; detail='当前界面共有记录条数"+af.func("getRows", "")+"条!';";
							    menu += "enabled=" +enable+ "\r\n";
							    af.func("AddMenu", menu);
							break;
							case 'SelChanged':
							    
							break;
							case 'DblClicked':
							    /*var isEdit=true;
							    var rec = SupcanGrid.getSelectRow()[0];
							    var sts = false;
							    var canedt = false;
							    if(rec.get('sdbj')==1){
							       sts = true;
							       canedt = true;
							    }
							    var panel = erp.Util.addContentTab({
	    	                       xtype : 'edit_MaterialInspection',
	    	                       itemId : 'edit_MaterialInspection',
	    	                       title : '产品委托检验测试申请编辑',
	    	                       isEdit : isEdit,
	    	                       rec : rec,
	    	                       canedt : canedt,
	    	                       sts : sts
	    	                     })
	    	                     panel.loadData(rec,isEdit);
	    	                     panel.show();*/
							break;
							case 'Clicked':
							  if(p1!=-1&&p2=='checked'){
							     var str =SupcanGrid.getCurrentRow();
								 var value=SupcanGrid.getCellData(p1,p2);
								 if(value==1){
										value=0;
								}else{
										value=1;
							     }
								 var strArr=str.split(',');
								 var start=parseInt(strArr[0]),
								 end=parseInt(strArr[strArr.length-1]),
									len=strArr.length;
								 ;	
								 if(len>1&&((end-start)==len-1)||((start-end)==len-1)){
										if(start>end){
											start=strArr[len-1];
											end=strArr[0];
										}
										SupcanGrid.setColCellData(p2,value,start,end);
									}else{
										SupcanGrid.setCellData(p1,p2,value);
									}
									//设置值
									var rstr=SupcanGrid.findAll("checked=1");
								}
								if(p1!=-1){
									
								}else{
									
								}
							 break;
					    }
				    }
				  }
   	  	  		}]
	       }]
	    });
	    me.callParent(arguments);
	},
	/*setBtnStatus : function(sts) {
		var me = this;
	    me.down('#BTN_COPY').setDisabled(sts);
	    me.down('#BTN_DEL').setDisabled(sts);
	    me.down('#BTN_LOCK').setDisabled(sts);
		me.down('#Issue').setDisabled(sts);
		me.down('#BTN_BACKUP').setDisabled(sts);
	},*/
	loadGrid:function(rec){
		var me=this;
		if(rec.get('nodeId')!=null){
		var wtlb=rec.get('nodeId');
		if(wtlb==0){
			delete me.params.wtlb;
		}else{
			me.params.wtlb = wtlb;
		}
		me.loadMain();
		}
	},
	loadMain:function(){
		var me=this;
		me.down('#MaterialTestEvaluation').load(me.params);
	},
	quertyTime:function(me){
	   var qsrq = me.down('#qsrq').getValue();
	   var jzrq = me.down('#jzrq').getValue();
	   me.params.qsrq = qsrq;
	   me.params.jzrq = jzrq;
	   me.down('#MaterialInspection').load(me.params);
	}
})