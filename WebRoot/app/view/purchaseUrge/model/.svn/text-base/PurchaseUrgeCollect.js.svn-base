Ext.define('erp.view.purchaseUrge.model.PurchaseUrgeCollect', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'htbh', type: 'int' ,header:'合同编号',columnWidth:80},
		{ name: 'htxh', type: 'int' ,header:'序号',columnWidth:40},
		{ name: 'csmc' ,header:'供应厂商',columnWidth:160},
		{ name: 'clhh' ,header:'材料货号',columnWidth:80},
		{ name: 'clmc' ,header:'材料名称',columnWidth:160},
		{ name: 'cltx1' ,header:'规格尺寸',columnWidth:80},
		{ name: 'jldw' ,header:'单位',columnWidth:40},
		{ name: 'cgsl', type: 'float',header:'采购数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'fzdw' ,header:'辅助单位',columnWidth:80},
		{ name: 'fzsl', type: 'float' ,header:'入库数量（辅助）',columnWidth:100,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('rksl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'rkww', type: 'float',header:'入库未完',columnWidth:80/*,allow_summary:true,summaryFomat:'0,000.000'*/},
		{ name: 'dhrk', type: 'float',header:'到货/入库',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('dhrk');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'cgww', type: 'float',header:'采购未完',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgww');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'rksl', type: 'float',header:'入库数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('rksl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'djsl', type: 'float',header:'入库数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('djsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
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
		{ name: 'cgyxm' ,header:'采购员名',columnWidth:80},
		{ name: 'cgrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'采购日期',columnWidth:85},
		{ name: 'sdckmc',header:'送达仓库',columnWidth:90},
		{ name: 'qrjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'确认交期',columnWidth:85},
		{ name: 'zczy',header:'追催摘要',columnWidth:80},
		{ name: 'bzsm' ,header:'备注说明',columnWidth:120},
		{ name: 'dysj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'打印时间',columnWidth:85},
		
		{ name: 'cltx2',hidden:true },
		{ name: 'cltx3',hidden:true },
		{ name: 'zczy',hidden:true },
		{ name: 'csbh',hidden:true },
		{ name: 'cgbz',hidden:true },
		{ name: 'gdbj', type: 'int',hidden:true },
		{ name: 'cgym',hidden:true },
		{ name: 'sdck',hidden:true },
		{ name: 'lbbh',hidden:true },
		{ name: 'clth',hidden:true },
		{ name: 'fzzbj', type: 'int',hidden:true },
		{ name: 'plmth',hidden:true },
		{ name: 'plmtx',hidden:true }
	]
});
