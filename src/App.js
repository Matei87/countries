import React, { Component } from 'react';
import Header from './components/Header/Header';

import HomePage from './pages/HomePage/HomePage';
import CountryDetails from './pages/CountryDetails/CountryDetails';
import Footer from './components/Footer/Footer';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/global';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    theme: 'light',
  };

  componentDidMount() {
    let localTheme = window.localStorage.getItem('theme');
    localTheme
      ? this.setState({ theme: localTheme })
      : this.setState({ theme: 'light' });
  }

  toggleTheme = () => {
    const { theme } = this.state;
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      this.setState({ theme: 'dark' });
    } else {
      window.localStorage.setItem('theme', 'light');
      this.setState({ theme: 'light' });
    }
  };

  render() {
    const { theme } = this.state;

    return (
      <Router>
        <Switch>
          <>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
              <GlobalStyles />

              <Header toggleTheme={this.toggleTheme} theme={theme} />

              <Route exact path='/'>
                <HomePage theme={theme} />
              </Route>

              <Route exact path='/:country' component={CountryDetails} />

              <Footer />
            </ThemeProvider>
          </>
        </Switch>
      </Router>
    );
  }
}

export default App;
