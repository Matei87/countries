import React, { Component } from 'react';
import Card from '../Card/Card';

class Cards extends Component {
  render() {
    const { countries, theme } = this.props;

    return (
      <>
        {countries.map((country) => {
          return (
            <React.Fragment key={country['name']['common']}>
              <Card country={country} theme={theme} />
            </React.Fragment>
          );
        })}
      </>
    );
  }
}

export default Cards;
