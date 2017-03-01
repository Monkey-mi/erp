Ext.define('erp.ux.SupcanGrid',{
	extend:'erp.ux.Panel',
	alias:'widget.SupcanGrid',
	requires:[
	],
	xtype: 'SupcanGrid',
	filters:Ext.create('Ext.util.FilterCollection'),//公共筛选集合
	querywin:'',//界面筛选存储
	initComponent:function(){
		var me=this;
		if(!me.params){
			me.params={czy_gh:'wj',gdbj:0,isSupcan:true}
		}
		if(me.mainModel){
			me.MainColumns=erp.Util.getSupcanColumns(me.mainModel);
		}
		me.supcanId = Ext.id();
		if(me.Properties==null){
			me.Properties={curSelMode:'rows'};
		}
		html=erp.SupcanUtil.getTreeList(me.supcanId,'Border=single;');
		var flds=new Array();
		if(me.xml){
		
		}else if(me.MainColumns){
			me.xml=erp.SupcanUtil.makeTreeListXml(me.MainColumns,null,me.Properties);
		}
	    Ext.apply(me,{
			border: false,
			hideMode: 'offsets',
			html: html
	    });
		this.callParent();
		erp.Const.application.on('supcanReady', me.onSupcanReady, me);
		erp.Const.application.on('supcanEvent', me.onSupcanEvent, me);
	},
	/**
	 * 获取当前supcan编辑器
	 * 
	 * @returns
	 */
	getSupcan: function() {
		var me = this;
		return erp.SupcanUtil.getSupcanById(me.supcanId);
	},
	/**
	 * 
	 * @param {} begin	开始行 或者表达式
	 * @param {} end	需要删除的行
	 */
	deleteRows:function(begin,end){
		var af=this.getSupcan();
		return af.func("DeleteRows",begin+"\r\n"+end);
	},
	//获取行数
	getRows:function(){
		var af=this.getSupcan();
		return af.func("GetRows","");
	},
	/**
	 * 按照条件查询 并返回符合条件的所有行号
	 * @param {} str 例如 price<20 and if(len(ProcId)==0, 1, 0);
	 * @return string 从小到大排列的行号串，行号之间以逗号分隔，空串表示未能找到匹配的行
	 */
	findAll:function(str){
		var af=this.getSupcan();
		return af.func("FindAll",str);
	},
	/**
	 * 按照条件查询 并返回首个符合条件的行号
	 * @param {} str
	 * @return 行号
	 */
	find:function(str){
		var af=this.getSupcan();
		return af.func("Find",str);
	},
	showMask:function(value){
		var af=this.getSupcan();
		if(Ext.isEmpty(value)){
			value="数据加载中，请稍后...";
		}
		af.func("OpenLoadMask",value);
	},
	closeMask:function(){
		var af=this.getSupcan();
		af.func("CloseLoadMask", "数据加载中，请稍后...");
	},
	/**
	 * 取得单元格数据
	 * @param {} row 行号
	 * @param {} line 列名或列号
	 * @return string
	 */
	getCellData:function(row,line){
		var af=this.getSupcan();
		return af.func("GetCellData",row+"\r\n"+line);
	},
	/**
	 * 对已加载的数据进行过滤，只显示满足条件的行
	 * @param {} search 
	 * @return {}
	 */
	filter:function(search){
		var af=this.getSupcan();
		return af.func("Filter",search);
	},
	/**
	 * 获取当前选择的列 当使用checked时
	 * @return {}返回一个对象数组
	 */
	getSelectRowForChecked:function(){
		var me=this;
		var recs=new Array();
		var rstr='';
		var xml = '';
		var af=this.getSupcan();
		if(me.Properties.CheckMode='checkbox'){
			//获取选中的行记录
			rstr=me.findAll("checked=1");
		}
		if(!Ext.isEmpty(rstr)){
			var rowNumArr=rstr.split(',');
				//遍历选中行
			var dateFeildArr=new Array();
		    Ext.each(me.MainColumns,function(col){
					if(col.get('datatype')=='date'){
						dateFeildArr.push(col.get('code'));
					}
		   })
		   Ext.each(rowNumArr,function(row){
		     xml = af.func("Export","asData \r\n row=" +row);
		     var jsondata = af.func("toJson",xml);
		     var obj=me.mainModel.copy();
		     obj.data = Ext.decode(jsondata).table.row;
		     obj.row = row;
		     //
		     if(!Ext.isEmpty(dateFeildArr)){
		     Ext.each(dateFeildArr,function(col){
		        obj.set(col,Ext.Date.parse(me.getCellData(row,col),'Y.m.d H:i:s'));
		     })
		     }
		     recs.push(obj);
		   })
		}
		return recs;
	},
	getAllRow : function(){
	    var me = this;
	    var recs=new Array();
		var rstr='';
			//获取选中的行记录
			rstr=me.findAll("checked!=2");
			var af=this.getSupcan();
		if(!Ext.isEmpty(rstr)){
			var rowNumArr=rstr.split(',');
			var dateFeildArr=new Array();
		    Ext.each(me.MainColumns,function(col){
					if(col.get('datatype')=='date'){
						dateFeildArr.push(col.get('code'));
					}
		   })
			//遍历选中行
			Ext.each(rowNumArr,function(row){
		     xml = af.func("Export","asData \r\n row=" +row);
		     var jsondata = af.func("toJson",xml);
		     var obj=me.mainModel.copy();
		     obj.data = Ext.decode(jsondata).table.row;
		     obj.row = row;
		     //
		      if(!Ext.isEmpty(dateFeildArr)){
		     Ext.each(dateFeildArr,function(col){
		        obj.set(col,Ext.Date.parse(me.getCellData(row,col),'Y.m.d H:i:s'));
		     })
		     }
		     recs.push(obj);
		   })
		}
		return recs;
		/*var cstr='';
		if(me.Properties.CheckMode='checkbox'){
			//获取选中的行记录
			rstr=me.findAll("checked=1");
		}
		if(me.Properties.CheckMode='checkbox'){
			//获取选中的行记录
			cstr=me.findAll("checked=0");
		}
		var tstr = '';
		if(!Ext.isEmpty(rstr)){
		   tstr = cstr
		}else{
		   tstr =rstr+','+cstr
		}
		if(!Ext.isEmpty(tstr)){
			var rowNumArr=tstr.split(',');
				//遍历选中行
			Ext.each(rowNumArr,function(row){
				//将属性填入对象
				var obj=me.mainModel.copy();
				Ext.each(me.MainColumns,function(col){
					if(col.get('datatype')=='date'){
						obj.set(col.get('code'),Ext.Date.parse(me.getCellData(row,col.get('code')),'Y.m.d H:i:s'));
					}else{
						obj.set(col.get('code'),me.getCellData(row,col.get('code')));
					}
					obj.row=row;//用于后道选中时使用
				})
				recs.push(obj);
			})
		}
		return recs;*/
	},
	/**
	 * @param codename 字段名称
	 * @return sum 选中的记录的某个字段的总和
	 */
	getCodeSum :function(codename){
	    var me=this;
		var recs=new Array();
		var rstr='';
		var sum = 0.0;
		rstr=me.findAll("checked=1");
		if(!Ext.isEmpty(rstr)){
		   var rowNumArr=rstr.split(',');
			//遍历选中行
		   Ext.each(rowNumArr,function(row){
		   var obj=me.mainModel.copy();
		   sum+=parseFloat(me.getCellData(row,codename));
		})
		}
		return sum;
	},
	/**
	 * 
	 * @return {}行号(从0开始)，空串表示没有当前行
	 */
	getCurrentRow:function(){
		var af=this.getSupcan();
		return af.func("GetCurrentRow","");
	},
	/**
	 * @description设置整列的单元格数据, 支持表达式，该函数非常有用
	 * @param {} col 列名或列号(从0开始)，建议采用列名
	 * @param {} value 内容串，支持以"="开头的表达式
	 * @param {} start 开始行号，默认0
	 * @param {} end 结束行号，默认-1, 表示末尾行
	 * @return {}
	 */
	setColCellData:function(col,value,start,end){
		var af=this.getSupcan();
		if(Ext.isEmpty(start)){
			start=0;
		}
		if(Ext.isEmpty(end)){
			end=-1;
		}
		return af.func("SetColCellData",col+"\r\n"+value+"\r\n"+start+'\r\n'+end);
	},
	/**
	 * 获取当前选择的列
	 * @return {}返回一个对象数组
	 */
	getSelectRow:function(){
		var me=this;
		var recs=new Array();
		var rstr='';
		var xml = '';
		rstr=me.getCurrentRow();
		var af=this.getSupcan();
		if(!Ext.isEmpty(rstr)){
		   var rowNumArr=rstr.split(',');
		   //需要对日期格式进行转换
		   var dateFeildArr=new Array();
		   Ext.each(me.MainColumns,function(col){
					if(col.get('datatype')=='date'){
						dateFeildArr.push(col.get('code'));
					}
		   })
		   Ext.each(rowNumArr,function(row){
		     xml = af.func("Export","asData \r\n row=" +row);
		     var jsondata = af.func("toJson",xml);
		     var obj=me.mainModel.copy();
		     obj.data = Ext.decode(jsondata).table.row;
		     obj.row = row;
		     //
		     if(!Ext.isEmpty(dateFeildArr)){
		     Ext.each(dateFeildArr,function(col){
		        obj.set(col,Ext.Date.parse(me.getCellData(row,col),'Y.m.d H:i:s'));
		     })
		     }
		     recs.push(obj);
		   })
		}
		/*if(!Ext.isEmpty(rstr)){
			var rowNumArr=rstr.split(',');
			//遍历选中行
			Ext.each(rowNumArr,function(row){
			//将属性填入对象
				var obj=me.mainModel.copy();
				Ext.each(me.MainColumns,function(col){
					obj.set(col.get('code'),me.getCellData(row,col.get('code')));
					obj.row=row;//用于后道选中时使用
				})
				recs.push(obj);
			})
		}*/
		return recs;
	},
	
	/**
	 * 选中指定行
	 * @param {} row 行号
	 * 
	 */
	selectRow:function(row){
		var af=this.getSupcan();
		af.func("SelectRow",row);
	},
	/**
	 * @description 根据自身筛选条件进行过滤
	 * filters
	 * querywin
	 */
	filterOnAll:function(){
		var me=this;
		var search=new Array();
	    search=me.getSupcanFilter();//获取公共筛选条件数组;
	    var querywin=me.querywin;
	    var str=search.join(' ');
	    if(querywin.length>0){
	    	if(str==''){
	    		str+=' 1=1 '+querywin;
	    	}else{
	    		str+='  '+querywin;
	    	}
	    }
	    me.filter(str);
	},
	/**
	 * @description 返回用于supcan过滤的数组
	 * @author wuqia
	 * @return arr 返回用于supcan过滤的数组
	 * 
	 */
	getSupcanFilter:function(){
		//拼装过滤条件
	    var search=new Array();
	    filters=this.filters;
	    console.log(filters);
		Ext.each(filters.items,function(filter){
	    	var config=filter.config,
	    	s="";
	    	switch(config.datatype){
	    		case 'dateTime':
	    		case 'date':
	    			switch(config.operator){
			    		case 'like':
			    			s="  indexOf("+config.property+",FormatDate('"+config.value+"','YYYY-MM-DD'))>=0 ";	
			    		break;
			    		default:
			    			s=" FormatDate("+config.property+",'YYYY-MM-DD') "+config.operator +" FormatDate('"+config.value+"','YYYY-MM-DD')";
			    	}
	    		break;
	    		default:
	    		switch(config.operator){
		    		case 'like':
		    			s="  indexOf("+config.property+",'"+config.value+"')>=0 ";	
		    		break;
		    		default:
		    			s=" "+config.property+" "+config.operator +" '"+config.value+"'";
		    	}
	    	}
	    	if(search.length==0){
	    		search.push(s);
	    	}else{
	    		search.push(" and "+s);	
	    	}
	    })
	    return search;
	},
	setRowCellData:function(row,value){
		var af=this.getSupcan();
		return af.func("SetRowCellData",row+"\r\n"+value);
	},
	/**
	 * @description 设置单元格数据
	 * @param {} row
	 * @param {} line
	 * @param {} value
	 * @return 1 - 成功; 空串 - 失败
	 */
	setCellData:function(row,line,value){
		var af=this.getSupcan();
		return af.func("SetCellData",row+"\r\n"+line+"\r\n"+value);
	},
	//渲染时事件
	onSupcanReady: function(id) {
		var me = this;
		console.log(id);
		switch(id){
		// 根据id判断，只处理与自己相关的报表控件
		case me.supcanId:
			var af=me.getSupcan();
	    	af.func("Build",me.xml);
	    	//插入一列表示是否选择
	    	if(me.Properties.curSelMode){
	    		af.func("InsertCol", "0\r\nname=checked;isCheckboxOnly=true;width='35' ");
	    	}
	    	url=me.url;
	    	params=me.params||{czy_gh:'wj',gdbj:0};
	    	me.load(params);
			break;
		}
	},
	/*获取对应的列属性
	 * cell 列号或者列名
	 * property 需要获取的属性名
	 */
	getColProp:function(cell,property){
		var me=this;
		var af=me.getSupcan();
		return af.func("GetColProp", ""+cell+"\r\n"+property);
	},	
	load:function(params){
		var me=this;
		var af=me.getSupcan();
		if(params){
			params.isSupcan=true;
		}
		erp.SupcanUtil.makeTreeListByURL(af,me.url,params||me.params);
	},
	onSupcanEvent: function(id, event, p1, p2, p3, p4) {
		var me = this;
		if(id==SupcanGrid.supcanId){
			switch(event){
				case '':
				break;
			}
		}
	}
})