import React from 'react';
import './Filters.css';


class Filters extends React.Component {
    render() {
        const { changeUrl, valueInputOnChange } = this.props;

        return (
            <div className="filters">
                <input
                    type="search"
                    placeholder="Search a country"
                    onChange={valueInputOnChange}
                />

                <div className="form-group">
                    <label htmlFor="valuelabel"></label>
                    <select
                        id="valuelabel"
                        onChange={changeUrl}
                        className="custom-select custom-select-lg"
                    >

                        <option value="https://restcountries.eu/rest/v2/?fields=name;capital;population;region;flag" defaultValue>All Countries</option>
                        <option value="https://restcountries.eu/rest/v2/region/africa?fields=name;capital;population;region;flag">Africa</option>
                        <option value="https://restcountries.eu/rest/v2/region/americas?fields=name;capital;population;region;flag">America</option>
                        <option value="https://restcountries.eu/rest/v2/region/asia?fields=name;capital;population;region;flag">Asia</option>
                        <option value="https://restcountries.eu/rest/v2/region/europe?fields=name;capital;population;region;flag">Europe</option>
                        <option value="https://restcountries.eu/rest/v2/region/oceania?fields=name;capital;population;region;flag">Oceania</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Filters;