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
	Search
*/

// clear the search field after key press
var input = document.getElementById('search'); // apply 'input' variable to #search

input.addEventListener('keyup', function(event) // listen for actions on #search
{
	event.preventDefault(); // cancel the default action (if any)
	
	// clear the search field if Enter is pressed
	if (event.keyCode === 13) {
		input.value='';
	}
});