import React, { Component } from 'react';
import './App.css';
import replay from './replay.svg';
import quote from './quote.svg';
import loading from './loading.svg';
import errored from './errored.svg';

class App extends Component {
  constructor(){
    super();
    this.state = {
      quotes: [],
      isLoading: false,
      error: null,
    }
  }
  componentDidMount(){
    this.__fetchQuote();
  }
  __fetchQuote(){
    this.setState({ isLoading: true });
    fetch('https://favqs.com/api/qotd')
    .then(response => {
      if(response.ok){
        return response.json();
      }
      else{
        throw new Error('Something went wrong ...');
      }
    }).then(data => {
        this.setState({
          quotes: data.quote,
          isLoading: false
        })
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    const { quotes, isLoading, error } = this.state;
    if(error){
      return <div className="App">
              <img src={errored} alt="errored" />
              <p>{error.message}</p>
            </div>;
    }

    if(isLoading){
      return <div className="App">
              <img src={loading} alt="loading" />
              <p>Loading ...</p>
              </div>;
    }
    return (
      <div className="App">
        <h3>Random quote machine 🔮</h3>
        <div className="App-card">
          <div className="App-card__quote">
            <img src={quote} alt="quote icon" width="40px" />
            <p>{quotes.body}</p>
          </div>
          <p className="App-card__author">- {quotes.author}</p>
          <button className="App-card__reload" onClick={this.__fetchQuote.bind(this)}>
            <img src={replay} alt="replay icon" />
            <p>Another one!</p>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
