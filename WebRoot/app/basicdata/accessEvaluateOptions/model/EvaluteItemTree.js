Ext.define('erp.basicdata.accessEvaluateOptions.model.EvaluteItemTree', {
    extend: 'erp.basic.model.TreeModel',
    fields: [{
        name: 'task',
        type: 'string'
    }, {
        name: 'user',
        type: 'string'
    }, {
        name: 'duration',
        type: 'float'
    }, {
        name: 'done',
        type: 'boolean'
    }]
}); 