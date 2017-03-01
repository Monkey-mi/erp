/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('erp.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'erp.view.main.MainController',
        'erp.view.main.MainModel'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Tab 1',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        },{
			title: 'Summary Test',
			style: 'padding: 20px',
			xtype:'grid',
			renderTo: document.body,
			features: [{
				ftype: 'summary'
			}],
			store: {
				model: Ext.define('TestResult', {
					extend: 'Ext.data.Model',
					fields: ['student', {
						name: 'mark',
						type: 'int'
					}]
				}),
				data: [{
					student: 'Student 1',
					mark: 84
				},{
					student: 'Student 2',
					mark: 72
				},{
					student: 'Student 3',
					mark: 96
				},{
					student: 'Student 4',
					mark: 68
				}]
			},
			columns: [{
				dataIndex: 'student',
				text: 'Name',
				summaryType: 'count',
				summaryRenderer: function(value, summaryData, dataIndex) {
					return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : '');
				}
			}, {
				dataIndex: 'mark',
				text: 'Mark',
				summaryType: 'average'
			}]
		}]
    }]
});
