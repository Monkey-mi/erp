/**
 * 自动消失的提示框
 */
Ext.define('erp.editor.util.Msg', {
	
	msgCt:null,
	createBox: function (t, s){
//        return [
//        		'<div class="msg">',
//                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
//                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
//                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
//                '</div>'
//                ].join('');
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    },
	msg : function(title, format){
		var me = this;
            if(Ext.isEmpty(me.msgCt)){
                me.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(me.msgCt, me.createBox(title, s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 1000, remove: true});
        },
    
    /**
     * 单行输入框
     * @param config
     */
    prompt : function(config){
    	var me = this;
    	config = config || {};
        if(!me.msgCt){
            me.msgCt = Ext.DomHelper.insertFirst(Ext.getBody(), {id:'gymsg-div'}, true);
        }
        
        var m = Ext.DomHelper.append(me.msgCt, '<div class="gymsg"/>', true);
        
        if(config.title){
        	Ext.DomHelper.append(m, '<h3>' + config.title + '</h3>', true);
        }
        var input = Ext.DomHelper.append(m, '<input class="gyinput" value="' + config.text + '"/>', true);
        //设置回调函数       
        me.userCallback = Ext.Function.bind(config.callback || config.fn || Ext.emptyFn, config.scope || Ext.global);
        
        m.hide();
        if(config.XY){
        	m.setXY(config.XY);
        }
        //按回车后退出
        var nav = new Ext.util.KeyNav(input, {            
            'enter' : function(e){
            	me.userCallback(input.dom.value);
            	m.ghost(config.anchor || 'b', { delay: config.delay || 0, remove: true});        	
            }
        });
        //失去焦点后退出
        input.on('blur', function(){
        	me.userCallback(input.dom.value);
        	m.ghost(config.anchor || 'b', { delay: config.delay || 0, remove: true});        	
        });
        //设置是否立即出现
        if(config.slideIn){
        	m.slideIn(config.anchor || 'b');
        }else{
        	m.show();
        	input.dom.focus();
        }
    }
}, 
	/**
	 * 设置为单例模式
	 */
function() {
	Ext.TpsMsg = new this();
});