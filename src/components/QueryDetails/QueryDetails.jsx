import React, { useEffect, useState } from 'react'
import { Link, Links } from 'react-router-dom';
import Header from '../Header/Header';

const QueryDetails = () => {
    const [query, setQuery] = useState([]);
    useEffect(()=>{
        const getQuery = async () => {
            try {
                const URL ="http://localhost:3000/api/getQuery";
                const options ={
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                    Credential:"include"
                }
                const response = await fetch(URL, options);
                const data = await response.json();
                console.log(data);
                if(data.success){
                    setQuery(data.data);
                }
            } catch (error) {
                
            }

        }
        getQuery();
    },[])
  return (
    <>
    <Header/>
        <h1>
            query details page
        </h1>
        <table>
        <thead>
        <tr>
          <th>S no.</th>
          <th>Token ID</th>
          <th>name</th>
          <th>Email</th>
          <th>query</th>
          <th>Created at</th>
          {/* <th>Description</th> */}
        </tr>
        </thead>
        <tbody>
          {query.map((item, index) => {
            return (
              <Link to="/description">
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.token}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.query}</td>
                <td>{item.createdAt}</td>
                {/* <td>{item.description}</td> */}
              </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
      
    </>
  )
}

export default QueryDetails
