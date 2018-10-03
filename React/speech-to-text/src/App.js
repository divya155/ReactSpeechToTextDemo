import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
  class App extends Component {
	constructor(){
		super()
		this.state = {}
	}

	onListenClick(){
		this.setState({
			text: "I am Listening .... "
		})
		fetch('http://localhost:3002/api/speech-to-text/token')
  		.then(function(response) {
      			return response.text();
  		}).then((token)=> {
			console.log(token);
    			var stream = recognizeMic({
        			token: token,
        			objectMode: true, // send objects instead of text
        			extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
        			format: false // optional - performs basic formatting on the results such as capitals an periods
   			 });
    			stream.on('data', (data)=> {
      				console.log(data);
				this.setState({
					text: data.alternatives[0].transcript
				})
    			});
    			stream.on('error', function(err) {
     				console.log(err);
    			});
    			//document.querySelector('#stop').onclick = stream.stop.bind(stream);
  		}).catch(function(error) {
      			console.log(error);
  	});
	 
  }
  render() {
	return (
		<div className="App">
		  <div className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h2>Welcome to React</h2>
		  </div>
		  <button onClick={this.onListenClick.bind(this)}> Click to listen </button>
		  <div> {this.state.text} </div>
		</div>
	);
	}
}

export default App;
