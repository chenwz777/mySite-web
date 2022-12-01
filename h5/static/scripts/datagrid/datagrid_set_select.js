function get_datagrid_checkbox_values(rows,p,splits){
  var value="";
  if(splits == null || splits == "" || typeof(splits) == "undefined"){
  	  splits = ",";
  }
  try{
       for(i = 0;i < rows.length; i++){
         	if (value != "") value += splits;
		    value += rows[i][p];
       }
	   if(typeof(value) == "undefined"){
	   		value = "";
	   }
  }catch(e){}
  return value; 
}