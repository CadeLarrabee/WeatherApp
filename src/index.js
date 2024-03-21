import "./style.css";

function OnWeatherSearch(searchCity) {
  showLoadingText();

  //This is an API key that should be protected, but I'll learn how to later.
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=8619ccc37eff4f6c9a2160054241803&q=" +
      searchCity,
    { mode: "cors" }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      hideLoadingText();
      GenerateWeatherPageData(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function showLoadingText() {
  document.getElementById("loadingText").style.display = "block";
}

function hideLoadingText() {
  document.getElementById("loadingText").style.display = "none";
}

function GenerateWeatherPageData(WeatherObj) {
  AddCityName(WeatherObj);
  AddWeatherName(WeatherObj);
  AddWeatherTempData(WeatherObj);
  AddWeatherSpeedData(WeatherObj);
}

function AddCityName(WeatherObj) {
  //weatherCityName
  var weatherCityText = document.getElementById("weatherCityName");
  weatherCityText.textContent = WeatherObj.location.name;
}

function AddWeatherName(WeatherObj) {
  var weatherNameText = document.getElementById("weatherTypeText");
  weatherNameText.textContent = WeatherObj.current.condition.text;
  AddImage(WeatherObj.current.condition.text);
}

function AddImage(WeatherType) {
  var svg = document.createElementNS(
    "/home/cade/Desktop/repos/WeatherApp/src/images/Sunny.svg",
    "svg"
  );
  document.getElementById("weatherMoodle").appendChild(svg);
}

function AddWeatherTempData(WeatherObj) {
  var weatherTempText = document.getElementById("weatherTempText");
  weatherTempText.textContent = WeatherObj.current.temp_f;
}
function AddWeatherSpeedData(WeatherObj) {
  var weatherWindSpeed = document.getElementById("weatherWindSpeed");
  weatherWindSpeed.textContent = WeatherObj.current.gust_mph;
}

function OnEntry() {
  var search = document.getElementById("search");
  //On click out or enter, search the city and populate the page
  search.addEventListener("blur", () => {
    OnWeatherSearch(search.value);
  });
  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      OnWeatherSearch(search.value);
    }
  });
}

OnEntry();
