window.onload = function(){
    function _mq(selector) {
        this.selector = selector;
    	this.on = function(operator, width, obj){
    		if(operator.trim() == '<'){
    			var style = document.createElement('style');
    			var media = '@media(max-width: ' + width.split("-")[0].trim() + ')';
    			media += "{";
    			media += this.selector + "{";
    			for (var i in obj) {
    				media += i + ": " + obj[i] + ";";
    			}
    			media += "}";
    			media += "}";
    			style.innerText = media;
    			document.head.appendChild(style);
    		}else if(operator.trim() == '>'){
    			var style = document.createElement('style');
    			var media = '@media(min-width: ' + width.split("-")[0].trim() + ')';
    			media += "{";
    			media += this.selector + "{";
    			for (var i in obj) {
    				media += i + ": " + obj[i] + ";";
    			}
    			media += "}";
    			media += "}";
    			style.innerText = media;
    			document.head.appendChild(style);
    		}else if(operator.trim() == '|'){
    			if(width.trim().indexOf('-') > -1){
    				var style = document.createElement('style');
    				var media = '@media(min-width: ' + width.split("-")[0].trim() + ') and (max-width: ' + width.split("-")[1].trim() + ')';
    				media += "{";
    				media += this.selector + "{";
    				for (var i in obj) {
    					media += i + ": " + obj[i] + ";";
    				}
    				media += "}";
    				media += "}";
    				style.innerText = media;
    				document.head.appendChild(style);
    			}
    		}else{
    			console.error("Invalid operator for _mq('"+operator+"', '"+width+"', object). Supported operators are '>', '<', '|'");
    		}
    	}
        return this;
    }
}