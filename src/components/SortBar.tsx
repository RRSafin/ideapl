import React from 'react';
import './SortBar.css'
import Currency from "./UI/Currency";
import stops from "../stopsFilter";

interface SortBarComponentProps {
    activeStopsFilter :string[]
    activeCurrency :string,
    setActiveCurrency :(val: string) => void,
    changeStopsFilter :(val: string) => void,
    setStopsOnly :(val: string) => void,
}

const SortBar = ({
    activeStopsFilter = [''],
    activeCurrency = '',
    setActiveCurrency = (val: string) => {},
    changeStopsFilter = (val: string) => {},
    setStopsOnly = (val: string) => {},
}: SortBarComponentProps) => {
    return (
        <div className="bar-container">
            <div className="bar-header">
                <div className="bar-header__title"><strong>ВАЛЮТА</strong></div>
                <Currency
                    activeCurrency={activeCurrency}
                    setActiveCurrency={setActiveCurrency}
                />
            </div>
            <div className="bar-transfer">
                <div className="bar-header__title"><strong>КОЛИЧЕСТВО ПЕРЕСАДОК</strong></div>
                <div className="bar-transfer__check" onClick={() => changeStopsFilter('all')}>
                    <div
                        className={stops.every(el => activeStopsFilter.includes(el.val)) ?
                            'bar-transfer__check__box__checked' :
                            'bar-transfer__check__box'}
                    />
                    <div className="check__box__text">Все</div>
                </div>
                {stops.map(el => (
                    <div className="bar-transfer__check" onClick={() => changeStopsFilter(el.val)} key={el.val}>
                        <div
                            className={activeStopsFilter.includes(el.val) ?
                                'bar-transfer__check__box__checked' :
                                'bar-transfer__check__box'}
                        />
                        <div className="check__box__text">{el.label}</div>
                        <div
                            className="check__box__only"
                             onClick={(e) => {
                            e.stopPropagation();
                            setStopsOnly(el.val)
                        }}>
                            ТОЛЬКО
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SortBar;