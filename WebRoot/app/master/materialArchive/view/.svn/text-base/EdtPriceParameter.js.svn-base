Ext.define('erp.master.materialArchive.view.EdtPriceParameter',{
    extend : 'erp.ux.Window',
    alias : 'widget.EdtPriceParameter',
    requires:['erp.ux.SearchCombobox','erp.ux.SelectField',
    'erp.master.materialArchive.store.PriceParameter',
    'erp.master.prematerial.store.Companyname'],
    title: '价格参数编辑',
    modal : true,
    frame:true,
    width : 300,
    height: 210,
    initComponent: function(){
        var me = this;
        me.csStore=Ext.create('erp.view.master.caterialPrice.store.CaterialPriceArgument');
	    me.csColumns=erp.Util.getColumns(me.csStore.getModel());
   /*     me.argStore=Ext.create('erp.view.master.company.store.CompanyShow');
        me.argColumns=erp.Util.getColumns(me.argStore.getModel());*/
	    Ext.apply(me,{
             layout:{
               type : 'vbox',
               align : 'stretch'
           },
          defaults:{padding:5},	
          items : [{
             itemId : 'EdtForm',
             xtype : 'form',
             store : me.store,
             layout:{
				    type:'vbox',
				    align:'stretch'
			    },
             defaults: {
				anchor: '95%',
				labelWidth: 80,
				xtype: 'textfield',
				margin:'5 5 5 5'
			    },
			    items : [{
			       fieldLabel : '序号',
			       itmeId : 'jlxh',
			       name : 'jlxh',
			       readOnly : true
			      }/*,{
			       fieldLabel : '参数编号',
			       itemId : 'csbh',
			       name:'csbh'
			      }*/,{
			       fieldLabel : '参数名称',
			       itemId : 'csbh',
			       name : 'csbh',
			       xtype:'selectfield',
				   openconfig:{
					modal:true,
					title:'参数选取',
					singleSelect:true,
					editable:true,
					diaplayField:'csbh',
					valueField:'csbh',
					width:500,
					height:600,
					columns:me.csColumns,
					store:me.csStore
				}/*,
				listeners:{
				          'change' : function(){
				          	  var csbh = me.down('#csbh').getValue();
				              me.down('#csbh').setValue(csbh);
				          }
				       }*/
			    },{
			      fieldLabel : '参数值',
			      itemId : 'gscs',
			      name : 'gscs'
			    }/*,{
			      fieldLabel : '厂商编号',
			      itemId : 'gycs',
			      name : 'gycs'
			    }*/,{
			       fieldLabel : '厂商名称',
				   name:'gycs',
				   itemId:'gycs',
				   allowBlank:false,
		           blankText : '厂商名称不能为空',
				   emptyText:'(必填)',
		           xtype:'helpField',
		           code : erp.DataConst.FACTORYINFO,
				   fieldConfig:{forceSelection:true}
			    }],
			    buttons:[{text:'重置',glyph:0xf112,itemId:'btn_reset',
				handler:function(btn){	
						var form=me.down('form');
						form.form.reset();
						var rec=form.getRecord();
						form.updateRecord(rec);
       	  			}
			},
			'->',{text:'保存',iconCls:'page_save',itemId:'BTN_SAVE'
		/*	,handler:function(){
			   var form=me.down('#EdtForm');
	  		   var rec=form.getRecord();
	  		   if (!form.isValid()){  
                 Ext.Msg.alert('提示','输入不正确');  
                 return;
               }  
               form.updateRecord(rec);
               if(!me.isEdit){
                   rec.phantom=true;
	  			   me.store.add(rec);
	  			   me.store.sync({callback:function(){
	  			   me.store.load();
	  			}});
               }else{
                  me.store.sync({callback:function(){
	  				me.store.load();
	  			  }});
               }
               me.close();
			}*/},
			{text:'取消',iconCls:'page_error',handler:function(){
					me.close();
			}}]
          }]
        }) 
         me.callParent(arguments);
    }, 
    getData : function(){
           var me = this;
           var form = me.down('#EdtForm');
           return form.getValues();
        },
     loadData : function(rec){
		var me=this;
		var form=me.down('form');
		form.loadRecord(rec);
	}		    
})