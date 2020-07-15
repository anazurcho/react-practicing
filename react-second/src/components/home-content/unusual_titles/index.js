import React, {useEffect, useState, useContext} from "react";
import ServiceContext from "../../service-context/service-context";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import classes from "../../../style/index.css"

const UnusualTitles = () => {
    const Service = useContext(ServiceContext);

    const [data, setData] = useState([]);

    const columns = [ 
        {name: 'title', selector: 'title', sortable: true},
        {name: 'description', selector: 'description', sortable: true},
    ];

    useEffect( () => {
        Service.getUnusualTitles()
            .then( response => {
                setData(response.data);
                console.log(response.data)
            });
    }, [] );

    const dataTable = (
        <DataTableExtensions columns={columns} data={data}>
            <DataTable
                highlightOnHover={true}
                noHeader={true}
                pagination={true}
                subHeader={true}
            />
        </DataTableExtensions>
    )

    return (
        <div className={classes['App']}>
            <p className="text-danger">{data.length}</p>
            {dataTable}
        </div>
    );
}

export default UnusualTitles;