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
	Weather
*/

var weatherData = {
	city: document.querySelector ("#city"),
	weather: document.querySelector ("#weather"),
	temperature: document.querySelector("#temperature"),
	temperatureValue: 0,
	units: "°c"
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

/*
	Search
*/

var search = document.getElementById("search");
var help = document.getElementById("search-help");
var icon = document.getElementById("search-icon");
var form = document.getElementById("search-form");

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
		command: "/w",
		label: "Wikipedia",
		icon: "fa fa-wikipedia-w",
		url: "http://en.wikipedia.org/wiki/Special:Search/"
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
	Quotes
*/

setInterval(start, 900000);

function start() {
	const quotes = [
	{"content": "A monk once asked Jōshū, “Has a dog Buddha-nature?” Jōshū answered, “Mu!”", "cite": "—Mumonkan, Case I"},
	{"content": "A monk asked Tōzan, “What is the Buddha?” He replied, “Three pounds of flax.”", "cite": "—Mumonkan, Case XVIII"},
	{"content": "A monk asked Ummon, “What is the Buddha?” “It is a shit-wiping stick,” replied Ummon.", "cite": "—Mumonkan, Case XXI"},
	{"content": "Daibai asked  Baso, “What is the Buddha?” Baso answered, “The mind is the Buddha.”", "cite": "—Mumonkan, Case XXX"},
	{"content": "A monk asked Baso, “What is the Buddha?” Baso answered, “Not mind, not Buddha.”", "cite": "—Mumonkan, Case XXXIII"},
	{"content": "Goso said “When you meet a man of the Way on the way, do not greet him with words; do not greet him with silence; tell me, how will you greet him?”", "cite": "—Mumonkan, Case XXXVI"},
	{"content": "A reddish-yellow cow passes by a window. The head and horns and the four legs go past. Why doesn’t the tail too?", "cite": "—Mumonkan, Case XXXVIII"},
	{"content": "Bashō said to the assembled monks, “If you have a staff, I will give you one. If you have no staff, I will take it away from you.”", "cite": "—Mumonkan, Case XLIV"},
	];
	
	var randomNumber = Math.floor(Math.random() * quotes.length);
	
	$('.quotes blockquote').text(quotes[randomNumber]['content']);
	$('.cites cite').text(quotes[randomNumber]['cite']);
	
	quotes.splice(randomNumber, 1);
} start();