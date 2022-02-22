/*
	Date and Time
*/

updateTime(); // start the function after the website loads
updateDate(); // same as above
setInterval(updateTime, 1000); // repeat this function every 1 second
setInterval(updateDate, 1000); // same as above

function updateTime()
{
	// get time
	let now = new Date();
	let m = now.getMinutes().toString();
	let h = now.getHours().toString();
	
	//conditions
	// if hour is only 1 digit long, put '0' in front of it (8:40 -> 08:40)
	if (h.length === 1) {
		h = '0'+h;
	}
	// if minute is only 1 digit long, put '0' in front of it (08:2 -> 08:02)
	if (m.length === 1) {
		m = '0'+m;
	}
	
	/*
	  for 12 hours am/pm time format enable the code below
	*/
	
	/*var dd = 'am';
	var hh = h;
	
	// conditions
	// if minute is only 1 digit long, put '0' in front of it
	if (m.length === 1) {
		m = '0'+m;
	}
	// use 12 hours am/pm time format
	if (h >= 12) {
		h = hh - 12;
		dd = 'pm';
	}
	if (h == 0) {
		h = 12;
	}*/
	
	/* end 12 hours am/pm */
	
	// output format (for 12 hours am/pm use 'let output = h + ':' + m + ' ' + dd;')
	let output = h + ':' + m;
	
	// use #current-time in the HTML to display the clock
	document.getElementById('current-time').innerHTML = output;
}

function updateDate()
{
	// get date
	let now = new Date();
	let d = now.getDate();
	let m = now.getMonth()+1;
	let y = now.getFullYear();
	
	// output format
	let output = d + '/' + m + '/' + y;
	
	// use #date in the HTML to display the date
	document.getElementById('date').innerHTML = output;
}

/*
	Underscore caret (_) in search field
*/

$("input").on('change blur mouseup focus keydown keyup', function(evt) {
	var $el = $(evt.target);
	
	if (!$el.css("caret-color")) return;
	
	var caretIndex = $el[0].selectionStart;
	var textBeforeCarret = $el.val().substring(0, caretIndex);
	var bgr = getBackgroundStyle($el, textBeforeCarret);
	
	$el.css("background", bgr);
	
	clearInterval(window.blinkInterval);
	window.blinkInterval = setInterval(blink, 1200);
})

// blinking effect
function blink() {
	$("input").each((index, el) => {
		var $el = $(el);

		if ($el.css("background-blend-mode") != "normal") {
			$el.css("background-blend-mode", "normal");
		} else {
			$el.css("background-blend-mode", "color");
		}
	});
}

// canvas & caret properties
function getBackgroundStyle($el, text) {
	var fontSize = $el.css("font-size");
	var fontFamily = $el.css("font-family");
	var font = fontSize + " " + fontFamily;
	var canvas = $el.data("carretCanvas");
	
	if (canvas == null) {
		canvas = document.createElement("canvas");
		$el.data("carretCanvas", canvas);
		
		var ctx = canvas.getContext("2d");
		
		ctx.font = font;
		ctx.strokeStyle = $el.css("color");
		ctx.lineWidth = Math.ceil(parseInt(fontSize) / 5);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(parseInt(fontSize) / 1.5, 0);
		ctx.stroke();
	}
	var offsetLeft = canvas.getContext("2d").measureText(text).width + parseInt($el.css("padding-left"));
	return "rgb(7, 29, 34) url(" + canvas.toDataURL() + ") no-repeat " +
	(offsetLeft - $el.scrollLeft()) + "px " +
	($el.height() + parseInt($el.css("padding-top"))) + "px";
}