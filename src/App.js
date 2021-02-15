import { useState } from 'react';
import './App.css';
const api = {
  key : "c93b33c3c2a1d206d33dcc62c4856c95",
  base:  "https://api.openweathermap.org/data/2.5/"
}

function App() {
  
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')

  const search = e => {
    if(e.key === 'Enter'){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery('');
            console.log(result);
          });
    }
  }

  

  const date = ( datepassed ) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[datepassed.getDay()];
    let date = datepassed.getDate();
    let month = months[datepassed.getMonth()];
    let year = datepassed.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  // const date1 = ( d ) => {
  //     const localTime = d.getTime()
  //     const localOffset = d.getTimezoneOffset() * 60000
  //     const utc = localTime + localOffset
  //     var time = utc + (1000 * -19800)
      

  //   return `${day} ${date} ${month} ${year}`
  // }

  return (
    <div className={
        ( typeof weather.main!="undefined")?
        ((weather.main.temp>-5)?
          ((weather.main.temp>5)?
            ((weather.main.temp>15)?
              ((weather.main.temp>25)?
                ((weather.main.temp>35)?
                  ((weather.main.temp>45)?
                    ('app burning')
                    :('app toohot'))
                  :('app hot'))
                :('app warm'))
              :('app cold'))
            :('app toocold'))
          :('app freezing'))
        :('app')
    }>
    <main>
      <div style={{color:"white", fontWeight:1000, fontSize:"40px", textAlign:"center"}}>METEROLOGICAL REPORT APPLICATION</div>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Type the place here..."
          onChange = {e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}         
        />
      </div>
      {(typeof weather.main != "undefined") ?
        (
          <div>
          <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{date(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
        {Math.round(weather.main.temp)}°c
        </div>
        <div className="weather">{weather.weather[0].main}</div>
        <div className="desc">
        <div>Wind : {Math.round(weather.wind.speed*3.6)} kmph</div>
        <div>Humidity : {weather.main.humidity}%</div>
        <div>Feels like : {Math.round(weather.main.feels_like)}°c</div>
        <div>Cloudiness : {weather.clouds.all}%</div>
        <div> {weather.weather.icon}</div>

      </div>
      </div>
          </div>
        ):('')}
      
    <div style={{color:"white", textAlign:"center", marginTop:"33%"}}>Made by Shubham &copy;</div>    
    </main>
    </div>
  );
}

export default App;
