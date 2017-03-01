Ext.define('erp.view.purchaseOrder.window.SynergySignback',{
     extend:'erp.ux.Window',
	 alias:'widget.win_SynergySignback',
	 modal: true,
	 autoScroll :'true',
	 width : 680,
	 height : 400,
	 title : '回签信息',
	 requires : [
	 'erp.view.purchaseOrder.store.OrderAttachmentBack',
	 'erp.view.purchaseUrge.store.OrderDeliveryNoticedetails'
	 ],
	 initComponent:function(){
		var  me=this;
		me.store = Ext.create('erp.view.purchaseOrder.store.OrderAttachmentBack');
		me.store.load({params:{htbh : me.htbh}});
		me.dStore=Ext.create('erp.view.purchaseUrge.store.OrderDeliveryNoticedetails');
		me.dColumns=erp.Util.getColumns(me.dStore.getModel());
	    me.dStore.load({params:{htbh : me.htbh}});
	    Ext.apply(me,{
	          layout:{
		         type : 'fit', 
		         padding: 4
		      },
		       items : [{   
		       	 xtype : 'tabpanel',
		       	 items : [{
		       	    title :'回签信息',
		       	     layout:{
				 type:'vbox',
				 align:'stretch'
			 },
	       items : [
	       {xtype : 'form',
	        itemId : 'hqform',
	        flex : 1,
	        bodyPadding: 10,
		    store : me.mainstore,
		    layout: 'column',
		    defaults: {
		            labelWidth:80,padding:5,xtype:'textfield'
		    },
		    items : [
		    {
		      fieldLabel : '合同号',
		      itemId : 'htbh',
		      name : 'htbh',
		      columnWidth:.3,
		      value : me.htbh,
		      readOnly : true
		    },{
		      fieldLabel : '回签日期',
		      itemId : 'hqrq',
		      name : 'hqrq',
		      xtype : 'datefield', 
		      columnWidth:.4,
		      readOnly : true
		    }/*,{
		       fieldLabel : '创建时间',
		       itemId : 'create_dt',
		       name : 'create_dt',
		       columnWidth:.4
		    },{
		      fieldLabel : '合同名称',
		      itemId : 'agreement_name',
		      name : 'agreement_name',
		      columnWidth:.47
		    }
		    ,{
		    	fieldLabel : '创建人名',
		    	itemId : 'creator_name',
		    	name : 'creator_name',
		        columnWidth:.33
		    }*/
		    ]
	       },{
	          xtype : 'grid',
	          itemId : 'grd_SynergySignback',
	          store : me.store,
	          flex : 2,
	          columns : [
	          {header : '合同状态',width :80 ,dataIndex: 'agreement_status',
	          renderer:function(value){
	               if(value == 0){
	                  return  '采购方提交'
	               }else if(value == 1){
	                  return '供方回签'
	               }
	          }},
	          {header : '合同名称',width :150 ,dataIndex: 'agreement_name'},
	          {header : '创建时间',width :150 ,dataIndex: 'create_dt',xtype:'datecolumn',format:'Y-m-d',
	          renderer:function(value){
	             me.down('#hqrq').setValue(value);
	             return Ext.Date.format(value,'Y-m-d H:i:s');
	          }},
	          {header : '创建人名',width :70 ,dataIndex: 'creator_name'},
	          {header : 'mogodb_id',width : 80,dataIndex :'mogodb_id',hidden : true},
	          {header : '数据来源',width :75 ,dataIndex: 'source_type',
	          renderer:function(value){
	               if(value == 0){
	                  return  'po端'
	               }else if(value == 1){
	                  return '平台'
	               }
	          }},
	          {header : '合同文件类型',width :80 ,dataIndex: 'suffix_name'},
	          {header: '操作',xtype:'actioncolumn',width:100,
	          items:[
	             {iconCls:'download',tooltip:'下载',itemId:'btn_QuotFile_download',
		         	       handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								if(Ext.isEmpty(rec.get('mogodb_id')))
								{
									Ext.Msg.alert('提示','未上传，无法下载');return;
								}
								var src1='supplierAccess/downloadFromMongdbAttched.srm?file_path='+rec.get('mogodb_id')+'&fileName='+rec.get('agreement_name');
								window.open(src1, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
							}
				   }/*,{
							tooltip:'预览',
							iconCls:'application_view_list',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								var file_path=rec.get('mogodb_id');
								if(!Ext.isEmpty(file_path)){
									var suffixIndex=rec.get('suffix_name').lastIndexOf('.');
	                            	var suffixStr=rec.get('suffix_name').substring(suffixIndex+1).toLowerCase();
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
						}*/]
		            }]
	             }]
		       },{
		        title :'通知单信息',
		        layout:{
				type:'vbox',
				align:'stretch'
			    },
			    items : [{
			      	title:'通知单明细',
	    			flex:5,
	    			xtype:'grid',
	    			itemId:'detailGrid',
	    			region: 'center',
	    			store:me.dStore,
	    			features: [{
					       ftype: 'summary',
				           dock:'bottom'
					    }],
	    			columns:me.dColumns
			    }]
		       }]
		      }
	       ],
		      buttons:['->',{text:'确认回签',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
	    })
	     me.callParent(arguments);  
	 },
	//图片展示
   	showPic:function(file_path,id){
   				var me=this;
   				var panel=me.down('#'+id);
   				if(file_path!=null&&file_path!=''){
   					var file_path=encodeURIComponent(encodeURIComponent(file_path));
   					var src1='supplierAccess/downloadFromMongdbAttched.srm?file_path='+file_path+'&isimg=true';
   					//var src='supplier/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   					//var src='supplierAccess/downloadAttched.srm?file_path='+file_path+'&isimg=true';
   					panel.setSrc(src1);
   					//panel.setHeight(390);
   				}
   		}
})