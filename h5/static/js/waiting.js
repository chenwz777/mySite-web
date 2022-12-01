function waiting_init() {
    document.write("<div name='div_waiting' id='div_waiting' style='position:absolute; display:none;" +
        "left:50%; top:50%; margin-left:-40px;margin-top:-10px; width:80px; height:20px; z-index:99999999;'>" +
        "<img id=\"div_waiting_img\" src=\"static/images/frame/waiting.gif\" align=\"absmiddle\"></div>");

}
waiting_init();
function waiting(gifName) {
    if (typeof gifName != 'undefined') {
        updateWaitGif(gifName);
    }
    //updateWaitGif('waiting.gif');
    document.getElementById("div_waiting").style.display = "";
}

function waiting_stop() {
    eval("div_waiting").style.display = "none";
    var mask = $('#waitMask');
    if (mask.length > 0) {
        mask.hide();
    }
}

function waiting_mask() {
    var mask = $('#waitMask');
    if (mask.length == 0) {
        $('body').append("<div name='waitMask' id='waitMask' style='position:absolute; display:none;background:#ccc;" +
            "left:0; top:0; width:100%; height:100%; z-index:99;filter:alpha(opacity=50);  -moz-opacity:0.5; opacity:0.5;'></div>");
    }
    mask = $('#waitMask');
    mask.show();
    waiting('waiting.gif');
}

function updateWaitGif(gifName) {
    $('#div_waiting_img').attr('src', vvPageConst.ctx + '/static/images/frame/' + gifName);
}