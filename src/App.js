import React, { Component } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, } from 'recharts';
import GridLoader from "react-spinners/GridLoader";
import axios from 'axios';

class App extends Component {

  
    constructor(props) {
        super(props);
        this.state = { loaded: false, num: 0, data: [] };
    }

    componentDidMount() {
        let dates = this.getDates();
        let requests = dates.map((date) => {
            return axios.get('https://api.github.com/search/repositories?q=covid+tracker+created:<' + date)
        });

        axios.all(requests).then(axios.spread((...responses) => {
            console.log(responses);
            let data = responses.map((response, i) => {
                return {
                    name: dates[i],
                    n: response.data.total_count,
                };
            });
            console.log(data);
            this.setState({
                loaded: true,
                data: data,
                num: data[8].n,
            });
        }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                { this.state.loaded ? (
                <>
                    <h1>There are <a className="App-link" href="https://github.com/search?q=covid+tracker">{this.state.num}</a> Covid-19 trackers on Github</h1>
                    <LineChart
                        width={700}
                        height={400}
                        data={this.state.data}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="n" stroke="#8884d8" activeDot={{ r: 2 }} />
                    </LineChart>
                    </>
			) : (
                <GridLoader
                    size={15}
                    color="#df4d51"
                    loading={!this.state.loaded}
                />
			)}
		</header>
        </div>
    );
}

getDates = () => {
	let start = new Date("2020-02-1");
	let now = new Date();
	let interval = Math.round((now - start) / (1000 * 60 * 60 * 24 * 9));
	let date = new Date();
	let isoDates = [];
	for (let i = 0; i < 9; i++) {
		isoDates.push(date.toISOString().substring(0,10)); 
		date.setDate(date.getDate() - interval);  
	}
	return isoDates.reverse();
}
}

export default App;
