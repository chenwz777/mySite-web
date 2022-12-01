function set_select(objStr,selectedVal){
	var obj;
	try{
		obj = $("#"+objStr);
	}catch(e){
		obj = document.getElementById(objStr);
	}
	set_select_obj(obj, selectedVal);
}

function set_select_obj(obj, selectedVal){
	try{
		$(obj).find("option[value='"+ selectedVal +"']").attr("selected",true);
	}catch(e){
		for(var i = 0; i < obj.options.length; i++){
			if(obj.options[i].value == selectedVal){
				obj[i].selected = true ;
				break;
			}
		}
	}
}

/**
 * 通过索引选中select
 * @param obj select 对象
 * @param idx 选中索引
 */
function set_select_obj_idx(obj, idx){
    if(obj instanceof jQuery){
        obj.get(0).selectedIndex = idx;
    } else {
        obj.selectedIndex = idx;
	}
}

function get_select(objStr){
	try{
		return get_select_obj($("#"+objStr));
	}catch(e){
		return get_select_obj(document.getElementById(objStr));
	}
}

function get_select_obj(obj){
	try{
		return $(obj).val();
	}catch(e){
		return obj.value;
	}
}

function get_select_text(objStr){
	try{
		return get_select_text_obj($("#"+objStr));
	}catch(e){
		return get_select_text_obj(document.getElementById(objStr));
	}
}

function get_select_text_obj(obj){
	try{
		return $(obj).find("option:selected").text();
	}catch(e){
		return obj.options[obj.options.selectedIndex].text;
	}
}

/**
 * 只有一个值的情况下默认选中
 * @param idStr id值
 * @param ifRemoveDef 是否移除默认选项 boolean 默认false
 */
function oneValueSelected(idStr, ifRemoveDef) {
	var obj;
	var len = 0;
	var idx = 1;
    try{
        obj = $("#" + idStr);
        len = obj.find("option").length;
    } catch(e) {
        obj = document.getElementById(idStr);
        len = obj.options.length;
    }

    var onlyOne = false;
    if(typeof(ifRemoveDef) === "undefined") {
        ifRemoveDef = false;
	}

	if (len == (idx + 1)) {
        onlyOne = true;
        set_select_obj_idx(obj, idx);

        if (ifRemoveDef) {
            if(obj instanceof jQuery){
                obj.find("option")[0].remove();
            } else {
                obj.options[0] = null;
                obj.options.length -= 1;
            }
        }
	}

	return onlyOne;
}

function get_checkbox_value(objs){
  var value;
  if(objs.length){
       for(i = 0;i < objs.length; i++){
             if (objs[i].checked){
			    value = objs[i].value;
			    break;
			 }
       }
   }else{
	   if(objs.checked){
		   value = objs.value;
	   }
   }
  return value; 
}

function get_checkbox_values(objs,splits){
  var value="";
  if(splits == null || splits == "" || typeof(splits) == "undefined"){
  	  splits = ",";
  }
  try{
	  if(objs.length){
	       for(i = 0;i < objs.length; i++){
	             if (objs[i].checked){
	             	if (value != "") value += splits;
				    value += objs[i].value;
				 }
	       }
	   }else{
		   if(objs.checked){
			   value = objs.value;
		   }
	   }
	   if(typeof(value) == "undefined"){
	   		value = "";
	   }
  }catch(e){}
   /*
   try{
	   if(value.substring(value.length-splits.length)==splits){
	   	  value = value.substring(0, value.length - splits.length);
	   }
   }catch(e){}
   * */
  return value; 
}

/**
 * 操作普通select
 * @param list
 * @param obj
 * @param defText false时不显示“请选择”,true或者空展示默认值,other可填写其它值
 * @param defValue 默认选中值
 * @return
 */
function changeSelectObj(urls, obj, defText, defValue){
	var listStr;
	if(urls != ""){
		try{
			listStr = executeAjaxBySync(urls);
		}catch(e){
			$.ajax({
				cache: false,
				type: "POST",
				headers: headers,
				url: urls,
				async: false,
				dataType:"json",
			    error: function(request) {
			    	try{
		            	parent.$.messager.alert('操作提示',"操作失败！","error");
			    	}catch(e){}
			    },
			    success: function(data) {
			    	listStr = data;
			    }
			});
		}
	}
	if(isSuccess(listStr)){
		listStr = listStr.handUserList;		
	}
	
	obj.options.length = 0;
	var optn = new Option();
	var i = 0;
	var length_ = 0;
	var list;
	var selectedIdx = 0;
	if(listStr){
		list = listStr;//eval("("+listStr+")");
		length_ = list.length;
	}
	
	if("false" != defText){
		if(typeof(defText) == "undefined" || defText == null || defText == "" || defText == "true")
			defText = "--请选择--";
		optn.value = "";
		optn.text = defText;
		obj.options[0] = optn;
		i = 1;
		length_ = length_ + 1;
	}
	
	if(list){
		var n = 0;
		var idValue;
		var textValue;
		for( ;i<length_;i++){
			optn = new Option();
            idValue = list[n].ID;
			if (typeof idValue === 'undefined') {
                idValue = list[n].id;
			}
            textValue = list[n].TEXT;
            if (typeof textValue === 'undefined') {
                textValue = list[n].text;
            }
			optn.value = idValue;
			optn.text = textValue;
			obj.options[i] = optn;
			if(idValue == defValue)
				selectedIdx = i;
			n++;
		}
	}
	obj.selectedIndex = selectedIdx;
	
}

