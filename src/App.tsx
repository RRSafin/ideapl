import React, {useMemo, useState} from 'react';
import './App.css';
import SortBar from "./components/SortBar";
import Ticket from "./components/Ticket";
import tickets from './tickets';
import stops from './stopsFilter'


function App() {

    const [activeCurrency, setActiveCurrency] = useState('rub');
    const [activeStopsFilter, setActiveStopsFilter] = useState<string[]>(stops.map(el => el.val));

    const ticketsLayout = useMemo(() => {
        if (activeStopsFilter.length !== 0) {
            return tickets
                .filter(el => activeStopsFilter.includes(`${el.stops}`))
                .sort((a, b) => a.price - b.price)
                .map(el => (
                        <Ticket
                            price={el.price}
                            key={el.price}
                            origin={el.origin}
                            origin_name={el.origin_name}
                            destination={el.destination}
                            destination_name={el.destination_name}
                            departure_time={el.departure_time}
                            arrival_time={el.arrival_time}
                            departure_date={el.departure_date}
                            arrival_date={el.arrival_date}
                            stops={el.stops}
                            carrier={el.carrier}
                            activeCurrency={activeCurrency}
                        />
                    )
                )
        } else {
            return (
                <div className={"ticketsLayout"}>
                    <div className="none">Нет доступных билетов</div>
                </div>
            )
        }
    }, [activeStopsFilter, activeCurrency]);

    const changeStopsFilter = (val :string) => {
        if (val === 'all') {
            if (activeStopsFilter.length === 4) {
                setActiveStopsFilter([]);
            } else {
                setActiveStopsFilter(stops.map(el => el.val));
            }
        } else {
            if (!activeStopsFilter.includes(val)) {
                setActiveStopsFilter([...activeStopsFilter, val])
            } else {
                setActiveStopsFilter(activeStopsFilter.filter(el => el !== val))
            }
        }
    }

    const setStopsOnly = (val:string) => {
        setActiveStopsFilter([val])
    }

    return (
    <div className="App">
        <div className="App-header">
            <div className="App-header__icon">&gt;</div>
        </div>
        <div className="App-layout">
          <SortBar
              activeCurrency={activeCurrency}
              activeStopsFilter={activeStopsFilter}
              setActiveCurrency={setActiveCurrency}
              changeStopsFilter={changeStopsFilter}
              setStopsOnly={setStopsOnly}
          />
          <div className="ticket-layout">
              {ticketsLayout}
          </div>
        </div>
    </div>
  );
}

export default App;
