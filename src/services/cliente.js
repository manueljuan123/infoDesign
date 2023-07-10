import { BASE_URL } from "../constants"

/* Servicio para llamar al endpoint /cliente */
export const getCliente =  ({ startDate, endDate }) => {
    if(startDate === '' || endDate === '') return null
        const response = fetch(`${BASE_URL}/cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fechainicial:startDate, fechafinal:endDate })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Error buscando métricas de clientes`)
            }
            return response.json();
          })
          
          return response
}