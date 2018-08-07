document.addEventListener("DOMContentLoaded", function(event) {
	var inps = document.querySelectorAll('[data-mask]');
	for(var i = 0; i < inps.length; i++){
	  inps[i].onkeypress = function(e){
		var mask = this.getAttribute('data-mask');
		if(this.value.length < mask.length){
		  var start = this.value.length;
		  var end = this.value.length + 1;
		  //alert(start + '-' + end);
		  var mask_char = mask.substring(start, end);
		  if(mask_char != 'x'){
			this.value += mask_char;
		  }
		}else{
		  e.preventDefault();
		  return false;
		}
	  }
	}
});