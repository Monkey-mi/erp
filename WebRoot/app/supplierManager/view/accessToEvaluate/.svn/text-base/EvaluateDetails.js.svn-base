/*13项评估审核信息页面*/
Ext.define('erp.supplierManager.view.accessToEvaluate.EvaluateDetails',{
	extend:'Ext.tab.Panel',
	requires:['erp.supplierManager.view.accessToEvaluate.ScoreCollectInfo'
			,'erp.supplierManager.view.accessToEvaluate.evaluateDetails.EvaluateDetailsOne'],
	alias:'widget.access_EvaluateDetails',
	listeners:{
			  'afterrender':function( cmp , eOpts ){
			  	var rec = cmp.up('window').supplierRec;
			  	cmp.loadRec(rec,cmp.tab);
			  },
			  'beforerender':function( cmp , eOpts ){
			  		var result=erp.Const.callServiceMethodSync('accessEvalute/accessEvalute.act?method=getAccessEvaluteOptionActive',{
				 	});
				 	cmp.tab = new Array();
				 	cmp.tab[0] = {
				 		title:'分数汇总',
			    		xtype:'access_ScoreCollectInfo',
			    		itemId:'access_ScoreCollectInfo'
				 	};
				 	for(var i=0;i<result.length;i++){
				 		var itemId_name = '';
				 		switch (i) {
				 			case  0 : itemId_name='evaluateDetailsOne';
				 			break;
				 			case  1 : itemId_name='evaluateDetailsTwo';
				 			break;
				 			case  2 : itemId_name='evaluateDetailsThree';
				 			break;
				 			case  3 : itemId_name='evaluateDetailsFour';
				 			break;
				 			case  4 : itemId_name='evaluateDetailsFive';
				 			break;
				 			case  5 : itemId_name='evaluateDetailsSix';
				 			break;
				 			case  6 : itemId_name='evaluateDetailsSeven';
				 			break;
				 			case  7 : itemId_name='evaluateDetailsEight';
				 			break;
				 			case  8 : itemId_name='evaluateDetailsNine';
				 			break;
				 			case  9 : itemId_name='evaluateDetailsTen';
				 			break;
				 			case  10 : itemId_name='evaluateDetailsEleven';
				 			break;
				 			case  11 : itemId_name='evaluateDetailsTwelven';
				 			break;
				 			case  12 : itemId_name='evaluateDetailsThirteen';
				 			break;
				 		}
				 		cmp.tab[i+1] = {
				 			title:result[i].item_name,
							itemId:itemId_name,
							item_fid:i+1,
							weightValue:result[i].weightValue,
							fitem_name:result[i].item_name,
							xtype:'access_EvaluateDetailsOne'
				 		};
				 	}
				 	cmp.add(cmp.tab);
			  }
		    },
	initComponent:function(){
		var  me=this;
		Ext.apply(me,{
			defaults:{padding:2}
			
    	/*items:[
    	{
    		title:'分数汇总',
    		xtype:'access_ScoreCollectInfo',
    		itemId:'access_ScoreCollectInfo'
    	},{
    		//
				title:'经营状况与管理策略',
				itemId:'evaluateDetailsOne',
				item_fid:1,
				weightValue:1,
				fitem_name:'经营状况与管理策略',
				xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'持续改进',
			itemId:'evaluateDetailsTwo',
    		item_fid:2,
    		weightValue:2,
			fitem_name:'持续改进',
			xtype:'access_EvaluateDetailsOne'
    	}
    	,{
    		//
				title:'生产过程区域',
				itemId:'evaluateDetailsThree',
    			item_fid:3,
    			weightValue:1,
				fitem_name:'生产过程区域',
				xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'采购和供应商开发',
    		itemId:'evaluateDetailsFour',
    		item_fid:4,
    		weightValue:1.2,
			fitem_name:'采购和供应商开发',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'原材料、成品储存和仓务管理',
    		itemId:'evaluateDetailsFive',
    		item_fid:5,
    		weightValue:1,
			fitem_name:'原材料、成品储存和仓务管理',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'设备保养',
    		itemId:'evaluateDetailsSix',
    		item_fid:6,
    		weightValue:1.5,
			fitem_name:'设备保养',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'技术和工艺工程',
    		itemId:'evaluateDetailsSeven',
    		item_fid:7,
    		weightValue:2,
			fitem_name:'技术和工艺工程',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'产品文件',
    		itemId:'evaluateDetailsEight',
    		item_fid:8,
    		weightValue:2,
			fitem_name:'产品文件',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'研发 ',
    		itemId:'evaluateDetailsNine',
    		item_fid:9,
    		weightValue:1.5,
			fitem_name:'研发',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'不合格管理',
    		itemId:'evaluateDetailsTen',
    		item_fid:10,
    		weightValue:1,
			fitem_name:'不合格管理',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'生产质量和追溯',
    		itemId:'evaluateDetailsEleven',
    		item_fid:11,
    		weightValue:2,
			fitem_name:'生产质量和追溯',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'质量控制设备和过程控制',
    		itemId:'evaluateDetailsTwelven',
    		item_fid:12,
    		weightValue:2,
			fitem_name:'质量控制设备和过程控制',
			xtype:'access_EvaluateDetailsOne'
    	},{
    		
    		title:'文件记录保存',
    		itemId:'evaluateDetailsThirteen',
    		item_fid:13,
    		weightValue:1,
			fitem_name:'文件记录保存',
			xtype:'access_EvaluateDetailsOne'
    	}]*/
		});
		this.callParent(arguments);},
		loadRec:function(rec,arr){
		var me=this;
		var companyid=rec.get('company_id');		
		if(companyid!=null&&companyid>0)
		{
			//动态加载评估分数汇总数据
			me.down('#access_ScoreCollectInfo').loadScoreSummaryData(companyid);
			for(var i=1;i<arr.length;i++){
				var id = '#'+arr[i].itemId;
				me.down(id).loadScoreDetailsData(companyid);
			}			
		}
		}
		/*loadDetail:function(companyid){
			me.down('#evaluateDetailsOne').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsTwo').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsThree').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsFour').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsFive').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsSix').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsSeven').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsEight').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsNine').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsTen').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsEleven').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsTwelven').loadScoreDetailsData(companyid);
			me.down('#evaluateDetailsThirteen').loadScoreDetailsData(companyid);
		}*/
});