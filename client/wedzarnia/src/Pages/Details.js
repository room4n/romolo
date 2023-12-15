import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Plot from '../Components/Chart';

const Details = () =>{
    let { state } = useLocation().state;
    const [entries, setEntries] = useState();

    useEffect(()=>{
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: state.id })
        };
        fetch("http://"+window.location.hostname+":3000/wedzarnia/api/getEntries", requestOptions)
        //fetch("http://192.168.1.125:3000/wedzarnia/api/getEntries", requestOptions)
        .then(response => response.json())
           .then(data => {
               
               setEntries(data);
           }).catch((error) => {
               console.log(error)
             })

    },[])

    return(
        <div>
            {entries && <Plot dataset={entries}/> || <p>loading...</p>}
        </div>
    )
}

export default Details;