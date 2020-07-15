import React, {useState, useContext} from "react";
import classes from "../../style/index.css"
import ServiceContext from "../service-context/service-context";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { connect } from "react-redux";

const Home = ({firstName,lastName,email}) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const Service = useContext( ServiceContext );

    const onSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const onClickChange = () => {
		if (search) {
			Service
                .getSkillsNormalize( search )
                .then( response => {
                    setData(response.data)
                } )
                .catch( ( err ) => console.error( "[home/index.jsx]", err.message ) );
		} else {
			alert("Try to search first!");
		}
    };
    const columns = [ 
        {name: 'skill_name', selector: 'skill_name', sortable: true},
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
           <p className="text-info">Hello {firstName} {lastName}</p>
           <p className="text-success"> {email} </p>
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

const mapStateToProps = ( state ) => {
    return {
        isAuthenticated: state.isAuthenticated,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
    };
}


export default connect( mapStateToProps, null )( Home );