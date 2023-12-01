import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import History from '../Pages/History';
import Live from '../Pages/Live';

class Router extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <Routes>
                <Route path='wedzarnia/' element={<History />} />
                <Route path='wedzarnia/live' element={<Live />} />
            </Routes>
        )
    }
}
export default Router;