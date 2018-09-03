var lighty = {
    init: function(class_name, prop) {
        var self = this;
        var imgs = document.querySelectorAll(class_name);
        var descs = document.querySelectorAll(class_name + "-desc");
        var wrapper = document.createElement("div");
        class_name = class_name.split(" ");
        class_name = class_name[class_name.length - 1];
        wrapper.id = class_name.replace(".", "") + '-wrapper';
        wrapper.classList.add("lighty-wrapper");
        var close_btn = document.createElement("div");
        close_btn.innerHTML = "<p>&times;</p>";
        close_btn.classList.add("lighty-close-btn");
        wrapper.appendChild(close_btn);
        var next_btn = document.createElement("div");
        next_btn.classList.add("lighty-next-btn");
        next_btn.innerHTML = "<div></div>";
        wrapper.appendChild(next_btn);
        var prev_btn = document.createElement("div");
        prev_btn.classList.add("lighty-prev-btn");
        prev_btn.innerHTML = "<div></div>";
        wrapper.appendChild(prev_btn);
        var navs = document.createElement('div');
        navs.className = 'lighty-navs';
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].setAttribute("target", class_name.replace(".", "") + "-image-" + (i + 1));
            var img = document.createElement("img");
            if (imgs[i].getAttribute('lighty-img-src') !== null) {
                img.src = imgs[i].getAttribute('lighty-img-src');
            } else {
                img.src = imgs[i].src;
            }
            var lighty_container = document.createElement("div");
            lighty_container.classList.add("lighty-container");
            if (typeof prop !== "undefined" && typeof prop[i + 1] !== "undefined") {
                for (var key in prop[i + 1]['container']) {
                    lighty_container.style[key] = prop[i + 1]['container'][key];
                }
            }
            if (typeof prop !== "undefined" && typeof prop[i + 1] !== "undefined") {
                for (var key in prop[i + 1]['image']) {
                    img.style[key] = prop[i + 1]['image'][key];
                }
            }
            lighty_container.appendChild(img);
            lighty_container.setAttribute("target-img", class_name.replace(".", "") + "-image-" + (i + 1));
            var lighty_caption = document.createElement("div");
            lighty_caption.classList.add("lighty-caption");
            if (typeof prop !== "undefined" && typeof prop[i + 1] !== "undefined") {
                for (var key in prop[i + 1]['description']) {
                    lighty_caption.style[key] = prop[i + 1]['description'][key];
                }
            }
            if (typeof prop !== "undefined" && typeof prop['all'] !== "undefined") {
                for (var key in prop['all']['container']) {
                    lighty_container.style[key] = prop['all']['container'][key];
                }
                for (var key in prop['all']['image']) {
                    img.style[key] = prop['all']['image'][key];
                }
                for (var key in prop['all']['description']) {
                    lighty_caption.style[key] = prop['all']['description'][key];
                }
            }
            if (typeof descs[i] !== "undefined") {
                descs[i].style.display = "none";
                lighty_caption.innerHTML = descs[i].innerHTML;
            } else {
                lighty_caption.innerHTML = "";
            }
            lighty_container.appendChild(lighty_caption);
            var nav = document.createElement('span');
            nav.className = 'nav';
            nav.innerHTML = '<span>'+(i + 1)+'</span>';
            nav.setAttribute('data-nav-for-target', class_name.replace(".", "") + "-image-" + (i + 1));
            navs.appendChild(nav);
            wrapper.appendChild(lighty_container);
            wrapper.appendChild(navs);
            /* When User Clicks On Image */
            imgs[i].onclick = function() {
                var target_img = this.getAttribute("target");
                wrapper.querySelector('.lighty-navs .nav[data-nav-for-target="' + target_img + '"]').classList.add('active');
                var wrapper_ele = document.querySelector("#" + wrapper.id);
                wrapper_ele.classList.add("active");
                var wrapper_imgs = wrapper_ele.querySelectorAll(".lighty-container");
                for (var j = 0; j < wrapper_imgs.length; j++) {
                    if (wrapper_imgs[j].getAttribute("target-img") === this.getAttribute("target")) {
                        wrapper_imgs[j].classList.add('active');
                    } else {
                        wrapper_imgs[j].classList.remove('active');
                    }
                }
                wrapper.querySelector(".lighty-next-btn").style.display = "block";
                wrapper.querySelector(".lighty-prev-btn").style.display = "block";
                var wrap_img_new = wrapper.querySelector(".lighty-container.active");
                if ((wrap_img_new.nextElementSibling && !wrap_img_new.nextElementSibling.classList.contains("lighty-container")) || wrap_img_new.nextElementSibling === null) {
                    wrapper.querySelector(".lighty-next-btn").style.display = "none";
                }
                if ((wrap_img_new.previousElementSibling && !wrap_img_new.previousElementSibling.classList.contains("lighty-container")) || wrap_img_new.previousElementSibling === null) {
                    wrapper.querySelector(".lighty-prev-btn").style.display = "none";
                }
                if (self.onOpenFunc) {
					setTimeout(function(){
						self.onOpenFunc();
					},850);
                }
            }
        }
        /* Close The Lightbox */
        wrapper.querySelector(".lighty-close-btn").onclick = function() {
            var active_wrap = document.querySelector(".lighty-wrapper.active");
			active_wrap.style.animation = 'lightyFadeOut 0.8s';
			setTimeout(function(){
				active_wrap.classList.remove("active");
				var active_nav = active_wrap.querySelector('.lighty-navs .nav.active');
				active_nav.classList.remove('active');
				active_wrap.style.animation = 'lightyFadeIn 0.8s';
			},799);
			if (self.onCloseFunc) {
				setTimeout(function(){
					self.onCloseFunc();
				},850);
			}
        }
        /* Adding Keyboard Keys */
        window.onkeyup = function(e) {
            if (e.which === 27) {
                wrapper.querySelector(".lighty-close-btn").click();
            } else if (e.which === 39 && document.querySelector('.lighty-wrapper.active')) {
                if (document.querySelector('.lighty-wrapper.active .lighty-next-btn').style.display !== 'none') {
                    document.querySelector('.lighty-wrapper.active .lighty-next-btn').click();
                }
            } else if (e.which === 37 && document.querySelector('.lighty-wrapper.active')) {
                if (document.querySelector('.lighty-wrapper.active .lighty-prev-btn').style.display !== 'none') {
                    document.querySelector('.lighty-wrapper.active .lighty-prev-btn').click();
                }
            }
        }
        /* Show Next Slide */
        wrapper.querySelector(".lighty-next-btn").onclick = function() {
            var wrap_img = wrapper.querySelector(".lighty-container.active");
            if (wrap_img.nextElementSibling !== null && wrap_img.nextElementSibling.classList.contains("lighty-container")) {
                wrap_img.classList.remove("active");
                wrap_img.nextElementSibling.classList.add("active");
                var active_nav = wrapper.querySelector('.lighty-navs .nav.active');
                if (active_nav) {
                    active_nav.classList.remove('active');
                }
                wrapper.querySelector('.lighty-navs .nav[data-nav-for-target="' + wrap_img.nextElementSibling.getAttribute('target-img') + '"]').classList.add('active');
            }
            wrapper.querySelector(".lighty-next-btn").style.display = "block";
            wrapper.querySelector(".lighty-prev-btn").style.display = "block";
            var wrap_img_new = wrapper.querySelector(".lighty-container.active");
            if ((wrap_img_new.nextElementSibling && !wrap_img_new.nextElementSibling.classList.contains("lighty-container")) || wrap_img_new.nextElementSibling === null) {
                this.style.display = "none";
            }
        }
        /* Show Previous Slide */
        wrapper.querySelector(".lighty-prev-btn").onclick = function() {
            var wrap_img = wrapper.querySelector(".lighty-container.active");
            if (wrap_img.previousElementSibling !== null && wrap_img.previousElementSibling.classList.contains("lighty-container")) {
                wrap_img.classList.remove("active");
                wrap_img.previousElementSibling.classList.add("active");
                var active_nav = wrapper.querySelector('.lighty-navs .nav.active');
                if (active_nav) {
                    active_nav.classList.remove('active');
                }
                wrapper.querySelector('.lighty-navs .nav[data-nav-for-target="' + wrap_img.previousElementSibling.getAttribute('target-img') + '"]').classList.add('active');
            }
            wrapper.querySelector(".lighty-next-btn").style.display = "block";
            wrapper.querySelector(".lighty-prev-btn").style.display = "block";
            var wrap_img_new = wrapper.querySelector(".lighty-container.active");
            if ((wrap_img_new.previousElementSibling && !wrap_img_new.previousElementSibling.classList.contains("lighty-container")) || wrap_img_new.previousElementSibling === null) {
                this.style.display = "none";
            }
        }
        if (typeof prop !== "undefined" && typeof prop['navigations'] !== "undefined") {
            for (var key in prop['navigations']) {
                if (typeof prop['navigations'][key] !== 'object') {
                    navs.style[key] = prop['navigations'][key];
                }
            }
            var sub_nav = navs.querySelectorAll('.nav');
            for (var key in prop['navigations']) {
                if (sub_nav[key]) {
                    for (var k in prop['navigations'][key]) {
                        sub_nav[key - 1].style[k] = prop['navigations'][key][k];
                    }
                }
            }
            for (var key in prop['navigations']['all']) {
                for (var i = 0; i < sub_nav.length; i++) {
                    sub_nav[i].style[key] = prop['navigations']['all'][key];
                }
            }
        }
        /* Showing Target Images When User Click On Nav */
        var target_navs = wrapper.querySelectorAll('[data-nav-for-target]');
        for (var i = 0; i < target_navs.length; i++) {
            target_navs[i].onclick = function() {
                var target = this.getAttribute('data-nav-for-target');
                var active_nav = wrapper.querySelector('.lighty-navs .nav.active');
                if (active_nav) {
                    active_nav.classList.remove('active');
                }
                this.classList.add('active');
                wrapper.querySelector('.lighty-container.active').classList.remove('active');
                wrapper.querySelector('[target-img="' + target + '"]').classList.add('active');
                wrapper.querySelector(".lighty-next-btn").style.display = "block";
                wrapper.querySelector(".lighty-prev-btn").style.display = "block";
                var wrap_img_new = wrapper.querySelector(".lighty-container.active");
                if ((wrap_img_new.nextElementSibling && !wrap_img_new.nextElementSibling.classList.contains("lighty-container")) || wrap_img_new.nextElementSibling === null) {
                    wrapper.querySelector(".lighty-next-btn").style.display = "none";
                } else if ((wrap_img_new.previousElementSibling && !wrap_img_new.previousElementSibling.classList.contains("lighty-container")) || wrap_img_new.previousElementSibling === null) {
                    wrapper.querySelector(".lighty-prev-btn").style.display = "none";
                }
            }
        }
        document.body.appendChild(wrapper);
        return this;
    },
    onOpen: function(userFunc) {
        this['onOpenFunc'] = userFunc;
        return this;
    },
    onClose: function(userFunc) {
        this['onCloseFunc'] = userFunc;
        return this;
    },
}


