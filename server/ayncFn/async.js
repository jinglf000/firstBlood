/**
 * @date 2017-09-10
 * @author jinglf000
 * @desc async
 *
 *
 */

//  进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象
// ，而await命令就是内部then命令的语法糖。
// async 返回值为Promise对象，所以也是异步的无论加没加await
// async 的返回值和await对应的promise有关
// async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，
// 除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

// 使用Promise.all 同时出发多个异步操作


// ## 使用注意点
// ### 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，
// 所以最好把await命令放在try...catch代码块中。

// ### 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

// ### 第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。

// http://es6.ruanyifeng.com/#docs/async#异步遍历器

function timeout (ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function asyncPrint(value, ms) {
	await timeout(ms);
	console.log(value);
}

// console.log(asyncPrint('hello World', 1000));


async function asyncFn () {
	const x = await new Promise((resolve) => {
		setTimeout(() => {console.log(34343); resolve('nihao')}, 90);
	});
	console.log(x);
	return x;
}

asyncFn().then((res) => {console.log(res)});

console.log(111);
async function f() {
	return  123;
}
new Promise((resolve) => {
	console.log(112);
});
console.log(222);
f().then(v => console.log(v))
