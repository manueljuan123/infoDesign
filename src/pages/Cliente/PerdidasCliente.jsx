import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts'
import darkUnicaTheme from 'highcharts/themes/dark-unica';

darkUnicaTheme(Highcharts);
export function PerdidasCliente({cliente}) {
  const options = {

    chart: {
        height: 330,
        type: 'column',
        responsive: true,
    },

    title: {
        text: 'Pérdidas por categoría',
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

    credits: {
      enabled: false
    },

    series: [{
        name: 'Pérdidas Comercial',
        data: cliente.map(data => data?.perdidas_comercial),
        stack: 'perdidas_comercial'
    }, {
        name: 'Pérdidas Residencial',
        data: cliente.map(data => data?.perdidas_residencial),
        stack: 'perdidas_residencial'
    }, {
        name: 'Pérdidas Industrial',
        data: cliente.map(data => data?.perdidas_industrial),
        stack: 'perdidas_industrial'
    }],

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