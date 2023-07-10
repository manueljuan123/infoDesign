import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts'
import darkUnicaTheme from 'highcharts/themes/dark-unica';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import HC_exporting from 'highcharts/modules/exporting';
import { DateRange } from '../components/DateRange';
import { getTramosCliente } from '../services/tramosCliente';
import moment from 'moment';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

darkUnicaTheme(Highcharts);

export function TramosCliente() {
  let [tramosCliente, setTramosCliente] = useState([]);
  const [records, setRecords] = useState(tramosCliente)

  const [shouldCallHandleDateRangeChange, setShouldCallHandleDateRangeChange] = useState(true);

  const [initialLoad, setInitialLoad] = useState(true);

  const STORED_START_DATA = localStorage.getItem('startDate');
  const STORED_END_DATA = localStorage.getItem('endDate');

  const DEFAULT_START_DATE = STORED_START_DATA ? new Date(STORED_START_DATA) : null;
  const DEFAULT_END_DATE = STORED_END_DATA ? new Date(STORED_END_DATA) : null;

  const columns = [
    {
        name: "Linea",
        selector: row => row.Linea,
        sortable: true,
    },
    {
        name: "Tipo Consumo",
        selector: row => row.TipoConsumo,
        sortable: true,
    },
    {
        name: "Pérdidas",
        selector: row => row.Perdidas,
        sortable: true,
    }
  ];

  const formattedData = records.reduce((result, current) => {
    const { Linea, Perdidas } = current;
    if (!result[Linea]) {
      result[Linea] = {
        Linea,
        Perdidas: 0
      };
    }
    result[Linea].Perdidas += Perdidas
    return result;
  }, []);

  const options = {
    chart: {
      width: 400,
      height: 580,
      type: 'column',
      responsive: true
      },
      title: {
          text: 'Pérdidas',
          align: 'center'
      },
      xAxis: {
          categories: Object.values(formattedData).sort((a, b) => a.Linea.localeCompare(b.Linea)).map(tramo => tramo.Linea),
          crosshair: true,
      },
      yAxis: {
          title: ''
      },

      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [
          {
            name: 'Pérdidas',
            label: 'Pérdidas',
            data: Object.values(formattedData).sort((a, b) => a.Linea.localeCompare(b.Linea)).map(tramo => tramo.Perdidas),
          },
      ],

      credits: {
        enabled: false
      },

      accessibility: {
        enabled: true
      }
  
  }

  HC_exporting(Highcharts);

  function handleFilter(event) {
    const newData = tramosCliente.filter(row => {
        return row.Linea.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.TipoConsumo.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData);
  }

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
          const tramosCliente = await getTramosCliente({ startDate: formattedStartDate, endDate: formattedEndDate });
          setTramosCliente(tramosCliente);
          setRecords(tramosCliente);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    } else {
        setTramosCliente([]);
        setRecords([]);
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
      {tramosCliente.length > 0 ? (
      <div className="row">
          <div className="col-lg-8">
          <div className='mt-2 d-flex justify-content-start'>
                <InputGroup onChange={handleFilter}>
                <Input />
                <InputGroup.Addon>
                    <SearchIcon />
                </InputGroup.Addon>
                </InputGroup>
          </div>
                  <DataTable
                      columns={columns}
                      data={records}
                      pagination    
                      paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                      >
                  </DataTable>
          </div>
          <div className="col-lg-4 d-flex justify-content-end">
              <HighchartsReact
              highcharts = {Highcharts}
              options = {options}
              />
          </div>
      </div>
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
  )
}