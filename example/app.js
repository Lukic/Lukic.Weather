(function() {
var WeatherModule = require('nu.lukic.weather');	
var Weather = new WeatherModule.Weather();

var win = Ti.UI.createWindow({
	backgroundColor:"#fff",
	navTintColor:'#333',
	statusBarStyle:Titanium.UI.iPhone.StatusBar.DARK_CONTENT
});

var activityIndicator = Ti.UI.createActivityIndicator({
		  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		  height:Ti.UI.SIZE,
		  width:Ti.UI.SIZE
		});	
		
	activityIndicator.show();
	win.add(activityIndicator);

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
		text:'C',
		color:"#fff",
		font:{fontSize:25,fontWeight:'Light'},
		top:190,
		right:70,
		backgroundColor:"#eee",
		width:30,
		height:30,
		borderRadius:15,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	
	var currentTemperature = Ti.UI.createLabel({
		text:response.item.condition.temp,
		color:"#333",
		font:{fontSize:120,fontWeight:'Bold'},
		width:320,
		top:180,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	var weekData = Ti.UI.createView({
		bottom:0,
		width:320,
		height:80,
		layout:'horizontal',
		backgroundColor:"#333"
	});
	
	var weekDays = [];
	
	for (var i=0;i<response.item.forecast.length;i++) {
		var left=0;
		var width=64;
		
		if(i!=0){ left =1; width=63;}
		
		var weekDay = Ti.UI.createView({
			width:width,
			height:80,
			left:left,
			backgroundColor:"#fff",
			layout:'vertical'
		});
		
		var weekDayName = Ti.UI.createLabel({
			text:response.item.forecast[i].day,
			width:63,
			color:"#333",
			font:{fontSize:13,fontWeight:'Bold'},
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		
		var weekDayForecastIcon = Ti.UI.createImageView({
			image:"http://l.yimg.com/a/i/us/we/52/"+response.item.forecast[i].code+".gif",
			width:30,
			height:30,
			preventDefaultImage:true
		});
		
		var weekDayTemperature = Ti.UI.createLabel({
			text:response.item.forecast[i].high + " / "+ response.item.forecast[i].low,
			width:63,
			top:5,
			color:"#333",
			font:{fontSize:13,fontWeight:'Bold'},
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
		});
	
		
		weekDay.add(weekDayName);
		weekDay.add(weekDayForecastIcon);
		weekDay.add(weekDayTemperature);
		weekDays.push(weekDay);
		}
	
	weekData.add(weekDays);	
	
	win.add(currentLocation);
	win.add(currentConditionIcon);
	win.add(currentConditionText);
	win.add(currentTemperatureUnit);
	win.add(currentTemperature);
	win.add(weekData);
	
	activityIndicator.hide();
});

win.open();
})();
