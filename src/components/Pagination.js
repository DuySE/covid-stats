import React, { useEffect, useState } from 'react';
import './Pagination.css';
import './Constant';
import { RECORDS_PER_PAGE } from './Constant';

const Pagination = ({ summary, paginate, total }) => {
  const [pages, setPages] = useState([]);
  let numberOfPages = Math.ceil(total / RECORDS_PER_PAGE);
  useEffect(() => {
    const onClick = (e, i) => {
      e.preventDefault();
      paginate(summary, i, RECORDS_PER_PAGE);
      e.currentTarget.className = 'active';
      let a = document.getElementsByTagName('ul')[0].querySelectorAll('a');
      a.forEach(element => {
        if (element !== e.target) {
          element.className = "";
        }
      });
    }
    let pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(
        <li key={i}>
          <a
            href="#/"
            onClick={e => onClick(e, i)}
            className={i === 1 ? 'active' : ''}> {i}
          </a>
        </li>
      )
    }
    setPages(pages);
  }, [total]);
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
