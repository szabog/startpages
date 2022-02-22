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
	
	// variables for 12 horus am/pm format
	var dd = 'am';
	var hh = h;
	
	// conditions
	if (m.length === 1) m ='0'+m;
	if (h.length === 1) h = '0'+h;
	
	// use 12 hours am/pm time format
	if (h >= 12) {
		h = hh - 12;
		dd = 'pm';
	}
	if (h == 0) {
		h = 12;
	}
	
	// output format
	let output = h + ':' + m + ' ' + dd;
	
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
	
	// conditions
	if (d.length === 1) d = '0'+d;
	if (m.length === 1) m = '0'+m;
	if (y.length === 1) y = '0'+y;
	
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

/*
	Menu
*/

// accordion effect
$(function()
{
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;
		
		var links = this.el.find('.link');
		
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
	}
	
	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();
			
		$next.slideToggle(600);
		$this.parent().toggleClass('open');
		
		// close the currently open submenu when a new submenu is opened
		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp(600).parent().removeClass('open');
		}
	}
	var accordion = new Accordion($('#accordion'), false);
});

// close the submenu if a link is pressed in it
$(function()
{
	$('.submenu a').on('click', function () {
		$this.next().slideUp(600).parent().removeClass('open');
	});
});

// clicking outside the menu area closes the open submenu
$(document).click(function(event)
{
	if ($('#accordion').is(':visible') && !$(event.target).is('#accordion *, .accordion')) {
		$this.next().slideUp(600).parent().removeClass('open');
	}
});
