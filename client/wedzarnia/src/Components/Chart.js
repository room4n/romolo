import { Component } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './Chart.css';

class Plot extends Component{
    constructor(props){
        super(props);
        var labels = this.props.dataset.map((data)=>data.id);
        var tempBottom = this.props.dataset.map((data)=>data.tempBottom);
        var tempTop = this.props.dataset.map((data)=>data.tempTop);
       this.state ={
        labels: labels,
        datasets: [
            {
                label:"Temperature dół",
                data:tempBottom,
            },
            {
                label: "Temperatura góra",
                data:tempTop
            }]

       }
    }
    
    render(){
        return(
            

            <Line style={{margin:"40px"}} data={this.state} options={{animation:false, bezierCurve: false,responsive:true, tension: 0.5, 
     maintainAspectRatio: false}}/>
        
        )
    }
}
export default Plot;