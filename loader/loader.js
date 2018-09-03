var loader = {
  time: new Date().getTime(),
  init: function(){
    var time = this.time;
    var loader_wrap = document.createElement('div');
    loader_wrap.id = 'loader-wrap-' + time;
    loader_wrap.className = 'loader-js';
    var cont = document.createElement('div');
    cont.className = 'loader-container';
    var loader = document.createElement('div');
    loader.className = 'actual-loader';
    loader.className += ' loader-spin';
    cont.appendChild(loader);
    loader_wrap.appendChild(cont);
    document.body.prepend(loader_wrap);
    document.addEventListener('DOMContentLoaded', function(){
      document.querySelector("#loader-wrap-" + time).style.display = 'none';
    });
  }
}