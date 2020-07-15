import React, {useState, useContext} from "react";
import ServiceContext from "../../service-context/service-context";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import classes from "../../../style/index.css"

const JobsAutocomplete = () => {
    const Service = useContext(ServiceContext);
    const columns = [ 
        {name: 'ID', selector: 'uuid', sortable: true},
        {name: 'skill_name', selector: 'skill_name', sortable: true},
    ];
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const onSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const onClickChange = () => {
		if (search) {
			Service
                .getSkillsNormalize(search)
                .then( response => {
                    setData(response.data)
                } )
                .catch(( err ) => console.error("[home/index.jsx]", err.message ));
		} else {
			alert("Try to search first!");
		}
    };

    const dataTable = (
        <DataTableExtensions columns={columns} data={data}>
            <DataTable
                highlightOnHover={true}
                noHeader={true}
                pagination={true}
                subHeader={true}
                pointerOnHover={true}
            />
        </DataTableExtensions>
    )
    return (
        <div className={classes['App']}>
           <p className="text-danger">search with job name like - bar</p>
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

export default JobsAutocomplete;