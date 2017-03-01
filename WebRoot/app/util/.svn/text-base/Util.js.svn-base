Ext.define('erp.util.Util',{
	requires:[
	'erp.def.Const',
	'erp.util.UInfo',
	'erp.setup.store.Functions',
	'erp.util.data.DataUtil',
	'erp.setup.store.Codes',
	//'erp.util.CommonService',
	'erp.ux.*',
	'erp.util.GridEvent',
	'erp.report.engine.util.AnalysisFun',
	'erp.report.engine.model.SysPrintModel',
	'erp.report.engine.view.TemplateDesignerForSys'
	],
	SysEnv:{},
	SearchPanel:{},//全局筛选绑定对应grid
	init:function(callbackFn){
		var me = this;
		//设置store
		Ext.override(Ext.Date,{
			defaultFormat :'Y-m-d H:i:s'
		});
		Ext.override(Ext.data.proxy.Ajax,{
			batchOrder:'destroy,create,update'
		});
		Ext.override(Ext.grid.filters.filter.String,{
			emptyText :'录入比较值',
			updateBuffer:1000
		});
		Ext.override(Ext.grid.filters.filter.Boolean,{
			emptyText :'录入比较值',
			noText:'否',
			yesText:'是'
		});
		Ext.override(Ext.grid.filters.filter.Date,{
			dateFormat: 'Y-m-d H:i:s'
		});
		Ext.override(Ext.grid.filters.filter.Number,{
			emptyText :'录入比较值',
			updateBuffer:10000
		});
		Ext.override(Ext.grid.filters.filter.List,{
			emptyText :'录入比较值'
		});
		Ext.override(Ext.data.proxy.Ajax,{
			timeout : 90000
		});
		//设置自动生成id类型
		Ext.override(Ext.data.Model,{
			identifier:'negative'
		});
		//grid 默认带行
		Ext.override(Ext.grid.Panel,{
			columnLines:true,
			multiColumnSort:true,//默认多个字段排序
			viewConfig:{enableTextSelection:true}
		});
		//表单字段自定义验证
		Ext.apply(Ext.form.field.VTypes, {
		    //  vtype 校验函数
		    UserName: function(val, field) {
		    	var result=erp.Const.callServiceMethodSync(field.vurl,
				{vText0:'用户已存在!',vText1:'用户不存在!',valid_fields:'[{"field":"'+field.name+'","value":"'+val+'"}]'});
				var data=result;
		        return !data;
		    },
		    // vtype文本属性：当验证函数返回false显示的出错文本
		    //UserNameText: '用户已存在!',
		    // vtype Mask 属性: 按键过滤器
		    UserNameMask: /[\d\s:amp]/i
		});
		// 处理一些系统初始化动作
		// 1.加载系统参数
		me.sysParamsStore = Ext.create('erp.setup.store.Codes');
		me.sysParamsStore.storeId = "SYS";
		me.sysParamsStore.load({
			params: {
				type_attrib: erp.Const.TYPE_ATTRIB_SYS,
				type_code: erp.Const.SYS_PARAMETERS
			}
		});
		//2.用户信息初始化
		erp.UInfo.init(function(){
			//3.系统菜单初始化
			me.SysEnv.systemMenu=erp.Const.callServiceMethodSync('main/Modules.do?method=getModuleListByLoginId&_dc',{
				u_id:erp.Util.currentUser.u_id,
				sort:'[{"property":"parentId","direction":"ASC"},{"property":"order_seq","direction":"ASC"},{"property":"text","direction":"ASC"}],',
				node:0
			});
			me.SysEnv.sayHello=me.SayHello();
			//4. 系统参数初始化
			erp.DataUtil.DataLoad();
		});
		if(!Ext.isEmpty(callbackFn)
			&&Ext.isFunction(callbackFn)){
	             Ext.callback(callbackFn,me);
	     }
	},
	/**
	 * 将config里的属性拷贝到p中 如果config的属性值为假（null undefined 空字符串 0不包含在内）则将p中的同名属性删除
	 * 
	 * @param p
	 * @param config
	 */
	applyNull: function(p, config) {
		for(c in config){
			if(typeof (config[c]) == 'string'){
				config[c] = config[c].trim();
			}
			if((typeof (config[c]) == 'number') || !Ext.isEmpty(config[c])){
				p[c] = config[c]; 
			}else{
				delete p[c];
			}
		}
	},
	applyForDest: function(desObj, srcObj) {
		/* 根据目标对象从源对象中拷贝属性 */
		for( var pName in desObj){
			if(srcObj[pName] != undefined){
				switch(srcObj[pName]){
				case 'true':
				case true:
					desObj[pName] = erp.Const.YESNO_TYPE_YES;
					break;
				case 'false':
				case false:
					desObj[pName] = erp.Const.YESNO_TYPE_NO;
					break;
				default:
					desObj[pName] = srcObj[pName];
				}
			}
		}
	},
	/**
	 * @author 华慧
	 * 当某一column的editor使用了属性allowBlank:true时，
	 * 启用编辑时会报错（“该行不能为空”），
	 * 这时save按钮是灰色的无法提交。然而填了该行，save仍然无法提交。
	 */
	RowEditingBug:function(){
		Ext.override(Ext.grid.RowEditor, {  
					    addFieldsForColumn: function(column, initial) {  
					        var me = this,  
					        i, length, field;  
					        if (Ext.isArray(column)) {  
					            for (i = 0, length = column.length; i < length; i++) {  
					                me.addFieldsForColumn(column[i], initial);  
					            }  
					            return;  
					        }  
					        if (column.getEditor) {  
					            field = column.getEditor(null, {  
					                xtype: 'displayfield',  
					                getModelData: function() {  
					                    return null;  
					                }  
					            });  
					            if (column.align === 'right') {  
					                field.fieldStyle = 'text-align:right';  
					            }  
					            if (column.xtype === 'actioncolumn') {  
					                field.fieldCls += ' ' + Ext.baseCSSPrefix + 'form-action-col-field';  
					            }  
					            if (me.isVisible() && me.context) {  
					                if (field.is('displayfield')) {  
					                    me.renderColumnData(field, me.context.record, column);  
					                } else {  
					                    field.suspendEvents();  
					                    field.setValue(me.context.record.get(column.dataIndex));  
					                    field.resumeEvents();  
					                }  
					            }  
					            if (column.hidden) {  
					                me.onColumnHide(column);  
					            } else if (column.rendered && !initial) {  
					                me.onColumnShow(column);  
					            }  
					  
					            // -- start edit  
					            me.mon(field, 'change', me.onFieldChange, me);  
					            // -- end edit  
					        }  
					    }  
					});  
	},
	//在本地状态里面加载当前默认组织
	loadCurrentOuCode:function(){
		return Ext.state.Manager.get(tp_login_id+'_ou_code');
	},
	/**
	 * 退出
	 */
	doLogout: function() {
		var me = this;
		Ext.Ajax.request({
			url: 'main/Users/doLogout.do',
			params: {
				login_id: erp.Util.currentUser.loginId
			},
			method: 'POST',
			callback: function(options, success, resp) {
				var retObj = Ext.decode(resp.responseText);
				if(retObj.success){
					delete erp.Util.currentUser;
					window.location = erp.Const.LOGIN_PAGE;
				}
			}
		});
	},
	SayHello: function () {
			    var hour = new Date().getHours(),
			     hello = '';
			    if (hour < 6) {
			        hello = '凌晨好';
			    } else if (hour < 9) {
			        hello = '早上好';
			    } else if (hour < 12) {
			        hello = '上午好';
			    } else if (hour < 14) {
			        hello = '中午好';
			    } else if (hour < 17) {
			        hello = '下午好';
			    } else if (hour < 19) {
			        hello = '傍晚好';
			    } else if (hour < 22) {
			        hello = '晚上好';
			    } else {
			        hello = '夜里好';
			    }
			    return hello + ' ! '+erp.Util.currentUser.name;
		},
	getModuleTabId: function(id) {
		var tabId = id+"";
		if(!Ext.String.startsWith(tabId,erp.Const.MODULE_TABID_PREFIX))
		    tabId =  erp.Const.MODULE_TABID_PREFIX + tabId
		return tabId;
	},	
	findContentTab: function(itemId){
		var tabId = this.getModuleTabId(itemId);
		return this.getContentTab().getComponent(tabId);
	},
	showContentTabByItemId:function(itemId){
		var tabobj =this.findContentTab(itemId);
		this.showContentTab(tabobj);
	},
	showContentTab:function(tabObj){
		if(tabObj){
			this.getContentTab().setActiveTab(tabObj);
    		tabObj.show();
    		if(tabObj.tab){
    			tabObj.tab.show();
    		}
		}
	},
	getMainViewModel:function(){
		return erp.Application.getMainView().getViewModel();
	},
	getContentTab:function(){
		return erp.Application.getMainView().down('MainCenter');
	},
	
	loadPageModule: function(urlStr,rec,isUrl,tabId){
		//动态加载页面类型的模块
		Ext.getBody().mask('正在加载,请稍候...');
		var htmlStr ='';
		if(!Ext.isEmpty(isUrl)&&!isUrl)
			htmlStr='<strong>'+urlStr+'</strong>';
		else{
			//如果是html链接,
			htmlStr='<iframe src= "'+urlStr+'" width="100%" height="100%" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" ></iframe>';	
		}
		
		var	tabObj = this.addContentTab({
				itemId : tabId,
				title : rec.module_name,
				glyph:parseInt(rec.icon_cls),
				html:htmlStr,
				closable : true,
				reorderable : true
			});
		Ext.getBody().unmask();
		return tabObj;
	},
	addContentTab:function(panelObj){
		var me = this;
        var tabObj = me.getContentTab().getComponent(panelObj.itemId);
        if(!tabObj){
                tabObj=me.getContentTab().add(panelObj);
                //me.getContentTab().doLayout();
         }
         Ext.create('Ext.util.DelayedTask',function(){
                me.showContentTab(tabObj);
            }).delay(10);
       	return tabObj;
	},
	loadModuleMC:function(rec,cbFunc){
		var mainView=erp.Application.getMainView();
		var modId = rec.get('mod_code');
		if(Ext.isEmpty(modId))
		    modId = rec.get('id');  
		var tabId = erp.Util.getModuleTabId(modId);
		var maincenter=mainView.down('MainCenter');
		var tabObj = maincenter.getComponent(tabId);
		if(tabObj){
			//已经打开过的，无需再次开启
			this.showContentTab(tabObj);
			return;
		}
		
		var urlType,urlStr,modCtrller,modView,modExtraCfg;
		urlType = rec.get('urltype');
		urlStr =  rec.get('url');
		modCtrller = rec.get('ctrller');
		if(rec.raw==null){
			modView = rec.get('jsview');
		}else{
			modView = rec.raw.jsview;
		}
		modExtraCfg = rec.get('extraCfg');
		
		
		if(Ext.isEmpty(urlType)||urlType==erp.Const.URL_TYPE_PAGE){
			//是普通页面模块
			var tabObj = null;
			var isUrl = true;
			if(Ext.isEmpty(urlStr)){
				isUrl = false;
				urlStr ='模块定义存在问题,未设定请求路径!';
			}
			tabObj=this.loadPageModule(urlStr, rec,isUrl,tabId);
			if(Ext.isFunction(cbFunc)){
				cbFunc.call(this,tabObj);
			}
			return;
	    }else if(urlType==erp.Const.URL_TYPE_MODULE){
	    	//需要动态加载的模块
	    	//2013.06.20 开始支持两种配置方式
	    	var modObj ={};
	    	if(!Ext.isEmpty(modCtrller)){
	    		//通过ctrller,view,extraCfg三个字段加载
	    		modObj["controller"] = modCtrller;
	    		if(!Ext.isEmpty(modView)){
		    		if(modView.charAt(0)!='{')
		    			modView = '{'+modView+'}';
		    		modObj["view"]= Ext.decode(modView);
	    		}
	    		if(!Ext.isEmpty(modExtraCfg)){
	    			if(modExtraCfg.charAt(0)!='{')
	    				modExtraCfg = '{'+modExtraCfg+'}';
		    		modObj["extraCfg"]= Ext.decode(modExtraCfg);
	    		}
	    	}else{
	    		//兼容原来的模式，仍然从url中解释json加载
	    		if(Ext.isEmpty(urlStr)){
					urlStr ='模块定义存在问题,未设定请求路径!';
					var tabObj=this.loadPageModule(urlStr,rec,false,tabId);
					if(Ext.isFunction(cbFunc)){
						cbFunc.call(this,tabObj);
					}
					return;
				}
	    		modObj= Ext.decode(urlStr);
		    }
	    	if(!(modObj.controller&&modObj.view)||!(modObj.view.xtype||modObj.view.classType)){
	    		var tabObj = this.loadPageModule('请求定义有误:'+urlStr
	    				+'<br/>正确的格式为：模块控制器:ctrl_name,模块视图:{xtype:"xtype_name"||classType:"class_type"}，模块参数:{xxx:yyy}',
	    				rec,false,tabId);
	    		if(Ext.isFunction(cbFunc)){
					cbFunc.call(this,tabObj);
				}		
	    		return;
	    	}
	    	//对于锐智系统中某些菜单需要检验用户是否有操作权限
	    	//华慧 2015-03-29
	    	if(!Ext.isEmpty(modObj["extraCfg"])&&modObj["extraCfg"].checkUser){
	    		var errMsg="";
	    		var CheckUser=function(){
	    			var store=erp.DataUtil.getStoreByStoreManager(modObj["extraCfg"].storeId);
	    			return store.getCount()>0;
	    		}
	    		//如果不是管理员
	    		if(!erp.Util.currentUser.isAdmin){
	    			if (Ext.isEmpty(erp.Util.currentUser.accountMap))
	    					errMsg="当前用户账号没有映射锐智账号，请联系管理员!"
	    		  else if (!CheckUser())
	    		  		errMsg="当前用户账号没有操作权限!"
	    		  if (errMsg!='')
	    		  {
	    		 	 var tabObj=this.loadPageModule(errMsg,rec,false,tabId);
							if(Ext.isFunction(cbFunc)){
								cbFunc.call(this,tabObj);
							}
					return;		
	    		  }
	    		}
	    		
	    	}
	    	
	    	Ext.getBody().mask('正在加载,请稍候...');
	    	
	    	//异步加载模块相关组件
			//FF18 修正，改为同步加载模式。否则控制器的调用会引起require方法前后异常。
	    	Ext.syncRequire(erp.Const.application.getModuleClassName(modObj.controller));
	    	Ext.onReady(function(){
				var tabObj = this.loadCtrlModule(modObj,rec,tabId);
				if(Ext.isFunction(cbFunc)){
					cbFunc.call(this,tabObj);
				}
			    Ext.getBody().unmask();
	    	},this);
	    }else{
	    	Ext.Msg.alert('提示','模块菜单的[请求类型]有误,无法加载,请检查定义!');
	    }
	},
	closeContentTab: function(panelObj) {
		if(panelObj.tab)
			panelObj.tab.onCloseClick();
		else{
			var edtWin = panelObj.up('window');
			if(edtWin)
				edtWin.close();
			else
				panelObj.close();
		}
	},
	loadCtrlModule: function(modObj,rec,tabId){
		var me = this;
		//动态加载controller及模块相关
		var module = null,
		ctrller =erp.Const.application.getController(modObj.controller);
		var modId = rec.get('mod_id');
        if(Ext.isEmpty(modId))
            modId = rec.get('id');	
		if(ctrller){
			erp.Util.getModuleFuncs(modId,function(modFunsBack){
				modObj.extraCfg = modObj.extraCfg||{};
				modObj.extraCfg.modName=rec.get('text');
				modObj.runMode = modObj.extraCfg.runMode?modObj.extraCfg.runMode:erp.Const.MODULE_RUN_MODE_TAB;
				//先初始化controller
				ctrller.init();
				if(!Ext.isEmpty(modObj.view.xtype)){
					//根据xtype加载
					if(modObj.runMode == erp.Const.MODULE_RUN_MODE_TAB){
						//根据运行模式不同处理,加入tab页
						var cfg = {
								itemId:tabId,
								xtype:modObj.view.xtype,
								title:rec.get('text'),
								iconCls:rec.get('iconCls'),
								closable:true,
								modId : modId,
								modName : rec.get('text'),
								modFuncsDisabled:modFunsBack, 	//直接把功能权限控制赋给主控界面
								extraCfg: modObj.extraCfg       //请求路径中的额外参数，用于自定义初始化view.
							};
						//2015-12-17  直接把额外参数作用于cfg上
                        Ext.applyIf(cfg, modObj.extraCfg);
						module=me.addContentTab(cfg);
						//me.getContentTab().doLayout();
					}else if(modObj.runMode == erp.Const.MODULE_RUN_MODE_WINDOW){
						//根据运行模式不同处理,打开窗口
						var cfg = {
                            modId : modId,
                            modName : rec.get('text'),
                            modFuncsDisabled:modFunsBack, //直接把功能权限控制赋给主控界面
                            extraCfg: modObj.extraCfg       //请求路径中的额外参数，用于自定义初始化view.
                        };
                        //2015-12-17 by wangyan 直接把额外参数作用于cfg上
                        Ext.applyIf(cfg, modObj.extraCfg);
						module=Ext.widget(modObj.view.xtype,cfg);
						module.show();
					}
				}else if(!Ext.isEmpty(modObj.view.classType)){
					//根据类名加载
					if(modObj.runMode == erp.Const.MODULE_RUN_MODE_TAB){
						//根据运行模式不同处理,加入tab页
						module=me.getContentTab().add();
						var panelObj = Ext.create(erp.Const.application.getModuleClassName(modObj.view.classType,'view'),{
                                    itemId:tabId,
                                    title:rec.get('text'),
                                    iconCls:rec.get('iconCls'),
                                    closable:true,
                                    modId : modId,
                                    modName : rec.get('text'),
//                                    modFuncsDisabled:modFunsBack, //直接把功能权限控制赋给主控界面
                                    extraCfg: modObj.extraCfg       //请求路径中的额外参数，用于自定义初始化view.
                        })
                        //2013-12-10 by wangyan 直接把额外参数作用于cfg上
                        Ext.applyIf(panelObj, modObj.extraCfg);
                        module=me.addContentTab(panelObj);
						//me.getContentTab().doLayout();
					}else if(modObj.runMode == erp.Const.MODULE_RUN_MODE_WINDOW){
						//根据运行模式不同处理,打开窗口
						var cfg = {
                            modId : modId,
                            modName : rec.get('text'),
                            modFuncsDisabled:modFunsBack, //直接把功能权限控制赋给主控界面
                            extraCfg: modObj.extraCfg       //请求路径中的额外参数，用于自定义初始化view.
                        };
                        //2013-12-10 by wangyan 直接把额外参数作用于cfg上
                        Ext.applyIf(cfg, modObj.extraCfg);
						module=Ext.create(modObj.view.classType,cfg);
						module.show();
					}
				}
			});
		}
		return module;
	},
	getModuleFuncs: function(modId, callbackFun) {
		// 先填充modFuncsBack
		var allFuncStore = Ext.create('erp.setup.store.Functions');
		var modFunsBack = {};
		allFuncStore.load({
			params: {
				mod_id: modId
			},
			callback: function(recs) {
				Ext.each(recs, function(rec) {
					if(!Ext.isEmpty(rec.get('type')) && rec.get('type')==1){
						modFunsBack[rec.get('code')]=1;//禁用
					}else{
						modFunsBack[rec.get('code')]= 3;
					}
					
				});
				// 再根据功能权限查询结果设置状态
				// 设置store
				var funcStore = Ext.create('erp.setup.store.Functions', {
					proxy: {
						type: 'ajax',
						actionMethods:{'read':'post'},
						extraParams: {
							model: 'Function'
						},
						url: 'main/Users.do?method=getFuncListByUserModule',
						reader: {
							type: 'json',
							rootProperty: 'data',
							messageProperty: 'message'
						}
					}
				});
				// 设置状态
				funcStore.load({
					params: {
						u_id: erp.Util.currentUser.u_id,
						mod_id: modId
					},
					callback: function(recs2) {
						Ext.each(recs2, function(rec) {	
							if(!Ext.isEmpty(rec.get('type')) && rec.get('type')==1){
								modFunsBack[rec.get('code')]=2;//可用
							}else{
								modFunsBack[rec.get('code')]= 0;
							}
						});
						if(Ext.isFunction(callbackFun)){
							callbackFun.call(this || modFunsBack, modFunsBack);
						}
					}
				});
			}
		});

	},
	loadModule: function(mod_code,extraCfg,cbFunc){
		var me = this;
		Ext.Ajax.request({
	       	  url: 'main/Modules.do?method=getModuleByModIdCode',
	       	  method:'post',
	       	  params:{
	       		mod_code : mod_code
	       	  },
	       	   success:function(resp){
	       		   var text=resp.responseText;
	       		   var dataRecs=Ext.decode(text).data;
	       		   if(dataRecs.length>0){
	       			   if(extraCfg && Ext.isObject(extraCfg)){
	       				 dataRecs[0].extraCfg=dataRecs[0].extraCfg+Ext.encode(extraCfg);
	       			   }
	       			   var modRec = Ext.create('erp.setup.model.Module',dataRecs[0]);
	       			   me.loadModuleMC(modRec,cbFunc);
	       		   }
	       	   }
		});
		
	},
	loadModuleMvvm:function(rec,cbFunc){
			var me=this;
			var mainView=erp.Application.getMainView();
			var modId = rec.get('mod_id');
			if(Ext.isEmpty(modId)){
			    modId = rec.get('id');
			}
			var tabId=this.getModuleTabId(modId);
			var maincenter=mainView.down('MainCenter');
			var tabObj=maincenter.getComponent(tabId);
			//是否已经加载
			if(tabObj){
				if(tabObj.isDisabled()){
					return ;
				}
				this.showContentTab(tabObj)
				return;
			}
			var urlType,urlStr,modCtrller,modView,modExtraCfg;
			urlType = rec.get('urltype');
			urlStr =  rec.get('url');
			modCtrller = rec.get('ctrller');
			modView = rec.get('jsview');
			modExtraCfg = rec.get('extraCfg');
			if(Ext.isEmpty(urlType)||urlType==erp.Const.URL_TYPE_PAGE){
				//是普通页面模块
				var isUrl = true;
				if(Ext.isEmpty(urlStr)&&Ext.isEmpty(modView)){
					isUrl = false;
					urlStr ='模块定义存在问题,未设定请求路径!';
				}
				tabObj=this.loadPageModule(urlStr, module,isUrl,tabId);
				if(Ext.isFunction(cbFunc)){
					cbFunc.call(this,tabObj);
				}
				return;
	    	}else if(urlType==erp.Const.URL_TYPE_MODULE){
	    		var extraParam={};
	    		if(!Ext.isEmpty(modExtraCfg)){
	    			var modExtraParam;
	    			if (modExtraCfg.charAt(0)!='{'){
	    				modExtraParam = '{'+modExtraCfg+'}';
	    				extraParam=Ext.decode(modExtraParam);
	    			}
	    		}	
	    		//没有设定请求路劲或者没有成功创建TAB对象
	    		if (Ext.isEmpty(urlStr)&&Ext.isEmpty(modView)){
	    		//兼容原来的模式，仍然从url中解释json加载
					urlStr ='模块定义存在问题,未设定请求路径!';
					tabObj=this.loadPageModule(urlStr,rec,false,tabId);
					if(Ext.isFunction(cbFunc)){
						cbFunc.call(this,tabObj);
					}
					return;
				}
				try{
				//var tbar=erp.Util.getModuleToolbarByLogin(module.m_id);	
				var runMode = extraParam.runMode?extraParam.runMode:erp.Const.MODULE_RUN_MODE_TAB;
		    	tabObj=Ext.create(erp.Application.getModuleClassName(modView),{
		    						itemId:tabId,
					    			moduleName : rec.get('text'),
					    			module:rec,
					    			modId:modId,
					    			title:Ext.String.trim(rec.get('text')),
					    			iconCls:rec.get('iconCls')||rec.get('icon'),
					    			//actionctl:tbar,
					    			extraParam:extraParam,
									closable : true,
									reorderable : true
					    		});
				}catch (e){
		    		if(Ext.isEmpty(tabObj)){
		    			urlStr ='模块创建过程中发生错误，错误信息如下:<br/>'+e;
						tabObj=this.loadPageModule(urlStr,rec,false,tabId);
						if(Ext.isFunction(cbFunc)){
							cbFunc.call(this,tabObj);
						}
						return;
		    		}
				}
				erp.Util.getModuleFuncs(modId,function(modFunsBack){
					tabObj.modFuncsDisabled=modFunsBack//直接把功能权限控制赋给主控界面
					if(runMode!=erp.Const.MODULE_RUN_MODE_WINDOW){
				    	Ext.getBody().mask('正在加载,请稍候...');
				    	Ext.onReady(function(){
				    		Ext.create('Ext.util.DelayedTask',function(){
								//maincenter.setActiveTab(maincenter.add(tabObj));
								me.addContentTab(tabObj);
				    		}).delay(10);
							if(Ext.isFunction(cbFunc)){
								cbFunc.call(this,tabObj);
							}
						    Ext.getBody().unmask();
				    	},this);
					}else{
						tabObj.show();
					}
				})
	    	}else
	    	Ext.Msg('提示','模块菜单的[请求类型]有误,无法加载,请检查定义!');
	},
	/**
	 * 获取模块工具条
	 * 
	 */
	getModuleToolbarByLogin:function(mod_id){
   		var tbar=[];
   		var params={};
   		params.m_id=mod_id;
   		//若非管理员
   		if(!erp.Util.currentUser.isAdmin)
   			params['login_id']=erp.Util.currentUser.loginId;
   		params['isvalid']='true';	
   		var url="module/Modules.do?method=getToolBarByLoginid";	
   		var data=erp.Const.callServiceMethodSync(url,params);
   		Ext.each(data,function(item){
   			var btn={};
   			btn['text']=item['func_name'];
   			btn['itemId']=item['func_item_id'];
   			switch(item['func_item_id']){
   				case erp.Const.FUNC_ITEMID_BTN_EDT:
				case erp.Const.FUNC_ITEMID_BTN_DEL:
				case erp.Const.FUNC_ITEMID_BTN_DISABLED:
				case erp.Const.FUNC_ITEMID_BTN_AVALID:
					btn['disabled']=true;
					break;   				
   			}
   			btn['handler']=item['method_name'];
   			btn['glyph']=parseInt(item['func_icon_cls']);
   			if(item.data.length>0){
   				btn['xtype']='splitbutton';
   				var menus=new Ext.menu.Menu();
   				var data=item.data;
   				for(var o in data){
   					var obj=data[o];
   					menus.add({
   						text:obj['func_name'],
   						handler:obj['method_name'],
   						svr_path:obj['svr_path'],
   						imp_id:obj['imp_id'],
   						glyph:parseInt(item['func_icon_cls'])
   					});
   				}
   				btn['menu']=menus;
   			}
   			tbar.push(btn);
   			
   		});
   		if(tbar.length>0)
   			tbar.push('-')
   		tbar.push({text: '刷新',	
   				glyph : 0xf021,	
   				itemId:erp.Const.FUNC_ITEMID_BTN_REFRESH,
   				handler:'onGridRefresh'});	
   		return tbar;
   	},
	//根据Model生成相应的Gird column
	/**
	 * @param {} moduleModel Store传入的Model
	 * @param {} displayColummns 需显示的列
	 * @param {} filterColumns 需过滤的列
	 * @return {} columns 表格列
	 */
	getColumns : function(moduleModel, displayColummns,filterColumns) {
		var columns = [];
		//columns.push({xtype:'rownumberer',width:40});
		var fields=moduleModel.getFields();
		for(var idx in fields){
			if (idx!='ordinal'&&idx!='-1'&&idx!='items'&&fields[idx].name!='id'&&fields[idx].name!='row_permit'){
				var field=fields[idx];
				//跳过隐藏字段
				if(field.hidden)
					continue;
				//显示的行	
				if(!Ext.isEmpty(displayColummns)&&displayColummns[field.name])	
					columns.push(this.getColumn(field));
				//过滤行	
				else if (!Ext.isEmpty(filterColumns)&&filterColumns[field.name])
					continue;
				else if(Ext.isEmpty(displayColummns))
					columns.push(this.getColumn(field));
			}
		}
		return columns;
	},
	getSupcanColumns:function(moduleModel){
		var columns = [];
		var fields=moduleModel.getFields();
		Ext.each(fields,function(m){
				var datatype=m.type,
				displayMask=m.displayMask||'',
				edittype= "string",
				//判断是否合计
				totalExpress='';
				switch(datatype){
					case 'date':
						displayMask+="=FormatDate(data, 'YYYY-MM-DD');";
					break;
					case 'int':
					case 'float':
						if(m.isSign==null){
							displayMask+="=if(data!=0,formatNum(data,'###0.#######'), '');";
						}
						edittype='double';
					break;
				}
				switch(m.name){
					case 'czsj':
						//displayMask="";
					break;
				}
				if(m.allow_summaryOne){
					totalExpress="='合 计'+'('+@rows+')'";
				}else if(m.summaryRenderer){
					totalExpress="=formatNum(@sum,'###0.#######')";
				}
				if(m.isSign){
					datatype='boolean';
					edittype='Check'
				}
				var prec=6;
				if(m.prec){
					prec=m.prec;
				}
				var fld=Ext.create('erp.common.form.model.FrmFld',{
					editable:false,
					code:m.name,
					name:m.header||m.name,
					datatype:datatype,
					width:m.columnWidth,
					ishide:m.hidden,
					displayMask:displayMask,
					edittype:edittype,
					totalExpress:totalExpress,
					prec:prec
				})
				columns.push(fld);
			})
		return columns;
	},
	getFormatText: function(typeCode, value) {
		// 根据类型过滤后再查找,查不到的返回原值
		// 用于给列表的代码提供名称
		return erp.DataUtil.getCBXValueByDis(typeCode, value);
	},
	getCombxStore: function(typeCode) {
		// 根据类型过滤后产生一个内存store
		// 一般用于下拉Comobox
		return erp.DataUtil.getComboStore(typeCode);
	},
	/**
	 * @param {} rec 当前记录
	 * @param {} grid 属性表格
	 */
	setPropertyGridColumns:function(rec,grid){
		var fields=rec.getFields();
		var fieldName,fieldValue;
		var source={};
		for(var idx in fields){
			if (idx!='-1'&&idx!='items'&&fields[idx].name!='id'){
				 var no=parseInt(idx)
				 fieldName=no<9?"0"+(no+1)+"."+fields[idx]["header"]:(no+1)+"."+fields[idx]["header"];
				if(Ext.isEmpty(fields[idx]["render"])) 
				 fieldValue=rec.get(fields[idx]["name"]);
				else{
				 var configRec=erp.DataConst.Config.findRecord('code',fields[idx].render,0,false,false,true);
				 if(configRec)
				 {
				 	var store=Ext.create(configRec.get('store')).load();
				 	var findRec=store.findRecord(configRec.get('valueField'),rec.get(fields[idx]["name"]),0,false,false,true);
					fieldValue=findRec?findRec.get(configRec.get('displayField')):rec.get(fields[idx]["name"]);
				 }
				 else{
				 	//fieldValue=erp.DataUtil.getCbxNameByValue(fields[idx]["render"],rec.get(fields[idx]["name"]))	
				 }
				}
				
				source[fieldName]=fieldValue;
			}
		}
		grid.setSource(source);
	},
	// 看看分组名称是不是 下面column 的开头，如果是开头的话，并且columntitle 后面有内容，就把
	// 相同的部分截掉
	canReduceTitle : function(group, field) {
					if (field.text.indexOf(group.text) == 0) {
						field.text = field.text.slice(group.text.length).replace('(', '')
								.replace(')', '').replace('（', '').replace('）', '');
						if (field.text.indexOf("<br/>") == 0)
							field.text = field.text.slice(5);
					}
				},
				
	/**
	 * 根据groupField,fieldDefine的定义，生成一个column的定义
	*/
	getColumn : function(fd) {
					var ft = fd.header?fd.header.replace(new RegExp('--', 'gm'), '<br/>'):fd.name;
					//计量单位
					if (fd.unit)
						ft += '<br/>(' + fd.unit + ')';
					var field = {
						filter : {},
						maxWidth : 800,
						sortable : true,
						header : ft,
						filter:'string',
						dataIndex : fd.name,
						renderer:fd.renderer,
						summaryRenderer:fd.summaryRenderer,
						editor : {xtype:'textfield',
						disabled:fd.disabled?fd.disabled:false,
						allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
						blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText
						}
					}
					switch (fd.type) {
						case 'date' :
						case 'Date' :
							Ext.apply(field, {
										xtype : 'datecolumn',
										align : 'center',
										width : 100,
										filter:'date',
										format:'Y-m-d',
										renderer : fd.renderer||Ext.util.Format.dateRendererOne,
										// formatter : 'dateRenderer', //
										// 定义在Ext.util.Format中的渲染函数可以用这种方法调用
										editor : { // 如果需要行内修改，需要加入此属性
											xtype : 'datefield',
											format : 'Y-m-d',
//											editable : false,
											renderer : Ext.util.Format.dateRendererOne,
											disabled:fd.disabled?fd.disabled:false,
											allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
											blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText
										}
									});
							break;

						case 'Datetime' :
							Ext.apply(field, {
								xtype : 'datecolumn',
								align : 'center',
								width : 130,
								filter:'date',
								dateFormat:'Y-m-d H:i:s',
								renderer : fd.renderer||Ext.util.Format.dateRendererOne,
								allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
								blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText
									// formatter : 'dateRenderer'
								});
							break;
						case 'boolean' :
						case 'Boolean' :
							field.xtype = 'checkcolumn';
							field.stopSelection = false;
							filter:'boolean',
							field.processEvent = function(type) { // 加入这一句，可以防止点中修改
								if (type == 'click')
									return false;
							};
							break;
						case 'int':
						case 'Integer' :
							if(fd.isSign){
								Ext.apply(field, {
											align : 'center',
											filter:'boolean',
											renderer :this.Staterenderer
								});
							}else{
								Ext.apply(field, {
											align : 'right',
											xtype : 'numbercolumn',
											format : '#',
											filter:'number',
											renderer : fd.renderer||Ext.util.Format.intRenderer,
											// formatter : 'intRenderer',
											editor : {
												xtype : 'numberfield',
												disabled:fd.disabled?fd.disabled:false,
												allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
												blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText
											}
										});
							}
							break;

						// 金额字段
						case 'Money' :
							Ext.apply(field, {
										align : 'right',
										xtype : 'numbercolumn',
										width : 110,
										filter:'number',
										renderer : fd.renderer||Ext.util.Format.monetaryRenderer,
										editor : {
											xtype : 'numberfield',
											disabled:fd.disabled?fd.disabled:false,
											allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
											blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText
										}
									});
							break;
						case 'float' :
						case 'Double' :
							Ext.apply(field, {
								align : 'right',
								xtype : 'numbercolumn',
								width : 110,
								filter:'number',
								renderer : fd.renderer||Ext.util.Format.floatRenderer,
								allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
								blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText
									// formatter : 'floatRenderer' // 这种方法不可以
								});
							break;
						
						case 'Percent' :
							Ext.apply(field, {
								align : 'center',
								minWidth : 80,
								renderer : fd.renderer||Ext.util.Format.percentRenderer,
								// xtype : 'widgetcolumn', // 这里注释掉的是extjs5自带的百分比类型的显示方法
								// widget : {
								// xtype : 'progressbarwidget',
								// textTpl : ['{percent:number("0.00")}%']
								// },
								editor : {
									xtype : 'numberfield',
									disabled:fd.disabled?fd.disabled:false,
									allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
									blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText,
									step : 0.01
								},
								width : 110
									// 默认宽度
								})
							break;
						default :
							break;
					}

					if (field.xtype == 'numbercolumn') {
						Ext.apply(field, {
									listeners : { // 将标题栏的内容居中，靠右的话有时候显示不全
										render : function(column) {
											column.getEl().removeCls('x-column-header-align-right');
											column.getEl().addCls('x-column-header-align-center');
											// column.removeListener('render');
										}
									}
								})
					}
					//允许合计
					if(fd.allow_summaryOne){
							Ext.apply(field, {
								hasSummary : true,
								summaryType : 'count',
								summaryRenderer : function(value, summaryData,dataIndex) {
									return '合计';
								}
							})
						}
					if (fd.allow_summary) {
							Ext.apply(field, {
								hasSummary : true,
								summaryType : 'sum',
								summaryRenderer : function(value, summaryData,dataIndex) {
									return value > 0 ? Ext.util.Format.number(value, fd.summaryFomat? fd.summaryFomat: '0,000.00') : '';
								}
							})
					}
					if (fd.columnWidth > 0)
						field.width = fd.columnWidth;
					else if (!fd.columnWidth||fd.columnWidth == -1) {
						field.flex = 1;
						field.resizable = false;
						field.minWidth = 120;
						field.maxWidth = 600;
					}
					//表格渲染
					if(!Ext.isEmpty(fd.render)){
					   var configRec=erp.DataConst.Config.findRecord('code',fd.render,0,false,false,true);
					  	//若在基本资料表中找到Store
					  if(!configRec)	
					  {
						Ext.apply(field,{
							renderer:function(v){
						  			//return erp.DataUtil.getCbxNameByValue(fd.render,v);
							},
							field:{
								xtype:'combo',
								//store:erp.DataUtil.getComboStore(fd.render),
								allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
								blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText,
								disabled:fd.disabled,
								queryMode: 'local',
								displayField:'name',
								valueField:'value'
							}});
					  }else{
					  		var store
					  		if(configRec.get('store'))
					  			store=Ext.create(configRec.get('store'));
					  		else if (Ext.create(fd.store))
					  		    store=Ext.create(fd.store);
							//否则在config 中找record
							Ext.apply(field,{
							renderer:function(v){
									var rec=store.findRecord(configRec.get('valueField'),v,0,false,false,true);
						  			return rec?rec.get(configRec.get('displayField')):v;
							},
							editor:{
								xtype:configRec.get('xtype')?configRec.get('xtype'):'combo',
								store:store,
								allowBlank:Ext.isEmpty(fd.allowBlank)?true:fd.allowBlank,
								blankText:Ext.isEmpty(fd.blankText)?'':fd.blankText,
//								queryMode: 'local',
								disabled:fd.disabled,
								displayField:configRec.get('displayField'),
								valueField:configRec.get('valueField')
							}});
						}	
					  
					}
					return field;
				},
	getFields:function(moduleModel){
			var result={}
			var fields=moduleModel.getFields();
			for(var idx in fields){
				if (idx!='-1'&&idx!='items'&&fields[idx].name!='id'){
					var field=fields[idx];
					result[field.name]=field.header;
//					result.push('"'+field.name+'":"'+field.header+'"');
				}
			}
//			return result.join(',');
			return Ext.JSON.encode(result);
	},
	//获取字符串的长度
	gettextlength:function(str) { 
	  var len = 0; 
	  if(Ext.isEmpty(str)){
	  	return 0;
	  }
	  for (var i=0; i<str.length; i++) { 
	    if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) { 
	       len += 2; 
	     } else { 
	       len ++; 
	     } 
	   } 
	  return len; 
	},
	//标记渲染
	Staterenderer : function(value) {
		if (value == "true" || value == "1") {
			return '<img class="x-grid-checkcolumn-checkshow x-grid-checkcolumn-checked-checkshow" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
		} else {
			return '<img class="x-grid-checkcolumn-checkshow" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
		}
	},
	//grid自适应列宽
	gridAutoColumnsWidth:function(grid){
		if(grid.getStore().getCount()>0){
			Ext.suspendLayouts();
			Ext.Array.forEach(grid.getView().headerCt.items.items,function(group) {
				if (!group.resizeDisabled)
					group.autoSize();
			})
			Ext.resumeLayouts(true);
		}
	},
	//grid初始化时选中第一个
	gridSelect:function(grid,recs){
		var drecs=grid.getSelectionModel().getSelection();
		if(drecs.length>0){
			grid.getView().focusRow(drecs[0]);
		}else{
			if(recs.length>0){
				grid.getSelectionModel().select(recs[0]);
			}
		}
	},
	ftpDel:function(urlId){
		Ext.Ajax.request({
					//将生成的xml发送到服务器端,需特别注意这个页面的地址
					url : 'common/deleteAttachement.action',
					async : false,
					timeout : 600000,
					method : 'POST',
					success : function(response, opts) {
						
					},
					disableCaching : true,
					isUpload : true,
					params : {
						urlId : urlId
					}
				});
	},
	//材料规格计算结果
	getClgg:function(cltx){
		var result=0;
		for(var i=0;i<cltx.length;i++){
			var j=cltx1.substring(i,i+1);
			
		}
		return result;
	},
	//判断字符串是够是数字
	isNum:function(str){
		var re=/^[0-9]+.?[0-9]*$/;
		var cltx1='a';
		if(re.test(cltx1)){
			return true;	
		}else{
			return false;
		}
	},
	//model数组转json
	ModelsToJson:function(recs){
		var objs=new Array();
		Ext.each(recs,function(rec){
			objs.push(rec.data);
		})
		return Ext.encode(objs);
	},
	//新增排他表记录
	addExclusive:function(bills_num,bills_id){
		var u_id=erp.Util.currentUser.userInfo.login_id;
		var u_name=erp.Util.currentUser.userInfo.name;
		var ip_add=erp.IP;
		var u_mac='';
		//参数初始化
		var result = erp.Const.callServiceMethodSync(
			'main/exclusive.do?method=addExclusive', {
			u_id:u_id,bills_num:bills_num,ip_add:ip_add,u_mac:u_mac,u_name:u_name,bills_id:bills_id
		});
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}
	},
	//判断单据是否已打开
	checkExclusive:function(bills_num,bills_id){
		var u_id=erp.Util.currentUser.userInfo.login_id;
		var u_name=erp.Util.currentUser.userInfo.name;
		var ip_add=erp.IP;
		var u_mac='';
		//参数初始化
		var result = erp.Const.callServiceMethodSync(
			'main/exclusive.do?method=getExclusiveList', {
			u_id:u_id,bills_num:bills_num,ip_add:ip_add,u_mac:u_mac,u_name:u_name,bills_id:bills_id
		});
		var data = result;
		if (data.length>0) {
			var rec=data[0];
			Ext.Msg.alert('提示','该笔单据【'+rec.u_name+'】正在编辑,请稍候重试！');
			//Ext.toastErrorInfo();
			return true;
		}else{
			return false;
		}
		
	},
	//删除排他表
	deleteExclusive:function(bills_num,bills_id){
		var u_id=erp.Util.currentUser.userInfo.login_id;
		var u_name=erp.Util.currentUser.userInfo.name;
		var ip_add=erp.IP;
		var u_mac='';
		//参数初始化
		var result = erp.Const.callServiceMethodSync(
			'main/exclusive.do?method=deleteExclusiveFromId', {
			u_id:u_id,bills_num:bills_num,ip_add:ip_add,u_mac:u_mac,u_name:u_name,bills_id:bills_id
		});
		var data = Ext.decode(result);
		if (!data.bool) {
			Ext.toastErrorInfo(data.msg);
			return;
		}else{
			return data;
		}
	},
	//排他单据添加监听
	addTask:function(view,bills_num,bills_id){
		 var me=this;
		 me.addExclusive(bills_num,bills_id);
		 var runner = new Ext.util.TaskRunner();
		 view.task = runner.newTask({
		     run:function(){
		     	me.addExclusive(bills_num,bills_id)
		     },
		     interval: 15000
		 })
		 view.task.start();
	},
	/**
	 * @param {打印按钮ID号} menu
	 * @param {菜单功能模块ID号} modId
	 * @param {关联前台的表格控件} traget
	 * @author 华慧
	 * create data: 2014-10-23
	 */
	setMenuFunc:function(menu,modId,scope,callback){
		var me=this;
		var menuFunc=null;
		Ext.Ajax.request({
		 url: 'report/SysReports.do?method=getSysPrintModelList',                       
         method: 'POST',
         async:false,
         callback: function (o, s, r) {
	         var resp=Ext.decode(r.responseText);
	         var data=resp.data;
	         menuFunc=data;
	         if(Ext.isEmpty(data)){
	         	Ext.apply(menu,{disabled:true});
	         }
	         else{
	         Ext.each(data,function(rec){
			          	menu.menu.add({
			          		 iconCls:'printer',
			          	     text:rec.name,
			          	     record:rec,		//将打印模板记录保存在record中,用于那些需要选择模板的情况；
			          	     handler:function(item){
			          	     	//加入作用域变量,主要用于打印前条件检查等
			          	     	//PrintCheck:在页面中实现具体代码
			          	     	//华慧
			          	     	//2015-06-08
			          	     	if(scope){
			          	     		if (!Ext.isEmpty(scope.PrintProcess)&&Ext.isFunction(scope.PrintProcess)){
			          	     			var recs=scope.PrintProcess(item);
			          	     			if(Ext.isEmpty(recs))
			          	     				return;
			          	     			else
			          	     				recs[0].set('dyr',erp.Util.currentUser.name);
			          	     		}
			          	     		else{
			          	     			Ext.Msg.alert("提示","打印设置出现问题，请联系管理员!");
			          	     			return;
			          	     		}
			          	     	}else
			          	     		return;
			          	     	//开始打印
			          	      	me.doPrint(rec,recs,callback);
			          	     }
			          	  });
			    });
	         }
          },
		 params:{menu_id:modId,is_active:'true'}
		});
		return menuFunc;
	},
	getPrintMenu:function(){
		
	},
	/**
	 * @description 开始打印
	 * @param {打印模板记录} rec
	 * @param {选中的打印记录} recs
	 * @author 华慧
	 * create data: 2015-06-09
	 */
	doPrint:function(rec,recs,callback){
		var recprint = Ext.create('erp.report.engine.model.SysPrintModel', {
					mod_id : rec.mod_id,
					default_style : rec.default_style,
					mod_tpl : rec.mod_tpl,
					report_type : 'SYS',
					// 打印模式
					tpl_type : '04'
				});	
		if (!Ext.isEmpty(recprint.get('mod_tpl')))
			if (recs.length > 0){
				erp.Util.addContentTab({
							xtype : 'sys_tpldesigner',
							iconCls : 'printer',
							itemId : Ext.id(),
							isOrder:rec.isOrder,//合同外发标记
							title : rec.name,
							printRecs : recs,
							tplRec : recprint,
							callback:callback,//增加一个回调函数用于supcan事件监听
							closable : true
						});
			}
			else {
				Ext.Msg.alert("提示", "请选择一笔打印记录!");
			}
		else
			erp.AnalysisFun.doquery(recprint, null);
	},
	showMsg: function(message) {
//		var wh=[200,80];
		Ext.toastInfo(message);
	},
	//获取平台映射帐号
	getPlatformLoginId:function(){
		var accountMap = erp.UInfo.currentUser.accountMap;
		var login_id = '';
		if (accountMap != null) {
			Ext.each(accountMap, function(acc) {
				if (acc.sys_name == 'SRM') {
					login_id = acc.ref_u_id;
				}
			})
		}
		return login_id;
	},
	//store 同步  数据 
	storeSync : function(store) {
		var upRecs = store.getUpdatedRecords(), 
		newRecs = store.getNewRecords(), 
		delRecs = store.getRemovedRecords(), 
		proxy = store.getProxy(), 
		api = proxy.api, 
		create = api.create, 
		destroy = api.destroy, 
		update = api.update;
		//如果此次有数据变更则先保存数据
		if (delRecs&&delRecs.length > 0) {
			var result = erp.Const.callServiceMethodSync(destroy, {
						data : erp.Util.ModelsToJson(delRecs)
					});
			//数据修改完之后提交
			Ext.each(delRecs,function(r){
				r.commit();
			})
		}
		if (newRecs&&newRecs.length > 0) {
			var result = erp.Const.callServiceMethodSync(create, {
						data : erp.Util.ModelsToJson(newRecs)
					});
			//数据修改完之后提交
			Ext.each(newRecs,function(r){
				r.commit();
			})
		}
		if (upRecs&&upRecs.length > 0) {
			var result = erp.Const.callServiceMethodSync(update, {
				data : erp.Util.ModelsToJson(upRecs)
			});
			//数据修改完之后提交
			Ext.each(upRecs,function(r){
				r.commit();
			})
		}
	}
},function(){
    erp.Util = erp.util.Util= new this();
})