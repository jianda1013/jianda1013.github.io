window.agent = navigator.userAgent.toLowerCase();

window.bHeight = window.document.documentElement.clientHeight || window.innerHeight;
window.bWidth = window.document.documentElement.clientWidth || window.innerWidth;


var __methods = {
	height: function() {
		var dis = this.style.display;
		var vis = this.style.visibility;
		var h;
		this.style.display = 'block';
		this.style.visibility = 'visible';
		if (!isNaN(this.offsetHeight)) {
			h = this.offsetHeight;
		} else {
			h = this.clientHeight;
		}
		this.style.display = dis;
		this.style.visibility = vis;
		return h;
	},
	width: function() {
		var dis = this.style.display;
		var vis = this.style.visibility;
		var w;
		this.style.display = 'block';
		this.style.visibility = 'visible';
		if (!isNaN(this.offsetWidth)) {
			w = this.offsetWidth;
		} else {
			w = this.clientWidth;
		}
		this.style.display = dis;
		this.style.visibility = vis;
		return w;
	},
	show: function() {
		var dis = this.getAttribute('data-dis-backup');
		var op = this.getAttribute('data-opacity-backup');
		this.setAttribute('data-dis-backup', dis);
		this.setAttribute('data-opacity-backup', op);
		if (dis == '' || dis == null) {
			this.style.display = 'block';
		} else {
			this.style.display = dis;
		}
		if (op == '' || op == null) {
			this.style.opacity = 1;
		} else {
			this.style.opacity = op;
		}
		return this;
	},
	hide: function() {
		var op = this.style.opacity;
		this.setAttribute('data-opacity-backup', op);
		this.style.opacity = 0;
		var dis = this.style.display;
		this.setAttribute('data-dis-backup', dis);
		var o = this;
		setTimeout(function() {
			o.style.display = 'none';
		}, 1000)
		return this;
	},
	attr: function(n, v) {
		if (typeof n == 'undefined' || n == '') {
			return this;
		}
		if (typeof n != 'undefined' && v == 'undefined') {
			if (this.length) {
				return this;
			} else {
				return this.getAttribute(n);
			}
		}
		if (typeof n != 'undefined' && v != 'undefined') {
			if (this.length) {
				[].forEach.call(this, function(el) {
					el.setAttribute(n, v);
				});
				return this;
			} else {
				this.setAttribute(n, v);
				return this;
			}
		}
	},
	css: function(para, feedback) {
		if (typeof para != 'object') {
			alert('css:parameter error');
		} else {
			for (c in para) {
				if (this.length) {
					[].forEach.call(this, function(el) {
						el.style[c] = para[c];
					});
				} else {
					this.style[c] = para[c];
				}
			}
		}
		if (feedback) {
			feedback();
		}
		return this;
	},
	addClass: function(c) {
		this.setClass('add', c);
		return this;
	},
	removeClass: function(c) {
		this.setClass('remove', c);
		return this;
	},
	toggleClass: function(c) {
		this.setClass('toggle', c);
		return this;
	},
	setClass: function(method, c) {
		var ca = c.split(',');
		if (this.length) {
			[].forEach.call(this, function(el) {
				for (var i = 0; i < ca.length; i++) {
					el.classList[method](ca[i]);
				}
			});
		} else {
			for (var i = 0; i < ca.length; i++) {
				this.classList[method](ca[i])
			}
		}
		return this;
	},
	html: function(html) {
		this.innerHTML = html;
		return this;
	},
	load: function(source, feedback) {
		this.show();
		this.style.opacity = 1;
		var o = this;
		new Ajax({
			url: source + '?ts=' + new Date().getTime(),
			method: 'get',
			success: function(xmlhttp) {
				var js = [];
				var html = xmlhttp.responseText;
				var div = document.createElement('div');
				div.innerHTML = html;
				o.innerHTML = html;
				var script = o.getElementsByTagName('script');
				if (script.length > 0) {
					//console.info(script['item']);
					for (var i = 0; i < script.length; i++) {
						eval(script[i].innerHTML);
						js[i] = document.createElement('script');
						js[i].setAttribute('type', 'text/javascript');
						js[i].innerHTML = script[i].innerHTML;
						document.querySelector('head').appendChild(js[i]);
						o.removeChild(script[i]);
					}
				}
				if (feedback) {
					feedback();
				}
			},
			error: function(xmlhttp) {
				alert('load document error');
				console.info(xmlhttp.responseText);
			}
		});
		return o;
	},
	offset: function() {
		var dis = this.style.display;
		this.style.display = '';
		var oDiv = this;
		var oTop = oDiv.offsetTop;
		var oLeft = oDiv.offsetLeft;
		while (oDiv.offsetParent) {
			oDiv = oDiv.offsetParent;
			oTop += oDiv.offsetTop;
			oLeft += oDiv.offsetLeft;
		}
		this.style.display = dis;
		return {
			'left': oLeft,
			'top': oTop
		};
	},
	on: function(evtName, callBack) {
		var o = this;
		try {
			o.addEventListener(evtName, function() {
				setTimeout(callBack, 0);
			});
		} catch (e) {}
		[].forEach.call(o, function(el) {
			el.addEventListener(evtName, function() {
				setTimeout(callBack, 0);
			});
		})
		return this;
	},
	rotate: function(direct, degree) {
		this.style.WebkitTransform = 'rotate' + direct + '(' + degree + 'deg)';
		this.style.MozTransform = 'rotate' + direct + '(' + degree + 'deg)';
		this.style.transform = 'rotate' + direct + '(' + degree + 'deg)';
		return this;
	},
	rotateXYZ: function(d1, r1, d2, r2, d3, r3) {
		this.style.WebkitTransform = 'rotate' + d1 + '(' + r1 + 'deg) rotate' + d2 + '(' + r2 + 'deg) rotate' + d3 + '(' + r3 + 'deg)';
		this.style.MozTransform = 'rotate' + d1 + '(' + r1 + 'deg) rotate' + d2 + '(' + r2 + 'deg) rotate' + d3 + '(' + r3 + 'deg)';
		this.style.transform = 'rotate' + d1 + '(' + r1 + 'deg) rotate' + d2 + '(' + r2 + 'deg) rotate' + d3 + '(' + r3 + 'deg)';
		return this;
	}
}
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
