import { Component } from 'react';
import SmokeDay from '../Components/SmokeDay';

class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            smokeDays: []
        }
        fetch("http://192.168.1.125:3000/wedzarnia/api/getSmokeDays", {method: "GET", mode: 'cors'})
             .then(response => response.json())
                .then(data => {
                    this.setState({list: data})
                }).catch((error) => {
                    console.log(error)
                  })

    }
    
    render(){
        return(
            <div>
                {this.state.list && this.state.list.map(item => (
                    <SmokeDay  key={item.id} smokeDay={item} />
                    ))
                }
            </div>
        )
    }
}
export default History;