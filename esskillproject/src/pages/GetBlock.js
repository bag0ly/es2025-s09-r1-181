import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';

function GetContainer() {
    const param = useParams();
    const id = param.blockId;
    const [containerData, setContainerData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get(`http://localhost:3000/containers/block/${id}`)
            .then(response => {
                setContainerData(response.data);
            })
            .catch(error => console.log(error))
            .finally(() => {
                setFetchPending(false);
            });
    }, [id]);

    return (
        <div className="container d-flex justify-content-center p-5 m-auto text-center content bg-ivory">
            {isFetchPending || !containerData.id ? (<div className="spinner-border"></div>) : (
                    <div className="card p-3 w-50">
                        <div className="card-body">
                            <h5 className="card-title">{containerData.id}</h5>
                            <p className="card-text">{containerData.blockId}</p>
                            <p className="card-text">{containerData.bayNum}</p>
                            <p className="card-text">{containerData.stackNum}</p>
                            <p className="card-text">{containerData.tierNum}</p>
                            <p className="card-text">{containerData.arrivedAt}</p>
                        </div>
                        <div className="btn-group d-flex justify-content-center" role="group">
                           <NavLink to={`/mod-container/${containerData.id}`} className="p-1" >
                                <button type="button" class="btn btn-warning"><i class="bi bi-pencil-square"></i> Módosítás</button>
                           </NavLink>
                            <NavLink to={`/del-container/${containerData.id}`} className="p-1">
                                    <button type="button" class="btn btn-danger"><i class="bi bi-trash3"></i> Törlés</button>
                            </NavLink>
                            <NavLink to={`/`} className="p-1">
                                <button className="btn btn-secondary"><i class="bi bi-arrow-return-left"></i> Vissza</button>
                            </NavLink>
                        </div>
                    </div>)}
        </div>
    );
}

export default GetContainer;
