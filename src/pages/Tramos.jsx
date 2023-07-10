import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts'
import darkUnicaTheme from 'highcharts/themes/dark-unica';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import HC_exporting from 'highcharts/modules/exporting';
import { DateRange } from '../components/DateRange';
import { getTramos } from '../services/tramos';
import moment from 'moment';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

darkUnicaTheme(Highcharts);

export function Tramos() {
    let [tramos, setTramos] = useState([]);
    const [records, setRecords] = useState([])

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
            name: "Consumo",
            selector: row => row.consumo,
            sortable: true,
        },
        {
            name: "Pérdidas",
            selector: row => row.perdidas,
            sortable: true,
        },
        {
            name: "Costo",
            selector: row => row.costo,
            sortable: true,
        },
    ];

    const options = {
        chart: {
            width: 600,
            height: 350,
            type: 'column',
            responsive: true,
        },

        title: {
            text: 'Tramos',
            align: 'center',
        },

        xAxis: {
            categories: tramos.map(tramo => tramo.Linea)
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: ''
            }
        },

        tooltip: {
            format: '<b>{key}</b><br/>{series.name}: {y}<br/>',
        },

        plotOptions: {
            column: {
                stacking: 'normal',
            }
        },
        series: [{
            name: 'Pérdidas',
            data: tramos.map(tramo => tramo.perdidas),
        }, {
            name: 'Consumo',
            data: tramos.map(tramo => tramo.consumo),
        }, {
            name: 'Costo',
            data: tramos.map(tramo => tramo.costo),
        }],
        
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true,
        },
        accessibility: {
            enabled: true
          }
    }
    HC_exporting(Highcharts);

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
              const tramos = await getTramos({ startDate: formattedStartDate, endDate: formattedEndDate });
              setTramos(tramos);
              setRecords(tramos);
            } catch (error) {
              console.error(error);
            }
          }
          fetchData();
        } else {
            setTramos([]);
            localStorage.setItem('startDate', '');
            localStorage.setItem('endDate', '');
        }
    }

    function handleFilter(event) {
        const newData = tramos.filter(row => {
            return row.Linea.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData);
    }
     
    return (
        <div className='container mx-5 mt-3'>
            <div className="row">
                <div className="col-12 d-flex justify-content-center mb-2 mt-2">
                    <DateRange handleDateRangeChange={handleDateChange} />
                </div>
            </div>
            {tramos.length > 0 ? (
            <div className="row">
            <div className="col-lg-6 mt-5">
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
                        fixedHeader="10"
                        pagination    
                        paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                        >
                    </DataTable>
            </div>
            <div className="col-lg-6 d-flex justify-content-end mt-5">
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
