import React, { useMemo } from 'react';
import './Ticket.css'
import currencyCourse from "./UI/CurrencyCourse";

const Ticket = ({
    origin = '',
    origin_name = '',
    destination = '',
    destination_name = '',
    departure_time = '',
    arrival_time = '',
    departure_date = '',
    arrival_date = '',
    stops = 0,
    carrier = '',
    price = 0,
    activeCurrency = 'rub'
}) => {

    const transferLabel = useMemo(() => {
        switch (stops) {
            case 0: return 'Без пересадок';
            case 1: return '1 пересадка';
            case 2: return '2 пересадки';
            case 3: return '3 пересадки';
        }
    }, [stops]);

    const carrierLabel = useMemo(() => {
        switch (carrier) {
            case 'TK': return {
                name: 'TURKISH AIRLINES',
                color: 'TK'
            };
            case 'SU': return {
                name: 'AEROFLOT',
                color: 'SU'
            };
            case 'S7': return {
                name: 'S7',
                color: 'S7'
            };
            case 'BA': return {
                name: 'BRITISH AIRWAYS',
                color: 'BA'
            };
            default: return {
                name: 'UNKNOWN',
                color: ''
            };
        }
    }, [carrier]);

    const currencyIcon = useMemo(() => {
        switch (activeCurrency) {
            case 'rub': return '₽';
            case 'usd': return '$';
            case 'eur': return '€';
            default: return '₽'
        }
    }, [activeCurrency])

    const rusDate = (date: any) => {
        const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        const newDate = new Date(date).toLocaleString('ru', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        const day = days[new Date(date).getDay()]

        return `${newDate} ${day}`
    }

    const totalPrice = useMemo(() => {
        switch (activeCurrency) {
            case 'rub': return price;
            case 'usd': return Math.floor(price/currencyCourse.usd);
            case 'eur': return Math.floor(price/currencyCourse.eur);
            default: return price
        }
    }, [activeCurrency, price])

    return (
        <div className="ticket-container">
            <div className="ticket-left">
                <div className="ticket-left__title">
                    <div className="ticket-left__title__name"><strong>{carrierLabel.name}</strong></div>
                    <div className={`ticket-left__title__name__img ${carrierLabel.color}`}></div>
                </div>
                <div className="ticket-left__price">
                    <div className="ticket-left__title__name__top">Купить</div>
                    <div className="ticket-left__title__name__bottom">за {totalPrice} {currencyIcon}</div>
                </div>
            </div>
            <div className="sep"></div>
            <div className="ticket-right">
                <div className="ticket-right__info">
                    <div className="ticket-right__info__time">{departure_time}</div>
                    <div className="ticket-right__info__dest">{origin}, {origin_name}</div>
                    <div className="ticket-right__info__date">{rusDate(departure_date)}</div>
                </div>
                <div className="ticket-right__transfer">
                    <div className="ticket-right__transfer__info">
                        {transferLabel}
                    </div>
                    <div className="ticket-right__transfer__line">
                        <div className="ticket-right__transfer__line__sep"></div>
                        <div className="ticket-right__transfer__line__arrow">&gt;</div>
                    </div>
                </div>
                <div className="ticket-right__info">
                    <div className="ticket-right__info__time">{arrival_time}</div>
                    <div className="ticket-right__info__dest">{destination_name}, {destination}</div>
                    <div className="ticket-right__info__date">{rusDate(arrival_date)}</div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;