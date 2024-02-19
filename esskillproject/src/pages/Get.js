import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

function GetContainer() {
    const { id } = useParams();
    const [containerData, setContainerData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

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

    // Grouping and sorting containers by blockId
    const groupedContainers = Object.entries(containerData.reduce((acc, container) => {
        const blockId = container.blockId;
        if (!acc[blockId]) {
            acc[blockId] = [];
        }
        acc[blockId].push(container);
        return acc;
    }, {})).sort((a, b) => a[0] - b[0]);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (<div className="spinner-border"></div>) : (
                <div>
                    {groupedContainers.map(([blockId, containers]) => (
                        <div key={blockId} className="card col-sm-4 d-inline-block m-1 p-2">
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
    );
}

export default GetContainer;
