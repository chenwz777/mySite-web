(function($){
	var vviseCopy = {
		init: function($copys, path) {
			var $this = this;
			if(typeof path != 'undefined'){
				path = path + '/';
			}else{
				path = vvPageConst.jsServer + '/';
			}
			if(typeof $copys == 'undefined'){
				console.error('please init copy with jquery object!');
				return;
			}
			if(!$this.hasJsOrCss('clipboard.min.js', 'js')){
				$('body').append('<script type="text/javascript" src="'+ path +'widgets/clipboard/1.0/clipboard.min.js"><\/script>');
			}
		    $this.initEvent($copys);
		},
		initEvent: function(copys) {
			var $this = this;
			for (var i=0; i<copys.length; i++) {
				var $copy = $(copys[i]);
				$copy.on('mouseover', function(){
					if($('.vvise-copy-btn').length == 0){
						var $inCopy = $(this);
						var val = $inCopy.text();
						$btn = $('<div class="vvise-copy-btn" style="display: none;position: fixed;z-index: 9999999;" ><span id="vvise_copy_btn" data-clipboard-text="'+ val +'" style="font-size: 13px;padding: 4px 10px;border: 1px solid #ccc;background-color: rgb(238,238,238);color: #444;cursor: pointer;" >点击复制</span></div>').appendTo($('body'));
						$btn.css('left',$inCopy.offset().left);
						$btn.css('top',$inCopy.offset().top+$inCopy.height()+5);
						$btn.css('display', 'inline-block');
						var btn = document.getElementById('vvise_copy_btn');
						var clipboard = new Clipboard(btn);
						clipboard.on('success', function(e) {
					        btn.innerHTML = '复制成功';
					        btn.style.color = 'green';
					        $btn.removeClass('c-current');
							$this.removeBtn();
					        return false;
					    });
					    clipboard.on('error', function(e) {
					       btn.innerHTML = '复制失败';
					       btn.style.color = 'red';
					       $btn.removeClass('c-current');
					       $this.removeBtn();
					       return false;
					    });
					    $btn.children('span').on('mouseover', function(){
					    	$(this).css('background-color', '#fbfbfb');
					    });
					    $btn.on('mouseover', function(){
					    	$btn.addClass('c-current');
					    });
					    $btn.on('mouseout', function(){
					    	$btn.removeClass('c-current');
					    	$this.removeBtn();
						});
					}
				});
				$copy.on('mouseout', function(){
					$this.removeBtn();
				});
			}
		},
		hasJsOrCss: function(filename, filetype) {
			var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"
			var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"
			var allsuspects=document.getElementsByTagName(targetelement)
			for (var i=allsuspects.length; i>=0; i--){
				if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
				   return true;
			}
			return false;
		},
		removeBtn: function() {
			setTimeout(function(){
				if(!$('.vvise-copy-btn').hasClass('c-current')){
					$('.vvise-copy-btn').remove();
				}
			}, 150);
		}
		
	}
	$.fn.extend({
		'vviseCopy': function(path) {
			vviseCopy.init(this, path);
		}
	});
})(jQuery)