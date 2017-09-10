/**
 * @date 2017-09-10
 * @author jinglf000
 * @desc ES6中generator异步编程方案
 * 调用 Generator 函数，返回一个遍历器对象，
 * 代表 Generator 函数的内部指针。以后，
 * 每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
 * value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；
 * done属性是一个布尔值，表示是否遍历结束
 * generator 提供了一种可以暂停执行的函数
 */

//  generator 可以产生一系列的值
//  generator 可以暂停函数的执行，并且可以向函数内部传递不同的值
//  generator 生成函数（yield：产出）
//  generator 函数返回值为 iterator 对象
//  * 函数执行next() 会返回yield后面的值
//  * 再次调用next() 函数会返回第二个yield后面的值，next函数的中的参数，作用 (yield xxx)整体的值





const valueConst = require('./const');

console.log(valueConst);

function* helloworldGenerator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

const hw = helloworldGenerator();

// console.dir(hw);
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

function* f() {
	for (let i = 0; true; i ++) {
		const reset = yield i;
		if (reset) {i = -1;}
	}
}

const g = f();

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next(true));
console.log(g.next());

