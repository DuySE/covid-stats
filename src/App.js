import React, { useState, useEffect } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';
import Table from './components/Table';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [summaries, setSummaries] = useState([]);
  useEffect(() => {
    async function fetchCountries() {
      await fetch("https://api.covid19api.com/countries")
        .then(response => response.json())
        .then(result => result.forEach(element => {
          countries.push(element.Country);
        }))
        .catch(error => console.log('error', error));
      setCountries(countries);
    }
    async function fetchSummary() {
      await fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(result => {
          setSummaries(result.Countries);
        })
        .catch(error => console.log('error', error));
    }
    fetchCountries();
    fetchSummary();
  }, []);
  return (
    <div className="App">
      <Autocomplete data={countries} />
      <Table data={summaries} />
    </div>
  );
}

export default App;
