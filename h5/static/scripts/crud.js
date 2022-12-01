function doCreate(titleName,width,height,url){
	var pp = parent;
	pp.openWindow(titleName,width,height,url,[{
		text:'保存',
		iconCls:'icon-ok',
		handler:function(){
			save();
		}
	},{
		text:'取消',
		iconCls:'icon-no',
		handler:function(){
			pp.closeWindow();
		}
	}]);
}

function edit(){
	doEdit('');
}

function doEdit(alertName, valName){
	var rows = listFrame.getSelectValue();
	if(!checkSelectDatagrid(rows.length,false,alertName))
	    return;
	
	var pp = parent;
	if(pp.isEmpty(valName)){
		valName = 'DG_VALUE';
	}
	create(get_datagrid_checkbox_values(rows, valName, ','));
}

function doSave(url,id){
	var pp = parent;
	var editFrame = pp.winFrame;
	pp.$.messager.confirm('操作提示','确定要保存吗？',function(r){
	    if (r){
            var ajaxObj = new AjaxObj();

            ajaxObj.execute(url, editFrame.$('#editForm').serialize(), function(data){
                if(pp.isSuccess(data)){
                    pp.$.messager.alert('操作提示',"保存成功！","info",function(){
                        if(typeof(id) != 'undefined'){
                            if("" == id){
                                search();
                            }else{
                                listRefresh();
                            }
                        }
                        pp.closeWindow();
                    });
                }else{
                    pp.$.messager.alert('操作提示',"操作失败！","error");
                }
            });
         }
     });
}

function doView(titleName,width,height,url,clearButton){
	var pp = parent;
	var buttons = null;
	if(pp.isEmpty(clearButton))
		clearButton = false;
	if(!clearButton){
		buttons = [{
				text:'关闭',
				iconCls:'icon-no',
				handler:function(){
					pp.closeWindow();
				}
			}];		
	}
	pp.openWindow(titleName,width,height,url,buttons);
}

function doRemove(url, valName){
	var pp = parent;
	var ids = "";
	var rows = listFrame.getSelectValue();
	if(!checkSelectDatagrid(rows.length,true,'删除'))
	    return;
	
	if(pp.isEmpty(valName)){
		valName = 'DG_VALUE';
	}
	ids = get_datagrid_checkbox_values(rows, valName, ',');
	pp.$.messager.confirm('操作提示',"确定要删除吗？",function(r){
	    if (r){
			var urls = url;
		    var params = "ids="+ids;
		    executeAjax(urls,params,function(data){
		    	if(pp.isSuccess(data)){
		    		pp.$.messager.alert('操作提示', "删除成功！", "info",function(){
			    		listRefresh();
			    	});
				}else{
					pp.$.messager.alert('操作提示',"操作失败！","error");
				}
		    });
		}
	});
}

function listRefresh(){
	var listFrame = document.getElementById("listFrame").contentWindow;
	try{
		listFrame.refreshData();
	}catch(e){ }
}