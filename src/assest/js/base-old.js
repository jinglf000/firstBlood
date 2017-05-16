/**
 * 公用方法库
 * @author jinglf000
 * ###### Fri May 5 10:53:27 CST 2017
 */

// jquery-validation 中文提示信息
(function( factory ) {
    if ( typeof define === "function" && define.amd ) {
        define( ["jquery", "../jquery.validate"], factory );
    } else {
        factory( jQuery );
    }
}(function( $ ) {
    if(!$.validator){return};
    /*
    * Translated default messages for the jQuery validation plugin.
    * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
    */
    $.extend($.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多可以输入 {0} 个字符"),
        minlength: $.validator.format("最少要输入 {0} 个字符"),
        rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("请输入不小于 {0} 的数值")
    });
}));
(function($){

    // 通用UI组件代码
    var ui_list,
        ui_render,
        ui_str = [];
    // select 组件
    ui_list = [
        {
            type : 'uiSelect',
            str  : '<div class="ui-select-con">'+
                    '<ul>'+
                        '{{each list}}'+
                        '<li data-id="{{$value.id}}" data-name="{{$value.name}}" data-param={{$value.param}}>{{$value.name}}</li>'+
                        '{{/each}}'+
                    '</ul>'+
                '</div>'
        },
        {
            type : 'uiMsgSuccess',
            str  : '<div class="msgSuccess">'+
                        '<i class="iconfont icon-msg-success"></i>'+
                        '<p class="content">{{msg}}</p>'+
                    '</div>'
        }
    ];


    ui_list.forEach(function(value,index){
        var uiRender = {};
        uiRender[value.type] = template.compile(value.str);
        $('body').data('uiRender',uiRender);
    });    
    /**********     获取表单        ***********/
    /** 获取表单值，实际调用方法
     * @argument 处理方式
     * @return function 获取form表单里面的数据的方法--
     * @argument $form form的jquery对象；@return obj
     */
    function getForm(getMethod){
        return function($form){
            var obj = {};
            $form.find('input,textarea,select').each(function(index,ele){
                var val = getValueMethod[getMethod](ele);
                val.forEach(function(_obj,i){
                    var _key = _obj.name,
                        _val = _obj.value,
                        _;
                    if(obj[_key]){
                        if(!(obj[_key] instanceof Array)){
                            _ = obj[_key];
                            obj[_key] = [_];
                        }
                        obj[_key].push(_val);
                    }else{
                        obj[_key] = _val;
                    }
                })
            });
            return obj;
        }
    };
    
    /** 获取表单元素值的不同方法
     * @argument ele，DOM元素
     * @return arr[{name:'key',value:'val'}]
     * 当返回的key是重复的时候，会把相同的key处理成数组存放
     **/
    var getValueMethod = {
        fromName : function(ele){
            var _nodeName = ele.nodeName.toLowerCase(),
                _inputType = ele.type,
                _str = "checkbox,radio,button,reset,submit",
                _flag,
                _flag2,
                arr = [],
                obj = {};
            _flag = _nodeName === "select" || _nodeName === "textarea"  || ( _nodeName === 'input' && (_str.indexOf(_inputType) === -1))
            _flag2 = _nodeName === 'input' && (_inputType === "checkbox" ||  _inputType === "radio");
            if(_flag){
                if( _inputType === "hidden"){
                    if(ele.name === ""){
                        return arr;
                    }
                }
                obj.name = ele.name;
                obj.value = ele.value;
                arr.push(obj);
            }else if( _flag2 ){
                if(ele.checked){
                    obj.name = ele.name;
                    obj.value = ele.value;
                    arr.push(obj);
                }
            }
            return arr;
        }
    };
    /**
     * 获取渲染函数
     * @param {slector} selector jquery 选择器
     * @returns {Function}  renderFn 渲染函数
     */
    function getRenderFn(selector){
        var $ele = $(selector),
            str = $ele.html();
        $ele.remove();
        return template.compile(str);
    }

    // 为jquery扩展方法extend 
    $.extend({
        "checkIdCard": function(obj){
            obj = $(obj);
            card = obj.val().toLocaleUpperCase();
            obj.val(card);
            var vcity = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外"
            };
            checkCard = function(card) {

                var checkCard = card;
                //是否为空
               
                //校验长度，类型
                if (isCardNo(card) === false) {
                    return false;
                }
                //检查省份
                if (checkProvince(card) === false) {
                    return false;
                }
                //校验生日
                if (checkBirthday(card) === false) {
                    return false;
                }
                //检验位的检测
                if (checkParity(card) === false) {
                    return false;
                }
                return true;
            };

            //检查号码是否符合规范，包括长度，类型
            isCardNo = function(card) {
                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
                if (reg.test(card) === false) {

                    return false;
                }

                return true;
            };

            //取身份证前两位,校验省份
            checkProvince = function(card) {
                var province = card.substr(0, 2);
                if (vcity[province] == undefined) {
                    return false;
                }
                return true;
            };

            //检查生日是否正确
            checkBirthday = function(card) {
                var len = card.length;
                //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
                if (len == '15') {
                    var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                    var arr_data = card.match(re_fifteen);
                    var year = arr_data[2];
                    var month = arr_data[3];
                    var day = arr_data[4];
                    var birthday = new Date('19' + year + '/' + month + '/' + day);
                    return verifyBirthday('19' + year, month, day, birthday);
                }
                //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
                if (len == '18') {
                    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                    var arr_data = card.match(re_eighteen);
                    var year = arr_data[2];
                    var month = arr_data[3];
                    var day = arr_data[4];
                    var birthday = new Date(year + '/' + month + '/' + day);
                    return verifyBirthday(year, month, day, birthday);
                }
                return false;
            };

            //校验日期
            verifyBirthday = function(year, month, day, birthday) {
                var now = new Date();
                var now_year = now.getFullYear();
                //年月日是否合理
                if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                    //判断年份的范围（3岁到100岁之间)
                    var time = now_year - year;
                    if (time >= 3 && time <= 100) {
                        return true;
                    }
                    return false;
                }
                return false;
            };

            //校验位的检测
            checkParity = function(card) {
                //15位转18位
                card = changeFivteenToEighteen(card);
                checkCard = card;
                var len = card.length;
                if (len == '18') {
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var cardTemp = 0,
                        i, valnum;
                    for (i = 0; i < 17; i++) {
                        cardTemp += card.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[cardTemp % 11];
                    if (valnum == card.substr(17, 1)) {
                        return true;
                    }
                    return false;
                }
                return false;
            };

            //15位转18位身份证号
            changeFivteenToEighteen = function(card) {
                if (card.length == '15') {
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var cardTemp = 0,
                        i;
                    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
                    for (i = 0; i < 17; i++) {
                        cardTemp += card.substr(i, 1) * arrInt[i];
                    }

                    card += arrCh[cardTemp % 11];
                    checkCard = card;
                    obj.val(card);
                    return card;
                }

                return card;
            };
            return checkCard(card);
        },
        "getFormData" : getForm('fromName'),
        "getRenderFn" : getRenderFn,
        "msgSuccess"  : function(data,time){
            time = time === undefined ? 500 : time;
            var body = $('body'),
                $ele = $(body.data('uiRender').uiMsgSuccess({msg:data})).appendTo(body);
            setTimeout(function(){
                $ele.fadeOut(function(){
                    $ele.remove();
                })
            },time)
        }
    })
    // 为jquery添加自定义验证规则
    if($.validator){
        // 验证设置
        $.validator.setDefaults({
            errorClass: 'infoerror',
            errorElement: 'em'
        })

        // 自定义验证规则  
        $.validator.addMethod('idCard',function(value,element){//身份证号码 严格验证
            return this.optional(element) || ($.checkIdCard.call(element,element));
        },'请输入正确的身份证号码');
        $.validator.addMethod('phone',function(value,element){// 电话号码
            var v_phone = /^\d{11}$/;
            return this.optional(element) || (v_phone.test(value));
        },'请输入正确的电话号码');
        $.validator.addMethod('minlang',function(value,element,params){// 包含中文字符串长度 最小
            var v_chinese = /[^\x00-\xff]/g,
                china_str = value.match(v_chinese),
                length = value.length + china_str ? china_str.length : 0;
            return this.optional(element) || !(length < +params);
        },$.validator.format('请输入大于 {0} 长度的字符，中文算两个'));
        $.validator.addMethod('maxlang',function(value,element,params){// 包含中文字符串长度 最大
            var v_chinese = /[^\x00-\xff]/g,
                china_str = value.match(v_chinese),
                length = value.length + (china_str ? china_str.length : 0 );
            return this.optional(element) || !(length >+params);
        },$.validator.format('请输入小于 {0} 长度的字符，中文算两个'));
    }
})($);

