import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts'
import darkUnicaTheme from 'highcharts/themes/dark-unica';

darkUnicaTheme(Highcharts);
export function ConsumoCliente({ cliente }) {
    const options = {
        chart: {
            height: 330,
            type: 'column',
            responsive: true,
        },
    
        title: {
            text: 'Consumo por categoría',
            align: 'center',
        },
    
        xAxis: {
            categories: cliente.map(data => data?.Linea)
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
                stacking: 'normal'
            }
        },
    
        series: [{
            name: 'Consumo Comercial',
            data: cliente.map(data => data?.consumo_comercial),
            stack: 'consumo_comercial'
        }, {
            name: 'Consumo Residencial',
            data: cliente.map(data => data?.consumo_residencial),
            stack: 'consumo_residencial'
        }, {
            name: 'Consumo Industrial',
            data: cliente.map(data => data?.consumo_industrial),
            stack: 'consumo_industrial'
        }],
        
        credits: {
          enabled: false
      },
      
      accessibility: {
        enabled: true
      }
    }
    return (
        <div>
        <HighchartsReact
        highcharts = {Highcharts}
        options = {options}
        />
        </div>
      )
}