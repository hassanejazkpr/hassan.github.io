var j = 0;
var div = document.getElementsByClassName("text-area")[0];
var points = document.getElementById("points");
var missed = document.getElementById("missed");
var combo = document.getElementById("combo");
var comb = 0;
var pon = 0;
var mis = 0;
var startTimer = false;
var won = false;
document.addEventListener("keypress", function(e){
	e.preventDefault();
	var text = div.innerText.trim();
	var char = String.fromCharCode(e.which);
	for(var i = j; i < div.innerText.length; i++){
		if(char == text.charAt(j)){
			j++;
			pon++;
			comb++;
			points.innerText = pon;
			var founded = text.substr(0, j);
			combo.innerText = comb;
			founded = text.replace(founded, "<m>" + founded + "</m>");
			div.innerHTML = founded;
			if(startTimer == false){
				startTimerF();
			}
			break;
		}else{
			if(j != 0){
				comb = 0;
				combo.innerText = "0";
				mis++;
				missed.innerText = mis;
				break;
			}
		}
	}
	if(div.innerText.length == j){
		if(won == false){
			alert("Congratulations, you won!");
			clearInterval(interval);
		}
		won = true;
	}
});
function startTimerF(){
	var minutes = document.getElementById("m");
	var seconds = document.getElementById("s");
	startTimer = true;
	window.s = 0;
	window.m = 0;
	window.interval = setInterval(function(){
		if(s <= 58){
			s++;
			if(s.toString().length == 1){
				seconds.innerText = "0" + s;
			}else{
				seconds.innerText = s;
			}
		}else{
			s = 0;
			seconds.innerText = "0" + s;
			m++;
			if(m.toString().length == 1){
				minutes.innerText = "0" + m;
			}else{
				minutes.innerText = m;
			}
		}
	}, 1000);
}
document.getElementsByTagName("textarea")[0].addEventListener("keypress", function(e){
	e.stopPropagation();
});
function change_text()
{
	var text = document.getElementsByTagName("textarea")[0].value.trim();
	if(text != ""){
		document.getElementsByClassName("text-area")[0].innerText = text;
		document.getElementsByTagName("textarea")[0].value = "";
		document.getElementById("points").innerText = "0";
		document.getElementById("s").innerText = "00";
		document.getElementById("m").innerText = "00";
		document.getElementById("missed").innerText = "0";
		document.getElementById("combo").innerText = "0";
		j = 0;
		mis = 0;
		pon = 0;
		s = 0;
		m = 0;
		comb = 0;
		if(typeof(interval) != "undefined"){
			clearInterval(interval);
		}
		startTimer = false;
		won = false;
		document.getElementsByClassName("show-btn")[0].setAttribute("attr-status", "shown");
		document.getElementsByClassName("show-btn")[0].click();
	}
}
var hide_btn = document.getElementsByClassName("show-btn")[0];
var target_div = document.getElementsByClassName("new-text-wrapper")[0];
var collapse_status = document.getElementsByClassName("collapse-status")[0];
hide_btn.addEventListener("click", function(e){
	if(this.getAttribute("attr-status") == "hidden"){
		this.setAttribute("attr-status", "shown");
		this.innerText = "Hide";
		target_div.classList.add("acc-opened");
		collapse_status.innerText = "-";
	}else{
		target_div.classList.remove("acc-opened");
		collapse_status.innerText = "+";
		this.setAttribute("attr-status", "hidden");
		this.innerText = "Show";
	}
});