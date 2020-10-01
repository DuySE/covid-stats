import React from 'react';
import Autocomplete from './Autocomplete';
import './Table.css';

const Table = ({ summary, global, countries, search }) => {
  return (
    <div className="main-table">
    <h1>Daily global summary</h1>
      <table id="global">
        <thead>
          <tr>
            <th>Total Confirmed</th>
            <th>New Confirmed</th>
            <th>Total Deaths</th>
            <th>New Deaths</th>
            <th>Total Recovered</th>
            <th>New Recovered</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{global.TotalConfirmed}</td>
            <td>{global.NewConfirmed}</td>
            <td>{global.TotalDeaths}</td>
            <td>{global.NewDeaths}</td>
            <td>{global.TotalRecovered}</td>
            <td>{global.NewRecovered}</td>
          </tr>
        </tbody>
      </table>
      <h1>Daily summary by country</h1>
      <Autocomplete countries={countries} search={search} />
      <table id="country">
        <thead>
          <tr>
            <th>No.</th>
            <th>Country</th>
            <th>Total Confirmed</th>
            <th>New Confirmed</th>
            <th>Total Deaths</th>
            <th>New Deaths</th>
            <th>Total Recovered</th>
            <th>New Recovered</th>
          </tr>
        </thead>
        <tbody>
          {summary && summary.map((value, index) =>
            (
              <tr key={value.CountryCode}>
                <td>{index + 1}</td>
                <td>{value.Country}</td>
                <td>{value.TotalConfirmed}</td>
                <td>{value.NewConfirmed}</td>
                <td>{value.TotalDeaths}</td>
                <td>{value.NewDeaths}</td>
                <td>{value.TotalRecovered}</td>
                <td>{value.NewRecovered}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
