import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts'
import darkUnicaTheme from 'highcharts/themes/dark-unica';

darkUnicaTheme(Highcharts);
export function CostoCliente({cliente}) {
  const options = {
    chart: {
        height: 330,
        type: 'column',
        responsive: true,
    },

    title: {
        text: 'Costo por categoría',
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
        name: 'Costo Comercial',
        data: cliente.map(data => data?.costo_comercial),
        stack: 'costo_comercial'
    }, {
        name: 'Costo Residencial',
        data: cliente.map(data => data?.costo_residencial),
        stack: 'costo_residencial'
    }, {
        name: 'Costo Industrial',
        data: cliente.map(data => data?.costo_industrial),
        stack: 'costo_industrial'
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