import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ModPage() {
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const requestBody = {
            id: formData.get('id'),
            blockId: parseInt(formData.get('blockId')),
            bayNum: parseInt(formData.get('bayNum')),
            stackNum: parseInt(formData.get('stackNum')),
            tierNum: parseInt(formData.get('tierNum')),
            arrivedAt: formData.get('arrivedAt')
        };

        try {
            const response = await axios.put('http://localhost:3000/containers', requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/'); // Assuming this navigates to the appropriate page
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center p-5 m-auto text-center content bg-ivory">
            <div className="card p-5 content bg-whitesmoke text-center">
                <h2>New container</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Container ID:</label>
                        <div>
                            <input type="text" name="id" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Block ID:</label>
                        <div>
                            <input type="number" name="blockId" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Bay Number:</label>
                        <div>
                            <input type="number" name="bayNum" className="form-control" min="1" max="5"/>
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Stack Number:</label>
                        <div>
                            <input type="number" name="stackNum" className="form-control" min="1" max="5"/>
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Tier Number:</label>
                        <div>
                            <input type="number" name="tierNum" className="form-control" min="1" max="5"/>
                        </div>
                    </div>
                    <div className="form-group row pb-1">
                        <label className='d-flex justify-content-start p-1'>Arrived At:</label>
                        <div>
                            <input type="date" name="arrivedAt" className="form-control" min="1900-01-01" max={today}/>
                        </div>
                    </div>
                    <div className='p-3'>
                        <button type="submit" className="btn btn-primary">Add container</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModPage;