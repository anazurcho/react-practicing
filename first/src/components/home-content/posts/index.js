import React, {useEffect, useState, useContext} from "react";
import ServiceContext from "../../service-context/service-context";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import classes from "../../../style/index.css"

const Posts = () => {
    const Service = useContext(ServiceContext);
    const [userInfo, setUserInfo] = useState('')
    const [data, setData] = useState([])
    const [metaData, setMetaData] = useState([])
    function getInfo( user_info ) {
        Service.getUserInfo(user_info)
            .then( response => {
                console.log(response)
                setUserInfo(response.data.result)
            });
    }
  
    const ExpanableComponent = ({data}) => (
        <>
            {data.body ? (
                <>
                    <h3>{data.title}</h3>
                    <p>{data.body}</p>
                    <button class="btn btn-primary" onClick={() => getInfo(data.user_id)}>Get User Info</button>
                    <p>{userInfo.first_name} {userInfo.last_name}</p>
                    <p> {userInfo.gender}   {userInfo.email}</p>
                </>
            ) : (
                <span>cant find</span>
            )}
        </>
    );

    const columns = [
        {name: 'ID', selector: 'id', sortable: true},
        {name: 'User', selector: 'user_id', sortable: true},
        {name: 'Title', selector: 'title', sortable: true},
        {name: 'User Email', omit:true}
    ];
    

    useEffect( () => {
        Service.getPosts()
            .then( response => {
                setData(response.data.result);
                console.log(response)
                setMetaData(response.data._meta);
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
        <div>
            <div className={classes['App']}>
            <div className="jumbotron">
                <h1>Posts Meta Data</h1>
                <p>{metaData.message}</p> 
                <p className="btn btn-primary btn-lg">Total Count {metaData.totalCount}</p>
            </div>
                <p className="text-danger">{data.length}</p>
                {dataTable}
            </div>
            
        </div>
    );
}

export default Posts;
