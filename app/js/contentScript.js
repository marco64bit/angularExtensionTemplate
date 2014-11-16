console.log("contentScript.js");

var container = document.createElement("div")
var header = document.createElement("header")
var close = document.createElement("span")
var iframe = document.createElement("iframe")

container.setAttribute("id", "APP_PREFIX_CLASS_CONTAINER")

iframe.setAttribute("src", chrome.extension.getURL("app/index.html"))
iframe.setAttribute("width", "100%")
iframe.setAttribute("height", "100%")

header.appendChild(close)

container.appendChild(header)
container.appendChild(iframe)

function init() {
	close.onclick = function() {
		if(container.style.height != "0px"){
			container.style.height = "0px";
		}else {
			container.style.height = "460px";
		}
	}
}

var ready = setInterval(function(){
	if(document.getElementsByTagName("body").length > 0){
		document.getElementsByTagName("body")[0].appendChild(container)
		init();
		clearInterval(ready)
	}
},500)