/**
 * triton theme tree 显示 iconCls的时候不对，这个进行了修改，以后要更正了，这个可以删掉
 */
Ext.define('overrides.tree.Column', {
    override :'Ext.tree.Column',
    
    constructor: function() {
        var me = this;
        me.callParent(arguments);
    },
    
    cellTpl: [
        '<tpl for="lines">',
            '<div class="{parent.childCls} {parent.elbowCls}-img ',
            '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>" role="presentation"></div>',
        '</tpl>',
        '<div class="{childCls} {elbowCls}-img {elbowCls}',
            '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>" role="presentation"></div>',
        '<tpl if="checked !== null">',
            '<div role="button" {ariaCellCheckboxAttr}',
                ' class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"></div>',
        '</tpl>',
        '<tpl if="icon"><img src="{blankUrl}"<tpl else><div</tpl>',
            ' role="presentation" class="{childCls} {baseIconCls} {customIconCls} ',
            '{baseDefaultCls} {iconCls}" ',
            '<tpl if="icon">style="background-image:url({icon})"/><tpl else>></div></tpl>',
        '<tpl if="href">',
            '<a href="{href}" role="link" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
        '<tpl else>',
            '<span class="{textCls} {childCls}">{value}</span>',
        '</tpl>'
    ],
    
    initTemplateRendererData: function(value, metaData, record, rowIdx, colIdx, store, view) {
        var me = this,
            innerRenderer = me.innerRenderer,
            data = record.data,
            parent = record.parentNode,
            rootVisible = view.rootVisible,
            lines = [],
            parentData;
        
        while (parent && (rootVisible || parent.data.depth > 0)) {
            parentData = parent.data;
            lines[rootVisible ? parentData.depth : parentData.depth - 1] =
                    parentData.isLast ? 0 : 1;
            parent = parent.parentNode;
        }
        
        return {
            record: record,
            baseIconCls: me.iconCls,
            baseDefaultCls: Ext.isEmpty(data.iconCls)?(me.iconCls+'-'+(data.leaf?'leaf':data.expanded?'parent-expanded':'parent')):'',
            customIconCls: '',
            iconCls: data.iconCls,
            icon: data.icon,
            checkboxCls: me.checkboxCls,
            checked: data.checked,
            elbowCls: me.elbowCls,
            expanderCls: me.expanderCls,
            textCls: me.textCls,
            leaf: data.leaf,
            expandable: record.isExpandable(),
            expanded: data.expanded,
            isLast: record.isLastVisible(),
            blankUrl: Ext.BLANK_IMAGE_URL,
            href: data.href,
            hrefTarget: data.hrefTarget,
            lines: lines,
            metaData: metaData,
            childCls: me.getChildCls ? me.getChildCls() + ' ' : '',
            value: innerRenderer ? innerRenderer.apply(me.rendererScope, arguments) : value
        };
    }
});
