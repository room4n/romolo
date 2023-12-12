import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Details = () =>{
    let { state } = useLocation().state;
    const [entries, setEntries] = useState();
    console.log(state.id);

    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: state.id })
        };
        fetch("http://192.168.1.125:3000/wedzarnia/api/getEntries", requestOptions)
        .then(response => response.json())
           .then(data => {
               console.log(data)
           }).catch((error) => {
               console.log(error)
             })

    },[])

    return(
        <div>
            Details {state.id}
        </div>
    )
}

export default Details;