import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddContainer() {
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const [selectedBlock, setSelectedBlock] = useState(1); // Defaulting to block 1
    const [selectedPosition, setSelectedPosition] = useState(null);

    const handleBlockChange = (event) => {
        setSelectedBlock(parseInt(event.target.value));
    };

    const handleSelectedChange = (event) => {
        setSelectedPosition({
            stack: parseInt(event.target.value),
            tier: parseInt(event.target.value),
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const id = formData.get('id');
        const blockId = parseInt(formData.get('blockId'));
        const bayNum = parseInt(formData.get('bayNum'));
        const stackNum = parseInt(formData.get('stackNum'));
        const tierNum = parseInt(formData.get('tierNum'));
        const arrivedAt = formData.get('arrivedAt');
    
        // Check container ID format
        const idFormatRegex = /^[A-Z]{4}\d{8}$/;
        if (!idFormatRegex.test(id)) {
            alert('Invalid container ID format. It should be in the format "ABCD12345678".');
            return;
        }
    
        try {
            // Check if container with the same ID already exists
            const idCheckResponse = await axios.get(`http://localhost:3000/containers?id=${id}`);
            if (idCheckResponse.data.length > 0) {
                alert('Another container with the same ID already exists.');
                return;
            }
    
            // Check if another container exists in the same location
            const locationCheckResponse = await axios.get(`http://localhost:3000/containers?blockId=${blockId}&bayNum=${bayNum}&stackNum=${stackNum}&tierNum=${tierNum}`);
            if (locationCheckResponse.data.length > 0) {
                alert('Another container exists in the same location.');
                return;
            }
    
            // If all checks pass, proceed with adding the container
            const addResponse = await axios.post('http://localhost:3000/containers', {
                id,
                blockId,
                bayNum,
                stackNum,
                tierNum,
                arrivedAt
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/'); // Assuming this navigates to the appropriate page
        } catch (error) {
            console.error('Error:', error);
        }
    };

    

    const generateGrid = () => {
        const grid = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const isSelected = selectedPosition && selectedPosition.stack === i && selectedPosition.tier === j;
                grid.push(
                    <div className='p-3 col' key={`${i}-${j}`} onClick={() => setSelectedPosition({ stack: i, tier: j })}>
                        {isSelected ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            </svg>
                        )}
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
                <h2 className='mb-3'>New container</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Container ID:</label>
                        <div>
                            <input type="text" name="id" className="form-control" required placeholder='ABCD12345678'/>
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Block ID:</label>
                        <div>
                            <input type="number" name="blockId" className="form-control" min="1" value={selectedBlock} onChange={handleBlockChange} required/>
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Bay Number:</label>
                        <div>
                            <input type="number" name="bayNum" className="form-control" min="1" max="5" required/>
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Stack Number:</label>
                        <div>
                            <input type="number" name="stackNum" onChange={handleSelectedChange} className="form-control" min="1" max="5" required/>
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Tier Number:</label>
                        <div>
                            <input type="number" name="tierNum" onChange={handleSelectedChange} className="form-control" min="1" max="5" required/>
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Arrived At:</label>
                        <div>
                            <input type="date" name="arrivedAt" className="form-control" min="1900-01-01" max={today} required/>
                        </div>
                    </div>
                    <div className='p-3'>
                        <button type="submit" className="btn btn-primary">Add container</button>
                    </div>
                </form>
            </div>
            <div className="card add p-5 content bg-whitesmoke text-center">
                <div className='row'>
                   {generateGrid()}
                </div>
            </div>
        </div>
    );
}

export default AddContainer;