import React, { Component } from 'react';
import './CountryDetails.css';

import { Link } from 'react-router-dom';

class CountryDetails extends Component {
  state = {
    details: [],
    isLoading: false,
  };

  componentDidMount() {
    const { country } = this.props.match.params;

    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('inside ', data[0]);
        this.setState({ details: data[0], isLoading: true });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { details, isLoading } = this.state;
    const theme = localStorage.getItem('theme');

    const obiect = details.currencies;
    let currency = [];
    for (let key in obiect) {
      currency.push(obiect[key]['name']);
    }

    const language = details.languages;
    const languages = [];
    for (let key in language) {
      languages.push(language[key]);
    }

    const nativeName = details?.name?.nativeName;
    const nativeNames = [];
    for (let key in nativeName) {
      nativeNames.push(nativeName[key].common);
    }

    return (
      <>
        {isLoading === false ? (
          <>
            <div className='spinner-border text-light' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </>
        ) : (
          <div className='container-fluid' id='countryDetails'>
            <Link to='/' className='btn btn-outline-primary page-back'>
              <i className='fas fa-arrow-left' /> Back
            </Link>

            <div className={theme === 'light' ? 'row light' : 'row dark'}>
              <div className='col-md-6 first-col'>
                <img src={details.flags['svg']} alt={details.name.official} />
              </div>

              <div className='col-md-6 second-col'>
                <h1 className='country-name'>{details.name.official}</h1>
                <div className='col-md-6'>
                  <ul>
                    <li>
                      <span>Native Name:</span> {nativeNames}
                    </li>
                    <li>
                      <span>Capital:</span> {details.capital.join(', ')}
                    </li>
                    <li>
                      <span>Continent: </span>
                      {details.continents.join(', ')}
                    </li>
                    <li>
                      <span>Region:</span> {details.region}
                    </li>
                    <li>
                      <span>Sub Region:</span> {details.subregion}
                    </li>

                    <li>
                      <span>Border:</span>{' '}
                      {details.borders && details.borders.join(', ')}
                    </li>
                  </ul>
                </div>
                <div className='col-md-6'>
                  <ul>
                    <li>
                      <span>Population: </span>
                      {Number(details.population).toLocaleString()}
                    </li>
                    <li>
                      <span>Net Domain:</span> {details.tld}
                    </li>
                    <li>
                      <span>Currency:</span> {currency.join(', ')}
                    </li>
                    <li>
                      <span>Languages:</span> {languages.join(', ')}
                    </li>
                    <li>
                      <span>Time Zone:</span> {details.timezones.join(', ')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default CountryDetails;
