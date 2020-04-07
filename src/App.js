import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { loaded: false, num: 0 };
    }

    componentDidMount() {
        axios.get('https://api.github.com/search/repositories?q=covid-tracker')
            .then(res => {
                this.setState({
                    loaded: true,
                    num: res.data.total_count
                });
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                { this.state.loaded ? (
                    <p>There are {this.state.num} Covid-19 trackers on Github</p>
                ) : (
                    <></>
                )}
                <a
                  className="App-link"
                  href="https://github.com/search?q=covid-19+tracker"
                >
                    Source 
                </a>
                </header>
            </div>
        );
    }
}

export default App;
