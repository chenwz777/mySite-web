//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e){   
    var ev = e || window.event;//获取event对象   
    var obj = ev.target || ev.srcElement;//获取事件源   
    
    var t = obj.type || obj.getAttribute('type');//获取事件源类型  
    
    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    var vEnabled = obj.getAttribute('enabled');
    //处理null值情况
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;
    vEnabled = (vEnabled == null) ? true : vEnabled;
    
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea") 
                && (vReadOnly==true || vEnabled!=true))?true:false;
   
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")
                ?true:false;        
    
    //判断
    if(flag2){
        return false;
    }
    if(flag1){   
        return false;   
    }   
}

function trim(str){
	if(isEmpty(str))
		return "";
		
	return str.replace(/(^\s*)|(\s*$)/g, "");	
}

function toJson(jsonObj){
    return JSON.stringify(jsonObj);
}

function parseJson(jsonString){
	return JSON.parse(jsonString);
}

function isFloat(value){
	if(!(/^([-]){0,1}([0-9]){1,}([.]){0,1}([0-9]){0,}$/.test(value)))
		return false;

	return true;
}
/**
 * 只能输入数字
 */
function isNum(value){
	if(!(/^[\d]*$/.test(value)))
		return false;

	return true;
}

/*
 * 匹配座机号（不含分机号）
 */
function isTell(str){
	if('' != str){
		if(!(/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str)))
			return false;
	}
	
	return true;
}

/*
 * 匹配座机号（含分机号）
 */
function isTell2(str){
    if('' != str){
        if(!(/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/.test(str)))
            return false;
    }

    return true;
}

/**
 * 匹配手机号
 * @param {} str 手机号
 * @return {Boolean}
 */
function isMobile(str){
	if('' != str){
		/*
		if(!(/^1((3\d)|(4[57])|(5[012356789])|(7\d)|(8\d))\d{8}$/.test(str)))
			return false;
		*/
        if(!(/^1\d{10}$/.test(str)))
			return false;
	}
	
	return true;
}

/**
 * 清空/填充文本框默认值
 * param obj:校验文本框对象
 */
function changeValue(obj,defVal){
	if(typeof(obj) == "string"){
		obj = document.getElementById(obj);
	}
	if(isEmpty(defVal))
		defVal = obj.value;
	
	obj.onfocus=function(){
		if(defVal == this.value){
			this.value = "";
		}
	}
	obj.onblur=function(){
		if("" == this.value){
			this.value = defVal;
		}
	}
}
/**
 * 格式化数字
 * param src:值
 * param pos:精确小数位
 */
function fomatFloat(src,pos){
	if(src == null || src == "" || isNaN(parseFloat(src))){
		src = 0;
	}
	src = parseFloat(src);
	if(pos && pos != "")
		src = src.toFixed(pos);
    return src;
}
//判断对象是否存在
function isEmpty(obj){
	return obj == null || obj === "" || obj == "null" || typeof(obj) == "undefined";
}

/**
 * 为空转化为空字符串
 * @param {} obj
 * @return {}
 */
function convertNull(obj){
	if(isEmpty(obj))
		obj = '';
	return obj;
}
/**
 * 校验数据是否为空
 * param id:校验id
 * param obj:校验对象
 * param msg:提示信息
 * param validType:校验类型（1文本框2普通下拉框3树状结构下拉框）默认为1
 * param icon:提示图标(默认warning)
 * param fn:回调函数
 */
function validData(id,msg,validType,obj,icon,fn){
	var returnVal = true;
	var val = "";
	if(isEmpty(obj))
		obj = winFrame;
	
	try{
		obj = obj.$("#"+id);
		val = obj.val();
	}catch(e){
		try{
			obj = obj.document.getElementById(id);
		}catch(e){
			obj = document.getElementById(id);
		}
		val = obj.value;
	}
	/*
	if(isEmpty(validType) || validType == 1){
		val = obj.val();
	}else if(validType == 2){
		val = obj.combobox("getValue");
	}else if(validType == 3){
		val = obj.combotree("getValue");
	}
	*/
	if(trim(val) == ""){
		if(isEmpty(icon)){
			icon = "warning";
		}
		$.messager.alert('操作提示',msg,icon,function(){
			try{
				/*
				if(isEmpty(validType) || validType == 1){
				 	obj.focus();
				}else if(validType == 2){
				 	obj.combobox().next('span').find('input').click();
				}else if(validType == 3){
					obj.combotree().next('span').find('input').click();
				}
			 	*/
			 	if(obj.hasClass('easyui-numberbox')){
                    obj.next('span').find('input').focus();
			 	}else{
				 	obj.focus();
			 	}
			 	if(!isEmpty(fn)){
			 		fn();
			 	}
		 	 }catch(e){}
		});
	   	returnVal = false;
	}
	
	return returnVal;
}

