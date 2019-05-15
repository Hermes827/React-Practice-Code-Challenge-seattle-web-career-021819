import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(){
    super()
    this.state = {
      money: 100,
      currentIndex: 0,
      sushis: [],
      eatenSushis: []
    }
  }

  componentDidMount(){
    fetch(API)
    .then(res => res.json())
    .then(data => {

      this.setState({
        sushis: data
      })
    })
  }

  nextFourSushis = () => {
    this.setState({
      currentIndex: this.state.currentIndex + 4
    })
  }

  isSushiEaten = (sushi) => {
    return this.state.eatenSushis.includes(sushi)
  }

  eatSushi = (sushi) => {

    if(this.isSushiEaten(sushi)) return
    if(this.state.money - sushi.price < 0) return
      this.setState({
        eatenSushis: [...this.state.eatenSushis, sushi],
        money: [this.state.money - sushi.price]
      })

  }

  render() {



const {money, currentIndex, sushis, eatenSushis} = this.state

    return (
      <div className="app">
        <SushiContainer
          sushis={sushis.slice(currentIndex, currentIndex + 4)}
          nextFourSushis={this.nextFourSushis}
          isSushiEaten={this.isSushiEaten}
          eatSushi={this.eatSushi}
          />
        <Table
          money={money}
          eatenSushis={eatenSushis}
          />
      </div>
    );
  }
}

export default App;
