import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  let [city, setCity] = useState("");
  let [weatherinfo, setWeatherinfo] = useState(null);

  let apikey = "8ad999a9f213ae105ea3e8c1189d0cd8"; 

  let fetchApi = async () => {
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    try {
      let response = await fetch(apiurl);
      let data = await response.json();
      if (data.cod === 200) {
        setWeatherinfo(data);
      } else {
        console.log("Invalid city name");
        setWeatherinfo(null); 
      }
    } catch (error) {
      console.log(error.message);
      setWeatherinfo(null); 
    }
  };

  useEffect(() => {
    fetchApi();
  }, [city]); 

  return (
    <>
     <div className='searchbar'>
          <input type="text" placeholder="" onChange={(e) => setCity(e.target.value)} />
          <button onClick={fetchApi}>Get Weather</button>
        </div>
        <div className='weatherbar'>
          {weatherinfo && (
            <div className='content'>
              <h1>City Name : {weatherinfo.name}</h1>
              <h2>Temperature : {weatherinfo.main.temp}°C</h2>
              <h2>Country : {weatherinfo.sys.country}</h2>
              <h2>Description : {weatherinfo.weather[0].description}</h2>
            </div>
          )}
        </div>
    </>
  );
}

export default App;