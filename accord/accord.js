function accord() {
	var accords = document.querySelectorAll("[accord]");
	/* Creating styles */
	var style = document.createElement("style");
	style.type = "text/css";
	style.rel = "stylesheet";
	style.innerHTML = '.accord-wrapper * { font-family: sans-serif; color: #333; } .accord-clearfix:after, .accord-clearfix:before{ display: table; content: " "; clear: both; } .accord-arrow { display: inline-block; border: 2px solid #333; width: 0; height: 0; padding: 3px; border-top: none; border-left: none; transform: rotate(45deg); margin-right: 10px; } .accord-arrow.accord-opened { transform: rotate(-135deg); } .accord-wrapper { border: 1px solid #ddd; border-radius: 2px; } .accord-body p { margin: 0px; padding: 10px; } .accord-header { padding: 5px 0px; text-align: right; background: #f1f1f1; border-bottom: 1px solid #ddd; cursor: pointer; } .accord-body { height: 0px; overflow: hidden; transition: .5s; } .accord-heading { width: 90%; display: inline-block; float: left; padding-left: 10px; text-align: left; font-weight: bold; font-size: large; } .accord-no-select, .accord-no-select * { user-select: none; }';
	document.head.appendChild(style);

	for (var i = 0; i < accords.length; i++) {
		var text = accords[i].innerText;
		/* Creating structure */
		var wrapper = document.createElement("div");
		wrapper.classList.add("accord-wrapper");
		if (accords[i].getAttribute("accord-id") != null) {
			wrapper.id = accords[i].getAttribute("accord-id");
		}
		if (accords[i].getAttribute("accord-class") != null) {
			var classes = accords[i].getAttribute("accord-class").split(" ");
			for (var x = 0; x < classes.length; x++) {
				wrapper.classList.add(classes[x]);
			}
		}


		var header = document.createElement("div");
		header.classList.add("accord-header");

		if (accords[i].getAttribute("accord-title") != null) {
			var heading = document.createElement("div");
			heading.classList.add("accord-heading");
			heading.innerText = accords[i].getAttribute("accord-title");
			header.appendChild(heading);
		}

		var arrow = document.createElement("div");
		arrow.classList.add("accord-arrow");
		header.appendChild(arrow);

		var clearfix = document.createElement("div");
		clearfix.classList.add("accord-clearfix");
		header.appendChild(clearfix);

		var body = document.createElement("div");
		body.classList.add("accord-body");

		var p = document.createElement("p");
		p.innerText = text;

		body.appendChild(p);

		wrapper.appendChild(header);
		wrapper.appendChild(body);

		accords[i].outerHTML = wrapper.outerHTML;

	}
	var accord_headers = document.querySelectorAll("div.accord-header");
	for (var i = 0; i < accord_headers.length; i++) {
		accord_headers[i].onclick = function (e) {
			var accord_arrow = this.querySelector(".accord-arrow");
			if (accord_arrow.classList.contains("accord-opened")) {
				accord_arrow.classList.remove("accord-opened");
				this.nextElementSibling.style.height = "0px";
			} else {
				accord_arrow.classList.add("accord-opened");
				var height = this.nextElementSibling.querySelector("p").clientHeight;
				this.nextElementSibling.style.height = height + "px";
			}
		}
	}
}
accord();