Ext.define("overrides.Text",{override:"Ext.form.field.Text",requires:["erp.ux.Clear"],constructor:function(a){var b=this;if(a.allowBlank==false&&!Ext.isEmpty(a.fieldLabel)){a.fieldLabel+="<font color='red'>*</font>"}b.callParent(arguments)},applyTriggers:function(b){if(b&&b.picker){var a=b.picker;delete b.picker;b.picker=a}return this.callParent(arguments)}});