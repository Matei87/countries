import React from 'react';
import './Filters.css';

import Select from 'react-select';


class Filters extends React.Component {
    render() {
        const { handleCountryChange, valueInputOnChange, options, option, theme } = this.props;


        return (
            <div className={theme === 'light' ? 'filters light' : 'filters dark'}>
                <input
                    type="search"
                    placeholder="Search a country"
                    onChange={valueInputOnChange}
                />

                <div className="form-group">
                    <Select
                        value={option}
                        options={options}
                        onChange={handleCountryChange}
                        placeholder="Filter by Region"

                    />
                </div>
            </div>
        )
    }
}

export default Filters;