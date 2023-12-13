import { Component } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

class Plot extends Component{
    constructor(props){
        super(props);
        console.log(props.dataset)
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
            <div>
               <Line data={this.state} options={{animation:false}}/>               
            </div>
        )
    }
}
export default Plot;