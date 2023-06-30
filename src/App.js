import './App.css';
import cloudyday from './cloudy-day.svg';
import cloudynight from './cloudy-night.svg';
import night from './night.svg';
import rainy1 from './rainy-1.svg';
import snowy1 from './snowy-1.svg';
import Sunny from './Sunny.svg';
import thunder from './thunder.svg';
import cloudy from './cloudy-day.svg';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');
  const [data, setData] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e08bfd2eb7c36a752f20789afea14fbd`;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedCity(city);
    setCity('');
    searchLocation();
  };

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  let weatherIcon;
  if (data.weather) {
    const weatherCode = data.weather[0].id;
    if (weatherCode >= 200 && weatherCode < 300) {
      weatherIcon = thunder;
    } else if (weatherCode >= 300 && weatherCode < 400) {
      weatherIcon = rainy1;
    } else if (weatherCode >= 500 && weatherCode < 600) {
      weatherIcon = rainy1;
    } else if (weatherCode >= 600 && weatherCode < 700) {
      weatherIcon = snowy1;
    } else if (weatherCode >= 700 && weatherCode < 800) {
      weatherIcon = cloudyday;
    } else if (weatherCode === 800) {
      weatherIcon = Sunny;
    } else if (weatherCode > 800) {
      weatherIcon = cloudy;
    }
  }

  return (
    <div className="App">
      <div className="weatherapp">SKYCAST</div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            className="textbox"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="Submit">SUBMIT</button>
        </div>
      </form>
      <div className="weather1">{submittedCity}</div>
      <div className="weather">
        {data.weather ? <p>{data.weather[0].main}</p> : null}
      </div>
      <img src={weatherIcon} alt="" className="display" />
      <div className="deg">
        {data.main ? <h1>{data.main.temp}&deg;</h1> : null}
      </div>
      <div className="boxbase">
        <div className="mps">
          {data.wind && data.main ? <p>Wind   Speed: {data.wind.speed} m/s | Feels  Like: {data.main.feels_like}&deg;</p>  : null}
        </div>
      </div>
    </div>
  );
}

export default App;
