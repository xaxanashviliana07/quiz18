import Cloud from '../assets/images/04n.png'
import {useState, useEffect} from 'react'
import axios from 'axios'
const Weather = () => {
    const [cityName, setCityName] = useState("Tbilisi");
    const [weatherInfo, setWeatherInfo] = useState([])
    const [error, setError] = useState("");
    
    const handleInput = () => {
      if(!cityName.trim()){
        setError('The input is required')
        return;
      }
      axios.get('https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7613e4a1a94e6aabee506df6d295566d')
          .then((res) => {
            setWeatherInfo(res.data)
            setError(null);
          });
    }
    useEffect(() => {
        handleSubmit()
          
    }, [cityName])
    const handleSubmit = () => {
      console.log("clicked");
      handleInput();
      setError(null);
    };
    return (
        <>
          <div>
            <div>
             <input type="text" placeholder="Search" value={cityName} onChange={(e) => setCityName(e.target.value)}></input>
             <button><img src={SearchIcon} className='btn' onClick={handleSubmit}/></button>
            </div>
            {error && <p className={styles["error"]}>{error}</p>}
            {weatherInfo && (
              <div>
                <hi>{`Weather in ${weatherInfo.name}`}</hi>
                {weatherInfo.weather && (
                  <div>
                    <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}/>
                    <p>{`Weather: ${weatherInfo.weather[0].description}`}</p>
                  </div>
                )}
                {weatherInfo.main && (
                <div>
                  <h3>{`${weatherInfo.main.temp}℃`}</h3>
          
                  <p>{`Humidity:${weatherInfo.main.humidity}%`}</p>
                </div>
                )}
                {weatherInfo.wind && (
                  <div>
                    <p>{`Wind speed:${weatherInfo.wind.speed}`}</p>
                  </div>
                )}
                
              </div>
            )}
          </div>
        </>
    )
}

export default Weather


