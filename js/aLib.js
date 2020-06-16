window.agent = navigator.userAgent.toLowerCase();
window.bHeight = window.document.documentElement.clientHeight || window.innerHeight;
window.bWidth = window.document.documentElement.clientWidth || window.innerWidth;

window.$$ = function(node) {
	return document.querySelector(node);
}
window.$A = function(node) {
	return document.querySelectorAll(node);
}
window.$ = function(node) {
	if (typeof node == 'string') {
		var obj;
		obj = document.querySelectorAll(node);
		if (obj.length == 1) {
			obj = document.querySelector(node);
		}
		node = obj;
	}
	if (node != null && !node.test) {
		if (!window.Element) {
			__addMethod(node, __methods, false);
		}
	}
	return node;
};
