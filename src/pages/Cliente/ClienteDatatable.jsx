import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

export function ClienteDatatable({ cliente }) {
    const [records, setRecords] = useState(cliente)

    useEffect(() => {
        setRecords(cliente);
      }, [cliente]);
      
    const columns = [
        {
            name: "Linea",
            selector: row => row.Linea,
            sortable: true,
        },
        {
            name: "Consumo Residencial",
            selector: row => row.consumo_residencial,
            sortable: true,
        },
        {
            name: "Consumo Comercial",
            selector: row => row.consumo_comercial,
            sortable: true,
        },
        {
            name: "Consumo Industrial",
            selector: row => row.consumo_industrial,
            sortable: true,
        },
        {
            name: "Pérdidas Residencial",
            selector: row => row.perdidas_residencial,
            sortable: true,
        },
        {
            name: "Pérdidas Comercial",
            selector: row => row.perdidas_comercial,
            sortable: true,
        },
        {
            name: "Pérdidas Industrial",
            selector: row => row.perdidas_industrial,
            sortable: true,
        },
        {
            name: "Costo Residencial",
            selector: row => row.costo_residencial,
            sortable: true,
        },
        {
            name: "Costo Comercial",
            selector: row => row.costo_comercial,
            sortable: true,
        },
        {
            name: "Costo Industrial",
            selector: row => row.costo_industrial,
            sortable: true,
        },
    ];

    function handleFilter(event) {
        const newData = cliente.filter(row => {
            return row.Linea.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
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
                    data={records.map(data => data)}
                    pagination    
                    paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                    >
                    </DataTable> 
                </div>
            </div>
        </div>
    )
}