function drawley() {
    var $ = function(selector, all = false) {
        return all ? document.querySelectorAll(selector) : document.querySelector(selector);
    }

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerText = '.drawley-wrapper-active { position: absolute; z-index: 998; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); margin: 0; padding: 0; top: 0; left: 0; } #drawley-section { padding-left: 0px; transition: 0.4s; } .drawer-opened { width: 200px !important; } .section-compressed { padding-left: 200px !important; } #drawley-wrapper, #drawley-drawer { overflow: hidden; transition: 0.4s; } #drawley-drawer { background: #000; position: absolute; height: 100%; width: 0px; top: 0px; left: 0px; z-index: 999; } #drawley-wrapper ul { list-style-type: none; margin: 0; padding: 0; } #drawley-wrapper ul li a { text-align: center; color: #a2a2a2; display: block; text-decoration: none; padding: 10px 20px; transition: .4s; } #drawley-wrapper a:hover { color: #fff; background: #333; }';
    document.head.appendChild(style);


    var drawley_items = $("ul#drawley li", true);
    var trigger_btn = $("#drawley-trigger");

    var drawley_html = '<div id="drawley-wrapper"> <div id="drawley-drawer"> <div id="drawley-body"> <ul>';
    for (var i = 0; i < drawley_items.length; i++) {
        drawley_html += drawley_items[i].outerHTML;
    }
    drawley_html += '</ul> </div> </div> </div>';
    $("ul#drawley").outerHTML = drawley_html;


    var drawerOpened = false;
    trigger_btn.onclick = function(e) {
        if (this.getAttribute("attr-active") == null || this.getAttribute("attr-active") == "false") {
            openDrawer(this);
        } else {
            closeDrawer(this);
        }
    }

    var closeDrawer = function(triggerEle) {
        $("#drawley-drawer").classList.remove("drawer-opened");
        $("#drawley-section").classList.remove("section-compressed");
        triggerEle.setAttribute("attr-active", false);
        drawerOpened = false;
    }

    var openDrawer = function(triggerEle) {
        $("#drawley-drawer").classList.add("drawer-opened");
        $("#drawley-section").classList.add("section-compressed");
        triggerEle.setAttribute("attr-active", true);
        drawerOpened = true;
    }

    document.onclick = function(e) {
        if (e.target.tagName.toUpperCase() == "HTML" || e.target.tagName.toUpperCase() == "BODY") {
            closeDrawer(trigger_btn);
        }
    }
}
drawley();