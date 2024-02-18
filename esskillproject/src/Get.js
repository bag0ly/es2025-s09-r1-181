import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContainerList = () => {
    const [containers, setContainers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchContainers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/containers');
          const data = response.data;
          setContainers(data);
          setLoading(false);  // Set loading to false when data is received
        } catch (error) {
          console.error('Error fetching container data:', error.message);
        }
      };
  
      fetchContainers();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        <h2>Container List</h2>
        <ul>
          {containers.map((data) => (
            <li key={data.id}>
              {data.blockId} - {data.bayNum} - {data.stackNum} - {data.tierNum} - {data.arrivedAt}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default ContainerList;
