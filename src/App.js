import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import Pagination from './components/Pagination';
import { RECORDS_PER_PAGE } from './components/Constant';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [summary, setSummary] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentSum, setCurrentSum] = useState([]);
  const [global, setGlobal] = useState({});

  useEffect(() => {
    const fetchSummary = () => {
      fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(result => {
          result.Countries.forEach(element => {
            countries.push(element.Country);
          });
          setGlobal(result.Global);
          setCountries(countries);
          setSummary(result.Countries);
          setTotal(result.Countries.length);
          setCurrentSum(result.Countries.slice(0, RECORDS_PER_PAGE));
        })
        .catch(error => console.log('error', error));
    }
    fetchSummary();
  }, []);

  const paginate = (sum, currentIndex, summaryPerPage) => {
    let start = (currentIndex - 1) * summaryPerPage;
    let end = start + summaryPerPage;
    let currentList = sum.slice(start, end);
    setCurrentSum(currentList);
  }

  const search = (value) => {
    if (value) {
      setCurrentSum(summary.filter(
        country => country.Country.toLowerCase().indexOf(value.toLowerCase()) > -1
      ));
    } else {
      setCurrentSum(summary.slice(0, RECORDS_PER_PAGE));
    }
  }

  return (
    <div className="App">
      <h1>COVID-19 CORONAVIRUS PANDEMIC</h1>
      <Table summary={currentSum} global={global} countries={countries} search={search} />
      <Pagination summary={summary} paginate={paginate} total={total} />
    </div>
  );
}

export default App;
