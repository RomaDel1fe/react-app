import React from "react";
import './Container.css'
import EmojiList from "../EmojiList/EmojiList";
import Button from "../baseComponents/Button/Button";

class Container extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      emojis: {
        "😃": 0,
        "😊": 0,
        "😔": 0,
        "😒": 0
      },
      winners: [], 
      resultsShown: false,
    };
  }

  incrementCount = (emoji) => {
    if (this.state.resultsShown) { 
      return;
    }

    this.setState(prevState => {
      let newEmojis = { ...prevState.emojis };
      newEmojis[emoji]++;
      return { emojis: newEmojis };
    });
  }

  getWinner = () => {
    let maxVotes = Math.max(...Object.values(this.state.emojis));
    let winningEmojis = Object.keys(this.state.emojis).filter(emoji => this.state.emojis[emoji] === maxVotes);
    this.setState({ winners: winningEmojis, resultsShown: true });
  }

  setWinner = (winners) => {
    this.setState({ winners });
  }

  restart = () => {
    this.setState({
      emojis: {
        "😃": 0,
        "😊": 0,
        "😔": 0,
        "😒": 0
      },
      winners: [],
      resultsShown: false,
    });
  }
  render(){
    return <main className="Container">
      <EmojiList emojis={this.state.emojis} incrementCount={this.incrementCount} winners={this.state.winners}/>
      <Button type="primary" onClick={this.getWinner} label="Show Results"/>
      <Button type="secondary" onClick={this.restart} label="Restart"/>
    </main>
  }
}

export default Container;