Ext.define('erp.supplierAccess.view.SupplierChangeShow',{
	extend:'erp.ux.Window',
	alias:'widget.SupplierChangeShow',
	title:'变更详情',
	modal:true,
	width:800,
	requires:[
		
	],
	height:800,
	frame:true,
	initComponent : function() {
		var me=this;
		var form=Ext.create('Ext.form.Panel',{
			frame:true,
			autoScroll:true,
			defaults : {
				labelWidth:70,
				padding:5,
				xtype : 'textfield',
				anchor:'95%',
				readOnly:true
			},
			layout : {
				type : 'column',
				align : 'stretch'
			},
			items:[{
	            fieldLabel : '企业名称',
	            itemId:'cpyname_cn',
	            name:'cpyname_cn',
	            columnWidth: 0.5
	        },{
	            fieldLabel : '企业类型',
	            itemId:'nature_name',
	            name:'nature_name',
	            columnWidth: 0.5
	        },
	        
	        {
	            fieldLabel : '经营模式',
	            itemId:'industry_name',
	            name:'industry_name',
	            columnWidth: 0.5
	        }, {
				name : 'class_name',
				itemId : 'class_name',
				fieldLabel : '所属行业',
				columnWidth: 0.5
			},
			
			{
				fieldLabel : '主营业务',
				itemId : 'key_remark',
				name : 'key_remark',
				columnWidth: 0.5
			}, {
				name : 'corporation',
				itemId : 'corporation',
				fieldLabel : '法人代表',
				columnWidth: 0.5
			},
			
			{
				name : 'currency_name',
				itemId : 'currency_name',
				fieldLabel : '注册币种',
				columnWidth: 0.5
			},{
				name : 'reg_fund',
				itemId : 'reg_fund',
				fieldLabel : '注册资本',
				columnWidth: 0.5
			},
			
			{
				name : 'establish_dt',
				itemId : 'establish_dt',
				fieldLabel : '成立日期',
				columnWidth: 0.5,
				xtype:'datefield',
				format: 'Y.m.d'
			}, {
				name : 'contact_addr',
				itemId : 'contact_addr',
				fieldLabel : '联系地址',
				columnWidth: 0.5
			}, 
			
			{
				name : 'f_phone',
				itemId : 'f_phone',
				fieldLabel : '固定电话',
				columnWidth: 0.5
			}, 
			{
				xtype:'textarea',
				name : 'company_introduction',
				itemId : 'company_introduction',
				fieldLabel : '企业简介',
				columnWidth: 1
			},{
				xtype : 'fieldset',
				title: '公司证照',
				collapsible: true,
				columnWidth: 1,
				defaults : {
					labelWidth:70,
					padding:5,
					xtype : 'textfield',
					anchor:'95%',
					height: 250
				},
				layout : {
					type : 'column',
					align : 'stretch'
				},
				items:[{
					xtype : 'panel',
					title:'营业执照',
					titleAlign:'center',
					items:[{
						xtype:'image',
						itemId:'PIC1',
						border:true,
						width:'100%',
						height:'100%',
						src:'',
						style:"position:absolute;left:0;top:0;"
					}],
					columnWidth:.5
				},{
					xtype : 'panel',
					title:'税务登记证',
					titleAlign:'center',
					items:[{
						xtype:'image',
						itemId:'PIC2',
						width:'100%',
						height:'100%',
						border:true,
						src:'',
						style:"position:absolute;left:0;top:0;"
					}],
					columnWidth:.5
				},{
					xtype : 'panel',
					title:'组织结构代码证',
					titleAlign:'center',
					items:[{
						xtype:'image',
						itemId:'PIC3',
						border:true,
						width:'100%',
						height:'100%',
						src:'',
						style:"position:absolute;left:0;top:0;"
					}],
					columnWidth:.5
				},{
					xtype : 'panel',
					title:'纳税人资格证书',
					titleAlign:'center',
					items:[{
						xtype:'image',
						itemId:'PIC4',
						border:true,
						width:'100%',
						height:'100%',
						src:'',
						style:"position:absolute;left:0;top:0;"
					}],
					columnWidth:.5
				}]
			}]
		});
		Ext.apply(me,{
			layout:'fit',
			items:[form]
		});
		this.callParent(arguments);
		var rec=me.supplierRec;
		form.loadRecord(rec);
		//给图片赋值
		var src1='supplierAccess/downloadFromMongdbAttched.srm?file_path='+rec.get('bus_license')+'&isimg=true';
   		me.down('#PIC1').setSrc(src1);
   		var src2='supplierAccess/downloadFromMongdbAttched.srm?file_path='+rec.get('tax_certificate')+'&isimg=true';
   		me.down('#PIC2').setSrc(src2);
   		var src3='supplierAccess/downloadFromMongdbAttched.srm?file_path='+rec.get('org_code')+'&isimg=true';
   		me.down('#PIC3').setSrc(src3);
   		var src4='supplierAccess/downloadFromMongdbAttched.srm?file_path='+rec.get('rat_certificate')+'&isimg=true';
   		me.down('#PIC4').setSrc(src4);
	}
})