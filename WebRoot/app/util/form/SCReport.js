/**
 * @author px
 * @date 2013-5-11
 * 备注，暂时只支持json数据，不支持xml数据
 */
Ext.define('erp.util.form.SCReport',{
	requires:['erp.editor.util.XmlUtil'],
    init:function(){
    	
	},
	printModel:'print',
	designModel:'design',
	/**
	 * 加载模板
	 */
	makeReportByXml : function(report,xml){
		report.func('Build',xml);
	},
	
	/**
	 * 生成supcanReport
	 * @param report : 控件引用
	 * @param dataType : 数据类型 json,xml,url
	 * @param datas : 给控件的数据，可以是url,json,xml 字符串
	 *  @naVals:键值对:(键：json字符串节点，value：节点显示别名,type:数据类型)
	 *  @param xml 模板
	 */
	makeReportByData : function(report,dataType,datas,naVals,xml,params){
		var me = this;
		var descs = me.makeJsonDescs(datas, naVals);
		if(report){
			if(xml){
//				 xml=me.makeDatasXmlForRebuild(xml,datas,descs,naVals[0],params);
				 report.func("Build",xml);
				 if (Ext.isEmpty(report.func('GetSource','ds0')))
				 	me.makeDatasXml(report,datas,descs,naVals[0],params,false);
				 else if (!Ext.isEmpty(params.params)){
				 		
						var paras=params.params;
						var extrParam=[];
						for (var key in paras)
							extrParam.push(key+"="+paras[key]);
						report.func("DeclareAsynch", "");
						report.func('SetparasEx',extrParam.join("&"));	
						report.func('callfunc','163\r\n163'); 
					}
				 	
			}else{
				 report.func("Build",me.makeRptXml("sheet"+Ext.id()));
				 if(datas){
				   if(dataType == 'json'){
					     naVals = naVals?naVals:[];
//					  	var descs = me.makeJsonDescs(datas, naVals);
					  	me.makeDatasXml(report,datas,descs,naVals[0],params,false);
					  	//report.func("DeclareAsynch", "");//设计模式不能采用多线程
					  	report.func("callfunc", "301\r\n3")
				   }
				   else if(dataType == 'xml'){
					 //todo
				   }
				   else if(dataType == 'url'){
					  //todo
				   }
			   }
			}
			   
		}else{
			Ext.Msg.alert('提示','控件不能为空');
		}
	},
	/**
	 * 根据json字符串和名称值对生成节点和显示列描述
	 * @datas:json字符串
	 * @naVal:键值对:(键：json字符串节点，value：节点显示别名,type:数据类型)
	 */
	makeJsonDescs : function(datas,naVals){
		var me = this;
		 var descs = [],data,naVal;
		 for(var i=0;i<datas.length;i++){
			 data = datas[i];
			 naVal = naVals[i]?naVals[i]:[];
			 descs[i] = me.jsonStruct(JSON.parse(data),"",0,naVal); 
		 }
		 return descs;
   },
	/**
	 * 生成指定样式模板,无数据源
	 */
	makeRptXml : function(rptName,rowNum,colNum,rowHeight,colwidth){
		if(!rptName){
			rptName = 'sheet';
		}
		if(!rowNum){
			rowNum = 100;
		}
		if(!colNum){
			colNum = 20;
		}
		if(!rowHeight){
			rowHeight = 24;
		}
		if(!colwidth){
			colwidth = 140;
		}
		var colTep = '<Col width="'+colwidth+'"/>';
		var cols = '';
		for(var i=0;i<colNum;i++){
			cols+=(colTep+'\n');
		}
		var rows = '';
		for(var i=0;i<rowNum;i++){
			rows+=('<TR height="'+rowHeight+'" sequence="'+i+'">\n<TD col="'+colNum+'" topBorder="0"/>\n</TR>\n');
		}
		var rptXml='<?xml version="1.0" encoding="utf-8" ?>'
			+'<Report>\n'
			+'<WorkSheet name="'+rptName+'" isDefaulerprint="true">'
			+'<Properties><BackGround bgColor="#FFFFFF" arrange="left,top" alpha="255"/>'
			+'<DefaultTD>'
			+'<TD fontIndex="0" textColor="#000000" transparent="true" leftBorder="1" topBorder="1" leftBorderColor="#C0C0C0" leftBorderStyle="solid" topBorderColor="#C0C0C0" topBorderStyle="solid" decimal="2" align="center" vAlign="middle" isProtected="false" isThousandSeparat="true" isRound="true" isPrint="true"/>'
			+'</DefaultTD>'
			+'<Other isShowZero="true" AutoBreakLine="1937880653" isRefOriPrecision="true" LineDistance="0" isRowHeightAutoExtendAble="true"/>'
			+'</Properties>'
			+'<Table>'
			+cols
			+rows
			+'</Table>'
			+'</WorkSheet>'
			+'</Report>';
		return rptXml;
	},
	/**
	 * 添加数据源
	 */
	addDSourceXml : function(report,datasource){
		if(report&&datasource){
			if(Ext.type(report)=="string"){
				report = Ext.XmlUtil.loadXMLString(report);
			}
			if(Ext.type(datasource)=="string"){
				datasource =  Ext.XmlUtil.loadXMLString(datasource);
			}
			 Ext.XmlUtil.getFirstChildElementsByTagName(report,"Report").appendChild(Ext.XmlUtil.getFirstChildElementsByTagName(datasource,"DataSources"));
		}else{
			Ext.Msg.alert("提示","将数据源添加的模板失败");
		}
		return Ext.XmlUtil.toXmlString(report);
	},
	
	makeDatasXmlForRebuild : function(report,data,descs,naVal,params){
		var me = this;
		var dataXml='';
		report=me.removeData(report);
		var DataSources =  Ext.XmlUtil.loadXMLString('<DataSources Version="255" isAutoCalculateWhenOpen="false" isSaveCalculateResult="false"></DataSources>');
		if(data){
			for(var i=0;i<data.length;i++){
				dataXml="";
				dataXml ='<DataSource type="4"></DataSource>';
				if(!descs[i]){
					descs[i] = me.jsonStruct(JSON.parse(data[i]),"",0,naVal);
				}
				if (!Ext.isEmpty(params)){
					var url=params.url+'?'+(params.dsId[i]==0?"list_id="+params.list_id[i]+"&data_type="+params.dataType[i]:"ds_id="+params.dsId[i]);
					if (!Ext.isEmpty(params.params)){
						url+="&"+params.params.join("&");
					}
					dataXml = me.addData(dataXml,descs[i],"ds"+i,params.version,params.type,params.typeM,params.memo[i],true,url);
					Ext.XmlUtil.findDom(DataSources,"DataSources",true)[0].appendChild(Ext.XmlUtil.loadXMLString(dataXml).documentElement);
					
				}
				else{
					dataXml = me.addData(dataXml,descs[i],"ds"+i);
				}
			}
	  	}
	  	if(Ext.type(report)=="string"){
				report = Ext.XmlUtil.loadXMLString(report);
			}
	  	Ext.XmlUtil.getFirstChildElementsByTagName(report,"Report").appendChild(DataSources.documentElement);
	  	
	  	report=Ext.XmlUtil.toXmlString(report);
	  	report.replace(/'/g, "&apos;");
	  	return report;
	},
	
	/**
	 * 生成数据源
	 */
	makeDatasXml : function(report,data,descs,naVal,params,rebuild){
		var me = this;
		var dataXml;
		if(data){
			for(var i=0;i<data.length;i++){
				dataXml="";
				dataXml = me.makeDatasConfig();
				if(!descs[i]){
					descs[i] = me.jsonStruct(JSON.parse(data[i]),"",0,naVal);
				}
				if (!Ext.isEmpty(params)){
					var url=params.url+'?'+(params.dsId[i]==0?"list_id="+params.list_id[i]+"&data_type="+params.dataType[i]:"ds_id="+params.dsId[i]);
					if (!rebuild){
					dataXml = me.addData(dataXml,descs[i],"ds"+i,params.version,params.type,params.typeM,params.memo[i]);
					report.func('SetDSXML',dataXml);
					}
					report.func("setSource", "ds"+i+" \r\n "+url);
					
				}
				else{
					dataXml = me.addData(dataXml,descs[i],"ds"+i);
					report.func('SetDSXML',dataXml);
					report.func("setSource", "ds"+i+" \r\n "+data[i]);
				}
			}
	  	}
	},
	/**
	 * 生成数据源总体描述
	 */
	makeDatasConfig : function(version,autoCalculate,saveCalculate,sourcetype){
		if(!version){
			version = 255;
		}
		if(!autoCalculate){
			autoCalculate = false;
		}
		if(!saveCalculate){
			saveCalculate = false;
		}
		if(!sourcetype){
			sourcetype = 4;
		}
		var DataSources = '<DataSources Version="'+version
		                  +'" isAutoCalculateWhenOpen="'+autoCalculate
		                  +'" isSaveCalculateResult="'+saveCalculate+'">'
		                  +'<DataSource type="'+sourcetype+'"></DataSource></DataSources>';
		return DataSources;
	},
	/**
	 * 生成数据项目
	 */
	addData : function(dataxml,descs,id,version,type,typeM,memo,rebiuld,url){
		var me = this;
		if(dataxml){
			if(!descs){
				return dataxml;
			}
			if(!id){
				id = "ds1";
			}
			if(!version){
				version = 2;
			}
			if(!type){
				type = 4;
			}
			if(!typeM){
				typeM = "JSON";
			}
			if(!memo){
				memo = '';
			}
			var dataItemXml = '<Data><ID>'+id+'</ID><Version>'+version+'</Version><Type>'+type+'</Type><TypeMeaning>'
			+typeM+'</TypeMeaning>';
			if (rebiuld)
			   dataItemXml+="<Source>"+url.replace(/&/g, "&amp;")+"</Source>";
			dataItemXml+='<Memo>'
			+memo+'</Memo>'+me.makeNodeDesc(descs.nodeDescs)+me.makeColDesc(descs.colDescs)+'</Data>';
			var data = Ext.XmlUtil.loadXMLString(dataxml);
			var dataItem = Ext.XmlUtil.loadXMLString(dataItemXml);
			Ext.XmlUtil.findDom(data,"DataSource",true)[0].appendChild(dataItem.documentElement);
			return Ext.XmlUtil.toXmlString(data);
		}else{
			Ext.Msg.alert('提示','添加数据源没有目标!');
		}
	},
	/**
	 * 去掉特定数据源
	 */
	removeData : function(xml,id){
		var xmldoc = Ext.XmlUtil.loadXMLString(xml);
		var DataSources = Ext.XmlUtil.findDom(xmldoc,'DataSources',true);
		if(DataSources&&DataSources.length>0){
			DataSources = DataSources[0];
			var p = DataSources.parentNode;
			p.removeChild(DataSources);
		}
		return  Ext.XmlUtil.toXmlString(xmldoc);
	},
	/**
	 * 添加显示的节点xml描述
	 */
	makeNodeDesc : function(nodeDescs){
		var result = null;
		if(nodeDescs){
			result = '<XML_RecordAble_Nodes>';
			var desc;
			for(var i=0;i<nodeDescs.length;i++){
				desc = nodeDescs[i];
				result+=('<Node><name alias="'+desc.alias+'">'+desc.name+'</name></Node>')
			}
			result+='</XML_RecordAble_Nodes>';
		}
		return result;
	},
	/**
	 * 添加显示的节点字段xml描述
	 */
	makeColDesc: function(colDescs){
	     var result = null;
	     if(colDescs){
	    	 result = '<Columns>';
             var rec;
             for(var i=0;i<colDescs.length;i++){
            	 rec = colDescs[i];
            	 result+=('<Column><name>'+rec.name+'</name><text>'+rec.text+'</text><type>'+rec.type+'</type><visible>'+rec.visible+'</visible><sequence>'+rec.sequence+'</sequence><hyperLink>'+rec.name+'</hyperLink></Column>');
             }
             result += '</Columns>';
	     }
		 return result;
	},
	/**
	 * 返回js对象类型
	 */
	objType : function(obj){
		   return Object.prototype.toString.call(obj).slice(8, -1);
	},
	/**
	 * 根据json对象生成数据描述信息
	 * @param obj json对象
	 * @param p js对象在json的路径 默认“”
	 * @param js对象在json的统一路径下的顺序 默认0
	 */
	jsonStruct : function (obj,p,index,naVal){
		var me = this;
		   var nodeDescs = [];
		   var colDescs = [];
		   var result = {nodeDescs:[],colDescs:[]};
		   var text = (p&&p!="")?(p.substring(p.lastIndexOf("\\")+1,p.length)):""; 
		   var colAttr;
		   var type = me.objType(obj);
		   if(type == 'Array'){
		       if(p&&p!=""){
				      p+="\\jsonobject";
				   }else{
				     p="jsonobject";
				 }
		       colAttr = me.getNameVal(naVal, text);
			   nodeDescs.push({alias: colAttr['text'],name: p});
			   if(obj.length>0){
			      result = me.jsonStruct(obj[0],p,0,naVal);
			   }
		   }else if(type == 'Object'){
		        p = (p?p:"");
				if(text!="jsonobject"){
					colAttr = me.getNameVal(naVal, text);
		          nodeDescs.push({alias: colAttr['text'],name: p});
		        }
				var index = 0;
				if(p&&p!=""){
				      p+="\\";
				   }else{
				     p="";
				 }
				var temp;
				for (prop in obj){
				  var t = me.objType(obj[prop]);
				  if(t!='Array'&&t!='Object'){
				    index+=1;
				  }
				   temp = me.jsonStruct(obj[prop],p+prop,index,naVal);
				   if(temp.nodeDescs.length>0){
				        result.nodeDescs = (result.nodeDescs.concat(temp.nodeDescs));
				   }
				   if(temp.colDescs.length>0){
				        result.colDescs = (result.colDescs.concat(temp.colDescs));
				   }
				}
		   }else{
			   colAttr = me.getNameVal(naVal, text);
			   colDescs.push({name: p,text:colAttr['text'],type:colAttr['type'],visible:true,sequence:index})
		   }
		   
		   for(var i=0;i<result.nodeDescs.length;i++){
			       nodeDescs.push(result.nodeDescs[i]);
		   }
		   for(var i=0;i<result.colDescs.length;i++){
				   colDescs.push(result.colDescs[i]);
		   }
		   return {nodeDescs:nodeDescs,colDescs:colDescs};
	},
	/**
	 * 获取节点对应的列名和属性
	 * @param name：对应的节点名称
	 */
	getNameVal : function(naVal,name){
		var result = {text:name,type:'String'};
		if(naVal){
			for(var i=0;i<naVal.length;i++){
				if(naVal[i].name == name){
					result['text'] = naVal[i].value?naVal[i].value:name;
					result['type'] = naVal[i].type?naVal[i].type:'String';
					break;
				}
			}
		}
		return (result?result:name);
	},
	//将获取XML文件转化成Json串
	transXmlDataToJson:function(xml){
		var me=this;
		var XmlUtil = Ext.XmlUtil;
		var xmlDoc=XmlUtil.loadXMLString(xml);
		var rows = XmlUtil.findDom(xmlDoc,'record',true);
		var data=[]
		for (var i=0;i<rows.length;i++){
			var rec=rows[i];
			var tempValue="{";
			for (var j=0;j<rec.childNodes.length;j++)
			{
				var field=rec.childNodes[j];

				if (field.nodeName!='#text'){
					if (!Ext.isEmpty(field.childNodes[0])){
						tempValue+=field.nodeName+":"+field.childNodes[0].nodeValue+",";
					}
					else{
						tempValue+=field.nodeName+":null,";
					}
				}
			}
			tempValue=tempValue.substring(0,tempValue.length-1)+"}";
			data.push(tempValue);
		}
		return "["+data.join(",")+"]";
	},
	
/********************************************************以下是打印模板解析***********************************************************************/
    makePrintReport : function(report,model,xml,data,naVal){
    	var me = this;
    	if(model==me.designModel){
    		me.makeReportByData(report, 'json', data, naVal, xml);
    	}else if(model==me.printModel){
    		xml = me.analysisPrintXml(xml, data);
    		me.makeReportByData(report, 'json', data, naVal, xml);
    	}else{
    		
    	}
    	report.func("setSource", "ds0\r\n "+data);
    },
    /**
     * 清空打印模板
     */
    clearPrintReport : function(report){
    	report.func("DeleteWorksheet", "0");
    	report.func("addWorksheet", "name=sheet"+Ext.id());
    	report.func('callfunc','301\r\n3'); 
    	report.func("callfunc", "163\r\n163");
    },
    /**
     * 减少模板多余的节点
     */
    reducePrintReport : function(xml){
    	var XmlUtil = Ext.XmlUtil;
    	var me = this;
    	var xmldoc = XmlUtil.loadXMLString(xml);
    	var rows = XmlUtil.findDom(xmldoc,'TR',true);
    	var formula;
    	var isd = true;
    	for(var i = 0;i<rows.length;i++){
    		var tds =  XmlUtil.findDom(rows[i],'TD',true);
    		for(var k = tds.length-1;k>-1;k--){
    			if(!XmlUtil.hasAttribute(tds[k],'datatype')&&!XmlUtil.hasAttribute(tds[k],'fontIndex')&&isd){
    				rows[i].removeChild(tds[k]);
    			}else{
    				isd = false;
    				formula = me.makeFormulaObj(tds[k].getAttribute('formula'));
    				if(formula&&formula.num!=1&&formula.fun=='data'){
    					rows[i].removeChild(tds[k]);
    				}
    			}
    		}
    	}
    	var defaultTD = XmlUtil.findDom(XmlUtil.findDom(xmldoc,'DefaultTD',true)[0],'TD',true)[0];
    	defaultTD.setAttribute('leftBorderColor',"#C0C0C0");
    	defaultTD.setAttribute('topBorderColor',"#C0C0C0");
    	return Ext.XmlUtil.toXmlString(xmldoc);
    },
    /**
     * 打印模式下要根据数据长度自动展开数据
     */
    analysisPrintXml : function(xml,data){
    	var me = this;
    	var datacells = me.getDataCells(xml);
        var demoCells = me.makeDemoDataCell(datacells, data);
        xml = me.expandDataDemoCell(demoCells, xml);
    	
    	return xml;
    },
    /**
     * 获取有数据定义的单元可cell
     * @return cell : {height,row,col,fontIndex,bgColor,decimal,isThousandSeparat,datatype,formula}
     */
    getDataCells : function(xml){
        var XmlUtil = Ext.XmlUtil;
        var xmldoc = XmlUtil.loadXMLString(xml).documentElement;
        var rows = XmlUtil.findDom(xmldoc,'TR',true);
        var datacells = [];
        for(var i=0;i<rows.length;i++){
        	datacells = datacells.concat(XmlUtil.findDomByAttr(rows[i],'datatype',false));
        }
        return this.makeCellXmlToObject(datacells);
    },
//    getAssignDataCell : function(datacells,formulaNode){
//    	var XmlUtil = Ext.XmlUtil;
//    	var result = [];
//    	for(var i=0;i<datacells.length;i++){
//    		if(XmlUtil.hasAttribute(datacells[i],'formula')){
//    			alert(datacells[i].getAttribute('formula'));
//    		}
//    	}
//    }
    /**
     * 将Xml(td节点)转化为cell Object对象
     */
    makeCellXmlToObject : function(datacells){
    	var me = this;
    	var result = [];
    	var datacell;
    	for(var i=0;i<datacells.length;i++){
    		datacell = datacells[i];
    		result[i] = {
    				height              : datacell.parentNode.getAttribute('height'),
    				row                 : parseInt(datacell.parentNode.getAttribute('sequence')),
    				col                 : parseInt(datacell.getAttribute('col')),//?datacell.getAttribute('col'),//:me.getCellcol(datacell),
    				fontIndex           : datacell.getAttribute('fontIndex'),
    				bgColor             : datacell.getAttribute('bgColor'),
    				decimal             : datacell.getAttribute('decimal'),
    				isThousandSeparat   : datacell.getAttribute('isThousandSeparat'),
    				datatype            : datacell.getAttribute('datatype'),
    				formula             : me.makeFormulaObj(datacell.getAttribute('formula'))
    		};
    	}
    	return result;
    },
    /***
     * 获取cell的列顺序
     */
    getCellcol : function(datacell){
    	var i = 1;
    	var p = datacell.previousSibling;
    	while(p){
    		i++;
    		p = p.previousSibling;
    	}
    	datacell.setAttribute('col',i+'');
    	return i;
    }, 
    /**
     * 将cell Object对象转化为Xml(td节点)
     */
    makeCellObjectToXml : function(cellObjects){
    	
    },
    /**
     * 将公式字符串转化为公式对象
     */
    makeFormulaObj : function(formulaStr){
    	if(formulaStr){
    		var fun = formulaStr.match(/^=.+\(/)[0];
        	fun = fun.substring(1,fun.length-1);
        	var params = formulaStr.match(/\(.+\)/)[0];
        	params = params.substring(1,params.length-1).split(',');
        	return {
        		fun   :  fun,
        		node  :  params[0],
        		num   :  params[1],
        		field :  params[2]
        	};	
    	}else{
    		return null;
    	}
    },
    /**
     * 将公式对象转化为公式字符串
     */
    makeFormulaStr : function(formulaObj){
    	return '='+formulaObj.fun+'('+formulaObj.node+','+formulaObj.num+','+formulaObj.field+')';
    },
    /**
     * 对是表体数据的cell处理，获取展开方向和长度
     */
    makeDemoDataCell : function(datacells,data){
    	var me = this;
    	var demoCells=[];
    	var demoCell;
    	var field;
    	var tbl;
    	data = JSON.parse(data[0]);
    	for(var i=0;i<datacells.length;i++){
    		demoCell = datacells[i];
    		if(demoCell.formula&&demoCell.formula.num==1&&demoCell.formula.node.indexOf('Demo')>-1){
    			tbl = null;
    			field = demoCell.formula.field;
    			field = field.substring(0,field.indexOf("'"))+"'"+'tbl'+field.substring(field.indexOf("'")+1,field.length);
    			tbl = me.getTblDataCell(datacells,field);
    			if(tbl){
    				if(demoCell.row==tbl.row){
    					if(demoCell.col<tbl.col){
    						demoCell.direct='left';
    					}else if(demoCell.col>tbl.col){
    						demoCell.direct='right';
    					}
    				}else if(demoCell.col==tbl.col){
                        if(demoCell.row>tbl.row){
                        	demoCell.direct='down';
    					}else if(demoCell.row<tbl.row){
    						demoCell.direct='up';
    					}
    				}else{
    					demoCell.direct=null;
    				}
    			}else{
    				demoCell.direct=null;
    			}
    			var node = demoCell.formula.node;
    			node = node.split('\\')[1];
    			demoCell.length = data[node]?data[node].length:0;
    			demoCells[demoCells.length]=demoCell;
    		}
    	}
    	return demoCells;
    },
    /**
     * 获取表头数据的cell,
     */
    getTblDataCell : function(datacells,param){
    	var tbl;
    	for(var i=0;i<datacells.length;i++){
    		if(datacells[i].formula&&datacells[i].formula.num==1&&datacells[i].formula.field==param){
    			tbl=datacells[i];
    			break;
    		}
    	}
    	return tbl;
    },
    /**
     * 展示数据Demo
     */
    expandDataDemoCell : function(demoCells,xml){
    	 var me = this;
    	 var XmlUtil = Ext.XmlUtil;
    	 var xmldoc = XmlUtil.loadXMLString(xml).documentElement;
    	 var demoCell;
    	for(var i=0;i<demoCells.length;i++){
    		demoCell = demoCells[i];
    		var dx = 0;
    		var dy = 0;
    		switch (demoCell.direct){
            case 'left':
            	dx = -1;
            	break;
            case 'right':
            	dx = 1;
            	break;
            case 'up':
            	dy = -1;
            	break;
            case 'down':
            	dy = 1;
            	break;
            }
    		if(dy!=0){
    			for(var k=1;k<demoCell.length;k++){
    				demoCell.row = demoCell.row+dy;
    				demoCell.formula.num = k+1;
    				me.addDataDemoCell(demoCell, xmldoc);
    			}
    		}else if(dx!=0){
    			for(var k=1;k<demoCell.length;k++){
    				demoCell.col = demoCell.col+dx;
    				demoCell.formula.num = k+1;
    				me.addDataDemoCell(demoCell, xmldoc);
    			}
    		}
    	}
    	return XmlUtil.toXmlString(xmldoc);
    },
    addDataDemoCell : function(demoCell,xmldoc){
    	   var me = this;
    		if(demoCell.row<0||demoCell.col<0){
    			return ;
    		}
    		var row = me.getRow(demoCell.row,xmldoc);
    		if(row){
    			var col = me.getCell(row,demoCell.col);
    			if(isNaN(col)){
    				me.updateCell(col,demoCell);
    			}else{
    				me.addCell(row, col, demoCell);
    			}
    		}else{
    			//todo
    		}
    },
    /**
     * 获取行
     */
    getRow : function(index,xmldoc){
    	 var XmlUtil = Ext.XmlUtil;
    	 var rows = XmlUtil.findDom(xmldoc,'TR',true);
    	 if(index>=rows.length){
    		 return;
    	 }else{
    		 return rows[index];
    	 }
    },
    /**
     * 获取单元格
     * 有，返回td节点
     * 无，返回应新增td节点的位置
     */
    getCell : function(row,colNum){
    	 var XmlUtil = Ext.XmlUtil;
    	 var cells = XmlUtil.findDom(row,'TD',true);
    	 var index = 0;
    	 var cell;
    	 var mycol;
    	 var has = false;
    	 for(var i=0;i<cells.length;i++){
    		 cell = cells[i];
    		 mycol = parseInt(cell.getAttribute('col'));
    		 if(mycol==colNum){
    			 has = true;
    			 break;
    		 }else if(colNum>mycol){
    			 index = (i+1);
    		 }else{
    			break; 
    		 }
    	 }
    	 
    	 if(has){
    		 return cell;
    	 }else{
    		 return index;
    	 }
    },
    /**
     * 删除行
     */
    deleteRow : function(){
    	
    },
    /**
     * 删除单元格
     */
    deleteCell : function(){
    	
    },
    /**
     * 增加行
     */
    addRow : function(){
    	
    },
    /**
     * 增加单元格
     */
    addCell : function(row,colNum,cell){
    	 var XmlUtil = Ext.XmlUtil;
    	 var me = this;
    	 var td = XmlUtil.createElement('TD');
    	 me.updateCell(td, cell);
    	 td.setAttribute('col',cell.col+'');
    	 XmlUtil.insertChild(row,colNum,td);
    },
    /**
     * 修改单元格
     */
    updateCell : function(col,obj){
    	var me = this;
    	//height,row,col,fontIndex,bgColor,decimal,isThousandSeparat,datatype,formula
    	if(obj.fontIndex){
    		col.setAttribute('fontIndex',obj.fontIndex);	
    	}
    	if(obj.bgColor){
    	  col.setAttribute('bgColor',obj.bgColor);
    	}
    	if(obj.decimal){
    		col.setAttribute('decimal',obj.decimal);
    	}
    	if(obj.isThousandSeparat){
    		col.setAttribute('isThousandSeparat',obj.isThousandSeparat);
    	}
    	if(obj.datatype){
    		col.setAttribute('datatype',obj.datatype);	
    	}
    	if(obj.formula){
    	   col.setAttribute('formula',me.makeFormulaStr(obj.formula));
    	}
    },
    /********************************************************以下是树列表***********************************************************************/
    makeTreeListByData : function(editor,data,colAtrs){
    	var me = this;
    	var XmlUtil = Ext.XmlUtil;
    	var xml = '<TreeList>\
		    <Properties Title="订单明细表" HeaderFontIndex="2"/>\
			<Fonts>\
			<Font faceName="Consolas"/>\
			<Font/>\
			<Font faceName="微软雅黑" bold="1"/>\
			<Font bold="true"/>\
			</Fonts>\
			<Cols/>\
			</TreeList>';
      var xmlDoc = XmlUtil.loadXMLString(xml).documentElement;
      var cols = me.makeCols(colAtrs);
      var colDom =  XmlUtil.findDom(xmlDoc,'Cols',true)[0];
      for(var i=0;i<cols.length;i++){
    	  colDom.appendChild(cols[i]);
      }
      xml = XmlUtil.toXmlString(xmlDoc);
      editor.func("Build",xml);
	  editor.func("load",JSON.stringify(data));
    },
    makeCols : function(colAtrs){
    	 var me = this;
    	 var XmlUtil = Ext.XmlUtil;
    	 var cols = [];
    	 var col;
    	 for(var i=0;i<colAtrs.length;i++){
    		 col = XmlUtil.createElement('Col');
    		 col.setAttribute('width','150');
    		 col.setAttribute('name',colAtrs[i]['name']);
    		 col.setAttribute('datatype',colAtrs[i]['type']);
    		 XmlUtil.setDomText(col,colAtrs[i]['value']);
    		 cols[cols.length]=col;
    	 }
    	 return cols;
    }
},function(){
	//实现singleton
	erp.SCReportUtil =erp.util.form.SCReport = new erp.util.form.SCReport();
	erp.SCReportUtil.init();
})