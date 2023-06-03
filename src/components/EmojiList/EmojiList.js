import { Component } from "react"
import PropTypes from 'prop-types';
import './EmojiList.css'

class EmojiList extends Component{
  static propTypes = {
    emojis: PropTypes.object.isRequired,
    winners: PropTypes.array.isRequired,
    incrementCount: PropTypes.func.isRequired
  };
  render(){
    let emojiElements = Object.keys(this.props.emojis).map(emoji => {
      let emojiClass = "Emoji";
      if (this.props.winners.includes(emoji)) {
        emojiClass += " Emoji__winner";
      }
      return (
        <li key={emoji} className={emojiClass} onClick={() => this.props.incrementCount(emoji)}>
          {emoji} : {this.props.emojis[emoji]}
        </li>
      );
    });
    return <ul className="Emojis">{emojiElements}</ul>;
  }
}
export default EmojiList;