import React, { Component } from 'react';
import './App.css';

class Die extends Component {
    constructor(props) {
        super(props);
        this.toggleHold = this.toggleHold.bind(this);
        this.state = { hold:false }
    }

    toggleHold (e) {
        e.preventDefault();
        this.setState({ hold:!this.state.hold });
    }

    render () {
        return (
            <div className='die'>
                {this.props.number}
                <button className='holdButton' onClick={this.toggleHold}>Hold</button>
            </div>
        )
    }
}

function ScoreBox (props) {
    return (
        <div className='scoreBox'>
            <h3>Level: {props.level}</h3>
            <h3>Score: {props.score}</h3>
        </div>
    )
}

class App extends Component {
  constructor(props) {
      super(props);
      this.roll = this.roll.bind(this);
      this.state = { level:1, outcome:1, score:0, dice: [0,0] }
  }

  roll (props) {
      let die1 = Math.floor(Math.random() * (5)) + 1;
      let die2 = Math.floor(Math.random() * (5)) + 1;
      this.setState({dice:[die1,die2], score:this.state.score+1})
  }

  render() {
    return (
        <div>
            <h1>Angry Dice</h1>
            <ScoreBox level={this.state.level} score={this.state.score} />
            <Die number={this.state.dice[0]} />
            <Die number={this.state.dice[1]} />
            <button onClick={this.roll}>Roll</button>
            {/*<footer>Made by Li Poltorak, January 2018</footer>*/}
        </div>
    );
  }
}

export default App;
