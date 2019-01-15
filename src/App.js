import React, {Component} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import ResultPanel from './components/ResultPanel';

class App extends Component {
    render() {
        return (
            <div className="App container">
                <NavBar/>
                <SearchBar/>
                <ResultPanel/>
            </div>
        );
    }
}

export default App;
