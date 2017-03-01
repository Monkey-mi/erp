Ext.define('erp.master.vendorFiles.view.VendorFilesMaintain',{
	extend:'erp.ux.Panel',
	requires:['erp.master.vendorFiles.view.VendorFilesForm'],
	alias : 'widget.edt_vendorfiles',
	iconCls:'group_blue',
	isAdd:false,
	isEdit:false,
	isCopy:false,
	initComponent : function(){
	  var me=this;
	  Ext.apply(me,{
	     layout:{
		     type: 'vbox',//垂直分布
		     pack: 'start',/*
    						start - 子组件被包在一起放在容器的左边 (默认)
    						center - 子组件被包在一起放在容器里居中
    						end - 子组件被包在一起放在容器的右边*/
		     align: 'stretch'/*
		              控制子组件在容器中的对齐方式, 此参数的有效值有以下几个:
   		     top : 默认值 各子组件在容器顶部水平对齐.
    		 middle : 各子组件在容器中间水平对齐.
   			 stretch : 各子组件的高度拉伸至与容器的高度相等.
  			  stretchmax : 各子组件的高度拉伸至与最高的子组件的高度相等.
		     */
    	},
    	defaults:{padding:5},//默认样式
          tbar:[{text:'保存',iconCls:'save',hidden:!(me.isAdd||me.isEdit),itemId:'BTN_SAVE'},"-",
    		{text:'关闭',iconCls:'page_error',
    		handler:function(){
    			me.close();	
    		}
    	}],
     items:[{
         title:'厂商档案编辑',
         itemId:'VendorFilesForm',
         xtype:'edt_vendorfilesform',
         isAdd:me.isAdd,
	  	 isEdit:me.isEdit,
	  	 flex:2,
	  	 store : me.store
     }]	
	  });
	  this.callParent(arguments); 
	  me.loadRecord(me.vendorFilesRec);
	  },

	  loadRecord : function(rec){
	       var me = this;
	       me.down('edt_vendorfilesform').loadRecord(rec);
	  }
})