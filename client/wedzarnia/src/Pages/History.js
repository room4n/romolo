import { Component } from 'react';
import SmokeDay from '../Components/SmokeDay';

class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            //call for smokeday items
        }
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