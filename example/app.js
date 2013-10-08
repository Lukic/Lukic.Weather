(function() {
var WeatherModule = require('nu.lukic.weather');	
var Weather = new WeatherModule.Weather();

var win = Ti.UI.createWindow({
	backgroundColor:"#fff",
	navTintColor:'#333',
	statusBarStyle:Titanium.UI.iPhone.StatusBar.DARK_CONTENT
});
var location = "Copenhagen";
var TemperatureUnit = "c";

Weather.setLocation(location);
Weather.setTemperatureUnit(TemperatureUnit);
Weather.getWeather(function(response){

	var currentLocation = Ti.UI.createLabel({
		text:location,
		color:"#333",
		font:{fontSize:20,fontWeight:'light'},
		top:30,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	var currentConditionIcon = Ti.UI.createImageView({
		image:"http://l.yimg.com/a/i/us/we/52/"+response.item.condition.code+".gif",
		top:70,
		preventDefaultImage:true
	});
	
	var currentConditionText = Ti.UI.createLabel({
		text:response.item.condition.text,
		color:"#333",
		font:{fontSize:40,fontWeight:'bold'},
		top:135,
		width:320,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	var currentTemperatureUnit = Ti.UI.createLabel({
		text:TemperatureUnit,
		color:"#999",
		font:{fontSize:40,fontWeight:'Light'},
		top:180,
		right:70,
	});
	
	var currentTemperature = Ti.UI.createLabel({
		text:response.item.condition.temp,
		color:"#333",
		font:{fontSize:120,fontWeight:'Bold'},
		width:320,
		top:180,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	win.add(currentLocation);
	win.add(currentConditionIcon);
	win.add(currentConditionText);
	win.add(currentTemperatureUnit);
	win.add(currentTemperature);
});
win.open();
})();
