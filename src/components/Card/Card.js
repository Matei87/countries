import React from 'react';
import './Card.css';

import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { country, theme } = this.props;

    if (country.region === '' || country.region === 0) {
      country.region = 'N/A';
    }
    if (country.capital === '' || country.capital === 0) {
      country.capital = 'N/A';
    }
    if (country.population === '' || country.population === 0) {
      country.population = 'N/A';
    }

    return (
      <div className={theme === 'light' ? 'card light' : 'card dark'}>
        <img
          className='card-img-top'
          src={country.flags.svg}
          alt={country.name.common}
        />
        <div className='card-body'>
          <h3 className='card-title'>{country.name.common}</h3>
          <ul>
            <li>
              <span>Population</span>: {country.population.toLocaleString()}
            </li>
            <li>
              <span>Region</span>: {country.region}
            </li>
            <li>
              <span>Capital</span>: {country.capital}
            </li>
          </ul>
          <Link to={`/${country.name.common}`}>
            <button className='btn btn-outline-primary page-details'>
              Details
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Card;