function changeSelect(urls, objStr, defText, defValue){
	var obj = document.getElementById(objStr);
	changeSelectObj(urls, obj, defText, defValue);
}

/**
 * 2个select的选项互相交换
 * @param fbox  来源select标签
 * @param tbox  目标select标签
 */
function multiSelect(fbox,tbox)
{
	
	var lastSelect
	window.status = "";
	for(var i=0; i<fbox.options.length; i++)
	{
		if(fbox.options[i].selected && fbox.options[i].value != "")
		{
			if(!valueInMulti(tbox,fbox.options[i].value))
			{
				var no = new Option();
				no.value = fbox.options[i].value;
				no.text = fbox.options[i].text;
				tbox.options[tbox.options.length] = no;
			}
			lastSelect = i;
		}
		//fbox.options[i].selected =false;
	}
	//if(lastSelect+1<i)
	//{
		//fbox.options[lastSelect+1].selected = true;
	//}
	multiDelete(fbox);
}
/**
 * 判断移动值是否相等
 */
function valueInMulti(box,value)
{
	for(var i=0;i<box.options.length;i++)
	{
		if(box.options[i].value == value)
		{
			return true;
		}
	}
	return false;
}
/**
 * 将select的选中项删除
 * @param box  要删除选项的select标签
 */
function multiDelete(box)
{
	lastSelect = 0;
	for(var i=0;i<box.options.length;i++){
		if(box.options[i].selected && box.options[i].value != ""){
			for(var j=i;j<box.options.length-1;j++){
				box.options[j].value = box.options[j+1].value;
				box.options[j].text = box.options[j+1].text;
				box.options[j].selected = box.options[j+1].selected;
			}
			box.options.length -= 1;
			i--;
			lastSelect = i;
		}
	}
	if(lastSelect!=0&&lastSelect+1<i){
		box.options[lastSelect+1].selected = true;
	}
} 
/**
 * select选项向下移动
 * @param box  要移动选项的select标签
 */
function down_Select(box){
	if(checkSelectBox(box)){
		var lastSelect;
		for(var i=0;i<box.options.length;i++)
		{
			if(box.options[i].selected && box.options[i].value != "")
			{
		   		flag = 0;
		   		lastSelect = i+1;
				if(i < box.options.length-1){
					var temp_text = box.options[i].text;
					var temp_value = box.options[i].value;
					box.options[i].text = box.options[i+1].text;
					box.options[i].value = box.options[i+1].value;
					box.options[i+1].text = temp_text;
					box.options[i+1].value = temp_value;
				}else{
					lastSelect = i;
					alert("该级别已是最后级别");
				}
			}
		}
		clearSelect(box);
		box.options[lastSelect].selected = true;
	}
}
/**
 * 清空select
 选中项中
 * @param box  要移动选项的select标签
 */
function clearSelect(box){
	for(var i=0;i<box.options.length;i++){
		box.options[i].selected = false;
	}
}
/**
 * select选项移动时只能选择一项进行移动，判断是否是选中了多行
 * @param box  要移动选项的select标签
 */
function checkSelectBox(box){
	var count = 0;
	for(var i=0;i<box.options.length;i++){
		if(box.options[i].selected && box.options[i].value != ""){
			count++;
		}
	}
	if(count>1 || count == 0){
		alert("上下移动时请选择一项进行移动");
		return false;
	}
	return true;
}
/**
 * select选项向上移动
 * @param box  要移动选项的select标签
 */
function up_Select(box){
	if(checkSelectBox(box)){
		var lastSelect;
		for(var i=0;i<box.options.length;i++){
			if(box.options[i].selected && box.options[i].value != ""){
				lastSelect = i-1;
				if(i > 0){
					var temp_text = box.options[i].text;
					var temp_value = box.options[i].value;
					box.options[i].text = box.options[i-1].text;
					box.options[i].value = box.options[i-1].value;
					box.options[i-1].text = temp_text;
					box.options[i-1].value = temp_value;
				}else{
					lastSelect = i;
					alert("该级别已是第一级别");
				}
			}
		}
		clearSelect(box);
		box.options[lastSelect].selected = true;
	}
}

//获取多选下拉框值
function getSelectedIds(elementId){
	var box = document.getElementById(elementId);
	var ids = "";
	for(var i=0;i<box.options.length;i++){
		if(box.options[i].value != ""){
			ids += box.options[i].value+",";	
		}
	}
	return ids.substr(0, ids.length-1);
}
