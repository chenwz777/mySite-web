/**   
* 扩展两个方法   
*/
$.extend($.fn.datagrid.methods, {
    /** 
    * 开打提示功能   
    * @param {} jq   
    * @param {} params 提示消息框的样式   
    * @return {}   
    */
    doCellTip: function (jq, params) {
        function showTip(data, td, e) {
        	var _text = $(td).text();
            if (_text == "")
                return;
                
            $(td).attr("title", _text);
            /*
            data.tooltip.text($(td).text()).css({
                top: (e.pageY + 10) + 'px',
                left: (e.pageX + 20) + 'px',
                'z-index': $.fn.window.defaults.zIndex,
                display: 'block'
            });
            */
        };
        return jq.each(function () {
            var grid = $(this);
            var options = $(this).data('datagrid');
            if (!options.tooltip) {
                var panel = grid.datagrid('getPanel').panel('panel');
                var defaultCls = {
                    'border': '1px solid #333',
                    'padding': '1px',
                    'color': '#333',
                    'background': '#f7f5d1',
                    'position': 'absolute',
                    'max-width': '200px',
                    'border-radius': '4px',
                    '-moz-border-radius': '4px',
                    '-webkit-border-radius': '4px',
                    'display': 'none'
                }
                var tooltip = $("<div id='celltip'></div>").appendTo('body');
                tooltip.css($.extend({}, defaultCls, params.cls));
                options.tooltip = tooltip;
                panel.find('.datagrid-body').each(function () {
                    var delegateEle = $(this).find('> div.datagrid-body-inner').length
                            ? $(this).find('> div.datagrid-body-inner')[0]
                            : this;
                    $(delegateEle).undelegate('td', 'mouseover').undelegate(
                            'td', 'mouseout').undelegate('td', 'mousemove')
                            .delegate('td', {
                                'mouseover': function (e) {
                                	/*
                                    if (params.delay) {
                                        if (options.tipDelayTime)
                                            clearTimeout(options.tipDelayTime);
	                                        var that = this;
	                                        options.tipDelayTime = setTimeout(
                                                function () {
                                                    showTip(options, that, e);
                                                }, params.delay);
                                    } else {
                                        showTip(options, this, e);
                                    }
                                    */
                                    showTip(options, this, e);
                                },
                                'mouseout': function (e) {
                                	/*
                                    if (options.tipDelayTime)
                                        clearTimeout(options.tipDelayTime);
                                    options.tooltip.css({
                                        'display': 'none'
                                    });
                                    */
                                }
                                /*
                                ,
                                'mousemove': function (e) {
                                    var that = this;
                                    if (options.tipDelayTime) {
                                        clearTimeout(options.tipDelayTime);
                                        options.tipDelayTime = setTimeout(
                                                function () {
                                                    showTip(options, that, e);
                                                }, params.delay);
                                    } else {
                                        showTip(options, that, e);
                                    }
                                }
                                */
                            });
                });
                panel.find('.datagrid-footer').each(function () {
                    var delegateEle = $(this).find('> div.datagrid-footer-inner').length
                            ? $(this).find('> div.datagrid-footer-inner')[0]
                            : this;
                    $(delegateEle).undelegate('td', 'mouseover').undelegate(
                            'td', 'mouseout').undelegate('td', 'mousemove')
                            .delegate('td', {
                                'mouseover': function (e) {
                                	/*
                                    if (params.delay) {
                                        if (options.tipDelayTime)
                                            clearTimeout(options.tipDelayTime);
                                        var that = this;
                                        options.tipDelayTime = setTimeout(
                                                function () {
                                                    showTip(options, that, e);
                                                }, params.delay);
                                    } else {
                                        showTip(options, this, e);
                                    }
                                    */
									showTip(options, this, e);
                                },
                                'mouseout': function (e) {
                                	/*
                                    if (options.tipDelayTime)
                                        clearTimeout(options.tipDelayTime);
                                    options.tooltip.css({
                                        'display': 'none'
                                    });
                                    */
                                }
                                /*
                                ,
                                'mousemove': function (e) {
                                    var that = this;
                                    if (options.tipDelayTime) {
                                        clearTimeout(options.tipDelayTime);
                                        options.tipDelayTime = setTimeout(
                                                function () {
                                                    showTip(options, that, e);
                                                }, params.delay);
                                    } else {
                                        showTip(options, that, e);
                                    }
                                }
                                */
                            });
                });

            }

        });
    },
    /** 
    * 关闭消息提示功能   
    * @param {} jq   
    * @return {}   
    */
    cancelCellTip: function (jq) {
        return jq.each(function () {
            var data = $(this).data('datagrid');
            if (data.tooltip) {
                data.tooltip.remove();
                data.tooltip = null;
                var panel = $(this).datagrid('getPanel').panel('panel');
                panel.find('.datagrid-body').undelegate('td',
                                'mouseover').undelegate('td', 'mouseout')
                                .undelegate('td', 'mousemove')
            }
            if (data.tipDelayTime) {
                clearTimeout(data.tipDelayTime);
                data.tipDelayTime = null;
            }
        });
    },
    setColumnTitle: function(jq, option){  
		if(option.field){
			return jq.each(function(){  
				var $panel = $(this).datagrid("getPanel");
				var $field = $('td[field='+option.field+']',$panel);
				if($field.length){
					var $span = $("span",$field).eq(0);
					$span.html(option.text);
				}
			});
		}
		return jq;		
	}
});
//ajax读取数据
function getGridData(url,param){
	var defer = $.Deferred();
	$.ajax({
       url : url,    
       type : "POST", 
       headers: headers,      
       data: param,
       dataType:"json",
       success: function(data){
           defer.resolve(data)
       }
    }); 
    return defer.promise();
}

