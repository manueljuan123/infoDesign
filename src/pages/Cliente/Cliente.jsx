import { ConsumoCliente } from './ConsumoCliente';
import { CostoCliente } from './CostoCliente';
import { PerdidasCliente } from './PerdidasCliente';
import { ClienteDatatable } from './ClienteDatatable'
import { DateRange } from '../../components/DateRange';
import { useState, useEffect } from 'react';
import { getCliente } from '../../services/cliente'
import moment from 'moment'

export function Cliente() {
  let [cliente, setCliente] = useState([]); // Definición del estado tramos y su función para actualizarlo
  const [records, setRecords] = useState(cliente)

  const [shouldCallHandleDateRangeChange, setShouldCallHandleDateRangeChange] = useState(true);

  const [initialLoad, setInitialLoad] = useState(true);

  const STORED_START_DATA = localStorage.getItem('startDate');
  const STORED_END_DATA = localStorage.getItem('endDate');

  const DEFAULT_START_DATE = STORED_START_DATA ? new Date(STORED_START_DATA) : null;
  const DEFAULT_END_DATE = STORED_END_DATA ? new Date(STORED_END_DATA) : null;

  useEffect(() => {
      if (initialLoad) {
          setInitialLoad(false);
          return;
        }

      if (shouldCallHandleDateRangeChange && DEFAULT_START_DATE && DEFAULT_END_DATE) {
        handleDateChange([DEFAULT_START_DATE, DEFAULT_END_DATE]);
        setShouldCallHandleDateRangeChange(false);
      }
    }, [handleDateChange, DEFAULT_START_DATE, DEFAULT_END_DATE, shouldCallHandleDateRangeChange]);

  function handleDateChange(dates) {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      const formattedStartDate = moment(startDate).format('YYYY/MM/DD');
      const formattedEndDate = moment(endDate).format('YYYY/MM/DD');
      localStorage.setItem('startDate', formattedStartDate);
      localStorage.setItem('endDate', formattedEndDate);
      async function fetchData() {
        try {
          const cliente = await getCliente({ startDate: formattedStartDate, endDate: formattedEndDate });
          setCliente(cliente);
          setRecords(cliente);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    } else {
        setCliente([]);
        localStorage.setItem('startDate', '');
        localStorage.setItem('endDate', '');
    }
  }

  return (
    <div className='container mx-5 mt-3'>
      <div className="row">
        <div className="col-12 d-flex justify-content-center mb-2 mt-2">
            <DateRange handleDateRangeChange={handleDateChange} />
        </div>
      </div>
      {cliente.length > 0 ? (
        <section>
          <div className="row">
            {/*Gráfico Consumo Cliente*/}
            <div className="col-4">
              <ConsumoCliente cliente={ cliente } />
            </div>
            {/*Gráfico Costo Cliente*/}
            <div className="col-4">
              <CostoCliente cliente={ cliente } />
            </div>
            {/*Gráfico Pérdidas Cliente*/}
            <div className="col-4">
              <PerdidasCliente cliente={ cliente } />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/*Datatable Cliente*/}
              <ClienteDatatable cliente={ cliente.map(data => data) } />
            </div>
          </div>
        </section>
      ) : DEFAULT_START_DATE && DEFAULT_END_DATE ? (
        <div className="row">
          <div className="col-12 d-flex justify-content-center mt-5">
              <h1>Cargando...</h1>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 d-flex justify-content-center mt-5">
              <h1>Sin resultados</h1>
          </div>
        </div>
      )}
    </div>
  );
}
