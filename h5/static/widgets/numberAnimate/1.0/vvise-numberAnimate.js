(function($) {
    $.fn.numberAnimate = function(setting) {
        var defaults = {
            speed : 1000,//动画速度
            num : "", //初始化值
            iniAnimate : true, //是否要初始化动画效果
            symbol : '',//默认的分割符号，千，万，千万
            dot : 0,//保留几位小数点
            id : "", //数字对象
            padding: 0, //padding距离
            width: 10, //padding距离
        }
        //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting);

        //如果对象有多个，提示出错
        if($(this).length > 1){
            alert("just only one obj!");
            return;
        }

        //如果未设置初始化值。提示出错
        if(setting.num == ''){
            //alert("must set a num!");
            //return;
        }
        var nHtml = '<span class="mt-number-animate-dom" style="width:'+ setting.width +'px" data-num="{{num}}">\
									<i class="mt-number-animate-span">0</i>\
									<i class="mt-number-animate-span">1</i>\
									<i class="mt-number-animate-span">2</i>\
									<i class="mt-number-animate-span">3</i>\
									<i class="mt-number-animate-span">4</i>\
									<i class="mt-number-animate-span">5</i>\
									<i class="mt-number-animate-span">6</i>\
									<i class="mt-number-animate-span">7</i>\
									<i class="mt-number-animate-span">8</i>\
									<i class="mt-number-animate-span">9</i>\
									<i class="mt-number-animate-span">.</i>\
								  </span>';

        //数字处理
        var numToArr = function(num){
            num = parseFloat(num).toFixed(setting.dot);
            if(typeof(num) == 'number'){
                var arrStr = num.toString().split("");
            }else{
                var arrStr = num.split("");
            }
            //console.log(arrStr);
            return arrStr;
        }

        //设置DOM symbol:分割符号
        var setNumDom = function(arrStr){
            var _height = $('#'+setting.id).height()-setting.padding*2;
            var shtml = '<span class="mt-number-animate" style="height:'+ _height +'px;line-height:'+ _height +'px;top: '+ setting.padding +'px;">';
            for(var i=0,len=arrStr.length; i<len; i++){
                if(i != 0 && (len-i)%3 == 0 && setting.symbol != "" && arrStr[i]!="."){
                    shtml += '<span class="mt-number-animate-dot" style="width:'+ setting.width +'px">'+setting.symbol+'</span>'+nHtml.replace("{{num}}",arrStr[i]);
                }else{
                    shtml += nHtml.replace("{{num}}",arrStr[i]);
                }
            }
            shtml += '</span>';
            return shtml;
        }

        //执行动画
        var runAnimate = function($parent){
            $parent.find(".mt-number-animate-dom").each(function() {
                var num = $(this).attr("data-num");
                num = (num=="."?10:num);
                var spanHei = $(this).height()/11; //11为元素个数
                var thisTop = -num*spanHei;
                if(thisTop != 0){
                    thisTop += "px"
                }
                if(thisTop != $(this).css("top")){
                    if(setting.iniAnimate){
                        //HTML5不支持
                        if(!window.applicationCache){
                            $(this).animate({
                                top : thisTop
                            }, setting.speed);
                        }else{
                            $(this).css({
                                'transform':'translateY('+thisTop+')',
                                '-ms-transform':'translateY('+thisTop+')',   /* IE 9 */
                                '-moz-transform':'translateY('+thisTop+')',  /* Firefox */
                                '-webkit-transform':'translateY('+thisTop+')', /* Safari 和 Chrome */
                                '-o-transform':'translateY('+thisTop+')',
                                '-ms-transition':setting.speed/1000+'s',
                                '-moz-transition':setting.speed/1000+'s',
                                '-webkit-transition':setting.speed/1000+'s',
                                '-o-transition':setting.speed/1000+'s',
                                'transition':setting.speed/1000+'s'
                            });
                        }
                    }else{
                        setting.iniAnimate = true;
                        $(this).css({
                            top : thisTop
                        });
                    }
                }
            });
        }

        //初始化
        var init = function($parent){
            //初始化
            $parent.html(setNumDom(numToArr(setting.num)));
            $parent.attr('nums', setting.num);
            runAnimate($parent);
        };

        //重置参数
        this.resetData = function(num){
            var newArr = numToArr(num);
            var $dom = $(this).find(".mt-number-animate-dom");
            if($dom.length < newArr.length){
                $(this).html(setNumDom(numToArr(num)));
            }else{
                $dom.each(function(index, el) {
                    $(this).attr("data-num",newArr[index]);
                });
            }
            $(this).attr('nums', num);
            runAnimate($(this));
        }
        //init
        init($(this));
        return this;
    }
})(jQuery);