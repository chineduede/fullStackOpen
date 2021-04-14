import React, { useState , useEffect } from 'react'
import axios from 'axios';

// components
import { RefineSearch, Search, DetailCountry, ListCountries } from './components/components';

const App = () => {

	const [ countriesList, setCountriesList] = useState([])
	const [ keyword, setKeyword ] = useState('');
	const [ filtered, setFiltered ] = useState([]);

	const getCountries = (event) => {
		setKeyword(event.target.value.toLowerCase());
	}

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountriesList(response.data);
      });
  }, [])
  
  const hook = () => {
    let filt = countriesList
      .filter( country => country.name.toLowerCase().includes(keyword))
    setFiltered(filt);
  }

  useEffect(hook, [keyword, countriesList]);

  const getDetailPage = (e) => {
    let clickedBtn = e.target;
    let country = clickedBtn.dataset.name.toLowerCase();
    setKeyword(country)
    
  }

  return (
    <div>
		  <Search handleClick={getCountries} value={keyword} />
		  <div onClick={getDetailPage}>
			  {(filtered.length > 10)
          ? <RefineSearch />
          : (filtered.length === 1)
          ? <DetailCountry filter={filtered} />
          : filtered.map( country => 
            <ListCountries key={country.alpha3Code} name={country.name}/>)}
		  </div>
    </div>
  	)
}

export default App