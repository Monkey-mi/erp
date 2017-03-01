/**
 * @author Yan.Wang
 * @date 2012.05.11 组织树和部门控件
 */
Ext.define('erp.setup.view.MngOrgDept', {
	extend: 'Ext.container.Container',
	alias: 'widget.mng_OrgDept',
	requires: ['erp.setup.store.OrgRelVersUpdated', 'erp.setup.store.DeptTreeNodes', 'erp.setup.store.OrgTreeNodes', 'erp.setup.model.OrgTreeNodeWithUnit', 'erp.ux.PagingBar', 'erp.util.Util'],
	border: false,
	layout: 'border',
	title: '组织选择',

	// 显示所有组织,指定showAllOrg=true,将能忽略授权显示整棵组织树
	showAllOrg: false,
	// 指定初始的组织id并以该组织节点为根显示所有下级组织,不指定则显示所有已授权组织,showAllOrg=true时将被忽略
	ou_id: null,
	// 指定初始组织代码并以该组织节点为根显示所有下级组织,不指定则显示所有已授权组织,showAllOrg=true时将被忽略
	ou_code: null,
	// 是否启用包含下级组织模式
	useIncSubOrg: false,
	// 是否包含下级组织
	incSubOrg: false,
	// 是否通过人员权限展示树形结构
	authEnable: true,
	// 是否启用部门显示
	deptEnable: true,
	// 是否显示项目列表
	prjEnable: false,
	// 呈现时是否选中默认组织或者当前组织，并触发ouChange事件(如果前面指定了ou_code,则会自动选中根组织)
	selectOrg: 'none', // 'default'|'current'|'none'
	// 默认是否全部展开(默认true,但是被expandDepth限制)
	expandAll: true,
	// expandAll=true时限定树形默认展开深度，对于特别大特别深的树怕影响性能,所以做点限制
	expandDepth: 3,

	// 部门显示的方位
	deptRegion: 'south',

	// 双击节点是否展开或收缩
	toggleOnDblClick: true,
	/**
	 * 是否启用checkbox
	 */
	checkEnabled: false,
	// checkEnabled启用下 是否选中根节点
	rootChecked: false,
	// 默认的组织树类型 人力树
	or_type: '0004',
	// 无权限的节点颜色
	difColor: 'grey',
	//组织树根节点的text
	ouTitle: '',

	defaults: {
		split: true
	},

	initComponent: function() {
		var me = this;

		// 类全局变量 不可修改
		me.orvStore = Ext.create('erp.setup.store.OrgRelVersUpdated');
		/*
		 * , { autoLoad: true, proxy: { type: 'ajax', actionMethods: 'post',
		 * url: 'main/Orgs.do?method=getOrgRelVerUpdatedList', reader: { type:
		 * 'json', root: 'data', messageProperty: 'message' } }
		 */
		// });
		me.addEvents('orvSelExpand', 'orvSelCollapse',
		/**
		 * 组织树选择变更时发生
		 */
		'orgChange',
		/**
		 * 组织单元选择变更时发生
		 * 
		 * @param scope
		 * @param ou_code
		 *            组织号
		 * @param ou_name
		 *            组织名称
		 * @param has_qry
		 * @param has_curd
		 * @param is_default
		 * @param record
		 *            组织记录
		 */
		'ouChange',
		/**
		 * 部门选择变更时发生
		 * 
		 * @param scope
		 * @param ou_code
		 *            组织号
		 * @param ou_name
		 *            组织名称
		 * @param d_code
		 *            部门号
		 * @param d_name
		 *            部门名称
		 * @param has_qry
		 * @param has_curd
		 * @param is_default
		 * @param ou_record
		 *            当前组织的记录
		 * @param d_record
		 *            部门记录
		 */
		'deptChange',
		/**
		 * 组织节点双击时发生
		 */
		'oudblclick',
		/**
		 * 部门节点双击时发生
		 */
		'deptdblclick');
		
		me.items = [me.deptTreePanel = Ext.widget('treepanel', {
			itemId: 'DeptTree',
			hidden: true,
			flex: 1,
			region: me.deptRegion ? me.deptRegion : 'south',
			viewConfig: {
				loadMask: false,
				toggleOnDblClick: me.toggleOnDblClick
			},
			store: me.deptTreeStore = Ext.create('erp.setup.store.DeptTreeNodes', {
				proxy: {
					type: 'ajax',
					actionMethods: 'post',
					url: 'main/Orgs.do?method=getDeptTreeNodeCacheByParent',
					reader: {
						type: 'json',
						root: 'data',
						messageProperty: 'message'
					}
				}
			}),
			rootVisible: true,
			allowDeselect: true,
			listeners: {
				load: function(store, node, records, suc) {
					if(node.get('id') == 0){
						if(records && records.length > 0){
							me.deptTreePanel.show();
						}else{
							me.deptTreePanel.hide();
						}
					}

					// 切换图标显示
					for( var i = 0; i < records.length; ++i){
						if(me.checkEnabled){
							records[i].set('checked', false);
							records[i].commit();
						}

						if(records[i].get('is_default')){
							records[i].set('iconCls', 'dept-tree-node-default');
							records[i].commit();
							continue;
						}
						if(records[i].get('has_curd')){
							records[i].set('iconCls', 'dept-tree-node-curd');
							records[i].commit();
							continue;
						}
						if(records[i].get('has_qry')){
							records[i].set('iconCls', 'dept-tree-node-query');
							records[i].commit();
							continue;
						}
					}
				},
				selectionchange: function(model, selected) {
					var ou_rec = me.orgTreePanel.getSelectionModel().getSelection()[0];
					var ou_code = null;
					var ou_name = null;
					if(ou_rec){
						ou_code = ou_rec.get('ou_code');
						ou_name = ou_rec.get('text');
					}
					if(selected && selected.length > 0 && selected[0].get('id') != 0){
						var rec = selected[0];
						me.currentD_id = rec.get('id');
						me.currentD_code = rec.get('d_code');
						me.currentD_name = rec.get('text');
						me.fireEvent('deptChange', me, ou_code, ou_name, me.currentD_code, me.currentD_name, rec.get('has_qry'), rec.get('has_curd'), rec.get('is_default'), ou_rec, rec);
					}else{
						me.currentD_id = null;
						me.currentD_code = null;
						me.currentD_name = null;
						me.fireEvent('deptChange', me, ou_code, ou_name, me.currentD_code, me.currentD_name, null, null, null, ou_rec, null);
					}
				},
				itemdblclick: function(view, rec, item, index, e) {
					me.fireEvent('deptdblclick', view, rec, item, index, e);
				}
			}
		}), me.orgTreePanel = Ext.widget('treepanel', {
			itemId: 'OrgTree',
			flex: 1,
			region: 'center',
			title: me.title || undefined,
			iconCls: me.iconCls || '',
			tools: me.useIncSubOrg ? [{
				xtype: 'checkbox',
				boxLabel: '包含下级组织',
				margins: {
					top: 0,
					right: 18,
					bottom: 0,
					left: 0
				},
				name: 'includeSubOrg',
				itemId: 'includeSubOrg',
				checked: me.incSubOrg,
				hidden: !me.useIncSubOrg,
				handler: function(cb, checked) {
					me.incSubOrg = checked;
					// 触发组织的selectionChange事件
					var sm = me.orgTreePanel.getSelectionModel();
					if(sm.hasSelection())
						me.orgTreePanel.fireEvent('selectionchange', sm, sm.getSelection());
				}
			}] : null,
			useArrows: true,
			viewConfig: {
				loadMask: false,
				// 这个是treeview私有变量未公开，该标识为true时，双击节点会自动展开。
				toggleOnDblClick: me.toggleOnDblClick
			},
			store: me.orgRelTreeStore = Ext.create('erp.setup.store.OrgTreeNodes', {
				model: 'erp.setup.model.OrgTreeNodeWithUnit',
				proxy: {
					type: 'ajax',
					actionMethods: 'post',
					// 使用新的方法取得用户的组织树模型
					url: 'main/Orgs.do?method=getOrTypeTreeCacheByParent',
					extraParams: {
						or_type: me.or_type
					},
					reader: {
						type: 'json',
						root: 'data',
						messageProperty: 'message'
					}
				}
			}),
			rootVisible: true,
			listeners: {
				load: function(store, node, records, suc) {
					for( var i = 0; i < records.length; ++i){
						if(me.expandAll && records[i].getDepth() < me.expandDepth){
							records[i].expand();
						}
						// 显示checkbox
						if(me.checkEnabled){
							records[i].set('checked', false);
						}

						if(records[i].get('is_default')){
							records[i].set('iconCls', 'org-tree-node-default');
							records[i].commit();
							continue;
						}
						if(records[i].get('has_curd')){
							records[i].set('iconCls', 'org-tree-node-curd');
							records[i].commit();
							continue;
						}
						if(records[i].get('has_qry')){
							records[i].set('iconCls', 'org-tree-node-query');
							records[i].commit();
							continue;
						}
					}
				},
				selectionchange: function(model, selected) {
					var rec = selected[0];
					me.currentD_id = null;
					me.currentD_code = null;
					me.currentD_name = null;
					if(Ext.isEmpty(rec) || rec.get('id') <= 0){
						me.deptTreePanel.hide();
						me.currentOd_id = null;
						me.currentOu_id = null;
						me.currentOu_code = null;
						me.currentOu_name = null;
						if(Ext.isEmpty(rec))
							rec = null;
						me.fireEvent('ouChange', me, null, null, null, null, null, rec);
						if(me.prjEnable){
							erp.Util.applyNull(me.prjGridStore.getProxy().extraParams, {
								usePaging: true,
								login_id: erp.Util.currentUser.loginId,
								ou_code: null,
								inc_suborg: me.incSubOrg,
								pj_name: null
							});
							me.prjGridStore.loadPage(1);
						}
						return;
					}
					/* ↓↓↓↓↓↓↓↓↓↓↓↓ */
					me.currentOd_id = rec.get('id');
					me.currentOu_id = rec.get('ou_id');
					me.currentOu_code = rec.get('ou_code');
					me.currentOu_name = rec.get('text');
					/* ↑↑↑↑↑↑↑↑↑↑ */
					if(me.deptEnable){
						Ext.apply(me.deptTreeStore.getProxy().extraParams, {
							ou_code: me.currentOu_code,
							// 是否全部显示标记
							show_allorg: me.showAllOrg
						});
						me.deptTreeStore.setRootNode({
							id: 0,
							text: rec.get('text') + '下属部门',
							leaf: false,
							expanded: true,
							iconCls: 'dept-tree-node-root'
						});
					}
					if(me.prjEnable){
						erp.Util.applyNull(me.prjGridStore.getProxy().extraParams, {
							usePaging: true,
							login_id: erp.Util.currentUser.loginId,
							ou_code: me.currentOu_code,
							inc_suborg: me.incSubOrg,
							pj_name: null
						});
						me.prjGridStore.loadPage(1);
					}
					me.fireEvent('ouChange', me, rec.get('ou_code'), rec.get('text'), rec.get('has_qry'), rec.get('has_curd'), rec.get('is_default'), rec);
				},
				itemdblclick: function(view, rec, item, index, e) {
					me.fireEvent('oudblclick', view, rec, item, index, e);
				}
			}
		})];
		me.callParent();
	},

	afterRender: function() {
		var me = this;
		me.or_type='0004';
		if(!me.showAllOrg && (me.ou_id || me.ou_code)){
			Ext.Ajax.request({
				url: 'main/OrgService.do?method=getOrTypeTreeCacheByOu',
				params: {
					or_type: me.or_type,
					ou_id: me.ou_id,
					ou_code: me.ou_code
				},
				success: function(response) {
					var obj = Ext.decode(response.responseText);
					if(obj && obj.data){
						var rec = Ext.create('erp.setup.model.OrgTreeNodeWithUnit', obj.data);
						if(rec.get('has_qry')){
							rec.set('iconCls', 'org-tree-node-query');
							rec.commit();
						}
						if(rec.get('has_curd')){
							rec.set('iconCls', 'org-tree-node-curd');
							rec.commit();
						}
						if(rec.get('is_default')){
							rec.set('iconCls', 'org-tree-node-default');
							rec.commit();
						}
						// 直接使用rec会在第一次发生一个异常原因不明
						var root = me.orgRelTreeStore.setRootNode(Ext.apply({
							checked: me.checkEnabled ? me.rootChecked : null
						}, rec.getData()));
						root.expand();
						if(me.selectOrg && me.selectOrg != 'none'){
							me.orgTreePanel.getSelectionModel().select(root);
						}
					}
				}
			});
		}else{
			me.setOrType(me.or_type);
		}
		me.callParent(arguments);
	},
	/**
	 * 切换组织树
	 */
	setOrType: function(or_type) {
		var me = this;
		var waitToSetRoot = function() {
			var rec = me.orvStore.findRecord('or_type', or_type, 0, false, false, true);
			if(rec){
				me.or_type = or_type;
				Ext.apply(me.orgRelTreeStore.proxy.extraParams, {
					or_type: me.or_type,
					show_allorg: me.showAllOrg
				});

				if(me.selectOrg && me.selectOrg != 'none'){
					var selectOu = me.selectOrg == 'current' ? erp.getCurrentOuCode() : erp.getDefaultOuCode();
					if(selectOu){
						var findSelectOu = function(scope, recs) {
							recs.eachChild(function(item) {
								if(item.get('ou_code') == selectOu){
									me.orgTreePanel.getSelectionModel().select(item);
									me.orgRelTreeStore.un('load', findSelectOu);
									return false;
								}
							});
						};
						me.orgRelTreeStore.on('load', findSelectOu);
					}
				}

				me.orgRelTreeStore.setRootNode({
					id: 0,
					text: me.ouTitle || rec.get('or_name') || rec.get('orv_name'),
					pv: true,
					po: true,
					leaf: false,
					expanded: true,
					iconCls: 'org-tree-node-root',
					checked: me.checkEnabled ? me.rootChecked : null
				});
			}
		};

		if(me.orvStore.count() <= 0){
			me.orvStore.load(waitToSetRoot);
		}else{
			waitToSetRoot();
		}
	},
	/**
	 * 获取组织代码
	 */
	getOuCode: function() {
		return this.currentOu_code;
	},
	/**
	 * 获取dept代码
	 */
	getDeptCode: function() {
		return this.currentD_code;
	},
	/**
	 * 获取选中的组织单元
	 */
	getCheckedOrg: function() {
		var me = this;
		return me.orgTreePanel.getView().getChecked();
	},

	searchPrj: function(pjName) {
		var me = this;
		erp.Util.applyNull(me.prjGridStore.getProxy().extraParams, {
			usePaging: true,
			login_id: tp.Util.currentUser.loginId,
			ou_code: me.currentOu_code,
			inc_suborg: me.incSubOrg,
			pj_name: pjName
		});
		me.prjGridStore.load();
	}
});

/*
 * 在调试里面测试用
 * 
 * 
 * Ext.widget('window', {layout:'fit',width:210,height:600,items:[
 * Ext.create('tp.setup.view.MngOrgDept', { title: '组织选择', ou_code: '',
 * deptEnable:false, prjEnable: true, useIncSubOrg:true, selectOrg:'current',
 * listeners:{ prjChange:function(cmp, ou_code, ou_name, pjCode, pjName,ou_rec,
 * rec){ Ext.log('ou_code='+ou_code+'pjName='+pjName); },
 * prjdblclick:function(view, rec, item, index, e){
 * Ext.log('pjName:'+rec.get('pj_name')); } } }) ]}).show()
 * 
 * 
 * 
 */
