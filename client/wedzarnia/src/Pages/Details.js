import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Details = () =>{
    let { state } = useLocation().state;
    const [entries, setEntries] = useState();
    console.log(state.id);

    useEffect(()=>{
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: state.id })
        };
        fetch("http://192.168.1.125:3000/wedzarnia/api/getEntries", requestOptions)
        .then(response => response.json())
           .then(data => {
               
               setEntries(data);
           }).catch((error) => {
               console.log(error)
             })

    },[])

    return(
        <div>
            Details {state.id}
            {entries && entries.map(entry=>(
                <div>{entry.dateTime.split('T')[0]} + {entry.id}</div>
            ))
            }
        </div>
    )
}

export default Details;