Ext.define('erp.view.purchaseOrder.model.PurchaseOrder', {
	extend: 'Ext.data.Model',
	idProperty: 'htbh',
	fields: [
		{ name: 'wcbj', type: 'int' ,header:'完成',columnWidth:35,isSign:true,summaryRenderer : function(value, summaryData,dataIndex) {
				return '合计';
		}},
		{ name: 'hqbj', type: 'int' ,header:'回签',columnWidth:35,isSign:true},
		{ name: 'dybj', type: 'int' ,header:'打印',columnWidth:35,isSign:true},
		{ name: 'qfbj', type: 'int' ,header:'签发',columnWidth:35,isSign:true},
		{ name: 'sdbj', type: 'int' ,header:'锁定',columnWidth:35,isSign:true},
		{ name: 'kzbj', type: 'int' ,header:'控制',columnWidth:35,isSign:true},
		{ name: 'yfbj', type: 'int' ,header:'预付',columnWidth:35,isSign:true},
		{ name: 'zlbj', type: 'int' ,header:'专利',columnWidth:35,isSign:true},
		{ name: 'cglbmc' ,header:'采购类别',columnWidth:70},
		{ name: 'xkxj', type: 'int' ,header:'结算方式',columnWidth:65,renderer:function(v){
			return v==1?'现款现结':'正常结算'
		}},		
		{ name: 'cgrq_top', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'采购日期',columnWidth:70 },
		{ name: 'qfsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'签发日期',columnWidth:70 },
		{ name: 'jhrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'交货日期',columnWidth:70  },
		{ name: 'czym',header:'操作员名',columnWidth:60},
		{ name: 'htbh', type: 'int',header:'合同编号',columnWidth:60,renderer : function(v,m){
			var rec=m.record;
			if(rec.get('xtbj')>0){
               m.css='x-grid-record-red'; 
			}
            return v; 
        }},
		{ name: 'ggzs', type: 'float',header:'更改',columnWidth:45  },
		{ name: 'csmc' ,header:'厂商名称',columnWidth:180},
		{ name: 'cslxr',header:'厂商联系人',columnWidth:160},
		{ name: 'zlcsmc',header:'专利厂商名称',columnWidth:180},
		{ name: 'hsbmmc',header:'核算部门',columnWidth:65},
		{ name: 'htzs', type: 'float',header:'采购总数',columnWidth:65,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('htzs');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'dhrk', type: 'float',header:'到货/入库',columnWidth:70,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('dhrk');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'rksl', type: 'float',header:'入库数量',columnWidth:65,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('rksl');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'cgww', type: 'float',header:'采购未完',columnWidth:65,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgww');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		}},
		{ name: 'cgwwje', type: 'float',header:'未完金额',columnWidth:65,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('cgwwje');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		},renderer:Ext.util.Format.floatRendererOne},
		{ name: 'htze', type: 'float',header:'本币总额',columnWidth:65,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('htze');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		},renderer:Ext.util.Format.floatRendererOne},
		{ name: 'wbdh',header:'外币',columnWidth:40},
		{ name: 'wbze', type: 'float',header:'外币总额',columnWidth:65,
				summaryRenderer : function(value, summaryData,dataIndex) {
					var v=this.up('panel').up('panel').DetailSum.get('wbze');
		            return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		},renderer:Ext.util.Format.floatRendererOne},	
		{ name: 'ztmc',header:'主体单位',columnWidth:160,renderer : function(v,m){
			var rec=m.record;
			if(v==null||v==''){
				return rec.get('ztdw');
			}else{
				return v;
			}; 
        }},
		{ name: 'cgbz',header:'备注说明',columnWidth:100},
		{ name: 'scdh',header:'生产单号',columnWidth:100},
		{ name: 'cgrq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'应采购日期',columnWidth:70},
		{ name: 'cgyxm',header:'采购员名',columnWidth:60 },
		{ name: 'ssbmmc',header:'所属部门',columnWidth:70},
		{ name: 'czsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'操作日期',columnWidth:70},
		{ name: 'sdrm',header:'锁定人',columnWidth:55 },
		{ name: 'sdsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'锁定时间',columnWidth:70},
		{ name: 'qfrm',header:'签发人',columnWidth:55 },
		{ name: 'hqsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'回签日期',columnWidth:70},
		{ name: 'kzrm',header:'控制人',columnWidth:55 },
		{ name: 'kzsj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'控制时间',columnWidth:70},
		{ name: 'dysj', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'打印时间',columnWidth:70},
		{ name: 'wbbh',hidden:true},
		{ name: 'csbh',hidden:true },
		{ name: 'gdbj', type: 'int',hidden:true },
		{ name: 'cgym' ,hidden:true},
		{ name: 'ztdw',hidden:true },
		{ name: 'hsbm' ,hidden:true},
		{ name: 'ssbm' ,hidden:true},
		{ name: 'httk' ,hidden:true},
		{ name: 'cgyq' ,hidden:true},
		{ name: 'http' ,hidden:true},
		{ name: 'cglb',hidden:true },
		{ name: 'qzgz' ,hidden:true},
		{ name: 'zlcsbh' ,hidden:true},
		{ name: 'zlwbmc',hidden:true },
		{ name: 'zlwbbh' ,hidden:true},
		{ name: 'cglx_fk', type: 'int' ,header:'采购类型',columnWidth:65,renderer:function(v){
			return v==1?'零星采购':'正常采购'
		}},
		{ name: 'cglx' ,header:'合同类型',columnWidth:65},
		{ name: 'htgz' ,header:'合同规则',columnWidth:65}
	]
});
