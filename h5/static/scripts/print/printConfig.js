var LODOP = null; 
/*function getSystemInfo(strINFOType){
   return LODOP.GET_SYSTEM_INFO(strINFOType);
}*/
var LODOP; //声明为全局变量  
function getSystemInfo(strINFOType, params){
    LODOP=getLodop();
    // CLODOP版本
    if (LODOP.CVERSION){
    	// 使用回调函数不能直接返回
    	CLODOP.On_Return=function(TaskID,Value){ 
    		params.push(Value);
    	}; 
    } 
    var strResult=LODOP.GET_SYSTEM_INFO(strINFOType);
    if (!LODOP.CVERSION){
    	params.push(strResult);
    }  
}
var printerSetAll;
var ctx;
   
function initPrint(path){
	ctx = path;
 	try{
  		LODOP = getLodop2();
 		$('#print_icon').show();
 		var params = [];
  		getSystemInfo('NetworkAdapter.1.PhysicalAddress', params);
  		// 使用延时，防止回调函数被覆盖
  		setTimeout(function(){
  			getSystemInfo('DiskDrive.1.SerialNumber', params);
  			//	使用延时，防止数据未获取到
  			setTimeout(function(){
  				var key = b64_md5(params[0]+"-"+params[1]);
  				executeAjax(ctx+'/frame/getPrintConfig','computerKey='+key,function(data){
				    if(isSuccess(data)){
				    	printerSetAll = data;
					}else{
						pp.$.messager.alert('操作提示',"操作失败！","error");
					}
			    });
  			},1000);
  		},1000);
  		
	}catch(e){}
}

function configPrint(){
	openWindow("配置打印机",width2,345,ctx+"/frame/printerConfig",[{
		text:'保存',
		iconCls:'icon-ok',
		handler:function(){
			savePrintConfig();
		}
	},{
		text:'取消',
		iconCls:'icon-no',
		handler:function(){
			closeWindow();
		}
	}]);
}

function getPrinterName(printFlag){
	var printerSet = $.parseJSON(printerSetAll);
	var obj = $.parseJSON(printerSet[printFlag]);
	return obj;
}
  	
function savePrintConfig(){
	var pp = parent;
    var editFrame = pp.winFrame;
    if(LODOP == null || typeof LODOP == 'undefined' || typeof LODOP.GET_PRINTER_COUNT == 'undefined'){
		pp.$.messager.alert("操作提示","请先安装打印控件！","warning");
		return;
	}
   	if(!pp.validData("BIAOQIAN_printer_name","打印机名称不能为空！"))
		return;
   	if(!pp.validData("BIAOQIAN_printer_top","请输入上偏移！"))
		return;
   	if(!pp.validData("BIAOQIAN_printer_left","请输入左偏移！"))
		return;
    pp.$.messager.confirm('操作提示','确定要保存吗？',function(r){
    	if(r){
		    var res = editFrame.save();
		    if(res != 'error'){
		       initPrint(ctx);
			   pp.$.messager.alert("操作提示","保存成功","info",function(){
			   		closeWindow();
			   });
		    }else{
			   pp.$.messager.alert("操作提示","保存失败","error");
		    }
    	}
    });
}
  	
  	//读取本地所有打印机
function CreatePrinterList(){
	LODOP=getLodop(); 

	var printerArray=new Array();
	try{
	var iPrinterCount=LODOP.GET_PRINTER_COUNT();
	var printerName="";
	for(var i=0;i<iPrinterCount;i++){
		var option=document.createElement('option');
		printerName=LODOP.GET_PRINTER_NAME(i);
		option.innerHTML=printerName;
		option.value=i;
		printerArray.push(printerName);
	};	
	}catch(e){}
	return printerArray;
};


function getLodop2(oOBJECT,oEMBED){
    var LODOP;
    try{
    	var isIE = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
        if (needCLodop()) {
        	try{ LODOP=getCLodop();} catch(err) {};
        }else{
         	var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT!=undefined || oEMBED!=undefined) {
                if (isIE) LODOP=oOBJECT; else  LODOP=oEMBED;
            } else if (CreatedOKLodop7766==null){
                LODOP=document.createElement("object");
                LODOP.setAttribute("width",0);
                LODOP.setAttribute("height",0);
                LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else LODOP.setAttribute("type","application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766=LODOP;
            } else LODOP=CreatedOKLodop7766;
        }
        return LODOP;
    } catch(err) {};
};








