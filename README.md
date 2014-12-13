angularExtensionTemplate
========================
Chrome extension template with angular inside

<h3>Content script</h3>

<ul>
<li>injected html box draggable
<ul>
  <li>Jquery 2.0</li>
</ul>
</li>
<li>injected iframe with Angular app inside
<ul>
  <li>Bootstrap 3.0</li>
  <li><strong>Angular PostMEssage service: </strong> allow to ajax requests through the background page with asyncronous callback to Angular app</li>
  <li>Example controller and data binding</li>
</ul>
</li>
</ul>

<h3>Background page</h3>

<ul>
  <li>Message comunication with angular app</li>
  <li>Example desktop notifications</li>
  <li>Example Service for ajax call with callbacks to content script</li>
</ul>

<h3>Popup html </h3>

A simple popup html plain scaffolding example


<h3>Ajax example interaction</h3>
<label>anuglar controller </label>
<pre>
app.controller('MainCtrl',  ["$scope", "PostMessageService", function($scope, PostMessageService) {

	PostMessageService.init("myport"); // comunication port used with background page for message passing

	PostMessageService.action("exampleService", {username: "marco-p", psw: "1234"})
	.done(function(data){
		console.log("SUCCESS service response ", data)
	},
	function(data){
		console.log("ERROR service response ", data)
	});

}]);

</pre>

<label>background page </label>

<pre>
function exampleService(request, successId, errorId) {
	console.log("request: ", request);
	ajaxCallFunction("serverApIUrl", function(){
		success({"utente": "marco" + successId}, successId);
	},
	function(){
	  error({"errorMessage":"resource not found"}, errorId);
	})
}
</pre>

- success and error is 2 function that send to content script the callback<br>
- exampleService is mapped in SERVICES object

<pre>
var SERVICES = {
	"exampleService": exampleService
}
</pre>
and it automatically called when angular app call it by name
<br>
<h3>add a service in background </h3>

create new function with this structure
<pre>
function my_service_name (request, successId, errorId){
  // code here
  //  for success callback
  success(my_result, successId);
  
  // for error callback
  error(my_result, errorId);
}
</pre>

add  "my_service_name" to SERVICES object

<pre>
var SERVICES = {
 my_service_name,
 ...
}
</pre>
