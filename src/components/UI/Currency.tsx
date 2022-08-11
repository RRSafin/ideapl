import React from 'react'
import './Currency.css'

const currencies = [{
        label: 'RUB',
        value: 'rub'
    },{
        label: 'USD',
        value: 'usd'
    },{
        label: 'EUR',
        value: 'eur'
}]

const Currency = ({
    activeCurrency = '',
    setActiveCurrency = (val: string) => {}
}) => {
    return (
        <div className="bar-header__currency-container">
            {
                currencies.map(el => (
                    <div
                        className={`bar-header__currency-container__item ${activeCurrency === el.value? 'checked' : ''}`}
                        onClick={() => setActiveCurrency(el.value)}
                        key={el.value}
                    >
                        {el.label}
                    </div>
                ))
            }
        </div>
    );
};

export default Currency;