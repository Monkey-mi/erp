Ext.define('erp.view.purchaseOrder.model.OrderAttachmentBack',{
     extend: 'Ext.data.Model',
     fields : [
     {name : 'agreement_id',type: 'int'},
     {name : 'pur_order_id',type: 'int'},
     {name : 'agreement_bh'},
     {name : 'agreement_status',type: 'int'},
     {name : 'agreement_name',convert:function(v,rec){
         return v+rec.get('suffix_name');  
     }},
     {name : 'mogodb_id'},
     {name : 'create_dt',type: 'date'},
     {name : 'creator_id',type: 'int'},
     {name : 'creator_name'},
     {name : 'source_type',type: 'int'},
     {name : 'creator_name'},
     {name : 'suffix_name'}
     ]
})