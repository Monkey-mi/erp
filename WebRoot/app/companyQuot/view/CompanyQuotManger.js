Ext.define('erp.companyQuot.view.CompanyQuotManger',{
       extend: 'erp.ux.Panel',
       alias: 'widget.mng_CompanyQuot',
	  listeners:{
		'close':function(cmp){
			//这里防止有些组件没有destroy,必须要加上
			cmp.destroy();
		}
	  },
       /*requires:[''],*/
       initComponent:function(){
		var me=this;
		me.store = Ext.create('erp.companyQuot.store.CompanyQuot');
		me.deStore = Ext.create('erp.companyQuot.store.QuotDetail');
		me.fileStore = Ext.create('erp.companyQuot.store.CompanyQuotFile');
		me.can_use_btn=true;
		Ext.apply(me.store.proxy.extraParams,{usePaging:true});
        var isCgy=false;
        Ext.each(erp.Util.currentUser.roleList,function(role){
				if(role.role_name=='采购员'){
				isCgy=true;
				return false;
		}
	   })
		if(!erp.Util.currentUser.isAdmin&&isCgy){
		    			//判断当前操作员是否为采购员
				me.store.proxy.extraParams.search="  and (csbjdb.czym like '%"+erp.Util.currentUser.name+"%')";
			}
        Ext.apply(me,{
              layout:{
                 type : 'border',
                 padding : 2
              },
         dockedItems: [{
                xtype: 'toolbar',
			    dock: 'top',
			    itemId: 'function_btn',
			    items: [
			    	{text:'添加',iconCls:'page_add',itemId:'btn_add'},
			    	{text:'编辑', iconCls:'page_edit', itemId:'btn_edt'},
			    	{text:'删除', iconCls:'page_delete', itemId:'btn_del'},
			    	{text:'锁定',iconCls:'permssion',itemId:'btn_lock'},
			    	{text:'审核',iconCls:'email_edit',itemId:'btn_aud'},
			    	{text:'审批',iconCls:'',itemId:'btn_appro'},
			    	{text:'归档',iconCls:'book_next',itemId:'btn_arc'},
			    	{text:'历史报价',iconCls:'book_open',itemId:'btn_his'},
			    	{text:'询价比价',iconCls:'',itemId:'btn_enquiry'},
			    	{text:'价格更新',iconCls:'',itemId:'btn_refPrice'},
			    	{text:'明细查询',iconCls:'',itemId:'btn_detialSerch'},
			    	{text:'查询',glyph:0xf002,itemId:'btn_serch'},
			        {text:'打印',iconCls:'printer',itemId:erp.Const.FUNC_ITEMID_BTN_PRINT,disabled:true,
	    		     menu: new Ext.menu.Menu({
	   	  		    	itemId:'menu_printer'
	   	  		     })},
			    	{text:'刷新',iconCls:'refresh_backwards',itemId:'btn_refresh',
			    	                    handler:function(){
			   	  				    	me.store.loadPage(1);}}
			    	]
            }],     
         items: [
           {
              flex:2,
              region: 'center',
              xtype: 'grid',
              itemId: 'grd_CompanyQuot',
              overflowY:'auto',
			  overflowX:'auto',
			  selModel:Ext.create('Ext.selection.CheckboxModel'),
			  dockedItems:[{
			    		xtype : 'pagingbar',
			    		stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize : 200,
			    		displayInfo:true
			    	  }],
			/*  features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
					    }], */
		      columns:[
		        {header : '锁定',width: 35,dataIndex:'sdbj',renderer: erp.Util.Staterenderer},
		        {header : '审核',width: 35,dataIndex:'shbj',renderer: erp.Util.Staterenderer},
		        {header : '审批',width: 35,dataIndex:'spbj',renderer: erp.Util.Staterenderer},
		        {header : '报价单号',width: 70,dataIndex:'bjdh'},
		        {header : '报价日期',width: 80,dataIndex:'bjrq',xtype:'datecolumn',format:'Y-m-d'},
		        {header : '厂商编号',width: 85,dataIndex:'csbh'},
		        {header : '厂商名称',width: 280,dataIndex:'csmc'},
		        {header : '备注说明',width: 300,dataIndex:'bzsm'},
		        {header : '操作员',width: 70,dataIndex:'czym'},
		        {header : '操作时间',width: 80,dataIndex:'czsj',xtype:'datecolumn',format:'Y-m-d'},
		        {header : '审批人',width: 70,dataIndex:'sprm'},
		        {header : '审批时间',width: 80,dataIndex:'spsj',xtype:'datecolumn',format:'Y-m-d'}
		      ],
		      store : me.store
             },{
                region:'south',
				split:true,
				height:300,
				xtype:'tabpanel',
				items : [{
				   itemId : 'CompanyQuotDetial',
				   title : '报价单明细',
				   overflowY:'auto',
			       overflowX:'auto',
				   items : [{
				      xtype : 'grid',
				      itemId : 'grd_QuotDetail',
				      selModel:Ext.create('Ext.selection.CheckboxModel'),
				      columns : [
				     {header : '审核',width:35,dataIndex: 'shbj',renderer: erp.Util.Staterenderer},
				     {header : '锁定',width:35,dataIndex: 'sdbj',renderer: erp.Util.Staterenderer},
				     {header : '价格更新',width:80,dataIndex: 'gxbj_jg',renderer: erp.Util.Staterenderer},
				     {header : '序号',width:40,dataIndex: 'bjxh'},
				     {header : '材料货号',width:80,dataIndex: 'clhh'},
				     /*{header : '材料货号',width:100,dataIndex: 'plmth'},
				     {header : '事物特性',width:100,dataIndex: 'plmtx'},*/
				     {header : '材料名称',width:320,dataIndex: 'clmc',
	    			   	renderer:function(v,metaData){
					        metaData.tdAttr = 'data-qtip="' + (v) + '"';  
				            return v;
			            }},
				     {header : '单位',width:45,dataIndex: 'jldw'},
				     {header : '厂商出价',width:80,dataIndex: 'jzj_str'},
				     {header : '材料控价',width:80,dataIndex: 'csbj'},
				     {header : '辅助单位',width:80,dataIndex: 'fzdw'},
				     {header : '辅助控价',width:80,dataIndex: 'fzkj'
				     ,renderer:function(v){
				      if(v==0){return ' '}else{return v}}},
				     {header : '币种',width:60 ,dataIndex: 'wbdh'},
				     {header : '外币报价',width:80 ,dataIndex: 'wbbj'
				     ,renderer:function(v){
				      if(v==0){return ' '}else{return v}}},
				     {header : '备注说明',width:320 ,dataIndex: 'mxbz'},
				     {header : '锁定人',width:75,dataIndex: 'sdrm'},
				     {header : '锁定时间',width:80,dataIndex: 'sdsj',xtype:'datecolumn',format:'Y-m-d'},
				     {header : '审核人',width:75,dataIndex: 'shrm'},
				     {header : '审核时间',width:80,dataIndex: 'shsj',xtype:'datecolumn',format:'Y-m-d'}],
				     store: me.deStore
				   }]
				},{
				  itemId: 'CompanyQuotFile',
				  overflowY:'auto',
			      overflowX:'auto',
				  title : '附件明细',
				  layout: 'border',
				  items:[{
				     xtype : 'grid',
				     itemId : 'grdFile',
				     region: 'center',
				     flex : 1,
				     columns:[
				       {header: '文件编号',dataIndex:'wjbh',flex:2},
				       {header: '文件路径',dataIndex:'wjlj',flex:3,
		         	   renderer:function(v,metaData){
					      metaData.tdAttr='data-qtip="'+v+'"';
					      return v;
				        }},
		         	   {header: '文件名称',dataIndex:'wjmc',flex:2,
		         	   renderer:function(v,metaData){
					      metaData.tdAttr='data-qtip="'+v+'"';
					      return v;
				        }},
		         	   {header: '创建人名',dataIndex:'cjrm',flex:1},
		         	   {header: '创建日期',dataIndex:'cjrq',flex:1,xtype:'datecolumn',format:'Y-m-d'},
					{
						header:'操作',xtype:'actioncolumn',flex:1,
						items:[
						{iconCls:'download',tooltip:'下载',itemId:'btn_QuotFile_download',
		         	       handler: function(grid,rowIndex,colIndex){
		         	       	var rec = grid.getStore().getAt(rowIndex);
		         	       	if(Ext.isEmpty(rec.get('wjlj')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');
								return;
							}
							/*var file_path=encodeURIComponent(encodeURIComponent(rec.get('wjlj')));*/
							file_path=rec.get('wjlj');
							window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
		         	       }
		         	       },
		         	       { iconCls:'delete',tooltip:'删除',itemId:'btn_QuotFilel_del',
						 handler:function(grid,rowIndex,colIndex){
						 	 var rec = grid.getStore().getAt(rowIndex);
						 	 var bjdh = rec.get('bjdh');
						     if(Ext.isEmpty(rec.get('wjlj'))){
						         Ext.Msg.alert('提示','文件尚未上传，无法删除');
								 return;
						     }
						  Ext.Msg.confirm("提示","是否确认删除上传的附件?",function(btn){
							if(btn=="yes"){
							   /* me.toBeDeleteFileArray.push(rec.get('wjlj'));*/
							   Ext.Ajax.request({
					             //将生成的xml发送到服务器端,需特别注意这个页面的地址
					              url: 'common/deleteAttachement.action',
					              async:false,
					              timeout: 600000,
					              method: 'POST',
					              success: function(response, opts)  {
					                    	rec.set('dytp','');
					                    	Ext.Msg.alert('提示', '删除成功！');
					              },
					              disableCaching:true,
					              isUpload: true,
					              params: {urlId:rec.get('wjlj')}
					              });
							    /*erp.Const.callServiceMethodSync('common/deleteFileByPath.do',{
							    		patharray:me.toBeDeleteFileArray.join(',')
		                           });*/
		                        /* me.toBeDeleteFileArray=[]; //重置
*/		                         me.fileStore.remove(rec);
		                         me.fileStore.sync({
		                         success : function(){
		                         me.fileStore.reload({
	  	                                        params : 
	  	                                       {
	  	                                      bjdh : bjdh
	  	                                    }
	  	                                 })
	  	                             }
		                         })       
							 }
						   }) 
						 }
						 },
				     	{
						//预览
						/*icon:'resources/images/icon/application_view_list.png',*/
						iconCls:'application_view_list',
						tooltip:'预览',/*
						flex : 1,
						itemId : 'btn_view',*/
						handler:function(grid,rowIndex,colIndex)
						{
							var rec = grid.getStore().getAt(rowIndex);
							var file_path=rec.get('wjlj');
							if(!Ext.isEmpty(file_path))
							{
								var suffixIndex=file_path.lastIndexOf('.');
                            	var suffixStr=file_path.substring(suffixIndex+1).toLowerCase();
                            	
                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif')
                            	{
                            		me.showPic(file_path,'PIC2');
                            	}
                            	else
                            	{
                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
									return;
                            	}
							}
							else
							{
								Ext.Msg.alert('提示','当前还没有上传文件');
								return;
							}
						}}]
					}
				     ],
				     store : me.fileStore
				  },{
			    			//预览图片
						region:'east',
			    		xtype:'image',
			    		flex:1,
			    		split: true,
			    		itemId:'PIC2',
			    		autoScroll:true,
			    		src:null,
						style:"position:absolute;left:0;top:0;width:100%;height:100%;"
			    		}]
				}]
             }
         ] 
          });
         me.callParent(arguments); 
       },
       /**
	 * @description 打印模板回调函数，用于页面中打印前处理
	 * @param {} 入参item:打印选项
	 * @return {}	 出参recs：选择记录或NULL
	 */
	PrintProcess:function(item){
	    var me=this;
	    var recs;
	    var grid = me.down('#grd_CompanyQuot');
	    recs=grid.getSelectionModel().getSelection();
		if(recs.length==0){
			Ext.Msg.alert("提示","请至少选择一条数据");
			return ;
		}
		return recs;
		}
    ,//图片展示
   		showPic:function(file_path,id){
   		var me=this;
   		var panel=me.down('#'+id);
   		if(file_path!=null&&file_path!=''){
   					/*var file_path=encodeURIComponent(encodeURIComponent(file_path));*/
   					/*var src='supplier/downloadAttched.do?file_path='+''+file_path+'&isimg=true';
   					console.log(src)*/
   			        var src='ftp://'+tp_ftpUrl+file_path;
   					panel.setSrc(src);
   				}
   		}
})