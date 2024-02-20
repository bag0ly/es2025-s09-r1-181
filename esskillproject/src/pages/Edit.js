import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditContainer() {
    const param = useParams();
    const containerId = param.containerId;
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [selectedBay, setSelectedBay] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedArrivedAt, setSelectedArrivedAt] = useState(null); // New state for arrivedAt
    const [containerData, setContainerData] = useState([]);
    
    useEffect(() => {
        const fetchContainer = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/containers/${containerId}`);
                const container = response.data;
                setSelectedBlock(container.blockId);
                setSelectedBay(container.bayNum);
                setSelectedPosition({
                    stack: container.stackNum - 1,
                    tier: container.tierNum - 1
                });
                setSelectedArrivedAt(container.arrivedAt); // Set arrivedAt
            } catch (error) {
                console.error('Error fetching container:', error);
            }
        };

        fetchContainer();
    }, [containerId]);

    const handleSelectedChange = (event) => {
        const stackNum = parseInt(event.target.dataset.stack);
        const tierNum = parseInt(event.target.dataset.tier);
        setSelectedPosition({
            stack: stackNum,
            tier: tierNum,
        });
    };

    const handleBlockChange = (event) => {
        setSelectedBlock(parseInt(event.target.value));
    };

    const handleBayButtonClick = (bayNumber) => {
        setSelectedBay(bayNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/containers/${containerId}`, {
                blockId: selectedBlock,
                bayNum: selectedBay,
                stackNum: selectedPosition.stack + 1,
                tierNum: selectedPosition.tier + 1,
                arrivedAt: selectedArrivedAt // Include arrivedAt in PUT request
            });

            navigate('/'); // Assuming this navigates to the appropriate page
        } catch (error) {
            console.error('Error updating container:', error);
        }
    };

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
                                <svg onClick={handleSelectedChange} data-stack={i} data-tier={j} style={{ cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
                                </svg>
                            ) : (
                                <svg onClick={handleSelectedChange} data-stack={i} data-tier={j} style={{ cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-square" viewBox="0 0 16 16">
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
        <div className="container d-flex justify-content-center p-5 text-center content bg-ivory">
            <div className="card add p-5 content bg-whitesmoke text-center">
                <div className="row">
                    <div className="col-sm-6">
                        <h2 className='mb-3'>Edit container</h2>
                        <form onSubmit={handleSubmit} className="form-group">
                                <div className="form-group row pb-1">
                                    <label className='d-flex justify-content-start p-1'>Block ID:</label>
                                        <div>
                                            <input type="number" name="blockId" className="form-control" min="1" value={selectedBlock} onChange={handleBlockChange} required/>
                                        </div>
                                </div>
                                <div className="form-group row pb-1">
                                    <label className='d-flex justify-content-start p-1'>Bay Number:</label>
                                        <div>
                                            <input type="number" name="bayNum" className="form-control" value={selectedBay} defaultValue="1" min="1" max="5" readOnly/>
                                        </div>
                                </div>
                                <div className="form-group row pb-1">
                                    <label className='d-flex justify-content-start p-1'>Stack Number:</label>
                                        <div>
                                            <input type="number" name="stackNum" value={selectedPosition ? selectedPosition.stack + 1 : ''} onChange={() => {}} className="form-control" min="1" max="5" readOnly/>
                                        </div>
                                </div>
                                <div className="form-group row pb-1">
                                    <label className='d-flex justify-content-start p-1'>Tier Number:</label>
                                        <div>
                                            <input type="number" name="tierNum" value={selectedPosition ? selectedPosition.tier + 1 : ''} onChange={() => {}} className="form-control" min="1" max="5" readOnly/>
                                        </div>
                                </div>
                                <div className="form-group row pb-1">
                                    <label className='d-flex justify-content-start p-1'>Arrived At:</label>
                                        <div>
                                            <input type="date" name="arrivedAt" className="form-control" min="1950-01-01" max={today} value={selectedArrivedAt} onChange={(e) => setSelectedArrivedAt(e.target.value)} required/>
                                        </div>
                                </div>
                                <div className='p-3'>
                                    <button type="submit" className="btn btn-primary">Confirm edit</button>
                                </div>
                        </form>
                    </div>
                    <div className="col-sm-6">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div className="">
                                <h5>Select Bay:</h5>
                                <button type="button" className={`btn btn-outline-black ${selectedBay === 1 ? 'active' : ''} m-2`} onClick={() => handleBayButtonClick(1)}>1</button>
                                <button type="button" className={`btn btn-outline-black ${selectedBay === 2 ? 'active' : ''} m-2`} onClick={() => handleBayButtonClick(2)}>2</button>
                                <button type="button" className={`btn btn-outline-black ${selectedBay === 3 ? 'active' : ''} m-2`} onClick={() => handleBayButtonClick(3)}>3</button>
                                <button type="button" className={`btn btn-outline-black ${selectedBay === 4 ? 'active' : ''} m-2`} onClick={() => handleBayButtonClick(4)}>4</button>
                                <button type="button" className={`btn btn-outline-black ${selectedBay === 5 ? 'active' : ''} m-2`} onClick={() => handleBayButtonClick(5)}>5</button>
                            </div>
                            <div className="row justify-content-center">
                                {generateGrid()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditContainer;
