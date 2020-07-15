import React, {useState, useContext} from "react";
import classes from "../../style/index.css"
import ServiceContext from "../service-context/service-context";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';

const Home = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const Service = useContext( ServiceContext );

    function getInfo(searched) {
        Service
            .getSearchedInfo(searched)
            .then(response => {
                console.log(response)
                setData(response.data.result)
                console.log(data)
            })
            .catch((err) => console.error("[home/index.jsx]", err.message));
    }
    const onSearchChange = (event) => {
		setSearch(event.target.value);
    };
    const onClickChange = () => {
		if (search) {
			getInfo(search);
		} else {
			alert("Try to search first!");
		}
    };
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
           <p className="text-danger">search with first name like - john</p>
           <div className='row form_search'>
                <div className='col'>
                    <input
                        value={search}
                        type='text'
                        className='form-control search-input'
                        placeholder='Type to search'
                        onChange={onSearchChange}
                    />
                </div>
                <div className='col-2'>
                    <button onClick={onClickChange} className='btn btn-warning'>
                        Search
                    </button>
                </div>
            </div>
            {dataTable}
        </div>
    );
}

export default Home;
