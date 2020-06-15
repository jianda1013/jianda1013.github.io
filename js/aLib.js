//window.bVer = parseInt(navigator.appVersion);
//window.bName = navigator.appName.toLowerCase();
window.agent = navigator.userAgent.toLowerCase();
//Windows Edge
//mozilla/5.0 (windows nt 10.0;win64; x64) applewebkit/537.36(khtml, like gecko) chrome/42.0.2311.135 safari/537.36
//IE11
//mozilla/5.0 (windows nt 6.3;wow64; trident/7.0; .net4.0e; .net4.0c; rv:11.0) like gecko
window.browser = {
	version: (agent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
	ie: /msie/.test(agent) && !/opera/.test(agent),
	ie6: /msie 6.0/.test(agent),
	ie7: /msie 7.0/.test(agent),
	ie8: /msie 8.0/.test(agent),
	ie9: /msie 9.0/.test(agent),
	ie10: /msie 10.0/.test(agent),
	edge: /windows nt 10.0/.test(agent),
	safari: /webkit/.test(agent),
	opera: /opera/.test(agent),
	mozilla: /mozilla/.test(agent) && !/(compatible|webkit)/.test(agent),
	firefox2: /firefox\/2/.test(agent),
	firefox3: /firefox\/3/.test(agent),
	ns9: /navigator\/9/.test(agent),
	flock: /flock/.test(agent),
	chrome: /chrome/.test(agent) && !/safari/.test(agent),
	android: /anfdroid/.test(agent),
	ios: /ios/.test(agent),
	mobile: /android/.test(agent) || /ios/.test(agent)
};
window.isIE = /trident/.test(agent) || browser.ie;
window.isNS = !browser.ie;
window.isGecko = /gecko/.test(agent) && !/webkit/.test(agent);
window.isWebkit = /applewebkit/.test(agent);
window.bHeight = window.document.documentElement.clientHeight || window.innerHeight;
window.bWidth = window.document.documentElement.clientWidth || window.innerWidth;
/*******************************************************************
CSS Transform support detected
*******************************************************************/
function CSSSupportDetect() {
	var div = document.createElement('div');
	div.setAttribute('style', 'transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;-o-transition:top 1s ease;');
	document.body.appendChild(div);
	var cssTransitionsSupported = !!(div.style.transform || div.style.WebkitTransform || div.style.MozTransform || div.style.OTransform);
	div.parentNode.removeChild(div);
	div = null;
	return cssTransitionsSupported;
}
/*******************************************************************
window.$
ref. http://www.vbforums.com/archive/index.php/t-478634.html
*******************************************************************/
var __methods = {
	version: 0.2,
	//Return Property
	Height: function() {
		comment = '取得物件含 margin, padding, border 高度';
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
	//Return Property
	height: function() {
		comment = '取得物件含 margin, padding, border 高度';
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
	Width: function() {
		comment = '取得物件含 margin, padding, border 寬度';
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
	width: function() {
		comment = '取得物件含 margin, padding, border 寬度';
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
		//this.style.WebkitTransform='rotateX('+x+'deg) rotateY('+y+'deg) rotateZ('+z+'deg)';
		//this.style.MozTransform='rotateX('+x+'deg) rotateY('+y+'deg) rotateZ('+z+'deg)';
		//this.style.transform='rotateX('+x+'deg) rotateY('+y+'deg) rotateZ('+z+'deg)';
		this.style.WebkitTransform = 'rotate' + d1 + '(' + r1 + 'deg) rotate' + d2 + '(' + r2 + 'deg) rotate' + d3 + '(' + r3 + 'deg)';
		this.style.MozTransform = 'rotate' + d1 + '(' + r1 + 'deg) rotate' + d2 + '(' + r2 + 'deg) rotate' + d3 + '(' + r3 + 'deg)';
		this.style.transform = 'rotate' + d1 + '(' + r1 + 'deg) rotate' + d2 + '(' + r2 + 'deg) rotate' + d3 + '(' + r3 + 'deg)';
		return this;
	},
	version: 0.1
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
		//if (/#/.test(node)){
		//	obj=document.querySelector(node);
		//	return obj;
		//}else if (/./.test(node)){
		//	obj=document.querySelectorAll(node);
		//	if (obj.length==0){
		//		return false;
		//	}
		//	if (obj.length==1){
		//		obj=document.querySelector(node);
		//	}
		//	return obj;
		//}else{
		//	alert('bing12');
		//	obj=document.querySelectorAll(node);
		//	if (obj.length==1){
		//		obj=document.querySelector(node);
		//	}
		//	if (obj.length==0){
		//		obj=document.querySelector('#'+node);
		//	}
		//	return obj;
		//}
		node = obj;
	}
	if (node != null && !node.test) {
		//自訂 property 'test'=true, 如果物件已經存在, 且已繼承屬性方法, 就不再多此一舉
		//IE 不支援對 prototype object 的自訂方法及屬性, 所以只好針對宣告成 document.getElementById 的物件加上自定的方法和屬性
		//這種方式,當頁面中大量使用這些物件語法時, 一個 $(layer) 就要跑一遍, IE 會累死
		//所以測一下是不是已經存在且處理過, 才決定要不要宣告自訂的方法及屬性
		//以下作法可行 8/29 09'
		if (!window.Element) {
			__addMethod(node, __methods, false);
		}
	}
	return node;
};

function __addMethod(elm, obj, overwrite) {
	for (var key in obj) {
		//eval(elm+'.'+key+'='+obj[key]);
		if (overwrite) {
			elm[key] = obj[key];
		} else {
			if (typeof elm[key] == 'undefined') {
				elm[key] = obj[key];
			}
		}
	}
}
if (window.Element) {
	__addMethod(Element.prototype, __methods);
	__addMethod(NodeList.prototype, __methods);
}
/*******************************************************************
Number prototype
*******************************************************************/
if (!Number.prototype.NTdollar) {
	Number.prototype.NTdollar = function() {
		return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
}
if (!String.prototype.NTdollar) {
	String.prototype.NTdollar = function() {
		return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
}
/*******************************************************************
Add some function to NodeList Object
*******************************************************************/
//__addMethod(NodeList.prototype,__methods);	//data type return by querySelector & querySelectorALl
//NodeList.prototype.css=__methods.css;
//NodeList.prototype.addClass=__methods.addClass;
//NodeList.prototype.removeClass=__methods.removeClass;
/*******************************************************************
Pure CSS Loading
*******************************************************************/
document.write('<div id="loading" class="overlay" onclick="$(this).hide();">\
  <div class="spinner center">\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
    <div class="spinner-blade"></div>\
  </div>\
</div>');
/*******************************************************************
xml to json
http://goessner.net/
*******************************************************************/
function xmltojson(xml) {
	var jsonText = xml2json(xml, '	');
	eval('var json_root=' + jsonText);
	return json_root.root;
}
/*******************************************************************
Ajax
*******************************************************************/
var __xmldoc_method = {
	xmlTest: '1.0',
	getTagValue: function(tag) {
		//var xml=this.responseXML.getElementsByTagName(tag);
		var xml = (this.responseXML) ? this.responseXML.getElementsByTagName(tag) : this.getElementsByTagName(tag);
		if (xml.length == 0) {
			return false;
		}
		if (xml.length == 1) {
			return xml[0].childNodes[0].nodeValue;
		}
		if (xml.length > 1) {
			var na = [];
			for (var i = 0; i < xml.length; i++) {
				na.push(xml[i].childNodes[0].nodeValue);
			}
			return na;
		}
		//return xml.length;
	}
}
if (document.documentElement) {
	// __xmldoc_method 中的 method 基本上對 xmldoc 都適用
	// xmldoc 棣屬在 Doxument 物件下，千萬別加在 Object 下(Object 物件強烈建議不要增加方法)
	// 但在 __xmldoc_method 中有一項 getNodeName, 雖然是用在解析 XMLDOM 時用, 不過用來解析的內容,除了可能是 xmldoc 外, 也可能是由 document.getElementsByTagName 來的, 這部份屬 Element
	__addMethod(Element.prototype, __xmldoc_method);
	if (!isIE) {
		__addMethod(Document.prototype, __xmldoc_method, false);
	}
}
Ajax = function(args) {
	this.funName = arguments.callee.name;
	this.createXHR = function() {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (!xmlhttp) {
			return false;
		} else {
			return xmlhttp;
		}
	};
	this.getFormValue = function(form) {
		var str = '',
			ft, fv;
		for (var i = 0; i < form.elements.length; i++) {
			fv = form.elements[i];
			if (typeof fv.name != 'undefined') {
				ft = fv.type.toLowerCase();
				switch (ft) {
					case 'select-one':
						str += fv.name + '=' + encodeURIComponent(fv.value) + '&';
						break;
					case 'radio':
						if (fv.checked) {
							str += fv.name + '=' + encodeURIComponent(fv.value) + '&';
						}
						break;
					case 'checkbox':
						if (fv.checked) {
							str += fv.name + '=' + encodeURIComponent(fv.value) + '&';
						}
						break;
					case 'text':
						str += fv.name + '=' + encodeURIComponent(fv.value) + '&';
						break;
					case 'password':
						str += fv.name + '=' + encodeURIComponent(fv.value) + '&';
						break;
					case 'hidden':
						str += fv.name + '=' + encodeURIComponent(fv.value) + '&';
						break;
					case 'textarea':
						str += fv.name + '=' + encodeURIComponent(fv.value) + '&';
						break;
					default:
						str += fv.name + '=' + encodeURIComponent(fv.value) + '&';
						break;
				}
			}
		}
		//加符號自動被代成空白，編碼再送出
		//上面原用 escape 改成 encodeURIComponent
		//escape 對 ＋ 沒用
		//if (str.indexOf('+')!=-1){
		//	str=str.replace(/\+/ig,'%2B');
		//}
		return str.split(/\s/).join('')
	};
	if (typeof args.method == 'undifined') {
		args.method = 'get';
	}
	this.url = args.url;
	this.method = (args.method || args.type).toLowerCase();
	this.form = args.form;
	this.xmlhttp = this.createXHR();
	var o = this;
	this.xmlhttp.open(this.method, this.url, true);
	this.xmlhttp.onreadystatechange = function() {
		if (o.xmlhttp.readyState == 4) {
			if (o.xmlhttp.status == 200) {
				args.success(o.xmlhttp, o.form);
			} else {
				if (typeof args.error != 'undefined') {
					args.error(o.xmlhttp, o.form);
				} else {
					console.info('aLib Default error ajax message:', o.xmlhttp.responseText);
				}
			}
		}
	};
	if (this.method == 'get') {
		this.xmlhttp.send(null);
	};
	if (this.method == 'post') {
		this.xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		if (typeof args.postData != 'undefined' && args.postData != '') {
			if (typeof this.form != 'undefined') {
				this.xmlhttp.send(args.postData + '&' + this.getFormValue(this.form));
			} else {
				this.xmlhttp.send(args.postData);
			}
		} else {
			if (typeof this.form != 'undefined') {
				this.xmlhttp.send(this.getFormValue(this.form));
			}
		}
	};
	if (this.method == 'post_user') {
		this.xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		this.xmlhttp.send(args.postData);
	};
	this.xmlhttp.reportError = function(funName) {
		clearMask();
		//msgBox('<div>AJAX:['+funName+']</div><div>status:'+this.status+'</div>Detail:<div>'+this.responseText+'</div>',false);
		msgBox('<div>程式執行時發生某些錯誤<br/>已自動將錯誤訊息傳送到開發單位</div><div><br/>Runtime error!<br/> Error message had send to developer automatically.</div>', false, 'middle');
	};
	this.xmlhttp.tojson = function() {
		var jsonText = xml2json(this.responseXML, '	');
		eval('var json_root=' + jsonText);
		return json_root.root;
	};
	this.xmlhttp.initForm = function() {
		var str = '',
			ft, fv;
		for (var i = 0; i < o.form.elements.length; i++) {
			fv = o.form.elements[i];
			if (typeof fv.name != 'undefined') {
				ft = fv.type.toLowerCase();
				if (fv.getAttribute('data-noinit') != '1') {
					switch (ft) {
						case 'select-one':
							fv.selectedIndex = 0;
							break;
						case 'checkbox':
						case 'radio':
							fv.checked = false;
							break;
						case 'text':
						case 'hidden':
						case 'hnumber':
						case 'date':
						case 'color':
						case 'textarea':
							fv.value = '';
						default:
							break;
					}
				}
			}
		}
	};
	this.xmlhttp.restoreFormValue = function(xmlNode) {
		if (typeof xmlNode == 'undefined') {
			var json = this.tojson();
		} else {
			var json = this.tojson()[xmlNode];
		}
		/*
		restoreFormValue 偵測每個欄位名稱
		回傳的 xml tag 和欄位名稱同時，將值填入表單
		如果以 PosterMIS 訂單/報價單來說
		表單欄位名稱加上數字區隔
		設計的 clone 功能，或預設按鈕(例如施工,運費)，xml 裡是沒有編號的
		pointer 就是表單中欄位編號
		如此，xml 裡可以不用為 tag 加上編號
		*/
		for (j in json) {
			try {
				if (typeof o.form[j] == 'object') {
					fv = o.form[j];
					//if (typeof fv.type=='undefined' || fv.type=='undefined' || fv.type==null){
					//	if (fv.length){
					//		a=fv[0].type;
					//	}else{
					//		a='radio-checkbox';
					//	}
					//}else{
					//	ft=fv.type.toLowerCase();
					//	a=ft;
					//}
					a = (typeof fv.type != 'undefined') ? fv.type : fv[0].type;
					//a=fv.type;
					//av=fv.value||fv[0].value;
					switch (a) {
						case 'select-one':
							//增加值的比對, 計價方式的值和文字不同 6/14 08'
							for (var k = 0; k < fv.length; k++) {
								if (fv.options[k].value == json[j]) {
									fv.selectedIndex = k;
									break;
								}
							}
							break;
							//增加 radio 比對 6/14 08'
						case 'radio-checkbox':
						case 'checkbox':
							for (var k = 0; k < fv.length; k++) {
								if (json[j].indexOf(fv[k].value) != -1) {
									fv[k].checked = true;
									//break;
								}
							}
						case 'radio':
							for (var k = 0; k < fv.length; k++) {
								if (json[j].indexOf(fv[k].value) != -1) {
									fv[k].checked = true;
									break;
								}
							}
							break;
						case 'text':
						case 'number':
						case 'email':
							fv.value = unescape(json[j]);
							break;
						default:
							fv.value = unescape(json[j]);
							break;
					}
				}
			} catch (err) {}
		}
		return this.xmlhttp;
	};
	this.xmlhttp.getTagValue = __xmldoc_method.getTagValue;
}
/*******************************************************************

*******************************************************************/
function getFormXML(form) {
	var str = '',
		ft, fv;
	for (var i = 0; i < form.elements.length; i++) {
		fv = form.elements[i];
		if (typeof fv.name != 'undefined') {
			ft = fv.type.toLowerCase();
			switch (ft) {
				case 'select-one':
					str += '<' + fv.name + '><![CDATA[' + fv.value + ']]></' + fv.name + '>';
					break;
				case 'radio':
					if (fv.checked) {
						str += '<' + fv.name + '><![CDATA[' + fv.value + ']]></' + fv.name + '>';
					}
					break;
				case 'checkbox':
					if (fv.checked) {
						str += '<' + fv.name + '><![CDATA[' + fv.value + ']]></' + fv.name + '>';
					}
					break;
				case 'text':
					str += '<' + fv.name + '><![CDATA[' + fv.value + ']]></' + fv.name + '>';
					break;
				case 'password':
					str += '<' + fv.name + '><![CDATA[' + fv.value + ']]></' + fv.name + '>';
					break;
				case 'hidden':
					str += '<' + fv.name + '><![CDATA[' + fv.value + ']]></' + fv.name + '>';
					break;
				case 'textarea':
					str += '<' + fv.name + '><![CDATA[' + fv.value + ']]></' + fv.name + '>';
					break;
				default:
					str += '<' + fv.name + '><![CDATA[' + fv.value + ']]></' + fv.name + '>';
					break;
			}
		}
	}
	return str;
}

function getFormValue(form) {
	var str = '',
		ft, fv;
	for (var i = 0; i < form.elements.length; i++) {
		fv = form.elements[i];
		if (typeof fv.name != 'undefined') {
			ft = fv.type.toLowerCase();
			switch (ft) {
				case 'select-one':
					str += fv.name + '=' + escape(fv.value) + '&';
					break;
				case 'radio':
					if (fv.checked) {
						str += fv.name + '=' + escape(fv.value) + '&';
					}
					break;
				case 'checkbox':
					if (fv.checked) {
						str += fv.name + '=' + escape(fv.value) + '&';
					}
					break;
				case 'text':
					str += fv.name + '=' + escape(fv.value) + '&';
					break;
				case 'password':
					str += fv.name + '=' + escape(fv.value) + '&';
					break;
				case 'hidden':
					str += fv.name + '=' + escape(fv.value) + '&';
					break;
				case 'textarea':
					str += fv.name + '=' + escape(fv.value) + '&';
					break;
				default:
					str += fv.name + '=' + escape(fv.value) + '&';
					break;
			}
		}
	}
	if (str.indexOf('+') != -1) {
		str = str.replace(/\+/ig, '%2B');
	}
	return str.split(/\s/).join('')
}

function restoreFormValue(form, xml) {
	var json = xmltojson(xml);
	/*
	restoreFormValue 偵測每個欄位名稱
	回傳的 xml tag 和欄位名稱同時，將值填入表單
	如果以 PosterMIS 訂單/報價單來說
	表單欄位名稱加上數字區隔
	設計的 clone 功能，或預設按鈕(例如施工,運費)，xml 裡是沒有編號的
	pointer 就是表單中欄位編號
	如此，xml 裡可以不用為 tag 加上編號
	*/
	for (j in json) {
		try {
			if (typeof form[j] == 'object') {
				fv = form[j];
				if (typeof fv.type == 'undefined' || fv.type == 'undefined' || fv.type == null) {
					a = 'radio-checkbox';
				} else {
					ft = fv.type.toLowerCase();
					a = ft;
				}
				switch (a) {
					case 'select-one':
						//增加值的比對, 計價方式的值和文字不同 6/14 08'
						for (var k = 0; k < fv.length; k++) {
							if (fv.options[k].value == json[j]) {
								fv.selectedIndex = k;
								break;
							}
						}
						break;
					case 'checkbox':
						if (json[j]) {
							a.checked = true;
						}
						break;
						//增加 radio 比對 6/14 08'
					case 'radio-checkbox':
						for (var k = 0; k < fv.length; k++) {
							if (fv[k].value == json[j]) {
								fv[k].checked = true;
								break;
							}
						}
					default:
						fv.value = unescape(json[j]);
						break;
				}
			}
		} catch (err) {}
	}
}

function ajaxRestoreForm(form, xmlURL, callBack) {
	new Ajax({
		url: xmlURL,
		method: 'get',
		form: form,
		success: function(xmlhttp, form) {
			xmlhttp.initForm();
			xmlhttp.restoreFormValue();
			//restoreFormValue(data.form,xmlhttp.responseXML);
			if (callBack) {
				callBack(xmlhttp);
			}
		},
		error: function(xmlhttp, form) {
			//console.info(xmlhttp.responseText);
		}
	});
}
/*******************************************************************
Alert
	Alert window will be removed after 1 second after delay time automatically.


	msg: HTML format or plain text
	style: if you wanna style your own Alter window, try to send this
		   parameter, format is an object {}
		   ex.
		   {'height':'320px','border':'#F8F8F8 10px solid'}
	delay: msg box show time, default is 3 sec
*******************************************************************/
Alert = function(msg, style, delay) {
	/*
	delay(sec)
	*/
	var div = document.createElement('div');
	div.innerHTML = msg;
	div.style['border'] = '#f8f8f8 1px solid';
	div.style['background'] = '#FFF';
	div.style['position'] = 'fixed';
	div.style['z-index'] = '12000';
	div.style['padding'] = '16px 24px';
	div.style['width'] = '320px';
	div.style['top'] = '100px';
	div.style['text-align'] = 'center';
	div.style['font-size'] = '15px';
	div.style['box-shadow'] = '0 0 12px rgba(0,0,0,0.1) inset, 3px 3px 12px rgba(0,0,0,0.3)';
	//div.style['']='';
	if (typeof style !== 'undefined') {
		for (c in style) {
			div.style[c] = style[c];
		}
	}
	//這些要壓過使用者設定
	div.style['left'] = (bWidth - parseInt(div.style.width, 10)) / 2 + 'px';
	div.style['box-sizing'] = 'border-box';
	var body = document.querySelector('body');
	body.appendChild(div);
	delay = (typeof delay == 'undefined') ? 3000 : delay * 1000;
	setTimeout(function() {
		div.style['opacity'] = 0;
		setTimeout(function() {
			body.removeChild(div);
		}, 1000);
	}, delay);
	//要顯示在畫面上，才有高度
	div.style['top'] = (bHeight - (div.clientHeight || div.offsetHeight)) / 2 + 'px';
}
/*******************************************************************
 *******************************************************************/
function hello() {
	alert('hello');
}

function here() {
	alert('here');
}

function wait(str) {
	alert('wait');
}