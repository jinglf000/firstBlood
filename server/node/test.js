var ToReadable = require('./stream');

const iterator = function (limit) {
	return {
		next: function() {
			if(limit --){
				return {
					done: false,
					value: limit + Math.random()
				}
			}
			return {
				done: true
			}
		}
	}
}(1e10);


