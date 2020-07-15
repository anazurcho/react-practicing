import React, {useEffect, useState, useContext} from "react";
import ServiceContext from "../../service-context/service-context";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import classes from "../../../style/index.css"

const Users = () => {
    const Service = useContext(ServiceContext);

    const [data, setData] = useState([])
    const [metaData, setMetaData] = useState([])
    const columns = [ 
        {name: 'ID', selector: 'id', sortable: true},
        {name: 'first_name', selector: 'first_name', sortable: true},
        {name: 'last_name', selector: 'last_name', sortable: true},
        {name: 'BDay', selector: 'dob', sortable: true},
        {name: 'Email', selector: 'email', sortable: true},
        {name: 'website', selector: 'website', sortable: true},
        {name: 'Address', selector: 'address', sortable: true},
        {name: 'Status', selector: 'status',sortable: true}
    ];

    useEffect( () => {
        Service.getUsers()
            .then( response => {
                setData(response.data.result);
                console.log(response)
                setMetaData( response.data._meta );
            });
    }, [] );

    const dataTable = (
        <DataTableExtensions columns={columns} data={data}>
            <DataTable
                highlightOnHover={true}
                noHeader={true}
                defaultSortField = "id"
                pagination={true}
                subHeader={true}
            />
        </DataTableExtensions>
    )

    return (
        <div className={classes['App']}>
            <div className="jumbotron">
                <h1>Users Meta Data</h1>
                <p>{metaData.message}</p> 
                <p className="btn btn-primary btn-lg">Total Count {metaData.totalCount}</p>
            </div>
            <p className="text-danger">{data.length}</p>
            {dataTable}
        </div>
    );
}

export default Users;