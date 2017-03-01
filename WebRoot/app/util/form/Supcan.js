Ext.define('erp.util.form.Supcan',{
	requires:[/*'resources.supcan.dynaload'
	          ,*/'erp.editor.util.XmlUtil'
	          ,'erp.common.form.store.FrmFlds'
	          ,'erp.common.form.store.FrmTbls'],
	TYPE_TREELIST:'type_treelist',
	TYPE_FREEFORM:'type_freeform',
	TYPE_FORMDESIGNER:'type_formdesigner',
	TYPE_REPORT:'type_report',
	TYPE_REPORerpREVIEW:'type_reporerpreview',
	TYPE_REPORTDESIGNER:'type_reportdesigner',
	TYPE_TREE:'type_tree',
	TYPE_EDIT:'type_edit',
	TYPE_CHART:'type_chart',
	TYPE_UPLOAD:'type_upload',
	EVENT_SELCHANGED:'SelChanged',
	EVENT_CLICKED:'Clicked',
	EVENT_DBLCLICKED:'DblClicked',
	init:function(){
	},
	/*插入supcan TreeList组件*/
    getTreeList: function (id, para){
    	return bldStr("BCV1.TreeList",id, para);
    },
    /*插入supcan FreeForm组件*/
    getFreeForm:function(id, para){ 
    	return bldStr("BCV1.FreeForm",id, para);
    },
    /*插入supcan FreeForm设计器组件*/
    getFormDesigner:function(id, para){ 
    	return bldStr("BCV4.FormDesigner",id, para);
    },
    /*插入supcan Report组件*/
    getReport:function(id, para){ 
    	return bldStr("LuxForm",	 id, para);
    },
    /*插入supcan Tree组件*/
    getTree:function(id, para){ 
    	return bldStr("BCV1.Tree",	 id, para);
    },
    /*插入supcan Edit组件*/
    getEdit:function(id, para){ 
    	return bldStr("BCV1.Edit",	 id, para);
    },
    /*插入supcan Chart图表组件*/
    getChart:function(id, para){ 
    	return bldStr("BCV1.Chart",	 id, para);
    },
    /*插入supcan Upload上传组件*/
    getUpload:function(id, para){ 
    	return bldStr("BCV1.Upload",  id, para);
    },
    /*根据object id获取supcan dom对象*/
    getSupcanById: function(id){
    	if(typeof(id) == 'string'){
    		return document.getElementById(id);
    	}
    	return null;
    },
    getSupcanHtml:function(supcanAFId,supcanType){
    	var supcanHtml='';
    	switch(supcanType){
			case erp.SupcanUtil.TYPE_FREEFORM:
				supcanHtml=erp.SupcanUtil.getFreeForm(supcanAFId,'');
				break;
			case erp.SupcanUtil.TYPE_FORMDESIGNER:
				supcanHtml=erp.SupcanUtil.getFormDesigner(supcanAFId,'');
				break;
			case erp.SupcanUtil.TYPE_REPORT:
				supcanHtml=erp.SupcanUtil.getReport(supcanAFId,'workmode=uploadRuntime;Rebar=none; Border=none; Ruler=none; SeperateBar=none'); //ReBar=Print,Form,Main,,Text
				break;
			case erp.SupcanUtil.TYPE_REPORerpREVIEW:
				supcanHtml=erp.SupcanUtil.getReport(supcanAFId,'Rebar=Main'); //ReBar=Print,Form,Main,,Text
				break;	
			case erp.SupcanUtil.TYPE_REPORTDESIGNER:
				supcanHtml=erp.SupcanUtil.getReport(supcanAFId,'workmode=uploadDesigntime;ReBar=Print,Form,Property,,Font,Main,,Text;Ruler=Vert,Horz');
				break;
			case erp.SupcanUtil.TYPE_TREE:
				supcanHtml=erp.SupcanUtil.getTree(supcanAFId,'');
				break;
			case erp.SupcanUtil.TYPE_EDIT:
				supcanHtml=erp.SupcanUtil.getEdit(supcanAFId,'');
				break;
			case erp.SupcanUtil.TYPE_CHART:
				supcanHtml=erp.SupcanUtil.getChart(supcanAFId,'');
				break;
			case erp.SupcanUtil.TYPE_UPLOAD:
				supcanHtml=erp.SupcanUtil.getUpload(supcanAFId,'');
				break;
			case erp.SupcanUtil.TYPE_TREELIST:
			default:
				supcanHtml=erp.SupcanUtil.getTreeList(supcanAFId,'');
				break;
    	}
    	return supcanHtml;
    },
    /*根据报表的uploadXml制造出符合数据提交标准的JSON对象
     * 参数：tblName 数据表名
     *       uploadXml 报表的uploadXml
     *       dataAct  数据操作 分别是   erp.Const.INSERT_DATA UPDATE_DATA DELETE_DATA
     * 返回：JSON对象
     * JSON数据格式示例：
     * [{
		     INSERT_DATA:[{
			 		TABLE_NAME:'test',
			 		TABLE_FIELDS:[{FIELD_CODE:'id',FIELD_VALUE:'2'},
			 		             {FIELD_CODE:'s1',FIELD_VALUE:'动态插入4'}]
			 }],
			 UPDATE_DATA:[{
			 		TABLE_NAME:'test',
			 		TABLE_FIELDS:[{FIELD_CODE:'s2',FIELD_VALUE:'s2'},
				 		             {FIELD_CODE:'s1',FIELD_VALUE:'s1'}],
			 		WHERE_STR:'id=4'
			 }],
			 DELETE_DATA:[{
			 	  TABLE_NAME:'test',
			 	  WHERE_STR:'id=2'
			 }]
     * }]
     * */
    makeSubmitFormDataRpt:function(tblRec,uploadXml,dataAct,submitData){
    	var me = this;
    	var retJson=submitData||[];
    	var uploadJson = this.makeUploadXml2UPloadJson(uploadXml);
    	for(tbl in uploadJson){
    		var data={};
        	data[erp.Const.TABLE_NAME]=erp.Const.TABLE_PREFIX+tbl;
        	data[erp.Const.TABLE_FIELDS]=[];
        	tblRec.frmFldsStore.each(function(fld){
        		if(fld.get('ispk')==true){
        			data[erp.Const.WHERE_STR]= me.formatWhere(fld,uploadJson[tbl]);
        		}
        	});
        	var tblObj ={};
        	tblObj[dataAct]=[];
        	tblObj[dataAct].push(data);
    		for(fieldName in uploadJson[tbl]){
    			var field ={};
				field[erp.Const.FIELD_CODE]=fieldName;
				field[erp.Const.FIELD_VALUE] = uploadJson[tbl][fieldName];
				data[erp.Const.TABLE_FIELDS].push(field);
    		}
        	retJson.push(tblObj);
    	}
    	return retJson;
    },
     makeSubmitDataRpt:function(uploadXml,dataAct,submitData,eOpts){
    	var me = this;
    	var retJson=submitData||[];
    	var uploadJson = this.makeUploadXmlUPloadJson(uploadXml,eOpts);
    	var data;
    	var tblObj ={};
    	tblObj[dataAct]=[];
    	for(var i in uploadJson["items"]){
    		data={};
    		data[erp.Const.TABLE_NAME]=uploadJson.table_name;
    		data[erp.Const.TABLE_FIELDS]=[];
    		data[erp.Const.DATASOURCE_CODE]=eOpts[erp.Const.DATASOURCE_CODE];
    		var field ="";
    		for (fieldName in uploadJson["items"][i]){
    			if (eOpts.PRIMARY_KEY==fieldName)
    				data[erp.Const.WHERE_STR]=fieldName+"="+uploadJson["items"][i][fieldName] ;
    			else{
					field="{'"+erp.Const.FIELD_CODE+"':'"+fieldName+"','"+erp.Const.FIELD_VALUE+"':'"+uploadJson["items"][i][fieldName]+"'}";
    				data[erp.Const.TABLE_FIELDS].push(Ext.decode(field));
    			}
    		}
    		tblObj[dataAct].push(data);
    	}
    	
    	return tblObj;
    },
    makeUploadXmlUPloadJson:function(uploadXml,eOpts){
    	var xmlDoc = Ext.XmlUtil.loadXMLString(uploadXml);
        var attrs="{'table_name':'"+eOpts[erp.Const.TABLE_NAME]+"',items:[";
    	var records = xmlDoc.getElementsByTagName("record");
    	Ext.each(records,function(record){
    		var dataItems = record.childNodes;
    		attrs+="{";
        	Ext.each(dataItems,function(item){
        			if(item.nodeType!=3){
            			//取得字段信息
            			var fieldValue =null;
            			var fieldName = item.nodeName;
            			if(!Ext.isEmpty(item.childNodes[0])){
            				var value = item.childNodes[0].nodeValue.trim();
            				fieldValue= value==='null'?null:value;
            			}
            			attrs+="'"+fieldName+"':'"+fieldValue+"',";	
            		}
        	});
        	attrs=attrs.substring(0,attrs.length-1)+"},";
    	});
    	attrs=attrs.substring(0,attrs.length-1)+"]}";
    	
    	return Ext.decode(attrs);
    },
    
    
    setRpt2DataRec:function(uploadXml,dataRec){
    	var uploadJson = this.makeUploadXml2UPloadJson(uploadXml);
		for(tbl in uploadJson){
			Ext.apply(dataRec,uploadJson[tbl]);
		}
    },
    getUploadXml2RowXml:function(uploadXml){
    	uploadXml ='<?xml version="1.0" encoding="utf-8" ?><ROOT>'+uploadXml+'</ROOT>';
		var xmlDoc = Ext.XmlUtil.loadXMLString(uploadXml);
    	var wSheets = xmlDoc.documentElement.getElementsByTagName(erp.Const.WORK_SHEET);
    	var rowXml='';
    	if(wSheets){
    		rowXml +='<row>';
    		var items = wSheets[0].getElementsByTagName('data');
    		for (i=0;i<items.length;i++)
        	{
        		if(items[i].nodeType!=3){
        			var fieldName = items[i].getAttribute('name');
        			var fieldValue = '';
        			if(!Ext.isEmpty(items[i].childNodes[0])){
        				var value = items[i].childNodes[0].nodeValue.trim();
        				fieldValue= value==='null'?'':value;
        			}
        			rowXml +=Ext.String.format('<{0}>{1}</{0}>',fieldName,fieldValue);
        		}
        	}
    		rowXml+='</row>';
    	}
    	return rowXml;
    },
    /**
     * 将supcan的uploadXml 转换成可使用的json对象
     * JSON格式如下:
     * {
     * 		tablename1:{
     * 			field1:field1_value,
     * 			field2:field2_value,
     * 		},
     * 		tablename2:{
     * 			field1:field1_value,
     * 			field2:field2_value,
     * 		},
     * }
     */
    makeUploadXml2UPloadJson:function(uploadXml){
    	var uploadJson={};
    	//先把supcan的uploadXml补充成规范的xml
    	uploadXml ='<?xml version="1.0" encoding="utf-8" ?><ROOT>'+uploadXml+'</ROOT>';
		var xmlDoc = Ext.XmlUtil.loadXMLString(uploadXml);
		var wSheets = xmlDoc.documentElement.getElementsByTagName(erp.Const.WORK_SHEET);
    	Ext.each(wSheets,function(wSheet){
    		var dataItems = wSheet.getElementsByTagName("data");
        	Ext.each(dataItems,function(item){
        			if(item.nodeType!=3){
            			//取得字段信息
        				var fnArray = item.getAttribute('name').split('.');
        				var fieldName = fnArray[1];
            			var fieldValue = null;
            			if(!Ext.isEmpty(item.childNodes[0])){
            				var value = item.childNodes[0].nodeValue.trim();
            				fieldValue= value==='null'?null:value;
            			}
            			//取得表信息
            			var attrs={};
            			var attrArray = item.getAttribute('attr').split(';');
            			Ext.each(attrArray,function(attr){
            				var aa =attr.split("=");
            				attrs[aa[0]]=aa[1];
            			});
            			if(attrs.table_name){
            				if(Ext.isEmpty(uploadJson[attrs.table_name])){
            					uploadJson[attrs.table_name]={};
            				}
            				uploadJson[attrs.table_name][fieldName]=fieldValue;
            			}
            		}
        	});
    	});
    	return uploadJson;
    },
    /*根据列表的ChgJson(从ChangedXml转换而来)制造出符合数据提交标准的JSON对象
     * 参数：tblName 数据表名
     *       chgJson 列表的ChangedJson,这里面包括了可能有的增删改操作
     * 返回：JSON对象
     * JSON数据格式示例：
     * [{
		     INSERT_DATA:[{
			 		TABLE_NAME:'test',
			 		TABLE_FIELDS:[{FIELD_CODE:'id',FIELD_VALUE:'2'},
			 		             {FIELD_CODE:'s1',FIELD_VALUE:'动态插入4'}]
			 }],
			 UPDATE_DATA:[{
			 		TABLE_NAME:'test',
			 		TABLE_FIELDS:[{FIELD_CODE:'s2',FIELD_VALUE:'s2'},
				 		             {FIELD_CODE:'s1',FIELD_VALUE:'s1'}],
			 		WHERE_STR:'id=4'
			 }],
			 DELETE_DATA:[{
			 	  TABLE_NAME:'test',
			 	  WHERE_STR:'id=2'
			 }]
     * }]
     * */
    makeSubmitFormDataLst:function(chgJson,submitData){
    	var retJson=submitData||[],rowObj={};
    	if(!chgJson.table){
    		Ext.Error.raise({
    			msg:'正在转换的chgJson不是一个合法对象!',
    			option:chgJson
    		});
    		return;
    	}
    	var newRows = chgJson.table.newRow;
    	var modifiedRows = chgJson.table.modifiedRow;
    	var deletedRows = chgJson.table.deletedRow;
    	var keyName =chgJson.table.key;
    	//删除
    	if(deletedRows){
    		rowObj[erp.Const.DELETE_DATA]=[];
	    	Ext.each(deletedRows,function(deletedRow){
	    		var deleteData={};
	    		deleteData[erp.Const.TABLE_NAME]=erp.Const.TABLE_PREFIX+chgJson.table.table_name;
	    		deleteData[erp.Const.WHERE_STR]='';
	    		if(deletedRow.row){
		    		deleteData[erp.Const.WHERE_STR] = keyName+'="'+deletedRow.row.key+'"';
		    	}else{
		    		deleteData[erp.Const.WHERE_STR] = keyName+'="'+deletedRow.key+'"';
	    		}
	    		rowObj[erp.Const.DELETE_DATA].push(deleteData);
	    	});
    	}
    	//新增
    	if(newRows){
    		rowObj[erp.Const.INSERT_DATA]=[];
	    	Ext.each(newRows,function(newRow){
	    		var insertData={};
	    		insertData[erp.Const.TABLE_NAME]=erp.Const.TABLE_PREFIX+chgJson.table.table_name;
	    		insertData[erp.Const.TABLE_FIELDS]=[];
	    		delete newRow.row.key;
	    		for(propName in newRow.row){
	    			var field ={};
	    			field[erp.Const.FIELD_CODE]=propName;
	    			field[erp.Const.FIELD_VALUE]=newRow.row[propName];
	    			insertData[erp.Const.TABLE_FIELDS].push(field);
	    		}
	    		rowObj[erp.Const.INSERT_DATA].push(insertData);
	    	});
	    }
    	//修改
    	if(modifiedRows){
    		rowObj[erp.Const.UPDATE_DATA]=[];
	    	Ext.each(modifiedRows,function(modifiedRow){
	    		var updateData={};
	    		updateData[erp.Const.TABLE_NAME]=erp.Const.TABLE_PREFIX+chgJson.table.table_name;
	    		updateData[erp.Const.TABLE_FIELDS]=[];
	    		updateData[erp.Const.WHERE_STR]='';
	    		updateData[erp.Const.WHERE_STR] = keyName+'="'+modifiedRow.row.key+'"';
	    		delete modifiedRow.row.key;
	    		delete modifiedRow.row.rowNumber;
	    		for(propName in modifiedRow.row){
	    			var field ={};
	    			field[erp.Const.FIELD_CODE]=propName;
	    			field[erp.Const.FIELD_VALUE]=modifiedRow.row[propName].text;
	    			updateData.TABLE_FIELDS.push(field);
	    		}
	    		rowObj[erp.Const.UPDATE_DATA].push(updateData);
	    	});
    	}
    	retJson.push(rowObj);
    	return retJson;
    },
    makeRptXml:function(flds){
    	//产生默认的报表样式
    	var cols=10,rows=15,
    		colStr='',rowStr='';
    	//默认列
    	for(var i=0;i<=cols;i++){
    			colStr+= i==cols ? '<Col width="15" />':'<Col width="70" />';
    	}
    	
    	//默认行列
    	for(var i=0;i<=rows;i++){
    		rowStr += i==rows ?'<TR height="10" > ':'<TR height="22" > ';
    		for(var j=0;j<=cols;j++){
    			if(i==rows)
    				rowStr += j==cols?'<TD leftBorder=0 topBorder=0 ></TD> ':'<TD leftBorder=0 topBorder=1></TD> ';
    			else{
    				rowStr += j==cols?'<TD leftBorder=1 topBorder=0 ></TD> ':'<TD leftBorder=1 topBorder=1></TD> ';
    			}
    		}
    		rowStr +='</TR>';
    	}
    	
		var rptXml='<?xml version="1.0" encoding="utf-8" ?>'
			+'<Report>                             '
			+'<WorkSheet name="工作表1" isDefaulerprint="true">'
			+'<Properties><BackGround bgColor="#FFFFFF" arrange="tile" alpha="255"/>'
			+'<DefaultTD>'
			+'<TD fontIndex="0" textColor="#000000" transparent="true" leftBorder="0" topBorder="0" leftBorderColor="#C0C0C0" leftBorderStyle="solid" topBorderColor="#C0C0C0" topBorderStyle="solid" decimal="2" align="center" vAlign="middle" isProtected="false" isThousandSeparat="true" isRound="true" isPrint="true"/>'
			+'</DefaultTD>'
			+'<Other isShowZero="true" isRefOriPrecision="true" LineDistance="0" isRowHeightAutoExtendAble="true" isUsingEditMask="true"/>'
			+'</Properties>'
			+'<Table>'
			+colStr
			+rowStr
			+'</Table>'
			+'<GridLine />'
			+'</WorkSheet>'
			+'</Report>';
		return rptXml;
	},
	/**
	 * {
	 *   master_table:{
	 * 		code:'',
	 * 		name:'',
	 * 		fields:[]
	 * 	 },
	 * 	 detail_table:{
	 * 		code:'',
	 * 		name:'',
	 * 		fields:[]
	 * 	 }
	 * }
	 * 
	 */
	makeItemLibXml:function(tbls){
		//根据字段制造指标库
		var itemXmlerpl= new Ext.Template('<?xml version="1.0" encoding="UTF-8"?">'
			+'<data> '
			+'{projects}'
			+'</data>'
		);
		var prjerpl= new Ext.Template('<project name="{tblName}">'
			+'     {items}  '
			+'   </project>'	
		);
		var mItemerpl = new Ext.Template('<item  '
			+'id="{tblCode}.{fldCode}" text="{text}" datatype="{datatype}">'
			+'<attr name="table_name" text="数据表" value="{tblCode}"/>'
			+'</item>'
		);
		var dItemerpl = new Ext.Template('<item  '
				+'id="{tblCode}.{fldCode}" text="{text}" datatype="{datatype}">'
				+'<attr name="table_name" text="数据表" value="{tblCode}"/>'
				+'<attr name="row_num" text="行号" />'
				+'</item>'
			);
		
		var projects='';
		if(tbls.master_table){
			//主表部分
			var flds = tbls.master_table.fields;
			var items ='';
			Ext.each(flds,function(fld){
				items += mItemerpl.apply({
					tblCode:tbls.master_table.code,
					fldCode:fld.get('code'),
					text:fld.get('name'),
					datatype:erp.SupcanUtil.getFldDataType(fld)
				});
			});
			projects +=prjerpl.apply({
				tblName:tbls.master_table.name,
				items:items
			});
		}
		if(tbls.detail_table){
			//从表部分
			var flds = tbls.detail_table.fields;
			var items ='';
			Ext.each(flds,function(fld){
				items += dItemerpl.apply({
					tblCode:tbls.detail_table.code,
					tblName:tbls.detail_table.name,
					fldCode:fld.get('code'),
					text:fld.get('name'),
					datatype:erp.SupcanUtil.getFldDataType(fld)
				});
			});
			projects +=prjerpl.apply({
				tblName:tbls.detail_table.name,
				items:items
			});
		}
		return itemXmlerpl.apply({projects:projects});
	},
	getFldDataType:function(fld){
		var dataType=erp.Const.SUPCAN_DATA_TYPE_STRING;
		switch(fld.get('datatype')){
			case erp.Const.DATA_TYPE_INTEGER:
				dataType =erp.Const.SUPCAN_DATA_TYPE_INTEGER;
				dataType +=' edittype'+'="'+erp.Const.SUPCAN_DATA_TYPE_INTEGER+'"';
				break;
			case erp.Const.DATA_TYPE_DEC:
				dataType =erp.Const.SUPCAN_DATA_TYPE_DEC;
				dataType +=' '+erp.Const.SUPCAN_DATA_TYPE_DEC_PREC+'='+fld.get('prec');
				dataType +=' edittype'+'="'+erp.Const.SUPCAN_DATA_TYPE_DEC+'"';
				break;
			case 'float':
				dataType ='"'+erp.Const.SUPCAN_DATA_TYPE_DEC+'"';
				dataType +=" "+erp.Const.SUPCAN_DATA_TYPE_DEC_PREC+"='"+fld.get('prec')+"'";
				dataType +=' edittype'+'="'+erp.Const.SUPCAN_DATA_TYPE_DEC_PREC+'"';
				break;
			case erp.Const.DATA_TYPE_DATE:
				dataType =erp.Const.SUPCAN_DATA_TYPE_DATETIME;
				dataType +=' edittype'+'="'+erp.Const.SUPCAN_DATA_TYPE_DATETIME+'"';
				break;	
			case erp.Const.DATA_TYPE_DATETIME:
				dataType =erp.Const.SUPCAN_DATA_TYPE_DATETIME;
				dataType +=' edittype'+'="'+erp.Const.SUPCAN_DATA_TYPE_DATETIME+'"';
				break;
			case erp.Const.DATA_TYPE_BOOL:
				dataType ='"'+erp.Const.SUPCAN_DATA_TYPE_BOOL+'"';
				dataType +=' edittype'+'="'+erp.Const.SUPCAN_DATA_TYPE_BOOL+'"';
				break;
			case erp.Const.DATA_TYPE_STRING:
			default:
				dataType =erp.Const.SUPCAN_DATA_TYPE_STRING;
				dataType +=' edittype'+'="'+erp.Const.SUPCAN_DATA_TYPE_STRING+'"';
				break;
			
		}
		return dataType;
	},
	makeEmptyTreeListXml:function(){
		props ='<Properties editable="false" '
	      +' ListTreeSwitchAble="false" isShowRuler="false" '
	      +' isHiLightModified="true" isHiLightNewRow="true"  '
		  +' >'
	      +'</Properties>';
		var lsterpL=new Ext.Template(['<?xml version="1.0" encoding="UTF-8"?>',
		     			            '<TreeList>\n',
		     			            '	{props}\n',
		     			            '	<Fonts>{fonts}</Fonts>\n',
		     			            '	{cols}\n',
		     			            '</TreeList>\n'
		     			            ]);
		return lsterpL.apply({
			props:props,
			fonts:'',
			cols:'<Cols><Col name="'+erp.Const.PK_FIELDCODE+'" width="0"  editable="false" ishide="false"></Col></Cols>'
		});
	},
	makeTreeListXml:function(flds,custObj,Properties){
		//根据字段定义和自定义属性制造TreeList的xml
		var me=this;
		function getFldXml(fld,custCol){
			//根据数据表的字段定义产生xml文本
			var dataType='datatype='+erp.SupcanUtil.getFldDataType(fld);
			
			var	editable=fld.get('editable'),
				width=fld.get('width'),
				ishide=fld.get('ishide');
			
			//根据用户设定更改
			if(custCol){
				width = custCol.width;
				ishide = custCol.isHide;
			}
			var flderpL=new Ext.Template('<Col ' +
					'totalExpress="{totalExpress}" ' +
					'displayMask="{displayMask}" ' +
					' name="{name}" {datatype} ' +
					' edittype="{edittype}" ' +
					'width="{width}"  editable="{editable}" ' +
					'ishide="{ishide}">{value}</Col>\n');
			return flderpL.apply({
				name:fld.get('code'),
				value:fld.get('name'),
				datatype:dataType,
				editable:editable,
				width:width,
				edittype:fld.get('edittype'),
				ishide:ishide,
				displayMask:fld.get('displayMask'),
				totalExpress:fld.get('totalExpress')
			});
		};
		function getLstXml(props,fonts,cols){
			var Proper={
				editable:"true",
				ListTreeSwitchAble:"false",
				isShowRuler:"false",
				isHiLightModified:"true",
				isHiLightNewRow:"true",
				textColor:'#000000',
				curSelMode:'rows',
				CheckBoxColor:'#8C5809,#400000,#007850,#8C5809,#400000,#007850,#FFFFFF',
				curSelColor:'#20000000',
				CheckMode:'checkbox',
				curSelBackColor:"#33aaccee;borderWidth=1;borderRound=9;borderColor=#55aaff",
				displayMask:''
			}
			Ext.apply(Proper,Properties);
			var propserpL =new Ext.Template(['<Properties totalBgColor="#FFFF00"'
			      +' curSelBackColor= "'+Proper.curSelBackColor+'"'
				  +' editable= "'+Proper.editable+'"'
			      +' ListTreeSwitchAble= "'+Proper.ListTreeSwitchAble +'"'
			      +' isShowRuler="'+Proper.isShowRuler+'"'
			      +' isHiLightModified="'+Proper.isHiLightModified+'"'
			      +' isHiLightNewRow="'+Proper.isHiLightNewRow+'"'
			      +' textColor="'+Proper.textColor+'"'
			      +' curSelMode="'+Proper.curSelMode+'"'
			      +' CheckBoxColor="'+Proper.CheckBoxColor+'"'
			      +' curSelColor="'+Proper.curSelColor+'"'
			      +' CheckMode="'+Proper.CheckMode+'"'
			      +' displayMask="'+Proper.displayMask+'"'
			      +' {props} '
				  +' >'
			      +'</Properties>'
			      ]);
			var propsStr = propserpL.apply({props:props});
			var lsterpL=new Ext.Template(['<?xml version="1.0" encoding="UTF-8"?>',
			            '<TreeList>\n',
			            '	{props}\n',
			            '	<Fonts>{fonts}</Fonts>\n',
			            '	{cols}\n',
			            '</TreeList>\n'
			            ]);
			return lsterpL.apply({
				props:propsStr,
				fonts:fonts,
				cols:cols
			});
		};
		var cols='<Cols>\n';
		var props ='',fonts='';
		Ext.each(flds,function(fld){
			if(custObj)
				cols +=getFldXml(fld,custObj.colsMap.get(fld.get('code')));
			else
				cols +=getFldXml(fld);
			if(fld.get('ispk')==true){
				props += ' key="'+fld.get('code')+'"';
			}
		});
		cols +='	</Cols>';
		
		return getLstXml(props,fonts,cols);
	},
	makeTreeListByURL:function(editor,url,params){
		var me=this;
		//console.log(Ext.encode(params));
		//editor.func("load",url+"&&gdbj=0&&czy_gh=wj");
		editor.func("OpenLoadMask", "数据加载中，请稍后...");
		Ext.Ajax.request({url:url,
			method:'POST',
			params:params,
			async: false,
			timeout:90000,
			callback:function(options, success, resp){
				//editor.func("DeclareAsynch", "p1=sync");
				editor.func("DeclareAsynch", "");//解决线程阻塞问题
				editor.func("load",resp.responseText);
			}
		});
	},
	makeTreeListData:function(flds,rowNum){
		//生成treelist演示数据
		function makeFldDataRow(flds,rowNo){
			var row={};
			Ext.each(flds,function(fld){
				var fldCode = fld.get('code');
				switch(fld.get('datatype')){
					case erp.Const.DATA_TYPE_STRING:
						row[fldCode] ='文本';
						if(fldCode===erp.Const.PK_FIELDCODE)
							row[fldCode] =erp.Const.PK_FIELDCODE+'_'+rowNo;
						break;
					case erp.Const.DATA_TYPE_INTEGER:
						row[fldCode] =123;
						break;
					case erp.Const.DATA_TYPE_DEC:
						row[fldCode] =1234.01;
						break;
					case erp.Const.DATA_TYPE_DATETIME:
					case erp.Const.DATA_TYPE_DATE:
						row[fldCode] = new Date();
						break;
					default:
						row[fldCode] ={};
						break;
				}
			});
			return row;
		};
		var dataRows={Record:[]};
		for(var i=0;i<rowNum;i++)
			dataRows.Record.push(makeFldDataRow(flds,i));
		return Ext.encode(dataRows);
	},
	getEditWin:function(supcanEditWin){
		var edtWin = null;
		if(supcanEditWin){
			edtWin=supcanEditWin.curFrndRec?supcanEditWin:supcanEditWin.down('edt_DefFrmRender');
			if(edtWin==null)
				edtWin=supcanEditWin.curFrndRec?supcanEditWin:supcanEditWin.down('edt_FrmInput');
		}
		return  edtWin;
	},
	saveTreeListData:function(chgJson,callBackFun){
		var submitData=erp.SupcanUtil.makeSubmitFormDataLst(chgJson);
		erp.SupcanUtil.submitFormData(submitData,callBackFun);
	},
	saveReportData:function(uploadXml,dataAct,callBackFun){
		var submitData = erp.SupcanUtil.makeSubmitFormDataRpt(uploadXml,dataAct);
		erp.SupcanUtil.submitFormData(submitData,callBackFun);
	},
	saveReport2Data:function(uploadXml,dataAct,callBackFun,eOpts){
		var submitData = erp.SupcanUtil.makeSubmitDataRpt(uploadXml,dataAct,'',eOpts);
		erp.SupcanUtil.submitFormData(submitData,callBackFun);
	},
	doFormSave:function(edtWin,callBackFun){
		var mAFId =edtWin.masterAFId,
	    dAFId =edtWin.detailAFId,
	    mAF = erp.SupcanUtil.getSupcanById(mAFId),
	    dAF = erp.SupcanUtil.getSupcanById(dAFId),
	    frndRec = edtWin.curFrndRec,
	    curData = edtWin.curData,
	    renderType = frndRec.get('render_type'),
		me = this,
		fldStore=Ext.create('erp.common.form.store.FrmFlds');
		if(!mAF){
			Ext.Msg.alert('Supcan控件id=['+id+']不存在,无法执行操作!');
			return;
		}
		switch(renderType){
			case erp.Const.FRMRND_TYPE_REPORT:
			case erp.Const.FRMRND_TYPE_RMasterDetail:
				var uploadXml = mAF.func('GetUploadXML', '');
				this.saveReportData(uploadXml,curData.dataAct,callBackFun);
				//this.doSaveRptFrmInput(mAF,uploadXml,curData.dataAct);
				break;
			case erp.Const.FRMRND_TYPE_TREELIST:
				var chgXml = mAF.func('GetChangedXml','level=1;isValidateKey=false;DateFormat="%Y-%m-%d";DateTimeFormat="%Y-%m-%d %H:%M:%S"');
				var chgJson = mAF.func('toJson',chgXml).replace(/\\"/gi,'');
				var chgJsonObj = Ext.decode(chgJson);
				chgJsonObj.table.table_name = edtWin.masterTblRec.get('code'); 
				this.saveTreeListData(chgJsonObj,callBackFun);
				//this.doSaveLstFrmInput(mAF,chgJsonObj,curData.dataAct);
				break;
			case erp.Const.FRMRND_TYPE_RTMasterDetail:
				var uploadXml = mAF.func('GetUploadXML', '');
				var submitData = erp.SupcanUtil.makeSubmitFormDataRpt(edtWin.masterTblRec,uploadXml,curData.dataAct);
				
				var chgJson = dAF.func('toJson',dAF.func('GetChangedXml','level=1;isValidateKey=false;DateFormat="%Y-%m-%d";DateTimeFormat="%Y-%m-%d %H:%M:%S"')).replace(/\\"/gi,'');
				if(!Ext.isEmpty(chgJson)){
					//没变化时就无需保存了
					var chgJsonObj = Ext.decode(chgJson);
					chgJsonObj.table.table_name = edtWin.detailTblRec.get('code');
					submitData = erp.SupcanUtil.makeSubmitFormDataLst(chgJsonObj,submitData);
				}
				erp.SupcanUtil.submitFormData(submitData,function(retData,errMsg){
					if(Ext.isArray(retData)){
						mAF.func('ResetChanged', '');
						dAF.func('ResetChanged', '');
						Ext.Msg.alert('提示','保存成功!');
						erp.SupcanUtil.setRpt2DataRec(uploadXml,curData.dataRec);
						if(Ext.isFunction(callBackFun)){
							Ext.callback(callBackFun,me,[curData]);
						}
					}else{
						Ext.Msg.alert('出错了',errMsg);
					}
				});
				break;
			case erp.Const.FRMRND_TYPE_TTMasterDetail:
				var chgJson = mAF.func('toJson',mAF.func('GetChangedXml','level=1;isValidateKey=false;DateFormat="%Y-%m-%d";DateTimeFormat="%Y-%m-%d %H:%M:%S"')).replace(/\\"/gi,'');
				var chgJsonObj = Ext.decode(chgJson);
				chgJsonObj.table.table_name = edtWin.masterTblRec.get('code');
				submitData = erp.SupcanUtil.makeSubmitFormDataLst(chgJsonObj,submitData);
				
				chgJson = dAF.func('toJson',dAF.func('GetChangedXml','level=1;isValidateKey=false;DateFormat="%Y-%m-%d";DateTimeFormat="%Y-%m-%d %H:%M:%S"')).replace(/\\"/gi,'');
				chgJsonObj = Ext.decode(chgJson);
				chgJsonObj.table.table_name = edtWin.detailTblRec.get('code');
				submitData = erp.SupcanUtil.makeSubmitFormDataLst(chgJsonObj,submitData);
				
				erp.SupcanUtil.submitFormData(submitData,function(retRecs,errMsg){
					if(Ext.isArray(retRecs)){
						mAF.func('ResetChanged', '');
						dAF.func('ResetChanged', '');
						Ext.Msg.alert('提示','保存成功!');
					}else{
						Ext.Msg.alert('出错了',errMsg);
					}
				});
				break;
			case erp.Const.FRMRND_TYPE_RRMasterDetail:
				var uploadXml = mAF.func('GetUploadXML', '');
				var submitData = erp.SupcanUtil.makeSubmitFormDataRpt(uploadXml,curData.dataAct);
				
				uploadXml = dAF.func('GetUploadXML', '');
				submitData = erp.SupcanUtil.makeSubmitFormDataRpt(uploadXml,curData.dataAct,submitData);
				
				erp.SupcanUtil.submitFormData(submitData,function(retRecs,errMsg){
					if(Ext.isArray(retRecs)){
						mAF.func('ResetChanged', '');
						dAF.func('ResetChanged', '');
						Ext.Msg.alert('提示','保存成功!');
					}else{
						Ext.Msg.alert('出错了',errMsg);
					}
				});
				break;
		}		
	},
	//打开单据录入界面
	doFormInput:function(ctrller,frndRec,curData){
		var tblStore = Ext.create('erp.form.store.FrmTbls');
		if(Ext.isEmpty(curData.dataRec))
			curData.dataRec ={};
		tblStore.load({params:{freg_id:frndRec.get('freg_id')},callback:function(tblRecs){
			if(tblStore.getCount()<=0){
				Ext.Msg.alert('提示','数据表尚未定义 ,无法做数据录入!');
				return;
			}
			var mTblRec = tblStore.getById(frndRec.get('master_ftid')),
				dTblRec = tblStore.getById(frndRec.get('detail_ftid'));
			
			var renderType = frndRec.get('render_type'),
			    merplXml = frndRec.get('master_xml'),
				derplXml = frndRec.get('detail_xml');
			
			if(Ext.isEmpty(mTblRec)){
				Ext.Msg.alert('提示','主数据表尚未定义 ,无法做数据录入!');
				return;
			}
			if(Ext.isEmpty(merplXml)||Ext.isEmpty(merplXml)){
				Ext.Msg.alert('提示','主数据表['+mTblRec.get('name')+'-'+mTblRec.get('code')+']尚未定义呈现模板，无法做数据录入!');
				return;
			}
			//检查主数据表是否存在
			var tblName = erp.Const.TABLE_PREFIX+mTblRec.get('code');
			erp.SupcanUtil.existsFormTable(tblName,function(isExists,errMsg){
				if(Ext.isEmpty(isExists)){
					Ext.Msg.alert('出错了:',errMsg);
					return;
				}
				if(isExists!=true){
					Ext.Msg.alert('提示','主数据表['+mTblRec.get('name')+'-'+mTblRec.get('code')+']尚未建立,无法做数据录入!');
					return;
				}
				switch(renderType){
					case erp.Const.FRMRND_TYPE_REPORT:
					case erp.Const.FRMRND_TYPE_TREELIST:
					case erp.Const.FRMRND_TYPE_RMasterDetail:
						ctrller.supcanEditWin=erp.Util.addContentTab({
							itemId:'edt_FrmInput',
							xtype:'edt_FrmInput',
							readyCount:0,
							curFrndRec:frndRec,
							curData:curData,
							masterTblRec:mTblRec,
							detailTblRec:null,
							closable:true
						});
						ctrller.supcanEditWin.down('toolbar').setDisabled(true);
						break;
					case erp.Const.FRMRND_TYPE_RTMasterDetail:
					case erp.Const.FRMRND_TYPE_TTMasterDetail:
					case erp.Const.FRMRND_TYPE_RRMasterDetail:
						if(Ext.isEmpty(dTblRec)){
							Ext.Msg.alert('提示','从数据表尚未定义 ,无法做数据录入!');
							return;
						}
						if(Ext.isEmpty(merplXml)||Ext.isEmpty(derplXml)){
							Ext.Msg.alert('提示','从数据表['+dTblRec.get('name')+'-'+dTblRec.get('code')+']尚未定义呈现模板，无法做数据录入!');
							return;
						}
						var tblName = erp.Const.TABLE_PREFIX+dTblRec.get('code');
						erp.SupcanUtil.existsFormTable(tblName,function(isExists,errMsg){
							if(Ext.isEmpty(isExists)){
								Ext.Msg.alert('出错了:',errMsg);
								return;
							}
								
							if(isExists!=true){
								Ext.Msg.alert('提示','从数据表['+dTblRec.get('name')+'-'+dTblRec.get('code')+']尚未建立,无法做数据录入!');
								return;
							}
							ctrller.supcanEditWin=erp.Util.addContentTab({
								itemId:'edt_FrmInput',
								xtype:'edt_FrmInput',
								readyCount:0,
								curFrndRec:frndRec,
								curData:curData,
								masterTblRec:mTblRec,
								detailTblRec:dTblRec,
								closable:true
							});
							ctrller.supcanEditWin.down('toolbar').setDisabled(true);
						});
						break;
				}
			});
		}});
	},
	
	/**
	 * /*
	 * 提交指定表和字段的数据
	 * 参数：
	 *  @param submitData
	* 提交的JSON数据格式示例：
    * [{
		     INSERT_DATA:[{
			 		TABLE_NAME:'test',
			 		TABLE_FIELDS:[{FIELD_CODE:'id',FIELD_VALUE:'2'},
			 		             {FIELD_CODE:'s1',FIELD_VALUE:'动态插入4'}]
			 }],
			 UPDATE_DATA:[{
			 		TABLE_NAME:'test',
			 		TABLE_FIELDS:[{FIELD_CODE:'s2',FIELD_VALUE:'s2'},
				 		             {FIELD_CODE:'s1',FIELD_VALUE:'s1'}],
			 		WHERE_STR:'id=4'
			 }],
			 DELETE_DATA:[{
			 	  TABLE_NAME:'test',
			 	  WHERE_STR:'id=2'
			 }]
    * }]
    * @param callBackFun(retRecs,errMsg)
    * 返回新增部分数据或者全部数据(待实现)retRecs
    * 数据格式示例为：
    *  data:{
	*        tblName1:[{pk_id:1,f1:v1,f2:v2},{pk_id:2,f1:v11,f2:v21}],
	*        tblName2:[{pk_id:1,f1:v1,f2:v2}]
	*  } 
    * 
    */
	submitFormData:function(submitData,callBackFun){
		var postData={};
		var data=Ext.JSON.encode(submitData);
		postData[erp.Const.AJAX_DATA_ROOT]=data;
		erp.Const.callServiceMethod(
				'form/FormService.do?method=submitFormData',
				postData,
				callBackFun
		);
	},
	makeDefaultWhere:function(ftId,mRec){
		var fldStore=Ext.create('erp.common.form.store.FrmFlds');
		fldStore.load({params:{ft_id:ftId},
			callback:function(flds){
				Ext.each(flds,function(fld){
					var field ={};
	    			field[erp.Const.FIELD_CODE]=fld.get('code');
					selectData[erp.Const.TABLE_FIELDS].push(field);
				});
				erp.SupcanUtil.selectFormData(selectJson,callBackFun);
			}
		});
	},
	formatWhere:function(fld,vRec){
		var str = ' {field}=';
		switch(fld.get('datatype')){
			case erp.Const.DATA_TYPE_DATE:
			case erp.Const.DATA_TYPE_DATETIME:
			case erp.Const.DATA_TYPE_STRING:
				str +="'{value}' ";
				break;
			default:
				str +="{value} ";
				break;
		}
		var whereerpl = new Ext.Template(str);
		var fldCode = fld.get('code');
		return whereerpl.apply({
				field:fldCode,
				value:vRec[fldCode]
				});
	},
	loadFormData:function(tblRec,whereStr,mRec,callBackFun){
		var me = this;
		var tblName=tblRec.get('code'),
			tblType=tblRec.get('type');
		var selectJson ={};
		selectData={};
		tblName = erp.Const.TABLE_PREFIX+tblName;
		selectData[erp.Const.TABLE_NAME]=tblName;
		selectData[erp.Const.TABLE_FIELDS]=[];
		selectJson[erp.Const.SELECT_DATA]=selectData;
		tblRec.frmFldsStore.each(function(fld){
			//制造查询字段
			var field ={};
			field[erp.Const.FIELD_CODE]=fld.get('code');
			selectData[erp.Const.TABLE_FIELDS].push(field);
			//根据主键或外键制造默认查询条件
			if(mRec && Ext.isEmpty(whereStr)){
				if((tblType==='MASTER'&&fld.get('ispk')==true))
					whereStr= mRec[fld.get('code')]? me.formatWhere(fld,mRec): whereStr;
				if((tblType==='DETAIL'&&fld.get('isfk')==true)){
					whereStr= mRec[fld.get('code')]? me.formatWhere(fld,mRec): whereStr;
				}
			}
		});
		selectData[erp.Const.WHERE_STR] = whereStr;
		erp.SupcanUtil.selectFormData(selectJson,callBackFun);
	},
	
	/**
	 * 查询指定表和字段的数据	
	 * 参数：
	 * @param selectData
	 * 提交的JSON格式示例如下：
	 * {
	 * 		SELECT_DATA:{
	 * 			TABLE_NAME:'test',
	 *		 		TABLE_FIELDS:[{FIELD_CODE:'s2',FIELD_VALUE:'s2'},
	 *			 		             {FIELD_CODE:'s1',FIELD_VALUE:'s1'}],
	 *		 		WHERE_STR:'id=4'
	 * 		}
	 * } 
	 * @param callBackFun(retRecs,errMsg)
	 *  发回查询结果retRecs
	 * 查询结果格式示例如下：
	 * [
     * 	 {field1_name:field1_value,field2_name:field2_value},
     *   {field1_name:field1_value,field2_name:field2_value}
     * ] 
	 */
	selectFormData:function(selectData,callBackFun){
		var postData={};
		postData[erp.Const.AJAX_DATA_ROOT]=Ext.encode(selectData);
		erp.Const.callServiceMethod(
				'form/FormService.do?method=selectFormData',
				postData,
				callBackFun
		);
	},
	/*查询字段构造
	 * scope参数为构造参数的实体
	 * tablename为构造参数的表名
	 * recs为构造参数的字段数组
	 * where_str为查询语句     
	 *      
	 *      
	 *      */
	inierparams:function(scope,tablename,recs,where_str){
	     var me,
			 selectData,
			 selectJson;
			 me=this;
			 selectData={};
			 selectJson={};
			 var recs=recs;
			 selectData[erp.Const.TABLE_NAME]=erp.Const.TABLE_PREFIX+tablename;
			 selectData[erp.Const.TABLE_FIELDS]=[];
			 Ext.each(recs,function(rec){
				var a={};
				a[erp.Const.FIELD_CODE]=rec.get("code");
				selectData[erp.Const.TABLE_FIELDS].push(a);
			 });
			 //查询条件
			 if(where_str){
				 selectData['WHERE_STR']=where_str;
			 }
			selectJson[erp.Const.SELECT_DATA]=selectData;
			return selectJson;
		},
	/**
	 * 创建数据表
	 * @param tblData
	 * @param callBackFun(success,errMsg)
	 */
	createFormTable:function(frmTblData,callBackFun){
		var postData={};
		postData[erp.Const.AJAX_DATA_ROOT]=Ext.encode(frmTblData);
		erp.Const.callServiceMethod(
				'form/FormService.do?method=createFormTable',
				postData,
				callBackFun
		);
	},
	/**
	 * 删除数据表
	 * @param tblName
	 * @param callBackFun(success,errMsg)
	 */
	dropFormTable:function(frmTblData,callBackFun){
		var postData={};
		postData[erp.Const.AJAX_DATA_ROOT]=Ext.encode(frmTblData);
		erp.Const.callServiceMethod(
				'form/FormService.do?method=dropFormTable',
				postData,
				callBackFun
		);
	},
	/**
	 * 查询数据表是否已经存在
	 * 参数:
	 * @param tblName 数据表名
	 * @param callBackFun(isExists,errMsg) isExists
	 */
	existsFormTable:function(frmTblData,callBackFun){
		var postData={};
		postData[erp.Const.AJAX_DATA_ROOT]=Ext.encode(frmTblData);
		erp.Const.callServiceMethod(
				'form/FormService.do?method=existsFormTable',
				postData,
				callBackFun
		);
	},
	/**
	 * 查询FrmReg是否有下级定义存在
	 * 参数：
	 * @param fregId 数据
	 * @param callBackFun(isExists,errMsg) isExists
	 */
	existsFrmRegDownCount:function(fregId,callBackFun){
		var postData={freg_id:fregId};
		erp.Const.callServiceMethod(
				'form/FormService.do?method=existsFrmRegDownCount',
				postData,
				callBackFun
		);
	},
	/**
	 * 查询FrmTbl是否有下级定义存在
	 * 参数：
	 * @param ftId 数据
	 * @param callBackFun(isExists,errMsg) isExists
	 */
	existsFrmTblDownCount:function(ftId,callBackFun){
		var postData={ft_id:ftId,isbuildin:erp.Const.YESNO_TYPE_NO};
		erp.Const.callServiceMethod(
				'form/FormService.do?method=existsFrmTblDownCount',
				postData,
				callBackFun
		);
	},
	/**
	 * 获得表单查询定义的JSON格式
	 * data:{
	 * 	   SELECT_DATA:{
	 *  	    TABLE_DEFINE:'',
	 *          WHERE_STR:''
	 *     }
	 * }
	 * @param frmTblRec
	 */
	getFrmTblQRYJSON:function(frmTblRec,whereStr){
		var retJson ={};
		var ajaxDataRoot ={};
		var selectData ={};
		ajaxDataRoot[erp.Const.TABLE_DEFINE] = Ext.encode(frmTblRec.data);
		if(whereStr){
			selectData[erp.Const.WHERE_STR]=whereStr;
		}
		ajaxDataRoot[erp.Const.SELECT_DATA]=selectData;
		retJson[erp.Const.AJAX_DATA_ROOT]=Ext.encode(ajaxDataRoot);
		return retJson;
	},
	/**
	 * 根据记录生成符合格式的提交JSON
	 * @param formDatas
	 * @param tblName
	 * @param records  
	 * @param dataAction
	 */
	getFormData:function(formDatas,tblName,records,dataAction){
		if(!Ext.isArray(records)){
			recs = [];
			recs.push(records);
		}else
			recs = records;
		
		if(!formDatas[dataAction]){
			formDatas[dataAction]=[];
		}
		
		Ext.each(recs,function(rec){
			var frmData={};
			formDatas[dataAction].push(frmData);
			frmData[erp.Const.TABLE_NAME]=erp.Const.TABLE_PREFIX+tblName;
			frmData[erp.Const.TABLE_FIELDS]=[];
			for(fld in rec.data){
				var frmFld ={};
				frmData[erp.Const.TABLE_FIELDS].push(frmFld);
				frmFld[erp.Const.FIELD_CODE]=fld;
				frmFld[erp.Const.FIELD_VALUE]=rec.data[fld];
			}
			if(dataAction!=erp.Const.INSERT_DATA	)
				frmData[erp.Const.WHERE_STR] =erp.Const.KEY_FIELDCODE+'='+rec.get(erp.Const.KEY_FIELDCODE);
			//rec.commit();			
		});
	}
},function(){
	//实现singleton
	erp.SupcanUtil =erp.util.form.Supcan = new erp.util.form.Supcan();
	erp.SupcanUtil.init();
});