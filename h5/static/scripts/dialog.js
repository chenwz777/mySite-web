var waitImg = "waiting.gif";

initDialog(3);
function initDialog(endIndex){
	var idEnd;
	for(var i = 1;i <= endIndex;i++){
		idEnd = i;
		if(idEnd == 1)
			idEnd = "";
		document.writeln('<div id="winDiv'+idEnd+'" class="easyui-dialog" data-options="modal:true,closed:true" style="overflow:hidden;display:none;">');
		document.writeln("<div name='win_waiting"+idEnd+"' id='win_waiting"+idEnd+"' class='dialog-waiting'><img src=\""+ vvPageConst.ctx +"/static/images/frame/"+ waitImg +"\" align=\"absmiddle\"></div>");
		document.writeln('<iframe class="editFrame" name="winFrame'+idEnd+'" id="winFrame'+idEnd+'" frameBorder="0" scrolling="auto" style="width: 100%;height:100%;" allowtransparency="true"></iframe>');
		document.writeln('</div>');
	}
}
var width1 = 420;//弹出窗口，编辑页面有1列的情况
var width2 = 700;//弹出窗口，编辑页面有2列的情况
var width3 = 900;//弹出窗口，编辑页面有3列的情况
function openWindow(title,width,height,url,buttons,closeFunc,winName,beforeCloseFunc){
	var openFrame = "winFrame";
	var winWaiting = "win_waiting";
	if(isEmpty(winName)){
		winName = "winDiv";
	}else{
		var idx = winName.substr(winName.length - 1);
		openFrame = openFrame + idx;
		winWaiting = winWaiting + idx;
	}
	
	$("#"+winWaiting).css("display","block");
	$("#"+openFrame).attr("src",'');
	$("#"+winName).children().children().css("display","block");
	$('#'+winName).dialog({    
	    title: title,    
	    width: width,    
	    height: height,    
	    cache: false,    
	    //href: url,    
	    modal: true,
        shadow: false,
	    closed: true, //false，不用调用open方法也可直接打开弹出窗口
	    onClose:function(){
			try{
				$("#"+openFrame).attr("src",'');
				if(closeFunc){
					if(typeof(closeFunc) != "function")
						eval(closeFunc);
					else
						closeFunc();
				}
			}catch(e){};
		},
	    onBeforeClose:function(){
			try{
				if(beforeCloseFunc){
					var isClose = true;//是否关闭窗口
					if(typeof(beforeCloseFunc) != "function")
						isClose = eval(beforeCloseFunc);
					else
						isClose = beforeCloseFunc();
					
					if(typeof isClose != 'undefined' && !isClose){
						return false;
					}
				}
			}catch(e){};
		},
		onMove:function(left,top){
			var isMove = false;
			if(width > $(window).width() || height > $(window).height()){
				return;
			}
			if (left < 0){
				left = 0
				isMove = true;
			}
			if (top < 0){
				top = 0
				isMove = true;
			}
            var bodyWidth = $(document.body).width(); // $(window).width()
            var bodyHeight = $(document.body).height(); // $(window).height()

            if (left + width > bodyWidth) {
                left = bodyWidth - width;
                isMove = true;
            }
            if (top + height > bodyHeight) {
                top = bodyHeight - height;
                isMove = true;
            }
            if (isMove) {
                $('#' + winName).dialog('move', {
                    left: left,
                    top: top
                });
            }
		},
		buttons:buttons
	});
	$("#"+openFrame).attr("src",url);
	//$('#'+winName).dialog('refresh', url);
	$('#'+winName).dialog('center');
	$('#'+winName).dialog('open');
	$("#"+openFrame).load(function() { 
		$("#"+winWaiting).css("display","none");
	});
}

function changeButton(buttons,winName){
	if(typeof(winName) == 'undefined' || winName == null)
		winName = "winDiv";
	$("#"+winName).dialog({buttons: buttons});
}

function closeWindow(winName){
	if(typeof(winName) == 'undefined' || winName == null)
		winName = "winDiv";
	$('#'+winName).dialog('close');
}

/**
 *自定义点击图片预览
 */
function imageViewer($imgObj, idx, ifUpdate) {
	//$.fn.viewer.noConflict();
	/*定义属性
	$imgObj.viewer({
		url: 'data-original',
	});
	*/
	$imgObj = $($imgObj);
	if(typeof ifUpdate != 'undefined' && ifUpdate){
		$imgObj.viewer('update');
	}
	$imgObj.viewer('show');
	if(idx && idx > 0){
		setTimeout(function(){
			$imgObj.viewer('view', idx);
		}, 1000);
	}
}

/**
 *直接绑定图片预览
 */
function imageViewerBind($imgObj) {
	$imgObj = $($imgObj);
	$imgObj.viewer();
}