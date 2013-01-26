$(document).bind("ready", function(){
	
	// basic usage
	$("#input-1, #input-2, #textarea-1").maxlength();
	
	// custom counter container
	$("#textarea-2").maxlength({
		counterContainer: $(".counter-container")
	});
	
	// custom counter container and text
	$("#input-3").maxlength({
		counterContainer: $(".counter-container"),
		text: 'Input 3: You have written <b>%length</b> characters, <b>%maxlength</b> are allowed, you have <b><u>%left</u> left</b>.'
	});
	
	// subscribe to the "update.maxlength" event
	$("input, textarea").bind("update.maxlength", function(event, element, lastLength, length, maxLength, left){
		console.log(event, element, lastLength, length, maxLength, left);
	});
	
});