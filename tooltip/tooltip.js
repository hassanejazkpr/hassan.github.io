window.onload = function()
{
  var $tooltips = document.querySelectorAll('[data-tooltip]');
  for(var i = 0; i < $tooltips.length; i++){
    var $this = $tooltips[i];
    var $t = document.createElement('span');
    $t.classList.add('tooltip');
    $t.innerText = $this.getAttribute('data-tooltip').trim();
    $this.appendChild($t);
  }
}