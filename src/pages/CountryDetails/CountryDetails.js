import React from 'react';
import './CountryDetails.css';

import { Link } from 'react-router-dom';


class CountryDetails extends React.Component {
    state = {
        details: [],
        isLoading: false
    }

    componentDidMount() {
        const { country } = this.props.match.params;

        fetch(`https://restcountries.eu/rest/v2/name/${country}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ details: data[0], isLoading: true })
            })
            .catch(err => console.log(err))
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
            languages.push(language[key]['name']);
        }
        const timezones = details.timezones;
        let timezone = [];
        for (let key in timezones) {
            timezone.push(timezones[key]);
        }

        return (
            <>{isLoading === false ? <>
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </> : <div className="container-fluid" id="countryDetails">
                    <Link
                        to="/"
                        className="btn btn-outline-primary page-back">
                        <i className="fas fa-arrow-left" /> Back
                </Link>

                    <div className={theme === 'light' ? 'row light' : 'row dark'}>

                        <div className="col-md-6 first-col">
                            <img src={details.flag} alt={details.name} />
                        </div>

                        <div className="col-md-6 second-col">
                            <h1 className='country-name'>{details.name}</h1>
                            <div className="col-md-6">
                                <ul >
                                    <li><span>Native Name:</span> {details.nativeName}</li>
                                    <li><span>Population:</span> {Number(details.population).toLocaleString()}</li>
                                    <li><span>Region:</span> {details.region}</li>
                                    <li><span>Sub Region:</span> {details.subregion}</li>
                                    <li><span>Capital:</span> {details.capital}</li>
                                    <li><span>Border:</span> {Array(details.borders).join(', ')}</li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul>
                                    <li><span>Net Domain:</span> {details.topLevelDomain}</li>
                                    <li><span>Currency:</span>  {currency.join(', ')}</li>
                                    <li><span>Languages:</span> {languages.join(', ')}</li>
                                    <li><span>Time Zone:</span> {timezone[0]}</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>}</>

        )
    }
}

export default CountryDetails;
