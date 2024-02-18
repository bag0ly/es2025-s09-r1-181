import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function GetContainer() {
    const [containerData, setContainerData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get("http://localhost:3000/containers")
            .then(response => {
                setContainerData(response.data);
            })
            .catch(error => console.log(error))
            .finally(() => {
                setFetchPending(false);
            });
    }, []);

    // Grouping containers by blockId
    const groupedContainers = containerData.reduce((acc, container) => {
        const blockId = container.blockId;
        if (!acc[blockId]) {
            acc[blockId] = [];
        }
        acc[blockId].push(container);
        return acc;
    }, {});

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (<div className="spinner-border"></div>) : (
                <div>
                    {Object.keys(groupedContainers).map(blockId => (
                        <div key={blockId} className="card col-sm-3 d-inline-block m-1 p-2">
                            <NavLink to={`/block/${blockId}`} className="card-content">
                                <div className="card-body">
                                    <h2 style={{ textAlign: 'center' }}>Block {blockId}</h2>
                                    <ul>
                                        {groupedContainers[blockId].map(container => (
                                            <li key={container.id}>{container.id}</li>
                                        ))}
                                    </ul>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GetContainer;
