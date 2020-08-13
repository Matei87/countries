import React from 'react'
import Card from '../Card/Card';


class Cards extends React.Component {
    render() {
        const { countries } = this.props;

        return (
            <>
                {
                    countries.map(country => {
                        return <React.Fragment key={country.name}>
                            <Card country={country} />
                        </React.Fragment>
                    }

                    )
                }
            </>

        )
    }
}

export default Cards;
