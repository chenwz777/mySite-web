var FileType = {
	types : {
				'IMAGE' : "['.bmp','.jpg','.jpeg','.png']",
				'WORD' : "['.doc','.docx']",
				'EXCEL' : "['.xls','.xlsx']",
				'PPT' : "['.ppt','.pptx']",
				'DOC' : "['.doc','.docx','.ppt','.pptx','.xls','.xlsx']",
				'RAR' : "['.rar','.zip']"
			},
	validType : function (correctType, fileName) {
		//校验文件类型，types使用IMAGE,WORD,EXCEL拼接方式
        var result = false;
        if (correctType == null || typeof correctType === 'undefined') {
            return result;
        }

        var ext = this.getExt(fileName);
        if (ext != null) {
            correctType = correctType.toUpperCase();
            var types = correctType.split(',');
            var typeName;
            for (var i = 0; i < types.length; i++) {
                typeName = types[i];
                if (this.types.hasOwnProperty(typeName)) {
                    if (this.types[typeName].indexOf(ext) != -1) {
                        result = true;
                        break;
                    }
                }
            }
        }

        return result;
	},
	validExt : function (correctExt, fileName) {
        //校验文件类型，ext使用.jpg,.ppt拼接方式

        if (correctExt == null || typeof correctExt === 'undefined') {
            return false;
        }

        correctExt = correctExt.toLowerCase();
        var ext = this.getExt(fileName);
        if (ext == null ) {
			return false;
        }

        if (correctExt.indexOf(ext) == -1) {
        	return false;
		}

		return true;
    },
	getExt : function (fileName) {
        if (fileName == null || typeof fileName === 'undefined') {
            return null;
        }

        var ext = null;
        if (fileName.lastIndexOf(".") != -1) {
			ext = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
		}

		return ext;
    }

}