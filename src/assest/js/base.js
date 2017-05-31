/**
 * @author  jinglf000
 * @description 项目公用文件，使用AMD文件加载方式，文件名就是该模块名
 */
define(['jquery', 'validate', 'artTemplate'], function ($, $validate, template) {
	var base = {
		PATH: '././'
	};

	//  validate 中文提示
	$.extend($.validator.messages, {
		required: '这是必填字段',
		remote: '请修正此字段',
		email: '请输入有效的电子邮件地址',
		url: '请输入有效的网址',
		date: '请输入有效的日期',
		dateISO: '请输入有效的日期 (YYYY-MM-DD)',
		number: '请输入有效的数字',
		digits: '只能输入数字',
		creditcard: '请输入有效的信用卡号码',
		equalTo: '你的输入不相同',
		extension: '请输入有效的后缀',
		maxlength: $.validator.format('最多可以输入 {0} 个字符'),
		minlength: $.validator.format('最少要输入 {0} 个字符'),
		rangelength: $.validator.format('请输入长度在 {0} 到 {1} 之间的字符串'),
		range: $.validator.format('请输入范围在 {0} 到 {1} 之间的数值'),
		max: $.validator.format('请输入不大于 {0} 的数值'),
		min: $.validator.format('请输入不小于 {0} 的数值')
	});
	// 通用UI组件代码
	// 通用UI组件代码
	var uiList,
		uiRender = {};
	// select 组件
	uiList = [{
		type: 'uiSelect',
		str: '<div class="ui-select-con">' +
				'<ul>' +
				'{{each list}}' +
				'<li data-id="{{$value.id}}" data-name="{{$value.name}}" data-param={{$value.param}}>{{$value.name}}</li>' +
				'{{/each}}' +
				'</ul>' +
				'</div>'
	},
	{
		type: 'uiMsgSuccess',
		str: '<div class="msgSuccess">' +
				'<i class="iconfont icon-msg-success"></i>' +
				'<p class="content">{{msg}</p>' +
				'</div>'
	}
	];
	uiList.forEach(function (value) {
		uiRender[value.type] = template.compile(value.str);
	});
	$('body').data('uiRender', uiRender);
	/**
	 * 获取表单值，实际调用方法
	 * @param  {Funtion} getMethod 处理方式
	 * @return {Function} 获取form表单里面的数据的方法--
	 * @description  {JQuery} $form form的jquery对象；
	 */
	function getForm (getMethod) {
		return function ($form) {
			var obj = {};
			$form.find('input, textarea, select').each(function (index, ele) {
				var val = getValueMethod[getMethod](ele);
				val.forEach(function (_obj) {
					var _key = _obj.name,
						_val = _obj.value,
						_;
					if (obj[_key]) {
						if (!(obj[_key] instanceof Array)) {
							_ = obj[_key];
							obj[_key] = [_];
						}
						obj[_key].push(_val);
					} else {
						obj[_key] = _val;
					}
				});
			});
			return obj;
		};
	}

	/**
	 * 获取表单元素值的不同方法
	 * @argument ele，DOM元素
	 * @return arr[{name:'key',value:'val'}]
	 * 当返回的key是重复的时候，会把相同的key处理成数组存放
	 **/
	var getValueMethod = {
		fromName: function (ele) {
			var _nodeName = ele.nodeName.toLowerCase(),
				_inputType = ele.type,
				_str = 'checkbox,radio,button,reset,submit',
				_flag,
				_flag2,
				arr = [],
				obj = {};
			_flag = _nodeName === 'select' || _nodeName === 'textarea' || (_nodeName === 'input' && (_str.indexOf(_inputType) === -1));
			_flag2 = _nodeName === 'input' && (_inputType === 'checkbox' || _inputType === 'radio');
			if (_flag) {
				if (_inputType === 'hidden') {
					if (ele.name === '') {
						return arr;
					}
				}
				obj.name = ele.name;
				obj.value = ele.value;
				arr.push(obj);
			} else if (_flag2) {
				if (ele.checked) {
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
	 * @param {slector} selector jquery选择符
	 * @returns {Funtion} renderFn 渲染函数
	 */
	function getRenderFn (selector) {
		var $ele = $(selector),
			str = $ele.html();
		$ele.remove();
		return template.compile(str);
	}
	// 为jquery扩展方法extend
	$.extend({
		'getFormData': getForm('fromName'),
		'getRenderFn': getRenderFn,
		'msgSuccess': function (data, time) {
			var body = $('body'),
				$ele = $(body.data('uiRender').uiMsgSuccess({
					msg: data
				})).appendTo(body),
				duration = (typeof time === 'undefined') ? 500 : time;
			setTimeout(function () {
				$ele.fadeOut(function () {
					$ele.remove();
				});
			}, duration);
		}
	});

	return base;
});
