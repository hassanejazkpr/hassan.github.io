	var style = document.createElement("style");
	style.innerText = "div.btn-holder{background:#e1e1e1;position:relative;display:inline-block;width:60px;height:35px;}span.effect{position:absolute;top:0px;left:0px;background:#2098d1;width:100%;height:0%;transition:.4s;}.hoverable{background:transparent;outline:none;border:none;position:absolute;top:0px;left:0px;width:100%;height:100%;color:#000000;transition:.4s;cursor:pointer;text-align:center;vertical-align:middle;line-height:35px;padding:0;margin: 0;}.hoverable-active{color: #FFFFFF;}";
	document.head.appendChild(style);
	btn_ele = document.querySelectorAll("[hoverable]");
	if(btn_ele.length > 0){
		for(var i = 0; i < btn_ele.length; i++){
			btn_eles = btn_ele[i];
			var div = document.createElement("div");
			if(btn_eles.getAttribute("hoverable-id") !== null){
				div.setAttribute("id", btn_eles.getAttribute("hoverable-id"));
				btn_eles.removeAttribute("hoverable-id");
			}
			div.setAttribute("class", "btn-holder");
			if(btn_eles.getAttribute("hoverable-class") !== null){
				var classes = btn_eles.getAttribute("hoverable-class").split(" ");
				for(var i = 0; i < classes.length; i++){
					div.classList.add(classes[i]);
				}
				btn_eles.removeAttribute("hoverable-class");
			}
			var span = document.createElement("span");
			span.setAttribute("class", "effect");
			var button = btn_eles.cloneNode(true);
			if(btn_eles.getAttribute("class") !== null){
				button.classList.add("hoverable");
			}else{
				button.setAttribute("class", "hoverable");
			}
			button.setAttribute("attr-hoverable", true);
			div.appendChild(span);
			div.appendChild(button);
			btn_eles.outerHTML = div.outerHTML;
			var hoverables = document.querySelectorAll("[attr-hoverable]");
			hoverables.forEach(function(ele) {
				ele.addEventListener("mouseover", function() {
					ele.classList.add("hoverable-active");
					var sp = ele.previousSibling;
					sp.style.height = "100%";
				});
				ele.addEventListener("mouseout", function() {
					ele.classList.remove("hoverable-active");
					var sp = ele.previousSibling;
					sp.style.height = "0%";
				});
			});
		}
	}
