class WeatherAPI {
  constructor() {
    this.baseURL = "https://api.openweathermap.org/data/2.5/weather";
    this.apiKey = "688ad2f3e3e4f321fb5966f5d9c9be47";
  }
  async getWeatherInfo(cityName) {// cityName ile istek geldi //?console'a yazdırıldı...
    const response= await fetch(`${this.baseURL}?q=${cityName}&appid=${this.apiKey}&units=metric&lang=tr`)
    const data =await response.json();
    return data;
  }
}
