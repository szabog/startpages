/*
	Menu
*/

$(function() {
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

		$next.slideToggle();
		$this.parent().toggleClass('open');
		
		// close the currently open category when a new menu is opened
		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}
	var accordion = new Accordion($('#accordion'), false);
});

// if a click is registered outside of the menu, close open the category
$(document).click(function(event){
   if ($("#accordion").is(":visible") && !$(event.target).is("#accordion *, .accordion")) {
		$this.next().slideUp().parent().removeClass('open');
    }
});

/*
	Date and Time
*/

updateTime();
updateDate();
setInterval(updateTime, 1000);
setInterval(updateDate, 1000);

function updateTime() {
	let now = new Date();
	let m = now.getMinutes().toString();
	let h = now.getHours().toString();
	
	var dd = "am";
	var hh = h;
	
	if (m.length === 1) m = "0"+m;
	if (h.length === 1) h = "0"+h;
	
	// use 12 hours format instead of 24 hours and set am/pm
	if (h >= 12) {
		h = hh - 12;
		dd = "pm";
	}
	if (h == 0) {
		h = 12;
	}

	let output = h + ":" + m + " " + dd;

	document.getElementById("current-time").innerHTML = output;
}

function updateDate() {
	
	let months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "nov", "dec"];

	let now = new Date();
	let d = now.getDate();
	let m = now.getMonth()+1;
	let y = now.getFullYear();
	let w = now.getMonth();

	if (d.length === 1) d = "0"+d;
	if (m.length === 1) m = "0"+m;
	if (y.length === 1) y = "0"+y;
	
	let output = d + " " + months[w] + " " + y;

	document.getElementById("date").innerHTML = output;
}

/*
	Search
*/

var search = document.getElementById("search");
var help = document.getElementById("search-help");
var icon = document.getElementById("search-icon");
var form = document.getElementById("search-form");

// search engines
var commands = [
	{
		command: "",
		label: "DuckDuckGo",
		icon: "fa fa-search",
		url: "https://duckduckgo.com/?q="
	},
	{
		command: "/d",
		label: "DuckDuckGo",
		icon: "fa fa-search",
		url: "https://duckduckgo.com/?q="
	},
	{
		command: "/g",
		label: "Google",
		icon: "fa fa-google",
		url: "https://google.com/search?q="
	},
	{
		command: "/h",
		label: "GitHub",
		icon: "fa fa-github",
		url: "https://github.com/search?q="
	},
	{
		command: "/i",
		label: "IMDb",
		icon: "fa fa-imdb",
		url: "https://imdb.com/find?ref_=nv_sr_fn&q="
	},
	{
		command: "/y",
		label: "YouTube",
		icon: "fa fa-youtube-play",
		url: "https://youtube.com/results?search_query="
	},
];

var command = commands[0];

search.addEventListener("keyup", function(e) {
	var value = search.value;

// search help and search engine selection
	if (value.indexOf("/?") == 0) {
		help.style.opacity = 1;
		help.style["max-height"] = "1000px";
	} else if (e.keyCode == 13 || e.which == 13) {
		if (value.indexOf(".") > 0) {
			window.open(url,'_blank');
		}
	} else if (value[0] == "/" && value[value.length - 1] == " ") {
		value = value.trim();
		for (var i = 0; i < commands.length; i++) {
			if (value == commands[i].command) {
				command = commands[i];
				icon.className = command.icon;
				search.value = "";
				form.setAttribute("action", command.url);
				break;
			}
		}
	}
});

// if the search term is deleted, switch to the default search engine
search.addEventListener("keydown", function(e) {
	var value = search.value;
	var key = e.keyCode || e.which;

	if (key == 0 || key == 229) {
		key = isBackspace(value) ? 8 : 0;
	}

	if (key == 8) {
		if (value == "" && command.icon != commands[0].icon) {
			command = commands[0];
			icon.className = command.icon;
			search.value = "";
			form.setAttribute("action", command.url);
		}
		help.style.opacity = 0;
		help.style["max-height"] = "100px";
	}
});

/* Fix for Android keycode 229 issue */
var prevWord = "";
function isBackspace(val) {
	var bool = val && val.length < prevWord.length;
	prevWord = val;
	return bool;
}

help.innerHTML = "";
for (var i = 0; i < commands.length; i++) {
	var command = commands[i];
	if (command.command.length > 0) {
		help.innerHTML += "<li><span><span class='icon " + command.icon + "'></span><span class='command'>" + command.command + "</span></span></li>";
	}
}

/*
	Weather
*/

var weatherData = {
	city: document.querySelector ("#city"),
	weather: document.querySelector ("#weather"),
	temperature: document.querySelector("#temperature"),
	temperatureValue: 0,
	units: "°C"
};

function roundTemperature(temperature){
	temperature = temperature.toFixed(1);
	return temperature;
}

function getLocationAndWeather(){
	if (window.XMLHttpRequest){
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", function() {
		var response = JSON.parse(xhr.responseText);

		console.log(response);
		var position = {
			latitude: response.latitude,
			longitude: response.longitude
		};
		var cityName = response.city;

		var weatherSimpleDescription = response.weather.simple;
		var weatherDescription = response.weather.description;
		var weatherTemperature = roundTemperature(response.weather.temperature);

		weatherData.temperatureValue = weatherTemperature;

		weatherData.city.innerHTML = cityName;
		weatherData.weather.innerHTML =  weatherDescription;
		weatherData.temperature.innerHTML = weatherTemperature + weatherData.units;
	}, false);

	xhr.addEventListener("error", function(err){
		alert("Could not complete the request");
	}, false);

	xhr.open("GET", "https://fourtonfish.com/tutorials/weather-web-app/getlocationandweather.php?owapikey=e2db5b0453a25a492e87ad8b03046a7c&units=metric", true);
	xhr.send();
	} else {
		alert("Unable to fetch the location and weather data.");
	}
} getLocationAndWeather();