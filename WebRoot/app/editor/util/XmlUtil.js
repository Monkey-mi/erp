Ext.define('erp.editor.util.XmlUtil', {
	alias : 'widget.tpsXmlUtil',

	/**
	 * @brief 根据字符串得到对应xmlDoc
	 * @param txt
	 * @returns xmlDoc 如果失败返回null
	 */
	loadXMLString: function(txt){
		var xmlDoc;
		try //Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			var r = xmlDoc.loadXML(txt);
			if(r){
				return xmlDoc;
			}else{
				return null;
			}
		}catch(e){
			try //Firefox, Mozilla, Opera, etc.
			{
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(txt,"text/xml");
				if(xmlDoc.activeElement && xmlDoc.activeElement.nodeName == "parsererror"){
					//firefox
					return null;
				}
				return xmlDoc;
			}catch(e){
				return null;
			}
		}
	},
	
	loadXMLDoc: function(dname){
		var xmlDoc;
		try //Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		}catch(e){
			try //Firefox, Mozilla, Opera, etc.
			{
				xmlDoc=document.implementation.createDocument(null, null, null);
			}catch(e){
				alert(e.message);
			}	
			
			try 
			{
				xmlDoc.async=false;
				xmlDoc.load(dname);
				return(xmlDoc);
			}
			catch(e){
				alert(e.message);
			}
			return(null);
		}
	},
    /**
     * 将节点信息转化为字符串
     */
	toXmlString: function(xmldoc){
		if(xmldoc){
			if(xmldoc.xml)
			{
				return xmldoc.xml;
			}else
			{
				return (new XMLSerializer()).serializeToString(xmldoc);
			}
		}else{
			return '';
		}
	},
	
	createElement: function(tagName){
		var me = this;
		if(!me.document){			
			try //Internet Explorer
			{
				me.document = new ActiveXObject("Microsoft.XMLDOM");
			}catch(e){
				try //Firefox, Mozilla, Opera, etc.
				{
					me.document = document.implementation.createDocument(null, null, null);
				}catch(e){
					alert(e.message);
				}	
			}
		}
		
		return me.document.createElement(tagName);
	},
	/**
	 * 
	 * @param xml
	 * @param selector
	 * @returns
	 */
	getChildElements: function(xml, selector){
		var me = this;
		var nodeList = new Array();
		var paths = selector.split('/');
		var nodes = [xml];
		var len = 0;
		var results;
		while(len < paths.length){
			results = [];
			for(var i = 0; i < nodes.length; ++i){
				results = results.concat(me.getChildElementsByTagName(nodes[i], paths[len]));
			}
			nodes = results;			
			++len;
		}
		
		return results;
	},
	/**
	 * 根据tagName仅返回子节点元素，不返回孙节点。
	 * @param xml
	 * @param tagName
	 * @returns {Array}
	 */
	getChildElementsByTagName: function(xml, tagName){
		var nodeList = new Array();
		for(var i = 0; i < xml.childNodes.length; ++i){
			if(xml.childNodes[i].nodeName == tagName){
				nodeList.push(xml.childNodes[i]);
			}			
		}		
		return nodeList;
	},
	/**
	 * 根据tagName仅返回第一个子节点元素，不返回孙节点。
	 * @param xml
	 * @param tagName
	 * @returns {Array}
	 */
	getFirstChildElementsByTagName: function(xml, tagName){
		for(var i = 0; i < xml.childNodes.length; ++i){
			if(xml.childNodes[i].nodeName == tagName){
				return xml.childNodes[i];
			}			
		}		
		return null;
	},
	/**
	 * 设置元素文本节点
	 * @param xml
	 * @param text
	 */
	setElementText: function(xml, text){
		try{
			xml.textContent = text;
		}catch(e){
			xml.text = text;
		}
		return xml;
	},
	/**
	 * 返回元素文本节点
	 * @param xml
	 * @param text
	 */
	getElementText: function(xml){
		return xml.textContent || xml.text || '';
	},
	/**
	 * 
	 */
	hasAttribute: function(xml, attr){
		if(xml.hasAttribute){
			return xml.hasAttribute(attr);
		}else{
			return xml.getAttribute(attr) !== null;
		}
	},
	
	removeAttribute: function(xml, attr){
		var me = this;
		if(xml){
			for(var i=0; i < xml.childNodes.length; ++i) {
				xml.childNodes[i].removeAttribute(attr);
				me.removeAttribute(xml.childNodes[i], attr);
			}
		}
	},
	
	removeAllXmlns: function(xml){
		var me = this;
		me.removeAttribute(xml, 'xmlns');
	},
	/**
	 * 删除节点
	 */
	domDelete: function(elem){
		try{
			elm.parentNode.removeChild(elm); 
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 复制节点
	 * @param all:true包含属性和子节点,false不包含
	 */
	domClone: function(elem,all){
		try{
			return elem.cloneNode(all);
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 判断是否是xmldom对象
	 */
	domIsValid: function(elem){
		try{
			//return elem instanceof xmldocument ;
			  var _t; 
		      var type = ((_t = typeof(elem)) == "object" ? elem==null && "null" || Object.prototype.toString.call(elem).slice(8,-1):_t).toLowerCase();
			  return type=="xmldocument"?true:false;
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 获得节点的名称
	 */
	domGetName: function(elem,name){
		try{
			return elem.nodeName;
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 修改节点的属性
	 */
	domSetProp: function(elem,prop,value){
		try{
			 elem.setAttribute(prop,value);
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 删除属性
	 */
	removeDomProp: function(elem,prop){
		try{
			 elem.removeAttribute(prop);
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 获取属性值
	 */
	getDomProp: function(elem,prop){
		try{
			 return elem.getAttribute(prop);
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 获取父节点
	 */
	getParent: function(elem){
		try{
			 var p = elem.parentNode;
			 return p?p:null;
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 获取子节点数目
	 */
	getChildCount: function(elem){
		try{
			 var childs = elem.childNodes;
			 return childs?childs.length:0;
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 获取子节点
	 */
	getChilds: function(elem){
		try{
			 return elem.childNodes;
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 是否是叶子节点
	 */
	isLeaf: function(elem){
		try{
			 return !elem.hasChildNodes();
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 获取所有叶子节点
	 * @param all，包含孙子节点
	 */
	getLeafArray: function(elem,all){
		var me = this;
		try{
			 var nodeList = new Array();
			 var childs = elem.childNodes;
			 if(all){
				 for(var i=0;i<childs.length;i++){
					 if(me.isLeaf(childs[i])){
						 nodeList.push(childs[i]);
					 }else{
						 nodeList = nodeList.concat(me.getLeafArray(childs[i],true));
					 }
				 }
			 }else{
				 for(var i=0;i<childs.length;i++){
					 if(me.isLeaf(childs[i])){
						 nodeList.push(childs[i]);
					 }
				 }
			 }
			 return nodeList;
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 查找指定名称的节点
	 * @param all:true，包含孙子节点
	 */
	findDom : function(elem,tag,all){
		try{
			 if(all){
				 return elem.getElementsByTagName(tag);
			 }else{
				 var nodeList = new Array();
				 var childs = elem.childNodes;
				 for(var i=0;i<childs.length;i++){
					 if(childs[i].tagName == tag){
						 nodeList.push(childs[i]);
					 }
				 }
				 return nodeList;
			 }
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 查找具有指定属性的节点
	 * @param 是否从孙子节点查找
	 */
	findDomByAttr : function(elem,attrName,all ){
		var me = this;
		try{
			 var nodeList = new Array();
			 var childs = elem.childNodes;
			 if(all){
				 for(var i=0;i<childs.length;i++){
					 if(me.hasAttribute(childs[i],attrName)){
						 nodeList.push(childs[i]);
						 nodeList = nodeList.concat(me.findDomByAttr(childs[i],attrName,true));
					 }
				 }
			 }else{
				 for(var i=0;i<childs.length;i++){
					 if(me.hasAttribute(childs[i],attrName)){
						 nodeList.push(childs[i]);
					 }
				 }
			 }
			 return nodeList;
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 添加儿子节点
	 */
	insertChild:function(elem,index,child){
		try{
			var childs = elem.childNodes;
			if(index>=childs.length){
				elem.appendChild(child);
			}else{
				elem.insertBefore(child,childs[index]);	
			} 
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 设置文本值
	 */
	setDomText:function(elem,text){
		try{
			var textNode = elem.childNodes[0];
			if(textNode){
				textNode.nodeValue = text; 
			}else{
				elem.appendChild(elem.ownerDocument.createTextNode(text));
			}
		}catch(e){
			alert(e.message);
		}
	},
	/**
	 * 获取文本值
	 */
	getDomText:function(elem){
		try{
			var textNode = elem.childNodes[0];
			var result = null;
			if(textNode){
				result = textNode.nodeValue; 
			}
			return result;
		}catch(e){
			alert(e.message);
		}
	}
},
/**
 * 设置为单例模式
 */
function() {
	Ext.XmlUtil = new this();
}
);

