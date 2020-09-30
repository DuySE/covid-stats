import React, { useState, useEffect } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';
import Table from './components/Table';
import Pagination from './components/Pagination';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentSum, setcurrentSum] = useState([]);

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
          setTotal(result.Countries.length)
          setcurrentSum(result.Countries.slice(0, 10))
        })
        .catch(error => console.log('error', error));
    }
    fetchCountries();
    fetchSummary();
  }, []);
  const paginate = (sum, currentIndex, summariesPerPage) => {
    let start = (currentIndex * summariesPerPage);
    let end = start + summariesPerPage;
    let currentList = sum.slice(start, end);
    setcurrentSum(currentList);
  }

  return (
    <div className="App">
      <Autocomplete data={countries} />
      <Table data={currentSum} />
      <Pagination data={summaries} onClick={paginate} total={total} />
    </div>
  );
}

export default App;
