var package = require('../../package.json');

typeof package === 'object';

// require 调取模块，内置模块的优先级高于自己写的模块
// 如果模块为 json 输出为 plain Object 一个简单的对象

