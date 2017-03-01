/**
 * 序列编辑窗口
 * 作者：华慧
 * 创建日期: 2015.1.13
 */
Ext.define('erp.setup.view.EditSerialRule',{
	extend: 'erp.ux.Window',
	alias: 'widget.edt_Serial',
	requires:['erp.ux.FormKey'
	          ,'erp.ux.RemoteValidator'
	          ,'Ext.ux.CheckColumn'
	          ,'erp.setup.store.SerialRuleDetail'
	          ,'erp.setup.model.SerialRuleDetail'
	          ,'erp.util.AppUtil'],
	title: '序列定义',
	iconCls:'pin_edit',
	layout:'border',
	width: 900,
	height: 640,
	resizable : true,
	modal : true,
	CODEPART_MAX_LENGTH:10,
	INCRSEQ_DEFAULT_LENGTH:4,
	INCRSEQ_MIN_VALUE:1,
	INCRSEQ_MAX_VALUE:9999999999,
	
	getCgrdGrid:function(){
		return this.down('#cgrd_grid');
	},
	getCgrdStore:function(){
		return this.getCgrdGrid().getStore();
	},
	getCgrForm:function(){
		return this.down('#cgr_form');
	},
	getCgrRec:function(){
		var cgrRec = this.getCgrForm().getRecord();
		this.getCgrForm().updateRecord(cgrRec);
		return cgrRec;
	},
	doInit:function(cgrRec){
		//加载编码方案
		this.getCgrForm().loadRecord(cgrRec);
		//加载编码方案细节
		if(!this.isAddNew){
			var cgrdStore = this.getCgrdStore();
			cgrdStore.load({params:{sr_id:cgrRec.get('sr_id')}});
		}
	},
	addMsg:function(msg){
		var msgArea = this.down('#msgArea');
		msgArea.setValue(msgArea.getValue()+'\r\n'+msg);
	},
	clearMsg:function(){
		var msgArea = this.down('#msgArea');
		msgArea.setValue('');
	},
	doCheck:function(){
		var me = this;
		var rec = me.getCgrRec();
		var codeExists = false;
		if(me.isAddNew){
            Ext.Ajax.request({
                url:"main/Serial.do?method=getSerialRuleExists",
                actionMehtods:'post',
                async: false,
                params:{
                    code:rec.get('code')
                },
                success:function(resp){
                    codeExists=Ext.decode(resp.responseText).data;
                }
            });
            if(codeExists){
                Ext.Msg.alert('提示','规则代码['+rec.get('code')+']已经存在,不能重复输入!');
                return ;
            }else
                return me.doCheckRule();
        }else
            return me.doCheckRule();
	},
	doCheckRule:function(){
		var me = this;
		var err = false;
		var warn = false;
		var msg='';
		//检查规则定义是否正确
		var totalLen = me.getCgrRec().get('len');
		var store = me.getCgrdStore();
		var calLen =0;
		var incrCount =0;
		var emptyRows =[];
		me.clearMsg();
		me.addMsg('开始规则检查...');
		store.each(function(rec){
			var codePart = rec.get('code');
			var len = rec.get('len');
			var order_seq = rec.get('order_seq');
			calLen += len;
			if(len==0){
				var msg =Ext.String.format('错误:序号[{0}],长度为0!',order_seq);
				me.addMsg(msg);	err = true;
				return true;
			}
			switch(codePart){
				case erp.Const.CODEPART_TYPE_SYSDATE:
					var dateFormat = rec.get('date_format');
					if(Ext.isEmpty(dateFormat)){
						msg =Ext.String.format('错误:序号[{0}],未指定日期格式!',order_seq);
						me.addMsg(msg);	err = true;
						return true;
					}
					break;
				case erp.Const.CODEPART_TYPE_INCRSEQ:
					incrCount +=1;
					var step = rec.get('step');
					var step_jmp = rec.get('step_jmp');
					var seed = rec.get('seed');
					var minValue = rec.get('min_value');
					var maxValue = rec.get('max_value');
					var firstValue = seed + step;
					if(step ==0){
						msg =Ext.String.format('错误:序号[{0}],步进值不能为0,否则序列号无法变动!',order_seq);
						me.addMsg(msg);	err = true;
						return true;
					}else{
						//最大值超过长度
						if(maxValue > (Math.pow(10,len)-1)){
							if(firstValue>maxValue){
								msg =Ext.String.format('错误:序号[{0}],最大值[{1}]超过变长长度[{2}]!',
										order_seq,maxValue,len);
								me.addMsg(msg);	err = true;
								return true;
							}
						}
						if(step >0){
							if(firstValue>maxValue){
								msg =Ext.String.format('错误:序号[{0}],根据公式[初始值+步进值=首次值],{1}+{2}={3}超过最大值[{4}]!',
										order_seq,seed,step,firstValue,maxValue);
								me.addMsg(msg);	err = true;
								return true;
							}
							
						}else{
							if(firstValue<minValue){
								msg =Ext.String.format('错误:序号[{0}],根据公式[初始值+步进值=首次值],{1}{2}={3}低于最小值[{4}]!',
										order_seq,seed,step,firstValue,minValue);
								me.addMsg(msg);	err = true;
								return true;
							}
						}
						//警告性检查
						//长度小于4位的自增序列很容易用完
						if(len<me.INCRSEQ_DEFAULT_LENGTH){
							msg =Ext.String.format('警告:序号[{0}],自增序列长度=[{1}]过短,可能很快用光!',
									order_seq,len);
							me.addMsg(msg);	warn = true;
						}
						//跳跃值检查
						msg =Ext.String.format('提示:序号[{0}],跳跃值决定序列发生器的性能,过小影响性能,过大容易浪费,建议配置值如下(根据估算增长速度)：',order_seq);
						me.addMsg(msg);
						msg='    0-100个/天[0]; 200-500个/小时[1-20]; 200-500/分钟[30-50]; 200-500/秒[100]; 请根据估算增长速度酌情配置。';
						me.addMsg(msg);
						
						if(step >0){
							if(firstValue>maxValue){
								msg =Ext.String.format('警告:序号[{0}],根据公式[初始值+跳跃值*步进值+步进值=首次跳跃值],{1}+{2}*{3}+{3}={4}超过最大值[{5}],不够一次跳跃使用!',
										order_seq,seed,step_jmp,step,firstValue,maxValue);
								me.addMsg(msg); warn = true;
							}
						}else{
							if(firstValue<minValue){
								msg =Ext.String.format('警告:序号[{0}],根据公式[初始值+跳跃值*步进值+步进值=首次跳跃值],{1}{2}*{3}{3}={4}低于最小值[{5}],不够一次跳跃使用!',
										order_seq,seed,step_jmp,step,firstValue,minValue);
								me.addMsg(msg);	warn = true;
							}
						}
					}
					break;
				case erp.Const.CODEPART_TYPE_FIXEDTEXT:
					if(Ext.isEmpty(rec.get('fixed_text'))){
						msg =Ext.String.format('错误:序号[{0}],固定文本没有填写或只有空格!',order_seq);
						me.addMsg(msg);	err = true;
					}
					break;
				case erp.Const.CODEPART_TYPE_FORMFIELD:
					break;
				default:
					break;
			}
		});
		if(incrCount >1){
			msg = Ext.String.format('错误:规则中最多只能存在一条自增序号,但现在您定义了{0}条!',incrCount);
			me.addMsg(msg);	err = true;	
		}
		if(calLen != totalLen){
			msg =Ext.String.format('错误:编码总长度[{0}]与各规则长度总和[{1}]不相等!',totalLen,calLen);
			me.addMsg(msg);	err = true;
		}
		me.addMsg('规则检查结束...');
		if(err)
			return 'error';
		if(warn)
			return 'warn';
		return 'ok';
	},
	doSave:function(callBack,scope){
		var me = this;
		var cgrRec = me.getCgrRec();
		var cgrdStore =me.getCgrdStore();
		if(me.isAddNew){
			//先新增CodeGinRule
			var data =[];
			data.push(cgrRec.data);
			var postData=
			erp.Const.callServiceMethod('main/Serial.do?method=addSerialRule',
				{	
					model:'SerialRule',
					data:Ext.encode(data)
				},
				function(retRecs,errMsg,total){
					if(Ext.isArray(retRecs)){
						cgrRec.set(retRecs[0]);
						cgrRec.commit();
						me.getCgrForm().loadRecord(cgrRec);
						//再保存CgrDetail
						cgrdStore.each(function(rec){
							rec.set('sr_id',cgrRec.get('sr_id'));
						});
						me.isAddNew = false;
						me.down('#firstFocusOn').setReadOnly(!me.isAddNew);
						cgrdStore.sync({
						    success:function(){
						      if(Ext.isFunction(callBack))
                                   callBack.call(scope||me,cgrRec);
						    }
						});
					}else{
						Ext.Msg.alert('出错了',errMsg);
					}
			});
		}else{
			cgrdStore.sync({
				 //只有修改了规则细节时才需要刷新应用服务端的计数缓存
			     success:function(){
			         //修改了编码规则，需要刷新应用服务端的计数缓存
                    erp.AppUtil.clearCgrCacheByCode(cgrRec.get('code'));
			     }
			});
   			if(Ext.isFunction(callBack))
   				callBack.call(scope||me,cgrRec);
		}
	},
	onBeforeCellEdit:function(ed,ctx){
		var ret=false;
		var rec = ctx.record;
		var codePart = rec.get('code');
    	switch(ctx.field){
    		case 'order_seq':
    			ret = true;
    			break;
    		case 'code':
    			ret = true;
    			ctx.column.preCodePart = ctx.value;
    			break;
    		case 'field_code':
    			ret = codePart===erp.Const.CODEPART_TYPE_FORMFIELD;
    			break;
    		case 'len':
    			//日期和固定文本不能自由指定长度
    			ret = (codePart!=erp.Const.CODEPART_TYPE_SYSDATE) && (codePart!=erp.Const.CODEPART_TYPE_FIXEDTEXT)&&(!Ext.isEmpty(codePart));
    			break;
    		case 'is_substr':
    			//非自增序号且长度>0
    			ret = codePart!=erp.Const.CODEPART_TYPE_USERPARAM&&codePart!=erp.Const.CODEPART_TYPE_INCRSEQ && rec.get('len')>0;
    			break;
    		case 'sub_start':
    		case 'sub_end':
    			ret = rec.get('is_substr')==true;
    			break;
    		case 'date_format':
    			//只有系统日期可以录入
    			ret = codePart === erp.Const.CODEPART_TYPE_SYSDATE;
    			break;
    		case 'fixed_text':
    			//只有固定文本可以录入
    			ret = codePart === erp.Const.CODEPART_TYPE_FIXEDTEXT;
    			break;
    		case 'uparam_type':
    			//只有用户参数可以录入
    			ret = codePart === erp.Const.CODEPART_TYPE_USERPARAM;
    			break;
    		case 'seed':
    		case 'step':
    		case 'step_jmp':
    		case 'reset_mode':
    		case 'min_value':
    		case 'max_value':	
    			//这几个只有自增序号可以录入
    			ret = codePart === erp.Const.CODEPART_TYPE_INCRSEQ;
    			if(ctx.field=='min_value')
    				ret = ret && rec.get('step')<0;
    			if(ctx.field=='max_value')
    				ret = ret && rec.get('step')>=0;
    			break;
    		default:
				break;
		}
    	return ret;
	},
	onAfterCellEdit:function(ed,ctx){
		function resetLen(rec,curLen,dataLen){
			if((curLen>=dataLen||curLen==0)){
				rec.set('len',dataLen);
				if(rec.get('is_substr')){
					rec.set('sub_start',1);
					rec.set('sub_end',dataLen);
				}
			}else if(rec.get('is_substr')==false){
				rec.set('len',dataLen);
			}
		};
		var rec = ctx.record;
		var codePart = rec.get('code');
    	switch(ctx.field){
    		case 'code':
    			if(ctx.value != ctx.column.preCodePart && !Ext.isEmpty(ctx.column.preCodePart) ){
    				//改变编码组成时需要清空当前的配置
	    			var cgrdRec = Ext.create('erp.setup.model.SerialRuleDetail',{
	    				sr_id:rec.get('sr_id'),
	    				code:codePart,
						order_seq:rec.get('order_seq')
	    			});
	    			cgrdRec.set('id',rec.get('id'));
	    			rec.beginEdit();
	    			rec.set(cgrdRec.data);
	    			rec.endEdit(false);
    			}
    			if(ctx.value === erp.Const.CODEPART_TYPE_INCRSEQ){
    				//自增序列默认长度4位，太短的意义不大
    				rec.set('len',this.INCRSEQ_DEFAULT_LENGTH);
    				rec.set('min_value',1);
    				rec.set('max_value',Math.pow(10,this.INCRSEQ_DEFAULT_LENGTH)-1);
    				rec.set('reset_mode',erp.Const.INCRSEQ_RESETMODE_NOT);
    			}else if(ctx.value === erp.Const.CODEPART_TYPE_SYSDATE){
    				rec.set('len',rec.get('date_format').length);
    			}
    			break;
    		case 'len':
				//日期和固定文本不能自由指定长度
				if(codePart===erp.Const.CODEPART_TYPE_SYSDATE || codePart===erp.Const.CODEPART_TYPE_FIXEDTEXT)
					return;
				//自增序号
				if(codePart===erp.Const.CODEPART_TYPE_INCRSEQ){
					var maxValue = Math.pow(10,ctx.value)-1;
					rec.set('max_value',maxValue);
				}
				break;
    		case 'max_value':
				var maxValue = ctx.value;
				var str = ''+maxValue;
				var maxLen = Math.min(str.length,this.CODEPART_MAX_LENGTH);
				rec.set('len',maxLen);
				break;
    		case 'is_substr':
    			var len =ctx.value?rec.get('len'):1;
    			rec.set('sub_start',1);
				rec.set('sub_end',len);
				var maxLen = rec.get('len');
				if(!ctx.value){
					if(codePart===erp.Const.CODEPART_TYPE_SYSDATE)
						maxLen = rec.get('date_format').length;
					if(codePart===erp.Const.CODEPART_TYPE_FIXEDTEXT)
						maxLen = rec.get('fixed_text').length;
					rec.set('len',maxLen);
				}
    			break;
    		case 'sub_start':
			case 'sub_end':
				var maxLen = rec.get('len');
				if(codePart===erp.Const.CODEPART_TYPE_SYSDATE)
					maxLen = rec.get('date_format').length;
				if(codePart===erp.Const.CODEPART_TYPE_FIXEDTEXT)
					maxLen = rec.get('fixed_text').length;
				var len = Math.min(rec.get('sub_end'),maxLen) - rec.get('sub_start')+1;
				//if(len>=0 && len <= maxLen && rec.get('sub_end')<=maxLen)
				if(len>=0)
					rec.set('len',len);
				break;
    		case 'date_format':
    		case 'fixed_text':
				var curLen = rec.get('len');
				var dataLen = rec.get(ctx.field).length;
				resetLen(rec,curLen,dataLen);
				break;
    		case 'step':
    			var step = rec.get('step');
    			if(step>=0){
    				rec.set('min_value',rec.get('seed'));
    				rec.set('max_value',Math.pow(10,rec.get('len'))-1);
    			}else{
    				rec.set('min_value',-(Math.pow(10,rec.get('len'))-1));
    				rec.set('max_value',rec.get('seed'));
    			}
        		break;
    		case 'seed':
    			var len = rec.get('len');
    			var seed = rec.get('seed');
    			if(rec.get('step')>=0)
    				rec.set('min_value',seed);
    			else
    				rec.set('max_value',Math.min(seed,Math.pow(10,len)-1));
    			break;
    		case 'step_jmp':
    		case 'is_everyday':
    			break;
    		default:
				break;
		}
	},
	onSpinUpDown:function(field,isUp){
		var rec = this.down('#cgrd_grid').getSelectionModel().getSelection()[0];
		var codePart = rec.get('code');
		switch(field.name){
			case 'len':
				//自增序号
				if(codePart===erp.Const.CODEPART_TYPE_INCRSEQ){
					var maxValue = Math.pow(10,(field.value+(isUp?1:-1)))-1;
					rec.set('max_value',maxValue);
				}
				break;
			case 'max_value':
				var maxValue = field.value+(isUp?1:-1);
				var str = ''+maxValue;
				var maxLen = Math.min(str.length,this.CODEPART_MAX_LENGTH);
				rec.set('len',maxLen);
				break;
			case 'sub_start':
			case 'sub_end':
				var v = rec.get(field.name)+(isUp?1:-1);
				rec.set(field.name,v);
				var maxLen = rec.get('len');
				if(codePart===erp.Const.CODEPART_TYPE_SYSDATE)
					maxLen = rec.get('date_format').length;
				if(codePart===erp.Const.CODEPART_TYPE_FIXEDTEXT)
					maxLen = rec.get('fixed_text').length;
				var len = Math.min(rec.get('sub_end'),maxLen) - rec.get('sub_start')+1;
				//if(len>=0 && len <= maxLen && rec.get('sub_end')<=maxLen)
				if(len>=0)
					rec.set('len',len);
				break;
			case 'seed':
				var len = rec.get('len');
    			var seed = field.value+(isUp?1:-1);
    			if(rec.get('step')>=0)
    				rec.set('min_value',seed);
    			else
    				rec.set('max_value',Math.min(seed,Math.pow(10,len)-1));
    			break;
			case 'step':
    			var step = field.value+(isUp?1:-1);
    			if(step>=0){
    				rec.set('min_value',rec.get('seed'));
    				rec.set('max_value',Math.pow(10,rec.get('len'))-1);
    			}else{
    				rec.set('min_value',1);
    				rec.set('max_value',rec.get('seed'));
    			}
        		break;
			default:
				break;
		}
	},
	initComponent:function(){
		var me = this;
		Ext.apply(this,{
			buttons:[
                {
                    text: '保存',
                    iconCls: 'save',
                    action: 'ACT_SAVE',
                    hidden: !me.isEdit
                },
                {
                    text: '退出',
                    iconCls: 'page_error',
                    action:'ACT_CLOSE'
                }
            ],
			items:[
			  {  
		    	 region:'north',
				 xtype:'form',
				 itemId:'cgr_form',
		    	 bodyPadding: 10,
		    	 frame:false,
		    	 plugins:{
			          ptype: 'FormKey'
		    	 },
		    	 defaults: {
	    	    	xtype: 'textfield',
			    	labelAlign : 'right',
			    	anchor:'95%',
	    			labelWidth : 80,
	    			labelStyle : 'font-weight:bold',
	    			msgTarget: 'qtip',
		            autoFitErrors: true
		    	 },
		    	 items:[
					{
						fieldLabel : '代码',
						name : 'code',
						itemId : 'firstFocusOn',
						readOnly : !me.isAddNew
					},
					{
						fieldLabel : '名称',
						name : 'name'
					},
					{
						fieldLabel : '总长度',
						name : 'len',
						xtype: 'numberfield'
					},
					{
						fieldLabel : '有效',
						name : 'status_flg',
						xtype:'combobox',
				    	store:erp.Util.getCombxStore(erp.Const.YESNO_TYPE),
				    	queryMode: 'local',
					    displayField: 'name',
					    valueField: 'value',
						disabled:true
					}
			  ]
		     },
		     {
				   tbar: [     
				            {text: '增加',	iconCls:'page_add',		itemId:'cgrd_add',action:'ACT_ADDROW'},
				            {text: '插入',	iconCls:'page_edit',	itemId:'cgrd_edt',action:'ACT_INSTROW'},
				            {text: '删除',	iconCls:'page_delete',		itemId:'cgrd_del',action:'ACT_DELROW',	disabled:true}
				        ],
				    title:'编码规则',
				    region:'center',
					iconCls : 'plugin',
					itemId:'cgrd_grid',
					xtype:'gridpanel',
					plugins: [
				        Ext.create('Ext.grid.plugin.CellEditing', {
				        	pluginId:'cellEditing',
				            clicksToEdit: 1,
				            listeners:{
				            	beforeedit:this.onBeforeCellEdit,
				            	edit:this.onAfterCellEdit,
				            	scope:this
				            }
				        })
				    ],
					store: Ext.create('erp.setup.store.SerialRuleDetail'),
					columnLines:true,
					columns:[
							{text:'',xtype:'rownumberer',width:30,sortable:false,align:'center'},
							{text: '次序',		dataIndex: 'order_seq',	width:60,align:'center',
								menuDisabled:true,
								editor: {
					                xtype: 'numberfield',
					                minValue: 0
					            }
							},
							{text: '编码组成',	dataIndex: 'code',	width:80,align:'center',
								menuDisabled:true,sortable:false,
								editor: {
									xtype: 'combobox',
					                selectOnTab: true,
					                store:erp.Util.getCombxStore(erp.Const.CODEPART_TYPE),
					                queryMode: 'local',
					                displayField: 'name',
					                valueField: 'value'
					            },
					            renderer:function(v){
									return erp.Util.getFormatText(erp.Const.CODEPART_TYPE,v);
								}
							},
							{text: '文本',		dataIndex: 'fixed_text',	width:80,align:'center',
								menuDisabled:true,sortable:false,
								editor:{
									xtype:'textfield',
									maxLength:this.CODEPART_MAX_LENGTH,
									allowBlank:false
								}
							},
							{text: '日期格式',		dataIndex: 'date_format',	width:110, 
								menuDisabled:true,sortable:false,
								editor: {
									xtype: 'combobox',
									forceSelection:true,
					                selectOnTab: true,
					                store:erp.Util.getCombxStore(erp.Const.DATEFORMAT_TYPE),
					                queryMode: 'local',
					                displayField: 'name',
					                valueField: 'value'
								},
					            renderer:function(v){
									return erp.Util.getFormatText(erp.Const.DATEFORMAT_TYPE,v);
								}
							},
							{text: '参数类型',		dataIndex: 'uparam_type',	width:100, 
								menuDisabled:true,sortable:false,
								editor: {
									xtype: 'combobox',
									forceSelection:true,
					                selectOnTab: true,
					                store:erp.Util.getCombxStore(erp.Const.USERPARAM_TYPE),
					                queryMode: 'local',
					                displayField: 'name',
					                valueField: 'value'
								},
					            renderer:function(v){
									return erp.Util.getFormatText(erp.Const.USERPARAM_TYPE,v);
								}
							},
							{text: '长度',		dataIndex: 'len',	width:45,
								menuDisabled:true,sortable:false,
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                minValue: 0,
					                maxValue: this.CODEPART_MAX_LENGTH,
					                listeners:{
					                	spinup:function(field){this.onSpinUpDown(field,true);},
					                	spindown:function(field){this.onSpinUpDown(field,false);},
					                	scope:this
					                }
					            }
							},
							{text: '截取',		dataIndex: 'is_substr',	width:40,align:'center',
								menuDisabled:true,sortable:false,
								disabled:true,
								xtype: 'checkcolumn',
								editor:{
									xtype: 'checkbox'
								}
							},
							{text: '开始',	dataIndex: 'sub_start',	width:45,
								menuDisabled:true,sortable:false,
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                minValue: 1,
					                maxValue: this.CODEPART_MAX_LENGTH,
					                listeners:{
					                	spinup:function(field){this.onSpinUpDown(field,true);},
					                	spindown:function(field){this.onSpinUpDown(field,false);},
					                	scope:this
					                }
					            }
							},
							{text: '结束',		dataIndex: 'sub_end',	width:45,
								menuDisabled:true,sortable:false,
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                minValue: 1,
					                maxValue: this.CODEPART_MAX_LENGTH,
					                listeners:{
					                	spinup:function(field){this.onSpinUpDown(field,true);},
					                	spindown:function(field){this.onSpinUpDown(field,false);},
					                	scope:this
					                }
					            }
							},
							{text: '补位符',		dataIndex: 'fill_char',align:'right',width:50,hidden:true,
								menuDisabled:true,sortable:false,
								editor:{xtype:'textfield',allowBlank:false}
							},
							{text: '后补位',		dataIndex: 'is_fillafter',width:50,hidden:true, 
								disabled:true,
								menuDisabled:true,sortable:false,
								xtype: 'checkcolumn',
								editor:{
									xtype: 'checkbox'
								}
							},
							{text:'|',menuDisabled:true,sortable:false,width:2},
							{text: '初始',		dataIndex: 'seed',	width:40, 
								menuDisabled:true,sortable:false,
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                maxValue: this.INCRSEQ_MAX_VALUE,
					                minValue: 0,
					                listeners:{
					                	spinup:function(field){this.onSpinUpDown(field,true);},
					                	spindown:function(field){this.onSpinUpDown(field,false);},
					                	scope:this
					                }
					            }
							},
							{text: '步进',		dataIndex: 'step',	width:40, 
								menuDisabled:true,sortable:false,
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                listeners:{
					                	spinup:function(field){this.onSpinUpDown(field,true);},
					                	spindown:function(field){this.onSpinUpDown(field,false);},
					                	scope:this
					                }
					            }
							},
							{text: '跳跃',		dataIndex: 'step_jmp',	width:40, 
								menuDisabled:true,sortable:false,
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                maxValue: this.INCRSEQ_MAX_VALUE,
					                minValue: 0
					            }
							},
							{text: '最小',		dataIndex: 'min_value',	width:60, 
								menuDisabled:true,sortable:false,
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                maxValue: this.INCRSEQ_MAX_VALUE
					                //minValue: 1
					            }
							},
							{text: '最大',		dataIndex: 'max_value',	width:60, 
								menuDisabled:true,sortable:false,
								editor: {
					                xtype: 'numberfield',
					                allowBlank: false,
					                minValue: 1,
					                maxValue: this.INCRSEQ_MAX_VALUE,
					                listeners:{
					                	spinup:function(field){this.onSpinUpDown(field,true);},
					                	spindown:function(field){this.onSpinUpDown(field,false);},
					                	scope:this
					                }
					            }
							},
							{text: '重置模式',		dataIndex: 'reset_mode',	width:60, 
								menuDisabled:true,sortable:false,
								editor: {
                                    xtype: 'combobox',
                                    selectOnTab: true,
                                    store:erp.Util.getCombxStore(erp.Const.INCRSEQ_RESETMODE),
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value'
                                },
                                renderer:function(v){
                                    return erp.Util.getFormatText(erp.Const.INCRSEQ_RESETMODE,v);
                                }
							}
					],
					listeners:{
						selectionchange:function(selModel,selections){
							var n = selections.length || 0;
							var btn = this.down('#cgrd_del');
							// 删除按钮必须是选中一些行时有效
							if (btn){
								btn.setDisabled(n == 0);
							}
							btn = this.down('#cgrd_edt');
							// 编辑时只能是选中一行
							if (btn){
								btn.setDisabled(n != 1);
							}
						}
					}
			},
			{
				region:'south',
				xtype:'form',
				defaults: {
	    	    	xtype: 'textfield',
			    	labelAlign : 'right',
			    	anchor:'100%',
	    			labelWidth : 80,
	    			labelStyle : 'font-weight:bold',
	    			msgTarget: 'qtip',
		            autoFitErrors: true
		    	},
				items:[
				       {
							xtype: 'textareafield',
							fieldLabel : '提示信息',
							padding:5,
							itemId:'msgArea',
							readOnly:true
					   }
				      ]
			}
		    ]
		});
		this.callParent(arguments); 
	}
});