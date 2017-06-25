/**
 * 前后端通用的模块加载方案
 * 包括AMD规范和commonJS规范
 *
 */
(function () {
	var root = this;
	var _ = function (obj) {
		return new warpper(obj);
	};

	if (typeof exports !== 'undefined') {// commonJS
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = _;
		}
	} else if (typeof define === 'function' && define.amd) {
		define('underscore', function () {
			return _;
		});
	} else {
		root._ = _;
	}
}).call(this);
