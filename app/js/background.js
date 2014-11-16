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
		success({"utente": "marco" + successId}, successId);
	},3000)
}

function success(response, successId) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {"response": response, "status": "success", "successId": successId})
	})
}

function error(response, errorId) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {"response": response, "status": "error", "errorId": callback})
	});
}


var SERVICES = {
	"exampleService": exampleService
}

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (msg.service && msg.service in SERVICES)
     	SERVICES[msg.service](msg.request, msg.successId, msg.errorId);
 	});
});