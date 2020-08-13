import React from 'react';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import CountryDetails from './components/CountryDetails/CountryDetails';
import Cards from './components/Cards/Cards';
import Footer from './components/Footer/Footer';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {
  state = {
    countries: [],
    valueInput: '',
    defaultUrl: 'https://restcountries.eu/rest/v2/?fields=name;capital;population;region;flag',
    isLoading: false,
    error: false
  }

  componentDidMount() {
    const { defaultUrl } = this.state;
    fetch(defaultUrl)
      .then(res => res.json())
      .then(data => {
        this.setState({ countries: data, isLoading: true })
      })
      .catch(err => this.setState({ error: true }));

  }

  componentDidUpdate() {
    const { defaultUrl } = this.state;
    fetch(defaultUrl)
      .then(res => res.json())
      .then(data => {
        this.setState({ countries: data, isLoading: true })
      })
      .catch(err => this.setState({ error: true }));
  }

  changeUrl = e => {
    this.setState({ defaultUrl: e.target.value })
  }

  valueInputOnChange = e => {
    this.setState({ valueInput: e.target.value })
  }


  render() {
    const { countries, valueInput, isLoading } = this.state;

    let filteredCountries = countries.filter(country => {
      return country.name.toLowerCase().includes(valueInput.toLowerCase());
    })

    return (
      <Router>
        <Switch>
          <>
            <Header />
            <div className="container-fluid">

              <Route exact path="/" >
                <Filters
                  changeUrl={this.changeUrl}
                  defaultvalue={this.state.defaultvalue}
                  countries={this.state.countries}
                  valueInputOnChange={this.valueInputOnChange}
                />

                <div className="row">
                  <div className="cards">
                    {isLoading === false ? <>
                      <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </> : filteredCountries.length === 0 ? <>
                      <h2 className="h2-center">Not Found</h2>
                    </> : <>  <Cards countries={filteredCountries} /> </>}
                  </div>
                </div>
              </Route>
            </div>

            {countries.map(country => {
              return <Route exact path={`/${country.name}`} key={country.name}>
                <CountryDetails country={`https://restcountries.eu/rest/v2/name/${country.name}`} />
              </Route>

            })}

            <Footer />
          </>
        </Switch>
      </Router >
    );
  }

}

export default App;
