Ext.define('erp.common.form.view.ChartTypePortlet', {
	alias : 'widget.chartTypePortlet',
	extend : 'erp.ux.Panel',
	layout:'fit',
	initComponent : function() {
		var me = this;
	  //numeric_fields=me.numeric_fields;
	  //non_numeric_fields=me.non_numeric_fields;
	  //store=me.store
		me.items = [me.chartPanel = Ext.widget('panel', {
			            	  itemId: 'Chart_type_portlet',
			            	  layout: 'fit'
			              })];
		me.callParent(arguments);
	},
	setChartTypeWindow:function(nv){
		var me = this;
		if(nv=='areaChart'){//区域图
			me.setAreaChart();
		}else if(nv=='barChart'){//条形图
			me.setBarChart();
		}else if(nv=='columnChart'){//柱线图
			me.setCoulumnChart();
		}else if(nv=='lineChart'){//线图
			me.setLineChart();
		}else if(nv=='mixedChart'){//混合系列图
			me.setMixedChart();
		}else if(nv=='pieChart'){//饼图
			me.setPieChart();
		}else if(nv=='radarChart'){//雷达图
			me.setRadarChart();
		}else if(nv=='scatterChart'){//散布图
			me.setScatterChart();
		}else {//仪表板图
			me.setGaugeChart();
		}
	},
	setAreaChart:function(){//区域图
		var me=this;
		var areaChart=Ext.create('Ext.chart.Chart',{
            style: 'background:#fff',
            animate: true,
            store: me.store,
            legend: {
                position: 'bottom'
            },
            axes: [{
                type: 'Numeric',
                grid: true,
                position: 'left',
                fields: me.numeric_fields[0],
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 1
                    }
                },
                minimum: 0,
                adjustMinimumByMajorUnit: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: me.non_numeric_fields,
                title: me.name,
                grid: true,
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'area',
                highlight: false,
                axis: 'left',
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0],
                style: {
                    opacity: 0.93
                }
            }]   
		});
		me.chartPanel.removeAll();
		me.chartPanel.add(areaChart);
	},
	setBarChart:function(){//条形图
		var me=this;
		var barChart=Ext.create('Ext.chart.Chart',{
            animate: true,
            shadow: true,
            store: me.store,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: me.numeric_fields[0],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: me.non_numeric_fields,
                title: me.name
            }],
            background: {
              gradient: {
                id: 'backgroundGradient',
                angle: 45,
                stops: {
                  0: {
                    color: '#ffffff'
                  },
                  100: {
                    color: '#eaf1f8'
                  }
                }
              }
            },
            series: [{
                type: 'bar',
                axis: 'bottom',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get(me.non_numeric_fields) + ': ' + storeItem.get(me.numeric_fields) + ' views');
                  }
                },
                label: {
                  display: 'insideEnd',
                    field: me.numeric_fields[0],
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333',
                  'text-anchor': 'middle'
                },
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0]
            }]});
            me.chartPanel.removeAll();
            me.chartPanel.add(barChart);
	},
	setCoulumnChart:function(){//柱线图
		var me=this;
		var columnChart=Ext.create('Ext.chart.Chart',{
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: me.store,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: me.numeric_fields[0],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'data',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: me.non_numeric_fields,
                title: me.name
            }],
            series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get(me.non_numeric_fields) + ': ' + storeItem.get(me.numeric_fields));
                  }
                },
                label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: me.numeric_fields,
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#333'
                },
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0]
            }]
		});
		me.chartPanel.removeAll();
		me.chartPanel.add(columnChart);
	},
	setLineChart:function(){//线图
		var me=this;
		var lineChart=Ext.create('Ext.chart.Chart',{
            style: 'background:#fff',
            animate: true,
            store: me.store,
            shadow: true,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: me.numeric_fields[0],
                title: 'data',
                minorTickSteps: 1,
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 0.5
                    }
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: me.non_numeric_fields,
                title: 'name'
            }],
            series: [{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0],
                markerConfig: {
                    type: 'cross',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0],
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }, {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                fill: true,
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0],
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }]
		});
		me.chartPanel.removeAll();
		me.chartPanel.add(lineChart);
	},
	setMixedChart:function(){//混合图
		var me=this;
		var mixedChart=Ext.create('Ext.chart.Chart',{
            style: 'background:#fff',
            animate: true,
            store: me.store,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: me.numeric_fields,
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: me.non_numeric_fields,
                title: me.name
            }],
            series: [{
                type: 'column',
                axis: 'left',
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0],
                markerConfig: {
                    type: 'cross',
                    size: 3
                }
            }, {
                type: 'scatter',
                axis: 'left',
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0],
                markerConfig: {
                    type: 'circle',
                    size: 5
                }
            }, {
                type: 'line',
                axis: 'left',
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0]
            }]});
		me.chartPanel.removeAll();
		me.chartPanel.add(mixedChart);
	},
	setPieChart:function(){//饼图
		var me=this;
		var donut = false;
		var pieChart=Ext.create('Ext.chart.Chart',{
            animate: true,
            store: me.store,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            series: [{
                type: 'pie',
                field: me.numeric_fields[0],
                showInLegend: true,
                donut: donut,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
                    me.store.each(function(rec) {
                        total += rec.get(me.numeric_fields[0]);
                    });
                    this.setTitle(storeItem.get(me.non_numeric_fields) + ': ' + Math.round(storeItem.get(me.numeric_fields[0]) / total * 100) + '%');
                  }
                },
                highlight: {
                  segment: {
                    margin: 20
                  }
                },
                label: {
                    field: me.non_numeric_fields,
                    display: 'rotate',
                    contrast: true,
                    font: '5px Arial'
                }
            }]
		});
		me.chartPanel.removeAll();
		me.chartPanel.add(pieChart);
	},
	setRadarChart:function(){//雷达图 
		var me=this;
		var radarChart=Ext.create('Ext.chart.Chart',{
            style: 'background:#fff',
            animate: true,
            store: me.store,
            insetPadding: 20,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Radial',
                position: 'radial',
                label: {
                    display: true
                }
            }],
            series: [{
                type: 'radar',
                xField: me.non_numeric_fields,
                yField: me.numeric_fields[0],
                showInLegend: true,
                showMarkers: true,
                markerConfig: {
                    radius: 5,
                    size: 5
                },
                style: {
                    'stroke-width': 2,
                    fill: 'none'
                }
            }]});
		me.chartPanel.removeAll();
		me.chartPanel.add(radarChart);
	},
	setScatterChart:function(){//散布图
		var me=this;
		var scatterChart=Ext.create('Ext.chart.Chart',{
		   style: 'background:#fff',
            animate: true,
            store: me.store,
            axes: false,
            insetPadding: 50,
            series: [{
                type: 'scatter',
                axis: false,
                xField: me.numeric_fields[0],
                yField: me.numeric_fields[1],
                color: '#ccc',
                markerConfig: {
                    type: 'circle',
                    radius: 20,
                    size: 20
                }
            }]
		});
		me.chartPanel.removeAll();
		me.chartPanel.add(scatterChart);
	},
	setGaugeChart:function(){//仪表板图
		var me=this;
		var gaugeChart=Ext.create('Ext.chart.Chart',{
            style: 'background:#fff',
            animate: {
                easing: 'elasticIn',
                duration: 1000
            },
            store: me.store,
            insetPadding: 25,
            flex: 1,
            axes: [{
                type: 'gauge',
                position: 'gauge',
                minimum: 0,
                maximum: 100,
                steps: 10,
                margin: -10
            }],
            series: [{
                type: 'gauge',
                field: me.numeric_fields[0],
                donut: false,
                colorSet: ['#F49D10', '#ddd']
            }]});
         me.chartPanel.removeAll();
         me.chartPanel.add(gaugeChart);
	}
});