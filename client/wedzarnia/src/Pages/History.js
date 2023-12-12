import { Component } from 'react';
import SmokeDay from '../Components/SmokeDay';

class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            //call for smokeday items
        }
        fetch('http://192.168.1.125:3000/wedzarnia/api/getSmokeDays',{method: "GET", mode: 'no-cors'})
        .then(res=>{
            return res.json();
        })
        .then(data => {
            console.log(data);
        }).catch((error) => console.log(error));
    }
    componentDidUpdate(prevProps){
        //call for smoke day items (?)
    }
    render(){
        return(
            <div>
                History
                <SmokeDay />
                </div>
            //list smokedays as components
        )
    }
}
export default History;