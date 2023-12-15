
import './App.css';
import Router from './Components/Router';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Link to='wedzarnia'>History</Link>
      <Link to='live'>Live</Link>
      <Router ></Router>
      
      
    </div>
  );
}

export default App;
