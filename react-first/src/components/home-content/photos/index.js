import React, {useEffect, useState, useContext} from "react";
import ServiceContext from "../../service-context/service-context";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import styled from "styled-components";
import classes from "../../../style/index.css"

const ExpandableDiv = styled.div `
    display: flex;
`;

const Photos = () => {
    const Service = useContext(ServiceContext);

    const [data, setData] = useState([])
    const [metaData, setMetaData] = useState([])
    const ExpanableComponent = ({data}) => (
        <ExpandableDiv>
            {data.url ? (
                <img className={classes['image']}  src={data.url} alt="url" />
            ) : (
                <span>cant find</span>
            )}
        </ExpandableDiv>
    );
    const columns = [ 
        {name: 'ID', selector: 'id', sortable: true},
        {name: 'title', selector: 'title', sortable: true},
        {name: "url", selector: "url", omit: true },
    ];
    useEffect( () => {
        Service.getPhotos()
            .then( response => {
                setData(response.data.result);
                setMetaData( response.data._meta );
                console.log(response)
            });
    }, [] );

    const dataTable = (
        <DataTableExtensions columns={columns} data={data}>
            <DataTable
                highlightOnHover={true}
                noHeader={true}
                pagination={true}
                subHeader={true}
                pointerOnHover={true}
                expandableRows={true}
                expandOnRowClicked={true}
                expandableRowsComponent={<ExpanableComponent />}
            />
        </DataTableExtensions>
    )
    return (
        <div className={classes['App']}>
            <div className="jumbotron">
                <h1>Photos Meta Data</h1>
                <p>{metaData.message}</p> 
                <p><a className="btn btn-primary btn-lg">Total Count {metaData.totalCount}</a></p>
            </div>
            <p className="text-danger">{data.length}</p>
            {dataTable}
        </div>
    );
}

export default Photos;