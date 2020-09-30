import React, { useEffect, useState } from 'react';

const Pagination = ({ data, onClick }) => {
  const [pages, setPages] = useState([]);
  let numberOfPages = Math.ceil(data.length / 10);
  useEffect(() => {
    let pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(<li key={i}><a href="/" onClick={onClick(data, i, 10)}> {i}</a></li>)
    }
    setPages(pages);
  }, [data]);
  return (
    <div className="pagination">
      <ul>
        {pages && pages.map(page => (
          page
        ))}
      </ul>
    </div>
  )
}

export default Pagination;
