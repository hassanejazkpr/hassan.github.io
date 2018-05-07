var notiWrapper = document.createElement("div");
notiWrapper.id = "noti-wrapper";
notiWrapper.classList.add("noti-bottom-right");
document.addEventListener("DOMContentLoaded", function(){
    document.body.appendChild(notiWrapper);
});

var noti = {
	openAnimation: "bounceIn",
	setOpenAnimation: function (animationName) {
		this.openAnimation = animationName;
	},
	closeAnimation: "fadeOut",
	setCloseAnimation: function (animationName) {
		this.closeAnimation = animationName;
	},
	setAnimations: function (openAnimation, closeAnimation) {
		this.openAnimation = openAnimation;
		this.closeAnimation = closeAnimation;
	},
	theme: "dark",
	setTheme: function (theme) {
		this.theme = theme;
	},
	setDirection: function (dir) {
		dir = dir == "rtl" ? "rtl" : "ltr";
		var wrapper = this._$("#noti-wrapper");
		wrapper.style.direction = dir;
	},
	direction: function (dir) {
		this.setDirection(dir);
	},
	setPosition: function (pos) {
		if (pos == "top-left" || pos == "top-right" || pos == "bottom-left" || pos == "bottom-right") {
			var wrapper = this._$("#noti-wrapper");
			wrapper.classList.remove("noti-top-left");
			wrapper.classList.remove("noti-top-right");
			wrapper.classList.remove("noti-bottom-left");
			wrapper.classList.remove("noti-bottom-right");
			wrapper.classList.add("noti-" + pos);
		} else {
			var wrapper = this._$("#noti-wrapper");
			wrapper.classList.remove("noti-top-left");
			wrapper.classList.remove("noti-top-right");
			wrapper.classList.remove("noti-bottom-left");
			wrapper.classList.remove("noti-bottom-right");
			wrapper.classList.add("noti-bottom-right");
		}
	},
	position: function (pos) {
		this.setPosition(pos);
	},
	_$: function (selector, all = false) {
		return all ? document.querySelectorAll(selector) : document.querySelector(selector);
	},
	createTheme: {
		styles: {
			"color": "#fff",
			"background-color": "#333",
			"border-color": "#000",
			"border-style": "solid",
			"border-width": "1px",
			"text-decoration": "none",
			"font-size": "medium",
			"font-family": "initial",
		},
		themeName: "custom",
		done: function () {
			var style = document.createElement("style");
			style.setAttribute("attr-name", "noti-theme");
			style.type = "text/css";
			var ref = noti.createTheme;
			var html = ".noti-" + ref.themeName + " {";
			for (key in ref.styles) {
				html += key + ": " + ref.styles[key] + "; ";
			}
			html += "}";
			style.innerText = html;
			if (noti._$("[attr-name='noti-theme']")) noti._$("[attr-name='noti-theme']").remove();
			document.head.appendChild(style);
		}
	},
	show: function (text = "This is some dummy notification", theme = null) {
		var div = document.createElement("div");
		div.classList.add("noti-box");
		if (theme != null) {
			div.classList.add("noti-" + theme);
		} else {
			div.classList.add("noti-" + this.theme);
		}
		div.classList.add("animated");
		div.classList.add(this.openAnimation);
		div.innerText = text;
		this._$("#noti-wrapper").appendChild(div);
		div.onclick = function () {
			noti.closeNoti(this, 0);
		}
		this.closeNoti(div, 3000);
	},
	closeAll: function (e) {
		var boxes = this._$(".noti-box", true);
		if (boxes != null) {
			for (var i = 0; i < boxes.length; i++) {
				this.closeNoti(boxes[i], 0);
			}
		}
	},
	closeNoti: function (notiEle, timeoutSec) {
		setTimeout(function () {
			notiEle.classList.remove(noti.openAnimation);
			notiEle.classList.add(noti.closeAnimation);
			setTimeout(function () {
				notiEle.remove();
			}, 500);
		}, timeoutSec);
	}
};

document.addEventListener("DOMContentLoaded", function(){
    var triggers = noti._$("[noti],[attr-noti]", true);
    if (triggers.length > 0) {
    	for (var x = 0; x < triggers.length; x++) {
    		if (triggers[x].getAttribute("data-noti-message") == null) {
    			triggers[x].setAttribute("data-noti-message", "Some Dummy Notification");
    		}
    		var notiMessage = triggers[x].getAttribute("data-noti-message");
    		if (triggers[x].getAttribute("data-noti-theme") == null) {
    			triggers[x].setAttribute("data-noti-theme", "dark");
    		}
    		var notiTheme = triggers[x].getAttribute("data-noti-theme");
    		triggers[x].onclick = function (e) {
    			noti.show(notiMessage, notiTheme);
    		}
    	}
    }
});