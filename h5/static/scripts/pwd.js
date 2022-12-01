function getRandPwd(pwd){
	var newPwd = "";
	if("" != pwd){
		var chars = ['0','1','2','3','4','5','6','7','8','9',
						'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
						'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
						'-','#','=','+','_','#'];
		
		newPwd = getRandStr(chars, 4);
		for(var i=0; i< pwd.length;i++){
			newPwd += pwd.charAt(i) + getRandStr(chars, (i+1));;
		}
	}
	
	return newPwd;
}

function getRandStr(chars, len){
	var res = "";
    for(var i = 0; i < len ; i++) {
        var id = Math.ceil(Math.random() * (chars.length - 1));
        res += chars[id];
    }
    
    return res;
}

/**
 * 校验密码格式
 * @param {} str
 */
function validPwdFormat(pwd){
	//校验是否为空
	if('' == pwd)
		return false;
	//校验是否为初始密码
	if('111111' == pwd || '123456' == pwd)
		return false;
    //校验长度
	if(pwd.length < 4){
		return false;	
	}
	
	//校验密码是否都一致
	var flag = false;
	var str = pwd.charAt(0);
	for(var i=0; i< pwd.length;i++){
		s = pwd.charAt(i);
		if(str != s){
			flag = true;
			break;
		}
	}
	
	if(!flag)
		return false;
	
	if("0123456789".indexOf(pwd) > -1){
        return false;
    }
    
	if("9876543210".indexOf(pwd) > -1){
        return false;
    }
	
    return true;
}