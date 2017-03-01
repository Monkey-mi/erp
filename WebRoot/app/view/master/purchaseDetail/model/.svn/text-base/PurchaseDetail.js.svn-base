Ext.define('erp.view.master.purchaseDetail.model.PurchaseDetail', {
	extend: 'Ext.data.Model',
	idProperty: 'cgh',
	fields: [
		{ name: 'hyhm' ,header:'生产单号',columnWidth:80,summaryRenderer : function(value, summaryData,dataIndex) {
				return '合计';
			},allow_summaryOne:true
		},
		{ name: 'khjc' ,header:'客户简称',columnWidth:140},
		{ name: 'cpmc' ,header:'产品名称',columnWidth:160},
		{ name: 'clhh' ,header:'材料货号',columnWidth:60},
		{ name: 'clmc' ,header:'材料名称',columnWidth:240},
		{ name: 'cltx1' ,header:'规格尺寸',columnWidth:120},
		{ name: 'jldw' ,header:'单位',columnWidth:35},
		{ name: 'cgsl', type: 'float' ,header:'采计数量',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'jhrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'交货日期',columnWidth:85 },
		{ name: 'csmc' ,header:'供应厂商',columnWidth:160},
		{ name: 'zzbj', type: 'int' ,header:'中止',columnWidth:35,isSign:true},
		{ name: 'spbj', type: 'int' ,header:'分配',columnWidth:35,isSign:true},
		{ name: 'qfbj', type: 'int' ,header:'签发',columnWidth:35,isSign:true},
		{ name: 'scbj', type: 'int' ,header:'首次',columnWidth:35,isSign:true},
		{ name: 'jhlbmc' ,header:'计划类别',columnWidth:65},
		{ name: 'cllbmc' ,header:'材料类别',columnWidth:65},
		{ name: 'clmjlbmc' ,header:'材料末级类别',columnWidth:85},
		{ name: 'cltx2' ,hidden:true},
		{ name: 'cltx3' ,hidden:true},
		{ name: 'bzsm' ,header:'备注说明',columnWidth:160},
		{ name: 'htsl', type: 'float' ,header:'合同/外协',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('htsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'cjwz', type: 'float' ,header:'采计未转',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cjwz');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'cgyxm' ,header:'采购员名',columnWidth:60},
		{ name: 'cgym' ,header:'采购员编号',hidden:true,columnWidth:85},
		{ name: 'qfsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'签发日期',columnWidth:70},
		{ name: 'spsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'分配时间',columnWidth:70},
		{ name: 'cgzm',header:'采购组',columnWidth:60},
		{ name: 'cgdj', type: 'float',header:'采购单价',columnWidth:80 },
		{ name: 'kzdj', type: 'float',header:'控制单价',columnWidth:80},
		{ name: 'sprm' ,header:'分配人',columnWidth:85},
		{ name: 'zzrm' ,header:'中止人',columnWidth:85},
		{ name: 'zzsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'中止时间',columnWidth:70 },
		{ name: 'czym' ,header:'操作员',columnWidth:60},
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'操作时间',columnWidth:70},
		{ name: 'wcbj', type: 'int' ,header:'完成',columnWidth:35,isSign:true},
		{ name: 'yzbj', type: 'int' ,header:'已转',columnWidth:35,isSign:true},
		{ name: 'wxbj', type: 'int' ,header:'外箱',columnWidth:35,isSign:true},
		{ name: 'ddxh', type: 'int' ,header:'序号',columnWidth:35},
		{ name: 'ywbj', type: 'int' ,header:'有误',columnWidth:35,isSign:true},
		{ name: 'zcpmc' ,header:'主产品名称',columnWidth:85},
		{ name: 'cgh' ,header:'采计号',columnWidth:70},
		{ name: 'ddbh', type: 'int',header:'订单号',columnWidth:60 },
		{ name: 'dhrk', type: 'float',header:'到货/入库',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('dhrk');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'cjww', type: 'float',header:'采计未完',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cjww');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'rksl', type: 'float',header:'入库数量',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('rksl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		} },
		{ name: 'rkww', type: 'float',header:'入库未完',columnWidth:80,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('rkww');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		} },
		{ name: 'ghzq', type: 'float',header:'供货周期',columnWidth:85 },
		{ name: 'wkjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'物控交期',columnWidth:70 },
		{ name: 'cgrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'应采购日期',columnWidth:70 },
		{ name: 'sxrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'上线日期',columnWidth:70 },
		{ name: 'sdck' ,hidden:true},
		{ name:'ckmc',header:'送达仓库',columnWidth:90},
		{ name: 'cgtqq', type: 'float' ,header:'采购提前期',columnWidth:85},
		{ name: 'cgje', type: 'float' ,header:'采购金额',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgje');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'wbdh' ,header:'币种',columnWidth:45},
		{ name: 'fzdw' ,header:'辅助单位',columnWidth:60},
		{ name: 'fzsl', type: 'float' ,header:'辅助数量',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('fzsl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'fzwz', type: 'float' ,header:'辅助未转',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('fzwz');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'dlgs', type: 'int' ,header:'短料根数',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('dlgs');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'yzdl', type: 'int' ,header:'-已转短料',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('yzdl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'wzdl', type: 'int' ,header:'=未转短料',columnWidth:85,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('wzdl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'jhh' ,header:'计划号',columnWidth:85},
		{ name: 'sqh' ,header:'申请号',columnWidth:85},
		{ name: 'zzyx' ,header:'中止原因',columnWidth:85},
		{ name: 'ywzy' ,header:'有误摘要',columnWidth:85},
		{ name: 'ysgg' ,header:'原始规格尺寸',columnWidth:100},
		{ name: 'qfrm' ,header:'签发人',columnWidth:85},
		
		{ name: 'cgbh', type: 'int',header:'启用',columnWidth:45,hidden:true},
		{ name: 'cgxh', type: 'int' ,hidden:true},
		{ name: 'wbbh' ,hidden:true},
		{ name: 'xgsl', type: 'float' ,hidden:true},
		{ name: 'ylbl', type: 'float' ,hidden:true},
		{ name: 'htsl1', type: 'float' ,hidden:true},
		{ name: 'jhbh', type: 'int' ,hidden:true},
		{ name: 'jhxh', type: 'int' ,hidden:true},
		{ name: 'csbh' ,hidden:true},
		{ name: 'cgzh' ,hidden:true},
		{ name: 'wxsl', type: 'float' ,hidden:true},
		{ name: 'wxdh', type: 'int' ,hidden:true},
		{ name: 'wxxh', type: 'int' ,hidden:true},
		{ name: 'tzxh', type: 'int' ,hidden:true},
		{ name: 'wxwz', type: 'float' ,hidden:true},
		{ name: 'jhlb' ,hidden:true},
		{ name: 'jhbz' ,hidden:true},
		{ name: 'lbbh' ,hidden:true},
		{ name: 'clth' ,hidden:true},
		{ name: 'xcrq', type: 'int' ,hidden:true},
		{ name: 'hsbm' ,hidden:true},
		{ name: 'cpbh' ,hidden:true},
		{ name: 'ddh' ,hidden:true},
		{ name: 'khbh' ,hidden:true},
		{ name: 'khmc' ,hidden:true},
		{ name: 'gzbj', type: 'int' ,hidden:true},
		{ name: 'xzbj', type: 'int' ,hidden:true},
		{ name: 'zcpbh' ,hidden:true},
		{ name: 'sqbh', type: 'int' ,hidden:true},
		{ name: 'sqxh', type: 'int' ,hidden:true},
		{ name: 'htcg', type: 'int' ,hidden:true},
		{ name: 'htqf', type: 'int' ,hidden:true},
		{ name: 'clmjlb',hidden:true}
	]
});
