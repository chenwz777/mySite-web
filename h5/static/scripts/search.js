/**
 * Created by lin_jianduan on 2017/10/26.
 */
var searchFormEvent = {
    init: function () {
        $('.condition-item').children().each(function () {
            var _this = $(this);
            $(this).focus(function() {
                _this.parents('.condition-item').siblings().removeClass('current');
                _this.parents('.condition-item').addClass('current');
            });

            $(this).blur(function() {
                _this.parents('.condition-item').removeClass('current');
            });
        });
    },
    initFrameHeight: function(){
        this.setFrameHeight();
        $(window).resize(function(){
            searchFormEvent.setFrameHeight();
        });
    },
    setFrameHeight: function(){
        var win_height  = $(window).height();
        var func_line_h = $('.search-group').outerHeight(true);
        var list_height = win_height - func_line_h;
        $('.listFrame').css('height',list_height-5);
    }
}

$(function() {
    searchFormEvent.init();
})