//不足位时左补字符
function leftPad(str,size,padStr){
	var temp = "";
    for(var i = 0;i < (size - (str+"").length); i++)
        temp += padStr;
    return temp += str;
}

function isSuccess(obj){
	if(typeof obj.code != 'undefined' && obj.code == 'success'){
		return true;
	}else{
		return false;
	}
}

function isRepeat(arr, fn){  
	var hash = {};  
	for(var i =0 ; i< arr.length ; i++ ) {  
		if(hash[$(arr[i]).val()]){  
			if(typeof fn == 'function'){
				fn(i);
			}
			return true;  
		}
		hash[$(arr[i]).val()] = true;  
	}
	if(typeof fn == 'function'){
		fn(-1);
	}else{
		return false;  
	}  
}

function formatPhone(phone){
	if(!isEmpty(phone)){
		return phone.substring(0, 3) + ' ' + phone.substring(3, 7) + ' ' + phone.substring(7);
	}else{
		return '';
	}
}

/**
 * list页面创建btn按钮
 * @param {} option {id:'',name:'',desc:'',icon:'',class:'',style:'',clickFn:fn}
 * @param {} fn
 * @return {}
 */
function createListBtn(option, fn){
	var html = '<a';
	if(typeof option.id != 'undefined'){
		html += ' id="'+ option.id +'"';
	}
	if(typeof option.name != 'undefined'){
		html += ' name="'+ option.name +'"';
	}
	if(typeof option.disabled != 'undefined'){
		html += ' class="disabledBtn ';
	}else{
		html += ' class="commonBtn ';
	}
	if(typeof option.className != 'undefined'){
		html += option.className ;
	}
	html += '"';
	if(typeof option.fn != 'undefined'){
		html += ' onclick="'+ option.fn +'"';
	}
	if(typeof option.style != 'undefined'){
		html += ' style="'+ option.style +'"';
	}
	html += '>';
	if(typeof option.icon != 'undefined'){
		html +='<i class="commonIcon">'+option.icon+'</i>';
	}
	html += option.desc +'</a>';
	return html;
}
/**
 * 列表背景色
 * @type 
 */
var bgRowColor = {
	'color1' : '#e6b8af', //浅红
	'color2' : '#d9d9d9',//浅灰
	'color3' : '#fce5cd',//浅黄
	'color4' : '#d9ead3',//中绿
	'color5' : '#f0cccb',//粉红
	'color6' : '#ebc4a4',//中黄
	'color7' : '#e2e3f2',//淡紫
	'color8' : '#d4f0e0',//淡绿
	'color9' : '#dbdbdb',//中灰
	'color10' : '#debea3',//深黄
	'color11' : '#ceeddb',//浅绿
	'color12' : '#f0dfff'//中紫
};
/**
 * 创建图例
 * @param {} colorVal 色值
 * @param {} name 图例名称
 */
function createLegend(obj, colorVal, name){
	var _html = '<i style="background-color:'+ colorVal +';"></i>\
					 <label>'+ name +'</label>';
	obj.append(_html);
}

/**
 * 创建字体图标图例
 * @param obj 添加对象
 * @param styleVal 样式值
 * @param name 图例名称
 * @param iconFont 字体图标值
 */
function createLegendIconfont(obj, styleVal, name, iconFont){
    var _html = '<i style="'+ styleVal +'">' + iconFont + '</i>\
					 <label>'+ name +'</label>';
    obj.append(_html);
}
