console.log("background.js");

function init() {
	new Notification('Angular loaded notification', {
		icon: 'img/icon.png',
		body: 'Boom baby!'
	});
}

function exampleService(request, successId, errorId) {
	console.log("request: ", request);
	setTimeout(function(){
		successCTS({"utente": "marco" + successId}, successId);
	},3000)
}


function successCTS(response, successId) {
	try {response = JSON.stringify(response)}catch(e){}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {"response": response, "status": "success", "successId": successId})
	})
}

function errorCTS(response, errorId) {
	try {response = JSON.stringify(response)}catch(e){}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {"response": response, "status": "error", "errorId": errorId})
	});
}

init();

var SERVICES = {
	"exampleService": exampleService
}

var sendGesture = function(msg) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msg)
	});
}

chrome.runtime.onConnect.addListener(function(port) {
  	port.onMessage.addListener(function(msg) {
	    if (msg.service && msg.service in SERVICES) {
	     	SERVICES[msg.service](msg.request, msg.successId, msg.errorId);
	    }
	  	if(msg.gesture) {
	  		sendGesture(msg)
	  	}
	});
});