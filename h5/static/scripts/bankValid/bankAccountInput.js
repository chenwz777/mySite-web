	/**
	 * 校验银行卡号信息
	 */
	(function($){ 
		
		$.fn.bankInput = function(options){ 
			var defaults = { 
				min : 10, 
				max : 38, 
				deimiter : ' ',
				onlyNumber : true, 
				copy : true 
			}; 
			var opts = $.extend({}, defaults, options); 
			var obj = $(this); 
			obj.css({imeMode:'Disabled',borderWidth:'1px',color:'#5c84a8',fontFamly:'Times New Roman'}).attr('maxlength', opts.max); 
			if(obj.val() != '') obj.val( obj.val().replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1"+opts.deimiter) ); 
			  obj.bind('keyup',function(event){ 
			  if(opts.onlyNumber){ 
			     if(!(event.keyCode>=48 && event.keyCode<=57)){ 
			      this.value=this.value.replace(/\D/g,''); 
			   } 
			  } 
			    this.value = this.value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1"+opts.deimiter); 
			}).bind('dragenter',function(){ 
			return false; 
			}).bind('onpaste',function(){ 
			return !clipboardData.getData('text').match(/\D/); 
			}).bind('blur',function(){ 
			this.value = this.value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1"+opts.deimiter); 
			if(this.value.length < opts.min){ 
			} 
			}) 
		} 
		
		$.fn.bankList = function(options){ 
		var defaults = { 
		    deimiter : ' ' 
		}; 
		var opts = $.extend({}, defaults, options); 
		return this.each(function(){ 
		    $(this).text($(this).text().replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1"+opts.deimiter)); 
		}) 
		} 
	})(jQuery); 