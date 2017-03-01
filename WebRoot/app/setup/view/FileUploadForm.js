/**
 * @author Hua hui
 */
Ext.define('erp.setup.view.FileUploadForm',{
	  extend: 'Ext.form.Panel',
	  alias: 'widget.fileUploadX',
	  layout: 'fit',
	  onlyImg: false,
	  border: false,
	  width: 78,
	  /**
	   * 保存方式
	   */
	  saveAs: 'DB',
	  /**
	   * 是否自动保存
	   */
	  autoSave: true,
	  
	  buttonConfig: {},
	  
	  fileFieldConfig: {},
	  
	  extraParams: {},
	  
	  initComponent: function(){
		  var me = this;
		  var fileFieldConfig = Ext.applyIf(me.fileFieldConfig, {
    		  name: 'file',
    		  anchor: '100%',
    		  buttonConfig: Ext.applyIf(me.buttonConfig, {
    			  iconCls: 'file-upload-x',
    			  text: '选择文件'
    		  })
		  });
		  me.fileField = Ext.widget('filefield', fileFieldConfig);
		  me.items = [me.fileField];
		  me.callParent(arguments);
	  },
	  
	  afterRender: function(){
		  var me = this;
		  me.addEvents(
				  /**
				   * 
				   */
				  'afterSave'
		  );
		  if(me.autoSave){
			  me.fileField.on('change', me.doSave, me);
		  }
		  me.btnDom = Ext.get(me.fileField.id + '-buttonEl');
		  me.callParent(arguments);
	  },
	  
	  doSave: function(){
		  var me = this;
		  if(me.saveAs == 'DB'){
			  if(me.onlyImg && !me.isImage(me.fileField.getValue())) { //若只允许上传图片
				  Ext.Msg.alert('错误', '请上传符合格式的图片，包括.gif, .jpg, .jpeg, .png, .bmp');
				  return;
			  }
			  me.btnDom.disable = true;
			  var lastText = me.btnDom.textContent;
			  me.btnDom.textContent = '上传中...';
			  me.submit({
				  url: 'main/uploadFile.do',
    			  method: 'post',
    			  type: 'ajax',
    			  params: me.extraParams,
    			  success: function(form, action){	
    				  me.btnDom.disable = false;
    				  me.btnDom.textContent = lastText;
    				  me.fireEvent('afterSave', me, action.result);
    			  }
			  });
		  }
	  },
	  //判断上传的文件是否为图片
	  isImage: function(src) {
		  var ext = ['.gif', '.jpg', '.jpeg', '.png', '.bmp'];
			var s = src.toLowerCase();
			var r = false;
			for(var i = 0; i < ext.length; i++)
			{
				if (s.indexOf(ext[i]) > 0)
				{
					r = true;
					break;
				}
			}	
			return r;
	  }
});
    	
    