import React, { useState, useEffect } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';
import Table from './components/Table';
import Pagination from './components/Pagination';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [summaries, setSummaries] = useState([]);
  useEffect(() => {
    const fetchCountries = () => {
      fetch("https://api.covid19api.com/countries")
        .then(response => response.json())
        .then(result => result.forEach(element => {
          countries.push(element.Country);
        }))
        .catch(error => console.log('error', error));
      setCountries(countries);
    }
    const fetchSummary = () => {
      fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(result => {
          setSummaries(result.Countries);
        })
        .catch(error => console.log('error', error));
    }
    fetchCountries();
    fetchSummary();
  }, []);
  const paginate = (summaries, currentIndex, summariesPerPage) => {
    let start = (currentIndex * summariesPerPage) - summariesPerPage;
    let end = start + summariesPerPage;
    let currentList = summaries.slice(start, end);
    setSummaries(currentList);
  }
  return (
    <div className="App">
      <Autocomplete data={countries} />
      <Table data={summaries} />
      <Pagination data={summaries} onClick={paginate} />
    </div>
  );
}

export default App;
