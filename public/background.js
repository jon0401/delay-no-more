var siteHost;
var accessTime;
var onBlacklist = false;
var bufferExceeded = false;

var blacklist = "www.facebook.com"; //test

function currentSite(){
 	chrome.tabs.query({"active":true , "currentWindow": true}, function(tabs){

	    if (siteHost == tabs[0].url.split("/")[2]){
	    	console.log("same site");

	    }else{
		    console.log("new site");
	 	    siteHost = tabs[0].url.split("/")[2];
	    	accessTime = new Date();

	 	    if (siteHost == blacklist){
	 	    	console.log("Entered blacklisted website");
 		   		onBlacklist = true;
 	   			blacklistNotification();
 	   			bufferCountDown();
	  		}else{
    			onBlacklist = false;
  			}
	    }
  	})
}

function blacklistNotification(){
	var opt = {
  		type: "basic",
  		title: "Blacklist Notification",
  		message: "You are on a blacklisted website.\nExit before the buffer ends.",
  		iconUrl: "DLNM.png"
 	}	
	chrome.notifications.create(opt, function() {});
}

function bufferCountDown(){
	console.log("Buffer countdown start");
	var now = new Date().getTime();
	var bufferEnd = now + 1000*60*10;	//10 min buffer time

	var a = setInterval(function(){

		now = new Date().getTime();

		var timeleft = bufferEnd - now;
	    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    	var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    	if (onBlacklist == false){
    		console.log("Exited blacklisted site before buffer exceeded");
    		clearInterval(a);
    	}
		
		if (timeleft < 0){		//buffer exceeded -> penalty
			console.log("Buffer exceeded");
			bufferExceeded = true;
			clearInterval(a);
			bufferEndNotification();
		}

	}, 1000);
}

function bufferEndNotification(){
	var opt = {
  		type: "basic",
  		title: "Buffer End Notification",
  		message: "Buffer time exceeded...",
  		iconUrl: "DLNM.png"
 	}	
	chrome.notifications.create(opt, function() {});
}

function blacklistTimer(){

}

$(document).ready(
	function(){

		currentSite();

		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
			currentSite();

		});

		//tab change
		chrome.tabs.onActivated.addListener(function(activeInfo) {
			currentSite();

		}); 	

	}
);
