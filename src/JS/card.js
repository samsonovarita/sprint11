import {createNode} from './function.js';

export default class Card {
    constructor(name, link) {
      this.name = name;
      this.link = link;
      this.cardElement = this.create();
      this.handleRemove = this.remove.bind(this);
      this.cardElement.addEventListener('click', this.like);
      this.cardElement.addEventListener('click', this.handleRemove);
    }
  
    like() {
      if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked');
      }
    }
  
    remove() {
        if (event.target.classList.contains('place-card__delete-icon')) {
          this.cardElement.remove();
          this.cardElement.removeEventListener('click', this.like);
          this.cardElement.removeEventListener('click', this.handleRemove);
        }
    }
            
    create() { 
      const placeCard = createNode('div','place-card');
      const placeCardImage = createNode('div','place-card__image');
      const placeCardDeleteBtn = createNode('button','place-card__delete-icon');
      const placeCardDescription = createNode('div','place-card__description');
      const placeCardName = createNode('h3','place-card__name');
      const placeCardLikeBtn = createNode('button','place-card__like-icon');
  
      placeCardImage.style.backgroundImage = `url(${this.link})`;
      placeCardName.textContent = this.name;
  
      placeCard.appendChild(placeCardImage); 
      placeCardImage.appendChild(placeCardDeleteBtn); 
      placeCard.appendChild(placeCardDescription); 
      placeCardDescription.appendChild(placeCardName); 
      placeCardDescription.appendChild(placeCardLikeBtn); 
  
    return placeCard;
    }
  }