var ExportUtils = {
    menuId: '', //当前菜单标识
    package: '', //service类名
    methodName: 'getList', //查询方法名
    voObject: '', //vo对象路径+名称（com.vvise.model.vo...）
    ifRequest: '', //是否需要传递request
    formId: '', //form表单Id 可选
    exportFlag: true,
    formKey: {menuId: 'menuId', package: 'serviceObj', methodName: 'methodName', ifRequest: 'hasRequest', voObject: 'voObject', exportFlag: 'export'},
    init :function (params) {
        if (typeof params === 'object') {
            this.menuId = params.menuId;
            this.package = params.package;
            if (typeof params.methodName != 'undefined') {
                this.methodName = params.methodName;
            }
            if (typeof params.voObject != 'undefined') {
                this.voObject = params.voObject;
            }
            if (typeof params.ifRequest != 'undefined') {
                this.ifRequest = params.ifRequest;
            }
            if (typeof params.formId != 'undefined') {
                this.formId = params.formId;
            }
        } else {
            console.error("export params exception!");
        }
    },
    export: function(params) {
        this.init(params);

        var formObj = document.forms[0];
        if (this.formId != ''){
            formObj = document.getElementById(this.formId);
        }

        var val;
        var nodes = new Array();
        for (var key in this.formKey) {
            val = this[key];
            if (val != '') {
                var node1 = document.createElement("input");
                node1.type = "hidden";
                node1.name = this.formKey[key];
                node1.value = val;
                formObj.appendChild(node1);

                nodes.push(node1);
            }
        }

        var oldAction = formObj.action;
        var action = vvPageConst.ctx + "/exportController/export";
        formObj.action = action;
        formObj.submit();

        for (var i = 0, len = nodes.length; i < len; i++) {
            formObj.removeChild(nodes[i]);
        }
        formObj.action = oldAction;
    },
};
