// js 风格控制，静态语法校验
/* https://github.com/sivan/javascript-style-guide */
// http://eslint.cn/docs/rules/

module.exports = {
	"ecmaVersion" : 2017,
	"sourceType" : 'module',
	"rules": {
		"strict": 0,                     // 不启用严格模式
		/**
		 * Variables
		 */
		"no-shadow": 2,                  // 禁止变量声明与外层作用域的变量同名
		"no-shadow-restricted-names": 2, // 禁止覆盖受限制的标识符
		"no-unused-vars": [2, {          // http://eslint.cn/docs/rules/no-unused-vars
			"vars": "local", 			 // vars[local,all];local仅仅检测本作用域中声明的变量是否使用，允许不使用全局环境中的变量。
			"args": "none"		 		// 最后一个参数必须使用。如：一个函数有两个参数，你使用了第二个参数，ESLint 不会报警告。
										// none 不检查函数的参数
		}],

		/**
		 * Possible errors
		 */
		"comma-dangle": [2, "never"],    // 禁用拖尾逗号 {bar : 'baz',qux : 'qex',}
		"no-cond-assign": [2, "always"], // 禁止条件表达式中出现赋值操作符
		"no-console": 1,                 // 禁用 console，警告
		"no-debugger": 1,                // 禁用 debugger，警告
		"no-alert": 1,                   // 禁用 alert、confirm 和 prompt ，警告
		"no-constant-condition": 1,      // 禁止在条件中使用常量表达式
		"no-dupe-keys": 2,               // 禁止对象字面量中出现重复的 key
		"no-duplicate-case": 2,          // 禁止出现重复的 case 标签,switch case
		"no-empty": 2,                   // 禁止出现空语句块
		"no-empty-character-class": 2,   // 禁止在正则表达式中出现空字符集 (no-empty-character-class)
		"no-ex-assign": 2,               // 禁止对 catch 子句的参数重新赋值
		"no-extra-semi": 2,              // 禁用不必要的分号 http://eslint.cn/docs/rules/no-extra-semi
		"no-func-assign": 2,             // 禁止对 function 声明重新赋值
		"no-inner-declarations": 2,      // 禁止在嵌套的语句块中出现变量或 function 声明 (no-inner-declarations)
		"no-invalid-regexp": 2,          // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
		"no-irregular-whitespace": 2,    // 禁止在字符串和注释之外不规则的空白
		"no-unsafe-negation": 2,         // http://eslint.cn/docs/rules/no-unsafe-negation
		"no-obj-calls": 2,               // 禁止把全局对象作为函数调用 http://eslint.cn/docs/rules/no-obj-calls
		"no-regex-spaces": 2,            // 禁止正则表达式字面量中出现多个空格 http://eslint.cn/docs/rules/no-regex-spaces
		"no-sparse-arrays": 2,           // 禁用稀疏数组 http://eslint.cn/docs/rules/no-sparse-arrays
		"no-unreachable": 2,             // 禁止在return、throw、continue 和 break 语句之后出现不可达代码 http://eslint.cn/docs/rules/no-unreachable
		"use-isnan": 2,                  // 要求使用 isNaN() 检查 NaN http://eslint.cn/docs/rules/use-isnan
		"valid-jsdoc": 2,                // 强制使用有效的 JSDoc 注释 http://eslint.cn/docs/rules/valid-jsdoc
		"valid-typeof": 2,               // 强制 typeof 表达式与有效的字符串进行比较 http://eslint.cn/docs/rules/valid-typeof

		/**
		 * Best practices
		 */
		"consistent-return": 2,          // 要求 return 语句要么总是指定返回的值，要么不指定 http://eslint.cn/docs/rules/consistent-return
		"curly": [2, "multi-line"],      // 要求遵循大括号约定 http://eslint.cn/docs/rules/curly
		"default-case": 2,               // 要求 switch 语句中有 default 分支 http://eslint.cn/docs/rules/default-case
		"dot-notation": [2, {            // 要求使用点号，获取对象的属性  http://eslint.cn/docs/rules/dot-notation
			"allowKeywords": true		 //
		}],
		"eqeqeq": 2,                     // 要求使用 === 和 !== http://eslint.cn/docs/rules/eqeqeq
		"guard-for-in": 2,               // 要求 for-in 循环中有一个 if 语句 http://eslint.cn/docs/rules/guard-for-in
		"no-caller": 2,                  // 禁用 arguments.caller 或 arguments.callee http://eslint.cn/docs/rules/no-caller
		"no-div-regex": 2,               // 禁止除法操作符显式的出现在正则表达式开始的位置 http://eslint.cn/docs/rules/no-div-regex
		"no-else-return": 2,             // 禁止在 else 前有 return http://eslint.cn/docs/rules/no-else-return
		"no-labels": 2,                  // 禁用标签语句 http://eslint.cn/docs/rules/no-labels
		"no-eq-null": 2,                 // 禁止在没有类型检查操作符的情况下与 null 进行比较 http://eslint.cn/docs/rules/no-eq-null
		"no-eval": 2,                    // 禁用 eval() http://eslint.cn/docs/rules/no-eval
		"no-extend-native": 1,           // 禁止扩展原生类型 http://eslint.cn/docs/rules/no-extend-native
		"no-extra-bind": 2,              // 禁止不必要的 .bind() 调用 http://eslint.cn/docs/rules/no-extra-bind
		"no-fallthrough": 2,             // 禁止 case 语句落空 http://eslint.cn/docs/rules/no-fallthrough
		"no-floating-decimal": 2,        // 禁止数字字面量中使用前导和末尾小数点 http://eslint.cn/docs/rules/no-floating-decimal
		"no-implied-eval": 2,            // 禁止使用类似 eval() 的方法 http://eslint.cn/docs/rules/no-implied-eval
		"no-lone-blocks": 2,             // 禁用不必要的嵌套块 http://eslint.cn/docs/rules/no-lone-blocks
		"no-loop-func": 2,               // 禁止在循环中出现 function 声明和表达式 http://eslint.cn/docs/rules/no-loop-func
		"no-multi-str": 2,               // 禁止多行字符串 http://eslint.cn/docs/rules/no-multi-str
		"no-global-assign": 2,         	 // 禁止重写原生对象或只读对象 http://eslint.cn/docs/rules/no-global-assign
		"no-new": 2,                     // 禁止使用new产生副作用，合理的使用 new  http://eslint.cn/docs/rules/no-new
		"no-new-func": 2,                // 禁止对 Function 对象使用 new 操作符 http://eslint.cn/docs/rules/no-new-func
		"no-new-wrappers": 2,            // 禁止对 String，Number 和 Boolean 使用 new 操作符 http://eslint.cn/docs/rules/no-new-wrappers
		"no-octal": 2,                   // 禁用八进制字面量 http://eslint.cn/docs/rules/no-octal
		"no-octal-escape": 2,            // 禁止在字符串中使用八进制转义序列 http://eslint.cn/docs/rules/no-octal-escape
		"no-param-reassign": 2,          // 禁止对 function 的参数进行重新赋值 http://eslint.cn/docs/rules/no-param-reassign
		"no-proto": 2,                   // 禁用 __proto__ 属性 http://eslint.cn/docs/rules/no-proto
		"no-redeclare": 2,               // 禁止多次声明同一变量 http://eslint.cn/docs/rules/no-redeclare
		"no-return-assign": 2,           // 禁止在 return 语句中使用赋值语句http://eslint.cn/docs/rules/no-return-assign
		"no-script-url": 2,              // 禁止使用 javascript: url http://eslint.cn/docs/rules/no-script-url
		"no-self-compare": 2,            // 禁止自身比较 http://eslint.cn/docs/rules/no-self-compare
		"no-sequences": 2,               // 不允许使用逗号操作符 http://eslint.cn/docs/rules/no-sequences
		"no-throw-literal": 2,           // 限制可以被抛出的异常 http://eslint.cn/docs/rules/no-throw-literal
		"no-undef": 2,                   // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到 http://eslint.cn/docs/rules/no-undef
		"no-undef-init": 2,              // 禁止将变量初始化为 undefined http://eslint.cn/docs/rules/no-undef-init
		"no-undefined": 1,               // 禁止将 undefined 作为标识符 http://eslint.cn/docs/rules/no-undefined
		"no-with": 2,                    // 禁用 with 语句 http://eslint.cn/docs/rules/no-with
		"radix": 2,                      // 强制在parseInt()使用基数参数 http://eslint.cn/docs/rules/radix
		"wrap-iife": [2, "any"],         // 需要把立即执行的函数包裹起来  http://eslint.cn/docs/rules/wrap-iife
		"yoda": 2,                       // 要求或禁止 “Yoda” 条件 http://eslint.cn/docs/rules/yoda

		/**
		 * Style
		 */
		"indent": [2, 'tab'],            // 使用tab进行缩进 http://eslint.cn/docs/rules/indent
		"brace-style": [2,               // 强制在代码块中使用一致的大括号风格http://eslint.cn/docs/rules/brace-style
			"1tbs", {
				"allowSingleLine": true
			}
		],
		"quotes": [                      // 使用单引号 http://eslint.cn/docs/rules/quotes
			2, "single", { "avoidEscape" : true}
		],
		"camelcase": [2, {               // 使用驼峰命名法 http://eslint.cn/docs/rules/camelcase
			"properties": "never"		 // 不检查属性名称
		}],
		"comma-spacing": [2, {           // 要求在逗号后使用空格 前不使用http://eslint.cn/docs/rules/comma-spacing
			"before": false,
			"after": true
		}],
		"comma-style": [2, "last"],      // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行 http://eslint.cn/docs/rules/comma-style
		"eol-last": 2,                   // 该规则要求在非空文件末尾至少存在一行空行（或缺少换行）。http://eslint.cn/docs/rules/eol-last
		"func-names": 0,                 // 要求或禁止命名的 function 表达式 警告 http://eslint.cn/docs/rules/func-names
		"key-spacing": [2, {             // 强制在对象字面量的属性中键和值之间使用一致的间距 http://eslint.cn/docs/rules/key-spacing
			"beforeColon": false,		 // 冒号和key之间没有空格
			"afterColon": true			 // 冒号和value之间存在至少有一个空格
			}],
		"new-cap": [2, {                 // 要求构造函数首字母大写 http://eslint.cn/docs/rules/new-cap
			"newIsCap": true
		}],
		"new-parens": 2,                 // 要求调用无参构造函数时有圆括号 http://eslint.cn/docs/rules/new-parens
		"no-array-constructor": 2,       // 禁止使用 Array 构造函数 除非使用构造函数创建 稀疏数组http://eslint.cn/docs/rules/no-array-constructor
		"no-lonely-if": 1,               // 禁止 if 语句作为唯一语句出现在 else 语句块中http://eslint.cn/docs/rules/no-lonely-if
		"no-mixed-spaces-and-tabs": 1,   // 禁止空格和 tab 的混合缩进 http://eslint.cn/docs/rules/no-mixed-spaces-and-tabs
		"no-multiple-empty-lines": [2, { // 禁止出现多行空行 最多为两行 http://eslint.cn/docs/rules/no-multiple-empty-lines
			"max": 2
		}],
		"no-nested-ternary": 2,          // 禁用嵌套的三元表达式 http://eslint.cn/docs/rules/no-nested-ternary
		"no-new-object": 2,              // 禁用 Object 的构造函数 http://eslint.cn/docs/rules/no-new-object
		"func-call-spacing": [2,         // 方法名和调用之间没有空格 http://eslint.cn/docs/rules/no-spaced-func
			 "never"],
		"no-trailing-spaces": 2,         // 禁用行尾空白 http://eslint.cn/docs/rules/no-trailing-spaces
		"no-extra-parens": [2, "functions"], // 只在 函数表达式周围禁止不必要的圆括号 http://eslint.cn/docs/rules/no-extra-params
		// "one-var": [1, "always"],         //  要求每个作用域有一个变量声明 http://eslint.cn/docs/rules/one-var
		"padded-blocks": [2, "never"],   // 禁止块内填充 http://eslint.cn/docs/rules/padded-blocks
		"semi": [2, "always"],           // 要求在语句末尾使用分号 http://eslint.cn/docs/rules/semi
		"semi-spacing": [2, {            // 它强制分号之后有空格，禁止分号之前有空格。 http://eslint.cn/docs/rules/semi-spacing
			"before": false,
			"after": true
		}],
		"keyword-spacing": 2,            // 强制在关键字前后使用一致的空格 http://eslint.cn/docs/rules/keyword-spacing
		"space-before-blocks": 2,        // 要求语句块之前的空格http://eslint.cn/docs/rules/space-before-blocks
		"space-before-function-paren": [2, {"anonymous": "always", "named": "always"}], //强制在 function的左括号之前使用一致的空格 http://eslint.cn/docs/rules/space-before-function-paren
		"space-infix-ops": 2,            // 要求操作符周围有空格 http://eslint.cn/docs/rules/space-infix-ops
		"space-unary-ops": 2,            // 强制在一元操作符前后使用一致的空格 http://eslint.cn/docs/rules/space-unary-ops
		"spaced-comment": [2, "always",  {// 强制在注释中 // 或 /* 使用一致的空格  http://eslint.cn/docs/rules/spaced-comment
			"exceptions": ["-", "+"],
			"markers": ["=", "!"]          // space here to support sprockets directives
		}]
	}
}
