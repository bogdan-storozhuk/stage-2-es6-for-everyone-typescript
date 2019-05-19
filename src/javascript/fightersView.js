import View from './view';
import FighterView from './fighterView';
import {
  fighterService
} from './services/fightersService';

class FightersView extends View {
  constructor(fighters) {
    super();

    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({
      tagName: 'div',
      className: 'fighters'
    });
    this.element.append(...fighterElements);
  }

  async handleFighterClick(event, fighter) {

    if (!this.fightersDetailsMap.has(fighter._id)) {
      const result = await fighterService.getFighterDetails(fighter._id);
      this.fightersDetailsMap.set(fighter._id, result);
    }

    let result = this.fightersDetailsMap.get(fighter._id);


  this.openPopup();

  this.addEditDataToPopup(result);

  $('.popup-close').on('click', () => {
      this.closePopup();
    });

    // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
  }

   addEditDataToPopup = (object) => {
    let entries = Object.entries(object);

    entries =  entries.filter(entry => entry[0] !== '_id' && entry[0] !== 'source' && entry[0] !== 'name');
    let htmlText ='';
    entries.forEach(item => {
        htmlText += `  <label for="${item[0]}"><b>${item[0]}</b></label>
                       <input type="text" id="${item[0]}" value="${item[1]}" 
                       placeholder="Enter ${item[0]}" name="${item[0]}"/> 
                       <br/>`;
    });  

    htmlText += '<br/> <button id="editFighter">Edit</button>';
    $('#editPopup').append(htmlText);
    
    $('#editFighter').on('click', () => this.getChangedFighterData(object));
  }

  getChangedFighterData = (object) =>{
    let keys = Object.keys(object);
    keys.forEach(key => object[key] = $('#'+key).val());
    this.fightersDetailsMap.set(object._id, object);
    this.closePopup();
  }

  openPopup =() =>{
    $('.overlay').css('display',  'block');
  }

  closePopup =()=> {
    $('.overlay').css('display',  'none');
    $('#editPopup').empty();
  }
}

export default FightersView;