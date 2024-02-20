import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import "mdb-ui-kit/css/mdb.min.css";

function Search() {
    const [containerData, setContainerData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setFetchPending(true);
        axios.get(`http://localhost:3000/containers`)
            .then(response => {
                setContainerData(response.data);
            })
            .catch(error => console.log(error))
            .finally(() => {
                setFetchPending(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value.toUpperCase());
    }
    // Filtered and grouped containers by blockId
    const filteredContainers = containerData.filter(container => {
        return container.id.includes(searchInput);
    });

    const groupedContainers = Object.entries(filteredContainers.reduce((acc, container) => {
        const blockId = container.blockId;
        if (!acc[blockId]) {
            acc[blockId] = [];
        }
        acc[blockId].push(container);
        return acc;
    }, {})).sort((a, b) => a[0] - b[0]);

    return (
        <div className='container'>
            <div className='container p-4 mt-4 bg-dark rounded-8' >
                <div className='input-group'>
                  <div className='form-outline' data-mdb-input-init>
                    <input type='search' id='form1' onChange={handleSearchChange} className='form-control' />
                    <label className='form-label' htmlFor='form1'>
                      Search
                    </label>
                  </div>
                </div>
            </div>
            <div className="p-5 d-flex justify-content-center m-auto text-center content bg-ivory">
                {isFetchPending ? (<div className="spinner-border"></div>) : (
                <div className="d-flex flex-wrap justify-content-center align-items-stretch">
                    {groupedContainers.map(([blockId, containers]) => (
                        <div key={blockId} className="card col-sm-4 d-inline-block m-1 p-2" style={{ width: 'fit-content' }}>
                            <div className='card-header' style={{ overflowY: 'auto', maxHeight: '20%'}}>
                                <h2 style={{ textAlign: 'center' }}> Block {blockId}</h2>
                            </div>
                            <div className="card-body" style={{ overflowY: 'auto', maxHeight: '85%'}}>
                                {containers.map(container => (
                                    <NavLink key={container.id} to={`/containers/${container.id}`} className="card-content"> 
                                        <div className='card-body'>
                                            {container.id} 
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;