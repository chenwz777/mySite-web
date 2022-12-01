//ajax读取数据
function getAjaxData(url,type,param,dataType){
	var defer = $.Deferred();
	$.ajax({
       url : url, 
       type : type,
       headers: headers,
       data: param,
       async: false,
       dataType: dataType,
       success: function(data){
           defer.resolve(data);
       },
	   error:function(data){
	   		defer.resolve(data);
	   }
    }); 
    return defer.promise();
}
function executeAjaxGet(url,param,fn,dataType){
	executeAjax(url,"GET",param,fn,dataType);
}
function executeAjaxPost(url,param,fn,dataType){
    executeAjax(url,"POST",param,fn,dataType);
}
//加载数据
function executeAjax(url,type,param,fn,dataType){
	if(dataType == null || typeof dataType == 'undefined')
		dataType = 'json';
		
    $.when(getAjaxData(url, type, param, dataType)).done(function(data){
	   	fn(data);
    });
}

// Ajax属性
var AjaxObj = function () {
    this.dataType = 'json';
    this.async = false;
    this.contentType = 'application/x-www-form-urlencoded';
    this.type = 'POST';
    this.url = '';
    this.data = '';
    this.charset = 'UTF-8';
    this.headers = headers;
    this.beforeSend = function () {
		
    };

    this.complete = function () {
		
    };
}

AjaxObj.prototype = {
    constructor:AjaxObj,
    execute : function (url, data, fn) {
    	this.url = url;
    	this.data = data;

        $.when(this.getData()).done(function(resData){
            fn(resData);
        });
    },
	getData : function () {
        var defer = $.Deferred();
        if (this.contentType.indexOf('charset') == -1) {
        	this.contentType = this.contentType + '; charset=' + this.charset;
		}

        $.ajax({
            url : this.url,
            type : this.type,
            headers: this.headers,
            data: this.data,
            async: this.async,
            dataType: this.dataType,
            contentType : this.contentType,
            beforeSend : this.beforeSend,
            complete : this.complete,
            success: function(resData){
                defer.resolve(resData);
            },
            error:function(resData){
                defer.resolve(resData);
            }
        });
        return defer.promise();
    }
}

var retMsg;

function ajaxCall(rurl,type, pars, sync){
	if(sync == null || typeof sync == 'undefined')
		sync = false;
		
	$.ajax({
	   type: type,
	   headers: headers,
	   url: rurl,
	   data: pars,
	   async: sync,
	   dataType:"json",
	   success: function(msg){
	      retMsg  = msg;
	   },
	   error:function(data){
	   		
	   }
	}); 
}

function executeAjaxBySync(url, type, pars){
	ajaxCall(url, type, pars, false);
	return retMsg;
}

function autocomplete(idName,urls,renderItemFun,selectFun,focusFun,minLength,autoFocus){
	if(minLength == undefined){
		minLength = 1;
	}
	if(autoFocus == undefined){
		autoFocus = false;
	}
	
	$("#"+idName).autocomplete({
		minLength: minLength,
		autoFocus: autoFocus,
		source: function(request, response) {
			executeAjax(urls, {likeName:request.term}, function(data) {
					if(data)
						response(data);
					else
						response("");
				});
		},
		focus: function( event, ui ) {
			//联想框触发焦点时触发
			try{
				if(focusFun){
					if(typeof(focusFun) != "function")
						eval(focusFun(event,ui));
					else
						focusFun(event,ui);
				}
			}catch(e){}
			return false;
		},
		select: function( event, ui ) {
			try{
				if(selectFun){
					if(typeof(selectFun) != "function")
						eval(selectFun(event,ui));
					else
						selectFun(event,ui);
				}
			}catch(e){}
			return false;
		}
	}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
		var itemHtml = "";
		if(renderItemFun){
			if(typeof(renderItemFun) != "function")
				itemHtml = eval(renderItemFun(ul, item));
			else
				itemHtml = renderItemFun(ul, item);
		}
		
		return $("<li>").append(itemHtml).appendTo(ul);
	};	
}

/**
 * 重置联想
 * @param idName id名称
 * @param urls 请求路径
 */
function resetAutocompleteUrl(idName, urls) {
    $("#" + idName).autocomplete("option", "source", function (request, response) {
        executeAjax(urls, {likeName: request.term}, function (data) {
            if (data)
                response(data);
            else
                response("");
        });
    })
}