var ls = function(selector) {
	this.onOpenFunc = '';
	this.onCloseFunc = '';
	var self = this;
	this.lighty = function(prop){
		var class_name = selector;
		var imgs = document.querySelectorAll(class_name);
        var descs = document.querySelectorAll(class_name + "-desc");
        var wrapper = document.createElement("div");
        class_name = class_name.split(" ");
        class_name = class_name[class_name.length - 1];
        wrapper.id = class_name.replace(".", "") + '-wrapper';
        wrapper.classList.add("lighty-wrapper");
        var close_btn = document.createElement("div");
        close_btn.innerHTML = "<p>&times;</p>";
        close_btn.classList.add("lighty-close-btn");
        wrapper.appendChild(close_btn);
        var next_btn = document.createElement("div");
        next_btn.classList.add("lighty-next-btn");
        next_btn.innerHTML = "<div></div>";
        wrapper.appendChild(next_btn);
        var prev_btn = document.createElement("div");
        prev_btn.classList.add("lighty-prev-btn");
        prev_btn.innerHTML = "<div></div>";
        wrapper.appendChild(prev_btn);
        var navs = document.createElement('div');
        navs.className = 'lighty-navs';
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].setAttribute("target", class_name.replace(".", "") + "-image-" + (i + 1));
            var img = document.createElement("img");
            if (imgs[i].getAttribute('lighty-img-src') !== null) {
                img.src = imgs[i].getAttribute('lighty-img-src');
            } else {
                img.src = imgs[i].src;
            }
            var lighty_container = document.createElement("div");
            lighty_container.classList.add("lighty-container");
            if (typeof prop !== "undefined" && typeof prop[i + 1] !== "undefined") {
                for (var key in prop[i + 1]['container']) {
                    lighty_container.style[key] = prop[i + 1]['container'][key];
                }
            }
            if (typeof prop !== "undefined" && typeof prop[i + 1] !== "undefined") {
                for (var key in prop[i + 1]['image']) {
                    img.style[key] = prop[i + 1]['image'][key];
                }
            }
            lighty_container.appendChild(img);
            lighty_container.setAttribute("target-img", class_name.replace(".", "") + "-image-" + (i + 1));
            var lighty_caption = document.createElement("div");
            lighty_caption.classList.add("lighty-caption");
            if (typeof prop !== "undefined" && typeof prop[i + 1] !== "undefined") {
                for (var key in prop[i + 1]['description']) {
                    lighty_caption.style[key] = prop[i + 1]['description'][key];
                }
            }
            if (typeof prop !== "undefined" && typeof prop['all'] !== "undefined") {
                for (var key in prop['all']['container']) {
                    lighty_container.style[key] = prop['all']['container'][key];
                }
                for (var key in prop['all']['image']) {
                    img.style[key] = prop['all']['image'][key];
                }
                for (var key in prop['all']['description']) {
                    lighty_caption.style[key] = prop['all']['description'][key];
                }
            }
            if (typeof descs[i] !== "undefined") {
                descs[i].style.display = "none";
                lighty_caption.innerHTML = descs[i].innerHTML;
            } else {
                lighty_caption.innerHTML = "";
            }
            lighty_container.appendChild(lighty_caption);
            var nav = document.createElement('span');
            nav.className = 'nav';
            nav.innerHTML = '<span>'+(i + 1)+'</span>';
            nav.setAttribute('data-nav-for-target', class_name.replace(".", "") + "-image-" + (i + 1));
            navs.appendChild(nav);
            wrapper.appendChild(lighty_container);
            wrapper.appendChild(navs);
            /* When User Clicks On Image */
            imgs[i].onclick = function() {
                var target_img = this.getAttribute("target");
                wrapper.querySelector('.lighty-navs .nav[data-nav-for-target="' + target_img + '"]').classList.add('active');
                var wrapper_ele = document.querySelector("#" + wrapper.id);
                wrapper_ele.classList.add("active");
                var wrapper_imgs = wrapper_ele.querySelectorAll(".lighty-container");
                for (var j = 0; j < wrapper_imgs.length; j++) {
                    if (wrapper_imgs[j].getAttribute("target-img") === this.getAttribute("target")) {
                        wrapper_imgs[j].classList.add('active');
                    } else {
                        wrapper_imgs[j].classList.remove('active');
                    }
                }
                wrapper.querySelector(".lighty-next-btn").style.display = "block";
                wrapper.querySelector(".lighty-prev-btn").style.display = "block";
                var wrap_img_new = wrapper.querySelector(".lighty-container.active");
                if ((wrap_img_new.nextElementSibling && !wrap_img_new.nextElementSibling.classList.contains("lighty-container")) || wrap_img_new.nextElementSibling === null) {
                    wrapper.querySelector(".lighty-next-btn").style.display = "none";
                }
                if ((wrap_img_new.previousElementSibling && !wrap_img_new.previousElementSibling.classList.contains("lighty-container")) || wrap_img_new.previousElementSibling === null) {
                    wrapper.querySelector(".lighty-prev-btn").style.display = "none";
                }
                if (self.onOpenFunc) {
					setTimeout(function(){
						self.onOpenFunc();
					},850);
                }
            }
        }
        /* Close The Lightbox */
        wrapper.querySelector(".lighty-close-btn").onclick = function() {
            var active_wrap = document.querySelector(".lighty-wrapper.active");
			active_wrap.style.animation = 'lightyFadeOut 0.8s';
			setTimeout(function(){
				active_wrap.classList.remove("active");
				var active_nav = active_wrap.querySelector('.lighty-navs .nav.active');
				active_nav.classList.remove('active');
				active_wrap.style.animation = 'lightyFadeIn 0.8s';
			},799);
			if (self.onCloseFunc) {
				setTimeout(function(){
					self.onCloseFunc();
				},850);
			}
        }
        /* Adding Keyboard Keys */
        window.onkeyup = function(e) {
            if (e.which === 27) {
                wrapper.querySelector(".lighty-close-btn").click();
            } else if (e.which === 39 && document.querySelector('.lighty-wrapper.active')) {
                if (document.querySelector('.lighty-wrapper.active .lighty-next-btn').style.display !== 'none') {
                    document.querySelector('.lighty-wrapper.active .lighty-next-btn').click();
                }
            } else if (e.which === 37 && document.querySelector('.lighty-wrapper.active')) {
                if (document.querySelector('.lighty-wrapper.active .lighty-prev-btn').style.display !== 'none') {
                    document.querySelector('.lighty-wrapper.active .lighty-prev-btn').click();
                }
            }
        }
        /* Show Next Slide */
        wrapper.querySelector(".lighty-next-btn").onclick = function() {
            var wrap_img = wrapper.querySelector(".lighty-container.active");
            if (wrap_img.nextElementSibling !== null && wrap_img.nextElementSibling.classList.contains("lighty-container")) {
                wrap_img.classList.remove("active");
                wrap_img.nextElementSibling.classList.add("active");
                var active_nav = wrapper.querySelector('.lighty-navs .nav.active');
                if (active_nav) {
                    active_nav.classList.remove('active');
                }
                wrapper.querySelector('.lighty-navs .nav[data-nav-for-target="' + wrap_img.nextElementSibling.getAttribute('target-img') + '"]').classList.add('active');
            }
            wrapper.querySelector(".lighty-next-btn").style.display = "block";
            wrapper.querySelector(".lighty-prev-btn").style.display = "block";
            var wrap_img_new = wrapper.querySelector(".lighty-container.active");
            if ((wrap_img_new.nextElementSibling && !wrap_img_new.nextElementSibling.classList.contains("lighty-container")) || wrap_img_new.nextElementSibling === null) {
                this.style.display = "none";
            }
        }
        /* Show Previous Slide */
        wrapper.querySelector(".lighty-prev-btn").onclick = function() {
            var wrap_img = wrapper.querySelector(".lighty-container.active");
            if (wrap_img.previousElementSibling !== null && wrap_img.previousElementSibling.classList.contains("lighty-container")) {
                wrap_img.classList.remove("active");
                wrap_img.previousElementSibling.classList.add("active");
                var active_nav = wrapper.querySelector('.lighty-navs .nav.active');
                if (active_nav) {
                    active_nav.classList.remove('active');
                }
                wrapper.querySelector('.lighty-navs .nav[data-nav-for-target="' + wrap_img.previousElementSibling.getAttribute('target-img') + '"]').classList.add('active');
            }
            wrapper.querySelector(".lighty-next-btn").style.display = "block";
            wrapper.querySelector(".lighty-prev-btn").style.display = "block";
            var wrap_img_new = wrapper.querySelector(".lighty-container.active");
            if ((wrap_img_new.previousElementSibling && !wrap_img_new.previousElementSibling.classList.contains("lighty-container")) || wrap_img_new.previousElementSibling === null) {
                this.style.display = "none";
            }
        }
        if (typeof prop !== "undefined" && typeof prop['navigations'] !== "undefined") {
            for (var key in prop['navigations']) {
                if (typeof prop['navigations'][key] !== 'object') {
                    navs.style[key] = prop['navigations'][key];
                }
            }
            var sub_nav = navs.querySelectorAll('.nav');
            for (var key in prop['navigations']) {
                if (sub_nav[key]) {
                    for (var k in prop['navigations'][key]) {
                        sub_nav[key - 1].style[k] = prop['navigations'][key][k];
                    }
                }
            }
            for (var key in prop['navigations']['all']) {
                for (var i = 0; i < sub_nav.length; i++) {
                    sub_nav[i].style[key] = prop['navigations']['all'][key];
                }
            }
        }
        /* Showing Target Images When User Click On Nav */
        var target_navs = wrapper.querySelectorAll('[data-nav-for-target]');
        for (var i = 0; i < target_navs.length; i++) {
            target_navs[i].onclick = function() {
                var target = this.getAttribute('data-nav-for-target');
                var active_nav = wrapper.querySelector('.lighty-navs .nav.active');
                if (active_nav) {
                    active_nav.classList.remove('active');
                }
                this.classList.add('active');
                wrapper.querySelector('.lighty-container.active').classList.remove('active');
                wrapper.querySelector('[target-img="' + target + '"]').classList.add('active');
                wrapper.querySelector(".lighty-next-btn").style.display = "block";
                wrapper.querySelector(".lighty-prev-btn").style.display = "block";
                var wrap_img_new = wrapper.querySelector(".lighty-container.active");
                if ((wrap_img_new.nextElementSibling && !wrap_img_new.nextElementSibling.classList.contains("lighty-container")) || wrap_img_new.nextElementSibling === null) {
                    wrapper.querySelector(".lighty-next-btn").style.display = "none";
                } else if ((wrap_img_new.previousElementSibling && !wrap_img_new.previousElementSibling.classList.contains("lighty-container")) || wrap_img_new.previousElementSibling === null) {
                    wrapper.querySelector(".lighty-prev-btn").style.display = "none";
                }
            }
        }
        document.body.appendChild(wrapper);
        return self;
    }
	this.onOpen = function(userFunc) {
		this.onOpenFunc = userFunc;
        return this;
    }
    this.onClose = function(userFunc) {
        this.onCloseFunc = userFunc;
        return this;
    }
	return this;
}