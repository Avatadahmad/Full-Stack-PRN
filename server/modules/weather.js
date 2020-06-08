const request = require("request-promise");

const API_KEY = "6a673a0409e3b691acdf892d59fb2073";

class Weather {
  static retrieveByCity(city, callback) {
    request({
      uri: `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${API_KEY}`,
      json: true,
    })
      .then(function (res) {
        callback(res);
      })
      .catch(function (err) {
        console.log(err);
        callback({ error: "could not reach" });
      });
  }
}

module.exports = Weather;
