Ext.define('erp.view.purchaseOrder.window.ChooseContractAttachment',{
     extend:'erp.ux.Window',
	 alias:'widget.ChooseAttachment',
	 modal:true,
	 autoScroll :'true',
	 width : 650,
	 height : 500,
	 title : '附件选择',
	 initComponent:function(){
		var  me=this;
	    me.store = Ext.create('erp.view.purchaseOrder.store.PurchaseFile');
	    me.store.load({params:{htbh : me.htbh/*,fjzt :0,ptsc : 0*/}}),
	    this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	        itemId : 'FileList',
	        items:[
	           {text : '上传附件',iconCls:'',itemId:'btn_upAttachment'},
	           {text : '取消附件',iconCls:'',itemId:'btn_Cancel'},
	           {text : '发送附件',iconCls:'',itemId:'btn_Sned'},
	           {text : '删除',iconCls:'delete',itemId:'btn_Del'}
	        ]
	    }]
	    Ext.apply(me,{
			layout:{type:'vbox',align: 'stretch'},
		    items:[{
		        xtype : 'grid',
		        flex : 1,
		        itemId : 'grd_ChooseAttachment',
		        selModel:Ext.create('Ext.selection.CheckboxModel',{
					mode:'MULTI'
				}),
				store : me.store,
				columns:[
				    {header : '取消',width:40,dataIndex: 'qxbj',
				          renderer: erp.Util.Staterenderer},
					{header : '文件编号',width:80,dataIndex:'wjbh'},
					{header : '文件名称',width:300,dataIndex:'wjmc'},
					{header : '上传日期',width:100,dataIndex:'scrq',xtype:'datecolumn',format:'Y-m-d'},
					{header : '文件路径',width:300,dataIndex:'wjlj'},
					{header : '创建人名',width:80,dataIndex:'cjrm'},
					{header : '附件类型',width:90,dataIndex: 'fjlx',
					renderer : function(value){
					   if(value ==0){
					      return '采购方提交'
					   }else if(value ==1){
					      return '回签合同'
					   }
					 }}
					 ,{header : '附件状态',width :100 ,dataIndex: 'fjzt',
	                  renderer:function(value){
	                  if(value == 0){
	                  return '未提交';  
	                   }else if(value == 1){
	                  return '已提交';
	                  }else if(value == 2){
	                  return '已接受';
	                  }
	                  }},
	                  {header: '操作',xtype:'actioncolumn',width:150,
					   items : [
					   {iconCls:'download',tooltip:'下载',
					   handler: function(grid,rowIndex,colIndex){
					      var rec = grid.getStore().getAt(rowIndex);
					      if(Ext.isEmpty(rec.get('wjlj')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');
								return;
							}
						  file_path=rec.get('wjlj');
							window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
					   }}/*,{
					      tooltip:'预览',
							iconCls:'application_view_list',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								var file_path=rec.get('wjlj');
								if(!Ext.isEmpty(file_path)){
									var suffixIndex=rec.get('wjmc').lastIndexOf('.');
	                            	var suffixStr=rec.get('wjmc').substring(suffixIndex+1).toLowerCase();
	                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif'){
	                            		me.showPic(file_path,'PIC1');
	                            	}
	                            	else{
	                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
										return;
	                            	}
								}
								else{
									Ext.Msg.alert('提示','当前还没有上传文件');
									return;
								}
							}
					}*/
				]}
					],
					dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 50,
				    store:me.store
				    }]
		    }],
		      buttons:['->',{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]	
	    })
	    me.callParent(arguments);  
	 }	
})