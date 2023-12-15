import { Component } from 'react';
import {Link} from 'react-router-dom';
import './SmokeDay.css';

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
            <Link className="smokeDay" to="details" state={{state:this.state}} >
                <div class="">
                    <div className="date">{this.state.date} </div>
                    <div className="products">Kielbasa | Szynka</div>
                </div>
                <div class="rate">4/5</div>
            </Link>
        )
    }
}
export default SmokeDay;