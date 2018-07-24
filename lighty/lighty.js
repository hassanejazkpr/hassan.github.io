var lighty = {
    init: function(className, prop){
        var imgs = document.querySelectorAll(className);
        var descs = document.querySelectorAll(className + "-desc");
        var wrapper = document.createElement("div");
        wrapper.id = className.replace(".", "") + '-wrapper';
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
        for(var i = 0; i < imgs.length; i++){
            imgs[i].setAttribute("target-img", className.replace(".", "") + "-image-" + i);
            var img = document.createElement("img");
            if(imgs[i].getAttribute('lighty-img-src') !== null){
                img.src = imgs[i].getAttribute('lighty-img-src');
            }else{
                img.src = imgs[i].src;
            }
            img.style.userSelect = "none";
            var lighty_container = document.createElement("div");
            lighty_container.classList.add("lighty-container");
            if(typeof prop !== "undefined" && typeof prop[i] !== "undefined"){
                for(var key in prop[i]['container']){
                    lighty_container.style[key] = prop[i]['container'][key];
                }
            }
            if(typeof prop !== "undefined" && typeof prop[i] !== "undefined"){
                for(var key in prop[i]['image']){
                    img.style[key] = prop[i]['image'][key];
                }
            }
            lighty_container.appendChild(img);
            lighty_container.setAttribute("target", className.replace(".", "") + "-image-" + i);
            var lighty_caption = document.createElement("div");
            lighty_caption.classList.add("lighty-caption");
            if(typeof prop !== "undefined" && typeof prop[i] !== "undefined"){
                for(var key in prop[i]['description']){
                    lighty_caption.style[key] = prop[i]['description'][key];
                }
            }
            if(typeof prop !== "undefined" && typeof prop['all'] !== "undefined"){
                for(var key in prop['all']['container']){
                    lighty_container.style[key] = prop['all']['container'][key];
                }
                for(var key in prop['all']['image']){
                    img.style[key] = prop['all']['image'][key];
                }
                for(var key in prop['all']['description']){
                    lighty_caption.style[key] = prop['all']['description'][key];
                }
            }
            if(typeof descs[i] !== "undefined") {
                descs[i].style.display = "none";
                lighty_caption.innerHTML = descs[i].innerHTML;
            }else{
                lighty_caption.innerHTML = "";
            }
            lighty_container.appendChild(lighty_caption);
            wrapper.appendChild(lighty_container);
            imgs[i].onclick = function(){
                var target_img = this.getAttribute("target-img");
                var wrapper_ele = document.querySelector("#" + wrapper.id);
				wrapper_ele.classList.add("active");
                var wrapper_imgs = wrapper_ele.querySelectorAll(".lighty-container");
                for(var j = 0; j < wrapper_imgs.length; j++){
                    if(wrapper_imgs[j].getAttribute("target") === this.getAttribute("target-img")){
                        wrapper_imgs[j].classList.add('active');
                    }else{
                        wrapper_imgs[j].classList.remove('active');
                    }
                }
                wrapper.querySelector(".lighty-next-btn").style.display = "block";
                wrapper.querySelector(".lighty-prev-btn").style.display = "block";
                var wrap_img_new = wrapper.querySelector(".lighty-container.active");
                if((wrap_img_new.nextElementSibling && !wrap_img_new.nextElementSibling.classList.contains("lighty-container")) || wrap_img_new.nextElementSibling === null){
                    wrapper.querySelector(".lighty-next-btn").style.display = "none";
                }
                if((wrap_img_new.previousElementSibling && !wrap_img_new.previousElementSibling.classList.contains("lighty-container")) || wrap_img_new.previousElementSibling === null){
                    wrapper.querySelector(".lighty-prev-btn").style.display = "none";
                }
            }
        }
        wrapper.querySelector(".lighty-close-btn").onclick = function(){
            var all_wraps = document.querySelectorAll(".lighty-wrapper");
            for(var x = 0; x < all_wraps.length; x++){
                all_wraps[x].classList.remove("active");
            }
        }
        window.onkeyup = function(e){
            if(e.which === 27){
                wrapper.querySelector(".lighty-close-btn").click();
            }else if(e.which === 39 && document.querySelector('.lighty-wrapper.active')){
				if(document.querySelector('.lighty-wrapper.active .lighty-next-btn').style.display !== 'none'){
					document.querySelector('.lighty-wrapper.active .lighty-next-btn').click();
				}
			}else if(e.which === 37 && document.querySelector('.lighty-wrapper.active')){
				if(document.querySelector('.lighty-wrapper.active .lighty-prev-btn').style.display !== 'none'){
					document.querySelector('.lighty-wrapper.active .lighty-prev-btn').click();
				}
			}
        }                    
        wrapper.querySelector(".lighty-next-btn").onclick = function(){
            var wrap_img = wrapper.querySelector(".lighty-container.active");
            if(wrap_img.nextElementSibling !== null && wrap_img.nextElementSibling.classList.contains("lighty-container")){
                wrap_img.classList.remove("active");
                wrap_img.nextElementSibling.classList.add("active");
                wrap_img.nextElementSibling.classList.add("active");
            }
            wrapper.querySelector(".lighty-next-btn").style.display = "block";
            wrapper.querySelector(".lighty-prev-btn").style.display = "block";
            var wrap_img_new = wrapper.querySelector(".lighty-container.active");
            if((wrap_img_new.nextElementSibling && !wrap_img_new.nextElementSibling.classList.contains("lighty-container")) || wrap_img_new.nextElementSibling === null){
                this.style.display = "none";
            }
        }
        wrapper.querySelector(".lighty-prev-btn").onclick = function(){
            var wrap_img = wrapper.querySelector(".lighty-container.active");
            if(wrap_img.previousElementSibling !== null && wrap_img.previousElementSibling.classList.contains("lighty-container")){
                wrap_img.classList.remove("active");
                wrap_img.previousElementSibling.classList.add("active");
            }
            wrapper.querySelector(".lighty-next-btn").style.display = "block";
            wrapper.querySelector(".lighty-prev-btn").style.display = "block";
            var wrap_img_new = wrapper.querySelector(".lighty-container.active");
            if((wrap_img_new.previousElementSibling && !wrap_img_new.previousElementSibling.classList.contains("lighty-container")) || wrap_img_new.previousElementSibling === null){
                this.style.display = "none";
            }
        }
        document.body.appendChild(wrapper);
    },
    check: function() {
        alert("I'm working fine! :)");
    }
}