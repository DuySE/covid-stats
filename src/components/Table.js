import React from 'react';
import './Table.css';

const Table = ({ data }) => {
  return (
    <div className="main-table">
      <h1>Daily summary by country</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
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
          {data && data.map((value, index) =>
            (
              <tr key={value.CountryCode}>
                <th>{index + 1}</th>
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
