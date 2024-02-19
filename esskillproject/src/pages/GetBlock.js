import { useState, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function GetContainer() {
    const location = useLocation();

    const id = location.pathname.split('/').pop(4);
    const [containerData, setContainerData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get(`http://localhost:3000/containers/${id}`)
            .then(response => {
                setContainerData(response.data);
            })
            .catch(error => console.log(error))
            .finally(() => {
                setFetchPending(false);
            });
    }, [id]);

    const Handle_Delete = () => {
        axios.delete(`http://localhost:3000/containers/${id}`)
            .catch(error => console.log(error));
    }

    return (
        <div className="container d-flex justify-content-center p-5 m-auto text-center content bg-ivory">
            {isFetchPending || !containerData.id ? (<div className="spinner-border"></div>) : (
                <div className="card p-3 w-50">
                    <div className="card-body">
                        <h5 className="card-title">{containerData.id}</h5>
                        <p className="card-text">blockId : {containerData.blockId}</p>
                        <p className="card-text">bayNumber : {containerData.bayNum}</p>
                        <p className="card-text">stackNumber : {containerData.stackNum}</p>
                        <p className="card-text">tierNumber : {containerData.tierNum}</p>
                        <p className="card-text">arrivedAt : {containerData.arrivedAt}</p>
                    </div>
                    <div className="btn-group d-flex justify-content-center" role="group">
                        <NavLink to={`/mod-container/${containerData.id}`} className="p-1" >
                            <button type="button" className="btn btn-warning"><i className="bi bi-pencil-square"></i> Módosítás</button>
                        </NavLink>
                        <NavLink to={`/`} className={`p-1`}>
                            <button onClick={Handle_Delete} type="button" className="btn btn-danger"><i className="bi bi-trash3"></i> Törlés</button>
                        </NavLink>
                        <NavLink to={`/`} className="p-1">
                            <button className="btn btn-secondary"><i className="bi bi-arrow-return-left"></i> Vissza</button>
                        </NavLink>
                    </div>
                </div>)}
        </div>
    );
}

export default GetContainer;
