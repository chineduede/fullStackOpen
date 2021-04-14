import { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ handleClick, value }) => {
  return (
    <form>
      find countries <input onChange={handleClick} value={value}/>
    </form>
  )
}

const Weather = ({ weatherDetails }) => {

  return (
    <div>
      <p><strong>temperature:</strong> {weatherDetails.temperature} Celsius</p>
      {
        weatherDetails.weather_icons.map((icon, index) =>
          <img key={index} src={icon} alt="weather symbol" />
          )
      }
      <p><strong>wind:</strong> {Math.floor(weatherDetails.wind_speed / 1.609)} mph direction {weatherDetails.wind_dir}</p>
    </div>
  )

}

const Loading = () => <div><p>Weather is loading...</p></div>

const Language = ({ langName }) => <li>{langName}</li>

const RefineSearch = () => <p>Too many matches, specify another country</p>

const ListCountries = ({ name, handleClick }) => {
  return (
    <p id={name}>{name}  <button data-name={name}>show</button></p>
  )
};

const DetailCountry = ({ filter }) => {
    
  let country = filter[0];

  const [ temp, setTemp ] = useState('');

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}`)
      .then(response => {
        setTemp(response.data)})
  }, [country.capital])


  return (
    <div>
      <h1>{country.name}</h1>
        <p>capital {(country.capital) ? country.capital : "No known capital"}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages
            .map(lang => 
              <Language key= {lang.iso639_2} langName={lang.name} />
          )}
        </ul>
        <div>
          <img src={country.flag} alt="National flag" height={80} />
        </div>
        <h3>Weather in {country.capital}</h3>
        <div>
          {(temp === '')
            ? <Loading />
            : <Weather weatherDetails={temp.current}/>}
        </div>
    </div>
  )
}

export { Search, DetailCountry, RefineSearch, ListCountries };