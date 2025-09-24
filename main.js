const searchInput = document.querySelector("#searchInput");
const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const weatherEl = document.querySelector(".weather");
const suggestionsEl = document.getElementById("suggestions");

searchInput.addEventListener("input", searchCities); // Harf harf arama için
searchInput.addEventListener("keypress", findWeatherInfo); // Enter tuşu için

const weatherAPI = new WeatherAPI();

// Bu fonksiyon, arama çubuğuna her harf girildiğinde çalışır ve şehir önerilerini getirir.
async function searchCities() {
  const query = searchInput.value.trim();

  // En az 3 harf girilmesini bekliyoruz
  if (query.length < 3) {
    suggestionsEl.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${weatherAPI.apiKey}`);
    const data = await response.json();
    displaySuggestions(data);
  } catch (error) {
    console.error("Şehir arama hatası:", error);
    suggestionsEl.innerHTML = '';
  }
}

// Bu fonksiyon, "Enter" tuşuna basıldığında çalışır ve doğrudan hava durumu bilgisini getirir.
function findWeatherInfo(e) {
  if (e.keyCode === 13) {
    const cityName = searchInput.value.trim();
    weatherAPI
      .getWeatherInfo(cityName)
      .then((data) => {
        display(data);
      })
      .catch((err) => {
        alert("Şehir adı bulunamadı! Lütfen geçerli bir şehir adı giriniz.");
        console.log(err);
      });
  }
}

// Bu fonksiyon, API'den gelen şehir önerilerini ekranda listeler.
function displaySuggestions(cities) {
  suggestionsEl.innerHTML = '';

  if (cities.length === 0) {
    return;
  }

  cities.forEach(city => {
    const li = document.createElement("li");
    li.textContent = `${city.name}, ${city.country}`;
    li.addEventListener("click", () => {
      searchInput.value = city.name;
      suggestionsEl.innerHTML = ''; // Listeyi gizle
      // Seçilen şehrin hava durumu bilgisini almak için yeni bir istek gönder
      weatherAPI.getWeatherInfo(city.name).then(data => {
        display(data);
      }).catch(err => {
        alert("Hava durumu bilgisi alınamadı!");
        console.log(err);
      });
    });
    suggestionsEl.appendChild(li);
  });
}

// Hava durumu bilgisini ekrana yansıtan ana fonksiyon.
function display(data) {
  if (data.cod === 200) {
    cityNameEl.textContent = data.name;
    degreeEl.textContent = Math.round(data.main.temp) + "°";
    weatherEl.textContent = data.weather[0].description;
    searchInput.value = "";
  } else {
    alert("Şehir bulunamadı!");
  }
}

// Keyboard shortcuts - YENİ EKLENEN
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
