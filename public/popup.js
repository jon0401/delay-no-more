//Just for testing. feel free to delete/modify the content.
$(document).ready(
	function(){

		$('#Host').html("Host: "+ chrome.extension.getBackgroundPage().siteHost);
		$('#AccessTime').html("Access time: "+ chrome.extension.getBackgroundPage().accessTime);

		if (chrome.extension.getBackgroundPage().onBlacklist == true){
			$('#message').html("You are on a blacklisted website");
		}else{

			$('#message').html("You are not on a blacklisted website");

		}
	}
);

