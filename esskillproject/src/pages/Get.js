import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

function GetContainer() {
    const { id } = useParams();
    const [containerData, setContainerData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState(1); // Defaulting to block 1
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedBay, setSelectedBay] = useState(1); // Defaulting to bay 1
    const [containerId, setContainerId] = useState('');

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

    const generateGrid = () => {
        const grid = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const isSelected = selectedPosition && selectedPosition.stack === i && selectedPosition.tier === j;
                const isContainerPresent = containerData.some(container => 
                    container.blockId === selectedBlock &&
                    container.bayNum === selectedBay &&
                    container.stackNum === i + 1 &&
                    container.tierNum === j + 1
                );
                grid.push(
                    <div className={`p-2 col ${isContainerPresent ? 'bg-secondary' : ''} rounded-4 containerBlock`} key={`${i}-${j}`} >
                        <div>
                            {isSelected ? (
                                <svg data-stack={i} data-tier={j} style={{ cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
                                </svg>
                            ) : (
                                <svg data-stack={i} data-tier={j} style={{ cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                </svg>
                            )}
                        </div>
                    </div>
                );
                if ((j + 1) % 5 === 0 && j !== 0) {
                    grid.push(<div className="w-100" key={`divider-${i}-${j}`}></div>);
                }
            }
        }
        return grid;
    };

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (<div className="spinner-border"></div>) : (
                <div className="d-flex flex-wrap justify-content-center">
                    {groupedContainers.map(([blockId, containers]) => (
                        <div key={blockId} className="card col-sm-4 m-1 p-2" style={{ width: '40%', height: 'fit-content' }}>
                            <div className='card-header' style={{ overflowY: 'hidden', maxHeight: '20%'}}>
                                <h2 style={{ textAlign: 'center' }}> Block {blockId}</h2>
                            </div>
                            <div className="card-body" style={{ overflowY: 'auto', maxHeight: '80%'}}>
                                <div className="justify-content-center row">
                                    {generateGrid()}
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/*
{containers.map(container => (
                                    <NavLink key={container.id} to={`/containers/${container.id}`} className="card-content"> 
                                        <div className='card-body'>
                                            {container.id}
                                        </div>
                                    </NavLink>
                                ))}
*/
export default GetContainer;
