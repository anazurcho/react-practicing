import React, {useEffect, useState, useContext} from "react";
import ServiceContext from "../../service-context/service-context";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import classes from "../../../style/index.css"

const Jobs = () => {
    const Service = useContext(ServiceContext);
    const [jobSkills, setJobSkills] = useState([])
    const [data, setData] = useState([])
    const [getData,setGetData] = useState(false);

    function getJobInfo( job_id ) {
        Service.getJobsId(job_id)
            .then( response => {
                console.log(response.data.skills)
                setJobSkills( response.data["skills"] )
                setGetData(true)
                console.log( response.data["skills"] )
            });
            
    }
    
    const ExpanableComponent = ({data}) => (
        <>
            {data.uuid ? (
                <>
                    <h3>{data.title}</h3>
                    <p>{data.normalized_job_title}</p>
                    <button className="btn btn-primary" onClick={() => getJobInfo(data.uuid)}>Get Job Info</button>
                </>
            ) : (
                <span>cant find</span>
            )}
        </>
    );

    const columns = [
        {name: 'Title', selector: 'title', sortable: true},
        {name: 'normalized_job_title', selector: 'normalized_job_title', sortable: true},
    ];
    
    const columns2 = [
        {name: 'skill_name', selector: 'skill_name', sortable: true},
        {name: 'skill_type', selector: 'skill_type', sortable: true},
        {name: 'normalized_skill_name', selector: 'normalized_skill_name', sortable: true},
        {name: 'description', selector: 'description', sortable: true},
        {name: 'importance', selector: 'importance', sortable: true},
    ];
    

    useEffect( () => {
        Service.getJobs()
            .then( response => {
                setData(response.data);
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

    const dataTableInfo = (
        <DataTableExtensions columns={columns2} data={jobSkills}>
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
        <div>
            <div className={classes['App']}>
                <p className="text-danger">all - {data.length}</p>
                {getData ? dataTableInfo : <p>search more</p>}
                {dataTable}
            </div>
        </div>
    );
}

export default Jobs;
