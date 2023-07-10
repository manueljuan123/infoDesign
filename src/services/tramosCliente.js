import { BASE_URL } from "../constants"

/* Servicio para llamar al endpoint /tramos-cliente */
export const getTramosCliente =  ({ startDate, endDate }) => {
    if(startDate === '' || endDate === '') return null
        const response = fetch(`${BASE_URL}/tramos-cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fechainicial:startDate, fechafinal:endDate })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Error buscando tramos-cliente`)
            }
            return response.json();
          })
          
          return response
}