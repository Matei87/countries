import React from 'react'
import Card from '../Card/Card';


class Cards extends React.Component {
    render() {
        const { countries, theme } = this.props;

        return (
            <>
                {
                    countries.map(country => {
                        return <React.Fragment key={country.name}>
                            <Card country={country} theme={theme} />
                        </React.Fragment>
                    }

                    )
                }
            </>

        )
    }
}

export default Cards;
