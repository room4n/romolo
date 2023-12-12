import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import History from '../Pages/History';
import Live from '../Pages/Live';
import Details from '../Pages/Details';

class Router extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <Routes>
                <Route name="wedzarnia" path='/wedzarnia/' element={<History />} />
                <Route name="live" path='/wedzarnia/live' element={<Live />} />
                <Route name="details" path='/wedzarnia/details' element={<Details />}/>
            </Routes>
        )
    }
}
export default Router;