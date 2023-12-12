import { Component } from 'react';
import {Navigate, Link} from 'react-router-dom';

class SmokeDay extends Component{
    constructor(props){
        
        super(props);
        this.state = {
            id: this.props.smokeDay.id,
            date: this.props.smokeDay.date.split('T')[0],
            rate: this.props.smokeDay.rate,
            comment: this.props.smokeDay.comment,
        }
    }
    
    render(){
        return(
            <div>
                Smokeday date: {this.state.date} 
                <Link to="details" state={{state:this.state}} >Details</Link>
            </div>
        )
    }
}
export default SmokeDay;