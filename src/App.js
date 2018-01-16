import React, { Component } from 'react';
import './App.css';

const diceFaces = { 1:'http://class.pdxcodeguild.com/media/lab_files/ngry-dice/1.png',
                    2:'http://class.pdxcodeguild.com/media/lab_files/ngry-dice/2.png',
                    3:'http://class.pdxcodeguild.com/media/lab_files/ngry-dice/angry.png',
                    4:'http://class.pdxcodeguild.com/media/lab_files/ngry-dice/4.png',
                    5:'http://class.pdxcodeguild.com/media/lab_files/ngry-dice/5.png',
                    6:'http://class.pdxcodeguild.com/media/lab_files/ngry-dice/6.png',
                    0:'http://class.pdxcodeguild.com/media/lab_files/ngry-dice/angry.png'
};

class Die extends Component {
    render () {
        return (
        <div className='die'>
            <img src={diceFaces[this.props.number]} alt={this.props.number}/>
        </div>
    )
    }
}


function ScoreBox (props) {
    if (props.outcome === 0) {
        return (
            <div className='scoreBox'>
                <h2>You lose!</h2>
                <h3>Score: {props.score}</h3>
            </div>
        )
    } else if (props.outcome === 2) {
       return (
            <div className='scoreBox'>
                <h2>Congratulations! You won!</h2>
                <h3>Score: {props.score}</h3>
            </div>
        )
    } else {
       return (
        <div className='scoreBox'>
            <h3>Level: {props.level}</h3>
            <h3>Score: {props.score}</h3>
        </div>
    )
    }
}

class App extends Component {
  constructor(props) {
      super(props);
      this.roll = this.roll.bind(this);
      this.toggleHold = this.toggleHold.bind(this);
      this.checkLevel = this.checkLevel.bind(this);
      this.handleRoll = this.handleRoll.bind(this);
      this.state = { level:1, outcome:1, score:0, dice: [0,0], hold:[false,false]}
  }

  componentDidUpdate() {
      this.checkLevel();
  }

  checkLevel () {
      if (this.state.dice[0] === 3 && this.state.dice[1] === 3) {
          if (this.state.outcome !== 0) {
              this.setState({outcome:0})
          }

      } else if (this.state.level === 1) {
          if (this.state.dice.includes(1) && this.state.dice.includes(2)) {
              if (this.state.level !== 2) {
                  this.setState({level:2})
              }
          }
      } else if (this.state.level === 2) {
          if (this.state.dice.includes(3) && this.state.dice.includes(4)) {
              if (this.state.level !==3) {
                 this.setState({level:3})
              }
          }
      } else if (this.state.level === 3) {
          if (this.state.dice.includes(5) && this.state.dice.includes(6)) {
              if (this.state.outcome !==2) {
                  this.setState({outcome:2})
              }
          }
      }
  }

  roll () {
      let die1 = !this.state.hold[0]?Math.floor(Math.random()*6)+1:this.state.dice[0];
      let die2 = !this.state.hold[1]?Math.floor(Math.random()*6)+1:this.state.dice[1];
      this.setState({dice:[die1,die2], score:this.state.score+1});
  }

  handleRoll () {
      this.roll();
  }

  toggleHold (e) {
        e.preventDefault();
        let id = e.target.id;
        if (id==='0') {
            this.setState({hold:[!(this.state.hold[0]),this.state.hold[1]]})
        } else {
            this.setState({hold:[this.state.hold[0],!(this.state.hold[1])]})
        }
    }

  render() {
    return (
        <div>
            <h1>Angry Dice</h1>
            <ScoreBox level={this.state.level} score={this.state.score} outcome={this.state.outcome} />
            <div className="diceBox">
                <Die number={this.state.dice[0]} hold={this.state.hold[0]} />
                <Die number={this.state.dice[1]} hold={this.state.hold[0]} />
                <button className='holdButton' id='0' onClick={this.toggleHold}>
                    {this.state.hold[0]?'Unlock':'Lock'}
                </button>
                <button className='holdButton' id='1' onClick={this.toggleHold}>
                    {this.state.hold[1]?'Unlock':'Lock'}
                </button>
            </div>
            <br />
            <button onClick={this.handleRoll}>Roll</button>
            {/*<footer>Made by Li Poltorak, January 2018</footer>*/}
        </div>
    );
  }
}

export default App;
