/**
 * ES5的面向对象继承
 * 先生成子类对象，然后把父类对象的实例赋给子类的原型
 * @param {string} name
 */
function Parent (name) {
	this.name = name;
	this.msg = '这是父元素';
}

Parent.prototype.sayMsg = function () {
	console.log(this.msg);
};

function Child (name) {
	this.name = name;
	this.msg = '这是一个子元素';
}

Child.prototype = new Parent('PPP');
Child.prototype.constructor = Child;

var xxx = new Child('xxx');


class Supper {
	constructor (name) {
		console.log(new.target.name);
		this.name = name;
		this.msg  = "这是supper";
	}

	sayMsg() {
		console.log(this.msg);
	}
}

class Sub extends Supper {
	constructor (s1, s2){
		super(s1);
		this.name = s2;
	}

	hello() {
		return this.msg;
	}
}
