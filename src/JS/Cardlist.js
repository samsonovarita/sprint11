import Card from '../index.js';

export default class CardList {
    constructor (box, cards) { 
      this.box = box;
      this.cards = cards; 
      this.render();
    }
  
    addCard(name, link) { 
      const { cardElement } = new Card(name, link);
      this.box.appendChild(cardElement);
    }
  
    render() {
      this.cards.forEach((elem) => {this.addCard(elem.name, elem.link)})
    }
  }