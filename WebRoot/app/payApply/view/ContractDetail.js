Ext.define('erp.payApply.view.ContractDetail',{
  extend:'erp.ux.Panel',
  alias:'widget.contract_detail',
  layout : { type : 'border' },
  title : '合同明细',
  closable : true,
  initComponent : function(){
   var me = this;
   me.store = Ext.create('erp.payApply.store.ContractDetail');
   me.store.load({params:{'htbh':me.htbh}});
   Ext.apply(me,{
     dockedItems : [{
      xtype: 'toolbar',
      itemId : 'ContractDetailBar',
      dock: 'top',
      items: [{
        text : '退出',
		iconCls : 'page_error',
		itemId : 'btn_out',
		handler : function() { me.close(); }
      }]
     }],
     items : [{
      region : 'center',
      xtype : 'grid',
      overflowY : 'auto',
	  overflowX : 'auto',
      itemId : 'ContractDetailGrid',
      store : me.store,
      columns : [{
        header : '合同号',
        dataIndex : 'hth',
        width : '100'
       },{
        header : '材料货号',
        dataIndex : 'clhh',
        width : '100'
       },{
        header : '材料货号',
        dataIndex : 'plmth',
        width : '100',
        hidden : true
       },{
        header : '事物特性',
        dataIndex : 'plmtx',
        width : '100',
        hidden : true
       },{
        header : '材料图号',
        dataIndex : 'clth',
        width : '100',
        hidden : true
       },{
        header : '材料名称',
        dataIndex : 'clmc',
        width : '200'
       },{
        header : '规格尺寸',
        dataIndex : 'cltx1',
        width : '60'
       },{
        header : '材料特性2',
        dataIndex : 'cltx2',
        width : '60',
        hidden : true
       },{
        header : '材料特性3',
        dataIndex : 'cltx3',
        width : '60',
        hidden : true
       },{
        header : ' 单位',
        dataIndex : 'jldw',
        width : '40'
       },{
        header : '控价类型',
        dataIndex : 'kjlx',
        width : '60'
       },{
        header : ' 采购数量',
        dataIndex : 'cgsl',
        width : '60'
       },{
        header : '辅助单位',
        dataIndex : 'fzdw',
        width : '60'
       },{
        header : '辅助数量',
        dataIndex : 'fzsl',
        width : '80'
       },{
        header : '采购单价',
        dataIndex : 'cgdj',
        width : '80'
       },{
        header : '采购金额',
        dataIndex : 'cgje',
        width : '80'
       },{
        header : '汇率',
        dataIndex : 'wbhl',
        width : '60'
       },{
        header : '币种',
        dataIndex : 'wbbh',
        width : '60',
        hidden : true
       },{
        header : '币种',
        dataIndex : 'wbdh',
        width : '60'
       },{
        header : '外币单价',
        dataIndex : 'wbdj',
        width : '80'
       },{
        header : '外币金额',
        dataIndex : 'wbje',
        width : '80'
       },{
        header : '计划号',
        dataIndex : 'jhh',
        width : '100'
       },{
        header : '生产单号',
        dataIndex : 'jhbz',
        width : '100'
       },{
        header : '供应厂商',
        dataIndex : 'csmc',
        width : '200'
       },{
        header : '供应厂商(编号)',
        dataIndex : 'csbh',
        width : '100',
        hidden: true
       }]
     }]
   });
   me.callParent(arguments);
  }
});