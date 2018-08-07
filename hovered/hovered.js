window.onload = function(){
  var hoverables = document.querySelectorAll('[data-hover]');
  for(var i = 0; i < hoverables.length; i++){
    hoverables[i].onmouseover = function(){
      var targetAttr = this.getAttribute('data-hover');
      this.classList.add('hovered');
      var targets = document.querySelectorAll(targetAttr);
      for(var z = 0; z < targets.length; z++){
        targets[z].classList.add('target');
        targets[z].classList.add('hovered');
      }
    };
    hoverables[i].onmouseout = function(){
      var targetAttr = this.getAttribute('data-hover');
      this.classList.remove('hovered');
      var targets = document.querySelectorAll(targetAttr);
      for(var z = 0; z < targets.length; z++){
        targets[z].classList.remove('target');
        targets[z].classList.remove('hovered');
      }
    };
  }
};