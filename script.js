let weather = {
  apiKey: process.env.API_KEY,
  fetchWeather: async function (city) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      );
      const data = await res.json();
      this.displayWeather(data);
    } catch (err) {
      console.log('Unable to fetch weather', err);
      // Change the content
      document.querySelector('.result').classList.add('hidden');
      document.querySelector('.intro').classList.add('hidden');
      document.querySelector('.no-city').classList.remove('hidden');
    }
  },

  fetchWeatherUsingCoor: async function (lat, lon) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
      );
      const data = await res.json();
      this.displayWeather(data);
    } catch (err) {
      console.log('Unable to fetch weather', err);
      // Change the content
      document.querySelector('.result').classList.add('hidden');
      document.querySelector('.intro').classList.add('hidden');
      document.querySelector('.no-city').classList.remove('hidden');
    }
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // Change the content
    document.querySelector('.no-city').classList.add('hidden');
    document.querySelector('.intro').classList.add('hidden');
    document.querySelector('.result').classList.add('hidden');
    document.querySelector('.loader-container').classList.remove('hidden');
    // Display information
    document.querySelector('.city').innerText = name;
    document.querySelector('.temp').innerText = temp + '°C';
    document.querySelector(
      '.icon'
    ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector('.description').innerText = description;
    document.querySelector('.humidity').innerText = `${humidity}%`;
    document.querySelector('.wind').innerText = `${speed} km/h`;

    setTimeout(() => {
      document.querySelector('.result').classList.remove('hidden');
      document.querySelector('.loader-container').classList.add('hidden');
    }, 800);
  },

  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },

  getLocation: function () {
    if ('geolocation' in navigator) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Access the latitude and longitude from the position object
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          weather.fetchWeatherUsingCoor(latitude, longitude);
        },
        function (error) {
          // Handle any errors that may occur while obtaining the location
          console.error('Error getting location: ' + error.message);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error('Geolocation is not supported by this browser.');
    }
  },
};

document.querySelector('.search button').addEventListener('click', () => {
  weather.search();
});

document.querySelector('.search').addEventListener('keyup', (e) => {
  if (e.key == 'Enter') {
    weather.search();
  }
});

const useLocButtons = document.querySelectorAll('.use-my-loc');

useLocButtons.forEach((button) => {
  button.addEventListener('click', (e) => weather.getLocation());
});
