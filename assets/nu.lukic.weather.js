function Weather(){
	this._location ='';
	this._temperatureUnit ='';
};

Weather.prototype.setLocation = function(value){
	this._location = value;
};

Weather.prototype.setTemperatureUnit = function(value){
	this._temperatureUnit = value;
};

Weather.prototype.xhr = function(url, success, error){
    var client = Ti.Network.createHTTPClient({
         
         onload : function(e) {
             var json = JSON.parse(this.responseText);
             success(json);
   
         },
        
         onerror : function(e) {
             Ti.API.debug(e.error);
             error(e.error);
         },
         timeout : 5000 
     });
     client.open("GET", url); 
     client.send();  
};

Weather.prototype.getWeather = function(callback){
	if(this._location !== undefined && this._temperatureUnit !== undefined){
		var url ='http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.bylocation%20WHERE%20location=%22'+this._location+'%22%20AND%20unit=%22'+this._temperatureUnit+'%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
		this.xhr(
            url,
            function(response){
               callback(response.query.results.weather.rss.channel);
            },
            function(failure){
               callback(failure);
        });
	};
};

exports.Weather = Weather;



