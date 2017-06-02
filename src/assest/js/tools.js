/**
 * 这里存放工具方法
 * ui-xxx ui组件库
 * 要求：1：性能高
 * 2：自适应
 * 3：用法简便
 *
 */
define(['jquery'], function ($) {
	function Title (options) {

	}


	$.fn.extend({
		'titles': function () {
			this.on('mouseover', '[title]');
		}
	});

	return {
		module: {
			name: 'tools',
			description: '一组通用的工具'
		}
	};
});

