import React from 'react';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import CountryDetails from './components/CountryDetails/CountryDetails';
import Cards from './components/Cards/Cards';
import Footer from './components/Footer/Footer';


import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/global';


import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {
  state = {
    countries: [],
    valueInput: '',
    defaultUrl: 'https://restcountries.eu/rest/v2/?fields=name;capital;population;region;flag',
    theme: 'light',
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


    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      this.setState({ theme: localTheme });
    } else {
      this.setState({ theme: 'light' })
    }


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

  toggleTheme = () => {
    const { theme } = this.state;
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      this.setState({ theme: 'dark' })
    } else {
      window.localStorage.setItem('theme', 'light');
      this.setState({ theme: 'light' })
    }
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
            <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
              <GlobalStyles />

              <Header toggleTheme={this.toggleTheme} theme={this.state.theme} />
              <div className="container-fluid">

                <Route exact path="/" >
                  <Filters
                    theme={this.state.theme}
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
                        <h2 className={this.state.theme === 'light' ? 'h2-center light' : ' h2-center dark'} >Not Found</h2>
                      </> : <>  <Cards countries={filteredCountries} theme={this.state.theme} /> </>}
                    </div>
                  </div>
                </Route>
              </div>

              {countries.map(country => {
                return <Route exact path={`/${country.name}`} key={country.name} theme={this.state.theme}>
                  <CountryDetails country={`https://restcountries.eu/rest/v2/name/${country.name}`} theme={this.state.theme} />
                </Route>
              })}

              <Footer />
            </ThemeProvider>
          </>
        </Switch>
      </Router >
    );
  }

}

export default App;
