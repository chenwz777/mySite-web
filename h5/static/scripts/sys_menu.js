//初始化将有“查询”统计选中的菜单，将查询变为不可点击状态
function initMenu(menuLvl,ifFunctionMenu,menuId){
	if(menuLvl != 1 && ifFunctionMenu != 1){
		var menus = document.getElementsByName(''+menuId+'');
		var defMenu;
		var isDisabled = false;
		for(var i = 0;i < menus.length;i++){
			if(menuId != menus[i].id){
				if($(menus[i]).attr("defMenu") == 1){
					defMenu = menus[i];
				}else if(menus[i].checked){
					isDisabled = true;
				}
			}
		}
		if(defMenu){
			defMenu.disabled = isDisabled;
		}
	}
}

function check(obj){
	checkChild(obj);
	checkParent(obj);
	if($(obj).attr("isFunMenu") == 1)
		checkDefMenu(obj);
	
	if(obj.checked)
		document.getElementById("menu_"+obj.id).value = obj.id;
	else
		document.getElementById("menu_"+obj.id).value = "";
}

function checkChild(obj){
	var childs = document.getElementsByName(obj.id);
	for(var i = 0;i < childs.length;i++){
		if(childs[i].id != obj.id){
			childs[i].checked = obj.checked;
			if($(childs[i]).attr("defMenu") == 1)
				childs[i].disabled = obj.checked;
			if(obj.checked)
				document.getElementById("menu_"+childs[i].id).value = childs[i].id;
			else
				document.getElementById("menu_"+childs[i].id).value = "";
			
			checkChild(childs[i]);
		}
	}
}

function checkParent(obj){
	/*
	var parentId = obj.id;
	if(parentId.length <= 2){//第一级
		return;
	}else{
		parentId = parentId.substring(0,(parentId.length - 3));
	}
	*/
	var parentObj = document.getElementById(obj.name);
	if(parentObj){
		//选中，则上级选中
		if(obj.checked){
			parentObj.checked = true;
			document.getElementById("menu_"+parentObj.id).value = parentObj.id;
			
			checkParent(parentObj);
		}else{//未选中，则判断同级是否还有选中，如果有选中则不取消上级，如果没有则将上级也取消
			var isCheck = false;
			var childs = document.getElementsByName(obj.name);
			for(var i = 0;i < childs.length;i++){
				if(obj.name != childs[i].id && childs[i].checked){
					isCheck = true;
					break;
				}
			}
			if(!isCheck){
				parentObj.checked = isCheck;
				document.getElementById("menu_"+parentObj.id).value = "";
				checkParent(parentObj);
			}
		}
	}
}

//检查同级中是否存在默认需要展示的功能菜单
function checkDefMenu(obj){
	var menus = document.getElementsByName(obj.name);
	var isCheck = false;
	for(var i = 0;i < menus.length;i++){
		if(obj.name != menus[i].id){
			//校验同级如果存在需要默认选中的菜单，并且当前单击的不是此菜单
			if(obj.checked && $(menus[i]).attr("defMenu") == 1 && menus[i].id != obj.id){
				menus[i].disabled = true;
				if(!menus[i].checked){
					menus[i].checked = true;
					document.getElementById("menu_"+menus[i].id).value = menus[i].id;
				}
			}
			
			if(!obj.checked && menus[i].id != obj.id && menus[i].checked && $(menus[i]).attr("defMenu") != 1){
				isCheck = true;
			}
		}
	}
	//如果同级中其他菜单全部没有选中则可以将默认展示菜单变为可点击状态
	if(!isCheck && !obj.checked){
		for(var i = 0;i < menus.length;i++){
			if(obj.name != menus[i].id && $(menus[i]).attr("defMenu") == 1 && 'undefined' == typeof($(menus[i]).attr("defDisabled"))){
				menus[i].disabled = false;
			}
		}
	}
}