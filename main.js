const searchInput = document.querySelector("#searchInput");
const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const weatherEl = document.querySelector(".weather");

searchInput.addEventListener("keypress", findWeatherInfo);

const weatherAPI = new WeatherAPI(); //CLASS'ın içindeki methoda erişim için nesne tanımladık.

function findWeatherInfo(e) {
  if (e.keyCode == `13`) {
    //ASCI tablosunda enter tuşu '13'e karşılık geliyor.//Ezberleme console ile deneyerek de bulabilirsin.
    const cityName = searchInput.value.trim(); //İçeri giren değeri boşluksuz yakala.
    weatherAPI
      .getWeatherInfo(cityName) //methoda cityName ile gitti istek attı.
      .then((data) => {
        console.log(data);
        display(data);
      })
      .catch((err) => {
        alert("Şehir adı bulunamadı! Lütfen geçerli bir şehir adı giriniz.");
        console.log(err);
      });
  }
}
function display(data) {
  if (data.cod === 200) {
    //? 200 başarılı olduğu anlamına geliyor(404-hata//401-API key hatası//429-Çok fazla istek gibi)
    cityNameEl.textContent = data.name;
    degreeEl.textContent = Math.round(data.main.temp) + "°";
    weatherEl.textContent = data.weather[0].description;
    searchInput.value = "";
  } else {
    alert("Şehir bulunamadı!");
  }
}
document.addEventListener("keydown", (e) => {
  if (e.target === searchInput) return; // Input'a odaklanıldığında keyboard shortcuts çalışmasın

  if (typeof carousel !== "undefined") {
    // carousel tanımlı mı kontrol et
    switch (e.key) {
      case "ArrowLeft":
        carousel.prevSlide();
        break;
      case "ArrowRight":
        carousel.nextSlide();
        break;
      case " ":
        e.preventDefault();
        carousel.toggleAutoplay();
        break;
    }
  }
});
