import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Plot from '../Components/Chart';
import './Details.css';

const Details = () =>{
    let { state } = useLocation().state;
    const [entries, setEntries] = useState();
    const [loaded, setLoaded] = useState(false);
    
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
               setLoaded(true);
           }).catch((error) => {
               console.log(error)
             })

    },[]);
    

    return(
        entries && <div className="details">
            <div className="sumup">
                <div className="box">
                    Temperatura wędzarni: <p>60°C</p>
                </div>  
                <div className="box">
                    {console.log(entries[entries.length-1])}
                    Produkt 1: <p>{loaded && entries[entries.length-1].tempBottom}°C</p>
                </div>  
                <div className="box">
                    Produkt 2: <p>{loaded && entries[entries.length-1].tempTop}°C</p>
                </div>  
            </div>
            <Plot dataset={entries}/> 
        </div>
        
        || <p>loading...</p>
    )
}

export default Details;