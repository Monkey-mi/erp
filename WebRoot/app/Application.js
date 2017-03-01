/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('erp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'erp',
	//controllers: ['erp.main.controller.Main'],
    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
    	erp.Application=this;
    	Ext.override(Ext.data.writer.Writer,{
			writeAllFields:true,
			rootProperty:'data'
		})
		Ext.override(Ext.data.proxy.Ajax,{
			batchOrder:'destroy,create,update',
			timeout:90000
		});
		Ext.get("loading").remove();
    	erp.Const.application = this;
    	/**
		 * @param {String}  msg   错误信息
		 * @param {String}  scriptURI      出错的文件
		 * @param {Long}    lineNumber     出错代码的行号
		 * @param {Long}    columnNumber   出错代码的列号
		 * @param {Object}  errorObj       错误的详细信息，Anything
		 */
    	function testError(msg,url,lineNumber,columnNumber,errorObj){   
		    arglen=arguments.length;   
		    var errorMsg="参数个数："+arglen+"个";
		    var obj=new Object();
		    obj.msg=msg;
		    obj.url=url;
		    obj.lineNumber=lineNumber;
		    obj.columnNumber=columnNumber;
		    obj.errorObj=errorObj.toString();
		    obj.ip=erp.Ip;
		    obj.loginId=erp.UInfo.currentUser.loginId;
		    obj.name=erp.UInfo.currentUser.name;
		    //将错误信息传回后台
		    Ext.Ajax.request({
				url: 'common/jslog.do?method=addJsLog',
				params: {
					data:'['+Ext.encode(obj)+']'
				},
				method: 'POST',
				callback: function(options, success, resp) {
				}
			});
			if(obj.errorObj=='TypeError: Argument 1 of Node.appendChild is not an object.'){
				Ext.Msg.alert('提示','系统遇到问题......请点击确认！',function(btn){
					if(btn=='ok'){
						window.location.reload();
					}
	            })
			}
		    return false;   
		}
    	//注册异常监听
    	window.onerror=testError;   
    }
});
