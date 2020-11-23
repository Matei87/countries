import React from 'react';
import './HomePage.css';

import Filters from '../../components/Filters/Filters';
import Cards from '../../components/Cards/Cards';


const options = [
    { value: 'all', label: 'All Countries' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'America' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' }
];


class HomePage extends React.Component {
    state = {
        countries: [],
        valueInput: '',
        option: { value: 'all', label: 'All Countries' },
        isLoading: false,
        error: false
    }


    componentDidMount() {
        const defaultUrl = 'https://restcountries.eu/rest/v2/?fields=name;capital;population;region;flag';
        fetch(defaultUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({ countries: data, isLoading: true })
            })
            .catch(err => this.setState({ error: true }));


        const localTheme = window.localStorage.getItem('theme');

        if (localTheme) {
            this.setState({ theme: localTheme });

        } else {
            this.setState({ theme: 'light' })
        }

    }

    handleCountryChange = option => {
        this.setState({ option })
    }

    valueInputOnChange = e => {
        this.setState({ valueInput: e.target.value })
    }


    render() {
        const { countries, valueInput, isLoading, option, error } = this.state;
        const { theme } = this.props;

        let filteredCountries;
        filteredCountries = countries.filter(country => {
            if (option['value'] !== 'all') {
                return country.region === option['value'];
            } else {
                return filteredCountries = this.state.countries;
            }
        })

        filteredCountries = filteredCountries.filter(country => {
            return country.name.toLowerCase().includes(valueInput.toLowerCase());
        })

        return (
            <div className="container-fluid">

                <Filters
                    theme={this.props.theme}
                    handleCountryChange={this.handleCountryChange}
                    valueInputOnChange={this.valueInputOnChange}
                    option={option}
                    options={options}
                />


                <div className="row">
                    <div className="cards">

                        {isLoading === false ? <>
                            <div className="spinner-border text-light" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </> : filteredCountries.length === 0 ? <>
                            <h2 className={theme === 'light' ? 'h2-center light' : ' h2-center dark'} >Not Found</h2>
                        </> : <Cards countries={filteredCountries} theme={theme} />}
                    </div>
                </div>

            </div>
        )
    }
}

export default HomePage;