//加载数据
function loadPageData(id,url,param,flag){
    $("#"+id).datagrid("loading"); 
    $.when(getGridData(url,param)).done(function(data){
	   $('#'+id).datagrid('loadData',data);
	   if(flag == null || flag == '' || flag == 'undefined'){
	   		flag = '';
	   }
	   if(!flag){
	   	setFirstPage(id);
	   }
    });
}
  	
function loadAllData(id,url,param,flag){
    $('#'+id).datagrid("loading"); 
    $.when(getGridData(url,param)).done(function(data){
    	$('#'+id).datagrid({loadFilter:pagerFilter}).datagrid('loadData',eval('('+data+')'));
    	 if(flag == 'undefined'){
		   		flag = '';
		   }
    	if(!flag){
			setFirstPage(id);
		}
    });
}

function pagerFilter(data){
    if (typeof data.length == 'number' && typeof data.splice == 'function'){    // 判断数据是否是数组
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{
                pageNumber:pageNum,
                pageSize:pageSize
            });
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

function setBottomHtml(html){
 	$(html).insertBefore(".pagination-info");
}

function setFirstPage(id){
    var opts = $('#'+id).datagrid('options');
    var pager = $('#'+id).datagrid('getPager');
    opts.pageNumber = 1;
    opts.pageSize = opts.pageSize;
    pager.pagination('refresh',{
	    pageNumber:1,
	    pageSize:opts.pageSize
   	});
}

function mergeCells(arr, dg){  
    var rowCount = dg.datagrid("getRows").length;  
    var cellName;  
    var span;  
    var perValue = "";  
    var curValue = "";  
    var perCondition="";  
    var curCondition="";  
    var flag=true;  
    var condiName="";  
    var length = arr.length - 1;  
    for (i = length; i >= 0; i--) {  
        cellName = arr[i].mergeFiled;  
        condiName = arr[i].premiseFiled;  
        if(!isEmpty(condiName)){  
            flag = false;  
        }  
        perValue = "";  
        perCondition="";  
        span = 1;  
        for (row = 0; row <= rowCount; row++) {  
            if (row == rowCount) {  
                curValue = "";  
                curCondition="";  
            } else {  
                curValue = dg.datagrid("getRows")[row][cellName];  
                /* if(cellName=="ORGSTARTTIME"){//特殊处理这个时间字段 
                    curValue =formatDate(dg.datagrid("getRows")[row][cellName],""); 
                } */  
                if(!flag){  
                    curCondition=dg.datagrid("getRows")[row][condiName];  
                }  
            }  
            if (perValue == curValue&&(flag||perCondition==curCondition)) {  
                span += 1;  
            } else {  
                var index = row - span;  
                dg.datagrid('mergeCells', {  
                    index : index,  
                    field : cellName,  
                    rowspan : span,  
                    colspan : null  
                });  
                span = 1;  
                perValue = curValue;  
                if(!flag){  
                    perCondition=curCondition;  
                }  
            }  
        }  
    }  
}