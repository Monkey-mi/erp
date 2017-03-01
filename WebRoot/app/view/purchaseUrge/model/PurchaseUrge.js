Ext.define('erp.view.purchaseUrge.model.PurchaseUrge', {
	extend: 'Ext.data.Model',
	//idProperty: 'cgh',
	fields: [
		{ name: 'cfbj', type: 'int' ,header:'拆分',columnWidth:50,isSign:true,summaryRenderer : function(value, summaryData,dataIndex) {
				return '合计';
		}},
		{ name: 'gxbj', type: 'int' ,header:'更新',columnWidth:50,isSign:true},
		{ name: 'csmc' ,header:'供应厂商',columnWidth:160},
		{ name: 'wkjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'采计交期',columnWidth:85},		
		{ name: 'jhrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'交货日期',columnWidth:85},
		{ name: 'htbh', /*type: 'int' ,*/header:'合同编号',columnWidth:80},
		{ name: 'htxh', /*type: 'int' ,*/header:'序号',columnWidth:40},
		{ name: 'cllbmc' ,header:'材料类别',columnWidth:80},
		{ name: 'clhh' ,header:'材料货号',columnWidth:80},
		{ name: 'clmc' ,header:'材料名称',columnWidth:160},
		{ name: 'cltx1' ,header:'规格尺寸',columnWidth:80},		
		{ name: 'jldw' ,header:'单位',columnWidth:50},
		{ name: 'cgsl', type: 'float',header:'采购数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'dhrk', type: 'float',header:'到货入库',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('dhrk');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'rksl', type: 'float',header:'入库数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('rksl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'cgww', type: 'float',header:'采购未完',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgww');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'bzsm' ,header:'备注说明',columnWidth:120},
		{ name: 'jhlbmc' ,header:'计划类别',columnWidth:80},
		{ name: 'jhbz' ,header:'生产单号',columnWidth:90},
		{ name: 'khjc',header:'客户简称',columnWidth:120},
		{ name: 'cpmc',header:'产品名称',columnWidth:160},
		{ name: 'cgrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'应采购日期',columnWidth:85},
		{ name: 'cgrq_top', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'采购日期',columnWidth:85},
		{ name: 'qfsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'采计签发日期',columnWidth:85},
		{ name: 'dysj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'打印时间',columnWidth:85},
		{ name: 'cgdj', type: 'float',header:'采购单价',columnWidth:80},
		{ name: 'cgje', type: 'float',header:'采购金额',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgje');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		},renderer:Ext.util.Format.floatRendererOne},
		{ name: 'cgwwje', type: 'float',header:'未完金额',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgwwje');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		},renderer:Ext.util.Format.floatRendererOne},
		{ name: 'jhh',header:'计划号',columnWidth:80},
		{ name: 'cgh',header:'采购号',columnWidth:90},
		{ name: 'cgyxm' ,header:'采购员名',columnWidth:80},		
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'操作时间',columnWidth:85},		
		{ name: 'cglx' ,header:'合同类型',columnWidth:80},
		{ name: 'zzbj', type: 'int' ,header:'中止',columnWidth:50,isSign:true},
		{ name: 'qdbj', type: 'int' ,header:'确定',columnWidth:50,isSign:true},
		{ name: 'qfbj', type: 'int' ,header:'签发',columnWidth:50,isSign:true},
		{ name: 'jqsdbj', type: 'int' ,header:'交期锁定',columnWidth:80,isSign:true,convert:function(v,rec){
			return rec.get('sdbj');
		}},
		{ name: 'ghzq', type: 'int' ,header:'供货周期',columnWidth:70},		
		{ name: 'lyxz' ,header:'来源性质',columnWidth:80},								
		{ name: 'dlgg' ,header:'短料规格',columnWidth:80},
		{ name: 'kjlx', type: 'int' ,header:'控制类型',columnWidth:80,renderer:function(v){
			return v==0?'主控价':'辅控价'
		}},
		{ name: 'zzhxs', type: 'float',header:'主转换系数',columnWidth:80 },
		
		{ name: 'djsl', type: 'float',header:'待检数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('djsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},				
		{ name: 'sdbj', type: 'int' ,header:'锁定',columnWidth:40,isSign:true},
		{ name: 'drsl', type: 'float',header:'待入数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('drsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'dtsl', type: 'float',header:'待退数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('dtsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'sxrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'上线日期',columnWidth:85},
		{ name: 'yqjh', type: 'float',header:'追催数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('yqjh');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'zxwksj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'物控时间',columnWidth:85},
		{ name: 'zxwkrm',header:'物控人',columnWidth:80},
		{ name: 'zxqrsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'确认时间',columnWidth:85},
		{ name: 'zxqrrm',header:'确认人',columnWidth:80},
		{ name: 'hqjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'回签交期',columnWidth:85},
		
		{ name: 'cjjhrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'采计交期',columnWidth:85,hidden:true},
		{ name: 'gxsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'更新时间',columnWidth:85},
		{ name: 'rkrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'入库日期',columnWidth:85},				
		{ name: 'qrjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'确认交期',columnWidth:85},
		{ name: 'hsbmmc',header:'核算部门',columnWidth:80},
		{ name: 'sdckmc',header:'送达仓库',columnWidth:90},
		{ name: 'mjh',header:'模具号',columnWidth:80},
		{ name: 'zczy',header:'追催摘要',columnWidth:80},
		{ name: 'zzlx',header:'中止类型',columnWidth:80},
		{ name: 'zzyx',header:'中止原因',columnWidth:80},		
		{ name: 'czym',header:'操作员名',columnWidth:80},
		{ name: 'qdrm' ,header:'确定人名',columnWidth:80},
		{ name: 'qdsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'确定时间',columnWidth:85},
		{ name: 'jhlb' ,hidden:true},
		{ name: 'jhbh', type: 'int' ,hidden:true},
		{ name: 'jhxh', type: 'int' ,hidden:true},
		{ name: 'kzdj', type: 'float' ,hidden:true},
		{ name: 'wcbj', type: 'int' ,hidden:true},
		{ name: 'cltx2' ,hidden:true},
		{ name: 'cltx3' ,hidden:true},
		{ name: 'sdck' ,hidden:true},
		{ name: 'fzdw' ,header:'单位',columnWidth:40},
		{ name: 'fzsl', type: 'float' ,header:'入库数量（辅助）',columnWidth:100,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('fzsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'hsbm' ,hidden:true},
		{ name: 'zhsl', type: 'float' ,header:'采购支数',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('zhsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'cgym' ,hidden:true},
		{ name: 'csbh' ,hidden:true},
		{ name: 'cgbz' ,hidden:true},
		{ name: 'gdbj', type: 'int' ,hidden:true},
		{ name: 'lbbh' ,hidden:true},
		{ name: 'clth' ,hidden:true},
		{ name: 'fzzbj', type: 'int' ,hidden:true},
		{ name: 'plmth' ,hidden:true},
		{ name: 'plmtx' ,hidden:true},
		{ name: 'dgyl', type: 'float' ,hidden:true},
		{ name: 'rkzs', type: 'float' ,header:'入库支数',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('rkzs');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'wdzs', type: 'float' ,header:'未到支数',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('wdzs');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'khbh' ,hidden:true},
		{ name: 'khmc' ,hidden:true},
		{ name: 'cpbh' ,hidden:true},
		{ name: 'jq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,hidden:true},
		{ name: 'bj', type: 'int' ,hidden:true},
		{ name: 'jlsl', type: 'int' ,hidden:true},
		{ name: 'lsbj', type: 'int' ,hidden:true},
		{ name: 'wkww', type: 'int' ,hidden:true},
		{ name: 'wkwwyz', type: 'int' ,hidden:true},
		{ name: 'hfjl' ,hidden:true}
	]
});
